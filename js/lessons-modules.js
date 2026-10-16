// Two learning modules built from the pattern and indicator libraries (moved out of the main menu).
// The lesson page renders the full pattern or indicator cards for these modules (see lesson.js).
// Loaded after lessons.js. Adds the modules to LESSONS and to the course order.
Object.assign(LESSONS.en, {
 "candlestick-patterns": {
  title: "Candlestick and Chart Patterns", level: "intermediate", time: "25 patterns",
  summary: "Learn what each candle and chart shape signals, when it matters, how to confirm it, and the mistake to avoid.",
  sections: [
   { h: "How to use this module", p: "Patterns describe how buyers and sellers behaved in the recent past. They show probabilities, not certainties. Read each pattern in its context: where it appears, the trend before it, and whether it is confirmed by the next candles and by volume.", ul: [
    "Green candles closed higher than they opened. Red candles closed lower. Gold highlights in the images mark the pattern.",
    "Candlestick patterns (one to three candles) are most useful at support, resistance, and after a clear trend.",
    "Chart patterns (head and shoulders, triangles, flags) take longer to form. Act only after the breakout is confirmed.",
    "Never trade a pattern alone. Use a stop-loss and check the trend and volume first."
   ] }
  ]
 },
 "technical-indicators": {
  title: "Technical Indicators", level: "intermediate", time: "10 indicators",
  summary: "Understand what moving averages, RSI, MACD, volume and other indicators measure, when to use each one, and how to use them in a trade.",
  sections: [
   { h: "How to use this module", p: "Indicators are calculated from past prices and volume. They lag, and they can give false signals, especially in sideways markets. Their job is to help you read the situation, not to predict the future.", ul: [
    "Pick two or three indicators that measure different things: one for trend, one for momentum, and volume to confirm.",
    "Decide the stop-loss before you enter. ATR is a practical way to set its distance.",
    "Test each indicator on paper for at least 30 trades before you risk real money."
   ] }
  ]
 }
});
Object.assign(LESSONS.hi, {
 "candlestick-patterns": {
  title: "कैंडलस्टिक और चार्ट पैटर्न", level: "intermediate", time: "25 पैटर्न",
  summary: "हर कैंडल और चार्ट आकार का संकेत, उसका महत्व, पुष्टि कैसे करें, और कौन सी गलती से बचें, यह सीखें।",
  sections: [
   { h: "इस मॉड्यूल का उपयोग कैसे करें", p: "पैटर्न बताते हैं कि हाल के समय में ख़रीदारों और विक्रेताओं का व्यवहार कैसा रहा। ये संभावनाएँ दिखाते हैं, निश्चितता नहीं। हर पैटर्न को उसके संदर्भ में पढ़ें: वह कहाँ बना, उससे पहले का ट्रेंड क्या था, और अगली कैंडल व वॉल्यूम उसकी पुष्टि करते हैं या नहीं।", ul: [
    "हरी कैंडल का क्लोज़ ओपन से ऊपर रहा। लाल कैंडल का क्लोज़ नीचे रहा। चित्रों में सुनहरा हिस्सा पैटर्न को चिह्नित करता है।",
    "कैंडलस्टिक पैटर्न (एक से तीन कैंडल) सपोर्ट, रेज़िस्टेंस और साफ़ ट्रेंड के बाद सबसे उपयोगी होते हैं।",
    "चार्ट पैटर्न (हेड एंड शोल्डर्स, ट्राएंगल, फ़्लैग) बनने में ज़्यादा समय लेते हैं। ब्रेकआउट की पुष्टि के बाद ही कार्रवाई करें।",
    "कभी भी केवल पैटर्न पर ट्रेड न करें। स्टॉप-लॉस रखें और पहले ट्रेंड व वॉल्यूम जाँचें।"
   ] }
  ]
 },
 "technical-indicators": {
  title: "टेक्निकल इंडिकेटर", level: "intermediate", time: "10 इंडिकेटर",
  summary: "मूविंग एवरेज, RSI, MACD, वॉल्यूम और अन्य इंडिकेटर क्या मापते हैं, हर एक कब इस्तेमाल करें, और ट्रेड में कैसे इस्तेमाल करें, यह समझें।",
  sections: [
   { h: "इस मॉड्यूल का उपयोग कैसे करें", p: "इंडिकेटर पिछली कीमत और वॉल्यूम से बनते हैं। ये देर से चलते हैं, और ख़ासकर साइडवे बाज़ार में झूठे संकेत दे सकते हैं। इनका काम स्थिति पढ़ने में मदद करना है, भविष्य बताना नहीं।", ul: [
    "दो या तीन ऐसे इंडिकेटर चुनें जो अलग चीज़ें मापें: एक ट्रेंड के लिए, एक मोमेंटम के लिए, और पुष्टि के लिए वॉल्यूम।",
    "एंट्री से पहले स्टॉप-लॉस तय करें। ATR उसकी दूरी तय करने का व्यावहारिक तरीका है।",
    "असली पैसा लगाने से पहले हर इंडिकेटर को कम से कम 30 ट्रेड पर पेपर पर परखें।"
   ] }
  ]
 }
});
LESSON_ORDER.splice(LESSON_ORDER.indexOf("fundamental-analysis"), 0, "candlestick-patterns");
LESSON_ORDER.splice(LESSON_ORDER.indexOf("swing-trading"), 0, "technical-indicators");
