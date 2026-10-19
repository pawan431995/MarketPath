// Strategy builder and backtester for the paper-trading terminal.
// A strategy is plain data: buy rules, sell rules, risk exits and position size. The backtester runs it on real
// daily candles (NIFTY 500, about 2 years) one bar at a time: signals are read at a bar's close and orders fill
// at the next bar's open, with Indian delivery charges and estimated slippage. It reports return, CAGR, drawdown,
// win rate, profit factor, Sharpe ratio, exposure, a buy-and-hold comparison and an in-sample / out-of-sample
// split, for one stock or a whole list.
// Needs paper-indicators.js, paper-charges.js and paper-costs.js. The engine (PaperStrategy.backtest) has no DOM
// code, so it can be tested in Node.
const PaperStrategy = (function () {
 const PI = typeof PaperIndicators !== "undefined" ? PaperIndicators : null;
 const r2 = n => Math.round(n * 100) / 100;
 // Operand objects: { k: kind, n, m, v } — k names the indicator; n, m and v are its parameters.

 // ---------- Building blocks ----------
 // family: operands in the same family share a scale (drawn together, compared sensibly).
 const OPERANDS = {
  close: { label: "Close", family: "price" }, open: { label: "Open", family: "price" }, high: { label: "High", family: "price" }, low: { label: "Low", family: "price" },
  sma: { label: "SMA", family: "price", params: [["n", "period", 20]] },
  ema: { label: "EMA", family: "price", params: [["n", "period", 20]] },
  bbUpper: { label: "Bollinger upper", family: "price", params: [["n", "period", 20], ["m", "std dev", 2]] },
  bbMid: { label: "Bollinger middle", family: "price", params: [["n", "period", 20]] },
  bbLower: { label: "Bollinger lower", family: "price", params: [["n", "period", 20], ["m", "std dev", 2]] },
  supertrend: { label: "Supertrend", family: "price", params: [["n", "ATR period", 10], ["m", "multiplier", 3]] },
  psar: { label: "Parabolic SAR", family: "price" },
  highest: { label: "Highest high of previous", family: "price", params: [["n", "bars", 20]] },
  lowest: { label: "Lowest low of previous", family: "price", params: [["n", "bars", 20]] },
  rsi: { label: "RSI", family: "rsi", params: [["n", "period", 14]] },
  stochK: { label: "Stochastic %K", family: "stoch" }, stochD: { label: "Stochastic %D", family: "stoch" },
  macd: { label: "MACD line", family: "macd" }, macdSignal: { label: "MACD signal", family: "macd" }, macdHist: { label: "MACD histogram", family: "macd" },
  adx: { label: "ADX", family: "adx", params: [["n", "period", 14]] }, pdi: { label: "+DI", family: "adx", params: [["n", "period", 14]] }, mdi: { label: "−DI", family: "adx", params: [["n", "period", 14]] },
  cci: { label: "CCI", family: "cci", params: [["n", "period", 20]] },
  mfi: { label: "MFI", family: "mfi", params: [["n", "period", 14]] },
  atrPct: { label: "ATR as % of price", family: "atr", params: [["n", "period", 14]] },
  roc: { label: "% change over", family: "roc", params: [["n", "bars", 10]] },
  volume: { label: "Volume", family: "volume" }, volSma: { label: "Average volume", family: "volume", params: [["n", "bars", 20]] },
  value: { label: "Number", family: "value", params: [["v", "value", 50]] }
 };
 const OPS = [["crossAbove", "crosses above"], ["crossBelow", "crosses below"], [">", "is above"], ["<", "is below"]];
 const opLabel = op => (OPS.find(o => o[0] === op) || [op, op])[1];

 const P = (o, k) => { const def = (OPERANDS[o.k].params || []).find(p => p[0] === k); return o[k] !== undefined && o[k] !== null && o[k] !== "" ? Number(o[k]) : def ? def[2] : undefined; };
 function describe(o) {
  const d = OPERANDS[o.k];
  if (!d) return "?";
  if (o.k === "value") return String(P(o, "v"));
  if (o.k === "highest" || o.k === "lowest" || o.k === "roc") return `${d.label} ${P(o, "n")} bars`;
  const ps = (d.params || []).map(p => P(o, p[0]));
  return ps.length ? `${d.label}(${ps.join(", ")})` : d.label;
 }
 const ruleText = r => `${describe(r.a)} ${opLabel(r.op)} ${describe(r.b)}`;
 function strategyText(s) {
  const part = (g, verb) => (g.rules.length ? `${verb} when ${g.rules.map(ruleText).join(g.mode === "any" ? " OR " : " AND ")}` : "");
  const risk = s.risk || {}, extra = [
   risk.stop ? `a ${risk.stop}% stop-loss` : "", risk.atrStop ? `a stop ${risk.atrStop}× ATR below entry` : "", risk.trail ? `a ${risk.trail}% trailing stop` : "",
   risk.target ? `a ${risk.target}% profit target` : "", risk.maxBars ? `a ${risk.maxBars}-day time limit` : ""
  ].filter(Boolean);
  return [part(s.entry, "Buy"), part(s.exit, "Sell"), extra.length ? `Exit also on ${extra.join(", ")}` : ""].filter(Boolean).join(". ") + ".";
 }

 // ---------- Indicator series (cached per run) ----------
 function seriesFor(bars, o, cache) {
  const key = JSON.stringify([o.k, P(o, "n"), P(o, "m"), P(o, "v")]);
  if (cache[key]) return cache[key];
  const c = cache.closes || (cache.closes = bars.map(b => b.close));
  const n = P(o, "n"), len = bars.length;
  let out;
  switch (o.k) {
   case "close": case "open": case "high": case "low": out = bars.map(b => b[o.k]); break;
   case "volume": out = bars.map(b => b.volume); break;
   case "sma": out = PI.sma(c, n); break;
   case "ema": out = PI.ema(c, n); break;
   case "bbUpper": out = PI.bollinger(c, n, P(o, "m")).upper; break;
   case "bbMid": out = PI.sma(c, n); break;
   case "bbLower": out = PI.bollinger(c, n, P(o, "m")).lower; break;
   case "supertrend": out = PI.supertrend(bars, n, P(o, "m")).value; break;
   case "psar": out = PI.psar(bars).value; break;
   case "highest": out = bars.map((_, i) => (i >= n ? Math.max(...bars.slice(i - n, i).map(b => b.high)) : null)); break;
   case "lowest": out = bars.map((_, i) => (i >= n ? Math.min(...bars.slice(i - n, i).map(b => b.low)) : null)); break;
   case "rsi": out = PI.rsi(c, n); break;
   case "stochK": out = PI.stochastic(bars).k; break;
   case "stochD": out = PI.stochastic(bars).d; break;
   case "macd": out = PI.macd(c).macd; break;
   case "macdSignal": out = PI.macd(c).signal; break;
   case "macdHist": out = PI.macd(c).hist; break;
   case "adx": out = PI.adx(bars, n).adx; break;
   case "pdi": out = PI.adx(bars, n).pdi; break;
   case "mdi": out = PI.adx(bars, n).mdi; break;
   case "cci": out = PI.cci(bars, n); break;
   case "mfi": out = PI.mfi(bars, n); break;
   case "atrPct": out = PI.atr(bars, n).map((v, i) => (v === null ? null : (v / c[i]) * 100)); break;
   case "roc": out = c.map((v, i) => (i >= n ? (v / c[i - n] - 1) * 100 : null)); break;
   case "volSma": out = PI.sma(bars.map(b => b.volume), n); break;
   case "value": out = new Array(len).fill(P(o, "v")); break;
   default: out = new Array(len).fill(null);
  }
  return (cache[key] = out);
 }
 function ruleAt(r, i, cache, bars) {
  const a = seriesFor(bars, r.a, cache), b = seriesFor(bars, r.b, cache);
  const A = a[i], B = b[i];
  if (A === null || B === null || A === undefined || B === undefined) return false;
  if (r.op === ">") return A > B;
  if (r.op === "<") return A < B;
  const A0 = a[i - 1], B0 = b[i - 1];
  if (A0 === null || B0 === null || A0 === undefined || B0 === undefined) return false;
  return r.op === "crossAbove" ? A > B && A0 <= B0 : A < B && A0 >= B0;
 }
 const groupAt = (g, i, cache, bars) => (g.rules.length ? (g.mode === "any" ? g.rules.some(r => ruleAt(r, i, cache, bars)) : g.rules.every(r => ruleAt(r, i, cache, bars))) : false);

 // ---------- Statistics ----------
 function stats(equity, trades, capital, bars, from, to) {
  const eq = equity.slice(from, to + 1);
  if (!eq.length) return null;
  const start = from === 0 ? capital : equity[from - 1].value, end = eq[eq.length - 1].value;
  let peak = start, maxDd = 0;
  const rets = [];
  eq.forEach((p, i) => { peak = Math.max(peak, p.value); maxDd = Math.max(maxDd, (peak - p.value) / peak); rets.push(p.value / (i ? eq[i - 1].value : start) - 1); });
  const mean = rets.reduce((a, b) => a + b, 0) / rets.length, sd = Math.sqrt(rets.reduce((a, b) => a + (b - mean) ** 2, 0) / rets.length);
  const days = Math.max(1, (eq[eq.length - 1].time - (from === 0 ? bars[0].time : equity[from - 1].time)) / 86400);
  const t = trades.filter(x => x.inIdx >= from && x.inIdx <= to), wins = t.filter(x => x.pnl > 0), losses = t.filter(x => x.pnl <= 0);
  const gw = wins.reduce((a, x) => a + x.pnl, 0), gl = -losses.reduce((a, x) => a + x.pnl, 0);
  const bhStart = bars[from].open, bhEnd = bars[to].close;
  return {
   ret: (end / start - 1) * 100, cagr: (Math.pow(end / start, 365 / days) - 1) * 100, maxDd: maxDd * 100,
   sharpe: sd > 0 ? (mean / sd) * Math.sqrt(252) : null, trades: t.length, winRate: t.length ? (wins.length / t.length) * 100 : null,
   profitFactor: gl > 0 ? gw / gl : gw > 0 ? Infinity : null, expectancy: t.length ? (gw - gl) / t.length : null,
   avgWin: wins.length ? gw / wins.length : 0, avgLoss: losses.length ? gl / losses.length : 0,
   avgBars: t.length ? t.reduce((a, x) => a + x.bars, 0) / t.length : null, exposure: (eq.filter(p => p.inPos).length / eq.length) * 100,
   charges: t.reduce((a, x) => a + x.charges, 0), best: t.length ? Math.max(...t.map(x => x.pnlPct)) : null, worst: t.length ? Math.min(...t.map(x => x.pnlPct)) : null,
   buyHold: (bhEnd / bhStart - 1) * 100, end, days
  };
 }

 // ---------- The backtester ----------
 // opts: { capital, sizePct, plan, slippage (bool), split (0..1, in-sample share) }
 function backtest(bars, s, opts) {
  const capital = opts.capital || 1000000, sizePct = Math.min(100, Math.max(1, opts.sizePct || 100)), cache = {};
  const rules = s.entry.rules.concat(s.exit.rules);
  if (!s.entry.rules.length) throw new Error("Add at least one buy condition.");
  // Warm-up: the first bar where every indicator in the rules has a value (and the bar before, for crosses).
  let warm = 1;
  rules.forEach(r => [r.a, r.b].forEach(o => { const a = seriesFor(bars, o, cache), i = a.findIndex(v => v !== null && v !== undefined); warm = Math.max(warm, i < 0 ? bars.length : i + 1); }));
  const risk = s.risk || {}, atr = risk.atrStop ? PI.atr(bars, 14) : null;
  if (warm >= bars.length - 2) throw new Error(`Not enough data: the indicators need ${warm} bars of history and only ${bars.length} are available. Use shorter periods.`);
  const charges = (side, qty, px) => PaperCharges.compute(side, "delivery", qty, px, opts.plan).total;
  const advAt = i => { const w = bars.slice(Math.max(0, i - 20), i).filter(b => b.volume > 0); return w.length ? w.reduce((a, b) => a + b.close * b.volume, 0) / w.length : 0; };
  const slip = (side, qty, px, i) => (opts.slippage ? PaperCosts.slippage({ price: px, qty, side, tier: "mid", adv: advAt(i) }).perShare : 0);
  let cash = capital, pos = null, pending = null;
  const trades = [], equity = [];
  function exit(i, px, reason) {
   const s2 = slip("sell", pos.qty, px, i), fill = r2(Math.max(0.05, px - s2)), c = charges("sell", pos.qty, fill);
   cash += pos.qty * fill - c;
   const pnl = (fill - pos.entry) * pos.qty - pos.charges - c;
   trades.push({ inIdx: pos.inIdx, outIdx: i, inTime: bars[pos.inIdx].time, outTime: bars[i].time, entry: pos.entry, exit: fill, qty: pos.qty, pnl, pnlPct: (pnl / (pos.entry * pos.qty)) * 100, bars: i - pos.inIdx + 1, charges: pos.charges + c, reason });
   pos = null;
  }
  for (let i = warm; i < bars.length; i++) {
   const b = bars[i];
   // 1. Orders decided at the previous close fill at this bar's open.
   if (pending === "buy" && !pos) {
    const budget = (cash + 0) * (sizePct / 100), raw = b.open, qty = Math.floor(budget / (raw * 1.003));
    if (qty > 0) {
     const fill = r2(raw + slip("buy", qty, raw, i)), c = charges("buy", qty, fill);
     if (qty * fill + c <= cash) {
      cash -= qty * fill + c;
      pos = { qty, entry: fill, inIdx: i, charges: c, peak: fill, stop: null };
      const stops = [risk.stop ? fill * (1 - risk.stop / 100) : null, risk.atrStop && atr[i - 1] ? fill - risk.atrStop * atr[i - 1] : null].filter(Boolean);
      pos.stop = stops.length ? Math.max(...stops) : null;
      pos.target = risk.target ? fill * (1 + risk.target / 100) : null;
     }
    }
   } else if (pending && pending !== "buy" && pos) exit(i, b.open, pending);
   pending = null;
   // 2. Stop-loss, trailing stop and target inside the bar. A gap through a level fills at the open; if the stop
   //    and the target are both inside one bar, the stop is assumed to come first.
   if (pos) {
    const trail = risk.trail ? pos.peak * (1 - risk.trail / 100) : null;
    const stop = Math.max(pos.stop || 0, trail || 0) || null;
    if (stop && b.low <= stop) exit(i, Math.min(b.open, stop), trail && stop === trail ? "Trailing stop" : "Stop-loss");
    else if (pos.target && b.high >= pos.target) exit(i, Math.max(b.open, pos.target), "Target");
    if (pos) pos.peak = Math.max(pos.peak, b.high);
   }
   // 3. Signals at the close, acted on at the next open.
   if (i < bars.length - 1) {
    if (pos) {
     if (s.exit.rules.length && groupAt(s.exit, i, cache, bars)) pending = "Sell signal";
     else if (risk.maxBars && i - pos.inIdx + 1 >= risk.maxBars) pending = "Time limit";
    }
    else if (groupAt(s.entry, i, cache, bars)) pending = "buy";
   }
   equity.push({ time: b.time, value: cash + (pos ? pos.qty * b.close : 0), inPos: !!pos });
  }
  if (pos) exit(bars.length - 1, bars[bars.length - 1].close, "Still open at the end");
  equity[equity.length - 1].value = cash;
  // Equity and bars are offset by the warm-up; stats use equity indexes, so shift trade indexes to match.
  const shifted = trades.map(t => Object.assign({}, t, { inIdx: t.inIdx - warm, outIdx: t.outIdx - warm }));
  const tb = bars.slice(warm), all = stats(equity, shifted, capital, tb, 0, equity.length - 1);
  const cut = Math.floor(equity.length * (opts.split || 0.7));
  return {
   warm, trades, equity, stats: all,
   inSample: cut > 5 ? stats(equity, shifted, capital, tb, 0, cut - 1) : null,
   outSample: cut < equity.length - 5 ? stats(equity, shifted, capital, tb, cut, equity.length - 1) : null,
   splitTime: equity[cut] ? equity[cut].time : null
  };
 }

 // ---------- Ready-made strategies ----------
 const o = (k, extra) => Object.assign({ k }, extra || {});
 const rule = (a, op, b) => ({ a, op, b });
 const TEMPLATES = [
  { id: "golden", name: "Golden cross (50/200 SMA)", lesson: "moving-averages", entry: { mode: "all", rules: [rule(o("sma", { n: 50 }), "crossAbove", o("sma", { n: 200 }))] }, exit: { mode: "any", rules: [rule(o("sma", { n: 50 }), "crossBelow", o("sma", { n: 200 }))] }, risk: {} },
  { id: "ema921", name: "EMA 9 / 21 crossover", entry: { mode: "all", rules: [rule(o("ema", { n: 9 }), "crossAbove", o("ema", { n: 21 }))] }, exit: { mode: "any", rules: [rule(o("ema", { n: 9 }), "crossBelow", o("ema", { n: 21 }))] }, risk: { stop: 6 } },
  { id: "rsi", name: "RSI mean reversion in an uptrend", entry: { mode: "all", rules: [rule(o("rsi", { n: 14 }), "crossAbove", o("value", { v: 30 })), rule(o("close"), ">", o("sma", { n: 200 }))] }, exit: { mode: "any", rules: [rule(o("rsi", { n: 14 }), ">", o("value", { v: 60 }))] }, risk: { stop: 8, maxBars: 30 } },
  { id: "bbounce", name: "Bollinger band bounce", entry: { mode: "all", rules: [rule(o("close"), "crossAbove", o("bbLower", { n: 20, m: 2 }))] }, exit: { mode: "any", rules: [rule(o("close"), ">", o("bbMid", { n: 20 }))] }, risk: { stop: 6 } },
  { id: "donchian", name: "20-day breakout (Donchian)", entry: { mode: "all", rules: [rule(o("close"), ">", o("highest", { n: 20 }))] }, exit: { mode: "any", rules: [rule(o("close"), "<", o("lowest", { n: 10 }))] }, risk: {} },
  { id: "macd", name: "MACD crossover with trend filter", entry: { mode: "all", rules: [rule(o("macd"), "crossAbove", o("macdSignal")), rule(o("close"), ">", o("ema", { n: 50 }))] }, exit: { mode: "any", rules: [rule(o("macd"), "crossBelow", o("macdSignal"))] }, risk: { stop: 7 } },
  { id: "supertrend", name: "Supertrend trend-following", entry: { mode: "all", rules: [rule(o("close"), "crossAbove", o("supertrend", { n: 10, m: 3 }))] }, exit: { mode: "any", rules: [rule(o("close"), "crossBelow", o("supertrend", { n: 10, m: 3 }))] }, risk: {} },
  { id: "pullback", name: "Pullback to the 20 EMA in an uptrend", entry: { mode: "all", rules: [rule(o("close"), ">", o("sma", { n: 200 })), rule(o("close"), "crossAbove", o("ema", { n: 20 }))] }, exit: { mode: "any", rules: [rule(o("close"), "crossBelow", o("ema", { n: 50 }))] }, risk: { stop: 7, target: 15 } },
  { id: "adx", name: "ADX trend with DI crossover", entry: { mode: "all", rules: [rule(o("pdi", { n: 14 }), "crossAbove", o("mdi", { n: 14 })), rule(o("adx", { n: 14 }), ">", o("value", { v: 20 }))] }, exit: { mode: "any", rules: [rule(o("mdi", { n: 14 }), "crossAbove", o("pdi", { n: 14 }))] }, risk: { atrStop: 2.5 } },
  { id: "volume", name: "Volume breakout", entry: { mode: "all", rules: [rule(o("close"), ">", o("highest", { n: 50 })), rule(o("volume"), ">", o("volSma", { n: 20 }))] }, exit: { mode: "any", rules: [] }, risk: { trail: 8, maxBars: 40 } }
 ];

 return { OPERANDS, OPS, TEMPLATES, backtest, describe, ruleText, strategyText, seriesFor };
})();
if (typeof module !== "undefined") module.exports = PaperStrategy;
