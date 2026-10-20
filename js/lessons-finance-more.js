// Deeper content for six financial-reading modules: Balance Sheet, Cash Flow Statement, Quarterly Results,
// Annual Report, Shareholding Pattern and Corporate Actions. Adds topic sections (some with worked tables),
// examples, scenarios, use cases, takeaways, common questions and a second diagram, in English and Hindi.
// Load after lessons-finance.js, lessons-extra-en.js, lessons-extra-hi.js, lesson-charts.js and module-extras.js.
// Numbers are illustrative. Rules (deadlines, tax) change: check SEBI, the exchanges and the Income Tax Department.
// Section table: { head: [..], rows: [[..], ..] }; rows with "!" as the first cell are drawn as total rows.
const FINANCE_MORE = { en: {}, hi: {} };

FINANCE_MORE.en["balance-sheet"] = {
 sections: [
  { h: "9. The Indian format: Schedule III and Ind AS", p: "Listed companies in India present the balance sheet in the format of Schedule III of the Companies Act, 2013, using Indian Accounting Standards (Ind AS). The order is always the same, so once you know it you can read any company quickly. Most companies publish two versions: standalone (the company alone) and consolidated (the company with its subsidiaries). Read the consolidated one for groups.", ul: [
   "Non-current assets: property, plant and equipment, capital work-in-progress, goodwill and intangibles, long-term investments and loans.",
   "Current assets: inventories, trade receivables, cash and bank balances, short-term investments and other current assets.",
   "Equity: equity share capital (number of shares × face value) and other equity (reserves and surplus).",
   "Non-current liabilities: long-term borrowings, lease liabilities, long-term provisions and deferred tax liabilities.",
   "Current liabilities: short-term borrowings (including the part of long-term loans due within a year), trade payables and other current liabilities."
  ] },
  { h: "10. A worked balance sheet", p: "Example Ltd, consolidated, ₹ crore, as at 31 March. Read across the two years before you calculate any ratio.", table: { head: ["Line item", "FY24", "FY25"], rows: [
   ["Property, plant and equipment", "900", "1,050"], ["Goodwill and intangibles", "100", "100"], ["Inventories", "250", "380"], ["Trade receivables", "300", "450"], ["Cash and bank", "150", "70"],
   ["!Total assets", "1,700", "2,050"],
   ["Share capital (10 crore shares of ₹10)", "100", "100"], ["Reserves and surplus", "900", "980"], ["Long-term borrowings", "300", "450"], ["Short-term borrowings", "100", "200"], ["Trade payables", "300", "320"],
   ["!Total equity and liabilities", "1,700", "2,050"]
  ] }, p2: "What it shows: equity grew 8% (₹1,000 to ₹1,080 crore) but borrowings grew 62.5% (₹400 to ₹650 crore), so debt-to-equity rose from 0.40 to 0.60. The current ratio barely moved (1.75 to 1.73), which looks calm, yet cash fell from ₹150 to ₹70 crore while receivables and inventory each jumped about 50%. If sales grew only 10%, borrowed money is being tied up in unpaid bills and unsold stock. One ratio hid the problem; the line items revealed it." },
  { h: "11. The working-capital cycle in days", p: "Converting balances into days makes companies of any size comparable and shows trends clearly.", ul: [
   "Receivable days = trade receivables ÷ sales × 365. How long customers take to pay.",
   "Inventory days = inventories ÷ cost of goods sold × 365. How long stock sits before it is sold.",
   "Payable days = trade payables ÷ cost of goods sold × 365. How long the company takes to pay suppliers.",
   "Cash conversion cycle = receivable days + inventory days − payable days. The number of days the company's own money is locked up in operations."
  ], p2: "Example Ltd, FY25: sales ₹2,200 crore (FY24: ₹2,000 crore), cost of goods sold ₹1,500 crore. Receivable days = 450 ÷ 2,200 × 365 ≈ 75 (FY24: about 55). Inventory days ≈ 92, payable days ≈ 78, so the cash conversion cycle ≈ 75 + 92 − 78 = 89 days. A cycle that lengthens year after year usually needs more borrowing." },
  { h: "12. Return ratios: linking the balance sheet to profit", p: "The balance sheet tells you how much capital a business uses. The profit statement tells you what it earns. Together they show how well capital is used.", ul: [
   "Return on equity (ROE) = net profit ÷ average shareholders' equity. What the business earns on the owners' money.",
   "Return on capital employed (ROCE) = EBIT (operating profit before interest and tax) ÷ (equity + borrowings). What it earns on all the long-term money in the business, so debt cannot flatter it.",
   "Interest coverage = EBIT ÷ interest cost. How many times operating profit covers interest. Below 2 to 3 is uncomfortable for most businesses."
  ], p2: "Example Ltd, FY25: net profit ₹120 crore, average equity (1,000 + 1,080) ÷ 2 = ₹1,040 crore, so ROE ≈ 11.5%. EBIT ₹200 crore on capital employed of 1,080 + 650 = ₹1,730 crore gives ROCE ≈ 11.6%. Interest of ₹50 crore gives interest coverage of 4 times. If ROCE is below the interest rate on new loans, growth funded by debt destroys value." },
  { h: "13. Different industries, different balance sheets", p: "Ratios that are healthy in one industry are alarming in another. Always compare a company with close peers.", ul: [
   "Banks and NBFCs: loans are their assets and deposits or borrowings their raw material, so the current ratio and debt-to-equity do not apply. Read capital adequacy, gross and net NPAs (bad loans), provisions and, for banks, the CASA ratio.",
   "IT services and asset-light businesses: little debt and large cash. Watch receivable days and how cash is used.",
   "FMCG and retail: often negative working capital, because customers pay at once while suppliers are paid later. This is a strength, not a warning.",
   "Infrastructure, power and telecom: heavy debt against long-life assets is normal. Focus on interest coverage, debt repayment schedules and project delays.",
   "Real estate: inventory is land and unfinished projects, and customer advances sit in liabilities. Read project-wise disclosures."
  ] }
 ],
 extras: {
  examples: [
   { title: "Debt-to-equity in rupees", text: "Company A has debt of ₹200 crore and equity of ₹1,000 crore (debt-to-equity 0.2). Company B has debt of ₹1,500 crore on the same equity (1.5). If interest rates rise by 2 percentage points, A's yearly interest rises by about ₹4 crore and B's by about ₹30 crore. The same rate move hurts B more than seven times as much." },
   { title: "Book value per share and P/B", text: "Equity of ₹1,080 crore and 10 crore shares give a book value of ₹108 per share. At a share price of ₹216, price-to-book is 2: investors pay ₹2 for every ₹1 of net assets, betting that the business will earn well on them." }
  ],
  scenarios: [
   { title: "Sales up, cash down", text: "A company reports 10% sales growth and record profit. Its balance sheet shows cash down from ₹150 to ₹70 crore, borrowings up by ₹250 crore and receivable days up from 55 to 75. Before buying, read the note on receivables ageing (how much is overdue) and what management says about customer payments." },
   { title: "Goodwill that turns into a loss", text: "A company buys a rival for ₹800 crore when the rival's net assets are ₹300 crore, so ₹500 crore is recorded as goodwill. Two years later the acquired business disappoints and ₹300 crore of goodwill is written off. Reported profit and equity fall sharply that year, though the cash was actually spent two years earlier." }
  ],
  useCases: [
   "Screening out non-financial companies with debt-to-equity above 1 before doing deeper research.",
   "Judging whether a dividend is likely to continue: steady cash and low debt make it safer.",
   "Spotting working-capital stress early by tracking receivable and inventory days each year.",
   "Comparing price with book value per share to see how much of the price depends on future earnings."
  ],
  takeaways: [
   "Assets always equal liabilities plus equity; the question is what those assets and liabilities are made of.",
   "Read at least three to five years and the line items, not just one ratio.",
   "Receivable and inventory days reveal problems before profits do.",
   "ROE and ROCE show how well the business uses its capital; compare ROCE with the cost of borrowing.",
   "Judge a balance sheet against its industry: banks, IT companies and retailers look very different."
  ]
 },
 faq: [
  { q: "Where do I find a company's balance sheet?", a: "In the annual report, and in the half-yearly results: listed companies publish a statement of assets and liabilities with their results for September and March. Both are on the NSE and BSE company pages and on the company's investor relations page." },
  { q: "Standalone or consolidated: which should I read?", a: "Read consolidated when the company has subsidiaries, because it shows the whole group's debt and assets. Standalone can hide borrowings held in subsidiaries. Read standalone too when you want to see what the parent company itself owes." },
  { q: "Is a company with zero debt always better?", a: "It is safer, but not automatically better. A business earning a high ROCE can sensibly use some debt to grow. What matters is whether profit covers interest comfortably and whether borrowed money earns more than it costs." },
  { q: "What does negative 'other equity' or reserves mean?", a: "Accumulated losses are larger than the profits and premiums retained. The company has lost part of the money shareholders put in. Check whether losses are still growing and how the company is funding itself." }
 ]
};

FINANCE_MORE.en["cash-flow-statement"] = {
 sections: [
  { h: "9. How the statement is built: the indirect method", p: "Most Indian companies use the indirect method under Ind AS 7. The operating section starts from profit before tax and adjusts it to cash. Every adjustment tells you something.", ul: [
   "Add back non-cash costs: depreciation, amortisation, provisions and impairments reduce profit but use no cash in that year.",
   "Remove non-operating items: interest expense (shown under financing) and income from investments (shown under investing).",
   "Adjust for working capital: a rise in receivables or inventory uses cash (minus); a rise in payables keeps cash in the business (plus).",
   "Subtract income tax actually paid, which can differ from the tax shown in the profit statement."
  ] },
  { h: "10. A worked cash flow statement", p: "Example Ltd, FY25, ₹ crore. Profit after tax was ₹300 crore.", table: { head: ["Line", "₹ crore"], rows: [
   ["Profit before tax", "400"], ["Add: depreciation", "120"], ["Add: interest expense (moved to financing)", "50"], ["Increase in trade receivables", "−150"], ["Increase in inventories", "−130"], ["Increase in trade payables", "+20"], ["Income tax paid", "−100"],
   ["!Cash from operating activities", "210"],
   ["Purchase of property, plant and equipment (capex)", "−250"], ["Sale of investments", "+30"],
   ["!Cash from investing activities", "−220"],
   ["New borrowings", "+250"], ["Interest paid", "−50"], ["Dividends paid", "−60"],
   ["!Cash from financing activities", "+140"],
   ["!Net increase in cash", "+130"]
  ] }, p2: "What it shows: operating cash of ₹210 crore is only 70% of the ₹300 crore profit, because ₹280 crore went into receivables and inventory. Free cash flow is 210 − 250 = −₹40 crore, yet the company paid ₹60 crore in dividends. Cash rose by ₹130 crore only because it borrowed ₹250 crore. The headline 'cash increased' hides that the business did not fund itself." },
  { h: "11. Cash flow ratios to track", ul: [
   "Cash conversion = operating cash flow ÷ profit after tax. Over five years, 80% to 100% or more is healthy; persistently below 70% needs an explanation.",
   "Free cash flow = operating cash flow − capex. Add up five years: a business that never produces free cash depends on lenders or new shareholders.",
   "Capex ÷ depreciation: well above 1 means the company is expanding; close to 1 means it is mostly replacing worn-out assets.",
   "Free cash flow yield = free cash flow ÷ market capitalisation. A rough cash return on the price you pay for the whole company."
  ], p2: "Example: over five years a company reports total profit of ₹1,500 crore and total operating cash flow of ₹1,350 crore, so cash conversion is 90%. With total capex of ₹900 crore, five-year free cash flow is ₹450 crore." },
  { h: "12. Life-cycle signatures", p: "The signs (+ or −) of the three sections often reveal what stage a business is in. Use them as a first clue, then read the detail.", table: { head: ["Stage", "Operating", "Investing", "Financing", "What it usually means"], rows: [
   ["Start-up", "−", "−", "+", "Losses and investment funded by new equity or loans"],
   ["Growth", "+", "−", "+", "Profitable, but expansion needs more capital than the business makes"],
   ["Mature", "+", "−", "−", "Business funds its own capex and returns cash through dividends and debt repayment"],
   ["Stress", "−", "+", "+ or −", "Selling assets or borrowing to cover operating losses"]
  ] } },
  { h: "13. Industry differences", ul: [
   "Banks and NBFCs: lending is their operating activity, so operating cash flow is often negative when loans grow fast. Do not read it like a manufacturer's.",
   "Capital-heavy growth companies (power, telecom, new factories) can show negative free cash flow for years while building; check whether returns follow once projects start.",
   "Cyclical businesses (metals, cement, chemicals) swing between large and small cash flows; average them over a full cycle.",
   "Asset-light businesses (IT services, consumer brands) should convert most profit into free cash flow."
  ] }
 ],
 extras: {
  examples: [
   { title: "Free cash flow per share", text: "Operating cash flow ₹500 crore, capex ₹200 crore, so free cash flow is ₹300 crore. With 20 crore shares, that is ₹15 per share. A dividend of ₹6 per share uses 40% of free cash flow, leaving room to repay debt or invest." },
   { title: "Cash conversion over five years", text: "Company P: five-year profit ₹1,000 crore, operating cash ₹1,050 crore (105%). Company Q: five-year profit ₹1,000 crore, operating cash ₹450 crore (45%). Q's profits are much harder to trust: more than half never turned into cash." }
  ],
  scenarios: [
   { title: "Record profit, empty cash box", text: "A company reports its best-ever profit, but operating cash flow is negative because receivables doubled after it offered customers longer credit to boost sales. Two quarters later it raises short-term loans to pay suppliers. The cash flow statement showed the risk before the debt did." },
   { title: "A heavy investment year", text: "A cement company's free cash flow turns negative in a year when it builds a new plant (capex ₹1,200 crore against operating cash of ₹700 crore). This is acceptable if operating cash flow is steady and debt stays manageable. Check the next two years to see whether the new capacity adds cash." }
  ],
  useCases: [
   "Checking the quality of reported profit by comparing it with operating cash flow over five years.",
   "Judging whether dividends and buybacks are paid from free cash flow or from borrowing.",
   "Separating maintenance capex from growth capex using management commentary and capex ÷ depreciation.",
   "Spotting companies that repeatedly raise money because their operations do not produce cash."
  ],
  takeaways: [
   "Operating cash flow should track profit over several years; a widening gap is a major warning sign.",
   "Free cash flow, not profit, pays dividends, repays debt and funds growth without new money.",
   "Read the working-capital lines: rising receivables and inventory consume cash.",
   "A higher cash balance can come from borrowing; look at where the cash came from.",
   "Banks, capital-heavy and cyclical businesses need their own yardsticks."
  ]
 },
 faq: [
  { q: "Why is a bank's operating cash flow often negative?", a: "For a bank, giving loans is an operating activity, so rapid loan growth shows up as cash going out of operations, funded by deposits. Judge banks on asset quality, capital adequacy and deposit growth instead." },
  { q: "Is negative free cash flow always bad?", a: "No. A company building capacity can have negative free cash flow for a year or two. It becomes a concern when it lasts for many years, when operating cash flow itself is weak, or when debt keeps rising without returns." },
  { q: "Where is interest paid shown?", a: "Most non-financial companies show interest paid under financing activities, which Ind AS 7 allows. Some show it under operating activities. Check the company's policy note before comparing two companies." },
  { q: "How many years should I look at?", a: "At least five. Single years are distorted by large orders, capex projects or working-capital swings. Totals over five years show the real pattern." }
 ]
};

FINANCE_MORE.en["quarterly-results"] = {
 sections: [
  { h: "9. Deadlines, audit status and where to find results", p: "Under SEBI's listing rules, companies must file quarterly results within 45 days of the end of the quarter, and audited results for the full year within 60 days of the year end. The board meeting date is announced in advance on the exchange.", ul: [
   "Find results on the NSE or BSE company page under financial results and announcements, or on the company's investor relations page.",
   "Quarterly numbers are usually 'limited reviewed' by the auditor, a lighter check than a full audit. Year-end numbers are audited.",
   "Read the notes printed below the results table: they explain one-off items, changes in accounting and pending legal matters.",
   "Insiders cannot trade during the 'trading window closure' before results, a rule against insider trading."
  ] },
  { h: "10. Standalone, consolidated and segment results", p: "Companies publish standalone results (the listed company alone) and consolidated results (including subsidiaries). For a group, consolidated is the true picture. Many also report segments, such as by product line or region, which show where growth and profit actually come from.", p2: "Example: a company's consolidated revenue grows 12%, but its segment table shows the main business grew 3% while a new, loss-making segment grew 80%. The headline growth is real, but its quality is weaker than it looks." },
  { h: "11. Seasonality: why QoQ can mislead", p: "Many businesses have strong and weak quarters (festive demand, monsoon, year-end orders). Comparing a quarter with the one just before it (QoQ) mixes up seasonal swings with real change. Year-on-year (YoY) comparison removes most seasonality.", table: { head: ["Quarter", "Revenue (₹ crore)", "QoQ change", "YoY change"], rows: [
   ["Q3 FY25 (Oct–Dec)", "1,200", "", ""], ["Q4 FY25 (Jan–Mar)", "900", "−25%", ""], ["Q1 FY26 (Apr–Jun)", "950", "+6%", ""], ["Q2 FY26 (Jul–Sep)", "1,000", "+5%", ""],
   ["!Q3 FY26 (Oct–Dec)", "1,320", "+32%", "+10%"]
  ] }, p2: "A headline of '+32% QoQ' sounds excellent, but the festive quarter is always the strongest. The fair comparison is with the same quarter last year: +10%." },
  { h: "12. A worked result: reported versus underlying profit", p: "Example Ltd, Q2 FY26 against Q2 FY25, ₹ crore.", table: { head: ["Line", "Q2 FY26", "Q2 FY25", "Change"], rows: [
   ["Revenue", "1,000", "900", "+11%"], ["EBITDA", "180", "171", "+5%"], ["EBITDA margin", "18.0%", "19.0%", "−1.0 point"], ["Other income", "40", "10", "+300%"], ["Exceptional gain (sale of land)", "60", "0", ""],
   ["!Reported net profit", "190", "110", "+73%"],
   ["!Net profit excluding the one-off gain (after tax)", "145", "110", "+32%"]
  ] }, p2: "The headline says profit jumped 73%. Remove the one-time land sale and profit grew 32%; most of that came from other income (treasury gains), not from the business. Operating profit (EBITDA) grew only 5%, and margins shrank. The core business slowed even though the headline looks strong." },
  { h: "13. Results day: expectations and the price reaction", ul: [
   "Prices move on results versus expectations, not on results alone. Good numbers that miss analysts' estimates can send a stock down.",
   "Management guidance and the earnings call often move the price more than the past quarter's numbers.",
   "The first minutes after results are volatile, with wide spreads and gaps. Beginners should avoid trading the announcement itself.",
   "Read the investor presentation and listen to (or read the transcript of) the earnings call for the reasons behind the numbers.",
   "Option premiums are often high before results and fall sharply afterwards, even if the stock moves."
  ] }
 ],
 extras: {
  examples: [
   { title: "EPS from a result", text: "Net profit for the quarter is ₹145 crore and the company has 25 crore shares, so quarterly EPS is ₹5.80. Adding the last four quarters' EPS (for example ₹5.20 + ₹5.50 + ₹5.40 + ₹5.80 = ₹21.90) gives trailing twelve-month EPS, which is used for the P/E ratio." },
   { title: "Margin change in rupees", text: "Revenue ₹1,000 crore at an 18% EBITDA margin gives ₹180 crore. At last year's 19%, it would have been ₹190 crore. A one-point margin drop cost ₹10 crore of operating profit in a single quarter." }
  ],
  scenarios: [
   { title: "Profit beats, stock falls", text: "A company reports 20% profit growth, beating last year comfortably, but the stock falls 6%. Analysts expected 25%, and management cut its full-year revenue guidance on the call. The market priced in the future, not the past quarter." },
   { title: "A one-off hides a slowdown", text: "Net profit doubles because of a tax refund. Revenue grew 4% and margins fell. Investors who read only the headline bought; those who read the notes saw the refund and the weak core numbers." }
  ],
  useCases: [
   "Tracking revenue, EBITDA margin and profit for the last eight quarters in a simple sheet.",
   "Comparing reported profit with profit excluding exceptional items and unusual other income.",
   "Checking segment results to see which business is driving growth.",
   "Comparing management's guidance with the results that follow, to judge how reliable it is."
  ],
  takeaways: [
   "Compare a quarter with the same quarter last year to remove seasonality.",
   "Start from revenue and EBITDA margin; the bottom line can be moved by one-offs and other income.",
   "Read consolidated results for groups, and the segment table for where growth comes from.",
   "Results move prices against expectations and guidance, not in isolation.",
   "Quarterly numbers are limited-reviewed, not audited; the notes explain the unusual items."
  ]
 },
 faq: [
  { q: "When do companies announce quarterly results?", a: "Within 45 days of the quarter's end (60 days for the audited full-year results under SEBI rules). Most announce the board meeting date a week or more in advance; the exchange announcements page lists it." },
  { q: "Should I buy just before results?", a: "It is a gamble on an unknown outcome and on how the market will react. Many experienced investors wait for the results and the earnings call, then decide with the information in hand." },
  { q: "What is EBITDA and why do analysts use it?", a: "Earnings before interest, tax, depreciation and amortisation: operating profit before financing and accounting charges for assets. It helps compare operating performance, but it ignores the real cost of capex and debt, so never use it alone." },
  { q: "Why are the standalone and consolidated numbers so different?", a: "Consolidated results include subsidiaries, joint ventures and associates. If subsidiaries are large or loss-making, the two can differ a lot. For investors in the listed company, the consolidated numbers usually matter more." }
 ]
};

FINANCE_MORE.en["annual-report"] = {
 sections: [
  { h: "9. When it arrives and where to get it", p: "Companies with a March year end must hold their annual general meeting (AGM) within six months, so by 30 September. The annual report is sent to shareholders at least 21 days before the AGM and filed with the exchanges, so it is usually out between July and early September. Download it from the NSE or BSE company page or the company's investor relations page; past years are there too." },
  { h: "10. Audit opinions, key audit matters and CARO", p: "The auditor's report is the most important two or three pages in the document. Learn its vocabulary.", ul: [
   "Unmodified (clean) opinion: the accounts give a true and fair view. This is what you want to see.",
   "Qualified opinion: true and fair 'except for' a specific issue. Read the issue carefully.",
   "Adverse opinion or disclaimer of opinion: the accounts are materially wrong, or the auditor could not get enough evidence. Serious red flags.",
   "Emphasis of matter: a clean opinion that still points to an important issue, such as a large legal case or doubts about the company continuing as a going concern.",
   "Key audit matters (KAM): for listed companies, the areas the auditor found most significant, such as revenue recognition or valuation of goodwill.",
   "CARO report: an annexure in which the auditor reports on specific items such as loans to related parties, delays in paying statutory dues and frauds noticed."
  ], p2: "A mid-term auditor resignation, a change of auditor without a clear reason, or a qualification that repeats year after year should make you step back." },
  { h: "11. Governance, pay and sustainability disclosures", ul: [
   "Corporate governance report: board composition, the share of independent directors, meeting attendance and the committees.",
   "Directors' report: dividend, transfers to reserves, subsidiaries, and related-party contracts.",
   "Managerial remuneration: listed companies disclose each director's pay as a ratio to the median employee's pay. Compare pay growth with profit growth.",
   "Business Responsibility and Sustainability Report (BRSR): required for the largest listed companies; covers environmental, social and governance data.",
   "Shareholding and promoter details, including any pledged shares, appear in the report too."
  ] },
  { h: "12. A 60-minute reading plan", p: "A full report can run to 300 pages. This order puts the most informative pages first.", table: { head: ["Minutes", "Section", "What to look for"], rows: [
   ["0–10", "Independent auditor's report", "Type of opinion, key audit matters, emphasis of matter, CARO remarks"],
   ["10–20", "Financial statements and five-year summary", "Trend of sales, margins, profit, operating cash flow and debt"],
   ["20–35", "Notes to accounts", "Related-party transactions, contingent liabilities, borrowings, changes in accounting policies"],
   ["35–45", "Management discussion and analysis", "Segment performance, capacity, risks, and last year's promises against results"],
   ["45–55", "Corporate governance and directors' report", "Board independence, auditor changes, remuneration"],
   ["55–60", "Chairman's letter", "Tone and claims; compare with last year's letter"]
  ] } },
  { h: "13. Warning signs checklist", ul: [
   "Auditor resigns or is changed mid-term, or the audit opinion is qualified.",
   "Frequent changes in accounting policies or in the financial year end.",
   "Large or growing loans, advances or guarantees to promoter-group companies.",
   "Contingent liabilities (disputed taxes, guarantees, legal claims) that are large compared with equity.",
   "Profit growing while operating cash flow stays weak for several years.",
   "Remuneration rising much faster than profit, or many related-party payments for vague services.",
   "Promises in the chairman's letter that are repeated year after year without results."
  ] }
 ],
 extras: {
  examples: [
   { title: "Contingent liabilities against equity", text: "A company with equity of ₹2,000 crore discloses contingent liabilities of ₹900 crore, mostly disputed tax demands. If even a third of these turn into actual payments, about ₹300 crore (15% of equity) would be lost. Size the risk against the company's net worth." },
   { title: "Pay against profit", text: "Over three years, net profit rose 10% while the managing director's pay rose 80% and the ratio to median employee pay went from 120 to 210 times. The numbers come straight from the remuneration disclosure and say something about governance." }
  ],
  scenarios: [
   { title: "The note that mattered", text: "A company's profit and sales look steady. In the related-party note, loans to a promoter-owned company grew from ₹50 crore to ₹400 crore in two years, with no interest received. The front pages never mention it. A year later the loan is written off." },
   { title: "Comparing two years of promises", text: "Last year's report promised a new plant 'by next year'. This year's report says it is delayed to the following year, with costs up 30%. Reading two reports side by side shows management's track record better than either alone." }
  ],
  useCases: [
   "Checking the auditor's opinion and key audit matters before investing in a company.",
   "Finding related-party transactions and loans to promoter-group companies.",
   "Measuring contingent liabilities against equity.",
   "Judging management's credibility by comparing past promises with results."
  ],
  takeaways: [
   "Read the auditor's report and the notes first; the glossy pages come last.",
   "A clean opinion is the minimum; qualifications, disclaimers and auditor resignations are red flags.",
   "Related-party transactions and contingent liabilities hide in the notes.",
   "Governance shows in board independence, pay disclosures and auditor changes.",
   "Compare this year's report with last year's to test management's promises."
  ]
 },
 faq: [
  { q: "Do I need to read the whole annual report?", a: "No. Follow a plan: auditor's report, financial statements, key notes, management discussion and governance. That covers most of what matters in about an hour." },
  { q: "What is the difference between the annual report and quarterly results?", a: "Quarterly results are short, limited-reviewed tables. The annual report is audited and much fuller: it has the balance sheet, cash flow statement, notes, governance and management's discussion." },
  { q: "What is a going concern doubt?", a: "The auditor's warning that the company may not be able to keep operating for the next year, usually because of losses, debt defaults or funding gaps. It is one of the most serious warnings a report can contain." },
  { q: "Where are related-party transactions disclosed?", a: "In a dedicated note to the financial statements, and in the directors' report for material contracts. Look for loans, guarantees, purchases and sales with promoter-group companies." }
 ]
};

FINANCE_MORE.en["shareholding-pattern"] = {
 sections: [
  { h: "8. When it is filed and how it is organised", p: "Listed companies file their shareholding pattern with the exchanges every quarter, within 21 days of the quarter's end, under SEBI's listing rules. Find it on the NSE or BSE company page under 'Shareholding pattern'. The format is standard:", ul: [
   "Promoter and promoter group, Indian and foreign, with shares pledged or otherwise encumbered.",
   "Public, institutions: mutual funds, foreign portfolio investors (FPIs), insurance companies, banks and other financial institutions.",
   "Public, non-institutions: individuals (split by holding size), companies (bodies corporate), NRIs, trusts and others.",
   "Shares held by custodians against depository receipts, if any.",
   "The full list of holders above 1% in each category."
  ] },
  { h: "9. Minimum public shareholding and free float", p: "Listed companies must keep at least 25% of their shares with the public (minimum public shareholding), so promoters can hold at most 75%. Newly listed and government-owned companies get extra time to comply. Promoters above the limit must sell, often through an offer for sale or a placement, which can weigh on the price. Index providers use free-float market capitalisation (excluding promoter holding), so a higher free float gives a stock more weight in indices such as the NIFTY 50." },
  { h: "10. Reading a four-quarter trend", p: "One quarter tells you little. Lay four or more quarters side by side, % of total shares:", table: { head: ["Holder", "Dec", "Mar", "Jun", "Sep"], rows: [
   ["Promoter and promoter group", "55.0", "55.0", "52.0", "50.0"], ["Promoter shares pledged (% of promoter holding)", "0", "5", "12", "20"], ["Foreign portfolio investors", "18.0", "20.0", "22.0", "23.0"], ["Mutual funds", "8.0", "9.0", "10.0", "11.0"], ["Other domestic institutions", "4.0", "4.0", "4.0", "4.0"], ["Individuals and others", "15.0", "12.0", "12.0", "12.0"]
  ] }, p2: "The picture is mixed: institutions keep buying, but promoters have sold 5 points of the company and pledged a fifth of what they still own. Before trusting the institutional buying, find out why promoters are selling and borrowing against their shares: read exchange announcements, the annual report and any credit rating notes." },
  { h: "11. Insider trades, bulk deals and block deals", ul: [
   "Insider trading disclosures: promoters, directors and key employees must report their trades to the company, which informs the exchanges, once trades in a quarter cross ₹10 lakh. These appear within days, long before the next quarterly pattern.",
   "Pledge disclosures: promoters must disclose the creation or release of pledges and other encumbrances within a few working days.",
   "Bulk deals: a single client's trades in a day totalling more than 0.5% of a company's shares, published daily by the exchanges.",
   "Block deals: large trades done in a separate trading window, also published daily.",
   "Promoter buying with their own money in the open market is usually a stronger signal than any statement."
  ] },
  { h: "12. Patterns and what they can mean", ul: [
   "Promoter stake rising through open-market purchases: confidence, or a defence against a takeover.",
   "Promoter stake falling through an offer for sale: may be to meet the 25% public rule or to repay promoter debt. Read the reason.",
   "Pledge rising quarter after quarter: the promoter is borrowing against shares; a fall in price can trigger forced selling.",
   "FPIs and mutual funds leaving while retail holding rises: professionals may see risks that individuals do not.",
   "Mutual funds steadily adding over several quarters: research-backed interest, but not a guarantee.",
   "Sudden jumps in holding by unknown entities: check announcements and avoid stocks with unexplained concentration."
  ] }
 ],
 extras: {
  examples: [
   { title: "Pledge as % of promoter holding", text: "Promoters hold 50% of 20 crore shares, that is 10 crore shares, and have pledged 2 crore of them. The pledge is 20% of promoter holding and 10% of the whole company. Exchanges and data sites show both numbers; know which one you are reading." },
   { title: "Free float in rupees", text: "A company with a market capitalisation of ₹10,000 crore has 70% promoter holding. Its free-float market capitalisation is ₹3,000 crore, which is what index weights and much institutional interest depend on." }
  ],
  scenarios: [
   { title: "The slow pledge build-up", text: "Over six quarters, promoter pledge rises from 0% to 45% of promoter holding while the stock falls 30%. Lenders issue margin calls, the promoter cannot add collateral, and pledged shares are sold in the market, pushing the price down another 25% in a week." },
   { title: "Selling to meet the public float rule", text: "A recently listed company's promoter holds 82%. To reach the 75% limit, the promoter sells 7% through an offer for sale at a discount. The stock dips during the sale, but the business is unchanged and liquidity improves afterwards." }
  ],
  useCases: [
   "Checking promoter pledge before buying any stock, especially small and mid-sized companies.",
   "Tracking whether mutual funds and FPIs are adding or reducing over several quarters.",
   "Following insider-trade and bulk-deal disclosures between quarterly filings.",
   "Understanding why a stock may face supply from a promoter sale or minimum public shareholding compliance."
  ],
  takeaways: [
   "Read at least four quarters; direction matters more than one number.",
   "Rising promoter pledge is a risk signal, whatever the reason.",
   "Promoters can hold at most 75%; selling to meet this rule is not a judgement on the business.",
   "Insider-trade, pledge and bulk-deal disclosures update much faster than the quarterly pattern.",
   "Combine ownership changes with results and the annual report before acting."
  ]
 },
 faq: [
  { q: "Is high promoter holding always good?", a: "It shows the owners have a lot at stake, which aligns them with shareholders. But very high holding means low free float and less liquidity, and it matters more whether promoters are pledging or selling than how much they own." },
  { q: "Where can I see the latest promoter trades?", a: "In the insider trading (SEBI PIT) and SAST disclosures on the NSE and BSE announcement pages. They appear within days of the trade." },
  { q: "Why would a promoter pledge shares?", a: "To raise loans, for the company or for other businesses or personal needs. A small, stable pledge is common; a rising pledge, especially when the price is falling, raises the risk of forced selling." },
  { q: "Do mutual funds buying a stock mean I should buy it too?", a: "No. Funds have different horizons, sizes and reasons, and they can be wrong. Treat it as one input and check the business yourself." }
 ]
};

FINANCE_MORE.en["corporate-actions"] = {
 sections: [
  { h: "9. Dates under T+1 settlement", p: "Indian equities settle on T+1, so the ex-date and the record date now fall on the same day. To be entitled to a dividend, bonus or split, you must hold the shares at the end of the record date, which means buying no later than the trading day before the ex-date. Shares bought on the ex-date do not carry the benefit.", p2: "Example: the record date (and ex-date) is a Thursday. Buy on Wednesday or earlier to receive the dividend; your purchase settles on Thursday, so you are a holder at the end of the record date. Shares bought on Thursday settle on Friday, too late. Selling on Thursday still keeps your entitlement." },
  { h: "10. Before and after: what each action does to 100 shares", p: "You hold 100 shares at ₹1,000 (holding value ₹1,00,000). Approximate prices just after each action, before any market move:", table: { head: ["Action", "Shares after", "Price after", "Your position"], rows: [
   ["Dividend of ₹20 per share", "100", "≈ ₹980", "₹98,000 in shares + ₹2,000 cash (taxable)"],
   ["Bonus 1:1 (one free share for each held)", "200", "≈ ₹500", "₹1,00,000, no change"],
   ["Split from ₹10 to ₹2 face value (1 into 5)", "500", "≈ ₹200", "₹1,00,000, no change"],
   ["Rights 1 for 5 at ₹800, subscribed", "120", "≈ ₹967", "₹1,16,000 after paying ₹16,000"],
   ["Buyback at ₹1,200, 10 shares accepted", "90", "market price", "₹12,000 cash + 90 shares"]
  ] }, p2: "The rights price comes from the theoretical ex-rights price: (100 × ₹1,000 + 20 × ₹800) ÷ 120 ≈ ₹967. If you do not subscribe and do not sell your rights entitlements, your holding is diluted and you lose that value." },
  { h: "11. How each action is taxed in India", ul: [
   "Dividends: taxed in your hands at your income tax slab. The company deducts TDS of 10% if your dividends from it exceed ₹10,000 in a financial year (the threshold was ₹5,000 until 2024–25).",
   "Buybacks (from 1 October 2024): the whole amount you receive is taxed as dividend income at your slab. The cost of the shares bought back becomes a capital loss that you can set off against capital gains.",
   "Bonus shares: their cost is zero and their holding period starts on the allotment date. The cost of your original shares does not change.",
   "Splits: your original cost is divided across the new shares, and the holding period continues from the original purchase date.",
   "Keep the company's announcements and your contract notes: you will need them to work out gains correctly."
  ], p2: "Tax rules change with each Budget. Check the current rules or ask a tax adviser before acting on a corporate action for tax reasons." },
  { h: "12. Rights issues and rights entitlements", ul: [
   "Rights entitlements (REs) are credited to your demat account before the issue opens.",
   "You can apply through your broker or bank (ASBA), buy additional REs, or sell your REs on the exchange during the trading period.",
   "If you do nothing, the REs lapse and you lose their value, while your percentage holding falls.",
   "Compare the rights price with the market price and ask why the company needs the money: growth, or repaying debt?"
  ] },
  { h: "13. Mergers, demergers and derivatives adjustments", ul: [
   "Merger: you receive shares of the merged company in a set swap ratio, for example 3 shares of B for every 5 of A.",
   "Demerger: you keep the parent's shares and receive shares of the new company. The company announces how to split your original cost between them.",
   "Futures and options: the exchanges adjust open contracts for bonus issues, splits and rights, and for unusually large dividends, by changing the strike prices and lot sizes so the position's value is unchanged.",
   "Charts: data providers adjust price history for splits and bonuses; compare adjusted and unadjusted charts before drawing conclusions."
  ] }
 ],
 extras: {
  examples: [
   { title: "Dividend yield", text: "A share at ₹500 pays dividends of ₹15 a year, a dividend yield of 3%. At a 30% tax slab you keep about ₹10.50 after tax, a post-tax yield of 2.1%." },
   { title: "Average cost after a bonus", text: "You bought 50 shares at ₹800 (₹40,000). After a 1:1 bonus you hold 100 shares. The 50 original shares keep their ₹800 cost; the 50 bonus shares have zero cost with a holding period from allotment. Your broker's average may show ₹400; for tax, the split matters." }
  ],
  scenarios: [
   { title: "The ex-date 'crash'", text: "A stock opens 9% lower and new investors panic. It went ex-dividend for a special dividend of ₹90 on a ₹1,000 share. Holders received the cash; the business did not lose value. Price charts and P&L screens without adjustments can make this look like a loss." },
   { title: "Forgotten rights entitlements", text: "An investor ignores a rights issue at a 25% discount. The REs lapse, the share price adjusts towards the ex-rights price, and the holding's value falls by about 4% overnight. Selling the REs would have recovered most of that value." }
  ],
  useCases: [
   "Timing a purchase so you are eligible for a dividend, or deciding it is not worth it after tax.",
   "Recalculating your cost and holding period after a bonus or split for capital gains tax.",
   "Deciding whether to subscribe to, sell or ignore a rights issue.",
   "Reading adjusted charts correctly around splits, bonuses and special dividends."
  ],
  takeaways: [
   "Bonus issues and splits change the share count and price, not the value of your holding.",
   "Under T+1, the ex-date and record date are the same day: buy at least one trading day before.",
   "Dividends and buyback proceeds are taxed at your slab; plan with post-tax numbers.",
   "Act on rights entitlements: subscribe or sell them, or lose value.",
   "Derivatives and charts are adjusted for corporate actions; know which version you are looking at."
  ]
 },
 faq: [
  { q: "Is a bonus issue free money?", a: "No. Your number of shares rises, but the price falls in the same proportion, so the value of your holding is unchanged. It can improve liquidity and signals confidence, but it adds no value by itself." },
  { q: "Should I buy a stock just before the dividend?", a: "Usually it makes little difference: the price falls by about the dividend on the ex-date, and the dividend is taxed at your slab. Buy because you want to own the business, not for the dividend date." },
  { q: "Why did my holding show a loss after a split?", a: "Some apps update the share count and price at different times. Check that the number of shares has multiplied; the value should be the same once both are updated." },
  { q: "Do I have to take part in a buyback?", a: "No, it is optional. Compare the buyback price with the market price, the acceptance ratio, and the tax: since October 2024 the full buyback amount is taxed as dividend in your hands." }
 ]
};
