// Calculator definitions: business and corporate finance. See calc-defs-personal.js for the definition format.
window.CALCS = window.CALCS || [];
window.CALCS.push(
 {
  id: "tvm", cat: "business", icon: "⏱", title: "Time value of money (TVM)", desc: "Solve for present value, future value, payment, number of periods or interest rate.",
  hi: ["पैसे का समय मूल्य (TVM)", "प्रेज़ेंट वैल्यू, फ़्यूचर वैल्यू, भुगतान, अवधि या ब्याज दर निकालें।"],
  keywords: "tvm time value of money pv fv pmt nper rate financial calculator",
  carryOn: ["solve"],
  inputs: [
   { id: "solve", type: "select", label: "Solve for", value: "fv", dropdown: true, options: [{ value: "fv", label: "Future value (FV)" }, { value: "pv", label: "Present value (PV)" }, { value: "pmt", label: "Payment (PMT)" }, { value: "n", label: "Number of periods (N)" }, { value: "rate", label: "Interest rate (I/Y)" }] },
   { id: "n", type: "number", label: "Number of periods (N)", min: 1, max: 600, step: 1, value: 120, showIf: v => v.solve !== "n" },
   { id: "rate", type: "percent", label: "Interest rate per year (I/Y)", min: 0, max: 30, step: 0.1, value: 10, showIf: v => v.solve !== "rate" },
   { id: "ppy", type: "select", label: "Periods per year", value: "12", options: [{ value: "1", label: "Yearly" }, { value: "4", label: "Quarterly" }, { value: "12", label: "Monthly" }] },
   { id: "pv", type: "money", label: "Present value (PV)", min: -100000000, max: 100000000, step: 1000, value: -100000, slider: false, showIf: v => v.solve !== "pv" },
   { id: "pmt", type: "money", label: "Payment each period (PMT)", min: -10000000, max: 10000000, step: 100, value: -5000, slider: false, showIf: v => v.solve !== "pmt" },
   { id: "fv", type: "money", label: "Future value (FV)", min: -1000000000, max: 1000000000, step: 1000, value: 0, slider: false, showIf: v => v.solve !== "fv" },
   { id: "timing", type: "select", label: "Payments at", value: "0", options: [{ value: "0", label: "End of period" }, { value: "1", label: "Start of period" }] }
  ],
  compute(v, F) {
   const ppy = Number(v.ppy), type = Number(v.timing), i = v.rate / 100 / ppy;
   let { n, pv, pmt, fv } = v, rate = v.rate, label, value;
   if (v.solve === "fv") { fv = FinMath.tvmFV(i, n, pmt, pv, type); label = "Future value"; value = F.money(fv, 2); }
   else if (v.solve === "pv") { pv = FinMath.tvmPV(i, n, pmt, fv, type); label = "Present value"; value = F.money(pv, 2); }
   else if (v.solve === "pmt") { pmt = FinMath.tvmPMT(i, n, pv, fv, type); label = "Payment each period"; value = F.money(pmt, 2); }
   else if (v.solve === "n") { n = FinMath.tvmN(i, pmt, pv, fv, type); if (!Number.isFinite(n) || n <= 0) return { error: "No number of periods solves these values. Check the signs: money you pay out is negative." }; label = "Number of periods"; value = `${F.num(n, 2)} (${F.years(n / ppy * 1)} at ${ppy}/yr)`; }
   else {
    const r = FinMath.tvmRate(n, pmt, pv, fv, type);
    if (r === null) return { error: "No interest rate solves these values. Check the signs: money you pay out is negative, money you receive is positive." };
    rate = r * ppy * 100; label = "Interest rate per year"; value = F.pct(rate, 3);
   }
   const per = rate / 100 / ppy, x = [], bal = [], steps = Math.max(1, Math.round(n)), every = Math.max(1, Math.round(steps / 60));
   // Value at each period: the FV that would balance the cash flows so far.
   for (let k = 0; k <= steps; k += every) { x.push(String(k)); bal.push(FinMath.tvmFV(per, k, pmt, pv, type)); }
   const r2 = x => Math.round(x * 100) / 100;
   const carry = { fv: { fv: r2(fv) }, pv: { pv: r2(pv) }, pmt: { pmt: r2(pmt) }, n: { n: r2(n) }, rate: { rate: Math.round(rate * 10000) / 10000 } }[v.solve];
   return {
    carry,
    hero: { label, value },
    stats: [
     { label: "Total of all payments", value: F.money(pmt * n, 2) },
     { label: "Rate per period", value: F.pct(per * 100, 4) },
     { label: "Sign convention", value: "Out = −, In = +", sub: "Money you pay is negative" }
    ],
    chart: { type: "line", title: "Value at each period", xTitle: "Period", x, series: [{ name: "Value", values: bal }] },
    notes: ["Use negative numbers for money you pay out (deposits, loan payments) and positive for money you receive (loan amount, maturity).", "For a loan: PV = loan amount (positive), PMT = EMI (negative), FV = 0."]
   };
  },
  how: ["The TVM equation: PV × (1 + i)^N + PMT × (1 + i × type) × ((1 + i)^N − 1) ÷ i + FV = 0, where i = annual rate ÷ periods per year.", "FV, PV and PMT are solved directly; N with logarithms; the rate numerically."]
 },

 {
  id: "npv-irr", cat: "business", icon: "∑", title: "NPV & IRR", desc: "Appraise a project: net present value, internal rate of return, payback and profitability index.",
  hi: ["NPV और IRR", "किसी प्रोजेक्ट का मूल्यांकन: नेट प्रेज़ेंट वैल्यू, इंटरनल रेट ऑफ़ रिटर्न, पेबैक और प्रॉफ़िटेबिलिटी इंडेक्स।"],
  keywords: "npv irr net present value internal rate of return capital budgeting payback project",
  inputs: [
   { id: "initial", type: "money", label: "Initial investment", min: 0, max: 10000000000, step: 10000, value: 1000000 },
   { id: "rate", type: "percent", label: "Discount rate (cost of capital)", min: 0, max: 40, step: 0.5, value: 10 },
   { id: "flows", type: "rows", label: "Cash flows by year", total: "amount", addLabel: "Add year",
     fields: [{ key: "year", label: "Year", type: "text", width: "0.6fr" }, { key: "amount", label: "Net cash flow (− for outflow)", type: "money", width: "1.6fr" }],
     value: [{ year: "1", amount: 250000 }, { year: "2", amount: 300000 }, { year: "3", amount: 350000 }, { year: "4", amount: 300000 }, { year: "5", amount: 250000 }],
     newRow: k => ({ year: String(k + 1), amount: 0 }) }
  ],
  compute(v, F) {
   const flows = [-v.initial, ...v.flows.map(r => Number(r.amount) || 0)];
   if (flows.length < 2) return { error: "Add at least one year of cash flow." };
   const r = v.rate / 100, npv = FinMath.npv(r, flows), irr = FinMath.irr(flows);
   const pvIn = flows.slice(1).reduce((s, c, t) => s + c / Math.pow(1 + r, t + 1), 0);
   const payback = disc => {
    let cum = flows[0];
    for (let t = 1; t < flows.length; t++) {
     const c = disc ? flows[t] / Math.pow(1 + r, t) : flows[t];
     if (cum + c >= 0 && c > 0) return t - 1 + -cum / c;
     cum += c;
    }
    return null;
   };
   const pb = payback(false), dpb = payback(true);
   let cum = 0;
   const rows = flows.map((c, t) => { const df = 1 / Math.pow(1 + r, t), pv = c * df; cum += pv; return [String(t), F.money(c), F.num(df, 4), F.money(pv), F.money(cum)]; });
   return {
    hero: { label: "Net present value (NPV)", value: F.money(npv), tone: npv >= 0 ? "pos" : "neg", sub: npv >= 0 ? "The project adds value at this discount rate" : "The project destroys value at this discount rate" },
    stats: [
     { label: "Internal rate of return (IRR)", value: irr === null ? "Not defined" : F.pct(irr * 100), tone: irr !== null && irr * 100 >= v.rate ? "pos" : "warn" },
     { label: "Payback period", value: pb === null ? "Not recovered" : `${F.num(pb, 2)} years` },
     { label: "Discounted payback", value: dpb === null ? "Not recovered" : `${F.num(dpb, 2)} years` },
     { label: "Profitability index", value: v.initial > 0 ? F.num(pvIn / v.initial, 2) : "—", sub: "PV of inflows ÷ investment" }
    ],
    chart: { type: "bar", title: "Cash flows and their present value", xTitle: "Year", x: flows.map((_, t) => String(t)), series: [{ name: "Cash flow", values: flows }, { name: "Present value", values: flows.map((c, t) => c / Math.pow(1 + r, t)) }] },
    table: { title: "Discounted cash flows", file: "dcf", head: ["Year", "Cash flow", "Discount factor", "Present value", "Cumulative PV"], rows },
    notes: ["Accept projects with NPV above zero. IRR can mislead when cash flows change sign more than once or when comparing projects of different sizes."]
   };
  },
  how: ["NPV = Σ cash flow in year t ÷ (1 + discount rate)^t, with year 0 = −initial investment.", "IRR = the discount rate at which NPV = 0.", "Payback = years until cumulative cash flow turns positive (interpolated within the year)."]
 },

 {
  id: "break-even", cat: "business", icon: "✕", title: "Break-even analysis", desc: "Units and revenue a business needs to cover fixed and variable costs, and to reach a profit target.",
  hi: ["ब्रेक-ईवन विश्लेषण", "निश्चित और परिवर्तनीय लागत निकालने और लाभ लक्ष्य तक पहुँचने के लिए ज़रूरी यूनिट और बिक्री।"],
  keywords: "break even analysis units contribution margin fixed costs variable costs",
  inputs: [
   { id: "fixed", type: "money", label: "Fixed costs per month", min: 0, max: 1000000000, step: 10000, value: 300000, help: "Rent, salaries, software, loan EMIs: costs that do not change with sales." },
   { id: "price", type: "money", label: "Selling price per unit", min: 1, max: 10000000, step: 10, value: 500, slider: false },
   { id: "variable", type: "money", label: "Variable cost per unit", min: 0, max: 10000000, step: 10, value: 300, slider: false, help: "Materials, packaging, shipping, payment fees: costs per unit sold." },
   { id: "target", type: "money", label: "Target profit per month", min: 0, max: 100000000, step: 10000, value: 100000 },
   { id: "expected", type: "number", label: "Units you expect to sell per month", min: 0, max: 10000000, step: 10, value: 2200, slider: false }
  ],
  compute(v, F) {
   const cm = v.price - v.variable;
   if (cm <= 0) return { error: "The selling price must be higher than the variable cost per unit." };
   const be = v.fixed / cm, forTarget = (v.fixed + v.target) / cm;
   const top = Math.max(be * 2, v.expected * 1.2, forTarget * 1.1, 10), step = top / 20, x = [], rev = [], cost = [];
   for (let k = 0; k <= 20; k++) { const u = Math.round(step * k); x.push(F.num(u)); rev.push(u * v.price); cost.push(v.fixed + u * v.variable); }
   const mos = v.expected > 0 ? ((v.expected - be) / v.expected) * 100 : null;
   return {
    hero: { label: "Break-even units per month", value: F.num(Math.ceil(be)), sub: `Revenue of ${F.money(be * v.price)}` },
    stats: [
     { label: "Contribution margin per unit", value: F.money(cm, 2), sub: `${F.pct((cm / v.price) * 100, 1)} of price` },
     { label: "Units for target profit", value: F.num(Math.ceil(forTarget)), sub: `Revenue ${F.money(forTarget * v.price)}` },
     { label: "Profit at expected sales", value: v.expected > 0 ? F.money(v.expected * cm - v.fixed) : "—", tone: v.expected * cm - v.fixed >= 0 ? "pos" : "neg" },
     { label: "Margin of safety", value: mos === null ? "—" : F.pct(mos, 1), sub: "How far sales can fall before a loss" }
    ],
    chart: { type: "line", title: "Revenue against total cost", xTitle: "Units", x, series: [{ name: "Revenue", values: rev }, { name: "Total cost", values: cost, dashed: true }] }
   };
  },
  how: ["Contribution margin = price − variable cost per unit.", "Break-even units = fixed costs ÷ contribution margin.", "Units for target profit = (fixed costs + target profit) ÷ contribution margin."]
 },

 {
  id: "runway", cat: "business", icon: "⌛", title: "Working capital & cash runway", desc: "Liquidity ratios and how many months the business can run before cash runs out.",
  hi: ["वर्किंग कैपिटल और कैश रनवे", "लिक्विडिटी अनुपात और कैश ख़त्म होने से पहले बिज़नेस कितने महीने चल सकता है।"],
  keywords: "working capital cash runway burn rate current ratio quick ratio startup liquidity",
  inputs: [
   { id: "cash", type: "money", label: "Cash and bank balance", min: 0, max: 10000000000, step: 10000, value: 2500000 },
   { id: "receivables", type: "money", label: "Receivables (money customers owe)", min: 0, max: 10000000000, step: 10000, value: 800000 },
   { id: "inventory", type: "money", label: "Inventory", min: 0, max: 10000000000, step: 10000, value: 600000 },
   { id: "otherCA", type: "money", label: "Other current assets", min: 0, max: 10000000000, step: 10000, value: 100000 },
   { id: "payables", type: "money", label: "Payables (money you owe suppliers)", min: 0, max: 10000000000, step: 10000, value: 700000 },
   { id: "shortDebt", type: "money", label: "Short-term debt", min: 0, max: 10000000000, step: 10000, value: 300000 },
   { id: "otherCL", type: "money", label: "Other current liabilities", min: 0, max: 10000000000, step: 10000, value: 200000 },
   { id: "inflow", type: "money", label: "Cash coming in per month", min: 0, max: 1000000000, step: 10000, value: 900000 },
   { id: "outflow", type: "money", label: "Cash going out per month", min: 0, max: 1000000000, step: 10000, value: 1250000 },
   { id: "inGrowth", type: "percent", label: "Monthly growth in cash coming in", min: -10, max: 30, step: 0.5, value: 3 },
   { id: "outGrowth", type: "percent", label: "Monthly growth in cash going out", min: -10, max: 30, step: 0.5, value: 1 }
  ],
  compute(v, F) {
   const ca = v.cash + v.receivables + v.inventory + v.otherCA, cl = v.payables + v.shortDebt + v.otherCL;
   let cash = v.cash, inn = v.inflow, out = v.outflow, runOut = null;
   const x = ["0"], path = [cash];
   for (let m = 1; m <= 36; m++) {
    cash += inn - out; inn *= 1 + v.inGrowth / 100; out *= 1 + v.outGrowth / 100;
    x.push(String(m)); path.push(cash);
    if (cash < 0 && runOut === null) runOut = m;
   }
   const burn = v.outflow - v.inflow;
   const date = runOut ? new Date(new Date().getFullYear(), new Date().getMonth() + runOut, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : null;
   return {
    hero: runOut ? { label: "Cash runway", value: F.months(runOut), tone: runOut < 6 ? "neg" : "warn", sub: `Cash runs out around ${date}` }
     : { label: "Cash runway", value: "Over 36 months", tone: "pos", sub: burn <= 0 ? "Cash-flow positive now" : "Growth closes the gap before cash runs out" },
    stats: [
     { label: "Net burn this month", value: F.money(burn), tone: burn > 0 ? "warn" : "pos" },
     { label: "Working capital", value: F.money(ca - cl), tone: ca - cl >= 0 ? "pos" : "neg" },
     { label: "Current ratio", value: cl > 0 ? `${F.num(ca / cl, 2)}×` : "—", sub: "Current assets ÷ current liabilities" },
     { label: "Quick ratio", value: cl > 0 ? `${F.num((ca - v.inventory) / cl, 2)}×` : "—", sub: "Excludes inventory" }
    ],
    chart: { type: "line", title: "Projected cash balance", xTitle: "Month", x, series: [{ name: "Cash balance", values: path, area: true }] },
    notes: ["A current ratio between 1.2 and 2 is generally comfortable; below 1 means short-term liabilities exceed liquid assets.", "Start fundraising or cutting costs with at least 6–9 months of runway left."]
   };
  },
  how: ["Working capital = current assets − current liabilities.", "Each month: cash = cash + money in − money out; both grow at their monthly rates.", "Runway = months until cash falls below zero (projected up to 36 months)."]
 },

 {
  id: "margin", cat: "business", icon: "±", title: "Profit margin & markup", desc: "Margin and markup from cost and price, and the price needed for a target margin.",
  hi: ["प्रॉफ़िट मार्जिन और मार्कअप", "लागत और क़ीमत से मार्जिन और मार्कअप, और लक्ष्य मार्जिन के लिए ज़रूरी क़ीमत।"],
  keywords: "profit margin markup pricing gross margin selling price",
  inputs: [
   { id: "cost", type: "money", label: "Cost per unit", min: 0.01, max: 10000000, step: 1, value: 700, slider: false },
   { id: "price", type: "money", label: "Selling price per unit", min: 0.01, max: 10000000, step: 1, value: 1000, slider: false },
   { id: "target", type: "percent", label: "Target margin", min: 1, max: 95, step: 1, value: 40 }
  ],
  compute(v, F) {
   if (!(v.cost > 0 && v.price > 0)) return { error: "Enter cost and price above zero." };
   const profit = v.price - v.cost;
   return {
    hero: { label: "Profit margin", value: F.pct((profit / v.price) * 100), tone: profit >= 0 ? "pos" : "neg", sub: `Profit ${F.money(profit, 2)} per unit` },
    stats: [
     { label: "Markup on cost", value: F.pct((profit / v.cost) * 100) },
     { label: `Price for a ${F.pct(v.target, 0)} margin`, value: F.money(v.cost / (1 - v.target / 100), 2) },
     { label: `Price for a ${F.pct(v.target, 0)} markup`, value: F.money(v.cost * (1 + v.target / 100), 2) }
    ],
    notes: ["Margin is profit as a share of price; markup is profit as a share of cost. A 50% markup is only a 33% margin."]
   };
  },
  how: ["Margin = (price − cost) ÷ price.", "Markup = (price − cost) ÷ cost.", "Price for a target margin = cost ÷ (1 − margin)."]
 }
);
