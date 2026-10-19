// Index ribbon under the header: NIFTY 50, SENSEX, sector indices and India VIX, scrolling like a ticker.
// Data comes from data/indices.js (window.MP_INDICES), written by tools/fetch-indices.js on a schedule
// (browsers cannot read NSE or Yahoo directly from a static site). The ribbon reloads that file every
// 5 minutes while the market is open and every 30 minutes otherwise, and pauses while the tab is hidden.
// Needs site-chrome.js (MPChrome) for the site root and language.
(function () {
 if (!window.MPChrome) return;
 const OPEN_REFRESH = 5 * 60 * 1000, CLOSED_REFRESH = 30 * 60 * 1000, LIVE_WITHIN = 20 * 60 * 1000;
 const T = {
  en: { label: "Market indices", live: "Live", delayed: "Delayed", closed: "Market closed", asOf: "as of", ist: "IST", note: "Updates every 5 min · not for trading", pause: "Pause scrolling", play: "Resume scrolling" },
  hi: { label: "बाज़ार सूचकांक", live: "लाइव", delayed: "विलंबित", closed: "बाज़ार बंद", asOf: "समय", ist: "IST", note: "हर 5 मिनट में अपडेट · ट्रेडिंग के लिए नहीं", pause: "स्क्रॉल रोकें", play: "स्क्रॉल चलाएँ" }
 };
 const lang = () => MPChrome.lang();
 const header = document.querySelector(".site-header");
 if (!header) return;

 const bar = document.createElement("div");
 bar.className = "ticker";
 bar.hidden = true;
 bar.setAttribute("role", "region");
 bar.innerHTML = `<div class="ticker-status"><span class="ticker-dot" aria-hidden="true"></span><span class="ticker-state"></span><small class="ticker-time"></small></div>
  <div class="ticker-viewport"><div class="ticker-track"></div></div>
  <button type="button" class="ticker-toggle" aria-pressed="false"></button>`;
 header.insertAdjacentElement("afterend", bar);
 const track = bar.querySelector(".ticker-track");
 const toggle = bar.querySelector(".ticker-toggle");
 let paused = false, timer = null, loadedAt = 0;
 try { paused = localStorage.getItem("mp-ticker-paused") === "1"; } catch (e) { /* storage unavailable */ }

 // Indian market clock: Monday–Friday, 9:15 am–3:30 pm IST (exchange holidays are not known here).
 function istParts(d) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(d).map(x => [x.type, x.value]));
  return { day: p.weekday, mins: Number(p.hour) * 60 + Number(p.minute) };
 }
 function marketOpenNow() {
  const { day, mins } = istParts(new Date());
  return !["Sat", "Sun"].includes(day) && mins >= 555 && mins <= 930;
 }
 const fmt = n => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
 const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

 function item(i) {
  const up = i.change >= 0, cls = i.name === "INDIA VIX" ? "flat" : up ? "up" : "down";
  return `<span class="ticker-item"><strong>${esc(i.name)}</strong><span class="ticker-last">${fmt(i.last)}</span><span class="ticker-chg ${cls}">${up ? "▲" : "▼"} ${fmt(Math.abs(i.change))} (${up ? "+" : "−"}${Math.abs(i.pct).toFixed(2)}%)</span></span>`;
 }

 function render() {
  const d = window.MP_INDICES, t = T[lang()];
  if (!d || !d.items || !d.items.length) return;
  bar.setAttribute("aria-label", t.label);
  const list = d.items.map(item).join("");
  // Two copies make the loop seamless; the copy is hidden from screen readers.
  track.innerHTML = `<div class="ticker-group">${list}</div><div class="ticker-group" aria-hidden="true">${list}</div>`;
  const mt = d.marketTime ? new Date(d.marketTime) : null;
  const open = marketOpenNow(), fresh = mt && Date.now() - mt.getTime() < LIVE_WITHIN;
  const state = open ? (fresh ? "live" : "delayed") : "closed";
  bar.dataset.state = state;
  bar.querySelector(".ticker-state").textContent = t[state];
  bar.querySelector(".ticker-time").textContent = mt
   ? `${t.asOf} ${mt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })} ${t.ist}`
   : "";
  bar.title = t.note;
  toggle.textContent = paused ? "▶" : "❚❚";
  toggle.setAttribute("aria-label", paused ? t.play : t.pause);
  toggle.setAttribute("aria-pressed", String(paused));
  bar.classList.toggle("is-paused", paused);
  // About 45 pixels a second, whatever the number of indices.
  requestAnimationFrame(() => {
   const w = track.firstElementChild ? track.firstElementChild.scrollWidth : 0;
   track.style.animationDuration = `${Math.max(20, Math.round(w / 45))}s`;
  });
  bar.hidden = false;
 }

 function load() {
  const s = document.createElement("script");
  s.src = `${MPChrome.url("data/indices.js")}?t=${Date.now()}`; // bypass the cache on each refresh
  s.onload = () => { loadedAt = Date.now(); render(); s.remove(); schedule(); };
  s.onerror = () => { s.remove(); schedule(); }; // keep showing the last data, if any
  document.head.appendChild(s);
 }
 function schedule() {
  clearTimeout(timer);
  if (document.hidden) return;
  timer = setTimeout(load, marketOpenNow() ? OPEN_REFRESH : CLOSED_REFRESH);
 }
 document.addEventListener("visibilitychange", () => {
  if (document.hidden) { clearTimeout(timer); return; }
  if (Date.now() - loadedAt > (marketOpenNow() ? OPEN_REFRESH : CLOSED_REFRESH)) load(); else schedule();
 });
 toggle.addEventListener("click", () => {
  paused = !paused;
  try { localStorage.setItem("mp-ticker-paused", paused ? "1" : "0"); } catch (e) { /* storage unavailable */ }
  render();
 });
 const sel = document.getElementById("languageSelect");
 if (sel) sel.addEventListener("change", () => setTimeout(render, 0));

 load();
})();
