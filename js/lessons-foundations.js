// Full content for "Stock Market Foundations" (English and Hindi).
// Overrides the sections in lessons.js for this module so a new learner has everything in one place.
// Figures are illustrative. Charges, market timings, holidays and tax rules change: check the exchange, SEBI and your broker.
const LESSON_OVERRIDES = {
en: {
 foundations: {
  sections: [
   { h: "1. What the stock market is", p: "A stock market is a marketplace where companies sell small pieces of ownership, called shares, and where people then buy and sell those shares with each other. It does two jobs. It helps companies raise money to grow, and it lets owners sell when they need cash. Because owners can sell, people are willing to buy shares in the first place.", ul: [
    "Primary market: a company sells new shares for the first time, for example through an IPO (initial public offering). The company receives the money.",
    "Secondary market: investors trade shares among themselves on an exchange. This is where almost all daily trading happens. The money moves from one investor to another, not to the company.",
    "A listed company is one whose shares are traded on a recognised exchange, such as NSE or BSE."
   ] },
   { h: "2. What a share is and how you earn from it", p: "Owning one share makes you a part-owner of that company, however small your stake. Your money can grow in two ways, and it can also shrink. Nothing is guaranteed.", ul: [
    "Capital gain: you sell for more than you paid. Example: you buy 10 shares at ₹500 (₹5,000) and sell at ₹550 (₹5,500). The gain is ₹500 before costs and tax.",
    "Dividend: a share of profit the company pays to shareholders, usually per share. Example: ₹10 per share on 10 shares gives ₹100. Dividends are decided by the company and are not guaranteed.",
    "Capital loss: if the price falls, your holding loses value. Example: you sell the same 10 shares at ₹420 and lose ₹800 before costs.",
    "Limited liability: as a shareholder you can lose the money you invested, but you are not responsible for the company's debts beyond that amount."
   ] },
   { h: "3. Who is who in the market", p: "Several parties work together for a trade to happen and for your shares to be safe.", ul: [
    "You (the investor): decide what to buy and sell, and bear the gains and losses.",
    "Broker: a SEBI-registered firm that takes your orders and sends them to the exchange.",
    "Stock exchanges (NSE and BSE): run the trading system where buyers and sellers are matched.",
    "Clearing corporations: guarantee that trades settle, by taking the risk that one side does not pay or deliver.",
    "Depositories (NSDL and CDSL): hold your shares electronically in your demat account.",
    "SEBI (Securities and Exchange Board of India): the regulator that sets rules, licenses intermediaries and protects investors.",
    "Asset management companies (AMCs): run mutual funds, which pool money from many investors."
   ] },
   { h: "4. Open the accounts you need", p: "To invest in shares you need three things: a bank account, a demat account and a trading account. Many brokers open the demat and trading accounts together.", ul: [
    "KYC (Know Your Customer): proof of identity and address, usually PAN and Aadhaar, a bank account, a photograph and a signature. It can often be done online.",
    "Demat account: holds your shares in electronic form. You do not receive paper share certificates for shares held this way.",
    "Trading account: lets you place buy and sell orders through your broker. Your money for trades sits here.",
    "Nomination: name a nominee so your holdings can pass to them safely if something happens to you.",
    "Choose a SEBI-registered broker. Check their registration on SEBI's website before you open an account, and be wary of anyone who promises returns."
   ] },
   { h: "5. Market timings and trading sessions", p: "Indian equity markets trade on working days, and the timings below are typical. Check the exact times and the holiday list on the NSE or BSE website each year, because they can change.", ul: [
    "Pre-open session (around 9:00 to 9:08 for orders, then price discovery until 9:15): orders are collected and an opening price is set.",
    "Normal trading session (around 9:15 to 15:30): continuous buying and selling. This is when most trades happen.",
    "Closing session after 15:30: used to settle the closing price for certain orders. Check current timings on the exchange website.",
    "Exchange holidays: the market is closed on published holidays, so no trades happen on those days.",
    "Orders placed outside market hours are usually held until the next session. Some brokers offer after-market orders (AMO) that are sent when the market opens."
   ] },
   { h: "6. Order types, explained", p: "An order is your instruction to the exchange. The type you choose controls how sure you are of the price and whether the trade will happen.", ul: [
    "Market order: buy or sell now at the best available price. The trade is very likely to happen, but the price can move before it fills.",
    "Limit order: you set the price. Example: buy only at ₹495 or lower. You control the price, but the order may never fill if the price does not reach your limit.",
    "Stop-loss (SL) order: a limit order that becomes active when the price reaches a trigger. Example: trigger ₹240 with limit ₹239 for a sell means: when the price falls to ₹240, try to sell at ₹239 or better.",
    "Stop-loss market (SL-M): becomes a market order at the trigger price. It is more likely to fill, but the price may be worse than the trigger.",
    "Validity: a Day order lasts for the session. An IOC (immediate or cancel) order fills right away or is cancelled."
   ] },
   { h: "7. Product types: delivery and intraday", p: "Your broker will ask which product you want for each order. The choice must match your plan, because the rules and risks are different.", ul: [
    "Delivery (usually called CNC): you buy and hold the shares in your demat account for as long as you want. You pay the full price. This is how most long-term investors invest.",
    "Intraday (usually called MIS): you buy and sell within the same day. You must close the position by a cut-off time, and brokers may square it off automatically. It uses margin (borrowed money) and can cause large losses.",
    "Never use intraday or margin products without understanding them. Start with delivery trades while you learn."
   ] },
   { h: "8. Settlement: when shares and money actually move", p: "A trade does not change ownership on the spot. Settlement is the process that moves the shares and the money. In India, equity trades settle on T+1, which means one trading day after the trade.", ul: [
    "Example: on Monday at 10:00 you buy 10 shares. The order is executed on Monday and you receive a contract note.",
    "On Tuesday (T+1), the shares are credited to your demat account and the money is debited from your trading account, if the settlement goes through.",
    "After you sell, the sale money is usually available to withdraw after settlement. Check your broker's rules on when it becomes available."
   ] },
   { h: "9. What trading costs you", p: "Every trade has costs that come out of your return. Charges vary by broker and change over time, so read your broker's charge page and your contract note.", ul: [
    "Brokerage: the broker's fee for executing the trade.",
    "Exchange transaction charges and SEBI turnover fee: charged by the exchange and the regulator.",
    "Stamp duty: charged on the buying side.",
    "STT (Securities Transaction Tax): a government tax on the transaction, with rates that depend on the type of trade.",
    "GST: charged on brokerage and some other charges.",
    "Depository charges: charged when you sell shares from your demat account."
   ], p2: "Illustration: you buy ₹5,000 of shares and sell at ₹5,500, with ₹60 of total costs. Your net gain is ₹440, not ₹500. Costs matter most for small or frequent trades." },
   { h: "10. How prices move", p: "A share price changes when buyers and sellers disagree about its value at the current price. Understanding the basic mechanics helps you read the screen and avoid surprises.", ul: [
    "Order book: shows the current buy orders (bids) and sell orders (asks) at each price. The best bid is the highest buy price; the best ask is the lowest sell price.",
    "Spread: the gap between the best bid and the best ask. A narrow spread usually means a liquid stock.",
    "Volume: the number of shares traded in a period. Higher volume means more participation.",
    "News, company results, economic data and global markets all shift demand and supply, and so move prices.",
    "Circuit limits: an exchange sets a daily upper and lower price band for many stocks. If the price hits a band, trading in that stock may pause or be restricted. Limits can differ by stock."
   ] },
   { h: "11. Indices, market size and company categories", ul: [
    "NIFTY 50 (NSE) and SENSEX (BSE) are indices that track large companies. They show the overall direction of the market.",
    "Market capitalisation = share price × total number of shares. SEBI groups listed companies into large, mid and small caps by market-cap rank. Check SEBI's current definition.",
    "Large caps are usually more stable. Small caps can grow faster, but their prices can swing much more.",
    "An index is a benchmark. Compare your returns with it to judge how well you are doing."
   ] },
   { h: "12. Taxes on your gains (basics only)", p: "Gains from shares are taxed. Tax rates and rules change with the Union Budget, so always check the current rules with a tax professional or the official income tax website before you file.", ul: [
    "Profits from frequent or intraday trading are usually treated as business income.",
    "Profits from shares held as investments are capital gains. The tax depends on how long you held the shares (short-term or long-term).",
    "Keep your contract notes, P&L statements and bank records. They are needed when you file your return."
   ] },
   { h: "13. Protect yourself from scams", p: "Scams target new investors. The warning signs are often easy to spot once you know them.", ul: [
    "No one can guarantee returns from shares. Any promise of fixed high returns is a warning sign.",
    "Be careful with stock tips on WhatsApp or Telegram, and with groups that ask for money to 'join' a trading club.",
    "Check that anyone advising you or managing your money is SEBI-registered, using SEBI's list of registered intermediaries.",
    "Never share your OTP, PIN, or demat and trading login details with anyone.",
    "If you have a complaint, SEBI's SCORES portal is the official way to raise it."
   ] },
   { h: "14. Your first-steps checklist", ul: [
    "Set a goal and a time frame, for example saving for a house in seven years.",
    "Build an emergency fund of about 3 to 6 months of expenses before you invest for growth.",
    "Learn in this order: Stock Market Foundations, Investing, SIP and Mutual Funds, Reading Charts, Risk Management. Then move on to the rest.",
    "Start with a small amount that you can afford to lose.",
    "Keep a journal of every decision, including why you made it. Review it monthly, not daily."
   ] }
  ]
 }
},
hi: {
 foundations: {
  sections: [
   { h: "1. शेयर बाज़ार क्या है", p: "शेयर बाज़ार वह बाज़ार है जहाँ कंपनियाँ स्वामित्व के छोटे हिस्से बेचती हैं, जिन्हें शेयर कहते हैं, और फिर लोग इन शेयरों को आपस में ख़रीदते-बेचते हैं। इसके दो काम हैं। यह कंपनियों को बढ़ने के लिए पैसा जुटाने में मदद करता है, और मालिकों को नकद चाहिए तो बेचने की सुविधा देता है। चूँकि मालिक बेच सकते हैं, इसलिए लोग शेयर ख़रीदने को तैयार होते हैं।", ul: [
    "प्राइमरी मार्केट: कंपनी पहली बार नए शेयर बेचती है, जैसे IPO (प्रारंभिक सार्वजनिक निर्गम) के ज़रिए। पैसा कंपनी को मिलता है।",
    "सेकेंडरी मार्केट: निवेशक एक्सचेंज पर आपस में शेयर ट्रेड करते हैं। रोज़ का लगभग सारा ट्रेडिंग यहीं होता है। पैसा एक निवेशक से दूसरे के पास जाता है, कंपनी के पास नहीं।",
    "लिस्टेड कंपनी वह है जिसके शेयर NSE या BSE जैसे मान्यता प्राप्त एक्सचेंज पर ट्रेड होते हैं।"
   ] },
   { h: "2. शेयर क्या है और इससे कमाई कैसे होती है", p: "एक शेयर रखने पर आप उस कंपनी के हिस्सेदार बन जाते हैं, चाहे हिस्सा कितना भी छोटा हो। आपका पैसा दो तरीकों से बढ़ सकता है, और घट भी सकता है। कुछ भी गारंटीड नहीं है।", ul: [
    "कैपिटल गेन: आप जितने में ख़रीदते हैं उससे ज़्यादा में बेचते हैं। उदाहरण: 10 शेयर ₹500 पर (₹5,000) ख़रीदे और ₹550 पर (₹5,500) बेचे। शुल्क और टैक्स से पहले लाभ ₹500।",
    "डिविडेंड: कंपनी द्वारा शेयरधारकों को मुनाफ़े का हिस्सा, आमतौर पर प्रति शेयर। उदाहरण: 10 शेयरों पर ₹10 प्रति शेयर = ₹100। डिविडेंड कंपनी तय करती है और यह गारंटीड नहीं है।",
    "कैपिटल लॉस: कीमत गिरे तो आपकी होल्डिंग की वैल्यू घटती है। उदाहरण: वही 10 शेयर ₹420 पर बेचे तो शुल्क से पहले ₹800 का नुकसान।",
    "सीमित दायित्व: शेयरधारक के रूप में आप लगाई गई रकम तक नुकसान उठा सकते हैं, पर कंपनी के कर्ज़ की ज़िम्मेदारी उस रकम से आगे आपकी नहीं होती।"
   ] },
   { h: "3. बाज़ार में कौन कौन है", p: "कोई ट्रेड होने और आपके शेयर सुरक्षित रहने के लिए कई पक्ष मिलकर काम करते हैं।", ul: [
    "आप (निवेशक): तय करते हैं कि क्या ख़रीदना और बेचना है, और लाभ-हानि आपकी होती है।",
    "ब्रोकर: SEBI-पंजीकृत फर्म जो आपके ऑर्डर लेकर एक्सचेंज को भेजती है।",
    "स्टॉक एक्सचेंज (NSE और BSE): वह ट्रेडिंग सिस्टम चलाते हैं जिसमें ख़रीदार और विक्रेता का मिलान होता है।",
    "क्लियरिंग कॉर्पोरेशन: गारंटी देते हैं कि ट्रेड सेटल हों, यानी एक पक्ष के भुगतान या डिलीवरी न करने का जोखिम वे उठाते हैं।",
    "डिपॉज़िटरी (NSDL और CDSL): आपके शेयर आपके डीमैट खाते में इलेक्ट्रॉनिक रूप में रखते हैं।",
    "SEBI (भारतीय प्रतिभूति और विनिमय बोर्ड): नियामक जो नियम बनाता है, मध्यस्थों को लाइसेंस देता है और निवेशकों की रक्षा करता है।",
    "एसेट मैनेजमेंट कंपनी (AMC): म्यूचुअल फंड चलाती है, जो कई निवेशकों का पैसा इकट्ठा करते हैं।"
   ] },
   { h: "4. ज़रूरी खाते कैसे खोलें", p: "शेयर में निवेश के लिए तीन चीज़ें चाहिए: बैंक खाता, डीमैट खाता और ट्रेडिंग खाता। कई ब्रोकर डीमैट और ट्रेडिंग खाता एक साथ खोल देते हैं।", ul: [
    "KYC (Know Your Customer): पहचान और पते का प्रमाण, आमतौर पर PAN और आधार, बैंक खाता, फ़ोटो और हस्ताक्षर। यह अक्सर ऑनलाइन हो जाता है।",
    "डीमैट खाता: आपके शेयर इलेक्ट्रॉनिक रूप में रखता है। इस तरीके से रखे शेयरों के पेपर सर्टिफ़िकेट नहीं मिलते।",
    "ट्रेडिंग खाता: ब्रोकर के ज़रिए ख़रीद-बिक्री के ऑर्डर देने देता है। ट्रेड के लिए आपका पैसा यहीं रहता है।",
    "नॉमिनेशन: किसी नॉमिनी का नाम दें, ताकि कुछ होने पर आपकी होल्डिंग उन्हें सुरक्षित मिल सके।",
    "SEBI-पंजीकृत ब्रोकर चुनें। खाता खोलने से पहले SEBI की वेबसाइट पर उसका पंजीकरण जाँचें, और रिटर्न का वादा करने वाले किसी भी व्यक्ति से सावधान रहें।"
   ] },
   { h: "5. बाज़ार का समय और ट्रेडिंग सत्र", p: "भारतीय इक्विटी बाज़ार कार्यदिवसों पर खुलता है, और नीचे दिए समय सामान्य हैं। हर साल सटीक समय और छुट्टियों की सूची NSE या BSE की वेबसाइट पर जाँचें, क्योंकि ये बदल सकते हैं।", ul: [
    "प्री-ओपन सत्र (लगभग 9:00 से 9:08 तक ऑर्डर, फिर 9:15 तक मूल्य निर्धारण): ऑर्डर इकट्ठे होते हैं और एक शुरुआती कीमत तय होती है।",
    "सामान्य ट्रेडिंग सत्र (लगभग 9:15 से 15:30 तक): लगातार ख़रीद-बिक्री। ज़्यादातर ट्रेड इसी समय होते हैं।",
    "15:30 के बाद क्लोज़िंग सत्र: कुछ ऑर्डरों के लिए क्लोज़िंग कीमत तय करने में उपयोग। मौजूदा समय एक्सचेंज की वेबसाइट पर देखें।",
    "एक्सचेंज की छुट्टियाँ: घोषित छुट्टियों पर बाज़ार बंद रहता है और कोई ट्रेड नहीं होता।",
    "बाज़ार समय के बाहर दिए ऑर्डर आमतौर पर अगले सत्र तक रुकते हैं। कुछ ब्रोकर आफ़्टर-मार्केट ऑर्डर (AMO) देते हैं, जो बाज़ार खुलने पर भेजे जाते हैं।"
   ] },
   { h: "6. ऑर्डर के प्रकार, विस्तार से", p: "ऑर्डर एक्सचेंज को दिया गया आपका निर्देश है। जो प्रकार चुनते हैं वह तय करता है कि कीमत पर आप कितने निश्चित हैं और ट्रेड होगा या नहीं।", ul: [
    "मार्केट ऑर्डर: अभी उपलब्ध सबसे अच्छी कीमत पर ख़रीदें या बेचें। ट्रेड होने की संभावना बहुत है, पर भराई से पहले कीमत बदल सकती है।",
    "लिमिट ऑर्डर: कीमत आप तय करते हैं। उदाहरण: केवल ₹495 या उससे कम पर ख़रीदें। कीमत पर आपका नियंत्रण है, पर कीमत आपकी लिमिट तक न पहुँचे तो ऑर्डर पूरा नहीं होगा।",
    "स्टॉप-लॉस (SL) ऑर्डर: एक लिमिट ऑर्डर जो ट्रिगर कीमत पहुँचने पर सक्रिय होता है। उदाहरण: बिक्री के लिए ट्रिगर ₹240 और लिमिट ₹239, यानी कीमत ₹240 तक गिरे तो ₹239 या उससे बेहतर पर बेचने की कोशिश।",
    "स्टॉप-लॉस मार्केट (SL-M): ट्रिगर कीमत पर मार्केट ऑर्डर बन जाता है। पूरा होने की संभावना ज़्यादा है, पर कीमत ट्रिगर से बदतर हो सकती है।",
    "वैधता: डे ऑर्डर उस सत्र तक चलता है। IOC (तुरंत या रद्द) ऑर्डर अभी भरता है या रद्द हो जाता है।"
   ] },
   { h: "7. प्रोडक्ट के प्रकार: डिलीवरी और इंट्राडे", p: "आपका ब्रोकर हर ऑर्डर के लिए प्रोडक्ट पूछेगा। चुनाव आपकी योजना से मेल खाना चाहिए, क्योंकि नियम और जोखिम अलग हैं।", ul: [
    "डिलीवरी (आमतौर पर CNC): आप शेयर ख़रीदकर डीमैट खाते में जितने समय तक चाहें रखते हैं। पूरी कीमत चुकानी होती है। ज़्यादातर दीर्घकालिक निवेशक इसी तरह निवेश करते हैं।",
    "इंट्राडे (आमतौर पर MIS): एक ही दिन में ख़रीदना और बेचना। पोज़िशन एक तय समय तक बंद करनी होती है, और ब्रोकर इसे अपने आप बंद (स्क्वेयर ऑफ़) कर सकता है। इसमें मार्जिन (उधार का पैसा) लगता है और बड़ा नुकसान हो सकता है।",
    "जब तक समझ न हो, इंट्राडे या मार्जिन प्रोडक्ट न छुएँ। सीखते समय डिलीवरी ट्रेड से शुरू करें।"
   ] },
   { h: "8. सेटलमेंट: शेयर और पैसा असल में कब चलते हैं", p: "ट्रेड होते ही मालिकाना हक नहीं बदलता। सेटलमेंट वह प्रक्रिया है जिसमें शेयर और पैसा चलते हैं। भारत में इक्विटी ट्रेड T+1 पर सेटल होते हैं, यानी ट्रेड के एक ट्रेडिंग दिन बाद।", ul: [
    "उदाहरण: सोमवार सुबह 10:00 बजे आपने 10 शेयर ख़रीदे। ऑर्डर सोमवार को पूरा हुआ और आपको कॉन्ट्रैक्ट नोट मिला।",
    "मंगलवार (T+1) को, सेटलमेंट सफल हो तो शेयर आपके डीमैट खाते में आते हैं और पैसा ट्रेडिंग खाते से कटता है।",
    "बेचने के बाद बिक्री की रकम आमतौर पर सेटलमेंट के बाद निकालने योग्य होती है। कब उपलब्ध होगी, यह अपने ब्रोकर के नियम में जाँचें।"
   ] },
   { h: "9. ट्रेडिंग में खर्च क्या हैं", p: "हर ट्रेड के कुछ खर्च होते हैं जो आपके रिटर्न से कटते हैं। खर्च ब्रोकर के अनुसार अलग होते हैं और समय के साथ बदलते हैं, इसलिए ब्रोकर का चार्ज पेज और कॉन्ट्रैक्ट नोट ज़रूर पढ़ें।", ul: [
    "ब्रोकरेज: ट्रेड करने के लिए ब्रोकर की फ़ीस।",
    "एक्सचेंज ट्रांज़ैक्शन चार्ज और SEBI टर्नओवर फ़ीस: एक्सचेंज और नियामक द्वारा लिए जाते हैं।",
    "स्टाम्प ड्यूटी: ख़रीद की तरफ़ लगती है।",
    "STT (सिक्योरिटीज़ ट्रांज़ैक्शन टैक्स): लेनदेन पर सरकारी टैक्स, दर ट्रेड के प्रकार पर निर्भर।",
    "GST: ब्रोकरेज और कुछ अन्य चार्ज पर लगता है।",
    "डिपॉज़िटरी चार्ज: डीमैट खाते से शेयर बेचने पर लगता है।"
   ], p2: "उदाहरण: आप ₹5,000 के शेयर ख़रीदते हैं और ₹5,500 पर बेचते हैं, कुल खर्च ₹60। शुद्ध लाभ ₹440 है, ₹500 नहीं। छोटे या बार-बार होने वाले ट्रेड में खर्च सबसे ज़्यादा मायने रखते हैं।" },
   { h: "10. कीमतें कैसे बदलती हैं", p: "शेयर की कीमत तब बदलती है जब ख़रीदार और विक्रेता मौजूदा कीमत पर उसकी वैल्यू को लेकर असहमत होते हैं। बुनियादी तंत्र समझने से स्क्रीन पढ़ना और अचानक होने वाली बातों से बचना आसान होता है।", ul: [
    "ऑर्डर बुक: हर कीमत पर मौजूदा ख़रीद ऑर्डर (बिड) और बिक्री ऑर्डर (आस्क) दिखाती है। सबसे ऊँची बिड सबसे ऊँची ख़रीद कीमत है; सबसे कम आस्क सबसे कम बिक्री कीमत।",
    "स्प्रेड: सबसे अच्छी बिड और सबसे अच्छे आस्क के बीच का अंतर। कम स्प्रेड आमतौर पर लिक्विड शेयर को दर्शाता है।",
    "वॉल्यूम: किसी अवधि में ट्रेड हुए शेयर। ज़्यादा वॉल्यूम का मतलब ज़्यादा भागीदारी।",
    "ख़बरें, कंपनी के नतीजे, आर्थिक आँकड़े और वैश्विक बाज़ार, सभी माँग और आपूर्ति बदलते हैं और इसलिए कीमतें भी।",
    "सर्किट लिमिट: एक्सचेंज कई शेयरों के लिए एक दिन की ऊपरी और निचली कीमत सीमा तय करता है। कीमत सीमा छूए तो उस शेयर में ट्रेडिंग रुक सकती है या सीमित हो सकती है। सीमाएँ शेयर के अनुसार अलग हो सकती हैं।"
   ] },
   { h: "11. इंडेक्स, बाज़ार का आकार और कंपनी की श्रेणियाँ", ul: [
    "NIFTY 50 (NSE) और SENSEX (BSE) बड़ी कंपनियों को दर्शाने वाले इंडेक्स हैं। ये बाज़ार की कुल दिशा दिखाते हैं।",
    "मार्केट कैपिटलाइज़ेशन = शेयर कीमत × कुल शेयरों की संख्या। SEBI मार्केट-कैप रैंक के आधार पर लिस्टेड कंपनियों को लार्ज, मिड और स्मॉल कैप में बाँटता है। SEBI की मौजूदा परिभाषा जाँचें।",
    "लार्ज कैप आमतौर पर ज़्यादा स्थिर होते हैं। स्मॉल कैप तेज़ी से बढ़ सकते हैं, पर उनकी कीमतें बहुत ज़्यादा ऊपर-नीचे हो सकती हैं।",
    "इंडेक्स एक बेंचमार्क है। अपने रिटर्न की तुलना इससे करें ताकि पता चले कि आप कैसा कर रहे हैं।"
   ] },
   { h: "12. लाभ पर टैक्स (केवल मूल बातें)", p: "शेयर से होने वाले लाभ पर टैक्स लगता है। टैक्स दरें और नियम केंद्रीय बजट के साथ बदलते हैं, इसलिए रिटर्न भरने से पहले मौजूदा नियम किसी टैक्स विशेषज्ञ या आयकर विभाग की आधिकारिक वेबसाइट से जाँचें।", ul: [
    "बार-बार या इंट्राडे ट्रेडिंग से होने वाले लाभ आमतौर पर बिज़नेस इनकम माने जाते हैं।",
    "निवेश के रूप में रखे शेयरों से लाभ कैपिटल गेन होते हैं। टैक्स इस पर निर्भर करता है कि शेयर कितने समय तक रखे (अल्पकालिक या दीर्घकालिक)।",
    "कॉन्ट्रैक्ट नोट, P&L स्टेटमेंट और बैंक रिकॉर्ड सँभालकर रखें। रिटर्न भरते समय इनकी ज़रूरत होती है।"
   ] },
   { h: "13. घोटालों से ख़ुद को बचाएँ", p: "घोटाले नए निवेशकों को निशाना बनाते हैं। एक बार पता हो जाए तो चेतावनी के संकेत अक्सर साफ़ दिखते हैं।", ul: [
    "कोई भी शेयर से निश्चित ऊँचे रिटर्न की गारंटी नहीं दे सकता। ऐसा वादा ही सबसे बड़ी चेतावनी है।",
    "WhatsApp या Telegram पर शेयर टिप्स से सावधान रहें, और ऐसे समूहों से भी जो 'ट्रेडिंग क्लब' में शामिल होने के लिए पैसे माँगते हैं।",
    "जो भी व्यक्ति आपको सलाह दे या आपका पैसा संभाले, उसका SEBI-पंजीकरण SEBI की पंजीकृत मध्यस्थों की सूची से जाँचें।",
    "अपना OTP, PIN या डीमैट और ट्रेडिंग लॉगिन किसी के साथ न बाँटें।",
    "शिकायत हो तो SEBI का SCORES पोर्टल आधिकारिक तरीका है।"
   ] },
   { h: "14. आपकी पहली शुरुआत की चेकलिस्ट", ul: [
    "लक्ष्य और समय-सीमा तय करें, जैसे सात साल में घर के लिए बचत।",
    "ग्रोथ के लिए निवेश से पहले लगभग 3 से 6 महीने के खर्च जितना इमरजेंसी फ़ंड बनाएँ।",
    "इस क्रम में सीखें: स्टॉक मार्केट फ़ाउंडेशन, निवेश, SIP और म्यूचुअल फंड, चार्ट पढ़ना, रिस्क मैनेजमेंट। फिर बाक़ी मॉड्यूल पर जाएँ।",
    "कम रकम से शुरू करें, जितना खोने की आप क्षमता रखते हों।",
    "हर फ़ैसले का जर्नल रखें, जिसमें यह भी लिखें कि फ़ैसला क्यों लिया। हर महीने समीक्षा करें, रोज़ नहीं।"
   ] }
  ]
 }
}
};
