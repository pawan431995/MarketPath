// Chart images shown on each lesson page. Files live in images/charts/ (SVG).
// Each entry: file name, plus alt text and caption in English (en) and Hindi (hi).
const LESSON_CHARTS = {
 "investing": [
  { file: "compounding-vs-simple.svg",
    en: { alt: "Line chart: ₹1 lakh compounding at 10% versus simple interest over 20 years", cap: "Compounding (green) pulls away from simple interest (grey dashed) the longer money stays invested." },
    hi: { alt: "लाइन चार्ट: 10% पर ₹1 लाख की कंपाउंडिंग बनाम 20 साल का सिंपल ब्याज", cap: "जितना लंबे समय तक पैसा निवेशित रहता है, कंपाउंडिंग (हरी रेखा) सिंपल ब्याज (धूसर डैश) से उतनी ही आगे निकलती है।" } },
  { file: "portfolio-donut.svg",
    en: { alt: "Donut chart: 50% equities, 30% bonds, 20% gold", cap: "An illustrative split across equities, bonds and gold. The mix should follow your goals and risk tolerance." },
    hi: { alt: "डोनट चार्ट: 50% इक्विटी, 30% बॉन्ड, 20% सोना", cap: "इक्विटी, बॉन्ड और सोने में एक उदाहरण बँटवारा। आपका मिश्रण आपके लक्ष्य और जोखिम क्षमता के अनुसार होना चाहिए।" } }
 ],
 "sip-mutual-funds": [
  { file: "sip-growth.svg",
    en: { alt: "Area chart: ₹5,000 monthly SIP at 12% over 20 years, value versus amount invested", cap: "The green area is the estimated value; the dashed line is the amount you actually paid in. Growth is an assumption, not a promise." },
    hi: { alt: "एरिया चार्ट: 12% पर 20 साल की ₹5,000 मासिक SIP, वैल्यू बनाम लगाई गई राशि", cap: "हरा क्षेत्र अनुमानित वैल्यू है; डैश रेखा वह राशि है जो आपने वास्तव में लगाई। बढ़त एक अनुमान है, वादा नहीं।" } },
  { file: "nav-cost-averaging.svg",
    en: { alt: "NAV line over six months with units bought each month from a ₹5,000 SIP", cap: "When NAV falls, the same ₹5,000 buys more units, which lowers the average cost per unit." },
    hi: { alt: "छह महीनों में NAV रेखा और ₹5,000 SIP से हर महीने ख़रीदी गई यूनिट", cap: "जब NAV गिरता है, तो वही ₹5,000 ज़्यादा यूनिट ख़रीदता है, जिससे प्रति यूनिट औसत लागत घटती है।" } }
 ],
 "reading-charts": [
  { file: "chart-types.svg",
    en: { alt: "Same 14 price bars shown as a line chart, OHLC bar chart and candlestick chart", cap: "The same data in three styles. Candlesticks and OHLC bars show more detail per period than a simple line." },
    hi: { alt: "14 कीमत अवधियों को लाइन, OHLC बार और कैंडलस्टिक चार्ट के रूप में", cap: "एक ही डेटा तीन शैलियों में। कैंडलस्टिक और OHLC बार हर अवधि की ज़्यादा जानकारी दिखाते हैं।" } },
  { file: "candle-anatomy.svg",
    en: { alt: "Diagram of a green bullish candle and a red bearish candle with open, high, low and close labelled", cap: "Body = open to close. Wicks = the high and low of the period. Green means the close was above the open." },
    hi: { alt: "हरी तेज़ी वाली और लाल मंदी वाली कैंडल का आरेख, जिसमें ओपन, हाई, लो और क्लोज़ दिखाए गए हैं", cap: "बॉडी = ओपन से क्लोज़ तक। विक = उस अवधि का हाई और लो। हरा मतलब क्लोज़ ओपन से ऊपर।" } },
  { file: "volume-breakout.svg",
    en: { alt: "Candlestick chart with volume bars below; a breakout on high volume is highlighted", cap: "A breakout backed by high volume (yellow label) carries more weight than the same move on light volume." },
    hi: { alt: "नीचे वॉल्यूम बार के साथ कैंडलस्टिक चार्ट; ज़्यादा वॉल्यूम वाला ब्रेकआउट चिह्नित है", cap: "ज़्यादा वॉल्यूम वाला ब्रेकआउट (पीला लेबल) कम वॉल्यूम वाली उसी चाल से ज़्यादा भरोसेमंद माना जाता है।" } }
 ],
 "fundamental-analysis": [
  { file: "pe-comparison.svg",
    en: { alt: "Horizontal bar chart comparing P/E ratios of five companies in one industry", cap: "Compare P/E within the same industry. A high P/E is not automatically expensive, and a low one is not automatically cheap." },
    hi: { alt: "एक ही उद्योग की पाँच कंपनियों के P/E अनुपात की तुलना वाला क्षैतिज बार चार्ट", cap: "P/E की तुलना एक ही उद्योग में करें। ऊँचा P/E अपने आप महँगा नहीं, और कम P/E अपने आप सस्ता नहीं होता।" } }
 ],
 "technical-analysis": [
  { file: "trend-lines.svg",
    en: { alt: "Price path with higher highs (H) and higher lows (L) and a rising trend line", cap: "An uptrend: each swing high and swing low is higher than the one before. A trend line connects the higher lows." },
    hi: { alt: "ऊँचे हाई (H) और ऊँचे लो (L) के साथ कीमत पथ और ऊपर जाती ट्रेंड लाइन", cap: "अपट्रेंड: हर स्विंग हाई और स्विंग लो पिछले से ऊँचा होता है। ट्रेंड लाइन ऊँचे लो को जोड़ती है।" } },
  { file: "support-resistance.svg",
    en: { alt: "Candlesticks bouncing between a support band near 100 and a resistance band near 120", cap: "Price keeps bouncing between support (green band) and resistance (red band). A clean break of either band is a signal to watch." },
    hi: { alt: "लगभग 100 के सपोर्ट बैंड और लगभग 120 के रेज़िस्टेंस बैंड के बीच उछलती कैंडल", cap: "कीमत सपोर्ट (हरा बैंड) और रेज़िस्टेंस (लाल बैंड) के बीच उछलती रहती है। किसी भी बैंड का साफ़ टूटना ध्यान देने योग्य संकेत है।" } },
  { file: "moving-averages.svg",
    en: { alt: "Price with 10-period and 50-period simple moving averages and a crossover marked", cap: "A short moving average crossing a long one (Cross) is a widely watched trend-change signal." },
    hi: { alt: "10-अवधि और 50-अवधि के सिंपल मूविंग एवरेज के साथ कीमत और चिह्नित क्रॉसओवर", cap: "छोटे मूविंग एवरेज का बड़े को पार करना (Cross) ट्रेंड बदलने का व्यापक रूप से देखा जाने वाला संकेत है।" } },
  { file: "rsi-panel.svg",
    en: { alt: "Price chart above an RSI panel with 70 and 30 reference lines", cap: "RSI above 70 is often called overbought and below 30 oversold, but strong trends can stay in those zones for a long time." },
    hi: { alt: "ऊपर कीमत चार्ट और नीचे RSI पैनल, जिसमें 70 और 30 की संदर्भ रेखाएँ हैं", cap: "RSI 70 से ऊपर को अक्सर ओवरबॉट और 30 से नीचे को ओवरसोल्ड कहा जाता है, पर मज़बूत ट्रेंड इन स्तरों पर लंबे समय तक रह सकते हैं।" } },
  { file: "macd-panel.svg",
    en: { alt: "Price chart above a MACD panel showing MACD line, signal line and histogram", cap: "When the MACD line crosses above its signal line the histogram turns positive, which is read as rising momentum." },
    hi: { alt: "ऊपर कीमत चार्ट और नीचे MACD पैनल: MACD रेखा, सिग्नल रेखा और हिस्टोग्राम", cap: "जब MACD रेखा सिग्नल रेखा के ऊपर जाती है, तो हिस्टोग्राम सकारात्मक होता है, जिसे बढ़ता मोमेंटम माना जाता है।" } }
 ],
 "swing-trading": [
  { file: "swing-setup.svg",
    en: { alt: "Candlestick chart of a breakout with entry, stop and target lines marked", cap: "A complete setup: entry above resistance at 250, stop at 240, target at 270. Risk is fixed before the trade starts." },
    hi: { alt: "ब्रेकआउट का कैंडलस्टिक चार्ट, जिसमें एंट्री, स्टॉप और टारगेट की रेखाएँ चिह्नित हैं", cap: "पूरा सेटअप: 250 के रेज़िस्टेंस के ऊपर एंट्री, 240 पर स्टॉप, 270 पर टारगेट। ट्रेड शुरू होने से पहले जोखिम तय हो जाता है।" } },
  { file: "gap-down-stop.svg",
    en: { alt: "Candlestick chart where the price gaps down overnight past a stop-loss at 240", cap: "A gap can open below your stop, so the loss can be bigger than planned. Size positions with this in mind." },
    hi: { alt: "कैंडलस्टिक चार्ट जिसमें कीमत रात भर 240 के स्टॉप-लॉस से नीचे गैप डाउन करती है", cap: "गैप आपके स्टॉप से नीचे खुल सकता है, इसलिए नुकसान योजना से बड़ा हो सकता है। पोज़िशन का आकार इसी को ध्यान में रखकर तय करें।" } }
 ],
 "risk-management": [
  { file: "drawdown-recovery.svg",
    en: { alt: "Bar chart of the gain needed to recover from losses of 10%, 20%, 30%, 50% and 75%", cap: "The deeper the loss, the much larger the gain needed to recover. A 50% loss needs a 100% gain." },
    hi: { alt: "10%, 20%, 30%, 50% और 75% नुकसान से उबरने के लिए चाहिए लाभ का बार चार्ट", cap: "नुकसान जितना गहरा, वापसी के लिए उतना ही बड़ा लाभ चाहिए। 50% नुकसान की भरपाई के लिए 100% लाभ चाहिए।" } }
 ],
 "intraday-trading": [
  { file: "opening-range.svg",
    en: { alt: "Intraday candlestick chart with the opening range shaded and a breakout above it", cap: "Opening range breakout: the high and low of the first 15 minutes form a range; a move beyond it is the signal. Session times are illustrative." },
    hi: { alt: "ओपनिंग रेंज को छायांकित करता इंट्राडे कैंडलस्टिक चार्ट, और उसके ऊपर ब्रेकआउट", cap: "ओपनिंग रेंज ब्रेकआउट: पहले 15 मिनट का हाई और लो एक रेंज बनाते हैं; उसके पार की चाल संकेत है। सत्र का समय उदाहरण के लिए है।" } }
 ],
 "futures-options": [
  { file: "payoff-diagrams.svg",
    en: { alt: "Three payoff diagrams: long call, short call and long put at strike 100 with premium 5", cap: "Payoff at expiry: a long call gains above the strike, a short call loses above it, and a long put gains below it." },
    hi: { alt: "तीन पेऑफ़ आरेख: स्ट्राइक 100 और प्रीमियम 5 पर लॉन्ग कॉल, शॉर्ट कॉल और लॉन्ग पुट", cap: "एक्सपायरी पर पेऑफ़: लॉन्ग कॉल स्ट्राइक से ऊपर लाभ देती है, शॉर्ट कॉल ऊपर नुकसान देती है, और लॉन्ग पुट स्ट्राइक से नीचे लाभ देता है।" } }
 ],
 "option-greeks": [
  { file: "delta-theta.svg",
    en: { alt: "Left: call delta rising from 0 to 1 as the stock moves through the strike. Right: time value falling as expiry approaches", cap: "Delta rises as the stock moves above the strike. Time value decays slowly at first and faster near expiry. Shapes are illustrative." },
    hi: { alt: "बाएँ: स्ट्राइक से गुज़रते हुए कॉल डेल्टा 0 से 1 तक बढ़ता है। दाएँ: एक्सपायरी नज़दीक आने पर टाइम वैल्यू घटती है", cap: "स्टॉक स्ट्राइक से ऊपर जाने पर डेल्टा बढ़ता है। टाइम वैल्यू शुरू में धीरे और एक्सपायरी के पास तेज़ी से घटती है। आकृतियाँ उदाहरण हैं।" } },
  { file: "bull-call-spread.svg",
    en: { alt: "Payoff of a bull call spread with a maximum profit of 5, maximum loss of 5 and break-even at 105", cap: "A bull call spread has a fixed maximum profit and loss. Break-even is the lower strike plus the net debit." },
    hi: { alt: "बुल कॉल स्प्रेड का पेऑफ़: अधिकतम लाभ 5, अधिकतम नुकसान 5 और ब्रेक-ईवन 105", cap: "बुल कॉल स्प्रेड का अधिकतम लाभ और नुकसान पहले से तय होता है। ब्रेक-ईवन = निचली स्ट्राइक + नेट डेबिट।" } }
 ],
 "trading-psychology": [
  { file: "loss-aversion-stop.svg",
    en: { alt: "Price falls to a planned stop at 90 and exits with a 10% loss; a held trade falls to 60", cap: "Had the trader followed the stop, the loss would be 10%. Holding on turned it into 40%." },
    hi: { alt: "कीमत योजना के स्टॉप 90 तक गिरती है और 10% नुकसान पर बाहर निकलती है; होल्ड किया गया ट्रेड 60 तक गिरता है", cap: "अगर ट्रेडर स्टॉप का पालन करता, तो नुकसान 10% होता। होल्ड करने से यह 40% हो गया।" } }
 ]
};
