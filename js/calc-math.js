// Finance maths shared by the calculator definitions (calc-defs-*.js).
// Rates are decimals (0.12 = 12%) unless a parameter name says "pct".
const FinMath = (function () {
 // Finds a root of f between lo and hi: scans for a sign change, then bisects. Returns null if none.
 function solveRoot(f, lo, hi, steps = 400) {
  let a = lo, fa = f(a);
  for (let k = 1; k <= steps; k++) {
   const b = lo + (hi - lo) * Math.pow(k / steps, 3); // denser near lo, where most rates live
   const fb = f(b);
   if (Number.isFinite(fa) && Number.isFinite(fb) && fa * fb <= 0) {
    let x0 = a, x1 = b, f0 = fa;
    for (let i = 0; i < 200; i++) {
     const m = (x0 + x1) / 2, fm = f(m);
     if (Math.abs(fm) < 1e-9 || x1 - x0 < 1e-12) return m;
     if (f0 * fm <= 0) x1 = m; else { x0 = m; f0 = fm; }
    }
    return (x0 + x1) / 2;
   }
   a = b; fa = fb;
  }
  return null;
 }

 // Monthly instalment for a loan of p over n months at an annual rate.
 function emi(p, annualRate, n) {
  const i = annualRate / 12;
  if (n <= 0) return NaN;
  if (i === 0) return p / n;
  const f = Math.pow(1 + i, n);
  return (p * i * f) / (f - 1);
 }

 // Month-by-month loan schedule. opts: { payment, extra (monthly), lumps: { month: amount }, maxMonths }
 function amortize(p, annualRate, n, opts = {}) {
  const i = annualRate / 12;
  const payment = opts.payment || emi(p, annualRate, n);
  const extra = opts.extra || 0, lumps = opts.lumps || {}, maxMonths = opts.maxMonths || 1200;
  const rows = [];
  let bal = p, totalInterest = 0;
  for (let m = 1; bal > 0.005 && m <= maxMonths; m++) {
   const interest = bal * i;
   const pay = Math.min(payment + extra, bal + interest);
   let principal = pay - interest;
   bal -= principal;
   const lump = Math.min(lumps[m] || 0, Math.max(bal, 0));
   bal -= lump;
   principal += lump;
   totalInterest += interest;
   rows.push({ month: m, payment: pay + lump, interest, principal, balance: Math.max(bal, 0) });
   if (pay <= interest && !lump) break; // payment never clears the interest
  }
  return { rows, payment, totalInterest, months: rows.length, cleared: bal <= 0.005 };
 }

 // Sums a monthly schedule into years: [{ year, payment, interest, principal, balance }]
 function byYear(rows) {
  const out = [];
  rows.forEach(r => {
   const y = Math.ceil(r.month / 12);
   const last = out[out.length - 1];
   if (!last || last.year !== y) out.push({ year: y, payment: 0, interest: 0, principal: 0, balance: 0 });
   const cur = out[out.length - 1];
   cur.payment += r.payment; cur.interest += r.interest; cur.principal += r.principal; cur.balance = r.balance;
  });
  return out;
 }

 // Future value of a monthly SIP invested at the start of each month (annuity due), monthly rate = annual / 12.
 function sipFV(monthly, annualRate, months) {
  const i = annualRate / 12;
  if (i === 0) return monthly * months;
  return monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
 }

 // Time value of money, financial-calculator sign convention: money paid out is negative.
 // rate is per period; type 1 = payments at the start of each period.
 function tvmFV(rate, n, pmt, pv, type) {
  if (rate === 0) return -(pv + pmt * n);
  const f = Math.pow(1 + rate, n);
  return -(pv * f + pmt * (1 + rate * type) * (f - 1) / rate);
 }
 function tvmPV(rate, n, pmt, fv, type) {
  if (rate === 0) return -(fv + pmt * n);
  const f = Math.pow(1 + rate, n);
  return -(fv + pmt * (1 + rate * type) * (f - 1) / rate) / f;
 }
 function tvmPMT(rate, n, pv, fv, type) {
  if (rate === 0) return -(pv + fv) / n;
  const f = Math.pow(1 + rate, n);
  return -(pv * f + fv) * rate / ((1 + rate * type) * (f - 1));
 }
 function tvmN(rate, pmt, pv, fv, type) {
  if (rate === 0) return pmt === 0 ? NaN : -(pv + fv) / pmt;
  const a = pmt * (1 + rate * type);
  const n = Math.log((a - fv * rate) / (a + pv * rate)) / Math.log(1 + rate);
  return n;
 }
 function tvmRate(n, pmt, pv, fv, type) {
  const f = r => {
   if (Math.abs(r) < 1e-10) return pv + pmt * n + fv;
   const g = Math.pow(1 + r, n);
   return pv * g + pmt * (1 + r * type) * (g - 1) / r + fv;
  };
  return solveRoot(f, -0.99, 5);
 }

 // Net present value: flows[0] happens now, flows[t] at the end of period t.
 const npv = (rate, flows) => flows.reduce((s, c, t) => s + c / Math.pow(1 + rate, t), 0);
 const irr = flows => solveRoot(r => npv(r, flows), -0.99, 10);

 // XIRR for dated cash flows: [{ date: Date, amount }]; investments negative, withdrawals positive.
 function xirr(list) {
  if (list.length < 2) return null;
  const t0 = list[0].date.getTime();
  const f = r => list.reduce((s, c) => s + c.amount / Math.pow(1 + r, (c.date.getTime() - t0) / (365 * 86400000)), 0);
  return solveRoot(f, -0.99, 100);
 }

 // Real (inflation-adjusted) rate of return.
 const realRate = (nominal, inflation) => (1 + nominal) / (1 + inflation) - 1;

 // Present value at the start of retirement of `years` yearly withdrawals, the first equal to `first`,
 // growing with inflation `g`, withdrawn at the start of each year, while the corpus earns `r`.
 function growingAnnuityDue(first, r, g, years) {
  let pv = 0;
  for (let k = 0; k < years; k++) pv += first * Math.pow(1 + g, k) / Math.pow(1 + r, k);
  return pv;
 }

 return { solveRoot, emi, amortize, byYear, sipFV, tvmFV, tvmPV, tvmPMT, tvmN, tvmRate, npv, irr, xirr, realRate, growingAnnuityDue };
})();
