// Paper trading practice module (index.html#paper). Virtual money only: nothing is sent to a broker.
// Feeds: "nse" uses real NSE prices, delayed about 5–10 minutes (data files published by tools/fetch-quotes.js);
// "sim" simulates any NSE-listed stock in the browser (a random walk around a per-symbol base price), for practice
// at any hour; "finnhub" polls Finnhub's free quote and symbol-search APIs with the visitor's own API key.
// Each feed keeps its own account, watchlist and drawings, because the feeds price in different currencies.
// Needs shared.js (MP.esc), paper-symbols.js, paper-charges.js, paper-indicators.js, paper-drawings.js and
// paper-account.js (the Portfolio, Holdings, Positions and Orders views).
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

 const INDICATORS = [
  { id: "vol", label: "Volume" },
  { id: "sma20", label: "SMA 20", color: "#ffbf78" },
  { id: "ema50", label: "EMA 50", color: "#a994ff" },
  { id: "bb", label: "Bollinger Bands 20, 2", color: "#45a9d9" },
  { id: "vwap", label: "VWAP", color: "#ff8ed1" },
  { id: "rsi", label: "RSI 14 (own pane)", color: "#a994ff" },
  { id: "macd", label: "MACD 12, 26, 9 (own pane)", color: "#45a9d9" }
 ];

 const NSE_NAME = new Map(typeof NSE_SYMBOLS !== "undefined" ? NSE_SYMBOLS : []);

 const $ = id => document.getElementById(id);
 const esc = s => MP.esc(s);
 const cfg = () => FEEDS[state.feed];
 const tfMin = () => (state.feed === "nse" ? Math.max(5, store.prefs.tf) : store.prefs.tf);
 // Real prices carry no volume, so the volume pane is skipped on the NSE feed.
 const volOn = () => store.prefs.indicators.includes("vol") && state.feed !== "nse";
 const fmt = n => Number(n).toLocaleString(cfg().locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
 const money = n => `${cfg().currency} ${fmt(n)}`;
 const signed = n => `${n >= 0 ? "+" : "−"}${money(Math.abs(n))}`;
 const gauss = () => Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
 const roundTick = x => Math.max(0.05, Math.round(x * 20) / 20);

 const state = {
  feed: "sim", symbol: null, bars: {}, prices: {}, ref: {}, base: {}, noQuote: new Set(), keyBad: false,
  stop: null, chart: null, series: {}, view: [], lastLen: 0, hoverTime: null, expanded: false
 };

 // ---------- Persistence (per-viewer; storage can be blocked, so every access is wrapped) ----------
 const store = (function load() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { s = null; }
  s = s && typeof s === "object" ? s : {};
  ["accounts", "watchlists", "drawings", "lastPrices", "names"].forEach(k => { s[k] = s[k] || {}; });
  s.prefs = Object.assign({ tf: 1, chartType: "candles", indicators: ["vol", "sma20"], plan: "zero", slab: 30 }, s.prefs || {});
  return s;
 })();
 function save() {
  if (state.feed === "sim") store.lastPrices.sim = Object.assign(store.lastPrices.sim || {}, state.prices);
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* storage unavailable */ }
 }
 function readKey() { try { return localStorage.getItem(KEY_STORE) || ""; } catch (e) { return ""; } }
 function writeKey(key) { try { localStorage.setItem(KEY_STORE, key); } catch (e) { /* storage unavailable */ } }

 function account() {
  const a = store.accounts[state.feed];
  if (a && a.realized) return a;
  return (store.accounts[state.feed] = { cash: cfg().start, positions: {}, pending: [], orders: [], realized: { stcg: 0, ltcg: 0, intraday: 0 }, charges: 0 });
 }
 function watchlist() {
  if (!Array.isArray(store.watchlists[state.feed])) store.watchlists[state.feed] = cfg().watchlist.slice();
  return store.watchlists[state.feed];
 }
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
 function holdingsValue(a) {
  return Object.values(a.positions).reduce((s, p) => s + posQty(p) * (state.prices[p.sym] || posAvg(p)), 0);
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
  const ref = order.type === "limit" ? order.limit : price;
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
  if (order.type === "market") fill(a, rec, price);
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
   let left = rec.qty, gain = 0;
   while (left > 0 && p.lots.length) {
    const lot = p.lots[0], q = Math.min(left, lot.qty);
    const g = q * (price - sellCps) - q * (lot.price + lot.cps);
    const cat = rec.product === "intraday" ? "intraday" : (now - lot.time) / 86400000 > PaperCharges.tax.longTermDays ? "ltcg" : "stcg";
    a.realized[cat] += g;
    gain += g;
    lot.qty -= q;
    left -= q;
    if (lot.qty === 0) p.lots.shift();
   }
   if (!p.lots.length) delete a.positions[key];
   rec.gain = gain;
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
  state.bars = {}; state.prices = {}; state.ref = {}; state.base = {};
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
  $("ppSettingsBox").hidden = cfg().charges !== "india";
  $("ppSearch").placeholder = feed !== "finnhub" ? "Search any NSE stock by name or symbol" : "Search symbols on Finnhub (e.g. Apple, AAPL)";
  document.querySelectorAll('#ppTf [data-tf="1"]').forEach(b => { b.hidden = feed === "nse"; }); // real data is 5-minute
  store.prefs.feed = feed;
  syncChartControls(); // the effective timeframe depends on the feed
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
  scheduleRender();
 }

 function selectSymbol(sym) {
  state.symbol = sym;
  ensureData(sym);
  if (state.feed === "finnhub" && readKey() && !state.prices[sym]) quoteFinnhub(sym);
  closeSearch();
  buildChart();
  scheduleRender();
  if (state.feed === "nse") {
   loadIntraday(sym).then(() => { if (state.symbol === sym && state.feed === "nse") { nseNote(); buildChart(); scheduleRender(); } });
  }
 }

 // ---------- Chart ----------
 function aggregate(bars, tf) {
  if (tf === 1) return bars;
  const sec = tf * 60, out = [];
  for (const b of bars) {
   const t = Math.floor(b.time / sec) * sec, last = out[out.length - 1];
   if (last && last.time === t) {
    last.high = Math.max(last.high, b.high);
    last.low = Math.min(last.low, b.low);
    last.close = b.close;
    last.volume += b.volume;
   } else out.push({ time: t, open: b.open, high: b.high, low: b.low, close: b.close, volume: b.volume });
  }
  return out;
 }

 function seriesData() {
  const raw = aggregate(state.bars[state.symbol] || [], tfMin());
  const ct = store.prefs.chartType, on = id => store.prefs.indicators.includes(id);
  const t = b => b.time + TZ;
  const closes = raw.map(b => b.close);
  const line = arr => raw.reduce((acc, b, i) => { if (arr[i] !== null && isFinite(arr[i])) acc.push({ time: t(b), value: arr[i] }); return acc; }, []);
  const d = { raw };
  if (ct === "line" || ct === "area") d.main = raw.map(b => ({ time: t(b), value: b.close }));
  else d.main = (ct === "ha" ? PI.heikinAshi(raw) : raw).map(b => ({ time: t(b), open: b.open, high: b.high, low: b.low, close: b.close }));
  if (volOn()) d.vol = raw.map(b => ({ time: t(b), value: b.volume, color: b.close >= b.open ? "rgba(47,191,143,.45)" : "rgba(239,95,107,.45)" }));
  if (on("sma20")) d.sma20 = line(PI.sma(closes, 20));
  if (on("ema50")) d.ema50 = line(PI.ema(closes, 50));
  if (on("bb")) { const bb = PI.bollinger(closes, 20, 2); d.bbU = line(bb.upper); d.bbM = line(bb.mid); d.bbL = line(bb.lower); }
  if (on("vwap")) d.vwap = line(PI.vwap(raw));
  if (on("rsi")) d.rsi = line(PI.rsi(closes, 14));
  if (on("macd")) {
   const m = PI.macd(closes);
   d.macd = line(m.macd);
   d.macdSig = line(m.signal);
   d.macdHist = raw.reduce((acc, b, i) => { const v = m.hist[i]; if (v !== null) acc.push({ time: t(b), value: v, color: v >= 0 ? "rgba(47,191,143,.6)" : "rgba(239,95,107,.6)" }); return acc; }, []);
  }
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
   timeScale: { borderColor: border, timeVisible: true, secondsVisible: false, rightOffset: 6 }
  };
 }

 function extraPanes() {
  return ["rsi", "macd"].filter(id => store.prefs.indicators.includes(id)).length;
 }
 function sizeChart() {
  const el = $("ppChart");
  // Expanded: fill the screen below the toolbars (about 290px tall in total).
  el.style.height = state.expanded ? "max(320px, calc(100vh - 290px))" : `${400 + extraPanes() * 130}px`;
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
  const ct = store.prefs.chartType, on = id => store.prefs.indicators.includes(id);
  const priceFormat = { type: "price", precision: 2, minMove: cfg().minMove };
  if (ct === "line") s.main = chart.addSeries(LW.LineSeries, { color: "#48e0b0", lineWidth: 2, priceFormat });
  else if (ct === "area") s.main = chart.addSeries(LW.AreaSeries, { lineColor: "#48e0b0", topColor: "rgba(72,224,176,.32)", bottomColor: "rgba(72,224,176,0)", lineWidth: 2, priceFormat });
  else if (ct === "bars") s.main = chart.addSeries(LW.BarSeries, { upColor: UP, downColor: DOWN, priceFormat });
  else s.main = chart.addSeries(LW.CandlestickSeries, { upColor: UP, downColor: DOWN, borderVisible: false, wickUpColor: UP, wickDownColor: DOWN, priceFormat });

  const line = (key, color, pane, extra) => {
   s[key] = chart.addSeries(LW.LineSeries, Object.assign({ color, lineWidth: 1, priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false }, extra || {}), pane);
  };
  if (volOn()) {
   s.vol = chart.addSeries(LW.HistogramSeries, { priceScaleId: "vol", priceFormat: { type: "volume" }, priceLineVisible: false, lastValueVisible: false }, 0);
   chart.priceScale("vol").applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });
  }
  s.main.priceScale().applyOptions({ scaleMargins: { top: 0.08, bottom: volOn() ? 0.2 : 0.08 } });
  if (on("sma20")) line("sma20", "#ffbf78", 0, { lineWidth: 2 });
  if (on("ema50")) line("ema50", "#a994ff", 0, { lineWidth: 2 });
  if (on("bb")) { line("bbU", "#45a9d9", 0); line("bbM", "rgba(69,169,217,.7)", 0, { lineStyle: 2 }); line("bbL", "#45a9d9", 0); }
  if (on("vwap")) line("vwap", "#ff8ed1", 0, { lineWidth: 2 });
  let pane = 1;
  if (on("rsi")) {
   line("rsi", "#a994ff", pane, { lineWidth: 2, lastValueVisible: true });
   [70, 30].forEach(v => s.rsi.createPriceLine({ price: v, color: "rgba(156,174,196,.55)", lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: "" }));
   pane++;
  }
  if (on("macd")) {
   s.macdHist = chart.addSeries(LW.HistogramSeries, { priceLineVisible: false, lastValueVisible: false }, pane);
   line("macd", "#45a9d9", pane, { lineWidth: 2 });
   line("macdSig", "#ffbf78", pane);
   pane++;
  }
  const panes = chart.panes();
  if (panes.length > 1) { panes[0].setStretchFactor(3); panes.slice(1).forEach(p => p.setStretchFactor(1)); }

  updateChart(true);
  chart.timeScale().subscribeVisibleLogicalRangeChange(() => drawings.schedule());
  chart.subscribeCrosshairMove(param => {
   state.hoverTime = param && param.time !== undefined ? param.time - TZ : null;
   updateLegend();
   drawings.schedule();
  });
 }

 function updateChart(full) {
  const d = seriesData();
  const len = d.raw.length;
  state.view = d.raw;
  if (state.chart) {
   if (full || len < state.lastLen || len > state.lastLen + 1) {
    Object.keys(state.series).forEach(k => state.series[k].setData(d[k] || []));
   } else {
    Object.keys(state.series).forEach(k => { const arr = d[k]; if (arr && arr.length) state.series[k].update(arr[arr.length - 1]); });
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
   const text = state.feed === "nse" && p ? `last close ${money(p)} · the intraday chart covers NIFTY 500 stocks` : "waiting for prices…";
   $("ppLegend").innerHTML = `<strong>${esc(state.symbol || "")}</strong> <span>${esc(text)}</span>`;
   return;
  }
  const up = bar.close >= bar.open ? "pp-up" : "pp-down";
  const tf = tfMin();
  const inds = INDICATORS.filter(i => i.color && store.prefs.indicators.includes(i.id)).map(i => `<i style="color:${i.color}">${esc(i.label.replace(" (own pane)", ""))}</i>`).join(" ");
  $("ppLegend").innerHTML = `<strong>${esc(state.symbol)}</strong> · ${tf}m <span>O <b class="${up}">${fmt(bar.open)}</b></span><span>H <b class="${up}">${fmt(bar.high)}</b></span><span>L <b class="${up}">${fmt(bar.low)}</b></span><span>C <b class="${up}">${fmt(bar.close)}</b></span>${bar.volume ? `<span>Vol <b>${Math.round(bar.volume).toLocaleString("en-IN")}</b></span>` : ""}<br>${inds}`;
 }

 const drawings = PaperDrawings.create({
  svg: $("ppDrawLayer"),
  getContext: () => ({ chart: state.chart, series: state.series.main, bars: state.view, tfSec: tfMin() * 60 }),
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
   ? searchResults.map((r, i) => `<li role="option" id="ppOpt${i}" data-sym="${esc(r.sym)}" aria-selected="${i === searchActive}" class="${i === searchActive ? "active" : ""}"><span class="pp-opt-sym">${esc(r.sym)}</span><span class="pp-opt-name">${esc(r.name)}</span><button type="button" class="pp-opt-add" data-add="${esc(r.sym)}" aria-label="${wl.includes(r.sym) ? "In watchlist" : "Add " + esc(r.sym) + " to watchlist"}" title="${wl.includes(r.sym) ? "In watchlist" : "Add to watchlist"}">${wl.includes(r.sym) ? "★" : "☆"}</button></li>`).join("")
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
  if (i >= 0) wl.splice(i, 1); else { wl.push(sym); ensureData(sym); if (state.feed === "finnhub" && readKey()) quoteFinnhub(sym); }
  save();
  scheduleRender();
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
 const changeHtml = ch => (ch ? `<span class="${ch.abs >= 0 ? "pp-up" : "pp-down"}">${ch.pct >= 0 ? "+" : ""}${ch.pct.toFixed(2)}%</span>` : "—");

 function renderQuote() {
  const sym = state.symbol, p = state.prices[sym], ch = change(sym);
  $("ppSymTitle").textContent = sym || "";
  $("ppSymName").textContent = nameOf(sym);
  $("ppPrice").textContent = p ? money(p) : state.noQuote.has(sym) ? "no quote" : "—";
  setHTML($("ppChange"), ch ? `<span class="${ch.abs >= 0 ? "pp-up" : "pp-down"}">${signed(ch.abs)} (${ch.pct >= 0 ? "+" : ""}${ch.pct.toFixed(2)}%)</span> ${state.feed === "sim" ? "24h" : "today"}` : "");
  const inWl = watchlist().includes(sym);
  $("ppStar").textContent = inWl ? "★ In watchlist" : "☆ Add to watchlist";
  $("ppStar").setAttribute("aria-pressed", String(inWl));
 }

 function renderWatchlist() {
  const wl = watchlist();
  setHTML($("ppWatch"), wl.length ? wl.map(sym => {
   const p = state.prices[sym];
   return `<tr data-sym="${esc(sym)}" class="${sym === state.symbol ? "sel" : ""}"><td><strong>${esc(sym)}</strong><small>${esc(nameOf(sym))}</small></td><td class="num">${p ? money(p) : state.noQuote.has(sym) ? "no quote" : "—"}</td><td class="num">${changeHtml(change(sym))}</td><td class="num"><button type="button" class="pp-x" data-remove="${esc(sym)}" aria-label="Remove ${esc(sym)} from watchlist" title="Remove">✕</button></td></tr>`;
  }).join("") : `<tr><td colspan="4" class="pp-empty">Your watchlist is empty. Search for a stock and press ☆ to add it.</td></tr>`);
 }

 // Writes only when the markup changed, so a price tick does not rebuild unchanged parts of the page.
 function setHTML(el, html) { if (el._html !== html) { el.innerHTML = html; el._html = html; } }

 // ---------- Account actions (used by the account views) ----------
 function exitPosition(key) {
  const a = account(), p = a.positions[key];
  if (!p) return;
  const qty = freeToSell(a, p.sym, p.product);
  const err = qty > 0 ? placeOrder({ side: "sell", sym: p.sym, product: p.product, qty, type: "market" }) : "This position is already covered by open sell orders.";
  setMsg(err || `Exited ${qty} ${p.sym} at ${money(state.prices[p.sym])}${practiceNote()}.`, err ? "error" : "ok");
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
  if (done) setMsg(`3:20 pm: ${done} intraday position${done > 1 ? "s were" : " was"} squared off automatically.`, "ok");
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
  $("ppSubmit").textContent = `${t.side === "buy" ? "Buy" : "Sell"} ${state.symbol || ""}`;
  $("ppSubmit").classList.toggle("pp-sell-btn", t.side === "sell");
  const ref = t.type === "limit" ? t.limit : price;
  if (!(ref > 0) || !(t.qty > 0)) { $("ppEstimate").textContent = "Enter a quantity and price to see the estimate."; setHTML($("ppChargeList"), ""); return; }
  const value = t.qty * ref, c = charges(t.side, t.product, t.qty, ref);
  $("ppEstimate").textContent = `Value ${money(value)} · charges ${money(c.total)} · ${t.side === "buy" ? `needs ${money(value + c.total)}` : `you receive ${money(value - c.total)}`} · available ${money(available(a))}`;
  const line = (label, v) => (v ? `<tr><th>${label}</th><td>${money(v)}</td></tr>` : "");
  setHTML($("ppChargeList"), `<table class="pp-pnl">${line("Brokerage", c.brokerage)}${line("STT", c.stt)}${line("Exchange transaction charge", c.exchange)}${line("SEBI fee", c.sebi)}${line("Stamp duty", c.stamp)}${line("DP charge", c.dp)}${line("GST 18%", c.gst)}<tr class="pp-strong"><th>Total charges</th><td>${money(c.total)}</td></tr></table>`);
 }

 function render() {
  const a = account(), c = cfg();
  const tax = taxEstimate(a);
  const total = a.cash + holdingsValue(a), net = total - c.start - tax.total;
  $("ppAvail").textContent = money(available(a));
  $("ppInvested").textContent = money(holdingsValue(a));
  $("ppTotal").textContent = money(total);
  const pe = $("ppPnl");
  pe.textContent = `${signed(net)} (${(net / c.start * 100).toFixed(2)}%)`;
  pe.className = net >= 0 ? "pp-up" : "pp-down";
  renderQuote();
  renderWatchlist();
  accountView.render();
  updateEstimate();
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
  b.textContent = on ? "⤡ Collapse" : "⤢ Expand";
  b.title = on ? "Collapse (Esc)" : "Expand to full screen";
  sizeChart();
  drawings.schedule();
 }
 function setSideHidden(on) {
  $("paperApp").classList.toggle("pp-side-hidden", on);
  const b = $("ppSideToggle");
  b.setAttribute("aria-pressed", String(on));
  b.textContent = on ? "⇤ Show panel" : "⇥ Hide panel";
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
   if (r) { $("ppSearch").value = ""; selectSymbol(r.sym); }
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
  if (li) { $("ppSearch").value = ""; selectSymbol(li.dataset.sym); }
 });
 $("ppSearch").addEventListener("blur", () => setTimeout(closeSearch, 150));

 $("ppStar").addEventListener("click", () => toggleWatch(state.symbol));
 $("ppWatch").addEventListener("click", e => {
  const rm = e.target.closest("[data-remove]");
  if (rm) { toggleWatch(rm.dataset.remove); return; }
  const row = e.target.closest("tr[data-sym]");
  if (row) selectSymbol(row.dataset.sym);
 });

 $("ppTf").addEventListener("click", e => {
  const b = e.target.closest("[data-tf]");
  if (!b) return;
  store.prefs.tf = Number(b.dataset.tf);
  save();
  syncChartControls();
  buildChart();
 });
 $("ppChartType").addEventListener("change", e => {
  store.prefs.chartType = e.target.value;
  save();
  buildChart();
 });
 const indMenu = document.querySelector(".pp-menu");
 document.addEventListener("pointerdown", e => { if (indMenu && indMenu.open && !indMenu.contains(e.target)) indMenu.open = false; });
 document.addEventListener("keydown", e => {
  if (e.key === "Escape" && indMenu && indMenu.open) { indMenu.open = false; indMenu.querySelector("summary").focus(); }
 });
 $("ppIndList").addEventListener("change", e => {
  const id = e.target.value;
  const list = store.prefs.indicators.filter(x => x !== id);
  if (e.target.checked) list.push(id);
  store.prefs.indicators = list;
  save();
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
 $("ppSideToggle").addEventListener("click", () => setSideHidden(!$("paperApp").classList.contains("pp-side-hidden")));
 document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  if (drawings.tool() !== "cursor") drawings.setTool("cursor");
  else if (state.expanded) setExpanded(false);
 });

 ["ppType", "ppQty", "ppLimit"].forEach(id => $(id).addEventListener("input", () => { updateEstimate(); setMsg(""); }));
 document.querySelectorAll('input[name="ppSide"], input[name="ppProduct"]').forEach(r => r.addEventListener("change", updateEstimate));
 $("ppOrderForm").addEventListener("submit", e => {
  e.preventDefault();
  const t = currentTicket();
  const err = placeOrder(Object.assign({ sym: state.symbol }, t));
  if (err) setMsg(err, "error");
  else if (t.type === "limit") setMsg(`Limit ${t.side} placed. It fills when the price reaches ${money(t.limit)}.`, "ok");
  else setMsg(`${t.side === "buy" ? "Bought" : "Sold"} ${t.qty} ${state.symbol} at ${money(state.prices[state.symbol])}${practiceNote()}.`, "ok");
 });
 $("ppPlan").addEventListener("change", e => { store.prefs.plan = e.target.value; save(); scheduleRender(); });
 $("ppSlab").addEventListener("input", e => { store.prefs.slab = Math.min(50, Math.max(0, Number(e.target.value) || 0)); save(); scheduleRender(); });
 $("ppReset").addEventListener("click", () => {
  const c = cfg();
  if (!confirm(`Reset the ${c.label.toLowerCase()} account to ${money(c.start)}? Positions, orders and P&L will be cleared.`)) return;
  delete store.accounts[state.feed];
  save();
  setMsg("Practice account reset.", "ok");
  scheduleRender();
 });
 document.addEventListener("mp-theme-change", () => { if (state.chart) state.chart.applyOptions(chartOptions()); });
 window.addEventListener("beforeunload", () => { save(); stopFeed(); });
 setInterval(save, 30000);
 setInterval(autoSquareOff, 30000);

 // ---------- Init ----------
 function syncChartControls() {
  document.querySelectorAll("#ppTf [data-tf]").forEach(b => {
   const on = Number(b.dataset.tf) === tfMin();
   b.classList.toggle("active", on);
   b.setAttribute("aria-pressed", String(on));
  });
  $("ppChartType").value = store.prefs.chartType;
 }
 $("ppFeed").innerHTML = Object.entries(FEEDS).map(([id, f]) => `<option value="${id}">${esc(f.label)}</option>`).join("");
 $("ppPlan").innerHTML = Object.entries(PaperCharges.plans).map(([id, p]) => `<option value="${id}">${esc(p.label)}</option>`).join("");
 $("ppPlan").value = store.prefs.plan;
 $("ppSlab").value = store.prefs.slab;
 $("ppIndList").innerHTML = INDICATORS.map(i => `<label><input type="checkbox" value="${i.id}"${store.prefs.indicators.includes(i.id) ? " checked" : ""}>${i.color ? `<i class="pp-swatch" style="background:${i.color}"></i>` : `<i class="pp-swatch pp-swatch-vol"></i>`}${esc(i.label)}</label>`).join("");
 const accountView = PaperAccount.create({
  account, cfg, nameOf, money, signed, fmt, esc, posQty, posAvg, posCost, taxEstimate,
  price: sym => state.prices[sym], ref: sym => state.ref[sym],
  slab: () => Number(store.prefs.slab) || 0, today: isToday,
  onExit: exitPosition, onCancel: cancelOrder, downloadCsv,
  onSelect: sym => { selectSymbol(sym); $("ppChartWrap").scrollIntoView({ behavior: "smooth", block: "center" }); }
 });
 syncChartControls();
 selectFeed(FEEDS[store.prefs.feed] ? store.prefs.feed : "nse");
})();
