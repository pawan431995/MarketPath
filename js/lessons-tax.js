// Tax Basics for stock market investors and traders in India: a new module.
// IMPORTANT: Tax rates, exemption limits, thresholds and forms change with each Union Budget and notification.
// The figures below reflect the rules as understood when this module was written (post Budget 2024 changes).
// Before relying on any figure, check incometax.gov.in, the latest Finance Act and a qualified tax professional.
Object.assign(LESSONS.en, {
 "tax-basics": {
  title: "Tax Basics for Indian Investors and Traders", level: "intermediate", time: "11 topics",
  summary: "How gains from shares, mutual funds, intraday and F&O are taxed in India, what records to keep, and where to verify the current rules.",
  sections: [{ h: "Start here", p: "Tax changes your real return, so understand it before you trade. This module explains the main categories. Rates and limits change, so every figure is marked as a point to verify." }]
 }
});
Object.assign(LESSONS.hi, {
 "tax-basics": {
  title: "भारतीय निवेशकों और ट्रेडरों के लिए टैक्स बेसिक्स", level: "intermediate", time: "11 विषय",
  summary: "भारत में शेयर, म्यूचुअल फंड, इंट्राडे और F&O से होने वाले लाभ पर टैक्स कैसे लगता है, कौन से रिकॉर्ड रखें, और मौजूदा नियम कहाँ जाँचें।",
  sections: [{ h: "यहाँ से शुरू करें", p: "टैक्स आपका असली रिटर्न बदलता है, इसलिए ट्रेड से पहले इसे समझें। यह मॉड्यूल मुख्य श्रेणियाँ समझाता है। दरें और सीमाएँ बदलती हैं, इसलिए हर आँकड़ा जाँचने योग्य बिंदु के रूप में चिह्नित है।" }]
 }
});
LESSON_ORDER.push("tax-basics");

Object.assign(LESSON_OVERRIDES.en, {
 "tax-basics": { sections: [
  { h: "1. Why tax matters for every decision", p: "Tax is a cost, and it changes the best choice. A trade that makes ₹10,000 before tax may keep much less after tax and charges. Before you sell, know how the gain will be classified, when it becomes taxable, and what you can offset it against. Tax rules are set by the Income Tax Act and changed through the Union Budget and notifications, so always check the current year's rules." },
  { h: "2. The two big categories: capital gains and business income", p: "Indian tax treats market income in two broad ways. The category depends on how and why you trade, not on the product alone.", ul: [
   "Capital gains: profit or loss from selling a capital asset held as an investment, such as shares or equity mutual funds held for investment. Taxed by holding period.",
   "Business or professional income: profit from trading as a business activity, such as frequent intraday trading, speculative trading, or F&O. Taxed at your slab rate, with business rules for expenses and losses.",
   "Your filing, record keeping and loss rules depend on which category applies. If you trade actively, take advice on classification."
  ] },
  { h: "3. Holding period: short term or long term (listed shares and equity funds)", p: "For listed equity shares and equity-oriented mutual funds, the holding period decides the category.", ul: [
   "Short-term capital gain (STCG): held for 12 months or less. Verify the current rate; as of Budget 2024, it was 20% on listed equity sold after STT is paid (section 111A).",
   "Long-term capital gain (LTCG): held for more than 12 months. As of Budget 2024, it was 12.5% on gains above ₹1.25 lakh in a financial year, with no indexation (section 112A).",
   "Grandfathering: for shares bought before 31 January 2018, the cost can be taken as the fair value on that date, under rules you must verify."
  ], p2: "Example (verify rates): you bought 100 shares at ₹500 and sold after 8 months at ₹600, a gain of ₹10,000. This is STCG, taxed at the current short-term rate. If you had held for 14 months, it would be LTCG; the first ₹1.25 lakh of total LTCG in the year would be exempt, and the excess taxed at the current long-term rate." },
  { h: "4. Intraday and F&O: business income, not capital gains", p: "Intraday equity profits are generally treated as speculative business income. F&O profits and losses are generally treated as non-speculative business income. Both are taxed at your slab rate, not at the capital gains rates. This is one of the most common surprises for new traders.", ul: [
   "Intraday equity is speculative business income. Losses can be set off only against speculative income, and carried forward for 4 years.",
   "F&O is non-speculative business income. Losses can be set off against other business income and carried forward for 8 years, if the return is filed on time.",
   "Because the category depends on your activity, keep records that show your trading pattern."
  ] },
  { h: "5. Turnover and the tax audit", p: "Business income requires proper accounts. Above certain turnover limits, a tax audit by a chartered accountant is required under section 44AB. For derivatives, turnover is defined by specific rules, which are different from the total value of contracts. Check the current definition and thresholds for the year, because a missed audit can attract penalties." },
  { h: "6. Dividends and interest", p: "Dividends from shares and mutual funds are taxable in the hands of the investor at the slab rate. Companies and funds may deduct tax at source (TDS) above a threshold set by law, so check the current limit. Interest from fixed deposits, bonds and debt products is taxed at slab rates, with TDS rules that also apply. Include all income in your return even when TDS has been deducted." },
  { h: "7. Debt funds and other products", p: "The tax on debt mutual funds and some other instruments changed in recent years. Under the rules as understood for this module, gains on debt funds bought after 1 April 2023 are generally taxed at the investor's slab rate, regardless of holding period. Check the current rule for your specific product before buying, because product categories and rules differ." },
  { h: "8. Setting off losses: the rules that matter", ul: [
   "Short-term capital loss can be set off against both short-term and long-term capital gains.",
   "Long-term capital loss can be set off only against long-term capital gains.",
   "Capital losses can be carried forward for 8 years, but only if you file your return on time.",
   "Speculative (intraday equity) losses: only against speculative income, carried forward for 4 years.",
   "Non-speculative business losses (F&O): against business income, carried forward for 8 years, if filed on time.",
   "Unrealised losses (on positions you still hold) do not reduce tax; only realised losses do."
  ] },
  { h: "9. Advance tax and TDS", p: "Tax is generally paid as you earn. If your estimated tax liability for the year exceeds ₹10,000 after TDS, you must pay advance tax in instalments. Interest can apply for shortfalls. Brokers and funds may deduct TDS on certain transactions or dividends; the deducted amount appears in your tax credit statement, and you claim it when you file." },
  { h: "10. Records you must keep", ul: [
   "Contract notes for every trade, from your broker.",
   "Profit and loss statement and capital gains statement from your broker, which shows realised and unrealised figures.",
   "Consolidated account statement (CAS) from the depositories and fund houses, showing all holdings and transactions.",
   "Bank statements showing the flow of money, and details of TDS certificates.",
   "A trade journal that shows the purpose of each trade, to help classify your activity."
  ] },
  { h: "11. Filing: which return form", p: "The form depends on your income type. Investors with only capital gains and salary typically file ITR-2. Traders with business income (intraday, F&O) typically file ITR-3, and the form can change, so check the current instructions on the income tax website before filing. Use a professional if your transactions are numerous, or if any category is unclear." },
  { h: "12. Where to verify the current rules", ul: [
   "incometax.gov.in: the official portal for returns, forms, notifications and FAQs.",
   "The latest Union Budget and the Finance Act for the year in question.",
   "SEBI and exchange circulars for market-specific rules on STT and transactions.",
   "A qualified chartered accountant or tax professional for your situation."
  ] },
  { h: "13. A simple tax check before every sale", ul: [
   "How long have I held these shares or units? Is this STCG or LTCG?",
   "Is this trade investment or business activity? Which category applies?",
   "Do I have losses to set off, and in which category?",
   "Will this sale push my total LTCG past the exemption limit this year?",
   "Do I need to keep any additional record for this trade?"
  ] },
  { h: "14. Common tax mistakes", ul: [
   "Assuming intraday profit is a capital gain, and using the wrong rate.",
   "Forgetting that unrealised gains are not taxed until you sell, and that rebalancing sells can create tax.",
   "Missing the 12-month dividing line and paying higher tax by selling too early.",
   "Not filing a return in a loss year, which loses the right to carry forward losses.",
   "Relying on memory instead of the contract notes and broker statements.",
   "Using an old rate from a previous year."
  ] }
 ] }
});

Object.assign(LESSON_OVERRIDES.hi, {
 "tax-basics": { sections: [
  { h: "1. हर फ़ैसले में टैक्स क्यों मायने रखता है", p: "टैक्स एक खर्च है, और यह सबसे अच्छे विकल्प को बदल देता है। जो ट्रेड टैक्स से पहले ₹10,000 देता है, वह टैक्स और शुल्क के बाद उससे काफ़ी कम रख सकता है। बेचने से पहले जानें कि लाभ किस श्रेणी में आएगा, वह कब टैक्सेबल होगा, और उसे किससे सेट-ऑफ़ किया जा सकता है। टैक्स के नियम इनकम टैक्स एक्ट से तय होते हैं और केंद्रीय बजट व नोटिफ़िकेशन से बदलते हैं, इसलिए हमेशा चालू वर्ष के नियम जाँचें।" },
  { h: "2. दो बड़ी श्रेणियाँ: कैपिटल गेन और बिज़नेस इनकम", p: "भारतीय टैक्स में बाज़ार की आय दो व्यापक तरीकों से देखी जाती है। श्रेणी इस पर निर्भर है कि आप कैसे और क्यों ट्रेड करते हैं, केवल प्रोडक्ट पर नहीं।", ul: [
   "कैपिटल गेन: निवेश के रूप में रखी पूँजी संपत्ति, जैसे शेयर या इक्विटी म्यूचुअल फंड, बेचने पर लाभ या हानि। होल्डिंग अवधि से टैक्स तय होता है।",
   "बिज़नेस या प्रोफ़ेशनल इनकम: ट्रेडिंग को व्यवसाय के रूप में करने से लाभ, जैसे बार-बार इंट्राडे, स्पेक्युलेटिव ट्रेडिंग, या F&O। स्लैब दर पर टैक्स, खर्च और नुकसान के बिज़नेस नियमों के साथ।",
   "आपकी फ़ाइलिंग, रिकॉर्ड और नुकसान के नियम इस पर निर्भर हैं कि कौन सी श्रेणी लागू होती है। अगर आप सक्रिय रूप से ट्रेड करते हैं, तो वर्गीकरण पर सलाह लें।"
  ] },
  { h: "3. होल्डिंग अवधि: शॉर्ट टर्म या लॉन्ग टर्म (लिस्टेड शेयर और इक्विटी फंड)", p: "लिस्टेड इक्विटी शेयरों और इक्विटी-उन्मुख म्यूचुअल फंड के लिए होल्डिंग अवधि श्रेणी तय करती है।", ul: [
   "शॉर्ट-टर्म कैपिटल गेन (STCG): 12 महीने या उससे कम रखा। मौजूदा दर जाँचें; बजट 2024 के अनुसार, STT चुकाए गए लिस्टेड इक्विटी पर 20% (धारा 111A)।",
   "लॉन्ग-टर्म कैपिटल गेन (LTCG): 12 महीने से ज़्यादा रखा। बजट 2024 के अनुसार, एक वित्त वर्ष में ₹1.25 लाख से ऊपर के लाभ पर 12.5%, इंडेक्सेशन के बिना (धारा 112A)।",
   "ग्रैंडफ़ादरिंग: 31 जनवरी 2018 से पहले ख़रीदे शेयरों के लिए, उस तारीख़ का उचित मूल्य लागत माना जा सकता है, जिसके नियम आपको जाँचने होंगे।"
  ], p2: "उदाहरण (दरें जाँचें): 100 शेयर ₹500 पर ख़रीदे और 8 महीने बाद ₹600 पर बेचे, ₹10,000 का लाभ। यह STCG है, मौजूदा शॉर्ट-टर्म दर पर टैक्स। अगर 14 महीने रखते, तो LTCG होता; उस वर्ष के कुल LTCG में पहले ₹1.25 लाख छूट में, और अधिक हिस्सा मौजूदा लॉन्ग-टर्म दर पर।" },
  { h: "4. इंट्राडे और F&O: बिज़नेस इनकम, कैपिटल गेन नहीं", p: "इंट्राडे इक्विटी लाभ आमतौर पर स्पेक्युलेटिव बिज़नेस इनकम माने जाते हैं। F&O लाभ और नुकसान आमतौर पर नॉन-स्पेक्युलेटिव बिज़नेस इनकम माने जाते हैं। दोनों पर आपकी स्लैब दर लगती है, कैपिटल गेन दर नहीं। यह नए ट्रेडरों के लिए सबसे आम आश्चर्यों में से एक है।", ul: [
   "इंट्राडे इक्विटी स्पेक्युलेटिव बिज़नेस इनकम है। इसका नुकसान केवल स्पेक्युलेटिव आय से सेट-ऑफ़ और 4 साल तक आगे ले जाया जा सकता है।",
   "F&O नॉन-स्पेक्युलेटिव बिज़नेस इनकम है। नुकसान अन्य बिज़नेस इनकम से सेट-ऑफ़ और समय पर रिटर्न भरने पर 8 साल तक आगे ले जाया जा सकता है।",
   "श्रेणी आपकी गतिविधि पर निर्भर है, इसलिए ऐसे रिकॉर्ड रखें जो आपकी ट्रेडिंग का स्वरूप दिखाएँ।"
  ] },
  { h: "5. टर्नओवर और टैक्स ऑडिट", p: "बिज़नेस इनकम के लिए उचित खाते चाहिए। कुछ टर्नओवर सीमा से ऊपर धारा 44AB के तहत चार्टर्ड अकाउंटेंट से टैक्स ऑडिट ज़रूरी है। डेरिवेटिव्स के लिए टर्नओवर विशेष नियमों से तय होता है, जो अनुबंधों के कुल मूल्य से अलग हैं। उस वर्ष की मौजूदा परिभाषा और सीमाएँ जाँचें, क्योंकि छूटा ऑडिट जुर्माना ला सकता है।" },
  { h: "6. डिविडेंड और ब्याज", p: "शेयरों और म्यूचुअल फंड से डिविडेंड निवेशक के हाथ में स्लैब दर पर टैक्सेबल है। कानूनी सीमा से ऊपर कंपनियाँ और फंड स्रोत पर कटौती (TDS) कर सकते हैं, इसलिए मौजूदा सीमा जाँचें। फ़िक्स्ड डिपॉज़िट, बॉन्ड और डेट उत्पादों के ब्याज पर भी स्लैब दर पर टैक्स लगता है, और TDS नियम लागू होते हैं। TDS कटने पर भी सारी आय रिटर्न में दिखाएँ।" },
  { h: "7. डेट फंड और अन्य उत्पाद", p: "डेट म्यूचुअल फंड और कुछ अन्य साधनों पर टैक्स के नियम हाल के वर्षों में बदले हैं। इस मॉड्यूल के लिए समझे गए नियमों के अनुसार, 1 अप्रैल 2023 के बाद ख़रीदे डेट फंड पर लाभ आमतौर पर होल्डिंग अवधि की परवाह किए बिना निवेशक की स्लैब दर पर टैक्स होता है। ख़रीदने से पहले अपने विशिष्ट उत्पाद का मौजूदा नियम जाँचें, क्योंकि श्रेणियाँ और नियम अलग हैं।" },
  { h: "8. नुकसान सेट-ऑफ़ करना: ज़रूरी नियम", ul: [
   "शॉर्ट-टर्म कैपिटल लॉस को शॉर्ट-टर्म और लॉन्ग-टर्म दोनों कैपिटल गेन से सेट-ऑफ़ कर सकते हैं।",
   "लॉन्ग-टर्म कैपिटल लॉस को केवल लॉन्ग-टर्म कैपिटल गेन से सेट-ऑफ़ कर सकते हैं।",
   "कैपिटल लॉस 8 साल तक आगे ले जाए जा सकते हैं, पर केवल समय पर रिटर्न भरने पर।",
   "स्पेक्युलेटिव (इंट्राडे इक्विटी) नुकसान: केवल स्पेक्युलेटिव आय से, 4 साल तक आगे।",
   "नॉन-स्पेक्युलेटिव बिज़नेस नुकसान (F&O): बिज़नेस इनकम से, समय पर रिटर्न भरने पर 8 साल तक आगे।",
   "अवास्तविक नुकसान (जो पोज़िशन आपने अभी रखी है) टैक्स कम नहीं करते; केवल वास्तविक (realised) नुकसान।"
  ] },
  { h: "9. एडवांस टैक्स और TDS", p: "टैक्स आमतौर पर कमाई के साथ चुकाया जाता है। TDS कटने के बाद अगर वर्ष की अनुमानित टैक्स देनदारी ₹10,000 से ज़्यादा है, तो किश्तों में एडवांस टैक्स देना होगा। कम भुगतान पर ब्याज लग सकता है। ब्रोकर और फंड कुछ लेनदेन या डिविडेंड पर TDS काट सकते हैं; कटौती टैक्स क्रेडिट स्टेटमेंट में दिखती है, और रिटर्न भरते समय उसका दावा करते हैं।" },
  { h: "10. ज़रूरी रिकॉर्ड", ul: [
   "हर ट्रेड का कॉन्ट्रैक्ट नोट, ब्रोकर से।",
   "ब्रोकर का लाभ-हानि स्टेटमेंट और कैपिटल गेन स्टेटमेंट, जिसमें वास्तविक और अवास्तविक आँकड़े हों।",
   "डिपॉज़िटरी और फंड हाउस से कंसॉलिडेटेड अकाउंट स्टेटमेंट (CAS), जिसमें सारी होल्डिंग और लेनदेन हों।",
   "बैंक स्टेटमेंट जो पैसे का प्रवाह दिखाएँ, और TDS सर्टिफ़िकेट के विवरण।",
   "ट्रेड जर्नल, जो हर ट्रेड का उद्देश्य दिखाए और आपकी गतिविधि का वर्गीकरण आसान करे।"
  ] },
  { h: "11. फ़ाइलिंग: कौन सा रिटर्न फ़ॉर्म", p: "फ़ॉर्म आपकी आय के प्रकार पर निर्भर है। केवल कैपिटल गेन और वेतन वाले निवेशक आमतौर पर ITR-2 भरते हैं। बिज़नेस इनकम (इंट्राडे, F&O) वाले ट्रेडर आमतौर पर ITR-3 भरते हैं, और फ़ॉर्म बदल सकता है, इसलिए फ़ाइल करने से पहले आयकर वेबसाइट के मौजूदा निर्देश देखें। अगर लेनदेन बहुत हैं या श्रेणी साफ़ नहीं, तो पेशेवर की मदद लें।" },
  { h: "12. मौजूदा नियम कहाँ जाँचें", ul: [
   "incometax.gov.in: रिटर्न, फ़ॉर्म, नोटिफ़िकेशन और FAQ का आधिकारिक पोर्टल।",
   "संबंधित वर्ष का नवीनतम केंद्रीय बजट और फ़ाइनेंस एक्ट।",
   "STT और लेनदेन से जुड़े बाज़ार नियमों के लिए SEBI और एक्सचेंज के सर्कुलर।",
   "अपनी स्थिति के लिए योग्य चार्टर्ड अकाउंटेंट या टैक्स पेशेवर।"
  ] },
  { h: "13. हर बिक्री से पहले एक सरल टैक्स जाँच", ul: [
   "मैंने ये शेयर या यूनिट कितने समय से रखे हैं? क्या यह STCG है या LTCG?",
   "क्या यह ट्रेड निवेश है या बिज़नेस गतिविधि? कौन सी श्रेणी लागू होती है?",
   "क्या मेरे पास सेट-ऑफ़ करने योग्य नुकसान हैं, और किस श्रेणी में?",
   "क्या यह बिक्री इस वर्ष मेरे कुल LTCG को छूट सीमा से ऊपर ले जाएगी?",
   "क्या इस ट्रेड के लिए कोई और रिकॉर्ड रखना ज़रूरी है?"
  ] },
  { h: "14. आम टैक्स गलतियाँ", ul: [
   "इंट्राडे लाभ को कैपिटल गेन मानना, और गलत दर लगाना।",
   "यह भूल जाना कि अवास्तविक लाभ तब तक टैक्सेबल नहीं जब तक आप बेचें, और रीबैलेंसिंग की बिक्री से टैक्स बन सकता है।",
   "12 महीने की सीमा चूकना और जल्दी बेचकर ज़्यादा टैक्स देना।",
   "नुकसान वाले वर्ष में रिटर्न न भरना, जिससे नुकसान आगे ले जाने का अधिकार खो जाता है।",
   "कॉन्ट्रैक्ट नोट और ब्रोकर स्टेटमेंट की जगह याददाश्त पर निर्भर रहना।",
   "पिछले वर्ष की पुरानी दर इस्तेमाल करना।"
  ] }
 ] }
});

Object.assign(MODULE_META, {
 "tax-basics": { terms: ["STT (Securities Transaction Tax)", "Brokerage", "Intraday", "Swing trading", "Dividend", "Compounding", "Emergency fund"], tools: [], calc: ["cagr"] }
});

Object.assign(MODULE_CONTENT.en, {
 "tax-basics": {
  faq: [
   { q: "Do I pay tax on shares I have not sold?", a: "No. Unrealised gains are not taxed until you sell or transfer the shares. But selling for rebalancing or to book profit does create a taxable event." },
   { q: "Is intraday profit a capital gain?", a: "Generally no. Intraday equity profit is usually treated as speculative business income, taxed at your slab rate. Classification depends on your activity, so check your situation." },
   { q: "Where do I find the numbers for my tax return?", a: "From your broker's profit and loss and capital gains statements, your contract notes, and the consolidated account statement from depositories and fund houses." }
  ],
  quiz: [
   { q: "Shares held for 8 months and sold at a gain are generally:", o: ["Long-term capital gain", "Short-term capital gain", "Business income", "Tax-free"], a: 1, e: "Listed equity held 12 months or less is short term. Verify the current rate." },
   { q: "Intraday equity losses can generally be set off against:", o: ["Any income", "Only speculative business income", "Salary only", "Nothing; they are never allowed"], a: 1, e: "Speculative losses set off only against speculative income and carry forward for 4 years." },
   { q: "Unrealised losses on a position you still hold:", o: ["Reduce your tax now", "Do not reduce tax until realised", "Are always refunded", "Count only for the broker"], a: 1, e: "Only realised losses from actual sales are set off under the rules." }
  ]
 }
});
Object.assign(MODULE_CONTENT.hi, {
 "tax-basics": {
  faq: [
   { q: "क्या जो शेयर मैंने नहीं बेचे उन पर टैक्स लगता है?", a: "नहीं। अवास्तविक लाभ तब तक टैक्सेबल नहीं जब तक आप शेयर बेचें या ट्रांसफ़र करें। लेकिन रीबैलेंसिंग या लाभ बुक करने के लिए बेचने से टैक्सेबल घटना बनती है।" },
   { q: "क्या इंट्राडे लाभ कैपिटल गेन है?", a: "आमतौर पर नहीं। इंट्राडे इक्विटी लाभ आमतौर पर स्पेक्युलेटिव बिज़नेस इनकम माना जाता है, जिस पर स्लैब दर लगती है। वर्गीकरण आपकी गतिविधि पर निर्भर है, इसलिए अपनी स्थिति जाँचें।" },
   { q: "अपने टैक्स रिटर्न के आँकड़े कहाँ मिलेंगे?", a: "ब्रोकर के लाभ-हानि और कैपिटल गेन स्टेटमेंट, कॉन्ट्रैक्ट नोट, और डिपॉज़िटरी व फंड हाउस से कंसॉलिडेटेड अकाउंट स्टेटमेंट से।" }
  ],
  quiz: [
   { q: "8 महीने रखे शेयर लाभ पर बेचे गए, वे आमतौर पर हैं:", o: ["लॉन्ग-टर्म कैपिटल गेन", "शॉर्ट-टर्म कैपिटल गेन", "बिज़नेस इनकम", "टैक्स-फ़्री"], a: 1, e: "12 महीने या उससे कम रखे लिस्टेड इक्विटी शॉर्ट-टर्म होते हैं। मौजूदा दर जाँचें।" },
   { q: "इंट्राडे इक्विटी नुकसान आमतौर पर किससे सेट-ऑफ़ हो सकता है?", o: ["कोई भी आय", "केवल स्पेक्युलेटिव बिज़नेस इनकम", "केवल वेतन", "कुछ नहीं; कभी अनुमति नहीं"], a: 1, e: "स्पेक्युलेटिव नुकसान केवल स्पेक्युलेटिव आय से सेट-ऑफ़ होते हैं और 4 साल तक आगे जाते हैं।" },
   { q: "आपके पास अभी मौजूद पोज़िशन पर अवास्तविक नुकसान:", o: ["अभी टैक्स कम करते हैं", "वास्तविक होने तक टैक्स कम नहीं करते", "हमेशा रिफ़ंड होते हैं", "केवल ब्रोकर के लिए गिने जाते हैं"], a: 1, e: "नियमों के तहत केवल वास्तविक बिक्री से हुए नुकसान सेट-ऑफ़ होते हैं।" }
  ]
 }
});
