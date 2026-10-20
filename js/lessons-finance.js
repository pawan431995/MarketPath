// Financial reading modules: Balance Sheet, Cash Flow Statement, Quarterly Results, Annual Report,
// Shareholding Pattern, Valuation Basics, Corporate Actions. English (en) and Hindi (hi).
// Numbers are illustrative. Filing rules and formats change; check SEBI and exchange rules and the company's own filings.
const FINANCE_SLUGS = ["balance-sheet", "cash-flow-statement", "quarterly-results", "annual-report", "shareholding-pattern", "valuation-basics", "corporate-actions"];

Object.assign(LESSONS.en, {
 "balance-sheet": { title: "How to Read a Balance Sheet", level: "intermediate", time: "13 topics",
  summary: "What a balance sheet shows, how to read assets, liabilities and equity, and the ratios that reveal financial strength.",
  sections: [{ h: "Start here", p: "A balance sheet is a photograph of a company on one date. It answers: what does the company own, what does it owe, and what is left for shareholders." }] },
 "cash-flow-statement": { title: "How to Read a Cash Flow Statement", level: "intermediate", time: "13 topics",
  summary: "Where a company's real cash comes from and goes, and why cash flow can tell you more than profit.",
  sections: [{ h: "Start here", p: "Profit is an opinion shaped by accounting rules. Cash is a fact. The cash flow statement shows whether profit turns into money." }] },
 "quarterly-results": { title: "How to Read Quarterly Results", level: "intermediate", time: "13 topics",
  summary: "How to read the numbers in a quarterly results filing, compare them correctly, and spot one-off items.",
  sections: [{ h: "Start here", p: "Quarterly results arrive every three months. The headline number is rarely the whole story. Learn to read the lines beneath it." }] },
 "annual-report": { title: "How to Read an Annual Report", level: "intermediate", time: "13 topics",
  summary: "The parts of a company's annual report, what each section tells you, and the warning signs to look for.",
  sections: [{ h: "Start here", p: "The annual report is the most complete public document a listed company publishes. Most investors read only the first pages. The real information is often in the notes and the auditor's report." }] },
 "shareholding-pattern": { title: "Shareholding Pattern and Promoter Holding", level: "intermediate", time: "12 topics",
  summary: "Who owns a company, how promoter, institutional and public holdings change, and what pledged shares mean.",
  sections: [{ h: "Start here", p: "The shareholding pattern shows who owns the company and how that changes each quarter. Changes in ownership can be as informative as the numbers." }] },
 "valuation-basics": { title: "Valuation Basics: What Is a Share Worth?", level: "advanced", time: "8 topics",
  summary: "P/E, P/B, EV/EBITDA, PEG and discounted cash flow explained, with their limits and how to combine them.",
  sections: [{ h: "Start here", p: "Valuation estimates what a business is worth per share. No single number is the answer. Use several methods, compare with peers, and buy only with a margin of safety." }] },
 "corporate-actions": { title: "Corporate Actions: Dividends, Bonus, Splits, Rights and Buybacks", level: "intermediate", time: "13 topics",
  summary: "What companies do with shares and cash, how each action changes the price and your holding, and how to avoid confusion on the ex-date.",
  sections: [{ h: "Start here", p: "Corporate actions change the number of shares, the price, or the cash you receive. Many beginners mistake a price drop on the ex-date for a fall in value. It is often just an adjustment." }] }
});

Object.assign(LESSONS.hi, {
 "balance-sheet": { title: "बैलेंस शीट कैसे पढ़ें", level: "intermediate", time: "13 विषय",
  summary: "बैलेंस शीट क्या दिखाती है, संपत्ति, देनदारी और इक्विटी कैसे पढ़ें, और वित्तीय मज़बूती बताने वाले अनुपात।",
  sections: [{ h: "यहाँ से शुरू करें", p: "बैलेंस शीट एक तारीख़ पर कंपनी की तस्वीर है। यह बताती है: कंपनी के पास क्या है, उसे क्या चुकाना है, और शेयरधारकों के लिए क्या बचता है।" }] },
 "cash-flow-statement": { title: "कैश फ़्लो स्टेटमेंट कैसे पढ़ें", level: "intermediate", time: "13 विषय",
  summary: "कंपनी का असली नकद कहाँ से आता और कहाँ जाता है, और कैश फ़्लो मुनाफ़े से ज़्यादा क्या बताता है।",
  sections: [{ h: "यहाँ से शुरू करें", p: "मुनाफ़ा लेखांकन नियमों से बनी राय है। नकद एक तथ्य है। कैश फ़्लो स्टेटमेंट दिखाता है कि मुनाफ़ा असली पैसे में बदलता है या नहीं।" }] },
 "quarterly-results": { title: "तिमाही नतीजे कैसे पढ़ें", level: "intermediate", time: "13 विषय",
  summary: "तिमाही नतीजों के आँकड़े कैसे पढ़ें, सही तुलना कैसे करें, और एक-बार की मदों को कैसे पहचानें।",
  sections: [{ h: "यहाँ से शुरू करें", p: "तिमाही नतीजे हर तीन महीने में आते हैं। मुख्य संख्या पूरी कहानी शायद ही बताती है। उसके नीचे की पंक्तियाँ पढ़ना सीखें।" }] },
 "annual-report": { title: "सालाना रिपोर्ट कैसे पढ़ें", level: "intermediate", time: "13 विषय",
  summary: "कंपनी की सालाना रिपोर्ट के हिस्से, हर हिस्सा क्या बताता है, और चेतावनी के संकेत।",
  sections: [{ h: "यहाँ से शुरू करें", p: "सालाना रिपोर्ट सूचीबद्ध कंपनी का सबसे पूरा सार्वजनिक दस्तावेज़ है। ज़्यादातर निवेशक केवल पहले पन्ने पढ़ते हैं। असली जानकारी अक्सर नोट्स और ऑडिटर की रिपोर्ट में होती है।" }] },
 "shareholding-pattern": { title: "शेयरहोल्डिंग पैटर्न और प्रमोटर होल्डिंग", level: "intermediate", time: "12 विषय",
  summary: "कंपनी का मालिक कौन है, प्रमोटर, संस्थागत और सार्वजनिक होल्डिंग कैसे बदलती है, और गिरवी शेयरों का क्या मतलब है।",
  sections: [{ h: "यहाँ से शुरू करें", p: "शेयरहोल्डिंग पैटर्न दिखाता है कि कंपनी का मालिक कौन है और यह हर तिमाही कैसे बदलता है। मालिकाना हक़ में बदलाव भी आँकड़ों जितना जानकारीपूर्ण हो सकता है।" }] },
 "valuation-basics": { title: "वैल्यूएशन की मूल बातें: शेयर की क़ीमत क्या होनी चाहिए?", level: "advanced", time: "8 विषय",
  summary: "P/E, P/B, EV/EBITDA, PEG और डिस्काउंटेड कैश फ़्लो समझाए गए, उनकी सीमाओं के साथ और उन्हें मिलाकर कैसे इस्तेमाल करें।",
  sections: [{ h: "यहाँ से शुरू करें", p: "वैल्यूएशन अनुमान लगाता है कि कारोबार की प्रति शेयर वैल्यू क्या है। कोई एक संख्या जवाब नहीं है। कई तरीके इस्तेमाल करें, साथियों से तुलना करें, और सुरक्षा मार्जिन के साथ ही ख़रीदें।" }] },
 "corporate-actions": { title: "कॉर्पोरेट एक्शन: डिविडेंड, बोनस, स्प्लिट, राइट्स और बायबैक", level: "intermediate", time: "13 विषय",
  summary: "कंपनियाँ शेयर और नकद के साथ क्या करती हैं, हर एक्शन कीमत और आपकी होल्डिंग को कैसे बदलता है, और एक्स-डेट पर भ्रम से कैसे बचें।",
  sections: [{ h: "यहाँ से शुरू करें", p: "कॉर्पोरेट एक्शन शेयरों की संख्या, कीमत, या आपको मिलने वाली नकद राशि बदलते हैं। कई नए निवेशक एक्स-डेट पर कीमत गिरने को मूल्य घटना समझ लेते हैं, जबकि वह अक्सर केवल समायोजन होता है।" }] }
});

// Full sections, English.
Object.assign(LESSON_OVERRIDES.en, {
 "balance-sheet": { sections: [
  { h: "1. What a balance sheet is", p: "A balance sheet lists everything a company owns (assets), everything it owes (liabilities) and the owners' stake (equity) on one date. It always balances: Assets = Liabilities + Equity. Read it with the profit statement and the cash flow statement, because each shows a different part of the story.", ul: [
   "Assets: resources that will bring future benefit (cash, receivables, inventory, property, investments).",
   "Liabilities: obligations to pay (loans, payables, provisions).",
   "Equity: what is left for shareholders after liabilities: share capital plus reserves and surplus."
  ] },
  { h: "2. Current and non-current assets", p: "Assets are split by how quickly they turn into cash. Current assets convert to cash within a year (cash, receivables, inventory). Non-current assets stay longer (factories, land, long-term investments). A company with little cash and large short-term obligations is under pressure even if its total assets are large." },
  { h: "3. Current and non-current liabilities", p: "Liabilities follow the same split. Short-term borrowings and payables due within a year are current. Long-term loans are non-current. Compare current liabilities with current assets to judge short-term safety." },
  { h: "4. Reserves, goodwill and intangibles", p: "Reserves are profits kept in the business over time, a sign of past earnings retained. Goodwill and intangible assets appear when a company buys another business for more than its net assets. Large goodwill means the company paid a premium, and it can be written down if the acquisition disappoints." },
  { h: "5. Key ratios from the balance sheet", ul: [
   "Current ratio = current assets ÷ current liabilities. Above 1.5 is generally comfortable; below 1 needs explanation.",
   "Debt-to-equity = total debt ÷ shareholders' equity. Lower is safer, but the norm depends on the industry (banks and infrastructure carry more debt).",
   "Book value per share = shareholders' equity ÷ number of shares.",
   "Working capital = current assets − current liabilities. Negative working capital is normal for some businesses (like retail with fast cash) and a warning for others."
  ], p2: "Example: current assets ₹800 crore, current liabilities ₹500 crore, so current ratio = 1.6. Total debt ₹600 crore, equity ₹1,500 crore, debt-to-equity = 0.4." },
  { h: "6. Check the trend, not one year", p: "Compare at least three to five years. Look for rising receivables faster than sales (customers may be slow to pay), inventory building up (products may not be selling), and debt rising while equity is flat. These trends often show problems before the profit does." },
  { h: "7. Common traps", ul: [
   "Treating total assets as strength. Assets can be overvalued or illiquid.",
   "Ignoring off-balance-sheet commitments and contingent liabilities, which are listed in the notes.",
   "Missing related-party balances, such as loans to group companies.",
   "Comparing a bank's balance sheet with a manufacturer's using the same ratios."
  ] },
  { h: "8. A reading routine", ul: [
   "Check the total and confirm assets equal liabilities plus equity.",
   "Compare current ratio and debt with the last three years.",
   "Read the notes on borrowings, contingent liabilities and related parties.",
   "Compare the company's ratios with two or three close peers."
  ] }
 ] },
 "cash-flow-statement": { sections: [
  { h: "1. Why cash matters more than profit", p: "A company can report profit and still run out of cash. Profit includes sales not yet paid, costs not yet paid, and accounting estimates. Cash flow shows the money that actually moved. Many investors check the cash flow statement first for this reason." },
  { h: "2. The three sections", ul: [
   "Operating cash flow (OCF): cash from the core business: customers paying, suppliers and salaries paid, taxes paid.",
   "Investing cash flow: cash spent on assets (capital expenditure) or received from selling them or investments.",
   "Financing cash flow: cash from borrowing or share issues, and cash paid out as loan repayments, dividends or buybacks."
  ] },
  { h: "3. Free cash flow", p: "Free cash flow (FCF) = operating cash flow − capital expenditure. It is the cash left after keeping the business running and growing. Positive, growing free cash flow lets a company pay dividends, repay debt or expand without new borrowing.", p2: "Example: OCF ₹400 crore, capex ₹150 crore, so FCF = ₹250 crore." },
  { h: "4. Profit versus operating cash flow", p: "Over several years, operating cash flow should move roughly in line with net profit. If profit is rising but operating cash flow is falling or negative, check receivables and inventory in the balance sheet. This gap is one of the most important warning signs in financial analysis." },
  { h: "5. Capital expenditure: growth or maintenance?", p: "Capex may be to maintain the business or to grow it. A company that spends heavily just to stand still has less free cash for shareholders. Read the management discussion to see which kind of spending it is." },
  { h: "6. Financing and dividends", p: "A company that pays dividends from operating cash is generally healthier than one that borrows to pay them. Frequent new share issues dilute existing owners. Check whether financing inflows are used for growth or to cover operating shortfalls." },
  { h: "7. A worked example", p: "Company X: net profit ₹300 crore, operating cash flow ₹280 crore, capex ₹120 crore, dividends ₹60 crore. FCF = ₹160 crore, enough to cover dividends with room to spare. Company Y: net profit ₹300 crore, operating cash flow −₹20 crore, borrowing ₹100 crore to fund working capital. Y's profit is much weaker quality." },
  { h: "8. Red flags", ul: [
   "Operating cash flow negative for several years while profit is positive.",
   "Receivables rising faster than sales.",
   "Repeated new borrowing to fund operations.",
   "Large one-time inflows from selling assets that hide weak operations."
  ] }
 ] },
 "quarterly-results": { sections: [
  { h: "1. What a quarterly filing contains", p: "Listed companies file quarterly results with the exchanges, normally within a set deadline after each quarter (check the current SEBI rules). A filing has the income statement for the quarter, comparisons with earlier periods, and often segment and cash details. The first page is a summary; the detail is in the tables." },
  { h: "2. The key lines, top to bottom", ul: [
   "Revenue (sales): total income from core operations.",
   "Operating expenses and EBITDA: earnings before interest, tax, depreciation and amortisation. A measure of operating performance.",
   "Depreciation, interest and other income: the non-operating items.",
   "Profit before tax (PBT), tax, and profit after tax (PAT): the bottom line.",
   "EPS: profit per share, the figure most used in valuation."
  ] },
  { h: "3. Compare the right periods", p: "Year-on-year (YoY) compares the same quarter of last year and removes seasonality. Quarter-on-quarter (QoQ) compares with the previous quarter and shows momentum, but can mislead for seasonal businesses such as festive-season retail. Use YoY for the trend and QoQ for recent direction." },
  { h: "4. Margins: the quality of growth", p: "Revenue growth is not enough. Check EBITDA margin (EBITDA ÷ revenue) and net margin (PAT ÷ revenue). If sales grow but margins shrink, growth is being bought at a cost. Stable or rising margins with growing sales are the best sign.", p2: "Example: revenue up 20% YoY, EBITDA margin from 18% to 16%. Sales grew, but the business earned less per rupee of sales." },
  { h: "5. One-off and exceptional items", p: "Profit can jump because of a one-time gain, such as selling a property or a tax refund. Exceptional items are shown separately. Remove them to see the normal earning power. A quarter that looks strong only because of exceptional income is weaker than the headline suggests." },
  { h: "6. Other income matters", p: "Other income can be interest on cash or gains on investments. For a company whose profit depends mainly on other income, the core business is weak. Check how much of PBT comes from operations." },
  { h: "7. Read the commentary and guidance", p: "The results press release and the earnings call explain the numbers. Management may give guidance on sales, margins or capex. Compare what they promised last quarter with what happened. Missed guidance repeated over quarters is a warning." },
  { h: "8. A reading checklist", ul: [
   "Revenue growth YoY and QoQ.",
   "EBITDA and net margin trend.",
   "Exceptional items and other income share of profit.",
   "EPS growth and tax rate change.",
   "Operating cash flow in the next annual report, to confirm profit turns into cash.",
   "Management's guidance compared with actual results."
  ] }
 ] },
 "annual-report": { sections: [
  { h: "1. What the annual report is", p: "The annual report is a company's full yearly document, prepared for shareholders and filed with the exchanges. It combines the financial statements, the directors' report, management's discussion, governance information and notices for the annual general meeting (AGM)." },
  { h: "2. Read in this order", ul: [
   "Chairman's and CEO's letters: the story management wants you to hear. Useful for strategy, not proof.",
   "Management Discussion and Analysis (MD&A): industry outlook, business performance, risks and opportunities. Often the most useful section.",
   "Directors' report: dividend recommendation, important events, related-party transactions summary.",
   "Auditor's report: the opinion on the financial statements. An unmodified opinion is normal; qualifications or emphasis of matter paragraphs need reading.",
   "Financial statements and notes: the detail behind every number.",
   "Corporate governance report: board composition, committees, remuneration and shareholder complaints."
  ] },
  { h: "3. The auditor's report", p: "The auditor states whether the statements give a true and fair view. Watch for: a qualified opinion (an exception), an emphasis of matter (an important point the auditor wants you to notice), and key audit matters that show where the risks were judged to be highest. Changes of auditor should be checked in the reasons given." },
  { h: "4. The notes to accounts", p: "The notes explain accounting policies, borrowings, contingent liabilities (possible future obligations), related-party transactions, segment results and employee benefits. Many important facts appear only in the notes. Reading them is what separates careful analysis from skimming." },
  { h: "5. Related-party transactions and governance", p: "Transactions with companies owned by promoters or directors can be fair, or can move money out of the company. Check the size, the terms and whether they are recurring. Look at board independence, audit committee activity and any regulatory penalties listed." },
  { h: "6. Management commentary on risks", p: "Companies must list risk factors. Read them for specifics: customer concentration, regulation, currency exposure, litigation. Vague lists that do not change year to year are less useful than detailed risks with what management is doing about them." },
  { h: "7. Compare two years side by side", p: "Read the same sections across two annual reports. Look for changes in accounting policies, new large liabilities, changes in the auditor, and shifts in the segment mix. A change in wording can be as important as a change in numbers." },
  { h: "8. A reading checklist", ul: [
   "Read the MD&A before the letters.",
   "Check the auditor's opinion type and any emphasis of matter.",
   "Read the notes on borrowings, contingent liabilities and related parties.",
   "Compare risk factors with last year's report.",
   "Check dividend history and the payout relative to cash flow."
  ] }
 ] },
 "shareholding-pattern": { sections: [
  { h: "1. What the shareholding pattern shows", p: "The shareholding pattern is filed by listed companies every quarter. It shows what percentage of shares is held by promoters (the founders and controlling group), public institutions (mutual funds, insurance, foreign and domestic institutions), and the public (retail investors)." },
  { h: "2. The main categories", ul: [
   "Promoter and promoter group: the controlling owners. High promoter holding often signals commitment, but can also mean limited free float.",
   "Foreign institutional investors (FII) and domestic institutional investors (DII): mutual funds, insurers and others. Their buying and selling is watched closely.",
   "Public: retail investors and others holding small amounts.",
   "Non-promoter, non-public: shares held by certain trusts and employee benefit schemes."
  ] },
  { h: "3. What changes mean", p: "A rise in institutional holding over several quarters can show growing professional confidence. A fall in promoter holding can signal selling, or dilution from a new share issue. Read the change together with the reason given. A single quarter's change matters less than a trend over four to six quarters." },
  { h: "4. Pledged shares: a risk signal", p: "Promoters may pledge their shares to borrow money. The shareholding pattern shows the pledged share of promoter holding. High pledges are risky: if the share price falls, lenders can sell the pledged shares, which can push the price down further. Watch pledges that rise quickly." },
  { h: "5. Free float and liquidity", p: "Free float is the part of shares not held by promoters or locked in. A small free float can mean thin trading, wider spreads and more volatile prices. Check the free float before trading a stock in size." },
  { h: "6. Using the pattern with other data", p: "Combine ownership changes with results, cash flow and price trend. Rising institutional buying alongside improving margins is a stronger signal than either alone. Rising pledges with falling profits is a warning." },
  { h: "7. A reading checklist", ul: [
   "Promoter holding and its change over four to six quarters.",
   "Promoter pledge percentage and whether it is rising.",
   "FII and DII holding trend.",
   "Free float size.",
   "Changes that line up with results, or that are unexplained."
  ] }
 ] },
 "valuation-basics": { sections: [
  { h: "1. Price is not value", p: "A share price is what the market pays today. Value is what the business is worth based on its future cash flows. Valuation tries to estimate the second and compare it with the first. The gap between the two is the margin of safety." },
  { h: "2. P/E: price to earnings", p: "P/E = price ÷ earnings per share. It shows how many years of current earnings you pay for. Compare it with the company's own history and with peers in the same industry. A low P/E is not automatically cheap if earnings are falling.", p2: "Example: price ₹450, EPS ₹30, so P/E = 15. If peers average 20, the stock looks inexpensive, but check growth and risk first." },
  { h: "3. P/B: price to book", p: "P/B = price ÷ book value per share. It is most useful for banks and asset-heavy businesses, where book value is meaningful. For asset-light businesses such as software, book value says little and P/B can mislead." },
  { h: "4. EV/EBITDA: a capital-structure-neutral view", p: "Enterprise value (EV) = market capitalisation + debt − cash. EV/EBITDA compares the whole business value with operating earnings before interest, tax, depreciation and amortisation. It is useful for comparing companies with different debt levels." },
  { h: "5. PEG: growth-adjusted P/E", p: "PEG = P/E ÷ expected earnings growth rate (in percent). A PEG around 1 is often read as fairly priced, below 1 as possibly cheap, above 2 as expensive. Growth forecasts are uncertain, so treat the result as a rough guide." },
  { h: "6. Discounted cash flow (DCF): the basic idea", p: "DCF estimates the future free cash flows of a business and discounts them back to today, because money in the future is worth less. The result depends heavily on the growth rate and the discount rate. Small changes in assumptions change the answer a lot. Use it to test what you must believe to justify the price.", p2: "Example: free cash flow ₹100 crore growing 10% a year for five years, then 5%, discounted at 12%. The total present value gives an estimate of the business value. Change the growth to 8% and the value falls noticeably." },
  { h: "7. Combine methods and set a range", p: "No single method is right. Use two or three: a P/E comparison with peers, an EV/EBITDA check, and a simple DCF. Overlapping results give more confidence. Decide the range of value, and buy only when the price is comfortably below the middle of that range." },
  { h: "8. Common valuation mistakes", ul: [
   "Using one ratio as the answer.",
   "Comparing companies from different industries with the same P/E.",
   "Using peak earnings as the base for a P/E.",
   "Forgetting to adjust for one-off items and debt.",
   "Building a precise DCF from guesses without testing sensitivity."
  ] }
 ] },
 "corporate-actions": { sections: [
  { h: "1. What corporate actions are", p: "A corporate action is an event started by the company that affects its shares or shareholders. Some change the number of shares, some pay cash, and some change the company's structure. Exchanges publish the dates, and the price adjusts on the effective day." },
  { h: "2. Dividends: the key dates", ul: [
   "Declaration: the board announces the dividend amount per share.",
   "Record date: shareholders on this date receive the dividend.",
   "Ex-date: the first day the shares trade without the right to the dividend. The price usually drops by about the dividend amount on this day.",
   "Payment date: when the cash is credited."
  ], p2: "Example: a ₹10 dividend with the stock at ₹450. On the ex-date the price may open near ₹440. The fall is an adjustment, not a loss in value for a holder who received the dividend." },
  { h: "3. Bonus issue", p: "A bonus issue gives existing shareholders free additional shares from company reserves, in a fixed ratio. A 1:1 bonus gives one extra share for each share held. The price per share halves, but the total value of the holding is the same.", p2: "Example: 100 shares at ₹400 (₹40,000). After a 1:1 bonus: 200 shares at ₹200 (₹40,000). The value is unchanged." },
  { h: "4. Stock split", p: "A split divides each share into more shares, reducing the price per share. A 1:10 split makes each share into ten. It improves trading accessibility but does not change the company's value. Check that old prices in charts are adjusted." },
  { h: "5. Rights issue", p: "A rights issue lets existing shareholders buy new shares, usually at a discount, in proportion to their holding. Shareholders who do not take up the rights are diluted. Check the issue price, the ratio and whether the money is used to reduce debt or fund growth." },
  { h: "6. Buyback", p: "A buyback is the company buying its own shares from the market or through a tender offer. It reduces the share count, which can raise EPS, and it signals management may think the shares are cheap. Check whether the company has enough cash, and whether the buyback is funded by borrowing." },
  { h: "7. Merger, demerger and delisting", p: "Mergers combine companies, demergers split a business into separate listed companies, and delisting removes shares from the exchange. Each changes the shares you hold. Read the scheme document and decide what you will do with the new holdings or the exit price." },
  { h: "8. Practical rules", ul: [
   "Check the ex-date before buying for a dividend. Buying just before ex-date gives the right to the dividend; buying on or after does not.",
   "Adjust your cost price after a bonus or split.",
   "Read the rights issue terms and decide early, because the deadline is short.",
   "Keep records of all corporate actions for tax purposes."
  ] }
 ] }
});

// Full sections, Hindi.
Object.assign(LESSON_OVERRIDES.hi, {
 "balance-sheet": { sections: [
  { h: "1. बैलेंस शीट क्या है", p: "बैलेंस शीट एक तारीख़ पर कंपनी की संपत्ति (जो उसके पास है), देनदारी (जो उसे चुकाना है) और मालिकों की हिस्सेदारी (इक्विटी) दिखाती है। यह हमेशा संतुलित रहती है: संपत्ति = देनदारी + इक्विटी। इसे मुनाफ़ा विवरण और कैश फ़्लो स्टेटमेंट के साथ पढ़ें, क्योंकि हर एक कहानी का अलग हिस्सा दिखाता है।", ul: [
   "संपत्ति: भविष्य में लाभ देने वाले संसाधन (नकद, प्राप्य राशि, इन्वेंटरी, ज़मीन-इमारत, निवेश)।",
   "देनदारी: चुकाने की ज़िम्मेदारियाँ (कर्ज़, देय राशि, प्रावधान)।",
   "इक्विटी: देनदारी चुकाने के बाद शेयरधारकों के लिए बचा हिस्सा: शेयर पूँजी, रिज़र्व और सरप्लस।"
  ] },
  { h: "2. चालू और गैर-चालू संपत्ति", p: "संपत्ति इस आधार पर बाँटी जाती है कि वह कितनी जल्दी नकद बनती है। चालू संपत्ति एक साल में नकद में बदल जाती है (नकद, प्राप्य राशि, इन्वेंटरी)। गैर-चालू संपत्ति लंबे समय तक रहती है (फ़ैक्टरी, ज़मीन, दीर्घकालिक निवेश)। जिस कंपनी के पास नकद कम और अल्पकालिक देनदारी ज़्यादा हो, वह दबाव में है, भले ही कुल संपत्ति बड़ी हो।" },
  { h: "3. चालू और गैर-चालू देनदारी", p: "देनदारी का बँटवारा भी इसी तरह होता है। एक साल में देय अल्पकालिक कर्ज़ और देय राशि चालू देनदारी है। दीर्घकालिक कर्ज़ गैर-चालू है। अल्पकालिक सुरक्षा जाँचने के लिए चालू देनदारी की तुलना चालू संपत्ति से करें।" },
  { h: "4. रिज़र्व, गुडविल और अमूर्त संपत्ति", p: "रिज़र्व वे मुनाफ़े हैं जो समय के साथ कारोबार में रखे गए, यानी पिछली कमाई का बचा हिस्सा। जब कंपनी किसी दूसरे कारोबार को उसकी शुद्ध संपत्ति से ज़्यादा में ख़रीदती है, तो गुडविल और अमूर्त संपत्ति बनती है। बड़ी गुडविल का मतलब है कि कंपनी ने प्रीमियम दिया, और अधिग्रहण निराश करे तो उसे घटाना पड़ सकता है।" },
  { h: "5. बैलेंस शीट से मुख्य अनुपात", ul: [
   "चालू अनुपात = चालू संपत्ति ÷ चालू देनदारी। 1.5 से ऊपर आमतौर पर आरामदायक; 1 से नीचे स्पष्टीकरण चाहिए।",
   "डेट-टू-इक्विटी = कुल कर्ज़ ÷ शेयरधारक इक्विटी। कम सुरक्षित, पर मानक उद्योग पर निर्भर (बैंक और इन्फ़्रा में ज़्यादा कर्ज़ आम है)।",
   "प्रति शेयर बुक वैल्यू = शेयरधारक इक्विटी ÷ शेयरों की संख्या।",
   "वर्किंग कैपिटल = चालू संपत्ति − चालू देनदारी। कुछ कारोबारों में नकारात्मक वर्किंग कैपिटल सामान्य है, दूसरों के लिए चेतावनी।"
  ], p2: "उदाहरण: चालू संपत्ति ₹800 करोड़, चालू देनदारी ₹500 करोड़, तो चालू अनुपात = 1.6। कुल कर्ज़ ₹600 करोड़, इक्विटी ₹1,500 करोड़, डेट-टू-इक्विटी = 0.4।" },
  { h: "6. एक साल नहीं, रुझान देखें", p: "कम से कम तीन से पाँच साल तुलना करें। देखें कि प्राप्य राशि बिक्री से तेज़ तो नहीं बढ़ रही (ग्राहक देर से भुगतान कर सकते हैं), इन्वेंटरी जमा तो नहीं हो रही (माल शायद नहीं बिक रहा), और इक्विटी स्थिर रहते हुए कर्ज़ बढ़ रहा है या नहीं। ये रुझान अक्सर मुनाफ़े से पहले समस्या दिखा देते हैं।" },
  { h: "7. आम जाल", ul: [
   "कुल संपत्ति को मज़बूती मान लेना। संपत्ति ज़्यादा आँकी गई या कम लिक्विड हो सकती है।",
   "नोट्स में दी गई ऑफ़-बैलेंस-शीट प्रतिबद्धताओं और आकस्मिक देनदारियों को अनदेखा करना।",
   "संबंधित-पक्ष की बकाया राशि छूट जाना, जैसे समूह कंपनियों को दिए कर्ज़।",
   "बैंक की बैलेंस शीट की तुलना निर्माता से उन्हीं अनुपातों से करना।"
  ] },
  { h: "8. पढ़ने की दिनचर्या", ul: [
   "कुल जोड़ जाँचें: संपत्ति = देनदारी + इक्विटी।",
   "चालू अनुपात और कर्ज़ की पिछले तीन साल से तुलना करें।",
   "कर्ज़, आकस्मिक देनदारी और संबंधित पक्षों के नोट्स पढ़ें।",
   "कंपनी के अनुपात दो-तीन करीबी साथियों से तुलना करें।"
  ] }
 ] },
 "cash-flow-statement": { sections: [
  { h: "1. नकद मुनाफ़े से ज़्यादा क्यों मायने रखता है", p: "कंपनी मुनाफ़ा दिखा सकती है और फिर भी नकद ख़त्म हो सकता है। मुनाफ़े में वह बिक्री शामिल है जिसका भुगतान अभी नहीं आया, और वह खर्च जो अभी नहीं चुकाया गया, साथ में लेखांकन अनुमान भी। कैश फ़्लो वह पैसा दिखाता है जो असल में चला। इसी वजह से कई निवेशक पहले कैश फ़्लो स्टेटमेंट देखते हैं।" },
  { h: "2. तीन हिस्से", ul: [
   "संचालन कैश फ़्लो (OCF): मुख्य कारोबार से नकद: ग्राहकों से भुगतान, आपूर्तिकर्ता और वेतन का भुगतान, टैक्स का भुगतान।",
   "निवेश कैश फ़्लो: संपत्ति पर खर्च (पूँजीगत व्यय) या संपत्ति बेचने और निवेश से मिला नकद।",
   "वित्तपोषण कैश फ़्लो: कर्ज़ लेने या शेयर जारी करने से मिला नकद, और कर्ज़ चुकाने, डिविडेंड या बायबैक पर दिया नकद।"
  ] },
  { h: "3. फ़्री कैश फ़्लो", p: "फ़्री कैश फ़्लो (FCF) = संचालन कैश फ़्लो − पूँजीगत व्यय। यह कारोबार चलाने और बढ़ाने के बाद बचा नकद है। लगातार बढ़ता सकारात्मक FCF कंपनी को बिना नया कर्ज़ लिए डिविडेंड देने, कर्ज़ चुकाने या विस्तार करने देता है।", p2: "उदाहरण: OCF ₹400 करोड़, कैपेक्स ₹150 करोड़, तो FCF = ₹250 करोड़।" },
  { h: "4. मुनाफ़ा बनाम संचालन कैश फ़्लो", p: "कई सालों में संचालन कैश फ़्लो लगभग शुद्ध मुनाफ़े के साथ चलना चाहिए। अगर मुनाफ़ा बढ़ रहा हो पर संचालन कैश फ़्लो घट रहा हो या नकारात्मक हो, तो बैलेंस शीट में प्राप्य राशि और इन्वेंटरी देखें। यह अंतर वित्तीय विश्लेषण की सबसे महत्वपूर्ण चेतावनियों में से एक है।" },
  { h: "5. पूँजीगत व्यय: विकास या रखरखाव?", p: "कैपेक्स कारोबार को बनाए रखने के लिए हो सकता है या बढ़ाने के लिए। जो कंपनी केवल वहीं टिके रहने के लिए भारी खर्च करती है, उसके पास शेयरधारकों के लिए कम FCF बचता है। प्रबंधन चर्चा पढ़कर देखें कि कौन सा खर्च है।" },
  { h: "6. वित्तपोषण और डिविडेंड", p: "जो कंपनी संचालन नकद से डिविडेंड देती है, वह आमतौर पर उस कंपनी से बेहतर है जो डिविडेंड चुकाने के लिए कर्ज़ लेती है। बार-बार नए शेयर जारी होने से मौजूदा मालिकों की हिस्सेदारी घटती है। देखें कि वित्तपोषण से आने वाला पैसा विकास में लगा है या संचालन की कमी पूरी करने में।" },
  { h: "7. काम किया हुआ उदाहरण", p: "कंपनी X: शुद्ध मुनाफ़ा ₹300 करोड़, संचालन कैश फ़्लो ₹280 करोड़, कैपेक्स ₹120 करोड़, डिविडेंड ₹60 करोड़। FCF = ₹160 करोड़, जो डिविडेंड से काफ़ी ऊपर। कंपनी Y: शुद्ध मुनाफ़ा ₹300 करोड़, संचालन कैश फ़्लो −₹20 करोड़, कार्यशील पूँजी के लिए ₹100 करोड़ का कर्ज़। Y के मुनाफ़े की गुणवत्ता कहीं कमज़ोर है।" },
  { h: "8. लाल झंडे", ul: [
   "मुनाफ़ा सकारात्मक पर संचालन कैश फ़्लो कई सालों से नकारात्मक।",
   "प्राप्य राशि बिक्री से तेज़ बढ़ रही हो।",
   "कारोबार चलाने के लिए बार-बार नया कर्ज़।",
   "संपत्ति बेचने से बड़ी एकमुश्त आमदनी, जो कमज़ोर संचालन छिपाती हो।"
  ] }
 ] },
 "quarterly-results": { sections: [
  { h: "1. तिमाही फ़ाइलिंग में क्या होता है", p: "सूचीबद्ध कंपनियाँ हर तिमाही के नतीजे एक्सचेंज पर दाखिल करती हैं, आमतौर पर तिमाही के अंत के बाद एक तय समय सीमा में (मौजूदा SEBI नियम जाँचें)। फ़ाइलिंग में तिमाही का आय विवरण, पिछली अवधियों से तुलना, और अक्सर सेगमेंट व नकद के विवरण होते हैं। पहला पन्ना सार है; विस्तार तालिकाओं में है।" },
  { h: "2. मुख्य पंक्तियाँ, ऊपर से नीचे", ul: [
   "राजस्व (बिक्री): मुख्य कारोबार से कुल आय।",
   "परिचालन खर्च और EBITDA: ब्याज, टैक्स, मूल्यह्रास और परिशोधन से पहले की कमाई। परिचालन प्रदर्शन का मापक।",
   "मूल्यह्रास, ब्याज और अन्य आय: गैर-परिचालन मदें।",
   "कर से पहले मुनाफ़ा (PBT), टैक्स, और कर के बाद मुनाफ़ा (PAT): अंतिम पंक्ति।",
   "EPS: प्रति शेयर मुनाफ़ा, जो वैल्यूएशन में सबसे ज़्यादा इस्तेमाल होता है।"
  ] },
  { h: "3. सही अवधियों की तुलना करें", p: "साल-दर-साल (YoY) पिछले साल की उसी तिमाही से तुलना करता है और मौसम का असर हटाता है। तिमाही-दर-तिमाही (QoQ) पिछली तिमाही से तुलना करता है और गति दिखाता है, पर मौसमी कारोबार (जैसे त्योहारी बिक्री वाला खुदरा) में भ्रामक हो सकता है। रुझान के लिए YoY और हाल की दिशा के लिए QoQ इस्तेमाल करें।" },
  { h: "4. मार्जिन: विकास की गुणवत्ता", p: "केवल राजस्व बढ़ना काफ़ी नहीं। EBITDA मार्जिन (EBITDA ÷ राजस्व) और शुद्ध मार्जिन (PAT ÷ राजस्व) देखें। बिक्री बढ़े पर मार्जिन घटे तो विकास की कीमत बढ़ रही है। बिक्री की बढ़ोतरी के साथ स्थिर या बढ़ते मार्जिन सबसे अच्छा संकेत है।", p2: "उदाहरण: राजस्व YoY 20% बढ़ा, EBITDA मार्जिन 18% से 16%। बिक्री बढ़ी, पर कारोबार ने हर रुपये की बिक्री पर कम कमाया।" },
  { h: "5. एक-बार और असाधारण मदें", p: "एक-बार के लाभ, जैसे किसी संपत्ति की बिक्री या टैक्स रिफ़ंड, से मुनाफ़ा अचानक उछल सकता है। असाधारण मदें अलग दिखाई जाती हैं। सामान्य कमाई की शक्ति देखने के लिए उन्हें हटाएँ। जो तिमाही केवल असाधारण आय से मज़बूत दिखती है, वह शीर्षक से कमज़ोर है।" },
  { h: "6. अन्य आय मायने रखती है", p: "अन्य आय नकद पर ब्याज या निवेश पर लाभ हो सकती है। जिस कंपनी का मुनाफ़ा मुख्य रूप से अन्य आय पर निर्भर है, उसका मुख्य कारोबार कमज़ोर है। देखें कि PBT का कितना हिस्सा परिचालन से आता है।" },
  { h: "7. टिप्पणी और मार्गदर्शन पढ़ें", p: "प्रेस विज्ञप्ति और अर्निंग कॉल आँकड़े समझाते हैं। प्रबंधन बिक्री, मार्जिन या कैपेक्स पर मार्गदर्शन दे सकता है। पिछली तिमाही के वादों की तुलना असल नतीजों से करें। कई तिमाहियों तक दोहराया गया छूटा मार्गदर्शन चेतावनी है।" },
  { h: "8. पढ़ने की जाँच-सूची", ul: [
   "राजस्व वृद्धि YoY और QoQ।",
   "EBITDA और शुद्ध मार्जिन का रुझान।",
   "असाधारण मदें और अन्य आय का मुनाफ़े में हिस्सा।",
   "EPS वृद्धि और टैक्स दर में बदलाव।",
   "अगली सालाना रिपोर्ट में संचालन कैश फ़्लो, यह पुष्टि करने के लिए कि मुनाफ़ा नकद बनता है।",
   "प्रबंधन के मार्गदर्शन की असल नतीजों से तुलना।"
  ] }
 ] },
 "annual-report": { sections: [
  { h: "1. सालाना रिपोर्ट क्या है", p: "सालाना रिपोर्ट कंपनी का पूरे साल का दस्तावेज़ है, जो शेयरधारकों के लिए तैयार होता है और एक्सचेंज पर दाखिल होता है। इसमें वित्तीय विवरण, निदेशक रिपोर्ट, प्रबंधन चर्चा, गवर्नेंस जानकारी और वार्षिक आम बैठक (AGM) की सूचना होती है।" },
  { h: "2. इस क्रम में पढ़ें", ul: [
   "अध्यक्ष और CEO के पत्र: प्रबंधन जो कहानी सुनाना चाहता है। रणनीति समझने के लिए उपयोगी, सबूत नहीं।",
   "प्रबंधन चर्चा और विश्लेषण (MD&A): उद्योग का आउटलुक, कारोबार का प्रदर्शन, जोखिम और अवसर। अक्सर सबसे उपयोगी हिस्सा।",
   "निदेशक रिपोर्ट: डिविडेंड की सिफ़ारिश, महत्वपूर्ण घटनाएँ, संबंधित-पक्ष लेनदेन का सार।",
   "ऑडिटर की रिपोर्ट: वित्तीय विवरणों पर राय। बिना संशोधन वाली राय सामान्य है; योग्यता या ज़ोर वाले पैराग्राफ़ पढ़ने चाहिए।",
   "वित्तीय विवरण और नोट्स: हर संख्या के पीछे का विवरण।",
   "कॉर्पोरेट गवर्नेंस रिपोर्ट: बोर्ड की संरचना, समितियाँ, वेतन और शेयरधारकों की शिकायतें।"
  ] },
  { h: "3. ऑडिटर की रिपोर्ट", p: "ऑडिटर बताता है कि वित्तीय विवरण सही और उचित तस्वीर देते हैं या नहीं। देखें: योग्य राय (कोई अपवाद), ज़ोर का पैराग्राफ़ (कोई महत्वपूर्ण बात जिस पर ऑडिटर ध्यान दिलाना चाहता है), और मुख्य ऑडिट मामले, जो बताते हैं कि जोखिम कहाँ सबसे ज़्यादा आँका गया। ऑडिटर बदलने के कारण भी देखें।" },
  { h: "4. नोट्स टू अकाउंट्स", p: "नोट्स लेखांकन नीतियाँ, कर्ज़, आकस्मिक देनदारियाँ (भविष्य की संभावित ज़िम्मेदारियाँ), संबंधित-पक्ष लेनदेन, सेगमेंट परिणाम और कर्मचारी लाभ समझाते हैं। कई ज़रूरी तथ्य केवल नोट्स में होते हैं। इन्हें पढ़ना सावधान विश्लेषण और सतही नज़र के बीच का फ़र्क है।" },
  { h: "5. संबंधित-पक्ष लेनदेन और गवर्नेंस", p: "प्रमोटरों या निदेशकों की कंपनियों से लेनदेन उचित हो सकते हैं, या पैसा कंपनी से बाहर भी ले जा सकते हैं। आकार, शर्तें और दोहराव जाँचें। बोर्ड की स्वतंत्रता, ऑडिट समिति की गतिविधि और सूचीबद्ध नियामक दंड देखें।" },
  { h: "6. जोखिमों पर प्रबंधन की टिप्पणी", p: "कंपनियों को जोखिम कारक सूचीबद्ध करने होते हैं। विशेष बातें देखें: ग्राहकों की निर्भरता, नियम, मुद्रा जोखिम, मुकदमे। हर साल न बदलने वाली सामान्य सूची कम उपयोगी है, विस्तृत जोखिम और प्रबंधन उनसे कैसे निपट रहा है, यह बेहतर।" },
  { h: "7. दो सालों की तुलना", p: "दो सालाना रिपोर्ट के एक जैसे हिस्से साथ पढ़ें। लेखांकन नीतियों में बदलाव, नई बड़ी देनदारियाँ, ऑडिटर में बदलाव और सेगमेंट मिश्रण में बदलाव देखें। शब्दों का बदलाव भी संख्याओं के बदलाव जितना महत्वपूर्ण हो सकता है।" },
  { h: "8. पढ़ने की जाँच-सूची", ul: [
   "पहले MD&A पढ़ें, फिर पत्र।",
   "ऑडिटर की राय का प्रकार और कोई ज़ोर का पैराग्राफ़ जाँचें।",
   "कर्ज़, आकस्मिक देनदारी और संबंधित पक्षों के नोट्स पढ़ें।",
   "जोखिम कारकों की पिछले साल की रिपोर्ट से तुलना करें।",
   "डिविडेंड का इतिहास और भुगतान का अनुपात संचालन कैश फ़्लो से मिलाएँ।"
  ] }
 ] },
 "shareholding-pattern": { sections: [
  { h: "1. शेयरहोल्डिंग पैटर्न क्या दिखाता है", p: "सूचीबद्ध कंपनियाँ हर तिमाही शेयरहोल्डिंग पैटर्न दाखिल करती हैं। यह दिखाता है कि शेयरों का कितना प्रतिशत प्रमोटरों (संस्थापकों और नियंत्रक समूह), सार्वजनिक संस्थाओं (म्यूचुअल फंड, बीमा, विदेशी और घरेलू संस्थाएँ), और आम जनता (खुदरा निवेशक) के पास है।" },
  { h: "2. मुख्य श्रेणियाँ", ul: [
   "प्रमोटर और प्रमोटर समूह: नियंत्रक मालिक। उच्च प्रमोटर होल्डिंग अक्सर प्रतिबद्धता का संकेत, पर फ़्री फ़्लोट कम भी हो सकता है।",
   "विदेशी संस्थागत निवेशक (FII) और घरेलू संस्थागत निवेशक (DII): म्यूचुअल फंड, बीमा और अन्य। उनकी ख़रीद-बिक्री पर बारीकी से नज़र रहती है।",
   "सार्वजनिक: खुदरा निवेशक और छोटी हिस्सेदारी वाले अन्य।",
   "गैर-प्रमोटर, गैर-सार्वजनिक: कुछ ट्रस्ट और कर्मचारी लाभ योजनाओं के पास शेयर।"
  ] },
  { h: "3. बदलावों का मतलब", p: "कई तिमाहियों तक संस्थागत होल्डिंग बढ़ना पेशेवर भरोसे को दिखा सकता है। प्रमोटर होल्डिंग घटना बिक्री का या नए शेयर जारी होने से हिस्सेदारी घटने का संकेत हो सकता है। बदलाव को दिए गए कारण के साथ पढ़ें। एक तिमाही का बदलाव चार से छह तिमाहियों के रुझान से कम मायने रखता है।" },
  { h: "4. गिरवी शेयर: जोखिम का संकेत", p: "प्रमोटर कर्ज़ लेने के लिए अपने शेयर गिरवी रख सकते हैं। शेयरहोल्डिंग पैटर्न प्रमोटर होल्डिंग का गिरवी प्रतिशत दिखाता है। ऊँची गिरवी जोखिम भरी है: कीमत गिरे तो कर्ज़दाता गिरवी शेयर बेच सकते हैं, जिससे कीमत और गिर सकती है। तेज़ी से बढ़ती गिरवी पर नज़र रखें।" },
  { h: "5. फ़्री फ़्लोट और लिक्विडिटी", p: "फ़्री फ़्लोट वह हिस्सा है जो प्रमोटरों के पास नहीं या लॉक-इन नहीं। छोटा फ़्री फ़्लोट पतली ट्रेडिंग, चौड़े स्प्रेड और ज़्यादा अस्थिर कीमतों का मतलब हो सकता है। बड़े पैमाने पर ट्रेड करने से पहले फ़्री फ़्लोट जाँचें।" },
  { h: "6. पैटर्न को दूसरे डेटा के साथ मिलाएँ", p: "मालिकाना बदलाव को नतीजों, कैश फ़्लो और कीमत के रुझान के साथ देखें। सुधरते मार्जिन के साथ बढ़ती संस्थागत ख़रीद, अकेले किसी एक से मज़बूत संकेत है। मुनाफ़ा घटते हुए बढ़ती गिरवी चेतावनी है।" },
  { h: "7. पढ़ने की जाँच-सूची", ul: [
   "प्रमोटर होल्डिंग और उसका चार से छह तिमाहियों में बदलाव।",
   "प्रमोटर गिरवी का प्रतिशत और क्या वह बढ़ रहा है।",
   "FII और DII होल्डिंग का रुझान।",
   "फ़्री फ़्लोट का आकार।",
   "ऐसे बदलाव जो नतीजों से मेल खाते हों, या जिनका कोई स्पष्टीकरण न हो।"
  ] }
 ] },
 "valuation-basics": { sections: [
  { h: "1. कीमत मूल्य नहीं है", p: "शेयर की कीमत वह है जो बाज़ार आज देता है। मूल्य वह है जो कारोबार अपने भविष्य के कैश फ़्लो के आधार पर है। वैल्यूएशन दूसरे का अनुमान लगाता है और उसे पहले से तुलना करता है। दोनों के बीच का अंतर सुरक्षा मार्जिन है।" },
  { h: "2. P/E: कीमत बनाम कमाई", p: "P/E = कीमत ÷ प्रति शेयर आय। यह दिखाता है कि आप मौजूदा कमाई के कितने साल का भाव दे रहे हैं। कंपनी के अपने इतिहास और उसी उद्योग के साथियों से तुलना करें। कमाई घट रही हो तो कम P/E अपने आप सस्ता नहीं।", p2: "उदाहरण: कीमत ₹450, EPS ₹30, तो P/E = 15। अगर साथी औसत 20 पर हैं, तो शेयर सस्ता दिखता है, पर पहले ग्रोथ और जोखिम जाँचें।" },
  { h: "3. P/B: कीमत बनाम बुक वैल्यू", p: "P/B = कीमत ÷ प्रति शेयर बुक वैल्यू। यह बैंकों और संपत्ति-भारी कारोबार के लिए सबसे उपयोगी है, जहाँ बुक वैल्यू अर्थपूर्ण है। हल्की-संपत्ति वाले कारोबार, जैसे सॉफ़्टवेयर, में बुक वैल्यू कम बताती है और P/B भ्रामक हो सकता है।" },
  { h: "4. EV/EBITDA: पूँजी-संरचना से स्वतंत्र नज़र", p: "उद्यम मूल्य (EV) = बाज़ार पूँजीकरण + कर्ज़ − नकद। EV/EBITDA पूरे कारोबार के मूल्य की तुलना ब्याज, टैक्स, मूल्यह्रास और परिशोधन से पहले की परिचालन कमाई से करता है। अलग-अलग कर्ज़ स्तर वाली कंपनियों की तुलना के लिए उपयोगी।" },
  { h: "5. PEG: ग्रोथ-समायोजित P/E", p: "PEG = P/E ÷ अपेक्षित कमाई वृद्धि दर (प्रतिशत में)। लगभग 1 को अक्सर उचित कीमत, 1 से नीचे संभवतः सस्ता, और 2 से ऊपर महँगा पढ़ा जाता है। ग्रोथ का अनुमान अनिश्चित है, इसलिए परिणाम को मोटा मार्गदर्शक मानें।" },
  { h: "6. डिस्काउंटेड कैश फ़्लो (DCF): बुनियादी विचार", p: "DCF कारोबार के भविष्य के फ़्री कैश फ़्लो का अनुमान लगाता है और उन्हें आज की वैल्यू पर लाता है, क्योंकि भविष्य का पैसा आज से कम मूल्य का है। परिणाम ग्रोथ दर और डिस्काउंट दर पर बहुत निर्भर करता है। छोटे बदलाव भी उत्तर को काफ़ी बदल देते हैं। इसका उपयोग यह जाँचने के लिए करें कि कीमत को सही ठहराने के लिए आपको क्या मानना पड़ेगा।", p2: "उदाहरण: फ़्री कैश फ़्लो ₹100 करोड़, पाँच साल 10% सालाना बढ़ता हुआ, फिर 5%, 12% पर डिस्काउंट। कुल वर्तमान मूल्य कारोबार की वैल्यू का अनुमान देता है। ग्रोथ 8% करें तो वैल्यू उल्लेखनीय रूप से घटती है।" },
  { h: "7. तरीके मिलाएँ और एक रेंज तय करें", p: "कोई एक तरीका सही नहीं। दो-तीन इस्तेमाल करें: साथियों से P/E तुलना, EV/EBITDA जाँच, और एक सरल DCF। मिलते-जुलते परिणाम अधिक भरोसा देते हैं। मूल्य की एक रेंज तय करें, और तभी ख़रीदें जब कीमत उस रेंज के बीच से आराम से नीचे हो।" },
  { h: "8. आम वैल्यूएशन गलतियाँ", ul: [
   "एक अनुपात को उत्तर मान लेना।",
   "अलग-अलग उद्योगों की कंपनियों की एक ही P/E से तुलना।",
   "P/E के आधार के रूप में शिखर कमाई इस्तेमाल करना।",
   "एक-बार की मदों और कर्ज़ के लिए समायोजन भूल जाना।",
   "अनुमानों से बने सटीक DCF को बिना संवेदनशीलता जाँचे भरोसा करना।"
  ] }
 ] },
 "corporate-actions": { sections: [
  { h: "1. कॉर्पोरेट एक्शन क्या हैं", p: "कॉर्पोरेट एक्शन कंपनी द्वारा शुरू की गई वह घटना है जो उसके शेयरों या शेयरधारकों को प्रभावित करती है। कुछ शेयरों की संख्या बदलते हैं, कुछ नकद देते हैं, और कुछ कंपनी का ढाँचा बदलते हैं। एक्सचेंज तारीख़ें प्रकाशित करते हैं, और प्रभावी दिन कीमत समायोजित होती है।" },
  { h: "2. डिविडेंड: मुख्य तारीख़ें", ul: [
   "घोषणा: बोर्ड प्रति शेयर डिविडेंड राशि की घोषणा करता है।",
   "रिकॉर्ड डेट: इस तारीख़ के शेयरधारक डिविडेंड पाते हैं।",
   "एक्स-डेट: वह पहला दिन जब शेयर डिविडेंड के अधिकार के बिना ट्रेड होते हैं। इस दिन कीमत आमतौर पर डिविडेंड की राशि जितनी घटती है।",
   "भुगतान तारीख़: जब नकद खाते में आता है।"
  ], p2: "उदाहरण: ₹450 के शेयर पर ₹10 डिविडेंड। एक्स-डेट पर कीमत लगभग ₹440 खुल सकती है। यह गिरावट समायोजन है, डिविडेंड पाने वाले के लिए मूल्य की हानि नहीं।" },
  { h: "3. बोनस इश्यू", p: "बोनस इश्यू कंपनी के रिज़र्व से मौजूदा शेयरधारकों को एक तय अनुपात में मुफ़्त अतिरिक्त शेयर देता है। 1:1 बोनस में हर शेयर पर एक अतिरिक्त शेयर। प्रति शेयर कीमत आधी होती है, पर होल्डिंग का कुल मूल्य वही रहता है।", p2: "उदाहरण: 100 शेयर ₹400 पर (₹40,000)। 1:1 बोनस के बाद: 200 शेयर ₹200 पर (₹40,000)। मूल्य अपरिवर्तित।" },
  { h: "4. स्टॉक स्प्लिट", p: "स्प्लिट हर शेयर को अधिक शेयरों में बाँटता है, जिससे प्रति शेयर कीमत घटती है। 1:10 स्प्लिट में हर शेयर दस बन जाता है। यह ट्रेडिंग को सुलभ बनाता है, पर कंपनी का मूल्य नहीं बदलता। चार्ट में पुरानी कीमतें समायोजित हैं या नहीं, यह जाँचें।" },
  { h: "5. राइट्स इश्यू", p: "राइट्स इश्यू मौजूदा शेयरधारकों को उनकी होल्डिंग के अनुपात में नए शेयर ख़रीदने देता है, आमतौर पर छूट पर। जो शेयरधारक राइट्स नहीं लेते, उनकी हिस्सेदारी घटती है। इश्यू मूल्य, अनुपात और देखें कि पैसा कर्ज़ घटाने में जाता है या विकास में।" },
  { h: "6. बायबैक", p: "बायबैक में कंपनी बाज़ार से या टेंडर ऑफ़र से अपने ही शेयर ख़रीदती है। इससे शेयरों की संख्या घटती है, जो EPS बढ़ा सकती है, और संकेत देती है कि प्रबंधन शेयर को सस्ता मानता है। जाँचें कि कंपनी के पास पर्याप्त नकद है और बायबैक कर्ज़ से तो नहीं हो रहा।" },
  { h: "7. विलय, डिमर्जर और डीलिस्टिंग", p: "विलय कंपनियों को जोड़ता है, डिमर्जर कारोबार को अलग सूचीबद्ध कंपनियों में बाँटता है, और डीलिस्टिंग शेयरों को एक्सचेंज से हटाती है। हर एक आपकी होल्डिंग बदलता है। योजना दस्तावेज़ पढ़ें और तय करें कि नई होल्डिंग या एग्ज़िट कीमत के साथ क्या करेंगे।" },
  { h: "8. व्यावहारिक नियम", ul: [
   "डिविडेंड के लिए ख़रीदने से पहले एक्स-डेट जाँचें। एक्स-डेट से पहले ख़रीदने पर डिविडेंड का अधिकार मिलता है; उस दिन या बाद में नहीं।",
   "बोनस या स्प्लिट के बाद अपनी ख़रीद कीमत समायोजित करें।",
   "राइट्स इश्यू की शर्तें पढ़ें और जल्दी फ़ैसला करें, क्योंकि समय सीमा छोटी होती है।",
   "टैक्स के लिए सभी कॉर्पोरेट एक्शन का रिकॉर्ड रखें।"
  ] }
 ] }
});
// Glossary links for each module (names must match glossary-data.js and glossary-finance.js).
Object.assign(MODULE_META, {
 "balance-sheet": { terms: ["Balance sheet", "Current ratio", "Debt-to-equity", "Book value per share", "Working capital", "Reserves", "Goodwill", "Contingent liabilities"], tools: [], calc: [] },
 "cash-flow-statement": { terms: ["Cash flow statement", "Free cash flow", "Capital expenditure (capex)", "Cash flow from operations", "Dividend"], tools: [], calc: [] },
 "quarterly-results": { terms: ["EBITDA", "Net profit", "Revenue (sales)", "EPS (earnings per share)", "Exceptional items", "Operating margin"], tools: [], calc: [] },
 "annual-report": { terms: ["Annual report", "Auditor's report", "Related-party transactions", "Contingent liabilities", "Corporate governance"], tools: [], calc: [] },
 "shareholding-pattern": { terms: ["Promoter", "FII and DII", "Free float", "Promoter pledge"], tools: [], calc: [] },
 "valuation-basics": { terms: ["P/E ratio", "Book value", "EV/EBITDA", "PEG ratio", "Discounted cash flow (DCF)", "Margin of safety", "Market capitalisation (market cap)"], tools: [], calc: ["cagr"] },
 "corporate-actions": { terms: ["Dividend", "Bonus issue", "Stock split", "Rights issue", "Buyback", "Ex-date", "Record date"], tools: [], calc: [] }
});

// Place the seven modules in the course order, after Fundamental Analysis.
FINANCE_SLUGS.slice().reverse().forEach(slugName => LESSON_ORDER.splice(LESSON_ORDER.indexOf("fundamental-analysis") + 1, 0, slugName));
