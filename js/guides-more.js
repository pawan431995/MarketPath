// More study guides: derivatives, banking and fixed income, economics. Same structure as guides.js.
GUIDES.push(
 {
  slug: "derivatives", group: "derivatives",
  title: "What Are Derivatives? Forwards, Futures, Options and Swaps",
  desc: "Derivatives explained: the four types compared, what they are used for, who uses them, exchange-traded vs OTC, and the risks, with exam questions.",
  date: "2026-11-02", updated: "2026-11-02", keys: ["derivatives", "exchange-traded", "OTC"],
  summary: "A derivative is a contract whose value depends on something else, such as a share, an index, a commodity or a currency. This guide compares the four main types and explains why they exist.",
  sections: [
   { h: "An everyday example", p: "A wheat farmer worries that prices may fall before harvest, and a flour mill worries they may rise. They agree today to trade 100 quintals in three months at ₹2,500 a quintal. That agreement is a derivative: it has value only because wheat has a price. Both sides have removed their price risk." },
   { h: "The four types compared", table: { head: ["Type", "What it is", "Obligation", "Where traded"], rows: [
    ["Forward", "A private agreement to trade at a set price on a future date", "Both sides", "Over the counter"], ["Futures", "A standardised forward", "Both sides", "Exchange"], ["Options", "The right, not the obligation, to buy or sell at a set price", "Only the seller", "Exchange or over the counter"], ["Swap", "An exchange of cash flows over time", "Both sides", "Mostly over the counter"]] } },
   { h: "What derivatives are used for", ul: [
    "Hedging: reducing an existing risk, such as an exporter locking in the dollar rate.",
    "Speculation: taking a view on price with a small upfront margin, which brings high risk.",
    "Arbitrage: profiting from a price gap between the spot and futures markets, which helps keep prices in line."] },
   { h: "Exchange-traded and over-the-counter", table: { head: ["Basis", "Exchange-traded", "Over the counter (OTC)"], rows: [
    ["Terms", "Standardised", "Customised"], ["Counterparty risk", "Very low, as the clearing corporation guarantees trades", "Higher"], ["Transparency", "Prices are public", "Limited"], ["Regulation in India", "SEBI", "Mainly the RBI, for interest rate and currency contracts"]] } },
   { h: "Key terms", ul: [
    "Underlying asset: what the contract is based on.", "Lot size: the fixed contract quantity.", "Expiry: the last day of the contract.", "Margin: the deposit needed to hold a position.", "Mark to market: daily settlement of gains and losses.", "Open interest: the number of contracts still open."] },
   { h: "The risks", p: "Derivatives use leverage, so a small price move causes a large gain or loss relative to the money put up. SEBI studies have found that the great majority of individual traders in equity derivatives make losses, so students should learn the concepts first and practise without real money. Our paper trading tool lets you do this." }
  ],
  faq: [
   { q: "What is the difference between forwards and futures?", a: "Forwards are private, customised and carry counterparty risk. Futures are standardised, exchange-traded, marked to market daily and guaranteed by a clearing corporation." },
   { q: "What are the main participants in the derivatives market?", a: "Hedgers, speculators and arbitrageurs. Hedgers reduce risk, speculators take it on, and arbitrageurs keep prices in line across markets." },
   { q: "What is an underlying asset?", a: "The asset from which a derivative gets its value, such as a share, an index, a commodity, an interest rate or a currency." }
  ],
  terms: ["Derivative", "Futures", "Option", "Forward contract", "Swap", "Hedging", "Arbitrage", "Underlying asset", "Lot size", "Expiry", "Mark to market", "Open interest"], related: ["futures", "options", "stock-market", "portfolio-risk-return"], lessons: ["futures-options", "option-greeks"], calcs: ["margin"]
 },
 {
  slug: "futures", group: "derivatives",
  title: "What Is a Futures Contract? Margin, Pricing and Examples",
  desc: "What is a future? Futures contracts explained with lot size, margin, mark to market, cost of carry, contango and backwardation, hedging and examples.",
  date: "2026-11-02", updated: "2026-11-02", keys: ["futures contract", "futures", "contango", "backwardation"],
  summary: "A futures contract is a standardised agreement to buy or sell an asset at a set price on a future date, traded on an exchange. This guide works through a trade, margin, daily settlement and how futures are priced.",
  sections: [
   { h: "How a future works: an example", p: "Suppose a stock's futures trade at ₹1,000, with a lot of 500 shares (a simplified figure; check the exchange for current lot sizes).", table: { head: ["Item", "Calculation", "Amount"], rows: [
    ["Contract value", "1,000 × 500", "₹5,00,000"], ["Margin at 15%", "15% of 5,00,000", "₹75,000"], ["Profit if price rises to ₹1,040", "40 × 500", "+₹20,000 (26.7% on margin)"], ["Loss if price falls to ₹960", "−40 × 500", "−₹20,000 (−26.7% on margin)"]] }, p2: "A 4% move in the price becomes a 26.7% gain or loss on the margin. That is leverage, and a loss can exceed the margin you first put up." },
   { h: "Long and short positions", ul: ["Long futures: you agree to buy, and you gain if the price rises.", "Short futures: you agree to sell, and you gain if the price falls.", "Either side can close at any time before expiry by taking the opposite position.", "In India, stock futures are settled physically at expiry, while index futures are settled in cash."] },
   { h: "Margin and mark to market", ul: [
    "Initial margin: the deposit required to open a position, set by the exchange (usually SPAN plus exposure margin).",
    "Mark to market: each day, the position is valued at the closing price, and the gain or loss is settled in cash.",
    "Margin shortfall: if losses reduce your margin below the requirement, you must add money, or the broker can close your position."] },
   { h: "How futures are priced", box: "Fair futures price = spot price × (1 + r × t) − dividends. With spot ₹1,000, an 8% interest rate and 1 month to expiry: 1,000 × (1 + 0.08 × 1/12) = ₹1,006.67.", p2: "The gap of ₹6.67 is the cost of carry: the interest you would pay to hold the stock until expiry. If futures trade well above this price, arbitrageurs buy the stock and sell the future, which pulls the prices back together. The gap shrinks to zero by expiry." },
   { h: "Basis, contango and backwardation", p: "Basis is spot price minus futures price. In contango, futures trade above spot, which is the normal state. In backwardation, futures trade below spot, which can happen with an expected dividend, heavy short selling or tight supply." },
   { h: "Hedging with futures", box: "You hold shares worth ₹5,00,000 and fear a fall next month. Sell one lot of futures at ₹1,000. If the price falls to ₹900, you lose ₹50,000 on the shares and gain ₹50,000 on the futures. You have locked in the value, but you would also give up any gain if the price rises." }
  ],
  faq: [
   { q: "What is the difference between futures and options?", a: "A futures contract obliges both sides to complete the trade. An option gives the buyer a right without an obligation, for which the buyer pays a premium." },
   { q: "What is mark to market?", a: "Daily revaluation of an open position at the closing price, with the gain or loss settled in cash that day." },
   { q: "Why does the futures price converge to the spot price at expiry?", a: "Because at expiry, the two are the same asset for immediate delivery. Any gap would be an instant arbitrage profit." },
   { q: "Can you lose more than your margin in futures?", a: "Yes. Margin is only a deposit, and your loss depends on the full contract value." }
  ],
  terms: ["Futures", "Lot size", "Margin", "Mark to market", "Cost of carry", "Expiry", "Hedging", "Arbitrage", "Leverage", "Open interest"], related: ["derivatives", "options", "portfolio-risk-return", "time-value-of-money"], lessons: ["futures-options", "risk-management"], calcs: ["margin"]
 },
 {
  slug: "options", group: "derivatives",
  title: "What Are Options? Call and Put, Premium, Pay-offs and Pricing",
  desc: "Call and put options explained with pay-off examples, premium, moneyness, intrinsic and time value, the Greeks, put-call parity and Black-Scholes basics.",
  date: "2026-11-02", updated: "2026-11-02", keys: ["call option", "put option", "options contract", "put-call parity"],
  summary: "An option gives the buyer the right, but not the obligation, to buy or sell an asset at a set price by a set date. This guide covers calls and puts with worked pay-offs, how the premium is made up, and what moves it.",
  sections: [
   { h: "Call and put options", table: { head: ["Position", "Right or duty", "View", "Maximum loss", "Maximum gain"], rows: [
    ["Buy a call", "Right to buy", "Price will rise", "Premium paid", "Unlimited"], ["Sell a call", "Duty to sell", "Price won't rise", "Unlimited", "Premium received"], ["Buy a put", "Right to sell", "Price will fall", "Premium paid", "Strike − premium (per share)"], ["Sell a put", "Duty to buy", "Price won't fall", "Strike − premium (per share)", "Premium received"]] } },
   { h: "Call option: worked example", p: "Buy a call with a strike of ₹1,000 for a premium of ₹40, lot 500 (simplified). The cost is ₹20,000, and the break-even is 1,000 + 40 = ₹1,040.", table: { head: ["Price at expiry", "Value per share", "Profit per share", "Total profit or loss"], rows: [
    ["₹950", "₹0", "−₹40", "−₹20,000"], ["₹1,000", "₹0", "−₹40", "−₹20,000"], ["₹1,040", "₹40", "₹0", "₹0"], ["₹1,100", "₹100", "₹60", "+₹30,000"]] } },
   { h: "Put option: worked example", p: "Buy a put with a strike of ₹1,000 for a premium of ₹35, lot 500. The break-even is 1,000 − 35 = ₹965.", table: { head: ["Price at expiry", "Value per share", "Profit per share", "Total profit or loss"], rows: [
    ["₹1,050", "₹0", "−₹35", "−₹17,500"], ["₹965", "₹35", "₹0", "₹0"], ["₹900", "₹100", "₹65", "+₹32,500"]] } },
   { h: "Moneyness", table: { head: ["State", "Call", "Put"], rows: [
    ["In the money (ITM)", "Price above strike", "Price below strike"], ["At the money (ATM)", "Price about equal to strike", "Price about equal to strike"], ["Out of the money (OTM)", "Price below strike", "Price above strike"]] } },
   { h: "What the premium is made of", box: "Premium = intrinsic value + time value. With the share at ₹1,050, a ₹1,000 call priced at ₹80 has an intrinsic value of ₹50 and a time value of ₹30.", p2: "Time value falls to zero at expiry, and this decay works against option buyers." },
   { h: "What moves the premium: the Greeks", table: { head: ["Greek", "Measures sensitivity to"], rows: [
    ["Delta", "A change in the underlying price"], ["Gamma", "How fast delta itself changes"], ["Theta", "The passage of time"], ["Vega", "A change in implied volatility"], ["Rho", "A change in interest rates"]] } },
   { h: "Pricing and parity", p: "The Black-Scholes model values an option from five inputs: spot price, strike, time to expiry, interest rate and volatility. Of these, only volatility is unknown, which is why traders talk about implied volatility. Put-call parity links a call and a put with the same strike and expiry.", box: "Put-call parity: call premium + present value of strike = put premium + spot price." },
   { h: "European and American", p: "A European option can be exercised only at expiry, and an American option at any time before it. Index and stock options in India are European. Common strategies built from options include the protective put, covered call, straddle, strangle and spreads." }
  ],
  faq: [
   { q: "What is the difference between a call and a put?", a: "A call gives the right to buy at the strike price, and benefits from a rise. A put gives the right to sell at the strike price, and benefits from a fall." },
   { q: "Why does an option buyer pay a premium?", a: "To get the right without the obligation. The seller takes on the obligation, and the risk, and is paid the premium for it." },
   { q: "What happens to an out-of-the-money option at expiry?", a: "It expires worthless, and the buyer loses the whole premium." },
   { q: "Is option selling safer than buying?", a: "It wins more often but carries a much larger potential loss, and needs a high margin. A seller of a naked call has theoretically unlimited risk." }
  ],
  terms: ["Option", "Call and put", "Strike price", "Premium", "ITM, ATM, OTM", "Greeks (delta, theta)", "Implied volatility (IV)", "Black-Scholes model", "Put-call ratio (PCR)", "India VIX"], related: ["derivatives", "futures", "portfolio-risk-return", "time-value-of-money"], lessons: ["futures-options", "option-greeks"], calcs: ["margin"]
 },
 {
  slug: "bank-accounts", group: "banking",
  title: "Types of Bank Accounts in India: Savings, Current, FD, RD and NRI",
  desc: "Types of bank accounts in India compared: savings, salary, current, FD, RD, BSBDA, NRE, NRO and FCNR, plus overdraft, auto-sweep and NEFT, RTGS and UPI.",
  date: "2026-11-02", updated: "2026-11-02", keys: ["types of bank accounts", "bank account", "demand deposit", "time deposit"],
  summary: "Banks offer accounts for everyday money, for businesses, for savings over time, and for non-residents. This guide compares them, and explains how money moves between them.",
  sections: [
   { h: "Demand and time deposits", p: "Banks' deposits fall into two broad groups. Demand deposits, such as savings and current accounts, can be withdrawn whenever you like. Time deposits, such as fixed deposits and recurring deposits, are placed for an agreed period at a higher rate." },
   { h: "The main accounts compared", table: { head: ["Account", "For", "Interest", "Key feature"], rows: [
    ["Savings account", "Individuals", "Modest", "Everyday money, easy withdrawals"], ["Salary account", "Employees", "As for savings", "Often no minimum balance while salary is credited"], ["Basic savings (BSBDA)", "Everyone", "As for savings", "No minimum balance, with basic services"], ["Current account", "Businesses", "Usually none", "Unlimited transactions, overdraft facility"], ["Fixed deposit", "Lump-sum savers", "Higher, and fixed", "Set period, penalty if closed early"], ["Recurring deposit", "Monthly savers", "Similar to FD", "Fixed monthly amount"]] } },
   { h: "Accounts for non-residents", table: { head: ["Account", "Holds", "Repatriable", "Interest taxed in India"], rows: [
    ["NRE", "Foreign earnings, in rupees", "Fully", "No"], ["NRO", "Income earned in India", "Up to a limit", "Yes"], ["FCNR(B)", "Foreign currency term deposit", "Fully", "No"]] } },
   { h: "Useful bank facilities", ul: [
    "Auto-sweep: surplus above a limit moves into an FD on its own and comes back when required, so idle balance earns more while staying available.",
    "Overdraft: withdraw beyond your balance up to a limit, paying interest only on what you use. It may be secured against an FD.",
    "Cash credit: a working-capital limit for businesses, against stock and receivables.",
    "Standing instruction or auto-debit: automatic payments, such as for an RD or SIP.",
    "Locker: safe storage, which is rented and is not a deposit."] },
   { h: "How money moves", table: { head: ["Method", "Speed", "Typical use"], rows: [
    ["UPI", "Instant, all day", "Everyday payments"], ["IMPS", "Instant, all day", "Immediate transfers"], ["NEFT", "In half-hourly batches, all day", "Transfers of any size"], ["RTGS", "Real time, minimum ₹2 lakh", "Large transfers"]] } },
   { h: "How banks make money", p: "A bank earns the gap between what it charges borrowers and what it pays depositors, which is called net interest margin, plus fee income. It must hold part of its deposits as CRR and SLR, so it cannot lend every rupee. Loans that stop paying become NPAs, which hurt profits." },
   { h: "Deposit safety", p: "DICGC insures deposits up to ₹5 lakh per depositor per bank, including principal and interest. This covers savings, current, fixed and recurring deposits with insured banks. Corporate deposits with companies and NBFCs are not covered. Check the DICGC website for the current limit." }
  ],
  faq: [
   { q: "What is the difference between a savings and a current account?", a: "A savings account is for individuals and pays interest. A current account is for businesses with many transactions, usually pays no interest and can include an overdraft." },
   { q: "What is the difference between NRE and NRO accounts?", a: "NRE holds foreign earnings, is fully repatriable and its interest is tax-free in India. NRO holds income earned in India, has repatriation limits and its interest is taxable." },
   { q: "What is the difference between NEFT and RTGS?", a: "NEFT settles in batches and has no minimum amount. RTGS settles each payment in real time and is meant for ₹2 lakh and above." }
  ],
  terms: ["Savings account", "Current account", "Fixed deposit (FD)", "Recurring deposit (RD)", "Auto-sweep", "Overdraft", "NRE and NRO accounts", "FCNR deposit", "IFSC code", "UPI", "Deposit insurance (DICGC)", "NPA (non-performing asset)", "Commercial bank"], related: ["fixed-deposit", "recurring-deposit", "monetary-policy", "indian-financial-system"], lessons: ["personal-finance"], calcs: ["fd", "rd", "emergency-fund"]
 },
 {
  slug: "fixed-deposit", group: "banking",
  title: "Fixed Deposit (FD): Types, Interest, Tax, Auto-Sweep and FD vs RD",
  desc: "Fixed deposit guide: every type of FD, including regular, tax-saving, cumulative, flexi and corporate, plus interest formula, TDS, safety and FD vs RD.",
  date: "2026-11-02", updated: "2026-11-02", keys: ["fixed deposit", "fixed deposits", "FDs", "FD", "tax-saver FD", "flexi deposit", "auto swipe"],
  summary: "A fixed deposit is a sum placed with a bank or NBFC for a set period at an agreed interest rate. This guide covers every type of FD, how the interest is worked out, how it is taxed, and how it compares with other choices.",
  sections: [
   { h: "How an FD works", p: "You deposit a lump sum for a period ranging from about 7 days to 10 years, at a rate fixed on that day. The rate stays the same until maturity, even if market rates change. At the end, you get your money back with interest. Banks may renew it automatically if you have asked them to." },
   { h: "Types of fixed deposit", table: { head: ["Type", "How it works", "Good for"], rows: [
    ["Regular (standard) FD", "A fixed period at a fixed rate", "Safe saving for a known date"], ["Cumulative FD", "Interest is reinvested and paid at maturity", "Growing money"], ["Non-cumulative FD", "Interest is paid monthly, quarterly or yearly", "Regular income, such as for retirees"], ["Senior citizen FD", "An extra rate, often 0.25–0.75%, for those aged 60+", "Retirees"], ["Tax-saving FD", "Five-year lock-in, with a deduction in the old tax regime", "Tax saving"], ["Flexi or auto-sweep FD", "Linked to a savings account; money moves automatically", "Earning more on idle balance"], ["Corporate FD", "Placed with a company or NBFC, at a higher rate and with no DICGC cover", "Those comfortable with credit risk"], ["Floating-rate FD", "The rate moves with a benchmark such as the repo rate", "Expecting rates to rise"], ["NRE, NRO and FCNR FDs", "For non-residents", "NRIs"]] }, p2: "Regular monthly saving is done through a recurring deposit, which is the natural partner of an FD. It has its own guide." },
   { h: "Auto-sweep explained", p: "People often search for this as \"auto swipe\", but the banking term is auto-sweep or sweep-in. You set a limit on your savings account, such as ₹50,000. Anything above it moves into an FD automatically. If your balance falls short, money comes back from the FD, usually in small units, so most of the deposit keeps earning the FD rate.", ul: ["Example: with a ₹50,000 limit and a ₹2,00,000 balance, ₹1,50,000 moves to an FD.", "You get FD-level interest on idle money, while it remains available.", "Interest is taxable, and early breaking may lower the rate on the part withdrawn. Check your bank's terms."] },
   { h: "How FD interest is calculated", box: "Maturity value = P × (1 + r/n)^(n × t). With ₹1,00,000 at 7% compounded quarterly for 5 years: 1,00,000 × (1 + 0.07/4)^20 = ₹1,41,478, so the interest is ₹41,478.", p2: "In a non-cumulative FD paying quarterly, the same deposit pays ₹1,750 a quarter, or ₹35,000 over 5 years. That is less in total, because the interest does not compound, but you get it as income along the way. Try the numbers in our FD calculator." },
   { h: "Tax and TDS", ul: [
    "FD interest is added to your income and taxed at your slab rate, whether you receive it or it is reinvested.",
    "Banks deduct TDS when interest crosses a yearly limit, currently ₹50,000 and ₹1 lakh for senior citizens, at 10% with PAN.",
    "If your total income is below the taxable limit, you can submit Form 15G, or 15H for senior citizens, to avoid TDS, or claim the tax back when filing your ITR.",
    "The tax-saving FD deduction is available only in the old regime, and interest on it is still taxable. Check the latest rules."] },
   { h: "Is an FD safe?", ul: [
    "Bank FDs are insured by DICGC up to ₹5 lakh per depositor per bank, including interest.",
    "Corporate FDs have no such cover, so check credit ratings from agencies such as CRISIL or ICRA.",
    "Inflation is the hidden risk: at 7% interest, 30% tax and 5% inflation, the real return is about zero."] },
   { h: "FD compared with other options", table: { head: ["Option", "Return", "Risk", "Liquidity"], rows: [
    ["Savings account", "Low", "Very low", "Immediate"], ["Fixed deposit", "Fixed", "Low", "Penalty if closed early"], ["Recurring deposit", "Fixed", "Low", "Penalty if closed early"], ["PPF", "Set by the government each quarter, tax-free", "Very low", "15-year lock-in"], ["Debt fund", "Varies with the market", "Low to moderate", "Usually a few days"], ["Equity fund", "Varies, higher over the long term", "High", "Usually a few days"], ["Government bonds", "Fixed", "Very low", "Tradable, but thinly"]] } },
   { h: "Laddering", p: "Rather than putting everything in one FD, split the money across different maturities, such as 1, 2, 3, 4 and 5 years. One FD matures each year, which provides regular liquidity and lowers the risk of locking everything in when rates are low." }
  ],
  faq: [
   { q: "What are the types of fixed deposit?", a: "Regular, cumulative, non-cumulative, senior citizen, tax-saving, flexi or auto-sweep, corporate, floating-rate, and NRE, NRO and FCNR deposits." },
   { q: "Can I break an FD early?", a: "Yes, except for a tax-saving FD. You usually get the rate that applied for the shorter period, less a penalty that is often 0.5–1%." },
   { q: "What is the difference between an FD and an RD?", a: "An FD takes one lump sum at the start. An RD takes a fixed amount every month. Each instalment in an RD earns interest only from when it is paid, so total interest is lower for the same total deposit." },
   { q: "What is auto-sweep in a bank account?", a: "A facility that moves your balance above a set limit into an FD automatically, and brings it back when your account needs it. It is sometimes searched for as auto swipe." },
   { q: "Can I get a loan against an FD?", a: "Yes. Banks usually lend up to about 90% of the FD value as a loan or overdraft, at a rate slightly above the FD rate, so you need not break it." }
  ],
  terms: ["Fixed deposit (FD)", "Recurring deposit (RD)", "Auto-sweep", "Cumulative FD", "Non-cumulative FD", "Tax-saving FD", "Corporate FD", "Premature withdrawal", "Maturity amount", "TDS", "Deposit insurance (DICGC)", "Compound interest", "PPF"], related: ["recurring-deposit", "bank-accounts", "bonds-debentures", "time-value-of-money", "mutual-funds"], lessons: ["personal-finance", "tax-basics"], calcs: ["fd", "rd", "compound-interest", "inflation", "ppf"]
 },
 {
  slug: "recurring-deposit", group: "banking",
  title: "Recurring Deposit (RD): Meaning, Interest Formula and RD vs SIP",
  desc: "What is a recurring deposit? How RD interest works, a worked example, tax, missed instalments, types of RD, and comparisons with FD and SIP.",
  date: "2026-11-02", updated: "2026-11-02", keys: ["recurring deposit", "recurring deposits", "RD"],
  summary: "A recurring deposit lets you save a fixed amount every month and earn a fixed rate of interest. It suits people without a lump sum, and this guide covers the working, the tax, and how it compares with an FD and a SIP.",
  sections: [
   { h: "How an RD works", ul: [
    "Choose a monthly amount, which can start as low as a few hundred rupees.", "Choose a period, usually from 6 months to 10 years.", "The rate is fixed on the day you open it, and stays fixed.", "The instalment is usually auto-debited from your account.", "At maturity, you get all your instalments plus interest."] },
   { h: "A worked example", box: "₹5,000 a month for 5 years at 7%, compounded quarterly. You pay in ₹3,00,000, and the maturity value is about ₹3,59,664, so the interest is about ₹59,664. Each instalment earns for a different length of time: the first for 60 months, the last for only 1.", p2: "Compare a ₹3,00,000 lump sum in a fixed deposit at the same rate for 5 years, which would grow to about ₹4,24,433. The FD earns more, as all of the money is invested for the full time. Exact RD values vary slightly with each bank's method, so try the RD calculator." },
   { h: "Types of RD", ul: ["Regular bank RD: offered by almost every bank.", "Senior citizen RD: at a slightly higher rate.", "Post Office RD: a five-year scheme backed by the government, with rates set each quarter.", "Flexi RD: at some banks, you can vary the monthly amount within limits."] },
   { h: "Rules worth knowing", ul: [
    "Missed instalments can bring a penalty, and several missed instalments can lead the bank to close the RD.",
    "Early closure is usually allowed, at a lower interest rate and possibly a penalty.",
    "Interest is taxable at your slab rate, each year as it accrues, and TDS can apply.",
    "RDs have no special tax benefit, unlike a tax-saving FD.",
    "DICGC cover applies up to ₹5 lakh, together with your other deposits in that bank."] },
   { h: "RD, FD and SIP compared", table: { head: ["Basis", "RD", "FD", "SIP in a mutual fund"], rows: [
    ["Payment", "Monthly", "One lump sum", "Monthly"], ["Return", "Fixed", "Fixed", "Market-linked, not guaranteed"], ["Risk", "Low", "Low", "Depends on the fund; equity is high"], ["Best for", "Short goals with a known date", "Parking a lump sum safely", "Goals 5 years or more away"], ["Stopping early", "Penalty is likely", "Penalty is likely", "Can stop anytime; exit load may apply"]] } },
   { h: "When an RD makes sense", p: "An RD suits a goal 1 to 3 years away, such as a holiday, a down payment or next year's fees, where you can't risk a fall in value. For goals many years away, a SIP in an equity fund has historically offered better growth, though with real risk. An RD is also a good way for a student to build the habit of saving." }
  ],
  faq: [
   { q: "What is a recurring deposit in simple words?", a: "A savings scheme in which you pay a fixed amount every month for a set period, and receive it back with fixed interest at the end." },
   { q: "Is RD better than SIP?", a: "They do different jobs. An RD gives a fixed, safe return for short-term goals. A SIP in an equity fund has no guaranteed return but suits long-term goals better." },
   { q: "Is RD interest taxable?", a: "Yes. It is taxed at your slab rate, and TDS applies once your total interest from the bank crosses the yearly limit." }
  ],
  terms: ["Recurring deposit (RD)", "Fixed deposit (FD)", "SIP", "Compound interest", "Maturity amount", "TDS", "Premature withdrawal"], related: ["fixed-deposit", "bank-accounts", "mutual-funds", "time-value-of-money"], lessons: ["personal-finance", "sip-mutual-funds"], calcs: ["rd", "fd", "sip", "goal"]
 },
 {
  slug: "bonds-debentures", group: "banking",
  title: "Bonds and Debentures: Types, Pricing, Yield and Credit Ratings",
  desc: "Bonds and debentures explained: types, coupon, bond pricing with a worked example, current yield, YTM, duration, credit ratings and interest rate risk.",
  date: "2026-11-02", updated: "2026-11-02", keys: ["bonds", "debentures", "bond pricing", "fixed income"],
  summary: "A bond is a loan you give to a government or a company, in return for interest and repayment on a set date. This guide covers the types, how to price a bond, and why prices fall when interest rates rise.",
  sections: [
   { h: "The features of a bond", table: { head: ["Feature", "Meaning", "Example"], rows: [
    ["Face value", "The amount repaid at maturity", "₹1,000"], ["Coupon rate", "Yearly interest on face value", "8%, or ₹80 a year"], ["Maturity", "The repayment date", "5 years"], ["Issuer", "The borrower", "Government of India, or a company"], ["Credit rating", "An opinion on safety", "AAA to D"]] } },
   { h: "Types of bonds", ul: [
    "Government securities (G-Secs) and T-bills: issued by the government, with very low default risk.",
    "State development loans: issued by state governments.",
    "Corporate bonds and debentures: issued by companies, with higher yields and credit risk.",
    "Zero-coupon bonds: pay no coupon, and are issued at a discount to face value.",
    "Convertible bonds: can be turned into shares.",
    "Floating-rate bonds: the coupon moves with a benchmark.",
    "Tax-free and capital gains bonds: with special tax treatment, under specific rules.",
    "Green bonds: for environmental projects.",
    "Junk bonds: rated below investment grade, with a high yield and high risk."] },
   { h: "Bonds and debentures compared", p: "The two words are often used interchangeably. In Indian usage, a debenture usually means a company's debt, which may be secured or unsecured, while a bond is often issued by a government or public body and is usually secured or government-backed. Debenture holders are creditors, not owners, and have no voting rights." },
   { h: "How a bond is priced", p: "A bond's price is the present value of its coupons and face value, discounted at the market's required yield.", box: "Face value ₹1,000, coupon 8% (₹80 a year), 5 years, market yield 10%. Price = 80 × 3.7908 + 1,000 × 0.6209 = 303.26 + 620.92 = ₹924.18.", p2: "This bond trades at a discount because its 8% coupon is below the 10% the market wants. If the market yield were 8%, the bond would trade at par (₹1,000). If it were lower than 8%, the bond would trade at a premium." },
   { h: "Yield measures", table: { head: ["Measure", "Formula", "Result"], rows: [
    ["Coupon yield", "Coupon ÷ face value", "80 ÷ 1,000 = 8%"], ["Current yield", "Coupon ÷ market price", "80 ÷ 924.18 = 8.66%"], ["Approximate YTM", "[C + (F − P) ÷ n] ÷ [(F + P) ÷ 2]", "95.16 ÷ 962.09 = 9.89%"], ["Exact YTM", "The rate that sets PV equal to the price", "10%"]] } },
   { h: "Why prices fall when rates rise", p: "If new bonds pay 10%, nobody will pay full price for your 8% bond, so its price has to fall until its yield matches. This is interest rate risk. Duration measures it: a bond with a duration of 5 years falls about 5% for a 1 percentage point rise in yields. Longer-dated and lower-coupon bonds are more sensitive." },
   { h: "The risks", ul: ["Interest rate risk: prices fall when rates rise.", "Credit risk: the issuer may not pay. Ratings from CRISIL, ICRA and CARE help, but they aren't guarantees.", "Reinvestment risk: coupons may have to be reinvested at lower rates.", "Inflation risk: fixed coupons buy less over time.", "Liquidity risk: many Indian corporate bonds trade thinly."] }
  ],
  faq: [
   { q: "Why do bond prices and yields move in opposite directions?", a: "A bond's cash flows are fixed. To offer a higher yield to a new buyer, its price must fall, and to offer a lower yield, its price must rise." },
   { q: "What is a zero-coupon bond?", a: "A bond that pays no interest, sold at a discount and repaid at face value. The difference is the investor's return." },
   { q: "What is the difference between current yield and YTM?", a: "Current yield looks only at this year's coupon relative to price. YTM also includes the gain or loss to maturity and the time value of money." },
   { q: "How can a retail investor buy government bonds in India?", a: "Through the RBI Retail Direct platform, through a broker on the exchange, or indirectly through gilt funds." }
  ],
  terms: ["Bond", "Debenture", "Coupon rate", "Yield to maturity (YTM)", "Yield curve", "Government securities (G-Sec)", "Treasury bill (T-bill)", "Credit rating", "Convertible bond", "Junk bond", "Green bond", "Basis point", "Bond market"], related: ["time-value-of-money", "monetary-policy", "fixed-deposit", "mutual-funds", "indian-financial-system"], lessons: ["investing", "valuation-basics"], calcs: ["tvm", "npv-irr"]
 },
 {
  slug: "monetary-policy", group: "economy",
  title: "RBI Monetary Policy: Repo Rate, CRR, SLR and Inflation Targeting",
  desc: "RBI monetary policy explained: the MPC, repo and reverse repo rates, CRR, SLR, MSF, open market operations, inflation targeting and effects on markets.",
  date: "2026-11-02", updated: "2026-11-02", keys: ["monetary policy", "open market operations", "Monetary Policy Committee", "MPC"],
  summary: "Monetary policy is how the RBI manages interest rates and the money supply to control inflation and support growth. This guide explains each tool and how a rate change reaches you. The rates themselves change, so check the RBI for current values.",
  sections: [
   { h: "Goals and who decides", p: "India has a flexible inflation targeting framework: the target for CPI inflation is 4%, with a tolerance band of 2% to 6%. A six-member Monetary Policy Committee, three from the RBI and three appointed by the government, sets the repo rate. It normally meets at least four times a year, in practice about every two months." },
   { h: "The tools of monetary policy", table: { head: ["Tool", "What it is", "If raised"], rows: [
    ["Repo rate", "Rate at which RBI lends to banks", "Loans get costlier, and demand slows"], ["Reverse repo rate", "Rate at which RBI borrows from banks", "Banks park more with RBI"], ["Standing deposit facility (SDF)", "Collateral-free RBI borrowing from banks, the floor of the rate corridor", "Absorbs surplus money"], ["Marginal standing facility (MSF)", "Emergency overnight borrowing for banks, the ceiling of the corridor", "Emergency money costs more"], ["CRR", "Share of deposits kept with RBI as cash", "Less money for banks to lend"], ["SLR", "Share of deposits kept in liquid assets", "Less money for banks to lend"], ["Open market operations", "RBI buying or selling government securities", "Selling takes money out of the system"]] } },
   { h: "Quantitative and qualitative tools", p: "Quantitative tools such as the repo rate, CRR, SLR and open market operations affect the total amount of money. Qualitative tools, such as margin requirements on loans, moral suasion and credit rationing, steer where the credit goes." },
   { h: "Expansionary and contractionary policy", table: { head: ["Basis", "Expansionary (dovish)", "Contractionary (hawkish)"], rows: [
    ["When", "Growth is weak", "Inflation is high"], ["Action", "Cut rates, add liquidity", "Raise rates, absorb liquidity"], ["Loans", "Cheaper", "Costlier"], ["Risk", "Inflation", "Slower growth"]] } },
   { h: "How a rate change reaches you", ul: [
    "The RBI changes the repo rate.", "Banks' cost of money changes.", "Loan rates change: floating-rate retail loans linked to an external benchmark such as the repo rate adjust at their reset date, and FD rates follow in time.", "People and businesses borrow and spend more or less.", "Demand, and therefore inflation and growth, respond over several months."] },
   { h: "Effects on markets", ul: ["Bonds: yields usually fall when rates are cut, so bond prices rise.", "Shares: lower rates tend to help, especially for banks, autos and real estate.", "Currency: higher rates can attract foreign money and support the rupee.", "Fixed deposits: rates tend to fall after cuts, so savers look for longer lock-ins beforehand."] },
   { h: "Monetary and fiscal policy", p: "Monetary policy is run by the RBI, using interest rates and liquidity. Fiscal policy is run by the government, using taxes and spending, and is covered in our GDP and fiscal policy guide. They work best when they pull in the same direction." }
  ],
  faq: [
   { q: "What is the difference between repo rate and reverse repo rate?", a: "The repo rate is what banks pay when they borrow from the RBI. The reverse repo rate is what the RBI pays when it borrows from banks." },
   { q: "What is the difference between CRR and SLR?", a: "CRR is kept with the RBI as cash and earns no interest. SLR is kept by the banks themselves in liquid assets such as government securities, which do earn interest." },
   { q: "What is India's inflation target?", a: "4% CPI inflation, with a tolerance band of 2% to 6%, under the flexible inflation targeting framework." },
   { q: "Why does the RBI raise rates when inflation is high?", a: "Higher rates make borrowing costlier and saving more attractive, which cools demand and eases pressure on prices." }
  ],
  terms: ["Monetary policy", "Repo rate", "Reverse repo rate", "CRR (cash reserve ratio)", "SLR (statutory liquidity ratio)", "RBI", "Inflation", "CPI (consumer price index)", "Basis point", "Floating interest rate", "Fiscal policy"], related: ["gdp-fiscal-policy", "bonds-debentures", "bank-accounts", "indian-financial-system"], lessons: ["investing", "foundations"], calcs: ["inflation", "emi"]
 },
 {
  slug: "gdp-fiscal-policy", group: "economy",
  title: "GDP, Inflation and Fiscal Policy: Macroeconomics for Students",
  desc: "Macroeconomics basics: GDP formula, real vs nominal GDP, inflation, CPI and WPI, fiscal deficit, types of taxes, the business cycle and effects on markets.",
  date: "2026-11-02", updated: "2026-11-02", keys: ["fiscal policy", "macroeconomics", "business cycle", "nominal GDP", "real GDP", "gross domestic product"],
  summary: "Macroeconomics looks at the economy as a whole: output, prices, jobs and government finances. This guide covers the key measures and how the government influences them, and why investors follow them.",
  sections: [
   { h: "GDP and how it is measured", box: "GDP = C + I + G + (X − M): consumption + investment + government spending + exports − imports. With C = 60, I = 30, G = 15, X = 20 and M = 25, GDP = 100.", ul: ["The expenditure method adds up spending, as above.", "The income method adds up wages, rent, interest and profit.", "The production method adds up the value added in each sector."], p2: "In India, the National Statistics Office publishes GDP estimates each quarter." },
   { h: "Real and nominal GDP", p: "Nominal GDP is measured at current prices, and real GDP at constant prices, which removes inflation.", box: "If nominal GDP grows 11% and inflation is 4%, real growth is about 1.11 ÷ 1.04 − 1 = 6.7%.", p2: "GDP per capita divides the total by the population, and is a rough measure of average income. GDP is not a complete measure of welfare, as it misses inequality, unpaid work and the environment." },
   { h: "Inflation and its measures", ul: [
    "Inflation: a general rise in prices over time. Demand-pull inflation comes from too much spending, and cost-push inflation from rising input costs.",
    "CPI: prices that households pay, which the RBI targets.",
    "WPI: prices at the wholesale level.",
    "GDP deflator: the broadest price measure, covering all output.",
    "Deflation, disinflation and stagflation: falling prices, slowing inflation, and high inflation with weak growth, in turn."] },
   { h: "Fiscal policy and the Union Budget", p: "Fiscal policy is the government's use of taxes and spending. In a slowdown, it can spend more or tax less (expansionary). When the economy is overheating, it can do the reverse (contractionary).", table: { head: ["Measure", "Formula"], rows: [
    ["Revenue deficit", "Revenue expenditure − revenue receipts"], ["Fiscal deficit", "Total expenditure − (revenue receipts + non-debt capital receipts)"], ["Primary deficit", "Fiscal deficit − interest payments"]] }, p2: "Fiscal deficit shows how much the government must borrow. Heavy borrowing can push up interest rates and crowd out private investment. India's FRBM Act sets a framework for keeping this under control." },
   { h: "Direct and indirect taxes", table: { head: ["Basis", "Direct tax", "Indirect tax"], rows: [
    ["Paid by", "The person it is charged on", "Collected from the buyer by the seller"], ["Examples", "Income tax, corporate tax", "GST, customs duty"], ["Burden", "Cannot be shifted", "Passed on to the consumer"], ["Effect", "Generally progressive", "Generally regressive"]] } },
   { h: "The business cycle", p: "Economies move through expansion, peak, contraction (a recession if severe) and recovery. Different sectors tend to do better at different stages. Defensive sectors such as FMCG and pharma hold up in slowdowns, while cyclical ones such as autos, banks and metals tend to do well in recoveries." },
   { h: "External accounts", ul: ["Balance of payments: all flows of money between India and the world.", "Current account deficit: paying out more than is earned on trade in goods and services, and on transfers such as remittances.", "Capital account: investment and borrowing flows, including FDI and FPI.", "Exchange rate: a weaker rupee helps exporters such as IT firms, and hurts importers of oil."] }
  ],
  faq: [
   { q: "What is the difference between GDP and GNP?", a: "GDP measures output produced inside the country. GNP adds income earned abroad by residents and subtracts income earned here by foreigners." },
   { q: "What is the difference between fiscal deficit and revenue deficit?", a: "Revenue deficit compares only day-to-day income and spending. Fiscal deficit covers all spending, including capital spending, and shows the government's total borrowing need." },
   { q: "What is the difference between monetary and fiscal policy?", a: "Monetary policy is run by the RBI through interest rates and liquidity. Fiscal policy is run by the government through taxes and spending." },
   { q: "What is stagflation?", a: "High inflation combined with weak growth and high unemployment, which is hard to treat because the usual cure for one worsens the other." }
  ],
  terms: ["GDP", "Real and nominal GDP", "Inflation", "CPI (consumer price index)", "WPI (wholesale price index)", "Deflation", "Disinflation", "Stagflation", "Recession", "Fiscal policy", "Fiscal deficit", "Budget", "Direct tax", "Indirect tax", "GST", "Balance of payments", "Current account deficit", "Exchange rate"], related: ["monetary-policy", "indian-financial-system", "stock-market", "bonds-debentures"], lessons: ["investing", "tax-basics"], calcs: ["inflation", "gst", "income-tax"]
 }
);
