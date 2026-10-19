// Fetches delayed real share prices for the paper-trading "NSE delayed" feed and writes:
//   data/quotes.js           window.MP_QUOTES: last price and previous close for every listed NSE stock
//   data/intraday/<SYM>.js   5 trading days of 5-minute prices for NIFTY 500 stocks (for the chart)
//   data/daily/<SYM>.js      2 years of daily candles with volume for NIFTY 500 stocks (refreshed every 12 hours)
//   data/eod.json            daily closes for the other stocks (refreshed once a day, reused between runs)
//   data/universe.json       the NIFTY 500 symbol list (fallback if NSE's list cannot be downloaded)
//   data/sectors.json        the industry of each NIFTY 500 stock (for the screener's sector filter)
//   data/screener.js         screener metrics for NIFTY 500 stocks (tools/build-screener.js)
// Run by .github/workflows/update-indices.yml every 5 minutes in market hours, or by hand:
//   node tools/fetch-quotes.js            (add --daily or --eod to force those once-a-day parts)
// Source: Yahoo Finance (NSE prices, delayed). For education only; not an official or real-time feed.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "data");
const BATCH = 20, PARALLEL = 4;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const round2 = n => Math.round(n * 100) / 100;
const fileName = sym => sym.replace(/[^A-Za-z0-9]/g, "_"); // M&M -> M_M (same rule as paper-trading.js)

async function getText(url, tries = 3) {
 for (let i = 1; i <= tries; i++) {
  try {
   const r = await fetch(url, { headers: { "User-Agent": UA } });
   if (r.status === 429) throw new Error("rate limited");
   if (!r.ok) throw new Error(`HTTP ${r.status}`);
   return await r.text();
  } catch (e) {
   if (i === tries) throw e;
   await sleep(1500 * i * (e.message === "rate limited" ? 4 : 1));
  }
 }
}

// All listed NSE symbols, from the paper-trading search list.
function allSymbols() {
 const ctx = {};
 vm.createContext(ctx);
 vm.runInContext(fs.readFileSync(path.join(ROOT, "js", "paper-symbols.js"), "utf8") + ";this.S=NSE_SYMBOLS;", ctx);
 return ctx.S.map(([s]) => s);
}

// NIFTY 500 constituents: live 5-minute coverage.
async function coreUniverse() {
 const cache = path.join(DATA, "universe.json");
 try {
  const csv = await getText("https://nsearchives.nseindia.com/content/indices/ind_nifty500list.csv");
  const lines = csv.trim().split(/\r?\n/);
  const head = lines[0].split(",").map(h => h.trim().toLowerCase());
  const col = head.indexOf("symbol"), ind = head.indexOf("industry");
  const syms = lines.slice(1).map(l => l.split(",")[col]).filter(s => /^[A-Z0-9&_.-]+$/.test(s || ""));
  if (syms.length > 400) {
   fs.writeFileSync(cache, JSON.stringify(syms) + "\n");
   // Industry of each stock, for the screener's sector filter (NSE's file has no quoted commas).
   if (ind >= 0) fs.writeFileSync(path.join(DATA, "sectors.json"), JSON.stringify(Object.fromEntries(lines.slice(1).map(l => l.split(",")).filter(c => c[col] && c[ind]).map(c => [c[col].trim(), c[ind].trim()]))) + "\n");
   return syms;
  }
  throw new Error(`only ${syms.length} symbols`);
 } catch (e) {
  console.warn(`NIFTY 500 list download failed (${e.message}); using the saved list.`);
  return JSON.parse(fs.readFileSync(cache, "utf8"));
 }
}

// Yahoo "spark": up to 20 symbols per request.
async function spark(symbols, range, interval) {
 const url = `https://query1.finance.yahoo.com/v8/finance/spark?symbols=${symbols.map(s => encodeURIComponent(s + ".NS")).join(",")}&range=${range}&interval=${interval}`;
 return JSON.parse(await getText(url));
}
async function inBatches(symbols, range, interval, onSymbol) {
 const batches = [];
 for (let i = 0; i < symbols.length; i += BATCH) batches.push(symbols.slice(i, i + BATCH));
 let failed = 0;
 for (let i = 0; i < batches.length; i += PARALLEL) {
  await Promise.all(batches.slice(i, i + PARALLEL).map(async b => {
   try {
    const j = await spark(b, range, interval);
    b.forEach(sym => { const r = j[sym + ".NS"]; if (r && r.close && r.close.some(v => v > 0)) onSymbol(sym, r); });
   } catch (e) { failed++; console.warn(`Batch failed (${b[0]}…): ${e.message}`); }
  }));
  await sleep(250);
 }
 return failed;
}

// Previous close: Yahoo's previousClose, else the last close of the day before the latest point.
function prevCloseOf(r, t, c) {
 if (r.previousClose > 0) return r.previousClose;
 const lastDay = Math.floor((t[t.length - 1] + 19800) / 86400);
 for (let i = t.length - 1; i >= 0; i--) if (Math.floor((t[i] + 19800) / 86400) < lastDay) return c[i];
 return r.chartPreviousClose || null;
}

// Daily candles (open, high, low, close, volume) for the chart's 1D, 1W and 1M timeframes. Yahoo's chart API
// serves one symbol per request, so this runs at most every 12 hours. Days are stored as IST day numbers
// (days since 1 Jan 1970 in India time) to keep the files small.
async function fetchDaily(core) {
 const dir = path.join(DATA, "daily"), meta = path.join(dir, "_meta.json");
 fs.mkdirSync(dir, { recursive: true });
 let last = 0;
 try { last = new Date(JSON.parse(fs.readFileSync(meta, "utf8")).fetchedAt).getTime() || 0; } catch (e) { /* first run */ }
 if (Date.now() - last < 12 * 3600 * 1000 && !process.argv.includes("--daily")) { console.log("Daily candles reused."); return; }
 let ok = 0, failed = 0;
 for (let i = 0; i < core.length; i += PARALLEL * 2) {
  await Promise.all(core.slice(i, i + PARALLEL * 2).map(async sym => {
   try {
    const j = JSON.parse(await getText(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym + ".NS")}?range=2y&interval=1d`));
    const r = j.chart && j.chart.result && j.chart.result[0], q = r && r.indicators && r.indicators.quote && r.indicators.quote[0];
    if (!r || !r.timestamp || !q) throw new Error("no data");
    const d = { t: [], o: [], h: [], l: [], c: [], v: [] };
    r.timestamp.forEach((ts, k) => {
     if (!(q.close[k] > 0 && q.open[k] > 0 && q.high[k] > 0 && q.low[k] > 0)) return;
     const day = Math.floor((ts + 19800) / 86400);
     if (d.t[d.t.length - 1] === day) return; // duplicate row for the current day
     d.t.push(day); d.o.push(round2(q.open[k])); d.h.push(round2(q.high[k])); d.l.push(round2(q.low[k])); d.c.push(round2(q.close[k])); d.v.push(Math.round(q.volume[k] || 0));
    });
    if (!d.t.length) throw new Error("no rows");
    fs.writeFileSync(path.join(dir, fileName(sym) + ".js"), `window.MP_DAILY=window.MP_DAILY||{};window.MP_DAILY[${JSON.stringify(sym)}]=${JSON.stringify(d)};\n`);
    ok++;
   } catch (e) { failed++; }
  }));
  await sleep(300);
 }
 if (ok) fs.writeFileSync(meta, JSON.stringify({ fetchedAt: new Date().toISOString(), ok, failed }) + "\n");
 console.log(`Daily candles: ${ok} of ${core.length} NIFTY 500 stocks (${failed} failed).`);
}

async function main() {
 fs.mkdirSync(path.join(DATA, "intraday"), { recursive: true });
 const all = allSymbols();
 const core = (await coreUniverse()).filter(s => all.includes(s));
 const coreSet = new Set(core);
 const quotes = {};
 let marketTime = 0;

 // 1. Live coverage: 5 days of 5-minute prices.
 const failedCore = await inBatches(core, "5d", "5m", (sym, r) => {
  const t = [], c = [];
  r.timestamp.forEach((ts, i) => { const v = r.close[i]; if (v > 0) { t.push(ts); c.push(round2(v)); } });
  if (!c.length) return;
  const pc = prevCloseOf(r, t, c);
  fs.writeFileSync(path.join(DATA, "intraday", fileName(sym) + ".js"),
   `window.MP_INTRADAY=window.MP_INTRADAY||{};window.MP_INTRADAY[${JSON.stringify(sym)}]=${JSON.stringify({ pc: pc ? round2(pc) : null, t, c })};\n`);
  quotes[sym] = [c[c.length - 1], pc ? round2(pc) : null, t[t.length - 1], 1];
  marketTime = Math.max(marketTime, t[t.length - 1]);
 });
 console.log(`Live coverage: ${Object.keys(quotes).length} of ${core.length} NIFTY 500 stocks (${failedCore} failed batches).`);

 // 2. Everything else: daily closes, refreshed at most once every 12 hours.
 const eodFile = path.join(DATA, "eod.json");
 let eod = { fetchedAt: 0, q: {} };
 try { eod = JSON.parse(fs.readFileSync(eodFile, "utf8")); } catch (e) { /* first run */ }
 if (Date.now() - new Date(eod.fetchedAt || 0).getTime() > 12 * 3600 * 1000 || process.argv.includes("--eod")) {
  const rest = all.filter(s => !coreSet.has(s));
  const fresh = {};
  const failed = await inBatches(rest, "5d", "1d", (sym, r) => {
   const pts = r.timestamp.map((ts, i) => [ts, r.close[i]]).filter(p => p[1] > 0);
   if (!pts.length) return;
   const last = pts[pts.length - 1], prev = pts.length > 1 ? pts[pts.length - 2][1] : r.chartPreviousClose;
   fresh[sym] = [round2(last[1]), prev ? round2(prev) : null, last[0], 0];
  });
  // Keep earlier values for symbols that failed this time.
  eod = { fetchedAt: new Date().toISOString(), q: Object.assign({}, eod.q, fresh) };
  fs.writeFileSync(eodFile, JSON.stringify(eod) + "\n");
  console.log(`Daily closes: ${Object.keys(fresh).length} of ${rest.length} other stocks (${failed} failed batches).`);
 } else {
  console.log(`Daily closes reused from ${eod.fetchedAt}.`);
 }
 Object.entries(eod.q).forEach(([s, v]) => { if (!quotes[s]) quotes[s] = v; });

 if (!Object.keys(quotes).length) { console.error("No quotes fetched; keeping the previous files."); process.exit(1); }
 const out = { fetchedAt: new Date().toISOString(), marketTime: marketTime ? new Date(marketTime * 1000).toISOString() : null, q: quotes };
 fs.writeFileSync(path.join(DATA, "quotes.js"), `// Generated by tools/fetch-quotes.js — do not edit by hand. [last, previous close, unix time, 1 = live coverage]\nwindow.MP_QUOTES=${JSON.stringify(out)};\n`);
 console.log(`Wrote quotes for ${Object.keys(quotes).length} stocks; market time ${out.marketTime}.`);

 // 4. Daily candles for the longer chart timeframes (after the quotes, so a slow fetch never delays prices).
 await fetchDaily(core);

 // 5. Screener metrics from the daily candles and the latest prices (tools/build-screener.js).
 try { require("./build-screener.js").build(quotes); } catch (e) { console.warn(`Screener build failed: ${e.message}`); }
}

main().catch(e => { console.error(e); process.exit(1); });
