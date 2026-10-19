// Calculator definitions: retirement planning. See calc-defs-personal.js for the definition format.
(function () {
 // Future value of a step-up SIP of 1 per month in year one, rising by `step` each year.
 function stepUpFactor(rate, step, years) {
  const i = rate / 12;
  let bal = 0;
  for (let y = 0; y < years; y++) { const amt = Math.pow(1 + step, y); for (let k = 0; k < 12; k++) bal = (bal + amt) * (1 + i); }
  return bal;
 }

 window.CALCS = window.CALCS || [];
 window.CALCS.push(
 {
  id: "retirement", cat: "retire", icon: "◷", title: "Retirement corpus", desc: "How much you need at retirement to fund your lifestyle, and the monthly SIP to get there.",
  hi: ["रिटायरमेंट कोष", "रिटायरमेंट पर जीवनशैली के लिए कितना पैसा चाहिए और वहाँ तक पहुँचने के लिए मासिक SIP।"],
  keywords: "retirement corpus nest egg pension plan how much",
  inputs: [
   { id: "age", type: "years", label: "Your age", min: 18, max: 65, step: 1, value: 30 },
   { id: "retire", type: "years", label: "Retirement age", min: 40, max: 75, step: 1, value: 60 },
   { id: "life", type: "years", label: "Plan until age", min: 60, max: 100, step: 1, value: 85 },
   { id: "expenses", type: "money", label: "Monthly expenses today", min: 5000, max: 2000000, step: 1000, value: 50000 },
   { id: "inflation", type: "percent", label: "Inflation", min: 0, max: 12, step: 0.5, value: 6 },
   { id: "pre", type: "percent", label: "Return before retirement", min: 1, max: 18, step: 0.5, value: 11 },
   { id: "post", type: "percent", label: "Return after retirement", min: 1, max: 15, step: 0.5, value: 7 },
   { id: "saved", type: "money", label: "Retirement savings today", min: 0, max: 500000000, step: 50000, value: 500000 },
   { id: "step", type: "percent", label: "Yearly SIP increase (for step-up)", min: 0, max: 25, step: 1, value: 10 }
  ],
  compute(v, F) {
   const yrs = v.retire - v.age, T = v.life - v.retire;
   if (yrs <= 0) return { error: "Retirement age must be after your current age." };
   if (T <= 0) return { error: "Plan-until age must be after retirement age." };
   const inf = v.inflation / 100, pre = v.pre / 100, post = v.post / 100;
   const firstYear = v.expenses * 12 * Math.pow(1 + inf, yrs);
   const corpus = FinMath.growingAnnuityDue(firstYear, post, inf, T);
   const grown = v.saved * Math.pow(1 + pre, yrs), gap = Math.max(0, corpus - grown);
   const sip = gap / FinMath.sipFV(1, pre, yrs * 12), stepSip = gap / stepUpFactor(pre, v.step / 100, yrs);
   const x = [], bal = [];
   let b = v.saved, w = firstYear;
   for (let a = v.age; a <= v.life; a++) {
    x.push(String(a)); bal.push(Math.max(b, 0));
    if (a < v.retire) { for (let k = 0; k < 12; k++) b = (b + sip) * (1 + pre / 12); }
    else { b = (b - w) * (1 + post); w *= 1 + inf; }
   }
   return {
    hero: { label: "Monthly SIP needed", value: F.money(sip), sub: `For ${yrs} years, to build ${F.words(corpus)}` },
    stats: [
     { label: "Corpus needed at retirement", value: F.money(corpus), sub: F.words(corpus) },
     { label: "Monthly expenses at retirement", value: F.money(firstYear / 12), sub: `Today's ${F.money(v.expenses)} after inflation` },
     { label: "Current savings will grow to", value: F.money(grown) },
     { label: `Or a step-up SIP starting at`, value: F.money(stepSip), sub: `Rising ${F.pct(v.step, 0)} a year` }
    ],
    chart: { type: "line", title: "Projected corpus by age", xTitle: "Age", x, series: [{ name: "Corpus", values: bal, area: true }] },
    notes: ["Plan to a long life: running out of money at 80 is worse than leaving some behind.", "Medical costs often rise faster than general inflation; keep separate health insurance."]
   };
  },
  how: ["Expenses in the first retirement year = monthly expenses × 12 × (1 + inflation)^years to retirement.",
   "Corpus = present value at retirement of yearly withdrawals that rise with inflation, taken at the start of each year, while the corpus earns the post-retirement return.",
   "Monthly SIP = (corpus − savings grown at the pre-retirement return) ÷ future value of ₹1 a month."]
 },

 {
  id: "fire", cat: "retire", icon: "✺", title: "FIRE (financial independence)", desc: "Find your FIRE number and the age at which your investments can cover your expenses.",
  hi: ["FIRE (वित्तीय स्वतंत्रता)", "आपका FIRE नंबर और वह उम्र जब निवेश आपके खर्च उठा सकें।"],
  keywords: "fire financial independence retire early fire number coast",
  inputs: [
   { id: "age", type: "years", label: "Your age", min: 18, max: 65, step: 1, value: 30 },
   { id: "expenses", type: "money", label: "Yearly expenses today", min: 50000, max: 50000000, step: 10000, value: 600000 },
   { id: "savings", type: "money", label: "Yearly savings invested", min: 0, max: 50000000, step: 10000, value: 600000 },
   { id: "growth", type: "percent", label: "Yearly increase in savings", min: 0, max: 20, step: 1, value: 5 },
   { id: "portfolio", type: "money", label: "Investments today", min: 0, max: 500000000, step: 50000, value: 1000000 },
   { id: "rate", type: "percent", label: "Expected return", min: 1, max: 18, step: 0.5, value: 11 },
   { id: "inflation", type: "percent", label: "Inflation", min: 0, max: 12, step: 0.5, value: 6 },
   { id: "swr", type: "percent", label: "Safe withdrawal rate", min: 2, max: 6, step: 0.1, value: 3.5, help: "3–3.5% is a common choice for Indian early retirees; 4% comes from US studies over 30 years." }
  ],
  compute(v, F) {
   const r = v.rate / 100, inf = v.inflation / 100, swr = v.swr / 100;
   if (!(swr > 0)) return { error: "Enter a withdrawal rate above zero." };
   let port = v.portfolio, save = v.savings, fireAt = null;
   const x = [], ports = [], targets = [];
   for (let y = 0; y <= 60 && v.age + y <= 100; y++) {
    const target = (v.expenses * Math.pow(1 + inf, y)) / swr;
    x.push(String(v.age + y)); ports.push(port); targets.push(target);
    if (fireAt === null && port >= target) fireAt = y;
    if (fireAt !== null && y >= fireAt + 5) break;
    port = port * (1 + r) + save;
    save *= 1 + v.growth / 100;
   }
   const fireToday = v.expenses / swr;
   const total = v.savings + v.expenses, rate = total > 0 ? (v.savings / total) * 100 : 0;
   const coastYears = Math.max(0, 60 - v.age), coast = ((v.expenses * Math.pow(1 + inf, coastYears)) / swr) / Math.pow(1 + r, coastYears);
   return {
    hero: fireAt === null ? { label: "Financial independence", value: "Not within 60 years", tone: "neg", sub: "Increase savings or reduce expenses" }
     : { label: "You can reach FIRE at age", value: String(v.age + fireAt), tone: "pos", sub: fireAt === 0 ? "You are already there" : `In ${fireAt} years` },
    stats: [
     { label: "FIRE number in today's money", value: F.money(fireToday), sub: `${F.num(1 / swr, 1)}× yearly expenses` },
     { label: "FIRE number at that age", value: fireAt === null ? "—" : F.money(targets[fireAt]) },
     { label: "Savings rate", value: F.pct(rate, 0), sub: "Savings ÷ (savings + expenses)" },
     { label: "Coast FIRE number", value: F.money(coast), sub: "Invested today, enough by 60 with no more saving" }
    ],
    chart: { type: "line", title: "Investments against the FIRE target", xTitle: "Age", x, series: [{ name: "Your investments", values: ports, area: true }, { name: "FIRE target (rising with inflation)", values: targets, dashed: true }] },
    notes: ["A lower withdrawal rate is safer for a retirement that may last 40–50 years.", "Plan for health insurance, children's education and big one-off expenses separately from the FIRE number."]
   };
  },
  how: ["FIRE target in a year = that year's expenses (inflated) ÷ safe withdrawal rate.", "Each year: investments = investments × (1 + return) + savings; savings rise by the yearly increase.", "Coast FIRE = FIRE target at 60 ÷ (1 + return)^(years to 60)."]
 },

 {
  id: "swr", cat: "retire", icon: "⇣", title: "Safe withdrawal rate", desc: "How much you can withdraw each year, rising with inflation, without running out of money.",
  hi: ["सुरक्षित निकासी दर", "हर साल महँगाई के साथ बढ़ती कितनी राशि निकालें कि पैसा ख़त्म न हो।"],
  keywords: "safe withdrawal rate 4 percent rule retirement income drawdown",
  inputs: [
   { id: "portfolio", type: "money", label: "Portfolio at retirement", min: 100000, max: 1000000000, step: 100000, value: 20000000 },
   { id: "withdraw", type: "money", label: "First-year withdrawal", min: 10000, max: 100000000, step: 10000, value: 800000 },
   { id: "rate", type: "percent", label: "Expected return", min: 0, max: 15, step: 0.5, value: 8 },
   { id: "inflation", type: "percent", label: "Inflation", min: 0, max: 12, step: 0.5, value: 6 },
   { id: "years", type: "years", label: "Years it must last", min: 5, max: 60, step: 1, value: 30 }
  ],
  compute(v, F) {
   const r = v.rate / 100, inf = v.inflation / 100;
   let bal = v.portfolio, w = v.withdraw, lasted = null;
   const x = ["0"], bals = [bal];
   for (let y = 1; y <= Math.max(v.years, 1); y++) {
    bal = (bal - w) * (1 + r); w *= 1 + inf;
    if (bal <= 0 && lasted === null) { lasted = y; bal = 0; }
    x.push(String(y)); bals.push(Math.max(bal, 0));
   }
   const maxFirst = v.portfolio / FinMath.growingAnnuityDue(1, r, inf, v.years);
   const rateNow = (v.withdraw / v.portfolio) * 100;
   return {
    hero: { label: "Your withdrawal rate", value: F.pct(rateNow, 2), tone: lasted ? "neg" : "pos", sub: lasted ? `Money runs out in year ${lasted}` : `Lasts the full ${v.years} years` },
    stats: [
     { label: "Maximum first-year withdrawal", value: F.money(maxFirst), sub: `${F.pct((maxFirst / v.portfolio) * 100)} of the portfolio, lasting exactly ${v.years} years` },
     { label: "Per month", value: F.money(maxFirst / 12) },
     { label: `Balance after ${v.years} years`, value: F.money(Math.max(bals[v.years], 0)) }
    ],
    chart: { type: "line", title: "Portfolio balance", xTitle: "Year", x, series: [{ name: "Balance", values: bals, area: true }] },
    notes: ["This uses steady returns. Real markets vary, and a crash early in retirement can deplete a portfolio much faster; keep a margin of safety.", "The '4% rule' comes from US data over 30 years. Longer retirements or higher inflation call for a lower rate."]
   };
  },
  how: ["Each year: withdraw at the start, the rest grows at the expected return, and the next withdrawal rises with inflation.", "Maximum first-year withdrawal = portfolio ÷ present value of ₹1 a year rising with inflation for the chosen years."]
 },

 {
  id: "epf", cat: "retire", icon: "▥", currency: "INR", title: "EPF (Provident Fund)", desc: "Your Employees' Provident Fund balance at retirement, with employer contribution and EPS pension.",
  hi: ["EPF (प्रोविडेंट फ़ंड)", "रिटायरमेंट पर आपका EPF बैलेंस, नियोक्ता योगदान और EPS पेंशन के साथ।"],
  keywords: "epf pf provident fund employer contribution eps pension uan",
  inputs: [
   { id: "basic", type: "money", label: "Monthly basic salary + DA", min: 5000, max: 1000000, step: 1000, value: 50000 },
   { id: "age", type: "years", label: "Your age", min: 18, max: 57, step: 1, value: 30 },
   { id: "retire", type: "years", label: "Retirement age", min: 45, max: 60, step: 1, value: 58 },
   { id: "balance", type: "money", label: "Current EPF balance", min: 0, max: 50000000, step: 10000, value: 300000 },
   { id: "employee", type: "percent", label: "Your contribution", min: 12, max: 50, step: 1, value: 12, help: "12% is mandatory; anything above is Voluntary PF (VPF)." },
   { id: "growth", type: "percent", label: "Yearly salary increase", min: 0, max: 20, step: 0.5, value: 7 },
   { id: "rate", type: "percent", label: "EPF interest rate", min: 5, max: 10, step: 0.05, value: 8.25, help: "Declared every year by EPFO; 8.25% for FY 2023-24 and 2024-25." }
  ],
  compute(v, F) {
   const yrs = v.retire - v.age;
   if (yrs <= 0) return { error: "Retirement age must be after your current age." };
   const i = v.rate / 100 / 12;
   let bal = v.balance, mine = 0, emp = 0, salary = v.basic;
   const x = ["0"], cMine = [0], cEmp = [0], cInt = [v.balance], rows = [];
   for (let y = 1; y <= yrs; y++) {
    const eps = Math.round(0.0833 * Math.min(salary, 15000));
    const you = salary * v.employee / 100, er = salary * 0.12 - eps;
    let interest = 0;
    for (let k = 0; k < 12; k++) { bal += you + er; mine += you; emp += er; interest += bal * i; }
    bal += interest;
    x.push(String(y)); cMine.push(mine); cEmp.push(emp); cInt.push(bal - mine - emp);
    rows.push([String(v.age + y), F.money(salary), F.money((you + er) * 12), F.money(interest), F.money(bal)]);
    salary *= 1 + v.growth / 100;
   }
   const pension = (Math.min(15000, v.basic) * Math.min(yrs, 35)) / 70;
   return {
    hero: { label: `EPF balance at ${v.retire}`, value: F.money(bal), sub: F.words(bal) },
    stats: [
     { label: "Your contributions", value: F.money(mine) },
     { label: "Employer's EPF contributions", value: F.money(emp), sub: "12% minus the EPS share" },
     { label: "Interest earned", value: F.money(bal - v.balance - mine - emp), tone: "pos" },
     { label: "Estimated EPS pension", value: `${F.money(pension)}/month`, sub: yrs >= 10 ? "Needs 10+ years of service" : "Needs at least 10 years of service" }
    ],
    chart: { type: "line", title: "How your EPF builds up", xTitle: "Year", x, stacked: true, series: [{ name: "Your contributions", values: cMine }, { name: "Employer contributions", values: cEmp }, { name: "Opening balance and interest", values: cInt }] },
    table: { title: "Year-by-year", file: "epf", head: ["Age", "Monthly basic + DA", "Contributions in year", "Interest in year", "Balance"], rows },
    notes: ["Employer's 12% is split: 8.33% of basic (capped at ₹15,000, so ₹1,250 a month) goes to the pension scheme (EPS); the rest goes to EPF.",
     "Interest on your own contributions above ₹2.5 lakh a year is taxable. EPF withdrawn after 5 years of continuous service is tax-free.",
     "EPS pension is estimated with the standard formula on the ₹15,000 wage ceiling and service from today; past service and higher-pension options are not included."]
   };
  },
  how: ["Monthly: employee = basic × your %; employer to EPF = 12% of basic − EPS (8.33% of basic, capped at ₹15,000).", "Interest is calculated monthly on the running balance at rate ÷ 12 and credited at the end of each year.", "EPS pension ≈ min(basic, ₹15,000) × service years ÷ 70."]
 },

 {
  id: "nps", cat: "retire", icon: "▦", currency: "INR", title: "NPS (National Pension System)", desc: "Corpus at 60, the lump sum you can withdraw, and the monthly pension from the annuity.",
  hi: ["NPS (नेशनल पेंशन सिस्टम)", "60 पर कोष, निकाली जा सकने वाली एकमुश्त राशि और एन्युटी से मासिक पेंशन।"],
  keywords: "nps national pension system annuity tier 1 80ccd",
  inputs: [
   { id: "monthly", type: "money", label: "Monthly contribution", min: 500, max: 500000, step: 500, value: 5000 },
   { id: "age", type: "years", label: "Your age", min: 18, max: 59, step: 1, value: 30 },
   { id: "step", type: "percent", label: "Yearly increase in contribution", min: 0, max: 20, step: 1, value: 5 },
   { id: "rate", type: "percent", label: "Expected return", min: 5, max: 14, step: 0.5, value: 10 },
   { id: "annuityShare", type: "percent", label: "Share used to buy annuity", min: 20, max: 100, step: 5, value: 40, help: "40% has long been the minimum; PFRDA has been revising exit rules, so check the current limit." },
   { id: "annuityRate", type: "percent", label: "Annuity rate", min: 4, max: 9, step: 0.25, value: 6 }
  ],
  compute(v, F) {
   const yrs = 60 - v.age, i = v.rate / 100 / 12;
   if (yrs <= 0) return { error: "NPS matures at 60; enter an age below 60." };
   let bal = 0, inv = 0;
   const x = ["0"], invested = [0], values = [0];
   for (let y = 1; y <= yrs; y++) {
    const amt = v.monthly * Math.pow(1 + v.step / 100, y - 1);
    for (let k = 0; k < 12; k++) { bal = (bal + amt) * (1 + i); inv += amt; }
    x.push(String(y)); invested.push(inv); values.push(bal);
   }
   const annuity = bal * v.annuityShare / 100, lump = bal - annuity, pension = annuity * v.annuityRate / 100 / 12;
   return {
    hero: { label: "Monthly pension from annuity", value: F.money(pension), sub: "Taxable as income" },
    stats: [
     { label: "Total corpus at 60", value: F.money(bal), sub: F.words(bal) },
     { label: "Lump sum you can withdraw", value: F.money(lump) },
     { label: "Used to buy annuity", value: F.money(annuity) },
     { label: "Total contributed", value: F.money(inv) }
    ],
    chart: { type: "line", title: "Contributions and growth", xTitle: "Year", x, stacked: true, series: [{ name: "Amount invested", values: invested }, { name: "Growth", values: values.map((val, k) => val - invested[k]) }] },
    notes: ["Tax benefits: up to ₹1.5 lakh under 80C plus ₹50,000 under 80CCD(1B) in the old regime; employer contributions under 80CCD(2) count in both regimes.", "Up to 60% of the corpus can be withdrawn tax-free at 60 under long-standing rules."]
   };
  },
  how: ["Monthly contributions grow at return ÷ 12; the contribution rises by the yearly increase.", "Pension = corpus × annuity share × annuity rate ÷ 12."]
 },

 {
  id: "k401", cat: "retire", icon: "◫", title: "401(k) / employer-matched plan", desc: "Retirement balance with pre-tax contributions and an employer match.",
  hi: ["401(k) / नियोक्ता-मैच योजना", "प्री-टैक्स योगदान और नियोक्ता मैच के साथ रिटायरमेंट बैलेंस।"],
  keywords: "401k employer match retirement plan us pre tax",
  inputs: [
   { id: "salary", type: "money", label: "Annual salary", min: 10000, max: 2000000, step: 1000, value: 80000 },
   { id: "contrib", type: "percent", label: "Your contribution (% of salary)", min: 0, max: 50, step: 1, value: 10 },
   { id: "match", type: "percent", label: "Employer match (% of your contribution)", min: 0, max: 200, step: 5, value: 50 },
   { id: "matchCap", type: "percent", label: "Match applies up to (% of salary)", min: 0, max: 20, step: 0.5, value: 6 },
   { id: "limit", type: "money", label: "Yearly employee limit", min: 1000, max: 100000, step: 500, value: 23500, help: "The IRS limit changes every year; check the current figure." },
   { id: "growth", type: "percent", label: "Yearly salary increase", min: 0, max: 15, step: 0.5, value: 3 },
   { id: "balance", type: "money", label: "Current balance", min: 0, max: 50000000, step: 1000, value: 20000 },
   { id: "rate", type: "percent", label: "Expected return", min: 0, max: 15, step: 0.5, value: 7 },
   { id: "age", type: "years", label: "Your age", min: 18, max: 70, step: 1, value: 30 },
   { id: "retire", type: "years", label: "Retirement age", min: 40, max: 75, step: 1, value: 65 }
  ],
  compute(v, F) {
   const yrs = v.retire - v.age;
   if (yrs <= 0) return { error: "Retirement age must be after your current age." };
   const r = v.rate / 100;
   let bal = v.balance, salary = v.salary, mine = 0, emp = 0;
   const x = ["0"], cMine = [0], cEmp = [0], growth = [v.balance];
   for (let y = 1; y <= yrs; y++) {
    const you = Math.min(salary * v.contrib / 100, v.limit);
    const er = Math.min(you, salary * v.matchCap / 100) * v.match / 100;
    bal = bal * (1 + r) + (you + er) * (1 + r / 2);
    mine += you; emp += er; salary *= 1 + v.growth / 100;
    x.push(String(y)); cMine.push(mine); cEmp.push(emp); growth.push(bal - mine - emp);
   }
   const firstYou = Math.min(v.salary * v.contrib / 100, v.limit), fullMatch = v.contrib >= v.matchCap;
   return {
    hero: { label: `Balance at ${v.retire}`, value: F.money(bal), sub: F.words(bal) },
    stats: [
     { label: "Your contributions", value: F.money(mine) },
     { label: "Employer match", value: F.money(emp), tone: "pos" },
     { label: "Investment growth", value: F.money(bal - mine - emp - v.balance) },
     { label: "This year you contribute", value: F.money(firstYou), sub: fullMatch ? "You get the full match" : `Contribute ${F.pct(v.matchCap, 1)} to get the full match` }
    ],
    callout: fullMatch ? null : { tone: "warn", text: `You are leaving employer money on the table. Contributing ${F.pct(v.matchCap, 1)} of salary captures the full match.` },
    chart: { type: "line", title: "How the balance builds up", xTitle: "Year", x, stacked: true, series: [{ name: "Your contributions", values: cMine }, { name: "Employer match", values: cEmp }, { name: "Growth (incl. current balance)", values: growth }] },
    notes: ["Withdrawals in retirement are taxed as income (traditional 401(k)); Roth contributions are taxed now instead.", "Catch-up contributions after 50 and vesting schedules are not modelled."]
   };
  },
  how: ["Your contribution = min(salary × your %, yearly limit).", "Match = min(your contribution, salary × match cap) × match %.", "Each year: balance × (1 + return) + contributions × (1 + return ÷ 2), assuming contributions spread through the year."]
 },

 {
  id: "gratuity", cat: "retire", icon: "✓", currency: "INR", title: "Gratuity", desc: "Gratuity payable when you leave after 5 or more years of service, and the tax-free part.",
  hi: ["ग्रेच्युटी", "5 या अधिक साल की सेवा के बाद नौकरी छोड़ने पर मिलने वाली ग्रेच्युटी और उसका कर-मुक्त हिस्सा।"],
  keywords: "gratuity payment of gratuity act leaving job",
  inputs: [
   { id: "salary", type: "money", label: "Last monthly basic salary + DA", min: 5000, max: 2000000, step: 1000, value: 60000 },
   { id: "years", type: "years", label: "Completed years of service", min: 1, max: 45, step: 1, value: 12 },
   { id: "months", type: "months", label: "Extra months", min: 0, max: 11, step: 1, value: 7 },
   { id: "covered", type: "select", label: "Employer covered by the Payment of Gratuity Act?", value: "yes", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] }
  ],
  compute(v, F) {
   const covered = v.covered === "yes";
   const yrs = covered ? v.years + (v.months >= 6 ? 1 : 0) : v.years;
   const amount = covered ? (15 / 26) * v.salary * yrs : (15 / 30) * v.salary * yrs;
   const exempt = Math.min(amount, 2000000);
   return {
    hero: { label: "Gratuity payable", value: F.money(amount), sub: F.words(amount) },
    stats: [
     { label: "Years counted", value: String(yrs), sub: covered ? "6 months or more rounds up" : "Completed years only" },
     { label: "Tax-free", value: F.money(exempt), tone: "pos" },
     { label: "Taxable", value: F.money(amount - exempt) }
    ],
    callout: v.years < 5 ? { tone: "warn", text: "Gratuity is normally payable only after 5 years of continuous service (except on death or disability)." } : null,
    notes: ["Private-sector employees get up to ₹20 lakh tax-free over their career.", "Your employer may pay more than the formula; the excess is taxable."]
   };
  },
  how: ["Covered by the Act: 15 × last salary × years ÷ 26.", "Not covered: 15 × last salary × completed years ÷ 30.", "Salary means basic + dearness allowance."]
 }
 );
})();
