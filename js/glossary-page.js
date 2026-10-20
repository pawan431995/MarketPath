// Renders the glossary (glossary.html): search, topic filters, and the shared language setting.
const GL_UI = {
 en: { navLearn: "Learn", navPatterns: "Patterns", navIndicators: "Indicators", navTools: "Calculators", navQuiz: "Quiz", navGlossary: "Glossary", navResources: "Resources",
   eyebrow: "GLOSSARY", title: "Stock market glossary",
   intro: "Plain-language definitions of the terms you will meet in markets, research and trading. Search by word, or filter by topic.",
   searchPlaceholder: "Search terms...", all: "All", count: "terms", none: "No terms match your search.",
   disclaimer: "Definitions are for education. They are not investment advice. Check official sources such as SEBI and NSE for current rules.",
   footerText: "Learn the market, one concept at a time.", disclaimerLink: "Disclaimer", privacyLink: "Privacy policy", contactLink: "Contact",
   cat: { basics: "Basics", trading: "Trading", fundamental: "Fundamentals", technical: "Technical", derivatives: "Derivatives", funds: "Mutual funds", india: "Indian market" } },
 hi: { navLearn: "सीखें", navPatterns: "पैटर्न", navIndicators: "इंडिकेटर", navTools: "कैलकुलेटर", navQuiz: "क्विज़", navGlossary: "शब्दावली", navResources: "संसाधन",
   eyebrow: "शब्दावली", title: "शेयर बाज़ार शब्दावली",
   intro: "बाज़ार, शोध और ट्रेडिंग में आने वाले शब्दों की सरल भाषा में परिभाषाएँ। शब्द से खोजें, या विषय से फ़िल्टर करें।",
   searchPlaceholder: "शब्द खोजें...", all: "सभी", count: "शब्द", none: "आपकी खोज से कोई शब्द मेल नहीं खाता।",
   disclaimer: "परिभाषाएँ शिक्षा के लिए हैं, निवेश सलाह नहीं। मौजूदा नियमों के लिए SEBI और NSE जैसे आधिकारिक स्रोत देखें।",
   footerText: "एक-एक अवधारणा करके बाज़ार सीखें।", disclaimerLink: "अस्वीकरण", privacyLink: "गोपनीयता नीति", contactLink: "संपर्क",
   cat: { basics: "मूल बातें", trading: "ट्रेडिंग", fundamental: "फंडामेंटल", technical: "टेक्निकल", derivatives: "डेरिवेटिव", funds: "म्यूचुअल फंड", india: "भारतीय बाज़ार" } }
};
const GL_CATS = ["basics", "trading", "fundamental", "technical", "derivatives", "funds", "india"];

let glLang = "en";
let glCat = "all";

function glRender() {
 const q = (document.getElementById("glSearch").value || "").toLowerCase().trim();
 const ui = GL_UI[glLang];
 const list = GLOSSARY_TERMS
  .filter(t => glCat === "all" || t.cat === glCat)
  .filter(t => !q || [t.term.en, t.term.hi, t.def.en, t.def.hi].join(" ").toLowerCase().includes(q))
  .sort((a, b) => a.term.en.localeCompare(b.term.en));
 document.getElementById("glCount").textContent = `${list.length} ${ui.count}`;
 document.getElementById("glList").innerHTML = list.map(t => `
  <article class="gl-item">
   <div class="gl-head"><h2>${MP.esc(t.term[glLang] || t.term.en)}</h2><span class="level-badge">${MP.esc(ui.cat[t.cat])}</span></div>
   <p>${MP.esc(t.def[glLang] || t.def.en)}</p>
   ${glLang === "en" ? `<p class="gl-alt">${MP.esc(t.term.hi)}</p>` : `<p class="gl-alt">${MP.esc(t.term.en)}</p>`}
  </article>`).join("");
 document.getElementById("glNone").hidden = list.length !== 0;
}

function glApplyUI() {
 MP.applyText(GL_UI, glLang);
 document.getElementById("glSearch").placeholder = GL_UI[glLang].searchPlaceholder;
 const f = document.getElementById("glFilters");
 f.innerHTML = ["all", ...GL_CATS].map(c => `<button class="level-tab${glCat === c ? " active" : ""}" data-cat="${c}">${MP.esc(c === "all" ? GL_UI[glLang].all : GL_UI[glLang].cat[c])}</button>`).join("");
 f.querySelectorAll("[data-cat]").forEach(b => b.addEventListener("click", () => { glCat = b.dataset.cat; glApplyUI(); glRender(); }));
 document.title = glLang === "en" ? (window.MPChrome && MPChrome.docTitle) || document.title : GL_UI[glLang].title + " — MarketPathAcademy";
}

document.addEventListener("DOMContentLoaded", () => {
 glLang = GL_UI[MP.getLang()] ? MP.getLang() : "en";
 document.getElementById("year").textContent = new Date().getFullYear();
 const sel = document.getElementById("languageSelect");
 sel.value = glLang;
 sel.addEventListener("change", e => { glLang = e.target.value; MP.setLang(glLang); glApplyUI(); glRender(); });
 document.getElementById("glSearch").addEventListener("input", glRender);
 // ?q=term (from site search) pre-fills the search box.
 const q = new URLSearchParams(location.search).get("q");
 if (q) document.getElementById("glSearch").value = q;
 MP.setupMenu();
 // ADS-OFF: placeAdSlots();
 glApplyUI();
 glRender();
});
