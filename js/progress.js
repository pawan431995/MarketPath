// Learning progress, kept in this browser only: modules visited, modules completed, best quiz scores and the
// last module opened. Used by the lesson page (mark complete, quiz) and the homepage (continue learning, badges).
const MPProgress = (function () {
 const KEY = "mp-progress-v1";
 const blank = () => ({ visited: {}, done: {}, quiz: {}, last: null });
 function read() {
  try { return Object.assign(blank(), JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { return blank(); }
 }
 function write(p) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { /* storage unavailable: progress lasts this visit */ }
 }
 return {
  read,
  visit(slug) { const p = read(); p.visited[slug] = Date.now(); p.last = slug; write(p); },
  isDone: slug => !!read().done[slug],
  setDone(slug, on) { const p = read(); if (on) p.done[slug] = Date.now(); else delete p.done[slug]; write(p); },
  // Saves the best score; a score of 60% or more marks the module complete. Returns true if it was newly completed.
  saveQuiz(slug, score, total) {
   const p = read(), prev = p.quiz[slug];
   if (!prev || score / total > prev.score / prev.total) p.quiz[slug] = { score, total, at: Date.now() };
   const newly = score / total >= 0.6 && !p.done[slug];
   if (newly) p.done[slug] = Date.now();
   write(p);
   return newly;
  },
  reset() { write(blank()); }
 };
})();
