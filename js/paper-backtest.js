// Strategy builder and backtest screen for the paper-trading terminal (the engine is js/paper-strategy.js).
// Build buy and sell rules from indicators (or start from a template), add stop-loss, target, trailing stop and
// time limit, choose position size, and test on one NIFTY 500 stock, your watchlist or the screener's results.
// Strategies can be saved in this browser and exported or imported as JSON.
// api: { esc, money, signed, fmt, toast, names, infoButton, plan(), slippageOn(), loadBars(sym) -> Promise<bars>,
//        covered() -> Promise<[sym]>, watchlist() -> [sym], screenerList() -> [sym] | null, onChart(sym), defaultSymbol() }
const PaperBacktest = (function () {
 const S = PaperStrategy;
 const SAVE_KEY = "mp-strategies";
 const MAX_BASKET = 60;
 const GROUPS = [["Price and averages", ["close", "open", "high", "low", "sma", "ema"]], ["Bands and trend", ["bbUpper", "bbMid", "bbLower", "supertrend", "psar", "highest", "lowest"]],
  ["Oscillators", ["rsi", "stochK", "stochD", "macd", "macdSignal", "macdHist", "adx", "pdi", "mdi", "cci", "mfi", "atrPct", "roc"]], ["Volume", ["volume", "volSma"]], ["Fixed number", ["value"]]];
 const FAMILY_COLORS = ["#ffbf78", "#a994ff", "#45a9d9", "#ff8ed1", "#2ec4b6", "#f4d35e"];
 const clone = x => JSON.parse(JSON.stringify(x));
 // What an indicator is usually compared with, used when the left side of a condition changes.
 const PARTNER = {
  rsi: { k: "value", v: 50 }, stochK: { k: "stochD" }, stochD: { k: "value", v: 50 }, macd: { k: "macdSignal" }, macdSignal: { k: "macd" }, macdHist: { k: "value", v: 0 },
  adx: { k: "value", v: 25 }, pdi: { k: "mdi", n: 14 }, mdi: { k: "pdi", n: 14 }, cci: { k: "value", v: 100 }, mfi: { k: "value", v: 50 }, atrPct: { k: "value", v: 2 },
  roc: { k: "value", v: 0 }, volume: { k: "volSma", n: 20 }, volSma: { k: "volume" }, value: { k: "rsi", n: 14 }
 };

 function create(api) {
  const { esc, money, signed } = api;
  const root = document.getElementById("ptStrategyPane");
  let strat = clone(S.TEMPLATES[0]), covered = [], running = false, charts = [], lastBasket = null;
  const ui = { universe: "one", sym: "", capital: 1000000, sizePct: 100 };
  try { Object.assign(ui, JSON.parse(localStorage.getItem("mp-backtest-ui")) || {}); } catch (e) { /* storage blocked */ }
  const saveUi = () => { try { localStorage.setItem("mp-backtest-ui", JSON.stringify(ui)); } catch (e) { /* storage blocked */ } };
  const saved = () => { try { return JSON.parse(localStorage.getItem(SAVE_KEY)) || []; } catch (e) { return []; } };
  const setSaved = list => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(list)); } catch (e) { api.toast("Could not save: browser storage is blocked.", "error"); } };
  const pct = (x, d = 2) => (x === null || x === undefined || !isFinite(x) ? "—" : `${x >= 0 ? "+" : "−"}${Math.abs(x).toFixed(d)}%`);
  const tone = x => (x > 0 ? "pp-up" : x < 0 ? "pp-down" : "");
  const num = x => (x === null || x === undefined ? "" : x);

  // ---------- Builder ----------
  function operandHtml(o, role) {
   const d = S.OPERANDS[o.k] || S.OPERANDS.close;
   return `<span class="sb-op" data-role="${role}"><select data-f="k" aria-label="${role === "a" ? "Indicator" : "Compared with"}">${GROUPS.map(([g, ks]) => `<optgroup label="${g}">${ks.map(k => `<option value="${k}"${k === o.k ? " selected" : ""}>${esc(S.OPERANDS[k].label)}</option>`).join("")}</optgroup>`).join("")}</select>${(d.params || []).map(([k, label, def]) => `<input data-f="${k}" type="number" step="${k === "v" || k === "m" ? "any" : "1"}" min="${k === "v" ? "" : "1"}" value="${esc(num(o[k] !== undefined ? o[k] : def))}" aria-label="${esc(label)}" title="${esc(label)}">`).join("")}</span>`;
  }
  function rulesHtml(group, g) {
   return `<div class="sb-rules" data-group="${group}">${g.rules.map((r, i) => `<div class="sb-rule" data-i="${i}">${operandHtml(r.a, "a")}<select data-f="op" aria-label="Condition">${S.OPS.map(([v, l]) => `<option value="${v}"${v === r.op ? " selected" : ""}>${l}</option>`).join("")}</select>${operandHtml(r.b, "b")}<button type="button" class="pp-mini pt-del" data-sdel="${group}:${i}" aria-label="Remove this condition">✕</button></div>`).join("") || `<p class="ppa-empty ppa-empty-sm">${group === "entry" ? "Add at least one buy condition." : "No sell conditions: trades exit only by stop-loss, target, trailing stop or time limit."}</p>`}</div>`;
  }
  function render() {
   const list = saved(), r = strat.risk || {};
   charts.forEach(c => c.remove()); charts = [];
   root.innerHTML = `<div class="ppa-toolbar"><h3 class="ppa-title">Strategy builder &amp; backtest ${api.infoButton("backtest", "How backtesting works")}</h3><span class="pp-tag">REAL NSE DAILY DATA</span></div>
    <p class="ppa-hint">Describe a trading idea as rules, then see how it would have done on about two years of real daily prices, with charges and slippage. A good backtest is a reason to practise a strategy, not proof that it will work.</p>
    <form class="sb-form" data-sform novalidate>
     <section class="ppa-panel"><h4>1. Strategy</h4>
      <div class="sb-row">
       <label class="pt-field"><span>Start from a template</span><select data-stemplate><option value="">Choose…</option>${S.TEMPLATES.map(t => `<option value="${t.id}">${esc(t.name)}</option>`).join("")}</select></label>
       <label class="pt-field"><span>Saved strategies (${list.length})</span><select data-sload><option value="">${list.length ? "Load…" : "None saved yet"}</option>${list.map((t, i) => `<option value="${i}">${esc(t.name)}</option>`).join("")}</select></label>
       <label class="pt-field sb-name"><span>Name</span><input data-sname maxlength="60" value="${esc(strat.name || "")}"></label>
      </div>
      <div class="sb-actions"><button type="button" class="pp-btn" data-ssave>💾 Save</button><button type="button" class="pp-btn" data-sdelete ${list.some(t => t.name === strat.name) ? "" : "disabled"}>🗑 Delete saved</button><button type="button" class="pp-btn" data-sexport>⤓ Export JSON</button><label class="pp-btn pt-file">⤒ Import JSON<input type="file" accept="application/json,.json" data-simport></label></div>
     </section>
     <section class="ppa-panel"><h4>2. Buy when <select class="sb-mode" data-smode="entry" aria-label="Combine buy conditions"><option value="all"${strat.entry.mode !== "any" ? " selected" : ""}>all conditions are true</option><option value="any"${strat.entry.mode === "any" ? " selected" : ""}>any condition is true</option></select></h4>
      ${rulesHtml("entry", strat.entry)}<button type="button" class="pp-btn" data-sadd="entry">+ Add buy condition</button></section>
     <section class="ppa-panel"><h4>3. Sell when <select class="sb-mode" data-smode="exit" aria-label="Combine sell conditions"><option value="any"${strat.exit.mode !== "all" ? " selected" : ""}>any condition is true</option><option value="all"${strat.exit.mode === "all" ? " selected" : ""}>all conditions are true</option></select></h4>
      ${rulesHtml("exit", strat.exit)}<button type="button" class="pp-btn" data-sadd="exit">+ Add sell condition</button>
      <div class="sb-risk">
       <label class="pt-field"><span>Stop-loss %</span><input data-risk="stop" type="number" min="0.5" max="50" step="0.5" value="${num(r.stop)}" placeholder="off"></label>
       <label class="pt-field"><span>ATR stop (× ATR 14)</span><input data-risk="atrStop" type="number" min="0.5" max="10" step="0.5" value="${num(r.atrStop)}" placeholder="off"></label>
       <label class="pt-field"><span>Trailing stop %</span><input data-risk="trail" type="number" min="0.5" max="50" step="0.5" value="${num(r.trail)}" placeholder="off"></label>
       <label class="pt-field"><span>Profit target %</span><input data-risk="target" type="number" min="0.5" max="500" step="0.5" value="${num(r.target)}" placeholder="off"></label>
       <label class="pt-field"><span>Time limit (days)</span><input data-risk="maxBars" type="number" min="1" max="500" step="1" value="${num(r.maxBars)}" placeholder="off"></label>
      </div></section>
     <section class="ppa-panel"><h4>4. Test on</h4>
      <div class="pt-chips" role="radiogroup" aria-label="Stocks to test">
       <label><input type="radio" name="universe" value="one" ${ui.universe === "one" ? "checked" : ""}><span>One stock</span></label>
       <label><input type="radio" name="universe" value="watch" ${ui.universe === "watch" ? "checked" : ""}><span>My watchlist</span></label>
       <label><input type="radio" name="universe" value="screener" ${ui.universe === "screener" ? "checked" : ""}><span>Screener results</span></label>
      </div>
      <div class="sb-row">
       <label class="pt-field sb-one"><span>Stock (NIFTY 500)</span><input name="sym" list="sbSyms" value="${esc(ui.sym || api.defaultSymbol())}" autocomplete="off" spellcheck="false"></label>
       <datalist id="sbSyms">${covered.map(s => `<option value="${esc(s)}">${esc(api.names.get(s) || "")}</option>`).join("")}</datalist>
       <label class="pt-field"><span>Starting capital (₹)</span><input name="capital" type="number" min="10000" step="10000" value="${ui.capital}"></label>
       <label class="pt-field"><span>Invest per trade (% of capital)</span><input name="sizePct" type="number" min="1" max="100" step="1" value="${ui.sizePct}"></label>
      </div>
      <p class="ppa-hint" data-suniverse></p>
      <p class="ppa-hint">Delivery (CNC) charges on the plan chosen in Funds${api.slippageOn() ? ", plus estimated slippage" : ", no slippage (turned off in Funds)"} ${api.infoButton("slippage")}. Long trades only, one position at a time.</p>
     </section>
     <section class="ppa-panel sb-summary"><h4>Your strategy in plain words</h4><p data-stext></p></section>
     <p class="pp-msg" data-smsg aria-live="polite"></p>
     <button type="submit" class="pt-buy sb-run" ${running ? "disabled" : ""}>▶ Run backtest</button>
    </form>
    <div class="sb-results" data-sresults aria-live="polite"></div>`;
   updateText();
  }
  function readOperand(el) {
   const o = { k: el.querySelector('[data-f="k"]').value };
   el.querySelectorAll("input[data-f]").forEach(i => { if (i.value !== "") o[i.dataset.f] = Number(i.value); });
   return o;
  }
  function readForm() {
   const f = root.querySelector("[data-sform]");
   strat.name = f.querySelector("[data-sname]").value.trim() || "My strategy";
   ["entry", "exit"].forEach(g => {
    strat[g].mode = f.querySelector(`[data-smode="${g}"]`).value;
    strat[g].rules = [...f.querySelectorAll(`[data-group="${g}"] .sb-rule`)].map(row => ({ a: readOperand(row.querySelector('[data-role="a"]')), op: row.querySelector('[data-f="op"]').value, b: readOperand(row.querySelector('[data-role="b"]')) }));
   });
   strat.risk = {};
   f.querySelectorAll("[data-risk]").forEach(i => { if (i.value !== "" && Number(i.value) > 0) strat.risk[i.dataset.risk] = Number(i.value); });
   ui.universe = f.universe.value; ui.sym = f.sym.value.trim().toUpperCase();
   ui.capital = Math.max(10000, Number(f.capital.value) || 1000000); ui.sizePct = Math.min(100, Math.max(1, Number(f.sizePct.value) || 100));
   saveUi();
  }
  function updateText() {
   const f = root.querySelector("[data-sform]");
   if (!f) return;
   root.querySelector("[data-stext]").textContent = S.strategyText(strat);
   const u = ui.universe, wl = api.watchlist().filter(s => covered.includes(s)), sc = api.screenerList();
   root.querySelector(".sb-one").hidden = u !== "one";
   root.querySelector("[data-suniverse]").textContent = u === "watch" ? `${wl.length} stock${wl.length === 1 ? "" : "s"} from your watchlist have daily data${wl.length > MAX_BASKET ? ` (the first ${MAX_BASKET} are tested)` : ""}.`
    : u === "screener" ? (sc && sc.length ? `${Math.min(sc.length, MAX_BASKET)} stock${sc.length === 1 ? "" : "s"} from your last screen${sc.length > MAX_BASKET ? ` (first ${MAX_BASKET} of ${sc.length})` : ""}.` : "Run a screen in the Screener section first; its results are tested here.")
    : "About 2 years of daily candles. Indicators need some history first (for example 200 days for a 200-day average), so trading starts after that.";
  }

  // ---------- Running ----------
  async function run() {
   readForm();
   const msg = root.querySelector("[data-smsg]");
   if (!strat.entry.rules.length) { msg.textContent = "Add at least one buy condition."; msg.className = "pp-msg error"; return; }
   let syms = ui.universe === "one" ? [ui.sym] : ui.universe === "watch" ? api.watchlist() : api.screenerList() || [];
   syms = [...new Set(syms)].filter(s => covered.includes(s)).slice(0, MAX_BASKET);
   if (!syms.length) { msg.textContent = ui.universe === "one" ? `${ui.sym || "That stock"} has no daily data. Pick a NIFTY 500 stock from the suggestions.` : "No NIFTY 500 stocks to test in that list."; msg.className = "pp-msg error"; return; }
   running = true;
   root.querySelector(".sb-run").disabled = true;
   msg.className = "pp-msg";
   const opts = { capital: ui.capital, sizePct: ui.sizePct, plan: api.plan(), slippage: api.slippageOn(), split: 0.7 };
   const results = [];
   for (let i = 0; i < syms.length; i++) {
    msg.textContent = `Testing ${syms[i]} (${i + 1} of ${syms.length})…`;
    try {
     const bars = await api.loadBars(syms[i]);
     results.push({ sym: syms[i], bars, res: S.backtest(bars, strat, opts), strat: clone(strat) });
    } catch (e) { results.push({ sym: syms[i], error: e.message }); }
    await new Promise(r => setTimeout(r, 0));
   }
   running = false;
   root.querySelector(".sb-run").disabled = false;
   const ok = results.filter(r => r.res);
   msg.textContent = ok.length ? "" : results[0] && results[0].error ? results[0].error : "The backtest could not run.";
   msg.className = ok.length ? "pp-msg" : "pp-msg error";
   if (!ok.length) return;
   if (results.length === 1) renderSingle(ok[0]);
   else renderBasket(results);
   root.querySelector("[data-sresults]").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- Results ----------
  const card = (label, v, extra, cls, info) => `<div class="ppa-card"><small>${label}${info ? api.infoButton(info) : ""}</small><strong class="${cls || ""}">${v}</strong>${extra ? `<span>${extra}</span>` : ""}</div>`;
  const day = t => new Date((t + 19800) * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  function statCards(s) {
   return `<div class="ppa-cards">
    ${card("Strategy return", pct(s.ret), `Buy and hold: ${pct(s.buyHold)}`, tone(s.ret))}
    ${card("Yearly rate (CAGR)", pct(s.cagr), `${Math.round(s.days)} days tested`, tone(s.cagr), "backtest")}
    ${card("Maximum drawdown", s.maxDd ? `−${s.maxDd.toFixed(2)}%` : "0%", "Largest fall from a peak", s.maxDd > 20 ? "pp-down" : "", "drawdown")}
    ${card("Win rate", s.winRate === null ? "—" : `${s.winRate.toFixed(0)}%`, `${s.trades} trade${s.trades === 1 ? "" : "s"}`, "", "winrate")}
    ${card("Profit factor", s.profitFactor === null ? "—" : s.profitFactor === Infinity ? "∞" : s.profitFactor.toFixed(2), s.expectancy === null ? "" : `Expectancy ${signed(s.expectancy)} per trade`, s.profitFactor > 1 ? "pp-up" : s.profitFactor !== null ? "pp-down" : "")}
    ${card("Sharpe ratio", s.sharpe === null ? "—" : s.sharpe.toFixed(2), "Return per unit of risk, yearly", s.sharpe > 1 ? "pp-up" : s.sharpe < 0 ? "pp-down" : "", "backtest")}
    ${card("Time in the market", `${s.exposure.toFixed(0)}%`, s.avgBars === null ? "" : `Average hold ${s.avgBars.toFixed(1)} days`)}
    ${card("Charges paid", money(s.charges), `Best ${pct(s.best, 1)} · worst ${pct(s.worst, 1)}`, "", "charges")}
   </div>`;
  }
  function splitTable(res) {
   const a = res.inSample, b = res.outSample;
   if (!a || !b) return "";
   const row = (label, s) => `<tr><td>${label}</td><td class="num ${tone(s.ret)}">${pct(s.ret)}</td><td class="num ${tone(s.buyHold)}">${pct(s.buyHold)}</td><td class="num">${s.trades}</td><td class="num">${s.winRate === null ? "—" : `${s.winRate.toFixed(0)}%`}</td><td class="num">${s.maxDd ? `−${s.maxDd.toFixed(1)}%` : "0%"}</td></tr>`;
   const verdict = a.ret > 0 && b.ret <= 0 ? "⚠ It made money in the first 70% of the period but not in the last 30%. That is a classic sign of a rule that fits the past by luck (overfitting)."
    : a.ret <= 0 && b.ret > 0 ? "It lost in the first part and gained later: results depend heavily on the period. Test on more stocks before trusting it."
    : a.ret > 0 && b.ret > 0 ? (b.ret > b.buyHold ? "✓ Profitable in both parts and ahead of buy-and-hold in the later, unseen part. Encouraging, but test on more stocks." : "Profitable in both parts, but behind buy-and-hold in the later part.") : "Lost money in both parts.";
   return `<section class="ppa-panel"><h4><span>Earlier vs later period ${api.infoButton("backtest")}</span><small class="ppa-time">split at ${day(res.splitTime)}</small></h4>
    <div class="ppa-table-wrap"><table class="ppa-table"><thead><tr><th>Period</th><th class="num">Strategy</th><th class="num">Buy &amp; hold</th><th class="num">Trades</th><th class="num">Win rate</th><th class="num">Max DD</th></tr></thead><tbody>${row("First 70% (in-sample)", a)}${row("Last 30% (out-of-sample)", b)}</tbody></table></div><p class="pt-alert sb-verdict">${verdict}</p></section>`;
  }
  function renderSingle(r, keepBasket) {
   const box = root.querySelector("[data-sresults]"), s = r.res.stats, name = api.names.get(r.sym) || "";
   charts.forEach(c => c.remove()); charts = [];
   const html = `<section class="sb-detail" data-sdetail>
    <div class="ppa-toolbar"><h3 class="ppa-title">${esc(r.sym)} <small>${esc(name)} · ${day(r.bars[r.res.warm].time)} to ${day(r.bars[r.bars.length - 1].time)}</small></h3>
     <div class="sb-actions"><button type="button" class="pp-btn" data-schart="${esc(r.sym)}">📈 Open chart</button><button type="button" class="pp-btn" data-scsv>⤓ Trades CSV</button></div></div>
    ${statCards(s)}
    <section class="ppa-panel"><h4>Equity: strategy vs buy and hold</h4><div class="sb-chart sb-equity" data-sequity role="img" aria-label="Equity curve of the strategy compared with buy and hold"></div><p class="sb-legend"><i style="background:#48e0b0"></i>Strategy <i style="background:#8d99ae"></i>Buy and hold</p></section>
    <section class="ppa-panel"><h4>Trades on the chart</h4><div class="sb-chart sb-price" data-sprice role="img" aria-label="Price chart with the strategy's trades"></div></section>
    ${splitTable(r.res)}
    <section class="ppa-panel"><h4>Trades (${r.res.trades.length})</h4>${r.res.trades.length ? `<div class="ppa-table-wrap"><table class="ppa-table"><thead><tr><th>Bought</th><th>Sold</th><th class="num">Days</th><th class="num">Qty.</th><th class="num">Buy</th><th class="num">Sell</th><th class="num">P&amp;L</th><th class="num">%</th><th>Exit reason</th></tr></thead><tbody>
     ${r.res.trades.slice().reverse().map(t => `<tr><td class="ppa-time">${day(t.inTime)}</td><td class="ppa-time">${day(t.outTime)}</td><td class="num">${t.bars}</td><td class="num">${t.qty}</td><td class="num">${t.entry.toFixed(2)}</td><td class="num">${t.exit.toFixed(2)}</td><td class="num ${tone(t.pnl)}">${signed(t.pnl)}</td><td class="num ${tone(t.pnlPct)}">${pct(t.pnlPct, 1)}</td><td>${esc(t.reason)}</td></tr>`).join("")}</tbody></table></div>` : `<p class="ppa-empty ppa-empty-sm">No trades: the buy conditions never came true together in this period. Loosen a condition or try another stock.</p>`}</section>
   </section>`;
   if (keepBasket) { const old = box.querySelector("[data-sdetail]"); if (old) old.remove(); box.insertAdjacentHTML("beforeend", html); }
   else box.innerHTML = html;
   box._single = r;
   drawEquity(r);
   drawPrice(r);
  }
  function chartBase(el, height) {
   const light = document.documentElement.dataset.theme === "light", border = light ? "#d5dde8" : "#26384e";
   el.style.height = `${height}px`;
   const c = LightweightCharts.createChart(el, { autoSize: true, layout: { background: { type: "solid", color: "transparent" }, textColor: light ? "#4a5b70" : "#9caec4", panes: { separatorColor: border } },
    grid: { vertLines: { color: light ? "#eef2f7" : "#16233a" }, horzLines: { color: light ? "#e6ebf2" : "#1b2a40" } }, rightPriceScale: { borderColor: border }, timeScale: { borderColor: border } });
   charts.push(c);
   return c;
  }
  const T = t => t + 19800; // daily candles plot on their IST date
  function drawEquity(r) {
   const el = root.querySelector("[data-sequity]");
   if (!el || !window.LightweightCharts) return;
   const c = chartBase(el, 240), LW = LightweightCharts, eq = r.res.equity, first = r.bars[r.res.warm].open;
   const bh = c.addSeries(LW.LineSeries, { color: "#8d99ae", lineWidth: 1, priceLineVisible: false, lastValueVisible: false });
   bh.setData(eq.map((p, i) => ({ time: T(p.time), value: ui.capital * (r.bars[r.res.warm + i].close / first) })));
   const st = c.addSeries(LW.LineSeries, { color: "#48e0b0", lineWidth: 2, priceLineVisible: false });
   st.setData(eq.map(p => ({ time: T(p.time), value: Math.round(p.value) })));
   st.createPriceLine({ price: ui.capital, color: "rgba(156,174,196,.5)", lineWidth: 1, lineStyle: 2, axisLabelVisible: false, title: "" });
   c.timeScale().fitContent();
  }
  function drawPrice(r) {
   const el = root.querySelector("[data-sprice]");
   if (!el || !window.LightweightCharts) return;
   const LW = LightweightCharts, ops = [], fams = [], st = r.strat || strat;
   st.entry.rules.concat(st.exit.rules).forEach(rule => [rule.a, rule.b].forEach(o => {
    const fam = S.OPERANDS[o.k].family;
    if (["close", "open", "high", "low"].includes(o.k)) return;
    if (!ops.some(x => JSON.stringify(x) === JSON.stringify(o))) ops.push(o);
    if (fam !== "price" && fam !== "value" && !fams.includes(fam)) fams.push(fam);
   }));
   const c = chartBase(el, 380 + fams.length * 110);
   const main = c.addSeries(LW.CandlestickSeries, { upColor: "#2fbf8f", downColor: "#ef5f6b", borderVisible: false, wickUpColor: "#2fbf8f", wickDownColor: "#ef5f6b" });
   main.setData(r.bars.map(b => ({ time: T(b.time), open: b.open, high: b.high, low: b.low, close: b.close })));
   const cache = {};
   ops.forEach((o, i) => {
    const fam = S.OPERANDS[o.k].family;
    if (fam === "value") return;
    const pane = fam === "price" ? 0 : fams.indexOf(fam) + 1, data = S.seriesFor(r.bars, o, cache);
    const sr = c.addSeries(LW.LineSeries, Object.assign({ color: FAMILY_COLORS[i % FAMILY_COLORS.length], lineWidth: 2, priceLineVisible: false, lastValueVisible: pane > 0, crosshairMarkerVisible: false, title: pane > 0 ? S.describe(o) : "" }, o.k === "psar" ? { lineVisible: false, pointMarkersVisible: true, pointMarkersRadius: 2 } : {}), pane);
    sr.setData(r.bars.reduce((a, b, j) => { const v = data[j]; if (v !== null && v !== undefined && isFinite(v)) a.push({ time: T(b.time), value: v }); return a; }, []));
    // Fixed numbers compared with an oscillator become level lines in its pane.
    st.entry.rules.concat(st.exit.rules).forEach(rule => {
     const other = JSON.stringify(rule.a) === JSON.stringify(o) ? rule.b : JSON.stringify(rule.b) === JSON.stringify(o) ? rule.a : null;
     if (other && other.k === "value" && pane > 0) sr.createPriceLine({ price: Number(other.v), color: "rgba(156,174,196,.6)", lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: "" });
    });
   });
   if (LW.createSeriesMarkers) {
    const mk = [];
    r.res.trades.forEach(t => {
     mk.push({ time: T(t.inTime), position: "belowBar", color: "#3d7be0", shape: "arrowUp", text: "B" });
     mk.push({ time: T(t.outTime), position: "aboveBar", color: t.pnl > 0 ? "#2fbf8f" : "#ef5f6b", shape: "arrowDown", text: `S ${t.pnlPct >= 0 ? "+" : ""}${t.pnlPct.toFixed(1)}%` });
    });
    LW.createSeriesMarkers(main, mk.sort((a, b) => a.time - b.time));
   }
   const panes = c.panes();
   if (panes.length > 1) { panes[0].setStretchFactor(3); panes.slice(1).forEach(p => p.setStretchFactor(1)); }
   c.timeScale().fitContent();
  }
  let basketSort = { k: "ret", dir: -1 };
  function renderBasket(results) {
   lastBasket = results;
   const ok = results.filter(r => r.res), box = root.querySelector("[data-sresults]");
   charts.forEach(c => c.remove()); charts = [];
   const rets = ok.map(r => r.res.stats.ret).sort((a, b) => a - b), med = rets.length % 2 ? rets[(rets.length - 1) / 2] : (rets[rets.length / 2 - 1] + rets[rets.length / 2]) / 2;
   const avg = a => a.reduce((x, y) => x + y, 0) / (a.length || 1);
   const allTrades = ok.flatMap(r => r.res.trades), wins = allTrades.filter(t => t.pnl > 0).length;
   const beat = ok.filter(r => r.res.stats.ret > r.res.stats.buyHold).length, profitable = ok.filter(r => r.res.stats.ret > 0).length;
   const oos = ok.filter(r => r.res.outSample), oosAvg = avg(oos.map(r => r.res.outSample.ret));
   const key = { ret: r => r.res.stats.ret, bh: r => r.res.stats.buyHold, dd: r => -r.res.stats.maxDd, trades: r => r.res.stats.trades, win: r => r.res.stats.winRate || 0, pf: r => (r.res.stats.profitFactor === Infinity ? 1e9 : r.res.stats.profitFactor || 0), oos: r => (r.res.outSample ? r.res.outSample.ret : -1e9), sym: r => r.sym };
   const sorted = ok.slice().sort((a, b) => { const x = key[basketSort.k](a), y = key[basketSort.k](b); return (x > y ? 1 : x < y ? -1 : 0) * basketSort.dir; });
   const th = (k, label, cls) => `<th class="${cls || ""}"><button type="button" class="sb-sort" data-ssort="${k}" aria-label="Sort by ${label}">${label}${basketSort.k === k ? (basketSort.dir > 0 ? " ▲" : " ▼") : ""}</button></th>`;
   box.innerHTML = `<div class="ppa-toolbar"><h3 class="ppa-title">${esc(strat.name)} on ${ok.length} stocks</h3><button type="button" class="pp-btn" data-sbcsv>⤓ Results CSV</button></div>
    <div class="ppa-cards">
     ${card("Median return", pct(med), `Average ${pct(avg(rets))}`, tone(med))}
     ${card("Profitable stocks", `${profitable} of ${ok.length}`, `${((profitable / ok.length) * 100).toFixed(0)}%`, profitable > ok.length / 2 ? "pp-up" : "pp-down")}
     ${card("Beat buy and hold", `${beat} of ${ok.length}`, `Average buy and hold ${pct(avg(ok.map(r => r.res.stats.buyHold)))}`, beat > ok.length / 2 ? "pp-up" : "pp-down")}
     ${card("All trades", String(allTrades.length), allTrades.length ? `Win rate ${((wins / allTrades.length) * 100).toFixed(0)}%` : "", "", "winrate")}
     ${card("Average max drawdown", `−${avg(ok.map(r => r.res.stats.maxDd)).toFixed(1)}%`, "", "", "drawdown")}
     ${card("Later period (out-of-sample)", pct(oosAvg), "Average return in the last 30%", tone(oosAvg), "backtest")}
    </div>
    ${results.some(r => r.error) ? `<p class="ppa-hint">Skipped: ${results.filter(r => r.error).map(r => `${esc(r.sym)} (${esc(r.error)})`).join("; ")}</p>` : ""}
    <section class="ppa-panel"><h4>Per stock <small class="ppa-time">each stock tested on its own with the full capital; press a row for details</small></h4><div class="ppa-table-wrap"><table class="ppa-table"><thead><tr>${th("sym", "Stock")}${th("ret", "Return", "num")}${th("bh", "Buy &amp; hold", "num")}${th("oos", "Later 30%", "num")}${th("trades", "Trades", "num")}${th("win", "Win rate", "num")}${th("pf", "Profit factor", "num")}${th("dd", "Max DD", "num")}</tr></thead>
     <tbody>${sorted.map(r => { const s = r.res.stats; return `<tr class="sb-click" data-sdetailsym="${esc(r.sym)}" tabindex="0"><td><strong>${esc(r.sym)}</strong></td><td class="num ${tone(s.ret)}">${pct(s.ret)}</td><td class="num ${tone(s.buyHold)}">${pct(s.buyHold)}</td><td class="num ${r.res.outSample ? tone(r.res.outSample.ret) : ""}">${r.res.outSample ? pct(r.res.outSample.ret) : "—"}</td><td class="num">${s.trades}</td><td class="num">${s.winRate === null ? "—" : `${s.winRate.toFixed(0)}%`}</td><td class="num">${s.profitFactor === null ? "—" : s.profitFactor === Infinity ? "∞" : s.profitFactor.toFixed(2)}</td><td class="num">${s.maxDd ? `−${s.maxDd.toFixed(1)}%` : "0%"}</td></tr>`; }).join("")}</tbody></table></div></section>`;
  }
  function download(name, text, type) {
   const a = document.createElement("a");
   a.href = URL.createObjectURL(new Blob([text], { type }));
   a.download = name;
   document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }
  const csvLine = r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",");

  // ---------- Saving, loading, import and export ----------
  function validStrategy(x) {
   const okOp = o => o && typeof o === "object" && S.OPERANDS[o.k];
   const okRule = r => r && okOp(r.a) && okOp(r.b) && S.OPS.some(p => p[0] === r.op);
   if (!x || !x.entry || !Array.isArray(x.entry.rules) || !x.exit || !Array.isArray(x.exit.rules)) return null;
   if (![...x.entry.rules, ...x.exit.rules].every(okRule)) return null;
   const clean = o => { const c = { k: o.k }; ["n", "m", "v"].forEach(k => { if (isFinite(Number(o[k])) && o[k] !== null && o[k] !== "") c[k] = Number(o[k]); }); return c; };
   const risk = {};
   ["stop", "target", "trail", "atrStop", "maxBars"].forEach(k => { if (x.risk && Number(x.risk[k]) > 0) risk[k] = Number(x.risk[k]); });
   return { name: String(x.name || "Imported strategy").slice(0, 60), entry: { mode: x.entry.mode === "any" ? "any" : "all", rules: x.entry.rules.map(r => ({ a: clean(r.a), op: r.op, b: clean(r.b) })) }, exit: { mode: x.exit.mode === "all" ? "all" : "any", rules: x.exit.rules.map(r => ({ a: clean(r.a), op: r.op, b: clean(r.b) })) }, risk };
  }

  // ---------- Events ----------
  root.addEventListener("submit", e => { if (e.target.matches("[data-sform]")) { e.preventDefault(); if (!running) run(); } });
  root.addEventListener("change", async e => {
   const t = e.target;
   if (t.matches("[data-stemplate]") && t.value) { strat = clone(S.TEMPLATES.find(x => x.id === t.value)); render(); return; }
   if (t.matches("[data-sload]") && t.value !== "") { strat = clone(saved()[Number(t.value)]); render(); return; }
   if (t.matches("[data-simport]") && t.files[0]) {
    try {
     const data = JSON.parse(await t.files[0].text()), list = (Array.isArray(data) ? data : data.strategies || [data]).map(validStrategy).filter(Boolean);
     if (!list.length) throw new Error("no valid strategy in the file");
     const all = saved().filter(x => !list.some(y => y.name === x.name)).concat(list);
     setSaved(all); strat = clone(list[0]); render();
     api.toast(`Imported ${list.length} strateg${list.length === 1 ? "y" : "ies"}.`, "ok");
    } catch (err) { api.toast(`Could not import: ${err.message}.`, "error"); }
    return;
   }
   if (!t.closest("[data-sform]")) return;
   readForm();
   if (t.matches('[data-f="k"]')) {
    // A different indicator has different settings: rebuild the row with its defaults.
    const op = t.closest(".sb-op"), row = t.closest(".sb-rule"), g = row.closest("[data-group]").dataset.group, i = Number(row.dataset.i);
    const rule = strat[g].rules[i];
    rule[op.dataset.role] = { k: t.value };
    // Comparing across scales (RSI with a price) is meaningless, so a new left side gets a sensible partner.
    if (op.dataset.role === "a" && S.OPERANDS[rule.b.k].family !== S.OPERANDS[t.value].family) rule.b = PARTNER[t.value] ? clone(PARTNER[t.value]) : { k: "sma", n: 20 };
    render();
    root.querySelector(`[data-group="${g}"] .sb-rule[data-i="${i}"] [data-role="${op.dataset.role}"] select`).focus();
    return;
   }
   updateText();
  });
  root.addEventListener("input", e => { if (e.target.closest("[data-sform]") && e.target.matches("input")) { readForm(); updateText(); } });
  root.addEventListener("click", e => {
   const b = e.target.closest("button, [data-sdetailsym]");
   if (!b) return;
   if (b.dataset.sadd) { readForm(); const g = b.dataset.sadd; strat[g].rules.push({ a: { k: "close" }, op: g === "entry" ? "crossAbove" : "crossBelow", b: { k: "sma", n: 20 } }); render(); }
   else if (b.dataset.sdel) { readForm(); const [g, i] = b.dataset.sdel.split(":"); strat[g].rules.splice(Number(i), 1); render(); }
   else if (b.hasAttribute("data-ssave")) {
    readForm();
    const all = saved().filter(x => x.name !== strat.name).concat([clone(strat)]);
    setSaved(all); render(); api.toast(`Saved "${strat.name}".`, "ok");
   }
   else if (b.hasAttribute("data-sdelete")) { readForm(); if (confirm(`Delete the saved strategy "${strat.name}"?`)) { setSaved(saved().filter(x => x.name !== strat.name)); render(); } }
   else if (b.hasAttribute("data-sexport")) { readForm(); download(`${strat.name.replace(/[^\w-]+/g, "-").toLowerCase()}.json`, JSON.stringify({ app: "MarketPath strategy", version: 1, strategies: [strat] }, null, 1), "application/json"); }
   else if (b.dataset.schart) api.onChart(b.dataset.schart);
   else if (b.hasAttribute("data-scsv")) {
    const r = root.querySelector("[data-sresults]")._single;
    download(`${r.sym}-backtest-trades.csv`, "﻿" + [["Bought", "Sold", "Days", "Qty", "Buy price", "Sell price", "P&L", "P&L %", "Charges", "Exit reason"], ...r.res.trades.map(t => [day(t.inTime), day(t.outTime), t.bars, t.qty, t.entry, t.exit, t.pnl.toFixed(2), t.pnlPct.toFixed(2), t.charges.toFixed(2), t.reason])].map(csvLine).join("\r\n"), "text/csv");
   }
   else if (b.hasAttribute("data-sbcsv") && lastBasket) {
    download("backtest-results.csv", "﻿" + [["Stock", "Return %", "Buy & hold %", "Later 30% %", "Trades", "Win rate %", "Profit factor", "Max drawdown %"], ...lastBasket.filter(r => r.res).map(r => { const s = r.res.stats; return [r.sym, s.ret.toFixed(2), s.buyHold.toFixed(2), r.res.outSample ? r.res.outSample.ret.toFixed(2) : "", s.trades, s.winRate === null ? "" : s.winRate.toFixed(1), s.profitFactor === null ? "" : s.profitFactor === Infinity ? "inf" : s.profitFactor.toFixed(2), s.maxDd.toFixed(2)]; })].map(csvLine).join("\r\n"), "text/csv");
   }
   else if (b.dataset.ssort) { basketSort = { k: b.dataset.ssort, dir: basketSort.k === b.dataset.ssort ? -basketSort.dir : b.dataset.ssort === "sym" ? 1 : -1 }; renderBasket(lastBasket); }
   else if (b.dataset.sdetailsym) { const r = lastBasket.find(x => x.sym === b.dataset.sdetailsym); if (r) { renderSingle(r, true); root.querySelector("[data-sdetail]").scrollIntoView({ behavior: "smooth", block: "start" }); } }
  });
  root.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.matches("[data-sdetailsym]")) e.target.click(); });
  document.addEventListener("mp-theme-change", () => { const box = root.querySelector("[data-sresults]"); if (box && box._single && root.querySelector("[data-sequity]")) renderSingle(box._single, !!lastBasket); });

  return {
   show() {
    if (!root.dataset.ready) {
     root.dataset.ready = "1";
     render();
     api.covered().then(list => { covered = list || []; const keep = root.querySelector("[data-sresults]").innerHTML; readFormSafe(); render(); root.querySelector("[data-sresults]").innerHTML = keep; });
    } else updateText();
   },
   // Opens the builder set to test one stock, or a list (from the screener).
   testOn(target) {
    readFormSafe();
    if (Array.isArray(target)) ui.universe = "screener"; else { ui.universe = "one"; ui.sym = target; }
    saveUi();
    if (root.dataset.ready) render();
   }
  };
  function readFormSafe() { if (root.querySelector("[data-sform]")) readForm(); }
 }
 return { create };
})();
