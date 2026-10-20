// Loads the paper-trading code (the chart library, the NSE stock list and the terminal modules) on
// pages/paper-trading.html. Scripts are added with async = false: they download in parallel but run in this order.
// Paths go through MPChrome.url so they resolve from the site root whichever folder the page is in.
(function () {
 const section = document.getElementById("paper");
 if (!section) return;
 const at = p => (window.MPChrome ? MPChrome.url(p) : p);
 const SCRIPTS = [
  "https://unpkg.com/lightweight-charts@5.2.1/dist/lightweight-charts.standalone.production.js",
  ...["paper-symbols", "paper-charges", "paper-indicators", "paper-drawings", "paper-costs", "paper-journal", "paper-replay",
   "paper-strategy", "paper-backtest", "paper-screener", "paper-account", "paper-trading"].map(n => at(`js/${n}.js`))
 ];
 const note = document.getElementById("ppNote");
 if (note) note.textContent = "Loading paper trading…";
 SCRIPTS.forEach(src => {
  const s = document.createElement("script");
  s.src = src;
  s.async = false;
  document.body.appendChild(s);
 });
})();
