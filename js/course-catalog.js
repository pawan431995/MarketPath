// Course catalogue shared by the homepage (index.html) and the Learn page (pages/learn.html): the course list,
// course cards, search, and the learner's progress (from js/progress.js). Needs js/lesson-catalog.js (LESSONS,
// LESSON_ORDER). Paths are built from the site root with MPChrome.url, so it works from any folder.
const MPCourses = (function () {
 const COURSES = [
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
 const UI = {
  en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced", startLesson: "Start lesson", practice: (n, t) => `Practice ${n}/${t}`,
   newTitle: "New here? Start with the beginner path", newText: "Four short modules that take you from zero to placing your first informed investment.",
   start: "Start with module 1", cont: "Continue where you left off", done: n => `${n} of ${COURSES.length} modules completed`, next: "Next up",
   all: "You have completed every module. Revisit any topic or take the final test.", badgeDone: "Completed", badgeStarted: "Started", resume: "Resume" },
  hi: { beginner: "शुरुआती", intermediate: "मध्यम", advanced: "उन्नत", startLesson: "पाठ शुरू करें", practice: (n, t) => `अभ्यास ${n}/${t}`,
   newTitle: "नए हैं? शुरुआती रास्ते से शुरू करें", newText: "चार छोटे मॉड्यूल जो आपको शून्य से पहले सोचे-समझे निवेश तक ले जाते हैं।",
   start: "मॉड्यूल 1 से शुरू करें", cont: "जहाँ छोड़ा था वहीं से जारी रखें", done: n => `${COURSES.length} में से ${n} मॉड्यूल पूरे`, next: "आगे",
   all: "आपने सभी मॉड्यूल पूरे कर लिए हैं। कोई भी विषय दोबारा देखें या फ़ाइनल टेस्ट दें।", badgeDone: "पूरा", badgeStarted: "शुरू किया", resume: "जारी रखें" }
 };
 const BEGINNER_PATH = ["foundations", "market-rules", "investing", "sip-mutual-funds"];
 const LEVELS = ["Beginner", "Intermediate", "Advanced"];
 const at = p => (window.MPChrome ? MPChrome.url(p) : p);
 // Each lesson has its own page per language (pages/lesson-<slug>.html, -hi.html for Hindi).
 const curLang = () => { try { return localStorage.getItem("mp-lang") === "hi" ? "hi" : "en"; } catch (e) { return "en"; } };
 const lessonHref = (slug, lang = curLang()) => at(`pages/lesson-${slug}${lang === "hi" ? "-hi" : ""}.html`);
 const lessonFor = (c, lang) => (LESSONS[lang] && LESSONS[lang][c.slug]) || LESSONS.en[c.slug];
 const levelLabel = (level, lang) => UI[lang][level.toLowerCase()] || level;
 const progress = () => (typeof MPProgress === "undefined" ? { done: {}, visited: {}, last: null } : MPProgress.read());

 // Search: case, "&" and punctuation are ignored; each typed word must start a word in the course (words under
 // three letters, such as "f&o", must match whole). Title matches rank above summary and topic matches.
 const normalizeSearch = s => String(s).toLowerCase().replace(/&/g, "").replace(/[^\p{L}\p{N}\s]+/gu, " ").replace(/\s+/g, " ").trim();
 const wordMatches = (word, t) => (t.length < 3 ? word === t : word.startsWith(t));
 function searchScore(c, L, tokens) {
  if (!tokens.length) return 0;
  const titleWords = normalizeSearch(`${L.title} ${LESSONS.en[c.slug].title}`).split(" ");
  const bodyWords = normalizeSearch(`${L.summary} ${c.desc || ""} ${c.topics.join(" ")}`).split(" ");
  let score = 0;
  for (const t of tokens) {
   if (titleWords.some(w => wordMatches(w, t))) score += 3;
   else if (bodyWords.some(w => wordMatches(w, t))) score += 1;
   else return -1;
  }
  return score;
 }
 function search(query, level, lang) {
  const tokens = normalizeSearch(query || "").split(" ").filter(Boolean);
  return COURSES.map(c => { const L = lessonFor(c, lang); return { c, L, score: (level === "all" || c.level === level) ? searchScore(c, L, tokens) : -1 }; })
   .filter(r => r.score >= 0).sort((a, b) => b.score - a.score);
 }
 function badge(slug, lang) {
  const p = progress(), u = UI[lang];
  if (p.done[slug]) return `<span class="progress-badge done">✓ ${u.badgeDone}</span>`;
  if (p.visited[slug]) return `<span class="progress-badge started">${u.badgeStarted}</span>`;
  return "";
 }
 // Practice tasks ticked in the lesson (shown when js/lesson-practice.js is loaded and at least one is ticked).
 const practiceTag = (slug, lang) => {
  const tasks = (window.MP_PRACTICE || {})[slug];
  let n = 0;
  try { n = ((JSON.parse(localStorage.getItem("mp-practice")) || {})[slug] || []).length; } catch (e) { /* storage unavailable */ }
  return tasks && n ? ` · <span class="practice-tag${n >= tasks.length ? " full" : ""}">${UI[lang].practice(Math.min(n, tasks.length), tasks.length)}</span>` : "";
 };
 const card = (c, L, lang) => `<article class="course-card"><div class="course-card-top"><span class="course-icon">${c.icon}</span><span class="level-badge">${levelLabel(c.level, lang)}</span>${badge(c.slug, lang)}</div><h3><a class="course-title-link" href="${lessonHref(c.slug)}">${L.title}</a></h3><p>${L.summary}</p><div class="course-footer"><span>${L.time}${practiceTag(c.slug, lang)}</span><a class="course-link" href="${lessonHref(c.slug)}">${UI[lang].startLesson} ↗</a></div></article>`;
 // Continue learning for returning visitors, or the suggested beginner path for new ones.
 function continueHtml(lang) {
  const p = progress(), u = UI[lang], title = s => lessonFor({ slug: s }, lang).title;
  const doneCount = COURSES.filter(c => p.done[c.slug]).length;
  if (!p.last || !LESSONS.en[p.last]) {
   return `<div class="continue-text"><strong>${u.newTitle}</strong><p>${u.newText}</p><ol class="path-steps">${BEGINNER_PATH.map((s, i) => `<li><a href="${lessonHref(s)}"><span>${i + 1}</span>${title(s)}</a></li>`).join("")}</ol></div><a class="btn btn-primary" href="${lessonHref(BEGINNER_PATH[0])}">${u.start} →</a>`;
  }
  const next = LESSON_ORDER.find(s => !p.done[s] && s !== p.last), pct = Math.round((doneCount / COURSES.length) * 100);
  return `<div class="continue-text"><strong>${u.cont}</strong><p><a href="${lessonHref(p.last)}">${title(p.last)} →</a>${next ? ` · <span class="muted">${u.next}: <a href="${lessonHref(next)}">${title(next)}</a></span>` : ""}</p><div class="continue-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="${u.done(doneCount)}"><span style="width:${pct}%"></span></div><small>${doneCount === COURSES.length ? u.all : u.done(doneCount)}</small></div><a class="btn btn-primary" href="${lessonHref(p.last)}">${u.resume} →</a>`;
 }
 // Progress per level, and the next module to open (the last one visited, else the first not completed).
 function summary() {
  const p = progress(), byLevel = {};
  LEVELS.forEach(l => { const list = COURSES.filter(c => c.level === l); byLevel[l] = { total: list.length, done: list.filter(c => p.done[c.slug]).length, list }; });
  const done = COURSES.filter(c => p.done[c.slug]).length;
  const nextSlug = (p.last && LESSONS.en[p.last] && !p.done[p.last]) ? p.last : (LESSON_ORDER.find(s => !p.done[s]) || LESSON_ORDER[0]);
  return { byLevel, done, total: COURSES.length, pct: Math.round((done / COURSES.length) * 100), started: !!p.last, nextSlug, visited: p.visited, doneMap: p.done };
 }
 return { COURSES, UI, LEVELS, BEGINNER_PATH, lessonFor, levelLabel, lessonHref, search, card, continueHtml, summary, at };
})();
