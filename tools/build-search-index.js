// Builds js/search-index.js for the site search (js/site-search.js).
// Run after changing lessons, glossary terms, calculators, patterns or indicators:
//   node tools/build-search-index.js
// It loads the site's content files the same way the pages do and writes one compact entry per item:
//   [kind, url from site root, enTitle, enText, enContext, hiTitle, hiText, hiContext, hiddenKeywords?]
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const js = path.join(__dirname, "..", "js");
const ctx = { console, Math, Date, Number, String, Object, Array, JSON, Infinity, isNaN, encodeURIComponent };
ctx.window = ctx;
vm.createContext(ctx);
const load = files => files.forEach(f => vm.runInContext(fs.readFileSync(path.join(js, f), "utf8"), ctx, { filename: f }));

// Same order as pages/lesson.html (content only, no UI code).
load(["lessons.js", "lessons-modules.js", "lessons-foundations.js", "lessons-content-a.js", "lessons-content-b.js", "lessons-content-c.js", "lessons-content-d.js", "lessons-content-e.js",
 "lessons-strategies.js", "lessons-strategy-detail.js", "lessons-extra-en.js", "lessons-extra-hi.js", "lesson-charts.js", "patterns.js", "indicators.js", "patterns-extra.js",
 "glossary-data.js", "glossary-finance.js", "glossary-rules.js", "module-extras.js", "lessons-tax.js", "lessons-finance.js", "lessons-updates.js", "lessons-market-rules.js",
 "calc-math.js", "calc-defs-personal.js", "calc-defs-investing.js", "calc-defs-retirement.js", "calc-defs-loans.js", "calc-defs-property.js", "calc-defs-tax.js", "calc-defs-business.js"]);
vm.runInContext("this.__ = { LESSONS, LESSON_ORDER, LESSON_OVERRIDES, GLOSSARY_TERMS, PATTERNS, INDICATORS };", ctx);
const { LESSONS, LESSON_ORDER, LESSON_OVERRIDES, GLOSSARY_TERMS, PATTERNS, INDICATORS } = ctx.__;
const CALCS = ctx.CALCS;

const clip = (s, n = 240) => { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s; };
const sectionText = sec => clip([sec.p, ...(sec.ul || []), sec.p2].filter(Boolean).join(" "));
const LEVEL = { beginner: ["Beginner", "शुरुआती"], intermediate: ["Intermediate", "मध्यम"], advanced: ["Advanced", "उन्नत"] };
const CAT_CALC = { personal: ["Personal finance", "व्यक्तिगत वित्त"], invest: ["Investing", "निवेश"], retire: ["Retirement", "रिटायरमेंट"], loans: ["Loans & debt", "लोन और कर्ज़"], property: ["Real estate", "रियल एस्टेट"], tax: ["Tax", "टैक्स"], business: ["Business", "बिज़नेस"] };
const CAT_TERM = { basics: ["Basics", "मूल बातें"], trading: ["Trading", "ट्रेडिंग"], fundamental: ["Fundamentals", "फंडामेंटल"], technical: ["Technical", "टेक्निकल"], derivatives: ["Derivatives", "डेरिवेटिव"], funds: ["Mutual funds", "म्यूचुअल फंड"], india: ["Indian market", "भारतीय बाज़ार"] };

const out = [
 ["page", "index.html#paper", "Paper trading simulator", "Practise buying and selling any NSE stock with a virtual ₹10 lakh account: charts, indicators, drawing tools, charges and tax.", "Tool", "पेपर ट्रेडिंग सिम्युलेटर", "वर्चुअल ₹10 लाख खाते से किसी भी NSE शेयर की ख़रीद-बिक्री का अभ्यास: चार्ट, इंडिकेटर, ड्रॉइंग टूल, शुल्क और टैक्स।", "टूल"],
 ["page", "pages/calculators.html", "All financial calculators", "SIP, EMI, income tax, retirement, FIRE, loans, property, tax and business calculators with charts and schedules.", "Tool", "सभी वित्तीय कैलकुलेटर", "SIP, EMI, इनकम टैक्स, रिटायरमेंट, FIRE, लोन, प्रॉपर्टी, टैक्स और बिज़नेस कैलकुलेटर, चार्ट और शेड्यूल के साथ।", "टूल"],
 ["page", "pages/glossary.html", "Glossary of market terms", "Plain-language definitions of 120+ terms in English and Hindi.", "Reference", "बाज़ार शब्दावली", "120+ शब्दों की आसान परिभाषाएँ, हिंदी और अंग्रेज़ी में।", "संदर्भ"]
];

LESSON_ORDER.forEach(slug => {
 const en = LESSONS.en[slug], hi = LESSONS.hi[slug] || en;
 const url = `pages/lesson.html?topic=${slug}`;
 const lvl = LEVEL[en.level] || ["", ""];
 out.push(["lesson", url, en.title, clip(en.summary), `${lvl[0]} · ${en.time}`, hi.title, clip(hi.summary), `${lvl[1]} · ${hi.time}`]);
 const sEn = (LESSON_OVERRIDES.en[slug] && LESSON_OVERRIDES.en[slug].sections) || en.sections;
 const sHi = (LESSON_OVERRIDES.hi[slug] && LESSON_OVERRIDES.hi[slug].sections) || hi.sections || sEn;
 sEn.forEach((sec, i) => {
  const h = sHi[i] || sec;
  out.push(["section", `${url}#sec-${i}`, sec.h, sectionText(sec), en.title, h.h, sectionText(h), hi.title]);
 });
});

GLOSSARY_TERMS.forEach(t => {
 const c = CAT_TERM[t.cat] || ["", ""];
 out.push(["term", `pages/glossary.html?q=${encodeURIComponent(t.term.en)}`, t.term.en, clip(t.def.en), c[0], t.term.hi, clip(t.def.hi), c[1]]);
});

CALCS.forEach(c => {
 const cat = CAT_CALC[c.cat] || ["", ""];
 // Keywords go in a 9th field: searched, but not shown in the result snippet.
 out.push(["calc", `pages/calculators.html#${c.id}`, c.title, clip(c.desc), cat[0], c.hi ? c.hi[0] : c.title, c.hi ? c.hi[1] : c.desc, cat[1], c.keywords || ""]);
});

const pick = (o, l) => (o && (o[l] || o.en)) || "";
PATTERNS.forEach(p => out.push(["pattern", "pages/lesson.html?topic=candlestick-patterns", pick(p.name, "en"), clip(pick(p.what, "en")), "Candlestick and chart patterns", pick(p.name, "hi"), clip(pick(p.what, "hi")), "कैंडलस्टिक और चार्ट पैटर्न"]));
INDICATORS.forEach(x => out.push(["indicator", "pages/lesson.html?topic=technical-indicators", pick(x.name, "en"), clip(pick(x.what, "en")), "Technical indicators", pick(x.name, "hi"), clip(pick(x.what, "hi")), "टेक्निकल इंडिकेटर"]));

const dest = path.join(js, "search-index.js");
fs.writeFileSync(dest, `// Generated by tools/build-search-index.js — do not edit by hand. ${out.length} entries.\nwindow.MP_SEARCH_INDEX = ${JSON.stringify(out)};\n`);
const counts = out.reduce((m, e) => ((m[e[0]] = (m[e[0]] || 0) + 1), m), {});
console.log(`Wrote ${out.length} entries (${(fs.statSync(dest).size / 1024).toFixed(0)} KB) to ${dest}`, counts);
