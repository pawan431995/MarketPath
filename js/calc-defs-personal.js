// Calculator definitions: personal finance and budgeting.
// Each definition: { id, cat, icon, title, desc, hi: [title, desc], keywords, inputs, compute(v, F), how }.
// compute returns { hero, stats, chart(s), table(s), callout, notes } or { error }. Percent inputs are in % units.
(window.CALCS = window.CALCS || []).push(
 {
  id: "budget", cat: "personal", icon: "◫", title: "Budget & cash flow", desc: "Track monthly income against needs, wants and savings, and compare with the 50/30/20 rule.",
  hi: ["बजट और कैश फ़्लो", "मासिक आय को ज़रूरतों, इच्छाओं और बचत से मिलाएँ और 50/30/20 नियम से तुलना करें।"],
  keywords: "budget expense income 50 30 20 cash flow spending",
  inputs: [
   { id: "income", type: "rows", label: "Monthly income", total: "amount", addLabel: "Add income",
     fields: [{ key: "name", label: "Source", type: "text", width: "1.4fr" }, { key: "amount", label: "Amount", type: "money" }],
     value: [{ name: "Salary (in hand)", amount: 80000 }, { name: "Other income", amount: 5000 }], newRow: () => ({ name: "", amount: 0 }) },
   { id: "expenses", type: "rows", label: "Monthly spending and saving", total: "amount", addLabel: "Add item",
     fields: [{ key: "name", label: "Item", type: "text", width: "1.3fr" }, { key: "amount", label: "Amount", type: "money" },
      { key: "type", label: "Type", type: "select", width: "0.9fr", options: [{ value: "need", label: "Need" }, { value: "want", label: "Want" }, { value: "save", label: "Saving" }] }],
     value: [
      { name: "Rent / home EMI", amount: 22000, type: "need" }, { name: "Groceries", amount: 8000, type: "need" },
      { name: "Utilities & phone", amount: 3500, type: "need" }, { name: "Transport", amount: 4000, type: "need" },
      { name: "Insurance premiums", amount: 2500, type: "need" }, { name: "Dining & entertainment", amount: 6000, type: "want" },
      { name: "Shopping", amount: 5000, type: "want" }, { name: "Subscriptions", amount: 1200, type: "want" },
      { name: "SIP / investments", amount: 12000, type: "save" }, { name: "Emergency fund", amount: 3000, type: "save" }
     ], newRow: () => ({ name: "", amount: 0, type: "want" }) }
  ],
  compute(v, F) {
   const income = v.income.reduce((s, r) => s + (Number(r.amount) || 0), 0);
   if (income <= 0) return { error: "Add at least one income amount." };
   const sum = type => v.expenses.filter(r => r.type === type).reduce((s, r) => s + (Number(r.amount) || 0), 0);
   const needs = sum("need"), wants = sum("want"), saved = sum("save");
   const surplus = income - needs - wants - saved;
   const savingTotal = saved + Math.max(surplus, 0);
   const p = x => (x / income) * 100;
   const row = (label, you, share) => [label, `${F.money(you)} (${F.pct(p(you), 0)})`, `${F.money(income * share)} (${share * 100}%)`, F.money(you - income * share)];
   return {
    hero: { label: surplus >= 0 ? "Left over each month" : "Monthly shortfall", value: F.money(surplus), tone: surplus >= 0 ? "pos" : "neg", sub: `Savings rate ${F.pct(p(savingTotal), 1)} of income` },
    stats: [
     { label: "Total income", value: F.money(income) },
     { label: "Needs", value: F.money(needs), sub: F.pct(p(needs), 0) },
     { label: "Wants", value: F.money(wants), sub: F.pct(p(wants), 0) },
     { label: "Saving & investing", value: F.money(saved), sub: F.pct(p(saved), 0) }
    ],
    callout: surplus < 0 ? { tone: "neg", text: `You are planning to spend ${F.money(-surplus)} more than you earn each month. Trim wants first, then needs.` }
     : p(needs) > 50 ? { tone: "warn", text: `Needs take ${F.pct(p(needs), 0)} of income, above the 50% guideline. Housing and loan EMIs are the usual levers.` } : null,
    chart: { type: "donut", title: "Where your income goes", items: [
     { label: "Needs", value: needs }, { label: "Wants", value: wants }, { label: "Saving & investing", value: saved }, { label: "Not yet allocated", value: Math.max(surplus, 0) }
    ], center: { label: "Income", value: F.compact(income) } },
    table: { title: "Compared with the 50/30/20 rule", open: true, file: "50-30-20", head: ["Bucket", "You", "Guideline", "Difference"],
     rows: [row("Needs", needs, 0.5), row("Wants", wants, 0.3), row("Saving & investing (incl. surplus)", savingTotal, 0.2)] },
    notes: ["50/30/20 is a starting guideline, not a rule. In high-rent cities needs often exceed 50%; aim to keep saving at 20% or more.", "Count loan EMIs as needs, and only count money that actually leaves your account as saving."]
   };
  },
  how: ["Surplus = total income − needs − wants − planned saving.", "Savings rate = (planned saving + any surplus) ÷ income.", "Guideline amounts: needs 50%, wants 30%, saving 20% of income."]
 },

 {
  id: "net-worth", cat: "personal", icon: "⚖", title: "Net worth", desc: "Add up what you own and what you owe to see your overall financial position.",
  hi: ["नेट वर्थ", "आपकी संपत्तियाँ और देनदारियाँ जोड़कर अपनी कुल वित्तीय स्थिति देखें।"],
  keywords: "net worth assets liabilities wealth balance sheet",
  inputs: [
   { id: "assets", type: "rows", label: "Assets (what you own)", total: "amount", addLabel: "Add asset",
     fields: [{ key: "name", label: "Asset", type: "text", width: "1.3fr" }, { key: "amount", label: "Value", type: "money" },
      { key: "type", label: "Type", type: "select", width: "1fr", options: [{ value: "cash", label: "Cash & bank" }, { value: "invest", label: "Investments" }, { value: "retire", label: "Retirement" }, { value: "property", label: "Property" }, { value: "other", label: "Vehicle & other" }] }],
     value: [
      { name: "Savings & FDs", amount: 300000, type: "cash" }, { name: "Stocks & mutual funds", amount: 650000, type: "invest" },
      { name: "EPF / PPF / NPS", amount: 900000, type: "retire" }, { name: "Home", amount: 6500000, type: "property" },
      { name: "Car", amount: 450000, type: "other" }, { name: "Gold", amount: 250000, type: "other" }
     ], newRow: () => ({ name: "", amount: 0, type: "other" }) },
   { id: "debts", type: "rows", label: "Liabilities (what you owe)", total: "amount", addLabel: "Add liability",
     fields: [{ key: "name", label: "Loan or debt", type: "text", width: "1.3fr" }, { key: "amount", label: "Outstanding", type: "money" }],
     value: [{ name: "Home loan", amount: 3800000 }, { name: "Car loan", amount: 250000 }, { name: "Credit card dues", amount: 35000 }],
     newRow: () => ({ name: "", amount: 0 }) }
  ],
  compute(v, F) {
   const total = rows => rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);
   const assets = total(v.assets), debts = total(v.debts), nw = assets - debts;
   const byType = type => v.assets.filter(r => r.type === type).reduce((s, r) => s + (Number(r.amount) || 0), 0);
   const liquid = byType("cash") + byType("invest");
   const ratio = assets > 0 ? (debts / assets) * 100 : 0;
   return {
    hero: { label: "Net worth", value: F.money(nw), tone: nw >= 0 ? "pos" : "neg", sub: F.words(nw) },
    stats: [
     { label: "Total assets", value: F.money(assets) },
     { label: "Total liabilities", value: F.money(debts) },
     { label: "Debt-to-asset ratio", value: F.pct(ratio, 1), tone: ratio > 50 ? "warn" : undefined },
     { label: "Liquid net worth", value: F.money(liquid - debts), sub: "Cash and investments minus debts" }
    ],
    charts: [
     { type: "donut", title: "What you own", items: [
      { label: "Cash & bank", value: byType("cash") }, { label: "Investments", value: byType("invest") }, { label: "Retirement", value: byType("retire") },
      { label: "Property", value: byType("property") }, { label: "Vehicle & other", value: byType("other") }
     ], center: { label: "Assets", value: F.compact(assets) } },
     { type: "bar", title: "Assets against liabilities", x: ["Assets", "Liabilities", "Net worth"], series: [{ name: "Amount", values: [assets, debts, nw] }] }
    ],
    notes: ["Value property and vehicles at what they would sell for today, not what you paid.", "Recalculate once or twice a year; the trend matters more than any one number."]
   };
  },
  how: ["Net worth = total assets − total liabilities.", "Debt-to-asset ratio = liabilities ÷ assets.", "Liquid net worth = cash and investments − liabilities."]
 },

 {
  id: "emergency-fund", cat: "personal", icon: "⛑", title: "Emergency fund", desc: "Work out how much to keep aside for 3 to 12 months of essential expenses, and how long it takes to get there.",
  hi: ["इमरजेंसी फ़ंड", "3 से 12 महीने के ज़रूरी खर्च के लिए कितना पैसा अलग रखें और वहाँ तक पहुँचने में कितना समय लगेगा।"],
  keywords: "emergency fund rainy day contingency safety net",
  inputs: [
   { id: "expenses", type: "money", label: "Monthly essential expenses", min: 5000, max: 500000, step: 1000, value: 40000, help: "Rent or EMIs, food, utilities, insurance, school fees: what you must pay even without income." },
   { id: "months", type: "select", label: "Months to cover", value: "6", options: [{ value: "3", label: "3 months" }, { value: "6", label: "6 months" }, { value: "9", label: "9 months" }, { value: "12", label: "12 months" }] },
   { id: "current", type: "money", label: "Emergency savings you already have", min: 0, max: 5000000, step: 5000, value: 80000 },
   { id: "monthly", type: "money", label: "You can add each month", min: 0, max: 200000, step: 1000, value: 10000 }
  ],
  compute(v, F) {
   const m = Number(v.months);
   if (!(v.expenses > 0)) return { error: "Enter your monthly essential expenses." };
   const target = v.expenses * m, gap = Math.max(0, target - v.current);
   const months = gap === 0 ? 0 : v.monthly > 0 ? Math.ceil(gap / v.monthly) : Infinity;
   const covered = v.current / v.expenses;
   return {
    hero: { label: "Emergency fund target", value: F.money(target), sub: `${m} months of essential expenses` },
    stats: [
     { label: "Still needed", value: F.money(gap), tone: gap ? "warn" : "pos" },
     { label: "Time to reach target", value: months === Infinity ? "Add a monthly amount" : months === 0 ? "Done" : F.months(months) },
     { label: "You are covered for", value: `${F.num(covered, 1)} months` }
    ],
    chart: { type: "progress", title: "Progress to target", value: v.current, target, label: `${F.money(v.current)} of ${F.money(target)} (${F.pct(Math.min(100, (v.current / target) * 100), 0)})` },
    notes: ["Choose 3 months with a stable salary and no dependants; 6 to 12 months if income is variable, you are self-employed, or others depend on you.",
     "Keep it safe and quick to reach: a savings account, sweep-in FD or liquid fund. Do not invest it in equity."]
   };
  },
  how: ["Target = monthly essential expenses × months to cover.", "Time to target = (target − current savings) ÷ monthly addition, rounded up."]
 },

 {
  id: "cost-of-living", cat: "personal", icon: "⇆", title: "Cost of living comparison", desc: "Compare monthly costs between two cities and find the salary that keeps your savings the same.",
  hi: ["जीवन-यापन लागत तुलना", "दो शहरों के मासिक खर्च की तुलना करें और वह वेतन जानें जिससे आपकी बचत वैसी ही रहे।"],
  keywords: "cost of living city relocation move salary comparison",
  inputs: [
   { id: "cityA", type: "text", label: "Current city", value: "Bengaluru" },
   { id: "cityB", type: "text", label: "New city", value: "Pune" },
   { id: "salary", type: "money", label: "Monthly take-home pay in current city", min: 10000, max: 2000000, step: 5000, value: 150000 },
   { id: "costs", type: "rows", label: "Monthly costs in each city",
     fields: [{ key: "name", label: "Category", type: "text", width: "1.3fr" }, { key: "a", label: "Current", type: "money" }, { key: "b", label: "New", type: "money" }],
     value: [
      { name: "Housing (rent)", a: 35000, b: 25000 }, { name: "Groceries & food", a: 15000, b: 13000 }, { name: "Transport", a: 6000, b: 5000 },
      { name: "Utilities & internet", a: 5000, b: 4500 }, { name: "Healthcare", a: 3000, b: 2800 }, { name: "Children's education", a: 8000, b: 7000 },
      { name: "Dining & leisure", a: 7000, b: 6000 }, { name: "Domestic help & other", a: 5000, b: 4000 }
     ], newRow: () => ({ name: "", a: 0, b: 0 }) }
  ],
  compute(v, F) {
   const A = v.cityA || "Current city", B = v.cityB || "New city";
   const totA = v.costs.reduce((s, r) => s + (Number(r.a) || 0), 0), totB = v.costs.reduce((s, r) => s + (Number(r.b) || 0), 0);
   if (totA <= 0) return { error: "Enter costs for the current city." };
   const diff = ((totB - totA) / totA) * 100;
   const sameSavings = v.salary + (totB - totA), proportional = v.salary * (totB / totA);
   return {
    hero: { label: `Take-home pay needed in ${B}`, value: F.money(sameSavings), sub: `Keeps the same ${F.money(v.salary - totA)} a month after living costs` },
    stats: [
     { label: `Monthly costs in ${A}`, value: F.money(totA) },
     { label: `Monthly costs in ${B}`, value: F.money(totB) },
     { label: `${B} is`, value: `${F.pct(Math.abs(diff), 1)} ${diff >= 0 ? "dearer" : "cheaper"}`, tone: diff > 0 ? "warn" : "pos" },
     { label: "Pay scaled by cost ratio", value: F.money(proportional), sub: "Keeps the same lifestyle share" }
    ],
    chart: { type: "bar", title: "Monthly cost by category", x: v.costs.map(r => r.name || "—"), series: [{ name: A, values: v.costs.map(r => Number(r.a) || 0) }, { name: B, values: v.costs.map(r => Number(r.b) || 0) }] },
    table: { title: "Category comparison", file: "cost-of-living", head: ["Category", A, B, "Difference"], rows: v.costs.map(r => [r.name, F.money(Number(r.a) || 0), F.money(Number(r.b) || 0), F.money((Number(r.b) || 0) - (Number(r.a) || 0))]) },
    notes: ["Use your own costs: rent for a comparable home matters most. Online averages hide large differences between neighbourhoods.", "Compare take-home pay, after tax. State professional tax and HRA rules can differ between cities."]
   };
  },
  how: ["Pay needed for the same savings = current pay + (new city costs − current city costs).", "Pay scaled by cost ratio = current pay × (new city costs ÷ current city costs)."]
 },

 {
  id: "education", cat: "personal", icon: "✎", title: "Child education planner", desc: "Estimate future college costs with education inflation and the monthly SIP needed to fund them.",
  hi: ["बच्चों की शिक्षा योजना", "शिक्षा महँगाई के साथ भविष्य की कॉलेज लागत और उसके लिए ज़रूरी मासिक SIP का अनुमान।"],
  keywords: "college savings education child tuition school fees plan",
  inputs: [
   { id: "age", type: "years", label: "Child's age today", min: 0, max: 17, step: 1, value: 5 },
   { id: "start", type: "years", label: "Age when college starts", min: 15, max: 25, step: 1, value: 18 },
   { id: "cost", type: "money", label: "Total course cost in today's money", min: 100000, max: 50000000, step: 50000, value: 2000000 },
   { id: "inflation", type: "percent", label: "Education inflation", min: 0, max: 15, step: 0.5, value: 8 },
   { id: "saved", type: "money", label: "Already saved for this", min: 0, max: 20000000, step: 10000, value: 200000 },
   { id: "rate", type: "percent", label: "Expected return on savings", min: 1, max: 18, step: 0.5, value: 11 }
  ],
  compute(v, F) {
   const yrs = v.start - v.age;
   if (yrs <= 0) return { error: "College start age must be after the child's current age." };
   const r = v.rate / 100, inf = v.inflation / 100, months = yrs * 12;
   const future = v.cost * Math.pow(1 + inf, yrs), grown = v.saved * Math.pow(1 + r, yrs);
   const gap = Math.max(0, future - grown);
   const sip = gap > 0 ? gap / FinMath.sipFV(1, r, months) : 0;
   const lump = gap / Math.pow(1 + r, yrs);
   const x = [], savings = [], costLine = [];
   for (let y = 0; y <= yrs; y++) {
    x.push(String(v.age + y));
    savings.push(v.saved * Math.pow(1 + r, y) + (y ? FinMath.sipFV(sip, r, y * 12) : 0));
    costLine.push(v.cost * Math.pow(1 + inf, y));
   }
   return {
    hero: { label: "Monthly SIP needed", value: F.money(sip), sub: gap > 0 ? `For ${yrs} years, until age ${v.start}` : "Your current savings already cover it" },
    stats: [
     { label: `Course cost at age ${v.start}`, value: F.money(future), sub: F.words(future) },
     { label: "Current savings will grow to", value: F.money(grown) },
     { label: "Shortfall to fund", value: F.money(gap), tone: gap ? "warn" : "pos" },
     { label: "Or invest once today", value: F.money(lump) }
    ],
    chart: { type: "line", title: "Savings against the rising cost", xTitle: "Age", x, series: [{ name: "Your savings (with SIP)", values: savings, area: true }, { name: "Course cost that year", values: costLine, dashed: true }] },
    notes: ["Education costs in India have risen faster than general inflation; 8–10% a year is a common planning range.", "Move the money to safer debt funds or deposits in the last 2–3 years so a market fall does not hit the fees."]
   };
  },
  how: ["Future cost = today's cost × (1 + education inflation)^years.", "Shortfall = future cost − current savings × (1 + return)^years.", "Monthly SIP = shortfall ÷ future value of ₹1 invested monthly (start of month, monthly rate = annual ÷ 12)."]
 },

 {
  id: "inflation", cat: "personal", icon: "↑", title: "Inflation", desc: "See what today's expenses will cost in future, and what your money will be worth.",
  hi: ["महँगाई", "आज के खर्च भविष्य में कितने होंगे और आपके पैसे की क़ीमत कितनी रह जाएगी।"],
  keywords: "inflation purchasing power future cost real value",
  inputs: [
   { id: "amount", type: "money", label: "Amount today", min: 1000, max: 100000000, step: 1000, value: 100000 },
   { id: "years", type: "years", label: "Years ahead", min: 1, max: 50, step: 1, value: 15 },
   { id: "inflation", type: "percent", label: "Expected inflation", min: 0, max: 15, step: 0.5, value: 6 }
  ],
  compute(v, F) {
   const i = v.inflation / 100, future = v.amount * Math.pow(1 + i, v.years), real = v.amount / Math.pow(1 + i, v.years);
   const x = [], cost = [], worth = [];
   for (let y = 0; y <= v.years; y++) { x.push(String(y)); cost.push(v.amount * Math.pow(1 + i, y)); worth.push(v.amount / Math.pow(1 + i, y)); }
   return {
    hero: { label: `What ${F.money(v.amount)} of spending will cost in ${v.years} years`, value: F.money(future), sub: F.words(future) },
    stats: [
     { label: `${F.money(v.amount)} kept as cash will buy`, value: F.money(real), sub: "In today's money" },
     { label: "Purchasing power lost", value: F.pct((1 - real / v.amount) * 100, 1), tone: "neg" },
     { label: "Prices double in about", value: i > 0 ? F.years(Math.log(2) / Math.log(1 + i)) : "Never" }
    ],
    chart: { type: "line", title: "Rising prices against the value of idle money", xTitle: "Year", x, series: [{ name: "Cost of today's spending", values: cost }, { name: "What idle cash can buy", values: worth }] },
    notes: ["India's retail (CPI) inflation has averaged roughly 5–6% over the long run, but your own inflation depends on what you spend on.", "Returns below inflation shrink your money in real terms even when the balance grows."]
   };
  },
  how: ["Future cost = amount × (1 + inflation)^years.", "Value of idle money = amount ÷ (1 + inflation)^years."]
 },

 {
  id: "goal", cat: "personal", icon: "◎", title: "Goal planner", desc: "Find the monthly SIP or one-time investment needed for a future goal, adjusted for inflation.",
  hi: ["लक्ष्य योजना", "महँगाई के हिसाब से किसी भविष्य के लक्ष्य के लिए ज़रूरी मासिक SIP या एकमुश्त निवेश।"],
  keywords: "goal planner target sip needed house car wedding travel",
  inputs: [
   { id: "cost", type: "money", label: "Goal cost in today's money", min: 10000, max: 100000000, step: 10000, value: 2500000 },
   { id: "years", type: "years", label: "Years to goal", min: 1, max: 40, step: 1, value: 10 },
   { id: "inflation", type: "percent", label: "Inflation for this goal", min: 0, max: 15, step: 0.5, value: 6 },
   { id: "saved", type: "money", label: "Already saved", min: 0, max: 50000000, step: 10000, value: 0 },
   { id: "rate", type: "percent", label: "Expected annual return", min: 1, max: 20, step: 0.5, value: 12 }
  ],
  compute(v, F) {
   const r = v.rate / 100, target = v.cost * Math.pow(1 + v.inflation / 100, v.years), grown = v.saved * Math.pow(1 + r, v.years);
   const gap = Math.max(0, target - grown), sip = gap / FinMath.sipFV(1, r, v.years * 12), lump = gap / Math.pow(1 + r, v.years);
   const x = [], corpus = [], need = [];
   for (let y = 0; y <= v.years; y++) { x.push(String(y)); corpus.push(v.saved * Math.pow(1 + r, y) + (y ? FinMath.sipFV(sip, r, y * 12) : 0)); need.push(v.cost * Math.pow(1 + v.inflation / 100, y)); }
   return {
    hero: { label: "Monthly SIP needed", value: F.money(sip), sub: `Total invested ${F.money(sip * v.years * 12 + v.saved)}` },
    stats: [
     { label: "Goal amount in future money", value: F.money(target), sub: F.words(target) },
     { label: "Or invest once today", value: F.money(lump + v.saved), sub: v.saved ? "Including what you have saved" : undefined },
     { label: "Savings will grow to", value: F.money(grown) }
    ],
    chart: { type: "line", title: "Corpus against the goal", xTitle: "Year", x, series: [{ name: "Your corpus", values: corpus, area: true }, { name: "Goal cost that year", values: need, dashed: true }] }
   };
  },
  how: ["Goal in future money = cost today × (1 + inflation)^years.", "Monthly SIP = (goal − existing savings grown at the return) ÷ future value of ₹1 a month."]
 }
);
