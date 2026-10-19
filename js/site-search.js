// Site-wide search: lessons and their sections, glossary terms, calculators, patterns and indicators.
// The index (js/search-index.js, built by tools/build-search-index.js) loads the first time search opens.
// Entry format: [kind, url (from site root), enTitle, enText, enContext, hiTitle, hiText, hiContext, hiddenKeywords?]
(function () {
 const KINDS = {
  page: { en: "Tools & pages", hi: "टूल और पेज", icon: "◆" },
  lesson: { en: "Lessons", hi: "पाठ", icon: "▤" },
  calc: { en: "Calculators", hi: "कैलकुलेटर", icon: "₹" },
  term: { en: "Glossary", hi: "शब्दावली", icon: "Aa" },
  section: { en: "Inside lessons", hi: "पाठों के अंदर", icon: "§" },
  pattern: { en: "Patterns", hi: "पैटर्न", icon: "▮" },
  indicator: { en: "Indicators", hi: "इंडिकेटर", icon: "⌇" }
 };
 const ORDER = ["page", "lesson", "calc", "term", "section", "pattern", "indicator"];
 const UI = {
  en: { placeholder: "Search lessons, terms, calculators…", loading: "Loading search…", none: "No results. Try a shorter or different word.", hint: "↑ ↓ to move · Enter to open · Esc to close", suggest: "Try:", close: "Close search", failed: "Search could not load. Check your connection and try again." },
  hi: { placeholder: "पाठ, शब्द, कैलकुलेटर खोजें…", loading: "खोज लोड हो रही है…", none: "कोई परिणाम नहीं। छोटा या अलग शब्द आज़माएँ।", hint: "↑ ↓ चुनें · Enter खोलें · Esc बंद करें", suggest: "आज़माएँ:", close: "खोज बंद करें", failed: "खोज लोड नहीं हो सकी। कनेक्शन जाँचकर दोबारा कोशिश करें।" }
 };
 const SUGGEST = { en: ["SIP", "stop loss", "income tax", "candlestick", "P/E ratio", "options", "EMI", "demat"], hi: ["SIP", "स्टॉप लॉस", "इनकम टैक्स", "कैंडलस्टिक", "P/E", "ऑप्शन", "EMI", "डीमैट"] };

 const chrome = () => window.MPChrome || { url: p => p, lang: () => "en" };
 const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
 const norm = s => String(s).toLowerCase().replace(/&/g, "").replace(/[^\p{L}\p{N}\p{M}\s]+/gu, " ").replace(/\s+/g, " ").trim();

 let overlay, input, list, status, results = [], active = -1, prepared = null, loading = false, lastFocus = null;

 function build() {
  overlay = document.createElement("div");
  overlay.className = "ss-overlay";
  overlay.hidden = true;
  overlay.innerHTML = `<div class="ss-dialog" role="dialog" aria-modal="true" aria-labelledby="ssInput">
   <div class="ss-input"><span aria-hidden="true">⌕</span><input id="ssInput" type="search" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="ssList" aria-autocomplete="list"><button type="button" class="ss-close"><kbd>Esc</kbd></button></div>
   <p class="ss-status" aria-live="polite"></p>
   <ul id="ssList" class="ss-results" role="listbox"></ul>
   <p class="ss-foot"></p></div>`;
  document.body.appendChild(overlay);
  input = overlay.querySelector("input");
  list = overlay.querySelector(".ss-results");
  status = overlay.querySelector(".ss-status");
  overlay.addEventListener("mousedown", e => { if (e.target === overlay) close(); });
  overlay.querySelector(".ss-close").addEventListener("click", close);
  input.addEventListener("input", run);
  input.addEventListener("keydown", e => {
   if (e.key === "Escape") { e.preventDefault(); close(); }
   else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    if (!results.length) return;
    e.preventDefault();
    active = (active + (e.key === "ArrowDown" ? 1 : -1) + results.length) % results.length;
    paintActive();
   } else if (e.key === "Enter") {
    const r = results[active >= 0 ? active : 0];
    if (r) { e.preventDefault(); go(r); }
   } else if (e.key === "Tab") {
    // keep focus inside the dialog
    const f = [...overlay.querySelectorAll("input,button,a")];
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
   }
  });
  list.addEventListener("click", e => {
   const s = e.target.closest("[data-suggest]");
   if (s) { input.value = s.dataset.suggest; run(); input.focus(); }
  });
 }

 function texts() { return UI[chrome().lang()]; }

 function open() {
  if (!overlay) build();
  lastFocus = document.activeElement;
  const u = texts();
  input.placeholder = u.placeholder;
  overlay.querySelector(".ss-foot").textContent = u.hint;
  overlay.querySelector(".ss-close").setAttribute("aria-label", u.close);
  overlay.hidden = false;
  document.body.classList.add("ss-open");
  input.focus();
  input.select();
  if (!prepared) load(); else run();
 }
 function close() {
  if (!overlay || overlay.hidden) return;
  overlay.hidden = true;
  document.body.classList.remove("ss-open");
  if (lastFocus && lastFocus.focus) lastFocus.focus();
 }

 function load() {
  if (loading) return;
  if (window.MP_SEARCH_INDEX) { prepare(); run(); return; }
  loading = true;
  status.textContent = texts().loading;
  const s = document.createElement("script");
  s.src = chrome().url("js/search-index.js");
  s.onload = () => { loading = false; prepare(); run(); };
  s.onerror = () => { loading = false; status.textContent = texts().failed; };
  document.head.appendChild(s);
 }

 // Pre-normalises titles and text once, per language.
 function prepare() {
  prepared = window.MP_SEARCH_INDEX.map(e => ({
   kind: e[0], url: e[1], en: [e[2], e[3], e[4]], hi: [e[5] || e[2], e[6] || e[3], e[7] || e[4]],
   tEn: norm(e[2]).split(" "), tHi: norm(e[5] || "").split(" "), bodyEn: norm(`${e[3]} ${e[4]} ${e[8] || ""}`), bodyHi: norm(`${e[6] || ""} ${e[7] || ""}`)
  }));
 }

 const KIND_BOOST = { page: 3, lesson: 3, calc: 2, term: 1.5, section: 0, pattern: 1, indicator: 1 };
 function score(e, tokens, phrase) {
  let s = 0;
  for (const tok of tokens) {
   const inTitle = e.tEn.some(w => w.startsWith(tok)) || e.tHi.some(w => w.startsWith(tok));
   if (inTitle) { s += 4; continue; }
   const pat = tok.length < 3 ? new RegExp(`(^|\\s)${tok}(\\s|$)`) : null;
   const inBody = pat ? pat.test(e.bodyEn) || pat.test(e.bodyHi) : e.bodyEn.includes(tok) || e.bodyHi.includes(tok);
   if (!inBody) return -1;
   s += 1;
  }
  if (phrase && (norm(e.en[0]) === phrase || norm(e.hi[0]) === phrase)) s += 6;
  return s + (KIND_BOOST[e.kind] || 0);
 }

 function run() {
  if (!prepared) return;
  const u = texts(), lang = chrome().lang(), q = norm(input.value);
  active = -1;
  if (!q) {
   results = [];
   status.textContent = "";
   list.innerHTML = `<li class="ss-suggest" role="presentation">${esc(u.suggest)} ${SUGGEST[lang].map(s => `<button type="button" data-suggest="${esc(s)}">${esc(s)}</button>`).join("")}</li>`;
   return;
  }
  const tokens = q.split(" ").filter(Boolean);
  const scored = [];
  prepared.forEach(e => { const s = score(e, tokens, q); if (s >= 0) scored.push([s, e]); });
  scored.sort((a, b) => b[0] - a[0]);
  // Up to 6 per kind, 30 in all, shown in a fixed kind order.
  const byKind = {};
  scored.forEach(([, e]) => { (byKind[e.kind] = byKind[e.kind] || []).length < 6 && byKind[e.kind].push(e); });
  results = [];
  let html = "";
  ORDER.forEach(k => {
   const group = byKind[k];
   if (!group) return;
   html += `<li class="ss-group" role="presentation">${esc(KINDS[k][lang])}</li>`;
   group.forEach(e => {
    const i = results.length;
    results.push(e);
    const [title, text, ctx] = e[lang];
    html += `<li role="option" id="ssOpt${i}" class="ss-item" aria-selected="false"><a href="${esc(chrome().url(e.url))}" tabindex="-1"><span class="ss-icon" aria-hidden="true">${esc(KINDS[k].icon)}</span><span class="ss-body"><strong>${mark(title, tokens)}</strong>${ctx ? `<small class="ss-ctx">${esc(ctx)}</small>` : ""}${text ? `<span class="ss-text">${mark(snippet(text, tokens), tokens)}</span>` : ""}</span></a></li>`;
   });
  });
  list.innerHTML = html;
  status.textContent = results.length ? "" : u.none;
  if (results.length) { active = 0; paintActive(); }
 }

 function snippet(text, tokens) {
  const low = text.toLowerCase();
  let at = -1;
  for (const tok of tokens) { at = low.indexOf(tok); if (at >= 0) break; }
  if (at < 60) return text.length > 150 ? text.slice(0, 150) + "…" : text;
  return "…" + text.slice(at - 50, at + 110) + "…";
 }
 // Highlights query words in one pass (wrapping one match at a time could match inside earlier <mark> tags).
 function mark(text, tokens) {
  const toks = tokens.filter(t => t.length > 1).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!toks.length) return esc(text);
  return String(text).split(new RegExp(`(${toks.join("|")})`, "gi")).map((part, i) => (i % 2 ? `<mark>${esc(part)}</mark>` : esc(part))).join("");
 }
 function paintActive() {
  list.querySelectorAll(".ss-item").forEach((li, i) => {
   const on = i === active;
   li.classList.toggle("active", on);
   li.setAttribute("aria-selected", String(on));
   if (on) li.scrollIntoView({ block: "nearest" });
  });
  input.setAttribute("aria-activedescendant", active >= 0 ? `ssOpt${active}` : "");
 }
 function go(e) {
  const href = chrome().url(e.url);
  close();
  location.href = href;
  // Same page with a different #section: the hashchange does not reload, so scroll explicitly.
  setTimeout(() => { const id = href.split("#")[1]; const el = id && document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
 }

 window.MPSearch = { open, close };
})();
