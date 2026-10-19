// Calculator definitions: loans and debt. See calc-defs-personal.js for the definition format.
(function () {
 // Pays a list of debts with a fixed monthly budget. method: "avalanche" (highest rate first) or "snowball" (smallest balance first).
 function payDebts(debts, budget, method) {
  const list = debts.map((d, k) => ({ k, name: d.name || `Debt ${k + 1}`, bal: Number(d.balance) || 0, rate: (Number(d.rate) || 0) / 100 / 12, min: Number(d.min) || 0, interest: 0, cleared: null }));
  const totals = [list.reduce((s, d) => s + d.bal, 0)];
  let month = 0, totalInterest = 0;
  while (list.some(d => d.bal > 0.5) && month < 600) {
   month++;
   list.forEach(d => { if (d.bal > 0) { const i = d.bal * d.rate; d.bal += i; d.interest += i; totalInterest += i; } });
   let left = budget;
   list.forEach(d => { const p = Math.min(d.bal, d.min, left); d.bal -= p; left -= p; });
   const order = list.filter(d => d.bal > 0.5).sort(method === "snowball" ? (a, b) => a.bal - b.bal : (a, b) => b.rate - a.rate || a.bal - b.bal);
   for (const d of order) { if (left <= 0) break; const p = Math.min(d.bal, left); d.bal -= p; left -= p; }
   list.forEach(d => { if (d.bal <= 0.5 && d.cleared === null) { d.bal = 0; d.cleared = month; } });
   totals.push(list.reduce((s, d) => s + d.bal, 0));
  }
  return { months: month, totalInterest, list, totals, done: !list.some(d => d.bal > 0.5) };
 }

 // Simulates a card balance with interest plus GST on interest, paying payFn(balance) each month.
 function cardPayoff(balance, apr, gst, payFn) {
  let bal = balance, interest = 0, m = 0;
  const path = [bal];
  while (bal > 0.5 && m < 600) {
   m++;
   const i = (bal * apr) / 12, tax = i * gst;
   bal += i + tax; interest += i + tax;
   bal -= Math.min(bal, payFn(bal));
   path.push(bal);
  }
  return { months: m, interest, path, done: bal <= 0.5 };
 }

 window.CALCS = window.CALCS || [];
 window.CALCS.push(
 {
  id: "emi", cat: "loans", icon: "⇄", title: "Loan EMI & amortization", desc: "Monthly EMI for a home, car or personal loan, with the full repayment schedule.",
  hi: ["लोन EMI और अमॉर्टाइज़ेशन", "होम, कार या पर्सनल लोन की मासिक EMI और पूरा भुगतान शेड्यूल।"],
  keywords: "emi loan amortization schedule home loan car loan personal loan interest",
  inputs: [
   { id: "amount", type: "money", label: "Loan amount", min: 10000, max: 100000000, step: 10000, value: 3000000 },
   { id: "rate", type: "percent", label: "Interest rate", min: 1, max: 30, step: 0.05, value: 8.5 },
   { id: "years", type: "years", label: "Tenure", min: 1, max: 30, step: 1, value: 20 }
  ],
  compute(v, F) {
   const n = Math.round(v.years * 12), s = FinMath.amortize(v.amount, v.rate / 100, n), years = FinMath.byYear(s.rows);
   const total = v.amount + s.totalInterest;
   return {
    hero: { label: "Monthly EMI", value: F.money(s.payment), sub: `For ${F.months(n)}` },
    stats: [
     { label: "Total interest", value: F.money(s.totalInterest), tone: "warn" },
     { label: "Total amount paid", value: F.money(total) },
     { label: "Interest as share of principal", value: F.pct((s.totalInterest / v.amount) * 100, 0) }
    ],
    charts: [
     { type: "donut", title: "Principal and interest", items: [{ label: "Principal", value: v.amount }, { label: "Interest", value: s.totalInterest }], center: { label: "Total paid", value: F.compact(total) } },
     { type: "bar", title: "What each year's EMIs pay off", xTitle: "Year", x: years.map(y => String(y.year)), series: [{ name: "Principal", values: years.map(y => y.principal) }, { name: "Interest", values: years.map(y => y.interest) }] }
    ],
    tables: [
     { title: "Yearly schedule", file: "yearly", head: ["Year", "EMIs paid", "Principal", "Interest", "Balance"], rows: years.map(y => [String(y.year), F.money(y.payment), F.money(y.principal), F.money(y.interest), F.money(y.balance)]) },
     { title: "Monthly schedule", file: "monthly", head: ["Month", "EMI", "Principal", "Interest", "Balance"], rows: s.rows.map(r => [String(r.month), F.money(r.payment), F.money(r.principal), F.money(r.interest), F.money(r.balance)]) }
    ],
    notes: ["Early EMIs are mostly interest. Prepaying in the first years saves the most interest (see the prepayment calculator).", "Home loans: principal qualifies under 80C and interest under Section 24(b) in the old tax regime."]
   };
  },
  how: ["EMI = P × i × (1 + i)^n ÷ ((1 + i)^n − 1), where i = annual rate ÷ 12 and n = months.", "Each month the interest is i × outstanding balance; the rest of the EMI repays principal."]
 },

 {
  id: "prepayment", cat: "loans", icon: "⇟", title: "Loan prepayment", desc: "Interest and time saved by paying extra every month or making a one-time prepayment.",
  hi: ["लोन प्रीपेमेंट", "हर महीने अतिरिक्त भुगतान या एकमुश्त प्रीपेमेंट से बचा ब्याज और समय।"],
  keywords: "prepayment part payment foreclosure extra emi reduce tenure",
  inputs: [
   { id: "balance", type: "money", label: "Outstanding loan", min: 10000, max: 100000000, step: 10000, value: 3000000 },
   { id: "rate", type: "percent", label: "Interest rate", min: 1, max: 30, step: 0.05, value: 8.5 },
   { id: "years", type: "years", label: "Remaining tenure", min: 1, max: 30, step: 1, value: 18 },
   { id: "extra", type: "money", label: "Extra payment every month", min: 0, max: 1000000, step: 1000, value: 5000 },
   { id: "lump", type: "money", label: "One-time prepayment", min: 0, max: 50000000, step: 10000, value: 200000 },
   { id: "lumpMonth", type: "months", label: "Make it in month", min: 1, max: 360, step: 1, value: 12 },
   { id: "mode", type: "select", label: "After prepaying", value: "tenure", options: [{ value: "tenure", label: "Keep EMI, finish sooner" }, { value: "emi", label: "Keep tenure, lower EMI" }] }
  ],
  compute(v, F) {
   const r = v.rate / 100, n = Math.round(v.years * 12), base = FinMath.amortize(v.balance, r, n);
   let s;
   if (v.mode === "tenure") s = FinMath.amortize(v.balance, r, n, { extra: v.extra, lumps: { [v.lumpMonth]: v.lump } });
   else {
    const i = r / 12, rows = [];
    let bal = v.balance, emi = base.payment, totalInterest = 0;
    for (let m = 1; m <= n && bal > 0.005; m++) {
     const int = bal * i;
     bal -= Math.min(bal, emi - int); totalInterest += int;
     const pre = Math.min(bal, v.extra + (m === v.lumpMonth ? v.lump : 0));
     bal -= pre;
     rows.push({ month: m, payment: emi + pre, interest: int, principal: emi - int + pre, balance: bal });
     if (pre > 0 && m < n) emi = FinMath.emi(bal, r, n - m);
    }
    s = { rows, totalInterest, months: rows.length, payment: emi };
   }
   const saved = base.totalInterest - s.totalInterest;
   const yb = FinMath.byYear(base.rows), yn = FinMath.byYear(s.rows);
   const x = yb.map(y => String(y.year));
   return {
    hero: { label: "Interest saved", value: F.money(saved), tone: "pos", sub: v.mode === "tenure" ? `Loan closes ${F.months(n - s.months)} earlier` : `EMI falls to ${F.money(s.payment)} by the end` },
    stats: [
     { label: "Interest without prepaying", value: F.money(base.totalInterest) },
     { label: "Interest with prepaying", value: F.money(s.totalInterest) },
     { label: "New tenure", value: F.months(s.months), sub: `Was ${F.months(n)}` },
     { label: "Current EMI", value: F.money(base.payment) }
    ],
    chart: { type: "line", title: "Outstanding balance", xTitle: "Year", x, series: [{ name: "Without prepayment", values: yb.map(y => y.balance) }, { name: "With prepayment", values: x.map((_, k) => (yn[k] ? yn[k].balance : 0)), area: true }] },
    notes: ["Floating-rate home loans to individuals have no prepayment penalty in India; check your loan agreement for fixed-rate loans.", "Compare the loan rate (after tax benefits) with what the money could earn elsewhere before prepaying."]
   };
  },
  how: ["Both schedules use the same rate; extra payments go straight to principal.", "Keep EMI: the loan ends sooner. Lower EMI: the EMI is recalculated for the remaining months after each prepayment."]
 },

 {
  id: "debt-payoff", cat: "loans", icon: "⛓", title: "Debt payoff: snowball vs avalanche", desc: "A month-by-month plan to clear several debts, comparing the snowball and avalanche methods.",
  hi: ["कर्ज़ चुकाना: स्नोबॉल बनाम एवलांच", "कई कर्ज़ चुकाने की मासिक योजना, स्नोबॉल और एवलांच तरीक़ों की तुलना।"],
  keywords: "debt snowball avalanche payoff multiple loans credit card plan",
  inputs: [
   { id: "debts", type: "rows", label: "Your debts", total: "balance", addLabel: "Add debt",
     fields: [{ key: "name", label: "Debt", type: "text", width: "1.2fr" }, { key: "balance", label: "Balance", type: "money" }, { key: "rate", label: "Rate", type: "percent", width: "0.8fr" }, { key: "min", label: "Min. payment", type: "money" }],
     value: [
      { name: "Credit card", balance: 80000, rate: 42, min: 4000 }, { name: "Personal loan", balance: 250000, rate: 14, min: 8500 },
      { name: "Car loan", balance: 400000, rate: 9.5, min: 9800 }, { name: "Consumer EMI", balance: 30000, rate: 18, min: 3000 }
     ], newRow: () => ({ name: "", balance: 0, rate: 0, min: 0 }) },
   { id: "budget", type: "money", label: "Total you can pay each month", min: 1000, max: 2000000, step: 1000, value: 35000 },
   { id: "method", type: "select", label: "Method", value: "avalanche", options: [{ value: "avalanche", label: "Avalanche (highest rate first)" }, { value: "snowball", label: "Snowball (smallest balance first)" }] }
  ],
  compute(v, F) {
   const debts = v.debts.filter(d => Number(d.balance) > 0);
   if (!debts.length) return { error: "Add at least one debt with a balance." };
   const mins = debts.reduce((s, d) => s + (Number(d.min) || 0), 0);
   if (v.budget < mins) return { error: `Your budget must at least cover the minimum payments (${F.money(mins)}).` };
   const a = payDebts(debts, v.budget, v.method), other = payDebts(debts, v.budget, v.method === "avalanche" ? "snowball" : "avalanche");
   if (!a.done) return { error: "At this budget the debts are not cleared within 50 years. Increase the monthly amount." };
   const name = m => (m === "avalanche" ? "Avalanche" : "Snowball");
   const otherName = name(v.method === "avalanche" ? "snowball" : "avalanche");
   const len = Math.max(a.totals.length, other.totals.length), x = [];
   for (let m = 0; m < len; m++) x.push(String(m));
   const pad = arr => x.map((_, k) => (k < arr.length ? arr[k] : 0));
   const order = a.list.slice().sort((p, q) => p.cleared - q.cleared);
   return {
    hero: { label: "Debt-free in", value: F.months(a.months), tone: "pos", sub: `${name(v.method)} method` },
    stats: [
     { label: "Total interest paid", value: F.money(a.totalInterest), tone: "warn" },
     { label: `${otherName} would take`, value: F.months(other.months), sub: `Interest ${F.money(other.totalInterest)}` },
     { label: "Difference in interest", value: F.money(Math.abs(other.totalInterest - a.totalInterest)), sub: a.totalInterest <= other.totalInterest ? `${name(v.method)} saves this` : `${otherName} saves this` }
    ],
    chart: { type: "line", title: "Total debt remaining", xTitle: "Month", x, series: [{ name: name(v.method), values: pad(a.totals), area: true }, { name: otherName, values: pad(other.totals), dashed: true }] },
    table: { title: "Payoff order", open: true, file: "payoff-order", head: ["Order", "Debt", "Cleared in", "Interest paid"], rows: order.map((d, k) => [String(k + 1), d.name, F.months(d.cleared), F.money(d.interest)]) },
    notes: ["Avalanche saves the most interest. Snowball clears small debts first, which many people find easier to stick with.", "When a debt is cleared, its minimum payment rolls over to the next debt."]
   };
  },
  how: ["Every month: add interest, pay each minimum, then put the rest of the budget on the target debt.", "Avalanche targets the highest interest rate; snowball targets the smallest balance."]
 },

 {
  id: "credit-card", cat: "loans", icon: "▭", title: "Credit card payoff", desc: "How long a card balance takes to clear on minimum payments versus a fixed monthly amount.",
  hi: ["क्रेडिट कार्ड भुगतान", "मिनिमम पेमेंट बनाम तय मासिक राशि से कार्ड बकाया चुकाने में कितना समय लगेगा।"],
  keywords: "credit card payoff minimum due interest apr balance",
  inputs: [
   { id: "balance", type: "money", label: "Card balance", min: 1000, max: 10000000, step: 1000, value: 100000 },
   { id: "apr", type: "percent", label: "Interest rate per year", min: 1, max: 60, step: 0.5, value: 42, help: "Indian cards often charge 3–3.75% a month (36–45% a year)." },
   { id: "gst", type: "percent", label: "GST on interest", min: 0, max: 28, step: 1, value: 18 },
   { id: "minPct", type: "percent", label: "Minimum due (% of balance)", min: 1, max: 10, step: 0.5, value: 5 },
   { id: "minFloor", type: "money", label: "Minimum due floor", min: 0, max: 5000, step: 50, value: 200, slider: false },
   { id: "fixed", type: "money", label: "Fixed monthly payment", min: 500, max: 1000000, step: 500, value: 10000 }
  ],
  compute(v, F) {
   const apr = v.apr / 100, gst = v.gst / 100;
   const firstInterest = (v.balance * apr / 12) * (1 + gst);
   if (v.fixed <= firstInterest) return { error: `The fixed payment must be more than the first month's interest (${F.money(firstInterest)}).` };
   const fixed = cardPayoff(v.balance, apr, gst, () => v.fixed);
   const min = cardPayoff(v.balance, apr, gst, b => Math.max(b * v.minPct / 100, v.minFloor));
   const len = Math.max(fixed.path.length, min.path.length), x = [];
   for (let m = 0; m < len; m++) x.push(String(m));
   const pad = arr => x.map((_, k) => (k < arr.length ? arr[k] : 0));
   return {
    hero: { label: `Paying ${F.money(v.fixed)} a month clears it in`, value: F.months(fixed.months), tone: "pos", sub: `Interest and GST ${F.money(fixed.interest)}` },
    stats: [
     { label: "Paying only the minimum", value: min.done ? F.months(min.months) : "Over 50 years", tone: "neg" },
     { label: "Interest on minimum payments", value: F.money(min.interest), tone: "neg" },
     { label: "You save by paying fixed", value: F.money(min.interest - fixed.interest), tone: "pos" }
    ],
    chart: { type: "line", title: "Card balance over time", xTitle: "Month", x, series: [{ name: "Fixed payment", values: pad(fixed.path), area: true }, { name: "Minimum payment only", values: pad(min.path), dashed: true }] },
    notes: ["Interest is charged on the whole balance, and new purchases lose the interest-free period while a balance is carried.", "Moving the balance to a cheaper personal loan or EMI conversion can cut the cost sharply."]
   };
  },
  how: ["Each month: interest = balance × annual rate ÷ 12, plus GST on that interest; then the payment is deducted.", "Minimum due = the larger of the minimum % of the balance and the floor amount."]
 },

 {
  id: "refinance-loan", cat: "loans", icon: "⟲", title: "Loan refinancing (student or personal loan)", desc: "Compare your current loan with a refinance offer: new EMI, lifetime interest and break-even.",
  hi: ["लोन रीफ़ाइनेंस (एजुकेशन या पर्सनल लोन)", "मौजूदा लोन की रीफ़ाइनेंस ऑफ़र से तुलना: नई EMI, कुल ब्याज और ब्रेक-ईवन।"],
  keywords: "refinance student loan education loan balance transfer lower rate",
  inputs: [
   { id: "balance", type: "money", label: "Outstanding balance", min: 10000, max: 50000000, step: 10000, value: 1500000 },
   { id: "rate", type: "percent", label: "Current interest rate", min: 1, max: 30, step: 0.05, value: 11 },
   { id: "years", type: "years", label: "Remaining tenure", min: 1, max: 30, step: 1, value: 8 },
   { id: "newRate", type: "percent", label: "New interest rate", min: 1, max: 30, step: 0.05, value: 9 },
   { id: "newYears", type: "years", label: "New tenure", min: 1, max: 30, step: 1, value: 8 },
   { id: "fees", type: "money", label: "Processing and switching fees", min: 0, max: 1000000, step: 1000, value: 15000 }
  ],
  compute(v, F) {
   const n0 = v.years * 12, n1 = v.newYears * 12;
   const emi0 = FinMath.emi(v.balance, v.rate / 100, n0), emi1 = FinMath.emi(v.balance, v.newRate / 100, n1);
   const int0 = emi0 * n0 - v.balance, int1 = emi1 * n1 - v.balance;
   const net = int0 - int1 - v.fees, monthly = emi0 - emi1;
   const be = monthly > 0 ? Math.ceil(v.fees / monthly) : null;
   return {
    hero: { label: "Net lifetime saving", value: F.money(net), tone: net >= 0 ? "pos" : "neg", sub: net >= 0 ? "After fees" : "Refinancing costs more overall" },
    stats: [
     { label: "Current EMI", value: F.money(emi0) },
     { label: "New EMI", value: F.money(emi1), sub: `${monthly >= 0 ? "Saves" : "Adds"} ${F.money(Math.abs(monthly))} a month` },
     { label: "Fees recovered in", value: be === null ? "—" : F.months(be) },
     { label: "Interest: current vs new", value: `${F.compact(int0)} vs ${F.compact(int1)}` }
    ],
    chart: { type: "bar", title: "Lifetime cost of each option", x: ["Interest", "Fees", "Total cost"], series: [{ name: "Keep current loan", values: [int0, 0, int0] }, { name: "Refinance", values: [int1, v.fees, int1 + v.fees] }] },
    notes: ["A longer new tenure lowers the EMI but can raise total interest; compare lifetime cost, not just the EMI.", "Education-loan interest is deductible under Section 80E (old regime) for 8 years; check the new lender qualifies."]
   };
  },
  how: ["EMIs use the standard formula for each rate and tenure.", "Net saving = (current total interest − new total interest) − fees.", "Break-even = fees ÷ monthly EMI saving."]
 },

 {
  id: "affordability", cat: "loans", icon: "⌂", title: "Loan eligibility & affordability", desc: "How much you can borrow based on income and existing EMIs, and the home budget it allows.",
  hi: ["लोन पात्रता और क्षमता", "आय और मौजूदा EMI के आधार पर कितना लोन मिल सकता है, और कितना घर का बजट बनता है।"],
  keywords: "loan eligibility affordability how much can i borrow foir home budget",
  inputs: [
   { id: "income", type: "money", label: "Monthly take-home income", min: 10000, max: 5000000, step: 5000, value: 120000 },
   { id: "existing", type: "money", label: "Existing EMIs", min: 0, max: 2000000, step: 1000, value: 10000 },
   { id: "foir", type: "percent", label: "Share of income for all EMIs (FOIR)", min: 20, max: 70, step: 5, value: 50, help: "Lenders typically allow 40–60% of income for all EMIs combined." },
   { id: "rate", type: "percent", label: "Interest rate", min: 1, max: 20, step: 0.05, value: 8.5 },
   { id: "years", type: "years", label: "Tenure", min: 1, max: 30, step: 1, value: 20 },
   { id: "down", type: "money", label: "Down payment you have", min: 0, max: 100000000, step: 50000, value: 1500000 }
  ],
  compute(v, F) {
   const emi = v.income * v.foir / 100 - v.existing;
   if (emi <= 0) return { error: "Existing EMIs already use up the allowed share of income." };
   const i = v.rate / 100 / 12, n = v.years * 12;
   const loan = i === 0 ? emi * n : (emi * (1 - Math.pow(1 + i, -n))) / i;
   return {
    hero: { label: "Maximum loan amount", value: F.money(loan), sub: F.words(loan) },
    stats: [
     { label: "Maximum new EMI", value: F.money(emi) },
     { label: "Home budget with down payment", value: F.money(loan + v.down) },
     { label: "Total EMIs as share of income", value: F.pct(v.foir, 0) }
    ],
    chart: { type: "donut", title: "Your monthly income", items: [{ label: "Existing EMIs", value: v.existing }, { label: "New loan EMI", value: emi }, { label: "Left for living costs", value: v.income - emi - v.existing }], center: { label: "Income", value: F.compact(v.income) } },
    notes: ["Banks also look at your credit score, age, job stability and the property's value (loan-to-value limits of 75–90% for home loans).", "Borrowing the maximum leaves little room for emergencies; many planners keep total EMIs under 35–40% of take-home pay."]
   };
  },
  how: ["Maximum EMI = income × FOIR − existing EMIs.", "Loan = EMI × (1 − (1 + i)^−n) ÷ i, where i = rate ÷ 12 and n = months."]
 }
 );
})();
