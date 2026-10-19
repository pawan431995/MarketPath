// Calculator definitions: Indian tax. See calc-defs-personal.js for the definition format.
// Rates follow Budget 2025 (FY 2025-26). Tax law changes often: keep these tables up to date.
(function () {
 const NEW_SLABS = [[400000, 0], [800000, 0.05], [1200000, 0.10], [1600000, 0.15], [2000000, 0.20], [2400000, 0.25], [Infinity, 0.30]];
 // Old regime: the basic exemption is ₹2.5 lakh (below 60), ₹3 lakh (60–80) or ₹5 lakh (80+).
 const oldSlabs = exempt => [[exempt, 0], [500000, 0.05], [1000000, 0.20], [Infinity, 0.30]];
 const slabTax = (income, slabs) => {
  let tax = 0, prev = 0;
  for (const [upto, rate] of slabs) { if (income > prev) tax += (Math.min(income, upto) - prev) * rate; prev = Math.max(prev, upto); }
  return tax;
 };
 // Surcharge with marginal relief: tax + surcharge just above a threshold cannot exceed the tax + surcharge
 // at the threshold by more than the income above it.
 function withSurcharge(income, tax, slabs, maxRate) {
  const bands = [[5000000, 0.10], [10000000, 0.15], [20000000, 0.25], [50000000, 0.37]].map(([at, r]) => [at, Math.min(r, maxRate)]);
  let k = -1;
  bands.forEach(([at], idx) => { if (income > at) k = idx; });
  if (k < 0) return { surcharge: 0, rate: 0 };
  const [at, rate] = bands[k], prevRate = k > 0 ? bands[k - 1][1] : 0;
  const capped = Math.min(tax * (1 + rate), slabTax(at, slabs) * (1 + prevRate) + (income - at));
  return { surcharge: Math.max(0, capped - tax), rate };
 }
 function regimeTax(taxable, slabs, rebateLimit, rebateMax, marginalRebate, maxSurcharge) {
  const base = slabTax(taxable, slabs);
  let afterRebate = base, rebate = 0;
  if (taxable <= rebateLimit) { rebate = Math.min(base, rebateMax); afterRebate = base - rebate; }
  else if (marginalRebate && base > taxable - rebateLimit) { rebate = base - (taxable - rebateLimit); afterRebate = taxable - rebateLimit; }
  const sc = withSurcharge(taxable, afterRebate, slabs, maxSurcharge);
  const cess = (afterRebate + sc.surcharge) * 0.04;
  return { base, rebate, surcharge: sc.surcharge, cess, total: afterRebate + sc.surcharge + cess };
 }

 window.CALCS = window.CALCS || [];
 window.CALCS.push(
 {
  id: "income-tax", cat: "tax", icon: "§", currency: "INR", title: "Income tax: new vs old regime", desc: "Compare your income tax under the new and old regimes and see which saves more.",
  hi: ["इनकम टैक्स: नई बनाम पुरानी व्यवस्था", "नई और पुरानी टैक्स व्यवस्था में आपका टैक्स और कौन-सी ज़्यादा बचत कराती है।"],
  keywords: "income tax new regime old regime slab 87a rebate salary tds itr",
  inputs: [
   { id: "salary", type: "money", label: "Gross salary per year", min: 0, max: 100000000, step: 50000, value: 1800000 },
   { id: "other", type: "money", label: "Other income (interest, rent after deductions)", min: 0, max: 100000000, step: 10000, value: 50000 },
   { id: "salaried", type: "select", label: "Salaried or pensioner?", value: "yes", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
   { id: "age", type: "select", label: "Age", value: "below60", options: [{ value: "below60", label: "Below 60" }, { value: "60to80", label: "60–80" }, { value: "above80", label: "80+" }] },
   { id: "c80", type: "money", label: "80C: EPF, PPF, ELSS, insurance (old regime)", min: 0, max: 150000, hardMax: true, step: 5000, value: 150000 },
   { id: "d80", type: "money", label: "80D: health insurance premiums (old regime)", min: 0, max: 100000, step: 1000, value: 25000 },
   { id: "hra", type: "money", label: "HRA exemption (old regime)", min: 0, max: 5000000, step: 5000, value: 120000, help: "Use the HRA calculator to work this out." },
   { id: "homeLoan", type: "money", label: "Home loan interest, self-occupied (old regime)", min: 0, max: 200000, hardMax: true, step: 5000, value: 0 },
   { id: "nps", type: "money", label: "80CCD(1B): own NPS contribution (old regime)", min: 0, max: 50000, hardMax: true, step: 5000, value: 0 },
   { id: "otherDed", type: "money", label: "Other deductions: 80E, 80G, 80TTA (old regime)", min: 0, max: 1000000, step: 5000, value: 0 }
  ],
  compute(v, F) {
   const gross = v.salary + v.other, sal = v.salaried === "yes";
   const newTaxable = Math.max(0, gross - (sal ? 75000 : 0));
   const ded = Math.min(v.c80, 150000) + Math.min(v.d80, 100000) + v.hra + Math.min(v.homeLoan, 200000) + Math.min(v.nps, 50000) + v.otherDed;
   const oldTaxable = Math.max(0, gross - (sal ? 50000 : 0) - ded);
   const exempt = v.age === "above80" ? 500000 : v.age === "60to80" ? 300000 : 250000;
   const nw = regimeTax(newTaxable, NEW_SLABS, 1200000, 60000, true, 0.25);
   const od = regimeTax(oldTaxable, oldSlabs(exempt), 500000, 12500, false, 0.37);
   const better = nw.total <= od.total ? "new" : "old", saving = Math.abs(nw.total - od.total);
   const best = Math.min(nw.total, od.total);
   const row = (label, a, b) => [label, a, b];
   return {
    hero: { label: `The ${better} regime saves you`, value: F.money(saving), tone: "pos", sub: `Tax ${F.money(best)} a year (${F.money(best / 12)} a month)` },
    stats: [
     { label: "Tax under new regime", value: F.money(nw.total), tone: better === "new" ? "pos" : undefined },
     { label: "Tax under old regime", value: F.money(od.total), tone: better === "old" ? "pos" : undefined },
     { label: "Effective tax rate", value: F.pct(gross > 0 ? (best / gross) * 100 : 0, 1), sub: "Tax ÷ gross income" },
     { label: "Deductions needed for old to win", value: nw.total < od.total ? "More than you claim now" : "Already ahead", sub: `You claim ${F.money(ded)}` }
    ],
    chart: { type: "bar", title: "Tax under each regime", x: ["New regime", "Old regime"], series: [{ name: "Total tax", values: [nw.total, od.total] }] },
    table: { title: "Side-by-side working", open: true, file: "tax-comparison", head: ["", "New regime", "Old regime"], rows: [
     row("Gross income", F.money(gross), F.money(gross)),
     row("Standard deduction", F.money(sal ? 75000 : 0), F.money(sal ? 50000 : 0)),
     row("Deductions (80C, 80D, HRA, …)", F.money(0), F.money(ded)),
     row("Taxable income", F.money(newTaxable), F.money(oldTaxable)),
     row("Tax on slabs", F.money(nw.base), F.money(od.base)),
     row("Rebate u/s 87A", F.money(-nw.rebate), F.money(-od.rebate)),
     row("Surcharge", F.money(nw.surcharge), F.money(od.surcharge)),
     row("Health & education cess (4%)", F.money(nw.cess), F.money(od.cess)),
     row("Total tax", F.money(nw.total), F.money(od.total))] },
    notes: ["Rates are for FY 2025-26 (Budget 2025). New regime: nil up to ₹4 lakh, then 5% to 30%; no tax up to ₹12 lakh taxable income because of the 87A rebate (₹12.75 lakh for salaried).",
     "Special-rate income such as capital gains and lottery winnings is not included here, and the 87A rebate does not apply to it.",
     "Employer NPS contributions (80CCD(2)) are allowed in both regimes and are not modelled."]
   };
  },
  how: ["New regime: taxable = gross − ₹75,000 (salaried). Old regime: taxable = gross − ₹50,000 (salaried) − deductions.",
   "Tax is calculated slab by slab. Rebate u/s 87A: new regime up to ₹60,000 when taxable ≤ ₹12 lakh (with marginal relief just above); old regime up to ₹12,500 when taxable ≤ ₹5 lakh.",
   "Surcharge above ₹50 lakh (10%), ₹1 crore (15%), ₹2 crore (25%) and, in the old regime only, ₹5 crore (37%), with marginal relief. Cess = 4% of tax + surcharge."]
 },

 {
  id: "hra", cat: "tax", icon: "⌂", currency: "INR", title: "HRA exemption", desc: "Tax-free part of your house rent allowance under the old tax regime.",
  hi: ["HRA छूट", "पुरानी टैक्स व्यवस्था में मकान किराया भत्ते का कर-मुक्त हिस्सा।"],
  keywords: "hra house rent allowance exemption rent receipts 10(13a)",
  inputs: [
   { id: "basic", type: "money", label: "Monthly basic salary + DA", min: 0, max: 2000000, step: 1000, value: 50000 },
   { id: "hra", type: "money", label: "Monthly HRA received", min: 0, max: 1000000, step: 1000, value: 25000 },
   { id: "rent", type: "money", label: "Monthly rent paid", min: 0, max: 1000000, step: 1000, value: 20000 },
   { id: "metro", type: "select", label: "Living in Delhi, Mumbai, Kolkata or Chennai?", value: "yes", options: [{ value: "yes", label: "Yes (50%)" }, { value: "no", label: "No (40%)" }] }
  ],
  compute(v, F) {
   const a = v.hra * 12, b = Math.max(0, v.rent * 12 - 0.1 * v.basic * 12), c = (v.metro === "yes" ? 0.5 : 0.4) * v.basic * 12;
   const exempt = Math.min(a, b, c);
   return {
    hero: { label: "HRA exemption per year", value: F.money(exempt), tone: "pos", sub: `Taxable HRA ${F.money(a - exempt)}` },
    stats: [{ label: "Actual HRA received", value: F.money(a) }, { label: "Rent paid − 10% of basic", value: F.money(b) }, { label: `${v.metro === "yes" ? "50%" : "40%"} of basic`, value: F.money(c) }],
    chart: { type: "bar", title: "The exemption is the lowest of three limits", x: ["HRA received", "Rent − 10% basic", v.metro === "yes" ? "50% of basic" : "40% of basic"], series: [{ name: "Yearly amount", values: [a, b, c] }] },
    notes: ["HRA exemption is available only in the old regime.", "Keep rent receipts; give your landlord's PAN to your employer if rent exceeds ₹1 lakh a year."]
   };
  },
  how: ["Exemption = lowest of: actual HRA; rent paid − 10% of basic + DA; 50% (metro) or 40% (other cities) of basic + DA."]
 },

 {
  id: "capital-gains", cat: "tax", icon: "⇡", currency: "INR", title: "Capital gains tax (equity)", desc: "Tax on selling listed shares or equity mutual funds, short-term or long-term.",
  hi: ["कैपिटल गेन टैक्स (इक्विटी)", "लिस्टेड शेयर या इक्विटी म्यूचुअल फ़ंड बेचने पर शॉर्ट-टर्म या लॉन्ग-टर्म टैक्स।"],
  keywords: "capital gains tax stcg ltcg equity mutual fund shares 112a 111a",
  inputs: [
   { id: "buy", type: "money", label: "Purchase value", min: 0, max: 1000000000, step: 10000, value: 500000 },
   { id: "sell", type: "money", label: "Sale value", min: 0, max: 1000000000, step: 10000, value: 750000 },
   { id: "costs", type: "money", label: "Brokerage and transfer costs (not STT)", min: 0, max: 1000000, step: 100, value: 1000 },
   { id: "months", type: "months", label: "Holding period", min: 0, max: 360, step: 1, value: 18 },
   { id: "used", type: "money", label: "LTCG exemption already used this year", min: 0, max: 125000, hardMax: true, step: 5000, value: 0 }
  ],
  compute(v, F) {
   const gain = v.sell - v.buy - v.costs, longTerm = v.months > 12;
   let tax = 0, exempt = 0;
   if (gain > 0) {
    if (longTerm) { exempt = Math.min(gain, Math.max(0, 125000 - v.used)); tax = (gain - exempt) * 0.125; }
    else tax = gain * 0.20;
   }
   const total = tax * 1.04;
   return {
    hero: { label: longTerm ? "Long-term capital gains tax" : "Short-term capital gains tax", value: F.money(total), sub: "Including 4% cess" },
    stats: [
     { label: "Capital gain", value: F.money(gain), tone: gain >= 0 ? "pos" : "neg" },
     { label: "Tax rate", value: longTerm ? "12.5% above ₹1.25 lakh" : "20%" },
     { label: "Exempt amount used", value: F.money(exempt) },
     { label: "Gain after tax", value: F.money(gain - total) }
    ],
    callout: gain < 0 ? { tone: "info", text: "A capital loss can be set off against capital gains and carried forward for 8 years if you file your return on time." } : null,
    notes: ["Rates apply to transfers on or after 23 July 2024. Short-term = held 12 months or less.", "Shares bought before 1 February 2018 use the grandfathered cost (the 31 January 2018 price) for long-term gains."]
   };
  },
  how: ["Gain = sale value − purchase value − transfer costs.", "Short-term: 20% of the gain. Long-term: 12.5% of the gain above ₹1.25 lakh a year. Plus 4% cess."]
 },

 {
  id: "gst", cat: "tax", icon: "%", currency: "INR", title: "GST", desc: "Add GST to a price or take it out of a GST-inclusive amount, with the CGST/SGST or IGST split.",
  hi: ["GST", "क़ीमत में GST जोड़ें या GST-सहित राशि से GST निकालें, CGST/SGST या IGST विभाजन के साथ।"],
  keywords: "gst goods and services tax cgst sgst igst inclusive exclusive invoice",
  inputs: [
   { id: "amount", type: "money", label: "Amount", min: 1, max: 1000000000, step: 100, value: 10000 },
   { id: "rate", type: "select", label: "GST rate", value: "18", dropdown: true, options: [{ value: "5", label: "5%" }, { value: "18", label: "18%" }, { value: "40", label: "40%" }, { value: "3", label: "3% (gold, silver)" }, { value: "0.25", label: "0.25% (rough diamonds)" }, { value: "12", label: "12% (before Sept 2025)" }, { value: "28", label: "28% (before Sept 2025)" }] },
   { id: "mode", type: "select", label: "The amount is", value: "add", options: [{ value: "add", label: "Before GST (add GST)" }, { value: "remove", label: "Including GST (remove GST)" }] },
   { id: "supply", type: "select", label: "Supply", value: "intra", options: [{ value: "intra", label: "Within the state" }, { value: "inter", label: "To another state" }] }
  ],
  compute(v, F) {
   const r = Number(v.rate) / 100;
   const base = v.mode === "add" ? v.amount : v.amount / (1 + r), tax = base * r, total = base + tax;
   return {
    hero: { label: v.mode === "add" ? "Price including GST" : "Price before GST", value: F.money(v.mode === "add" ? total : base, 2) },
    stats: [
     { label: "GST amount", value: F.money(tax, 2) },
     ...(v.supply === "intra" ? [{ label: "CGST", value: F.money(tax / 2, 2) }, { label: "SGST", value: F.money(tax / 2, 2) }] : [{ label: "IGST", value: F.money(tax, 2) }])
    ],
    chart: { type: "donut", title: "Price split", items: [{ label: "Price before GST", value: base }, { label: "GST", value: tax }], center: { label: "Total", value: F.compact(total) } },
    notes: ["From 22 September 2025 most goods and services moved to 5% or 18%, with 40% for luxury and sin goods. Check the rate for your item's HSN/SAC code."]
   };
  },
  how: ["Add GST: GST = amount × rate; total = amount + GST.", "Remove GST: price before GST = amount ÷ (1 + rate).", "Within a state the GST splits equally into CGST and SGST; across states it is IGST."]
 }
 );
})();
