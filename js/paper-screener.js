// Stock screener for the paper-trading terminal: filter the NIFTY 500 by price action, trend, momentum,
// volatility and volume, with one-click preset screens, custom filters, sector filter, sorting, saved screens and
// CSV export. Data: data/screener.js (built from real daily candles by tools/build-screener.js).
// Results can be opened on the chart, added to the watchlist, or sent to the strategy backtester.
// api: { esc, fmt, toast, names, infoButton, loadScript(src), dataUrl(rel), onChart(sym), onWatch(sym), inWatch(sym),
//        onBacktest(sym | [sym]) }
const PaperScreener = (function () {
 // kind: num (≥, ≤, between) · days (happened within N trading days) · flag (yes / no) · dir (up / down)
 const FIELDS = {
  price: { label: "Price", unit: "₹", kind: "num", group: "Price" },
  chg: { label: "Change today", unit: "%", kind: "num", group: "Price" },
  r1w: { label: "1-week return", unit: "%", kind: "num", group: "Returns" },
  r1m: { label: "1-month return", unit: "%", kind: "num", group: "Returns" },
  r3m: { label: "3-month return", unit: "%", kind: "num", group: "Returns" },
  r6m: { label: "6-month return", unit: "%", kind: "num", group: "Returns" },
  r1y: { label: "1-year return", unit: "%", kind: "num", group: "Returns" },
  offHi: { label: "Distance from 52-week high", unit: "%", kind: "num", group: "52-week range", help: "0% = at the high; −20% = 20% below it" },
  offLo: { label: "Distance above 52-week low", unit: "%", kind: "num", group: "52-week range" },
  vsSma20: { label: "Price vs 20-day SMA", unit: "%", kind: "num", group: "Trend" },
  vsSma50: { label: "Price vs 50-day SMA", unit: "%", kind: "num", group: "Trend" },
  vsSma200: { label: "Price vs 200-day SMA", unit: "%", kind: "num", group: "Trend" },
  golden: { label: "Golden cross (50 over 200 SMA)", unit: "days ago", kind: "days", group: "Trend" },
  death: { label: "Death cross (50 under 200 SMA)", unit: "days ago", kind: "days", group: "Trend" },
  stDir: { label: "Supertrend direction", kind: "dir", group: "Trend" },
  adx: { label: "ADX (trend strength)", kind: "num", group: "Trend" },
  rsi: { label: "RSI 14", kind: "num", group: "Momentum" },
  stochK: { label: "Stochastic %K", kind: "num", group: "Momentum" },
  macdBull: { label: "MACD bullish crossover", unit: "days ago", kind: "days", group: "Momentum" },
  macdBear: { label: "MACD bearish crossover", unit: "days ago", kind: "days", group: "Momentum" },
  streak: { label: "Up (+) or down (−) days in a row", kind: "num", group: "Momentum" },
  brk20: { label: "Closed above the 20-day high", kind: "flag", group: "Breakouts" },
  brkdn20: { label: "Closed below the 20-day low", kind: "flag", group: "Breakouts" },
  gap: { label: "Gap at today's open", unit: "%", kind: "num", group: "Breakouts" },
  volRatio: { label: "Volume vs 20-day average", unit: "×", kind: "num", group: "Volume" },
  turnover: { label: "Average daily value traded", unit: "₹ cr", kind: "num", group: "Volume" },
  atrPct: { label: "ATR as % of price", unit: "%", kind: "num", group: "Volatility" },
  volat: { label: "Volatility (yearly)", unit: "%", kind: "num", group: "Volatility" },
  bbw: { label: "Bollinger band width", unit: "%", kind: "num", group: "Volatility" },
  squeeze: { label: "Band width percentile (0 = tightest in 6 months)", kind: "num", group: "Volatility" }
 };
 const PRESETS = [
  { id: "high52", name: "Near 52-week high", hint: "Within 3% of the high: strength", filters: [{ f: "offHi", op: "gte", a: -3 }], sort: ["offHi", -1] },
  { id: "low52", name: "Near 52-week low", hint: "Within 5% of the low: weakness or value?", filters: [{ f: "offLo", op: "lte", a: 5 }], sort: ["offLo", 1] },
  { id: "breakout", name: "20-day breakout on volume", hint: "Closed above the 20-day high with 1.5× volume", filters: [{ f: "brk20", op: "yes" }, { f: "volRatio", op: "gte", a: 1.5 }], sort: ["volRatio", -1] },
  { id: "golden", name: "Golden cross", hint: "50-day SMA crossed above the 200-day in the last 30 days", filters: [{ f: "golden", op: "within", a: 30 }], sort: ["golden", 1] },
  { id: "death", name: "Death cross", hint: "50-day SMA crossed below the 200-day in the last 30 days", filters: [{ f: "death", op: "within", a: 30 }], sort: ["death", 1] },
  { id: "oversold", name: "Oversold (RSI < 30)", hint: "Sharp falls: possible bounce, or a falling knife", filters: [{ f: "rsi", op: "lte", a: 30 }], sort: ["rsi", 1] },
  { id: "overbought", name: "Overbought (RSI > 70)", hint: "Strong rallies: momentum, or stretched", filters: [{ f: "rsi", op: "gte", a: 70 }], sort: ["rsi", -1] },
  { id: "uptrend", name: "Strong uptrend", hint: "Above the 50 and 200-day SMAs, ADX > 25, up 10%+ in 3 months", filters: [{ f: "vsSma50", op: "gte", a: 0 }, { f: "vsSma200", op: "gte", a: 0 }, { f: "adx", op: "gte", a: 25 }, { f: "r3m", op: "gte", a: 10 }], sort: ["r3m", -1] },
  { id: "pullback", name: "Pullback in an uptrend", hint: "Above the 200-day SMA, RSI 35–50, near the 20-day SMA", filters: [{ f: "vsSma200", op: "gte", a: 0 }, { f: "rsi", op: "between", a: 35, b: 50 }, { f: "vsSma20", op: "between", a: -3, b: 1 }], sort: ["vsSma200", -1] },
  { id: "macd", name: "MACD bullish crossover", hint: "MACD crossed above its signal line in the last 5 days", filters: [{ f: "macdBull", op: "within", a: 5 }], sort: ["macdBull", 1] },
  { id: "squeeze", name: "Bollinger squeeze", hint: "Bands at their tightest in 6 months: a big move may follow", filters: [{ f: "squeeze", op: "lte", a: 10 }], sort: ["squeeze", 1] },
  { id: "volume", name: "Volume surge", hint: "Volume at least twice the 20-day average", filters: [{ f: "volRatio", op: "gte", a: 2 }], sort: ["volRatio", -1] },
  { id: "gainers", name: "Top gainers today", hint: "Biggest rises today", filters: [{ f: "chg", op: "gte", a: 0 }], sort: ["chg", -1] },
  { id: "losers", name: "Top losers today", hint: "Biggest falls today", filters: [{ f: "chg", op: "lte", a: 0 }], sort: ["chg", 1] },
  { id: "lowvol", name: "Low volatility leaders", hint: "Up over a year with below-average volatility", filters: [{ f: "r1y", op: "gte", a: 15 }, { f: "volat", op: "lte", a: 25 }], sort: ["r1y", -1] }
 ];
 const DEFAULT_COLS = ["price", "chg", "r1m", "r1y", "rsi", "offHi", "volRatio"];
 const SAVE_KEY = "mp-screens";
 const PAGE = 50;

 function create(api) {
  const { esc } = api;
  const root = document.getElementById("ptScreenerPane");
  let data = null, rows = [], sectors = [], filters = [], sector = "", query = "", sort = ["r1m", -1], preset = null, shown = PAGE, result = [];
  const saved = () => { try { return JSON.parse(localStorage.getItem(SAVE_KEY)) || []; } catch (e) { return []; } };
  const setSaved = l => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(l)); } catch (e) { api.toast("Could not save: browser storage is blocked.", "error"); } };
  const tone = x => (x > 0 ? "pp-up" : x < 0 ? "pp-down" : "");
  const fmtV = (k, v) => {
   if (v === null || v === undefined) return "—";
   const f = FIELDS[k] || {};
   if (f.kind === "flag") return v ? "Yes" : "No";
   if (f.kind === "dir") return v > 0 ? "▲ Up" : "▼ Down";
   if (f.kind === "days") return v === 0 ? "today" : `${v}d ago`;
   if (k === "price") return api.fmt(v);
   if (f.unit === "%") return `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(2)}%`;
   if (f.unit === "×") return `${v.toFixed(2)}×`;
   if (k === "turnover") return v >= 100 ? Math.round(v).toLocaleString("en-IN") : v.toFixed(1);
   return Number.isInteger(v) ? String(v) : v.toFixed(1);
  };
  const colorOf = (k, v) => (FIELDS[k] && FIELDS[k].unit === "%" && k !== "atrPct" && k !== "volat" && k !== "bbw" ? tone(v) : k === "rsi" ? (v >= 70 ? "pp-down" : v <= 30 ? "pp-up" : "") : "");

  // ---------- Filtering ----------
  function pass(r, f) {
   const v = r[f.f];
   switch (f.op) {
    case "gte": return v !== null && v >= Number(f.a);
    case "lte": return v !== null && v <= Number(f.a);
    case "between": return v !== null && v >= Math.min(Number(f.a), Number(f.b)) && v <= Math.max(Number(f.a), Number(f.b));
    case "within": return v !== null && v <= Number(f.a);
    case "yes": return v === 1;
    case "no": return v === 0;
    case "up": return v === 1;
    case "down": return v === -1;
    default: return true;
   }
  }
  function compute() {
   const q = query.trim().toUpperCase();
   result = rows.filter(r => (!sector || r.sector === sector) && (!q || r.sym.includes(q) || r.name.toUpperCase().includes(q)) && filters.every(f => pass(r, f)));
   const [k, dir] = sort;
   result.sort((a, b) => {
    const x = a[k], y = b[k];
    if (x === null || x === undefined) return 1;
    if (y === null || y === undefined) return -1;
    return (x > y ? 1 : x < y ? -1 : 0) * dir;
   });
  }

  // ---------- Rendering ----------
  const opsFor = kind => (kind === "flag" ? [["yes", "is yes"], ["no", "is no"]] : kind === "dir" ? [["up", "is up"], ["down", "is down"]] : kind === "days" ? [["within", "within the last (days)"]] : [["gte", "≥"], ["lte", "≤"], ["between", "between"]]);
  function filterRow(f, i) {
   const def = FIELDS[f.f], ops = opsFor(def.kind), needsA = ["gte", "lte", "between", "within"].includes(f.op);
   const groups = [...new Set(Object.values(FIELDS).map(x => x.group))];
   return `<div class="sc-filter" data-i="${i}">
    <select data-ff="f" aria-label="Measure">${groups.map(g => `<optgroup label="${g}">${Object.entries(FIELDS).filter(([, x]) => x.group === g).map(([k, x]) => `<option value="${k}"${k === f.f ? " selected" : ""}>${esc(x.label)}</option>`).join("")}</optgroup>`).join("")}</select>
    <select data-ff="op" aria-label="Condition">${ops.map(([v, l]) => `<option value="${v}"${v === f.op ? " selected" : ""}>${l}</option>`).join("")}</select>
    ${needsA ? `<input data-ff="a" type="number" step="any" value="${esc(f.a ?? "")}" aria-label="Value">` : ""}${f.op === "between" ? `<span>and</span><input data-ff="b" type="number" step="any" value="${esc(f.b ?? "")}" aria-label="Upper value">` : ""}
    ${def.unit && needsA ? `<small>${esc(def.unit)}</small>` : ""}
    <button type="button" class="pp-mini pt-del" data-fdel="${i}" aria-label="Remove filter">✕</button></div>`;
  }
  function render() {
   const list = saved(), asOf = data ? new Date(data.asOfDay * 86400000).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";
   root.innerHTML = `<div class="ppa-toolbar"><h3 class="ppa-title">Stock screener</h3><button type="button" class="pt-src" data-disclose="screener"><i class="pt-dot ok"></i>NSE · NIFTY 500 · daily data to ${esc(asOf)} · Yahoo Finance ⓘ</button></div>
    <p class="ppa-hint">Find stocks that match a setup, then study them on the chart, add them to a watchlist, or backtest a strategy on them. Start with a ready-made screen or build your own filters.</p>
    <div class="sc-presets" role="group" aria-label="Ready-made screens">${PRESETS.map(p => `<button type="button" class="ppa-chip${preset === p.id ? " active" : ""}" data-preset="${p.id}" aria-pressed="${preset === p.id}" title="${esc(p.hint)}">${esc(p.name)}</button>`).join("")}</div>
    <section class="ppa-panel sc-builder">
     <h4><span>Filters <small class="ppa-time">a stock must pass all of them</small></span><span class="sc-saved"><select data-scload aria-label="Saved screens"><option value="">${list.length ? `Saved screens (${list.length})` : "No saved screens"}</option>${list.map((s, i) => `<option value="${i}">${esc(s.name)}</option>`).join("")}</select><button type="button" class="pp-btn" data-scsave>💾 Save screen</button></span></h4>
     <div data-filters>${filters.map(filterRow).join("") || `<p class="ppa-empty ppa-empty-sm">No filters: showing every NIFTY 500 stock. Pick a ready-made screen above or add a filter.</p>`}</div>
     <div class="sc-row">
      <button type="button" class="pp-btn" data-fadd>+ Add filter</button>
      <label class="pt-field"><span>Sector</span><select data-sector><option value="">All sectors</option>${sectors.map(s => `<option${s === sector ? " selected" : ""}>${esc(s)}</option>`).join("")}</select></label>
      <label class="pt-field"><span>Name or symbol</span><input data-query type="search" value="${esc(query)}" placeholder="e.g. bank"></label>
      <button type="button" class="pp-btn" data-freset>Clear all</button>
     </div>
    </section>
    <div data-results></div>`;
   renderResults();
  }
  function renderResults() {
   compute();
   const box = root.querySelector("[data-results]");
   if (!box) return;
   const extra = [...new Set(filters.map(f => f.f))].filter(k => !DEFAULT_COLS.includes(k) && FIELDS[k]);
   const cols = DEFAULT_COLS.concat(extra), [sk, sd] = sort;
   const short = { price: "Price", chg: "Today", r1m: "1M", r1y: "1Y", rsi: "RSI", offHi: "From 52W high", volRatio: "Vol ×" };
   const th = k => `<th class="num"><button type="button" class="sb-sort" data-sort="${k}" title="${esc(FIELDS[k].label)}">${esc(short[k] || FIELDS[k].label)}${sk === k ? (sd > 0 ? " ▲" : " ▼") : ""}</button></th>`;
   box.innerHTML = `<div class="ppa-toolbar"><strong class="sc-count">${result.length} stock${result.length === 1 ? "" : "s"} match${result.length === 1 ? "es" : ""}</strong>
     <div class="sb-actions"><button type="button" class="pp-btn" data-sbacktest ${result.length ? "" : "disabled"}>🧪 Backtest a strategy on these</button><button type="button" class="pp-btn" data-sccsv ${result.length ? "" : "disabled"}>⤓ CSV</button></div></div>
    ${result.length ? `<div class="ppa-table-wrap sc-table"><table class="ppa-table"><thead><tr><th><button type="button" class="sb-sort" data-sort="sym">Stock${sk === "sym" ? (sd > 0 ? " ▲" : " ▼") : ""}</button></th>${cols.map(th).join("")}<th>Trend</th><th><span class="sr-only">Actions</span></th></tr></thead>
     <tbody>${result.slice(0, shown).map(r => `<tr>
      <td><button type="button" class="ppa-sym" data-chart="${esc(r.sym)}" title="Open the chart"><strong>${esc(r.sym)}</strong><small>${esc(r.name || r.sector)}</small></button></td>
      ${cols.map(k => `<td class="num ${colorOf(k, r[k])}">${fmtV(k, r[k])}</td>`).join("")}
      <td class="sc-trend" title="Price above the 50-day SMA · above the 200-day SMA · Supertrend up"><i class="${r.vsSma50 > 0 ? "on" : ""}">50</i><i class="${r.vsSma200 > 0 ? "on" : ""}">200</i><i class="${r.stDir > 0 ? "on" : ""}">ST</i></td>
      <td class="num ppa-acts"><button type="button" class="pp-mini" data-chart="${esc(r.sym)}" aria-label="Chart ${esc(r.sym)}" title="Chart">📈</button><button type="button" class="pp-mini" data-watch="${esc(r.sym)}" aria-label="${api.inWatch(r.sym) ? "In watchlist" : `Add ${esc(r.sym)} to watchlist`}" title="${api.inWatch(r.sym) ? "In watchlist" : "Add to watchlist"}">${api.inWatch(r.sym) ? "★" : "☆"}</button><button type="button" class="pp-mini" data-bt="${esc(r.sym)}" aria-label="Backtest ${esc(r.sym)}" title="Backtest a strategy on this stock">🧪</button></td></tr>`).join("")}</tbody></table></div>
     ${result.length > shown ? `<button type="button" class="pp-btn sc-more" data-more>Show ${Math.min(PAGE, result.length - shown)} more (${result.length - shown} left)</button>` : ""}`
    : `<p class="ppa-empty">No stocks pass every filter. Loosen a value or remove a filter.</p>`}`;
  }

  function readFilters() {
   filters = [...root.querySelectorAll(".sc-filter")].map(row => {
    const g = n => row.querySelector(`[data-ff="${n}"]`);
    return { f: g("f").value, op: g("op").value, a: g("a") ? g("a").value : undefined, b: g("b") ? g("b").value : undefined };
   });
  }
  async function load() {
   if (data) return;
   try {
    await api.loadScript(api.dataUrl("data/screener.js"));
    data = window.MP_SCREENER;
    rows = data.rows.map(a => { const o = {}; data.columns.forEach((k, i) => { o[k] = a[i]; }); o.name = api.names.get(o.sym) || ""; return o; });
    sectors = [...new Set(rows.map(r => r.sector).filter(Boolean))].sort();
    render();
   } catch (e) { root.innerHTML = `<p class="ppa-empty">The screener data could not be loaded. Check your connection and try again.</p>`; }
  }

  // ---------- Events ----------
  root.addEventListener("click", e => {
   const b = e.target.closest("button");
   if (!b) return;
   if (b.dataset.preset) {
    const p = PRESETS.find(x => x.id === b.dataset.preset);
    if (preset === p.id) { preset = null; filters = []; } else { preset = p.id; filters = JSON.parse(JSON.stringify(p.filters)); sort = p.sort.slice(); }
    shown = PAGE; render();
   }
   else if (b.hasAttribute("data-fadd")) { readFilters(); filters.push({ f: "r3m", op: "gte", a: 10 }); preset = null; render(); const sel = root.querySelectorAll(".sc-filter select"); if (sel.length) sel[sel.length - 2].focus(); }
   else if (b.dataset.fdel !== undefined) { readFilters(); filters.splice(Number(b.dataset.fdel), 1); preset = null; render(); }
   else if (b.hasAttribute("data-freset")) { filters = []; sector = ""; query = ""; preset = null; render(); }
   else if (b.dataset.sort) { sort = [b.dataset.sort, sort[0] === b.dataset.sort ? -sort[1] : b.dataset.sort === "sym" ? 1 : -1]; renderResults(); }
   else if (b.hasAttribute("data-more")) { shown += PAGE; renderResults(); }
   else if (b.dataset.chart) api.onChart(b.dataset.chart);
   else if (b.dataset.watch) { api.onWatch(b.dataset.watch); renderResults(); }
   else if (b.dataset.bt) api.onBacktest(b.dataset.bt);
   else if (b.hasAttribute("data-sbacktest")) api.onBacktest(result.map(r => r.sym));
   else if (b.hasAttribute("data-scsave")) {
    readFilters();
    const name = prompt("Name this screen:", preset ? PRESETS.find(p => p.id === preset).name : "My screen");
    if (!name) return;
    setSaved(saved().filter(s => s.name !== name).concat([{ name: name.slice(0, 60), filters, sector, sort }]));
    render(); api.toast(`Saved the screen "${name}".`, "ok");
   }
   else if (b.hasAttribute("data-sccsv")) {
    const cols = ["sym", "name", "sector"].concat(Object.keys(FIELDS));
    const csv = [cols.map(k => (FIELDS[k] ? `${FIELDS[k].label}${FIELDS[k].unit ? ` (${FIELDS[k].unit})` : ""}` : k)), ...result.map(r => cols.map(k => r[k] ?? ""))].map(l => l.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv" }));
    a.download = "screener-results.csv";
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
   }
  });
  root.addEventListener("change", e => {
   const t = e.target;
   if (t.matches("[data-scload]") && t.value !== "") { const s = saved()[Number(t.value)]; filters = s.filters; sector = s.sector || ""; sort = s.sort || sort; preset = null; render(); return; }
   if (t.matches("[data-sector]")) { sector = t.value; shown = PAGE; renderResults(); return; }
   if (t.closest(".sc-filter")) {
    readFilters();
    preset = null;
    if (t.dataset.ff === "f") {
     // A different measure may need different conditions: start it with a sensible default.
     const i = Number(t.closest(".sc-filter").dataset.i), kind = FIELDS[t.value].kind;
     filters[i] = { f: t.value, op: opsFor(kind)[0][0], a: kind === "days" ? 10 : kind === "num" ? 0 : undefined };
     render();
     root.querySelectorAll(".sc-filter")[i].querySelector("select").focus();
     return;
    }
    if (t.dataset.ff === "op") { render(); return; }
    shown = PAGE; renderResults();
   }
  });
  root.addEventListener("input", e => {
   if (e.target.matches("[data-query]")) { query = e.target.value; shown = PAGE; renderResults(); }
   else if (e.target.matches('.sc-filter input')) { readFilters(); preset = null; shown = PAGE; renderResults(); }
  });

  return {
   show() { if (!data) { root.innerHTML = `<p class="ppa-empty">Loading the screener…</p>`; load(); } else renderResults(); },
   results: () => (data ? result.map(r => r.sym) : null)
  };
 }
 return { create, FIELDS, PRESETS };
})();
