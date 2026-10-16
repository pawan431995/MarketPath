// Technical indicator library: what each indicator measures, when to use it, and how to use it in a trade.
// category: "trend" | "momentum" | "volatility" | "volume"
// Indicators are based on past prices and volume. They lag and can give false signals. Test on paper first.
const INDICATORS = [
 { id: "moving-averages", file: "moving-averages.svg", category: "trend",
  name: { en: "Moving averages (SMA and EMA)", hi: "मूविंग एवरेज (SMA और EMA)" },
  what: { en: "The average price over a set number of periods. SMA treats every period equally; EMA gives more weight to recent prices, so it reacts faster.", hi: "एक तय अवधि की औसत कीमत। SMA हर अवधि को बराबर वज़न देता है; EMA हाल की कीमतों को ज़्यादा वज़न देता है, इसलिए वह तेज़ी से प्रतिक्रिया देता है।" },
  settings: { en: "20 (short-term), 50 (medium), 200 (long-term) periods are common.", hi: "20 (अल्पकालिक), 50 (मध्यम), 200 (दीर्घकालिक) अवधि आम हैं।" },
  when: { en: "To judge trend direction. Use it in trending markets. In sideways markets it produces many false crossovers.", hi: "ट्रेंड की दिशा समझने के लिए। ट्रेंडिंग बाज़ार में उपयोग करें। साइडवे बाज़ार में यह कई झूठे क्रॉसओवर देता है।" },
  how: { en: "Swing trade: buy when price closes above the 20 EMA in an uptrend (50 SMA above 200 SMA). Put the stop below the 20 EMA or the last swing low. Exit when price closes below the 20 EMA. A 50 SMA crossing above the 200 SMA is a 'golden cross'; the reverse is a 'death cross'.", hi: "स्विंग ट्रेड: अपट्रेंड में जब कीमत 20 EMA के ऊपर बंद हो (50 SMA, 200 SMA के ऊपर) तब ख़रीदें। स्टॉप 20 EMA के नीचे या पिछले स्विंग लो के नीचे रखें। कीमत 20 EMA के नीचे बंद हो तो बाहर निकलें। 50 SMA का 200 SMA को ऊपर पार करना 'गोल्डन क्रॉस' है; उल्टा 'डेथ क्रॉस'।" },
  mistake: { en: "Buying every crossover in a sideways range. Also, a longer average lags more, so a 200-period average turns late.", hi: "साइडवे रेंज में हर क्रॉसओवर पर ख़रीदना। लंबा एवरेज ज़्यादा देर से चलता है, इसलिए 200 अवधि का एवरेज देर से पलटता है।" },
  pairs: { en: "ADX (is the trend strong?), volume (is the move supported?).", hi: "ADX (ट्रेंड मज़बूत है?), वॉल्यूम (चाल का समर्थन है?)।" } },

 { id: "rsi", file: "rsi.svg", category: "momentum",
  name: { en: "RSI (Relative Strength Index)", hi: "RSI (रिलेटिव स्ट्रेंथ इंडेक्स)" },
  what: { en: "Measures the speed and size of recent gains against recent losses, on a 0 to 100 scale.", hi: "हाल के लाभ और हानि की गति और आकार को 0 से 100 के पैमाने पर मापता है।" },
  settings: { en: "14 periods. Levels: 70 (overbought), 30 (oversold), 50 (midline).", hi: "14 अवधि। स्तर: 70 (ओवरबॉट), 30 (ओवरसोल्ड), 50 (मध्य रेखा)।" },
  when: { en: "In a range, to buy near oversold and sell near overbought. In a trend, to find pullback entries (RSI dips toward 40-50 and turns up).", hi: "रेंज में, ओवरसोल्ड के पास ख़रीदने और ओवरबॉट के पास बेचने के लिए। ट्रेंड में, पुलबैक एंट्री खोजने के लिए (RSI 40-50 तक गिरकर ऊपर मुड़े)।" },
  how: { en: "Uptrend pullback: price above the 50 SMA, RSI falls to 40-50 and turns up, buy. Stop below the pullback low. Range: buy when RSI closes back above 30, sell when it reaches 70. Divergence: price makes a higher high but RSI makes a lower high, a warning that momentum is fading.", hi: "अपट्रेंड पुलबैक: कीमत 50 SMA के ऊपर, RSI 40-50 तक गिरे और ऊपर मुड़े, तो ख़रीदें। स्टॉप पुलबैक के लो के नीचे। रेंज: RSI 30 के ऊपर वापस बंद हो तो ख़रीदें, 70 पर पहुँचे तो बेचें। डाइवर्जेंस: कीमत ऊँचा हाई बनाए पर RSI नीचा हाई, तो मोमेंटम कमज़ोर होने की चेतावनी।" },
  mistake: { en: "Selling just because RSI is above 70 in a strong uptrend. Strong trends can stay overbought for weeks.", hi: "मज़बूत अपट्रेंड में सिर्फ़ RSI 70 से ऊपर होने पर बेचना। मज़बूत ट्रेंड हफ़्तों तक ओवरबॉट रह सकते हैं।" },
  pairs: { en: "Moving averages (trend direction) and Bollinger Bands (range edges).", hi: "मूविंग एवरेज (ट्रेंड की दिशा) और बोलिंगर बैंड (रेंज की सीमाएँ)।" } },

 { id: "macd", file: "macd.svg", category: "momentum",
  name: { en: "MACD", hi: "MACD" },
  what: { en: "The difference between a 12-period and a 26-period EMA (the MACD line), its 9-period EMA (the signal line), and the histogram between them.", hi: "12-अवधि और 26-अवधि EMA का अंतर (MACD रेखा), उसका 9-अवधि EMA (सिग्नल रेखा), और इनके बीच का हिस्टोग्राम।" },
  settings: { en: "12, 26, 9.", hi: "12, 26, 9।" },
  when: { en: "To catch momentum shifts and trend changes in trending markets. Good for swing trades of days to weeks.", hi: "ट्रेंडिंग बाज़ार में मोमेंटम बदलाव और ट्रेंड परिवर्तन पकड़ने के लिए। दिनों से हफ़्तों के स्विंग ट्रेड के लिए अच्छा।" },
  how: { en: "Buy when the MACD line crosses above the signal line, ideally below the zero line (a pullback in an uptrend). Sell or exit on the opposite cross. Shrinking histogram bars warn that momentum is fading before the cross happens.", hi: "ख़रीदें जब MACD रेखा सिग्नल रेखा को ऊपर पार करे, आदर्श रूप से शून्य रेखा के नीचे (अपट्रेंड में पुलबैक)। विपरीत क्रॉस पर बेचें या बाहर निकलें। घटते हिस्टोग्राम बार बताते हैं कि क्रॉस होने से पहले मोमेंटम कमज़ोर हो रहा है।" },
  mistake: { en: "Trading every cross in a sideways market. Crosses there are random and cause repeated small losses (whipsaws).", hi: "साइडवे बाज़ार में हर क्रॉस पर ट्रेड करना। वहाँ क्रॉस अनियमित होते हैं और बार-बार छोटे नुकसान (व्हिपसॉ) देते हैं।" },
  pairs: { en: "ADX (confirm a trend exists) and volume (confirm the move).", hi: "ADX (ट्रेंड मौजूद है या नहीं) और वॉल्यूम (चाल की पुष्टि)।" } },

 { id: "stochastic", file: "stochastic.svg", category: "momentum",
  name: { en: "Stochastic oscillator", hi: "स्टोकेस्टिक ऑसिलेटर" },
  what: { en: "Shows where the latest close sits within the recent high-low range. %K is the fast line; %D is its smoothed version.", hi: "दिखाता है कि नवीनतम क्लोज़ हाल की हाई-लो रेंज में कहाँ है। %K तेज़ रेखा है; %D उसका सुचारु रूप।" },
  settings: { en: "14, 3, 3. Levels: 80 (overbought), 20 (oversold).", hi: "14, 3, 3। स्तर: 80 (ओवरबॉट), 20 (ओवरसोल्ड)।" },
  when: { en: "In sideways or mildly trending markets, to time entries near the edges of the range.", hi: "साइडवे या हल्के ट्रेंड वाले बाज़ार में, रेंज की सीमाओं के पास एंट्री का समय तय करने के लिए।" },
  how: { en: "Buy when %K crosses above %D while both are below 20. Sell when %K crosses below %D while both are above 80. In a strong trend, ignore the overbought signal and use it only for pullbacks in the trend direction.", hi: "ख़रीदें जब दोनों 20 से नीचे हों और %K, %D को ऊपर पार करे। बेचें जब दोनों 80 से ऊपर हों और %K, %D को नीचे पार करे। मज़बूत ट्रेंड में ओवरबॉट संकेत को नज़रअंदाज़ करें और केवल ट्रेंड की दिशा में पुलबैक के लिए इस्तेमाल करें।" },
  mistake: { en: "Using it alone in a strong trend, where it stays in overbought for long periods and gives early sell signals.", hi: "मज़बूत ट्रेंड में इसे अकेले इस्तेमाल करना, जहाँ यह लंबे समय तक ओवरबॉट रहता है और जल्दी बिक्री संकेत देता है।" },
  pairs: { en: "A moving average for trend direction; use the stochastic only to time entries.", hi: "ट्रेंड की दिशा के लिए मूविंग एवरेज; स्टोकेस्टिक केवल एंट्री का समय तय करने के लिए।" } },

 { id: "bollinger-bands", file: "bollinger-bands.svg", category: "volatility",
  name: { en: "Bollinger Bands", hi: "बोलिंगर बैंड" },
  what: { en: "A 20-period moving average (middle line) with upper and lower bands two standard deviations away. The bands widen when volatility rises and narrow when it falls.", hi: "20-अवधि मूविंग एवरेज (मध्य रेखा) और दो मानक विचलन दूर ऊपरी व निचले बैंड। अस्थिरता बढ़ने पर बैंड चौड़े और घटने पर संकरे होते हैं।" },
  settings: { en: "20 periods, 2 standard deviations.", hi: "20 अवधि, 2 मानक विचलन।" },
  when: { en: "To spot volatility squeezes before breakouts, and to find range-bound entries.", hi: "ब्रेकआउट से पहले अस्थिरता के संकुचन (squeeze) को पहचानने और रेंज में एंट्री खोजने के लिए।" },
  how: { en: "Squeeze: when the bands are at their narrowest for a while, wait for a close outside a band with rising volume. Range: buy near the lower band if RSI is below 30 and the candle turns up, target the middle line. In a strong trend, price can 'walk' along the upper band; do not sell just for touching it.", hi: "स्क्वीज़: जब बैंड कुछ समय तक सबसे संकरे हों, तो बढ़ते वॉल्यूम के साथ बैंड के बाहर क्लोज़ का इंतज़ार करें। रेंज: RSI 30 से नीचे और कैंडल ऊपर मुड़े तो निचले बैंड के पास ख़रीदें, मध्य रेखा तक लक्ष्य। मज़बूत ट्रेंड में कीमत ऊपरी बैंड के साथ 'चल' सकती है; सिर्फ़ छूने पर न बेचें।" },
  mistake: { en: "Treating a touch of a band as a reversal signal. Price can touch or pierce the bands many times during a trend.", hi: "बैंड को छूने को पलटाव संकेत मानना। ट्रेंड के दौरान कीमत बैंड को कई बार छू या पार कर सकती है।" },
  pairs: { en: "RSI (oversold or overbought at the edge) and volume (breakout confirmation).", hi: "RSI (किनारे पर ओवरसोल्ड या ओवरबॉट) और वॉल्यूम (ब्रेकआउट की पुष्टि)।" } },

 { id: "atr", file: "atr.svg", category: "volatility",
  name: { en: "ATR (Average True Range)", hi: "ATR (एवरेज ट्रू रेंज)" },
  what: { en: "The average size of daily price ranges, including gaps. It measures volatility in rupees, not direction.", hi: "अंतराल (gaps) सहित दैनिक कीमत रेंज का औसत आकार। यह दिशा नहीं, अस्थिरता को रुपयों में मापता है।" },
  settings: { en: "14 periods.", hi: "14 अवधि।" },
  when: { en: "To set stop-loss distances and position sizes that fit how much the stock normally moves. Use it for every trade.", hi: "स्टॉप-लॉस की दूरी और पोज़िशन साइज़ तय करने के लिए, जो शेयर की सामान्य चाल के अनुरूप हों। हर ट्रेड के लिए उपयोगी।" },
  how: { en: "Stop distance = 2 × ATR below the entry (for a long trade). Position size = maximum loss ÷ (2 × ATR). Example: entry ₹250, ATR ₹4, stop ₹242 (2 × ATR = ₹8 below). With ₹1,000 maximum loss, size = 1,000 ÷ 8 = 125 shares. Targets of 2 to 3 × ATR keep the reward in proportion.", hi: "स्टॉप की दूरी = एंट्री से नीचे 2 × ATR (लॉन्ग ट्रेड के लिए)। पोज़िशन साइज़ = अधिकतम नुकसान ÷ (2 × ATR)। उदाहरण: एंट्री ₹250, ATR ₹4, स्टॉप ₹242 (2 × ATR = ₹8 नीचे)। ₹1,000 अधिकतम नुकसान पर साइज़ = 1,000 ÷ 8 = 125 शेयर। 2 से 3 × ATR का टारगेट इनाम को अनुपात में रखता है।" },
  mistake: { en: "Using a fixed stop in rupees on every stock. A volatile stock needs a wider stop, or normal noise will stop you out.", hi: "हर शेयर पर रुपयों में एक तय स्टॉप लगाना। ज़्यादा अस्थिर शेयर को चौड़ा स्टॉप चाहिए, वरना सामान्य उतार-चढ़ाव आपको बाहर कर देगा।" },
  pairs: { en: "Any entry signal above, for the stop and size.", hi: "ऊपर का कोई भी एंट्री संकेत, स्टॉप और साइज़ के लिए।" } },

 { id: "adx", file: "adx.svg", category: "trend",
  name: { en: "ADX (trend strength)", hi: "ADX (ट्रेंड की ताकत)" },
  what: { en: "Measures how strong a trend is, on a 0 to 100 scale. It does not show direction. The +DI and -DI lines show which side is stronger.", hi: "0 से 100 के पैमाने पर ट्रेंड कितना मज़बूत है, यह मापता है। यह दिशा नहीं दिखाता। +DI और -DI रेखाएँ बताती हैं कि कौन सी ओर ज़्यादा मज़बूत है।" },
  settings: { en: "14 periods. Levels: 20 (weak or range), 25 (trend).", hi: "14 अवधि। स्तर: 20 (कमज़ोर या रेंज), 25 (ट्रेंड)।" },
  when: { en: "To choose your toolkit: trend tools when ADX is above 25 and rising, range tools when it is below 20.", hi: "अपना टूलकिट चुनने के लिए: ADX 25 से ऊपर और बढ़ रहा हो तो ट्रेंड टूल, 20 से नीचे हो तो रेंज टूल।" },
  how: { en: "ADX above 25 and rising with +DI above -DI: use moving-average pullbacks or breakouts (long side). ADX below 20: avoid trend-following entries and use RSI or Bollinger reversals near the range edges. A falling ADX from a high level often means the trend is tiring.", hi: "ADX 25 से ऊपर और बढ़ रहा हो, और +DI, -DI से ऊपर हो: मूविंग एवरेज पुलबैक या ब्रेकआउट (लॉन्ग साइड) इस्तेमाल करें। ADX 20 से नीचे: ट्रेंड-फ़ॉलोइंग एंट्री से बचें, रेंज के किनारों पर RSI या बोलिंगर रिवर्सल इस्तेमाल करें। ऊँचे स्तर से गिरता ADX अक्सर बताता है कि ट्रेंड थक रहा है।" },
  mistake: { en: "Reading ADX as a buy or sell signal. It only tells you how strong a trend is.", hi: "ADX को ख़रीद या बिक्री संकेत समझना। यह केवल बताता है कि ट्रेंड कितना मज़बूत है।" },
  pairs: { en: "Moving averages or breakouts (for direction) and ATR (for stops).", hi: "मूविंग एवरेज या ब्रेकआउट (दिशा के लिए) और ATR (स्टॉप के लिए)।" } },

 { id: "volume", file: "volume.svg", category: "volume",
  name: { en: "Volume", hi: "वॉल्यूम" },
  what: { en: "The number of shares traded in a period. It shows how much participation supports a price move.", hi: "किसी अवधि में ट्रेड हुए शेयरों की संख्या। यह बताता है कि कीमत की चाल को कितनी भागीदारी का समर्थन है।" },
  settings: { en: "Compare with a 20-period average volume.", hi: "20-अवधि के औसत वॉल्यूम से तुलना करें।" },
  when: { en: "To confirm breakouts, reversals and trend moves. Always check it alongside any price signal.", hi: "ब्रेकआउट, पलटाव और ट्रेंड चालों की पुष्टि के लिए। हर कीमत संकेत के साथ इसे जाँचें।" },
  how: { en: "Breakout: buy only if volume is at least 1.5 times its 20-day average on the breakout candle. A rally on falling volume is weak; expect a pullback. Very high volume at the end of a long fall (a climax) can mark exhaustion, but confirm with the next candles.", hi: "ब्रेकआउट: ख़रीदें केवल तब जब ब्रेकआउट कैंडल पर वॉल्यूम 20-दिन के औसत का कम से कम 1.5 गुना हो। घटते वॉल्यूम पर तेज़ी कमज़ोर है; पुलबैक की उम्मीद करें। लंबी गिरावट के अंत में बहुत ज़्यादा वॉल्यूम (क्लाइमैक्स) थकान का संकेत हो सकता है, पर अगली कैंडल से पुष्टि करें।" },
  mistake: { en: "Ignoring volume on a breakout and buying a move that has no buyers behind it.", hi: "ब्रेकआउट पर वॉल्यूम को अनदेखा करना और ऐसी चाल ख़रीदना जिसके पीछे ख़रीदार न हों।" },
  pairs: { en: "Any breakout or pattern (for confirmation), and OBV (for the trend of volume).", hi: "कोई भी ब्रेकआउट या पैटर्न (पुष्टि के लिए), और OBV (वॉल्यूम के ट्रेंड के लिए)।" } },

 { id: "obv", file: "obv.svg", category: "volume",
  name: { en: "OBV (On-Balance Volume)", hi: "OBV (ऑन-बैलेंस वॉल्यूम)" },
  what: { en: "A running total of volume: add the day's volume on up days, subtract it on down days. It shows whether volume is flowing in or out.", hi: "वॉल्यूम का चलता कुल: ऊपर के दिनों पर उस दिन का वॉल्यूम जोड़ें, नीचे के दिनों पर घटाएँ। यह बताता है कि वॉल्यूम अंदर आ रहा है या बाहर जा रहा है।" },
  settings: { en: "No settings. Look at its direction and highs.", hi: "कोई सेटिंग नहीं। इसकी दिशा और हाई देखें।" },
  when: { en: "To check if a trend has volume support, or to spot accumulation before a breakout.", hi: "यह जाँचने के लिए कि ट्रेंड को वॉल्यूम का समर्थन है या नहीं, या ब्रेकआउट से पहले संग्रहण (accumulation) पहचानने के लिए।" },
  how: { en: "Confirm: if price and OBV both make new highs, the uptrend has support. Warning: if price makes a new high but OBV does not, buyers are weakening (bearish divergence). Early signal: OBV breaks its own downtrend line while price is still flat, which can come before the price breakout.", hi: "पुष्टि: अगर कीमत और OBV दोनों नए हाई बनाएँ, तो अपट्रेंड को समर्थन है। चेतावनी: कीमत नया हाई बनाए पर OBV नहीं, तो ख़रीदार कमज़ोर हो रहे हैं (बियरिश डाइवर्जेंस)। शुरुआती संकेत: कीमत स्थिर हो तब OBV अपनी गिरावट की रेखा तोड़े, जो कीमत ब्रेकआउट से पहले आ सकता है।" },
  mistake: { en: "Reading OBV as a price level. Its actual number has no meaning; only its direction and highs matter.", hi: "OBV को कीमत स्तर समझना। इसकी वास्तविक संख्या का कोई अर्थ नहीं; केवल दिशा और हाई मायने रखते हैं।" },
  pairs: { en: "Moving averages (trend) and price highs (divergence).", hi: "मूविंग एवरेज (ट्रेंड) और कीमत के हाई (डाइवर्जेंस)।" } },

 { id: "vwap", file: "vwap.svg", category: "volume",
  name: { en: "VWAP (Volume Weighted Average Price)", hi: "VWAP (वॉल्यूम वेटेड एवरेज प्राइस)" },
  what: { en: "The average price for the day, weighted by volume. Many institutions use it as a fair-value benchmark. It resets every session.", hi: "दिन की औसत कीमत, वॉल्यूम के हिसाब से भारित। कई संस्थान इसे उचित मूल्य (fair value) के मानदंड के रूप में इस्तेमाल करते हैं। यह हर सत्र में नए सिरे से शुरू होता है।" },
  settings: { en: "Intraday: calculated from the session open.", hi: "इंट्राडे: सत्र के ओपन से गणना।" },
  when: { en: "For intraday trades, to see whether buyers or sellers control the session.", hi: "इंट्राडे ट्रेड के लिए, यह देखने के लिए कि सत्र पर ख़रीदार या विक्रेता नियंत्रण में हैं।" },
  how: { en: "Price above VWAP and holding: look for long entries on pullbacks to VWAP, with a stop just below it. Price below VWAP: avoid longs, or look for short setups on rallies back to VWAP. A stop that is too tight below VWAP gets hit by normal noise, so use ATR to size it.", hi: "कीमत VWAP के ऊपर और टिकी हो: VWAP तक पुलबैक पर लॉन्ग एंट्री खोजें, उसके ठीक नीचे स्टॉप के साथ। कीमत VWAP के नीचे हो: लॉन्ग से बचें, या VWAP तक उछाल पर शॉर्ट सेटअप खोजें। VWAP के नीचे बहुत तंग स्टॉप सामान्य उतार-चढ़ाव से बाहर कर देगा, इसलिए ATR से उसका आकार तय करें।" },
  mistake: { en: "Using VWAP on a swing trade or on a stock that opened with a big gap. Its value comes from one session's trading.", hi: "स्विंग ट्रेड पर या बड़े गैप से खुले शेयर पर VWAP इस्तेमाल करना। इसका मूल्य एक सत्र के ट्रेडिंग से आता है।" },
  pairs: { en: "Volume (is the move supported?) and ATR (for stops).", hi: "वॉल्यूम (चाल का समर्थन?) और ATR (स्टॉप के लिए)।" } }
];

const INDICATOR_RULES = {
 en: ["Use two or three indicators that measure different things, such as one trend tool, one momentum tool and volume. Ten indicators that say the same thing add no information.", "Indicators lag. Confirm a signal with price structure (support, resistance, pattern) before acting.", "Decide the stop-loss before entering. ATR is a good tool for the distance.", "Backtest or paper-trade each indicator for at least 30 trades before risking real money."],
 hi: ["दो या तीन ऐसे इंडिकेटर इस्तेमाल करें जो अलग चीज़ें मापें, जैसे एक ट्रेंड टूल, एक मोमेंटम टूल और वॉल्यूम। दस इंडिकेटर जो एक ही बात कहें, कोई नई जानकारी नहीं देते।", "इंडिकेटर देर से चलते हैं। कार्रवाई से पहले कीमत की संरचना (सपोर्ट, रेज़िस्टेंस, पैटर्न) से संकेत की पुष्टि करें।", "एंट्री से पहले स्टॉप-लॉस तय करें। इसकी दूरी के लिए ATR अच्छा उपकरण है।", "असली पैसा लगाने से पहले हर इंडिकेटर को कम से कम 30 ट्रेड पर बैकटेस्ट या पेपर-ट्रेड करें।"]
};
