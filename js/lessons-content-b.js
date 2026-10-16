// Expanded content (English and Hindi): Candlestick & Chart Patterns, Fundamental Analysis, Technical Analysis.
// Overrides the sections in lessons.js. Pattern and indicator cards are added automatically by lesson.js.
Object.assign(LESSON_OVERRIDES.en, {
 "candlestick-patterns": { sections: [
  { h: "1. What a pattern is, and what it is not", p: "A candlestick pattern is a shape made by one, two or three candles that suggests what buyers and sellers were doing recently. Patterns are descriptions of past behaviour with a tendency toward a likely next move. They are not predictions, and they do not work on their own. A pattern is useful only when you place it in context and wait for confirmation." },
  { h: "2. The four questions to ask before any pattern", ul: [
   "Where is it? Is it at a support or resistance level, or in the middle of nowhere?",
   "What came before? Reversal patterns need a prior trend to reverse. A hammer in a sideways market means little.",
   "What confirms it? A close beyond the pattern's high or low, on good volume, is the usual confirmation.",
   "What if it is wrong? Where is your stop-loss, and is the position small enough that a wrong pattern costs an acceptable amount?"
  ] },
  { h: "3. Single-candle patterns", p: "These use one candle. They are the easiest to spot and the easiest to misread, so they need the most context. The key feature is the relationship between the body and the wicks.", ul: [
   "Hammer and hanging man: a small body at the top with a long lower wick. The same shape means different things depending on whether it comes after a fall (hammer) or a rise (hanging man).",
   "Inverted hammer and shooting star: a small body at the bottom with a long upper wick. After a fall it can be bullish; after a rise it is a warning.",
   "Doji: open and close nearly equal, showing balance. Its meaning depends on the trend and the next candle.",
   "Marubozu: a candle with no wicks, showing strong control by one side for the whole period."
  ] },
  { h: "4. Two-candle patterns", p: "Two candles together show a change in the balance between buyers and sellers. The second candle must respond to the first.", ul: [
   "Bullish and bearish engulfing: the second body fully covers the first. Strong because the reversal is clear in one step.",
   "Bullish harami: a small candle sits inside the body of a large opposite candle. It signals the selling is losing strength, but it is a warning, not a trigger.",
   "Piercing line and dark cloud cover: the second candle opens beyond the first and closes past its midpoint. Partial reversals, usually weaker than engulfing."
  ] },
  { h: "5. Three-candle patterns", p: "Three candles show a more complete story: a move, a pause, and a reversal or continuation. They are often more reliable than one- or two-candle patterns, but they also take longer to form.", ul: [
   "Morning star (bullish): a large red candle, a small candle with a gap, then a large green candle closing above the midpoint of the first.",
   "Evening star (bearish): the mirror image after an uptrend.",
   "Three white soldiers and three black crows: three strong candles in the same direction, each closing further in that direction. Signals a strong trend has started."
  ] },
  { h: "6. Chart patterns: slower, larger shapes", p: "Chart patterns form over days to months. Head and shoulders, double tops and bottoms, triangles, flags and cup and handle are built from many candles. They define a level (the neckline, the rim or the trend line) and a breakout. The trade is the breakout, not the shape. Many chart patterns fail, so wait for the close beyond the level, check volume, and measure the target from the pattern's height only as a rough guide." },
  { h: "7. Confirmation: the rule that prevents most losses", p: "Confirmation means waiting for evidence that the pattern is working before committing money. For a bullish reversal, a common rule is: the next candle closes above the pattern's high, with volume above its average. Entering earlier gives a better price but more false signals. Entering later costs some of the move but reduces losses from failed patterns." },
  { h: "8. A complete example", p: "A stock has fallen for ten sessions. On day 11 a hammer forms at a level where price bounced twice before (support). On day 12 the price closes above the hammer's high with volume 1.5 times average. A trader buys at ₹252 with a stop at ₹244, just below the hammer's low, and a target at the previous resistance of ₹268. Risk is ₹8 per share and reward is ₹16, a 1:2 ratio. The numbers are illustrative; the process is what matters." },
  { h: "9. Common pattern mistakes", ul: [
   "Trading every pattern you see. Most patterns are noise; only those at key levels with a trend matter.",
   "Entering before confirmation because the pattern looks perfect.",
   "Forcing a pattern onto a chart that does not show it clearly.",
   "Ignoring the broader market. A bullish pattern in a falling market fails more often.",
   "Using a single pattern as your whole strategy."
  ] },
  { h: "10. How to practise", p: "Mark patterns on past charts and write down what happened next, without the outcome shaping your memory. After 30 to 50 examples of one pattern, you will know whether it works in the market and stocks you follow. Keep a journal with the pattern, context, confirmation, result and mistake." }
 ] },
 "fundamental-analysis": { sections: [
  { h: "1. What fundamental analysis is", p: "Fundamental analysis asks whether a business is worth its price. It looks at the company's sales, profits, debts, cash, management and industry. The goal is to estimate what the business is worth and compare that with the share price. The gap between the two is the margin of safety that value investors look for." },
  { h: "2. Where to find the information", ul: [
   "Annual report: the full picture, including management discussion, risks and audited financial statements.",
   "Quarterly results: the latest profit, sales and sometimes cash flow. Filed on the exchange websites (NSE and BSE).",
   "Investor presentations and earnings calls: management's explanation of the numbers.",
   "Shareholding pattern: promoter, institutional and public holdings, filed every quarter.",
   "Corporate announcements: dividends, bonus issues, board decisions and material events."
  ] },
  { h: "3. The three financial statements", p: "A company's story is told in three statements that must be read together.", ul: [
   "Profit and loss statement: revenue, expenses and profit over a period. Shows whether the business earns money.",
   "Balance sheet: assets, liabilities and equity at one date. Shows what the company owns and owes.",
   "Cash flow statement: cash from operations, investing and financing. Shows whether profits become real cash."
  ], p2: "A company can show a profit and still run out of cash. Always check whether operating cash flow is close to net profit over several years." },
  { h: "4. Core ratios with formulas and an example", ul: [
   "EPS (earnings per share) = net profit ÷ number of shares. Example: ₹300 crore profit ÷ 10 crore shares = ₹30 EPS.",
   "P/E ratio = share price ÷ EPS. Example: ₹450 ÷ ₹30 = 15 times earnings.",
   "ROE (return on equity) = net profit ÷ shareholders' equity. Example: ₹500 crore ÷ ₹2,500 crore = 20%.",
   "Debt-to-equity = total debt ÷ shareholders' equity. Example: ₹1,000 crore ÷ ₹2,500 crore = 0.4.",
   "Dividend yield = dividend per share ÷ share price. Example: ₹10 ÷ ₹450 ≈ 2.2%.",
   "Operating margin = operating profit ÷ revenue. Shows how much each rupee of sales keeps after running costs."
  ] },
  { h: "5. Growth: is the company getting bigger and better?", p: "A good business grows its sales and profits over time, and does so without needing ever more debt. Look at 5 to 10 years of data, not one quarter. Check whether revenue growth comes with stable or improving margins, and whether the return on capital stays high as the company expands." },
  { h: "6. Quality: the business behind the numbers", p: "Ratios cannot tell you everything. Quality questions include: Does the company have a durable advantage, such as a brand, cost position, network or regulatory licence? Is management honest and competent, with a record of allocating capital well? Are related-party transactions or accounting changes a concern? Is the business easy to understand?" },
  { h: "7. Valuation: how much is it worth?", p: "Valuation estimates what the business is worth per share, using methods such as comparing P/E with peers, comparing price-to-book, or estimating future cash flows discounted to today. No method gives a single correct answer. Use two or three approaches to get a range, and buy only when the price is comfortably below your estimate.", ul: [
   "Relative valuation: compare P/E, price-to-book and EV/EBITDA with similar companies.",
   "Absolute valuation (discounted cash flow): estimate future cash flows and discount them. Very sensitive to assumptions.",
   "A cheap-looking stock can be a value trap if earnings are falling. A high-priced stock can still be good if growth is strong and durable."
  ] },
  { h: "8. A worked example", p: "Company X: price ₹450, EPS ₹30 (P/E 15), ROE 20%, debt-to-equity 0.4, sales growing 15% a year for five years, operating margin steady at 18%. Peers trade at an average P/E of 20. Company X looks reasonable on these figures: strong returns, low debt and a P/E below peers. Before deciding, check the annual report for one-off profits, the quality of cash flow and the risks listed by management. The example is illustrative, not a recommendation." },
  { h: "9. Red flags to check every time", ul: [
   "Profits rising while operating cash flow falls for several years.",
   "Receivables growing much faster than sales.",
   "Frequent changes in auditors or accounting policies.",
   "Promoter shares being pledged in large amounts.",
   "Heavy reliance on one customer, one product or one government contract.",
   "Management that changes its targets or explanations often."
  ] },
  { h: "10. Building your own process", p: "Write a one-page checklist: business model, growth, margins, returns, debt, cash flow, management, valuation, and risks. Fill it in from the annual report before you read any opinion. Review your holdings when results come out, not every day. Your job is to understand the business well enough to explain why you own it, and to know what would make you sell." }
 ] },
 "technical-analysis": { sections: [
  { h: "1. What technical analysis studies", p: "Technical analysis studies price and volume to understand the behaviour of buyers and sellers. It assumes that price already reflects known information, and that patterns of behaviour tend to repeat because people react in similar ways to similar situations. It is a method for managing probabilities and timing, not a guarantee of future prices." },
  { h: "2. Trend: the first thing to identify", p: "A trend is the general direction of price. Uptrend: higher highs and higher lows. Downtrend: lower highs and lower lows. Sideways: no clear direction. Most beginners lose money by trading against the trend. Identify the trend on a higher timeframe first, and then look for entries in that direction.", ul: [
   "Trend lines connect swing lows in an uptrend and swing highs in a downtrend.",
   "A trend is weakening when a new high fails to form, or when price breaks its last swing low.",
   "Moving averages can confirm trend direction: price above a rising average suggests an uptrend."
  ] },
  { h: "3. Support and resistance", p: "Support is a price area where buying has tended to appear. Resistance is an area where selling has tended to appear. They are zones, not exact prices. A level becomes stronger each time price respects it, and when price breaks through with volume, the broken resistance often becomes new support." },
  { h: "4. Moving averages", p: "A moving average is the average price over a set number of periods. It smooths noise and shows direction. The most used are 20, 50 and 200 periods. A simple moving average (SMA) weights all periods equally; an exponential moving average (EMA) gives more weight to recent prices and reacts faster.", p2: "Example: the 5-period SMA of closes 100, 102, 104, 103 and 105 is 102.8. On the next day, with a close of 107, the average becomes 104.2, because 100 drops out and 107 comes in." },
  { h: "5. Momentum: RSI and MACD", p: "Momentum indicators measure how fast price is moving and whether that speed is changing.", ul: [
   "RSI (relative strength index): a 0 to 100 scale over 14 periods. Above 70 is often overbought, below 30 oversold. In strong trends it can stay in those zones for a long time.",
   "MACD: the difference between a 12-period and a 26-period EMA, with a 9-period signal line. A MACD line crossing above its signal line is a bullish momentum signal.",
   "Divergence: price makes a new high while RSI or MACD makes a lower high. It warns that momentum is fading."
  ] },
  { h: "6. Volume: the strength behind the move", p: "Volume confirms price moves. A breakout on high volume is more reliable than one on low volume. A rally on falling volume is weak. High volume at the end of a long fall can mark exhaustion, but confirm with the next candles before acting." },
  { h: "7. Chart patterns and breakouts", p: "Chart patterns such as triangles, flags and head and shoulders describe a range that price is building. The breakout from the range is the trade signal. Measure the potential move from the pattern's height only as a rough guide, and place a stop just inside the range, so a failed breakout exits quickly." },
  { h: "8. Risk first: stops and position size", p: "Technical signals are only as good as the risk attached to them. Decide the stop-loss before the entry, based on structure (below the last swing low) or volatility (for example 2 times ATR). Then size the position so that the loss at the stop equals your planned risk, such as 1% of capital.", p2: "Example: capital ₹1,00,000, risk 1% = ₹1,000. Entry ₹250, stop ₹240 (₹10 risk per share). Position = 1,000 ÷ 10 = 100 shares. If the stop is hit, the loss is about ₹1,000, before costs." },
  { h: "9. Combining tools without overloading the chart", p: "Pick one tool from each group: a trend tool (moving averages), a momentum tool (RSI or MACD), and volume. Add structure (support, resistance, trend lines). That is enough for most decisions. Adding many indicators that all measure momentum repeats the same information. Use the chart as a checklist: trend agrees, momentum agrees, volume agrees, and the level is clear." },
  { h: "10. Common mistakes and how to avoid them", ul: [
   "Using hindsight to draw levels after the move.",
   "Changing indicator settings until the chart looks right.",
   "Trading without a stop because the setup looks strong.",
   "Averaging down into a losing trade against the trend.",
   "Testing on too few trades to know whether the method works. Track at least 30 to 50 trades."
  ] }
 ] }
});

Object.assign(LESSON_OVERRIDES.hi, {
 "candlestick-patterns": { sections: [
  { h: "1. पैटर्न क्या है, और क्या नहीं", p: "कैंडलस्टिक पैटर्न एक, दो या तीन कैंडल से बना आकार है, जो बताता है कि हाल में ख़रीदार और विक्रेता क्या कर रहे थे। पैटर्न पिछले व्यवहार का विवरण हैं, जिनमें अगली संभावित चाल की प्रवृत्ति होती है। ये भविष्यवाणी नहीं हैं, और अकेले काम नहीं करते। पैटर्न तभी उपयोगी है जब आप उसे संदर्भ में रखें और पुष्टि का इंतज़ार करें।" },
  { h: "2. किसी भी पैटर्न से पहले चार सवाल", ul: [
   "यह कहाँ बना? क्या यह सपोर्ट या रेज़िस्टेंस स्तर पर है, या बीच में कहीं?",
   "इससे पहले क्या था? पलटाव पैटर्न को पलटने के लिए पहले ट्रेंड चाहिए। साइडवे बाज़ार में हैमर का ज़्यादा अर्थ नहीं।",
   "इसकी पुष्टि क्या है? पैटर्न के हाई या लो के पार क्लोज़, अच्छे वॉल्यूम के साथ, आम पुष्टि है।",
   "अगर यह ग़लत निकला तो? स्टॉप-लॉस कहाँ है, और क्या पोज़िशन इतनी छोटी है कि ग़लत पैटर्न स्वीकार्य नुकसान ही दे?"
  ] },
  { h: "3. सिंगल-कैंडल पैटर्न", p: "ये एक कैंडल इस्तेमाल करते हैं। इन्हें पहचानना सबसे आसान है, और ग़लत पढ़ना भी सबसे आसान, इसलिए इन्हें सबसे ज़्यादा संदर्भ चाहिए। मुख्य बात बॉडी और विक का संबंध है।", ul: [
   "हैमर और हैंगिंग मैन: ऊपर छोटी बॉडी और नीचे लंबी विक। वही आकार गिरावट के बाद (हैमर) या बढ़त के बाद (हैंगिंग मैन) अलग अर्थ देता है।",
   "इन्वर्टेड हैमर और शूटिंग स्टार: नीचे छोटी बॉडी और ऊपर लंबी विक। गिरावट के बाद तेज़ी का संकेत हो सकता है; बढ़त के बाद चेतावनी।",
   "डोजी: ओपन और क्लोज़ लगभग बराबर, संतुलन दिखाता है। इसका अर्थ ट्रेंड और अगली कैंडल पर निर्भर।",
   "मार्बोज़ू: बिना विक की कैंडल, जो पूरी अवधि में एक पक्ष का मज़बूत नियंत्रण दिखाती है।"
  ] },
  { h: "4. दो-कैंडल पैटर्न", p: "दो कैंडल मिलकर ख़रीदारों और विक्रेताओं के संतुलन में बदलाव दिखाती हैं। दूसरी कैंडल को पहली पर प्रतिक्रिया देनी होगी।", ul: [
   "बुलिश और बियरिश एंगल्फ़िंग: दूसरी बॉडी पहली को पूरी तरह ढक लेती है। मज़बूत, क्योंकि पलटाव एक कदम में साफ़ है।",
   "बुलिश हरामी: एक बड़ी विपरीत कैंडल की बॉडी के भीतर छोटी कैंडल। बिकवाली कमज़ोर होने का संकेत, पर चेतावनी है, ट्रिगर नहीं।",
   "पियर्सिंग लाइन और डार्क क्लाउड कवर: दूसरी कैंडल पहली के पार खुलती है और उसके मध्य से आगे बंद होती है। आंशिक पलटाव, आमतौर पर एंगल्फ़िंग से कमज़ोर।"
  ] },
  { h: "5. तीन-कैंडल पैटर्न", p: "तीन कैंडल एक पूरी कहानी दिखाती हैं: चाल, ठहराव, और पलटाव या निरंतरता। ये अक्सर एक या दो कैंडल वाले पैटर्न से ज़्यादा भरोसेमंद होते हैं, पर बनने में भी ज़्यादा समय लेते हैं।", ul: [
   "मॉर्निंग स्टार (तेज़ी): एक बड़ी लाल कैंडल, गैप वाली छोटी कैंडल, फिर एक बड़ी हरी कैंडल जो पहली के मध्य से ऊपर बंद हो।",
   "ईवनिंग स्टार (मंदी): अपट्रेंड के बाद का दर्पण रूप।",
   "थ्री व्हाइट सोल्जर्स और थ्री ब्लैक क्रोज़: एक ही दिशा में तीन मज़बूत कैंडल, हर एक उसी दिशा में आगे बंद होती हुई। मज़बूत ट्रेंड शुरू होने का संकेत।"
  ] },
  { h: "6. चार्ट पैटर्न: धीमे, बड़े आकार", p: "चार्ट पैटर्न दिनों से महीनों में बनते हैं। हेड एंड शोल्डर्स, डबल टॉप और बॉटम, ट्राएंगल, फ़्लैग और कप एंड हैंडल कई कैंडल से बनते हैं। ये एक स्तर (नेकलाइन, रिम या ट्रेंड लाइन) और एक ब्रेकआउट तय करते हैं। ट्रेड ब्रेकआउट पर होता है, आकार पर नहीं। कई चार्ट पैटर्न विफल होते हैं, इसलिए स्तर के पार क्लोज़ का इंतज़ार करें, वॉल्यूम जाँचें, और पैटर्न की ऊँचाई से लक्ष्य केवल मोटे अनुमान के रूप में लें।" },
  { h: "7. पुष्टि: वह नियम जो ज़्यादातर नुकसान रोकता है", p: "पुष्टि का मतलब है पैसा लगाने से पहले सबूत का इंतज़ार कि पैटर्न काम कर रहा है। तेज़ी वाले पलटाव के लिए एक आम नियम: अगली कैंडल पैटर्न के हाई से ऊपर बंद हो, और वॉल्यूम औसत से ऊपर। पहले एंट्री करने से बेहतर कीमत मिलती है पर झूठे संकेत ज़्यादा। बाद में एंट्री करने से चाल का कुछ हिस्सा जाता है, पर विफल पैटर्न से नुकसान घटता है।" },
  { h: "8. एक पूरा उदाहरण", p: "एक शेयर दस सत्रों से गिर रहा है। 11वें दिन एक स्तर पर हैमर बनता है जहाँ कीमत पहले दो बार उछली थी (सपोर्ट)। 12वें दिन कीमत हैमर के हाई से ऊपर बंद होती है, वॉल्यूम औसत का 1.5 गुना। ट्रेडर ₹252 पर ख़रीदता है, स्टॉप ₹244 पर (हैमर के लो से ठीक नीचे), और टारगेट पिछले रेज़िस्टेंस ₹268 पर। जोखिम प्रति शेयर ₹8 और इनाम ₹16, यानी 1:2 अनुपात। आँकड़े उदाहरण हैं; प्रक्रिया मायने रखती है।" },
  { h: "9. आम पैटर्न गलतियाँ", ul: [
   "हर दिखने वाला पैटर्न ट्रेड करना। ज़्यादातर पैटर्न शोर हैं; केवल मुख्य स्तरों पर ट्रेंड के साथ वाले मायने रखते हैं।",
   "पैटर्न परफ़ेक्ट लगने से पुष्टि से पहले एंट्री।",
   "ऐसे चार्ट पर पैटर्न थोपना जो उसे साफ़ नहीं दिखाता।",
   "व्यापक बाज़ार को अनदेखा करना। गिरते बाज़ार में तेज़ी वाला पैटर्न ज़्यादा बार विफल होता है।",
   "एक ही पैटर्न को पूरी रणनीति बना लेना।"
  ] },
  { h: "10. अभ्यास कैसे करें", p: "पिछले चार्ट पर पैटर्न चिह्नित करें और लिखें कि उसके बाद क्या हुआ, बिना परिणाम को अपनी याददाश्त बदलने दिए। एक ही पैटर्न के 30 से 50 उदाहरणों के बाद आप जान जाएँगे कि वह आपके शेयरों में काम करता है या नहीं। पैटर्न, संदर्भ, पुष्टि, परिणाम और गलती के साथ जर्नल रखें।" }
 ] },
 "fundamental-analysis": { sections: [
  { h: "1. फंडामेंटल एनालिसिस क्या है", p: "फंडामेंटल एनालिसिस यह पूछता है कि कारोबार अपनी कीमत के लायक है या नहीं। यह कंपनी की बिक्री, मुनाफ़ा, कर्ज़, नकदी, प्रबंधन और उद्योग देखता है। लक्ष्य है यह अनुमान लगाना कि कारोबार की वैल्यू क्या है और उसकी तुलना शेयर कीमत से करना। दोनों के बीच का अंतर वह सुरक्षा मार्जिन है जिसे वैल्यू निवेशक खोजते हैं।" },
  { h: "2. जानकारी कहाँ मिलेगी", ul: [
   "सालाना रिपोर्ट: पूरी तस्वीर, जिसमें प्रबंधन की चर्चा, जोखिम और ऑडिटेड वित्तीय विवरण।",
   "तिमाही नतीजे: ताज़ा मुनाफ़ा, बिक्री और कभी-कभी कैश फ़्लो। NSE और BSE की वेबसाइट पर दाखिल।",
   "निवेशक प्रस्तुति और अर्निंग कॉल: संख्याओं की प्रबंधन द्वारा व्याख्या।",
   "शेयरहोल्डिंग पैटर्न: प्रमोटर, संस्थागत और सार्वजनिक होल्डिंग, हर तिमाही दाखिल।",
   "कॉर्पोरेट घोषणाएँ: डिविडेंड, बोनस इश्यू, बोर्ड के फ़ैसले और महत्वपूर्ण घटनाएँ।"
  ] },
  { h: "3. तीन वित्तीय विवरण", p: "कंपनी की कहानी तीन विवरणों में होती है, जिन्हें एक साथ पढ़ना होता है।", ul: [
   "प्रॉफ़िट और लॉस स्टेटमेंट: एक अवधि की आय, खर्च और मुनाफ़ा। दिखाता है कि कारोबार पैसा कमाता है या नहीं।",
   "बैलेंस शीट: एक तारीख़ पर संपत्ति, देनदारी और इक्विटी। दिखाता है कंपनी का क्या है और क्या बकाया।",
   "कैश फ़्लो स्टेटमेंट: संचालन, निवेश और वित्तपोषण से नकद। दिखाता है कि मुनाफ़ा असली नकद बनता है या नहीं।"
  ], p2: "कंपनी मुनाफ़ा दिखाकर भी नकदी ख़त्म होने की स्थिति में हो सकती है। कई सालों में देखें कि संचालन कैश फ़्लो शुद्ध मुनाफ़े के आसपास है या नहीं।" },
  { h: "4. सूत्र और उदाहरण के साथ मुख्य अनुपात", ul: [
   "EPS (प्रति शेयर आय) = शुद्ध मुनाफ़ा ÷ शेयरों की संख्या। उदाहरण: ₹300 करोड़ मुनाफ़ा ÷ 10 करोड़ शेयर = ₹30 EPS।",
   "P/E अनुपात = शेयर कीमत ÷ EPS। उदाहरण: ₹450 ÷ ₹30 = कमाई का 15 गुना।",
   "ROE (इक्विटी पर रिटर्न) = शुद्ध मुनाफ़ा ÷ शेयरधारक इक्विटी। उदाहरण: ₹500 करोड़ ÷ ₹2,500 करोड़ = 20%।",
   "डेट-टू-इक्विटी = कुल कर्ज़ ÷ शेयरधारक इक्विटी। उदाहरण: ₹1,000 करोड़ ÷ ₹2,500 करोड़ = 0.4।",
   "डिविडेंड यील्ड = प्रति शेयर डिविडेंड ÷ शेयर कीमत। उदाहरण: ₹10 ÷ ₹450 ≈ 2.2%।",
   "ऑपरेटिंग मार्जिन = ऑपरेटिंग मुनाफ़ा ÷ राजस्व। दिखाता है कि हर रुपये की बिक्री से चालू खर्च के बाद कितना बचता है।"
  ] },
  { h: "5. ग्रोथ: क्या कंपनी बड़ी और बेहतर हो रही है?", p: "अच्छा कारोबार समय के साथ बिक्री और मुनाफ़ा बढ़ाता है, और बिना ज़्यादा कर्ज़ के। एक तिमाही नहीं, 5 से 10 साल का डेटा देखें। जाँचें कि राजस्व वृद्धि के साथ मार्जिन स्थिर या बेहतर है या नहीं, और कंपनी बढ़ते हुए भी पूँजी पर रिटर्न ऊँचा रहता है या नहीं।" },
  { h: "6. गुणवत्ता: संख्याओं के पीछे का कारोबार", p: "अनुपात सब कुछ नहीं बता सकते। गुणवत्ता के सवाल: क्या कंपनी के पास टिकाऊ बढ़त है, जैसे ब्रांड, लागत की स्थिति, नेटवर्क या नियामक लाइसेंस? क्या प्रबंधन ईमानदार और सक्षम है, और पूँजी का अच्छा उपयोग करने का रिकॉर्ड है? क्या संबंधित-पक्ष लेनदेन या लेखांकन बदलाव चिंता की बात हैं? क्या कारोबार आसानी से समझ आता है?" },
  { h: "7. मूल्यांकन: यह कितने की है?", p: "मूल्यांकन अनुमान लगाता है कि कारोबार की प्रति शेयर वैल्यू क्या है, जैसे P/E की साथी कंपनियों से तुलना, प्राइस-टू-बुक, या भविष्य के कैश फ़्लो को आज की वैल्यू पर लाना। कोई एक तरीका सही उत्तर नहीं देता। दो-तीन तरीके इस्तेमाल करके एक रेंज लें, और तभी ख़रीदें जब कीमत आपके अनुमान से आराम से नीचे हो।", ul: [
   "सापेक्ष मूल्यांकन: P/E, प्राइस-टू-बुक और EV/EBITDA की समान कंपनियों से तुलना।",
   "पूर्ण मूल्यांकन (डिस्काउंटेड कैश फ़्लो): भविष्य के कैश फ़्लो का अनुमान और उसका वर्तमान मूल्य। धारणाओं पर बहुत निर्भर।",
   "सस्ता दिखने वाला शेयर वैल्यू ट्रैप हो सकता है यदि कमाई गिर रही हो। ऊँची कीमत वाला शेयर भी अच्छा हो सकता है यदि ग्रोथ मज़बूत और टिकाऊ हो।"
  ] },
  { h: "8. एक काम किया हुआ उदाहरण", p: "कंपनी X: कीमत ₹450, EPS ₹30 (P/E 15), ROE 20%, डेट-टू-इक्विटी 0.4, बिक्री पाँच साल से 15% सालाना बढ़ रही है, ऑपरेटिंग मार्जिन 18% स्थिर। साथी कंपनियों का औसत P/E 20 है। इन आँकड़ों पर X उचित लगती है: मज़बूत रिटर्न, कम कर्ज़ और साथियों से कम P/E। फ़ैसले से पहले सालाना रिपोर्ट में एक-बार के मुनाफ़े, कैश फ़्लो की गुणवत्ता और प्रबंधन के बताए जोखिम जाँचें। यह उदाहरण है, सिफ़ारिश नहीं।" },
  { h: "9. हर बार जाँचे जाने वाले लाल झंडे", ul: [
   "मुनाफ़ा बढ़ता रहे पर संचालन कैश फ़्लो कई सालों से गिरे।",
   "रिसीवेबल्स बिक्री से कहीं तेज़ बढ़ें।",
   "बार-बार ऑडिटर या लेखांकन नीतियाँ बदलें।",
   "प्रमोटर के शेयर बड़ी मात्रा में गिरवी (प्लेज़) हों।",
   "एक ग्राहक, एक उत्पाद या एक सरकारी अनुबंध पर भारी निर्भरता।",
   "प्रबंधन बार-बार लक्ष्य या स्पष्टीकरण बदले।"
  ] },
  { h: "10. अपनी प्रक्रिया बनाना", p: "एक पन्ने की चेकलिस्ट लिखें: कारोबार मॉडल, ग्रोथ, मार्जिन, रिटर्न, कर्ज़, कैश फ़्लो, प्रबंधन, मूल्यांकन और जोखिम। किसी राय को पढ़ने से पहले सालाना रिपोर्ट से भरें। नतीजे आने पर होल्डिंग की समीक्षा करें, हर दिन नहीं। आपका काम कारोबार को इतना समझना है कि आप बता सकें कि आपने उसे क्यों रखा है, और किस बात पर बेचेंगे।" }
 ] },
 "technical-analysis": { sections: [
  { h: "1. टेक्निकल एनालिसिस क्या अध्ययन करता है", p: "टेक्निकल एनालिसिस कीमत और वॉल्यूम का अध्ययन करता है ताकि ख़रीदारों और विक्रेताओं के व्यवहार को समझा जा सके। यह मानता है कि कीमत में पहले से ज्ञात जानकारी झलकती है, और व्यवहार के पैटर्न दोहराते हैं क्योंकि लोग मिलती-जुलती स्थितियों पर मिलती-जुलती प्रतिक्रिया देते हैं। यह संभावनाएँ और समय संभालने का तरीका है, भविष्य की कीमतों की गारंटी नहीं।" },
  { h: "2. ट्रेंड: सबसे पहले पहचानें", p: "ट्रेंड कीमत की सामान्य दिशा है। अपट्रेंड: ऊँचे हाई और ऊँचे लो। डाउनट्रेंड: नीचे हाई और नीचे लो। साइडवे: कोई साफ़ दिशा नहीं। कई शुरुआती ट्रेंड के ख़िलाफ़ ट्रेड करके पैसा खोते हैं। पहले ऊँची समय-सीमा पर ट्रेंड पहचानें, फिर उसी दिशा में एंट्री खोजें।", ul: [
   "अपट्रेंड में स्विंग लो और डाउनट्रेंड में स्विंग हाई को ट्रेंड लाइन जोड़ती है।",
   "ट्रेंड कमज़ोर होता है जब नया हाई न बने, या कीमत पिछला स्विंग लो तोड़े।",
   "मूविंग एवरेज ट्रेंड की दिशा की पुष्टि कर सकते हैं: बढ़ते एवरेज के ऊपर कीमत अपट्रेंड का संकेत।"
  ] },
  { h: "3. सपोर्ट और रेज़िस्टेंस", p: "सपोर्ट वह कीमत-क्षेत्र है जहाँ ख़रीदारी दिखी है। रेज़िस्टेंस वह क्षेत्र है जहाँ बिकवाली दिखी है। ये ज़ोन हैं, सटीक कीमतें नहीं। हर बार कीमत का उसका सम्मान करने पर स्तर मज़बूत होता है, और वॉल्यूम के साथ कीमत उसे तोड़े तो टूटा हुआ रेज़िस्टेंस अक्सर नया सपोर्ट बनता है।" },
  { h: "4. मूविंग एवरेज", p: "मूविंग एवरेज तय अवधियों का औसत कीमत है। यह शोर कम करता है और दिशा दिखाता है। सबसे ज़्यादा इस्तेमाल होने वाले 20, 50 और 200 अवधि के हैं। सिंपल मूविंग एवरेज (SMA) सभी अवधियों को बराबर वज़न देता है; एक्सपोनेंशियल (EMA) हाल की कीमतों को ज़्यादा वज़न देता है और तेज़ी से प्रतिक्रिया देता है।", p2: "उदाहरण: क्लोज़ 100, 102, 104, 103 और 105 का 5-अवधि SMA 102.8 है। अगले दिन क्लोज़ 107 है, तो औसत 104.2 हो जाता है, क्योंकि 100 बाहर और 107 अंदर।" },
  { h: "5. मोमेंटम: RSI और MACD", p: "मोमेंटम इंडिकेटर मापते हैं कि कीमत कितनी तेज़ चल रही है और क्या वह गति बदल रही है।", ul: [
   "RSI (रिलेटिव स्ट्रेंथ इंडेक्स): 14 अवधि पर 0 से 100 का पैमाना। 70 से ऊपर अक्सर ओवरबॉट, 30 से नीचे ओवरसोल्ड। मज़बूत ट्रेंड में ये स्तर लंबे समय तक रह सकते हैं।",
   "MACD: 12 और 26 अवधि के EMA का अंतर, 9 अवधि की सिग्नल रेखा के साथ। MACD रेखा का सिग्नल रेखा को ऊपर पार करना तेज़ी का मोमेंटम संकेत।",
   "डाइवर्जेंस: कीमत नया हाई बनाए पर RSI या MACD नीचा हाई। यह चेतावनी है कि मोमेंटम घट रहा है।"
  ] },
  { h: "6. वॉल्यूम: चाल के पीछे की ताकत", p: "वॉल्यूम कीमत की चाल की पुष्टि करता है। ज़्यादा वॉल्यूम पर ब्रेकआउट कम वॉल्यूम वाले से ज़्यादा भरोसेमंद है। घटते वॉल्यूम पर तेज़ी कमज़ोर है। लंबी गिरावट के अंत में ज़्यादा वॉल्यूम थकान का संकेत हो सकता है, पर कार्रवाई से पहले अगली कैंडल से पुष्टि करें।" },
  { h: "7. चार्ट पैटर्न और ब्रेकआउट", p: "ट्राएंगल, फ़्लैग और हेड एंड शोल्डर्स जैसे चार्ट पैटर्न वह रेंज दिखाते हैं जो कीमत बना रही है। रेंज से ब्रेकआउट ट्रेड का संकेत है। संभावित चाल को पैटर्न की ऊँचाई से केवल मोटे अनुमान के रूप में मापें, और स्टॉप रेंज के ठीक अंदर रखें, ताकि विफल ब्रेकआउट से जल्दी बाहर निकलें।" },
  { h: "8. पहले जोखिम: स्टॉप और पोज़िशन साइज़", p: "टेक्निकल संकेत उतने ही अच्छे हैं जितना उनके साथ जुड़ा जोखिम। एंट्री से पहले स्टॉप-लॉस तय करें, या तो स्ट्रक्चर पर (पिछले स्विंग लो के नीचे) या अस्थिरता पर (जैसे 2 गुना ATR)। फिर पोज़िशन का आकार ऐसा रखें कि स्टॉप पर नुकसान आपके तय जोखिम, जैसे पूँजी का 1%, के बराबर हो।", p2: "उदाहरण: पूँजी ₹1,00,000, जोखिम 1% = ₹1,000। एंट्री ₹250, स्टॉप ₹240 (प्रति शेयर ₹10 जोखिम)। पोज़िशन = 1,000 ÷ 10 = 100 शेयर। स्टॉप लगे तो नुकसान लगभग ₹1,000, शुल्क से पहले।" },
  { h: "9. चार्ट को भरे बिना टूल जोड़ना", p: "हर समूह से एक टूल चुनें: एक ट्रेंड टूल (मूविंग एवरेज), एक मोमेंटम टूल (RSI या MACD), और वॉल्यूम। साथ में संरचना जोड़ें (सपोर्ट, रेज़िस्टेंस, ट्रेंड लाइन)। ज़्यादातर फ़ैसलों के लिए यही काफ़ी है। सभी मोमेंटम इंडिकेटर जोड़ने से वही जानकारी दोहराती है। चार्ट को चेकलिस्ट की तरह देखें: ट्रेंड सहमत, मोमेंटम सहमत, वॉल्यूम सहमत, और स्तर साफ़।" },
  { h: "10. आम गलतियाँ और उनसे बचाव", ul: [
   "चाल के बाद स्तर खींचने के लिए पिछली जानकारी का उपयोग।",
   "चार्ट सही दिखे इसके लिए इंडिकेटर सेटिंग बदलते रहना।",
   "मज़बूत सेटअप लगने पर बिना स्टॉप के ट्रेड।",
   "ट्रेंड के ख़िलाफ़ घाटे वाले ट्रेड में औसत बढ़ाना।",
   "यह जानने के लिए बहुत कम ट्रेड पर परखना कि तरीका काम करता है या नहीं। कम से कम 30 से 50 ट्रेड दर्ज करें।"
  ] }
 ] }
});
