// Renders one learning module. Each module is self-contained: content, tools (pattern and indicator cards),
// try-it calculators, key terms, common questions, and a practice quiz. Uses the language saved by the homepage.
const UI = {
 en: { navLearn: "Learn", navChart: "Chart Lab", navTools: "Calculators", navQuiz: "Quiz", navGlossary: "Glossary", navAbout: "About",
   library: "Library", adPlaceholder: "Ad space · Google AdSense can be enabled after approval", allTopics: "All topics", prev: "Previous lesson", next: "Next lesson",
   notFound: "This topic was not found. Choose one below.", sidebarTitle: "Learning modules", tocTitle: "On this page",
   charts: "Charts and visuals", examples: "Worked examples", scenarios: "Real-life scenarios", useCases: "Use cases", takeaways: "Key takeaways",
   toolsTitle: "Tools used in this module", termsTitle: "Key terms, explained", faqTitle: "Questions learners ask", quizTitle: "Check your understanding",
   quizNext: "Next question", quizFinish: "See score", quizScore: "Your score", quizRetry: "Try again", quizCorrect: "Correct.", quizWrong: "Not quite.", quizAnswer: "Why", quizOf: "Question",
   calcTitle: "Try it yourself", calcOut: "Result", invalid: "Enter valid values",
   kind: { candle: "Candlestick", chart: "Chart pattern" }, bias: { bullish: "Bullish", bearish: "Bearish", neutral: "Neutral" },
   cat: { trend: "Trend", momentum: "Momentum", volatility: "Volatility", volume: "Volume" },
   tWhat: "What it shows", tWhere: "When to use it", tConfirm: "How to confirm", tMistake: "Common mistake",
   tSettings: "Common settings", tWhen: "When to use it", tHow: "How to use it in a trade", tPairs: "Combine with",
   calc: {
    goal: { title: "Goal SIP planner", target: "Target amount (₹)", years: "Years", rate: "Expected annual return (%)", perMonth: "per month", note: "How much to invest each month to reach the target. Assumes investing at the start of each month." },
    lump: { title: "Lumpsum growth", amount: "Amount (₹)", years: "Years", rate: "Expected annual return (%)", note: "What a one-time investment grows to, compounded yearly at the assumed rate." },
    cagr: { title: "Return (CAGR)", start: "Start value (₹)", end: "End value (₹)", years: "Years", note: "The steady yearly rate that turns the start value into the end value." },
    position: { title: "Position size", capital: "Trading capital (₹)", risk: "Risk per trade (%)", entry: "Entry price (₹)", stop: "Stop-loss price (₹)", shares: "shares", maxLoss: "maximum loss", note: "Shares you can buy so that a stop-out loses only your planned risk. Excludes costs and slippage." },
    breakeven: { title: "Trade break-even", qty: "Quantity (shares)", price: "Buy price (₹)", costs: "Total buy and sell costs (₹)", perShare: "per share", note: "The sell price needed just to cover costs, before any profit." }
   },
   practiceTitle: "Practise it", practiceIntro: "Apply this module with virtual money in the paper-trading terminal or a calculator. Tick each task when you finish it.", practiceCount: "{n} of {t} done",
   practiceOpen: { chart: "Open the chart", screener: "Open the screener", strategy: "Open strategy backtesting", replay: "Open bar replay", journal: "Open the journal", orders: "Open orders", portfolio: "Open portfolio", history: "Open trade history", funds: "Open funds", calc: "Open the calculator", url: "Open the website" },
   disclaimer: "Educational content only, not investment advice. Markets carry risk, including loss of capital. Examples are simplified and may exclude charges, taxes and slippage.",
   footerText: "Learn the market, one concept at a time.", disclaimerLink: "Disclaimer", privacyLink: "Privacy policy", contactLink: "Contact",
   minRead: "min read", relatedCalcs: "Plan it with a calculator", doneTitle: "Finished this module?", doneText: "Mark it complete to track your progress on the home page. Scoring 60% or more in the quiz marks it complete too.",
   markDone: "Mark as complete", isDone: "Completed ✓", undoDone: "Mark as not complete", quizSaved: "Score saved. Module marked complete — well done!", quizBest: "Best score",
   levels: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" } },
 hi: { navLearn: "सीखें", navChart: "चार्ट लैब", navTools: "कैलकुलेटर", navQuiz: "क्विज़", navGlossary: "शब्दावली", navAbout: "हमारे बारे में",
   library: "लाइब्रेरी", adPlaceholder: "विज्ञापन स्थान · स्वीकृति के बाद Google AdSense जोड़ें", allTopics: "सभी विषय", prev: "पिछला पाठ", next: "अगला पाठ",
   notFound: "यह विषय नहीं मिला। नीचे से कोई विषय चुनें।", sidebarTitle: "लर्निंग मॉड्यूल", tocTitle: "इस पेज पर",
   charts: "चार्ट और चित्र", examples: "कार्य उदाहरण", scenarios: "वास्तविक परिस्थितियाँ", useCases: "उपयोग के मामले", takeaways: "मुख्य बातें",
   toolsTitle: "इस मॉड्यूल में उपयोग होने वाले टूल", termsTitle: "मुख्य शब्द, समझाए गए", faqTitle: "सीखने वालों के सामान्य प्रश्न", quizTitle: "अपनी समझ जाँचें",
   quizNext: "अगला प्रश्न", quizFinish: "स्कोर देखें", quizScore: "आपका स्कोर", quizRetry: "फिर से कोशिश करें", quizCorrect: "सही।", quizWrong: "सही नहीं।", quizAnswer: "कारण", quizOf: "प्रश्न",
   calcTitle: "खुद आज़माएँ", calcOut: "परिणाम", invalid: "सही मान दर्ज करें",
   kind: { candle: "कैंडलस्टिक", chart: "चार्ट पैटर्न" }, bias: { bullish: "तेज़ी", bearish: "मंदी", neutral: "तटस्थ" },
   cat: { trend: "ट्रेंड", momentum: "मोमेंटम", volatility: "अस्थिरता", volume: "वॉल्यूम" },
   tWhat: "यह क्या दिखाता है", tWhere: "कब इस्तेमाल करें", tConfirm: "पुष्टि कैसे करें", tMistake: "आम गलती",
   tSettings: "आम सेटिंग", tWhen: "कब इस्तेमाल करें", tHow: "ट्रेड में कैसे इस्तेमाल करें", tPairs: "किसके साथ जोड़ें",
   calc: {
    goal: { title: "लक्ष्य SIP प्लानर", target: "लक्ष्य राशि (₹)", years: "वर्ष", rate: "अपेक्षित सालाना रिटर्न (%)", perMonth: "प्रति माह", note: "लक्ष्य तक पहुँचने के लिए हर महीने कितना निवेश करना होगा। हर महीने की शुरुआत में निवेश मानकर।" },
    lump: { title: "लंपसम ग्रोथ", amount: "राशि (₹)", years: "वर्ष", rate: "अपेक्षित सालाना रिटर्न (%)", note: "एक बार के निवेश की भविष्य की राशि, मान ली गई दर पर सालाना चक्रवृद्धि से।" },
    cagr: { title: "रिटर्न (CAGR)", start: "शुरुआती मूल्य (₹)", end: "अंतिम मूल्य (₹)", years: "वर्ष", note: "वह स्थिर सालाना दर जो शुरुआती मूल्य को अंतिम मूल्य तक ले जाती है।" },
    position: { title: "पोज़िशन साइज़", capital: "ट्रेडिंग पूँजी (₹)", risk: "प्रति ट्रेड जोखिम (%)", entry: "एंट्री कीमत (₹)", stop: "स्टॉप-लॉस कीमत (₹)", shares: "शेयर", maxLoss: "अधिकतम नुकसान", note: "उतने शेयर कि स्टॉप लगने पर केवल आपका तय जोखिम जाए। शुल्क और स्लिपेज शामिल नहीं।" },
    breakeven: { title: "ट्रेड ब्रेक-ईवन", qty: "मात्रा (शेयर)", price: "ख़रीद कीमत (₹)", costs: "कुल ख़रीद और बिक्री खर्च (₹)", perShare: "प्रति शेयर", note: "खर्च निकालने के लिए ज़रूरी बिक्री कीमत, किसी लाभ से पहले।" }
   },
   practiceTitle: "अभ्यास करें", practiceIntro: "इस मॉड्यूल को पेपर-ट्रेडिंग टर्मिनल में वर्चुअल पैसे से या कैलकुलेटर से लागू करें। हर काम पूरा होने पर उस पर टिक लगाएँ।", practiceCount: "{t} में से {n} पूरे",
   practiceOpen: { chart: "चार्ट खोलें", screener: "स्क्रीनर खोलें", strategy: "स्ट्रैटेजी बैकटेस्टिंग खोलें", replay: "बार रीप्ले खोलें", journal: "जर्नल खोलें", orders: "ऑर्डर्स खोलें", portfolio: "पोर्टफ़ोलियो खोलें", history: "ट्रेड हिस्ट्री खोलें", funds: "फ़ंड्स खोलें", calc: "कैलकुलेटर खोलें", url: "वेबसाइट खोलें" },
   disclaimer: "केवल शैक्षिक सामग्री, निवेश सलाह नहीं। बाज़ार में जोखिम होता है, जिसमें पूँजी खोने का जोखिम भी शामिल है। उदाहरण सरल किए गए हैं और इनमें शुल्क, टैक्स या स्लिपेज शामिल नहीं हो सकते।",
   footerText: "एक-एक अवधारणा करके बाज़ार सीखें।", disclaimerLink: "अस्वीकरण", privacyLink: "गोपनीयता नीति", contactLink: "संपर्क",
   minRead: "मिनट पढ़ने का समय", relatedCalcs: "कैलकुलेटर से योजना बनाएँ", doneTitle: "यह मॉड्यूल पूरा हुआ?", doneText: "होम पेज पर अपनी प्रगति देखने के लिए इसे पूरा चिह्नित करें। क्विज़ में 60% या अधिक स्कोर करने पर भी यह पूरा चिह्नित होता है।",
   markDone: "पूरा चिह्नित करें", isDone: "पूरा हुआ ✓", undoDone: "अधूरा चिह्नित करें", quizSaved: "स्कोर सहेजा गया। मॉड्यूल पूरा चिह्नित हुआ — शाबाश!", quizBest: "सर्वश्रेष्ठ स्कोर",
   levels: { beginner: "शुरुआती", intermediate: "मध्यम", advanced: "उन्नत" } }
};

// Try-it calculators. Each run() returns text, or null when inputs are invalid.
const CALC_SPECS = {
 goal: { fields: [["target", 2500000], ["years", 15], ["rate", 12]],
  run(v, c) { const n = v.years * 12, r = v.rate / 1200; if (!(v.target > 0 && n > 0 && r >= 0)) return null; const f = r === 0 ? n : ((Math.pow(1 + r, n) - 1) / r) * (1 + r); return `${inr(v.target / f)} ${c.perMonth}`; } },
 lump: { fields: [["amount", 100000], ["years", 10], ["rate", 10]],
  run(v) { if (!(v.amount > 0 && v.years > 0 && v.rate >= 0)) return null; return inr(v.amount * Math.pow(1 + v.rate / 100, v.years)); } },
 cagr: { fields: [["start", 100000], ["end", 180000], ["years", 5]],
  run(v) { if (!(v.start > 0 && v.end > 0 && v.years > 0)) return null; return (Math.pow(v.end / v.start, 1 / v.years) * 100 - 100).toFixed(2) + "%"; } },
 position: { fields: [["capital", 100000], ["risk", 1], ["entry", 250], ["stop", 240]],
  run(v, c) { const d = Math.abs(v.entry - v.stop); if (!(v.capital > 0 && v.risk > 0 && d > 0)) return null; const q = Math.floor(v.capital * v.risk / 100 / d); return `${q} ${c.shares} · ${c.maxLoss} ${inr(q * d)}`; } },
 breakeven: { fields: [["qty", 100], ["price", 500], ["costs", 60]],
  run(v, c) { if (!(v.qty > 0 && v.price > 0 && v.costs >= 0)) return null; return `₹ ${(v.price + v.costs / v.qty).toFixed(2)} (${(v.costs / v.qty).toFixed(2)} / ${c.perShare})`; } }
};

const LESSON_EXTRAS = { en: LESSON_EXTRAS_EN, hi: LESSON_EXTRAS_HI };

// Calculators on the calculators page that go with each module: [calculator id, English name, Hindi name].
const RELATED_CALCS = {
 foundations: [["trade-breakeven", "Trade break-even", "ट्रेड ब्रेक-ईवन"], ["stock-average", "Stock average price", "शेयर औसत क़ीमत"], ["emergency-fund", "Emergency fund", "इमरजेंसी फ़ंड"]],
 "market-rules": [["capital-gains", "Capital gains tax", "कैपिटल गेन टैक्स"], ["trade-breakeven", "Trade break-even", "ट्रेड ब्रेक-ईवन"]],
 investing: [["compound-interest", "Compound interest", "चक्रवृद्धि ब्याज"], ["goal", "Goal planner", "लक्ष्य योजना"], ["net-worth", "Net worth", "नेट वर्थ"], ["inflation", "Inflation", "महँगाई"]],
 "sip-mutual-funds": [["sip", "SIP calculator", "SIP कैलकुलेटर"], ["step-up-sip", "Step-up SIP", "स्टेप-अप SIP"], ["swp", "SWP", "SWP"], ["xirr", "XIRR", "XIRR"]],
 "fundamental-analysis": [["cagr", "CAGR", "CAGR"], ["roi", "Return on investment", "निवेश पर रिटर्न"]],
 "valuation-basics": [["npv-irr", "NPV & IRR", "NPV और IRR"], ["cagr", "CAGR", "CAGR"]],
 "cash-flow-statement": [["runway", "Working capital & cash runway", "वर्किंग कैपिटल और कैश रनवे"]],
 "balance-sheet": [["runway", "Working capital & cash runway", "वर्किंग कैपिटल और कैश रनवे"]],
 "corporate-actions": [["drip", "Dividend reinvestment", "डिविडेंड रीइन्वेस्टमेंट"], ["stock-average", "Stock average price", "शेयर औसत क़ीमत"]],
 "swing-trading": [["position-size", "Position size", "पोज़िशन साइज़"], ["trade-breakeven", "Trade break-even", "ट्रेड ब्रेक-ईवन"]],
 "risk-management": [["position-size", "Position size", "पोज़िशन साइज़"], ["emergency-fund", "Emergency fund", "इमरजेंसी फ़ंड"]],
 "intraday-trading": [["position-size", "Position size", "पोज़िशन साइज़"], ["trade-breakeven", "Trade break-even", "ट्रेड ब्रेक-ईवन"]],
 "futures-options": [["position-size", "Position size", "पोज़िशन साइज़"], ["income-tax", "Income tax: new vs old", "इनकम टैक्स: नई बनाम पुरानी"]],
 "tax-basics": [["income-tax", "Income tax: new vs old", "इनकम टैक्स: नई बनाम पुरानी"], ["capital-gains", "Capital gains tax", "कैपिटल गेन टैक्स"], ["hra", "HRA exemption", "HRA छूट"], ["gst", "GST", "GST"]],
 "trading-psychology": [["position-size", "Position size", "पोज़िशन साइज़"]]
};
const hasProgress = typeof MPProgress !== "undefined";

let lang = "en";
let slug = "";
let mq = null;

const inr = n => "₹ " + Math.round(n).toLocaleString("en-IN");
function esc(s) {
 return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function readLang() {
 try { return localStorage.getItem("mp-lang") || "en"; } catch (e) { return "en"; }
}
function saveLang(l) {
 try { localStorage.setItem("mp-lang", l); } catch (e) { /* storage unavailable */ }
}
function lessonHref(s) {
 return `lesson.html?topic=${encodeURIComponent(s)}`;
}
const pick = o => (o && (o[lang] || o.en)) || "";

function applyUI() {
 document.documentElement.lang = lang;
 document.querySelectorAll("[data-ui]").forEach(el => {
  const v = UI[lang][el.dataset.ui];
  if (typeof v === "string") el.textContent = v;
 });
}

// Left sidebar: all learning modules, with the current one highlighted.
function renderModuleNav() {
 if (!document.getElementById("moduleNav")) return;
 document.getElementById("moduleNav").innerHTML = LESSON_ORDER.map(s => {
  const L = (LESSONS[lang] && LESSONS[lang][s]) || LESSONS.en[s];
  const done = hasProgress && MPProgress.isDone(s) ? ' <span class="done-mark" aria-label="completed">✓</span>' : "";
  return `<a href="${lessonHref(s)}"${s === slug ? ' class="active" aria-current="page"' : ""}>${esc(L.title)}${done}</a>`;
 }).join("");
}

// "On this page": links to each section of the current module.
let tocObserver = null;

function buildToc(root) {
 const toc = document.getElementById("pageToc");
 const items = Array.from(root.querySelectorAll(".lesson-section, .lesson-block"));
 toc.innerHTML = items.map((el, i) => {
  el.id = "sec-" + i;
  const h = el.querySelector("h2");
  return `<a href="#sec-${i}">${esc(h ? h.textContent : "")}</a>`;
 }).join("");
 document.getElementById("sideModule").textContent = (LESSONS[lang] && LESSONS[lang][slug] || LESSONS.en[slug]).title;

 // Highlight the section currently being read.
 if (tocObserver) tocObserver.disconnect();
 tocObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
   if (!e.isIntersecting) return;
   toc.querySelectorAll("a").forEach(a => {
    const on = a.getAttribute("href") === "#" + e.target.id;
    a.classList.toggle("active", on);
    if (on) a.scrollIntoView({ block: "nearest" });
   });
  });
 }, { rootMargin: "-25% 0px -60% 0px" });
 items.forEach(el => tocObserver.observe(el));
}

// Progress bar: how far through the module the learner has scrolled.
function updateProgress() {
 const root = document.getElementById("lessonRoot"), bar = document.getElementById("sideBar");
 if (!root || !bar) return;
 const r = root.getBoundingClientRect();
 const span = Math.max(r.height - window.innerHeight * 0.5, 1);
 const done = Math.min(1, Math.max(0, -r.top / span));
 bar.style.width = (done * 100).toFixed(0) + "%";
}

function renderTopicGrid() {
 document.getElementById("topicGrid").innerHTML = LESSON_ORDER.map(s => {
  const L = (LESSONS[lang] && LESSONS[lang][s]) || LESSONS.en[s];
  const active = s === slug ? " topic-chip-active" : "";
  const done = hasProgress && MPProgress.isDone(s) ? `<span class="done-mark" aria-label="${esc(UI[lang].isDone)}">✓</span>` : "";
  return `<a class="topic-chip${active}" href="${lessonHref(s)}"><strong>${esc(L.title)} ${done}</strong><small>${esc(UI[lang].levels[LESSONS.en[s].level])} · ${esc(L.time)}</small></a>`;
 }).join("");
}

// ---- tools: pattern and indicator cards ----
function resolveTools(list) {
 if (list === "ALL_PATTERNS") return PATTERNS.map(p => p.id);
 if (list === "ALL_INDICATORS") return INDICATORS.map(x => x.id);
 return list || [];
}
function toolCard(id) {
 const p = PATTERNS.find(x => x.id === id);
 if (p) return `<article class="pattern-card tool-card"><figure class="pattern-img"><img src="../images/patterns/${p.file}" alt="${esc(pick(p.name))} — ${lang === "hi" ? "पैटर्न आरेख" : "pattern diagram"}" loading="lazy" decoding="async"></figure>
  <div class="pattern-head"><h3>${esc(pick(p.name))}</h3><div class="pattern-tags"><span class="level-badge">${esc(UI[lang].kind[p.kind])}</span><span class="bias-badge bias-${p.bias}">${esc(UI[lang].bias[p.bias])}</span></div></div>
  <dl class="pattern-info"><dt>${esc(UI[lang].tWhat)}</dt><dd>${esc(pick(p.what))}</dd><dt>${esc(UI[lang].tWhere)}</dt><dd>${esc(pick(p.where))}</dd><dt>${esc(UI[lang].tConfirm)}</dt><dd>${esc(pick(p.confirm))}</dd><dt>${esc(UI[lang].tMistake)}</dt><dd>${esc(pick(p.mistake))}</dd></dl></article>`;
 const x = INDICATORS.find(i => i.id === id);
 if (x) return `<article class="pattern-card tool-card"><figure class="pattern-img"><img src="../images/indicators/${x.file}" alt="${esc(pick(x.name))} — ${lang === "hi" ? "चार्ट" : "chart"}" loading="lazy" decoding="async"></figure>
  <div class="pattern-head"><h3>${esc(pick(x.name))}</h3><div class="pattern-tags"><span class="level-badge">${esc(UI[lang].cat[x.category])}</span></div></div>
  <dl class="pattern-info"><dt>${esc(UI[lang].tWhat)}</dt><dd>${esc(pick(x.what))}</dd><dt>${esc(UI[lang].tSettings)}</dt><dd>${esc(pick(x.settings))}</dd><dt>${esc(UI[lang].tWhen)}</dt><dd>${esc(pick(x.when))}</dd><dt>${esc(UI[lang].tHow)}</dt><dd>${esc(pick(x.how))}</dd><dt>${esc(UI[lang].tMistake)}</dt><dd>${esc(pick(x.mistake))}</dd><dt>${esc(UI[lang].tPairs)}</dt><dd>${esc(pick(x.pairs))}</dd></dl></article>`;
 return "";
}
function toolsBlock(ids) {
 const cards = ids.map(toolCard).filter(Boolean);
 if (!cards.length) return "";
 return `<section class="lesson-block"><h2>${esc(UI[lang].toolsTitle)}</h2><div class="tool-grid">${cards.join("")}</div></section>`;
}

// ---- try-it calculators ----
function calcWidget(type) {
 const spec = CALC_SPECS[type], c = UI[lang].calc[type];
 return `<div class="res-card calc-card inline-calc" data-calc="${type}"><h3>${esc(c.title)}</h3><p class="res-kind">${esc(c.note)}</p>
  ${spec.fields.map(([k, v]) => `<label class="calc-field"><span>${esc(c[k])}</span><input data-k="${k}" type="number" value="${v}" step="any"></label>`).join("")}
  <div class="calc-out"><small>${esc(UI[lang].calcOut)}</small><strong data-out>—</strong></div></div>`;
}
function calcBlock(list) {
 if (!list || !list.length) return "";
 return `<section class="lesson-block"><h2>${esc(UI[lang].calcTitle)}</h2><div class="tool-grid">${list.map(calcWidget).join("")}</div></section>`;
}
function bindCalcs() {
 document.querySelectorAll(".inline-calc").forEach(card => {
  const type = card.dataset.calc, spec = CALC_SPECS[type];
  const update = () => {
   const v = {};
   card.querySelectorAll("input").forEach(i => v[i.dataset.k] = Number(i.value));
   const r = spec.run(v, UI[lang].calc[type]);
   card.querySelector("[data-out]").textContent = r === null ? UI[lang].invalid : r;
  };
  card.querySelectorAll("input").forEach(i => i.addEventListener("input", update));
  update();
 });
}

// ---- key terms, questions, quiz ----
function termsBlock(names) {
 const items = (names || []).map(n => GLOSSARY_TERMS.find(t => t.term.en === n)).filter(Boolean);
 if (!items.length) return "";
 return `<section class="lesson-block"><h2>${esc(UI[lang].termsTitle)}</h2><dl class="term-list">${items.map(t => `<dt>${esc(pick(t.term))}</dt><dd>${esc(pick(t.def))}</dd>`).join("")}</dl></section>`;
}
function faqBlock(faq) {
 if (!faq || !faq.length) return "";
 return `<section class="lesson-block"><h2>${esc(UI[lang].faqTitle)}</h2>${faq.map(f => `<details class="practice"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</section>`;
}
function quizBlock(items) {
 if (!items || !items.length) return "";
 return `<section class="lesson-block"><h2>${esc(UI[lang].quizTitle)}</h2><div id="modQuiz" class="quiz-card" aria-live="polite"></div></section>`;
}
function drawQuiz(host) {
 const u = UI[lang];
 if (mq.i >= mq.items.length) {
  let note = "";
  if (hasProgress && !mq.saved) {
   mq.saved = true;
   if (MPProgress.saveQuiz(slug, mq.score, mq.items.length)) { note = `<p class="quiz-saved">${esc(u.quizSaved)}</p>`; renderDone(); renderModuleNav(); renderTopicGrid(); }
  }
  const best = hasProgress && MPProgress.read().quiz[slug];
  host.innerHTML = `<div class="quiz-score"><small>${esc(u.quizScore)}</small><strong>${mq.score} / ${mq.items.length}</strong>${best ? `<p class="quiz-best">${esc(u.quizBest)}: ${best.score} / ${best.total}</p>` : ""}${note}<button class="btn btn-primary" data-mq-retry>${esc(u.quizRetry)}</button></div>`;
  return;
 }
 const it = mq.items[mq.i], answered = mq.chosen !== null;
 host.innerHTML = `<div class="quiz-meta"><span class="level-badge">${esc(u.quizOf)} ${mq.i + 1} / ${mq.items.length}</span></div>
  <h3 class="quiz-q">${esc(it.q)}</h3>
  <div class="quiz-options">${it.o.map((o, k) => {
    let c = "quiz-opt";
    if (answered && k === it.a) c += " correct";
    if (answered && k === mq.chosen && k !== it.a) c += " wrong";
    return `<button class="${c}" data-mq-opt="${k}"${answered ? " disabled" : ""}>${esc(o)}</button>`;
   }).join("")}</div>
  ${answered ? `<div class="quiz-feedback ${mq.chosen === it.a ? "good" : "bad"}"><strong>${esc(mq.chosen === it.a ? u.quizCorrect : u.quizWrong)}</strong> <span>${esc(u.quizAnswer)}: ${esc(it.e)}</span></div>
   <button class="btn btn-primary" data-mq-next>${esc(mq.i === mq.items.length - 1 ? u.quizFinish : u.quizNext)}</button>` : ""}`;
}
function bindQuiz(items) {
 const host = document.getElementById("modQuiz");
 if (!host) return;
 mq = { items, i: 0, score: 0, chosen: null };
 drawQuiz(host);
 host.onclick = e => {
  const opt = e.target.closest("[data-mq-opt]");
  if (opt && mq.chosen === null) {
   mq.chosen = Number(opt.dataset.mqOpt);
   if (mq.chosen === mq.items[mq.i].a) mq.score++;
   drawQuiz(host); return;
  }
  if (e.target.closest("[data-mq-next]")) { mq.i++; mq.chosen = null; drawQuiz(host); return; }
  if (e.target.closest("[data-mq-retry]")) { mq.i = 0; mq.score = 0; mq.chosen = null; mq.saved = false; drawQuiz(host); }
 };
}

// ---- practice tasks (js/lesson-practice.js); ticks are saved per module ----
const PRACTICE_KEY = "mp-practice";
function practiceTicks() {
 try { return JSON.parse(localStorage.getItem(PRACTICE_KEY)) || {}; } catch (e) { return {}; }
}
function practiceHref(target) {
 if (target.startsWith("url:")) return target.slice(4);
 if (target.startsWith("calc:")) return "calculators.html#" + encodeURIComponent(target.slice(5));
 return "paper-trading.html" + (target === "chart" ? "" : "#" + target);
}
function practiceBlock(s) {
 const list = (window.MP_PRACTICE || {})[s];
 if (!list) return "";
 const u = UI[lang], done = practiceTicks()[s] || [];
 const items = list.map(([target, en, hi], i) => {
  const kind = target.split(":")[0], ext = kind === "url", ticked = done.includes(i);
  return `<li class="practice-task${ticked ? " is-done" : ""}"><label><input type="checkbox" data-practice="${i}"${ticked ? " checked" : ""}><span>${esc(lang === "hi" ? hi : en)}</span></label>
   <a class="related-calc practice-open" href="${esc(practiceHref(target))}"${ext ? ' target="_blank" rel="noopener"' : ""}>${esc(u.practiceOpen[kind] || u.practiceOpen.chart)} <span aria-hidden="true">↗</span></a></li>`;
 }).join("");
 return `<section class="lesson-block practice-block"><h2>${esc(u.practiceTitle)}</h2><p class="practice-intro">${esc(u.practiceIntro)} <strong data-practice-count aria-live="polite"></strong></p><ol class="practice-list">${items}</ol></section>`;
}
function bindPractice() {
 const box = document.querySelector(".practice-block"); // the table of contents renames section ids
 if (!box) return;
 const total = box.querySelectorAll("[data-practice]").length;
 const count = () => {
  const n = box.querySelectorAll("[data-practice]:checked").length;
  box.querySelector("[data-practice-count]").textContent = UI[lang].practiceCount.replace("{n}", n).replace("{t}", total);
 };
 box.addEventListener("change", e => {
  const cb = e.target.closest("[data-practice]");
  if (!cb) return;
  const all = practiceTicks(), set = new Set(all[slug] || []);
  cb.checked ? set.add(+cb.dataset.practice) : set.delete(+cb.dataset.practice);
  all[slug] = [...set].sort((a, b) => a - b);
  try { localStorage.setItem(PRACTICE_KEY, JSON.stringify(all)); } catch (err) { /* storage unavailable */ }
  cb.closest(".practice-task").classList.toggle("is-done", cb.checked);
  count();
 });
 count();
}

// ---- related calculators and completion ----
function relatedBlock(s) {
 const list = RELATED_CALCS[s];
 if (!list) return "";
 return `<section class="lesson-block"><h2>${esc(UI[lang].relatedCalcs)}</h2><div class="related-calcs">${list.map(([id, en, hi]) => `<a class="related-calc" href="calculators.html#${encodeURIComponent(id)}"><span aria-hidden="true">₹</span>${esc(lang === "hi" ? hi : en)} <span aria-hidden="true">↗</span></a>`).join("")}</div></section>`;
}
function renderDone() {
 const box = document.getElementById("doneBox");
 if (!box || !hasProgress) return;
 const u = UI[lang], done = MPProgress.isDone(slug);
 box.classList.toggle("is-done", done);
 box.innerHTML = `<div><h2>${esc(done ? u.isDone : u.doneTitle)}</h2><p>${esc(u.doneText)}</p></div><button type="button" class="btn ${done ? "btn-secondary" : "btn-primary"}" id="doneBtn" aria-pressed="${done}">${esc(done ? u.undoDone : u.markDone)}</button>`;
 document.getElementById("doneBtn").addEventListener("click", () => {
  MPProgress.setDone(slug, !MPProgress.isDone(slug));
  renderDone(); renderModuleNav(); renderTopicGrid();
 });
}

// ---- lesson body ----
// Worked table in a section: { head: [..], rows: [[..], ..] }. A first cell starting with "!" marks a total row.
// Columns after the first are figures, so they are right-aligned unless they hold long text.
function sectionTable(t) {
 const cell = (c, tag) => `<${tag}${tag === "td" && c.length > 24 ? ' class="text"' : ""}>${esc(c)}</${tag}>`;
 const rows = t.rows.map(r => {
  const total = r[0].startsWith("!"), first = total ? r[0].slice(1) : r[0];
  return `<tr${total ? ' class="total"' : ""}><th scope="row">${esc(first)}</th>${r.slice(1).map(c => cell(c, "td")).join("")}</tr>`;
 }).join("");
 return `<div class="lesson-table-wrap" tabindex="0"><table class="lesson-table"><thead><tr>${t.head.map(h => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
}
// Illustration for a strategy section: { file, en:{alt,cap}, hi:{alt,cap} } under images/strategies/.
function sectionFigure(im) {
 const t = im[lang] || im.en;
 return `<figure class="chart-fig"><img src="../images/strategies/${im.file}" alt="${esc(t.alt)}" loading="lazy" decoding="async"><figcaption>${esc(t.cap)}</figcaption></figure>`;
}
function chartBlock(s) {
 const items = LESSON_CHARTS[s];
 if (!items) return "";
 const figs = items.map(c => {
  const t = c[lang] || c.en;
  return `<figure class="chart-fig"><img src="../images/charts/${c.file}" alt="${esc(t.alt)}" loading="lazy" decoding="async"><figcaption>${esc(t.cap)}</figcaption></figure>`;
 }).join("");
 return `<section class="lesson-block"><h2>${esc(UI[lang].charts)}</h2>${figs}</section>`;
}
function extraBlocks(ex) {
 const u = UI[lang];
 const cards = (items, cls) => items.map(i => `<div class="case-card ${cls}"><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></div>`).join("");
 const list = items => `<ul>${items.map(li => `<li>${esc(li)}</li>`).join("")}</ul>`;
 const block = (title, body) => body ? `<section class="lesson-block"><h2>${esc(title)}</h2>${body}</section>` : "";
 return [
  block(u.examples, ex.examples && cards(ex.examples, "example")),
  block(u.scenarios, ex.scenarios && cards(ex.scenarios, "scenario")),
  block(u.useCases, ex.useCases && list(ex.useCases)),
  block(u.takeaways, ex.takeaways && list(ex.takeaways))
 ].join("");
}

function renderLesson() {
 const root = document.getElementById("lessonRoot");
 const en = LESSONS.en[slug];
 if (!en) {
  document.title = "MarketPathAcademy — Lesson";
  document.getElementById("crumbTopic").textContent = "";
  root.innerHTML = `<h1 class="lesson-title">${esc(UI[lang].notFound)}</h1>`;
  renderTopicGrid();
  return;
 }
 const L = (LESSONS[lang] && LESSONS[lang][slug]) || en;
 const ex = (LESSON_EXTRAS[lang] && LESSON_EXTRAS[lang][slug]) || LESSON_EXTRAS.en[slug] || {};
 const meta = MODULE_META[slug] || { terms: [], tools: [], calc: [] };
 const content = (MODULE_CONTENT[lang] && MODULE_CONTENT[lang][slug]) || MODULE_CONTENT.en[slug] || { faq: [], quiz: [] };
 const override = LESSON_OVERRIDES[lang] && LESSON_OVERRIDES[lang][slug];
 const sections = (override && override.sections) || L.sections;
 const idx = LESSON_ORDER.indexOf(slug);
 const prev = idx > 0 ? LESSON_ORDER[idx - 1] : null;
 const next = idx < LESSON_ORDER.length - 1 ? LESSON_ORDER[idx + 1] : null;
 const navTitle = s => esc((LESSONS[lang] && LESSONS[lang][s] || LESSONS.en[s]).title);

 document.title = `${L.title} — MarketPathAcademy`;
 document.getElementById("crumbTopic").textContent = L.title;

 root.innerHTML = `
  <header class="lesson-head">
   <div class="eyebrow">${esc(UI[lang].levels[en.level])}</div>
   <h1 class="lesson-title">${esc(L.title)}</h1>
   <p class="lesson-summary">${esc(L.summary)}</p>
   <div class="lesson-meta"><span class="level-badge">${esc(UI[lang].levels[en.level])}</span><span class="level-badge">${esc(L.time)}</span><span class="level-badge" id="readTime"></span></div>
  </header>
  ${sections.map(sec => `
   <section class="lesson-section">
    <h2>${esc(sec.h)}</h2>
    ${sec.p ? `<p>${esc(sec.p)}</p>` : ""}
    ${sec.ul ? `<ul>${sec.ul.map(li => `<li>${esc(li)}</li>`).join("")}</ul>` : ""}
    ${sec.table ? sectionTable(sec.table) : ""}
    ${sec.p2 ? `<p>${esc(sec.p2)}</p>` : ""}
    ${sec.img ? sectionFigure(sec.img) : ""}
   </section>`).join("")}
  ${chartBlock(slug)}
  ${toolsBlock(resolveTools(meta.tools))}
  ${calcBlock(meta.calc)}
  ${extraBlocks(ex)}
  ${termsBlock(meta.terms)}
  ${faqBlock(content.faq)}
  ${quizBlock(content.quiz)}
  ${practiceBlock(slug)}
  ${relatedBlock(slug)}
  ${hasProgress ? `<section class="done-box" id="doneBox" aria-live="polite"></section>` : ""}
  <p class="fine-print lesson-disclaimer">${esc(UI[lang].disclaimer)}</p>
  <nav class="lesson-nav" aria-label="Lesson navigation">
   ${prev ? `<a href="${lessonHref(prev)}"><small>← ${esc(UI[lang].prev)}</small>${navTitle(prev)}</a>` : "<span></span>"}
   ${next ? `<a class="next" href="${lessonHref(next)}"><small>${esc(UI[lang].next)} →</small>${navTitle(next)}</a>` : "<span></span>"}
  </nav>`;
 renderTopicGrid();
 renderModuleNav();
 buildToc(root);
 updateProgress();
 bindCalcs();
 bindQuiz(content.quiz);
 bindPractice();
 renderDone();
 // About 200 words a minute for the lesson text (sections only, not tools or quiz).
 const words = [...root.querySelectorAll(".lesson-section")].reduce((n, sec) => n + sec.textContent.split(/\s+/).length, 0);
 document.getElementById("readTime").textContent = `${Math.max(1, Math.round(words / 200))} ${UI[lang].minRead}`;
 if (hasProgress) MPProgress.visit(slug);
 // ADS-OFF: placeAdSlots();
 // Opened from search with #sec-N: scroll to that section now that it exists.
 const target = location.hash && document.getElementById(location.hash.slice(1));
 if (target) setTimeout(() => target.scrollIntoView({ block: "start" }), 0);
}

function setLanguage(l) {
 lang = l;
 saveLang(l);
 document.getElementById("languageSelect").value = l;
 applyUI();
 renderLesson();
}

document.addEventListener("DOMContentLoaded", () => {
 applyMcq();
 const params = new URLSearchParams(location.search);
 slug = params.get("topic") || LESSON_ORDER[0];
 lang = readLang();
 if (!UI[lang]) lang = "en";

 document.getElementById("year").textContent = new Date().getFullYear();
 document.getElementById("languageSelect").value = lang;
 document.getElementById("languageSelect").addEventListener("change", e => setLanguage(e.target.value));

 const menu = document.getElementById("menuToggle");
 menu.addEventListener("click", () => {
  const open = document.getElementById("mainNav").classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
 });

 // Headings panel is open on wide screens and collapsed on phones.
 document.getElementById("sideMain").open = window.innerWidth > 900;
 window.addEventListener("scroll", updateProgress, { passive: true });
 applyUI();
 renderLesson();
});
