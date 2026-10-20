// Learn page (pages/learn.html): every course with level tabs, search, progress badges and "continue where
// you left off". ?level=Beginner|Intermediate|Advanced and ?q=words pre-set the filters (used by homepage links).
// Needs shared.js (MP), lesson-catalog.js, progress.js and course-catalog.js (MPCourses).
(function () {
 const UI = {
  en: { eyebrow: "THE LEARNING LIBRARY", title: "All courses", intro: "Structured modules from your first share to options, taxes and trading psychology, in English and Hindi. Move in order, or jump straight to the topic you need.",
   searchPlaceholder: "Search topics...", none: "No topics match your search. Try another keyword.", all: "All levels",
   ctaTitle: "Finished the course? Test yourself.", ctaText: "Take the final test: 100 to 150 questions from every module. Score 70% to earn your MarketPathAcademy certificate.", ctaGo: "Take the final test →",
   stats: (m, d) => [[m, "modules"], [d, "completed by you"], ["467", "practice questions"], ["EN · हिं", "two languages"]],
   count: (s, t) => `Showing ${s} of ${t} topics`, doc: "All courses" },
  hi: { eyebrow: "सीखने की लाइब्रेरी", title: "सभी कोर्स", intro: "पहले शेयर से लेकर ऑप्शंस, टैक्स और ट्रेडिंग मनोविज्ञान तक व्यवस्थित मॉड्यूल, हिंदी और अंग्रेज़ी में। क्रम से सीखें या सीधे अपने विषय पर जाएँ।",
   searchPlaceholder: "विषय खोजें...", none: "आपकी खोज से कोई विषय नहीं मिला। कोई दूसरा शब्द आज़माएँ।", all: "सभी स्तर",
   ctaTitle: "कोर्स पूरा कर लिया? ख़ुद को परखें।", ctaText: "फ़ाइनल टेस्ट दें: हर मॉड्यूल से 100 से 150 प्रश्न। 70% लाकर MarketPathAcademy सर्टिफ़िकेट पाएँ।", ctaGo: "फ़ाइनल टेस्ट दें →",
   stats: (m, d) => [[m, "मॉड्यूल"], [d, "आपने पूरे किए"], ["467", "अभ्यास प्रश्न"], ["EN · हिं", "दो भाषाएँ"]],
   count: (s, t) => `${t} में से ${s} विषय`, doc: "सभी कोर्स" }
 };
 const params = new URLSearchParams(location.search);
 let lang = UI[MP.getLang()] ? MP.getLang() : "en";
 let level = MPCourses.LEVELS.includes(params.get("level")) ? params.get("level") : "all";
 const $ = id => document.getElementById(id);

 function render() {
  const u = UI[lang], ranked = MPCourses.search($("courseSearch").value, level, lang), s = MPCourses.summary();
  $("continueBox").innerHTML = MPCourses.continueHtml(lang);
  $("learnStats").innerHTML = u.stats(MPCourses.COURSES.length, s.done).map(([n, l]) => `<div><strong>${n}</strong><span>${l}</span></div>`).join("");
  $("levelTabs").innerHTML = ["all", ...MPCourses.LEVELS].map(l => `<button type="button" role="tab" class="level-tab${level === l ? " active" : ""}" aria-selected="${level === l}" data-level="${l}">${l === "all" ? u.all : MPCourses.levelLabel(l, lang)}${l === "all" ? "" : ` <small>${s.byLevel[l].total}</small>`}</button>`).join("");
  $("courseGrid").innerHTML = ranked.map(r => MPCourses.card(r.c, r.L, lang)).join("");
  $("noResults").hidden = ranked.length !== 0;
  const searching = $("courseSearch").value.trim() || level !== "all";
  $("resultCount").textContent = searching ? u.count(ranked.length, MPCourses.COURSES.length) : "";
 }
 function applyLang() {
  const u = UI[lang];
  MP.applyText(UI, lang);
  document.querySelectorAll("[data-ui-placeholder]").forEach(el => { el.placeholder = u[el.dataset.uiPlaceholder]; });
  document.title = lang === "en" ? (window.MPChrome && MPChrome.docTitle) || document.title : `${u.doc} — MarketPathAcademy`;
  render();
 }
 document.addEventListener("DOMContentLoaded", () => {
  if ($("year")) $("year").textContent = new Date().getFullYear();
  const sel = $("languageSelect");
  sel.value = lang;
  sel.addEventListener("change", e => { lang = e.target.value; MP.setLang(lang); applyLang(); });
  if (params.get("q")) $("courseSearch").value = params.get("q");
  $("courseSearch").addEventListener("input", render);
  $("levelTabs").addEventListener("click", e => {
   const b = e.target.closest("[data-level]");
   if (!b) return;
   level = b.dataset.level;
   // Keep the filter in the address so the page can be bookmarked or shared.
   const p = new URLSearchParams(location.search);
   if (level === "all") p.delete("level"); else p.set("level", level);
   history.replaceState(null, "", `${location.pathname}${p.toString() ? `?${p}` : ""}`);
   render();
  });
  MP.setupMenu();
  applyLang();
 });
})();
