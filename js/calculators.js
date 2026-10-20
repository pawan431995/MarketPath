// Calculators hub (calculators.html). Two views:
//  - Directory: search, category chips, popular calculators and every calculator grouped by category.
//  - Detail (#<id>, optionally #<id>?input=value&...): live inputs, results, chart, table and the method.
// Definitions are registered by calc-defs-*.js into window.CALCS. Maths: calc-math.js. Charts: calc-charts.js.
// Each calculator also has its own page, pages/<id>-calculator.html (made by tools/build-seo.js), which sets
// window.MP_PAGE = { calc: id } and opens that calculator. Old links (calculators.html#<id>) move there.
(function () {
 const CALCS = window.CALCS || [];
 const BY_ID = new Map(CALCS.map(c => [c.id, c]));
 const PAGE_CALC = window.MP_PAGE && BY_ID.has(window.MP_PAGE.calc) ? window.MP_PAGE.calc : null;
 const DOC_TITLE = document.title; // the page's own search-friendly title, kept for English
 const calcHref = id => `${encodeURIComponent(id)}-calculator.html`;
 // Address after an input change: the calculator's own page, with changed inputs in the hash for sharing.
 const stateUrl = (id, q) => id === PAGE_CALC ? (q ? `#${id}?${q}` : location.pathname) : `#${id}${q ? "?" + q : ""}`;

 const CATS = [
  { id: "personal", icon: "◔", en: "Personal finance & budgeting", hi: "व्यक्तिगत वित्त और बजट" },
  { id: "invest", icon: "↗", en: "Investing & wealth building", hi: "निवेश और संपत्ति" },
  { id: "retire", icon: "◷", en: "Retirement planning", hi: "रिटायरमेंट योजना" },
  { id: "loans", icon: "⇄", en: "Loans & debt", hi: "लोन और कर्ज़" },
  { id: "property", icon: "⌂", en: "Real estate & mortgage", hi: "रियल एस्टेट और होम लोन" },
  { id: "tax", icon: "§", en: "Tax", hi: "टैक्स" },
  { id: "business", icon: "▤", en: "Business & corporate finance", hi: "बिज़नेस और कॉर्पोरेट वित्त" }
 ];
 const CAT = new Map(CATS.map(c => [c.id, c]));
 const POPULAR = ["sip", "emi", "income-tax", "step-up-sip", "retirement", "fire", "compound-interest", "fd"];

 const CURRENCIES = {
  INR: { sym: "₹", locale: "en-IN", label: "₹ INR" },
  USD: { sym: "$", locale: "en-US", label: "$ USD" },
  EUR: { sym: "€", locale: "en-IE", label: "€ EUR" },
  GBP: { sym: "£", locale: "en-GB", label: "£ GBP" }
 };

 const UI = {
  en: {
   navLearn: "Learn", navTools: "Calculators", navGlossary: "Glossary", eyebrow: "CALCULATORS", title: "Financial calculators",
   intro: "Plan budgets, investments, retirement, loans, property, tax and business decisions. Results update as you type. Every result is an estimate: returns are not guaranteed.",
   search: n => `Search ${n} calculators…`, all: "All", popular: "Popular", currency: "Currency", back: "All calculators",
   reset: "Reset", copy: "Copy link", copied: "Link copied", inputs: "Your inputs", results: "Results", how: "How this is calculated",
   notes: "Things to keep in mind", related: "More in this category", csv: "Download CSV", none: "No calculator matches your search. Try another word.",
   jump: "Switch calculator", addRow: "Add row", remove: "Remove", total: "Total", fixedCurrency: "Indian rules, shown in ₹", open: "Open",
   count: n => `${n} calculators`, invalid: "Check the highlighted inputs.",
   disclaimer: "These calculators show illustrative outcomes only. Returns are not guaranteed. Tax rules and rates change; verify them before acting. Nothing here is financial, tax or legal advice.",
   footerText: "Learn the market, one concept at a time.", disclaimerLink: "Disclaimer", privacyLink: "Privacy policy", contactLink: "Contact"
  },
  hi: {
   navLearn: "सीखें", navTools: "कैलकुलेटर", navGlossary: "शब्दावली", eyebrow: "कैलकुलेटर", title: "वित्तीय कैलकुलेटर",
   intro: "बजट, निवेश, रिटायरमेंट, लोन, प्रॉपर्टी, टैक्स और बिज़नेस फ़ैसलों की योजना बनाएँ। टाइप करते ही परिणाम बदलते हैं। हर परिणाम एक अनुमान है: रिटर्न की गारंटी नहीं है।",
   search: n => `${n} कैलकुलेटर खोजें…`, all: "सभी", popular: "लोकप्रिय", currency: "मुद्रा", back: "सभी कैलकुलेटर",
   reset: "रीसेट", copy: "लिंक कॉपी करें", copied: "लिंक कॉपी हुआ", inputs: "आपके इनपुट", results: "परिणाम", how: "गणना कैसे होती है",
   notes: "ध्यान रखें", related: "इस श्रेणी में और", csv: "CSV डाउनलोड करें", none: "आपकी खोज से कोई कैलकुलेटर नहीं मिला। कोई और शब्द आज़माएँ।",
   jump: "कैलकुलेटर बदलें", addRow: "पंक्ति जोड़ें", remove: "हटाएँ", total: "कुल", fixedCurrency: "भारतीय नियम, ₹ में", open: "खोलें",
   count: n => `${n} कैलकुलेटर`, invalid: "हाइलाइट किए गए इनपुट जाँचें।",
   disclaimer: "ये कैलकुलेटर केवल उदाहरण परिणाम दिखाते हैं। रिटर्न की गारंटी नहीं है। टैक्स नियम और दरें बदलती हैं; कदम उठाने से पहले जाँच लें। यहाँ कुछ भी वित्तीय, टैक्स या कानूनी सलाह नहीं है।",
   footerText: "एक-एक अवधारणा करके बाज़ार सीखें।", disclaimerLink: "अस्वीकरण", privacyLink: "गोपनीयता नीति", contactLink: "संपर्क"
  }
 };

 const STORE_KEY = "mp-calc-v1";
 const store = (function () {
  try { const s = JSON.parse(localStorage.getItem(STORE_KEY)); if (s && typeof s === "object") return Object.assign({ currency: "INR", inputs: {} }, s); } catch (e) { /* storage unavailable */ }
  return { currency: "INR", inputs: {} };
 })();
 function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* storage unavailable */ } }

 const app = document.getElementById("calcApp");
 const esc = s => MP.esc(s);
 let lang = MP.getLang() === "hi" ? "hi" : "en";
 const t = () => UI[lang];
 const title = c => (lang === "hi" && c.hi ? c.hi[0] : c.title);
 const desc = c => (lang === "hi" && c.hi ? c.hi[1] : c.desc);
 const catName = id => (CAT.get(id) || {})[lang] || id;

 // ---------- Formatting ----------
 function formatter(cur) {
  const c = CURRENCIES[cur] || CURRENCIES.INR, loc = c.locale;
  const num = (n, d = 0) => (Number.isFinite(n) ? Number(n).toLocaleString(loc, { minimumFractionDigits: d, maximumFractionDigits: d }) : "—");
  const sign = n => (n < 0 ? "−" : "");
  const money = (n, d) => {
   if (!Number.isFinite(n)) return "—";
   const dd = d !== undefined ? d : Math.abs(n) < 100 && Math.round(n) !== n ? 2 : 0;
   return `${sign(n)}${c.sym}${num(Math.abs(n), dd)}`;
  };
  const short = (n, digits) => {
   const a = Math.abs(n), trim = v => String(+v.toFixed(digits));
   if (cur === "INR") {
    if (a >= 1e7) return `${trim(a / 1e7)} Cr`;
    if (a >= 1e5) return `${trim(a / 1e5)} L`;
   } else {
    if (a >= 1e9) return `${trim(a / 1e9)}B`;
    if (a >= 1e6) return `${trim(a / 1e6)}M`;
   }
   if (a >= 1e3) return `${trim(a / 1e3)}K`;
   return trim(a);
  };
  const words = n => {
   const a = Math.abs(n), trim = v => String(+v.toFixed(2));
   let w;
   if (cur === "INR") w = a >= 1e7 ? `${trim(a / 1e7)} crore` : a >= 1e5 ? `${trim(a / 1e5)} lakh` : a >= 1e3 ? `${trim(a / 1e3)} thousand` : num(a, 0);
   else w = a >= 1e9 ? `${trim(a / 1e9)} billion` : a >= 1e6 ? `${trim(a / 1e6)} million` : a >= 1e3 ? `${trim(a / 1e3)} thousand` : num(a, 0);
   return `${sign(n)}${c.sym}${w}`;
  };
  const months = m => {
   if (!Number.isFinite(m)) return "—";
   const total = Math.round(m), y = Math.floor(total / 12), mo = total % 12;
   return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", mo ? `${mo} mo` : ""].filter(Boolean).join(" ") || "0 mo";
  };
  return {
   cur, sym: c.sym, num, money, words, months,
   compact: n => (Number.isFinite(n) ? `${sign(n)}${c.sym}${short(n, 1)}` : "—"),
   compactNum: n => (Number.isFinite(n) ? `${sign(n)}${short(n, 1)}` : "—"),
   pct: (n, d = 2) => (Number.isFinite(n) ? `${num(n, d)}%` : "—"),
   years: y => months(y * 12)
  };
 }
 const currencyOf = c => c.currency || store.currency;

 // ---------- Routing ----------
 function parseHash() {
  const h = decodeURIComponent(location.hash.slice(1));
  const [id, query] = h.split("?");
  return { id: BY_ID.has(id) ? id : null, params: new URLSearchParams(query || "") };
 }
 function route() {
  const { id, params } = parseHash();
  if (id && !PAGE_CALC) { location.replace(calcHref(id) + location.hash); return; }
  if (id) openCalc(id, params); else if (PAGE_CALC) openCalc(PAGE_CALC, params); else renderDirectory();
 }
 window.addEventListener("hashchange", route);

 // ---------- Directory ----------
 let filterCat = "all", query = "";
 function matches(c, tokens) {
  if (!tokens.length) return true;
  const hay = `${c.title} ${c.desc} ${c.keywords || ""} ${catName(c.cat)} ${c.hi ? c.hi.join(" ") : ""}`.toLowerCase();
  return tokens.every(tok => hay.includes(tok));
 }
 function card(c) {
  return `<a class="calc-card" href="${esc(calcHref(c.id))}"><span class="calc-card-icon" aria-hidden="true">${esc(c.icon || CAT.get(c.cat).icon)}</span><span class="calc-card-text"><strong>${esc(title(c))}</strong><small>${esc(desc(c))}</small></span></a>`;
 }
 function renderDirectory() {
  document.title = lang === "en" ? DOC_TITLE : `${t().title} — MarketPathAcademy`;
  const u = t();
  app.innerHTML = `
   <div class="calc-dir">
    <div class="calc-dir-head">
     <div class="eyebrow">${esc(u.eyebrow)}</div>
     <h1 class="calc-h1">${esc(u.title)}</h1>
     <p class="calc-intro">${esc(u.intro)}</p>
     <div class="calc-toolbar">
      <div class="calc-search"><span aria-hidden="true">⌕</span><input id="calcSearch" type="search" autocomplete="off" placeholder="${esc(u.search(CALCS.length))}" aria-label="${esc(u.search(CALCS.length))}" value="${esc(query)}"></div>
      ${currencySelect()}
     </div>
     <div class="calc-chips" role="group" aria-label="Categories">
      <button type="button" class="calc-chip${filterCat === "all" ? " active" : ""}" data-cat="all" aria-pressed="${filterCat === "all"}">${esc(u.all)} <small>${CALCS.length}</small></button>
      ${CATS.map(c => `<button type="button" class="calc-chip${filterCat === c.id ? " active" : ""}" data-cat="${c.id}" aria-pressed="${filterCat === c.id}"><span aria-hidden="true">${c.icon}</span> ${esc(c[lang])} <small>${CALCS.filter(x => x.cat === c.id).length}</small></button>`).join("")}
     </div>
    </div>
    <div id="calcDirBody"></div>
   </div>`;
  renderDirectoryBody();
  const input = document.getElementById("calcSearch");
  input.addEventListener("input", () => { query = input.value; renderDirectoryBody(); });
  input.addEventListener("keydown", e => {
   if (e.key !== "Enter") return;
   const first = app.querySelector("#calcDirBody .calc-card");
   if (first) location.href = first.getAttribute("href");
  });
  app.querySelectorAll(".calc-chip").forEach(b => b.addEventListener("click", () => {
   filterCat = b.dataset.cat;
   app.querySelectorAll(".calc-chip").forEach(x => { const on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-pressed", String(on)); });
   renderDirectoryBody();
  }));
  bindCurrency(renderDirectoryBody);
 }
 function renderDirectoryBody() {
  const u = t(), tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const visible = CALCS.filter(c => (filterCat === "all" || c.cat === filterCat) && matches(c, tokens));
  let html = "";
  if (!tokens.length && filterCat === "all") {
   html += `<section class="calc-section"><h2>${esc(u.popular)}</h2><div class="calc-grid">${POPULAR.map(id => BY_ID.get(id)).filter(Boolean).map(card).join("")}</div></section>`;
  }
  CATS.forEach(cat => {
   const list = visible.filter(c => c.cat === cat.id);
   if (list.length) html += `<section class="calc-section" id="cat-${cat.id}"><h2><span aria-hidden="true">${cat.icon}</span> ${esc(cat[lang])}</h2><div class="calc-grid">${list.map(card).join("")}</div></section>`;
  });
  if (!visible.length) html = `<p class="calc-empty">${esc(u.none)}</p>`;
  document.getElementById("calcDirBody").innerHTML = html;
 }

 function currencySelect(c) {
  if (c && c.currency) return `<span class="calc-fixed-cur">${esc(t().fixedCurrency)}</span>`;
  return `<label class="calc-cur"><span>${esc(t().currency)}</span><select id="calcCurrency">${Object.entries(CURRENCIES).map(([k, v]) => `<option value="${k}"${store.currency === k ? " selected" : ""}>${esc(v.label)}</option>`).join("")}</select></label>`;
 }
 function bindCurrency(after) {
  const sel = document.getElementById("calcCurrency");
  if (sel) sel.addEventListener("change", () => { store.currency = sel.value; save(); after(); });
 }

 // ---------- Detail ----------
 let current = null, values = null, lastCarry = null;

 function defaults(c) {
  const v = {};
  c.inputs.forEach(inp => { v[inp.id] = inp.type === "rows" ? inp.value.map(r => Object.assign({}, r)) : inp.value; });
  return v;
 }
 function openCalc(id, params) {
  const c = BY_ID.get(id);
  current = c;
  values = defaults(c);
  const saved = store.inputs[id];
  if (saved) Object.keys(values).forEach(k => { if (saved[k] !== undefined) values[k] = saved[k]; });
  params.forEach((val, key) => {
   const inp = c.inputs.find(i => i.id === key);
   if (!inp || inp.type === "rows") return;
   values[key] = inp.type === "select" || inp.type === "text" ? val : Number(val);
  });
  renderDetail();
  window.scrollTo(0, 0);
 }

 function renderDetail() {
  const c = current, u = t(), F = formatter(currencyOf(c));
  document.title = c.id === PAGE_CALC && lang === "en" ? DOC_TITLE : `${title(c)} — MarketPathAcademy`;
  const options = CATS.map(cat => `<optgroup label="${esc(cat[lang])}">${CALCS.filter(x => x.cat === cat.id).map(x => `<option value="${x.id}"${x.id === c.id ? " selected" : ""}>${esc(title(x))}</option>`).join("")}</optgroup>`).join("");
  const related = CALCS.filter(x => x.cat === c.cat && x.id !== c.id);
  app.innerHTML = `
   <div class="calc-detail">
    <nav class="calc-crumbs" aria-label="Breadcrumb"><a href="calculators.html">← ${esc(u.back)}</a><span aria-hidden="true">/</span><span>${esc(catName(c.cat))}</span></nav>
    <div class="calc-head">
     <span class="calc-head-icon" aria-hidden="true">${esc(c.icon || CAT.get(c.cat).icon)}</span>
     <div class="calc-head-text"><h1 class="calc-h1">${esc(title(c))}</h1><p class="calc-intro">${esc(desc(c))}</p></div>
    </div>
    <div class="calc-actions">
     <label class="calc-jump"><span class="sr-only">${esc(u.jump)}</span><select id="calcJump" aria-label="${esc(u.jump)}">${options}</select></label>
     ${currencySelect(c)}
     <button type="button" class="pp-btn" id="calcReset">↺ ${esc(u.reset)}</button>
     <button type="button" class="pp-btn" id="calcCopy">⧉ ${esc(u.copy)}</button>
    </div>
    <div class="calc-body${c.inputs.some(i => i.type === "rows" && i.fields.length >= 3) ? " calc-body-wide" : ""}">
     <form class="calc-inputs" id="calcForm" aria-label="${esc(u.inputs)}" novalidate>
      <h2 class="calc-panel-title">${esc(u.inputs)}</h2>
      ${c.inputs.map(inp => fieldHtml(inp, F)).join("")}
     </form>
     <div class="calc-results" id="calcResults" aria-live="polite"></div>
    </div>
    ${related.length ? `<section class="calc-related"><h2>${esc(u.related)}</h2><div class="calc-related-list">${related.map(x => `<a href="${esc(calcHref(x.id))}" class="calc-chip">${esc(x.icon || "")} ${esc(title(x))}</a>`).join("")}</div></section>` : ""}
   </div>`;
  bindForm(F);
  document.getElementById("calcJump").addEventListener("change", e => { location.href = calcHref(e.target.value); });
  document.getElementById("calcReset").addEventListener("click", () => {
   values = defaults(c);
   delete store.inputs[c.id];
   save();
   history.replaceState(null, "", stateUrl(c.id, ""));
   renderDetail();
  });
  document.getElementById("calcCopy").addEventListener("click", copyLink);
  bindCurrency(renderDetail);
  compute();
 }

 const UNIT = { percent: "%", years: "yrs", months: "mo" };
 function fieldHtml(inp, F) {
  const v = values[inp.id];
  const hidden = inp.showIf && !inp.showIf(values) ? " hidden" : "";
  const help = inp.help ? `<p class="ci-help">${esc(inp.help)}</p>` : "";
  if (inp.type === "rows") return rowsHtml(inp, F, hidden);
  if (inp.type === "select") {
   const opts = inp.options;
   if (opts.length <= 4 && !inp.dropdown) {
    return `<fieldset class="ci-field" data-wrap="${inp.id}"${hidden}><legend class="ci-label">${esc(inp.label)}</legend><div class="ci-seg">${opts.map(o => `<label><input type="radio" name="ci-${inp.id}" data-id="${inp.id}" value="${esc(o.value)}"${String(v) === String(o.value) ? " checked" : ""}><span>${esc(o.label)}</span></label>`).join("")}</div>${help}</fieldset>`;
   }
   return `<div class="ci-field" data-wrap="${inp.id}"${hidden}><label class="ci-label" for="ci-${inp.id}">${esc(inp.label)}</label><select id="ci-${inp.id}" data-id="${inp.id}">${opts.map(o => `<option value="${esc(o.value)}"${String(v) === String(o.value) ? " selected" : ""}>${esc(o.label)}</option>`).join("")}</select>${help}</div>`;
  }
  if (inp.type === "text") {
   return `<div class="ci-field" data-wrap="${inp.id}"${hidden}><label class="ci-label" for="ci-${inp.id}">${esc(inp.label)}</label><input class="ci-text" id="ci-${inp.id}" data-id="${inp.id}" type="text" value="${esc(v)}">${help}</div>`;
  }
  const pre = inp.type === "money" ? F.sym : "", post = UNIT[inp.type] || inp.unit || "";
  const slider = inp.slider === false ? "" : `<input type="range" class="ci-range" data-id="${inp.id}" min="${inp.min}" max="${inp.max}" step="${inp.step || 1}" value="${clamp(v, inp)}" aria-label="${esc(inp.label)}" tabindex="-1">`;
  return `<div class="ci-field" data-wrap="${inp.id}"${hidden}>
   <div class="ci-top"><label class="ci-label" for="ci-${inp.id}">${esc(inp.label)}</label>
    <span class="ci-num">${pre ? `<span class="ci-unit">${esc(pre)}</span>` : ""}<input id="ci-${inp.id}" data-id="${inp.id}" type="number" inputmode="decimal" min="${inp.min}" ${inp.hardMax ? `max="${inp.max}"` : ""} step="any" value="${esc(v)}">${post ? `<span class="ci-unit">${esc(post)}</span>` : ""}</span></div>
   ${slider}
   <p class="ci-hint" data-hint="${inp.id}">${esc(hintFor(inp, v, F))}</p>${help}
  </div>`;
 }
 const clamp = (v, inp) => Math.min(inp.max, Math.max(inp.min, Number(v) || 0));
 function hintFor(inp, v, F) {
  if (inp.type === "money" && Number(v) >= 1000) return F.words(Number(v));
  if (inp.type === "months" && Number(v) >= 12) return F.months(Number(v));
  return "";
 }

 function rowsHtml(inp, F, hidden) {
  const rows = values[inp.id] || [];
  const cols = inp.fields.map(f => f.width || "1fr").join(" ") + " 32px";
  const total = inp.total ? rows.reduce((s, r) => s + (Number(r[inp.total]) || 0), 0) : null;
  const cell = (f, r, i) => {
   const val = r[f.key] === undefined ? "" : r[f.key];
   const a = `data-rows="${inp.id}" data-row="${i}" data-field="${f.key}" aria-label="${esc(f.label)} ${i + 1}"`;
   if (f.type === "select") return `<select ${a}>${f.options.map(o => `<option value="${esc(o.value)}"${String(val) === String(o.value) ? " selected" : ""}>${esc(o.label)}</option>`).join("")}</select>`;
   if (f.type === "text") return `<input type="text" ${a} value="${esc(val)}">`;
   if (f.type === "date") return `<input type="date" ${a} value="${esc(val)}">`;
   const pre = f.type === "money" ? `<span class="ci-unit">${esc(F.sym)}</span>` : "";
   const post = f.type === "percent" ? `<span class="ci-unit">%</span>` : "";
   return `<span class="ci-num ci-num-row">${pre}<input type="number" inputmode="decimal" step="any" ${a} value="${esc(val)}">${post}</span>`;
  };
  return `<fieldset class="ci-field ci-rows" data-wrap="${inp.id}"${hidden}>
   <legend class="ci-label">${esc(inp.label)}${total !== null ? `<span class="ci-rows-total">${esc(t().total)} ${esc(F.money(total))}</span>` : ""}</legend>
   <div class="ci-rows-grid" style="grid-template-columns:${cols}">
    ${inp.fields.map(f => `<span class="ci-rows-h">${esc(f.label)}</span>`).join("")}<span></span>
    ${rows.map((r, i) => inp.fields.map(f => cell(f, r, i)).join("") + `<button type="button" class="ci-del" data-del="${inp.id}" data-row="${i}" aria-label="${esc(t().remove)} ${i + 1}" title="${esc(t().remove)}">✕</button>`).join("")}
   </div>
   <button type="button" class="ci-add" data-add="${inp.id}">+ ${esc(inp.addLabel || t().addRow)}</button>
   ${inp.help ? `<p class="ci-help">${esc(inp.help)}</p>` : ""}
  </fieldset>`;
 }

 function bindForm(F) {
  const form = document.getElementById("calcForm");
  form.addEventListener("submit", e => e.preventDefault());
  form.addEventListener("input", e => onField(e.target, F));
  form.addEventListener("change", e => onField(e.target, F));
  form.addEventListener("click", e => {
   const add = e.target.closest("[data-add]"), del = e.target.closest("[data-del]");
   if (!add && !del) return;
   const inp = current.inputs.find(i => i.id === (add ? add.dataset.add : del.dataset.del));
   const rows = values[inp.id];
   if (add) rows.push(Object.assign({}, inp.newRow ? inp.newRow(rows.length) : inp.value[0] || {}));
   else rows.splice(Number(del.dataset.row), 1);
   rerenderRows(inp, F);
   persist();
   compute();
  });
 }
 function rerenderRows(inp, F) {
  const wrap = app.querySelector(`[data-wrap="${inp.id}"]`);
  wrap.outerHTML = rowsHtml(inp, F, "");
 }
 function onField(el, F) {
  if (el.dataset.rows) {
   const inp = current.inputs.find(i => i.id === el.dataset.rows);
   const f = inp.fields.find(x => x.key === el.dataset.field);
   const row = values[inp.id][Number(el.dataset.row)];
   row[f.key] = f.type === "text" || f.type === "select" || f.type === "date" ? el.value : el.value === "" ? "" : Number(el.value);
   if (inp.total) {
    const total = values[inp.id].reduce((s, r) => s + (Number(r[inp.total]) || 0), 0);
    const tEl = app.querySelector(`[data-wrap="${inp.id}"] .ci-rows-total`);
    if (tEl) tEl.textContent = `${t().total} ${F.money(total)}`;
   }
  } else if (el.dataset.id) {
   const inp = current.inputs.find(i => i.id === el.dataset.id);
   if (inp.type === "select" || inp.type === "text") {
    values[inp.id] = el.value;
    // e.g. TVM: when "solve for" changes, the field that was being solved keeps the value just computed.
    if (current.carryOn && current.carryOn.includes(inp.id) && lastCarry && el.type !== "text") {
     Object.assign(values, lastCarry);
     lastCarry = null;
     const form = document.getElementById("calcForm");
     form.innerHTML = `<h2 class="calc-panel-title">${esc(t().inputs)}</h2>${current.inputs.map(i => fieldHtml(i, F)).join("")}`;
    }
   }
   else {
    if (el.value === "") return;
    const n = Number(el.value);
    values[inp.id] = n;
    const other = el.type === "range" ? document.getElementById(`ci-${inp.id}`) : app.querySelector(`.ci-range[data-id="${inp.id}"]`);
    if (other) other.value = el.type === "range" ? n : clamp(n, inp);
    const hint = app.querySelector(`[data-hint="${inp.id}"]`);
    if (hint) hint.textContent = hintFor(inp, n, F);
   }
  } else return;
  current.inputs.forEach(inp => {
   if (!inp.showIf) return;
   const w = app.querySelector(`[data-wrap="${inp.id}"]`);
   if (w) w.hidden = !inp.showIf(values);
  });
  persist();
  schedule();
 }
 let frame = 0;
 function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(() => { frame = 0; compute(); });
 }
 function persist() {
  store.inputs[current.id] = values;
  save();
  const params = new URLSearchParams();
  current.inputs.forEach(inp => { if (inp.type !== "rows" && values[inp.id] !== inp.value) params.set(inp.id, values[inp.id]); });
  const q = params.toString();
  history.replaceState(null, "", stateUrl(current.id, q));
 }
 function copyLink() {
  const btn = document.getElementById("calcCopy"), done = () => { btn.textContent = `✓ ${t().copied}`; setTimeout(() => { btn.textContent = `⧉ ${t().copy}`; }, 1800); };
  const url = location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, () => prompt(t().copy, url));
  else prompt(t().copy, url);
 }

 // ---------- Results ----------
 function compute() {
  const c = current, F = formatter(currencyOf(c)), out = document.getElementById("calcResults");
  if (!out) return;
  let res;
  try { res = c.compute(values, F); } catch (e) { res = { error: e.message }; }
  lastCarry = res && res.carry ? res.carry : null;
  if (!res || res.error) {
   out.innerHTML = `<div class="cr-error" role="alert">${esc(res && res.error ? res.error : t().invalid)}</div>`;
   return;
  }
  const u = t();
  const stat = s => `<div class="cr-stat${s.tone ? " cr-" + s.tone : ""}"><small>${esc(s.label)}</small><strong>${esc(s.value)}</strong>${s.sub ? `<span>${esc(s.sub)}</span>` : ""}</div>`;
  const charts = res.charts || (res.chart ? [res.chart] : []);
  const tables = res.tables || (res.table ? [res.table] : []);
  out.innerHTML = `
   <h2 class="calc-panel-title">${esc(u.results)}</h2>
   ${res.hero ? `<div class="cr-hero${res.hero.tone ? " cr-" + res.hero.tone : ""}"><small>${esc(res.hero.label)}</small><strong>${esc(res.hero.value)}</strong>${res.hero.sub ? `<p>${esc(res.hero.sub)}</p>` : ""}</div>` : ""}
   ${res.stats && res.stats.length ? `<div class="cr-stats">${res.stats.map(stat).join("")}</div>` : ""}
   ${res.callout ? `<p class="cr-callout cr-${res.callout.tone || "info"}">${esc(res.callout.text)}</p>` : ""}
   ${charts.map((_, i) => `<div class="cr-chart" data-chart="${i}"></div>`).join("")}
   ${tables.map((tb, i) => `<details class="cr-table"${tb.open ? " open" : ""}><summary>${esc(tb.title)}</summary><div class="cr-table-scroll"><table><thead><tr>${tb.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${tb.rows.map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><button type="button" class="pp-btn cr-csv" data-csv="${i}">⤓ ${esc(u.csv)}</button></details>`).join("")}
   ${res.notes && res.notes.length ? `<div class="cr-notes"><h3>${esc(u.notes)}</h3><ul>${res.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul></div>` : ""}
   ${c.how ? `<details class="cr-how"><summary>${esc(u.how)}</summary><ul>${c.how.map(h => `<li>${esc(h)}</li>`).join("")}</ul></details>` : ""}`;
  charts.forEach((spec, i) => CalcCharts.mount(out.querySelector(`[data-chart="${i}"]`), spec, F));
  out.querySelectorAll("[data-csv]").forEach(b => b.addEventListener("click", () => downloadCsv(tables[Number(b.dataset.csv)])));
 }
 function downloadCsv(tb) {
  const cell = v => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [tb.head, ...tb.rows].map(r => r.map(cell).join(",")).join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
  a.download = `${current.id}-${(tb.file || "table")}.csv`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
 }

 // ---------- Page chrome and language ----------
 function applyChrome() {
  MP.applyText(UI, lang);
  const sel = document.getElementById("languageSelect");
  if (sel) sel.value = lang;
 }
 const langSel = document.getElementById("languageSelect");
 if (langSel) langSel.addEventListener("change", e => {
  lang = e.target.value === "hi" ? "hi" : "en";
  MP.setLang(lang);
  applyChrome();
  route();
 });
 MP.setupMenu();
 const yearEl = document.getElementById("year");
 if (yearEl) yearEl.textContent = new Date().getFullYear();
 applyChrome();
 route();
 // ADS-OFF: if (typeof placeAdSlots === "function") placeAdSlots(1);
})();
