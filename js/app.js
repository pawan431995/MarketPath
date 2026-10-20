// Homepage (index.html): a learning-platform landing page. The hero shows the learner's path and progress,
// then learning paths by level, featured courses, how it works, practice tools, the final test and a glossary.
// Courses and progress come from js/course-catalog.js (MPCourses) and js/progress.js.
// Old links to homepage sections (index.html#paper, #courses and others) forward to their own pages.
(function () {
 const moved = { "#paper": "pages/paper-trading.html", "#screener": "pages/paper-trading.html#screener", "#strategy": "pages/paper-trading.html#strategy",
  "#replay": "pages/paper-trading.html#replay", "#journal": "pages/paper-trading.html#journal", "#courses": "pages/learn.html", "#tools": "pages/calculators.html" };
 const go = () => { if (moved[location.hash]) location.replace(moved[location.hash]); };
 go();
 window.addEventListener("hashchange", go);
})();
const glossary = [
 ["Share","A unit of ownership in a company."],["Index","A measure tracking a selected group of securities."],["SIP","A method of investing a fixed amount at regular intervals."],["Dividend","A distribution a company may pay to shareholders."],
 ["Market order","An order to buy or sell promptly at available market prices."],["Limit order","An order with a specified maximum buy or minimum sell price."],["P/E ratio","Share price divided by earnings per share."],["Volatility","How much and how quickly a price moves."],
 ["Support","An area where buying interest has previously appeared."],["Resistance","An area where selling pressure has previously appeared."],["Stop loss","An order or plan intended to limit a trade's loss; execution is not guaranteed."],["Leverage","Using borrowed funds or exposure that magnifies gains and losses."]
];
const translations = {
 en:{heroEyebrow:"YOUR STOCK MARKET LEARNING PATH",heroTitle:'Understand the market.<br><span class="gradient-text">Build your own edge.</span>',heroSubtitle:"A structured, practical guide from your first investment to advanced market concepts — in plain language.",startLearning:"Start learning",exploreChart:"Try paper trading",heroFoot:"Learn at your pace · Beginner to advanced",marketIllustration:"MARKET SNAPSHOT · ILLUSTRATION",sampleIndex:"Sample index",demoNote:"Illustrative data only — not live market prices.",heroBottom1:"Learn the language",heroBottom2:"Understand the numbers",heroBottom3:"Manage risk thoughtfully",adPlaceholder:"Ad space · Google AdSense can be enabled after approval",coursesTitle:"Choose your learning path",coursesSubtitle:"Move in order, or jump straight to the topic you need.",searchPlaceholder:"Search topics...",allLevels:"All levels",beginner:"Beginner",intermediate:"Intermediate",advanced:"Advanced",toolsTitle:"Simple investing calculators",toolsSubtitle:"Explore how contributions and compounding can affect a hypothetical outcome.",sipCalc:"SIP calculator",sipCalcDesc:"Estimate a monthly investment's future value.",monthlyInvestment:"Monthly investment (₹)",annualReturn:"Assumed annual return (%)",investmentYears:"Duration (years)",calculate:"Calculate estimate",estimatedValue:"Estimated future value",calcDisclaimer:"Illustrative only. Returns are not guaranteed; actual market outcomes may be lower or negative. Taxes, fees and inflation are excluded.",riskCalc:"Position-size helper",riskCalcDesc:"Learn how planned risk relates to a trade's stop distance.",tradingCapital:"Trading capital (₹)",riskPerTrade:"Planned risk per trade (%)",entryPrice:"Entry price (₹)",stopPrice:"Stop price (₹)",calculatePosition:"Calculate example size",maxPlannedLoss:"Maximum planned loss",riskDisclaimer:"A stop order may not execute at the stop price. Gaps, slippage and leverage can increase losses.",roadmapTitle:"A smarter way to learn",roadmapSubtitle:"Build understanding before risking real money.",roadmap1Title:"Learn the foundations",roadmap1Text:"Understand shares, exchanges, order types, risk, and how the market works.",roadmap2Title:"Practice without pressure",roadmap2Text:"Read charts, keep a journal, and paper-trade strategies before using real money.",roadmap3Title:"Create your own process",roadmap3Text:"Define your time horizon, position size, exit rules and review routine.",glossaryTitle:"Market glossary",glossarySubtitle:"A few essential terms to get you started.",aboutTitle:"Education before speculation.",aboutText:"MarketPathAcademy is a learning resource designed to explain market concepts clearly. It does not provide personalized financial advice, guaranteed returns, buy/sell calls, or live market data.",aboutBadge:"Learn. Practice. Review.",aboutBadgeSmall:"Your process matters.",importantNotice:"Important notice",importantText:"Stocks, mutual funds and derivatives carry risk, including loss of capital. Futures and options can create substantial losses and are not suitable for everyone. Educational examples are simplified and may exclude charges, taxes, liquidity and slippage. Consult a qualified professional for advice tailored to your situation.",footerText:"Learn the market, one concept at a time.",disclaimerLink:"Disclaimer",privacyLink:"Privacy policy",contactLink:"Contact",startLesson:"Start lesson",glossaryMore:"Open the full glossary (120+ terms) →",calcMoreTitle:"More financial calculators",calcMoreText:"Budgeting, investing, retirement, loans, property, tax and business: with charts, schedules and downloadable tables.",calcBrowse:"Browse all calculators ↗",testCtaTitle:"Finished the course? Test yourself.",testCtaText:"Take the final test: 100 to 150 questions from every module. Score 70% to earn your MarketPathAcademy certificate.",testCtaGo:"Take the final test →"},
 hi:{heroEyebrow:"शेयर बाज़ार सीखने का आपका रास्ता",heroTitle:'बाज़ार को समझें।<br><span class="gradient-text">अपनी समझ मज़बूत करें।</span>',heroSubtitle:"पहले निवेश से लेकर उन्नत बाज़ार अवधारणाओं तक, आसान भाषा में व्यवस्थित और व्यावहारिक मार्गदर्शन।",startLearning:"सीखना शुरू करें",exploreChart:"पेपर ट्रेडिंग आज़माएँ",heroFoot:"अपनी गति से सीखें · शुरुआती से उन्नत",marketIllustration:"बाज़ार उदाहरण · केवल चित्रण",sampleIndex:"नमूना इंडेक्स",demoNote:"केवल उदाहरण — यह लाइव बाज़ार मूल्य नहीं है।",heroBottom1:"बाज़ार की भाषा सीखें",heroBottom2:"आँकड़ों को समझें",heroBottom3:"जोखिम सोच-समझकर संभालें",adPlaceholder:"विज्ञापन स्थान · स्वीकृति के बाद Google AdSense जोड़ें",coursesTitle:"अपना सीखने का रास्ता चुनें",coursesSubtitle:"क्रम से सीखें या सीधे अपनी पसंद के विषय पर जाएँ।",searchPlaceholder:"विषय खोजें...",allLevels:"सभी स्तर",beginner:"शुरुआती",intermediate:"मध्यम",advanced:"उन्नत",toolsTitle:"आसान निवेश कैलकुलेटर",toolsSubtitle:"नियमित निवेश और कंपाउंडिंग के संभावित प्रभाव को समझें।",sipCalc:"SIP कैलकुलेटर",sipCalcDesc:"मासिक निवेश की अनुमानित भविष्य राशि देखें।",monthlyInvestment:"मासिक निवेश (₹)",annualReturn:"मान ली गई सालाना रिटर्न (%)",investmentYears:"अवधि (वर्ष)",calculate:"अनुमान निकालें",estimatedValue:"अनुमानित भविष्य राशि",calcDisclaimer:"केवल उदाहरण। रिटर्न की गारंटी नहीं है; वास्तविक परिणाम कम या नकारात्मक हो सकते हैं। टैक्स, शुल्क और महँगाई शामिल नहीं हैं।",riskCalc:"पोज़िशन साइज़ सहायक",riskCalcDesc:"योजना में जोखिम और स्टॉप दूरी का संबंध समझें।",tradingCapital:"ट्रेडिंग पूँजी (₹)",riskPerTrade:"प्रति ट्रेड नियोजित जोखिम (%)",entryPrice:"एंट्री कीमत (₹)",stopPrice:"स्टॉप कीमत (₹)",calculatePosition:"उदाहरण मात्रा निकालें",maxPlannedLoss:"अधिकतम नियोजित नुकसान",riskDisclaimer:"स्टॉप ऑर्डर उसी कीमत पर निष्पादित होने की गारंटी नहीं है। गैप, स्लिपेज और लीवरेज नुकसान बढ़ा सकते हैं।",roadmapTitle:"सीखने का बेहतर तरीका",roadmapSubtitle:"असली पैसा लगाने से पहले समझ विकसित करें।",roadmap1Title:"बुनियादी बातें सीखें",roadmap1Text:"शेयर, एक्सचेंज, ऑर्डर प्रकार, जोखिम और बाज़ार की कार्यप्रणाली समझें।",roadmap2Title:"बिना दबाव अभ्यास करें",roadmap2Text:"चार्ट पढ़ें, जर्नल रखें और असली पैसे से पहले पेपर ट्रेडिंग करें।",roadmap3Title:"अपनी प्रक्रिया बनाएँ",roadmap3Text:"समय सीमा, पोज़िशन साइज़, एग्ज़िट नियम और समीक्षा तय करें।",glossaryTitle:"बाज़ार शब्दावली",glossarySubtitle:"शुरुआत के लिए कुछ ज़रूरी शब्द।",aboutTitle:"सट्टे से पहले शिक्षा।",aboutText:"MarketPathAcademy बाज़ार की अवधारणाओं को सरलता से समझाने वाला शैक्षिक संसाधन है। यह व्यक्तिगत वित्तीय सलाह, गारंटीड रिटर्न, खरीद-बिक्री कॉल या लाइव बाज़ार डेटा नहीं देता।",aboutBadge:"सीखें। अभ्यास करें। समीक्षा करें।",aboutBadgeSmall:"आपकी प्रक्रिया मायने रखती है।",importantNotice:"महत्वपूर्ण सूचना",importantText:"शेयर, म्यूचुअल फंड और डेरिवेटिव में पूँजी खोने सहित जोखिम होता है। फ्यूचर्स और ऑप्शंस में बड़ा नुकसान हो सकता है और ये सभी के लिए उपयुक्त नहीं हैं। उदाहरण सरल किए गए हैं और इनमें शुल्क, टैक्स, लिक्विडिटी तथा स्लिपेज शामिल नहीं हो सकते। अपनी स्थिति के अनुसार सलाह के लिए योग्य पेशेवर से संपर्क करें।",footerText:"एक-एक अवधारणा करके बाज़ार सीखें।",disclaimerLink:"अस्वीकरण",privacyLink:"गोपनीयता नीति",contactLink:"संपर्क",startLesson:"पाठ शुरू करें",glossaryMore:"पूरी शब्दावली खोलें (120+ शब्द) →",calcMoreTitle:"और वित्तीय कैलकुलेटर",calcMoreText:"बजट, निवेश, रिटायरमेंट, लोन, प्रॉपर्टी, टैक्स और बिज़नेस: चार्ट, शेड्यूल और डाउनलोड होने वाली तालिकाओं के साथ।",calcBrowse:"सभी कैलकुलेटर देखें ↗",testCtaTitle:"कोर्स पूरा कर लिया? ख़ुद को परखें।",testCtaText:"फ़ाइनल टेस्ट दें: हर मॉड्यूल से 100 से 150 प्रश्न। 70% लाकर MarketPathAcademy सर्टिफ़िकेट पाएँ।",testCtaGo:"फ़ाइनल टेस्ट दें →"}
};
function readLang(){try{return localStorage.getItem("mp-lang")||"en"}catch(e){return "en"}}
function saveLang(lang){try{localStorage.setItem("mp-lang",lang)}catch(e){}}
function renderGlossary(){const items=currentLang==="hi"?[["शेयर","किसी कंपनी में स्वामित्व की एक इकाई।"],["इंडेक्स","चुनी हुई प्रतिभूतियों के समूह को ट्रैक करने वाला माप।"],["SIP","नियमित अंतराल पर निश्चित राशि निवेश करने का तरीका।"],["डिविडेंड","कंपनी द्वारा शेयरधारकों को दिया जा सकने वाला वितरण।"],["मार्केट ऑर्डर","उपलब्ध बाज़ार कीमत पर तुरंत खरीदने या बेचने का ऑर्डर।"],["लिमिट ऑर्डर","खरीद की अधिकतम या बिक्री की न्यूनतम कीमत वाला ऑर्डर।"],["P/E अनुपात","शेयर कीमत को प्रति शेयर कमाई से भाग देने पर मिलने वाला अनुपात।"],["वोलैटिलिटी","कीमत कितनी और कितनी तेज़ी से बदलती है।"],["सपोर्ट","वह क्षेत्र जहाँ पहले खरीदारी की रुचि दिखी हो।"],["रेज़िस्टेंस","वह क्षेत्र जहाँ पहले बिक्री का दबाव दिखा हो।"],["स्टॉप लॉस","नुकसान सीमित करने का प्रयास; निष्पादन की गारंटी नहीं।"],["लीवरेज","उधार या अतिरिक्त एक्सपोज़र से लाभ और नुकसान बढ़ना।"]]:glossary;document.getElementById("glossaryGrid").innerHTML=items.map(([t,d])=>`<div class="glossary-item"><strong>${t}</strong><p>${d}</p></div>`).join("")}
// Text for the learning-platform homepage, in both languages (merged over the strings above).
Object.assign(translations.en, {
 heroEyebrow: "FREE STOCK MARKET COURSE · ENGLISH &amp; हिन्दी",
 heroTitle: 'Learn the stock market,<br><span class="gradient-text">one step at a time.</span>',
 heroSubtitle: "Structured modules take you from your first share to options, tax and trading psychology. Practise every idea, trade with virtual money, then earn your certificate.",
 heroStart: "Start learning free →", heroTest: "Take the final test",
 check1: "No sign-up needed", check2: "Progress saved on your device", check3: "Beginner to advanced",
 pathsEyebrow: "LEARNING PATHS", pathsTitle: "Choose your path", pathsText: "Each path builds on the one before it. Start at the beginning, or jump in at your level.",
 featuredEyebrow: "POPULAR COURSES", featuredTitle: "Start with these", featuredText: "The modules most learners begin with.",
 howEyebrow: "HOW IT WORKS", howTitle: "Learn it, practise it, prove it", howText: "Every module follows the same four steps, so you always know what comes next.",
 how1Title: "Learn", how1Text: "Short lessons with diagrams, worked examples and real-life scenarios, in plain language.", how1Link: "Browse courses →",
 how2Title: "Practise", how2Text: "A quiz at the end of every module, and 49 calculators to try the numbers yourself.", how2Link: "Open calculators →",
 how3Title: "Trade on paper", how3Text: "A broker-style terminal with real NSE prices and virtual money: charts, screener, backtesting and a journal.", how3Link: "Open paper trading →",
 how4Title: "Get certified", how4Text: "Pass the final test with 70% or more and download your MarketPathAcademy certificate.", how4Link: "Take the final test →",
 toolsEyebrow: "PRACTICE TOOLS", toolsTitle2: "Everything you need to practise", toolsText2: "Put each lesson to work with tools built for learners.",
 tool1Title: "Paper trading", tool1Text: "Buy and sell NSE stocks with a virtual ₹10 lakh, real delayed prices and real charges.",
 tool2Title: "Screener &amp; backtesting", tool2Text: "Find setups across the NIFTY 500 and test a strategy on two years of real data.",
 tool3Title: "49 calculators", tool3Text: "SIP, EMI, income tax, retirement, FIRE and more, with charts and schedules.",
 tool4Title: "Glossary", tool4Text: "Plain-language definitions of 120+ market terms, in English and Hindi.", toolGo: "Open →",
 certEyebrow: "FINAL TEST &amp; CERTIFICATE", certTitle: "Earn your MarketPathAcademy certificate",
 cert1: "100 to 150 questions drawn from every module", cert2: "Pass mark 70%, with a score by module to show what to revise",
 cert3: "Download your certificate as an image or PDF, with a verification link", certGo: "Take the final test →"
});
Object.assign(translations.hi, {
 heroEyebrow: "मुफ़्त शेयर बाज़ार कोर्स · हिन्दी और ENGLISH",
 heroTitle: 'शेयर बाज़ार सीखें,<br><span class="gradient-text">एक-एक कदम करके।</span>',
 heroSubtitle: "व्यवस्थित मॉड्यूल आपको पहले शेयर से ऑप्शंस, टैक्स और ट्रेडिंग मनोविज्ञान तक ले जाते हैं। हर विचार का अभ्यास करें, वर्चुअल पैसे से ट्रेड करें, फिर अपना सर्टिफ़िकेट पाएँ।",
 heroStart: "मुफ़्त में सीखना शुरू करें →", heroTest: "फ़ाइनल टेस्ट दें",
 check1: "साइन-अप की ज़रूरत नहीं", check2: "प्रगति आपके डिवाइस पर सेव", check3: "शुरुआती से उन्नत तक",
 pathsEyebrow: "सीखने के रास्ते", pathsTitle: "अपना रास्ता चुनें", pathsText: "हर रास्ता पिछले पर आधारित है। शुरुआत से सीखें, या अपने स्तर से शुरू करें।",
 featuredEyebrow: "लोकप्रिय कोर्स", featuredTitle: "इनसे शुरू करें", featuredText: "वे मॉड्यूल जिनसे ज़्यादातर सीखने वाले शुरुआत करते हैं।",
 howEyebrow: "यह कैसे काम करता है", howTitle: "सीखें, अभ्यास करें, साबित करें", howText: "हर मॉड्यूल इन्हीं चार चरणों में चलता है, ताकि आपको हमेशा पता रहे कि आगे क्या है।",
 how1Title: "सीखें", how1Text: "डायग्राम, हल किए गए उदाहरणों और असली स्थितियों के साथ छोटे, आसान पाठ।", how1Link: "कोर्स देखें →",
 how2Title: "अभ्यास करें", how2Text: "हर मॉड्यूल के अंत में क्विज़, और ख़ुद हिसाब लगाने के लिए 49 कैलकुलेटर।", how2Link: "कैलकुलेटर खोलें →",
 how3Title: "पेपर ट्रेडिंग करें", how3Text: "असली NSE कीमतों और वर्चुअल पैसे वाला ब्रोकर जैसा टर्मिनल: चार्ट, स्क्रीनर, बैकटेस्टिंग और जर्नल।", how3Link: "पेपर ट्रेडिंग खोलें →",
 how4Title: "सर्टिफ़िकेट पाएँ", how4Text: "फ़ाइनल टेस्ट 70% या अधिक अंकों से पास करें और अपना MarketPathAcademy सर्टिफ़िकेट डाउनलोड करें।", how4Link: "फ़ाइनल टेस्ट दें →",
 toolsEyebrow: "अभ्यास के टूल", toolsTitle2: "अभ्यास के लिए सब कुछ", toolsText2: "सीखने वालों के लिए बने टूल से हर पाठ को इस्तेमाल में लाएँ।",
 tool1Title: "पेपर ट्रेडिंग", tool1Text: "वर्चुअल ₹10 लाख, असली (देर से आने वाली) कीमतों और असली शुल्क के साथ NSE शेयर ख़रीदें-बेचें।",
 tool2Title: "स्क्रीनर और बैकटेस्टिंग", tool2Text: "NIFTY 500 में सेटअप ढूँढें और दो साल के असली डेटा पर स्ट्रैटेजी जाँचें।",
 tool3Title: "49 कैलकुलेटर", tool3Text: "SIP, EMI, इनकम टैक्स, रिटायरमेंट, FIRE और भी बहुत कुछ, चार्ट और शेड्यूल के साथ।",
 tool4Title: "शब्दावली", tool4Text: "120+ बाज़ार शब्दों की आसान परिभाषाएँ, हिंदी और अंग्रेज़ी में।", toolGo: "खोलें →",
 certEyebrow: "फ़ाइनल टेस्ट और सर्टिफ़िकेट", certTitle: "अपना MarketPathAcademy सर्टिफ़िकेट पाएँ",
 cert1: "हर मॉड्यूल से 100 से 150 प्रश्न", cert2: "पास होने के लिए 70%, साथ में मॉड्यूल के अनुसार स्कोर ताकि पता चले क्या दोहराना है",
 cert3: "सर्टिफ़िकेट इमेज या PDF के रूप में, जाँच लिंक के साथ डाउनलोड करें", certGo: "फ़ाइनल टेस्ट दें →"
});
const HOME_UI = {
 en: { card: "Your learning path", of: (d, t) => `${d} of ${t} modules completed`, start: "Start", cont: "Continue", stats: [["modules", null], ["practice questions", "467"], ["calculators", "49"], ["glossary terms", "120+"]],
  levels: { Beginner: "How the market works, investing, SIPs and reading your first chart.", Intermediate: "Company analysis, financial statements, technical analysis, risk and tax.", Advanced: "Valuation, intraday, futures and options, option Greeks and trading psychology." },
  modules: n => `${n} modules`, more: n => `+ ${n} more`, go: l => `Start the ${l} path →`, goOn: l => `Continue the ${l} path →`, browse: n => `Browse all ${n} courses →`, upNext: "Up next", done: "Completed" },
 hi: { card: "आपका सीखने का रास्ता", of: (d, t) => `${t} में से ${d} मॉड्यूल पूरे`, start: "शुरू करें", cont: "जारी रखें", stats: [["मॉड्यूल", null], ["अभ्यास प्रश्न", "467"], ["कैलकुलेटर", "49"], ["शब्दावली के शब्द", "120+"]],
  levels: { Beginner: "बाज़ार कैसे काम करता है, निवेश, SIP और पहला चार्ट पढ़ना।", Intermediate: "कंपनी विश्लेषण, वित्तीय विवरण, टेक्निकल एनालिसिस, जोखिम और टैक्स।", Advanced: "वैल्यूएशन, इंट्राडे, फ़्यूचर्स और ऑप्शंस, ऑप्शन ग्रीक्स और ट्रेडिंग मनोविज्ञान।" },
  modules: n => `${n} मॉड्यूल`, more: n => `+ ${n} और`, go: l => `${l} रास्ता शुरू करें →`, goOn: l => `${l} रास्ता जारी रखें →`, browse: n => `सभी ${n} कोर्स देखें →`, upNext: "आगे", done: "पूरा" }
};
const FEATURED = ["foundations", "investing", "reading-charts", "fundamental-analysis", "technical-analysis", "risk-management"];
let currentLang = "en";
const byId = id => document.getElementById(id);

// The learner card in the hero: overall progress and the next modules, from this browser's saved progress.
function renderHero() {
 const u = HOME_UI[currentLang], s = MPCourses.summary(), t = slug => MPCourses.lessonFor({ slug }, currentLang).title;
 const start = Math.max(0, LESSON_ORDER.indexOf(s.nextSlug) - (s.doneMap[LESSON_ORDER[LESSON_ORDER.indexOf(s.nextSlug) - 1]] ? 1 : 0));
 const list = LESSON_ORDER.slice(start, start + 4);
 const r = 34, c = 2 * Math.PI * r;
 byId("heroCard").innerHTML = `<div class="hpc-head"><div><small>${u.card}</small><strong>${u.of(s.done, s.total)}</strong></div>
  <svg class="hpc-ring" viewBox="0 0 84 84" role="img" aria-label="${s.pct}%"><circle cx="42" cy="42" r="${r}" class="hpc-track"/><circle cx="42" cy="42" r="${r}" class="hpc-fill" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - s.pct / 100)).toFixed(1)}"/><text x="42" y="47" text-anchor="middle">${s.pct}%</text></svg></div>
  <ol class="hpc-list">${list.map(slug => { const st = s.doneMap[slug] ? "done" : slug === s.nextSlug ? "now" : "next"; return `<li class="${st}"><span class="hpc-dot" aria-hidden="true">${st === "done" ? "✓" : LESSON_ORDER.indexOf(slug) + 1}</span><a href="${MPCourses.lessonHref(slug)}">${t(slug)}</a>${st === "now" ? `<em>${u.upNext}</em>` : st === "done" ? `<em class="ok">${u.done}</em>` : ""}</li>`; }).join("")}</ol>
  <a class="btn btn-primary hpc-go" href="${MPCourses.lessonHref(s.nextSlug)}">${s.started ? u.cont : u.start}: ${t(s.nextSlug)} →</a>`;
}
function renderStats() {
 const u = HOME_UI[currentLang];
 byId("homeStats").innerHTML = u.stats.map(([label, n]) => `<div><strong>${n || MPCourses.COURSES.length}</strong><span>${label}</span></div>`).join("");
}
// One card per level: what it covers, its first modules, and progress through it.
function renderTracks() {
 const u = HOME_UI[currentLang], s = MPCourses.summary();
 byId("trackGrid").innerHTML = MPCourses.LEVELS.map((l, i) => {
  const lv = s.byLevel[l], name = MPCourses.levelLabel(l, currentLang), pct = lv.total ? Math.round((lv.done / lv.total) * 100) : 0;
  const titles = lv.list.slice(0, 4).map(c => `<li>${MPCourses.lessonFor(c, currentLang).title}</li>`).join("");
  return `<article class="track-card track-${l.toLowerCase()}"><div class="track-top"><span class="track-step">0${i + 1}</span><span class="level-badge">${name}</span></div>
   <h3>${name}</h3><p>${u.levels[l]}</p><ul class="track-list">${titles}${lv.total > 4 ? `<li class="more">${u.more(lv.total - 4)}</li>` : ""}</ul>
   <div class="track-progress"><div class="continue-bar"><span style="width:${pct}%"></span></div><small>${u.modules(lv.total)} · ${pct}%</small></div>
   <a class="btn btn-secondary" href="pages/learn.html?level=${l}">${lv.done || lv.list.some(c => s.visited[c.slug]) ? u.goOn(name) : u.go(name)}</a></article>`;
 }).join("");
}
function renderFeatured() {
 byId("featuredGrid").innerHTML = FEATURED.map(slug => MPCourses.COURSES.find(c => c.slug === slug)).filter(Boolean).map(c => MPCourses.card(c, MPCourses.lessonFor(c, currentLang), currentLang)).join("");
 byId("browseAll").textContent = HOME_UI[currentLang].browse(MPCourses.COURSES.length);
}
function render() { renderHero(); renderStats(); renderTracks(); renderFeatured(); renderGlossary(); }
function applyLanguage(lang) {
 currentLang = lang; document.documentElement.lang = lang; saveLang(lang);
 document.querySelectorAll("[data-i18n]").forEach(el => { const v = translations[lang][el.dataset.i18n]; if (v) el.innerHTML = v; });
 render();
}
byId("languageSelect").addEventListener("change", e => applyLanguage(e.target.value));
MP.setupMenu();
if (byId("year")) byId("year").textContent = new Date().getFullYear();
const savedLang = readLang();
if (translations[savedLang]) byId("languageSelect").value = savedLang;
applyLanguage(translations[savedLang] ? savedLang : "en");
/* ADS-OFF: placeAdSlots(2); */
