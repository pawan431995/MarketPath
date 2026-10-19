const courses = [
 {slug:"foundations",title:"Stock Market Foundations",level:"Beginner",icon:"◈",time:"6 lessons",desc:"Shares, exchanges, indices, demat accounts, brokers, orders and settlement.",topics:["stock market basics","shares","NSE","BSE","demat","market order"]},
 {slug:"market-rules",title:"Market Rules & Investor Protection",level:"Beginner",icon:"⚖",topics:["market timings","pre-open","settlement","t+1","circuit","price band","ipo","asba","scam","fraud","tips","scores","complaint","kyc","nomination","sebi"]},
 {slug:"investing",title:"Investing & Wealth Building",level:"Beginner",icon:"⌂",time:"8 lessons",desc:"Goals, time horizon, diversification, compounding and long-term investing.",topics:["investing","wealth","compounding","portfolio","diversification"]},
 {slug:"sip-mutual-funds",title:"SIP & Mutual Funds",level:"Beginner",icon:"₹",time:"7 lessons",desc:"SIP, NAV, expense ratio, index funds, equity funds and debt funds.",topics:["sip","mutual funds","nav","index funds","expense ratio"]},
 {slug:"reading-charts",title:"Reading Charts",level:"Beginner",icon:"⌁",time:"6 lessons",desc:"Line, bar and candlestick charts; open, high, low, close and volume.",topics:["charts","candlestick","ohlc","volume","price chart"]},
 {slug:"candlestick-patterns",title:"Candlestick and Chart Patterns",level:"Intermediate",icon:"▮",topics:["candlestick","hammer","doji","engulfing","chart pattern","breakout","head and shoulders"]},
 {slug:"fundamental-analysis",title:"Fundamental Analysis",level:"Intermediate",icon:"▤",time:"9 lessons",desc:"Revenue, profit, balance sheet, cash flow, ratios and business quality.",topics:["fundamental","eps","pe ratio","roe","balance sheet","cash flow"]},
 {slug:"balance-sheet",title:"Reading the Balance Sheet",level:"Intermediate",icon:"▦",topics:["balance sheet","assets","liabilities","equity","debt","net worth"]},
 {slug:"cash-flow-statement",title:"Reading the Cash Flow Statement",level:"Intermediate",icon:"≋",topics:["cash flow","operating cash flow","free cash flow","capex","cash"]},
 {slug:"quarterly-results",title:"Reading Quarterly Results",level:"Intermediate",icon:"◔",topics:["quarterly results","earnings","ebitda","margin","yoy","qoq","eps"]},
 {slug:"annual-report",title:"Reading an Annual Report",level:"Intermediate",icon:"▭",topics:["annual report","auditor","md&a","notes","governance","related party"]},
 {slug:"shareholding-pattern",title:"Reading the Shareholding Pattern",level:"Intermediate",icon:"◍",topics:["shareholding","promoter","fii","dii","pledge","free float"]},
 {slug:"valuation-basics",title:"Valuation Basics",level:"Advanced",icon:"≈",topics:["valuation","pe ratio","pb ratio","ev/ebitda","dcf","peg","margin of safety"]},
 {slug:"corporate-actions",title:"Corporate Actions",level:"Intermediate",icon:"⇪",topics:["corporate actions","dividend","bonus","split","rights issue","buyback","merger","demerger"]},
 {slug:"technical-analysis",title:"Technical Analysis",level:"Intermediate",icon:"⌇",time:"10 lessons",desc:"Trends, support/resistance, moving averages, RSI, MACD and price action.",topics:["technical","rsi","macd","moving average","support","resistance","trend"]},
 {slug:"technical-indicators",title:"Technical Indicators",level:"Intermediate",icon:"⌇",topics:["indicator","moving average","rsi","macd","bollinger","atr","adx","vwap","obv","volume"]},
 {slug:"swing-trading",title:"Swing Trading",level:"Intermediate",icon:"↗",time:"8 lessons",desc:"Setups, entry and exit rules, stop losses, trade journals and position sizing.",topics:["swing trading","stop loss","position size","trading journal"]},
 {slug:"intraday-trading",title:"Intraday Trading",level:"Advanced",icon:"◷",time:"9 lessons",desc:"Market sessions, liquidity, order types, intraday risk and execution.",topics:["intraday","day trading","liquidity","execution","scalping"]},
 {slug:"futures-options",title:"Futures & Options",level:"Advanced",icon:"⇄",time:"12 lessons",desc:"Futures, calls, puts, strike prices, expiry, margin, payoff and assignment.",topics:["futures","options","f&o","call","put","strike","expiry","margin"]},
 {slug:"option-greeks",title:"Option Greeks & Strategies",level:"Advanced",icon:"Δ",time:"10 lessons",desc:"Delta, gamma, theta, vega, implied volatility and defined-risk spreads.",topics:["greeks","delta","gamma","theta","vega","implied volatility","spread"]},
 {slug:"risk-management",title:"Risk Management",level:"Intermediate",icon:"⬡",time:"7 lessons",desc:"Risk/reward, drawdown, exposure, stop placement and avoiding ruin.",topics:["risk","drawdown","risk reward","capital protection","stop"]},
 {slug:"tax-basics",title:"Tax Basics for Indian Investors",level:"Intermediate",icon:"₹",topics:["tax","capital gains","stcg","ltcg","intraday tax","f&o tax","itr","tds"]},
 {slug:"trading-psychology",title:"Trading Psychology",level:"Advanced",icon:"◎",time:"6 lessons",desc:"Biases, discipline, overtrading, loss aversion and process reviews.",topics:["psychology","discipline","bias","overtrading","emotions"]}
];
const glossary = [
 ["Share","A unit of ownership in a company."],["Index","A measure tracking a selected group of securities."],["SIP","A method of investing a fixed amount at regular intervals."],["Dividend","A distribution a company may pay to shareholders."],
 ["Market order","An order to buy or sell promptly at available market prices."],["Limit order","An order with a specified maximum buy or minimum sell price."],["P/E ratio","Share price divided by earnings per share."],["Volatility","How much and how quickly a price moves."],
 ["Support","An area where buying interest has previously appeared."],["Resistance","An area where selling pressure has previously appeared."],["Stop loss","An order or plan intended to limit a trade's loss; execution is not guaranteed."],["Leverage","Using borrowed funds or exposure that magnifies gains and losses."]
];
const translations = {
 en:{heroEyebrow:"YOUR STOCK MARKET LEARNING PATH",heroTitle:'Understand the market.<br><span class="gradient-text">Build your own edge.</span>',heroSubtitle:"A structured, practical guide from your first investment to advanced market concepts — in plain language.",startLearning:"Start learning",exploreChart:"Try paper trading",heroFoot:"Learn at your pace · Beginner to advanced",marketIllustration:"MARKET SNAPSHOT · ILLUSTRATION",sampleIndex:"Sample index",demoNote:"Illustrative data only — not live market prices.",heroBottom1:"Learn the language",heroBottom2:"Understand the numbers",heroBottom3:"Manage risk thoughtfully",adPlaceholder:"Ad space · Google AdSense can be enabled after approval",coursesTitle:"Choose your learning path",coursesSubtitle:"Move in order, or jump straight to the topic you need.",searchPlaceholder:"Search topics...",allLevels:"All levels",beginner:"Beginner",intermediate:"Intermediate",advanced:"Advanced",toolsTitle:"Simple investing calculators",toolsSubtitle:"Explore how contributions and compounding can affect a hypothetical outcome.",sipCalc:"SIP calculator",sipCalcDesc:"Estimate a monthly investment's future value.",monthlyInvestment:"Monthly investment (₹)",annualReturn:"Assumed annual return (%)",investmentYears:"Duration (years)",calculate:"Calculate estimate",estimatedValue:"Estimated future value",calcDisclaimer:"Illustrative only. Returns are not guaranteed; actual market outcomes may be lower or negative. Taxes, fees and inflation are excluded.",riskCalc:"Position-size helper",riskCalcDesc:"Learn how planned risk relates to a trade's stop distance.",tradingCapital:"Trading capital (₹)",riskPerTrade:"Planned risk per trade (%)",entryPrice:"Entry price (₹)",stopPrice:"Stop price (₹)",calculatePosition:"Calculate example size",maxPlannedLoss:"Maximum planned loss",riskDisclaimer:"A stop order may not execute at the stop price. Gaps, slippage and leverage can increase losses.",roadmapTitle:"A smarter way to learn",roadmapSubtitle:"Build understanding before risking real money.",roadmap1Title:"Learn the foundations",roadmap1Text:"Understand shares, exchanges, order types, risk, and how the market works.",roadmap2Title:"Practice without pressure",roadmap2Text:"Read charts, keep a journal, and paper-trade strategies before using real money.",roadmap3Title:"Create your own process",roadmap3Text:"Define your time horizon, position size, exit rules and review routine.",glossaryTitle:"Market glossary",glossarySubtitle:"A few essential terms to get you started.",aboutTitle:"Education before speculation.",aboutText:"MarketPathAcademy is a learning resource designed to explain market concepts clearly. It does not provide personalized financial advice, guaranteed returns, buy/sell calls, or live market data.",aboutBadge:"Learn. Practice. Review.",aboutBadgeSmall:"Your process matters.",importantNotice:"Important notice",importantText:"Stocks, mutual funds and derivatives carry risk, including loss of capital. Futures and options can create substantial losses and are not suitable for everyone. Educational examples are simplified and may exclude charges, taxes, liquidity and slippage. Consult a qualified professional for advice tailored to your situation.",footerText:"Learn the market, one concept at a time.",disclaimerLink:"Disclaimer",privacyLink:"Privacy policy",contactLink:"Contact",startLesson:"Start lesson",glossaryMore:"Open the full glossary (120+ terms) →",calcMoreTitle:"More financial calculators",calcMoreText:"Budgeting, investing, retirement, loans, property, tax and business: with charts, schedules and downloadable tables.",calcBrowse:"Browse all calculators ↗",testCtaTitle:"Finished the course? Test yourself.",testCtaText:"Take the final test: 100 to 150 questions from every module. Score 70% to earn your MarketPathAcademy certificate.",testCtaGo:"Take the final test →"},
 hi:{heroEyebrow:"शेयर बाज़ार सीखने का आपका रास्ता",heroTitle:'बाज़ार को समझें।<br><span class="gradient-text">अपनी समझ मज़बूत करें।</span>',heroSubtitle:"पहले निवेश से लेकर उन्नत बाज़ार अवधारणाओं तक, आसान भाषा में व्यवस्थित और व्यावहारिक मार्गदर्शन।",startLearning:"सीखना शुरू करें",exploreChart:"पेपर ट्रेडिंग आज़माएँ",heroFoot:"अपनी गति से सीखें · शुरुआती से उन्नत",marketIllustration:"बाज़ार उदाहरण · केवल चित्रण",sampleIndex:"नमूना इंडेक्स",demoNote:"केवल उदाहरण — यह लाइव बाज़ार मूल्य नहीं है।",heroBottom1:"बाज़ार की भाषा सीखें",heroBottom2:"आँकड़ों को समझें",heroBottom3:"जोखिम सोच-समझकर संभालें",adPlaceholder:"विज्ञापन स्थान · स्वीकृति के बाद Google AdSense जोड़ें",coursesTitle:"अपना सीखने का रास्ता चुनें",coursesSubtitle:"क्रम से सीखें या सीधे अपनी पसंद के विषय पर जाएँ।",searchPlaceholder:"विषय खोजें...",allLevels:"सभी स्तर",beginner:"शुरुआती",intermediate:"मध्यम",advanced:"उन्नत",toolsTitle:"आसान निवेश कैलकुलेटर",toolsSubtitle:"नियमित निवेश और कंपाउंडिंग के संभावित प्रभाव को समझें।",sipCalc:"SIP कैलकुलेटर",sipCalcDesc:"मासिक निवेश की अनुमानित भविष्य राशि देखें।",monthlyInvestment:"मासिक निवेश (₹)",annualReturn:"मान ली गई सालाना रिटर्न (%)",investmentYears:"अवधि (वर्ष)",calculate:"अनुमान निकालें",estimatedValue:"अनुमानित भविष्य राशि",calcDisclaimer:"केवल उदाहरण। रिटर्न की गारंटी नहीं है; वास्तविक परिणाम कम या नकारात्मक हो सकते हैं। टैक्स, शुल्क और महँगाई शामिल नहीं हैं।",riskCalc:"पोज़िशन साइज़ सहायक",riskCalcDesc:"योजना में जोखिम और स्टॉप दूरी का संबंध समझें।",tradingCapital:"ट्रेडिंग पूँजी (₹)",riskPerTrade:"प्रति ट्रेड नियोजित जोखिम (%)",entryPrice:"एंट्री कीमत (₹)",stopPrice:"स्टॉप कीमत (₹)",calculatePosition:"उदाहरण मात्रा निकालें",maxPlannedLoss:"अधिकतम नियोजित नुकसान",riskDisclaimer:"स्टॉप ऑर्डर उसी कीमत पर निष्पादित होने की गारंटी नहीं है। गैप, स्लिपेज और लीवरेज नुकसान बढ़ा सकते हैं।",roadmapTitle:"सीखने का बेहतर तरीका",roadmapSubtitle:"असली पैसा लगाने से पहले समझ विकसित करें।",roadmap1Title:"बुनियादी बातें सीखें",roadmap1Text:"शेयर, एक्सचेंज, ऑर्डर प्रकार, जोखिम और बाज़ार की कार्यप्रणाली समझें।",roadmap2Title:"बिना दबाव अभ्यास करें",roadmap2Text:"चार्ट पढ़ें, जर्नल रखें और असली पैसे से पहले पेपर ट्रेडिंग करें।",roadmap3Title:"अपनी प्रक्रिया बनाएँ",roadmap3Text:"समय सीमा, पोज़िशन साइज़, एग्ज़िट नियम और समीक्षा तय करें।",glossaryTitle:"बाज़ार शब्दावली",glossarySubtitle:"शुरुआत के लिए कुछ ज़रूरी शब्द।",aboutTitle:"सट्टे से पहले शिक्षा।",aboutText:"MarketPathAcademy बाज़ार की अवधारणाओं को सरलता से समझाने वाला शैक्षिक संसाधन है। यह व्यक्तिगत वित्तीय सलाह, गारंटीड रिटर्न, खरीद-बिक्री कॉल या लाइव बाज़ार डेटा नहीं देता।",aboutBadge:"सीखें। अभ्यास करें। समीक्षा करें।",aboutBadgeSmall:"आपकी प्रक्रिया मायने रखती है।",importantNotice:"महत्वपूर्ण सूचना",importantText:"शेयर, म्यूचुअल फंड और डेरिवेटिव में पूँजी खोने सहित जोखिम होता है। फ्यूचर्स और ऑप्शंस में बड़ा नुकसान हो सकता है और ये सभी के लिए उपयुक्त नहीं हैं। उदाहरण सरल किए गए हैं और इनमें शुल्क, टैक्स, लिक्विडिटी तथा स्लिपेज शामिल नहीं हो सकते। अपनी स्थिति के अनुसार सलाह के लिए योग्य पेशेवर से संपर्क करें।",footerText:"एक-एक अवधारणा करके बाज़ार सीखें।",disclaimerLink:"अस्वीकरण",privacyLink:"गोपनीयता नीति",contactLink:"संपर्क",startLesson:"पाठ शुरू करें",glossaryMore:"पूरी शब्दावली खोलें (120+ शब्द) →",calcMoreTitle:"और वित्तीय कैलकुलेटर",calcMoreText:"बजट, निवेश, रिटायरमेंट, लोन, प्रॉपर्टी, टैक्स और बिज़नेस: चार्ट, शेड्यूल और डाउनलोड होने वाली तालिकाओं के साथ।",calcBrowse:"सभी कैलकुलेटर देखें ↗",testCtaTitle:"कोर्स पूरा कर लिया? ख़ुद को परखें।",testCtaText:"फ़ाइनल टेस्ट दें: हर मॉड्यूल से 100 से 150 प्रश्न। 70% लाकर MarketPathAcademy सर्टिफ़िकेट पाएँ।",testCtaGo:"फ़ाइनल टेस्ट दें →"}
};
let currentLevel = "all";
let currentLang = "en";
function lessonFor(c){return LESSONS[currentLang]?.[c.slug]||LESSONS.en[c.slug]}
function levelLabel(level){return translations[currentLang][level.toLowerCase()]||level}
function readLang(){try{return localStorage.getItem("mp-lang")||"en"}catch(e){return "en"}}
function saveLang(lang){try{localStorage.setItem("mp-lang",lang)}catch(e){}}
// Search normalises case, "&" and punctuation, then matches each typed word as the start of a word
// in the topic. Words under three letters (such as "f&o") must match a whole word, so "fo" does not match "foundations".
// Every typed word must match ("reward risk" finds "Risk Management"). Title matches rank first.
const normalizeSearch=s=>String(s).toLowerCase().replace(/&/g,"").replace(/[^\p{L}\p{N}\s]+/gu," ").replace(/\s+/g," ").trim();
const wordMatches=(word,t)=>t.length<3?word===t:word.startsWith(t);
function searchScore(c,L,tokens){
 if(!tokens.length)return 0;
 const titleWords=normalizeSearch(`${L.title} ${LESSONS.en[c.slug].title}`).split(" ");
 const bodyWords=normalizeSearch(`${L.summary} ${c.desc||""} ${c.topics.join(" ")}`).split(" ");
 let score=0;
 for(const t of tokens){
  if(titleWords.some(w=>wordMatches(w,t)))score+=3;
  else if(bodyWords.some(w=>wordMatches(w,t)))score+=1;
  else return -1;
 }
 return score;
}
// Continue learning (returning visitors) or a suggested beginner path (new visitors). Progress lives in this browser.
const PROGRESS_UI={
 en:{newTitle:"New here? Start with the beginner path",newText:"Four short modules that take you from zero to placing your first informed investment.",start:"Start with module 1",cont:"Continue where you left off",done:n=>`${n} of ${courses.length} modules completed`,next:"Next up",all:"You have completed every module. Revisit any topic or test yourself again.",badgeDone:"Completed",badgeStarted:"Started",resume:"Resume"},
 hi:{newTitle:"नए हैं? शुरुआती रास्ते से शुरू करें",newText:"चार छोटे मॉड्यूल जो आपको शून्य से पहले सोचे-समझे निवेश तक ले जाते हैं।",start:"मॉड्यूल 1 से शुरू करें",cont:"जहाँ छोड़ा था वहीं से जारी रखें",done:n=>`${courses.length} में से ${n} मॉड्यूल पूरे`,next:"आगे",all:"आपने सभी मॉड्यूल पूरे कर लिए हैं। कोई भी विषय दोबारा देखें या फिर से खुद को परखें।",badgeDone:"पूरा",badgeStarted:"शुरू किया",resume:"जारी रखें"}
};
const BEGINNER_PATH=["foundations","market-rules","investing","sip-mutual-funds"];
function progressBadge(slug){
 if(typeof MPProgress==="undefined")return "";
 const p=MPProgress.read(),u=PROGRESS_UI[currentLang];
 if(p.done[slug])return `<span class="progress-badge done">✓ ${u.badgeDone}</span>`;
 if(p.visited[slug])return `<span class="progress-badge started">${u.badgeStarted}</span>`;
 return "";
}
function renderContinue(){
 const box=document.getElementById("continueBox");
 if(!box||typeof MPProgress==="undefined")return;
 const p=MPProgress.read(),u=PROGRESS_UI[currentLang],title=s=>(LESSONS[currentLang]?.[s]||LESSONS.en[s]).title;
 const href=s=>`pages/lesson.html?topic=${s}`;
 const doneCount=courses.filter(c=>p.done[c.slug]).length;
 if(!p.last||!LESSONS.en[p.last]){
  box.innerHTML=`<div class="continue-text"><strong>${u.newTitle}</strong><p>${u.newText}</p><ol class="path-steps">${BEGINNER_PATH.map((s,i)=>`<li><a href="${href(s)}"><span>${i+1}</span>${title(s)}</a></li>`).join("")}</ol></div><a class="btn btn-primary" href="${href(BEGINNER_PATH[0])}">${u.start} →</a>`;
  return;
 }
 const next=LESSON_ORDER.find(s=>!p.done[s]&&s!==p.last);
 const pct=Math.round(doneCount/courses.length*100);
 box.innerHTML=`<div class="continue-text"><strong>${u.cont}</strong><p><a href="${href(p.last)}">${title(p.last)} →</a>${next?` · <span class="muted">${u.next}: <a href="${href(next)}">${title(next)}</a></span>`:""}</p><div class="continue-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="${u.done(doneCount)}"><span style="width:${pct}%"></span></div><small>${doneCount===courses.length?u.all:u.done(doneCount)}</small></div><a class="btn btn-primary" href="${href(p.last)}">${u.resume} →</a>`;
}
function renderCourses(){
 renderContinue();
 const tokens=normalizeSearch(document.getElementById("courseSearch").value||"").split(" ").filter(Boolean);
 const ranked=courses.map(c=>{const L=lessonFor(c);return {c,L,score:(currentLevel==="all"||c.level===currentLevel)?searchScore(c,L,tokens):-1}}).filter(r=>r.score>=0);
 ranked.sort((a,b)=>b.score-a.score);
 const filtered=ranked.map(r=>r.c);
 const grid=document.getElementById("courseGrid");
 grid.innerHTML=ranked.map(({c,L})=>`<article class="course-card"><div class="course-card-top"><span class="course-icon">${c.icon}</span><span class="level-badge">${levelLabel(c.level)}</span>${progressBadge(c.slug)}</div><h3><a class="course-title-link" href="pages/lesson.html?topic=${c.slug}">${L.title}</a></h3><p>${L.summary}</p><div class="course-footer"><span>${L.time}</span><a class="course-link" href="pages/lesson.html?topic=${c.slug}">${translations[currentLang].startLesson} ↗</a></div></article>`).join("");
 document.getElementById("noResults").hidden=filtered.length!==0;
 const countEl=document.getElementById("resultCount");
 const shown=filtered.length,total=courses.length,searching=tokens.length>0||currentLevel!=="all";
 countEl.textContent=!searching?"":currentLang==="hi"?`${total} में से ${shown} विषय`:`Showing ${shown} of ${total} topics`;
}
document.querySelectorAll(".level-tab").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".level-tab").forEach(b=>b.classList.remove("active"));btn.classList.add("active");currentLevel=btn.dataset.level;renderCourses()}));
document.getElementById("courseSearch").addEventListener("input",renderCourses);
document.getElementById("menuToggle").addEventListener("click",()=>{const nav=document.getElementById("mainNav");const open=nav.classList.toggle("open");document.getElementById("menuToggle").setAttribute("aria-expanded",String(open))});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>{document.getElementById("mainNav").classList.remove("open");document.getElementById("menuToggle").setAttribute("aria-expanded","false")}));
function applyLanguage(lang){
 currentLang=lang;document.documentElement.lang=lang;saveLang(lang);
 document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(translations[lang][key])el.innerHTML=translations[lang][key]});
 document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{const key=el.dataset.i18nPlaceholder;if(translations[lang][key])el.placeholder=translations[lang][key]});
 renderCourses();renderGlossary();
}
document.getElementById("languageSelect").addEventListener("change",e=>applyLanguage(e.target.value));
function renderGlossary(){const items=currentLang==="hi"?[["शेयर","किसी कंपनी में स्वामित्व की एक इकाई।"],["इंडेक्स","चुनी हुई प्रतिभूतियों के समूह को ट्रैक करने वाला माप।"],["SIP","नियमित अंतराल पर निश्चित राशि निवेश करने का तरीका।"],["डिविडेंड","कंपनी द्वारा शेयरधारकों को दिया जा सकने वाला वितरण।"],["मार्केट ऑर्डर","उपलब्ध बाज़ार कीमत पर तुरंत खरीदने या बेचने का ऑर्डर।"],["लिमिट ऑर्डर","खरीद की अधिकतम या बिक्री की न्यूनतम कीमत वाला ऑर्डर।"],["P/E अनुपात","शेयर कीमत को प्रति शेयर कमाई से भाग देने पर मिलने वाला अनुपात।"],["वोलैटिलिटी","कीमत कितनी और कितनी तेज़ी से बदलती है।"],["सपोर्ट","वह क्षेत्र जहाँ पहले खरीदारी की रुचि दिखी हो।"],["रेज़िस्टेंस","वह क्षेत्र जहाँ पहले बिक्री का दबाव दिखा हो।"],["स्टॉप लॉस","नुकसान सीमित करने का प्रयास; निष्पादन की गारंटी नहीं।"],["लीवरेज","उधार या अतिरिक्त एक्सपोज़र से लाभ और नुकसान बढ़ना।"]]:glossary;document.getElementById("glossaryGrid").innerHTML=items.map(([t,d])=>`<div class="glossary-item"><strong>${t}</strong><p>${d}</p></div>`).join("")}
function money(n){return "₹ "+Math.round(n).toLocaleString("en-IN")}
function calcSip(){const p=+document.getElementById("monthlyInvestment").value;const rate=+document.getElementById("annualReturn").value;const years=+document.getElementById("years").value;if(!(p>0&&rate>=0&&years>0)){document.getElementById("sipResult").textContent="Enter valid values";return}const r=rate/100/12;const n=years*12;const fv=r===0?p*n:p*((Math.pow(1+r,n)-1)/r)*(1+r);const invested=p*n;document.getElementById("sipResult").textContent=money(fv);document.getElementById("sipBreakdown").textContent=`Invested: ${money(invested)} · Estimated growth: ${money(fv-invested)}`}
function calcRisk(){const cap=+document.getElementById("capital").value;const risk=+document.getElementById("riskPercent").value;const entry=+document.getElementById("entryPrice").value;const stop=+document.getElementById("stopPrice").value;const result=document.getElementById("riskResult"),detail=document.getElementById("riskBreakdown");if(!(cap>0&&risk>0&&risk<=5&&entry>0&&stop>=0&&entry!==stop)){result.textContent="Enter valid values";detail.textContent="Stop price and entry price must differ.";return}const planned=cap*risk/100;const perUnit=Math.abs(entry-stop);const qty=Math.floor(planned/perUnit);result.textContent=money(planned);detail.textContent=`Example quantity: ${qty.toLocaleString("en-IN")} units · Stop distance: ${money(perUnit)} per unit (before costs and slippage).`}
document.getElementById("calculateSip").addEventListener("click",calcSip);["monthlyInvestment","annualReturn","years"].forEach(id=>document.getElementById(id).addEventListener("input",calcSip));document.getElementById("calculateRisk").addEventListener("click",calcRisk);["capital","riskPercent","entryPrice","stopPrice"].forEach(id=>document.getElementById(id).addEventListener("input",calcRisk));
document.getElementById("year").textContent=new Date().getFullYear();
const savedLang=readLang();
if(translations[savedLang]){document.getElementById("languageSelect").value=savedLang;applyLanguage(savedLang)}
renderCourses();renderGlossary();calcSip();calcRisk();placeAdSlots(2);
