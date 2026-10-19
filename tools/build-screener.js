// Builds data/screener.js: technical screener metrics for every NIFTY 500 stock, from the daily candles in
// data/daily/ (and the latest prices, when tools/fetch-quotes.js passes them in). The browser loads this one
// small file instead of ~500 candle files. Run by hand with:  node tools/build-screener.js
// Uses the same indicator maths as the chart (js/paper-indicators.js).
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "data");
const round = (n, d = 2) => (n === null || n === undefined || !isFinite(n) ? null : Math.round(n * 10 ** d) / 10 ** d);
const istDay = sec => Math.floor((sec + 19800) / 86400);

function indicators() {
 const ctx = {};
 vm.createContext(ctx);
 vm.runInContext(fs.readFileSync(path.join(ROOT, "js", "paper-indicators.js"), "utf8") + ";this.PI=PaperIndicators;", ctx);
 return ctx.PI;
}

// Column order of each row in the output. Keep in sync with FIELDS in js/paper-screener.js.
const COLUMNS = ["sym", "sector", "price", "chg", "r1w", "r1m", "r3m", "r6m", "r1y", "hi52", "lo52", "offHi", "offLo", "rsi",
 "vsSma20", "vsSma50", "vsSma200", "golden", "death", "macdBull", "macdBear", "adx", "atrPct", "volRatio", "turnover",
 "bbw", "squeeze", "brk20", "brkdn20", "gap", "streak", "stDir", "stochK", "volat", "lastDay"];

function metrics(sym, bars, PI) {
 const n = bars.length;
 if (n < 60) return null;
 const c = bars.map(b => b.close), last = c[n - 1], prev = c[n - 2];
 const ret = k => (n > k ? (last / c[n - 1 - k] - 1) * 100 : null);
 const yr = bars.slice(-252), hi52 = Math.max(...yr.map(b => b.high)), lo52 = Math.min(...yr.map(b => b.low));
 const sma = k => PI.sma(c, k)[n - 1];
 const vsMa = k => { const v = sma(k); return v ? (last / v - 1) * 100 : null; };
 // Bars since a cross of series a over series b in the last `within` bars (positive cross: a moves above b).
 function since(a, b, up, within) {
  for (let i = n - 1; i > Math.max(0, n - 1 - within); i--) {
   if ([a[i], b[i], a[i - 1], b[i - 1]].some(v => v === null)) return null;
   if (up ? a[i] > b[i] && a[i - 1] <= b[i - 1] : a[i] < b[i] && a[i - 1] >= b[i - 1]) return n - 1 - i;
  }
  return null;
 }
 const s50 = PI.sma(c, 50), s200 = PI.sma(c, 200), m = PI.macd(c);
 const atr = PI.atr(bars, 14)[n - 1], adx = PI.adx(bars, 14).adx[n - 1], st = PI.supertrend(bars, 10, 3);
 const bb = PI.bollinger(c, 20, 2), width = c.map((_, i) => (bb.mid[i] ? ((bb.upper[i] - bb.lower[i]) / bb.mid[i]) * 100 : null));
 const recentW = width.slice(-120).filter(v => v !== null), wNow = width[n - 1];
 const vols = bars.map(b => b.volume), volBar = vols[n - 1] > 0 ? n - 1 : n - 2; // today's volume may not be in yet
 const avgVol = vols.slice(Math.max(0, volBar - 20), volBar).reduce((a, b) => a + b, 0) / Math.min(20, volBar);
 const turnover = bars.slice(-21, -1).reduce((a, b) => a + b.close * b.volume, 0) / 20 / 1e7; // ₹ crore per day
 const prior20 = bars.slice(n - 21, n - 1);
 let streak = 0;
 for (let i = n - 1; i > 0; i--) {
  const d = Math.sign(c[i] - c[i - 1]);
  if (!d || (streak && Math.sign(streak) !== d)) break;
  streak += d;
 }
 const rets = c.slice(-64).map((v, i, a) => (i ? Math.log(v / a[i - 1]) : null)).filter(v => v !== null);
 const mean = rets.reduce((a, b) => a + b, 0) / rets.length;
 const volat = Math.sqrt(rets.reduce((a, b) => a + (b - mean) ** 2, 0) / rets.length) * Math.sqrt(252) * 100;
 const out = {
  sym, price: round(last), chg: round((last / prev - 1) * 100), r1w: round(ret(5)), r1m: round(ret(21)), r3m: round(ret(63)), r6m: round(ret(126)), r1y: round(ret(250)),
  hi52: round(hi52), lo52: round(lo52), offHi: round((last / hi52 - 1) * 100), offLo: round((last / lo52 - 1) * 100), rsi: round(PI.rsi(c, 14)[n - 1], 1),
  vsSma20: round(vsMa(20)), vsSma50: round(vsMa(50)), vsSma200: round(vsMa(200)),
  golden: since(s50, s200, true, 60), death: since(s50, s200, false, 60), macdBull: since(m.macd, m.signal, true, 10), macdBear: since(m.macd, m.signal, false, 10),
  adx: round(adx, 1), atrPct: round(atr ? (atr / last) * 100 : null), volRatio: round(avgVol ? vols[volBar] / avgVol : null), turnover: round(turnover, 1),
  bbw: round(wNow), squeeze: recentW.length > 20 && wNow !== null ? Math.round((recentW.filter(v => v < wNow).length / recentW.length) * 100) : null,
  brk20: last > Math.max(...prior20.map(b => b.high)) ? 1 : 0, brkdn20: last < Math.min(...prior20.map(b => b.low)) ? 1 : 0,
  gap: round((bars[n - 1].open / prev - 1) * 100), streak, stDir: st.up[n - 1] === null ? null : st.up[n - 1] ? 1 : -1,
  stochK: round(PI.stochastic(bars).k[n - 1], 1), volat: round(volat, 1), lastDay: istDay(bars[n - 1].time)
 };
 return out;
}

// quotes (optional): { SYM: [last, previousClose, unixTime, live] } from tools/fetch-quotes.js. A price from a
// newer day than the last daily candle becomes today's candle; one from the same day updates its close.
function build(quotes) {
 const PI = indicators(), dir = path.join(DATA, "daily");
 const ctx = {}; ctx.window = ctx;
 vm.createContext(ctx);
 const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith(".js")) : [];
 files.forEach(f => vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx));
 let sectors = {};
 try { sectors = JSON.parse(fs.readFileSync(path.join(DATA, "sectors.json"), "utf8")); } catch (e) { /* optional */ }
 const rows = [];
 let asOf = 0;
 Object.entries(ctx.MP_DAILY || {}).forEach(([sym, d]) => {
  const bars = d.t.map((day, i) => ({ time: day * 86400 - 19800, open: d.o[i], high: d.h[i], low: d.l[i], close: d.c[i], volume: d.v[i] }));
  const q = quotes && quotes[sym];
  if (q && q[0] > 0 && bars.length) {
   const qd = istDay(q[2]), last = bars[bars.length - 1], ld = istDay(last.time);
   if (qd > ld) bars.push({ time: qd * 86400 - 19800, open: q[1] || last.close, high: Math.max(q[0], q[1] || q[0]), low: Math.min(q[0], q[1] || q[0]), close: q[0], volume: 0 });
   else if (qd === ld) Object.assign(last, { close: q[0], high: Math.max(last.high, q[0]), low: Math.min(last.low, q[0]) });
  }
  const m = metrics(sym, bars, PI);
  if (!m) return;
  m.sector = sectors[sym] || "";
  asOf = Math.max(asOf, m.lastDay);
  rows.push(COLUMNS.map(k => (m[k] === undefined ? null : m[k])));
 });
 rows.sort((a, b) => (a[0] < b[0] ? -1 : 1));
 const out = { builtAt: new Date().toISOString(), asOfDay: asOf, columns: COLUMNS, rows };
 fs.writeFileSync(path.join(DATA, "screener.js"), `// Generated by tools/build-screener.js — do not edit by hand.\nwindow.MP_SCREENER=${JSON.stringify(out)};\n`);
 console.log(`Screener: ${rows.length} stocks (${(fs.statSync(path.join(DATA, "screener.js")).size / 1024).toFixed(0)} KB).`);
 return out;
}

module.exports = { build, COLUMNS };
if (require.main === module) {
 // Standalone: use the prices in data/quotes.js when present.
 let quotes = null;
 try { const c = {}; c.window = c; vm.createContext(c); vm.runInContext(fs.readFileSync(path.join(DATA, "quotes.js"), "utf8"), c); quotes = c.MP_QUOTES.q; } catch (e) { /* optional */ }
 build(quotes);
}
