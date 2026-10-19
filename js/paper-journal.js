// Trading journal and diagnostics for the paper-trading terminal.
// - Every closed trade (paper trading or bar replay) becomes a journal entry. The post-trade form asks for the
//   skill behind the trade, why you entered and exited, whether you followed your plan, your emotion and any
//   mistakes. While "mandatory logging" is on, the form cannot be skipped.
// - Entries are kept in this browser's IndexedDB (falling back to localStorage when IndexedDB is unavailable)
//   and can be exported and imported as JSON.
// - The Journal section shows win rate (overall and last 20), expectancy, profit factor, average R, maximum and
//   current drawdown, an equity curve, a skill grid that flags underperforming skills, and the cost of mistakes.
// Needs paper-costs.js (disclosure pop-ups). api: { esc, money, signed, capital, toast(text, kind), busy() -> bool,
// onChange() }
const PaperJournal = (function () {
 const SKILLS = ["Trend following", "Breakout", "Pullback / retracement", "Reversal", "Support and resistance", "Candlestick pattern",
  "Chart pattern", "Indicator signal", "Momentum", "Range trading", "Gap trading", "Mean reversion", "News or event"];
 const MISTAKES = ["No stop-loss", "Moved my stop-loss", "Entered too early", "Entered too late", "Exited too early", "Held a loser too long",
  "Position too large", "FOMO (chased the price)", "Revenge trade", "Ignored my plan", "Overtrading"];
 const EMOTIONS = ["Calm", "Confident", "Hesitant", "Anxious", "Fearful", "Greedy", "Excited", "Frustrated"];
 const EXITS = ["Target reached", "Stop-loss hit", "Signal reversed", "Time-based exit", "Auto square-off", "Took a quick profit", "Fear or nerves", "Other"];
 const PLAN = ["Yes", "Partly", "No"];
 const MIN_REASON = 15;
 const PREFS_KEY = "mp-journal-prefs";

 // ---------- Storage: IndexedDB, or localStorage when IndexedDB is blocked ----------
 const store = (function () {
  const DB = "marketpath", STORE = "journal", FALLBACK = "mp-journal-fallback";
  let dbp = null, fallback = null;
  function open() {
   if (dbp) return dbp;
   dbp = new Promise((resolve, reject) => {
    if (!window.indexedDB) { reject(new Error("no indexedDB")); return; }
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => { const s = req.result.createObjectStore(STORE, { keyPath: "id" }); s.createIndex("closedAt", "closedAt"); };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error("blocked"));
   }).catch(() => null);
   return dbp;
  }
  function fb() {
   if (!fallback) { try { fallback = JSON.parse(localStorage.getItem(FALLBACK)) || {}; } catch (e) { fallback = {}; } }
   return fallback;
  }
  function fbSave() { try { localStorage.setItem(FALLBACK, JSON.stringify(fallback)); } catch (e) { /* storage full or blocked */ } }
  const tx = (db, mode, fn) => new Promise((resolve, reject) => {
   const t = db.transaction(STORE, mode), s = t.objectStore(STORE), out = fn(s);
   t.oncomplete = () => resolve(out && "result" in out ? out.result : undefined);
   t.onerror = () => reject(t.error);
  });
  return {
   async all() { const db = await open(); return db ? tx(db, "readonly", s => s.getAll()) : Object.values(fb()); },
   async put(e) { const db = await open(); if (db) return tx(db, "readwrite", s => { s.put(e); }); fb()[e.id] = e; fbSave(); },
   async putMany(list) { const db = await open(); if (db) return tx(db, "readwrite", s => { list.forEach(e => s.put(e)); }); list.forEach(e => { fb()[e.id] = e; }); fbSave(); },
   async remove(id) { const db = await open(); if (db) return tx(db, "readwrite", s => { s.delete(id); }); delete fb()[id]; fbSave(); },
   async kind() { return (await open()) ? "IndexedDB" : "localStorage (IndexedDB unavailable)"; }
  };
 })();

 // ---------- Statistics ----------
 const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
 function rMultiple(e) {
  if (!(e.stop > 0) || !(e.entry > 0)) return null;
  const risk = Math.abs(e.entry - e.stop) * e.qty;
  return risk > 0 ? e.pnl / risk : null;
 }
 function stats(list, capital) {
  const n = list.length, wins = list.filter(e => e.pnl > 0), losses = list.filter(e => e.pnl <= 0);
  const grossWin = sum(wins, e => e.pnl), grossLoss = -sum(losses, e => e.pnl);
  const last = list.slice(-20), rs = list.map(rMultiple).filter(r => r !== null);
  // Equity after each trade, in the order the trades closed; drawdown is measured from the running peak.
  let eq = capital, peak = capital, maxDd = 0, maxDdPct = 0, ddFrom = null, ddTo = null, peakAt = null;
  const curve = [{ i: 0, eq }];
  list.forEach((e, i) => {
   eq += e.pnl;
   if (eq > peak) { peak = eq; peakAt = i; }
   const dd = peak - eq;
   if (dd > maxDd) { maxDd = dd; maxDdPct = dd / peak; ddFrom = peakAt; ddTo = i; }
   curve.push({ i: i + 1, eq, t: e.closedAt });
  });
  return {
   n, wins: wins.length, losses: losses.length, winRate: n ? wins.length / n : null,
   lastWinRate: last.length ? last.filter(e => e.pnl > 0).length / last.length : null, lastN: last.length,
   net: sum(list, e => e.pnl), avgWin: wins.length ? grossWin / wins.length : 0, avgLoss: losses.length ? grossLoss / losses.length : 0,
   expectancy: n ? sum(list, e => e.pnl) / n : 0, profitFactor: grossLoss > 0 ? grossWin / grossLoss : grossWin > 0 ? Infinity : null,
   avgR: rs.length ? rs.reduce((a, b) => a + b, 0) / rs.length : null, rCount: rs.length,
   maxDd, maxDdPct, curDd: peak - eq, curDdPct: peak ? (peak - eq) / peak : 0, ddFrom, ddTo, curve, equity: eq
  };
 }
 function skillRows(list) {
  const groups = {};
  list.forEach(e => {
   const tags = [e.skill].concat(e.tags || []).filter(Boolean);
   new Set(tags).forEach(t => { (groups[t] = groups[t] || []).push(e); });
  });
  return Object.entries(groups).map(([skill, l]) => {
   const s = stats(l, 0), status = l.length < 3 ? "data" : s.expectancy < 0 || s.winRate < 0.4 ? "weak" : "ok";
   return { skill, n: l.length, winRate: s.winRate, net: s.net, expectancy: s.expectancy, pf: s.profitFactor, status };
  }).sort((a, b) => ({ weak: 0, ok: 1, data: 2 }[a.status] - { weak: 0, ok: 1, data: 2 }[b.status]) || a.expectancy - b.expectancy);
 }
 function mistakeRows(list) {
  const m = {};
  list.forEach(e => (e.mistakes || []).forEach(k => { (m[k] = m[k] || { n: 0, cost: 0 }); m[k].n++; m[k].cost += e.pnl; }));
  return Object.entries(m).map(([k, v]) => ({ mistake: k, n: v.n, cost: v.cost })).sort((a, b) => a.cost - b.cost);
 }

 function create(api) {
  const { esc, money, signed } = api;
  let entries = [], loaded = false, mount = null, filter = { source: "all", period: "all" }, editing = null, chart = null;
  let prefs = { mandatory: true };
  try { prefs = Object.assign(prefs, JSON.parse(localStorage.getItem(PREFS_KEY)) || {}); } catch (e) { /* storage blocked */ }
  const savePrefs = () => { try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch (e) { /* storage blocked */ } };
  const pending = () => entries.filter(e => e.status === "pending").sort((a, b) => a.closedAt - b.closedAt);
  const logged = () => entries.filter(e => e.status === "logged").sort((a, b) => a.closedAt - b.closedAt);
  const cls = n => (n > 0 ? "pp-up" : n < 0 ? "pp-down" : "");
  const pctTxt = x => (x === null || x === undefined ? "—" : `${(x * 100).toFixed(1)}%`);
  const when = t => new Date(t).toLocaleString("en-IN", { day: "numeric", month: "short", year: "2-digit", hour: "2-digit", minute: "2-digit" });

  // ---------- The post-trade form ----------
  const modal = document.createElement("div");
  modal.className = "pt-modal pt-journal-modal";
  modal.id = "ptJournalModal";
  modal.hidden = true;
  document.getElementById("paperApp").appendChild(modal);
  const chips = (name, list, multi) => `<div class="pt-chips" role="${multi ? "group" : "radiogroup"}">${list.map(v => `<label><input type="${multi ? "checkbox" : "radio"}" name="${name}" value="${esc(v)}"><span>${esc(v)}</span></label>`).join("")}</div>`;
  function openForm(e) {
   editing = e;
   const r = rMultiple(e), dir = e.side === "short" ? "Short" : "Long";
   modal.innerHTML = `<div class="pt-order pt-journal-box" role="dialog" aria-modal="true" aria-labelledby="ptjTitle">
    <header class="pt-journal-head ${e.pnl > 0 ? "win" : "loss"}">
     <div><strong id="ptjTitle">${e.status === "logged" ? "Edit journal entry" : "Log this trade"}</strong>
      <small>${esc(e.sym)} · ${dir} ${e.qty} · ${e.entry ? `${e.entry.toFixed(2)} → ` : ""}${e.exit.toFixed(2)} · ${e.source === "replay" ? "bar replay" : "paper trading"}</small></div>
     <div class="pt-journal-pnl"><b>${signed(e.pnl)}</b>${r !== null ? `<small>${r >= 0 ? "+" : ""}${r.toFixed(2)} R</small>` : ""}</div>
    </header>
    <form class="pt-journal-form" novalidate>
     <p class="ppa-hint">${prefs.mandatory && e.status !== "logged" ? "Logging is on: write this down before you trade again. Honest notes are what turn practice into skill." : "Write down what you did and why, while you still remember."}</p>
     <fieldset><legend>Main skill used <b class="req">required</b></legend>${chips("skill", SKILLS, false)}</fieldset>
     <fieldset><legend>Other skills involved</legend>${chips("tags", SKILLS, true)}</fieldset>
     <label class="pt-field"><span>Setup or strategy name</span><input name="setup" maxlength="80" placeholder="e.g. 20-EMA pullback in an uptrend"></label>
     <label class="pt-field"><span>Why did you enter? <b class="req">required</b></span><textarea name="reason" rows="3" maxlength="1000" placeholder="What did you see on the chart? What was your plan, stop-loss and target?"></textarea></label>
     <fieldset><legend>Why did you exit? <b class="req">required</b></legend>${chips("exitReason", EXITS, false)}</fieldset>
     <label class="pt-field"><span>Exit notes</span><input name="exitNote" maxlength="300" placeholder="Optional"></label>
     <div class="pt-journal-row">
      <fieldset><legend>Did you follow your plan? <b class="req">required</b></legend>${chips("followed", PLAN, false)}</fieldset>
      <fieldset><legend>Execution quality</legend><div class="pt-stars" role="radiogroup" aria-label="Execution quality, 1 to 5">${[1, 2, 3, 4, 5].map(n => `<label><input type="radio" name="rating" value="${n}"><span aria-hidden="true">★</span><b class="sr-only">${n} of 5</b></label>`).join("")}</div></fieldset>
     </div>
     <fieldset><legend>How did you feel?</legend>${chips("emotion", EMOTIONS, false)}</fieldset>
     <fieldset><legend>Mistakes (be honest)</legend>${chips("mistakes", MISTAKES, true)}</fieldset>
     <label class="pt-field"><span>Lesson for next time</span><textarea name="lesson" rows="2" maxlength="600" placeholder="Optional"></textarea></label>
     <p class="pp-msg" data-jmsg aria-live="polite"></p>
     <footer class="pt-order-foot">
      ${prefs.mandatory && e.status !== "logged" ? "" : `<button type="button" class="btn btn-secondary" data-jcancel>${e.status === "logged" ? "Cancel" : "Log later"}</button>`}
      <button type="submit" class="pt-submit">${e.status === "logged" ? "Save changes" : "Save to journal"}</button>
     </footer>
    </form></div>`;
   const f = modal.querySelector("form");
   const set = (name, v) => { if (v === undefined || v === null) return; [...f.querySelectorAll(`[name="${name}"]`)].forEach(i => { if (i.type === "checkbox") i.checked = (v || []).includes(i.value); else if (i.type === "radio") i.checked = String(v) === i.value; else i.value = v; }); };
   set("skill", e.skill); set("tags", e.tags || []); set("setup", e.setup || ""); set("reason", e.reason || ""); set("exitReason", e.exitReason || (e.autoExit || null));
   set("exitNote", e.exitNote || ""); set("followed", e.followed); set("rating", e.rating); set("emotion", e.emotion); set("mistakes", e.mistakes || []); set("lesson", e.lesson || "");
   modal.hidden = false;
   (f.querySelector('[name="skill"]:checked') || f.querySelector('[name="skill"]')).focus();
  }
  function closeForm() { modal.hidden = true; modal.innerHTML = ""; editing = null; }
  modal.addEventListener("click", ev => {
   if (ev.target.closest("[data-jcancel]")) { closeForm(); setTimeout(showNext, 400); }
  });
  modal.addEventListener("keydown", ev => {
   if (ev.key === "Escape") {
    ev.stopPropagation();
    if (prefs.mandatory && editing && editing.status !== "logged") { const m = modal.querySelector("[data-jmsg]"); m.textContent = "Logging is required: fill in the form and press Save. You can turn this off in the Journal section."; m.className = "pp-msg error"; }
    else closeForm();
    return;
   }
   if (ev.key !== "Tab") return;
   const fs = [...modal.querySelectorAll("button, input, select, textarea")].filter(x => !x.disabled && x.offsetParent !== null);
   if (ev.shiftKey && document.activeElement === fs[0]) { ev.preventDefault(); fs[fs.length - 1].focus(); }
   else if (!ev.shiftKey && document.activeElement === fs[fs.length - 1]) { ev.preventDefault(); fs[0].focus(); }
  });
  modal.addEventListener("submit", async ev => {
   ev.preventDefault();
   const f = ev.target, val = n => { const c = f.querySelector(`[name="${n}"]:checked`); return c ? c.value : null; };
   const all = n => [...f.querySelectorAll(`[name="${n}"]:checked`)].map(i => i.value);
   const msg = f.querySelector("[data-jmsg]"), reason = f.reason.value.trim();
   const missing = [!val("skill") && "the main skill", reason.length < MIN_REASON && `why you entered (at least ${MIN_REASON} characters)`, !val("exitReason") && "why you exited", !val("followed") && "whether you followed your plan"].filter(Boolean);
   if (missing.length) { msg.textContent = `Please add ${missing.join(", ")}.`; msg.className = "pp-msg error"; return; }
   const e = Object.assign({}, editing, {
    status: "logged", loggedAt: editing.loggedAt || Date.now(), skill: val("skill"), tags: all("tags").filter(t => t !== val("skill")),
    setup: f.setup.value.trim(), reason, exitReason: val("exitReason"), exitNote: f.exitNote.value.trim(), followed: val("followed"),
    rating: Number(val("rating")) || null, emotion: val("emotion"), mistakes: all("mistakes"), lesson: f.lesson.value.trim()
   });
   await store.put(e);
   entries = entries.filter(x => x.id !== e.id).concat(e);
   const first = editing.status !== "logged";
   closeForm();
   changed();
   if (first) {
    const s = stats(logged(), api.capital());
    api.toast(`Saved to your journal. Win rate now ${pctTxt(s.winRate)} over ${s.n} trade${s.n === 1 ? "" : "s"}.`, "ok");
   }
   setTimeout(showNext, 400);
  });
  // Shows the oldest unlogged trade, when nothing else (like the order window) is open.
  function showNext() {
   if (!modal.hidden || !prefs.mandatory) return;
   const next = pending()[0];
   if (!next) return;
   if (api.busy()) { setTimeout(showNext, 1000); return; }
   openForm(next);
  }

  // ---------- Recording trades ----------
  // t: { source, sym, side ("long" | "short"), product, qty, entry, exit, pnl, charges, openedAt, closedAt, stop, target, autoExit, replay }
  async function record(t) {
   const e = Object.assign({ id: `j${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`, status: "pending", createdAt: Date.now() }, t);
   entries.push(e);
   await store.put(e);
   changed();
   setTimeout(showNext, 600);
   return e.id;
  }
  // Updates fields of an entry (used to reveal the stock behind blind replay trades when the session ends).
  async function patch(id, changes) {
   const e = entries.find(x => x.id === id);
   if (!e) return;
   Object.assign(e, changes);
   await store.put(e);
   if (editing && editing.id === id) Object.assign(editing, changes);
   changed();
  }

  // ---------- Import and export ----------
  function exportJson() {
   const data = { app: "MarketPathAcademy trading journal", version: 1, exportedAt: new Date().toISOString(), entries: entries.slice().sort((a, b) => a.closedAt - b.closedAt) };
   const a = document.createElement("a");
   a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type: "application/json" }));
   a.download = `marketpath-journal-${new Date().toISOString().slice(0, 10)}.json`;
   document.body.appendChild(a);
   a.click();
   setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }
  const STR = ["sym", "source", "side", "product", "skill", "setup", "reason", "exitReason", "exitNote", "followed", "emotion", "lesson", "autoExit", "status"];
  function clean(x) {
   if (!x || typeof x !== "object") return null;
   const num = v => (typeof v === "number" && isFinite(v) ? v : Number(v));
   const e = { id: typeof x.id === "string" && x.id.length < 60 ? x.id : `j${Math.random().toString(36).slice(2, 12)}` };
   ["qty", "entry", "exit", "pnl", "charges", "openedAt", "closedAt", "stop", "target", "rating", "loggedAt", "createdAt"].forEach(k => { if (x[k] !== undefined && x[k] !== null && isFinite(num(x[k]))) e[k] = num(x[k]); });
   STR.forEach(k => { if (typeof x[k] === "string") e[k] = x[k].slice(0, 1000); });
   ["tags", "mistakes"].forEach(k => { e[k] = Array.isArray(x[k]) ? x[k].filter(v => typeof v === "string").map(v => v.slice(0, 80)).slice(0, 20) : []; });
   if (x.replay && typeof x.replay === "object") e.replay = JSON.parse(JSON.stringify(x.replay));
   if (!(typeof e.pnl === "number" && e.closedAt > 0 && e.sym && e.exit > 0 && e.qty > 0)) return null;
   if (e.status !== "pending") e.status = "logged";
   return e;
  }
  async function importJson(file) {
   let data;
   try { data = JSON.parse(await file.text()); } catch (err) { api.toast("That file is not valid JSON.", "error"); return; }
   const list = Array.isArray(data) ? data : data && Array.isArray(data.entries) ? data.entries : null;
   if (!list) { api.toast("No journal entries found. Expected an export from this journal ({ entries: [...] }).", "error"); return; }
   const have = new Set(entries.map(e => e.id)), add = [];
   let bad = 0, dup = 0;
   list.forEach(x => { const e = clean(x); if (!e) bad++; else if (have.has(e.id)) dup++; else { have.add(e.id); add.push(e); } });
   if (add.length) { await store.putMany(add); entries = entries.concat(add); changed(); }
   api.toast(`Imported ${add.length} entr${add.length === 1 ? "y" : "ies"}${dup ? `, skipped ${dup} already in your journal` : ""}${bad ? `, ignored ${bad} invalid` : ""}.`, add.length ? "ok" : "error");
  }

  // ---------- The Journal section ----------
  function filtered() {
   const days = { "7d": 7, "30d": 30 }[filter.period];
   return logged().filter(e => (filter.source === "all" || e.source === filter.source) && (!days || e.closedAt >= Date.now() - days * 86400000));
  }
  function render() {
   if (!mount || !loaded) return;
   const list = filtered(), s = stats(list, api.capital()), pend = pending(), skills = skillRows(list), mistakes = mistakeRows(list);
   const card = (label, v, extra, tone, info) => `<div class="ppa-card"><small>${label}${info ? api.infoButton(info) : ""}</small><strong class="${tone || ""}">${v}</strong>${extra ? `<span>${extra}</span>` : ""}</div>`;
   const chip = (group, id, label) => `<button type="button" class="ppa-chip${filter[group] === id ? " active" : ""}" data-jfilter="${group}:${id}" aria-pressed="${filter[group] === id}">${label}</button>`;
   const statusChip = st => ({ weak: `<span class="pt-skill weak">⚠ Underperforming</span>`, ok: `<span class="pt-skill ok">✓ Working</span>`, data: `<span class="pt-skill data">Needs more trades</span>` }[st]);
   mount.innerHTML = `<div class="ppa-toolbar"><h3 class="ppa-title">Trading journal ${api.infoButton("storage", "Where is my journal stored?")}</h3>
     <div class="pt-journal-tools"><button type="button" class="pp-btn" data-jexport ${entries.length ? "" : "disabled"}>⤓ Export JSON</button><label class="pp-btn pt-file">⤒ Import JSON<input type="file" accept="application/json,.json" data-jimport></label></div></div>
    <label class="pt-check"><input type="checkbox" data-jmandatory ${prefs.mandatory ? "checked" : ""}> Ask me to log every closed trade before I continue (recommended)</label>
    ${pend.length ? `<div class="pt-banner"><span>📝 ${pend.length} closed trade${pend.length === 1 ? " is" : "s are"} waiting to be logged.</span><button type="button" class="pt-buy" data-jlog="${esc(pend[0].id)}">Log now</button></div>` : ""}
    <div class="ppa-toolbar"><div class="ppa-filters" role="group" aria-label="Source">${chip("source", "all", "All trades")}${chip("source", "paper", "Paper trading")}${chip("source", "replay", "Bar replay")}</div>
     <div class="ppa-filters" role="group" aria-label="Period">${chip("period", "all", "All time")}${chip("period", "30d", "30 days")}${chip("period", "7d", "7 days")}</div></div>
    ${!list.length ? `<p class="ppa-empty">No logged trades ${filter.source !== "all" || filter.period !== "all" ? "match these filters" : "yet"}. Close a trade in paper trading or bar replay, log it, and your statistics appear here.</p>` : `
    <div class="ppa-cards">
     ${card("Win rate", pctTxt(s.winRate), `${s.wins} won · ${s.losses} lost · last ${s.lastN}: ${pctTxt(s.lastWinRate)}`, s.winRate >= 0.5 ? "pp-up" : "", "winrate")}
     ${card("Net P&amp;L", signed(s.net), `${s.n} trade${s.n === 1 ? "" : "s"} after charges`, cls(s.net), "pnl")}
     ${card("Expectancy per trade", signed(s.expectancy), `Avg win ${money(s.avgWin)} · avg loss ${money(s.avgLoss)}`, cls(s.expectancy), "winrate")}
     ${card("Profit factor", s.profitFactor === null ? "—" : s.profitFactor === Infinity ? "∞" : s.profitFactor.toFixed(2), s.avgR !== null ? `Average ${s.avgR >= 0 ? "+" : ""}${s.avgR.toFixed(2)} R over ${s.rCount} trade${s.rCount === 1 ? "" : "s"} with a stop` : "Add stop-losses to see R-multiples", s.profitFactor > 1 ? "pp-up" : s.profitFactor !== null ? "pp-down" : "", "winrate")}
     ${card("Maximum drawdown", s.maxDd ? `−${money(s.maxDd)}` : money(0), `${(s.maxDdPct * 100).toFixed(2)}% from peak${s.ddTo !== null ? ` · trades ${s.ddFrom === null ? 1 : s.ddFrom + 2}–${s.ddTo + 1}` : ""}`, s.maxDd ? "pp-down" : "", "drawdown")}
     ${card("Current drawdown", s.curDd ? `−${money(s.curDd)}` : "At a new high", `${(s.curDdPct * 100).toFixed(2)}% below your best point`, s.curDd ? "pp-down" : "pp-up", "drawdown")}
    </div>
    <section class="ppa-panel"><h4>Equity curve <small class="ppa-time">starting capital ${money(api.capital())}, after each logged trade</small></h4><div class="pt-equity" data-jcurve role="img" aria-label="Equity after each trade"></div></section>
    <div class="ppa-split">
     <section class="ppa-panel"><h4><span>Skills ${api.infoButton("skills")}</span></h4>
      <div class="ppa-table-wrap"><table class="ppa-table"><thead><tr><th>Skill</th><th class="num">Trades</th><th class="num">Win rate</th><th class="num">Expectancy</th><th class="num">Net</th><th>Status</th></tr></thead>
      <tbody>${skills.map(r => `<tr class="${r.status === "weak" ? "pt-row-weak" : ""}"><td>${esc(r.skill)}</td><td class="num">${r.n}</td><td class="num"><span class="pt-bar"><i style="width:${Math.round((r.winRate || 0) * 100)}%"></i></span>${pctTxt(r.winRate)}</td><td class="num ${cls(r.expectancy)}">${signed(r.expectancy)}</td><td class="num ${cls(r.net)}">${signed(r.net)}</td><td>${statusChip(r.status)}</td></tr>`).join("")}</tbody></table></div>
      ${skills.some(r => r.status === "weak") ? `<p class="pt-alert">⚠ Practise ${skills.filter(r => r.status === "weak").map(r => `<b>${esc(r.skill)}</b>`).join(", ")} in bar replay before using ${skills.filter(r => r.status === "weak").length === 1 ? "it" : "them"} again, or study the matching lesson.</p>` : ""}
     </section>
     <section class="ppa-panel"><h4>Mistakes and what they cost</h4>
      ${mistakes.length ? `<div class="ppa-table-wrap"><table class="ppa-table"><thead><tr><th>Mistake</th><th class="num">Times</th><th class="num">P&amp;L of those trades</th></tr></thead><tbody>${mistakes.map(m => `<tr><td>${esc(m.mistake)}</td><td class="num">${m.n}</td><td class="num ${cls(m.cost)}">${signed(m.cost)}</td></tr>`).join("")}</tbody></table></div>` : `<p class="ppa-empty ppa-empty-sm">No mistakes tagged yet. Tag them honestly when you log trades: patterns show up quickly.</p>`}
      ${(() => { const by = {}; list.forEach(e => { if (e.followed) { (by[e.followed] = by[e.followed] || []).push(e); } }); return Object.keys(by).length ? `<h4 class="pt-sub">Followed your plan?</h4><ul class="ppa-mini-list">${PLAN.filter(p => by[p]).map(p => { const st = stats(by[p], 0); return `<li><b>${p}</b><span>${by[p].length} trades · win rate ${pctTxt(st.winRate)}</span><b class="${cls(st.expectancy)}">${signed(st.expectancy)} / trade</b></li>`; }).join("")}</ul>` : ""; })()}
     </section>
    </div>
    <section class="ppa-panel"><h4>Logged trades</h4><div class="ppa-table-wrap"><table class="ppa-table"><thead><tr><th>Closed</th><th>Source</th><th>Instrument</th><th>Side</th><th class="num">Qty.</th><th class="num">Entry</th><th class="num">Exit</th><th class="num">P&amp;L</th><th class="num">R</th><th>Skill</th><th>Plan</th><th><span class="sr-only">Actions</span></th></tr></thead>
     <tbody>${list.slice().reverse().map(e => { const r = rMultiple(e); return `<tr>
      <td class="ppa-time">${when(e.closedAt)}</td><td>${e.source === "replay" ? "Replay" : "Paper"}</td><td><strong>${esc(e.sym)}</strong></td>
      <td><span class="ppa-side ${e.side === "short" ? "sell" : "buy"}">${e.side === "short" ? "SHORT" : "LONG"}</span></td><td class="num">${e.qty}</td>
      <td class="num">${e.entry ? e.entry.toFixed(2) : "—"}</td><td class="num">${e.exit.toFixed(2)}</td><td class="num ${cls(e.pnl)}">${signed(e.pnl)}</td>
      <td class="num">${r === null ? "—" : `${r >= 0 ? "+" : ""}${r.toFixed(2)}`}</td><td>${esc(e.skill || "")}</td><td>${esc(e.followed || "")}</td>
      <td class="num ppa-acts"><button type="button" class="pp-mini" data-jview="${esc(e.id)}" aria-expanded="false">Notes</button><button type="button" class="pp-mini" data-jedit="${esc(e.id)}">Edit</button><button type="button" class="pp-mini pt-del" data-jdel="${esc(e.id)}" aria-label="Delete entry">✕</button></td></tr>
      <tr class="pt-notes" data-jnotes="${esc(e.id)}" hidden><td colspan="12"><dl>
       ${e.setup ? `<dt>Setup</dt><dd>${esc(e.setup)}</dd>` : ""}<dt>Why I entered</dt><dd>${esc(e.reason || "")}</dd>
       <dt>Why I exited</dt><dd>${esc(e.exitReason || "")}${e.exitNote ? ` — ${esc(e.exitNote)}` : ""}</dd>
       ${e.emotion ? `<dt>Feeling</dt><dd>${esc(e.emotion)}</dd>` : ""}${e.rating ? `<dt>Execution</dt><dd>${"★".repeat(e.rating)}${"☆".repeat(5 - e.rating)}</dd>` : ""}
       ${(e.tags || []).length ? `<dt>Other skills</dt><dd>${e.tags.map(esc).join(", ")}</dd>` : ""}${(e.mistakes || []).length ? `<dt>Mistakes</dt><dd>${e.mistakes.map(esc).join(", ")}</dd>` : ""}
       ${e.lesson ? `<dt>Lesson</dt><dd>${esc(e.lesson)}</dd>` : ""}${e.replay ? `<dt>Replay</dt><dd>${esc(e.replay.label || "")}</dd>` : ""}
      </dl></td></tr>`; }).join("")}</tbody></table></div></section>`}`;
   drawCurve(s);
  }
  function drawCurve(s) {
   if (chart) { chart.remove(); chart = null; }
   const el = mount.querySelector("[data-jcurve]");
   if (!el || !window.LightweightCharts) return;
   const light = document.documentElement.dataset.theme === "light", LW = LightweightCharts;
   chart = LW.createChart(el, {
    autoSize: true, handleScroll: false, handleScale: false,
    layout: { background: { type: "solid", color: "transparent" }, textColor: light ? "#4a5b70" : "#9caec4" },
    grid: { vertLines: { visible: false }, horzLines: { color: light ? "#e6ebf2" : "#1b2a40" } },
    rightPriceScale: { borderVisible: false }, timeScale: { borderVisible: false, tickMarkFormatter: t => `#${t}` },
    localization: { timeFormatter: t => `after trade ${t}` }
   });
   const up = s.equity >= api.capital();
   const series = chart.addSeries(LW.AreaSeries, { lineColor: up ? "#2fbf8f" : "#ef5f6b", topColor: up ? "rgba(47,191,143,.25)" : "rgba(239,95,107,.25)", bottomColor: "rgba(0,0,0,0)", lineWidth: 2, priceLineVisible: false });
   // Trade numbers stand in for time, so trades closed in the same second still plot in order.
   series.setData(s.curve.map(p => ({ time: p.i, value: Math.round(p.eq * 100) / 100 })));
   series.createPriceLine({ price: api.capital(), color: "rgba(156,174,196,.6)", lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: "start" });
   chart.timeScale().fitContent();
  }

  // ---------- Events in the Journal section ----------
  function bind(el) {
   el.addEventListener("click", async ev => {
    const b = ev.target.closest("button");
    if (!b) return;
    if (b.dataset.jfilter) { const [g, v] = b.dataset.jfilter.split(":"); filter[g] = v; render(); }
    else if (b.hasAttribute("data-jexport")) exportJson();
    else if (b.dataset.jlog) { const e = entries.find(x => x.id === b.dataset.jlog); if (e) openForm(e); }
    else if (b.dataset.jedit) { const e = entries.find(x => x.id === b.dataset.jedit); if (e) openForm(e); }
    else if (b.dataset.jview) { const row = el.querySelector(`[data-jnotes="${b.dataset.jview}"]`); row.hidden = !row.hidden; b.setAttribute("aria-expanded", String(!row.hidden)); }
    else if (b.dataset.jdel) {
     if (!confirm("Delete this journal entry? This cannot be undone (export first if you want a copy).")) return;
     await store.remove(b.dataset.jdel);
     entries = entries.filter(x => x.id !== b.dataset.jdel);
     changed();
    }
   });
   el.addEventListener("change", ev => {
    if (ev.target.matches("[data-jimport]") && ev.target.files[0]) { importJson(ev.target.files[0]); ev.target.value = ""; }
    if (ev.target.matches("[data-jmandatory]")) { prefs.mandatory = ev.target.checked; savePrefs(); if (prefs.mandatory) setTimeout(showNext, 300); }
   });
  }
  function changed() { render(); api.onChange(); }
  document.addEventListener("mp-theme-change", () => { if (mount && chart) render(); });

  store.all().then(list => { entries = (list || []).filter(Boolean); loaded = true; changed(); setTimeout(showNext, 1500); }).catch(() => { loaded = true; });
  return {
   record, patch,
   isOpen: () => !modal.hidden,
   show(el) { if (mount !== el) { mount = el; bind(el); } render(); },
   pendingCount: () => pending().length,
   stats: () => stats(logged(), api.capital()),
   storageKind: store.kind,
   SKILLS
  };
 }
 return { create, stats };
})();
