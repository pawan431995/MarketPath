// Buy and sell strategies added to Swing Trading, Intraday Trading and F&O modules (English and Hindi).
// Each strategy gives: when to use it, how to buy, how to sell (stop and target), a worked example and common mistakes.
// Numbers are illustrative. Strategies are educational, not recommendations, and carry risk of loss.
(function addStrategies() {
 const add = (slug, lg, secs) => {
  const o = LESSON_OVERRIDES[lg][slug];
  o.sections = o.sections.concat(secs);
 };

 add("swing-trading", "en", [
  { h: "13. Swing strategies: buy and sell rules", p: "Each strategy below has three parts: when the market condition fits, how to buy, and how to sell (stop-loss and profit target). Use one strategy at a time and write the rules before you trade. Results are shown as examples, not promises." },
  { h: "Strategy 1: Breakout buy", p: "Buy when price closes above a clear resistance level on above-average volume. Best in an uptrend or after a base of consolidation.", ul: [
   "Buy: close above resistance (for example ₹250) with volume at least 1.5 times the 20-day average.",
   "Stop-loss: just below the breakout candle's low or the last swing low (for example ₹240).",
   "Target: the height of the base added to the breakout, or the next resistance (for example ₹270). Risk-reward should be at least 1:2.",
   "Sell early if: price closes back below the breakout level within 2 days. A failed breakout is an exit signal."
  ], p2: "Example: stock breaks ₹250 on 2 times average volume. Buy 100 shares at ₹250, stop ₹240 (risk ₹1,000). Target ₹270 (reward ₹2,000). Price closes at ₹266 after three days; move stop to ₹250 (break-even) and hold for the target." },
  { h: "Strategy 2: Pullback to a rising moving average", p: "Buy a dip in a strong uptrend, when price returns to a rising moving average and shows buying interest. This gives a better price than buying the breakout.", ul: [
   "Trend check: price above a rising 50-day average; 20-day average above 50-day.",
   "Buy: price touches or nears the 20-day EMA and forms a bullish candle (hammer or engulfing) with RSI turning up from around 40 to 50.",
   "Stop-loss: below the 50-day average or the pullback low.",
   "Sell: at the previous swing high, or trail the stop below each new higher low."
  ], p2: "Example: in an uptrend, price falls to ₹248 (20-day EMA) and forms a bullish engulfing candle. Buy at ₹249, stop ₹243 (below the 50-day average), target the previous high ₹262 (risk ₹6, reward ₹13)." },
  { h: "Strategy 3: Support bounce with confirmation", p: "Buy at a well-tested support level after a fall, only after a clear reversal signal. Works in range-bound stocks as well as at the bottom of a trend.", ul: [
   "Level: support tested at least twice (for example ₹240) with volume falling on each test.",
   "Buy: bullish reversal candle at support, followed by a close above that candle's high.",
   "Stop-loss: just below support (for example ₹237).",
   "Sell: at the middle of the range or at resistance (for example ₹255). Exit if support breaks on volume."
  ] },
  { h: "Strategy 4: Trend-following exit (sell rules)", p: "Many swing traders hold until the trend breaks rather than fixing a target. This captures large moves and needs a clear exit rule.", ul: [
   "Trailing stop: move the stop up to below each higher swing low.",
   "Moving-average exit: sell when the price closes below the 20-day EMA after being above it.",
   "Time exit: if the trade has not moved toward the target within the planned period (for example 15 sessions), sell and review.",
   "Never move a stop down. Only tighten or keep it."
  ] },
  { h: "Strategy 5: Sell side (short) swing trades", p: "Short selling in swing trading means selling a stock you do not own, expecting it to fall. In India, short selling is limited to permitted stocks and products, and brokers apply margin rules. Only use it if you understand the rules and the unlimited-loss risk.", ul: [
   "Setup: breakdown below support on volume, or a bearish reversal at resistance in a downtrend.",
   "Stop-loss: just above the broken support, or above the recent swing high.",
   "Target: the next support level, with reward at least twice the risk.",
   "Check the stock is eligible for short selling and understand margin and settlement rules before trading."
  ] },
  { h: "Choosing a swing strategy", ul: [
   "Trending market with a clear uptrend: pullback to a rising average (Strategy 2) or breakout (Strategy 1).",
   "Range-bound market: support bounce (Strategy 3), selling near resistance.",
   "Strong trend already running: trend-following exit (Strategy 4) to keep the winner.",
   "Falling market with a breakdown: short setup (Strategy 5), only if permitted and understood."
  ] },
  { h: "Common swing strategy mistakes", ul: [
   "Buying a breakout that has already run 5 percent past the level, which leaves little room to the stop.",
   "Taking a pullback entry without a stop below the average.",
   "Moving targets further up when price reaches them instead of taking profit or trailing the stop.",
   "Using all five strategies at once. Pick one, test it, and keep a journal of results."
  ] }
 ]);

 add("swing-trading", "hi", [
  { h: "13. स्विंग रणनीतियाँ: ख़रीद और बिक्री के नियम", p: "नीचे हर रणनीति के तीन हिस्से हैं: बाज़ार की कौन सी स्थिति उपयुक्त है, कैसे ख़रीदें, और कैसे बेचें (स्टॉप-लॉस और लाभ का टारगेट)। एक समय में एक रणनीति इस्तेमाल करें और ट्रेड से पहले नियम लिख लें। नतीजे केवल उदाहरण हैं, वादा नहीं।" },
  { h: "रणनीति 1: ब्रेकआउट ख़रीद", p: "जब कीमत औसत से ज़्यादा वॉल्यूम पर किसी साफ़ रेज़िस्टेंस के ऊपर क्लोज़ करे, तब ख़रीदें। अपट्रेंड में या समेकन (consolidation) के बाद सबसे अच्छा।", ul: [
   "ख़रीद: 20-दिन के औसत वॉल्यूम के कम से कम 1.5 गुना वॉल्यूम के साथ रेज़िस्टेंस (जैसे ₹250) के ऊपर क्लोज़।",
   "स्टॉप-लॉस: ब्रेकआउट कैंडल के लो के ठीक नीचे या पिछले स्विंग लो के नीचे (जैसे ₹240)।",
   "टारगेट: समेकन की ऊँचाई को ब्रेकआउट में जोड़ें, या अगला रेज़िस्टेंस (जैसे ₹270)। जोखिम-इनाम कम से कम 1:2 हो।",
   "जल्दी बेचें यदि: 2 दिन के भीतर कीमत ब्रेकआउट स्तर के नीचे क्लोज़ हो। विफल ब्रेकआउट एग्ज़िट संकेत है।"
  ], p2: "उदाहरण: शेयर औसत के 2 गुना वॉल्यूम पर ₹250 के ऊपर टूटता है। ₹250 पर 100 शेयर ख़रीदें, स्टॉप ₹240 (जोखिम ₹1,000)। टारगेट ₹270 (इनाम ₹2,000)। तीन दिन बाद क्लोज़ ₹266; स्टॉप ₹250 (ब्रेक-ईवन) पर ले जाएँ और टारगेट तक रखें।" },
  { h: "रणनीति 2: बढ़ते मूविंग एवरेज तक पुलबैक", p: "मज़बूत अपट्रेंड में गिरावट पर ख़रीदें, जब कीमत बढ़ते मूविंग एवरेज तक लौटे और ख़रीदारी दिखाए। ब्रेकआउट ख़रीदने से यह बेहतर कीमत देता है।", ul: [
   "ट्रेंड जाँच: कीमत बढ़ते 50-दिन एवरेज के ऊपर; 20-दिन एवरेज 50-दिन के ऊपर।",
   "ख़रीद: कीमत 20-दिन के EMA को छुए या उसके पास आए और तेज़ी वाली कैंडल (हैमर या एंगल्फ़िंग) बने, RSI लगभग 40 से 50 के बीच से ऊपर मुड़े।",
   "स्टॉप-लॉस: 50-दिन एवरेज या पुलबैक के लो के नीचे।",
   "बिक्री: पिछले स्विंग हाई पर, या हर नए हायर लो के नीचे स्टॉप ट्रेल करें।"
  ], p2: "उदाहरण: अपट्रेंड में कीमत ₹248 (20-दिन EMA) तक गिरती है और तेज़ी वाली एंगल्फ़िंग कैंडल बनाती है। ₹249 पर ख़रीदें, स्टॉप ₹243 (50-दिन एवरेज के नीचे), टारगेट पिछला हाई ₹262 (जोखिम ₹6, इनाम ₹13)।" },
  { h: "रणनीति 3: सपोर्ट पर पलटाव की पुष्टि", p: "गिरावट के बाद अच्छी तरह परखे गए सपोर्ट स्तर पर ख़रीदें, पर केवल साफ़ पलटाव संकेत के बाद। रेंज वाले शेयरों और ट्रेंड के निचले स्तर दोनों पर काम करता है।", ul: [
   "स्तर: सपोर्ट (जैसे ₹240) की कम से कम दो बार परख, हर परख पर वॉल्यूम घटता हुआ।",
   "ख़रीद: सपोर्ट पर तेज़ी वाली पलटाव कैंडल, और उसके बाद उसके हाई के ऊपर क्लोज़।",
   "स्टॉप-लॉस: सपोर्ट के ठीक नीचे (जैसे ₹237)।",
   "बिक्री: रेंज के मध्य या रेज़िस्टेंस (जैसे ₹255) पर। वॉल्यूम के साथ सपोर्ट टूटे तो बाहर निकलें।"
  ] },
  { h: "रणनीति 4: ट्रेंड-फ़ॉलोइंग एग्ज़िट (बिक्री के नियम)", p: "कई स्विंग ट्रेडर तय टारगेट के बजाय ट्रेंड टूटने तक रुकते हैं। इससे बड़ी चालें पकड़ी जाती हैं, पर बिक्री का साफ़ नियम चाहिए।", ul: [
   "ट्रेलिंग स्टॉप: हर नए हायर लो के नीचे स्टॉप ऊपर ले जाएँ।",
   "मूविंग-एवरेज एग्ज़िट: 20-दिन EMA के ऊपर रहने के बाद उसके नीचे क्लोज़ होने पर बेचें।",
   "समय एग्ज़िट: यदि तय अवधि (जैसे 15 सत्र) में ट्रेड टारगेट की ओर नहीं गया, तो बेचें और समीक्षा करें।",
   "स्टॉप कभी नीचे न खिसकाएँ। केवल ऊपर ले जाएँ या वैसा ही रखें।"
  ] },
  { h: "रणनीति 5: बिक्री पक्ष (शॉर्ट) स्विंग ट्रेड", p: "स्विंग ट्रेडिंग में शॉर्ट सेलिंग का मतलब है ऐसे शेयर बेचना जो आपके पास नहीं, इस उम्मीद में कि कीमत गिरेगी। भारत में शॉर्ट सेलिंग अनुमत शेयरों और उत्पादों तक सीमित है, और ब्रोकर मार्जिन नियम लगाते हैं। इसे केवल तब इस्तेमाल करें जब नियम और असीमित नुकसान के जोखिम की समझ हो।", ul: [
   "सेटअप: मंदी के ट्रेंड में वॉल्यूम के साथ सपोर्ट के नीचे ब्रेकडाउन, या रेज़िस्टेंस पर बियरिश पलटाव।",
   "स्टॉप-लॉस: टूटे सपोर्ट के ठीक ऊपर, या हाल के स्विंग हाई के ऊपर।",
   "टारगेट: अगला सपोर्ट स्तर, जिसमें इनाम जोखिम का कम से कम दोगुना हो।",
   "ट्रेड से पहले जाँचें कि शेयर शॉर्ट योग्य है, और मार्जिन व सेटलमेंट नियम समझें।"
  ] },
  { h: "स्विंग रणनीति कैसे चुनें", ul: [
   "साफ़ अपट्रेंड वाला बाज़ार: बढ़ते एवरेज पर पुलबैक (रणनीति 2) या ब्रेकआउट (रणनीति 1)।",
   "रेंज वाला बाज़ार: सपोर्ट पर पलटाव (रणनीति 3), रेज़िस्टेंस के पास बेचना।",
   "पहले से चलता मज़बूत ट्रेंड: जीत को बनाए रखने के लिए ट्रेंड-फ़ॉलोइंग एग्ज़िट (रणनीति 4)।",
   "गिरता बाज़ार जिसमें ब्रेकडाउन हो: शॉर्ट सेटअप (रणनीति 5), केवल तब जब अनुमति हो और समझ हो।"
  ] },
  { h: "आम स्विंग रणनीति गलतियाँ", ul: [
   "ऐसा ब्रेकआउट ख़रीदना जो स्तर से 5% आगे निकल चुका हो, जिससे स्टॉप तक जगह कम बचे।",
   "औसत के नीचे स्टॉप लगाए बिना पुलबैक एंट्री लेना।",
   "टारगेट पर पहुँचने पर टारगेट और ऊपर खिसकाना, बजाय मुनाफ़ा लेने या स्टॉप ट्रेल करने के।",
   "पाँचों रणनीतियाँ एक साथ इस्तेमाल करना। एक चुनें, परखें, और नतीजों का जर्नल रखें।"
  ] }
 ]);

 add("intraday-trading", "en", [
  { h: "13. Intraday strategies: buy and sell rules", p: "Intraday strategies must be fast to define and fast to exit. Each one below states the condition, the buy trigger, the stop, the exit, and the time limit. Apply your daily loss limit before using any of them." },
  { h: "Strategy 1: Opening range breakout (ORB)", p: "Mark the high and low of the first 15 minutes. Trade a breakout of that range with volume. Works best on liquid stocks with news or a clear gap.", ul: [
   "Buy: 1-minute or 5-minute close above the opening-range high, with volume above the opening-range average.",
   "Stop-loss: just inside the range (for example the range midpoint or the low).",
   "Target: 1 to 2 times the range height from the breakout, or the previous day's high.",
   "Sell: at target, at the stop, or at a set time (for example 11:30) if the move has stalled. Square off well before the broker's deadline."
  ], p2: "Example: opening range ₹250 to ₹252. Price closes above ₹252 at 9:35 on 1.5 times average volume. Buy 400 shares at ₹252.10, stop ₹251 (risk ₹440), target ₹254.20 (reward ₹840)." },
  { h: "Strategy 2: VWAP pullback (trend day)", p: "On a day where price trades above VWAP, buy pullbacks to VWAP. VWAP is a fair-value line that often acts as support in an uptrend.", ul: [
   "Condition: price has been above VWAP for at least 30 minutes, with higher highs.",
   "Buy: price pulls back to VWAP and bounces, with a bullish candle and volume increasing on the bounce.",
   "Stop-loss: just below VWAP, or the pullback low.",
   "Sell: at the previous high of the day, or trail the stop under each higher low. Exit if price closes below VWAP for two candles."
  ] },
  { h: "Strategy 3: Gap and go", p: "A large gap at the open on news can continue in the direction of the gap if volume stays high. Trade only the first minutes, and avoid it when the gap fades quickly.", ul: [
   "Condition: a gap of at least 2 percent on news, with the first 5-minute candle closing in the gap direction on high volume.",
   "Buy (gap up): break of the first 5-minute high. Sell short only where permitted and with the same rules reversed.",
   "Stop-loss: the first 5-minute low (for a long).",
   "Sell: at 1 to 2 times the initial risk, or when momentum slows (volume falls and the candles shrink)."
  ] },
  { h: "Strategy 4: Mean reversion at Bollinger Bands (range day)", p: "On a range-bound day, price often returns from the bands toward the middle. Use this only when the day is clearly sideways, not trending.", ul: [
   "Condition: no trend in the first hour, ADX below 20, and price bouncing between support and resistance.",
   "Buy: price closes outside the lower Bollinger Band and then closes back inside, with RSI below 30 and turning up.",
   "Stop-loss: a few rupees below the day's low.",
   "Sell: at the middle band (the 20-period average). Do not hold for the upper band on a range day without new confirmation."
  ] },
  { h: "Strategy 5: Momentum breakout with volume", p: "Trade a breakout from a short consolidation (for example 30 minutes) when volume surges. This is a continuation trade in a stock already moving.", ul: [
   "Buy: break above the consolidation high with volume at least 2 times the 5-minute average.",
   "Stop-loss: below the consolidation low.",
   "Sell: scale out in parts. Take half at 1 times risk, trail the rest under each new 5-minute higher low.",
   "Avoid: breakouts in the last 30 minutes before the square-off time, when moves reverse quickly."
  ] },
  { h: "Exit strategies that protect intraday profits", ul: [
   "Scale out: take part of the position at the first target and let the rest run with a trailing stop.",
   "Time stop: close the position at a set time (for example 14:45) if it has not worked.",
   "Daily profit lock: after a set profit, stop trading for the day to protect gains.",
   "Hard exit: square off before the broker's deadline, whatever the price."
  ] },
  { h: "Choosing an intraday strategy", ul: [
   "Open with a gap or news: gap and go (Strategy 3) or opening range breakout (Strategy 1).",
   "Strong trend after the first hour: VWAP pullback (Strategy 2).",
   "Sideways, low-trend day: mean reversion (Strategy 4), with small size.",
   "Stock already moving on volume: momentum breakout (Strategy 5)."
  ] },
  { h: "Common intraday strategy mistakes", ul: [
   "Entering late after the move has already happened, so the stop is far away.",
   "Changing the stop after entry because the price is close to it.",
   "Trading several strategies in one day without a plan for each.",
   "Ignoring costs: small targets can be wiped out by brokerage, charges and slippage."
  ] }
 ]);

 add("intraday-trading", "hi", [
  { h: "13. इंट्राडे रणनीतियाँ: ख़रीद और बिक्री के नियम", p: "इंट्राडे रणनीतियों को जल्दी परिभाषित और जल्दी बाहर निकलने योग्य होना चाहिए। नीचे हर एक में शर्त, ख़रीद का ट्रिगर, स्टॉप, एग्ज़िट और समय सीमा लिखी है। किसी भी रणनीति से पहले अपनी दैनिक नुकसान सीमा लागू करें।" },
  { h: "रणनीति 1: ओपनिंग रेंज ब्रेकआउट (ORB)", p: "पहले 15 मिनट का हाई और लो चिह्नित करें। वॉल्यूम के साथ उस रेंज का ब्रेकआउट ट्रेड करें। समाचार या साफ़ गैप वाले लिक्विड शेयरों पर सबसे अच्छा।", ul: [
   "ख़रीद: 1-मिनट या 5-मिनट कैंडल का ओपनिंग रेंज हाई के ऊपर क्लोज़, औसत से ज़्यादा वॉल्यूम के साथ।",
   "स्टॉप-लॉस: रेंज के ठीक अंदर (जैसे रेंज का मध्य या लो)।",
   "टारगेट: ब्रेकआउट से रेंज की ऊँचाई का 1 से 2 गुना, या पिछले दिन का हाई।",
   "बिक्री: टारगेट पर, स्टॉप पर, या तय समय (जैसे 11:30) पर यदि चाल रुक गई हो। ब्रोकर की समय-सीमा से काफ़ी पहले बंद करें।"
  ], p2: "उदाहरण: ओपनिंग रेंज ₹250 से ₹252। 9:35 पर कीमत ₹252 के ऊपर औसत के 1.5 गुना वॉल्यूम पर क्लोज़। ₹252.10 पर 400 शेयर ख़रीदें, स्टॉप ₹251 (जोखिम ₹440), टारगेट ₹254.20 (इनाम ₹840)।" },
  { h: "रणनीति 2: VWAP पुलबैक (ट्रेंड वाला दिन)", p: "जिस दिन कीमत VWAP के ऊपर ट्रेड करे, तब VWAP तक गिरावट पर ख़रीदें। VWAP उचित मूल्य की रेखा है, जो अपट्रेंड में अक्सर सपोर्ट का काम करती है।", ul: [
   "शर्त: कीमत कम से कम 30 मिनट से VWAP के ऊपर, ऊँचे हाई के साथ।",
   "ख़रीद: कीमत VWAP तक पुलबैक करे और उछाले, तेज़ी वाली कैंडल और उछाल पर बढ़ता वॉल्यूम।",
   "स्टॉप-लॉस: VWAP के ठीक नीचे, या पुलबैक के लो के नीचे।",
   "बिक्री: दिन के पिछले हाई पर, या हर हायर लो के नीचे स्टॉप ट्रेल करें। दो कैंडल VWAP के नीचे क्लोज़ हों तो निकलें।"
  ] },
  { h: "रणनीति 3: गैप एंड गो", p: "समाचार पर ओपन पर बड़ा गैप, यदि वॉल्यूम ऊँचा रहे, तो गैप की दिशा में चल सकता है। केवल पहले मिनटों में ट्रेड करें, और गैप जल्दी ख़त्म हो तो न करें।", ul: [
   "शर्त: समाचार पर कम से कम 2% का गैप, और पहली 5-मिनट कैंडल गैप की दिशा में ऊँचे वॉल्यूम पर क्लोज़।",
   "ख़रीद (गैप अप): पहली 5-मिनट के हाई का ब्रेक। शॉर्ट केवल जहाँ अनुमति हो, उलटे नियमों के साथ।",
   "स्टॉप-लॉस: पहली 5-मिनट के लो पर (लॉन्ग के लिए)।",
   "बिक्री: प्रारंभिक जोखिम का 1 से 2 गुना, या जब गति धीमी हो (वॉल्यूम गिरे और कैंडल छोटी हों)।"
  ] },
  { h: "रणनीति 4: बोलिंगर बैंड पर माध्य की ओर वापसी (रेंज वाला दिन)", p: "रेंज वाले दिन कीमत अक्सर बैंड से बीच की ओर लौटती है। इसे केवल तब इस्तेमाल करें जब दिन साफ़ तौर पर साइडवे हो, ट्रेंडिंग न हो।", ul: [
   "शर्त: पहले घंटे में कोई ट्रेंड नहीं, ADX 20 से नीचे, और कीमत सपोर्ट और रेज़िस्टेंस के बीच उछल रही हो।",
   "ख़रीद: कीमत निचले बोलिंगर बैंड के नीचे क्लोज़ होकर फिर बैंड के अंदर क्लोज़ हो, RSI 30 से नीचे और ऊपर मुड़ता हुआ।",
   "स्टॉप-लॉस: दिन के लो के कुछ रुपये नीचे।",
   "बिक्री: मध्य बैंड (20-अवधि एवरेज) पर। रेंज वाले दिन नई पुष्टि के बिना ऊपरी बैंड का इंतज़ार न करें।"
  ] },
  { h: "रणनीति 5: वॉल्यूम के साथ मोमेंटम ब्रेकआउट", p: "जब वॉल्यूम बढ़े तो छोटे समेकन (जैसे 30 मिनट) के ब्रेकआउट पर ट्रेड करें। यह पहले से चल रहे शेयर में निरंतरता का ट्रेड है।", ul: [
   "ख़रीद: समेकन के हाई के ऊपर ब्रेक, 5-मिनट औसत के कम से कम 2 गुना वॉल्यूम के साथ।",
   "स्टॉप-लॉस: समेकन के लो के नीचे।",
   "बिक्री: हिस्सों में निकलें। जोखिम के 1 गुना पर आधा बेचें, बाकी को हर नए 5-मिनट हायर लो के नीचे ट्रेल करें।",
   "बचें: स्क्वेयर-ऑफ़ से पहले आख़िरी 30 मिनट में ब्रेकआउट, जब चालें तेज़ी से पलटती हैं।"
  ] },
  { h: "इंट्राडे लाभ बचाने वाली एग्ज़िट रणनीतियाँ", ul: [
   "हिस्से में बिक्री: पहले टारगेट पर कुछ पोज़िशन बेचें और बाकी को ट्रेलिंग स्टॉप के साथ चलने दें।",
   "समय स्टॉप: यदि पोज़िशन काम नहीं की तो तय समय (जैसे 14:45) पर बंद करें।",
   "दैनिक लाभ लॉक: एक तय लाभ के बाद उस दिन ट्रेडिंग रोकें ताकि लाभ बचा रहे।",
   "अंतिम एग्ज़िट: ब्रोकर की समय सीमा से पहले, कीमत जो भी हो, बंद करें।"
  ] },
  { h: "इंट्राडे रणनीति कैसे चुनें", ul: [
   "गैप या समाचार से शुरुआत: गैप एंड गो (रणनीति 3) या ओपनिंग रेंज ब्रेकआउट (रणनीति 1)।",
   "पहले घंटे के बाद मज़बूत ट्रेंड: VWAP पुलबैक (रणनीति 2)।",
   "साइडवे, कम ट्रेंड वाला दिन: माध्य की ओर वापसी (रणनीति 4), छोटे साइज़ के साथ।",
   "शेयर पहले से वॉल्यूम पर चल रहा हो: मोमेंटम ब्रेकआउट (रणनीति 5)।"
  ] },
  { h: "आम इंट्राडे रणनीति गलतियाँ", ul: [
   "चाल हो चुकने के बाद देर से एंट्री, जिससे स्टॉप बहुत दूर हो।",
   "एंट्री के बाद स्टॉप इसलिए बदलना क्योंकि कीमत उसके पास है।",
   "हर रणनीति की योजना के बिना एक दिन में कई रणनीतियाँ आज़माना।",
   "लागत को अनदेखा करना: छोटे टारगेट ब्रोकरेज, चार्ज और स्लिपेज में मिट सकते हैं।"
  ] }
 ]);

 add("futures-options", "en", [
  { h: "13. F&O strategies: buy and sell rules", p: "Options and futures strategies are chosen by three questions: which way do you expect the price to move, how big the move might be, and how expensive options are (implied volatility). The table below links the view to a strategy. Limit risk before you place any order, and check margin and lot size." },
  { h: "Choosing a strategy: view and volatility", ul: [
   "Strongly bullish, options cheap (low IV): buy a call or a bull call spread.",
   "Strongly bearish, options cheap: buy a put or a bear put spread.",
   "Mildly bullish, options expensive (high IV): sell a put spread (bull put spread), with defined risk.",
   "Mildly bearish, options expensive: sell a call spread (bear call spread), with defined risk.",
   "Range-bound, options expensive: iron condor, with defined risk.",
   "Big move expected, options cheap: long straddle or strangle (buy both a call and a put)."
  ] },
  { h: "Strategy 1: Long call (bullish, limited risk)", p: "Buy a call when you expect a clear rise before expiry. Maximum loss is the premium paid.", ul: [
   "Buy: call at or slightly above the current price, with enough time to expiry for the move to happen.",
   "Stop-loss: exit when the premium falls by a set percentage (for example 40 percent), or if the underlying closes below your technical level.",
   "Sell: at a target on the underlying (for example the resistance level), or when the premium reaches your target. Avoid holding into expiry without a plan."
  ], p2: "Example: buy a 24,000 call for ₹150, lot 50, risk ₹7,500. Exit when the index reaches 24,300 (intrinsic ₹300, premium about ₹300), profit about ₹7,500 before costs." },
  { h: "Strategy 2: Long put (bearish, limited risk)", p: "Buy a put when you expect a clear fall. Maximum loss is the premium paid. The mirror image of the long call.", ul: [
   "Buy: put at or slightly below the current price, with enough time to expiry.",
   "Stop-loss: exit at a set premium loss, or if price closes above the level that proves the view wrong.",
   "Sell: at the support target, or when the premium reaches your target."
  ] },
  { h: "Strategy 3: Bull call spread (bullish, defined risk)", p: "Buy a lower-strike call and sell a higher-strike call with the same expiry. It is cheaper than a naked call and caps both profit and loss.", ul: [
   "Buy: lower strike call and sell higher strike call, same expiry, at a moderate upside target.",
   "Maximum loss: the net debit paid. Maximum profit: the strike difference minus the net debit.",
   "Sell: close the spread at 50 to 70 percent of the maximum profit, or at expiry if the price is above the higher strike."
  ], p2: "Example: buy 24,000 call at ₹200, sell 24,500 call at ₹80. Net debit ₹120. Max profit ₹380 (500 − 120), max loss ₹120, break-even 24,120. Close at ₹300 profit (about 80 percent of max) to lock gains." },
  { h: "Strategy 4: Bear put spread (bearish, defined risk)", p: "Buy a higher-strike put and sell a lower-strike put. The bearish version of the bull call spread.", ul: [
   "Buy: higher strike put and sell lower strike put, same expiry.",
   "Maximum loss: the net debit. Maximum profit: strike difference minus net debit.",
   "Sell: at 50 to 70 percent of maximum profit, or when the target level is reached."
  ] },
  { h: "Strategy 5: Covered call (income on shares you hold)", p: "If you own shares and expect them to stay flat or rise slowly, sell a call against them to earn premium. You give up gains above the strike.", ul: [
   "Setup: hold at least one lot of shares (or the matching quantity), and sell an out-of-the-money call.",
   "Choose a strike at or above your target price for the shares, with a month or so to expiry.",
   "Manage: if price rises above the strike, you may be assigned at the strike. Decide before expiry whether to roll the call.",
   "Downside: the premium cushions a small fall, but the shares can still lose value."
  ] },
  { h: "Strategy 6: Protective put (hedge)", p: "Buy a put to protect shares or an index position from a sharp fall, at the cost of the premium.", ul: [
   "Setup: hold the shares, and buy a put near or slightly below the current price.",
   "Cost: the premium. Compare it with the value of the protection you want.",
   "Sell: let the put expire if the market rises, or sell it to recover value if the fall happens and the hedge is no longer needed."
  ], p2: "Example: hold shares worth ₹5,00,000 and buy an index put costing 1 percent of the value. A 10 percent fall loses ₹50,000 on shares but the put gains roughly the difference, reducing the net loss." },
  { h: "Strategy 7: Iron condor (range-bound, high IV, defined risk)", p: "Sell an out-of-the-money put spread and an out-of-the-money call spread. You profit if price stays between the two short strikes until expiry.", ul: [
   "Condition: range-bound market, no major event before expiry, implied volatility high.",
   "Build: sell a put and buy a lower put; sell a call and buy a higher call, same expiry.",
   "Maximum profit: the net credit received. Maximum loss: the strike width minus the credit.",
   "Exit: close at 50 percent of the credit received, or if price tests one of the short strikes; never hold through expiry without checking assignment rules."
  ] },
  { h: "Strategy 8: Long straddle or strangle (big move expected)", p: "Buy a call and a put at the same strike (straddle) or at different strikes (strangle). You profit from a large move in either direction. Costly if the move does not come.", ul: [
   "Condition: a major event such as results or a policy decision, with implied volatility not already very high.",
   "Build: buy an at-the-money call and put (straddle), or out-of-the-money call and put (strangle, cheaper).",
   "Breakeven: the strike plus or minus the total premium.",
   "Exit: sell after the event, before implied volatility collapses. Volatility crush can cost you even if the price moves."
  ] },
  { h: "Strategy 9: Futures trend trade with a stop", p: "Trade a breakout in the index or stock future, with a fixed stop, when the trend is clear.", ul: [
   "Buy: break above resistance on volume, with the higher timeframe trend up.",
   "Stop-loss: below the breakout low, sized so that the loss equals your planned risk (use ATR).",
   "Sell: at a target equal to 2 times the risk, or trail the stop under each higher swing low.",
   "Margin: keep extra margin above the minimum to avoid forced exits."
  ] },
  { h: "Sell rules for every F&O position", ul: [
   "Decide the exit before entry: the premium stop, the underlying level and the target.",
   "Close or roll well before expiry, especially in the last 2 to 3 sessions when time decay and gamma risk are highest.",
   "Track the Greeks: delta for direction, theta for daily cost or income, vega for volatility risk.",
   "Watch margin: a sudden rise in volatility can increase margin and force an exit."
  ] },
  { h: "Common F&O strategy mistakes", ul: [
   "Buying cheap out-of-the-money options with no clear reason for the move.",
   "Selling naked options without a hedge or a defined-risk alternative.",
   "Holding losing option positions into expiry, hoping for a last-minute reversal.",
   "Using the wrong strategy for the view: for example, buying options when volatility is very high before an event.",
   "Ignoring costs, margin and lot size, which can turn a correct view into a loss."
  ] }
 ]);

 add("futures-options", "hi", [
  { h: "13. F&O रणनीतियाँ: ख़रीद और बिक्री के नियम", p: "ऑप्शन और फ्यूचर्स की रणनीति तीन सवालों से चुनी जाती है: कीमत किस दिशा में जाने की उम्मीद है, चाल कितनी बड़ी हो सकती है, और ऑप्शन कितने महँगे हैं (इम्प्लाइड वोलैटिलिटी)। नीचे की तालिका नज़रिए को रणनीति से जोड़ती है। कोई ऑर्डर देने से पहले जोखिम सीमित करें, और मार्जिन व लॉट साइज़ जाँचें।" },
  { h: "रणनीति चुनना: नज़रिया और अस्थिरता", ul: [
   "मज़बूत तेज़ी, ऑप्शन सस्ते (कम IV): कॉल या बुल कॉल स्प्रेड ख़रीदें।",
   "मज़बूत मंदी, ऑप्शन सस्ते: पुट या बियर पुट स्प्रेड ख़रीदें।",
   "हल्की तेज़ी, ऑप्शन महँगे (ऊँचा IV): बुल पुट स्प्रेड बेचें, तय जोखिम के साथ।",
   "हल्की मंदी, ऑप्शन महँगे: बियर कॉल स्प्रेड बेचें, तय जोखिम के साथ।",
   "रेंज में, ऑप्शन महँगे: आयरन कंडोर, तय जोखिम के साथ।",
   "बड़ी चाल की उम्मीद, ऑप्शन सस्ते: लॉन्ग स्ट्रैडल या स्ट्रैंगल (कॉल और पुट दोनों ख़रीदें)।"
  ] },
  { h: "रणनीति 1: लॉन्ग कॉल (तेज़ी, सीमित जोखिम)", p: "जब आपको एक्सपायरी से पहले साफ़ बढ़त की उम्मीद हो, तब कॉल ख़रीदें। अधिकतम नुकसान चुकाया गया प्रीमियम है।", ul: [
   "ख़रीद: मौजूदा कीमत पर या उसके थोड़ा ऊपर की कॉल, इतनी एक्सपायरी अवधि के साथ कि चाल हो सके।",
   "स्टॉप-लॉस: प्रीमियम एक तय प्रतिशत (जैसे 40%) गिरने पर निकलें, या अगर अंतर्निहित तकनीकी स्तर के नीचे क्लोज़ हो।",
   "बिक्री: अंतर्निहित के टारगेट (जैसे रेज़िस्टेंस) पर, या प्रीमियम आपके टारगेट तक पहुँचने पर। बिना योजना एक्सपायरी तक न रखें।"
  ], p2: "उदाहरण: 24,000 कॉल ₹150 पर ख़रीदें, लॉट 50, जोखिम ₹7,500। इंडेक्स 24,300 पर पहुँचे तो निकलें (आंतरिक ₹300, प्रीमियम लगभग ₹300), खर्च से पहले लाभ लगभग ₹7,500।" },
  { h: "रणनीति 2: लॉन्ग पुट (मंदी, सीमित जोखिम)", p: "साफ़ गिरावट की उम्मीद हो तो पुट ख़रीदें। अधिकतम नुकसान चुकाया गया प्रीमियम है। यह लॉन्ग कॉल का उल्टा रूप है।", ul: [
   "ख़रीद: मौजूदा कीमत पर या उसके थोड़ा नीचे का पुट, पर्याप्त एक्सपायरी अवधि के साथ।",
   "स्टॉप-लॉस: तय प्रीमियम नुकसान पर, या कीमत उस स्तर के ऊपर क्लोज़ हो जो नज़रिए को ग़लत साबित करे।",
   "बिक्री: सपोर्ट के टारगेट पर, या प्रीमियम आपके टारगेट तक पहुँचने पर।"
  ] },
  { h: "रणनीति 3: बुल कॉल स्प्रेड (तेज़ी, तय जोखिम)", p: "उसी एक्सपायरी की एक निचली स्ट्राइक कॉल ख़रीदें और ऊँची स्ट्राइक कॉल बेचें। यह नेकेड कॉल से सस्ता है और लाभ व नुकसान दोनों सीमित करता है।", ul: [
   "ख़रीद: निचली स्ट्राइक कॉल ख़रीदें और ऊँची स्ट्राइक कॉल बेचें, एक ही एक्सपायरी पर, मध्यम ऊपरी टारगेट के साथ।",
   "अधिकतम नुकसान: चुकाया नेट डेबिट। अधिकतम लाभ: स्ट्राइक का अंतर घटा नेट डेबिट।",
   "बिक्री: अधिकतम लाभ के 50 से 70 प्रतिशत पर स्प्रेड बंद करें, या एक्सपायरी पर यदि कीमत ऊँची स्ट्राइक से ऊपर हो।"
  ], p2: "उदाहरण: 24,000 कॉल ₹200 पर ख़रीदें, 24,500 कॉल ₹80 पर बेचें। नेट डेबिट ₹120। अधिकतम लाभ ₹380 (500 − 120), अधिकतम नुकसान ₹120, ब्रेक-ईवन 24,120। ₹300 लाभ (अधिकतम का लगभग 80%) पर बंद करें।" },
  { h: "रणनीति 4: बियर पुट स्प्रेड (मंदी, तय जोखिम)", p: "ऊँची स्ट्राइक का पुट ख़रीदें और निचली स्ट्राइक का पुट बेचें। बुल कॉल स्प्रेड का मंदी वाला रूप।", ul: [
   "ख़रीद: ऊँची स्ट्राइक पुट ख़रीदें और निचली स्ट्राइक पुट बेचें, एक ही एक्सपायरी पर।",
   "अधिकतम नुकसान: नेट डेबिट। अधिकतम लाभ: स्ट्राइक का अंतर घटा नेट डेबिट।",
   "बिक्री: अधिकतम लाभ के 50 से 70 प्रतिशत पर, या टारगेट स्तर पहुँचने पर।"
  ] },
  { h: "रणनीति 5: कवर्ड कॉल (आपके शेयरों पर आय)", p: "यदि आपके पास शेयर हैं और आप उम्मीद करते हैं कि वे स्थिर रहें या धीरे बढ़ें, तो उन पर कॉल बेचकर प्रीमियम कमाएँ। स्ट्राइक से ऊपर का लाभ छूट जाता है।", ul: [
   "सेटअप: कम से कम एक लॉट शेयर (या मिलती-जुलती मात्रा) रखें, और आउट-ऑफ़-द-मनी कॉल बेचें।",
   "स्ट्राइक शेयरों के टारगेट के बराबर या ऊपर, लगभग एक महीने की एक्सपायरी के साथ।",
   "प्रबंधन: कीमत स्ट्राइक से ऊपर जाए तो स्ट्राइक पर असाइनमेंट हो सकता है। एक्सपायरी से पहले तय करें कि कॉल रोल करें या नहीं।",
   "नीचे का जोखिम: प्रीमियम छोटी गिरावट को सहारा देता है, पर शेयर फिर भी घट सकते हैं।"
  ] },
  { h: "रणनीति 6: प्रोटेक्टिव पुट (हेजिंग)", p: "तेज़ गिरावट से शेयर या इंडेक्स पोज़िशन की रक्षा के लिए पुट ख़रीदें, प्रीमियम की लागत पर।", ul: [
   "सेटअप: शेयर रखें, और मौजूदा कीमत के पास या थोड़ा नीचे का पुट ख़रीदें।",
   "लागत: प्रीमियम। इसकी तुलना उस सुरक्षा के मूल्य से करें जो आप चाहते हैं।",
   "बिक्री: बाज़ार बढ़े तो पुट को एक्सपायर होने दें; गिरावट आ जाए और हेज की ज़रूरत न रहे तो बेचकर मूल्य वापस लें।"
  ], p2: "उदाहरण: ₹5,00,000 के शेयर हैं, और मूल्य का 1% लागत वाला इंडेक्स पुट ख़रीदते हैं। 10% गिरावट पर शेयरों में ₹50,000 घटते हैं, पर पुट का लाभ लगभग उस अंतर जितना, जिससे शुद्ध नुकसान घटता है।" },
  { h: "रणनीति 7: आयरन कंडोर (रेंज, ऊँचा IV, तय जोखिम)", p: "आउट-ऑफ़-द-मनी पुट स्प्रेड और आउट-ऑफ़-द-मनी कॉल स्प्रेड बेचें। एक्सपायरी तक कीमत दो छोटी स्ट्राइक के बीच रहे तो लाभ होता है।", ul: [
   "शर्त: रेंज वाला बाज़ार, एक्सपायरी से पहले कोई बड़ी घटना नहीं, और इम्प्लाइड वोलैटिलिटी ऊँची।",
   "निर्माण: एक पुट बेचें और एक निचला पुट ख़रीदें; एक कॉल बेचें और एक ऊँची कॉल ख़रीदें, एक ही एक्सपायरी पर।",
   "अधिकतम लाभ: मिला नेट क्रेडिट। अधिकतम नुकसान: स्ट्राइक की चौड़ाई घटा क्रेडिट।",
   "एग्ज़िट: मिले क्रेडिट के 50 प्रतिशत पर बंद करें, या यदि कीमत किसी छोटी स्ट्राइक को छुए। असाइनमेंट नियम जाँचे बिना एक्सपायरी तक न रखें।"
  ] },
  { h: "रणनीति 8: लॉन्ग स्ट्रैडल या स्ट्रैंगल (बड़ी चाल की उम्मीद)", p: "एक ही स्ट्राइक पर कॉल और पुट (स्ट्रैडल) या अलग स्ट्राइक पर (स्ट्रैंगल) ख़रीदें। किसी भी दिशा में बड़ी चाल से लाभ। चाल न आए तो महँगा।", ul: [
   "शर्त: नतीजे या नीति निर्णय जैसी बड़ी घटना, और इम्प्लाइड वोलैटिलिटी पहले से बहुत ऊँची न हो।",
   "निर्माण: एट-द-मनी कॉल और पुट (स्ट्रैडल), या आउट-ऑफ़-द-मनी कॉल और पुट (स्ट्रैंगल, सस्ता)।",
   "ब्रेक-ईवन: स्ट्राइक ± कुल प्रीमियम।",
   "एग्ज़िट: घटना के बाद, इम्प्लाइड वोलैटिलिटी गिरने से पहले बेचें। वोलैटिलिटी क्रश कीमत चलने पर भी नुकसान करा सकता है।"
  ] },
  { h: "रणनीति 9: स्टॉप के साथ फ्यूचर्स ट्रेंड ट्रेड", p: "जब ट्रेंड साफ़ हो, तब इंडेक्स या शेयर फ्यूचर्स में तय स्टॉप के साथ ब्रेकआउट ट्रेड करें।", ul: [
   "ख़रीद: वॉल्यूम के साथ रेज़िस्टेंस के ऊपर ब्रेक, ऊँची समय-सीमा का ट्रेंड ऊपर।",
   "स्टॉप-लॉस: ब्रेकआउट लो के नीचे, इस तरह कि नुकसान आपके नियोजित जोखिम के बराबर हो (ATR का उपयोग)।",
   "बिक्री: जोखिम के 2 गुना टारगेट पर, या हर हायर स्विंग लो के नीचे स्टॉप ट्रेल करें।",
   "मार्जिन: न्यूनतम मार्जिन से ऊपर अतिरिक्त मार्जिन रखें ताकि ज़बरन एग्ज़िट न हो।"
  ] },
  { h: "हर F&O पोज़िशन के लिए बिक्री के नियम", ul: [
   "एंट्री से पहले एग्ज़िट तय करें: प्रीमियम का स्टॉप, अंतर्निहित का स्तर और टारगेट।",
   "एक्सपायरी से काफ़ी पहले बंद करें या रोल करें, ख़ासकर आख़िरी 2 से 3 सत्रों में, जब समय-क्षय और गामा जोखिम सबसे ज़्यादा होता है।",
   "ग्रीक्स पर नज़र रखें: दिशा के लिए डेल्टा, रोज़ की लागत या आय के लिए थीटा, अस्थिरता जोखिम के लिए वेगा।",
   "मार्जिन देखें: अचानक अस्थिरता बढ़ने से मार्जिन बढ़ सकता है और ज़बरन एग्ज़िट हो सकता है।"
  ] },
  { h: "आम F&O रणनीति गलतियाँ", ul: [
   "बिना स्पष्ट कारण के सस्ते आउट-ऑफ़-द-मनी ऑप्शन ख़रीदना।",
   "हेज या तय जोखिम वाले विकल्प के बिना नेकेड ऑप्शन बेचना।",
   "आख़िरी समय में पलटाव की उम्मीद में घाटे वाली ऑप्शन पोज़िशन एक्सपायरी तक रखना।",
   "नज़रिए के लिए ग़लत रणनीति: जैसे किसी घटना से पहले बहुत ऊँची अस्थिरता पर ऑप्शन ख़रीदना।",
   "लागत, मार्जिन और लॉट साइज़ को अनदेखा करना, जो सही नज़रिए को भी नुकसान में बदल सकता है।"
  ] }
 ]);
})();
