// Expanded content (English and Hindi): Intraday Trading, Futures & Options.
// Overrides the sections in lessons.js. Figures are illustrative; costs, margins and lot sizes change, so check your broker and the exchange.
Object.assign(LESSON_OVERRIDES.en, {
 "intraday-trading": { sections: [
  { h: "1. What intraday trading means", p: "Intraday trading opens and closes positions within the same trading session. Nothing is held overnight. Because positions must be closed before the market closes, the trader's risk is limited to one session, but the pace is fast and the decisions are many. Most individuals who try it lose money over time, and regulators have published data showing this for derivatives traders. Treat intraday as a demanding skill to be tested with small capital, not as a source of regular income." },
  { h: "2. Products and margin", p: "Intraday equity positions are usually taken with an intraday product (often called MIS), where the broker provides margin, meaning borrowed money. Margin magnifies both profit and loss. The broker square-off time is set by the broker and the exchange. If you do not close the position by then, the broker may sell it automatically, often at a worse price and with extra charges.", ul: [
   "Know the margin your broker gives for each stock. It is not the same for all shares.",
   "Know the square-off time for your broker. Plan the exit before it.",
   "Do not confuse intraday margin with delivery. Holding an intraday position overnight is not allowed in the same way."
  ] },
  { h: "3. Liquidity and spread: why the stock you pick matters", p: "Liquidity is how easily you can buy and sell without moving the price. Liquid stocks have high volume and a narrow spread (the gap between the best bid and the best ask). Thinly traded stocks have wide spreads and large slippage, which can erase any edge. Start with stocks that trade in large volumes every day.", p2: "Example: the bid is ₹499.90 and the ask is ₹500.10, a spread of ₹0.20. A market order buying at ₹500.10 and selling at ₹499.90 immediately loses ₹0.20 per share before any move. On 1,000 shares that is ₹200." },
  { h: "4. Order types for intraday", ul: [
   "Stop-loss (SL) order: a limit order that activates at your trigger. Protects the position if price moves against you.",
   "Stop-loss market (SL-M): becomes a market order at the trigger. More likely to fill, but the price may be worse in a fast move.",
   "Limit order: sets the price. Useful for entries when you do not need to act immediately.",
   "Market order: fills now at the best available price. Dangerous in illiquid or fast-moving stocks."
  ] },
  { h: "5. Cost of trading: the hidden headwind", p: "Intraday trades carry several costs. Gross profit can become a net loss after costs, so calculate them before every trade. Costs include brokerage, exchange transaction charges, SEBI fees, stamp duty on the buy side, STT, and GST on some charges. The exact amounts depend on your broker and the rules in force.", p2: "Example: buy 100 shares at ₹500 and sell at ₹502. Gross profit ₹200. If total costs are ₹60 (an illustrative figure), the net profit is ₹140. The stock must move more than the costs before you break even." },
  { h: "6. Slippage: the cost you did not plan for", p: "Slippage is the difference between the price you expected and the price you got. It is most common in fast markets, around the open and close, and in thinly traded stocks.", p2: "Example: you plan to buy at ₹500 but fill at ₹500.80 on 100 shares. The extra cost is ₹80. If your planned profit was ₹150, slippage has already taken more than half of it." },
  { h: "7. The opening range: a simple intraday framework", p: "Many intraday traders watch the first 15 minutes of trading, the opening range. The high and low of that range set levels. A move above the high with volume, or below the low with volume, is a common signal. Use a stop inside the range, and limit the number of trades per day.", ul: [
   "Mark the opening range high and low after the first 15 minutes.",
   "Enter only on a clear break with above-average volume.",
   "Stop just inside the range. Your risk is the distance from entry to that stop.",
   "Take the first target, and close the position before the square-off time."
  ] },
  { h: "8. Risk rules for intraday", ul: [
   "Set a daily loss limit, for example 1% of capital, and stop trading when you reach it.",
   "Risk 0.25% to 0.5% of capital per trade while learning.",
   "Limit the number of trades per day, for example three.",
   "Never average down on a losing intraday position. It is the fastest way to a large loss.",
   "Do not trade the first and last minutes of the session until you have experience."
  ] },
  { h: "9. Psychology of intraday trading", p: "The pace and the constant price movement create strong emotions. Common problems are overtrading after a loss, fear of missing a move, and holding a losing position because closing it feels final. Write your rules before the session, check them during the day, and review them afterwards. Stepping away after two losses is often the most profitable decision of the day." },
  { h: "10. Tax on intraday profit", p: "For tax purposes, intraday equity profits are generally treated as speculative business income, which is taxed at your slab rate. Losses can be set off against other business income and carried forward within the rules. Keep all contract notes and a trade log. See the Tax Basics module for the current rules, and check with a qualified professional." },
  { h: "11. A complete day in practice", p: "9:15: the market opens. You watch the first 15 minutes and mark the range at ₹250 to ₹252 on a liquid stock. 9:35: price breaks above ₹252 with volume 1.5 times the opening-range average. You buy 400 shares at ₹252.10 with a stop at ₹251 (risk ₹1.10 per share, total ₹440). Your target is ₹254.20 (reward ₹2.10 per share, about 1.9 times risk). 10:05: price hits the target, you sell. Gross profit ₹840 on 400 shares. After costs of ₹120 (illustrative), net profit ₹720. You close the day with one trade and stop. The example is for learning; most days do not look like this." },
  { h: "12. Common intraday mistakes", ul: [
   "Trading without a plan for the day.",
   "Overtrading: taking every small move.",
   "Moving the stop further away when a trade goes against you.",
   "Using high leverage on an unknown stock.",
   "Ignoring costs and then wondering why profits disappear.",
   "Forgetting the square-off time and being squared off at a bad price."
  ] }
 ] },
 "futures-options": { sections: [
  { h: "1. What derivatives are", p: "A derivative is a contract whose value depends on an underlying asset, such as a share or an index. Futures and options are the most common in India. They allow you to take a position on the price without owning the asset, and they use leverage. That makes them powerful tools for hedging and speculation, and also a common cause of large losses for people who do not understand them." },
  { h: "2. Futures: an obligation to buy or sell", p: "A futures contract is an agreement to buy or sell an asset at a set price on a future date. Both the buyer and the seller are obligated. In practice, most index and stock futures in India are settled in cash, so the difference between the agreed price and the settlement price is paid in money.", p2: "Example: you buy one lot of an index future at 24,000, with an illustrative lot size of 50. Exposure = 50 × 24,000 = ₹12,00,000. If the index rises 200 points, profit = 200 × 50 = ₹10,000. If it falls 200 points, loss = ₹10,000, before costs. The margin you deposit is only a fraction of the exposure." },
  { h: "3. Options: rights for the buyer, obligations for the seller", p: "An option gives the buyer the right, but not the obligation, to buy (call) or sell (put) at the strike price, on or before the expiry. The seller (writer) receives the premium and takes on the obligation if the buyer exercises.", ul: [
   "Call option: the right to buy at the strike. Buyers profit if the price rises above strike plus premium.",
   "Put option: the right to sell at the strike. Buyers profit if the price falls below strike minus premium.",
   "Premium: the price the buyer pays the seller. It is the maximum loss for the buyer.",
   "Seller: receives the premium. The seller's loss can be large or unlimited if not hedged."
  ] },
  { h: "4. Key terms you must know", ul: [
   "Strike price: the price at which the option can be exercised.",
   "Expiry: the date the contract ends. Index options in India have weekly and monthly expiries; check the current schedule.",
   "Lot size: the fixed number of units in one contract. You trade in whole lots.",
   "In the money (ITM): a call with price above strike, or a put with price below strike. Has intrinsic value.",
   "At the money (ATM): strike near the current price. Mostly time value.",
   "Out of the money (OTM): a call with price below strike, or a put with price above strike. Only time value.",
   "Intrinsic value and time value: the premium equals intrinsic plus time value. Time value falls as expiry approaches."
  ] },
  { h: "5. Payoff at expiry: the arithmetic", p: "At expiry, an option's value is its intrinsic value only. For a call: max(price − strike, 0). For a put: max(strike − price, 0). Profit equals that value minus the premium paid.", p2: "Example: buy a 24,000 call for ₹150 premium, lot 50. Maximum loss = 150 × 50 = ₹7,500. At expiry the index is 24,300: intrinsic value 300, profit = (300 − 150) × 50 = ₹7,500. At expiry the index is 23,900: the option expires worthless, loss ₹7,500." },
  { h: "6. Margin and the seller's risk", p: "Selling options requires margin, because the seller can lose a lot. Margin requirements change with volatility and the price of the contract, and can increase suddenly in volatile markets. If the position moves against you and margin is insufficient, the broker may close it at a loss. Know the margin before you place an order.", ul: [
   "Buyer: pays the premium in full. No margin call beyond the premium.",
   "Seller: must maintain margin. A large move against the position can trigger a margin call.",
   "Futures: margin is a deposit. The position is marked to market daily."
  ] },
  { h: "7. Hedging: a practical use", p: "Options are often used to protect an existing portfolio. Example: you hold shares worth ₹5,00,000 and fear a fall. Buying a put on an index that moves with your holdings limits the loss if the market falls, at the cost of the premium. The hedge is imperfect, and the premium is a cost even if the fall does not happen." },
  { h: "8. Strategies a beginner can understand", ul: [
   "Long call or long put: a directional bet with limited loss (the premium).",
   "Covered call: you own the shares and sell a call against them. You earn a premium but give up gains above the strike.",
   "Protective put: you own the shares and buy a put. Limits the loss below the put strike.",
   "Bull call spread: buy one call and sell a higher strike call. Limits both profit and loss."
  ] },
  { h: "9. Expiry risks: what happens near the end", p: "Options lose time value quickly near expiry. A small move can change a position from profit to loss in hours. Sellers face the risk of large moves, and buyers can lose all of the premium. Check the rules for physical or cash settlement, exercise and assignment with your broker before expiry." },
  { h: "10. Tax on derivatives", p: "Income from futures and options trading is generally treated as non-speculative business income for tax purposes, which requires a trade log, a profit and loss statement and, above certain turnover limits, a tax audit. Losses can be carried forward within the rules. Rules change, so check the current position with a tax professional. See the Tax Basics module for the overview." },
  { h: "11. A decision framework for every derivatives trade", ul: [
   "What is the view, and what would prove it wrong?",
   "What is the maximum loss in rupees, and is it within my risk limit?",
   "What is the lot size, the premium or margin, and the total cost?",
   "When does the contract expire, and what happens near expiry?",
   "Is there a simpler way to express the same view with less risk?"
  ] },
  { h: "12. Common derivatives mistakes", ul: [
   "Buying cheap out-of-the-money options as a lottery ticket.",
   "Selling options without understanding the margin or the unlimited risk.",
   "Using leverage as if it were free money.",
   "Holding through expiry without knowing the settlement rules.",
   "Ignoring implied volatility, which can make an option expensive even when the view is right."
  ] }
 ] }
});

Object.assign(LESSON_OVERRIDES.hi, {
 "intraday-trading": { sections: [
  { h: "1. इंट्राडे ट्रेडिंग का मतलब", p: "इंट्राडे ट्रेडिंग में पोज़िशन उसी ट्रेडिंग सत्र में खुलती और बंद होती है। कुछ भी रात भर नहीं रखा जाता। चूँकि बाज़ार बंद होने से पहले पोज़िशन बंद करनी होती है, जोखिम एक सत्र तक सीमित रहता है, पर गति तेज़ है और फ़ैसले बहुत। ज़्यादातर व्यक्ति जो इसे आज़माते हैं समय के साथ पैसा खोते हैं, और नियामक ने डेरिवेटिव ट्रेडरों पर यह आँकड़े प्रकाशित किए हैं। इसे आय का स्थिर स्रोत नहीं, कम पूँजी से परखने वाला कठिन कौशल मानें।" },
  { h: "2. प्रोडक्ट और मार्जिन", p: "इंट्राडे इक्विटी पोज़िशन आमतौर पर इंट्राडे प्रोडक्ट (जिसे अक्सर MIS कहते हैं) से ली जाती है, जहाँ ब्रोकर मार्जिन, यानी उधार का पैसा, देता है। मार्जिन लाभ और नुकसान दोनों बढ़ाता है। स्क्वेयर-ऑफ़ का समय ब्रोकर और एक्सचेंज के नियमों से तय होता है। अगर उस समय तक पोज़िशन बंद नहीं की, तो ब्रोकर उसे अपने आप बेच सकता है, अक्सर बदतर कीमत पर और अतिरिक्त चार्ज के साथ।", ul: [
   "हर शेयर के लिए अपने ब्रोकर का मार्जिन जानें। यह सभी शेयरों के लिए एक जैसा नहीं होता।",
   "अपने ब्रोकर का स्क्वेयर-ऑफ़ समय जानें और उससे पहले एग्ज़िट की योजना बनाएँ।",
   "इंट्राडे मार्जिन को डिलीवरी से न मिलाएँ। इंट्राडे पोज़िशन रात भर उसी तरह नहीं रखी जा सकती।"
  ] },
  { h: "3. लिक्विडिटी और स्प्रेड: शेयर का चुनाव क्यों मायने रखता है", p: "लिक्विडिटी का मतलब है कीमत हिलाए बिना कितनी आसानी से ख़रीद-बिक्री हो सकती है। लिक्विड शेयरों में ज़्यादा वॉल्यूम और कम स्प्रेड (सबसे अच्छी बिड और सबसे अच्छे आस्क का अंतर) होता है। कम ट्रेड होने वाले शेयरों में स्प्रेड चौड़ा और स्लिपेज बड़ा होता है, जो किसी भी बढ़त को मिटा सकता है। रोज़ बड़ी मात्रा में ट्रेड होने वाले शेयरों से शुरू करें।", p2: "उदाहरण: बिड ₹499.90 और आस्क ₹500.10, यानी ₹0.20 का स्प्रेड। मार्केट ऑर्डर से ₹500.10 पर ख़रीदें और ₹499.90 पर बेचें तो कोई चाल होने से पहले ही प्रति शेयर ₹0.20 का नुकसान। 1,000 शेयर पर यह ₹200 है।" },
  { h: "4. इंट्राडे के लिए ऑर्डर प्रकार", ul: [
   "स्टॉप-लॉस (SL) ऑर्डर: लिमिट ऑर्डर जो ट्रिगर पर सक्रिय होता है। कीमत विपरीत जाए तो पोज़िशन की रक्षा करता है।",
   "स्टॉप-लॉस मार्केट (SL-M): ट्रिगर पर मार्केट ऑर्डर बन जाता है। पूरा होने की संभावना ज़्यादा, पर तेज़ चाल में कीमत बदतर हो सकती है।",
   "लिमिट ऑर्डर: कीमत तय करता है। एंट्री के लिए उपयोगी, जब तुरंत कार्रवाई ज़रूरी न हो।",
   "मार्केट ऑर्डर: अभी उपलब्ध सबसे अच्छी कीमत पर भरता है। कम लिक्विड या तेज़ी से चलने वाले शेयरों में ख़तरनाक।"
  ] },
  { h: "5. ट्रेडिंग की लागत: छिपी हुई बाधा", p: "इंट्राडे ट्रेड पर कई खर्च लगते हैं। खर्च के बाद सकल लाभ शुद्ध नुकसान बन सकता है, इसलिए हर ट्रेड से पहले इनका हिसाब लगाएँ। खर्च में ब्रोकरेज, एक्सचेंज ट्रांज़ैक्शन चार्ज, SEBI फ़ीस, ख़रीद पर स्टाम्प ड्यूटी, STT और कुछ चार्ज पर GST शामिल हैं। सटीक रकम ब्रोकर और लागू नियमों पर निर्भर करती है।", p2: "उदाहरण: 100 शेयर ₹500 पर ख़रीदे और ₹502 पर बेचे। सकल लाभ ₹200। अगर कुल खर्च ₹60 है (उदाहरण के लिए), तो शुद्ध लाभ ₹140। ब्रेक-ईवन से पहले कीमत को खर्च से ज़्यादा चलना होगा।" },
  { h: "6. स्लिपेज: वह खर्च जिसकी योजना नहीं थी", p: "स्लिपेज वह अंतर है जो आपकी अपेक्षित कीमत और मिली कीमत में होता है। यह तेज़ बाज़ार में, खुलने और बंद होने के आसपास, और कम लिक्विड शेयरों में सबसे आम है।", p2: "उदाहरण: आप ₹500 पर ख़रीदने की योजना बनाते हैं, पर 100 शेयर ₹500.80 पर भरते हैं। अतिरिक्त खर्च ₹80। अगर योजना का लाभ ₹150 था, तो स्लिपेज ने उसका आधे से ज़्यादा ले लिया।" },
  { h: "7. ओपनिंग रेंज: एक सरल इंट्राडे ढाँचा", p: "कई इंट्राडे ट्रेडर ट्रेडिंग के पहले 15 मिनट देखते हैं, जिसे ओपनिंग रेंज कहते हैं। उस रेंज का हाई और लो स्तर तय करता है। वॉल्यूम के साथ हाई के ऊपर या लो के नीचे चाल आम संकेत है। स्टॉप रेंज के भीतर रखें, और रोज़ के ट्रेड सीमित रखें।", ul: [
   "पहले 15 मिनट के बाद ओपनिंग रेंज का हाई और लो चिह्नित करें।",
   "केवल औसत से ज़्यादा वॉल्यूम के साथ साफ़ ब्रेक पर एंट्री करें।",
   "स्टॉप रेंज के ठीक अंदर लगाएँ। आपका जोखिम एंट्री से उस स्टॉप तक की दूरी है।",
   "पहला टारगेट लें, और स्क्वेयर-ऑफ़ समय से पहले पोज़िशन बंद करें।"
  ] },
  { h: "8. इंट्राडे के लिए जोखिम नियम", ul: [
   "रोज़ की नुकसान सीमा तय करें, जैसे पूँजी का 1%, और उस पर पहुँचकर ट्रेडिंग रोकें।",
   "सीखते समय प्रति ट्रेड 0.25% से 0.5% जोखिम लें।",
   "रोज़ के ट्रेड सीमित रखें, जैसे तीन।",
   "घाटे वाली इंट्राडे पोज़िशन में औसत न बढ़ाएँ। यह बड़े नुकसान का सबसे तेज़ रास्ता है।",
   "अनुभव आने तक सत्र के पहले और आख़िरी मिनटों में ट्रेड न करें।"
  ] },
  { h: "9. इंट्राडे का मनोविज्ञान", p: "गति और लगातार कीमत की हलचल तेज़ भावनाएँ पैदा करती है। आम समस्याएँ: नुकसान के बाद ओवरट्रेडिंग, कोई चाल छूटने का डर, और घाटे वाली पोज़िशन इसलिए रखना क्योंकि उसे बंद करना अंतिम लगता है। सत्र से पहले नियम लिखें, दिन में उन्हें जाँचें, और बाद में समीक्षा करें। दो नुकसान के बाद रुकना अक्सर दिन का सबसे लाभदायक फ़ैसला होता है।" },
  { h: "10. इंट्राडे लाभ पर टैक्स", p: "टैक्स के लिए इंट्राडे इक्विटी लाभ आमतौर पर स्पेक्युलेटिव बिज़नेस इनकम माना जाता है, जो आपकी स्लैब दर पर टैक्स होता है। नुकसान नियमों के अंदर अन्य बिज़नेस इनकम से सेट-ऑफ़ और आगे ले जाए जा सकते हैं। सभी कॉन्ट्रैक्ट नोट और ट्रेड लॉग रखें। मौजूदा नियमों के लिए टैक्स बेसिक्स मॉड्यूल देखें, और योग्य पेशेवर से जाँचें।" },
  { h: "11. अभ्यास में एक पूरा दिन", p: "9:15: बाज़ार खुलता है। आप पहले 15 मिनट देखते हैं और एक लिक्विड शेयर पर रेंज ₹250 से ₹252 चिह्नित करते हैं। 9:35: कीमत ₹252 के ऊपर वॉल्यूम के साथ टूटती है, जो ओपनिंग रेंज औसत का 1.5 गुना है। आप ₹252.10 पर 400 शेयर ख़रीदते हैं, स्टॉप ₹251 पर (प्रति शेयर जोखिम ₹1.10, कुल ₹440)। टारगेट ₹254.20 (प्रति शेयर इनाम ₹2.10, जोखिम का लगभग 1.9 गुना)। 10:05: कीमत टारगेट छूती है, आप बेचते हैं। 400 शेयर पर सकल लाभ ₹840। ₹120 खर्च के बाद (उदाहरण के लिए) शुद्ध लाभ ₹720। आपने दिन एक ट्रेड और एक ब्रेक के साथ बंद किया। यह उदाहरण सीखने के लिए है; ज़्यादातर दिन ऐसे नहीं दिखते।" },
  { h: "12. आम इंट्राडे गलतियाँ", ul: [
   "दिन के लिए बिना योजना के ट्रेड।",
   "ओवरट्रेडिंग: हर छोटी चाल पर ट्रेड।",
   "ट्रेड विपरीत जाने पर स्टॉप को और दूर खिसकाना।",
   "किसी अनजान शेयर पर ऊँचा लीवरेज।",
   "खर्च को अनदेखा करना और फिर हैरान होना कि मुनाफ़ा कहाँ गया।",
   "स्क्वेयर-ऑफ़ समय भूल जाना और ख़राब कीमत पर बंद होना।"
  ] }
 ] },
 "futures-options": { sections: [
  { h: "1. डेरिवेटिव्स क्या हैं", p: "डेरिवेटिव एक ऐसा अनुबंध है जिसका मूल्य किसी अंतर्निहित एसेट, जैसे शेयर या इंडेक्स, पर निर्भर करता है। भारत में फ्यूचर्स और ऑप्शन सबसे आम हैं। ये एसेट के मालिक हुए बिना कीमत पर दाँव लगाने देते हैं, और इनमें लीवरेज होता है। इससे ये हेजिंग और सट्टे दोनों के शक्तिशाली उपकरण हैं, और उन लोगों के बड़े नुकसान का आम कारण भी जो इन्हें नहीं समझते।" },
  { h: "2. फ्यूचर्स: ख़रीदने या बेचने की बाध्यता", p: "फ्यूचर्स कॉन्ट्रैक्ट भविष्य की तारीख़ पर तय कीमत पर कोई एसेट ख़रीदने या बेचने का समझौता है। ख़रीदार और विक्रेता दोनों बाध्य हैं। व्यवहार में भारत में ज़्यादातर इंडेक्स और शेयर फ्यूचर्स नकद में सेटल होते हैं, यानी तय कीमत और सेटलमेंट कीमत का अंतर पैसे में चुकाया जाता है।", p2: "उदाहरण: आप एक इंडेक्स फ्यूचर 24,000 पर ख़रीदते हैं, उदाहरण के लिए लॉट साइज़ 50। एक्सपोज़र = 50 × 24,000 = ₹12,00,000। इंडेक्स 200 अंक चढ़ा तो लाभ = 200 × 50 = ₹10,000। 200 अंक गिरा तो नुकसान = ₹10,000, खर्च से पहले। जमा मार्जिन एक्सपोज़र का केवल एक हिस्सा है।" },
  { h: "3. ऑप्शन: ख़रीदार के लिए अधिकार, विक्रेता के लिए दायित्व", p: "ऑप्शन ख़रीदार को स्ट्राइक कीमत पर ख़रीदने (कॉल) या बेचने (पुट) का अधिकार देता है, दायित्व नहीं, एक्सपायरी तक या उससे पहले। विक्रेता (राइटर) प्रीमियम पाता है और ख़रीदार के इस्तेमाल करने पर दायित्व लेता है।", ul: [
   "कॉल ऑप्शन: स्ट्राइक पर ख़रीदने का अधिकार। ख़रीदार को लाभ तब जब कीमत स्ट्राइक और प्रीमियम के जोड़ से ऊपर जाए।",
   "पुट ऑप्शन: स्ट्राइक पर बेचने का अधिकार। ख़रीदार को लाभ तब जब कीमत स्ट्राइक घटा प्रीमियम से नीचे जाए।",
   "प्रीमियम: ख़रीदार विक्रेता को जो कीमत देता है। यही ख़रीदार का अधिकतम नुकसान है।",
   "विक्रेता: प्रीमियम पाता है। हेज न हो तो नुकसान बड़ा या असीमित हो सकता है।"
  ] },
  { h: "4. ज़रूरी शब्द जो आपको जानने चाहिए", ul: [
   "स्ट्राइक प्राइस: वह कीमत जिस पर ऑप्शन इस्तेमाल हो सकता है।",
   "एक्सपायरी: वह तारीख़ जिस पर कॉन्ट्रैक्ट समाप्त होता है। भारत में इंडेक्स ऑप्शन की साप्ताहिक और मासिक एक्सपायरी होती हैं; मौजूदा शेड्यूल जाँचें।",
   "लॉट साइज़: एक कॉन्ट्रैक्ट में इकाइयों की तय संख्या। ट्रेड पूरे लॉट में होता है।",
   "इन द मनी (ITM): कॉल में कीमत स्ट्राइक से ऊपर, पुट में कीमत स्ट्राइक से नीचे। इसका आंतरिक मूल्य है।",
   "एट द मनी (ATM): स्ट्राइक मौजूदा कीमत के पास। मुख्य रूप से समय मूल्य।",
   "आउट ऑफ़ द मनी (OTM): कॉल में कीमत स्ट्राइक से नीचे, पुट में कीमत स्ट्राइक से ऊपर। केवल समय मूल्य।",
   "आंतरिक मूल्य और समय मूल्य: प्रीमियम = आंतरिक + समय मूल्य। एक्सपायरी नज़दीक आने पर समय मूल्य घटता है।"
  ] },
  { h: "5. एक्सपायरी पर पेऑफ़: गणित", p: "एक्सपायरी पर ऑप्शन की वैल्यू केवल उसका आंतरिक मूल्य है। कॉल के लिए: max(कीमत − स्ट्राइक, 0)। पुट के लिए: max(स्ट्राइक − कीमत, 0)। लाभ = वह वैल्यू घटा चुकाया गया प्रीमियम।", p2: "उदाहरण: 24,000 कॉल ₹150 प्रीमियम पर ख़रीदी, लॉट 50। अधिकतम नुकसान = 150 × 50 = ₹7,500। एक्सपायरी पर इंडेक्स 24,300: आंतरिक मूल्य 300, लाभ = (300 − 150) × 50 = ₹7,500। एक्सपायरी पर इंडेक्स 23,900: ऑप्शन बेकार, नुकसान ₹7,500।" },
  { h: "6. मार्जिन और विक्रेता का जोखिम", p: "ऑप्शन बेचने के लिए मार्जिन चाहिए, क्योंकि विक्रेता बहुत कुछ खो सकता है। मार्जिन की ज़रूरत अस्थिरता और कॉन्ट्रैक्ट की कीमत के साथ बदलती है, और अस्थिर बाज़ार में अचानक बढ़ सकती है। अगर पोज़िशन विपरीत जाए और मार्जिन कम पड़े, तो ब्रेकर नुकसान पर उसे बंद कर सकता है। ऑर्डर देने से पहले मार्जिन जानें।", ul: [
   "ख़रीदार: प्रीमियम पूरा चुकाता है। प्रीमियम से आगे कोई मार्जिन कॉल नहीं।",
   "विक्रेता: मार्जिन बनाए रखना होता है। पोज़िशन के विपरीत बड़ी चाल मार्जिन कॉल ला सकती है।",
   "फ्यूचर्स: मार्जिन एक जमा है। पोज़िशन का मूल्य हर दिन बाज़ार भाव से तय होता है।"
  ] },
  { h: "7. हेजिंग: एक व्यावहारिक उपयोग", p: "ऑप्शन अक्सर मौजूदा पोर्टफ़ोलियो की रक्षा के लिए इस्तेमाल होते हैं। उदाहरण: आपके पास ₹5,00,000 के शेयर हैं और गिरावट का डर है। अपने होल्डिंग के साथ चलने वाले इंडेक्स पर पुट ख़रीदने से बाज़ार गिरने पर नुकसान सीमित होता है, प्रीमियम की कीमत पर। हेज पूर्ण नहीं है, और गिरावट न हो तब भी प्रीमियम एक खर्च है।" },
  { h: "8. शुरुआती समझ सकें ऐसी रणनीतियाँ", ul: [
   "लॉन्ग कॉल या लॉन्ग पुट: दिशा पर दाँव, सीमित नुकसान (प्रीमियम)।",
   "कवर्ड कॉल: आपके पास शेयर हैं और उन पर कॉल बेचते हैं। प्रीमियम मिलता है, पर स्ट्राइक से ऊपर का लाभ छूटता है।",
   "प्रोटेक्टिव पुट: शेयर हैं और पुट ख़रीदा। पुट स्ट्राइक से नीचे नुकसान सीमित।",
   "बुल कॉल स्प्रेड: एक कॉल ख़रीदें और ऊँची स्ट्राइक की कॉल बेचें। लाभ और नुकसान दोनों सीमित।"
  ] },
  { h: "9. एक्सपायरी के जोखिम: अंत के पास क्या होता है", p: "एक्सपायरी के पास ऑप्शन समय मूल्य तेज़ी से खोते हैं। एक छोटी चाल कुछ घंटों में पोज़िशन को लाभ से नुकसान में बदल सकती है। विक्रेता को बड़ी चाल का जोखिम रहता है, और ख़रीदार पूरा प्रीमियम खो सकता है। एक्सपायरी से पहले अपने ब्रोकर से फ़िज़िकल या कैश सेटलमेंट, एक्सरसाइज़ और असाइनमेंट के नियम जाँचें।" },
  { h: "10. डेरिवेटिव्स पर टैक्स", p: "फ्यूचर्स और ऑप्शन ट्रेडिंग से आय टैक्स के लिए आमतौर पर नॉन-स्पेक्युलेटिव बिज़नेस इनकम मानी जाती है। इसके लिए ट्रेड लॉग, लाभ-हानि स्टेटमेंट और कुछ टर्नओवर सीमा से ऊपर टैक्स ऑडिट की ज़रूरत हो सकती है। नुकसान नियमों के अंदर आगे ले जाए जा सकते हैं। नियम बदलते हैं, इसलिए मौजूदा स्थिति किसी टैक्स पेशेवर से जाँचें। सार के लिए टैक्स बेसिक्स मॉड्यूल देखें।" },
  { h: "11. हर डेरिवेटिव ट्रेड के लिए निर्णय ढाँचा", ul: [
   "मेरा नज़रिया क्या है, और कौन सी घटना उसे ग़लत साबित करेगी?",
   "रुपये में अधिकतम नुकसान कितना है, और क्या वह मेरी जोखिम सीमा में है?",
   "लॉट साइज़, प्रीमियम या मार्जिन, और कुल लागत क्या है?",
   "कॉन्ट्रैक्ट कब एक्सपायर होता है, और एक्सपायरी के पास क्या होता है?",
   "क्या कम जोखिम के साथ वही नज़रिया व्यक्त करने का सरल तरीका है?"
  ] },
  { h: "12. आम डेरिवेटिव्स गलतियाँ", ul: [
   "सस्ते आउट-ऑफ़-द-मनी ऑप्शन को लॉटरी टिकट की तरह ख़रीदना।",
   "मार्जिन या असीमित जोखिम समझे बिना ऑप्शन बेचना।",
   "लीवरेज को मुफ़्त पैसे की तरह इस्तेमाल करना।",
   "सेटलमेंट नियम जाने बिना एक्सपायरी तक होल्ड करना।",
   "इम्प्लाइड वोलैटिलिटी को अनदेखा करना, जिससे नज़रिया सही होने पर भी ऑप्शन महँगा हो सकता है।"
  ] }
 ] }
});
