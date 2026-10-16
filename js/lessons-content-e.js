// Expanded content (English and Hindi): Option Greeks & Strategies, Trading Psychology.
// Overrides the sections in lessons.js. Model values are illustrative.
Object.assign(LESSON_OVERRIDES.en, {
 "option-greeks": { sections: [
  { h: "1. What the Greeks measure", p: "The Greeks are sensitivities: how much an option's price changes when one input changes. They come from pricing models and are estimates that move as the market moves. Learning them turns vague feelings ('the option should rise') into measurable exposures. The main inputs are the underlying price, time to expiry, implied volatility and interest rates." },
  { h: "2. Delta: sensitivity to the price", p: "Delta is the change in option price for a ₹1 change in the underlying. Call deltas run from 0 to 1, and put deltas from −1 to 0. An at-the-money option has delta near 0.5 for calls. Delta also approximates the probability the option expires in the money, which is a useful rough guide.", p2: "Example: a call with delta 0.6 gains about ₹60 per unit if the underlying rises ₹100 (0.6 × 100). If the underlying falls ₹100, it loses about ₹60. Delta changes as the price moves, so the estimate is only good for small moves." },
  { h: "3. Gamma: how fast delta changes", p: "Gamma is the rate of change of delta. It is highest for at-the-money options close to expiry. High gamma means small price moves can change your exposure quickly. Option buyers have positive gamma and benefit from large moves. Option sellers have negative gamma and are hurt by large moves, which is why sellers need hedging discipline." },
  { h: "4. Theta: the cost of time", p: "Theta is the daily decline in an option's time value, all else equal. Option buyers pay theta; sellers collect it. Theta is largest for at-the-money options near expiry, which is why short-dated options can lose value quickly even when the underlying does not move.", p2: "Example: an option priced at ₹100 with theta −5 per day. After two days, all else equal, it is about ₹90. The decay is not linear; it speeds up near expiry." },
  { h: "5. Vega and implied volatility", p: "Vega is the change in option price for a 1 percentage point change in implied volatility (IV). IV is the volatility implied by the option's price. When uncertainty rises, IV rises and options get more expensive. Before results, budgets and elections, IV often rises. After the event, IV often falls sharply, which is called IV crush.", p2: "Example: vega 8, IV rises 2 points: the option gains about ₹16 per unit even if the underlying does not move. If IV then falls 4 points after results, the option can lose value even if the stock moves in the expected direction." },
  { h: "6. Rho: interest rates", p: "Rho measures sensitivity to interest rates. For short-dated options it is usually small and often ignored by beginners. It matters more for long-dated options and in periods of rate changes." },
  { h: "7. Using the Greeks together", p: "No single Greek explains the position. A practical checklist: delta tells you the direction exposure; theta tells you the daily cost or income; vega tells you how exposed you are to a change in uncertainty; gamma tells you how the exposure will change as price moves. Before any trade, write down the Greeks and what would make them change." },
  { h: "8. Defined-risk strategies", p: "A defined-risk strategy limits both maximum loss and maximum profit. Spreads do this by buying one option and selling another. They reduce cost and reduce the impact of volatility changes.", ul: [
   "Bull call spread: buy a lower-strike call and sell a higher-strike call with the same expiry. Profits if the price rises moderately.",
   "Bear put spread: buy a higher-strike put and sell a lower-strike put. Profits if the price falls moderately.",
   "Iron condor: sell an out-of-the-money put spread and an out-of-the-money call spread. Profits if the price stays in a range. Limited profit, limited loss."
  ] },
  { h: "9. Worked example: bull call spread", p: "Buy a 24,000 call at ₹200 premium and sell a 24,500 call at ₹80 premium. Net debit ₹120. Maximum profit = 500 − 120 = ₹380 per unit. Maximum loss = ₹120 per unit. Break-even = 24,000 + 120 = 24,120. Both risk and reward are fixed before entry. The trade is a view that the index rises to around 24,500 by expiry, with the loss capped if it does not." },
  { h: "10. Volatility as a trade", p: "Some traders trade volatility itself: buying options when IV is low and expected to rise, or selling when IV is high and expected to fall. Compare current IV with its historical range to judge whether options are cheap or expensive. A high IV is not a reason to sell on its own, because high volatility often comes with large moves." },
  { h: "11. Practical cautions", ul: [
   "Model estimates depend on inputs. Check your broker's calculator and understand its assumptions.",
   "Liquidity matters. Wide bid-ask spreads make Greeks hard to trust and exits expensive.",
   "Time decay is relentless for buyers. A correct view can still lose money if the move is too slow.",
   "Expiry week changes gamma and theta sharply. Know your exposure before the final days.",
   "Paper-trade a strategy before risking money, and keep a record of the Greeks at entry and exit."
  ] },
  { h: "12. Common Greeks mistakes", ul: [
   "Buying options only because they look cheap, ignoring theta.",
   "Ignoring IV when buying before results.",
   "Selling naked options without understanding gamma risk.",
   "Assuming delta stays the same as the price moves.",
   "Using the Greeks without knowing the expiry date and strike."
  ] }
 ] },
 "trading-psychology": { sections: [
  { h: "1. Why psychology decides results", p: "Most trading plans fail not because the method is wrong, but because the trader does not follow it. Fear makes you exit winners early and hold losers. Greed makes you add size after a win. Frustration makes you chase a loss. Knowing these patterns, and building habits against them, is a skill that matters as much as analysis." },
  { h: "2. Common biases with examples", ul: [
   "Loss aversion: a loss feels roughly twice as painful as an equal gain feels good. Example: you hold a losing stock at ₹80 (bought at ₹100) instead of selling at a planned stop at ₹90, and it falls to ₹60.",
   "Overconfidence: after a few wins you believe you have skill, and you increase size or ignore your rules.",
   "Recency bias: you assume the latest trend will continue, and you forget longer history.",
   "Confirmation bias: you read only the news that supports your position.",
   "FOMO (fear of missing out): you chase a move after it has already run, buying near the top.",
   "Anchoring: you fix on a price, such as your purchase price, and judge decisions by it rather than by current information."
  ] },
  { h: "3. Process over outcome", p: "A good decision can lose money, and a bad decision can make money in a single trade. Over many trades, the process determines the result. Judge each trade by whether you followed the plan and whether the plan was sound, not by whether it won. Otherwise you will change good rules after a bad run of luck, and keep bad habits after a lucky win." },
  { h: "4. Writing a trading plan", p: "A plan answers the questions you will otherwise answer emotionally in the moment.", ul: [
   "Setups: the exact conditions for an entry.",
   "Risk: the maximum loss per trade and per day, and per week.",
   "Position size: how it is calculated.",
   "Exits: stop-loss rules and profit-taking rules.",
   "Trade limits: maximum trades per day and when to stop.",
   "Review: how often you review results, and what you will change only if the data shows a need."
  ] },
  { h: "5. Overtrading: the silent cost", p: "Overtrading means trading more than your plan calls for, usually out of boredom, a desire to recover losses, or excitement. It raises costs, lowers the quality of decisions and increases stress. Set a maximum number of trades per day and a maximum loss per day. When you hit either, stop.", p2: "Example: 20 trades a day at ₹100 charges each costs ₹2,000 a day, or about ₹40,000 over 20 trading days, before any trading loss." },
  { h: "6. Revenge trading: the most damaging pattern", p: "After a loss, many traders feel an urge to win the money back immediately. They increase size, take unplanned trades, or ignore their stops. This turns one loss into several. The cure is a rule set in advance: after two losses, or a set daily loss, the day is over. Step away from the screen, and review later.", ul: [
   "Pause for at least 15 minutes after a loss before taking another trade.",
   "Write down the trade and the emotion you felt. It is information, not a reason to act.",
   "Stop for the day when your rule says to."
  ] },
  { h: "7. Fear and hesitation", p: "Fear shows up as exiting too early, not taking a valid setup after a string of losses, or moving a stop to avoid taking a loss. The fix is smaller size. When each trade risks an amount you can accept, fear has less power. If you cannot take a planned trade because you are afraid, reduce the size until you can." },
  { h: "8. Building routines", ul: [
   "Before the session: review the plan, the levels, the news and your maximum risk for the day.",
   "During the session: follow the checklist before each trade, and do not trade outside your setups.",
   "After the session: record each trade, the reason, the emotion and whether the rules were followed.",
   "Weekly: review patterns in the journal. Look for repeated mistakes, not single results.",
   "Rest: take breaks and avoid trading when tired, ill or upset."
  ] },
  { h: "9. The journal as a mirror", p: "A journal shows what your memory hides. Record the setup, the reason, the size, the result in rupees and in R, and whether the plan was followed. After 30 to 50 trades, look for patterns: do you lose more on Mondays, after losses, or on trades you enter late? The data will often show a fixable habit more clearly than any book." },
  { h: "10. When to stop trading altogether", p: "Stop and take a longer break if you break your rules repeatedly, if losses are affecting sleep or relationships, if you are trading money you cannot afford to lose, or if you feel the need to win back losses urgently. A stop is not failure; it protects capital and your health. Return only after reviewing what went wrong and reducing size." },
  { h: "11. Building discipline over time", p: "Discipline is built by small repeated actions: following the stop, taking the planned size, keeping the journal and leaving the screen when the day is done. Measure discipline by rule-following, not by profit. A trader who follows the plan for 100 trades has learned more than one who wins three trades by luck." },
  { h: "12. Psychology checklist before each trade", ul: [
   "Is this trade in my plan, and does it meet every entry condition?",
   "What is my maximum loss, and am I comfortable with it?",
   "Am I trading to recover a loss, to escape boredom, or because I feel confident?",
   "Have I already reached my daily loss or trade limit?",
   "Would I take this trade if I had just had a great day?"
  ] }
 ] }
});

Object.assign(LESSON_OVERRIDES.hi, {
 "option-greeks": { sections: [
  { h: "1. ग्रीक्स क्या मापते हैं", p: "ग्रीक्स संवेदनशीलताएँ हैं: किसी एक इनपुट के बदलने पर ऑप्शन की कीमत कितनी बदलती है। ये प्राइसिंग मॉडल से आते हैं और बाज़ार के साथ बदलने वाले अनुमान हैं। इन्हें समझने से अस्पष्ट भावना ('ऑप्शन चढ़ना चाहिए') मापने योग्य एक्सपोज़र बन जाती है। मुख्य इनपुट हैं: अंतर्निहित कीमत, एक्सपायरी तक का समय, इम्प्लाइड वोलैटिलिटी और ब्याज दर।" },
  { h: "2. डेल्टा: कीमत के प्रति संवेदनशीलता", p: "डेल्टा अंतर्निहित में ₹1 के बदलाव पर ऑप्शन की कीमत में बदलाव है। कॉल का डेल्टा 0 से 1 और पुट का −1 से 0 के बीच। एट-द-मनी कॉल का डेल्टा लगभग 0.5 होता है। डेल्टा यह भी लगभग बताता है कि ऑप्शन इन द मनी एक्सपायर होगा, जो एक उपयोगी मोटा अनुमान है।", p2: "उदाहरण: 0.6 डेल्टा वाली कॉल, अंतर्निहित ₹100 चढ़े तो लगभग ₹60 प्रति यूनिट बढ़ती है (0.6 × 100)। अंतर्निहित ₹100 गिरे तो लगभग ₹60 घटती है। डेल्टा कीमत के साथ बदलता है, इसलिए यह अनुमान छोटी चाल के लिए ही अच्छा है।" },
  { h: "3. गामा: डेल्टा कितनी तेज़ी से बदलता है", p: "गामा डेल्टा के बदलने की दर है। यह एट-द-मनी और एक्सपायरी के पास के ऑप्शन में सबसे ज़्यादा होता है। ज़्यादा गामा का मतलब है कि छोटी कीमत चाल भी आपका एक्सपोज़र जल्दी बदल सकती है। ऑप्शन ख़रीदारों का गामा सकारात्मक है और उन्हें बड़ी चाल से फ़ायदा होता है। ऑप्शन विक्रेताओं का गामा नकारात्मक है और बड़ी चाल उन्हें नुकसान देती है, इसलिए विक्रेताओं को हेजिंग का अनुशासन चाहिए।" },
  { h: "4. थीटा: समय की कीमत", p: "थीटा अन्य सब समान रहने पर ऑप्शन के समय मूल्य में रोज़ की गिरावट है। ऑप्शन ख़रीदार थीटा चुकाते हैं; विक्रेता इसे कमाते हैं। थीटा एक्सपायरी के पास एट-द-मनी ऑप्शन में सबसे ज़्यादा होता है, इसलिए छोटी अवधि के ऑप्शन अंतर्निहित न चलने पर भी तेज़ी से मूल्य खो सकते हैं।", p2: "उदाहरण: ₹100 पर कीमत वाला ऑप्शन, थीटा −5 प्रतिदिन। दो दिन बाद, बाक़ी सब समान, लगभग ₹90। क्षय सीधी रेखा में नहीं है; एक्सपायरी के पास तेज़ होता है।" },
  { h: "5. वेगा और इम्प्लाइड वोलैटिलिटी", p: "वेगा इम्प्लाइड वोलैटिलिटी (IV) में 1 प्रतिशत बिंदु के बदलाव पर ऑप्शन की कीमत में बदलाव है। IV ऑप्शन की कीमत से निकली अस्थिरता है। अनिश्चितता बढ़ने पर IV बढ़ता है और ऑप्शन महँगे होते हैं। नतीजों, बजट और चुनावों से पहले IV अक्सर बढ़ता है। घटना के बाद IV अक्सर तेज़ी से गिरता है, जिसे IV क्रश कहते हैं।", p2: "उदाहरण: वेगा 8, IV 2 अंक बढ़ा: अंतर्निहित न चले तब भी ऑप्शन लगभग ₹16 प्रति यूनिट बढ़ता है। नतीजों के बाद IV 4 अंक गिरे, तो स्टॉक अपेक्षित दिशा में चलकर भी ऑप्शन घट सकता है।" },
  { h: "6. रो: ब्याज दरें", p: "रो ब्याज दरों के प्रति संवेदनशीलता मापता है। छोटी अवधि के ऑप्शन में यह आमतौर पर छोटा होता है और शुरुआती अक्सर इसे नज़रअंदाज़ करते हैं। लंबी अवधि के ऑप्शन और दर बदलाव के दौर में यह ज़्यादा मायने रखता है।" },
  { h: "7. ग्रीक्स को एक साथ इस्तेमाल करना", p: "कोई एक ग्रीक पूरी पोज़िशन नहीं समझाता। व्यावहारिक जाँच: डेल्टा बताता है दिशा का एक्सपोज़र; थीटा बताता है रोज़ की लागत या आय; वेगा बताता है अनिश्चितता बदलने का असर; गामा बताता है कीमत चलने पर एक्सपोज़र कैसे बदलेगा। किसी भी ट्रेड से पहले ग्रीक्स और उन्हें बदलने वाली स्थितियाँ लिख लें।" },
  { h: "8. सीमित-जोखिम रणनीतियाँ", p: "सीमित-जोखिम रणनीति अधिकतम नुकसान और अधिकतम लाभ दोनों सीमित करती है। स्प्रेड एक ऑप्शन ख़रीदकर और दूसरा बेचकर ऐसा करते हैं। ये लागत घटाते हैं और अस्थिरता बदलाव का असर कम करते हैं।", ul: [
   "बुल कॉल स्प्रेड: एक निचली स्ट्राइक की कॉल ख़रीदें और उसी एक्सपायरी की ऊँची स्ट्राइक की कॉल बेचें। मध्यम तेज़ी में लाभ।",
   "बियर पुट स्प्रेड: एक ऊँची स्ट्राइक का पुट ख़रीदें और निचली स्ट्राइक का पुट बेचें। मध्यम गिरावट में लाभ।",
   "आयरन कंडोर: आउट-ऑफ़-द-मनी पुट स्प्रेड और कॉल स्प्रेड बेचें। कीमत रेंज में रहे तो लाभ। सीमित लाभ, सीमित नुकसान।"
  ] },
  { h: "9. काम किया हुआ उदाहरण: बुल कॉल स्प्रेड", p: "24,000 कॉल ₹200 प्रीमियम पर ख़रीदें और 24,500 कॉल ₹80 पर बेचें। नेट डेबिट ₹120। अधिकतम लाभ = 500 − 120 = प्रति यूनिट ₹380। अधिकतम नुकसान = प्रति यूनिट ₹120। ब्रेक-ईवन = 24,000 + 120 = 24,120। जोखिम और इनाम एंट्री से पहले तय। ट्रेड का नज़रिया है कि एक्सपायरी तक इंडेक्स लगभग 24,500 तक जाए, और न गया तो नुकसान सीमित।" },
  { h: "10. अस्थिरता को ट्रेड के रूप में", p: "कुछ ट्रेडर अस्थिरता ख़ुद ट्रेड करते हैं: IV कम हो और बढ़ने की उम्मीद हो तो ऑप्शन ख़रीदना, या IV ऊँचा हो और गिरने की उम्मीद हो तो बेचना। यह जाँचने के लिए कि ऑप्शन सस्ते हैं या महँगे, मौजूदा IV की ऐतिहासिक सीमा से तुलना करें। ऊँचा IV अकेला बेचने का कारण नहीं, क्योंकि ऊँची अस्थिरता के साथ अक्सर बड़ी चालें आती हैं।" },
  { h: "11. व्यावहारिक सावधानियाँ", ul: [
   "मॉडल के अनुमान इनपुट पर निर्भर हैं। अपने ब्रोकर का कैलकुलेटर जाँचें और उसकी धारणाएँ समझें।",
   "लिक्विडिटी मायने रखती है। चौड़े बिड-आस्क स्प्रेड ग्रीक्स को भरोसेमंद नहीं रहने देते और एग्ज़िट महँगा करते हैं।",
   "ख़रीदारों के लिए समय-क्षय निरंतर है। सही नज़रिया भी पैसा खो सकता है, अगर चाल बहुत धीमी हो।",
   "एक्सपायरी सप्ताह में गामा और थीटा तेज़ी से बदलते हैं। आख़िरी दिनों से पहले अपना एक्सपोज़र समझें।",
   "पैसा लगाने से पहले रणनीति पेपर पर परखें, और एंट्री व एग्ज़िट पर ग्रीक्स का रिकॉर्ड रखें।"
  ] },
  { h: "12. आम ग्रीक्स गलतियाँ", ul: [
   "थीटा को अनदेखा करके केवल इसलिए ऑप्शन ख़रीदना कि वे सस्ते लगते हैं।",
   "नतीजों से पहले ख़रीदते समय IV को अनदेखा करना।",
   "गामा जोखिम समझे बिना नेकेड ऑप्शन बेचना।",
   "यह मानना कि कीमत चलने पर डेल्टा वही रहता है।",
   "एक्सपायरी और स्ट्राइक जाने बिना ग्रीक्स इस्तेमाल करना।"
  ] }
 ] },
 "trading-psychology": { sections: [
  { h: "1. मनोविज्ञान नतीजे क्यों तय करता है", p: "ज़्यादातर ट्रेडिंग योजनाएँ इसलिए विफल नहीं होतीं कि तरीका ग़लत है, बल्कि इसलिए कि ट्रेडर उसका पालन नहीं करता। डर आपको जीतने वाले ट्रेड जल्दी बेचने और घाटे वाले रखने पर मजबूर करता है। लालच जीत के बाद साइज़ बढ़वाता है। झुंझलाहट नुकसान की भरपाई के पीछे भगाती है। इन पैटर्न को जानना और उनके ख़िलाफ़ आदतें बनाना उतना ही ज़रूरी कौशल है जितना विश्लेषण।" },
  { h: "2. आम पूर्वाग्रह उदाहरणों के साथ", ul: [
   "हानि से बचाव (loss aversion): नुकसान लगभग बराबर के लाभ से दोगुना दर्दनाक लगता है। उदाहरण: ₹100 पर ख़रीदा शेयर ₹90 के योजनाबद्ध स्टॉप पर बेचने के बजाय ₹80 पर होल्ड करते हैं, और वह ₹60 तक गिरता है।",
   "अति-आत्मविश्वास: कुछ जीत के बाद लगता है कि आप माहिर हैं, और साइज़ बढ़ा देते हैं या नियम छोड़ देते हैं।",
   "हाल की घटनाओं का असर (recency bias): मान लेते हैं कि ताज़ा ट्रेंड चलता रहेगा, और लंबा इतिहास भूल जाते हैं।",
   "पुष्टि पूर्वाग्रह (confirmation bias): केवल वही ख़बर पढ़ते हैं जो आपकी पोज़िशन का समर्थन करे।",
   "FOMO (कुछ छूट जाने का डर): चाल के बाद पीछा करते हैं, और चोटी के पास ख़रीदते हैं।",
   "एंकरिंग: किसी कीमत, जैसे आपकी ख़रीद कीमत, पर अटक जाते हैं, और फ़ैसले उसी से परखते हैं, मौजूदा जानकारी से नहीं।"
  ] },
  { h: "3. नतीजे से ज़्यादा प्रक्रिया", p: "एक अच्छा फ़ैसला पैसा खो सकता है, और एक ख़राब फ़ैसला एक ट्रेड में पैसा कमा सकता है। कई ट्रेड में प्रक्रिया नतीजा तय करती है। हर ट्रेड को इस आधार पर परखें कि क्या आपने योजना का पालन किया और क्या योजना सही थी, इस आधार पर नहीं कि वह जीता या नहीं। वरना आप बुरे दौर में अच्छे नियम बदल देंगे, और भाग्यशाली जीत के बाद बुरी आदतें रख लेंगे।" },
  { h: "4. ट्रेडिंग योजना लिखना", p: "योजना उन सवालों के जवाब देती है जो आप वरना पल में भावना से देते।", ul: [
   "सेटअप: एंट्री की सटीक शर्तें।",
   "जोखिम: प्रति ट्रेड, प्रति दिन और प्रति सप्ताह अधिकतम नुकसान।",
   "पोज़िशन साइज़: उसकी गणना कैसे होती है।",
   "एग्ज़िट: स्टॉप-लॉस के नियम और लाभ लेने के नियम।",
   "ट्रेड की सीमाएँ: प्रति दिन अधिकतम ट्रेड और कब रुकना है।",
   "समीक्षा: नतीजों की समीक्षा कितनी बार, और क्या बदलेंगे, केवल तब जब डेटा ज़रूरत दिखाए।"
  ] },
  { h: "5. ओवरट्रेडिंग: चुपचाप लगने वाला खर्च", p: "ओवरट्रेडिंग का मतलब है योजना से ज़्यादा ट्रेड करना, आमतौर पर ऊब, नुकसान की भरपाई की चाह, या उत्साह के कारण। यह खर्च बढ़ाता है, फ़ैसलों की गुणवत्ता घटाता है और तनाव बढ़ाता है। प्रति दिन ट्रेड की अधिकतम संख्या और अधिकतम नुकसान तय करें। कोई भी सीमा छूए तो रुकें।", p2: "उदाहरण: हर ट्रेड ₹100 शुल्क के साथ, रोज़ 20 ट्रेड, यानी रोज़ ₹2,000, या 20 ट्रेडिंग दिनों में लगभग ₹40,000, ट्रेडिंग नुकसान से पहले।" },
  { h: "6. बदले का ट्रेड: सबसे नुकसानदेह पैटर्न", p: "नुकसान के बाद कई ट्रेडर तुरंत पैसा वापस जीतने की इच्छा महसूस करते हैं। वे साइज़ बढ़ाते हैं, बिना योजना के ट्रेड लेते हैं, या स्टॉप नज़रअंदाज़ करते हैं। इससे एक नुकसान कई बन जाता है। इलाज पहले से तय नियम है: दो नुकसान के बाद, या एक तय दैनिक नुकसान पर, दिन ख़त्म। स्क्रीन से हटें और बाद में समीक्षा करें।", ul: [
   "नुकसान के बाद अगला ट्रेड लेने से पहले कम से कम 15 मिनट रुकें।",
   "ट्रेड और उस समय की भावना लिखें। यह जानकारी है, कार्रवाई का कारण नहीं।",
   "जब नियम कहे तब उस दिन के लिए रुक जाएँ।"
  ] },
  { h: "7. डर और हिचकिचाहट", p: "डर जल्दी बाहर निकलने, नुकसान की लगातार शृंखला के बाद वैध सेटअप न लेने, या घाटे से बचने के लिए स्टॉप खिसकाने के रूप में दिखता है। इलाज है छोटा साइज़। जब हर ट्रेड में उतना जोखिम हो जितना आप स्वीकार कर सकते हैं, तो डर की ताक़त घटती है। अगर डर के कारण योजनाबद्ध ट्रेड नहीं ले पा रहे, तो साइज़ तब तक घटाएँ जब तक आप ले सकें।" },
  { h: "8. दिनचर्या बनाना", ul: [
   "सत्र से पहले: योजना, स्तर, ख़बरें और उस दिन का अधिकतम जोखिम देखें।",
   "सत्र के दौरान: हर ट्रेड से पहले चेकलिस्ट, और अपने सेटअप के बाहर ट्रेड नहीं।",
   "सत्र के बाद: हर ट्रेड, कारण, भावना और नियमों का पालन दर्ज करें।",
   "साप्ताहिक: जर्नल में पैटर्न देखें। दोहराई गई गलतियाँ खोजें, अकेले नतीजे नहीं।",
   "आराम: ब्रेक लें, और थके, बीमार या परेशान होने पर ट्रेड न करें।"
  ] },
  { h: "9. जर्नल: एक दर्पण", p: "जर्नल वह दिखाता है जो आपकी याददाश्त छिपाती है। सेटअप, कारण, साइज़, रुपये और R में नतीजा, और योजना का पालन दर्ज करें। 30 से 50 ट्रेड के बाद पैटर्न देखें: क्या सोमवार को, नुकसान के बाद, या देर से लिए ट्रेड पर ज़्यादा नुकसान होता है? डेटा अक्सर किसी भी किताब से साफ़ दिखाता है कि कौन सी आदत ठीक हो सकती है।" },
  { h: "10. ट्रेडिंग पूरी तरह कब रोकें", p: "लंबा ब्रेक लें अगर आप बार-बार नियम तोड़ते हैं, अगर नुकसान नींद या रिश्तों पर असर डाल रहा है, अगर ऐसा पैसा ट्रेड कर रहे हैं जिसे खोना आप afford नहीं कर सकते, या अगर नुकसान की भरपाई की जल्दी महसूस होती है। रुकना असफलता नहीं; यह पूँजी और आपकी सेहत की रक्षा करता है। केवल यह समीक्षा करने के बाद लौटें कि क्या ग़लत हुआ और साइज़ घटाकर।" },
  { h: "11. समय के साथ अनुशासन बनाना", p: "अनुशासन छोटी, दोहराई गई क्रियाओं से बनता है: स्टॉप का पालन, योजनाबद्ध साइज़ लेना, जर्नल रखना, और दिन ख़त्म होने पर स्क्रीन छोड़ना। अनुशासन को मुनाफ़े से नहीं, नियमों के पालन से नापें। जो ट्रेडर 100 ट्रेड योजना से करता है, उसने उस ट्रेडर से ज़्यादा सीखा जो भाग्य से तीन जीत जाता है।" },
  { h: "12. हर ट्रेड से पहले मनोवैज्ञानिक चेकलिस्ट", ul: [
   "क्या यह ट्रेड मेरी योजना में है, और हर एंट्री शर्त पूरी करता है?",
   "मेरा अधिकतम नुकसान कितना है, और क्या मैं उससे सहज हूँ?",
   "क्या मैं नुकसान की भरपाई, ऊब से बचने, या आत्मविश्वास के कारण ट्रेड कर रहा हूँ?",
   "क्या मैं अपनी दैनिक नुकसान या ट्रेड सीमा पहले ही छू चुका हूँ?",
   "क्या मैं यह ट्रेड तब भी लेता अगर मेरा दिन बहुत अच्छा गया होता?"
  ] }
 ] }
});
