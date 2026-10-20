// "Practise it" tasks at the end of each lesson: short exercises that send the learner to the paper-trading
// terminal (virtual money) or a calculator to apply what the module taught. Ticks are saved in the browser.
// Each task is [target, English, Hindi]. Targets: a terminal screen ("chart", "screener", "strategy", "replay",
// "journal", "orders", "portfolio", "history", "funds"), "calc:<calculator id>" or "url:<external page>".
window.MP_PRACTICE = {
 foundations: [
  ["chart", "Open the paper-trading chart, add RELIANCE or any company you know to the watchlist, and note its last price, day change and 52-week range.", "पेपर-ट्रेडिंग चार्ट खोलें, RELIANCE या अपनी जानी-पहचानी किसी कंपनी को वॉचलिस्ट में जोड़ें, और उसका अंतिम भाव, दिन का बदलाव और 52-सप्ताह की रेंज लिखें।"],
  ["chart", "Buy 5 shares with a delivery (CNC) market order using the virtual ₹10 lakh account, then open the order window again and read every charge in the breakdown.", "वर्चुअल ₹10 लाख खाते से डिलीवरी (CNC) मार्केट ऑर्डर में 5 शेयर ख़रीदें, फिर ऑर्डर विंडो दोबारा खोलकर ब्रेकडाउन का हर चार्ज पढ़ें।"],
  ["portfolio", "Open Portfolio and find the stock under Holdings. Compare its average price with the price you paid and explain the difference.", "पोर्टफ़ोलियो खोलें और होल्डिंग्स में वह शेयर देखें। उसके औसत भाव की तुलना अपने चुकाए भाव से करें और अंतर समझाएँ।"]
 ],
 "market-rules": [
  ["chart", "Place a limit buy order below the current price and watch it wait under Orders. Then cancel it.", "मौजूदा भाव से नीचे लिमिट बाय ऑर्डर लगाएँ और ऑर्डर्स में उसे इंतज़ार करते देखें। फिर उसे रद्द करें।"],
  ["orders", "Modify an open limit order: change its quantity and price, then convert it to a market order. Note how the executed price differs.", "किसी खुले लिमिट ऑर्डर को बदलें: उसकी मात्रा और भाव बदलें, फिर उसे मार्केट ऑर्डर में बदलें। देखें कि एक्ज़िक्यूटेड भाव कितना अलग रहा।"],
  ["chart", "Open an intraday (MIS) position on the real-price feed and check what happens at 3:20 pm IST, when brokers square off intraday trades.", "रियल-प्राइस फ़ीड पर इंट्राडे (MIS) पोज़िशन लें और देखें कि 3:20 pm IST पर क्या होता है, जब ब्रोकर इंट्राडे ट्रेड स्क्वेयर-ऑफ़ करते हैं।"]
 ],
 investing: [
  ["screener", "Run the \"Low volatility leaders\" screen and pick three stocks from different sectors for a long-term watchlist.", "\"Low volatility leaders\" स्क्रीन चलाएँ और लंबी अवधि की वॉचलिस्ट के लिए अलग-अलग सेक्टर के तीन शेयर चुनें।"],
  ["chart", "Build a small diversified portfolio: invest about ₹1 lakh of virtual money across those three stocks with delivery orders.", "एक छोटा विविध पोर्टफ़ोलियो बनाएँ: डिलीवरी ऑर्डर से उन तीन शेयरों में लगभग ₹1 लाख वर्चुअल पैसा लगाएँ।"],
  ["calc:compound-interest", "Use the compound interest calculator to see what ₹1 lakh becomes in 15 years at 10% and at 12% a year.", "चक्रवृद्धि ब्याज कैलकुलेटर से देखें कि ₹1 लाख 15 साल में 10% और 12% सालाना पर कितना बनता है।"]
 ],
 "sip-mutual-funds": [
  ["calc:sip", "Calculate a ₹5,000 monthly SIP for 10, 20 and 30 years at 12%. Note how much of the final value is growth.", "₹5,000 मासिक SIP का 10, 20 और 30 साल के लिए 12% पर हिसाब लगाएँ। देखें कि अंतिम मूल्य में कितना हिस्सा बढ़त है।"],
  ["calc:step-up-sip", "Repeat with a 10% yearly step-up and compare the result with the plain SIP.", "10% सालाना स्टेप-अप के साथ दोहराएँ और नतीजे की तुलना सामान्य SIP से करें।"],
  ["replay", "In Bar replay, buy a fixed amount of one NIFTY 50 stock every 20 bars (a do-it-yourself SIP) and compare your average price with buy-and-hold.", "बार रीप्ले में हर 20 बार पर किसी NIFTY 50 शेयर में तय रक़म ख़रीदें (ख़ुद का SIP) और अपने औसत भाव की तुलना बाय-एंड-होल्ड से करें।"]
 ],
 "reading-charts": [
  ["chart", "Open a stock's chart on the daily timeframe and switch between candles, OHLC bars, line and Heikin Ashi. Note what each one hides or shows.", "किसी शेयर का डेली चार्ट खोलें और कैंडल, OHLC बार, लाइन और हाइकिन आशी में बदलें। देखें कि हर एक क्या दिखाता या छिपाता है।"],
  ["chart", "Switch between 5-minute, 1-hour and daily candles for the same stock and describe the trend on each timeframe.", "उसी शेयर के 5-मिनट, 1-घंटे और डेली कैंडल देखें और हर टाइमफ़्रेम पर ट्रेंड बताएँ।"],
  ["chart", "Use the horizontal-line tool to mark one support and one resistance level, then check where volume was highest.", "हॉरिज़ॉन्टल-लाइन टूल से एक सपोर्ट और एक रेज़िस्टेंस स्तर चिह्नित करें, फिर देखें कि वॉल्यूम सबसे ज़्यादा कहाँ था।"]
 ],
 "candlestick-patterns": [
  ["replay", "Start Bar replay in blind mode and stop every time you spot a hammer, engulfing or doji. Write down what the next three candles did.", "ब्लाइंड मोड में बार रीप्ले शुरू करें और हर बार हैमर, एंगल्फ़िंग या डोजी दिखने पर रुकें। लिखें कि अगली तीन कैंडल ने क्या किया।"],
  ["screener", "Run \"Near 52-week low\" and look for bullish reversal candles at support on the charts of the results.", "\"Near 52-week low\" चलाएँ और नतीजों के चार्ट पर सपोर्ट के पास बुलिश रिवर्सल कैंडल खोजें।"],
  ["journal", "Take two replay trades based only on a candlestick pattern and record the pattern as the main skill in the journal.", "सिर्फ़ कैंडलस्टिक पैटर्न के आधार पर दो रीप्ले ट्रेड लें और जर्नल में पैटर्न को मुख्य स्किल के रूप में दर्ज करें।"]
 ],
 "fundamental-analysis": [
  ["screener", "Filter the NIFTY 500 by one sector and compare the 1-year returns of its five biggest companies.", "NIFTY 500 को एक सेक्टर से फ़िल्टर करें और उसकी पाँच सबसे बड़ी कंपनियों के 1-साल के रिटर्न की तुलना करें।"],
  ["calc:cagr", "Find a company's revenue five years ago and today in its annual report and calculate its sales CAGR.", "किसी कंपनी की वार्षिक रिपोर्ट से पाँच साल पहले और आज की आय देखें और उसकी बिक्री का CAGR निकालें।"],
  ["chart", "Pick the company with the best fundamentals in your sector list and buy a small virtual position to track it over time.", "अपनी सेक्टर सूची में सबसे अच्छे फ़ंडामेंटल वाली कंपनी चुनें और समय के साथ उस पर नज़र रखने के लिए छोटी वर्चुअल पोज़िशन लें।"]
 ],
 "balance-sheet": [
  ["screener", "Pick one stock from the screener and read its latest balance sheet on the exchange or company website. Note total debt and equity.", "स्क्रीनर से एक शेयर चुनें और एक्सचेंज या कंपनी की वेबसाइट पर उसकी नवीनतम बैलेंस शीट पढ़ें। कुल क़र्ज़ और इक्विटी लिखें।"],
  ["calc:runway", "Enter its current assets and current liabilities in the working-capital calculator and check the current ratio.", "उसकी करंट एसेट्स और करंट लायबिलिटीज़ वर्किंग-कैपिटल कैलकुलेटर में डालें और करंट रेशियो देखें।"]
 ],
 "cash-flow-statement": [
  ["screener", "For one company from the screener, compare operating cash flow with net profit for the last three years in its annual report.", "स्क्रीनर की किसी एक कंपनी के लिए उसकी वार्षिक रिपोर्ट में पिछले तीन साल का ऑपरेटिंग कैश फ़्लो और शुद्ध लाभ की तुलना करें।"],
  ["calc:runway", "Use the cash-runway calculator to estimate how many months its cash would last if operating cash flow turned negative.", "कैश-रनवे कैलकुलेटर से अनुमान लगाएँ कि ऑपरेटिंग कैश फ़्लो नेगेटिव होने पर उसका कैश कितने महीने चलेगा।"]
 ],
 "quarterly-results": [
  ["chart", "Find a company that announced results recently and look at its 5-minute chart on the result day. Did price gap, and did the gap hold?", "हाल में नतीजे घोषित करने वाली कंपनी चुनें और नतीजे वाले दिन का 5-मिनट चार्ट देखें। क्या भाव में गैप आया, और क्या वह टिका?"],
  ["screener", "Run \"Top gainers today\" and \"Top losers today\" in results season and check how many moved on results.", "रिज़ल्ट सीज़न में \"Top gainers today\" और \"Top losers today\" चलाएँ और देखें कि कितने नतीजों की वजह से चले।"]
 ],
 "annual-report": [
  ["screener", "Choose one company from the screener and download its latest annual report. Find the auditor's opinion and the related-party transactions note.", "स्क्रीनर से एक कंपनी चुनें और उसकी नवीनतम वार्षिक रिपोर्ट डाउनलोड करें। ऑडिटर की राय और संबंधित-पक्ष लेन-देन वाला नोट खोजें।"],
  ["journal", "Write three reasons you would or would not invest in it, and keep them in the journal notes of a small virtual trade.", "तीन कारण लिखें कि आप उसमें निवेश करेंगे या नहीं, और उन्हें छोटे वर्चुअल ट्रेड के जर्नल नोट्स में रखें।"]
 ],
 "shareholding-pattern": [
  ["screener", "For two stocks from the screener, look up the last four quarters' shareholding on the exchange website. Note promoter, FII, DII and pledged shares.", "स्क्रीनर के दो शेयरों के लिए एक्सचेंज वेबसाइट पर पिछली चार तिमाहियों का शेयरहोल्डिंग देखें। प्रमोटर, FII, DII और गिरवी शेयर लिखें।"],
  ["chart", "Compare each stock's price trend over the same year with the change in institutional holding.", "उसी साल में हर शेयर के भाव के ट्रेंड की तुलना संस्थागत होल्डिंग में बदलाव से करें।"]
 ],
 "valuation-basics": [
  ["screener", "Pick two companies in the same sector and calculate the P/E of each from its price and last year's EPS.", "एक ही सेक्टर की दो कंपनियाँ चुनें और उनके भाव और पिछले साल के EPS से हर एक का P/E निकालें।"],
  ["calc:npv-irr", "Use the NPV & IRR calculator with a simple five-year cash-flow forecast to see how the discount rate changes the value.", "पाँच साल के सरल कैश-फ़्लो अनुमान के साथ NPV और IRR कैलकुलेटर से देखें कि डिस्काउंट रेट बदलने पर मूल्य कैसे बदलता है।"]
 ],
 "corporate-actions": [
  ["chart", "Find a stock that had a split or bonus in the last two years and look at its daily chart around that date. Is the history adjusted?", "पिछले दो साल में स्प्लिट या बोनस वाला शेयर खोजें और उस तारीख़ के आसपास उसका डेली चार्ट देखें। क्या इतिहास समायोजित है?"],
  ["calc:drip", "Use the dividend reinvestment calculator to compare taking dividends as cash with reinvesting them for 15 years.", "डिविडेंड रीइन्वेस्टमेंट कैलकुलेटर से 15 साल तक डिविडेंड नक़द लेने और दोबारा निवेश करने की तुलना करें।"]
 ],
 "technical-analysis": [
  ["chart", "Draw a trend line along three higher lows on a daily chart and mark, with a horizontal line, the level where the trend would break.", "डेली चार्ट पर तीन हायर लो के साथ ट्रेंड लाइन खींचें और हॉरिज़ॉन्टल लाइन से वह स्तर चिह्नित करें जहाँ ट्रेंड टूटेगा।"],
  ["chart", "Use the Fibonacci tool on the last big swing and see whether price paused near 38.2%, 50% or 61.8%.", "पिछले बड़े स्विंग पर फ़िबोनाची टूल लगाएँ और देखें कि भाव 38.2%, 50% या 61.8% के पास रुका या नहीं।"],
  ["replay", "In Bar replay, trade only breakouts above resistance for one session and review the end-of-session summary.", "बार रीप्ले में एक सत्र तक सिर्फ़ रेज़िस्टेंस के ऊपर ब्रेकआउट पर ट्रेड करें और सत्र के अंत का सारांश देखें।"]
 ],
 "technical-indicators": [
  ["chart", "Add EMA 9/21, RSI and MACD to one chart. Mark three places where they agreed and three where they disagreed.", "एक चार्ट पर EMA 9/21, RSI और MACD जोड़ें। तीन जगह चिह्नित करें जहाँ वे सहमत थे और तीन जहाँ असहमत।"],
  ["screener", "Run \"Oversold (RSI < 30)\" and \"MACD bullish crossover\" and check which results are still in a downtrend.", "\"Oversold (RSI < 30)\" और \"MACD bullish crossover\" चलाएँ और देखें कि कौन-से नतीजे अब भी डाउनट्रेंड में हैं।"],
  ["strategy", "Backtest the \"EMA 9 / 21 crossover\" template on one stock, then on your watchlist. Compare it with buy-and-hold.", "\"EMA 9 / 21 crossover\" टेम्पलेट को एक शेयर पर, फिर अपनी वॉचलिस्ट पर बैकटेस्ट करें। इसकी तुलना बाय-एंड-होल्ड से करें।"]
 ],
 "swing-trading": [
  ["screener", "Run \"Pullback in an uptrend\" and shortlist two setups with a clear stop-loss below the recent swing low.", "\"Pullback in an uptrend\" चलाएँ और ऐसे दो सेटअप चुनें जिनमें हाल के स्विंग लो के नीचे साफ़ स्टॉप-लॉस हो।"],
  ["strategy", "Backtest the \"Pullback to the 20 EMA in an uptrend\" template with a stop-loss and target. Check win rate, drawdown and profit factor.", "\"Pullback to the 20 EMA in an uptrend\" टेम्पलेट को स्टॉप-लॉस और टारगेट के साथ बैकटेस्ट करें। विन रेट, ड्रॉडाउन और प्रॉफ़िट फ़ैक्टर देखें।"],
  ["replay", "Take five swing trades in Bar replay on daily candles, each risking 1% of capital, and journal every one.", "डेली कैंडल पर बार रीप्ले में पाँच स्विंग ट्रेड लें, हर एक में पूँजी का 1% जोखिम रखें, और हर एक को जर्नल करें।"]
 ],
 "risk-management": [
  ["calc:position-size", "With ₹10 lakh capital and 1% risk, calculate the position size for an entry at ₹500 with a stop at ₹480.", "₹10 लाख पूँजी और 1% जोखिम के साथ ₹500 पर एंट्री और ₹480 पर स्टॉप के लिए पोज़िशन साइज़ निकालें।"],
  ["chart", "Place that trade in the terminal and draw a long risk-reward box on the chart with a 1:2 target.", "वह ट्रेड टर्मिनल में लगाएँ और चार्ट पर 1:2 टारगेट के साथ लॉन्ग रिस्क-रिवॉर्ड बॉक्स बनाएँ।"],
  ["journal", "After ten closed trades, open Diagnostics and read your expectancy, average R and maximum drawdown.", "दस बंद ट्रेड के बाद डायग्नॉस्टिक्स खोलें और अपनी एक्सपेक्टेंसी, औसत R और अधिकतम ड्रॉडाउन पढ़ें।"]
 ],
 "intraday-trading": [
  ["replay", "Replay the last five days of 5-minute prices and trade only the first hour. Use a stop-loss on every trade.", "पिछले पाँच दिनों के 5-मिनट भाव रीप्ले करें और सिर्फ़ पहले घंटे में ट्रेड करें। हर ट्रेड में स्टॉप-लॉस रखें।"],
  ["chart", "Add VWAP to a 5-minute chart and note how often price returned to it during the day.", "5-मिनट चार्ट पर VWAP जोड़ें और देखें कि दिन में भाव कितनी बार उस पर लौटा।"],
  ["history", "Open Trade history and check whether charges ate more than a third of your gross intraday profit.", "ट्रेड हिस्ट्री खोलें और देखें कि क्या चार्ज ने आपके कुल इंट्राडे मुनाफ़े का एक-तिहाई से ज़्यादा हिस्सा खा लिया।"]
 ],
 "futures-options": [
  ["calc:position-size", "Look up the current NIFTY lot size on the NSE website, then work out how many points NIFTY can move against one lot before you lose 2% of ₹10 lakh.", "NSE वेबसाइट पर NIFTY का मौजूदा लॉट साइज़ देखें, फिर हिसाब लगाएँ कि ₹10 लाख का 2% गँवाने से पहले एक लॉट के ख़िलाफ़ NIFTY कितने पॉइंट चल सकता है।"],
  ["replay", "Practise the underlying first: replay NIFTY 50 stocks with a strict stop-loss before trying leverage with real money.", "पहले अंडरलाइंग का अभ्यास करें: असली पैसे से लीवरेज आज़माने से पहले सख़्त स्टॉप-लॉस के साथ NIFTY 50 शेयरों का रीप्ले करें।"]
 ],
 "option-greeks": [
  ["url:https://www.nseindia.com/option-chain", "Open NIFTY's option chain on the NSE website. For the at-the-money strike and one far out-of-the-money strike, note the premium and implied volatility.", "NSE वेबसाइट पर NIFTY की ऑप्शन चेन खोलें। एट-द-मनी स्ट्राइक और एक बहुत आउट-ऑफ़-द-मनी स्ट्राइक का प्रीमियम और इम्प्लाइड वोलैटिलिटी लिखें।"],
  ["url:https://www.nseindia.com/option-chain", "Check the same strikes a day later. If NIFTY barely moved, how much premium did time decay (theta) take from each?", "एक दिन बाद वही स्ट्राइक देखें। अगर NIFTY लगभग नहीं हिला, तो टाइम डिके (थीटा) ने हर एक का कितना प्रीमियम घटाया?"],
  ["chart", "Compare India VIX in the index ribbon on a calm day and on a volatile day, and note how option premiums would react (vega).", "शांत दिन और अस्थिर दिन पर इंडेक्स रिबन में इंडिया VIX की तुलना करें और लिखें कि ऑप्शन प्रीमियम पर क्या असर होगा (वेगा)।"]
 ],
 "trading-psychology": [
  ["journal", "Turn on the mandatory journal and record your emotion before and after each of your next ten trades.", "अनिवार्य जर्नल चालू करें और अगले दस ट्रेड में हर एक से पहले और बाद की अपनी भावना दर्ज करें।"],
  ["replay", "Do one blind-mode replay session and stop after two losing trades in a row. Note whether you wanted to keep going.", "ब्लाइंड मोड में एक रीप्ले सत्र करें और लगातार दो घाटे वाले ट्रेड के बाद रुकें। लिखें कि क्या आप जारी रखना चाहते थे।"],
  ["journal", "Open Diagnostics and find which mistake has cost you the most so far.", "डायग्नॉस्टिक्स खोलें और देखें कि अब तक किस ग़लती की सबसे ज़्यादा क़ीमत चुकाई।"]
 ],
 "tax-basics": [
  ["portfolio", "Open Portfolio and read the estimated tax on your realised gains: short-term, long-term and intraday.", "पोर्टफ़ोलियो खोलें और अपने रियलाइज़्ड लाभ पर अनुमानित टैक्स पढ़ें: शॉर्ट-टर्म, लॉन्ग-टर्म और इंट्राडे।"],
  ["funds", "Change your tax slab under Funds and see how the intraday tax estimate changes.", "फ़ंड्स में अपना टैक्स स्लैब बदलें और देखें कि इंट्राडे टैक्स का अनुमान कैसे बदलता है।"],
  ["calc:capital-gains", "Use the capital gains calculator to compare selling a stock after 11 months with selling it after 13 months.", "कैपिटल गेन कैलकुलेटर से 11 महीने बाद और 13 महीने बाद शेयर बेचने की तुलना करें।"]
 ]
};
