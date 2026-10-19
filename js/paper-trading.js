// Paper trading practice module (index.html#paper). Virtual money only: nothing is sent to a broker.
// Feeds: "nse" uses real NSE prices, delayed about 5–10 minutes (data files published by tools/fetch-quotes.js);
// "sim" simulates any NSE-listed stock in the browser (a random walk around a per-symbol base price), for practice
// at any hour; "finnhub" polls Finnhub's free quote and symbol-search APIs with the visitor's own API key.
// Each feed keeps its own account, watchlist and drawings, because the feeds price in different currencies.
// The page section is a broker-style terminal: a top bar with the sections, a watchlist column (five lists) with
// Buy / Sell / Chart buttons on each row, the chart, and an order window.
// Needs shared.js (MP.esc), paper-symbols.js, paper-charges.js, paper-indicators.js, paper-drawings.js and
// paper-account.js (the Dashboard, Orders, Holdings, Positions, Funds, Portfolio and Trade history views).
// Lightweight Charts is optional: prices, orders and P&L still work if it fails to load.
(function () {
 const STORE_KEY = "mp-paper-v2";
 const KEY_STORE = "mp-finnhub-key";
 const MAX_BARS = 1440;           // one-minute bars kept per symbol (24 hours)
 const SIM_SIGMA = 0.0003;        // simulator volatility per tick
 const TZ = -new Date().getTimezoneOffset() * 60; // Lightweight Charts plots UTC; shift so the axis shows local time
 const UP = "#2fbf8f", DOWN = "#ef5f6b";
 const PI = PaperIndicators;

 // Seed prices for a few large stocks so their simulated level looks familiar. Every other symbol gets a
 // deterministic seed from its name. These are starting points for a simulation, not market prices.
 const KNOWN_BASE = {
  RELIANCE: 1400, TCS: 3100, HDFCBANK: 980, INFY: 1500, ICICIBANK: 1400, SBIN: 850, ITC: 410, BHARTIARTL: 1950,
  LT: 3700, KOTAKBANK: 2100, AXISBANK: 1150, HINDUNILVR: 2400, ASIANPAINT: 2400, MARUTI: 12500, SUNPHARMA: 1650,
  WIPRO: 250, HCLTECH: 1500, BAJFINANCE: 950, TITAN: 3500, NTPC: 340, ONGC: 245, TATASTEEL: 165
 };

 const FEEDS = {
  nse: {
   label: "NSE real prices (delayed)", currency: "₹", locale: "en-IN", start: 1000000, charges: "india", interval: 300000, minMove: 0.05,
   badge: "REAL PRICES · DELAYED", squareOff: "3:20 pm",
   note: "Loading real NSE prices…",
   watchlist: ["RELIANCE", "TCS", "HDFCBANK", "INFY", "ICICIBANK", "SBIN", "ITC", "BHARTIARTL"]
  },
  sim: {
   label: "Simulated NSE feed", currency: "₹", locale: "en-IN", start: 1000000, charges: "india", interval: 2000, minMove: 0.05,
   badge: "SIMULATED",
   note: "Simulated prices for any NSE-listed stock, generated in your browser. They move like a market but are not real quotes.",
   watchlist: ["RELIANCE", "TCS", "HDFCBANK", "INFY", "ICICIBANK", "SBIN", "ITC", "BHARTIARTL"]
  },
  finnhub: {
   label: "Live quotes (Finnhub)", currency: "$", locale: "en-US", start: 100000, charges: "none", interval: 20000, minMove: 0.01,
   badge: "LIVE · FINNHUB",
   note: "Live quotes from Finnhub with your own free API key. The free plan mainly covers US-listed symbols. The chart builds up from quotes while this page is open.",
   watchlist: ["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "TSLA", "META", "JPM"],
   names: { AAPL: "Apple", MSFT: "Microsoft", NVDA: "NVIDIA", AMZN: "Amazon", GOOGL: "Alphabet", TSLA: "Tesla", META: "Meta Platforms", JPM: "JPMorgan Chase" }
  }
 };

 // Chart indicators: every indicator taught in the lessons, plus common moving averages. Each one lists its
 // series (key, colour, kind: line, step, dots or hist), whether it gets its own pane, reference levels, and
 // calc(bars, closes) -> { key: values aligned to bars }. A value is a number, null (not enough data yet),
 // { value, color } for a coloured point, or GAP to break the line. vol: needs traded volume, which the
 // real-price feed does not have.
 const GAP = "gap";
 const G_UP = "#2fbf8f", G_DOWN = "#ef5f6b";
 const trendColour = (values, up) => values.map((v, i) => (v === null ? null : i > 0 && up[i - 1] !== null && up[i] !== up[i - 1] ? GAP : { value: v, color: up[i] ? G_UP : G_DOWN }));
 const INDICATOR_GROUPS = [["ma", "Moving averages"], ["overlay", "Trend and price overlays"], ["osc", "Oscillators (own pane)"], ["volume", "Volume"]];
 const INDICATORS = [
  { id: "ema9", group: "ma", label: "EMA 9", color: "#f4d35e", lines: [{ key: "ema9", color: "#f4d35e" }], calc: (b, c) => ({ ema9: PI.ema(c, 9) }) },
  { id: "ema21", group: "ma", label: "EMA 21", color: "#2ec4b6", lines: [{ key: "ema21", color: "#2ec4b6" }], calc: (b, c) => ({ ema21: PI.ema(c, 21) }) },
  { id: "sma20", group: "ma", label: "SMA 20", color: "#ffbf78", lines: [{ key: "sma20", color: "#ffbf78", width: 2 }], calc: (b, c) => ({ sma20: PI.sma(c, 20) }) },
  { id: "ema50", group: "ma", label: "EMA 50", color: "#a994ff", lines: [{ key: "ema50", color: "#a994ff", width: 2 }], calc: (b, c) => ({ ema50: PI.ema(c, 50) }) },
  { id: "sma50", group: "ma", label: "SMA 50", color: "#ff7a45", lines: [{ key: "sma50", color: "#ff7a45", width: 2 }], calc: (b, c) => ({ sma50: PI.sma(c, 50) }) },
  { id: "sma200", group: "ma", label: "SMA 200", color: "#8d99ae", lines: [{ key: "sma200", color: "#8d99ae", width: 2 }], calc: (b, c) => ({ sma200: PI.sma(c, 200) }) },
  { id: "bb", group: "overlay", label: "Bollinger Bands 20, 2", color: "#45a9d9",
   lines: [{ key: "bbU", color: "#45a9d9" }, { key: "bbM", color: "rgba(69,169,217,.7)", style: 2 }, { key: "bbL", color: "#45a9d9" }],
   calc: (b, c) => { const x = PI.bollinger(c, 20, 2); return { bbU: x.upper, bbM: x.mid, bbL: x.lower }; } },
  { id: "supertrend", group: "overlay", label: "Supertrend 10, 3", color: G_UP, lines: [{ key: "st", color: G_UP, width: 2 }],
   calc: b => { const x = PI.supertrend(b, 10, 3); return { st: trendColour(x.value, x.up) }; } },
  { id: "psar", group: "overlay", label: "Parabolic SAR 0.02, 0.2", color: "#ffbf78", lines: [{ key: "psar", color: "#ffbf78", kind: "dots" }],
   calc: b => { const x = PI.psar(b); return { psar: x.value.map((v, i) => (v === null ? null : { value: v, color: x.up[i] ? G_UP : G_DOWN })) }; } },
  { id: "ichimoku", group: "overlay", label: "Ichimoku cloud 9, 26, 52", color: "#d95926",
   lines: [{ key: "ichT", color: "#45a9d9" }, { key: "ichK", color: "#d95926" }, { key: "ichA", color: "rgba(47,191,143,.85)" }, { key: "ichB", color: "rgba(239,95,107,.85)" }, { key: "ichC", color: "#a994ff", style: 2 }],
   calc: b => { const x = PI.ichimoku(b); return { ichT: x.tenkan, ichK: x.kijun, ichA: x.spanA, ichB: x.spanB, ichC: x.chikou }; } },
  { id: "pivots", group: "overlay", label: "Pivot points (classic, daily)", color: "#ffbf78",
   lines: [{ key: "pvP", color: "#ffbf78", kind: "step", style: 2 }, { key: "pvR1", color: G_DOWN, kind: "step", style: 2 }, { key: "pvR2", color: G_DOWN, kind: "step", style: 1 }, { key: "pvS1", color: G_UP, kind: "step", style: 2 }, { key: "pvS2", color: G_UP, kind: "step", style: 1 }],
   calc: b => { const x = PI.pivots(b); return { pvP: x.p, pvR1: x.r1, pvR2: x.r2, pvS1: x.s1, pvS2: x.s2 }; } },
  { id: "vwap", group: "overlay", label: "VWAP", color: "#ff8ed1", vol: true, intraday: true, lines: [{ key: "vwap", color: "#ff8ed1", width: 2 }], calc: b => ({ vwap: PI.vwap(b) }) },
  { id: "rsi", group: "osc", label: "RSI 14", color: "#a994ff", pane: true, levels: [70, 30], lines: [{ key: "rsi", color: "#a994ff", width: 2 }], calc: (b, c) => ({ rsi: PI.rsi(c, 14) }) },
  { id: "macd", group: "osc", label: "MACD 12, 26, 9", color: "#45a9d9", pane: true,
   lines: [{ key: "macdHist", kind: "hist" }, { key: "macd", color: "#45a9d9", width: 2 }, { key: "macdSig", color: "#ffbf78" }],
   calc: (b, c) => { const m = PI.macd(c); return { macd: m.macd, macdSig: m.signal, macdHist: m.hist.map(v => (v === null ? null : { value: v, color: v >= 0 ? "rgba(47,191,143,.6)" : "rgba(239,95,107,.6)" })) }; } },
  { id: "stoch", group: "osc", label: "Stochastic 14, 3, 3", color: "#45a9d9", pane: true, levels: [80, 20],
   lines: [{ key: "stK", color: "#45a9d9", width: 2 }, { key: "stD", color: "#ffbf78" }], calc: b => { const x = PI.stochastic(b); return { stK: x.k, stD: x.d }; } },
  { id: "cci", group: "osc", label: "CCI 20", color: "#ff8ed1", pane: true, levels: [100, -100], lines: [{ key: "cci", color: "#ff8ed1", width: 2 }], calc: b => ({ cci: PI.cci(b, 20) }) },
  { id: "adx", group: "osc", label: "ADX 14 with +DI / −DI", short: "ADX 14", color: "#f4d35e", pane: true, levels: [25],
   lines: [{ key: "adx", color: "#f4d35e", width: 2 }, { key: "pdi", color: G_UP }, { key: "mdi", color: G_DOWN }], calc: b => { const x = PI.adx(b); return { adx: x.adx, pdi: x.pdi, mdi: x.mdi }; } },
  { id: "atr", group: "osc", label: "ATR 14", color: "#ffbf78", pane: true, lines: [{ key: "atr", color: "#ffbf78", width: 2 }], calc: b => ({ atr: PI.atr(b, 14) }) },
  { id: "vol", group: "volume", label: "Volume bars", vol: true },
  { id: "obv", group: "volume", label: "OBV (On-Balance Volume)", short: "OBV", color: "#45a9d9", pane: true, vol: true, lines: [{ key: "obv", color: "#45a9d9", width: 2 }], calc: b => ({ obv: PI.obv(b) }) },
  { id: "mfi", group: "volume", label: "MFI 14 (Money Flow Index)", short: "MFI 14", color: "#ff8ed1", pane: true, vol: true, levels: [80, 20], lines: [{ key: "mfi", color: "#ff8ed1", width: 2 }], calc: b => ({ mfi: PI.mfi(b, 14) }) }
 ];

 const NSE_NAME = new Map(typeof NSE_SYMBOLS !== "undefined" ? NSE_SYMBOLS : []);

 const $ = id => document.getElementById(id);
 const esc = s => MP.esc(s);
 const cfg = () => FEEDS[state.feed];
 // ---------- Timeframes (like a broker chart: minutes, hours, days) ----------
 // [id, menu label, short label, seconds]. Intraday candles are built from the feed's base bars (1-minute on the
 // simulated and Finnhub feeds, 5-minute real prices on the NSE feed); 1D/1W/1M use daily candles.
 const TIMEFRAMES = [
  ["1", "1 Min", "1m", 60], ["2", "2 Min", "2m", 120], ["3", "3 Min", "3m", 180], ["4", "4 Min", "4m", 240],
  ["5", "5 Min", "5m", 300], ["10", "10 Min", "10m", 600], ["15", "15 Min", "15m", 900], ["30", "30 Min", "30m", 1800],
  ["60", "1 Hour", "1h", 3600], ["120", "2 Hours", "2h", 7200], ["180", "3 Hours", "3h", 10800], ["240", "4 Hours", "4h", 14400],
  ["D", "1 Day", "1D", 86400], ["W", "1 Week", "1W", 604800], ["M", "1 Month", "1M", 2629800]
 ];
 const TF_GROUPS = [[0, 8], [8, 12], [12, 15]];
 const DAILY_TF = ["D", "W", "M"];
 // Date-range buttons under the chart: each picks a suitable timeframe and zooms to the period.
 const RANGES = [["1D", "Today", 1], ["5D", "5 days", 5], ["1M", "1 month", 30], ["3M", "3 months", 91], ["6M", "6 months", 182], ["1Y", "1 year", 365], ["2Y", "2 years", 730]];
 function tfAvailable(id) {
  if (state.feed === "finnhub") return !DAILY_TF.includes(id); // quotes are collected while the page is open
  if (state.feed === "nse") return DAILY_TF.includes(id) || Number(id) % 5 === 0; // real intraday data is 5-minute
  return true;
 }
 const tfId = () => {
  const id = String(store.prefs.tf);
  if (TIMEFRAMES.some(t => t[0] === id) && tfAvailable(id)) return id;
  return state.feed === "nse" ? "5" : "1";
 };
 const tfDef = () => TIMEFRAMES.find(t => t[0] === tfId());
 const tfSec = () => tfDef()[3];
 const isDaily = () => DAILY_TF.includes(tfId());
 function rangeTf(days) {
  if (days <= 1) return state.feed === "nse" ? "5" : "1";
  if (days <= 5) return state.feed === "nse" ? "15" : "5";
  if (state.feed === "finnhub") return "15";
  return days > 365 ? "W" : "D";
 }
 // Real prices carry no volume, so volume-based indicators are unavailable on the NSE feed.
 // (daily candles from the data files do carry volume, so on 1D/1W/1M they work). VWAP resets every day, so it
 // only makes sense on intraday timeframes.
 const indAvailable = def => !(def.vol && state.feed === "nse" && !isDaily()) && !(def.intraday && isDaily());
 const indOn = id => { const def = INDICATORS.find(d => d.id === id); return !!def && indAvailable(def) && store.prefs.indicators.includes(id); };
 const activeIndicators = () => INDICATORS.filter(d => indOn(d.id));
 const volOn = () => indOn("vol");
 const fmt = n => Number(n).toLocaleString(cfg().locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
 const money = n => `${cfg().currency} ${fmt(n)}`;
 const signed = n => `${n >= 0 ? "+" : "−"}${money(Math.abs(n))}`;
 const gauss = () => Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
 const roundTick = x => Math.max(0.05, Math.round(x * 20) / 20);

 const state = {
  feed: "sim", symbol: null, bars: {}, prices: {}, ref: {}, base: {}, noQuote: new Set(), keyBad: false,
  stop: null, chart: null, series: {}, view: [], lastLen: 0, hoverTime: null, expanded: false,
  screen: "chart", focus: null, // terminal section shown, and the watchlist row whose B / S / chart buttons are open
  daily: {}, range: null, pendingRange: null // daily candles per symbol; the date-range button in use and one still to apply
 };
 const WATCHLISTS = 5, WATCH_MAX = 50;
 const SCREENS = ["watchlist", "dashboard", "chart", "replay", "orders", "holdings", "positions", "funds", "portfolio", "history", "journal"];
 const OWN_PANES = { chart: "ptChartPane", replay: "ptReplayPane", journal: "ptJournalPane" }; // sections with their own pane

 // ---------- Persistence (per-viewer; storage can be blocked, so every access is wrapped) ----------
 const store = (function load() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { s = null; }
  s = s && typeof s === "object" ? s : {};
  ["accounts", "watchlists", "drawings", "lastPrices", "names"].forEach(k => { s[k] = s[k] || {}; });
  s.prefs = Object.assign({ tf: 1, chartType: "candles", indicators: ["vol", "sma20"], plan: "zero", slab: 30, slippage: true }, s.prefs || {});
  return s;
 })();
 function save() {
  if (state.feed === "sim") store.lastPrices.sim = Object.assign(store.lastPrices.sim || {}, state.prices);
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* storage unavailable */ }
 }
 function readKey() { try { return localStorage.getItem(KEY_STORE) || ""; } catch (e) { return ""; } }
 function writeKey(key) { try { localStorage.setItem(KEY_STORE, key); } catch (e) { /* storage unavailable */ } }

 function account() {
  let a = store.accounts[state.feed];
  if (!a || !a.realized) a = store.accounts[state.feed] = { cash: cfg().start, positions: {}, pending: [], orders: [], realized: { stcg: 0, ltcg: 0, intraday: 0 }, charges: 0 };
  // Funds added or withdrawn: deposits is the net amount, ledger the statement (added in the terminal version).
  if (typeof a.deposits !== "number") a.deposits = 0;
  if (!Array.isArray(a.ledger)) a.ledger = [];
  return a;
 }
 // Five watchlists per feed, like a broker app. Earlier versions kept one array per feed: it becomes list 1.
 function watchStore() {
  let w = store.watchlists[state.feed];
  if (Array.isArray(w)) w = { lists: [w], active: 0 };
  if (!w || !Array.isArray(w.lists)) w = { lists: [cfg().watchlist.slice()], active: 0 };
  while (w.lists.length < WATCHLISTS) w.lists.push([]);
  if (!(w.active >= 0 && w.active < WATCHLISTS)) w.active = 0;
  return (store.watchlists[state.feed] = w);
 }
 const watchlist = () => watchStore().lists[watchStore().active];
 const capital = a => cfg().start + (a.deposits || 0);
 function drawingsFor(sym) {
  const f = store.drawings[state.feed] || (store.drawings[state.feed] = {});
  return f[sym] || (f[sym] = []);
 }
 function nameOf(sym) {
  if (state.feed !== "finnhub") return NSE_NAME.get(sym) || "";
  return (store.names.finnhub || {})[sym] || cfg().names[sym] || "";
 }

 // ---------- Charges, positions and P&L ----------
 function charges(side, product, qty, price) {
  if (cfg().charges !== "india") return { brokerage: 0, stt: 0, exchange: 0, sebi: 0, stamp: 0, dp: 0, gst: 0, total: 0 };
  return PaperCharges.compute(side, product, qty, price, store.prefs.plan);
 }
 // Estimated slippage on a market order (see PaperCosts.slippage and its disclosure). The stock's average daily
 // traded value comes from the last 20 daily candles when they are loaded.
 let journal = null; // the trading journal (created at start-up)
 function advOf(sym) {
  const d = state.feed === "nse" ? ((window.MP_DAILY || {})[sym] ? nseDaily(sym) : []) : state.daily[sym] || [];
  const last = d.slice(-20).filter(b => b.volume > 0);
  return last.length >= 5 ? last.reduce((s, b) => s + b.close * b.volume, 0) / last.length : 0;
 }
 function tierOf(sym) {
  if (state.feed === "finnhub") return "high";
  if (state.feed === "sim") return KNOWN_BASE[sym] ? "high" : "mid";
  if (!isLiveCovered(sym)) return "low";
  return advOf(sym) >= 5e9 ? "high" : "mid";
 }
 function slippageFor(side, qty, price, sym) {
  if (!store.prefs.slippage || !(qty > 0) || !(price > 0)) return null;
  return PaperCosts.slippage({ price, qty, side, tier: tierOf(sym), adv: advOf(sym), tick: cfg().minMove });
 }
 const posKey = (sym, product) => `${sym}|${product}`;
 const posQty = p => p.lots.reduce((s, l) => s + l.qty, 0);
 const posAvg = p => { const q = posQty(p); return q ? p.lots.reduce((s, l) => s + l.qty * l.price, 0) / q : 0; };
 const posCost = p => p.lots.reduce((s, l) => s + l.qty * (l.price + l.cps), 0);
 const reservedForBuys = a => a.pending.filter(o => o.side === "buy").reduce((s, o) => s + o.qty * o.limit + charges("buy", o.product, o.qty, o.limit).total, 0);
 const available = a => a.cash - reservedForBuys(a);
 const pendingSellQty = (a, sym, product) => a.pending.filter(o => o.side === "sell" && o.sym === sym && o.product === product).reduce((s, o) => s + o.qty, 0);
 function freeToSell(a, sym, product) {
  const p = a.positions[posKey(sym, product)];
  return (p ? posQty(p) : 0) - pendingSellQty(a, sym, product);
 }
 function taxEstimate(a) {
  if (cfg().charges !== "india") return { stcgTax: 0, ltcgTax: 0, intradayTax: 0, cess: 0, total: 0 };
  return PaperCharges.estimateTax(a.realized, (Number(store.prefs.slab) || 0) / 100);
 }

 // order: { side, sym, product, qty, type, limit }
 function placeOrder(order) {
  const a = account(), price = state.prices[order.sym];
  if (!(price > 0)) return "No price yet for this symbol. Wait a moment and try again.";
  if (!Number.isInteger(order.qty) || order.qty <= 0) return "Enter a whole-number quantity above zero.";
  if (order.type === "limit" && !(order.limit > 0)) return "Enter a limit price above zero.";
  if (order.product === "intraday" && !order.tag && pastSquareOff()) return "New intraday orders are not allowed after 3:20 pm. Use the Delivery product, or trade intraday tomorrow.";
  // Market orders fill at the shown price plus the estimated slippage; limit orders at the limit price.
  const slip = order.type === "market" ? slippageFor(order.side, order.qty, price, order.sym) : null;
  const ref = order.type === "limit" ? order.limit : slip ? slip.fillPrice : price;
  if (order.side === "buy") {
   const need = order.qty * ref + charges("buy", order.product, order.qty, ref).total;
   if (need > available(a)) return `Not enough virtual funds: this order needs ${money(need)} and ${money(available(a))} is available.`;
  } else {
   const free = freeToSell(a, order.sym, order.product);
   if (order.qty > free) return `You can sell up to ${free} ${order.sym} (${order.product}). Short selling is not simulated.`;
  }
  const rec = {
   id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), time: Date.now(),
   side: order.side, sym: order.sym, product: order.product, qty: order.qty, type: order.type,
   limit: order.type === "limit" ? order.limit : null, status: "open", price: null
  };
  if (order.tag) rec.tag = order.tag;
  if (slip) rec.slippage = Math.round(slip.total * 100) / 100;
  if (order.type === "market") fill(a, rec, Math.round(ref * 100) / 100);
  else a.pending.push(rec);
  save();
  scheduleRender();
  return null;
 }

 // Fills an order. Sells consume buy lots first-in-first-out; the gain on each lot is net of the buy and sell
 // charges and is classed as intraday, short-term (held up to 12 months) or long-term capital gain.
 function fill(a, rec, price) {
  const c = charges(rec.side, rec.product, rec.qty, price);
  const key = posKey(rec.sym, rec.product);
  if (rec.side === "buy") {
   a.cash -= rec.qty * price + c.total;
   const p = a.positions[key] || (a.positions[key] = { sym: rec.sym, product: rec.product, lots: [] });
   p.lots.push({ qty: rec.qty, price, cps: c.total / rec.qty, time: Date.now() });
  } else {
   const p = a.positions[key];
   if (!p) return;
   a.cash += rec.qty * price - c.total;
   const sellCps = c.total / rec.qty, now = Date.now();
   let left = rec.qty, gain = 0, cost = 0, buyCharges = 0, opened = now;
   while (left > 0 && p.lots.length) {
    const lot = p.lots[0], q = Math.min(left, lot.qty);
    const g = q * (price - sellCps) - q * (lot.price + lot.cps);
    cost += q * lot.price; buyCharges += q * lot.cps; opened = Math.min(opened, lot.time);
    const cat = rec.product === "intraday" ? "intraday" : (now - lot.time) / 86400000 > PaperCharges.tax.longTermDays ? "ltcg" : "stcg";
    a.realized[cat] += g;
    gain += g;
    lot.qty -= q;
    left -= q;
    if (lot.qty === 0) p.lots.shift();
   }
   if (!p.lots.length) delete a.positions[key];
   rec.gain = gain;
   // Every closed trade goes to the trading journal.
   if (journal) journal.record({
    source: "paper", sym: rec.sym, side: "long", product: rec.product, qty: rec.qty, entry: Math.round((cost / rec.qty) * 100) / 100, exit: price,
    pnl: Math.round(gain * 100) / 100, charges: Math.round((buyCharges + c.total) * 100) / 100, openedAt: opened, closedAt: now,
    autoExit: rec.tag === "Auto square-off" ? "Auto square-off" : undefined, feed: state.feed
   });
  }
  a.charges += c.total;
  rec.status = "filled";
  rec.price = price;
  rec.chargesTotal = c.total;
  rec.time = Date.now();
  a.orders.unshift(rec);
  a.orders = a.orders.slice(0, 200);
 }

 // ---------- Price data ----------
 function activeSymbols() {
  const a = account(), set = new Set(watchlist());
  if (state.symbol) set.add(state.symbol);
  Object.values(a.positions).forEach(p => set.add(p.sym));
  a.pending.forEach(o => set.add(o.sym));
  return set;
 }

 function addToBars(sym, price, vol) {
  const bars = state.bars[sym] || (state.bars[sym] = []);
  const m = Math.floor(Date.now() / 60000) * 60;
  let last = bars[bars.length - 1];
  if (last && m - last.time > MAX_BARS * 60) { bars.length = 0; last = null; }
  if (last && last.time === m) {
   last.high = Math.max(last.high, price);
   last.low = Math.min(last.low, price);
   last.close = price;
   last.volume += vol;
   return;
  }
  // Keep bars contiguous (one per minute) so drawings can map time to bar position.
  if (last) for (let t = last.time + 60; t < m; t += 60) bars.push({ time: t, open: last.close, high: last.close, low: last.close, close: last.close, volume: 0 });
  const open = last ? last.close : price;
  bars.push({ time: m, open, high: Math.max(open, price), low: Math.min(open, price), close: price, volume: vol });
  if (bars.length > MAX_BARS) bars.splice(0, bars.length - MAX_BARS);
 }

 // Fills open orders that a new price reaches. ts = time of a real price (seconds); after-market orders saved by an
// earlier version of this page fill only on a real price from a later session.
 function checkPending(sym, price, ts) {
  const a = account();
  let filled = false;
  a.pending = a.pending.filter(o => {
   if (o.sym !== sym) return true;
   if (o.type === "amo") {
    // Fills at the first price of a later session: the market must be open and the price newer than the order.
    if (!(marketOpenNow() && ts && ts * 1000 > o.time)) return true;
   } else {
    const hit = o.side === "buy" ? price <= o.limit : price >= o.limit;
    if (!hit) return true;
   }
   fill(a, o, price);
   filled = true;
   return false;
  });
  if (filled) save();
 }

 function onPrice(sym, price, vol) {
  state.prices[sym] = price;
  addToBars(sym, price, vol);
  checkPending(sym, price, Date.now() / 1000);
  if (sym === state.symbol) updateChart(false);
  scheduleRender();
 }

 // Simulator: mean-reverting random walk around a base price, so prices stay plausible over long sessions.
 function hash(sym) {
  let h = 2166136261;
  for (let i = 0; i < sym.length; i++) { h ^= sym.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) / 4294967296;
 }
 const seedPrice = sym => KNOWN_BASE[sym] || roundTick(30 * Math.pow(150, hash(sym))); // ₹30 to ₹4,500
 const tickVolume = sym => Math.round((50 + hash(sym + "v") * 2000) * (0.4 + Math.random() * 1.2));
 const simStep = (p, base) => p + (base - p) * 0.0005 + gauss() * p * SIM_SIGMA;

 function backfillSim(sym) {
  const saved = (store.lastPrices.sim || {})[sym];
  const base = saved > 0 ? saved : seedPrice(sym);
  state.base[sym] = base;
  const now = Math.floor(Date.now() / 60000) * 60, bars = [];
  let p = base * (0.97 + Math.random() * 0.06);
  for (let i = MAX_BARS - 1; i >= 0; i--) {
   const open = p;
   let hi = p, lo = p, vol = 0;
   for (let k = 0; k < 30; k++) { p = simStep(p, base); hi = Math.max(hi, p); lo = Math.min(lo, p); vol += tickVolume(sym); }
   bars.push({ time: now - i * 60, open, high: hi, low: lo, close: p, volume: vol });
  }
  // Continue from the last price seen on an earlier visit, so open positions keep their value.
  const f = saved > 0 ? saved / p : 1;
  bars.forEach(b => { b.open = roundTick(b.open * f); b.high = roundTick(b.high * f); b.low = roundTick(b.low * f); b.close = roundTick(b.close * f); });
  state.bars[sym] = bars;
  state.prices[sym] = bars[bars.length - 1].close;
  state.ref[sym] = bars[0].open;
 }

 function ensureData(sym) {
  if (state.feed === "nse") applyQuote(sym);
  else if (state.feed === "sim" && !state.bars[sym]) backfillSim(sym);
 }

 function startSim() {
  const id = setInterval(() => {
   activeSymbols().forEach(sym => {
    ensureData(sym);
    onPrice(sym, roundTick(simStep(state.prices[sym], state.base[sym])), tickVolume(sym));
   });
  }, cfg().interval);
  return () => clearInterval(id);
 }

 function finnhubGet(path) {
  const url = `https://finnhub.io/api/v1/${path}${path.includes("?") ? "&" : "?"}token=${encodeURIComponent(readKey())}`;
  return fetch(url).then(r => {
   if (r.status === 401 || r.status === 403) throw new Error("key");
   if (r.status === 429) throw new Error("rate");
   if (!r.ok) throw new Error(`HTTP ${r.status}`);
   return r.json();
  });
 }
 function feedError(e) {
  if (e.message === "key") { state.keyBad = true; setNote("Finnhub rejected the API key. Check it and save again."); }
  else if (e.message === "rate") setNote("Finnhub rate limit reached. Quotes resume automatically.");
  else setNote(`Could not load quotes (${e.message}). Check your connection and key.`);
 }
 async function quoteFinnhub(sym) {
  try {
   const q = await finnhubGet(`quote?symbol=${encodeURIComponent(sym)}`);
   if (q.c > 0) { state.ref[sym] = q.pc || q.o; state.noQuote.delete(sym); onPrice(sym, q.c, 0); }
   else { state.noQuote.add(sym); scheduleRender(); }
  } catch (e) { feedError(e); }
 }
 function startFinnhub() {
  let stopped = false, timer = null;
  async function poll() {
   for (const sym of [...activeSymbols()].slice(0, 25)) {
    if (stopped || state.keyBad) return;
    await quoteFinnhub(sym);
   }
   if (!stopped) timer = setTimeout(poll, cfg().interval);
  }
  poll();
  return () => { stopped = true; clearTimeout(timer); };
 }

 // ---------- NSE delayed feed: real prices from data/quotes.js and data/intraday/<SYM>.js ----------
 // Browsers cannot read NSE or Yahoo directly, so tools/fetch-quotes.js publishes these files every 5 minutes
 // in market hours. NIFTY 500 stocks have 5-minute prices for the chart; other stocks have their last close.
 const NSE_OPEN_REFRESH = 5 * 60 * 1000, NSE_CLOSED_REFRESH = 30 * 60 * 1000;
 let nseQuotes = null, nseLoadedAt = 0;
 const dataFile = sym => sym.replace(/[^A-Za-z0-9]/g, "_"); // same rule as tools/fetch-quotes.js
 const dataUrl = rel => `${window.MPChrome ? MPChrome.url(rel) : rel}?t=${Date.now()}`; // bypass the cache
 function loadScript(src) {
  return new Promise((resolve, reject) => {
   const s = document.createElement("script");
   s.src = src;
   s.onload = () => { s.remove(); resolve(); };
   s.onerror = () => { s.remove(); reject(new Error("could not load " + src)); };
   document.head.appendChild(s);
  });
 }
 // NSE equity session: Monday–Friday, 9:15 am–3:30 pm IST (exchange holidays are not known here).
 function marketOpenNow() {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date()).map(x => [x.type, x.value]));
  const mins = Number(p.hour) * 60 + Number(p.minute);
  return !["Sat", "Sun"].includes(p.weekday) && mins >= 555 && mins <= 930;
 }
 const isLiveCovered = sym => !!(nseQuotes && nseQuotes.q[sym] && nseQuotes.q[sym][3] === 1);
 // 5-minute candles from 5-minute prices: each candle opens at the previous price and closes at its own.
 function barsFromIntraday(d) {
  const bars = [];
  let prev = d.pc || d.c[0];
  d.t.forEach((ts, i) => {
   const c = d.c[i], bt = Math.floor(ts / 300) * 300, last = bars[bars.length - 1];
   if (last && last.time === bt) { last.close = c; last.high = Math.max(last.high, c); last.low = Math.min(last.low, c); }
   else bars.push({ time: bt, open: prev, high: Math.max(prev, c), low: Math.min(prev, c), close: c, volume: 0 });
   prev = c;
  });
  return bars;
 }
 async function loadIntraday(sym) {
  if (!isLiveCovered(sym)) { state.bars[sym] = []; return; }
  try {
   await loadScript(dataUrl(`data/intraday/${dataFile(sym)}.js`));
   const d = (window.MP_INTRADAY || {})[sym];
   if (d && d.c && d.c.length) { state.bars[sym] = barsFromIntraday(d); live.sig[sym] = tickSigma(d.c); live.band[sym] = sessionRange(d); }
  } catch (e) { /* keep the previous bars */ }
 }
 function applyQuote(sym) {
  const v = nseQuotes && nseQuotes.q[sym];
  if (!v) { state.noQuote.add(sym); return; }
  state.noQuote.delete(sym);
  const shown = state.prices[sym], prevAnchor = live.anchor[sym];
  live.anchor[sym] = v[0];
  delete live.after[sym];
  if (prevAnchor && shown > 0 && shown !== v[0] && marketOpenNow()) live.glide[sym] = { from: shown, to: v[0], start: Date.now() };
  else { state.prices[sym] = v[0]; delete live.glide[sym]; }
  state.ref[sym] = v[1] || v[0];
  checkPending(sym, state.prices[sym], v[2]);
 }

 // ---------- Live-like ticks between the 5-minute real updates ----------
 // Real prices arrive every 5 minutes. In market hours the shown price moves every 2 seconds in a mean-reverting
 // random walk around the latest real price (the anchor), sized by the stock's own recent 5-minute volatility and
 // kept within 1% of the anchor. When a new real price arrives, the anchor glides to it over a minute.
 // These ticks are simulated; the note under the chart says so.
 const TICK_MS = 2000, GLIDE_MS = 60000, PULL = 0.15;
 const live = { anchor: {}, glide: {}, sig: {}, band: {}, after: {} };
 // Low and high of the last session's real 5-minute prices (this spans its open and its close).
 function sessionRange(d) {
  const day = ts => Math.floor((ts + 19800) / 86400);
  const last = day(d.t[d.t.length - 1]), c = d.c.filter((v, i) => day(d.t[i]) === last);
  return [Math.min(...c), Math.max(...c)];
 }
 // After hours: the anchor wanders slowly inside the last session's range, starting from the closing price.
 // Stocks without 5-minute data use the range between the last two closes, widened by 0.3% each side.
 function afterHoursAnchor(sym) {
  const close = live.anchor[sym];
  if (!(close > 0)) return null;
  let band = live.band[sym];
  if (!band) {
   const prev = state.ref[sym] || close;
   band = [Math.min(close, prev) * 0.997, Math.max(close, prev) * 1.003];
  }
  const x = live.after[sym] || close;
  const next = Math.min(band[1], Math.max(band[0], x + (close - x) * 0.01 + gauss() * close * (live.sig[sym] || 0.0004) * 0.6));
  live.after[sym] = next;
  return next;
 }
 // Per-tick volatility so that the walk's typical spread is about 60% of a real 5-minute move.
 function tickSigma(closes) {
  const r = [];
  for (let i = Math.max(1, closes.length - 150); i < closes.length; i++) if (closes[i - 1] > 0) r.push(Math.log(closes[i] / closes[i - 1]));
  if (r.length < 10) return null;
  const mean = r.reduce((a, b) => a + b, 0) / r.length;
  const sd = Math.sqrt(r.reduce((a, b) => a + (b - mean) ** 2, 0) / r.length);
  return Math.min(0.004, Math.max(0.0002, (0.6 * sd) / Math.sqrt(1 / (1 - (1 - PULL) ** 2))));
 }
 function anchorNow(sym, now) {
  const g = live.glide[sym];
  if (!g) return live.anchor[sym];
  const k = Math.min(1, (now - g.start) / GLIDE_MS);
  if (k >= 1) delete live.glide[sym];
  return g.from + (g.to - g.from) * k;
 }
 // Builds the current 5-minute candle from ticks (covered stocks only; others have no chart).
 function addLiveTick(sym, price, now) {
  const bars = state.bars[sym];
  if (!bars || !bars.length) return;
  const bt = Math.floor(now / 300000) * 300, last = bars[bars.length - 1];
  if (last.time === bt) { last.close = price; last.high = Math.max(last.high, price); last.low = Math.min(last.low, price); }
  else if (bt > last.time) bars.push({ time: bt, open: last.close, high: Math.max(last.close, price), low: Math.min(last.close, price), close: price, volume: 0 });
 }
 function nseTick() {
  if (state.feed !== "nse") return;
  const now = Date.now(), open = marketOpenNow();
  activeSymbols().forEach(sym => {
   const a = open ? anchorNow(sym, now) : afterHoursAnchor(sym), p = state.prices[sym];
   if (!(a > 0 && p > 0)) return;
   const sig = live.sig[sym] || 0.0004;
   const next = roundTick(Math.min(a * 1.01, Math.max(a * 0.99, p + (a - p) * PULL + gauss() * a * sig)));
   state.prices[sym] = next;
   if (isLiveCovered(sym)) addLiveTick(sym, next, now);
   checkPending(sym, next, null); // limit orders can fill on ticks; after-market orders wait for a real price
  });
  if (isLiveCovered(state.symbol)) updateChart(false);
  scheduleRender();
 }
 const practiceNote = () => (state.feed === "nse" && !marketOpenNow() ? " (after-hours practice price)" : "");
 function nseNote() {
  const t = nseQuotes && nseQuotes.marketTime
   ? new Date(nseQuotes.marketTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) : null;
  const status = marketOpenNow()
   ? "Market open: real prices refresh every 5 minutes; in between, the price moves with simulated ticks around the latest real price."
   : "Market closed: after-hours practice. Prices are simulated within the last session's real range (between its open, close, high and low), and orders fill at these practice prices. Real prices resume at 9:15 am IST.";
  $("feedBadge").textContent = marketOpenNow() ? cfg().badge : "AFTER-HOURS PRACTICE";
  const cover = state.symbol && nseQuotes && nseQuotes.q[state.symbol] && !isLiveCovered(state.symbol)
   ? " This stock is outside the NIFTY 500 live coverage: it starts from its last closing price (with simulated movement in market hours) and has no intraday chart." : "";
  setNote(marketOpenNow()
   ? `Real NSE prices, delayed about 5–10 minutes${t ? ` (as of ${t} IST)` : ""}. ${status}${cover}`
   : `${status} Last real price${t ? ` as of ${t} IST` : ""}.${cover}`);
 }
 async function refreshNse() {
  try {
   await loadScript(dataUrl("data/quotes.js"));
   nseQuotes = window.MP_QUOTES;
   nseLoadedAt = Date.now();
  } catch (e) {
   setNote("Real prices could not be loaded. Check your connection, or switch to the simulated feed.");
   return;
  }
  if (state.feed !== "nse") return;
  await loadIntraday(state.symbol);
  loadDaily(state.symbol);
  activeSymbols().forEach(applyQuote);
  nseNote();
  updateChart(true);
  scheduleRender();
 }
 function startNse() {
  let stopped = false, timer = null;
  const ticker = setInterval(() => { if (!document.hidden) nseTick(); }, TICK_MS);
  const next = () => { clearTimeout(timer); if (!stopped && !document.hidden) timer = setTimeout(tick, marketOpenNow() ? NSE_OPEN_REFRESH : NSE_CLOSED_REFRESH); };
  async function tick() { await refreshNse(); next(); }
  // Pause while the tab is hidden; on return, refresh at once if the data is due.
  const onVisible = () => {
   if (stopped) return;
   if (document.hidden) { clearTimeout(timer); return; }
   if (Date.now() - nseLoadedAt > NSE_OPEN_REFRESH) tick(); else next();
  };
  document.addEventListener("visibilitychange", onVisible);
  tick();
  return () => { stopped = true; clearTimeout(timer); clearInterval(ticker); document.removeEventListener("visibilitychange", onVisible); };
 }

 function stopFeed() {
  if (state.stop) state.stop();
  state.stop = null;
 }

 function selectFeed(feed) {
  stopFeed();
  save();
  state.feed = feed;
  state.bars = {}; state.prices = {}; state.ref = {}; state.base = {}; state.daily = {};
  live.anchor = {}; live.glide = {}; live.sig = {}; live.band = {}; live.after = {};
  state.noQuote.clear();
  state.keyBad = false;
  state.symbol = watchlist()[0] || cfg().watchlist[0];
  $("ppFeed").value = feed;
  $("feedBadge").textContent = cfg().badge;
  $("ppKeyRow").hidden = feed !== "finnhub";
  $("ppKey").value = feed === "finnhub" ? readKey() : "";
  $("ppProductRow").hidden = cfg().charges !== "india";
  $("ppChargesBox").hidden = cfg().charges !== "india";
  $("ppSearch").placeholder = feed !== "finnhub" ? "Search eg: infy, tcs, reliance" : "Search eg: AAPL, Apple";
  state.focus = null;
  closeOrder();
  store.prefs.feed = feed;
  syncChartControls(); // the effective timeframe depends on the feed
  renderIndMenu(); // volume indicators are unavailable on the real-price feed
  $("ppSearch").value = "";
  searchResults = [];
  closeSearch();
  setNote(cfg().note);
  if (feed === "nse") {
   state.stop = startNse();
  } else if (feed === "sim") {
   activeSymbols().forEach(ensureData);
   state.stop = startSim();
  } else if (readKey()) {
   state.stop = startFinnhub();
  } else {
   setNote("Add your free Finnhub API key (finnhub.io) to load live quotes. The key stays in this browser.");
  }
  buildChart();
  accountView.reset();
  scheduleRender();
 }

 function selectSymbol(sym) {
  state.symbol = sym;
  ensureData(sym);
  if (state.feed === "finnhub" && readKey() && !state.prices[sym]) quoteFinnhub(sym);
  closeSearch();
  buildChart();
  scheduleRender();
  loadDaily(sym);
  if (state.feed === "nse") {
   loadIntraday(sym).then(() => { if (state.symbol === sym && state.feed === "nse") { nseNote(); buildChart(); scheduleRender(); } });
  }
 }

 // ---------- Chart ----------
 // Intraday candles of sec seconds from the base bars. On the NSE feed they start at 9:15 am IST, as on NSE
 // charts; on the simulated feed at midnight IST.
 function aggregate(bars, sec) {
  if (sec <= 60) return bars;
  const off = state.feed === "nse" ? 13500 : state.feed === "sim" ? -19800 : 0, out = [];
  for (const b of bars) {
   const t = Math.floor((b.time - off) / sec) * sec + off, last = out[out.length - 1];
   if (last && last.time === t) {
    last.high = Math.max(last.high, b.high);
    last.low = Math.min(last.low, b.low);
    last.close = b.close;
    last.volume += b.volume;
   } else out.push({ time: t, open: b.open, high: b.high, low: b.low, close: b.close, volume: b.volume });
  }
  return out;
 }

 // ---------- Daily, weekly and monthly candles ----------
 // A daily candle's time is the start of its IST day. Day numbers count days since 1 Jan 1970 in IST
 // (day 0 was a Thursday).
 const istDayNum = sec => Math.floor((sec + 19800) / 86400);
 const dayStart = d => d * 86400 - 19800;
 const weekday = d => (d + 4) % 7; // 0 = Sunday … 6 = Saturday
 // Seeded random numbers, so a stock's simulated history is the same on every visit.
 function seeded(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
 }
 // Simulated feed: about two years of simulated trading days that end where the intraday simulation starts.
 function simDaily(sym) {
  if (state.daily[sym]) return state.daily[sym];
  const base = state.bars[sym] && state.bars[sym].length ? state.bars[sym][0].open : seedPrice(sym);
  const r = seeded(Math.floor(hash(sym + "daily") * 4294967296));
  const g = () => Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
  const today = istDayNum(Date.now() / 1000), vol = 2e5 + hash(sym + "v") * 4e6, out = [];
  let close = base;
  for (let d = today - 1; out.length < 500; d--) {
   if (weekday(d) === 0 || weekday(d) === 6) continue;
   const open = Math.max(1, close / (1 + g() * 0.014));
   const hi = Math.max(open, close) * (1 + Math.abs(g()) * 0.006), lo = Math.min(open, close) * (1 - Math.abs(g()) * 0.006);
   out.push({ time: dayStart(d), open: roundTick(open), high: roundTick(hi), low: roundTick(lo), close: roundTick(close), volume: Math.round(vol * (0.5 + r())) });
   close = Math.max(1, open / (1 + g() * 0.004)); // the previous day's close, before the overnight gap
  }
  return (state.daily[sym] = out.reverse());
 }
 // NSE feed: real daily candles from data/daily/<SYM>.js (NIFTY 500 stocks, written by tools/fetch-quotes.js).
 function nseDaily(sym) {
  if (state.daily[sym]) return state.daily[sym];
  const d = (window.MP_DAILY || {})[sym];
  if (!d) return [];
  return (state.daily[sym] = d.t.map((day, i) => ({ time: dayStart(day), open: d.o[i], high: d.h[i], low: d.l[i], close: d.c[i], volume: d.v[i] })));
 }
 const dailyLoading = new Set();
 function loadDaily(sym) {
  if (state.feed !== "nse" || !isDaily() || !sym || (window.MP_DAILY || {})[sym] || dailyLoading.has(sym) || !isLiveCovered(sym)) return;
  dailyLoading.add(sym);
  loadScript(dataUrl(`data/daily/${dataFile(sym)}.js`)).catch(() => {}).then(() => {
   dailyLoading.delete(sym);
   delete state.daily[sym];
   if (state.symbol === sym && state.feed === "nse" && isDaily()) { buildChart(); scheduleRender(); }
  });
 }
 // The stored daily history, with today's candle kept up to date from the intraday prices.
 function dailyBars(sym) {
  const hist = state.feed === "sim" ? simDaily(sym) : state.feed === "nse" ? nseDaily(sym) : [];
  if (!hist.length) return [];
  const out = hist.slice(), today = istDayNum(Date.now() / 1000);
  const todays = (state.bars[sym] || []).filter(b => istDayNum(b.time) === today);
  if (todays.length && weekday(today) !== 0 && weekday(today) !== 6) {
   const last = out[out.length - 1], hi = Math.max(...todays.map(b => b.high)), lo = Math.min(...todays.map(b => b.low)), close = todays[todays.length - 1].close;
   if (istDayNum(last.time) === today) out[out.length - 1] = Object.assign({}, last, { high: Math.max(last.high, hi), low: Math.min(last.low, lo), close });
   else if (istDayNum(last.time) < today) out.push({ time: dayStart(today), open: todays[0].open, high: hi, low: lo, close, volume: todays.reduce((v, b) => v + b.volume, 0) });
  }
  return out;
 }
 // Weekly candles start on Monday, monthly ones on the 1st.
 function groupDays(days, id) {
  const key = b => {
   const d = istDayNum(b.time);
   if (id === "W") return d - ((d + 3) % 7);
   const dt = new Date(d * 86400000);
   return Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), 1) / 86400000;
  };
  const out = [];
  days.forEach(b => {
   const t = dayStart(key(b)), last = out[out.length - 1];
   if (last && last.time === t) { last.high = Math.max(last.high, b.high); last.low = Math.min(last.low, b.low); last.close = b.close; last.volume += b.volume; }
   else out.push({ time: t, open: b.open, high: b.high, low: b.low, close: b.close, volume: b.volume });
  });
  return out;
 }
 function chartBars() {
  if (!isDaily()) return aggregate(state.bars[state.symbol] || [], tfSec());
  const days = dailyBars(state.symbol);
  return tfId() === "D" ? days : groupDays(days, tfId());
 }
 // Lightweight Charts shows UTC: intraday times are shifted to the viewer's clock, daily candles to their date.
 const tOff = () => (isDaily() ? 19800 : TZ);
 function applyRange() {
  const v = state.view, r = RANGES.find(x => x[0] === state.pendingRange);
  if (!state.chart || !r || !v.length) return;
  state.pendingRange = null;
  const last = v[v.length - 1].time;
  const from = r[2] === 1 ? v.find(b => istDayNum(b.time) === istDayNum(last)).time : last - r[2] * 86400;
  try {
   if (from <= v[0].time) state.chart.timeScale().fitContent();
   else state.chart.timeScale().setVisibleRange({ from: from + tOff(), to: last + tOff() });
  } catch (e) { state.chart.timeScale().fitContent(); }
 }

 function seriesData() {
  const raw = chartBars();
  const ct = store.prefs.chartType;
  const off = tOff(), t = b => b.time + off;
  const closes = raw.map(b => b.close);
  // Values aligned to the bars -> chart points (see INDICATORS for the value forms).
  const points = arr => raw.reduce((acc, b, i) => {
   const v = arr[i];
   if (v === GAP) acc.push({ time: t(b) });
   else if (v && typeof v === "object") { if (isFinite(v.value)) acc.push({ time: t(b), value: v.value, color: v.color }); }
   else if (v !== null && isFinite(v)) acc.push({ time: t(b), value: v });
   return acc;
  }, []);
  const d = { raw };
  if (ct === "line" || ct === "area") d.main = raw.map(b => ({ time: t(b), value: b.close }));
  else d.main = (ct === "ha" ? PI.heikinAshi(raw) : raw).map(b => ({ time: t(b), open: b.open, high: b.high, low: b.low, close: b.close }));
  if (volOn()) d.vol = raw.map(b => ({ time: t(b), value: b.volume, color: b.close >= b.open ? "rgba(47,191,143,.45)" : "rgba(239,95,107,.45)" }));
  activeIndicators().forEach(def => {
   if (def.calc) Object.entries(def.calc(raw, closes)).forEach(([key, arr]) => { d[key] = points(arr); });
  });
  return d;
 }

 function chartOptions() {
  const light = document.documentElement.dataset.theme === "light";
  const border = light ? "#d5dde8" : "#26384e";
  return {
   autoSize: true,
   layout: { background: { type: "solid", color: "transparent" }, textColor: light ? "#4a5b70" : "#9caec4", panes: { separatorColor: border } },
   grid: { vertLines: { color: light ? "#eef2f7" : "#16233a" }, horzLines: { color: light ? "#e6ebf2" : "#1b2a40" } },
   rightPriceScale: { borderColor: border },
   timeScale: { borderColor: border, timeVisible: !isDaily(), secondsVisible: false, rightOffset: 6 }
  };
 }

 function extraPanes() {
  return activeIndicators().filter(d => d.pane).length;
 }
 function sizeChart() {
  const el = $("ppChart");
  // Expanded: fill the screen below the terminal bar and the chart toolbars (about 250px tall in total).
  el.style.height = state.expanded ? `max(${320 + extraPanes() * 90}px, calc(100vh - 250px))` : `${440 + extraPanes() * 120}px`;
 }

 function buildChart() {
  sizeChart();
  if (!window.LightweightCharts) {
   $("ppChart").textContent = "The chart library could not load. Prices, orders and P&L still work.";
   return;
  }
  if (state.chart) { state.chart.remove(); state.chart = null; }
  state.series = {};
  const LW = LightweightCharts, chart = LW.createChart($("ppChart"), chartOptions()), s = state.series;
  state.chart = chart;
  const ct = store.prefs.chartType;
  const priceFormat = { type: "price", precision: 2, minMove: cfg().minMove };
  if (ct === "line") s.main = chart.addSeries(LW.LineSeries, { color: "#48e0b0", lineWidth: 2, priceFormat });
  else if (ct === "area") s.main = chart.addSeries(LW.AreaSeries, { lineColor: "#48e0b0", topColor: "rgba(72,224,176,.32)", bottomColor: "rgba(72,224,176,0)", lineWidth: 2, priceFormat });
  else if (ct === "bars") s.main = chart.addSeries(LW.BarSeries, { upColor: UP, downColor: DOWN, priceFormat });
  else s.main = chart.addSeries(LW.CandlestickSeries, { upColor: UP, downColor: DOWN, borderVisible: false, wickUpColor: UP, wickDownColor: DOWN, priceFormat });

  if (volOn()) {
   s.vol = chart.addSeries(LW.HistogramSeries, { priceScaleId: "vol", priceFormat: { type: "volume" }, priceLineVisible: false, lastValueVisible: false }, 0);
   chart.priceScale("vol").applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });
  }
  s.main.priceScale().applyOptions({ scaleMargins: { top: 0.08, bottom: volOn() ? 0.2 : 0.08 } });
  // Overlays share the price pane; oscillators get a pane each, in menu order.
  let pane = 1;
  activeIndicators().filter(def => def.lines).forEach(def => {
   const p = def.pane ? pane++ : 0;
   let first = null;
   def.lines.forEach(ln => {
    if (ln.kind === "hist") { s[ln.key] = chart.addSeries(LW.HistogramSeries, { priceLineVisible: false, lastValueVisible: false }, p); return; }
    const opts = { color: ln.color, lineWidth: ln.width || 1, lineStyle: ln.style || 0, priceLineVisible: false, lastValueVisible: !!def.pane && !first, crosshairMarkerVisible: false, title: def.pane && !first ? def.short || def.label : "" };
    if (ln.kind === "dots") Object.assign(opts, { lineVisible: false, pointMarkersVisible: true, pointMarkersRadius: 2 });
    if (ln.kind === "step") opts.lineType = LW.LineType ? LW.LineType.WithSteps : 1;
    s[ln.key] = chart.addSeries(LW.LineSeries, opts, p);
    first = first || s[ln.key];
   });
   (def.levels || []).forEach(v => first.createPriceLine({ price: v, color: "rgba(156,174,196,.55)", lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: "" }));
  });
  const panes = chart.panes();
  if (panes.length > 1) { panes[0].setStretchFactor(3); panes.slice(1).forEach(p => p.setStretchFactor(1)); }

  updateChart(true);
  applyRange();
  chart.timeScale().subscribeVisibleLogicalRangeChange(() => drawings.schedule());
  chart.subscribeCrosshairMove(param => {
   state.hoverTime = param && param.time !== undefined ? param.time - tOff() : null;
   updateLegend();
   drawings.schedule();
  });
 }

 function updateChart(full) {
  const d = seriesData();
  const len = d.raw.length;
  state.view = d.raw;
  if (state.chart) {
   const setAll = () => Object.keys(state.series).forEach(k => state.series[k].setData(d[k] || []));
   if (full || len < state.lastLen || len > state.lastLen + 1) setAll();
   else {
    // A new tick usually changes only the last point; some indicators (a flipped Supertrend, a new day's pivots)
    // can change an earlier one, which update() refuses, so fall back to a full redraw.
    try { Object.keys(state.series).forEach(k => { const arr = d[k]; if (arr && arr.length) state.series[k].update(arr[arr.length - 1]); }); }
    catch (e) { setAll(); }
   }
   drawings.schedule();
  }
  state.lastLen = len;
  updateLegend();
 }

 function updateLegend() {
  const v = state.view;
  let bar = null;
  if (state.hoverTime !== null) bar = v.find(b => b.time === state.hoverTime) || null;
  bar = bar || v[v.length - 1];
  if (!bar) {
   const p = state.prices[state.symbol];
   const text = isDaily() && state.feed === "nse"
    ? (isLiveCovered(state.symbol) ? "loading daily candles…" : `last close ${p ? money(p) : "—"} · daily candles cover NIFTY 500 stocks`)
    : state.feed === "nse" && p ? `last close ${money(p)} · the intraday chart covers NIFTY 500 stocks` : "waiting for prices…";
   $("ppLegend").innerHTML = `<strong>${esc(state.symbol || "")}</strong> <span>${esc(text)}</span>`;
   return;
  }
  const up = bar.close >= bar.open ? "pp-up" : "pp-down";
  const tf = tfDef()[2];
  const inds = activeIndicators().filter(i => i.color && !i.pane).map(i => `<i style="color:${i.color}">${esc(i.label)}</i>`).join(" ");
  $("ppLegend").innerHTML = `<strong>${esc(state.symbol)}</strong> · ${tf} <span>O <b class="${up}">${fmt(bar.open)}</b></span><span>H <b class="${up}">${fmt(bar.high)}</b></span><span>L <b class="${up}">${fmt(bar.low)}</b></span><span>C <b class="${up}">${fmt(bar.close)}</b></span>${bar.volume ? `<span>Vol <b>${Math.round(bar.volume).toLocaleString("en-IN")}</b></span>` : ""}<br>${inds}`;
 }

 const drawings = PaperDrawings.create({
  svg: $("ppDrawLayer"),
  getContext: () => ({ chart: state.chart, series: state.series.main, bars: state.view, tfSec: tfSec() }),
  getList: () => drawingsFor(state.symbol),
  onChange: save,
  format: fmt,
  onToolChange: (tool, hint) => {
   document.querySelectorAll("#ppDraw [data-tool]").forEach(b => {
    const on = b.dataset.tool === tool;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", String(on));
   });
   $("ppDrawHint").textContent = hint;
  }
 });

 // ---------- Search ----------
 let searchResults = [], searchActive = -1, searchTimer = null;
 function searchLocal(q) {
  const Q = q.trim().toUpperCase();
  if (!Q) return [];
  const scored = [];
  for (const [sym, name] of NSE_NAME) {
   const N = name.toUpperCase();
   const s = sym === Q ? 0 : sym.startsWith(Q) ? 1 : N.startsWith(Q) ? 2 : N.includes(" " + Q) ? 3 : sym.includes(Q) ? 4 : N.includes(Q) ? 5 : -1;
   if (s >= 0) scored.push({ s, sym, name });
  }
  scored.sort((a, b) => a.s - b.s || a.sym.length - b.sym.length || a.sym.localeCompare(b.sym));
  return scored.slice(0, 30);
 }
 async function searchFinnhub(q) {
  if (!readKey()) return [];
  try {
   const r = await finnhubGet(`search?q=${encodeURIComponent(q.trim())}`);
   const list = (r.result || []).filter(x => x.symbol && !x.symbol.includes(".")).slice(0, 30).map(x => ({ sym: x.symbol, name: x.description || "" }));
   store.names.finnhub = store.names.finnhub || {};
   list.forEach(x => { store.names.finnhub[x.sym] = x.name; });
   return list;
  } catch (e) { feedError(e); return []; }
 }
 function renderSearch() {
  const list = $("ppSearchList"), input = $("ppSearch");
  const q = input.value.trim();
  if (!q) { closeSearch(); return; }
  const wl = watchlist();
  list.innerHTML = searchResults.length
   ? searchResults.map((r, i) => `<li role="option" id="ppOpt${i}" data-sym="${esc(r.sym)}" aria-selected="${i === searchActive}" class="${i === searchActive ? "active" : ""}"><span class="pp-opt-sym">${esc(r.sym)}<small>${state.feed === "finnhub" ? "US" : "NSE"}</small></span><span class="pp-opt-name">${esc(r.name)}</span><button type="button" class="pp-opt-add${wl.includes(r.sym) ? " added" : ""}" data-add="${esc(r.sym)}" aria-label="${wl.includes(r.sym) ? "Remove " + esc(r.sym) + " from watchlist" : "Add " + esc(r.sym) + " to watchlist"}" title="${wl.includes(r.sym) ? "In watchlist (press to remove)" : "Add to watchlist"}">${wl.includes(r.sym) ? "✓" : "+"}</button></li>`).join("")
   : `<li class="pp-opt-empty">${state.feed === "finnhub" && !readKey() ? "Save a Finnhub API key to search." : "No matching stocks."}</li>`;
  list.hidden = false;
  input.setAttribute("aria-expanded", "true");
  input.setAttribute("aria-activedescendant", searchActive >= 0 ? `ppOpt${searchActive}` : "");
 }
 function closeSearch() {
  $("ppSearchList").hidden = true;
  $("ppSearch").setAttribute("aria-expanded", "false");
  searchActive = -1;
 }
 function runSearch() {
  const q = $("ppSearch").value;
  searchActive = -1;
  if (state.feed !== "finnhub") { searchResults = searchLocal(q); renderSearch(); return; }
  clearTimeout(searchTimer);
  searchTimer = setTimeout(async () => { searchResults = q.trim() ? await searchFinnhub(q) : []; renderSearch(); }, 350);
 }
 function toggleWatch(sym) {
  const wl = watchlist(), i = wl.indexOf(sym);
  if (i >= 0) wl.splice(i, 1);
  else if (wl.length >= WATCH_MAX) { toast(`A watchlist holds up to ${WATCH_MAX} stocks. Use another list (1–${WATCHLISTS}) below.`, "error"); return; }
  else { wl.push(sym); ensureData(sym); if (state.feed === "finnhub" && readKey()) quoteFinnhub(sym); }
  save();
  scheduleRender();
 }
 // Picking a search result adds it to the open watchlist (if it is not there) and opens it, as broker apps do.
 function pickResult(sym) {
  $("ppSearch").value = "";
  if (!watchlist().includes(sym)) toggleWatch(sym);
  state.focus = sym;
  selectSymbol(sym);
 }

 // ---------- Rendering ----------
 function setNote(text) { $("ppNote").textContent = text; }
 function setMsg(text, kind) {
  const el = $("ppMsg");
  el.textContent = text;
  el.className = `pp-msg${kind ? " " + kind : ""}`;
 }
 function change(sym) {
  const p = state.prices[sym], r = state.ref[sym];
  if (!(p > 0) || !(r > 0)) return null;
  return { abs: p - r, pct: (p / r - 1) * 100 };
 }

 function renderQuote() {
  const sym = state.symbol, p = state.prices[sym], ch = change(sym);
  $("ppSymTitle").textContent = sym || "";
  $("ppSymName").textContent = nameOf(sym);
  $("ppPrice").textContent = p ? money(p) : state.noQuote.has(sym) ? "no quote" : "—";
  setHTML($("ppChange"), ch ? `<span class="${ch.abs >= 0 ? "pp-up" : "pp-down"}">${signed(ch.abs)} (${ch.pct >= 0 ? "+" : ""}${ch.pct.toFixed(2)}%)</span> ${state.feed === "sim" ? "24h" : "today"}` : "");
  const inWl = watchlist().includes(sym);
  $("ppStar").textContent = inWl ? "★ In watchlist" : "☆ Add to watchlist";
  $("ppStar").setAttribute("aria-pressed", String(inWl));
  setHTML($("ptSource"), sourceBadge());
 }
 // The data-source badge on the chart: where the prices come from, how late they are, and whether they are real.
 function sourceBadge() {
  if (state.feed === "sim") return `<i class="pt-dot warn"></i>SIMULATED · not real prices ⓘ`;
  if (state.feed === "finnhub") return `<i class="pt-dot ok"></i>FINNHUB · live quotes ⓘ`;
  if (isDaily()) return `<i class="pt-dot ok"></i>NSE · daily candles · Yahoo Finance ⓘ`;
  const t = nseQuotes && nseQuotes.marketTime ? new Date(nseQuotes.marketTime).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" }) : null;
  if (!marketOpenNow()) return `<i class="pt-dot warn"></i>NSE · market closed · practice prices${t ? ` · last real ${t}` : ""} ⓘ`;
  if (state.symbol && nseQuotes && !isLiveCovered(state.symbol)) return `<i class="pt-dot warn"></i>NSE · last close + simulated ticks ⓘ`;
  return `<i class="pt-dot ok"></i>NSE · Yahoo Finance · delayed 5–10 min${t ? ` · ${t} IST` : ""} ⓘ`;
 }

 // Watchlist rows like a broker app: symbol coloured by the day's move, change, % change and LTP. Hovering a row
 // (or tapping it on a touch screen) shows Buy, Sell, Chart and Delete buttons over it.
 function renderWatchlist() {
  const w = watchStore(), wl = watchlist();
  setHTML($("ppWatch"), wl.length ? wl.map(sym => {
   const p = state.prices[sym], ch = change(sym), tone = ch ? (ch.abs >= 0 ? "pp-up" : "pp-down") : "";
   const s = esc(sym);
   return `<li data-sym="${s}" class="${sym === state.symbol ? "sel" : ""}${sym === state.focus ? " open" : ""}">
    <button type="button" class="pt-w-main" data-open="${s}" aria-expanded="${sym === state.focus}" aria-label="${s}${ch ? `, ${ch.pct >= 0 ? "up" : "down"} ${Math.abs(ch.pct).toFixed(2)}%` : ""}, show buy, sell and chart options">
     <span class="pt-w-sym ${tone}">${s}<small>${esc(nameOf(sym))}</small></span>
     <span class="pt-w-chg">${ch ? `${ch.abs >= 0 ? "" : "−"}${fmt(Math.abs(ch.abs))}` : ""}</span>
     <span class="pt-w-pct ${tone}">${ch ? `${ch.pct >= 0 ? "" : "−"}${Math.abs(ch.pct).toFixed(2)}% ${ch.abs >= 0 ? "▴" : "▾"}` : ""}</span>
     <span class="pt-w-ltp ${tone}">${p ? fmt(p) : state.noQuote.has(sym) ? "no quote" : "—"}</span>
    </button>
    <span class="pt-w-acts">
     <button type="button" class="pt-b" data-trade="buy" data-sym="${s}" title="Buy ${s} (B)">B</button>
     <button type="button" class="pt-s" data-trade="sell" data-sym="${s}" title="Sell ${s} (S)">S</button>
     <button type="button" class="pt-a" data-chart="${s}" title="Open the chart for ${s}" aria-label="Chart ${s}">📈</button>
     <button type="button" class="pt-a" data-remove="${s}" title="Remove ${s} from this watchlist" aria-label="Remove ${s}">🗑</button>
    </span>
   </li>`;
  }).join("") : `<li class="pt-w-empty"><strong>Watchlist ${w.active + 1} is empty</strong>Search above and pick a stock, or press + on a result, to add it here.</li>`);
  $("ptWatchName").textContent = `Watchlist ${w.active + 1}`;
  $("ptWatchCount").textContent = `${wl.length} / ${WATCH_MAX}`;
  setHTML($("ptWatchTabs"), w.lists.map((l, i) => `<button type="button" role="tab" data-list="${i}" aria-selected="${i === w.active}" title="Watchlist ${i + 1} (${l.length} stocks)">${i + 1}</button>`).join(""));
 }

 // ---------- Terminal: sections, index strip, order window and messages ----------
 function setScreen(name) {
  if (!SCREENS.includes(name)) name = "chart";
  state.screen = name;
  $("paperApp").dataset.view = name;
  Object.entries(OWN_PANES).forEach(([view, id]) => { $(id).hidden = name !== view; });
  $("ppAccount").hidden = name === "watchlist" || !!OWN_PANES[name];
  if (name === "replay") replay.show(); else replay.hide();
  if (name === "journal") journal.show($("ptJournalPane"));
  document.querySelectorAll("#ptNav [data-view]").forEach(b => {
   const on = b.dataset.view === name;
   b.setAttribute("aria-selected", String(on));
   b.tabIndex = on ? 0 : -1;
  });
  try { localStorage.setItem("mp-paper-tab", name); } catch (e) { /* storage unavailable */ }
  if (name !== "watchlist" && !OWN_PANES[name]) accountView.show(name);
  if (name === "chart") { sizeChart(); drawings.schedule(); }
  scheduleRender();
 }
 function renderNav() {
  const counts = Object.assign(accountView.counts(), { journal: journal ? journal.pendingCount() : 0 });
  document.querySelectorAll("#ptNav [data-view]").forEach(b => {
   const n = counts[b.dataset.view];
   let tag = b.querySelector("small");
   if (!n) { if (tag) tag.remove(); return; }
   if (!tag) { tag = document.createElement("small"); b.appendChild(tag); }
   if (tag.textContent !== String(n)) tag.textContent = n;
  });
 }
 function indices() {
  const d = window.MP_INDICES;
  return d && Array.isArray(d.items) ? d.items.filter(i => i && i.last > 0) : [];
 }
 function renderIndices() {
  const list = indices().filter(i => i.name === "NIFTY 50" || i.name === "SENSEX");
  setHTML($("ptIndices"), list.map(i => `<span class="pt-idx"><b>${esc(i.name)}</b><span class="${i.change >= 0 ? "pp-up" : "pp-down"}">${Number(i.last).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><small>${i.change >= 0 ? "+" : "−"}${Math.abs(i.change).toFixed(2)} (${i.pct >= 0 ? "+" : "−"}${Math.abs(i.pct).toFixed(2)}%)</small></span>`).join(""));
 }

 let toastTimer = null;
 function toast(text, kind) {
  const el = $("ptToast");
  el.textContent = text;
  el.className = `pt-toast${kind ? " " + kind : ""}`;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, kind === "error" ? 7000 : 4500);
 }

 // The order window: a dialog over the terminal, coloured by side (blue to buy, orange to sell).
 let orderReturn = null;
 function openOrder(side, sym) {
  if (sym && sym !== state.symbol) selectSymbol(sym);
  document.querySelector(`input[name="ppSide"][value="${side === "sell" ? "sell" : "buy"}"]`).checked = true;
  // Selling something you hold: start with its product and the quantity you can sell.
  if (side === "sell") {
   const a = account(), held = ["delivery", "intraday"].find(p => freeToSell(a, state.symbol, p) > 0);
   if (held) {
    document.querySelector(`input[name="ppProduct"][value="${held}"]`).checked = true;
    $("ppQty").value = freeToSell(a, state.symbol, held);
   }
  }
  if ($("ppType").value === "limit" && !(Number($("ppLimit").value) > 0)) $("ppLimit").value = state.prices[state.symbol] || "";
  setMsg("");
  updateEstimate();
  orderReturn = document.activeElement;
  $("ptOrder").hidden = false;
  $("ppQty").focus();
  $("ppQty").select();
 }
 function closeOrder() {
  if ($("ptOrder").hidden) return;
  $("ptOrder").hidden = true;
  if (orderReturn && document.contains(orderReturn)) orderReturn.focus();
  orderReturn = null;
 }

 // Virtual funds: kind "add" or "withdraw". Returns an error message, or null when done.
 function moveFunds(kind, amount) {
  const a = account();
  if (!(amount > 0) || !isFinite(amount)) return "Enter an amount above zero.";
  amount = Math.round(amount * 100) / 100;
  if (kind === "add" && capital(a) + amount > cfg().start * 100) return `Practice accounts are capped at ${money(cfg().start * 100)} of capital.`;
  if (kind === "withdraw" && amount > available(a)) return `You can withdraw up to ${money(Math.max(0, available(a)))}; the rest is invested or blocked for open orders.`;
  const sign = kind === "add" ? 1 : -1;
  a.cash += sign * amount;
  a.deposits += sign * amount;
  a.ledger.push({ time: Date.now(), kind, amount, balance: a.cash });
  a.ledger = a.ledger.slice(-200);
  save();
  scheduleRender();
  return null;
 }
 function resetAccount() {
  const c = cfg();
  if (!confirm(`Reset the ${c.label.toLowerCase()} account to ${money(c.start)}? Holdings, positions, orders, funds and P&L will be cleared.`)) return false;
  delete store.accounts[state.feed];
  save();
  toast("Practice account reset.", "ok");
  scheduleRender();
  return true;
 }

 // Writes only when the markup changed, so a price tick does not rebuild unchanged parts of the page.
 function setHTML(el, html) { if (el._html !== html) { el.innerHTML = html; el._html = html; } }

 // ---------- Account actions (used by the account views) ----------
 function exitPosition(key) {
  const a = account(), p = a.positions[key];
  if (!p) return;
  const qty = freeToSell(a, p.sym, p.product);
  const err = qty > 0 ? placeOrder({ side: "sell", sym: p.sym, product: p.product, qty, type: "market" }) : "This position is already covered by open sell orders.";
  toast(err || `Exited ${qty} ${p.sym} at ${money(a.orders[0].price)}${practiceNote()}.`, err ? "error" : "ok");
 }
 function cancelOrder(id) {
  const a = account(), o = a.pending.find(x => x.id === id);
  if (!o) return;
  a.pending = a.pending.filter(x => x.id !== id);
  a.orders.unshift(Object.assign({}, o, { status: "cancelled", time: Date.now() }));
  a.orders = a.orders.slice(0, 200);
  save();
  scheduleRender();
 }
 // Minutes since midnight in IST, and whether a time falls on today's IST date.
 function istMinutes() {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date()).map(x => [x.type, x.value]));
  return Number(p.hour) * 60 + Number(p.minute);
 }
 const istDay = ms => new Date(ms).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
 const isToday = ms => istDay(ms) === istDay(Date.now());
 const pastSquareOff = () => state.feed === "nse" && marketOpenNow() && istMinutes() >= 920; // 3:20 pm
 // Squares off open intraday positions after 3:20 pm and cancels intraday limit orders, as brokers do.
 function autoSquareOff() {
  if (!pastSquareOff()) return;
  const a = account();
  let done = 0;
  a.pending.filter(o => o.product === "intraday").forEach(o => cancelOrder(o.id));
  Object.values(a.positions).filter(p => p.product === "intraday").forEach(p => {
   const qty = freeToSell(a, p.sym, p.product);
   if (qty > 0 && !placeOrder({ side: "sell", sym: p.sym, product: "intraday", qty, type: "market", tag: "Auto square-off" })) done++;
  });
  if (done) toast(`3:20 pm: ${done} intraday position${done > 1 ? "s were" : " was"} squared off automatically.`, "ok");
 }
 function downloadCsv(name, rows) {
  const cell = v => `"${String(v).replace(/"/g, '""')}"`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["\ufeff" + rows.map(r => r.map(cell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" }));
  a.download = `${name}-${istDay(Date.now())}.csv`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
 }

 function currentTicket() {
  return {
   side: document.querySelector('input[name="ppSide"]:checked').value,
   product: cfg().charges === "india" ? document.querySelector('input[name="ppProduct"]:checked').value : "delivery",
   type: $("ppType").value,
   qty: Number($("ppQty").value),
   limit: Number($("ppLimit").value)
  };
 }

 function updateEstimate() {
  const a = account(), t = currentTicket(), price = state.prices[state.symbol];
  $("ppLimitRow").hidden = t.type !== "limit";
  $("ppSubmit").textContent = t.side === "buy" ? "Buy" : "Sell";
  $("ptOrder").classList.toggle("sell", t.side === "sell");
  $("ptOrderTitle").textContent = `${t.side === "buy" ? "Buy" : "Sell"} ${state.symbol || ""} × ${t.qty > 0 ? t.qty : 0} Qty`;
  const ch = change(state.symbol);
  $("ptOrderSub").textContent = `${state.feed === "finnhub" ? "US" : "NSE"} ${price ? money(price) : "—"}${ch ? ` (${ch.pct >= 0 ? "+" : "−"}${Math.abs(ch.pct).toFixed(2)}%)` : ""}${practiceNote() ? " · after-hours practice price" : ""}`;
  const ref = t.type === "limit" ? t.limit : price;
  if (!(ref > 0) || !(t.qty > 0)) { $("ppEstimate").textContent = "Enter a quantity and price to see the estimate."; setHTML($("ppChargeList"), ""); return; }
  const slip = t.type === "market" ? slippageFor(t.side, t.qty, price, state.symbol) : null;
  const px = slip ? slip.fillPrice : ref, value = t.qty * px, c = charges(t.side, t.product, t.qty, px);
  const slipHtml = slip ? `<span>Est. slippage <b>${money(slip.total)}</b> (${slip.bps.toFixed(1)} bps) <button type="button" class="pt-info-btn" data-disclose="slippage" aria-label="How slippage is estimated">ⓘ</button></span>` : "";
  setHTML($("ppEstimate"), t.side === "buy"
   ? `<span>Required <b>${money(value + c.total)}</b></span><span>Available <b>${money(available(a))}</b></span><span>Charges <b>${money(c.total)}</b></span>${slipHtml}`
   : `<span>You receive <b>${money(value - c.total)}</b></span><span>Can sell <b>${Math.max(0, freeToSell(a, state.symbol, t.product))} qty</b></span><span>Charges <b>${money(c.total)}</b></span>${slipHtml}`);
  const line = (label, v) => (v ? `<tr><th>${label}</th><td>${money(v)}</td></tr>` : "");
  setHTML($("ppChargeList"), `<table class="pp-pnl">${line("Brokerage", c.brokerage)}${line("STT", c.stt)}${line("Exchange transaction charge", c.exchange)}${line("SEBI fee", c.sebi)}${line("Stamp duty", c.stamp)}${line("DP charge", c.dp)}${line("GST 18%", c.gst)}<tr class="pp-strong"><th>Total charges</th><td>${money(c.total)}</td></tr></table>`);
 }

 function render() {
  renderIndices();
  renderNav();
  renderWatchlist();
  if (state.screen === "chart") renderQuote();
  else if (state.screen !== "watchlist" && !OWN_PANES[state.screen]) accountView.render();
  if (!$("ptOrder").hidden) updateEstimate();
 }
 let renderQueued = false;
 function scheduleRender() {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => { renderQueued = false; render(); });
 }

 // ---------- Layout: expand and collapse ----------
 function setExpanded(on) {
  state.expanded = on;
  $("paperApp").classList.toggle("pp-expanded", on);
  document.body.classList.toggle("pp-noscroll", on);
  const b = $("ppExpand");
  b.setAttribute("aria-pressed", String(on));
  b.textContent = on ? "⤡" : "⤢";
  b.title = on ? "Exit full screen (Esc)" : "Full screen";
  b.setAttribute("aria-label", b.title);
  sizeChart();
  drawings.schedule();
 }
 function setSideHidden(on) {
  $("paperApp").classList.toggle("pt-watch-hidden", on);
  const b = $("ppSideToggle");
  b.setAttribute("aria-pressed", String(on));
  b.textContent = on ? "⇥" : "⇤";
  b.title = on ? "Show the watchlist" : "Hide the watchlist";
  b.setAttribute("aria-label", b.title);
  drawings.schedule();
 }

 // ---------- Events ----------
 $("ppFeed").addEventListener("change", e => selectFeed(e.target.value));
 $("ppSaveKey").addEventListener("click", () => {
  const key = $("ppKey").value.trim();
  if (!key) { setNote("Enter a Finnhub API key first."); return; }
  writeKey(key);
  selectFeed("finnhub");
 });

 $("ppSearch").addEventListener("input", runSearch);
 $("ppSearch").addEventListener("focus", () => { if ($("ppSearch").value.trim()) runSearch(); });
 $("ppSearch").addEventListener("keydown", e => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
   if (!searchResults.length) return;
   e.preventDefault();
   searchActive = (searchActive + (e.key === "ArrowDown" ? 1 : -1) + searchResults.length) % searchResults.length;
   renderSearch();
   const el = $(`ppOpt${searchActive}`);
   if (el) el.scrollIntoView({ block: "nearest" });
  } else if (e.key === "Enter") {
   e.preventDefault();
   const r = searchResults[searchActive >= 0 ? searchActive : 0];
   if (r) pickResult(r.sym);
  } else if (e.key === "Escape") {
   e.stopPropagation();
   closeSearch();
  }
 });
 $("ppSearchList").addEventListener("mousedown", e => e.preventDefault()); // keep focus in the input
 $("ppSearchList").addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if (add) { toggleWatch(add.dataset.add); renderSearch(); return; }
  const li = e.target.closest("li[data-sym]");
  if (li) pickResult(li.dataset.sym);
 });
 $("ppSearch").addEventListener("blur", () => setTimeout(closeSearch, 150));

 $("ppStar").addEventListener("click", () => toggleWatch(state.symbol));
 // Watchlist: a row press shows its buttons (and selects the stock); B / S open the order window; the chart
 // button opens the chart section.
 $("ppWatch").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.remove) { if (state.focus === b.dataset.remove) state.focus = null; toggleWatch(b.dataset.remove); }
  else if (b.dataset.trade) openOrder(b.dataset.trade, b.dataset.sym);
  else if (b.dataset.chart) { state.focus = b.dataset.chart; selectSymbol(b.dataset.chart); setScreen("chart"); }
  else if (b.dataset.open) {
   state.focus = state.focus === b.dataset.open ? null : b.dataset.open;
   if (b.dataset.open !== state.symbol) selectSymbol(b.dataset.open); else scheduleRender();
  }
 });
 $("ppWatch").addEventListener("keydown", e => {
  // Keyboard shortcuts on a focused row, as in broker apps: B to buy, S to sell, C for the chart.
  const li = e.target.closest("li[data-sym]");
  if (!li || e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key.toLowerCase();
  if (k === "b" || k === "s") { e.preventDefault(); openOrder(k === "b" ? "buy" : "sell", li.dataset.sym); }
  else if (k === "c") { e.preventDefault(); selectSymbol(li.dataset.sym); setScreen("chart"); }
 });
 $("ptWatchTabs").addEventListener("click", e => {
  const b = e.target.closest("[data-list]");
  if (!b) return;
  watchStore().active = Number(b.dataset.list);
  state.focus = null;
  save();
  activeSymbols().forEach(ensureData);
  if (state.feed === "finnhub" && readKey()) watchlist().forEach(sym => { if (!state.prices[sym]) quoteFinnhub(sym); });
  scheduleRender();
 });
 $("ptNav").addEventListener("click", e => {
  const b = e.target.closest("[data-view]");
  if (b) setScreen(b.dataset.view);
 });
 $("ptNav").addEventListener("keydown", e => {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  const tabs = [...document.querySelectorAll("#ptNav [data-view]")].filter(b => b.offsetParent !== null);
  const i = tabs.findIndex(b => b.dataset.view === state.screen), next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
  if (next) { setScreen(next.dataset.view); next.focus(); }
 });
 document.querySelector(".pt-trade-btns").addEventListener("click", e => {
  const b = e.target.closest("[data-trade]");
  if (b) openOrder(b.dataset.trade);
 });
 $("ptOrder").addEventListener("click", e => {
  if (e.target === $("ptOrder") || e.target.closest("[data-close-order]")) closeOrder();
 });
 $("ptOrder").addEventListener("keydown", e => {
  if (e.key === "Escape") { e.stopPropagation(); closeOrder(); return; }
  if (e.key !== "Tab") return;
  // Keep keyboard focus inside the order window while it is open.
  const f = [...$("ptOrder").querySelectorAll("button, input, select, summary")].filter(x => !x.disabled && x.offsetParent !== null);
  if (!f.length) return;
  if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
  else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
 });

 function setTimeframe(id, range) {
  store.prefs.tf = id;
  state.range = range || null;
  state.pendingRange = range || null;
  save();
  syncChartControls();
  renderIndMenu(); // some indicators depend on the timeframe
  loadDaily(state.symbol);
  buildChart();
 }
 $("ppTf").addEventListener("click", e => {
  const b = e.target.closest("[data-tf]");
  if (!b || b.disabled) return;
  b.closest("details").open = false;
  setTimeframe(b.dataset.tf);
  $("ppTfBtn").focus();
 });
 $("ppRanges").addEventListener("click", e => {
  const b = e.target.closest("[data-range]");
  if (!b) return;
  const r = RANGES.find(x => x[0] === b.dataset.range);
  setTimeframe(rangeTf(r[2]), r[0]);
 });
 $("ppChartType").addEventListener("change", e => {
  store.prefs.chartType = e.target.value;
  save();
  buildChart();
 });
 // Drop-down menus (timeframe, indicators) close on a click outside them or on Esc.
 const openMenus = () => [...document.querySelectorAll("#paperApp .pp-menu[open]")];
 document.addEventListener("pointerdown", e => openMenus().forEach(m => { if (!m.contains(e.target)) m.open = false; }));
 document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  openMenus().forEach(m => { m.open = false; m.querySelector("summary").focus(); });
 });
 $("ppIndList").addEventListener("change", e => {
  const id = e.target.value;
  const list = store.prefs.indicators.filter(x => x !== id);
  if (e.target.checked) list.push(id);
  store.prefs.indicators = list;
  save();
  renderIndMenu();
  const box = $("ppIndList").querySelector(`input[value="${id}"]`);
  if (box) box.focus(); // the menu was re-rendered: keep keyboard focus on the same box
  buildChart();
 });
 $("ppIndList").addEventListener("click", e => {
  if (!e.target.closest("[data-ind-clear]")) return;
  store.prefs.indicators = [];
  save();
  renderIndMenu();
  buildChart();
 });
 $("ppDraw").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.tool) drawings.setTool(drawings.tool() === b.dataset.tool && b.dataset.tool !== "cursor" ? "cursor" : b.dataset.tool);
  else if (b.dataset.action === "undo") drawings.undo();
  else if (b.dataset.action === "clear" && drawingsFor(state.symbol).length && confirm(`Delete all drawings on ${state.symbol}?`)) drawings.clear();
 });
 ["pointermove", "wheel"].forEach(ev => $("ppChartWrap").addEventListener(ev, () => drawings.schedule(), { passive: true }));

 $("ppExpand").addEventListener("click", () => setExpanded(!state.expanded));
 $("ppSideToggle").addEventListener("click", () => setSideHidden(!$("paperApp").classList.contains("pt-watch-hidden")));
 document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  if (!$("ptOrder").hidden) closeOrder();
  else if (drawings.tool() !== "cursor") drawings.setTool("cursor");
  else if (state.expanded) setExpanded(false);
 });

 ["ppType", "ppQty", "ppLimit"].forEach(id => $(id).addEventListener("input", () => { updateEstimate(); setMsg(""); }));
 document.querySelectorAll('input[name="ppSide"], input[name="ppProduct"]').forEach(r => r.addEventListener("change", updateEstimate));
 $("ppOrderForm").addEventListener("submit", e => {
  e.preventDefault();
  const t = currentTicket();
  const err = placeOrder(Object.assign({ sym: state.symbol }, t));
  if (err) { setMsg(err, "error"); return; }
  closeOrder();
  if (t.type === "limit") toast(`Order placed: limit ${t.side} ${t.qty} ${state.symbol} at ${money(t.limit)}. It fills when the price reaches it.`, "ok");
  else {
   const o = account().orders[0], slipTxt = o && o.slippage ? ` (incl. ${money(o.slippage)} est. slippage)` : "";
   toast(`Order executed: ${t.side === "buy" ? "bought" : "sold"} ${t.qty} ${state.symbol} at ${money(o ? o.price : state.prices[state.symbol])}${slipTxt}${practiceNote()}.`, "ok");
  }
 });
 document.addEventListener("mp-theme-change", () => { if (state.chart) state.chart.applyOptions(chartOptions()); });
 window.addEventListener("beforeunload", () => { save(); stopFeed(); });
 setInterval(save, 30000);
 setInterval(autoSquareOff, 30000);

 // ---------- Init ----------
 // Indicator menu, grouped like the lessons. Volume indicators are shown but disabled on the real-price feed.
 function renderIndMenu() {
  const nse = state.feed === "nse", count = activeIndicators().length;
  $("ppIndList").innerHTML = INDICATOR_GROUPS.map(([g, title]) => `<fieldset class="pp-ind-group"><legend>${title}</legend>${INDICATORS.filter(d => d.group === g).map(d => {
   const off = !indAvailable(d);
   const why = d.intraday && isDaily() ? "VWAP restarts every day, so it is shown on intraday timeframes only." : "Needs traded volume. Real prices include volume only on the 1D, 1W and 1M timeframes.";
   return `<label class="${off ? "off" : ""}"${off ? ` title="${why}"` : ""}><input type="checkbox" value="${d.id}"${store.prefs.indicators.includes(d.id) ? " checked" : ""}${off ? " disabled" : ""}>${d.color ? `<i class="pp-swatch" style="background:${d.color}"></i>` : `<i class="pp-swatch pp-swatch-vol"></i>`}<span>${esc(d.label)}</span>${d.pane ? "<small>pane</small>" : ""}</label>`;
  }).join("")}${g === "volume" && nse && !isDaily() ? '<p class="pp-ind-note">These need traded volume. Real prices include volume only on the 1D, 1W and 1M timeframes (or use the simulated feed).</p>' : ""}</fieldset>`).join("")
   + `<div class="pp-ind-foot"><button type="button" class="pp-mini" data-ind-clear${count ? "" : " disabled"}>Remove all</button><a href="pages/lesson.html?topic=technical-indicators">How each indicator works →</a></div>`;
  $("ppIndList").closest("details").querySelector("summary").innerHTML = `ƒx Indicators${count ? ` <small class="pp-ind-count">${count}</small>` : ""}`;
 }
 function syncChartControls() {
  const cur = tfId();
  const why = id => (state.feed === "nse" ? "Real prices come in 5-minute steps" : DAILY_TF.includes(id) ? "Daily candles are not available on this feed" : "");
  $("ppTf").innerHTML = TF_GROUPS.map(([a, b]) => `<div class="pp-tf-group">${TIMEFRAMES.slice(a, b).map(([id, label]) => {
   const ok = tfAvailable(id);
   return `<button type="button" data-tf="${id}" aria-pressed="${id === cur}" class="${id === cur ? "active" : ""}"${ok ? "" : ` disabled title="${why(id)}"`}>${label}</button>`;
  }).join("")}</div>`).join("");
  $("ppTfBtn").textContent = tfDef()[2];
  $("ppTfBtn").setAttribute("aria-label", `Timeframe: ${tfDef()[1]}`);
  $("ppRanges").innerHTML = RANGES.map(([id, label]) => `<button type="button" data-range="${id}" title="${label}" aria-pressed="${state.range === id}" class="${state.range === id ? "active" : ""}">${id}</button>`).join("");
  $("ppChartType").value = store.prefs.chartType;
 }
 $("ppFeed").innerHTML = Object.entries(FEEDS).map(([id, f]) => `<option value="${id}">${esc(f.label)}</option>`).join("");
 renderIndMenu();
 const accountView = PaperAccount.create({
  account, cfg, nameOf, money, signed, fmt, esc, posQty, posAvg, posCost, taxEstimate,
  price: sym => state.prices[sym], ref: sym => state.ref[sym],
  slab: () => Number(store.prefs.slab) || 0, today: isToday,
  plan: () => store.prefs.plan, plans: Object.entries(PaperCharges.plans).map(([id, p]) => [id, p.label]),
  capital, available, blocked: reservedForBuys, indices,
  onExit: exitPosition, onCancel: cancelOrder, downloadCsv, onGoto: setScreen,
  onSelect: sym => { selectSymbol(sym); setScreen("chart"); },
  onTrade: (side, sym) => openOrder(side, sym),
  onFunds: moveFunds, onReset: resetAccount,
  onPlan: id => { store.prefs.plan = id; save(); scheduleRender(); },
  onSlab: v => { store.prefs.slab = Math.min(50, Math.max(0, Number(v) || 0)); save(); scheduleRender(); },
  slippageOn: () => !!store.prefs.slippage,
  onSlippage: on => { store.prefs.slippage = on; save(); scheduleRender(); },
  infoButton: PaperCosts.infoButton
 });
 journal = PaperJournal.create({
  esc, money, signed, toast, capital: () => 1000000, infoButton: PaperCosts.infoButton,
  busy: () => !$("ptOrder").hidden || !$("ptInfo").hidden,
  onChange: renderNav
 });
 const replay = PaperReplay.create({
  esc, money, signed, fmt, toast, journal, loadScript, dataUrl, dataFile, names: NSE_NAME, infoButton: PaperCosts.infoButton,
  plan: () => store.prefs.plan, slippageOn: () => !!store.prefs.slippage,
  defaultSymbol: () => (state.feed === "nse" && state.symbol && isLiveCovered(state.symbol) ? state.symbol : "RELIANCE"),
  // NIFTY 500 stocks have replay data; the list comes from the quotes file, or from data/universe.json.
  covered: () => (window.MP_QUOTES ? Promise.resolve(Object.keys(MP_QUOTES.q).filter(s => MP_QUOTES.q[s][3] === 1).sort())
   : fetch(window.MPChrome ? MPChrome.url("data/universe.json") : "data/universe.json").then(r => r.json()).then(l => l.slice().sort()).catch(() => []))
 });
 syncChartControls();
 // The index strip in the terminal bar uses the same data file as the site's index ribbon.
 document.addEventListener("mp-indices", scheduleRender);
 setInterval(renderIndices, 60000);
 let firstScreen = "chart";
 try { firstScreen = localStorage.getItem("mp-paper-tab") || "chart"; } catch (e) { /* storage unavailable */ }
 if (firstScreen === "watchlist" && !window.matchMedia("(max-width: 900px)").matches) firstScreen = "chart";
 setScreen(SCREENS.includes(firstScreen) ? firstScreen : "chart");
 selectFeed(FEEDS[store.prefs.feed] ? store.prefs.feed : "nse");
})();
