// Market Rules & Investor Protection: market timings, settlement, price bands and circuit breakers, account safety,
// IPO applications, registered advice versus tips, common scams, and how to complain. English (en) and Hindi (hi).
// Rules change through SEBI and exchange circulars: check sebi.gov.in, nseindia.com and bseindia.com for current details.
Object.assign(LESSONS.en, {
 "market-rules": {
  title: "Market Rules & Investor Protection", level: "beginner", time: "10 topics",
  summary: "Market timings, settlement, price bands and circuit breakers, applying for IPOs, spotting scams and tips, and how to complain if something goes wrong.",
  sections: [{ h: "Start here", p: "Knowing the rules protects your money as much as any strategy. This module explains how the Indian market runs each day and how to keep your account safe." }]
 }
});
Object.assign(LESSONS.hi, {
 "market-rules": {
  title: "बाज़ार के नियम और निवेशक सुरक्षा", level: "beginner", time: "10 विषय",
  summary: "बाज़ार का समय, सेटलमेंट, प्राइस बैंड और सर्किट ब्रेकर, IPO में आवेदन, धोखाधड़ी और टिप्स पहचानना, और कुछ गलत होने पर शिकायत कैसे करें।",
  sections: [{ h: "यहाँ से शुरू करें", p: "नियम जानना आपके पैसे को किसी भी रणनीति जितना ही सुरक्षित रखता है। यह मॉड्यूल बताता है कि भारतीय बाज़ार हर दिन कैसे चलता है और अपना खाता सुरक्षित कैसे रखें।" }]
 }
});

Object.assign(LESSON_OVERRIDES.en, {
 "market-rules": { sections: [
  { h: "1. When the market is open",
    p: "NSE and BSE trade equities from Monday to Friday, except on exchange holidays published at the start of each year.",
    ul: [
     "Pre-open session, 9:00 to 9:15 am: orders are collected for about eight minutes, then matched to find a fair opening price. This reduces wild swings at the open.",
     "Normal market, 9:15 am to 3:30 pm: continuous buying and selling.",
     "Closing price: on NSE it is the weighted average price of trades in the last 30 minutes, not the very last trade.",
     "Post-close session, about 3:40 to 4:00 pm: you can place orders only at the closing price.",
     "Muhurat trading: a short special session on Diwali evening, announced by the exchanges each year."
    ],
    p2: "Orders placed outside market hours are usually stored by your broker as after-market orders (AMO) and sent when the market opens." },
  { h: "2. Settlement: when shares and money actually move",
    p: "A trade is a promise. Settlement is when the promise is completed. Indian equities settle on T+1: one trading day after the trade date.",
    ul: [
     "Buy on Monday: the shares reach your demat account on Tuesday (T+1), if you have paid.",
     "Sell on Monday: the money is credited to your trading account after settlement on Tuesday, and you can withdraw it after that.",
     "Selling shares you bought yesterday before they reach your demat (BTST) is risky: if the seller fails to deliver, you can face an auction penalty.",
     "An optional same-day (T+0) settlement has been introduced for a limited list of stocks; most trades still settle T+1."
    ] },
  { h: "3. Price bands and circuit limits",
    p: "Exchanges limit how far a single stock can move in one day so that panic or manipulation cannot move prices without control.",
    ul: [
     "Many stocks have a daily price band of 2%, 5%, 10% or 20%. When a stock hits the top of its band it is 'upper circuit': it trades only at that price and often has no sellers. 'Lower circuit' is the opposite, and you may not be able to sell.",
     "Stocks in the F&O segment have no fixed band but dynamic limits that the exchange widens step by step.",
     "Small, illiquid stocks that hit circuits day after day are a warning sign; you may not be able to exit when you want."
    ] },
  { h: "4. Market-wide circuit breakers",
    p: "If the NIFTY 50 or SENSEX falls or rises sharply, trading stops across the whole market to let people pause and think.",
    ul: [
     "Index-wide halts trigger at moves of 10%, 15% and 20% from the previous close.",
     "How long the halt lasts depends on the time of day. A 20% move stops trading for the rest of the day.",
     "Trading resumes with a short pre-open call auction, like the morning session."
    ],
    p2: "Such halts are rare (the last were in March 2020), but they show why a stop-loss order cannot always protect you in a crash." },
  { h: "5. Opening and protecting your account",
    ul: [
     "KYC (Know Your Customer) is done once with your PAN, Aadhaar, bank details and a photo. It is shared across brokers through KRAs.",
     "Add a nominee to your demat account, trading account and mutual funds, or formally opt out. It makes transfer to your family much easier.",
     "Turn on two-factor login and never share your password, OTP or PIN with anyone, including people who say they are from your broker.",
     "Read the contract note your broker sends after each trading day. It lists every trade, price and charge.",
     "Check the monthly Consolidated Account Statement (CAS) from CDSL/NSDL; it shows every share and fund you hold.",
     "Brokers must return unused money in your trading account to your bank periodically (monthly or quarterly, as you choose).",
     "If you suspect misuse, you can ask your broker to freeze (block) your trading account at once."
    ] },
  { h: "6. Applying for an IPO",
    p: "An IPO (initial public offering) is when a company first sells shares to the public.",
    ul: [
     "Apply through ASBA (net banking) or the UPI mandate from your broker's app. The money is only blocked in your bank account and is debited if you get shares.",
     "Retail investors can apply for up to ₹2 lakh. When the issue is oversubscribed, allotment is by lottery, usually one lot per successful applicant.",
     "Shares now list three working days after the issue closes (T+3).",
     "Read the offer document (RHP): what the money will be used for, how much is an offer for sale by existing owners, the risk factors and the valuation compared with listed peers.",
     "The 'grey market premium' (GMP) quoted on social media is unofficial and unregulated. It is not a reliable signal."
    ] },
  { h: "7. Registered advice versus tips",
    p: "Only SEBI-registered Investment Advisers (RIA) and Research Analysts (RA) may give you paid personalised advice or stock recommendations.",
    ul: [
     "Check the registration number on the SEBI website (Intermediaries / Recognised Intermediaries). A real adviser shows it on every communication.",
     "Registered advisers cannot guarantee returns or take your trading login.",
     "Paid 'tip' groups on Telegram or WhatsApp, and influencers selling 'sure-shot' calls without registration, are not regulated. SEBI has barred regulated entities from working with such unregistered influencers.",
     "Educational content, like this site, explains concepts; it is not advice about what you should buy or sell."
    ] },
  { h: "8. Common scams and red flags",
    ul: [
     "Guaranteed or fixed returns from shares, F&O or 'algo' trading. Markets cannot guarantee returns; anyone who promises them is lying.",
     "Pump and dump: operators buy a small, illiquid stock, hype it on social media or SMS, then sell to the people who rush in.",
     "Fake trading apps and WhatsApp 'investment classes' that pretend to be big brokers or foreign institutions, offer 'institutional accounts' or 'VIP IPO allotment', and ask you to pay into personal or unrelated bank accounts.",
     "Dabba (box) trading: illegal betting on prices outside the exchange. You have no protection if the operator vanishes.",
     "Account-handling offers: someone 'manages' your account with your login. It is against the rules and often ends in losses.",
     "Pressure to act immediately, requests for OTP or remote access to your phone, and payment to any account not in your broker's name."
    ],
    p2: "Pay only into your broker's own bank account (shown in their app), and verify any 'broker' on the SEBI or exchange website before you deal with them." },
  { h: "9. If something goes wrong: how to complain",
    p: "Complain in writing and keep records: contract notes, screenshots, emails and transaction IDs.",
    ul: [
     "First, raise it with your broker or depository participant. They must reply within a set time.",
     "If you are not satisfied, file on SEBI's SCORES portal (scores.sebi.gov.in). Complaints go to the right entity and are tracked.",
     "If it is still not resolved, take it to SMART ODR (smartodr.in), SEBI's online platform for conciliation and arbitration with brokers and other market entities.",
     "If a broker defaults and is declared a defaulter, eligible claims can be paid from the exchange's Investor Protection Fund.",
     "For frauds by unregistered people, also report to the cybercrime portal (cybercrime.gov.in) or helpline 1930."
    ] },
  { h: "10. Key takeaways",
    ul: [
     "Market hours are 9:15 am to 3:30 pm, with a pre-open session from 9:00 am; trades settle on T+1.",
     "Circuit limits can stop you from buying or selling; avoid stocks that hit them repeatedly.",
     "Keep KYC and nomination up to date, use two-factor login and read your contract notes and CAS.",
     "Only SEBI-registered advisers can give paid advice. Guaranteed returns are always a red flag.",
     "Complain to your broker first, then SCORES, then SMART ODR. Keep every record."
    ] }
 ] }
});

Object.assign(LESSON_OVERRIDES.hi, {
 "market-rules": { sections: [
  { h: "1. बाज़ार कब खुलता है",
    p: "NSE और BSE पर शेयरों की ट्रेडिंग सोमवार से शुक्रवार होती है, सिवाय उन छुट्टियों के जिनकी सूची एक्सचेंज हर साल की शुरुआत में जारी करते हैं।",
    ul: [
     "प्री-ओपन सेशन, सुबह 9:00 से 9:15: लगभग आठ मिनट ऑर्डर जमा होते हैं, फिर उचित शुरुआती कीमत तय करने के लिए मिलाए जाते हैं। इससे शुरुआत में तेज़ उतार-चढ़ाव कम होता है।",
     "सामान्य बाज़ार, सुबह 9:15 से दोपहर 3:30: लगातार ख़रीद-बिक्री।",
     "क्लोज़िंग प्राइस: NSE पर यह आख़िरी 30 मिनट के सौदों की भारित औसत कीमत होती है, आख़िरी सौदे की कीमत नहीं।",
     "पोस्ट-क्लोज़ सेशन, लगभग 3:40 से 4:00 बजे: केवल क्लोज़िंग प्राइस पर ऑर्डर दिए जा सकते हैं।",
     "मुहूर्त ट्रेडिंग: दिवाली की शाम एक छोटा विशेष सेशन, जिसकी घोषणा एक्सचेंज हर साल करते हैं।"
    ],
    p2: "बाज़ार के समय के बाहर दिए गए ऑर्डर आमतौर पर ब्रोकर आफ़्टर-मार्केट ऑर्डर (AMO) के रूप में रखता है और बाज़ार खुलने पर भेजता है।" },
  { h: "2. सेटलमेंट: शेयर और पैसा असल में कब चलते हैं",
    p: "ट्रेड एक वादा है। सेटलमेंट उस वादे का पूरा होना है। भारतीय शेयर T+1 पर सेटल होते हैं: ट्रेड के एक ट्रेडिंग दिन बाद।",
    ul: [
     "सोमवार को ख़रीदें: भुगतान किया हो तो शेयर मंगलवार (T+1) को आपके डीमैट खाते में आते हैं।",
     "सोमवार को बेचें: मंगलवार को सेटलमेंट के बाद पैसा ट्रेडिंग खाते में आता है, उसके बाद निकाल सकते हैं।",
     "कल ख़रीदे शेयर डीमैट में आने से पहले बेचना (BTST) जोखिम भरा है: विक्रेता डिलीवरी न दे तो ऑक्शन पेनल्टी लग सकती है।",
     "कुछ चुनिंदा शेयरों के लिए उसी दिन (T+0) सेटलमेंट का विकल्प शुरू हुआ है; ज़्यादातर सौदे अब भी T+1 पर सेटल होते हैं।"
    ] },
  { h: "3. प्राइस बैंड और सर्किट लिमिट",
    p: "एक्सचेंज तय करते हैं कि एक शेयर एक दिन में कितना चल सकता है, ताकि घबराहट या हेरफेर से कीमत बेकाबू न हो।",
    ul: [
     "कई शेयरों का दैनिक प्राइस बैंड 2%, 5%, 10% या 20% होता है। बैंड के ऊपरी सिरे पर पहुँचने पर शेयर 'अपर सर्किट' में होता है: केवल उसी कीमत पर सौदा होता है और अक्सर बेचने वाले नहीं होते। 'लोअर सर्किट' उल्टा है, और आप बेच न पाएँ ऐसा हो सकता है।",
     "F&O सेगमेंट के शेयरों में तय बैंड नहीं होता, बल्कि डायनामिक सीमा होती है जिसे एक्सचेंज चरणों में बढ़ाता है।",
     "छोटे, कम लिक्विड शेयर जो रोज़ सर्किट लगाते हैं, चेतावनी का संकेत हैं; आप ज़रूरत पर निकल न पाएँ।"
    ] },
  { h: "4. पूरे बाज़ार के सर्किट ब्रेकर",
    p: "अगर NIFTY 50 या SENSEX तेज़ी से गिरे या चढ़े, तो पूरे बाज़ार में ट्रेडिंग रुकती है ताकि लोग रुककर सोच सकें।",
    ul: [
     "पिछले बंद से 10%, 15% और 20% की चाल पर पूरे बाज़ार में रोक लगती है।",
     "रोक कितनी देर रहेगी यह दिन के समय पर निर्भर है। 20% की चाल पर बाकी दिन ट्रेडिंग बंद रहती है।",
     "ट्रेडिंग सुबह की तरह एक छोटे प्री-ओपन कॉल ऑक्शन के साथ फिर शुरू होती है।"
    ],
    p2: "ऐसी रोक बहुत कम लगती है (पिछली बार मार्च 2020 में), पर यह दिखाती है कि गिरावट में स्टॉप-लॉस ऑर्डर हमेशा बचा नहीं सकता।" },
  { h: "5. खाता खोलना और सुरक्षित रखना",
    ul: [
     "KYC (नो योर कस्टमर) एक बार PAN, आधार, बैंक विवरण और फ़ोटो से होता है। यह KRA के ज़रिए सभी ब्रोकरों में साझा होता है।",
     "डीमैट, ट्रेडिंग खाते और म्यूचुअल फंड में नॉमिनी जोड़ें या औपचारिक रूप से ऑप्ट-आउट करें। इससे परिवार को ट्रांसफ़र बहुत आसान होता है।",
     "टू-फ़ैक्टर लॉगिन चालू रखें और पासवर्ड, OTP या PIN किसी से साझा न करें, उनसे भी नहीं जो ब्रोकर से होने का दावा करें।",
     "हर ट्रेडिंग दिन के बाद ब्रोकर का भेजा कॉन्ट्रैक्ट नोट पढ़ें। उसमें हर सौदा, कीमत और शुल्क होता है।",
     "CDSL/NSDL का मासिक कंसोलिडेटेड अकाउंट स्टेटमेंट (CAS) देखें; उसमें आपके सभी शेयर और फंड दिखते हैं।",
     "ब्रोकर को ट्रेडिंग खाते का बिना उपयोग वाला पैसा समय-समय पर (मासिक या तिमाही, आपकी पसंद से) आपके बैंक में लौटाना होता है।",
     "दुरुपयोग का शक हो तो ब्रोकर से तुरंत अपना ट्रेडिंग खाता फ़्रीज़ (ब्लॉक) करने को कह सकते हैं।"
    ] },
  { h: "6. IPO में आवेदन",
    p: "IPO (इनिशियल पब्लिक ऑफ़रिंग) तब होता है जब कोई कंपनी पहली बार जनता को शेयर बेचती है।",
    ul: [
     "ASBA (नेट बैंकिंग) या ब्रोकर ऐप से UPI मैंडेट के ज़रिए आवेदन करें। पैसा बैंक खाते में केवल ब्लॉक होता है और शेयर मिलने पर ही कटता है।",
     "रिटेल निवेशक ₹2 लाख तक आवेदन कर सकते हैं। ओवरसब्सक्राइब होने पर आवंटन लॉटरी से होता है, आमतौर पर हर सफल आवेदक को एक लॉट।",
     "अब इश्यू बंद होने के तीन कार्य दिवस बाद (T+3) लिस्टिंग होती है।",
     "ऑफ़र दस्तावेज़ (RHP) पढ़ें: पैसा कहाँ लगेगा, मौजूदा मालिकों की ऑफ़र फ़ॉर सेल कितनी है, जोखिम कारक और लिस्टेड प्रतिस्पर्धियों की तुलना में वैल्यूएशन।",
     "सोशल मीडिया पर बताया जाने वाला 'ग्रे मार्केट प्रीमियम' (GMP) अनौपचारिक और अनियंत्रित है। यह भरोसेमंद संकेत नहीं है।"
    ] },
  { h: "7. रजिस्टर्ड सलाह बनाम टिप्स",
    p: "केवल SEBI में रजिस्टर्ड इन्वेस्टमेंट एडवाइज़र (RIA) और रिसर्च एनालिस्ट (RA) ही पैसे लेकर व्यक्तिगत सलाह या शेयर सुझाव दे सकते हैं।",
    ul: [
     "SEBI की वेबसाइट (Intermediaries / Recognised Intermediaries) पर रजिस्ट्रेशन नंबर जाँचें। असली सलाहकार इसे हर संचार में दिखाता है।",
     "रजिस्टर्ड सलाहकार रिटर्न की गारंटी नहीं दे सकते और आपका ट्रेडिंग लॉगिन नहीं ले सकते।",
     "Telegram या WhatsApp पर पैसे वाले 'टिप' ग्रुप, और बिना रजिस्ट्रेशन 'पक्की' कॉल बेचने वाले इन्फ़्लुएंसर नियंत्रित नहीं हैं। SEBI ने रेगुलेटेड संस्थाओं को ऐसे अपंजीकृत इन्फ़्लुएंसरों के साथ काम करने से रोका है।",
     "इस साइट जैसी शैक्षिक सामग्री अवधारणाएँ समझाती है; यह सलाह नहीं है कि आपको क्या ख़रीदना या बेचना चाहिए।"
    ] },
  { h: "8. आम धोखाधड़ी और ख़तरे के संकेत",
    ul: [
     "शेयर, F&O या 'एल्गो' ट्रेडिंग से गारंटीड या तय रिटर्न। बाज़ार रिटर्न की गारंटी नहीं दे सकता; जो वादा करे वह झूठ बोल रहा है।",
     "पंप एंड डंप: ऑपरेटर छोटा, कम लिक्विड शेयर ख़रीदते हैं, सोशल मीडिया या SMS पर हवा बनाते हैं, फिर दौड़कर आने वालों को बेच देते हैं।",
     "नकली ट्रेडिंग ऐप और WhatsApp 'निवेश क्लास' जो बड़े ब्रोकर या विदेशी संस्थान होने का दिखावा करते हैं, 'इंस्टीट्यूशनल अकाउंट' या 'VIP IPO आवंटन' देते हैं, और निजी या असंबंधित बैंक खातों में पैसा मँगाते हैं।",
     "डब्बा ट्रेडिंग: एक्सचेंज के बाहर कीमतों पर अवैध सट्टा। ऑपरेटर गायब हो जाए तो आपकी कोई सुरक्षा नहीं।",
     "खाता चलाने के ऑफ़र: कोई आपके लॉगिन से आपका खाता 'मैनेज' करता है। यह नियमों के ख़िलाफ़ है और अक्सर नुकसान में ख़त्म होता है।",
     "तुरंत कदम उठाने का दबाव, OTP या फ़ोन का रिमोट एक्सेस माँगना, और ब्रोकर के नाम के अलावा किसी खाते में भुगतान।"
    ],
    p2: "भुगतान केवल अपने ब्रोकर के अपने बैंक खाते में करें (जो उनके ऐप में दिखता है), और किसी भी 'ब्रोकर' से लेन-देन से पहले उसे SEBI या एक्सचेंज की वेबसाइट पर जाँचें।" },
  { h: "9. कुछ गलत हो जाए तो: शिकायत कैसे करें",
    p: "लिखित शिकायत करें और रिकॉर्ड रखें: कॉन्ट्रैक्ट नोट, स्क्रीनशॉट, ईमेल और ट्रांज़ैक्शन ID।",
    ul: [
     "पहले अपने ब्रोकर या डिपॉज़िटरी पार्टिसिपेंट से शिकायत करें। उन्हें तय समय में जवाब देना होता है।",
     "संतुष्ट न हों तो SEBI के SCORES पोर्टल (scores.sebi.gov.in) पर शिकायत करें। शिकायत सही संस्था तक जाती है और ट्रैक होती है।",
     "फिर भी हल न हो तो SMART ODR (smartodr.in) पर जाएँ, जो ब्रोकर और अन्य बाज़ार संस्थाओं के साथ सुलह और मध्यस्थता का SEBI का ऑनलाइन प्लेटफ़ॉर्म है।",
     "अगर कोई ब्रोकर डिफ़ॉल्टर घोषित हो, तो योग्य दावे एक्सचेंज के इन्वेस्टर प्रोटेक्शन फ़ंड से चुकाए जा सकते हैं।",
     "अपंजीकृत लोगों की धोखाधड़ी की शिकायत साइबर क्राइम पोर्टल (cybercrime.gov.in) या हेल्पलाइन 1930 पर भी करें।"
    ] },
  { h: "10. मुख्य बातें",
    ul: [
     "बाज़ार सुबह 9:15 से दोपहर 3:30 तक खुलता है, 9:00 से प्री-ओपन सेशन; सौदे T+1 पर सेटल होते हैं।",
     "सर्किट लिमिट आपको ख़रीदने या बेचने से रोक सकती है; बार-बार सर्किट लगाने वाले शेयरों से बचें।",
     "KYC और नॉमिनेशन अपडेट रखें, टू-फ़ैक्टर लॉगिन इस्तेमाल करें और कॉन्ट्रैक्ट नोट व CAS पढ़ें।",
     "केवल SEBI-रजिस्टर्ड सलाहकार ही पैसे लेकर सलाह दे सकते हैं। गारंटीड रिटर्न हमेशा ख़तरे का संकेत है।",
     "पहले ब्रोकर, फिर SCORES, फिर SMART ODR में शिकायत करें। हर रिकॉर्ड रखें।"
    ] }
 ] }
});


Object.assign(MODULE_META, {
 "market-rules": { terms: ["SEBI", "KYC", "Settlement (T+1)", "Pre-open session", "Circuit limit", "Market-wide circuit breaker", "Contract note", "Nomination", "IPO", "ASBA", "SEBI-registered adviser (RIA / RA)", "Pump and dump", "SCORES", "SMART ODR"], tools: [], calc: [] }
});

Object.assign(MODULE_CONTENT.en, {
 "market-rules": { faq: [
  { q: "Can I trade on a Saturday or a holiday?", a: "No. Equity trading runs Monday to Friday on non-holidays. Orders placed outside market hours are held as after-market orders and sent at the next open. Muhurat trading on Diwali is the one special session." },
  { q: "Why couldn't I sell a stock that was falling?", a: "It probably hit its lower circuit. At the band limit the stock trades only at that price, and if there are no buyers your sell order waits unfilled. This is common in small, illiquid stocks." },
  { q: "Someone on Telegram promises 5% a week. Is it real?", a: "No. No legitimate investment guarantees returns, and paid tips from unregistered people are not regulated. Check SEBI registration, never share your login or OTP, and never pay into personal accounts." },
  { q: "My broker is not resolving my complaint. What next?", a: "File on SEBI SCORES with your records. If it is still unresolved, use SMART ODR for conciliation and arbitration." }
 ] }
});
Object.assign(MODULE_CONTENT.hi, {
 "market-rules": { faq: [
  { q: "क्या शनिवार या छुट्टी पर ट्रेड कर सकते हैं?", a: "नहीं। शेयर ट्रेडिंग सोमवार से शुक्रवार, छुट्टियों को छोड़कर होती है। बाज़ार के बाहर दिए ऑर्डर आफ़्टर-मार्केट ऑर्डर बनकर अगली शुरुआत पर भेजे जाते हैं। दिवाली की मुहूर्त ट्रेडिंग एकमात्र विशेष सेशन है।" },
  { q: "गिरता शेयर मैं बेच क्यों नहीं पाया?", a: "शायद वह लोअर सर्किट पर था। बैंड की सीमा पर शेयर केवल उसी कीमत पर चलता है, और ख़रीदार न हों तो आपका बिक्री ऑर्डर अधूरा रहता है। छोटे, कम लिक्विड शेयरों में यह आम है।" },
  { q: "Telegram पर कोई हर हफ़्ते 5% का वादा करता है। क्या यह सच है?", a: "नहीं। कोई भी वैध निवेश रिटर्न की गारंटी नहीं देता, और अपंजीकृत लोगों की पैसे वाली टिप्स नियंत्रित नहीं हैं। SEBI रजिस्ट्रेशन जाँचें, लॉगिन या OTP कभी साझा न करें, और निजी खातों में कभी भुगतान न करें।" },
  { q: "मेरा ब्रोकर शिकायत हल नहीं कर रहा। अब क्या?", a: "अपने रिकॉर्ड के साथ SEBI SCORES पर शिकायत करें। फिर भी हल न हो तो सुलह और मध्यस्थता के लिए SMART ODR का उपयोग करें।" }
 ] }
});

// Practice quiz (applied by mcq-core.js, which only the lesson page loads): [question, [options], correct index, explanation]
if (typeof MCQ !== "undefined") {
Object.assign(MCQ.en, {
 "market-rules": [
  ["When does normal trading in Indian equities run?", ["9:00 am to 3:00 pm", "9:15 am to 3:30 pm", "10:00 am to 4:00 pm", "24 hours on weekdays"], 1, "Normal trading runs 9:15 am to 3:30 pm, after the 9:00–9:15 am pre-open session."],
  ["What is the purpose of the pre-open session?", ["To let brokers trade first", "To collect orders and set a fair opening price", "To settle yesterday's trades", "To trade only F&O"], 1, "Orders are collected and matched to discover a fair opening price, which reduces wild swings at the open."],
  ["You buy shares on Monday. Under T+1, when do they reach your demat account?", ["Monday", "Tuesday", "Wednesday", "Friday"], 1, "T+1 means one trading day after the trade: Tuesday."],
  ["A stock is 'upper circuit'. What does that usually mean?", ["It cannot be bought at all", "It has hit the top of its daily price band and often has no sellers", "It is suspended forever", "It will fall tomorrow"], 1, "At the band limit it trades only at that price, usually with buyers waiting and few or no sellers."],
  ["At which index move does a market-wide halt stop trading for the rest of the day?", ["5%", "10%", "15%", "20%"], 3, "A 20% move halts trading for the rest of the day. 10% and 15% halts depend on the time of day."],
  ["How does ASBA work for an IPO?", ["Money is debited immediately", "Money is blocked in your account and debited only if you get shares", "You pay in cash at the bank", "The broker pays for you"], 1, "Application Supported by Blocked Amount: funds stay blocked until allotment."],
  ["Who may charge you for personalised stock recommendations?", ["Any finance influencer", "A SEBI-registered Investment Adviser or Research Analyst", "Anyone with a Telegram channel", "Your friend who trades daily"], 1, "Only SEBI-registered RIAs and RAs may give paid personalised advice or recommendations."],
  ["Which of these is a red flag for a scam?", ["A contract note after each trading day", "Guaranteed weekly returns and a request to pay into a personal account", "Two-factor login", "A monthly CAS from the depository"], 1, "Guaranteed returns and payments to personal accounts are classic signs of fraud."],
  ["Your broker has not resolved a complaint. What is the next step?", ["Post about it on social media only", "File on SEBI SCORES", "Stop paying your bank EMI", "Nothing can be done"], 1, "After the broker, file on SEBI SCORES; if unresolved, go to SMART ODR."],
  ["What does a contract note show?", ["Your income tax", "Every trade of the day with prices and charges", "The company's results", "Your credit score"], 1, "It is the legal record of your trades, prices, brokerage, taxes and charges for the day."]
 ]
});
Object.assign(MCQ.hi, {
 "market-rules": [
  ["भारतीय शेयरों में सामान्य ट्रेडिंग कब चलती है?", ["सुबह 9:00 से दोपहर 3:00", "सुबह 9:15 से दोपहर 3:30", "सुबह 10:00 से शाम 4:00", "कार्यदिवसों में 24 घंटे"], 1, "सामान्य ट्रेडिंग सुबह 9:15 से दोपहर 3:30 तक, 9:00–9:15 के प्री-ओपन सेशन के बाद चलती है।"],
  ["प्री-ओपन सेशन का उद्देश्य क्या है?", ["ब्रोकरों को पहले ट्रेड करने देना", "ऑर्डर जमा करके उचित शुरुआती कीमत तय करना", "कल के सौदे सेटल करना", "केवल F&O ट्रेड करना"], 1, "ऑर्डर जमा करके मिलाए जाते हैं ताकि उचित शुरुआती कीमत तय हो, जिससे शुरुआत में तेज़ उतार-चढ़ाव कम होता है।"],
  ["आप सोमवार को शेयर ख़रीदते हैं। T+1 में वे डीमैट खाते में कब आते हैं?", ["सोमवार", "मंगलवार", "बुधवार", "शुक्रवार"], 1, "T+1 यानी ट्रेड के एक ट्रेडिंग दिन बाद: मंगलवार।"],
  ["कोई शेयर 'अपर सर्किट' में है। इसका आमतौर पर क्या मतलब है?", ["उसे बिल्कुल नहीं ख़रीदा जा सकता", "वह अपने दैनिक प्राइस बैंड के ऊपरी सिरे पर है और अक्सर बेचने वाले नहीं होते", "वह हमेशा के लिए निलंबित है", "वह कल गिरेगा"], 1, "बैंड की सीमा पर वह केवल उसी कीमत पर चलता है, आमतौर पर ख़रीदार इंतज़ार में और बेचने वाले कम या नहीं।"],
  ["इंडेक्स की कितनी चाल पर पूरे बाज़ार में बाकी दिन ट्रेडिंग बंद होती है?", ["5%", "10%", "15%", "20%"], 3, "20% की चाल पर बाकी दिन ट्रेडिंग बंद रहती है। 10% और 15% पर रोक दिन के समय पर निर्भर करती है।"],
  ["IPO में ASBA कैसे काम करता है?", ["पैसा तुरंत कट जाता है", "पैसा खाते में ब्लॉक रहता है और शेयर मिलने पर ही कटता है", "बैंक में नकद देते हैं", "ब्रोकर आपकी ओर से भुगतान करता है"], 1, "एप्लिकेशन सपोर्टेड बाय ब्लॉक्ड अमाउंट: आवंटन तक पैसा ब्लॉक रहता है।"],
  ["व्यक्तिगत शेयर सुझाव के लिए कौन फ़ीस ले सकता है?", ["कोई भी फ़ाइनेंस इन्फ़्लुएंसर", "SEBI-रजिस्टर्ड इन्वेस्टमेंट एडवाइज़र या रिसर्च एनालिस्ट", "Telegram चैनल वाला कोई भी", "रोज़ ट्रेड करने वाला आपका दोस्त"], 1, "केवल SEBI-रजिस्टर्ड RIA और RA ही पैसे लेकर व्यक्तिगत सलाह या सुझाव दे सकते हैं।"],
  ["इनमें से कौन धोखाधड़ी का ख़तरे का संकेत है?", ["हर ट्रेडिंग दिन के बाद कॉन्ट्रैक्ट नोट", "हर हफ़्ते गारंटीड रिटर्न और निजी खाते में भुगतान की माँग", "टू-फ़ैक्टर लॉगिन", "डिपॉज़िटरी का मासिक CAS"], 1, "गारंटीड रिटर्न और निजी खातों में भुगतान धोखाधड़ी के क्लासिक संकेत हैं।"],
  ["ब्रोकर ने शिकायत हल नहीं की। अगला कदम क्या है?", ["केवल सोशल मीडिया पर लिखें", "SEBI SCORES पर शिकायत करें", "बैंक EMI देना बंद करें", "कुछ नहीं हो सकता"], 1, "ब्रोकर के बाद SEBI SCORES पर शिकायत करें; हल न हो तो SMART ODR पर जाएँ।"],
  ["कॉन्ट्रैक्ट नोट में क्या दिखता है?", ["आपका इनकम टैक्स", "दिन का हर सौदा, कीमत और शुल्क के साथ", "कंपनी के नतीजे", "आपका क्रेडिट स्कोर"], 1, "यह दिन के आपके सौदों, कीमतों, ब्रोकरेज, टैक्स और शुल्कों का क़ानूनी रिकॉर्ड है।"]
 ]
});
}

// Second in the course order, right after Stock Market Foundations.
LESSON_ORDER.splice(LESSON_ORDER.indexOf("foundations") + 1, 0, "market-rules");
