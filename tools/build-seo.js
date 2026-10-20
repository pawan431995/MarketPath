// Search engine optimisation build. Run after changing lesson, calculator or page content, or the site address:
//   node tools/build-seo.js
// It writes:
//  - pages/lesson-<slug>.html and pages/lesson-<slug>-hi.html: one page per lesson and language, from the template
//    pages/lesson.html, with the lesson text already in the HTML (so search engines read it without running
//    scripts), its own title, description, canonical URL, hreflang links, social tags and structured data.
//    js/lesson.js then renders the interactive version over it.
//  - pages/<id>-calculator.html: one page per calculator, from pages/calculators.html, the same way.
//  - The <head> SEO tags (between <!-- seo --> and <!-- /seo -->) of the other pages, sitemap.xml and robots.txt.
// Generated pages say so at the top: edit the template or the data, not the generated file.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// The site's public address, with a trailing slash. Change it here if the domain changes, then run this script.
const SITE = "https://www.marketpathacademy.com/";
const BRAND = "MarketPathAcademy";
const OG_IMAGE = SITE + "images/og-image.png";
const TODAY = new Date().toISOString().slice(0, 10);

const ROOT = path.join(__dirname, "..");
const read = f => fs.readFileSync(path.join(ROOT, f), "utf8").replace(/\r\n/g, "\n");
// Keep each file's line endings (most are CRLF in the working copy).
const write = (f, s) => {
 const full = path.join(ROOT, f), crlf = fs.existsSync(full) ? fs.readFileSync(full, "utf8").includes("\r\n") : true;
 fs.writeFileSync(full, crlf ? s.replace(/\n/g, "\r\n") : s);
};
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clip = (s, n) => { s = String(s).replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s; };
const ld = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

// ---------- content ----------
const ctx = { console, Math, Date, Number, String, Object, Array, JSON, Infinity, isNaN, Intl, encodeURIComponent };
ctx.window = ctx;
vm.createContext(ctx);
const load = files => files.forEach(f => vm.runInContext(read("js/" + f), ctx, { filename: f }));
// Same order as pages/lesson.html (content only).
load(["lessons.js", "lessons-modules.js", "lessons-foundations.js", "lessons-content-a.js", "lessons-content-b.js", "lessons-content-c.js", "lessons-content-d.js", "lessons-content-e.js",
 "lessons-strategies.js", "lessons-strategy-detail.js", "lessons-extra-en.js", "lessons-extra-hi.js", "lesson-charts.js", "patterns.js", "indicators.js", "patterns-extra.js",
 "glossary-data.js", "glossary-finance.js", "glossary-rules.js", "module-extras.js", "lessons-tax.js", "lessons-finance.js", "lessons-finance-more.js", "lessons-finance-more-hi.js",
 "lessons-updates.js", "lessons-market-rules.js",
 "calc-math.js", "calc-defs-personal.js", "calc-defs-investing.js", "calc-defs-retirement.js", "calc-defs-loans.js", "calc-defs-property.js", "calc-defs-tax.js", "calc-defs-business.js"]);
vm.runInContext("this.__ = { LESSONS, LESSON_ORDER, LESSON_OVERRIDES, LESSON_EXTRAS_EN, LESSON_EXTRAS_HI, LESSON_CHARTS, MODULE_CONTENT };", ctx);
const { LESSONS, LESSON_ORDER, LESSON_OVERRIDES, LESSON_EXTRAS_EN, LESSON_EXTRAS_HI, LESSON_CHARTS, MODULE_CONTENT } = ctx.__;
const EXTRAS = { en: LESSON_EXTRAS_EN, hi: LESSON_EXTRAS_HI };
const CALCS = ctx.CALCS;
// Section labels come from the lesson page's own UI text, so they always match.
const uiSrc = read("js/lesson.js").match(/^const UI = (\{[\s\S]*?\n\});$/m);
if (!uiSrc) throw new Error("Could not find the UI object in js/lesson.js");
const UI = vm.runInContext(`(${uiSrc[1]})`, ctx);

// ---------- URLs ----------
const lessonFile = (slug, lang) => `lesson-${slug}${lang === "hi" ? "-hi" : ""}.html`;
const lessonUrl = (slug, lang) => `${SITE}pages/${lessonFile(slug, lang)}`;
const calcFile = id => `${id}-calculator.html`;
const calcUrl = id => `${SITE}pages/${calcFile(id)}`;
const pageUrl = f => f === "index.html" ? SITE : SITE + f;

// ---------- <head> ----------
// Removes every tag this script manages (and older hand-written versions of them), so runs are repeatable.
function stripHead(html) {
 return html
  .replace(/\n?[ \t]*<!-- seo -->[\s\S]*?<!-- \/seo -->/g, "")
  .replace(/^[ \t]*<(?:title>|meta (?:name="(?:description|robots|twitter:[^"]*)"|property="og:[^"]*")|link rel="(?:canonical|alternate)"|script type="application\/ld\+json")[^\n]*\n/gm, "");
}
// meta: { title, desc, url, robots, type, locale, altLocale, alternates: [[hreflang, url]], ld: [..], pageScript }
function headBlock(m) {
 const lines = [
  `<title>${esc(m.title)}</title>`,
  `<meta name="description" content="${esc(m.desc)}">`
 ];
 if (m.robots) lines.push(`<meta name="robots" content="${m.robots}">`);
 if (m.url) lines.push(`<link rel="canonical" href="${m.url}">`);
 (m.alternates || []).forEach(([hl, u]) => lines.push(`<link rel="alternate" hreflang="${hl}" href="${u}">`));
 lines.push(
  `<meta property="og:type" content="${m.type || "website"}">`,
  `<meta property="og:site_name" content="${BRAND}">`,
  `<meta property="og:title" content="${esc(m.ogTitle || m.title)}">`,
  `<meta property="og:description" content="${esc(m.desc)}">`
 );
 if (m.url) lines.push(`<meta property="og:url" content="${m.url}">`);
 lines.push(
  `<meta property="og:image" content="${OG_IMAGE}">`,
  `<meta property="og:image:width" content="1200">`,
  `<meta property="og:image:height" content="630">`,
  `<meta property="og:locale" content="${m.locale || "en_IN"}">`
 );
 if (m.altLocale) lines.push(`<meta property="og:locale:alternate" content="${m.altLocale}">`);
 lines.push(
  `<meta name="twitter:card" content="summary_large_image">`,
  `<meta name="twitter:title" content="${esc(m.ogTitle || m.title)}">`,
  `<meta name="twitter:description" content="${esc(m.desc)}">`,
  `<meta name="twitter:image" content="${OG_IMAGE}">`
 );
 (m.ld || []).forEach(o => lines.push(ld(o)));
 if (m.pageScript) lines.push(`<script>${m.pageScript}</script>`);
 return `  <!-- seo -->\n${lines.map(l => "  " + l).join("\n")}\n  <!-- /seo -->`;
}
// Puts the block right after the viewport meta, so the page script runs before any other script.
function withHead(html, m) {
 const out = stripHead(html), at = out.indexOf("\n", out.indexOf('name="viewport"'));
 if (at < 0) throw new Error("No viewport meta to anchor the SEO block");
 return out.slice(0, at + 1) + headBlock(m) + out.slice(at);
}

// ---------- structured data ----------
const ORG = { "@type": "EducationalOrganization", "@id": SITE + "#org", name: BRAND, url: SITE, logo: SITE + "images/icon-512.png",
 description: "Free stock market education in English and Hindi: courses, quizzes, calculators, paper trading and a final test with a certificate." };
const provider = { "@type": "Organization", name: BRAND, url: SITE };
const crumbs = items => ({ "@context": "https://schema.org", "@type": "BreadcrumbList",
 itemListElement: items.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })) });
const free = { "@type": "Offer", price: 0, priceCurrency: "INR", category: "Free" };

// ---------- lesson pages ----------
const L = (lang, slug) => (LESSONS[lang] && LESSONS[lang][slug]) || LESSONS.en[slug];
const sectionsOf = (lang, slug) => (LESSON_OVERRIDES[lang] && LESSON_OVERRIDES[lang][slug] && LESSON_OVERRIDES[lang][slug].sections) || L(lang, slug).sections || [];
const faqOf = (lang, slug) => ((MODULE_CONTENT[lang] && MODULE_CONTENT[lang][slug]) || MODULE_CONTENT.en[slug] || { faq: [] }).faq || [];
function tableHtml(t) {
 const rows = t.rows.map(r => {
  const total = r[0].startsWith("!");
  return `<tr${total ? ' class="total"' : ""}><th scope="row">${esc(total ? r[0].slice(1) : r[0])}</th>${r.slice(1).map(c => `<td${c.length > 24 ? ' class="text"' : ""}>${esc(c)}</td>`).join("")}</tr>`;
 }).join("");
 return `<div class="lesson-table-wrap" tabindex="0"><table class="lesson-table"><thead><tr>${t.head.map(h => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
}
function lessonArticle(slug, lang) {
 const u = UI[lang], en = LESSONS.en[slug], l = L(lang, slug), ex = (EXTRAS[lang] && EXTRAS[lang][slug]) || EXTRAS.en[slug] || {};
 const sections = sectionsOf(lang, slug), faq = faqOf(lang, slug), charts = LESSON_CHARTS[slug] || [];
 const idx = LESSON_ORDER.indexOf(slug), prev = LESSON_ORDER[idx - 1], next = LESSON_ORDER[idx + 1];
 const block = (title, body) => body ? `<section class="lesson-block"><h2>${esc(title)}</h2>${body}</section>` : "";
 const cards = (items, cls) => items && items.length ? items.map(i => `<div class="case-card ${cls}"><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></div>`).join("") : "";
 const list = items => items && items.length ? `<ul>${items.map(li => `<li>${esc(li)}</li>`).join("")}</ul>` : "";
 return `
   <header class="lesson-head"><div class="eyebrow">${esc(u.levels[en.level])}</div><h1 class="lesson-title">${esc(l.title)}</h1><p class="lesson-summary">${esc(l.summary)}</p><div class="lesson-meta"><span class="level-badge">${esc(u.levels[en.level])}</span><span class="level-badge">${esc(l.time)}</span></div></header>
${sections.map(s => `   <section class="lesson-section"><h2>${esc(s.h)}</h2>${s.p ? `<p>${esc(s.p)}</p>` : ""}${s.ul ? list(s.ul) : ""}${s.table ? tableHtml(s.table) : ""}${s.p2 ? `<p>${esc(s.p2)}</p>` : ""}</section>`).join("\n")}
   ${block(u.charts, charts.map(c => { const t = c[lang] || c.en; return `<figure class="chart-fig"><img src="../images/charts/${c.file}" alt="${esc(t.alt)}" loading="lazy" decoding="async"><figcaption>${esc(t.cap)}</figcaption></figure>`; }).join(""))}
   ${block(u.examples, cards(ex.examples, "example"))}
   ${block(u.scenarios, cards(ex.scenarios, "scenario"))}
   ${block(u.useCases, list(ex.useCases))}
   ${block(u.takeaways, list(ex.takeaways))}
   ${block(u.faqTitle, faq.map(f => `<details class="practice"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join(""))}
   <p class="fine-print lesson-disclaimer">${esc(u.disclaimer)}</p>
   <nav class="lesson-nav" aria-label="Lesson navigation">${prev ? `<a href="${lessonFile(prev, lang)}"><small>← ${esc(u.prev)}</small>${esc(L(lang, prev).title)}</a>` : "<span></span>"}${next ? `<a class="next" href="${lessonFile(next, lang)}"><small>${esc(u.next)} →</small>${esc(L(lang, next).title)}</a>` : "<span></span>"}</nav>
  `;
}
function lessonMeta(slug, lang) {
 const l = L(lang, slug), en = LESSONS.en[slug], url = lessonUrl(slug, lang), faq = faqOf(lang, slug);
 const words = sectionsOf(lang, slug).map(s => [s.p, ...(s.ul || []), s.p2].join(" ")).join(" ").split(/\s+/).length;
 const suffix = lang === "hi" ? " मुफ़्त पाठ: उदाहरण, क्विज़ और पेपर-ट्रेडिंग अभ्यास के साथ, हिंदी और अंग्रेज़ी में।" : " Free lesson with examples, a quiz and paper-trading practice, in English and Hindi.";
 const desc = clip(l.summary + suffix, 200);
 const inLanguage = lang === "hi" ? "hi-IN" : "en-IN";
 const course = { "@context": "https://schema.org", "@type": "Course", "@id": url + "#course", name: l.title, description: l.summary, url, inLanguage,
  provider, isAccessibleForFree: true, educationalLevel: en.level, offers: free, dateModified: TODAY,
  hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseWorkload: `PT${Math.max(5, Math.round(words / 200))}M` } };
 const learn = lang === "hi" ? "सीखें" : "Learn";
 const out = [course, crumbs([[BRAND, SITE], [learn, SITE + "pages/learn.html"], [l.title, url]])];
 if (faq.length) out.push({ "@context": "https://schema.org", "@type": "FAQPage", inLanguage, mainEntity: faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
 return {
  title: `${l.title} | ${BRAND}`, desc, url, type: "article",
  locale: lang === "hi" ? "hi_IN" : "en_IN", altLocale: lang === "hi" ? "en_IN" : "hi_IN",
  alternates: [["en", lessonUrl(slug, "en")], ["hi", lessonUrl(slug, "hi")], ["x-default", lessonUrl(slug, "en")]],
  ld: out,
  // The address decides the language; saving it first makes the menu and footer render in the same language.
  pageScript: `window.MP_PAGE = ${JSON.stringify({ slug, lang })}; try { localStorage.setItem("mp-lang", "${lang}"); } catch (e) {}`
 };
}
const GENERATED = src => `<!-- Generated by tools/build-seo.js from ${src}. Edit that template or the content files, then run: node tools/build-seo.js -->`;
function buildLessons() {
 let tpl = read("pages/lesson.html");
 // The template itself is the old address (lesson.html?topic=…), which redirects to the lesson pages.
 write("pages/lesson.html", withHead(tpl, { title: `Lessons | ${BRAND}`, desc: "Stock market lessons in English and Hindi.", robots: "noindex, follow" }));
 tpl = stripHead(tpl);
 const files = [];
 LESSON_ORDER.forEach(slug => ["en", "hi"].forEach(lang => {
  const u = UI[lang], l = L(lang, slug);
  let html = withHead(tpl, lessonMeta(slug, lang))
   .replace("<!doctype html>", "<!doctype html>\n" + GENERATED("pages/lesson.html"))
   .replace('<html lang="en">', `<html lang="${lang}">`)
   .replace('<article id="lessonRoot" aria-live="polite"></article>', `<article id="lessonRoot" aria-live="polite">${lessonArticle(slug, lang)}</article>`)
   .replace('<span id="crumbTopic"></span>', `<span id="crumbTopic">${esc(l.title)}</span>`)
   .replace('<div id="topicGrid" class="topic-grid"></div>', `<div id="topicGrid" class="topic-grid">${LESSON_ORDER.map(s => `<a class="topic-chip${s === slug ? " topic-chip-active" : ""}" href="${lessonFile(s, lang)}"><strong>${esc(L(lang, s).title)}</strong><small>${esc(u.levels[LESSONS.en[s].level])} · ${esc(L(lang, s).time)}</small></a>`).join("")}</div>`);
  if (lang === "hi") html = html.replace('data-ui="library">Library<', `data-ui="library">${esc(u.library)}<`).replace('data-ui="allTopics">All topics<', `data-ui="allTopics">${esc(u.allTopics)}<`).replace('data-ui="tocTitle">On this page<', `data-ui="tocTitle">${esc(u.tocTitle)}<`);
  if (!html.includes("lesson-head")) throw new Error("Lesson content was not inserted for " + slug);
  write("pages/" + lessonFile(slug, lang), html);
  files.push(lessonFile(slug, lang));
 }));
 // Old module pages that moved into lessons.
 [["patterns.html", "candlestick-patterns"], ["indicators.html", "technical-indicators"]].forEach(([f, slug]) => write("pages/" + f,
  `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="robots" content="noindex, follow">\n  <meta http-equiv="refresh" content="0; url=${lessonFile(slug, "en")}">\n  <link rel="canonical" href="${lessonUrl(slug, "en")}">\n  <title>${esc(LESSONS.en[slug].title)} | ${BRAND}</title>\n</head>\n<body>\n  <p>This module moved to <a href="${lessonFile(slug, "en")}">${esc(LESSONS.en[slug].title)}</a>.</p>\n</body>\n</html>\n`));
 return files;
}

// ---------- calculator pages ----------
const CAT_NAME = { personal: "Personal finance", invest: "Investing", retire: "Retirement", loans: "Loans and debt", property: "Real estate", tax: "Tax", business: "Business finance" };
const titleCase = s => s.replace(/(^|[\s/-])([a-z])/g, (m, a, b) => a + b.toUpperCase()).replace(/\b(And|Vs|Of|For|To|In|On|With|The|A)\b/g, w => w.toLowerCase()).replace(/^./, c => c.toUpperCase());
function calcMeta(c) {
 const name = /calculator|planner/i.test(c.title) ? c.title : `${c.title} calculator`;
 const url = calcUrl(c.id);
 return {
  title: `${titleCase(name)} | Free Online | ${BRAND}`, ogTitle: `${titleCase(name)} | ${BRAND}`, url,
  desc: clip(`${c.desc} Free online, with instant results and the formula explained.`, 200),
  ld: [{ "@context": "https://schema.org", "@type": "WebApplication", name: titleCase(name), url, description: c.desc, applicationCategory: "FinanceApplication", operatingSystem: "Any", inLanguage: "en-IN", isAccessibleForFree: true, offers: free, provider },
   crumbs([[BRAND, SITE], ["Calculators", SITE + "pages/calculators.html"], [titleCase(name), url]])],
  pageScript: `window.MP_PAGE = ${JSON.stringify({ calc: c.id })};`
 };
}
function calcBody(c) {
 const related = CALCS.filter(x => x.cat === c.cat && x.id !== c.id);
 return `<div id="calcApp">
      <div class="calc-detail">
       <nav class="calc-crumbs" aria-label="Breadcrumb"><a href="calculators.html">← All calculators</a><span aria-hidden="true">/</span><span>${esc(CAT_NAME[c.cat] || "")}</span></nav>
       <div class="calc-head"><span class="calc-head-icon" aria-hidden="true">${esc(c.icon || "₹")}</span><div class="calc-head-text"><h1 class="calc-h1">${esc(c.title)}</h1><p class="calc-intro">${esc(c.desc)}</p></div></div>
       <section class="calc-related"><h2>What you enter</h2><ul>${c.inputs.map(i => `<li>${esc(i.label || i.id)}</li>`).join("")}</ul></section>
       ${c.how && c.how.length ? `<section class="calc-related"><h2>How this is calculated</h2><ul>${c.how.map(h => `<li>${esc(h)}</li>`).join("")}</ul></section>` : ""}
       ${related.length ? `<section class="calc-related"><h2>More in this category</h2><div class="calc-related-list">${related.map(x => `<a href="${calcFile(x.id)}" class="calc-chip">${esc(x.icon || "")} ${esc(x.title)}</a>`).join("")}</div></section>` : ""}
       <noscript><p class="calc-intro">The calculator needs JavaScript. Please enable it to use it.</p></noscript>
      </div>
    </div>`;
}
function buildCalcs() {
 const tpl = stripHead(read("pages/calculators.html")), files = [];
 const app = /<div id="calcApp">[\s\S]*?<\/noscript>\s*<\/div>/;
 if (!app.test(tpl)) throw new Error("Could not find #calcApp in pages/calculators.html");
 CALCS.forEach(c => {
  const html = withHead(tpl, calcMeta(c)).replace("<!doctype html>", "<!doctype html>\n" + GENERATED("pages/calculators.html")).replace(app, calcBody(c));
  write("pages/" + calcFile(c.id), html);
  files.push(calcFile(c.id));
 });
 return files;
}

// ---------- other pages ----------
const lessonList = () => ({ "@context": "https://schema.org", "@type": "ItemList", name: "Stock market courses", itemListElement: LESSON_ORDER.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: lessonUrl(s, "en") })) });
const calcList = () => ({ "@context": "https://schema.org", "@type": "ItemList", name: "Financial calculators", itemListElement: CALCS.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: calcUrl(c.id) })) });
const PAGES = {
 "index.html": {
  title: `${BRAND}: Free Stock Market Course in English & Hindi`,
  desc: "Learn the stock market for free, from basics to options, tax and trading psychology, in English and Hindi (शेयर बाज़ार हिंदी में सीखें). 23 courses with quizzes, paper trading, 49 calculators and a final test with a certificate.",
  ld: () => [Object.assign({ "@context": "https://schema.org" }, ORG), { "@context": "https://schema.org", "@type": "WebSite", "@id": SITE + "#website", name: BRAND, url: SITE, inLanguage: ["en-IN", "hi-IN"], publisher: { "@id": SITE + "#org" } }]
 },
 "pages/learn.html": {
  title: `Free Stock Market Courses in English & Hindi | ${BRAND}`,
  desc: "23 free stock market courses from basics to F&O, option Greeks, fundamental and technical analysis, tax and trading psychology, in English and Hindi, with quizzes and progress tracking.",
  ld: () => [lessonList(), crumbs([[BRAND, SITE], ["Learn", SITE + "pages/learn.html"]])]
 },
 "pages/calculators.html": {
  title: `Free Financial Calculators: SIP, EMI, Income Tax, Retirement | ${BRAND}`,
  desc: "49 free financial calculators: SIP, step-up SIP, EMI, income tax (new vs old regime), FD, PPF, EPF, NPS, retirement, FIRE, rent vs buy, capital gains, CAGR, XIRR and more, with charts and formulas.",
  ld: () => [calcList(), crumbs([[BRAND, SITE], ["Calculators", SITE + "pages/calculators.html"]])]
 },
 "pages/glossary.html": {
  title: `Stock Market Glossary: 120+ Terms in English & Hindi | ${BRAND}`,
  desc: "Stock market terms explained simply: shares, orders, fundamentals, technical analysis, derivatives, mutual funds and Indian market terms, in English and Hindi (शेयर बाज़ार शब्दावली).",
  ld: () => [crumbs([[BRAND, SITE], ["Glossary", SITE + "pages/glossary.html"]])]
 },
 "pages/test.html": {
  title: `Free Stock Market Test with Certificate | ${BRAND}`,
  desc: "Take a free stock market test: 100 to 150 questions covering every course, from market basics to options and tax. Score 70% to pass and download your certificate.",
  ld: () => [crumbs([[BRAND, SITE], ["Final test", SITE + "pages/test.html"]])]
 },
 "pages/paper-trading.html": {
  title: `Free Paper Trading Simulator for NSE Stocks | ${BRAND}`,
  desc: "Practise trading NSE stocks with a virtual ₹10 lakh account: real delayed prices, charts with 21 indicators, a stock screener, strategy backtesting, bar replay and a trading journal. Free, no sign-up.",
  ld: () => [{ "@context": "https://schema.org", "@type": "WebApplication", name: "Paper trading simulator", url: SITE + "pages/paper-trading.html", applicationCategory: "FinanceApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: free, provider },
   crumbs([[BRAND, SITE], ["Paper trading", SITE + "pages/paper-trading.html"]])]
 },
 "pages/contact.html": { title: `Contact | ${BRAND}`, desc: "Contact MarketPathAcademy with questions, suggestions or corrections about the courses, calculators and tools." },
 "pages/privacy.html": { title: `Privacy Policy | ${BRAND}`, desc: "MarketPathAcademy privacy policy: no account needed; preferences, learning progress, paper-trading data and calculator inputs stay in your own browser." }
};
function buildPages() {
 Object.entries(PAGES).forEach(([f, p]) => write(f, withHead(read(f), { title: p.title, desc: p.desc, url: pageUrl(f), ld: p.ld ? p.ld() : [] })));
}

// ---------- sitemap and robots ----------
function buildSitemap(lessonFiles, calcFiles) {
 const url = (loc, alts) => `  <url><loc>${loc}</loc><lastmod>${TODAY}</lastmod>${(alts || []).map(([hl, u]) => `<xhtml:link rel="alternate" hreflang="${hl}" href="${u}"/>`).join("")}</url>`;
 const lines = Object.keys(PAGES).map(f => url(pageUrl(f)));
 LESSON_ORDER.forEach(slug => ["en", "hi"].forEach(lang => lines.push(url(lessonUrl(slug, lang), [["en", lessonUrl(slug, "en")], ["hi", lessonUrl(slug, "hi")], ["x-default", lessonUrl(slug, "en")]]))));
 CALCS.forEach(c => lines.push(url(calcUrl(c.id))));
 write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Generated by tools/build-seo.js. Site address: ${SITE} -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${lines.join("\n")}\n</urlset>\n`);
 write("robots.txt", `# Generated by tools/build-seo.js.\nUser-agent: *\nAllow: /\nDisallow: /tools/\nDisallow: /docs/\n\nSitemap: ${SITE}sitemap.xml\n`);
 return lines.length;
}

const lessonFiles = buildLessons();
const calcFiles = buildCalcs();
buildPages();
const n = buildSitemap(lessonFiles, calcFiles);
console.log(`SEO build for ${SITE}: ${lessonFiles.length} lesson pages, ${calcFiles.length} calculator pages, ${Object.keys(PAGES).length} other pages, ${n} sitemap URLs.`);
