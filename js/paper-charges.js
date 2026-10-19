// Charges and tax model for simulated Indian equity trades in the paper-trading module.
// Rates are approximate and change over time (budgets, exchange circulars, broker price lists).
// Verify them against your broker's current charge sheet and the Tax Basics lesson before relying on them.
const PaperCharges = (function () {
 const round2 = n => Math.round(n * 100) / 100;

 // Two common discount-broker pricing styles. Labels describe the rule, not a specific broker.
 const plans = {
  zero: {
   label: "₹0 delivery · ₹20 or 0.03% intraday",
   brokerage: (product, turnover) => (product === "delivery" ? 0 : Math.min(20, turnover * 0.0003))
  },
  flat: {
   label: "₹20 or 0.1% per order (min ₹5)",
   brokerage: (product, turnover) => Math.max(5, Math.min(20, turnover * 0.001))
  }
 };

 const rates = {
  sttDelivery: 0.001,       // Securities Transaction Tax, delivery: on buy and sell value
  sttIntradaySell: 0.00025, // STT, intraday: sell side only
  exchange: 0.0000297,      // NSE transaction charge on turnover
  sebi: 0.000001,           // SEBI turnover fee (₹10 per crore)
  stampDelivery: 0.00015,   // stamp duty, buy side, delivery
  stampIntraday: 0.00003,   // stamp duty, buy side, intraday
  gst: 0.18,                // GST on brokerage + exchange charge + SEBI fee + DP charge
  dpPerSell: 13.5           // depository (DP) charge per delivery sell order, before GST
 };

 // Income-tax rates on listed equity (as of Budget 2024). Intraday profit is taxed at your slab rate.
 const tax = { stcg: 0.20, ltcg: 0.125, ltcgExempt: 125000, cess: 0.04, longTermDays: 365 };

 // side: "buy" | "sell"; product: "delivery" | "intraday"
 function compute(side, product, qty, price, planId) {
  const turnover = qty * price;
  const plan = plans[planId] || plans.zero;
  const brokerage = round2(plan.brokerage(product, turnover));
  const stt = Math.round(product === "delivery" ? turnover * rates.sttDelivery : side === "sell" ? turnover * rates.sttIntradaySell : 0);
  const exchange = round2(turnover * rates.exchange);
  const sebi = round2(turnover * rates.sebi);
  const stamp = side === "buy" ? round2(turnover * (product === "delivery" ? rates.stampDelivery : rates.stampIntraday)) : 0;
  const dp = side === "sell" && product === "delivery" ? rates.dpPerSell : 0;
  const gst = round2((brokerage + exchange + sebi + dp) * rates.gst);
  const total = round2(brokerage + stt + exchange + sebi + stamp + dp + gst);
  return { brokerage, stt, exchange, sebi, stamp, dp, gst, total };
 }

 // realized: { stcg, ltcg, intraday } net gains in ₹ (after charges). slab: intraday tax rate, e.g. 0.3.
 // Simplified set-off: short-term losses reduce long-term gains; intraday losses only offset intraday gains.
 function estimateTax(realized, slab) {
  let st = realized.stcg, lt = realized.ltcg;
  if (st < 0) { lt += st; st = 0; }
  const stcgTax = Math.max(0, st) * tax.stcg;
  const ltcgTax = Math.max(0, lt - tax.ltcgExempt) * tax.ltcg;
  const intradayTax = Math.max(0, realized.intraday) * slab;
  const cess = (stcgTax + ltcgTax + intradayTax) * tax.cess;
  return {
   stcgTax: round2(stcgTax), ltcgTax: round2(ltcgTax), intradayTax: round2(intradayTax), cess: round2(cess),
   total: round2(stcgTax + ltcgTax + intradayTax + cess)
  };
 }

 return { plans, rates, tax, compute, estimateTax };
})();
