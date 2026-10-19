// Calculator definitions: investing and wealth building. See calc-defs-personal.js for the definition format.
(function () {
 // Yearly rows for a stacked "invested vs growth" chart and table.
 const growthChart = (title, x, invested, values) => ({
  type: "line", title, xTitle: "Year", x, stacked: true,
  series: [{ name: "Amount invested", values: invested }, { name: "Growth", values: values.map((val, i) => val - invested[i]) }]
 });
 const growthTable = (F, x, invested, values, extra) => ({
  title: "Year-by-year growth", file: "yearly", head: ["Year", "Invested", "Growth", "Value"].concat(extra ? [extra.name] : []),
  rows: x.map((y, i) => [y, F.money(invested[i]), F.money(values[i] - invested[i]), F.money(values[i])].concat(extra ? [extra.fmt(i)] : []))
 });

 window.CALCS = window.CALCS || [];
 window.CALCS.push(
 {
  id: "compound-interest", cat: "invest", icon: "∿", title: "Compound interest", desc: "See how money grows when interest earns interest, with optional monthly additions.",
  hi: ["चक्रवृद्धि ब्याज", "जब ब्याज पर भी ब्याज मिलता है तो पैसा कैसे बढ़ता है, मासिक जोड़ के साथ।"],
  keywords: "compound interest growth compounding frequency savings",
  inputs: [
   { id: "principal", type: "money", label: "Starting amount", min: 0, max: 100000000, step: 10000, value: 100000 },
   { id: "monthly", type: "money", label: "Monthly addition", min: 0, max: 1000000, step: 1000, value: 5000 },
   { id: "rate", type: "percent", label: "Annual interest rate", min: 0, max: 30, step: 0.1, value: 8 },
   { id: "years", type: "years", label: "Years", min: 1, max: 50, step: 1, value: 15 },
   { id: "freq", type: "select", label: "Compounding", value: "4", dropdown: true, options: [{ value: "1", label: "Yearly" }, { value: "2", label: "Half-yearly" }, { value: "4", label: "Quarterly" }, { value: "12", label: "Monthly" }, { value: "365", label: "Daily" }] }
  ],
  compute(v, F) {
   const n = Number(v.freq), r = v.rate / 100, m = Math.pow(1 + r / n, n / 12) - 1;
   let bal = v.principal, inv = v.principal;
   const x = ["0"], invested = [inv], values = [bal];
   for (let mo = 1; mo <= v.years * 12; mo++) {
    bal = bal * (1 + m) + v.monthly;
    inv += v.monthly;
    if (mo % 12 === 0) { x.push(String(mo / 12)); invested.push(inv); values.push(bal); }
   }
   return {
    hero: { label: `Value after ${v.years} years`, value: F.money(bal), sub: F.words(bal) },
    stats: [
     { label: "Total invested", value: F.money(inv) },
     { label: "Interest earned", value: F.money(bal - inv), tone: "pos" },
     { label: "Effective annual rate", value: F.pct((Math.pow(1 + r / n, n) - 1) * 100) }
    ],
    chart: growthChart("Invested amount and interest", x, invested, values),
    table: growthTable(F, x, invested, values)
   };
  },
  how: ["Monthly growth rate = (1 + annual rate ÷ compounding periods)^(periods ÷ 12) − 1.", "Each month: balance = balance × (1 + monthly rate) + monthly addition (added at month end).", "Effective annual rate = (1 + rate ÷ periods)^periods − 1."]
 },

 {
  id: "sip", cat: "invest", icon: "₹", title: "SIP calculator", desc: "Future value of a fixed monthly investment in mutual funds.",
  hi: ["SIP कैलकुलेटर", "म्यूचुअल फ़ंड में तय मासिक निवेश की भविष्य की राशि।"],
  keywords: "sip systematic investment plan mutual fund monthly",
  inputs: [
   { id: "monthly", type: "money", label: "Monthly investment", min: 500, max: 1000000, step: 500, value: 10000 },
   { id: "rate", type: "percent", label: "Expected annual return", min: 1, max: 30, step: 0.5, value: 12 },
   { id: "years", type: "years", label: "Investment period", min: 1, max: 40, step: 1, value: 15 },
   { id: "inflation", type: "percent", label: "Inflation (for today's-money value)", min: 0, max: 12, step: 0.5, value: 6 }
  ],
  compute(v, F) {
   const r = v.rate / 100, x = [], invested = [], values = [];
   for (let y = 0; y <= v.years; y++) { x.push(String(y)); invested.push(v.monthly * 12 * y); values.push(FinMath.sipFV(v.monthly, r, y * 12)); }
   const fv = values[v.years], inv = invested[v.years], real = fv / Math.pow(1 + v.inflation / 100, v.years);
   return {
    hero: { label: "Estimated value", value: F.money(fv), sub: F.words(fv) },
    stats: [
     { label: "Total invested", value: F.money(inv) },
     { label: "Estimated gains", value: F.money(fv - inv), tone: "pos" },
     { label: "Value in today's money", value: F.money(real), sub: `At ${F.pct(v.inflation, 1)} inflation` }
    ],
    chart: growthChart("Invested amount and estimated gains", x, invested, values),
    table: growthTable(F, x, invested, values),
    notes: ["Mutual fund returns are not fixed. Equity funds can fall sharply in some years; use a conservative return.", "Gains on equity funds are taxed as capital gains when you redeem (see the capital gains tax calculator)."]
   };
  },
  how: ["Future value = P × [((1 + i)^n − 1) ÷ i] × (1 + i), where i = annual return ÷ 12 and n = months.", "Assumes you invest at the start of each month."]
 },

 {
  id: "step-up-sip", cat: "invest", icon: "⇗", title: "Step-up SIP", desc: "A SIP that rises every year with your income, compared with a flat SIP.",
  hi: ["स्टेप-अप SIP", "हर साल आय के साथ बढ़ने वाला SIP, सामान्य SIP से तुलना।"],
  keywords: "step up sip top up increasing annual increase",
  inputs: [
   { id: "monthly", type: "money", label: "Starting monthly investment", min: 500, max: 1000000, step: 500, value: 10000 },
   { id: "step", type: "percent", label: "Yearly increase", min: 0, max: 50, step: 1, value: 10 },
   { id: "rate", type: "percent", label: "Expected annual return", min: 1, max: 30, step: 0.5, value: 12 },
   { id: "years", type: "years", label: "Investment period", min: 1, max: 40, step: 1, value: 15 }
  ],
  compute(v, F) {
   const i = v.rate / 100 / 12, s = v.step / 100;
   let bal = 0, inv = 0;
   const x = ["0"], stepVals = [0], flatVals = [0], invested = [0], rows = [];
   for (let y = 1; y <= v.years; y++) {
    const amt = v.monthly * Math.pow(1 + s, y - 1);
    for (let k = 0; k < 12; k++) { bal = (bal + amt) * (1 + i); inv += amt; }
    x.push(String(y)); stepVals.push(bal); invested.push(inv); flatVals.push(FinMath.sipFV(v.monthly, v.rate / 100, y * 12));
    rows.push([String(y), F.money(amt), F.money(inv), F.money(bal)]);
   }
   const flat = flatVals[v.years];
   return {
    hero: { label: "Estimated value with step-up", value: F.money(bal), sub: F.words(bal) },
    stats: [
     { label: "Total invested", value: F.money(inv) },
     { label: "Estimated gains", value: F.money(bal - inv), tone: "pos" },
     { label: "Flat SIP would reach", value: F.money(flat), sub: `Step-up adds ${F.money(bal - flat)}` },
     { label: "Monthly SIP in final year", value: F.money(v.monthly * Math.pow(1 + s, v.years - 1)) }
    ],
    chart: { type: "line", title: "Step-up SIP against a flat SIP", xTitle: "Year", x, series: [{ name: "Step-up SIP value", values: stepVals, area: true }, { name: "Flat SIP value", values: flatVals }, { name: "Invested (step-up)", values: invested, dashed: true }] },
    table: { title: "Year-by-year", file: "step-up", head: ["Year", "Monthly SIP", "Invested so far", "Value"], rows }
   };
  },
  how: ["The monthly amount rises by the step-up % at the start of each year.", "Each month: balance = (balance + this year's SIP) × (1 + annual return ÷ 12)."]
 },

 {
  id: "lumpsum", cat: "invest", icon: "◉", title: "Lump sum investment", desc: "What a one-time investment can grow to over time.",
  hi: ["एकमुश्त निवेश", "एक बार के निवेश की समय के साथ बढ़ी हुई राशि।"],
  keywords: "lumpsum one time investment growth",
  inputs: [
   { id: "amount", type: "money", label: "Investment amount", min: 1000, max: 100000000, step: 5000, value: 500000 },
   { id: "rate", type: "percent", label: "Expected annual return", min: 1, max: 30, step: 0.5, value: 12 },
   { id: "years", type: "years", label: "Investment period", min: 1, max: 40, step: 1, value: 10 },
   { id: "inflation", type: "percent", label: "Inflation (for today's-money value)", min: 0, max: 12, step: 0.5, value: 6 }
  ],
  compute(v, F) {
   const r = v.rate / 100, x = [], invested = [], values = [];
   for (let y = 0; y <= v.years; y++) { x.push(String(y)); invested.push(v.amount); values.push(v.amount * Math.pow(1 + r, y)); }
   const fv = values[v.years];
   return {
    hero: { label: "Estimated value", value: F.money(fv), sub: F.words(fv) },
    stats: [
     { label: "Estimated gains", value: F.money(fv - v.amount), tone: "pos" },
     { label: "Money multiplies", value: `${F.num(fv / v.amount, 2)}×` },
     { label: "Value in today's money", value: F.money(fv / Math.pow(1 + v.inflation / 100, v.years)) }
    ],
    chart: growthChart("Investment and estimated gains", x, invested, values),
    table: growthTable(F, x, invested, values)
   };
  },
  how: ["Future value = amount × (1 + annual return)^years."]
 },

 {
  id: "swp", cat: "invest", icon: "⇘", title: "SWP (systematic withdrawal)", desc: "How long a corpus lasts when you withdraw a monthly amount that rises each year.",
  hi: ["SWP (सिस्टमैटिक निकासी)", "हर साल बढ़ती मासिक निकासी के साथ आपका कोष कितने समय तक चलेगा।"],
  keywords: "swp systematic withdrawal plan monthly income pension corpus",
  inputs: [
   { id: "corpus", type: "money", label: "Starting corpus", min: 100000, max: 500000000, step: 50000, value: 5000000 },
   { id: "withdraw", type: "money", label: "Monthly withdrawal", min: 1000, max: 5000000, step: 1000, value: 30000 },
   { id: "increase", type: "percent", label: "Yearly increase in withdrawal", min: 0, max: 15, step: 0.5, value: 5 },
   { id: "rate", type: "percent", label: "Expected annual return", min: 0, max: 20, step: 0.5, value: 8 },
   { id: "years", type: "years", label: "Years to plan for", min: 1, max: 50, step: 1, value: 25 }
  ],
  compute(v, F) {
   const i = v.rate / 100 / 12;
   let bal = v.corpus, total = 0, lastedMonths = null;
   const x = ["0"], balances = [bal], withdrawn = [0], rows = [];
   for (let y = 1; y <= v.years; y++) {
    const w = v.withdraw * Math.pow(1 + v.increase / 100, y - 1);
    for (let k = 1; k <= 12; k++) {
     const take = Math.min(w, bal);
     bal = (bal - take) * (1 + i);
     total += take;
     if (bal <= 0.5 && lastedMonths === null) { lastedMonths = (y - 1) * 12 + k; bal = 0; }
    }
    x.push(String(y)); balances.push(bal); withdrawn.push(total);
    rows.push([String(y), F.money(w), F.money(total), F.money(bal)]);
   }
   return {
    hero: lastedMonths ? { label: "Corpus runs out after", value: F.months(lastedMonths), tone: "neg", sub: `Before your ${v.years}-year plan ends` } : { label: `Balance left after ${v.years} years`, value: F.money(bal), tone: "pos", sub: "The corpus lasts the full period" },
    stats: [
     { label: "Total withdrawn", value: F.money(total) },
     { label: "Starting withdrawal rate", value: F.pct(((v.withdraw * 12) / v.corpus) * 100, 1), sub: "First year's withdrawals ÷ corpus" },
     { label: "Final monthly withdrawal", value: F.money(v.withdraw * Math.pow(1 + v.increase / 100, v.years - 1)) }
    ],
    chart: { type: "line", title: "Corpus balance and money withdrawn", xTitle: "Year", x, series: [{ name: "Corpus balance", values: balances, area: true }, { name: "Total withdrawn", values: withdrawn }] },
    table: { title: "Year-by-year", file: "swp", head: ["Year", "Monthly withdrawal", "Withdrawn so far", "Balance"], rows },
    notes: ["Each withdrawal from a mutual fund is a redemption, so capital gains tax applies to the gain portion.", "Returns are not steady; a fall in the early years shortens how long the corpus lasts (sequence risk)."]
   };
  },
  how: ["Each month: withdraw first, then the rest grows at annual return ÷ 12.", "The withdrawal rises by the yearly increase at the start of each year."]
 },

 {
  id: "drip", cat: "invest", icon: "↻", title: "Dividend reinvestment (DRIP)", desc: "Compare reinvesting dividends into more shares with taking them as cash.",
  hi: ["डिविडेंड रीइन्वेस्टमेंट (DRIP)", "डिविडेंड से और शेयर ख़रीदने बनाम नकद लेने की तुलना।"],
  keywords: "drip dividend reinvestment yield income shares",
  inputs: [
   { id: "amount", type: "money", label: "Initial investment", min: 1000, max: 100000000, step: 5000, value: 500000 },
   { id: "price", type: "money", label: "Share price today", min: 1, max: 100000, step: 1, value: 500 },
   { id: "yield", type: "percent", label: "Dividend yield", min: 0, max: 15, step: 0.1, value: 3 },
   { id: "divGrowth", type: "percent", label: "Yearly dividend growth", min: 0, max: 20, step: 0.5, value: 6 },
   { id: "priceGrowth", type: "percent", label: "Yearly share price growth", min: -10, max: 25, step: 0.5, value: 7 },
   { id: "tax", type: "percent", label: "Tax on dividends", min: 0, max: 40, step: 1, value: 20, help: "In India dividends are taxed at your income-tax slab rate." },
   { id: "years", type: "years", label: "Years", min: 1, max: 40, step: 1, value: 20 }
  ],
  compute(v, F) {
   if (!(v.price > 0)) return { error: "Enter a share price above zero." };
   let price = v.price, dps = v.price * (v.yield / 100);
   let shares = v.amount / v.price, sharesCash = shares, cash = 0;
   const x = ["0"], withDrip = [v.amount], withoutDrip = [v.amount], rows = [];
   for (let y = 1; y <= v.years; y++) {
    const net = dps * (1 - v.tax / 100);
    price *= 1 + v.priceGrowth / 100;
    shares += (shares * net) / price;
    cash += sharesCash * net;
    dps *= 1 + v.divGrowth / 100;
    x.push(String(y)); withDrip.push(shares * price); withoutDrip.push(sharesCash * price + cash);
    rows.push([String(y), F.num(shares, 1), F.money(price), F.money(shares * price), F.money(sharesCash * price + cash)]);
   }
   const a = withDrip[v.years], b = withoutDrip[v.years];
   return {
    hero: { label: "Value with dividends reinvested", value: F.money(a), sub: F.words(a) },
    stats: [
     { label: "Value taking dividends as cash", value: F.money(b), sub: `Includes ${F.money(cash)} of cash dividends` },
     { label: "Extra from reinvesting", value: F.money(a - b), tone: a >= b ? "pos" : "neg" },
     { label: "Shares owned at the end", value: F.num(shares, 1), sub: `Started with ${F.num(v.amount / v.price, 1)}` },
     { label: "Dividend income next year", value: F.money(shares * dps * (1 - v.tax / 100)), sub: "After tax, with DRIP" }
    ],
    chart: { type: "line", title: "Reinvesting against taking cash", xTitle: "Year", x, series: [{ name: "Dividends reinvested", values: withDrip, area: true }, { name: "Dividends taken as cash", values: withoutDrip }] },
    table: { title: "Year-by-year", file: "drip", head: ["Year", "Shares (DRIP)", "Share price", "Value with DRIP", "Value without DRIP"], rows }
   };
  },
  how: ["Each year the dividend per share = previous dividend × (1 + dividend growth); the first year's is price × yield.", "With DRIP, the after-tax dividend buys more shares at that year's price.", "Without DRIP, after-tax dividends accumulate as cash (not invested)."]
 },

 {
  id: "roi", cat: "invest", icon: "%", title: "Return on investment (ROI)", desc: "Percentage profit or loss on an investment, and the yearly rate it represents.",
  hi: ["निवेश पर रिटर्न (ROI)", "किसी निवेश पर प्रतिशत लाभ या हानि, और उसकी सालाना दर।"],
  keywords: "roi return on investment profit percentage annualised",
  inputs: [
   { id: "invested", type: "money", label: "Amount invested", min: 1, max: 100000000, step: 1000, value: 100000 },
   { id: "returned", type: "money", label: "Amount returned (sale value + income)", min: 0, max: 100000000, step: 1000, value: 160000 },
   { id: "costs", type: "money", label: "Costs and fees", min: 0, max: 10000000, step: 100, value: 1000 },
   { id: "years", type: "years", label: "Holding period", min: 0, max: 50, step: 0.5, value: 3 }
  ],
  compute(v, F) {
   if (!(v.invested > 0)) return { error: "Enter the amount invested." };
   const gain = v.returned - v.invested - v.costs, roi = (gain / v.invested) * 100;
   const annual = v.years > 0 && v.returned - v.costs > 0 ? (Math.pow((v.returned - v.costs) / v.invested, 1 / v.years) - 1) * 100 : null;
   return {
    hero: { label: "Return on investment", value: F.pct(roi), tone: roi >= 0 ? "pos" : "neg", sub: `${gain >= 0 ? "Profit" : "Loss"} of ${F.money(Math.abs(gain))}` },
    stats: [
     { label: "Annualised return (CAGR)", value: annual === null ? "—" : F.pct(annual), sub: annual === null ? "Add a holding period" : `Over ${F.years(v.years)}` },
     { label: "Net amount back", value: F.money(v.returned - v.costs) }
    ],
    chart: { type: "bar", title: "Invested, returned and net gain", x: ["Invested", "Returned (after costs)", "Net gain"], series: [{ name: "Amount", values: [v.invested, v.returned - v.costs, gain] }] },
    notes: ["ROI ignores time. A 60% return over 3 years and over 10 years are very different; compare annualised returns."]
   };
  },
  how: ["ROI = (amount returned − amount invested − costs) ÷ amount invested.", "Annualised return = (net amount back ÷ amount invested)^(1 ÷ years) − 1."]
 },

 {
  id: "cagr", cat: "invest", icon: "⤴", title: "CAGR", desc: "The steady yearly growth rate that turns a start value into an end value.",
  hi: ["CAGR", "वह स्थिर सालाना दर जो शुरुआती मूल्य को अंतिम मूल्य तक ले जाती है।"],
  keywords: "cagr compound annual growth rate return",
  inputs: [
   { id: "start", type: "money", label: "Start value", min: 1, max: 100000000, step: 1000, value: 100000 },
   { id: "end", type: "money", label: "End value", min: 0, max: 1000000000, step: 1000, value: 180000 },
   { id: "years", type: "years", label: "Years", min: 0.5, max: 50, step: 0.5, value: 5 }
  ],
  compute(v, F) {
   if (!(v.start > 0 && v.end > 0 && v.years > 0)) return { error: "Start value, end value and years must be above zero." };
   const g = Math.pow(v.end / v.start, 1 / v.years) - 1;
   const x = [], vals = [];
   for (let y = 0; y <= Math.ceil(v.years); y++) { const yy = Math.min(y, v.years); x.push(String(+yy.toFixed(1))); vals.push(v.start * Math.pow(1 + g, yy)); }
   return {
    hero: { label: "Compound annual growth rate", value: F.pct(g * 100), tone: g >= 0 ? "pos" : "neg" },
    stats: [{ label: "Absolute return", value: F.pct((v.end / v.start - 1) * 100) }, { label: "Money multiplied", value: `${F.num(v.end / v.start, 2)}×` }],
    chart: { type: "line", title: "Path at a steady CAGR", xTitle: "Year", x, series: [{ name: "Value", values: vals, area: true }] },
    notes: ["Real investments do not grow in a straight line; CAGR smooths out the ups and downs."]
   };
  },
  how: ["CAGR = (end value ÷ start value)^(1 ÷ years) − 1."]
 },

 {
  id: "xirr", cat: "invest", icon: "⧗", title: "XIRR (returns on irregular investments)", desc: "Annualised return when you invested and withdrew different amounts on different dates.",
  hi: ["XIRR (अनियमित निवेश पर रिटर्न)", "अलग-अलग तारीख़ों पर अलग-अलग राशि निवेश या निकासी पर सालाना रिटर्न।"],
  keywords: "xirr irr mutual fund returns irregular cash flows dates",
  inputs: [
   { id: "flows", type: "rows", label: "Investments and withdrawals", addLabel: "Add transaction",
     fields: [{ key: "date", label: "Date", type: "date", width: "1.1fr" }, { key: "kind", label: "Type", type: "select", width: "0.9fr", options: [{ value: "in", label: "Invested" }, { value: "out", label: "Withdrew" }] }, { key: "amount", label: "Amount", type: "money" }],
     value: [
      { date: "2023-01-10", kind: "in", amount: 50000 }, { date: "2023-07-10", kind: "in", amount: 50000 }, { date: "2024-01-10", kind: "in", amount: 50000 },
      { date: "2024-07-10", kind: "in", amount: 50000 }, { date: "2025-03-15", kind: "out", amount: 20000 }, { date: "2025-07-10", kind: "in", amount: 50000 }
     ], newRow: () => ({ date: new Date().toISOString().slice(0, 10), kind: "in", amount: 10000 }) },
   { id: "current", type: "money", label: "Current value (as of today)", min: 0, max: 1000000000, step: 1000, value: 330000 }
  ],
  compute(v, F) {
   const list = v.flows.filter(r => r.date && Number(r.amount) > 0).map(r => ({ date: new Date(r.date + "T00:00:00"), amount: r.kind === "out" ? Number(r.amount) : -Number(r.amount) }));
   if (!list.length) return { error: "Add at least one investment with a date and amount." };
   const today = new Date(); today.setHours(0, 0, 0, 0);
   list.push({ date: today, amount: v.current });
   list.sort((a, b) => a.date - b.date);
   if (list.some(c => isNaN(c.date))) return { error: "Check the dates." };
   const rate = FinMath.xirr(list);
   const invested = list.filter(c => c.amount < 0).reduce((s, c) => s - c.amount, 0);
   const withdrawn = list.filter(c => c.amount > 0).reduce((s, c) => s + c.amount, 0) - v.current;
   const gain = v.current + withdrawn - invested;
   if (rate === null) return { error: "Could not find a return for these cash flows. Check that you have both money in and a current value." };
   return {
    hero: { label: "XIRR (annualised return)", value: F.pct(rate * 100), tone: rate >= 0 ? "pos" : "neg" },
    stats: [
     { label: "Total invested", value: F.money(invested) },
     { label: "Withdrawn so far", value: F.money(withdrawn) },
     { label: "Current value", value: F.money(v.current) },
     { label: "Absolute gain", value: F.money(gain), tone: gain >= 0 ? "pos" : "neg" }
    ],
    notes: ["XIRR weights each cash flow by how long the money was invested, so it is the right measure for SIPs and irregular top-ups.", "Your mutual fund statement (CAS) lists the transaction dates and amounts to enter here."]
   };
  },
  how: ["Finds the rate r where the sum of each cash flow ÷ (1 + r)^(days since first cash flow ÷ 365) equals zero.", "Investments count as money out (negative); withdrawals and today's value count as money in (positive)."]
 },

 {
  id: "fd", cat: "invest", icon: "▣", currency: "INR", title: "Fixed deposit (FD)", desc: "Maturity value and interest on a bank fixed deposit.",
  hi: ["फ़िक्स्ड डिपॉज़िट (FD)", "बैंक FD पर मैच्योरिटी राशि और ब्याज।"],
  keywords: "fd fixed deposit bank interest maturity",
  inputs: [
   { id: "principal", type: "money", label: "Deposit amount", min: 1000, max: 100000000, step: 5000, value: 100000 },
   { id: "rate", type: "percent", label: "Interest rate", min: 1, max: 15, step: 0.05, value: 7 },
   { id: "years", type: "years", label: "Tenure", min: 0.25, max: 10, step: 0.25, value: 3 },
   { id: "freq", type: "select", label: "Compounding", value: "4", options: [{ value: "4", label: "Quarterly" }, { value: "12", label: "Monthly" }, { value: "2", label: "Half-yearly" }, { value: "1", label: "Yearly" }] }
  ],
  compute(v, F) {
   const n = Number(v.freq), r = v.rate / 100, mat = v.principal * Math.pow(1 + r / n, n * v.years);
   const x = [], inv = [], vals = [];
   for (let y = 0; y <= Math.ceil(v.years); y++) { const yy = Math.min(y, v.years); x.push(String(+yy.toFixed(2))); inv.push(v.principal); vals.push(v.principal * Math.pow(1 + r / n, n * yy)); }
   return {
    hero: { label: "Maturity amount", value: F.money(mat), sub: F.words(mat) },
    stats: [{ label: "Interest earned", value: F.money(mat - v.principal), tone: "pos" }, { label: "Effective annual yield", value: F.pct((Math.pow(1 + r / n, n) - 1) * 100) }],
    chart: growthChart("Deposit and interest", x, inv, vals),
    notes: ["FD interest is added to your income and taxed at your slab rate every year, even on cumulative FDs.", "Banks deduct TDS when the year's interest crosses the threshold; submit Form 15G/15H if your income is below the taxable limit."]
   };
  },
  how: ["Maturity = principal × (1 + rate ÷ n)^(n × years), where n = compounding periods a year."]
 },

 {
  id: "rd", cat: "invest", icon: "▤", currency: "INR", title: "Recurring deposit (RD)", desc: "Maturity value of a fixed monthly deposit with quarterly compounding.",
  hi: ["रेकरिंग डिपॉज़िट (RD)", "तिमाही चक्रवृद्धि के साथ तय मासिक जमा की मैच्योरिटी राशि।"],
  keywords: "rd recurring deposit monthly bank post office",
  inputs: [
   { id: "monthly", type: "money", label: "Monthly deposit", min: 100, max: 1000000, step: 500, value: 5000 },
   { id: "rate", type: "percent", label: "Interest rate", min: 1, max: 15, step: 0.05, value: 7 },
   { id: "months", type: "months", label: "Tenure", min: 6, max: 120, step: 3, value: 36 }
  ],
  compute(v, F) {
   const q = v.rate / 100 / 4;
   let mat = 0;
   for (let k = 0; k < v.months; k++) mat += v.monthly * Math.pow(1 + q, (v.months - k) / 3);
   const inv = v.monthly * v.months;
   return {
    hero: { label: "Maturity amount", value: F.money(mat), sub: F.words(mat) },
    stats: [{ label: "Total deposited", value: F.money(inv) }, { label: "Interest earned", value: F.money(mat - inv), tone: "pos" }],
    chart: { type: "donut", title: "Deposits and interest", items: [{ label: "Deposits", value: inv }, { label: "Interest", value: mat - inv }], center: { label: "Maturity", value: F.compact(mat) } },
    notes: ["RD interest is taxable at your slab rate, like FD interest."]
   };
  },
  how: ["Each instalment grows for the months left: instalment × (1 + rate ÷ 4)^(months left ÷ 3). Maturity is the sum."]
 },

 {
  id: "ppf", cat: "invest", icon: "◈", currency: "INR", title: "PPF (Public Provident Fund)", desc: "Tax-free maturity value of yearly PPF deposits over 15 years or more.",
  hi: ["PPF (पब्लिक प्रोविडेंट फ़ंड)", "15 साल या अधिक में सालाना PPF जमा की कर-मुक्त मैच्योरिटी राशि।"],
  keywords: "ppf public provident fund tax free 80c",
  inputs: [
   { id: "yearly", type: "money", label: "Yearly deposit", min: 500, max: 150000, hardMax: true, step: 500, value: 150000, help: "Minimum ₹500 and maximum ₹1.5 lakh a year." },
   { id: "rate", type: "percent", label: "Interest rate", min: 5, max: 10, step: 0.05, value: 7.1, help: "Set by the government every quarter; check the current rate." },
   { id: "years", type: "select", label: "Period", value: "15", options: [{ value: "15", label: "15 years" }, { value: "20", label: "20 years" }, { value: "25", label: "25 years" }, { value: "30", label: "30 years" }] }
  ],
  compute(v, F) {
   if (v.yearly > 150000) return { error: "PPF allows at most ₹1,50,000 a year." };
   const r = v.rate / 100, n = Number(v.years);
   let bal = 0;
   const x = ["0"], inv = [0], vals = [0];
   for (let y = 1; y <= n; y++) { bal = (bal + v.yearly) * (1 + r); x.push(String(y)); inv.push(v.yearly * y); vals.push(bal); }
   return {
    hero: { label: "Maturity amount (tax-free)", value: F.money(bal), sub: F.words(bal) },
    stats: [{ label: "Total deposited", value: F.money(v.yearly * n) }, { label: "Interest earned", value: F.money(bal - v.yearly * n), tone: "pos" }],
    chart: growthChart("Deposits and interest", x, inv, vals),
    table: growthTable(F, x, inv, vals),
    notes: ["PPF is EEE: deposits qualify for Section 80C (old regime), and interest and maturity are tax-free.", "Deposit before the 5th of April to earn interest for the whole year. After 15 years you can extend in blocks of 5 years."]
   };
  },
  how: ["Each year: balance = (balance + deposit) × (1 + rate), assuming you deposit at the start of the year."]
 },

 {
  id: "rule-72", cat: "invest", icon: "72", title: "Rule of 72", desc: "How long money takes to double, triple or quadruple at a given return.",
  hi: ["72 का नियम", "किसी रिटर्न पर पैसा कितने समय में दोगुना, तीन गुना या चार गुना होता है।"],
  keywords: "rule of 72 double money years",
  inputs: [
   { id: "rate", type: "percent", label: "Annual return", min: 1, max: 40, step: 0.5, value: 12 },
   { id: "amount", type: "money", label: "Amount", min: 1000, max: 100000000, step: 1000, value: 100000 }
  ],
  compute(v, F) {
   const r = v.rate / 100, exact = k => Math.log(k) / Math.log(1 + r);
   const yrs = Math.ceil(exact(4)), x = [], vals = [];
   for (let y = 0; y <= yrs; y++) { x.push(String(y)); vals.push(v.amount * Math.pow(1 + r, y)); }
   return {
    hero: { label: "Money doubles in about", value: F.years(exact(2)), sub: `Rule of 72 estimate: ${F.num(72 / v.rate, 1)} years` },
    stats: [{ label: "Triples in", value: F.years(exact(3)), sub: `Rule of 114: ${F.num(114 / v.rate, 1)} years` }, { label: "Quadruples in", value: F.years(exact(4)), sub: `Rule of 144: ${F.num(144 / v.rate, 1)} years` }],
    chart: { type: "line", title: `Growth of ${F.money(v.amount)}`, xTitle: "Year", x, series: [{ name: "Value", values: vals, area: true }] }
   };
  },
  how: ["Rule of 72: years to double ≈ 72 ÷ annual return in %.", "Exact: years = ln(multiple) ÷ ln(1 + return)."]
 },

 {
  id: "stock-average", cat: "invest", icon: "≈", title: "Stock average price", desc: "Average buy price across purchases, profit at today's price, and shares needed to bring the average down.",
  hi: ["शेयर औसत क़ीमत", "कई ख़रीद का औसत भाव, आज की क़ीमत पर लाभ, और औसत घटाने के लिए ज़रूरी शेयर।"],
  keywords: "stock average price averaging down buy more shares",
  inputs: [
   { id: "buys", type: "rows", label: "Your purchases", addLabel: "Add purchase",
     fields: [{ key: "qty", label: "Quantity", type: "number" }, { key: "price", label: "Price", type: "money" }],
     value: [{ qty: 50, price: 820 }, { qty: 30, price: 760 }, { qty: 20, price: 700 }], newRow: () => ({ qty: 10, price: 0 }) },
   { id: "ltp", type: "money", label: "Current market price", min: 0, max: 100000, step: 1, value: 690, slider: false },
   { id: "target", type: "money", label: "Target average (optional)", min: 0, max: 100000, step: 1, value: 720, slider: false, help: "Enter 0 to skip. Works when the current price is below your target." }
  ],
  compute(v, F) {
   const rows = v.buys.filter(r => Number(r.qty) > 0 && Number(r.price) > 0);
   if (!rows.length) return { error: "Add at least one purchase with quantity and price." };
   const qty = rows.reduce((s, r) => s + Number(r.qty), 0), cost = rows.reduce((s, r) => s + Number(r.qty) * Number(r.price), 0), avg = cost / qty;
   const stats = [{ label: "Total shares", value: F.num(qty) }, { label: "Total invested", value: F.money(cost) }];
   let callout = null;
   if (v.ltp > 0) {
    const pl = (v.ltp - avg) * qty;
    stats.push({ label: "Profit / loss at current price", value: `${F.money(pl)} (${F.pct((v.ltp / avg - 1) * 100)})`, tone: pl >= 0 ? "pos" : "neg" });
    if (v.target > 0) {
     if (v.ltp < v.target && v.target < avg) {
      const need = Math.ceil((qty * (avg - v.target)) / (v.target - v.ltp));
      callout = { tone: "info", text: `Buy ${F.num(need)} more shares at ${F.money(v.ltp)} (${F.money(need * v.ltp)}) to bring your average to ${F.money(v.target)}.` };
     } else callout = { tone: "warn", text: "To average down, the target must be between the current price and your average price." };
    }
   }
   return { hero: { label: "Average buy price", value: F.money(avg, 2) }, stats, callout, notes: ["Averaging down adds to a losing position. Check why the price fell before buying more."] };
  },
  how: ["Average = Σ(quantity × price) ÷ Σ quantity.", "Shares to buy for a target average = quantity × (average − target) ÷ (target − current price)."]
 },

 {
  id: "position-size", cat: "invest", icon: "⌁", title: "Position size", desc: "How many shares to buy so a stop-loss hit loses only the amount you planned.",
  hi: ["पोज़िशन साइज़", "कितने शेयर ख़रीदें ताकि स्टॉप-लॉस लगने पर उतना ही नुकसान हो जितना तय किया।"],
  keywords: "position size risk per trade stop loss quantity trading",
  inputs: [
   { id: "capital", type: "money", label: "Trading capital", min: 10000, max: 100000000, step: 10000, value: 500000 },
   { id: "risk", type: "percent", label: "Risk per trade", min: 0.1, max: 5, step: 0.1, value: 1 },
   { id: "entry", type: "money", label: "Entry price", min: 0.05, max: 100000, step: 0.05, value: 250, slider: false },
   { id: "stop", type: "money", label: "Stop-loss price", min: 0, max: 100000, step: 0.05, value: 240, slider: false },
   { id: "target", type: "money", label: "Target price (optional)", min: 0, max: 100000, step: 0.05, value: 280, slider: false }
  ],
  compute(v, F) {
   const per = Math.abs(v.entry - v.stop);
   if (!(v.entry > 0) || per === 0) return { error: "Entry and stop-loss prices must differ." };
   const riskAmt = (v.capital * v.risk) / 100;
   const qty = Math.min(Math.floor(riskAmt / per), Math.floor(v.capital / v.entry));
   const rr = v.target > 0 ? Math.abs(v.target - v.entry) / per : null;
   return {
    hero: { label: "Quantity to buy", value: `${F.num(qty)} shares`, sub: `Position value ${F.money(qty * v.entry)}` },
    stats: [
     { label: "Planned risk", value: F.money(riskAmt), sub: `${F.pct(v.risk, 1)} of capital` },
     { label: "Risk per share", value: F.money(per, 2), sub: F.pct((per / v.entry) * 100) },
     { label: "Share of capital used", value: F.pct(((qty * v.entry) / v.capital) * 100, 1) },
     { label: "Reward : risk", value: rr === null ? "—" : `${F.num(rr, 2)} : 1`, tone: rr !== null && rr < 1.5 ? "warn" : undefined, sub: rr === null ? "Add a target" : `Potential profit ${F.money(qty * Math.abs(v.target - v.entry))}` }
    ],
    notes: ["A stop order may fill below the stop price in a gap or fast market; actual loss can be larger.", "Add brokerage and taxes; the paper-trading simulator shows them per order."]
   };
  },
  how: ["Quantity = (capital × risk %) ÷ |entry − stop|, capped at what the capital can buy.", "Reward : risk = |target − entry| ÷ |entry − stop|."]
 },

 {
  id: "trade-breakeven", cat: "invest", icon: "⇋", title: "Trade break-even", desc: "The sell price needed just to cover buying and selling costs.",
  hi: ["ट्रेड ब्रेक-ईवन", "ख़रीद और बिक्री खर्च निकालने के लिए ज़रूरी बिक्री क़ीमत।"],
  keywords: "break even trade costs brokerage sell price",
  inputs: [
   { id: "qty", type: "number", label: "Quantity (shares)", min: 1, max: 100000, step: 1, value: 100 },
   { id: "price", type: "money", label: "Buy price", min: 0.05, max: 100000, step: 0.05, value: 500, slider: false },
   { id: "costs", type: "money", label: "Total buy and sell costs", min: 0, max: 100000, step: 1, value: 160, help: "Brokerage, STT, exchange charges, stamp duty, DP charge and GST from your contract notes." }
  ],
  compute(v, F) {
   if (!(v.qty > 0 && v.price > 0)) return { error: "Enter quantity and buy price." };
   const be = v.price + v.costs / v.qty;
   return {
    hero: { label: "Break-even sell price", value: F.money(be, 2) },
    stats: [{ label: "Move needed", value: F.pct(((be - v.price) / v.price) * 100, 3) }, { label: "Cost per share", value: F.money(v.costs / v.qty, 2) }]
   };
  },
  how: ["Break-even = buy price + total costs ÷ quantity."]
 }
 );
})();
