// Expanded content (English and Hindi): Technical Indicators, Swing Trading, Risk Management.
// Overrides the sections in lessons.js. Indicator cards are added automatically by lesson.js.
Object.assign(LESSON_OVERRIDES.en, {
 "technical-indicators": { sections: [
  { h: "1. What an indicator is", p: "An indicator is a calculation applied to price, volume or both. It turns raw data into a line, a band or an oscillator that is easier to read. Every indicator is a lagging summary of the past. Use them to describe the current state of the market and to manage risk, not to predict the next price with certainty." },
  { h: "2. The four families", ul: [
   "Trend indicators (moving averages, ADX): tell you the direction and, for ADX, the strength of the trend.",
   "Momentum indicators (RSI, MACD, stochastic): measure the speed of price moves and whether they are speeding up or slowing down.",
   "Volatility indicators (Bollinger Bands, ATR): show how much price moves, which sets expectations and stop distances.",
   "Volume indicators (volume, OBV, VWAP): show whether a move has participation behind it."
  ], p2: "A simple set for beginners: one trend tool, one momentum tool, one volatility tool for risk, and volume." },
  { h: "3. Moving averages: direction and support", p: "A moving average smooths price. The 20, 50 and 200-period averages are the most watched. Price above a rising average suggests an uptrend; below a falling average suggests a downtrend. Averages can also act as dynamic support or resistance. Crossovers, such as a 50-period average crossing above a 200-period average (golden cross), are widely watched but lag.", p2: "Example: the 20-period EMA is at ₹248 and rising, price pulls back to ₹249 and bounces with volume. Many traders see this as a trend-following entry, with a stop below ₹244." },
  { h: "4. RSI: momentum and overbought zones", p: "RSI compares the size of recent gains with recent losses over 14 periods, on a 0 to 100 scale. A reading above 70 is called overbought and below 30 oversold. In a strong uptrend, RSI often stays between 40 and 80. Pullbacks to the 40 to 50 zone in an uptrend are a common use.", p2: "Example: RSI drops to 42 during a pullback in an uptrend and turns up. That is a pullback entry signal for trend traders, not a sell signal." },
  { h: "5. MACD: trend and momentum together", p: "MACD subtracts a 26-period EMA from a 12-period EMA. The signal line is a 9-period EMA of MACD. The histogram shows the gap between them. A MACD line crossing above the signal line is a bullish momentum signal. Crossings below zero are usually weaker than crossings above zero. Shrinking histogram bars warn that momentum is slowing before the cross happens." },
  { h: "6. Stochastic: where the close sits in the range", p: "The stochastic oscillator shows where the latest close sits within the recent high-low range. Readings above 80 suggest overbought and below 20 oversold. It is quick and useful in sideways markets, but in strong trends it can stay overbought for a long time. Use it to time entries near the edges of a range." },
  { h: "7. Bollinger Bands: volatility and extremes", p: "Bollinger Bands place two bands two standard deviations above and below a 20-period average. Most price action stays inside. Narrow bands (a squeeze) often come before a larger move. Price touching a band is not a signal by itself; a close outside the band with volume is more meaningful. In a strong trend, price can ride along a band." },
  { h: "8. ATR: the most practical risk tool", p: "ATR (average true range) measures the average daily range over 14 periods. It is not a direction tool. Use it to set stops and size positions: a stop 2 times ATR away gives normal noise room, and the position size is set so the loss at that stop equals your planned risk.", p2: "Example: ATR is ₹4, entry ₹250, stop 2 × ATR = ₹8 below, so stop ₹242. With ₹1,000 maximum loss, size = 1,000 ÷ 8 = 125 shares." },
  { h: "9. ADX: is the market trending at all?", p: "ADX measures trend strength on a 0 to 100 scale, without direction. Readings below 20 suggest a weak trend or a range; above 25 suggest a trend. The +DI and -DI lines show direction. A rising ADX above 25 with +DI above -DI supports trend-following entries. A falling ADX from high levels often means the trend is tiring." },
  { h: "10. Volume, OBV and VWAP", ul: [
   "Volume: compare each candle's volume with a 20-period average. Breakouts need above-average volume to be trusted.",
   "OBV (on-balance volume): a running total that adds volume on up days and subtracts on down days. If price makes a new high but OBV does not, buyers are weakening.",
   "VWAP (volume-weighted average price): the average price for the session, weighted by volume. Intraday traders use it to see whether buyers or sellers control the day."
  ] },
  { h: "11. Building a set that works together", p: "Choose one tool from each family you need. Example for a swing trader: 20 and 50 EMA (trend), RSI (timing of pullbacks), ATR (stops and size), volume (confirmation). Check that the tools agree before acting. If trend says buy, momentum says overbought and volume is falling, wait." },
  { h: "12. Testing an indicator before you trust it", p: "Pick the rule before you look at results: for example, buy when RSI crosses above 30 in an uptrend, exit at a 2 times ATR target or a stop. Write down 30 to 50 signals on past charts, including the losing ones. Count the win rate, average win and average loss. An indicator is worth keeping only if the average result after costs is positive." },
  { h: "13. Common indicator mistakes", ul: [
   "Adding indicators until the chart looks busy. More tools do not mean more certainty.",
   "Changing settings after seeing the result. Pick settings in advance and keep them.",
   "Treating overbought and oversold as automatic sell and buy signals in a strong trend.",
   "Ignoring the timeframe. An indicator on a 5-minute chart can contradict the daily chart.",
   "Using lagging indicators alone for exits, which leaves profits behind."
  ] }
 ] },
 "swing-trading": { sections: [
  { h: "1. What swing trading is", p: "Swing trading holds positions for days to a few weeks to capture a price swing. It sits between intraday trading (same day) and investing (months or years). It suits people with a job who can check the market once or twice a day, but it needs patience, a clear plan and a journal." },
  { h: "2. The time you give a trade", p: "A swing trade is not an investment and not a day trade. You enter because of a setup, and you plan the maximum time you will hold it. If the trade does not move within that time, the setup has failed, and you exit even if the loss is small. Holding a losing trade for months is a different strategy, and it usually goes wrong.", ul: [
   "Typical holding period: 3 to 20 sessions, decided before entry.",
   "Overnight holding: gaps can open far beyond your stop, so position size must allow for this.",
   "Market hours: you can plan on the daily chart after the close, and place orders for the next session."
  ] },
  { h: "3. Setups: the reasons to enter", p: "A setup is a repeatable situation with a clear rule. Common swing setups are a breakout above resistance on volume, a pullback to a rising moving average in an uptrend, a bullish reversal candle at support, and a range breakout after a squeeze. Write each setup as a rule, for example: close above the 20-day high with volume 1.5 times average, in an uptrend (price above the 50-day average)." },
  { h: "4. Entry, stop and target: the complete plan", ul: [
   "Entry: the price or condition that triggers the trade, for example a close above ₹250.",
   "Stop-loss: where the idea is proven wrong, for example below the last swing low at ₹240. Place it before you enter.",
   "Target: the level where you take profit, for example previous resistance at ₹270, or a multiple of risk.",
   "Reward-to-risk: (target − entry) ÷ (entry − stop). Example: (270 − 250) ÷ (250 − 240) = 2. Many traders require at least 2."
  ] },
  { h: "5. Position sizing: the most important number", p: "Decide the maximum loss you accept on one trade, usually 0.5% to 2% of capital. The position size follows from the stop distance, not from how confident you feel.", p2: "Example: capital ₹1,00,000, risk 1% = ₹1,000. Entry ₹250, stop ₹240. Risk per share ₹10. Shares = 1,000 ÷ 10 = 100. Position value = ₹25,000 (25% of capital). The stop limits the loss to about ₹1,000 before costs and any gap." },
  { h: "6. Trade management after entry", p: "Once in a trade, the plan decides your actions, not emotion. Move the stop up only as the trade proves itself, for example to break-even after the price moves 1 times the risk. Take partial profits at the first target if you want, and let the rest run with a trailing stop. Never widen a stop to avoid a loss.", ul: [
   "Move to break-even after a move equal to your initial risk (example: +₹10 on a ₹10 risk).",
   "Trail the stop below higher swing lows, or below a moving average.",
   "Exit at the time limit if the trade has gone nowhere."
  ] },
  { h: "7. Gaps: the risk that breaks stops", p: "A gap is when the price opens far above or below the previous close, usually after news. A stop is an order to exit at a price, but in a gap the first available price may be much worse. Example: stop at ₹240, bad news, the stock opens at ₹230. The loss is ₹20 per share, double the planned ₹10. Reduce size before holding through events such as results, budgets and policy announcements." },
  { h: "8. Sector and market context", p: "A good stock in a weak sector or a falling market often fails. Check the index trend and the sector trend before entering. Swing traders who follow strong sectors and the broad market tend to have higher success rates than those who trade single stocks in isolation." },
  { h: "9. Keeping a swing trading journal", p: "Record the setup, reason, date, entry, stop, target, size, exit, result in rupees and in R (multiples of risk), and any mistake. Review monthly. Common findings: setups that do not work for you, exits that come too early, and stops that move against the plan." },
  { h: "10. A worked example from start to finish", p: "A stock closes above its 20-day high at ₹250 with volume 1.5 times average, in an uptrend. You buy 100 shares at ₹250 with a stop at ₹240 and a target at ₹270. Three days later the price reaches ₹262; you move the stop to ₹250 (break-even). Two days later price falls back to ₹250 and exits. Loss: 0 before costs. Next setup: another breakout. The example shows that the stop protects the account even when the trade does not go your way." },
  { h: "11. Common swing trading mistakes", ul: [
   "Entering without a stop because the setup looks strong.",
   "Moving the stop further away when the price approaches it.",
   "Holding through earnings without deciding to do so.",
   "Adding to a losing position to average down.",
   "Trading too many setups at once, which leaves no capital for the best one."
  ] }
 ] },
 "risk-management": { sections: [
  { h: "1. Why risk management comes first", p: "Risk management decides whether you survive long enough for your edge to work. Every trader has losing trades, and the question is not whether you will lose, but how much each loss costs and how many in a row you can absorb. Good risk management keeps losses small and survivable, so that your plan has time to produce results." },
  { h: "2. Drawdown: the arithmetic of losses", p: "Losses hurt more than equal gains help, because the recovery percentage grows faster than the loss. A 10% loss needs 11.1% to recover. A 20% loss needs 25%. A 50% loss needs 100%. A 75% loss needs 300%. Protecting capital is therefore the first job of any trading plan.", ul: [
   "10% loss → 11.1% gain needed",
   "20% loss → 25% gain needed",
   "30% loss → 42.9% gain needed",
   "50% loss → 100% gain needed",
   "75% loss → 300% gain needed"
  ] },
  { h: "3. Risk per trade: the central rule", p: "Risk a fixed small percentage of your capital on each trade, usually 0.5% to 2%. This makes every trade a small event. Ten losses in a row at 2% each reduce capital by about 18%. The same ten losses at 0.5% reduce it by about 5%. Smaller risk gives you time to learn and to recover mentally." },
  { h: "4. Position sizing: converting risk into shares", p: "Position size equals the risk amount divided by the risk per share (the distance from entry to stop). This turns your risk rule into a number of shares.", p2: "Example: capital ₹5,00,000, risk 1% = ₹5,000. Stop distance ₹20 per share. Size = 5,000 ÷ 20 = 250 shares. At ₹400 per share, the position is ₹1,00,000, which is 20% of capital. The loss at the stop is still only ₹5,000." },
  { h: "5. Reward-to-risk and win rate together", p: "A high win rate is not required if your winners are larger than your losers. A 1:2 reward-to-risk system needs to win only about one trade in three to break even before costs. A 1:1 system needs a win rate above 50%. Judge a system by its expectancy: (win rate × average win) − (loss rate × average loss).", p2: "Example: win rate 40%, average win 2R, average loss 1R. Expectancy = 0.4 × 2 − 0.6 × 1 = +0.2R per trade. Over 100 trades, that is +20R before costs." },
  { h: "6. Exposure: total risk, not just single-trade risk", p: "Five trades of 1% each, all in banking stocks that move together, are close to a single 5% bet on the sector. Track total open risk across all positions, and limit the risk in any one sector or theme (for example, 6% of capital in total open risk, and no more than 3% in one sector).", ul: [
   "Total open risk: the sum of the risk on all open positions.",
   "Correlation: stocks in the same sector or index often fall together.",
   "Cash buffer: keeping part of capital uninvested gives room to act and reduces forced decisions."
  ] },
  { h: "7. Drawdown rules: what to do when it goes wrong", p: "Set your rules before a bad period. A drawdown rule tells you what to do when losses pile up, so that emotion does not decide.", ul: [
   "Monthly loss limit: if the month's loss reaches a set level (for example 5% of capital), stop trading until the next month and review.",
   "Losing streak rule: after three losses in a row, cut position size by half until you have a winning trade.",
   "Account drawdown rule: at a 15% drawdown from the peak, stop, review the journal, and return with smaller size.",
   "Never add to a losing position to recover faster. This is how a small loss becomes a large one."
  ] },
  { h: "8. Stop-loss placement that matches risk", p: "A stop-loss should be placed where your idea is wrong, not where you can afford the loss. If the logical stop is too far for your risk rule, the position is too big or the trade is not suitable. Skip the trade rather than widen the stop. Volatility-based stops (for example 2 times ATR) account for normal daily movement." },
  { h: "9. Leverage and margin: the multiplier of risk", p: "Leverage multiplies both gains and losses. With 5 times margin, a 2% adverse move on the full position is a 10% loss on your cash. Margin calls can force you out at the worst price. If you use leverage, lower the risk per trade so that the loss at the stop is still your planned amount." },
  { h: "10. Psychology of risk", p: "Most traders break risk rules after a loss, after a win, or when a trade is close to a target. Write the rules, put them where you can see them, and treat any rule break as a serious mistake to review. The rules are there to protect you from your own impulses." },
  { h: "11. A risk checklist before every trade", ul: [
   "What is the maximum loss in rupees, and is it within my per-trade limit?",
   "Where is the stop, and why is it there?",
   "What is the position size, and how did I calculate it?",
   "What is the total open risk, including this trade?",
   "Is there an event (results, news) before the planned exit?",
   "Is my decision based on the plan, or on how I feel right now?"
  ] }
 ] }
});

Object.assign(LESSON_OVERRIDES.hi, {
 "technical-indicators": { sections: [
  { h: "1. इंडिकेटर क्या है", p: "इंडिकेटर कीमत, वॉल्यूम या दोनों पर लगाई गई गणना है। यह कच्चे डेटा को एक रेखा, बैंड या ऑसिलेटर में बदलता है, जिसे पढ़ना आसान होता है। हर इंडिकेटर अतीत का देर से चलने वाला सार है। इन्हें बाज़ार की मौजूदा स्थिति समझने और जोखिम संभालने के लिए उपयोग करें, अगली कीमत की निश्चित भविष्यवाणी के लिए नहीं।" },
  { h: "2. चार परिवार", ul: [
   "ट्रेंड इंडिकेटर (मूविंग एवरेज, ADX): दिशा बताते हैं और ADX ट्रेंड की ताकत।",
   "मोमेंटम इंडिकेटर (RSI, MACD, स्टोकेस्टिक): कीमत की चाल की गति और यह कि वह तेज़ हो रही है या धीमी।",
   "अस्थिरता इंडिकेटर (बोलिंगर बैंड, ATR): कीमत कितना चलती है, जो उम्मीदें और स्टॉप की दूरी तय करता है।",
   "वॉल्यूम इंडिकेटर (वॉल्यूम, OBV, VWAP): दिखाते हैं कि चाल के पीछे भागीदारी है या नहीं।"
  ], p2: "शुरुआती के लिए सरल सेट: एक ट्रेंड टूल, एक मोमेंटम टूल, जोखिम के लिए एक अस्थिरता टूल, और वॉल्यूम।" },
  { h: "3. मूविंग एवरेज: दिशा और सपोर्ट", p: "मूविंग एवरेज कीमत को सुचारु करता है। 20, 50 और 200 अवधि के एवरेज सबसे ज़्यादा देखे जाते हैं। बढ़ते एवरेज के ऊपर कीमत अपट्रेंड का संकेत है; गिरते एवरेज के नीचे डाउनट्रेंड का। एवरेज डायनामिक सपोर्ट या रेज़िस्टेंस का काम भी करते हैं। क्रॉसओवर, जैसे 50 का 200 को ऊपर पार करना (गोल्डन क्रॉस), व्यापक रूप से देखे जाते हैं, पर देर से चलते हैं।", p2: "उदाहरण: 20 अवधि का EMA ₹248 पर बढ़ रहा है, कीमत ₹249 तक पुलबैक करके वॉल्यूम के साथ उछलती है। कई ट्रेडर इसे ट्रेंड-फ़ॉलोइंग एंट्री मानते हैं, ₹244 के नीचे स्टॉप के साथ।" },
  { h: "4. RSI: मोमेंटम और ओवरबॉट क्षेत्र", p: "RSI 14 अवधि में हाल के लाभ और हानि के आकार की तुलना करता है, 0 से 100 के पैमाने पर। 70 से ऊपर के पाठ को ओवरबॉट और 30 से नीचे को ओवरसोल्ड कहा जाता है। मज़बूत अपट्रेंड में RSI अक्सर 40 से 80 के बीच रहता है। अपट्रेंड में 40 से 50 क्षेत्र तक पुलबैक आम उपयोग है।", p2: "उदाहरण: अपट्रेंड में पुलबैक के दौरान RSI 42 तक गिरता है और ऊपर मुड़ता है। ट्रेंड ट्रेडरों के लिए यह पुलबैक एंट्री का संकेत है, बिक्री का नहीं।" },
  { h: "5. MACD: ट्रेंड और मोमेंटम एक साथ", p: "MACD 12 अवधि के EMA में से 26 अवधि का EMA घटाता है। सिग्नल रेखा MACD का 9 अवधि का EMA है। हिस्टोग्राम उनका अंतर दिखाता है। MACD रेखा का सिग्नल रेखा के ऊपर क्रॉस तेज़ी का मोमेंटम संकेत है। शून्य के नीचे क्रॉस आमतौर पर शून्य के ऊपर वाले से कमज़ोर होते हैं। घटते हिस्टोग्राम बार बताते हैं कि क्रॉस से पहले मोमेंटम धीमा हो रहा है।" },
  { h: "6. स्टोकेस्टिक: हाल की रेंज में क्लोज़ कहाँ है", p: "स्टोकेस्टिक ऑसिलेटर दिखाता है कि नवीनतम क्लोज़ हाल की हाई-लो रेंज में कहाँ है। 80 से ऊपर का पाठ ओवरबॉट और 20 से नीचे ओवरसोल्ड का संकेत। यह तेज़ है और साइडवे बाज़ार में उपयोगी, पर मज़बूत ट्रेंड में लंबे समय तक ओवरबॉट रह सकता है। रेंज के किनारों पर एंट्री का समय तय करने के लिए उपयोग करें।" },
  { h: "7. बोलिंगर बैंड: अस्थिरता और चरम", p: "बोलिंगर बैंड 20 अवधि के एवरेज के ऊपर और नीचे दो मानक विचलन पर दो बैंड लगाते हैं। ज़्यादातर कीमत उनके भीतर रहती है। संकरे बैंड (स्क्वीज़) अक्सर बड़ी चाल से पहले आते हैं। कीमत का बैंड को छूना अपने आप संकेत नहीं; वॉल्यूम के साथ बैंड के बाहर क्लोज़ ज़्यादा अर्थपूर्ण है। मज़बूत ट्रेंड में कीमत बैंड के साथ चल सकती है।" },
  { h: "8. ATR: सबसे व्यावहारिक जोखिम टूल", p: "ATR (एवरेज ट्रू रेंज) 14 अवधि की औसत दैनिक रेंज मापता है। यह दिशा का टूल नहीं है। इसे स्टॉप और पोज़िशन साइज़ तय करने में उपयोग करें: 2 गुना ATR की दूरी का स्टॉप सामान्य उतार-चढ़ाव के लिए जगह देता है, और पोज़िशन का आकार ऐसा रखें कि उस स्टॉप पर नुकसान आपके तय जोखिम के बराबर हो।", p2: "उदाहरण: ATR ₹4, एंट्री ₹250, स्टॉप 2 × ATR = ₹8 नीचे, यानी ₹242। ₹1,000 अधिकतम नुकसान पर साइज़ = 1,000 ÷ 8 = 125 शेयर।" },
  { h: "9. ADX: क्या बाज़ार में ट्रेंड है भी?", p: "ADX 0 से 100 के पैमाने पर ट्रेंड की ताकत मापता है, दिशा नहीं। 20 से नीचे का पाठ कमज़ोर ट्रेंड या रेंज का संकेत; 25 से ऊपर ट्रेंड का। +DI और -DI रेखाएँ दिशा दिखाती हैं। 25 से ऊपर बढ़ता ADX, जिसमें +DI, -DI से ऊपर हो, ट्रेंड-फ़ॉलोइंग एंट्री का समर्थन करता है। ऊँचे स्तर से गिरता ADX अक्सर बताता है कि ट्रेंड थक रहा है।" },
  { h: "10. वॉल्यूम, OBV और VWAP", ul: [
   "वॉल्यूम: हर कैंडल के वॉल्यूम की 20 अवधि के औसत से तुलना। ब्रेकआउट पर भरोसे के लिए औसत से ऊपर वॉल्यूम चाहिए।",
   "OBV (ऑन-बैलेंस वॉल्यूम): चलता कुल, जो ऊपर के दिनों पर वॉल्यूम जोड़ता और नीचे के दिनों पर घटाता है। अगर कीमत नया हाई बनाए पर OBV नहीं, तो ख़रीदार कमज़ोर हो रहे हैं।",
   "VWAP (वॉल्यूम-भारित औसत कीमत): सत्र की औसत कीमत, वॉल्यूम से भारित। इंट्राडे ट्रेडर देखते हैं कि दिन पर ख़रीदार या विक्रेता नियंत्रण में हैं।"
  ] },
  { h: "11. ऐसा सेट बनाना जो साथ काम करे", p: "जिस परिवार की ज़रूरत हो, उसमें से एक टूल चुनें। स्विंग ट्रेडर के लिए उदाहरण: 20 और 50 EMA (ट्रेंड), RSI (पुलबैक का समय), ATR (स्टॉप और साइज़), वॉल्यूम (पुष्टि)। कार्रवाई से पहले जाँचें कि टूल सहमत हैं। अगर ट्रेंड ख़रीद कहे, पर मोमेंटम ओवरबॉट और वॉल्यूम गिरता हो, तो इंतज़ार करें।" },
  { h: "12. भरोसे से पहले इंडिकेटर की परख", p: "नतीजे देखने से पहले नियम तय करें: उदाहरण के लिए, अपट्रेंड में RSI के 30 के ऊपर क्रॉस पर ख़रीदें, 2 गुना ATR टारगेट या स्टॉप पर बाहर निकलें। पिछले चार्ट पर 30 से 50 संकेत लिखें, जिनमें हारने वाले भी हों। जीत दर, औसत लाभ और औसत नुकसान गिनें। इंडिकेटर तभी रखने योग्य है जब खर्च के बाद औसत नतीजा सकारात्मक हो।" },
  { h: "13. आम इंडिकेटर गलतियाँ", ul: [
   "चार्ट भरने तक इंडिकेटर जोड़ते रहना। ज़्यादा टूल का मतलब ज़्यादा निश्चितता नहीं।",
   "नतीजा देखने के बाद सेटिंग बदलना। सेटिंग पहले तय करें और उन्हें रखें।",
   "मज़बूत ट्रेंड में ओवरबॉट और ओवरसोल्ड को अपने आप बेच/ख़रीद संकेत मानना।",
   "समय-सीमा को अनदेखा करना। 5 मिनट के चार्ट का इंडिकेटर डेली चार्ट से उलट हो सकता है।",
   "बिक्री के लिए केवल देर से चलने वाले इंडिकेटर पर निर्भर रहना, जिससे मुनाफ़ा छूट जाता है।"
  ] }
 ] },
 "swing-trading": { sections: [
  { h: "1. स्विंग ट्रेडिंग क्या है", p: "स्विंग ट्रेडिंग कीमत की एक चाल पकड़ने के लिए पोज़िशन कुछ दिनों से कुछ हफ़्तों तक रखती है। यह इंट्राडे (उसी दिन) और निवेश (महीने या साल) के बीच आता है। यह उन लोगों के लिए उपयुक्त है जिनकी नौकरी है और जो दिन में एक-दो बार बाज़ार देख सकते हैं, पर इसके लिए धैर्य, साफ़ योजना और जर्नल चाहिए।" },
  { h: "2. ट्रेड को कितना समय देना है", p: "स्विंग ट्रेड न निवेश है, न डे ट्रेड। आप सेटअप के कारण एंट्री करते हैं, और अधिकतम समय पहले से तय करते हैं। अगर ट्रेड उस समय में नहीं चलता, तो सेटअप विफल है, और छोटे नुकसान में भी बाहर निकलते हैं। घाटे वाला ट्रेड महीनों तक रखना एक अलग रणनीति है, और आमतौर पर वह ग़लत जाती है।", ul: [
   "आमतौर पर होल्डिंग अवधि: एंट्री से पहले तय 3 से 20 सत्र।",
   "रात भर होल्डिंग: गैप स्टॉप से बहुत दूर खुल सकते हैं, इसलिए पोज़िशन साइज़ में इसका हिसाब हो।",
   "बाज़ार समय: दैनिक चार्ट पर बंद होने के बाद योजना बनाएँ, और अगले सत्र के लिए ऑर्डर दें।"
  ] },
  { h: "3. सेटअप: एंट्री के कारण", p: "सेटअप एक दोहराने योग्य स्थिति है, जिसका साफ़ नियम हो। आम स्विंग सेटअप: वॉल्यूम के साथ रेज़िस्टेंस के ऊपर ब्रेकआउट, अपट्रेंड में बढ़ते मूविंग एवरेज तक पुलबैक, सपोर्ट पर तेज़ी का पलटाव कैंडल, और स्क्वीज़ के बाद रेंज ब्रेकआउट। हर सेटअप को नियम के रूप में लिखें, जैसे: अपट्रेंड (कीमत 50-दिन एवरेज के ऊपर) में, वॉल्यूम औसत के 1.5 गुना के साथ 20-दिन के हाई के ऊपर क्लोज़।" },
  { h: "4. एंट्री, स्टॉप और टारगेट: पूरी योजना", ul: [
   "एंट्री: वह कीमत या शर्त जो ट्रेड शुरू करे, जैसे ₹250 के ऊपर क्लोज़।",
   "स्टॉप-लॉस: वह स्तर जहाँ विचार ग़लत साबित होता है, जैसे ₹240 पर पिछले स्विंग लो के नीचे। एंट्री से पहले लगाएँ।",
   "टारगेट: वह स्तर जहाँ मुनाफ़ा लेंगे, जैसे ₹270 पर पिछला रेज़िस्टेंस, या जोखिम का गुणक।",
   "जोखिम-इनाम: (टारगेट − एंट्री) ÷ (एंट्री − स्टॉप)। उदाहरण: (270 − 250) ÷ (250 − 240) = 2। कई ट्रेडर कम से कम 2 चाहते हैं।"
  ] },
  { h: "5. पोज़िशन साइज़: सबसे महत्वपूर्ण संख्या", p: "तय करें कि एक ट्रेड में अधिकतम कितना नुकसान स्वीकार है, आमतौर पर पूँजी का 0.5% से 2%। पोज़िशन का आकार स्टॉप की दूरी से तय होता है, इस भावना से नहीं कि आप कितने आश्वस्त हैं।", p2: "उदाहरण: पूँजी ₹1,00,000, जोखिम 1% = ₹1,000। एंट्री ₹250, स्टॉप ₹240। प्रति शेयर जोखिम ₹10। शेयर = 1,000 ÷ 10 = 100। पोज़िशन का मूल्य ₹25,000 (पूँजी का 25%)। स्टॉप नुकसान को शुल्क और किसी गैप से पहले लगभग ₹1,000 तक सीमित रखता है।" },
  { h: "6. एंट्री के बाद ट्रेड प्रबंधन", p: "एंट्री के बाद योजना तय करती है कि आप क्या करें, भावना नहीं। स्टॉप तभी ऊपर ले जाएँ जब ट्रेड खुद को साबित करे, जैसे कीमत आपके जोखिम जितनी चलने पर ब्रेक-ईवन पर। चाहें तो पहले टारगेट पर आंशिक मुनाफ़ा लें, और बाक़ी को ट्रेलिंग स्टॉप के साथ चलने दें। नुकसान से बचने के लिए स्टॉप कभी चौड़ा न करें।", ul: [
   "प्रारंभिक जोखिम जितनी चाल पर ब्रेक-ईवन पर जाएँ (उदाहरण: ₹10 जोखिम पर +₹10)।",
   "ऊँचे स्विंग लो के नीचे, या मूविंग एवरेज के नीचे स्टॉप ट्रेल करें।",
   "अगर ट्रेड समय सीमा में कहीं नहीं पहुँचा तो समय सीमा पर बाहर निकलें।"
  ] },
  { h: "7. गैप: वह जोखिम जो स्टॉप तोड़ता है", p: "गैप तब होता है जब कीमत पिछले क्लोज़ से काफ़ी ऊपर या नीचे खुलती है, आमतौर पर ख़बर के बाद। स्टॉप कीमत पर बाहर निकलने का ऑर्डर है, पर गैप में पहली उपलब्ध कीमत कहीं बदतर हो सकती है। उदाहरण: ₹240 पर स्टॉप, बुरी ख़बर, शेयर ₹230 पर खुला। प्रति शेयर नुकसान ₹20 है, योजना के ₹10 का दोगुना। नतीजे, बजट और नीति घोषणाओं जैसी घटनाओं से पहले पोज़िशन घटाएँ।" },
  { h: "8. सेक्टर और बाज़ार का संदर्भ", p: "कमज़ोर सेक्टर या गिरते बाज़ार में अच्छा शेयर भी अक्सर विफल होता है। एंट्री से पहले इंडेक्स और सेक्टर का ट्रेंड जाँचें। मज़बूत सेक्टरों और व्यापक बाज़ार के साथ चलने वाले स्विंग ट्रेडर अकेले शेयर में ट्रेड करने वालों से अक्सर बेहतर सफलता दर रखते हैं।" },
  { h: "9. स्विंग ट्रेडिंग जर्नल", p: "सेटअप, कारण, तारीख़, एंट्री, स्टॉप, टारगेट, साइज़, एग्ज़िट, रुपये में नतीजा और R में नतीजा (जोखिम के गुणक), और कोई गलती लिखें। महीने में एक बार समीक्षा करें। आम खोज: कुछ सेटअप आपके लिए काम नहीं करते, एग्ज़िट बहुत जल्दी आते हैं, और स्टॉप योजना के ख़िलाफ़ खिसकते हैं।" },
  { h: "10. शुरू से अंत तक एक उदाहरण", p: "एक शेयर 20-दिन के हाई से ऊपर ₹250 पर वॉल्यूम औसत के 1.5 गुना के साथ, अपट्रेंड में, क्लोज़ होता है। आप ₹250 पर 100 शेयर ख़रीदते हैं, स्टॉप ₹240 और टारगेट ₹270 पर। तीन दिन बाद कीमत ₹262 पहुँचती है; आप स्टॉप ₹250 (ब्रेक-ईवन) पर ले जाते हैं। दो दिन बाद कीमत ₹250 पर लौटती है और आप बाहर निकलते हैं। नुकसान: शुल्क से पहले 0। अगला सेटअप: एक और ब्रेकआउट। उदाहरण दिखाता है कि ट्रेड उम्मीद के उलट जाए तब भी स्टॉप खाते की रक्षा करता है।" },
  { h: "11. आम स्विंग ट्रेडिंग गलतियाँ", ul: [
   "सेटअप मज़बूत लगने पर बिना स्टॉप के एंट्री।",
   "कीमत स्टॉप के पास आते ही उसे और दूर खिसकाना।",
   "बिना फ़ैसले के नतीजों (results) के दौरान होल्ड करना।",
   "घाटे वाली पोज़िशन में औसत बढ़ाने के लिए और ख़रीदना।",
   "एक साथ बहुत सारे सेटअप लेना, जिससे सबसे अच्छे के लिए पूँजी न बचे।"
  ] }
 ] },
 "risk-management": { sections: [
  { h: "1. जोखिम प्रबंधन पहले क्यों", p: "जोखिम प्रबंधन तय करता है कि आप इतने समय तक टिके रहें कि आपकी बढ़त काम कर सके। हर ट्रेडर के घाटे वाले ट्रेड होते हैं, और सवाल यह नहीं कि आप हारेंगे या नहीं, बल्कि यह कि हर नुकसान कितना महँगा है और कितने लगातार नुकसान आप झेल सकते हैं। अच्छा जोखिम प्रबंधन नुकसान को छोटा और झेलने योग्य रखता है, ताकि योजना को नतीजे देने का समय मिले।" },
  { h: "2. ड्रॉडाउन: नुकसान का गणित", p: "नुकसान बराबर के लाभ से ज़्यादा चोट देता है, क्योंकि वापसी का प्रतिशत नुकसान से तेज़ बढ़ता है। 10% नुकसान की भरपाई के लिए 11.1% चाहिए। 20% नुकसान के लिए 25%। 50% नुकसान के लिए 100%। 75% नुकसान के लिए 300%। इसलिए पूँजी बचाना किसी भी ट्रेडिंग योजना का पहला काम है।", ul: [
   "10% नुकसान → 11.1% लाभ चाहिए",
   "20% नुकसान → 25% लाभ चाहिए",
   "30% नुकसान → 42.9% लाभ चाहिए",
   "50% नुकसान → 100% लाभ चाहिए",
   "75% नुकसान → 300% लाभ चाहिए"
  ] },
  { h: "3. प्रति ट्रेड जोखिम: केंद्रीय नियम", p: "हर ट्रेड पर पूँजी का एक तय छोटा प्रतिशत जोखिम लें, आमतौर पर 0.5% से 2%। इससे हर ट्रेड एक छोटी घटना बनता है। हर बार 2% पर लगातार दस नुकसान पूँजी को लगभग 18% घटाते हैं। वही दस नुकसान 0.5% पर लगभग 5% घटाते हैं। छोटा जोखिम सीखने और मानसिक रूप से संभलने का समय देता है।" },
  { h: "4. पोज़िशन साइज़: जोखिम को शेयरों में बदलना", p: "पोज़िशन साइज़ = जोखिम की रकम ÷ प्रति शेयर जोखिम (एंट्री से स्टॉप तक की दूरी)। इससे आपका जोखिम नियम शेयरों की संख्या में बदल जाता है।", p2: "उदाहरण: पूँजी ₹5,00,000, जोखिम 1% = ₹5,000। स्टॉप की दूरी प्रति शेयर ₹20। साइज़ = 5,000 ÷ 20 = 250 शेयर। ₹400 प्रति शेयर पर पोज़िशन ₹1,00,000 की है, यानी पूँजी का 20%। स्टॉप पर नुकसान फिर भी केवल ₹5,000।" },
  { h: "5. जोखिम-इनाम और जीत दर एक साथ", p: "अगर आपके विजेता ट्रेड हारने वालों से बड़े हों, तो ऊँची जीत दर ज़रूरी नहीं। 1:2 जोखिम-इनाम वाली प्रणाली को शुल्क से पहले ब्रेक-ईवन के लिए लगभग तीन में से एक ट्रेड जीतना काफ़ी है। 1:1 वाली प्रणाली को 50% से ऊपर जीत दर चाहिए। प्रणाली को उसकी अपेक्षित वैल्यू (expectancy) से परखें: (जीत दर × औसत लाभ) − (हार दर × औसत नुकसान)।", p2: "उदाहरण: जीत दर 40%, औसत लाभ 2R, औसत नुकसान 1R। Expectancy = 0.4 × 2 − 0.6 × 1 = प्रति ट्रेड +0.2R। 100 ट्रेड में यह शुल्क से पहले +20R है।" },
  { h: "6. एक्सपोज़र: कुल जोखिम, केवल एक ट्रेड का नहीं", p: "एक साथ चलने वाले बैंकिंग शेयरों में पाँच ट्रेड, हर एक 1%, लगभग सेक्टर पर एक 5% दाँव हैं। सभी खुली पोज़िशन का कुल जोखिम गिनें, और किसी एक सेक्टर या थीम पर सीमा रखें (उदाहरण: कुल खुला जोखिम पूँजी का 6%, और एक सेक्टर में 3% से ज़्यादा नहीं)।", ul: [
   "कुल खुला जोखिम: सभी खुली पोज़िशन पर जोखिम का योग।",
   "सहसंबंध: एक ही सेक्टर या इंडेक्स के शेयर अक्सर साथ गिरते हैं।",
   "नकद बफ़र: पूँजी का कुछ हिस्सा बिना निवेश के रखने से कार्रवाई की जगह और मजबूरी के फ़ैसले कम होते हैं।"
  ] },
  { h: "7. ड्रॉडाउन नियम: गलत होने पर क्या करें", p: "ख़राब दौर से पहले नियम तय करें। ड्रॉडाउन नियम बताता है कि नुकसान जमा होने पर क्या करना है, ताकि भावना फ़ैसला न करे।", ul: [
   "मासिक नुकसान सीमा: अगर महीने का नुकसान तय स्तर (जैसे पूँजी का 5%) पहुँचे, तो अगले महीने तक ट्रेडिंग रोकें और समीक्षा करें।",
   "लगातार नुकसान नियम: तीन नुकसान के बाद, एक जीत तक पोज़िशन साइज़ आधा करें।",
   "खाता ड्रॉडाउन नियम: शिखर से 15% गिरावट पर रुकें, जर्नल की समीक्षा करें, और छोटे साइज़ के साथ लौटें।",
   "नुकसान की भरपाई के लिए घाटे वाली पोज़िशन में कभी न जोड़ें। यहीं से छोटा नुकसान बड़ा बनता है।"
  ] },
  { h: "8. स्टॉप-लॉस जो जोखिम से मेल खाए", p: "स्टॉप-लॉस वहाँ लगे जहाँ आपका विचार ग़लत हो, न कि जहाँ नुकसान सहना आसान हो। अगर तार्किक स्टॉप आपके जोखिम नियम के लिए बहुत दूर है, तो पोज़िशन बहुत बड़ी है या ट्रेड उपयुक्त नहीं। स्टॉप चौड़ा करने के बजाय ट्रेड छोड़ दें। अस्थिरता पर आधारित स्टॉप (जैसे 2 गुना ATR) सामान्य दैनिक चाल का हिसाब रखते हैं।" },
  { h: "9. लीवरेज और मार्जिन: जोखिम का गुणक", p: "लीवरेज लाभ और नुकसान दोनों को गुणा करता है। 5 गुना मार्जिन पर पूरी पोज़िशन पर 2% विपरीत चाल आपकी नकद पर 10% नुकसान है। मार्जिन कॉल आपको सबसे ख़राब कीमत पर बाहर निकाल सकती है। लीवरेज इस्तेमाल करें तो प्रति ट्रेड जोखिम घटाएँ, ताकि स्टॉप पर नुकसान अब भी आपकी तय रकम हो।" },
  { h: "10. जोखिम का मनोविज्ञान", p: "ज़्यादातर ट्रेडर नुकसान के बाद, जीत के बाद, या टारगेट के पास होने पर नियम तोड़ते हैं। नियम लिखें, उन्हें दिखने वाली जगह पर रखें, और हर नियम तोड़ने को गंभीर गलती मानकर समीक्षा करें। नियम आपको अपने ही आवेगों से बचाने के लिए हैं।" },
  { h: "11. हर ट्रेड से पहले जोखिम चेकलिस्ट", ul: [
   "अधिकतम नुकसान रुपये में कितना है, और क्या वह मेरी प्रति-ट्रेड सीमा के भीतर है?",
   "स्टॉप कहाँ है, और वह वहीं क्यों है?",
   "पोज़िशन साइज़ कितना है, और मैंने उसकी गणना कैसे की?",
   "इस ट्रेड सहित कुल खुला जोखिम कितना है?",
   "क्या योजनाबद्ध एग्ज़िट से पहले कोई घटना (नतीजे, ख़बर) है?",
   "क्या मेरा फ़ैसला योजना पर आधारित है, या अभी मेरे मन की स्थिति पर?"
  ] }
 ] }
});
