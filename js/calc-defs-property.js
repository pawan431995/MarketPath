// Calculator definitions: real estate and mortgages. See calc-defs-personal.js for the definition format.
window.CALCS = window.CALCS || [];
window.CALCS.push(
 {
  id: "mortgage", cat: "property", icon: "⌂", title: "Mortgage payment (PITI)", desc: "Full monthly cost of a home loan: principal, interest, property tax, insurance and maintenance.",
  hi: ["होम लोन मासिक भुगतान (PITI)", "होम लोन का पूरा मासिक ख़र्च: मूलधन, ब्याज, प्रॉपर्टी टैक्स, बीमा और मेंटेनेंस।"],
  keywords: "mortgage piti home loan property tax insurance hoa maintenance monthly payment",
  inputs: [
   { id: "price", type: "money", label: "Home price", min: 100000, max: 500000000, step: 100000, value: 8000000 },
   { id: "down", type: "percent", label: "Down payment", min: 0, max: 90, step: 1, value: 20 },
   { id: "rate", type: "percent", label: "Interest rate", min: 1, max: 20, step: 0.05, value: 8.5 },
   { id: "years", type: "years", label: "Loan term", min: 1, max: 30, step: 1, value: 20 },
   { id: "tax", type: "money", label: "Property tax per year", min: 0, max: 5000000, step: 1000, value: 12000 },
   { id: "insurance", type: "money", label: "Home insurance per year", min: 0, max: 1000000, step: 500, value: 8000 },
   { id: "hoa", type: "money", label: "Society / HOA maintenance per month", min: 0, max: 200000, step: 500, value: 4000 },
   { id: "pmi", type: "percent", label: "Mortgage insurance (PMI) per year", min: 0, max: 2, step: 0.05, value: 0, help: "Common in the US when the down payment is under 20%; usually 0 in India." }
  ],
  compute(v, F) {
   const loan = v.price * (1 - v.down / 100), n = v.years * 12;
   const pi = loan > 0 ? FinMath.emi(loan, v.rate / 100, n) : 0;
   const tax = v.tax / 12, ins = v.insurance / 12, pmi = v.down < 20 ? (loan * v.pmi / 100) / 12 : 0;
   const total = pi + tax + ins + v.hoa + pmi, interest = pi * n - loan;
   return {
    hero: { label: "Total monthly housing cost", value: F.money(total), sub: `Loan EMI alone ${F.money(pi)}` },
    stats: [
     { label: "Loan amount", value: F.money(loan) },
     { label: "Down payment", value: F.money(v.price - loan) },
     { label: "Total interest over the term", value: F.money(interest), tone: "warn" },
     { label: "Total cost of the home", value: F.money(v.price - loan + pi * n + (tax + ins + v.hoa + pmi) * n), sub: `Over ${v.years} years` }
    ],
    chart: { type: "donut", title: "Monthly payment breakdown", items: [{ label: "Principal & interest", value: pi }, { label: "Property tax", value: tax }, { label: "Insurance", value: ins }, { label: "Maintenance / HOA", value: v.hoa }, { label: "Mortgage insurance", value: pmi }], center: { label: "Per month", value: F.compact(total) } },
    notes: ["Indian lenders fund at most 75–90% of the property value, so a 10–25% down payment is needed.", "Add one-time costs separately: stamp duty and registration (about 5–8% in most states), brokerage and interiors."]
   };
  },
  how: ["Principal & interest = EMI on (price − down payment).", "Monthly cost = EMI + property tax ÷ 12 + insurance ÷ 12 + maintenance + mortgage insurance (only if down payment < 20%)."]
 },

 {
  id: "rent-vs-buy", cat: "property", icon: "⚖", title: "Rent vs buy", desc: "Compare your net worth after several years of buying a home versus renting and investing the difference.",
  hi: ["किराया बनाम ख़रीद", "कुछ साल बाद घर ख़रीदने बनाम किराए पर रहकर अंतर निवेश करने से नेट वर्थ की तुलना।"],
  keywords: "rent vs buy home renting buying house decision",
  inputs: [
   { id: "price", type: "money", label: "Home price", min: 500000, max: 500000000, step: 100000, value: 8000000 },
   { id: "down", type: "percent", label: "Down payment", min: 5, max: 100, step: 1, value: 20 },
   { id: "rate", type: "percent", label: "Home loan rate", min: 1, max: 20, step: 0.05, value: 8.5 },
   { id: "years", type: "years", label: "Loan term", min: 1, max: 30, step: 1, value: 20 },
   { id: "horizon", type: "years", label: "Years to compare", min: 1, max: 30, step: 1, value: 10 },
   { id: "rent", type: "money", label: "Monthly rent for a similar home", min: 1000, max: 2000000, step: 1000, value: 25000 },
   { id: "rentUp", type: "percent", label: "Yearly rent increase", min: 0, max: 15, step: 0.5, value: 7 },
   { id: "growth", type: "percent", label: "Yearly home price growth", min: -5, max: 15, step: 0.5, value: 5 },
   { id: "invest", type: "percent", label: "Return on invested savings", min: 0, max: 18, step: 0.5, value: 10 },
   { id: "upkeep", type: "percent", label: "Maintenance, tax and insurance (% of home value a year)", min: 0, max: 5, step: 0.1, value: 1 },
   { id: "buyCost", type: "percent", label: "Buying costs (stamp duty, registration)", min: 0, max: 15, step: 0.5, value: 7 },
   { id: "sellCost", type: "percent", label: "Selling costs", min: 0, max: 10, step: 0.5, value: 2 }
  ],
  compute(v, F) {
   const loan = v.price * (1 - v.down / 100), n = v.years * 12, emi = loan > 0 ? FinMath.emi(loan, v.rate / 100, n) : 0;
   const gm = Math.pow(1 + v.growth / 100, 1 / 12), im = Math.pow(1 + v.invest / 100, 1 / 12), i = v.rate / 100 / 12;
   const upfront = v.price - loan + v.price * v.buyCost / 100;
   let home = v.price, bal = loan, rent = v.rent, buyerPf = 0, renterPf = upfront, paidRent = 0, paidOwn = 0, breakEven = null;
   const x = ["0"], buyNW = [v.price * (1 - v.sellCost / 100) - loan], rentNW = [upfront];
   for (let m = 1; m <= v.horizon * 12; m++) {
    const pay = m <= n && bal > 0 ? Math.min(emi, bal * (1 + i)) : 0;
    if (pay) bal = bal * (1 + i) - pay;
    const own = pay + home * v.upkeep / 100 / 12;
    paidOwn += own; paidRent += rent;
    buyerPf *= im; renterPf *= im;
    if (own > rent) renterPf += own - rent; else buyerPf += rent - own;
    home *= gm;
    if (m % 12 === 0) {
     rent *= 1 + v.rentUp / 100;
     const b = home * (1 - v.sellCost / 100) - Math.max(bal, 0) + buyerPf;
     x.push(String(m / 12)); buyNW.push(b); rentNW.push(renterPf);
     if (breakEven === null && b > renterPf) breakEven = m / 12;
    }
   }
   const b = buyNW[buyNW.length - 1], r = rentNW[rentNW.length - 1], buyWins = b >= r;
   return {
    hero: { label: `After ${v.horizon} years`, value: `${buyWins ? "Buying" : "Renting"} is ahead by ${F.money(Math.abs(b - r))}`, tone: buyWins ? "pos" : "warn" },
    stats: [
     { label: "Net worth if you buy", value: F.money(b), sub: "Home equity after selling costs + investments" },
     { label: "Net worth if you rent", value: F.money(r), sub: "Down payment and savings invested" },
     { label: "Buying pulls ahead in year", value: breakEven === null ? "Not within the period" : String(breakEven) },
     { label: "Monthly EMI", value: F.money(emi), sub: `Rent starts at ${F.money(v.rent)}` }
    ],
    chart: { type: "line", title: "Net worth: buying against renting", xTitle: "Year", x, series: [{ name: "Buy", values: buyNW }, { name: "Rent and invest", values: rentNW }] },
    table: { title: "Totals over the period", file: "rent-vs-buy", head: ["Item", "Amount"], rows: [
     ["Upfront cash for buying (down payment + buying costs)", F.money(upfront)], ["EMIs and upkeep paid", F.money(paidOwn)], ["Rent paid", F.money(paidRent)],
     ["Home value at the end", F.money(home)], ["Loan still outstanding", F.money(Math.max(bal, 0))]] },
    notes: ["This is a money comparison only. Stability, flexibility to move, and the home-loan tax benefits (old regime) also matter.", "Results are sensitive to home price growth and the return on investments; try a few values."]
   };
  },
  how: ["Buyer pays the down payment and buying costs upfront, then EMIs and upkeep; renter invests that upfront amount instead.",
   "Each month, whoever spends less invests the difference at the investment return.",
   "Net worth if buying = home value − selling costs − loan outstanding + buyer's investments. If renting = renter's investments."]
 },

 {
  id: "refinance-breakeven", cat: "property", icon: "⟲", title: "Home loan refinance break-even", desc: "When the savings from a lower rate repay the cost of switching your home loan.",
  hi: ["होम लोन रीफ़ाइनेंस ब्रेक-ईवन", "कम ब्याज दर की बचत कब होम लोन बदलने का ख़र्च निकाल देगी।"],
  keywords: "refinance break even balance transfer home loan closing costs switch",
  inputs: [
   { id: "balance", type: "money", label: "Outstanding loan", min: 100000, max: 200000000, step: 100000, value: 4000000 },
   { id: "rate", type: "percent", label: "Current rate", min: 1, max: 20, step: 0.05, value: 9.25 },
   { id: "years", type: "years", label: "Remaining tenure", min: 1, max: 30, step: 1, value: 15 },
   { id: "newRate", type: "percent", label: "New rate", min: 1, max: 20, step: 0.05, value: 8.4 },
   { id: "newYears", type: "years", label: "New tenure", min: 1, max: 30, step: 1, value: 15 },
   { id: "costs", type: "money", label: "Switching costs (processing, legal, valuation)", min: 0, max: 1000000, step: 1000, value: 30000 }
  ],
  compute(v, F) {
   const n0 = v.years * 12, n1 = v.newYears * 12;
   const e0 = FinMath.emi(v.balance, v.rate / 100, n0), e1 = FinMath.emi(v.balance, v.newRate / 100, n1);
   const save = e0 - e1, lifetime = (e0 * n0 - v.balance) - (e1 * n1 - v.balance) - v.costs;
   const be = save > 0 ? Math.ceil(v.costs / save) : null;
   const x = [], cum = [];
   for (let m = 0; m <= Math.min(n0, n1); m += 6) { x.push(String(m)); cum.push(m * save - v.costs); }
   return {
    hero: be === null ? { label: "Break-even", value: "Never", tone: "neg", sub: "The new EMI is not lower" } : { label: "Break-even after", value: F.months(be), tone: "pos", sub: `Saves ${F.money(save)} a month` },
    stats: [
     { label: "Current EMI", value: F.money(e0) },
     { label: "New EMI", value: F.money(e1) },
     { label: "Lifetime saving after costs", value: F.money(lifetime), tone: lifetime >= 0 ? "pos" : "neg" }
    ],
    chart: { type: "line", title: "Cumulative saving after switching costs", xTitle: "Month", x, series: [{ name: "Cumulative saving", values: cum, area: true }] },
    notes: ["Ask your current lender to reprice first; many banks lower the rate for a small fee without a full transfer.", "If you plan to sell or prepay the loan before the break-even month, switching does not pay off."]
   };
  },
  how: ["Monthly saving = current EMI − new EMI.", "Break-even month = switching costs ÷ monthly saving.", "Lifetime saving = interest on the current loan − interest on the new loan − switching costs."]
 },

 {
  id: "rental-roi", cat: "property", icon: "▦", title: "Rental property ROI", desc: "Net operating income, cap rate, cash-on-cash return and monthly cash flow of a rental property.",
  hi: ["किराये की प्रॉपर्टी ROI", "किराये की प्रॉपर्टी की नेट ऑपरेटिंग इनकम, कैप रेट, कैश-ऑन-कैश रिटर्न और मासिक कैश फ़्लो।"],
  keywords: "rental property roi cap rate noi cash on cash yield landlord investment",
  inputs: [
   { id: "price", type: "money", label: "Purchase price", min: 100000, max: 500000000, step: 100000, value: 6000000 },
   { id: "extra", type: "money", label: "Stamp duty, registration and furnishing", min: 0, max: 50000000, step: 10000, value: 500000 },
   { id: "down", type: "percent", label: "Down payment", min: 0, max: 100, step: 1, value: 25 },
   { id: "rate", type: "percent", label: "Loan rate", min: 1, max: 20, step: 0.05, value: 8.75 },
   { id: "years", type: "years", label: "Loan term", min: 1, max: 30, step: 1, value: 20 },
   { id: "rent", type: "money", label: "Monthly rent", min: 1000, max: 5000000, step: 500, value: 22000 },
   { id: "vacancy", type: "percent", label: "Vacancy", min: 0, max: 50, step: 1, value: 8 },
   { id: "mgmt", type: "percent", label: "Management fee (% of rent)", min: 0, max: 20, step: 1, value: 0 },
   { id: "maint", type: "money", label: "Maintenance and repairs per year", min: 0, max: 5000000, step: 1000, value: 24000 },
   { id: "ptax", type: "money", label: "Property tax per year", min: 0, max: 5000000, step: 500, value: 6000 },
   { id: "ins", type: "money", label: "Insurance per year", min: 0, max: 1000000, step: 500, value: 4000 }
  ],
  compute(v, F) {
   const gross = v.rent * 12, effective = gross * (1 - v.vacancy / 100), mgmt = effective * v.mgmt / 100;
   const opex = mgmt + v.maint + v.ptax + v.ins, noi = effective - opex;
   const loan = v.price * (1 - v.down / 100), debt = loan > 0 ? FinMath.emi(loan, v.rate / 100, v.years * 12) * 12 : 0;
   const cash = v.price - loan + v.extra, flow = noi - debt;
   return {
    hero: { label: "Cash-on-cash return", value: F.pct((flow / cash) * 100), tone: flow >= 0 ? "pos" : "neg", sub: `Monthly cash flow ${F.money(flow / 12)}` },
    stats: [
     { label: "Net operating income (NOI)", value: F.money(noi), sub: "Per year, before loan payments" },
     { label: "Cap rate", value: F.pct((noi / v.price) * 100) },
     { label: "Gross rental yield", value: F.pct((gross / v.price) * 100) },
     { label: "Debt service coverage (DSCR)", value: debt > 0 ? `${F.num(noi / debt, 2)}×` : "No loan", tone: debt > 0 && noi / debt < 1.2 ? "warn" : undefined },
     { label: "Cash invested", value: F.money(cash) },
     { label: "Yearly loan payments", value: F.money(debt) }
    ],
    chart: { type: "donut", title: "Where a year's rent goes", items: [{ label: "Vacancy", value: gross - effective }, { label: "Operating costs", value: opex }, { label: "Loan payments", value: Math.min(debt, Math.max(noi, 0)) }, { label: "Cash flow to you", value: Math.max(flow, 0) }], center: { label: "Gross rent", value: F.compact(gross) } },
    callout: flow < 0 ? { tone: "warn", text: `Rent does not cover the loan and costs; you would add ${F.money(-flow / 12)} a month. The return then depends on price growth.` } : null,
    notes: ["Residential rental yields in Indian cities are often only 2–4%, below home-loan rates, so most of the return has to come from price growth.", "Rental income is taxed at your slab rate after a 30% standard deduction and home-loan interest (Section 24)."]
   };
  },
  how: ["NOI = rent × 12 × (1 − vacancy) − management, maintenance, property tax and insurance.", "Cap rate = NOI ÷ purchase price. Cash flow = NOI − yearly EMIs.", "Cash-on-cash = cash flow ÷ cash invested (down payment + purchase costs)."]
 }
);
