// Shared site chrome for every page: header navigation, site search button, footer with key links,
// and a back-to-top button. Pages keep their own content translations; this file owns the navigation text
// (English and Hindi) so every page shows the same menu and footer. Load it at the end of <body>, before
// the page's own scripts (they write the year into #year, which this footer provides).
(function () {
 const base = new URL("..", document.currentScript.src).href; // site root, works on a web server and on file://
 const url = path => new URL(path, base).href;
 const here = location.href.split("#")[0].split("?")[0];
 const lang = () => { try { return localStorage.getItem("mp-lang") === "hi" ? "hi" : "en"; } catch (e) { return "en"; } };

 const T = {
  en: {
   learn: "Learn", paper: "Paper trading", calcs: "Calculators", glossary: "Glossary", about: "About", search: "Search", menu: "Open navigation",
   tagline: "Learn the market, one concept at a time. Lessons, practice and tools for beginners and experienced investors, in English and Hindi.",
   colStart: "Start learning", colTrade: "Trading & analysis", colTools: "Tools", colSite: "MarketPath",
   disclaimer: "Disclaimer", privacy: "Privacy policy", contact: "Contact", top: "Back to top",
   rights: "MarketPath. Educational content only — not investment advice.",
   lessons: {
    foundations: "Stock market foundations", "market-rules": "Market rules & investor protection", investing: "Investing & wealth building",
    "sip-mutual-funds": "SIP & mutual funds", "tax-basics": "Tax basics", "technical-analysis": "Technical analysis",
    "candlestick-patterns": "Candlestick & chart patterns", "fundamental-analysis": "Fundamental analysis", "futures-options": "Futures & options", "risk-management": "Risk management"
   },
   tools: { sip: "SIP calculator", "income-tax": "Income tax: new vs old", emi: "Loan EMI calculator" }
  },
  hi: {
   learn: "सीखें", paper: "पेपर ट्रेडिंग", calcs: "कैलकुलेटर", glossary: "शब्दावली", about: "हमारे बारे में", search: "खोजें", menu: "नेविगेशन खोलें",
   tagline: "एक-एक अवधारणा करके बाज़ार सीखें। शुरुआती और अनुभवी निवेशकों के लिए पाठ, अभ्यास और टूल, हिंदी और अंग्रेज़ी में।",
   colStart: "सीखना शुरू करें", colTrade: "ट्रेडिंग और विश्लेषण", colTools: "टूल", colSite: "MarketPath",
   disclaimer: "अस्वीकरण", privacy: "गोपनीयता नीति", contact: "संपर्क", top: "ऊपर जाएँ",
   rights: "MarketPath. केवल शैक्षिक सामग्री — निवेश सलाह नहीं।",
   lessons: {
    foundations: "शेयर बाज़ार की मूल बातें", "market-rules": "बाज़ार के नियम और निवेशक सुरक्षा", investing: "निवेश और धन निर्माण",
    "sip-mutual-funds": "SIP और म्यूचुअल फंड", "tax-basics": "टैक्स की मूल बातें", "technical-analysis": "टेक्निकल एनालिसिस",
    "candlestick-patterns": "कैंडलस्टिक और चार्ट पैटर्न", "fundamental-analysis": "फंडामेंटल एनालिसिस", "futures-options": "फ्यूचर्स और ऑप्शंस", "risk-management": "जोखिम प्रबंधन"
   },
   tools: { sip: "SIP कैलकुलेटर", "income-tax": "इनकम टैक्स: नई बनाम पुरानी", emi: "लोन EMI कैलकुलेटर" }
  }
 };
 const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
 const lessonUrl = slug => url(`pages/lesson.html?topic=${slug}`);

 function renderNav() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  const t = T[lang()];
  const items = [
   ["learn", url("index.html#courses")], ["paper", url("index.html#paper")], ["calcs", url("pages/calculators.html")],
   ["glossary", url("pages/glossary.html")], ["about", url("index.html#about")]
  ];
  nav.innerHTML = items.map(([k, href]) => {
   const current = href.split("#")[0] === here && !href.includes("#");
   return `<a href="${href}" data-chrome="${k}"${current ? ' aria-current="page"' : ""}>${esc(t[k])}</a>`;
  }).join("");
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
   nav.classList.remove("open");
   const m = document.getElementById("menuToggle");
   if (m) m.setAttribute("aria-expanded", "false");
  }));
  const menu = document.getElementById("menuToggle");
  if (menu) menu.setAttribute("aria-label", t.menu);
 }

 function renderSearchButton() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  let btn = document.getElementById("siteSearchBtn");
  if (!btn) {
   btn = document.createElement("button");
   btn.type = "button";
   btn.id = "siteSearchBtn";
   btn.className = "hdr-search";
   btn.addEventListener("click", () => window.MPSearch && window.MPSearch.open());
   header.insertBefore(btn, header.querySelector(".language-picker") || null);
  }
  const t = T[lang()];
  btn.innerHTML = `<span aria-hidden="true">⌕</span><span class="hdr-search-label">${esc(t.search)}</span><kbd aria-hidden="true">/</kbd>`;
  btn.setAttribute("aria-label", t.search);
 }

 function renderFooter() {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;
  const t = T[lang()];
  const link = (href, text) => `<a href="${href}">${esc(text)}</a>`;
  footer.classList.add("site-footer-rich");
  footer.innerHTML = `
   <div class="ft-grid">
    <div class="ft-brand">
     <a class="brand footer-brand" href="${url("index.html")}"><span class="brand-mark">M</span><span>Market<span class="brand-light">Path</span></span></a>
     <p>${esc(t.tagline)}</p>
    </div>
    <nav class="ft-col" aria-label="${esc(t.colStart)}"><h2>${esc(t.colStart)}</h2>${["foundations", "market-rules", "investing", "sip-mutual-funds", "tax-basics"].map(s => link(lessonUrl(s), t.lessons[s])).join("")}</nav>
    <nav class="ft-col" aria-label="${esc(t.colTrade)}"><h2>${esc(t.colTrade)}</h2>${["technical-analysis", "candlestick-patterns", "fundamental-analysis", "futures-options", "risk-management"].map(s => link(lessonUrl(s), t.lessons[s])).join("")}</nav>
    <nav class="ft-col" aria-label="${esc(t.colTools)}"><h2>${esc(t.colTools)}</h2>${link(url("index.html#paper"), t.paper)}${link(url("pages/calculators.html"), t.calcs)}${link(url("pages/calculators.html#sip"), t.tools.sip)}${link(url("pages/calculators.html#income-tax"), t.tools["income-tax"])}${link(url("pages/glossary.html"), t.glossary)}</nav>
    <nav class="ft-col" aria-label="${esc(t.colSite)}"><h2>${esc(t.colSite)}</h2>${link(url("index.html#about"), t.about)}${link(url("index.html#about"), t.disclaimer)}${link(url("pages/privacy.html"), t.privacy)}${link(url("pages/contact.html"), t.contact)}</nav>
   </div>
   <div class="ft-bottom"><small>© <span id="year">${new Date().getFullYear()}</span> ${esc(t.rights)}</small></div>`;
 }

 function renderBackToTop() {
  let b = document.getElementById("backToTop");
  if (!b) {
   b = document.createElement("button");
   b.type = "button";
   b.id = "backToTop";
   b.className = "back-to-top";
   b.hidden = true;
   b.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
   document.body.appendChild(b);
   const toggle = () => { b.hidden = window.scrollY < 700; };
   window.addEventListener("scroll", toggle, { passive: true });
   toggle();
  }
  b.textContent = "↑";
  b.setAttribute("aria-label", T[lang()].top);
  b.title = T[lang()].top;
 }

 function render() { renderNav(); renderSearchButton(); renderFooter(); renderBackToTop(); }
 render();

 // Re-render after the page's own language handler has saved the new choice.
 const sel = document.getElementById("languageSelect");
 if (sel) sel.addEventListener("change", () => setTimeout(render, 0));

 // "/" or Ctrl/Cmd+K opens search from anywhere except while typing in a field.
 document.addEventListener("keydown", e => {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
  if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
   if (window.MPSearch) { e.preventDefault(); window.MPSearch.open(); }
  }
 });

 window.MPChrome = { base, url, lang, render };
})();
