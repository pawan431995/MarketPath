// Indicator maths for the paper-trading chart. Pure functions over arrays of numbers or OHLCV bars
// ({ time, open, high, low, close, volume }). Each returns an array aligned to the input, with null
// where there is not yet enough data (the warm-up period).
const PaperIndicators = (function () {
 function sma(values, n) {
  const out = new Array(values.length).fill(null);
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
   sum += values[i];
   if (i >= n) sum -= values[i - n];
   if (i >= n - 1) out[i] = sum / n;
  }
  return out;
 }

 // Seeded with the simple average of the first n values.
 function ema(values, n) {
  const out = new Array(values.length).fill(null);
  if (values.length < n) return out;
  const k = 2 / (n + 1);
  let prev = values.slice(0, n).reduce((s, v) => s + v, 0) / n;
  out[n - 1] = prev;
  for (let i = n; i < values.length; i++) {
   prev = values[i] * k + prev * (1 - k);
   out[i] = prev;
  }
  return out;
 }

 function bollinger(values, n = 20, mult = 2) {
  const mid = sma(values, n);
  const upper = new Array(values.length).fill(null);
  const lower = new Array(values.length).fill(null);
  for (let i = n - 1; i < values.length; i++) {
   let v = 0;
   for (let j = i - n + 1; j <= i; j++) v += (values[j] - mid[i]) ** 2;
   const sd = Math.sqrt(v / n);
   upper[i] = mid[i] + mult * sd;
   lower[i] = mid[i] - mult * sd;
  }
  return { upper, mid, lower };
 }

 // Wilder's RSI.
 function rsi(values, n = 14) {
  const out = new Array(values.length).fill(null);
  if (values.length <= n) return out;
  let gain = 0, loss = 0;
  for (let i = 1; i <= n; i++) {
   const d = values[i] - values[i - 1];
   if (d >= 0) gain += d; else loss -= d;
  }
  gain /= n; loss /= n;
  const value = () => (loss === 0 ? 100 : 100 - 100 / (1 + gain / loss));
  out[n] = value();
  for (let i = n + 1; i < values.length; i++) {
   const d = values[i] - values[i - 1];
   gain = (gain * (n - 1) + Math.max(d, 0)) / n;
   loss = (loss * (n - 1) + Math.max(-d, 0)) / n;
   out[i] = value();
  }
  return out;
 }

 function macd(values, fast = 12, slow = 26, signalLen = 9) {
  const ef = ema(values, fast), es = ema(values, slow);
  const line = values.map((_, i) => (ef[i] !== null && es[i] !== null ? ef[i] - es[i] : null));
  const signal = new Array(values.length).fill(null);
  const start = line.findIndex(v => v !== null);
  if (start >= 0) ema(line.slice(start), signalLen).forEach((v, j) => { signal[start + j] = v; });
  const hist = line.map((v, i) => (v !== null && signal[i] !== null ? v - signal[i] : null));
  return { macd: line, signal, hist };
 }

 // Volume-weighted average price, reset at the start of each Indian trading day (IST, UTC+5:30).
 function vwap(bars) {
  const out = new Array(bars.length).fill(null);
  let day = null, pv = 0, vol = 0;
  bars.forEach((b, i) => {
   const d = Math.floor((b.time + 19800) / 86400);
   if (d !== day) { day = d; pv = 0; vol = 0; }
   pv += ((b.high + b.low + b.close) / 3) * b.volume;
   vol += b.volume;
   out[i] = vol > 0 ? pv / vol : null;
  });
  return out;
 }

 function heikinAshi(bars) {
  const out = [];
  bars.forEach((b, i) => {
   const close = (b.open + b.high + b.low + b.close) / 4;
   const open = i === 0 ? (b.open + b.close) / 2 : (out[i - 1].open + out[i - 1].close) / 2;
   out.push({ time: b.time, open, high: Math.max(b.high, open, close), low: Math.min(b.low, open, close), close, volume: b.volume });
  });
  return out;
 }

 // ---------- Used by the indicators taught in the lessons (Stochastic, ATR, ADX, OBV, MFI, CCI, Supertrend,
 // Parabolic SAR, Ichimoku and pivot points) ----------
 const fillNull = n => new Array(n).fill(null);
 // Simple average that stays null until it has n non-null values in a row (for smoothing other indicators).
 function smaOf(values, n) {
  const out = fillNull(values.length);
  for (let i = n - 1; i < values.length; i++) {
   let s = 0, ok = true;
   for (let j = i - n + 1; j <= i; j++) { if (values[j] === null) { ok = false; break; } s += values[j]; }
   if (ok) out[i] = s / n;
  }
  return out;
 }
 function highest(bars, i, n) { let h = -Infinity; for (let j = i - n + 1; j <= i; j++) h = Math.max(h, bars[j].high); return h; }
 function lowest(bars, i, n) { let l = Infinity; for (let j = i - n + 1; j <= i; j++) l = Math.min(l, bars[j].low); return l; }
 const typical = b => (b.high + b.low + b.close) / 3;
 function trueRange(bars) {
  return bars.map((b, i) => (i === 0 ? b.high - b.low : Math.max(b.high - b.low, Math.abs(b.high - bars[i - 1].close), Math.abs(b.low - bars[i - 1].close))));
 }

 // Stochastic oscillator: %K = where the close sits in the n-bar high-low range (0–100), smoothed; %D = average of %K.
 function stochastic(bars, n = 14, kSmooth = 3, dSmooth = 3) {
  const raw = fillNull(bars.length);
  for (let i = n - 1; i < bars.length; i++) {
   const hh = highest(bars, i, n), ll = lowest(bars, i, n);
   raw[i] = hh === ll ? 50 : ((bars[i].close - ll) / (hh - ll)) * 100;
  }
  const k = smaOf(raw, kSmooth);
  return { k, d: smaOf(k, dSmooth) };
 }

 // Average True Range with Wilder's smoothing.
 function atr(bars, n = 14) {
  const tr = trueRange(bars), out = fillNull(bars.length);
  if (bars.length < n) return out;
  let a = tr.slice(0, n).reduce((s, v) => s + v, 0) / n;
  out[n - 1] = a;
  for (let i = n; i < bars.length; i++) { a = (a * (n - 1) + tr[i]) / n; out[i] = a; }
  return out;
 }

 // ADX with +DI and −DI (Wilder): ADX measures trend strength, the DI lines its direction.
 function adx(bars, n = 14) {
  const len = bars.length, adxOut = fillNull(len), pdi = fillNull(len), mdi = fillNull(len);
  if (len < 2 * n + 1) return { adx: adxOut, pdi, mdi };
  const tr = trueRange(bars);
  let sTr = 0, sP = 0, sM = 0;
  const dx = fillNull(len);
  for (let i = 1; i < len; i++) {
   const up = bars[i].high - bars[i - 1].high, down = bars[i - 1].low - bars[i].low;
   const p = up > down && up > 0 ? up : 0, m = down > up && down > 0 ? down : 0;
   if (i <= n) { sTr += tr[i]; sP += p; sM += m; if (i < n) continue; }
   else { sTr = sTr - sTr / n + tr[i]; sP = sP - sP / n + p; sM = sM - sM / n + m; }
   pdi[i] = sTr ? (100 * sP) / sTr : 0;
   mdi[i] = sTr ? (100 * sM) / sTr : 0;
   const sum = pdi[i] + mdi[i];
   dx[i] = sum ? (100 * Math.abs(pdi[i] - mdi[i])) / sum : 0;
  }
  let a = 0;
  for (let i = n; i < 2 * n; i++) a += dx[i];
  a /= n;
  adxOut[2 * n - 1] = a;
  for (let i = 2 * n; i < len; i++) { a = (a * (n - 1) + dx[i]) / n; adxOut[i] = a; }
  return { adx: adxOut, pdi, mdi };
 }

 // On-Balance Volume: running total that adds volume on up closes and subtracts it on down closes.
 function obv(bars) {
  let v = 0;
  return bars.map((b, i) => {
   if (i > 0) v += b.close > bars[i - 1].close ? b.volume : b.close < bars[i - 1].close ? -b.volume : 0;
   return v;
  });
 }

 // Money Flow Index: a volume-weighted RSI of the typical price (0–100).
 function mfi(bars, n = 14) {
  const out = fillNull(bars.length);
  for (let i = n; i < bars.length; i++) {
   let pos = 0, neg = 0;
   for (let j = i - n + 1; j <= i; j++) {
    const tp = typical(bars[j]), prev = typical(bars[j - 1]), flow = tp * bars[j].volume;
    if (tp > prev) pos += flow; else if (tp < prev) neg += flow;
   }
   out[i] = pos === 0 && neg === 0 ? 50 : neg === 0 ? 100 : 100 - 100 / (1 + pos / neg);
  }
  return out;
 }

 // Commodity Channel Index: distance of the typical price from its average, in units of mean deviation.
 function cci(bars, n = 20) {
  const tp = bars.map(typical), avg = sma(tp, n), out = fillNull(bars.length);
  for (let i = n - 1; i < bars.length; i++) {
   let md = 0;
   for (let j = i - n + 1; j <= i; j++) md += Math.abs(tp[j] - avg[i]);
   md /= n;
   out[i] = md ? (tp[i] - avg[i]) / (0.015 * md) : 0;
  }
  return out;
 }

 // Supertrend: an ATR band that sits below price in an uptrend and above it in a downtrend.
 function supertrend(bars, n = 10, mult = 3) {
  const a = atr(bars, n), value = fillNull(bars.length), up = fillNull(bars.length);
  let fu = null, fl = null, trendUp = true;
  for (let i = n - 1; i < bars.length; i++) {
   const b = bars[i], mid = (b.high + b.low) / 2, bu = mid + mult * a[i], bl = mid - mult * a[i];
   if (fu === null) { fu = bu; fl = bl; trendUp = b.close >= mid; }
   else {
    const pc = bars[i - 1].close;
    fu = bu < fu || pc > fu ? bu : fu;
    fl = bl > fl || pc < fl ? bl : fl;
    if (trendUp && b.close < fl) trendUp = false;
    else if (!trendUp && b.close > fu) trendUp = true;
   }
   value[i] = trendUp ? fl : fu;
   up[i] = trendUp;
  }
  return { value, up };
 }

 // Parabolic SAR (stop and reverse): trailing dots that speed up as the trend extends and flip when price crosses them.
 function psar(bars, step = 0.02, max = 0.2) {
  const value = fillNull(bars.length), upArr = fillNull(bars.length);
  if (bars.length < 3) return { value, up: upArr };
  let up = bars[1].close >= bars[0].close, sar = up ? bars[0].low : bars[0].high, ep = up ? bars[1].high : bars[1].low, af = step;
  value[1] = sar; upArr[1] = up;
  for (let i = 2; i < bars.length; i++) {
   const b = bars[i];
   sar += af * (ep - sar);
   if (up) {
    sar = Math.min(sar, bars[i - 1].low, bars[i - 2].low);
    if (b.low < sar) { up = false; sar = ep; ep = b.low; af = step; }
    else if (b.high > ep) { ep = b.high; af = Math.min(af + step, max); }
   } else {
    sar = Math.max(sar, bars[i - 1].high, bars[i - 2].high);
    if (b.high > sar) { up = true; sar = ep; ep = b.high; af = step; }
    else if (b.low < ep) { ep = b.low; af = Math.min(af + step, max); }
   }
   value[i] = sar; upArr[i] = up;
  }
  return { value, up: upArr };
 }

 // Ichimoku cloud. The two cloud spans are plotted 26 bars ahead in a real chart; here they are shifted onto the
 // bar they belong to and stop at the latest bar (the chart has no future bars). The lagging span is the close
 // plotted 26 bars back.
 function ichimoku(bars, conv = 9, base = 26, spanLen = 52, shift = 26) {
  const len = bars.length, mid = (i, n) => (i >= n - 1 ? (highest(bars, i, n) + lowest(bars, i, n)) / 2 : null);
  const tenkan = bars.map((_, i) => mid(i, conv)), kijun = bars.map((_, i) => mid(i, base));
  const aRaw = tenkan.map((t, i) => (t !== null && kijun[i] !== null ? (t + kijun[i]) / 2 : null));
  const bRaw = bars.map((_, i) => mid(i, spanLen));
  const spanA = fillNull(len), spanB = fillNull(len), chikou = fillNull(len);
  for (let i = shift; i < len; i++) { spanA[i] = aRaw[i - shift]; spanB[i] = bRaw[i - shift]; }
  for (let i = 0; i + shift < len; i++) chikou[i] = bars[i + shift].close;
  return { tenkan, kijun, spanA, spanB, chikou };
 }

 // Classic floor pivot points for each Indian trading day (IST), from the previous day's high, low and close.
 function pivots(bars) {
  const day = b => Math.floor((b.time + 19800) / 86400);
  const stats = new Map();
  bars.forEach(b => {
   const d = day(b), s = stats.get(d);
   if (!s) stats.set(d, { h: b.high, l: b.low, c: b.close });
   else { s.h = Math.max(s.h, b.high); s.l = Math.min(s.l, b.low); s.c = b.close; }
  });
  const days = [...stats.keys()], levels = new Map();
  days.forEach((d, k) => {
   if (!k) return;
   const { h, l, c } = stats.get(days[k - 1]), p = (h + l + c) / 3;
   levels.set(d, { p, r1: 2 * p - l, s1: 2 * p - h, r2: p + (h - l), s2: p - (h - l) });
  });
  const pick = key => bars.map(b => { const lv = levels.get(day(b)); return lv ? lv[key] : null; });
  return { p: pick("p"), r1: pick("r1"), r2: pick("r2"), s1: pick("s1"), s2: pick("s2") };
 }

 return { sma, ema, bollinger, rsi, macd, vwap, heikinAshi, stochastic, atr, adx, obv, mfi, cci, supertrend, psar, ichimoku, pivots };
})();
