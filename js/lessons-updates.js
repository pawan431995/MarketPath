// Updates to existing modules for rules that changed in 2024–25. Loaded on the lesson page after the module content.
// Check SEBI and exchange circulars for the current position: these rules are reviewed often.
(function () {
 const host = (slug, lang) => (LESSON_OVERRIDES[lang] && LESSON_OVERRIDES[lang][slug]) || (LESSONS[lang] && LESSONS[lang][slug]);
 function insert(slug, lang, where, section) {
  const h = host(slug, lang);
  if (!h || !h.sections || h.sections.some(s => s.h === section.h)) return; // missing module, or already applied
  const index = typeof where === "function" ? where(h.sections) : where;
  h.sections.splice(Math.min(index, h.sections.length), 0, section);
 }
 // Just after the last numbered section ("7. …"), where the basics end and the strategy sections begin.
 const afterNumbered = sections => { let last = -1; sections.forEach((s, i) => { if (/^\d+\./.test(s.h)) last = i; }); return last + 1; };

 // ---- Futures & Options: SEBI's findings first, rule changes after the basics ----
 insert("futures-options", "en", 0, {
  h: "Read this first: what SEBI's data shows",
  p: "SEBI studied individual traders in equity futures and options. Between FY 2021-22 and FY 2023-24, about 93% of more than one crore individual F&O traders lost money, with an average loss of around ₹2 lakh per trader including transaction costs. A follow-up study for FY 2024-25 again found that about 91% of individual traders lost money.",
  ul: [
   "Only about 1% of individual traders made more than ₹1 lakh profit over those three years after costs.",
   "Traders who traded more often lost more on average; brokerage, taxes and slippage alone take a large share.",
   "Option buying looks cheap per trade, but most short-dated options expire worthless."
  ],
  p2: "Treat F&O as an advanced skill. Practise with the paper-trading simulator first, keep position sizes small, and risk only money you can afford to lose."
 });
 insert("futures-options", "hi", 0, {
  h: "पहले यह पढ़ें: SEBI के आँकड़े क्या कहते हैं",
  p: "SEBI ने इक्विटी फ्यूचर्स और ऑप्शंस के व्यक्तिगत ट्रेडरों का अध्ययन किया। FY 2021-22 से FY 2023-24 के बीच एक करोड़ से अधिक व्यक्तिगत F&O ट्रेडरों में से लगभग 93% को नुकसान हुआ, लेन-देन लागत सहित प्रति ट्रेडर औसतन लगभग ₹2 लाख। FY 2024-25 के अगले अध्ययन में भी लगभग 91% व्यक्तिगत ट्रेडरों को नुकसान हुआ।",
  ul: [
   "उन तीन सालों में लागत के बाद केवल लगभग 1% व्यक्तिगत ट्रेडरों ने ₹1 लाख से अधिक लाभ कमाया।",
   "जो ज़्यादा बार ट्रेड करते थे उन्हें औसतन ज़्यादा नुकसान हुआ; ब्रोकरेज, टैक्स और स्लिपेज ही बड़ा हिस्सा ले लेते हैं।",
   "ऑप्शन ख़रीदना प्रति ट्रेड सस्ता लगता है, पर ज़्यादातर कम अवधि के ऑप्शन बेकार होकर एक्सपायर होते हैं।"
  ],
  p2: "F&O को एक उन्नत कौशल मानें। पहले पेपर-ट्रेडिंग सिम्युलेटर पर अभ्यास करें, पोज़िशन छोटी रखें, और केवल उतना पैसा जोखिम में डालें जितना खो सकते हैं।"
 });
 insert("futures-options", "en", afterNumbered, {
  h: "F&O rules that changed in 2024–25",
  ul: [
   "The minimum contract size for index derivatives rose to ₹15 lakh at the time of review, so lot sizes went up. Lot sizes are reviewed twice a year; always check the current size on the exchange website.",
   "Each exchange may offer a weekly expiry on only one benchmark index (NIFTY 50 on NSE, SENSEX on BSE).",
   "Option buyers must pay the full premium upfront, and intraday position limits are monitored.",
   "An extra 2% margin applies to short options on expiry day, and the calendar-spread margin benefit is removed on expiry day.",
   "STT rose from October 2024: 0.1% of the premium on options sold and 0.02% on futures sold.",
   "Expiry days moved in September 2025: NSE index derivatives now expire on Tuesday and BSE's on Thursday. Check each exchange's current calendar."
  ]
 });
 insert("futures-options", "hi", afterNumbered, {
  h: "2024–25 में बदले F&O नियम",
  ul: [
   "इंडेक्स डेरिवेटिव का न्यूनतम कॉन्ट्रैक्ट साइज़ समीक्षा के समय ₹15 लाख हुआ, इसलिए लॉट साइज़ बढ़े। लॉट साइज़ की समीक्षा साल में दो बार होती है; हमेशा एक्सचेंज की वेबसाइट पर मौजूदा साइज़ देखें।",
   "हर एक्सचेंज केवल एक बेंचमार्क इंडेक्स पर साप्ताहिक एक्सपायरी दे सकता है (NSE पर NIFTY 50, BSE पर SENSEX)।",
   "ऑप्शन ख़रीदारों को पूरा प्रीमियम पहले देना होता है, और इंट्राडे पोज़िशन लिमिट पर नज़र रखी जाती है।",
   "एक्सपायरी के दिन शॉर्ट ऑप्शन पर 2% अतिरिक्त मार्जिन लगता है, और कैलेंडर-स्प्रेड मार्जिन का लाभ हटता है।",
   "अक्टूबर 2024 से STT बढ़ा: बेचे गए ऑप्शन पर प्रीमियम का 0.1% और बेचे गए फ्यूचर्स पर 0.02%।",
   "सितंबर 2025 में एक्सपायरी के दिन बदले: NSE इंडेक्स डेरिवेटिव अब मंगलवार को और BSE के गुरुवार को एक्सपायर होते हैं। हर एक्सचेंज का मौजूदा कैलेंडर देखें।"
  ]
 });

 // ---- Tax Basics: which income-tax regime ----
 insert("tax-basics", "en", Infinity, {
  h: "15. Income-tax regime: new or old?",
  p: "The new regime is the default. For FY 2025-26 (Budget 2025) there is no income tax up to ₹12 lakh of taxable income because of the Section 87A rebate; for salaried people that means up to ₹12.75 lakh after the ₹75,000 standard deduction. The old regime has higher rates but keeps deductions such as 80C, 80D, HRA and home-loan interest.",
  ul: [
   "Salaried people can choose the regime every year when filing their return.",
   "People with business income, which includes F&O and intraday trading, can switch back to the new regime only once.",
   "The 87A rebate does not cover special-rate income such as short-term capital gains on shares (111A) or long-term gains (112A).",
   "Use the Income tax calculator on the Calculators page to compare both regimes with your own numbers."
  ]
 });
 insert("tax-basics", "hi", Infinity, {
  h: "15. इनकम टैक्स व्यवस्था: नई या पुरानी?",
  p: "नई व्यवस्था डिफ़ॉल्ट है। FY 2025-26 (बजट 2025) में सेक्शन 87A रिबेट के कारण ₹12 लाख तक की कर योग्य आय पर इनकम टैक्स नहीं है; वेतनभोगियों के लिए ₹75,000 के स्टैंडर्ड डिडक्शन के बाद यह ₹12.75 लाख तक है। पुरानी व्यवस्था में दरें ऊँची हैं पर 80C, 80D, HRA और होम-लोन ब्याज जैसी कटौतियाँ मिलती हैं।",
  ul: [
   "वेतनभोगी हर साल रिटर्न भरते समय व्यवस्था चुन सकते हैं।",
   "जिनकी व्यावसायिक आय है, जिसमें F&O और इंट्राडे ट्रेडिंग शामिल है, वे नई व्यवस्था में केवल एक बार वापस आ सकते हैं।",
   "87A रिबेट विशेष दर वाली आय जैसे शेयरों पर शॉर्ट-टर्म कैपिटल गेन (111A) या लॉन्ग-टर्म गेन (112A) पर लागू नहीं होता।",
   "अपने आँकड़ों से दोनों व्यवस्थाओं की तुलना के लिए कैलकुलेटर पेज पर इनकम टैक्स कैलकुलेटर का उपयोग करें।"
  ]
 });
})();
