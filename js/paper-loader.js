// Loads the paper-trading code (about 330 KB with the chart library and the NSE stock list) only when the
// section is about to come into view, or when someone opens #paper, so the rest of the homepage loads faster.
// Scripts are added with async = false: they download in parallel but run in this order.
(function () {
 const section = document.getElementById("paper");
 if (!section) return;
 const SCRIPTS = [
  "https://unpkg.com/lightweight-charts@5.2.1/dist/lightweight-charts.standalone.production.js",
  "js/paper-symbols.js", "js/paper-charges.js", "js/paper-indicators.js", "js/paper-drawings.js",
  "js/paper-costs.js", "js/paper-journal.js", "js/paper-replay.js", "js/paper-account.js", "js/paper-trading.js"
 ];
 let started = false;
 function load() {
  if (started) return;
  started = true;
  if (observer) observer.disconnect();
  window.removeEventListener("hashchange", onHash);
  const note = document.getElementById("ppNote");
  if (note) note.textContent = "Loading paper trading…";
  SCRIPTS.forEach(src => {
   const s = document.createElement("script");
   s.src = src;
   s.async = false;
   document.body.appendChild(s);
  });
 }
 const onHash = () => { if (location.hash === "#paper") load(); };
 const observer = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) load(); }, { rootMargin: "800px 0px" })
  : null;
 if (observer) observer.observe(section); else load();
 window.addEventListener("hashchange", onHash);
 onHash();
})();
