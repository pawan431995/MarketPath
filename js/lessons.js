// Lesson content for MarketPathAcademy. Educational only, not financial advice.
// Each lesson: title, level (beginner | intermediate | advanced), time, summary, sections[{h, p?, ul?}].
// To add a language, copy an existing block, translate it, and add the language to LESSON_LANGS.
const LESSON_ORDER = ["foundations","investing","sip-mutual-funds","reading-charts","fundamental-analysis","technical-analysis","swing-trading","risk-management","intraday-trading","futures-options","option-greeks","trading-psychology"];

const LESSONS = {
en: {
 "foundations": {
  title: "Stock Market Foundations", level: "beginner", time: "6 lessons",
  summary: "What a share is, how exchanges work, and how an order becomes a trade.",
  sections: [
   { h: "What is a share?", p: "A share (or stock) is a small piece of ownership in a company. If a company has 1,00,000 shares and you hold 100, you own 0.1% of it. Your return comes mainly from price changes and, sometimes, dividends.", ul: ["If the company grows, shareholders may benefit.", "If the price falls, you can lose money.", "Listed companies trade on stock exchanges."] },
   { h: "Exchanges, indices and brokers", p: "In India, the main exchanges are NSE and BSE. You buy and sell through a SEBI-registered broker, using a demat account (which holds shares electronically) and a trading account.", ul: ["NIFTY 50 tracks 50 large companies listed on NSE.", "SENSEX tracks 30 large companies listed on BSE.", "The broker passes your order on; the exchange matches buyers with sellers."] },
   { h: "Order types and settlement", p: "A market order buys or sells immediately at the best available price. A limit order sets the maximum you will pay or the minimum you will accept. Equity trades settle on T+1, meaning the next trading day, in India.", ul: ["Check your broker's rules and charges before placing orders.", "Prices can move between placing and executing an order.", "Have funds or shares ready before the settlement date."] }
  ]
 },
 "investing": {
  title: "Investing & Wealth Building", level: "beginner", time: "8 lessons",
  summary: "Set goals, understand your time horizon, diversify, and let compounding work over years.",
  sections: [
   { h: "Start with a goal and time horizon", p: "Investing works best when you know why you are investing and when you will need the money. Goals under about 3 years usually call for safer choices. Longer goals can accept more market ups and downs.", ul: ["Write down each goal: house, education, retirement, and so on.", "Set a separate time frame and risk level for each goal.", "Build an emergency fund, typically 3 to 6 months of expenses, before investing for growth."] },
   { h: "Compounding", p: "Compounding means your returns also earn returns. ₹1,00,000 growing at 10% a year becomes about ₹2.59 lakh after 10 years and about ₹6.73 lakh after 20 years, before tax, fees and inflation.", ul: ["Starting early often matters more than investing a large amount later.", "Returns are never guaranteed. These figures are illustrations only."] },
   { h: "Diversification and asset allocation", p: "Spreading money across assets (shares, bonds, gold, cash) and across sectors reduces the damage from any single bad investment.", ul: ["Avoid putting all your money into one stock.", "Rebalance your portfolio once or twice a year.", "Choose an allocation that matches your needs and your ability to handle losses."] }
  ]
 },
 "sip-mutual-funds": {
  title: "SIP & Mutual Funds", level: "beginner", time: "7 lessons",
  summary: "How a Systematic Investment Plan works, what NAV means, and how to read fund costs.",
  sections: [
   { h: "What is a SIP?", p: "A SIP (Systematic Investment Plan) invests a fixed amount into a mutual fund at regular intervals, usually monthly. When prices are low you get more units, and when prices are high you get fewer. This is called rupee cost averaging. It does not guarantee a profit." },
   { h: "NAV and units", p: "NAV (Net Asset Value) is the value of one unit of a mutual fund. It is calculated once a day after the market closes. Your units equal the amount invested divided by that day's NAV.", ul: ["Example: if you invest ₹5,000 and the NAV is ₹50, you receive 100 units."] },
   { h: "Fund types and costs", ul: ["Equity funds invest mainly in shares. Risk and potential return are both higher.", "Debt funds invest in bonds. Their price movements are usually smaller.", "Index funds copy an index such as NIFTY 50 and usually have low costs.", "The expense ratio is the yearly fee a fund charges. All else equal, lower is better."] }
  ]
 },
 "reading-charts": {
  title: "Reading Charts", level: "beginner", time: "6 lessons",
  summary: "Understand line, bar and candlestick charts, OHLC data, and volume.",
  sections: [
   { h: "Chart types", ul: ["Line chart: joins closing prices. Simple and good for seeing the overall trend.", "Bar (OHLC) chart: shows the open, high, low and close for each period.", "Candlestick chart: the same OHLC data, drawn as a coloured body with wicks."] },
   { h: "Reading a candle", p: "A green (or white) candle means the close was above the open. A red (or black) candle means the close was below the open. The thin lines above and below the body are wicks; they show the high and low of the period. A candle can represent 1 minute, 1 day, 1 week, or any other timeframe." },
   { h: "Volume", p: "Volume is the number of shares traded in a period. A price move on high volume is generally seen as more significant than the same move on low volume. Volume is a clue, not a guarantee." }
  ]
 },
 "fundamental-analysis": {
  title: "Fundamental Analysis", level: "intermediate", time: "9 lessons",
  summary: "Evaluate a business using its financial statements, key ratios and quality checks.",
  sections: [
   { h: "The three financial statements", ul: ["Profit & loss: revenue, expenses and profit over a period.", "Balance sheet: assets, liabilities and equity at one point in time.", "Cash flow statement: the cash actually coming in and going out."] },
   { h: "Key ratios", ul: ["EPS (earnings per share) = net profit ÷ number of shares.", "P/E ratio = share price ÷ EPS. A high P/E can reflect expected growth. Compare within the same industry.", "ROE (return on equity) = net profit ÷ shareholders' equity. A consistently high ROE can signal an efficient business.", "Debt-to-equity shows how much the company borrows relative to its equity."] },
   { h: "Business quality and valuation", p: "Ratios are only a starting point. Study the business model, competitive advantage, management track record and governance. Annual reports and filings are public on exchange websites.", ul: ["A low P/E can be a trap if earnings are falling.", "Check whether profits are backed by real cash flow."] }
  ]
 },
 "technical-analysis": {
  title: "Technical Analysis", level: "intermediate", time: "10 lessons",
  summary: "Study price and volume patterns, trends, support, resistance and common indicators.",
  sections: [
   { h: "Trend", p: "An uptrend makes higher highs and higher lows. A downtrend makes lower highs and lower lows. Trading in the direction of the trend is a common starting principle, but trends can reverse." },
   { h: "Support and resistance", p: "Support is a price zone where buying has tended to appear. Resistance is a zone where selling has tended to appear. If price breaks above resistance on strong volume, that level can later act as support." },
   { h: "Moving averages", p: "A moving average smooths price over a set number of periods. A 50-period simple moving average is common for medium-term trend. Price above the average is often read as bullish and below it as bearish. A short average crossing a long one is a widely watched signal." },
   { h: "RSI and MACD", ul: ["RSI (14) measures momentum on a 0 to 100 scale. Readings above 70 are often called overbought and below 30 oversold, but strong trends can stay there for a long time.", "MACD compares two moving averages. The MACD line crossing its signal line is a common momentum signal."] },
   { h: "Limits of technical analysis", p: "Indicators lag and can give false signals. Use them together with risk rules, and never rely on a single indicator." }
  ]
 },
 "swing-trading": {
  title: "Swing Trading", level: "intermediate", time: "8 lessons",
  summary: "Hold trades for days to weeks using clear setups, entry and exit rules, and a trade journal.",
  sections: [
   { h: "What is swing trading?", p: "Swing trading aims to capture a price move that usually lasts a few days to a few weeks. It sits between intraday trading (same day) and investing (months to years). It needs patience and planning. Holding overnight also exposes you to gaps, where the price opens far from your stop.", },
   { h: "A complete trade plan", ul: ["Setup: why you are entering, for example a breakout above resistance on rising volume.", "Entry: the price or condition that triggers the trade.", "Stop loss: the price at which you accept the idea was wrong.", "Target: where you plan to take profit, with a reward-to-risk ratio you accept, such as 2:1."] },
   { h: "Position sizing", p: "Decide the most you will lose on one trade, for example 1% of capital. Position size = maximum loss ÷ (entry minus stop, per share). Example: ₹1,00,000 capital and 1% risk gives ₹1,000. With entry at ₹250 and stop at ₹240, the distance is ₹10, so the size is 100 shares. This excludes costs and slippage." },
   { h: "Keep a trade journal", p: "Record the setup, reason, size, result and any mistakes. Review monthly to see which setups actually work for you." }
  ]
 },
 "risk-management": {
  title: "Risk Management", level: "intermediate", time: "7 lessons",
  summary: "Protect your capital with position sizing, stop losses, exposure limits and a drawdown plan.",
  sections: [
   { h: "Protect capital first", p: "A 50% loss needs a 100% gain to get back to where you started. Losses hurt more than equal gains help, so limiting losses matters most." },
   { h: "Risk per trade", p: "Many traders risk 0.5% to 2% of capital on each trade. Smaller risk lets you survive longer losing streaks.", ul: ["Example: losing 10 trades in a row at 2% risk each reduces capital by about 18%."] },
   { h: "Risk and reward", p: "With a 1:2 risk-to-reward setup, you only need to win a little more than one trade in three to break even, before costs." },
   { h: "Exposure and correlation", p: "Holding five banking stocks is not five independent bets. Track your total exposure by sector and by theme." },
   { h: "Drawdown rules", ul: ["Set a maximum monthly loss, and pause once you reach it.", "Reduce position size after a losing streak.", "Review your plan rather than chasing losses."] }
  ]
 },
 "intraday-trading": {
  title: "Intraday Trading", level: "advanced", time: "9 lessons",
  summary: "Trade within one session. Understand liquidity, order execution, margin and the real risks.",
  sections: [
   { h: "What intraday means", p: "Intraday trades open and close within the same session, and positions must be squared off before the market closes. Brokers offer margin (leverage) for intraday, which magnifies both profit and loss. Studies, including SEBI's analysis of F&O traders, have found that most individual traders lose money." },
   { h: "Liquidity and spreads", p: "Trade liquid stocks with high volume and a tight bid-ask spread. In thinly traded stocks it can be hard to exit at your intended price." },
   { h: "Order types and execution", ul: ["Use stop-loss orders (SL and SL-M) to define your risk.", "Expect slippage, especially in fast markets and around the open and close.", "Avoid market orders in illiquid stocks."] },
   { h: "Risk rules", p: "Set a daily loss limit and stop trading when you hit it. Keep position size small relative to your capital. Avoid averaging down on losing trades." },
   { h: "Costs", p: "Brokerage, STT, exchange charges, GST, stamp duty and taxes all reduce profit. A gross gain can become a net loss after costs, so calculate them before every trade." }
  ]
 },
 "futures-options": {
  title: "Futures & Options", level: "advanced", time: "12 lessons",
  summary: "Understand futures, call and put options, strike price, expiry, margin and payoff, along with their risks.",
  sections: [
   { h: "Futures", p: "A futures contract is an agreement to buy or sell an asset at a set price on a future date, and both sides are obligated. Futures use margin, so a small move can cause a large gain or loss compared with the cash you put in." },
   { h: "Options: calls and puts", ul: ["Call option: the right, but not the obligation, to buy at the strike price on or before expiry.", "Put option: the right to sell at the strike price.", "Premium: the price the buyer pays the seller (writer).", "A buyer's maximum loss is the premium paid. A seller without hedges can face large or unlimited losses."] },
   { h: "Key terms", ul: ["Strike price and expiry date.", "Lot size: the fixed quantity in one contract.", "ITM (in the money), ATM (at the money), OTM (out of the money)."] },
   { h: "Payoff example", p: "You buy a call with a ₹100 strike for a ₹5 premium. At expiry, if the stock is ₹120, the intrinsic value is ₹20, so the profit is ₹15 per share before costs. If the stock is ₹95, the option expires worthless and you lose the ₹5 premium." },
   { h: "Risk warning", p: "SEBI data shows that most individual F&O traders have lost money. Options can expire worthless, and leverage can expose you to more than your capital. Learn with paper trading first, and understand margin requirements and assignment rules." }
  ]
 },
 "option-greeks": {
  title: "Option Greeks & Strategies", level: "advanced", time: "10 lessons",
  summary: "Measure how option prices respond to price, time and volatility, and build defined-risk strategies.",
  sections: [
   { h: "Delta", p: "Delta estimates how much an option's price changes for a ₹1 move in the underlying. A call's delta runs from 0 to 1, and a put's from −1 to 0. A delta near 0.5 is roughly at the money." },
   { h: "Gamma and theta", ul: ["Gamma: how quickly delta changes as the underlying moves. It is highest near the money and near expiry.", "Theta: the daily time decay in an option's value. Option buyers pay theta, and option sellers collect it."] },
   { h: "Vega and implied volatility", p: "Vega measures sensitivity to a 1% change in implied volatility (IV). IV reflects the market's expectation of future movement. Options usually become more expensive when IV rises, for example before results or major events." },
   { h: "Defined-risk spreads", p: "A bull call spread buys one call and sells a higher-strike call with the same expiry. Both maximum profit and maximum loss are limited. Iron condors and credit spreads are other defined-risk structures. Check the margin and maximum loss before entering." },
   { h: "Practical caution", p: "Greeks are model estimates and change quickly. Test strategies in paper trading and understand the assumptions behind your broker's calculator." }
  ]
 },
 "trading-psychology": {
  title: "Trading Psychology", level: "advanced", time: "6 lessons",
  summary: "Recognise biases such as fear, greed and overtrading, and build a disciplined process.",
  sections: [
   { h: "Common biases", ul: ["Loss aversion: holding losing trades too long to avoid admitting a loss.", "Overconfidence: increasing size after a few wins.", "Recency bias: assuming the latest trend will continue.", "FOMO: chasing a move after it has already run."] },
   { h: "Overtrading", p: "Trading too often raises costs and emotional mistakes. A written plan with a maximum number of trades per day or week helps." },
   { h: "Process over outcome", p: "A good decision can lose money and a bad decision can make money. Judge each trade by whether you followed your plan, not by a single result." },
   { h: "Build a routine", ul: ["Before the market opens: levels, news, and your maximum risk for the day.", "After the market closes: journal entries and any rule breaks.", "After a large loss, rest before the next session."] }
  ]
 }
},
hi: {
 "foundations": {
  title: "शेयर बाज़ार की मूल बातें", level: "beginner", time: "6 पाठ",
  summary: "शेयर क्या है, एक्सचेंज कैसे काम करते हैं, और ऑर्डर ट्रेड में कैसे बदलता है।",
  sections: [
   { h: "शेयर क्या है?", p: "शेयर (स्टॉक) किसी कंपनी में मालिकाना हक का एक छोटा हिस्सा है। अगर किसी कंपनी के 1,00,000 शेयर हैं और आपके पास 100 शेयर हैं, तो आपके पास उसका 0.1% हिस्सा है। आपका लाभ या नुकसान मुख्य रूप से कीमत बदलने से होता है, और कभी-कभी डिविडेंड से भी।", ul: ["कंपनी बढ़ती है तो शेयरधारकों को लाभ हो सकता है।", "कीमत गिरे तो पैसा डूब भी सकता है।", "लिस्टेड कंपनियों के शेयर स्टॉक एक्सचेंज पर ट्रेड होते हैं।"] },
   { h: "एक्सचेंज, इंडेक्स और ब्रोकर", p: "भारत में मुख्य एक्सचेंज NSE और BSE हैं। आप SEBI-पंजीकृत ब्रोकर के ज़रिए डीमैट खाते (जिसमें शेयर इलेक्ट्रॉनिक रूप में रहते हैं) और ट्रेडिंग खाते से ख़रीद-बिक्री करते हैं।", ul: ["NIFTY 50, NSE की 50 बड़ी कंपनियों को दर्शाता है।", "SENSEX, BSE की 30 बड़ी कंपनियों को दर्शाता है।", "ब्रोकर आपका ऑर्डर आगे भेजता है; एक्सचेंज ख़रीदार और विक्रेता का मिलान करता है।"] },
   { h: "ऑर्डर के प्रकार और सेटलमेंट", p: "मार्केट ऑर्डर उपलब्ध सबसे अच्छी कीमत पर तुरंत ख़रीदता या बेचता है। लिमिट ऑर्डर आपकी अधिकतम खरीद या न्यूनतम बिक्री कीमत तय करता है। भारत में इक्विटी ट्रेड का सेटलमेंट T+1 होता है, यानी अगले ट्रेडिंग दिन।", ul: ["ऑर्डर देने से पहले अपने ब्रोकर के नियम और शुल्क जाँचें।", "ऑर्डर देने और पूरा होने के बीच कीमत बदल सकती है।", "सेटलमेंट की तारीख़ से पहले ज़रूरी फ़ंड या शेयर तैयार रखें।"] }
  ]
 },
 "investing": {
  title: "निवेश और धन निर्माण", level: "beginner", time: "8 पाठ",
  summary: "लक्ष्य तय करें, समय-सीमा समझें, विविधीकरण करें और चक्रवृद्धि को वर्षों तक काम करने दें।",
  sections: [
   { h: "लक्ष्य और समय-सीमा से शुरुआत करें", p: "निवेश तब सबसे अच्छा काम करता है जब आपको पता हो कि आप क्यों निवेश कर रहे हैं और पैसे की ज़रूरत कब होगी। लगभग 3 साल से कम के लक्ष्यों के लिए आमतौर पर सुरक्षित विकल्प चुने जाते हैं। लंबे लक्ष्यों में बाज़ार के उतार-चढ़ाव को झेलने की गुंजाइश ज़्यादा होती है।", ul: ["हर लक्ष्य लिखें: घर, शिक्षा, रिटायरमेंट आदि।", "हर लक्ष्य के लिए अलग समय-सीमा और जोखिम स्तर तय करें।", "विकास के लिए निवेश से पहले 3 से 6 महीने के खर्च जितना आपातकालीन फ़ंड बनाएँ।"] },
   { h: "चक्रवृद्धि (कंपाउंडिंग)", p: "कंपाउंडिंग का मतलब है कि आपका रिटर्न भी रिटर्न कमाता है। ₹1,00,000 पर सालाना 10% की दर से 10 साल में लगभग ₹2.59 लाख और 20 साल में लगभग ₹6.73 लाख होंगे, टैक्स, शुल्क और महँगाई से पहले।", ul: ["जल्दी शुरू करना अक्सर बाद में बड़ी रकम लगाने से ज़्यादा असरदार होता है।", "रिटर्न की गारंटी नहीं होती। ये केवल उदाहरण हैं।"] },
   { h: "विविधीकरण और एसेट एलोकेशन", p: "पैसा अलग-अलग एसेट (शेयर, बॉन्ड, सोना, नकद) और अलग-अलग सेक्टरों में बाँटने से किसी एक ख़राब निवेश का असर कम होता है।", ul: ["सारा पैसा एक ही शेयर में न लगाएँ।", "साल में एक-दो बार पोर्टफ़ोलियो को संतुलित (रिबैलेंस) करें।", "अपनी ज़रूरत और नुकसान सहने की क्षमता के अनुसार आवंटन चुनें।"] }
  ]
 },
 "sip-mutual-funds": {
  title: "SIP और म्यूचुअल फंड", level: "beginner", time: "7 पाठ",
  summary: "SIP कैसे काम करता है, NAV का मतलब क्या है, और फंड की लागत कैसे पढ़ें।",
  sections: [
   { h: "SIP क्या है?", p: "SIP (Systematic Investment Plan) में एक तय राशि नियमित अंतराल पर, आमतौर पर हर महीने, म्यूचुअल फंड में लगाई जाती है। कीमत कम होने पर ज़्यादा यूनिट और ज़्यादा होने पर कम यूनिट मिलती हैं। इसे रुपी कॉस्ट एवरेजिंग कहते हैं। यह मुनाफ़े की गारंटी नहीं देता।" },
   { h: "NAV और यूनिट", p: "NAV (Net Asset Value) म्यूचुअल फंड की एक यूनिट की कीमत है, जो हर दिन बाज़ार बंद होने के बाद तय होती है। आपकी यूनिट = लगाई गई राशि ÷ उस दिन का NAV।", ul: ["उदाहरण: ₹5,000 लगाए और NAV ₹50 है, तो आपको 100 यूनिट मिलेंगी।"] },
   { h: "फंड के प्रकार और लागत", ul: ["इक्विटी फंड मुख्य रूप से शेयरों में निवेश करते हैं। जोखिम और संभावित रिटर्न दोनों अधिक होते हैं।", "डेट फंड बॉन्ड में निवेश करते हैं। उनकी कीमत में उतार-चढ़ाव आमतौर पर कम होता है।", "इंडेक्स फंड NIFTY 50 जैसे इंडेक्स की नकल करते हैं और अक्सर लागत कम होती है।", "एक्सपेंस रेशियो फंड की सालाना फ़ीस है। बाक़ी बातें समान हों तो कम बेहतर है।"] }
  ]
 },
 "reading-charts": {
  title: "चार्ट कैसे पढ़ें", level: "beginner", time: "6 पाठ",
  summary: "लाइन, बार और कैंडलस्टिक चार्ट, OHLC डेटा और वॉल्यूम समझें।",
  sections: [
   { h: "चार्ट के प्रकार", ul: ["लाइन चार्ट: हर अवधि का क्लोजिंग भाव जोड़ता है। ट्रेंड देखने के लिए सरल।", "बार (OHLC) चार्ट: हर अवधि का ओपन, हाई, लो और क्लोज़ दिखाता है।", "कैंडलस्टिक चार्ट: वही OHLC डेटा, रंगीन बॉडी और विक (wick) के रूप में।"] },
   { h: "एक कैंडल कैसे पढ़ें", p: "हरी (या सफ़ेद) कैंडल का मतलब है कि क्लोज़ ओपन से ऊपर रहा। लाल (या काली) कैंडल का मतलब है कि क्लोज़ ओपन से नीचे रहा। बॉडी के ऊपर और नीचे की पतली लाइनें विक हैं, जो उस अवधि का हाई और लो दिखाती हैं। एक कैंडल 1 मिनट, 1 दिन, 1 सप्ताह या किसी और समय-सीमा को दर्शा सकती है।" },
   { h: "वॉल्यूम", p: "वॉल्यूम किसी अवधि में ट्रेड हुए शेयरों की संख्या है। ज़्यादा वॉल्यूम के साथ हुई कीमत की चाल को आमतौर पर कम वॉल्यूम वाली उतनी ही चाल से ज़्यादा महत्वपूर्ण माना जाता है। यह एक संकेत है, गारंटी नहीं।" }
  ]
 },
 "fundamental-analysis": {
  title: "फंडामेंटल एनालिसिस", level: "intermediate", time: "9 पाठ",
  summary: "वित्तीय विवरण, प्रमुख अनुपात और गुणवत्ता जाँच से किसी कारोबार का मूल्यांकन करें।",
  sections: [
   { h: "तीन मुख्य वित्तीय विवरण", ul: ["प्रॉफ़िट एंड लॉस: एक अवधि की आय, खर्च और मुनाफ़ा।", "बैलेंस शीट: किसी एक समय पर संपत्ति, देनदारी और इक्विटी।", "कैश फ़्लो स्टेटमेंट: असल में कितना नकद आया और कितना गया।"] },
   { h: "प्रमुख अनुपात", ul: ["EPS (प्रति शेयर आय) = शुद्ध मुनाफ़ा ÷ शेयरों की संख्या।", "P/E अनुपात = शेयर कीमत ÷ EPS। ऊँचा P/E अपेक्षित ग्रोथ दर्शा सकता है। उसी इंडस्ट्री से तुलना करें।", "ROE (इक्विटी पर रिटर्न) = शुद्ध मुनाफ़ा ÷ शेयरधारक इक्विटी। लगातार ऊँचा ROE कुशल कारोबार का संकेत हो सकता है।", "डेट-टू-इक्विटी बताता है कि कंपनी अपनी इक्विटी के मुकाबले कितना कर्ज़ लेती है।"] },
   { h: "कारोबार की गुणवत्ता और मूल्यांकन", p: "अनुपात केवल शुरुआत हैं। बिज़नेस मॉडल, प्रतिस्पर्धी बढ़त, प्रबंधन का रिकॉर्ड और गवर्नेंस पढ़ें। सालाना रिपोर्ट और फ़ाइलिंग एक्सचेंज की वेबसाइट पर सार्वजनिक होती हैं।", ul: ["कमाई घट रही हो तो कम P/E भी जाल हो सकता है।", "देखें कि मुनाफ़े के पीछे असली कैश फ़्लो है या नहीं।"] }
  ]
 },
 "technical-analysis": {
  title: "टेक्निकल एनालिसिस", level: "intermediate", time: "10 पाठ",
  summary: "कीमत और वॉल्यूम पैटर्न, ट्रेंड, सपोर्ट, रेज़िस्टेंस और आम इंडिकेटर पढ़ें।",
  sections: [
   { h: "ट्रेंड", p: "अपट्रेंड में ऊँचे हाई और ऊँचे लो बनते हैं। डाउनट्रेंड में नीचे हाई और नीचे लो बनते हैं। ट्रेंड की दिशा में ट्रेड करना एक आम शुरुआती सिद्धांत है, लेकिन ट्रेंड पलट भी सकते हैं।" },
   { h: "सपोर्ट और रेज़िस्टेंस", p: "सपोर्ट वह कीमत-क्षेत्र है जहाँ अक्सर ख़रीदारी दिखी है। रेज़िस्टेंस वह क्षेत्र है जहाँ बिक्री का दबाव रहा है। मज़बूत वॉल्यूम के साथ रेज़िस्टेंस टूटे तो वही स्तर बाद में सपोर्ट बन सकता है।" },
   { h: "मूविंग एवरेज", p: "मूविंग एवरेज किसी तय अवधि की औसत कीमत है, जो चाल को सुचारु बनाता है। मध्यम-अवधि के ट्रेंड के लिए 50-अवधि का सिंपल मूविंग एवरेज आम है। कीमत औसत से ऊपर हो तो अक्सर तेज़ी और नीचे हो तो मंदी माना जाता है। छोटे एवरेज का बड़े को पार करना व्यापक रूप से देखा जाने वाला संकेत है।" },
   { h: "RSI और MACD", ul: ["RSI (14) 0 से 100 के पैमाने पर मोमेंटम मापता है। 70 से ऊपर को अक्सर ओवरबॉट और 30 से नीचे को ओवरसोल्ड कहा जाता है, पर मज़बूत ट्रेंड इन स्तरों पर लंबे समय तक रह सकते हैं।", "MACD दो मूविंग एवरेज की तुलना करता है। MACD लाइन का सिग्नल लाइन को पार करना एक आम मोमेंटम संकेत है।"] },
   { h: "टेक्निकल एनालिसिस की सीमाएँ", p: "इंडिकेटर देर से संकेत देते हैं और गलत संकेत भी दे सकते हैं। इन्हें जोखिम नियमों के साथ इस्तेमाल करें, और किसी एक इंडिकेटर पर भरोसा न करें।" }
  ]
 },
 "swing-trading": {
  title: "स्विंग ट्रेडिंग", level: "intermediate", time: "8 पाठ",
  summary: "साफ़ सेटअप, एंट्री-एग्ज़िट नियम और ट्रेड जर्नल से कुछ दिनों से कुछ हफ़्तों तक ट्रेड रखें।",
  sections: [
   { h: "स्विंग ट्रेडिंग क्या है?", p: "स्विंग ट्रेडिंग आमतौर पर कुछ दिनों से कुछ हफ़्तों तक चलने वाली कीमत की चाल को पकड़ने का प्रयास है। यह इंट्राडे (एक ही दिन) और निवेश (महीने-साल) के बीच आता है। इसके लिए धैर्य और योजना चाहिए। रात भर पोज़िशन रखने से गैप का जोखिम भी रहता है, जब कीमत आपके स्टॉप से काफ़ी दूर खुल जाए।" },
   { h: "पूरा ट्रेड प्लान", ul: ["सेटअप: आप क्यों एंट्री कर रहे हैं, जैसे वॉल्यूम के साथ रेज़िस्टेंस से ब्रेकआउट।", "एंट्री: वह कीमत या शर्त जिस पर ट्रेड शुरू होगा।", "स्टॉप लॉस: वह कीमत जहाँ आप मान लेंगे कि आपका विचार ग़लत था।", "टारगेट: जहाँ मुनाफ़ा बुक करेंगे, और आपका स्वीकार्य जोखिम-इनाम अनुपात, जैसे 2:1।"] },
   { h: "पोज़िशन साइज़", p: "तय करें कि एक ट्रेड में अधिकतम कितना नुकसान उठाएँगे, जैसे पूँजी का 1%। पोज़िशन साइज़ = अधिकतम नुकसान ÷ (एंट्री − स्टॉप), प्रति शेयर। उदाहरण: ₹1,00,000 पूँजी और 1% जोखिम = ₹1,000। एंट्री ₹250 और स्टॉप ₹240 है, यानी दूरी ₹10, तो साइज़ 100 शेयर। इसमें शुल्क और स्लिपेज शामिल नहीं हैं।" },
   { h: "ट्रेड जर्नल रखें", p: "सेटअप, कारण, साइज़, नतीजा और गलतियाँ लिखें। हर महीने समीक्षा करें कि कौन से सेटअप आपके लिए सचमुच काम करते हैं।" }
  ]
 },
 "risk-management": {
  title: "जोखिम प्रबंधन", level: "intermediate", time: "7 पाठ",
  summary: "पोज़िशन साइज़, स्टॉप लॉस, एक्सपोज़र सीमा और ड्रॉडाउन योजना से पूँजी की रक्षा करें।",
  sections: [
   { h: "पूँजी की रक्षा सबसे पहले", p: "50% नुकसान की भरपाई के लिए 100% लाभ चाहिए। नुकसान का असर बराबर के लाभ से ज़्यादा होता है, इसलिए नुकसान सीमित करना सबसे ज़रूरी है।" },
   { h: "प्रति ट्रेड जोखिम", p: "कई ट्रेडर हर ट्रेड में पूँजी का 0.5% से 2% जोखिम लेते हैं। कम जोखिम का मतलब है कि लगातार नुकसान के दौर में भी आप लंबे समय तक टिके रह सकते हैं।", ul: ["उदाहरण: हर ट्रेड में 2% जोखिम पर लगातार 10 नुकसान से पूँजी लगभग 18% घटती है।"] },
   { h: "जोखिम और इनाम", p: "1:2 जोखिम-इनाम वाले सेटअप में, शुल्क छोड़कर, लगभग एक-तिहाई से थोड़े अधिक ट्रेड जीतने से ही ब्रेक-ईवन हो जाता है।" },
   { h: "एक्सपोज़र और सहसंबंध", p: "पाँच बैंकिंग शेयर रखना पाँच स्वतंत्र दाँव नहीं है। हर सेक्टर और थीम में अपना कुल एक्सपोज़र देखें।" },
   { h: "ड्रॉडाउन के नियम", ul: ["मासिक अधिकतम नुकसान तय करें और वह सीमा छूने पर रुकें।", "लगातार नुकसान के बाद पोज़िशन साइज़ घटाएँ।", "नुकसान की भरपाई के लिए जोखिम बढ़ाने के बजाय योजना की समीक्षा करें।"] }
  ]
 },
 "intraday-trading": {
  title: "इंट्राडे ट्रेडिंग", level: "advanced", time: "9 पाठ",
  summary: "एक ही सत्र में ट्रेड करें। लिक्विडिटी, ऑर्डर निष्पादन, मार्जिन और असली जोखिम समझें।",
  sections: [
   { h: "इंट्राडे का मतलब", p: "इंट्राडे ट्रेड उसी सत्र में खुलते और बंद होते हैं, और बाज़ार बंद होने से पहले पोज़िशन बंद करनी होती है। ब्रोकर इसमें मार्जिन (लीवरेज) देते हैं, जो लाभ और नुकसान दोनों को बढ़ाता है। SEBI के F&O ट्रेडरों के विश्लेषण सहित कई अध्ययनों में पाया गया है कि अधिकांश व्यक्तिगत ट्रेडर पैसा गँवाते हैं।" },
   { h: "लिक्विडिटी और स्प्रेड", p: "ज़्यादा वॉल्यूम और कम बिड-आस्क स्प्रेड वाले लिक्विड शेयर चुनें। कम ट्रेड होने वाले शेयरों में अपनी इच्छित कीमत पर निकलना मुश्किल हो सकता है।" },
   { h: "ऑर्डर प्रकार और निष्पादन", ul: ["जोखिम तय करने के लिए स्टॉप-लॉस ऑर्डर (SL और SL-M) इस्तेमाल करें।", "तेज़ बाज़ार में, और खुलने-बंद होने के आसपास, स्लिपेज की उम्मीद रखें।", "कम लिक्विड शेयरों में मार्केट ऑर्डर से बचें।"] },
   { h: "जोखिम नियम", p: "रोज़ का नुकसान सीमा तय करें और उस पर पहुँचकर ट्रेडिंग रोक दें। पोज़िशन साइज़ पूँजी के अनुपात में छोटा रखें। घाटे वाले ट्रेड में औसत बढ़ाने (averaging down) से बचें।" },
   { h: "खर्चे", p: "ब्रोकरेज, STT, एक्सचेंज चार्ज, GST, स्टाम्प ड्यूटी और टैक्स मुनाफ़ा घटाते हैं। खर्च के बाद ग्रॉस लाभ नेट नुकसान बन सकता है, इसलिए हर ट्रेड से पहले इनका हिसाब लगाएँ।" }
  ]
 },
 "futures-options": {
  title: "फ्यूचर्स और ऑप्शंस (F&O)", level: "advanced", time: "12 पाठ",
  summary: "फ्यूचर्स, कॉल और पुट ऑप्शंस, स्ट्राइक, एक्सपायरी, मार्जिन और पेऑफ़ को उनके जोखिमों के साथ समझें।",
  sections: [
   { h: "फ्यूचर्स", p: "फ्यूचर्स कॉन्ट्रैक्ट एक समझौता है जिसमें भविष्य की तारीख़ पर तय कीमत पर कोई एसेट ख़रीदा या बेचा जाता है, और दोनों पक्षों पर दायित्व होता है। फ्यूचर्स में मार्जिन लगता है, इसलिए लगाई गई नकद रकम के मुकाबले छोटी चाल भी बड़ा लाभ या नुकसान कर सकती है।" },
   { h: "ऑप्शंस: कॉल और पुट", ul: ["कॉल ऑप्शन: स्ट्राइक कीमत पर एक्सपायरी तक या उससे पहले ख़रीदने का अधिकार, दायित्व नहीं।", "पुट ऑप्शन: स्ट्राइक कीमत पर बेचने का अधिकार।", "प्रीमियम: ख़रीदार द्वारा विक्रेता को चुकाई गई कीमत।", "ख़रीदार का अधिकतम नुकसान चुकाया गया प्रीमियम है। बिना हेजिंग के विक्रेता को बड़ा या असीमित नुकसान हो सकता है।"] },
   { h: "ज़रूरी शब्द", ul: ["स्ट्राइक प्राइस और एक्सपायरी तारीख़।", "लॉट साइज़: एक कॉन्ट्रैक्ट की तय मात्रा।", "ITM (इन द मनी), ATM (एट द मनी), OTM (आउट ऑफ़ द मनी)।"] },
   { h: "पेऑफ़ का उदाहरण", p: "₹100 स्ट्राइक की कॉल ₹5 प्रीमियम पर ख़रीदी। एक्सपायरी पर शेयर ₹120 है, तो आंतरिक मूल्य ₹20 है और शुल्क से पहले प्रति शेयर लाभ ₹15। अगर शेयर ₹95 है, तो ऑप्शन बेकार हो जाता है और ₹5 प्रीमियम का नुकसान होता है।" },
   { h: "जोखिम चेतावनी", p: "SEBI के आँकड़े बताते हैं कि अधिकांश व्यक्तिगत F&O ट्रेडरों को नुकसान हुआ है। ऑप्शन बेकार हो सकते हैं, और लीवरेज आपकी पूँजी से ज़्यादा जोखिम दे सकता है। पहले पेपर ट्रेडिंग से सीखें और मार्जिन व असाइनमेंट नियम समझें।" }
  ]
 },
 "option-greeks": {
  title: "ऑप्शन ग्रीक्स और रणनीतियाँ", level: "advanced", time: "10 पाठ",
  summary: "कीमत, समय और अस्थिरता के साथ ऑप्शन की कीमत कैसे बदलती है, यह समझें और सीमित-जोखिम रणनीतियाँ बनाएँ।",
  sections: [
   { h: "डेल्टा", p: "डेल्टा बताता है कि अंतर्निहित एसेट में ₹1 की चाल पर ऑप्शन की कीमत कितनी बदलेगी। कॉल का डेल्टा 0 से 1 के बीच और पुट का −1 से 0 के बीच होता है। लगभग 0.5 डेल्टा मोटे तौर पर एट द मनी को दर्शाता है।" },
   { h: "गामा और थीटा", ul: ["गामा: अंतर्निहित एसेट बदलने पर डेल्टा कितनी तेज़ी से बदलता है। एट द मनी और एक्सपायरी के पास सबसे ज़्यादा।", "थीटा: ऑप्शन की कीमत का रोज़ का समय-क्षय। ऑप्शन ख़रीदार थीटा चुकाते हैं, और विक्रेता इसे कमाते हैं।"] },
   { h: "वेगा और इम्प्लाइड वोलैटिलिटी (IV)", p: "वेगा IV में 1% बदलाव पर संवेदनशीलता मापता है। IV बाज़ार की भविष्य की चाल की उम्मीद दर्शाता है। नतीजों या किसी बड़ी घटना से पहले IV बढ़ने पर ऑप्शन आमतौर पर महँगे हो जाते हैं।" },
   { h: "सीमित-जोखिम स्प्रेड", p: "बुल कॉल स्प्रेड में एक कॉल ख़रीदी जाती है और उसी एक्सपायरी की ऊँची स्ट्राइक वाली कॉल बेची जाती है। अधिकतम लाभ और अधिकतम नुकसान दोनों सीमित होते हैं। आयरन कंडोर और क्रेडिट स्प्रेड भी ऐसी संरचनाएँ हैं। एंट्री से पहले मार्जिन और अधिकतम नुकसान जाँचें।" },
   { h: "व्यावहारिक सावधानी", p: "ग्रीक्स मॉडल पर आधारित अनुमान हैं और तेज़ी से बदलते हैं। रणनीतियों को पेपर ट्रेडिंग में परखें और अपने ब्रोकर के कैलकुलेटर की धारणाएँ समझें।" }
  ]
 },
 "trading-psychology": {
  title: "ट्रेडिंग मनोविज्ञान", level: "advanced", time: "6 पाठ",
  summary: "डर, लालच और ओवरट्रेडिंग जैसे पूर्वाग्रह पहचानें और अनुशासित प्रक्रिया बनाएँ।",
  sections: [
   { h: "आम पूर्वाग्रह", ul: ["हानि से बचाव (loss aversion): घाटा स्वीकार न करने के लिए घाटे वाली पोज़िशन को ज़रूरत से ज़्यादा रखना।", "अति-आत्मविश्वास: कुछ जीत के बाद पोज़िशन साइज़ बढ़ा देना।", "हाल की घटनाओं का असर (recency bias): मान लेना कि ताज़ा ट्रेंड हमेशा चलेगा।", "FOMO: चाल के बाद उसके पीछे भागना।"] },
   { h: "ओवरट्रेडिंग", p: "बार-बार ट्रेड करने से खर्च और भावनात्मक गलतियाँ बढ़ती हैं। लिखित योजना में दिन या हफ़्ते के अधिकतम ट्रेड तय करें।" },
   { h: "नतीजे से ज़्यादा प्रक्रिया", p: "अच्छा फ़ैसला भी नुकसान दे सकता है और ख़राब फ़ैसला भी लाभ। हर ट्रेड को एक नतीजे से नहीं, बल्कि इस आधार पर परखें कि आपने योजना का पालन किया या नहीं।" },
   { h: "रोज़ की दिनचर्या बनाएँ", ul: ["बाज़ार खुलने से पहले: लेवल, समाचार और उस दिन का अधिकतम जोखिम।", "बाज़ार बंद होने के बाद: जर्नल की प्रविष्टियाँ और नियम टूटने की समीक्षा।", "बड़े नुकसान के बाद अगले सत्र से पहले आराम करें।"] }
  ]
 }
}
};

const LESSON_LANGS = { en: "English", hi: "हिन्दी" };
