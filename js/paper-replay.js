// Bar replay and testing engine for the paper-trading terminal.
// Pick a NIFTY 500 stock (real daily candles for 2 years, or 5-minute prices for the last 5 days) or import any
// OHLC data as JSON, start at a random or chosen point, and reveal the chart one bar at a time: by hand, or
// playing automatically at a chosen speed. Orders placed on a bar fill at the next bar's open (blind entry: you
// never trade on a price you have already seen), with slippage and charges. Optional stop-loss and target are
// checked on every new bar. Blind mode hides the stock, the dates and the real price level until the session
// ends. Every closed trade goes to the trading journal.
// Needs paper-indicators.js, paper-charges.js, paper-costs.js, paper-journal.js and Lightweight Charts.
// api: { esc, money, signed, fmt, toast, journal, plan(), slippageOn(), loadScript(src), dataUrl(rel), dataFile(sym),
//        names: Map(sym -> name), covered() -> Promise<[sym]>, defaultSymbol() }
const PaperReplay = (function () {
 const START_CASH = 1000000;
 const SPEEDS = [["2000", "0.5× (1 bar / 2 s)"], ["1000", "1× (1 bar / s)"], ["500", "2×"], ["250", "4×"], ["125", "8×"], ["60", "16×"]];
 const OVERLAYS = [["sma20", "SMA 20", "#ffbf78"], ["ema50", "EMA 50", "#a994ff"], ["bb", "Bollinger", "#45a9d9"], ["rsi", "RSI 14", "#a994ff"], ["vol", "Volume", ""]];
 const TZ = -new Date().getTimezoneOffset() * 60;
 const PI = PaperIndicators;
 const round2 = n => Math.round(n * 100) / 100;
 const istDay = sec => Math.floor((sec + 19800) / 86400);
 const pctS = x => `${x >= 0 ? "+" : "−"}${Math.abs(x).toFixed(2)}%`;

 // ---------- Historical JSON ingestion ----------
 // Accepts: an array of bars; { bars | candles | data: [...] }; columns { t|time, o|open, h|high, l|low, c|close, v|volume };
 // or a Yahoo Finance chart response. Bar keys are matched without regard to case: time/date/timestamp/datetime/t,
 // open/o, high/h, low/l, close/c, volume/v/vol. Times may be ISO dates, Unix seconds or milliseconds.
 function parseTime(v) {
  if (typeof v === "number" && isFinite(v)) return v > 1e12 ? Math.floor(v / 1000) : v > 1e8 ? Math.floor(v) : null;
  if (typeof v === "string" && v.trim()) {
   if (/^\d+(\.\d+)?$/.test(v.trim())) return parseTime(Number(v));
   const s = v.trim(), ms = Date.parse(/^\d{4}-\d{2}-\d{2}$/.test(s) ? `${s}T09:15:00+05:30` : s);
   return isFinite(ms) ? Math.floor(ms / 1000) : null;
  }
  return null;
 }
 function ingest(data, fallbackName) {
  let name = fallbackName || "Imported data", rows = null;
  const pickKey = (o, keys) => { const k = Object.keys(o).find(x => keys.includes(x.toLowerCase())); return k === undefined ? undefined : o[k]; };
  const T = ["time", "date", "timestamp", "datetime", "t"], O = ["open", "o"], H = ["high", "h"], L = ["low", "l"], C = ["close", "c"], V = ["volume", "v", "vol"];
  if (data && data.chart && Array.isArray(data.chart.result) && data.chart.result[0]) {
   const r = data.chart.result[0], q = (r.indicators && r.indicators.quote && r.indicators.quote[0]) || {};
   name = (r.meta && r.meta.symbol) || name;
   rows = (r.timestamp || []).map((t, i) => ({ time: t, open: q.open && q.open[i], high: q.high && q.high[i], low: q.low && q.low[i], close: q.close && q.close[i], volume: q.volume && q.volume[i] }));
  } else if (Array.isArray(data)) rows = data;
  else if (data && typeof data === "object") {
   name = data.symbol || data.name || name;
   const arr = data.bars || data.candles || data.data;
   if (Array.isArray(arr)) rows = arr;
   else {
    const t = pickKey(data, T), o = pickKey(data, O), h = pickKey(data, H), l = pickKey(data, L), c = pickKey(data, C), v = pickKey(data, V);
    if (Array.isArray(t) && Array.isArray(c)) rows = t.map((x, i) => ({ time: x, open: o && o[i], high: h && h[i], low: l && l[i], close: c[i], volume: v && v[i] }));
   }
  }
  if (!rows) throw new Error("No bars found. Use an array of { time, open, high, low, close, volume } objects (see the sample file).");
  const bars = [];
  let skipped = 0, fixed = 0;
  rows.forEach(r => {
   if (Array.isArray(r)) r = { time: r[0], open: r[1], high: r[2], low: r[3], close: r[4], volume: r[5] };
   if (!r || typeof r !== "object") { skipped++; return; }
   const time = parseTime(pickKey(r, T)), close = Number(pickKey(r, C));
   let open = Number(pickKey(r, O)), high = Number(pickKey(r, H)), low = Number(pickKey(r, L));
   const volume = Number(pickKey(r, V)) || 0;
   if (time === null || !(close > 0)) { skipped++; return; }
   if (!(open > 0)) open = close;
   if (!(high > 0)) high = Math.max(open, close);
   if (!(low > 0)) low = Math.min(open, close);
   if (high < Math.max(open, close) || low > Math.min(open, close)) { fixed++; high = Math.max(high, open, close); low = Math.min(low, open, close); }
   bars.push({ time, open, high, low, close, volume: Math.max(0, volume) });
  });
  bars.sort((a, b) => a.time - b.time);
  const out = bars.filter((b, i) => i === 0 || b.time !== bars[i - 1].time);
  if (out.length < 30) throw new Error(`Only ${out.length} usable bars (at least 30 are needed)${skipped ? `; ${skipped} rows had no valid time or close` : ""}.`);
  const gaps = out.slice(1).map((b, i) => b.time - out[i].time).sort((a, b) => a - b);
  const daily = gaps[Math.floor(gaps.length / 2)] >= 20 * 3600;
  return { name: String(name).slice(0, 60), bars: out, daily, skipped, fixed: fixed + (bars.length - out.length) };
 }
 function sampleFile() {
  const bars = [];
  let p = 500;
  const d = new Date(Date.UTC(2024, 0, 1));
  while (bars.length < 120) {
   d.setUTCDate(d.getUTCDate() + 1);
   if (d.getUTCDay() === 0 || d.getUTCDay() === 6) continue;
   const o = p, c = round2(o * (1 + (Math.random() - 0.48) * 0.03));
   bars.push({ time: d.toISOString().slice(0, 10), open: round2(o), high: round2(Math.max(o, c) * 1.008), low: round2(Math.min(o, c) * 0.992), close: c, volume: Math.round(1e5 + Math.random() * 5e5) });
   p = c;
  }
  return { symbol: "SAMPLE", note: "MarketPathAcademy replay format: time (date, ISO time or Unix seconds), open, high, low, close, volume (optional)", bars };
 }

 function create(api) {
  const { esc, money, signed, fmt } = api;
  const root = document.getElementById("ptReplayPane");
  let S = null; // the running session
  let chart = null, series = {}, priceLines = [], markersApi = null, timer = null;
  const prefs = { tf: "D", blind: true, start: "random", speed: "500", overlays: ["sma20", "vol"] };
  try { Object.assign(prefs, JSON.parse(localStorage.getItem("mp-replay-prefs")) || {}); } catch (e) { /* storage blocked */ }
  const savePrefs = () => { try { localStorage.setItem("mp-replay-prefs", JSON.stringify(prefs)); } catch (e) { /* storage blocked */ } };
  let imported = null, coveredList = [];

  // ---------- Setup screen ----------
  function renderSetup(msg) {
   stopPlay();
   if (chart) { chart.remove(); chart = null; }
   const sym = (S && S.sym) || api.defaultSymbol();
   root.innerHTML = `<div class="ppa-toolbar"><h3 class="ppa-title">Bar replay ${api.infoButton("replay", "How bar replay works")}</h3><span class="pp-tag">PRACTICE ON HISTORY</span></div>
    <p class="ppa-hint">Go back to a point in a stock's history and trade it bar by bar without seeing what comes next. It is the fastest way to practise a setup: months of market in minutes. Every closed trade goes to your journal.</p>
    <form class="pt-replay-setup" data-rsetup novalidate>
     <fieldset class="ppa-panel"><legend>1. Data</legend>
      <div class="pt-chips" role="radiogroup">
       <label><input type="radio" name="src" value="nse" ${imported ? "" : "checked"}><span>NSE stock (real data)</span></label>
       <label><input type="radio" name="src" value="file" ${imported ? "checked" : ""}><span>Import a JSON file</span></label>
      </div>
      <div class="pt-replay-nse">
       <label class="pt-field"><span>Stock (NIFTY 500)</span><input name="sym" list="ptReplaySyms" value="${esc(sym)}" autocomplete="off" spellcheck="false" placeholder="e.g. RELIANCE"></label>
       <datalist id="ptReplaySyms">${coveredList.map(s => `<option value="${esc(s)}">${esc(api.names.get(s) || "")}</option>`).join("")}</datalist>
       <label class="pt-field"><span>Bars</span><select name="tf"><option value="D"${prefs.tf === "D" ? " selected" : ""}>Daily candles (about 2 years)</option><option value="5"${prefs.tf === "5" ? " selected" : ""}>5-minute (last 5 trading days)</option></select></label>
      </div>
      <div class="pt-replay-file">
       <label class="pp-btn pt-file">⤒ Choose JSON file<input type="file" accept="application/json,.json" data-rfile></label>
       <button type="button" class="pp-btn" data-rsample>⤓ Download a sample file</button>
       <p class="ppa-hint" data-rfileinfo>${imported ? `Loaded <b>${esc(imported.name)}</b>: ${imported.bars.length} ${imported.daily ? "daily" : "intraday"} bars${imported.skipped ? `, ${imported.skipped} rows skipped` : ""}${imported.fixed ? `, ${imported.fixed} rows corrected` : ""}.` : "Any OHLC data: an array of { time, open, high, low, close, volume } bars, columns { t, o, h, l, c, v }, or a Yahoo Finance chart response. Times can be dates, ISO times or Unix seconds."}</p>
      </div>
     </fieldset>
     <fieldset class="ppa-panel"><legend>2. Session</legend>
      <div class="pt-chips" role="radiogroup" aria-label="Starting point">
       <label><input type="radio" name="start" value="random" ${prefs.start !== "date" ? "checked" : ""}><span>Random starting point</span></label>
       <label><input type="radio" name="start" value="date" ${prefs.start === "date" ? "checked" : ""}><span>Start on a date</span></label>
      </div>
      <label class="pt-field pt-replay-date"><span>Start date</span><input type="date" name="date"></label>
      <label class="pt-check"><input type="checkbox" name="blind" ${prefs.blind ? "checked" : ""}> <span><b>Blind mode</b>: hide the stock, the dates and the real price level until the session ends</span></label>
     </fieldset>
     <p class="pp-msg${msg ? " error" : ""}" data-rmsg aria-live="polite">${msg ? esc(msg) : ""}</p>
     <button type="submit" class="pt-buy pt-replay-go">▶ Start replay</button>
    </form>`;
   const f = root.querySelector("[data-rsetup]");
   const sync = () => {
    const file = f.src.value === "file";
    root.querySelector(".pt-replay-nse").hidden = file;
    root.querySelector(".pt-replay-file").hidden = !file;
    root.querySelector(".pt-replay-date").hidden = f.start.value !== "date";
   };
   f.addEventListener("change", sync);
   sync();
  }

  async function loadNse(sym, tf) {
   const file = api.dataFile(sym);
   if (tf === "D") {
    if (!(window.MP_DAILY || {})[sym]) await api.loadScript(api.dataUrl(`data/daily/${file}.js`));
    const d = window.MP_DAILY[sym];
    return d.t.map((day, i) => ({ time: day * 86400 - 19800, open: d.o[i], high: d.h[i], low: d.l[i], close: d.c[i], volume: d.v[i] }));
   }
   await api.loadScript(api.dataUrl(`data/intraday/${file}.js`));
   const d = (window.MP_INTRADAY || {})[sym];
   let prev = d.pc || d.c[0];
   // 5-minute candles from 5-minute prices: each opens at the previous price and closes at its own.
   return d.t.map((t, i) => { const c = d.c[i], b = { time: t, open: prev, high: Math.max(prev, c), low: Math.min(prev, c), close: c, volume: 0 }; prev = c; return b; });
  }

  async function start(f) {
   const blind = f.blind.checked, src = f.src.value;
   prefs.blind = blind; prefs.start = f.start.value;
   let bars, sym, name, daily, label;
   try {
    if (src === "file") {
     if (!imported) throw new Error("Choose a JSON file first.");
     ({ bars, daily } = imported); sym = imported.name; name = "imported file"; label = `Imported: ${imported.name}`;
    } else {
     sym = f.sym.value.trim().toUpperCase();
     prefs.tf = f.tf.value;
     if (!sym) throw new Error("Enter a stock symbol.");
     if (coveredList.length && !coveredList.includes(sym)) throw new Error(`${sym} is not in the NIFTY 500 list that has replay data. Pick one from the suggestions, or import a JSON file.`);
     bars = await loadNse(sym, f.tf.value);
     daily = f.tf.value === "D"; name = api.names.get(sym) || ""; label = `NSE · ${daily ? "daily" : "5-minute"} · Yahoo Finance`;
    }
   } catch (e) { renderSetup(e.message && !/could not load/.test(e.message) ? e.message : `Could not load replay data for this stock.`); return; }
   savePrefs();
   const warm = Math.min(60, Math.floor(bars.length * 0.25)), maxStart = bars.length - 20;
   let at = warm + Math.floor(Math.random() * Math.max(1, maxStart - warm));
   if (f.start.value === "date" && f.date.value) {
    const t = parseTime(f.date.value), i = bars.findIndex(b => b.time >= t);
    if (i < 0) { renderSetup("That date is after the end of the data."); return; }
    at = Math.min(maxStart, Math.max(i, 5));
   }
   // Blind mode: prices are rescaled so the starting bar closes at 1,000, and bars are numbered instead of dated.
   const scale = blind ? 1000 / bars[at].close : 1;
   const view = bars.map((b, i) => ({ time: b.time, idx: i + 1, open: round2(b.open * scale), high: round2(b.high * scale), low: round2(b.low * scale), close: round2(b.close * scale), volume: b.volume }));
   S = {
    sym, name, label, daily, blind, scale, bars: view, raw: bars, i: at, startAt: at, product: daily ? "delivery" : "intraday",
    cash: START_CASH, pos: null, order: null, trades: [], journalIds: [], equity: [], over: false, src
   };
   renderSession();
  }

  // ---------- Session screen ----------
  function renderSession() {
   const s = S;
   root.innerHTML = `<div class="pt-replay-bar">
     <div class="pt-replay-id"><strong data-rtitle></strong><button type="button" class="pt-src" data-disclose="replay">${esc(s.blind ? "Blind replay · source hidden" : s.label)} ⓘ</button></div>
     <div class="pt-replay-ctl" role="group" aria-label="Replay controls">
      <button type="button" class="pp-btn" data-rnext title="Next bar (→)">⏭ Next bar</button>
      <button type="button" class="pp-btn" data-rplay aria-pressed="false" title="Play or pause (P)">▶ Play</button>
      <label><span class="sr-only">Playback speed</span><select class="pp-select" data-rspeed aria-label="Playback speed">${SPEEDS.map(([v, l]) => `<option value="${v}"${prefs.speed === v ? " selected" : ""}>${l}</option>`).join("")}</select></label>
      <span class="pt-replay-prog" data-rprog></span>
      <button type="button" class="pp-btn" data-rend>■ End session</button>
     </div>
    </div>
    <div class="pt-replay-ind" role="group" aria-label="Indicators">${OVERLAYS.map(([id, l, c]) => `<label class="pt-check"><input type="checkbox" data-rind="${id}" ${prefs.overlays.includes(id) ? "checked" : ""}>${c ? `<i class="pp-swatch" style="background:${c}"></i>` : ""}${l}</label>`).join("")}</div>
    <div class="pt-replay-grid">
     <div class="pt-replay-chart-wrap"><div class="pp-legend" data-rlegend></div><div class="pt-replay-chart" data-rchart role="img" aria-label="Replay chart"></div></div>
     <aside class="pt-replay-side">
      <div class="ppa-panel" data-raccount></div>
      <form class="ppa-panel pt-replay-ticket" data-rticket novalidate>
       <h4>Order <small class="ppa-time">fills at the next bar's open ${api.infoButton("fills", "How do replay orders fill?")}</small></h4>
       <label class="pt-field"><span>Quantity</span><input name="qty" type="number" min="1" step="1" value="10"></label>
       <div class="pt-order-grid"><label class="pt-field"><span>Stop-loss</span><input name="stop" type="number" min="0" step="0.05" placeholder="optional"></label><label class="pt-field"><span>Target</span><input name="target" type="number" min="0" step="0.05" placeholder="optional"></label></div>
       <p class="pp-estimate" data-rest></p>
       <div class="ppa-funds-btns" data-ractions></div>
       <p class="pp-msg" data-rmsg aria-live="polite"></p>
       <p class="ppa-hint pt-keys">Keys: → next bar · P play/pause · B buy · S sell${s.daily ? "" : " short"} · X close</p>
      </form>
      <div class="ppa-panel" data-rtrades></div>
     </aside>
    </div>`;
   buildChart();
   update(true);
   root.querySelector("[data-rnext]").focus();
  }

  function buildChart() {
   if (chart) { chart.remove(); chart = null; }
   series = {}; priceLines = []; markersApi = null;
   const el = root.querySelector("[data-rchart]");
   if (!window.LightweightCharts) { el.textContent = "The chart library could not load."; return; }
   const LW = LightweightCharts, light = document.documentElement.dataset.theme === "light", border = light ? "#d5dde8" : "#26384e";
   const rsiOn = prefs.overlays.includes("rsi");
   el.style.height = rsiOn ? "560px" : "460px";
   chart = LW.createChart(el, {
    autoSize: true,
    layout: { background: { type: "solid", color: "transparent" }, textColor: light ? "#4a5b70" : "#9caec4", panes: { separatorColor: border } },
    grid: { vertLines: { color: light ? "#eef2f7" : "#16233a" }, horzLines: { color: light ? "#e6ebf2" : "#1b2a40" } },
    rightPriceScale: { borderColor: border },
    timeScale: S.blind ? { borderColor: border, rightOffset: 8, tickMarkFormatter: t => `#${t}` } : { borderColor: border, rightOffset: 8, timeVisible: !S.daily, secondsVisible: false },
    localization: S.blind ? { timeFormatter: t => `Bar ${t}` } : {}
   });
   series.main = chart.addSeries(LW.CandlestickSeries, { upColor: "#2fbf8f", downColor: "#ef5f6b", borderVisible: false, wickUpColor: "#2fbf8f", wickDownColor: "#ef5f6b" });
   const line = (k, color, pane, extra) => { series[k] = chart.addSeries(LW.LineSeries, Object.assign({ color, lineWidth: 1, priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false }, extra || {}), pane); };
   if (prefs.overlays.includes("vol") && S.bars.some(b => b.volume > 0)) {
    series.vol = chart.addSeries(LW.HistogramSeries, { priceScaleId: "vol", priceFormat: { type: "volume" }, priceLineVisible: false, lastValueVisible: false }, 0);
    chart.priceScale("vol").applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });
    series.main.priceScale().applyOptions({ scaleMargins: { top: 0.08, bottom: 0.2 } });
   }
   if (prefs.overlays.includes("sma20")) line("sma20", "#ffbf78", 0, { lineWidth: 2 });
   if (prefs.overlays.includes("ema50")) line("ema50", "#a994ff", 0, { lineWidth: 2 });
   if (prefs.overlays.includes("bb")) { line("bbU", "#45a9d9", 0); line("bbL", "#45a9d9", 0); }
   if (rsiOn) {
    line("rsi", "#a994ff", 1, { lineWidth: 2, lastValueVisible: true, title: "RSI 14" });
    [70, 30].forEach(v => series.rsi.createPriceLine({ price: v, color: "rgba(156,174,196,.55)", lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: "" }));
    chart.panes()[0].setStretchFactor(3); chart.panes()[1].setStretchFactor(1);
   }
   if (LW.createSeriesMarkers) markersApi = LW.createSeriesMarkers(series.main, []);
   chart.subscribeCrosshairMove(p => legend(p && p.time !== undefined ? p.time : null));
  }
  const tOf = b => (S.blind ? b.idx : S.daily ? b.time + 19800 : b.time + TZ);
  function legend(t) {
   const el = root.querySelector("[data-rlegend]");
   if (!el) return;
   const vis = S.bars.slice(0, S.i + 1), b = (t !== null && vis.find(x => tOf(x) === t)) || vis[vis.length - 1];
   const up = b.close >= b.open ? "pp-up" : "pp-down";
   el.innerHTML = `<strong>${S.blind ? "Hidden" : esc(S.sym)}</strong> · ${S.daily ? "1D" : "5m"} <span>O <b class="${up}">${fmt(b.open)}</b></span><span>H <b class="${up}">${fmt(b.high)}</b></span><span>L <b class="${up}">${fmt(b.low)}</b></span><span>C <b class="${up}">${fmt(b.close)}</b></span>${b.volume ? `<span>Vol <b>${Math.round(b.volume).toLocaleString("en-IN")}</b></span>` : ""}`;
  }
  function drawChart(fit) {
   if (!chart) return;
   const vis = S.bars.slice(0, S.i + 1), t = vis.map(tOf), closes = vis.map(b => b.close);
   const line = arr => arr.reduce((a, v, i) => { if (v !== null && isFinite(v)) a.push({ time: t[i], value: v }); return a; }, []);
   series.main.setData(vis.map((b, i) => ({ time: t[i], open: b.open, high: b.high, low: b.low, close: b.close })));
   if (series.vol) series.vol.setData(vis.map((b, i) => ({ time: t[i], value: b.volume, color: b.close >= b.open ? "rgba(47,191,143,.45)" : "rgba(239,95,107,.45)" })));
   if (series.sma20) series.sma20.setData(line(PI.sma(closes, 20)));
   if (series.ema50) series.ema50.setData(line(PI.ema(closes, 50)));
   if (series.bbU) { const bb = PI.bollinger(closes, 20, 2); series.bbU.setData(line(bb.upper)); series.bbL.setData(line(bb.lower)); }
   if (series.rsi) series.rsi.setData(line(PI.rsi(closes, 14)));
   priceLines.forEach(p => series.main.removePriceLine(p));
   priceLines = [];
   const pos = S.pos;
   if (pos) {
    priceLines.push(series.main.createPriceLine({ price: pos.entry, color: "#9caec4", lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: "entry" }));
    if (pos.stop) priceLines.push(series.main.createPriceLine({ price: pos.stop, color: "#ef5f6b", lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: "stop" }));
    if (pos.target) priceLines.push(series.main.createPriceLine({ price: pos.target, color: "#2fbf8f", lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: "target" }));
   }
   if (markersApi) {
    const mk = [];
    S.trades.forEach(tr => {
     const long = tr.side === "long";
     if (tr.inBar <= S.i) mk.push({ time: tOf(S.bars[tr.inBar]), position: long ? "belowBar" : "aboveBar", color: long ? "#3d7be0" : "#e8622c", shape: long ? "arrowUp" : "arrowDown", text: long ? "B" : "S" });
     if (tr.outBar <= S.i) mk.push({ time: tOf(S.bars[tr.outBar]), position: long ? "aboveBar" : "belowBar", color: tr.pnl > 0 ? "#2fbf8f" : "#ef5f6b", shape: "circle", text: tr.pnl > 0 ? "+" : "−" });
    });
    if (pos && pos.inBar <= S.i) mk.push({ time: tOf(S.bars[pos.inBar]), position: pos.side === "long" ? "belowBar" : "aboveBar", color: pos.side === "long" ? "#3d7be0" : "#e8622c", shape: pos.side === "long" ? "arrowUp" : "arrowDown", text: pos.side === "long" ? "B" : "S" });
    markersApi.setMarkers(mk.sort((a, b) => a.time - b.time));
   }
   if (fit) chart.timeScale().setVisibleLogicalRange({ from: Math.max(0, vis.length - 120), to: vis.length + 8 });
   else chart.timeScale().scrollToRealTime();
   legend(null);
  }

  // ---------- Trading ----------
  const bar = () => S.bars[S.i];
  const equityNow = () => S.cash + (S.pos ? (S.pos.side === "long" ? 1 : -1) * S.pos.qty * bar().close : 0);
  const chargesOf = (side, qty, price) => PaperCharges.compute(side, S.product, qty, price, api.plan()).total;
  function slip(side, qty, price) {
   if (!api.slippageOn()) return 0;
   const vis = S.raw.slice(Math.max(0, S.i - 19), S.i + 1), adv = vis.every(b => b.volume > 0) ? vis.reduce((a, b) => a + b.close * b.volume, 0) / vis.length : 0;
   return PaperCosts.slippage({ price, qty, side, tier: "mid", adv: adv * S.scale }).perShare;
  }
  function readTicket() {
   const f = root.querySelector("[data-rticket]");
   return { qty: Math.floor(Number(f.qty.value)), stop: Number(f.stop.value) || null, target: Number(f.target.value) || null };
  }
  function msg(text, kind) { const el = root.querySelector("[data-rmsg]"); if (el) { el.textContent = text; el.className = `pp-msg${kind ? " " + kind : ""}`; } }
  function placeOrder(side) {
   if (S.over) return;
   const t = readTicket(), price = bar().close;
   if (S.pos && side !== "close") { msg("Close the open position first (one position at a time keeps the practice focused).", "error"); return; }
   if (side === "close") {
    if (!S.pos) return;
    S.order = { side: "close" };
    msg(`Exit order placed: it fills at the next bar's open.`, "ok");
    refreshPanels();
    return;
   }
   if (side === "short" && S.daily) { msg("Delivery shares cannot be sold short in India. Use 5-minute bars to practise intraday shorts.", "error"); return; }
   if (!(t.qty > 0)) { msg("Enter a whole-number quantity above zero.", "error"); return; }
   if (t.stop && (side === "long" ? t.stop >= price : t.stop <= price)) { msg(`The stop-loss must be ${side === "long" ? "below" : "above"} the current price (${fmt(price)}).`, "error"); return; }
   if (t.target && (side === "long" ? t.target <= price : t.target >= price)) { msg(`The target must be ${side === "long" ? "above" : "below"} the current price (${fmt(price)}).`, "error"); return; }
   const need = t.qty * price * 1.02 + chargesOf(side === "long" ? "buy" : "sell", t.qty, price);
   if (need > equityNow()) { msg(`Not enough replay funds: about ${money(need)} needed, ${money(equityNow())} available.`, "error"); return; }
   S.order = { side, qty: t.qty, stop: t.stop, target: t.target };
   msg(`${side === "long" ? "Buy" : "Short sell"} order for ${t.qty} placed: it fills at the next bar's open. Press Next bar.`, "ok");
   refreshPanels();
  }
  function open(o, b) {
   const sideTx = o.side === "long" ? "buy" : "sell", s = slip(sideTx, o.qty, b.open);
   const px = round2(o.side === "long" ? b.open + s : b.open - s), c = chargesOf(sideTx, o.qty, px);
   S.cash += (o.side === "long" ? -1 : 1) * o.qty * px - c;
   S.pos = { side: o.side, qty: o.qty, entry: px, stop: o.stop, target: o.target, inBar: S.i, charges: c, slip: s * o.qty, openedAt: Date.now() };
  }
  function close(exitPx, why, applySlip, key) {
   const p = S.pos, sideTx = p.side === "long" ? "sell" : "buy", s = applySlip ? slip(sideTx, p.qty, exitPx) : 0;
   const px = round2(p.side === "long" ? exitPx - s : exitPx + s), c = chargesOf(sideTx, p.qty, px);
   S.cash += (p.side === "long" ? 1 : -1) * p.qty * px - c;
   const pnl = (p.side === "long" ? 1 : -1) * (px - p.entry) * p.qty - p.charges - c;
   const tr = { side: p.side, qty: p.qty, entry: p.entry, exit: px, pnl, charges: p.charges + c, inBar: p.inBar, outBar: S.i, why, whyKey: key, stop: p.stop, target: p.target };
   S.trades.push(tr);
   S.pos = null;
   api.toast(`Replay trade closed (${why.toLowerCase()}): ${signed(pnl)}.`, pnl > 0 ? "ok" : "error");
   const span = b => (S.daily ? new Date((b.time + 19800) * 1000).toISOString().slice(0, 10) : new Date(b.time * 1000).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
   api.journal.record({
    source: "replay", sym: S.blind ? "Blind replay" : S.sym, side: tr.side, product: S.product, qty: tr.qty, entry: tr.entry, exit: tr.exit, pnl: round2(pnl), charges: round2(tr.charges),
    openedAt: p.openedAt, closedAt: Date.now(), stop: p.stop || undefined, target: p.target || undefined,
    autoExit: { stop: "Stop-loss hit", target: "Target reached", squareoff: "Auto square-off", end: "Time-based exit" }[tr.whyKey] || undefined,
    replay: { label: S.blind ? "Blind replay (stock revealed at the end of the session)" : `${S.sym} · ${S.daily ? "daily" : "5-minute"} · ${span(S.raw[p.inBar])} to ${span(S.raw[S.i])}${S.src === "file" ? " · imported file" : ""}`, blind: S.blind, bars: `${p.inBar + 1}-${S.i + 1}` }
   }).then(id => { if (id) S.journalIds.push(id); });
   return tr;
  }
  // Moves one bar forward: fill the waiting order at this bar's open, then check the stop-loss and target.
  function step() {
   if (!S || S.over) return;
   if (S.i >= S.bars.length - 1) { endSession("the end of the data"); return; }
   S.i++;
   const b = bar();
   if (S.order) {
    const o = S.order;
    S.order = null;
    if (o.side === "close") { if (S.pos) close(b.open, "Closed at the open", true); }
    else open(o, b);
   }
   const p = S.pos;
   if (p) {
    const long = p.side === "long";
    const stopHit = p.stop && (long ? b.low <= p.stop : b.high >= p.stop), tgtHit = p.target && (long ? b.high >= p.target : b.low <= p.target);
    // A gap through the level fills at the open; if both levels sit inside one bar, assume the stop came first.
    if (stopHit) close(long ? Math.min(b.open, p.stop) : Math.max(b.open, p.stop), "Stop-loss hit", false, "stop");
    else if (tgtHit) close(long ? Math.max(b.open, p.target) : Math.min(b.open, p.target), "Target reached", false, "target");
   }
   // Intraday (MIS) positions do not stay open overnight: square off on the last bar of each day.
   const next = S.bars[S.i + 1];
   if (S.pos && !S.daily && next && istDay(next.time) !== istDay(b.time)) close(b.close, "Auto square-off at the day's close", false, "squareoff");
   S.equity.push(equityNow());
   update(false);
   if (S.i >= S.bars.length - 1) endSession("the end of the data");
  }

  // ---------- Playback ----------
  function stopPlay() {
   clearInterval(timer);
   timer = null;
   const b = root.querySelector("[data-rplay]");
   if (b) { b.textContent = "▶ Play"; b.setAttribute("aria-pressed", "false"); }
  }
  function togglePlay() {
   if (!S || S.over) return;
   if (timer) { stopPlay(); return; }
   timer = setInterval(() => {
    // Pause while the journal form is open, or when the replay section is not on screen.
    if (api.journal.isOpen() || root.hidden || root.offsetParent === null) return;
    step();
   }, Number(prefs.speed));
   const b = root.querySelector("[data-rplay]");
   b.textContent = "⏸ Pause"; b.setAttribute("aria-pressed", "true");
  }

  // ---------- Panels ----------
  function refreshPanels() {
   const s = S, b = bar(), pos = s.pos, eq = equityNow(), pnl = eq - START_CASH;
   root.querySelector("[data-rtitle]").textContent = s.blind ? "Blind replay" : `${s.sym}${s.name && s.src !== "file" ? ` · ${s.name}` : ""}`;
   root.querySelector("[data-rprog]").textContent = `Bar ${s.i - s.startAt} of ${s.bars.length - 1 - s.startAt}${s.blind ? "" : ` · ${s.daily ? new Date((b.time + 19800) * 1000).toISOString().slice(0, 10) : new Date(b.time * 1000).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`}`;
   const unreal = pos ? (pos.side === "long" ? 1 : -1) * (b.close - pos.entry) * pos.qty : 0;
   root.querySelector("[data-raccount]").innerHTML = `<h4>Replay account <small class="ppa-time">${s.daily ? "delivery (CNC) charges" : "intraday (MIS) charges"}</small></h4>
    <dl class="ppa-kv"><div><dt>Equity</dt><dd>${money(eq)}</dd></div><div><dt>Session P&amp;L</dt><dd class="${pnl >= 0 ? "pp-up" : "pp-down"}">${signed(pnl)} (${pctS((pnl / START_CASH) * 100)})</dd></div>
    ${pos ? `<div><dt>Position</dt><dd><span class="ppa-side ${pos.side === "long" ? "buy" : "sell"}">${pos.side === "long" ? "LONG" : "SHORT"}</span> ${pos.qty} @ ${fmt(pos.entry)}</dd></div><div><dt>Unrealised (before exit charges)</dt><dd class="${unreal >= 0 ? "pp-up" : "pp-down"}">${signed(unreal - pos.charges)}</dd></div>${pos.stop || pos.target ? `<div><dt>Stop / target</dt><dd>${pos.stop ? fmt(pos.stop) : "—"} / ${pos.target ? fmt(pos.target) : "—"}</dd></div>` : ""}` : `<div><dt>Position</dt><dd>None</dd></div>`}
    ${s.order ? `<div><dt>Waiting order</dt><dd>${s.order.side === "close" ? "Exit" : s.order.side === "long" ? `Buy ${s.order.qty}` : `Short ${s.order.qty}`} at next open</dd></div>` : ""}</dl>`;
   const t = readTicket(), side = "buy", est = t.qty > 0 ? chargesOf(side, t.qty, b.close) : 0, sp = t.qty > 0 ? slip(side, t.qty, b.close) : 0;
   const risk = t.stop && t.qty > 0 ? Math.abs(b.close - t.stop) * t.qty : 0, reward = t.target && t.qty > 0 ? Math.abs(t.target - b.close) * t.qty : 0;
   root.querySelector("[data-rest]").innerHTML = t.qty > 0 ? `<span>Value ≈ <b>${money(t.qty * b.close)}</b></span><span>Charges ≈ <b>${money(est)}</b> ${api.infoButton("charges")}</span>${api.slippageOn() ? `<span>Slippage ≈ <b>${money(sp * t.qty)}</b> ${api.infoButton("slippage")}</span>` : ""}${risk ? `<span>Risk <b>${money(risk)}</b> (${((risk / eq) * 100).toFixed(2)}% of equity)</span>` : ""}${risk && reward ? `<span>Reward : risk <b>${(reward / risk).toFixed(2)}</b></span>` : ""}` : "";
   root.querySelector("[data-ractions]").innerHTML = s.over ? `<button type="button" class="pt-buy" data-rnew>Start a new session</button>`
    : pos || (s.order && s.order.side === "close") ? `<button type="button" class="pt-sell" data-rclose ${s.order ? "disabled" : ""}>Exit (X)</button>${pos ? `<button type="button" class="pp-btn" data-rlevels>Update stop / target</button>` : ""}`
    : `<button type="button" class="pt-buy" data-rbuy ${s.order ? "disabled" : ""}>Buy (B)</button>${s.daily ? "" : `<button type="button" class="pt-sell" data-rshort ${s.order ? "disabled" : ""}>Sell short (S)</button>`}${s.order ? `<button type="button" class="pp-btn" data-rcancel>Cancel order</button>` : ""}`;
   const st = PaperJournal.stats(s.trades, START_CASH);
   root.querySelector("[data-rtrades]").innerHTML = `<h4>Session trades <small class="ppa-time">${s.trades.length ? `win rate ${(st.winRate * 100).toFixed(0)}%` : ""}</small></h4>${s.trades.length ? `<ul class="ppa-mini-list">${s.trades.slice().reverse().map(tr => `<li><span class="ppa-side ${tr.side === "long" ? "buy" : "sell"}">${tr.side === "long" ? "L" : "S"}</span><span>${tr.qty} · ${fmt(tr.entry)} → ${fmt(tr.exit)}</span><b class="${tr.pnl > 0 ? "pp-up" : "pp-down"}">${signed(tr.pnl)}</b></li>`).join("")}</ul>` : `<p class="ppa-empty ppa-empty-sm">No trades yet. Read the chart, decide, and place an order: it fills at the next bar's open.</p>`}`;
  }
  function update(fit) { drawChart(fit); refreshPanels(); }

  function endSession(reason) {
   if (!S || S.over) return;
   stopPlay();
   if (S.pos) close(bar().close, "Session ended", false, "end");
   S.over = true;
   S.order = null;
   const s = S, st = PaperJournal.stats(s.trades, START_CASH), first = s.raw[s.startAt], last = s.raw[s.i];
   const day = b => (s.daily ? new Date((b.time + 19800) * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : new Date(b.time * 1000).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }));
   const hold = ((last.close / first.close - 1) * 100), net = st.net;
   // Reveal the stock behind blind trades in the journal.
   if (s.blind) {
    const label = `${s.sym} · ${s.daily ? "daily" : "5-minute"} · ${day(first)} to ${day(last)} (blind, prices rescaled)`;
    setTimeout(() => s.journalIds.forEach(id => api.journal.patch(id, { sym: `${s.sym} (blind)`, replay: { label, blind: true } })), 300);
   }
   update(false);
   const box = document.createElement("section");
   box.className = "ppa-panel pt-replay-summary";
   box.innerHTML = `<h4>Session over (${esc(reason)})</h4>
    ${s.blind ? `<p class="pt-reveal">This was <b>${esc(s.sym)}</b>${s.name && s.src !== "file" ? ` (${esc(s.name)})` : ""}, ${day(first)} to ${day(last)}.</p>` : ""}
    <div class="ppa-cards">
     <div class="ppa-card"><small>Trades</small><strong>${st.n}</strong><span>${st.wins} won · ${st.losses} lost</span></div>
     <div class="ppa-card"><small>Win rate</small><strong>${st.n ? `${(st.winRate * 100).toFixed(0)}%` : "—"}</strong></div>
     <div class="ppa-card"><small>Your result</small><strong class="${net >= 0 ? "pp-up" : "pp-down"}">${signed(net)}</strong><span>${pctS((net / START_CASH) * 100)} of ₹10 lakh</span></div>
     <div class="ppa-card"><small>Buy and hold over the same bars</small><strong class="${hold >= 0 ? "pp-up" : "pp-down"}">${hold >= 0 ? "+" : "−"}${Math.abs(hold).toFixed(2)}%</strong><span>price change, before charges</span></div>
     <div class="ppa-card"><small>Max drawdown</small><strong class="${st.maxDd ? "pp-down" : ""}">${st.maxDd ? `−${money(st.maxDd)}` : money(0)}</strong><span>${(st.maxDdPct * 100).toFixed(2)}% ${api.infoButton("drawdown")}</span></div>
    </div>
    <p class="ppa-hint">${st.n ? "Each trade is in your journal. Look at the Journal section to see which skills are working." : "No trades this time. Waiting for a clear setup is a skill too."}</p>
    <div class="ppa-funds-btns"><button type="button" class="pt-buy" data-rnew>Start a new session</button>${s.src !== "file" && !s.blind ? `<button type="button" class="pp-btn" data-rexport>⤓ Download this data as JSON</button>` : ""}</div>`;
   root.querySelector(".pt-replay-grid").before(box);
   box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // ---------- Events ----------
  root.addEventListener("submit", e => {
   if (e.target.matches("[data-rsetup]")) { e.preventDefault(); start(e.target); }
   else if (e.target.matches("[data-rticket]")) e.preventDefault();
  });
  root.addEventListener("change", async e => {
   const t = e.target;
   if (t.matches("[data-rfile]") && t.files[0]) {
    const file = t.files[0];
    try {
     if (file.size > 20e6) throw new Error("That file is larger than 20 MB.");
     imported = ingest(JSON.parse(await file.text()), file.name.replace(/\.json$/i, ""));
     renderSetup();
    } catch (err) { imported = null; renderSetup(`Could not read that file: ${err.message}`); }
   } else if (t.matches("[data-rspeed]")) { prefs.speed = t.value; savePrefs(); if (timer) { stopPlay(); togglePlay(); } }
   else if (t.matches("[data-rind]")) {
    prefs.overlays = [...root.querySelectorAll("[data-rind]:checked")].map(x => x.dataset.rind);
    savePrefs(); buildChart(); update(false);
   }
  });
  root.addEventListener("input", e => { if (S && !S.over && e.target.closest("[data-rticket]")) refreshPanels(); });
  root.addEventListener("click", e => {
   const b = e.target.closest("button");
   if (!b) return;
   if (b.hasAttribute("data-rsample")) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(sampleFile(), null, 1)], { type: "application/json" }));
    a.download = "marketpath-replay-sample.json";
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
   }
   else if (b.hasAttribute("data-rnext")) { stopPlay(); step(); }
   else if (b.hasAttribute("data-rplay")) togglePlay();
   else if (b.hasAttribute("data-rend")) { if (S.trades.length || S.pos || confirm("End this replay session?")) endSession("ended by you"); }
   else if (b.hasAttribute("data-rnew")) { S = null; renderSetup(); }
   else if (b.hasAttribute("data-rbuy")) placeOrder("long");
   else if (b.hasAttribute("data-rshort")) placeOrder("short");
   else if (b.hasAttribute("data-rclose")) placeOrder("close");
   else if (b.hasAttribute("data-rcancel")) { S.order = null; msg("Order cancelled."); refreshPanels(); }
   else if (b.hasAttribute("data-rlevels")) {
    const t = readTicket(), p = S.pos, price = bar().close;
    if (t.stop && (p.side === "long" ? t.stop >= price : t.stop <= price)) { msg("That stop-loss is on the wrong side of the price.", "error"); return; }
    if (t.target && (p.side === "long" ? t.target <= price : t.target >= price)) { msg("That target is on the wrong side of the price.", "error"); return; }
    p.stop = t.stop; p.target = t.target;
    msg("Stop-loss and target updated.", "ok");
    update(false);
   }
   else if (b.hasAttribute("data-rexport")) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify({ symbol: S.sym, source: "Yahoo Finance via MarketPathAcademy", bars: S.raw.map(x => ({ time: x.time, open: x.open, high: x.high, low: x.low, close: x.close, volume: x.volume })) })], { type: "application/json" }));
    a.download = `${S.sym}-${S.daily ? "daily" : "5min"}.json`;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
   }
  });
  root.addEventListener("keydown", e => {
   if (!S || S.over || e.ctrlKey || e.metaKey || e.altKey || api.journal.isOpen()) return;
   if (e.target.matches("input, select, textarea") && e.key !== "ArrowRight") return;
   if (e.target.matches("input, select, textarea")) return;
   const k = e.key.toLowerCase();
   if (e.key === "ArrowRight") { e.preventDefault(); stopPlay(); step(); }
   else if (k === "p") { e.preventDefault(); togglePlay(); }
   else if (k === "b" && !S.pos && !S.order) placeOrder("long");
   else if (k === "s" && !S.pos && !S.order && !S.daily) placeOrder("short");
   else if (k === "x" && S.pos && !S.order) placeOrder("close");
  });
  document.addEventListener("mp-theme-change", () => { if (S && chart) { buildChart(); update(false); } });

  return {
   show() {
    if (!root.dataset.ready) {
     root.dataset.ready = "1";
     renderSetup();
     api.covered().then(list => { coveredList = list || []; if (!S) renderSetup(); });
    } else if (S && chart) { chart.timeScale().scrollToRealTime(); }
   },
   hide() { stopPlay(); }
  };
 }
 return { create, ingest };
})();
