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

 return { sma, ema, bollinger, rsi, macd, vwap, heikinAshi };
})();
