// MarketPathAcademy final test (pages/test.html). 100, 125 or 150 questions drawn from every learning module in
// proportion to its question bank (js/test-bank.js), options shuffled, one minute per question. 70% passes and
// unlocks a downloadable certificate. The attempt is saved in this browser as you go, so a reload resumes it;
// the timer keeps running meanwhile. Results show a per-module breakdown and every answer with its explanation.
(function () {
 const BANK = window.MP_TEST_BANK;
 const PASS = 70, SIZES = [100, 125, 150], SECONDS_PER_Q = 60;
 const KEY_ATTEMPT = "mp-test-attempt", KEY_HISTORY = "mp-test-history";
 const app = document.getElementById("ftApp");
 const esc = s => MP.esc(s);
 const LETTERS = ["A", "B", "C", "D", "E", "F"];
 // Options that point at other options ("All of the above") must keep their place.
 const FIXED = /all of the above|none of the above|both a and b|a and b|इनमें से सभी|उपरोक्त सभी|उपर्युक्त सभी|इनमें से कोई नहीं/i;

 const UI = {
  en: {
   eyebrow: "FINAL TEST", title: "MarketPathAcademy final test",
   intro: "One test across the whole course: every learning module, from market basics, charts and fundamentals to options, risk, psychology and tax. Score 70% or more to pass and download your certificate.",
   size: "Number of questions", minutes: n => `${n} questions · ${n} minutes`, lang: "Test language",
   rules: ["Questions are drawn from all {m} modules in proportion to each module's question bank, so every topic is tested.", "Each attempt picks new questions and shuffles the answer options.", "You have one minute per question. The timer keeps running if you leave the page; your answers are saved and you can resume.", "Answers are revealed only after you submit. You can move between questions and mark any for review.", "Pass mark: 70%. Pass to get a certificate with your name, score and a certificate ID."],
   coverage: "Modules covered", start: "Start the test", resume: "Resume your test", discard: "Discard it and start again",
   inProgress: (a, n, left) => `You have a test in progress: ${a} of ${n} answered, ${left} left.`,
   history: "Your attempts", noHistory: "No attempts yet.", pass: "Passed", fail: "Not passed", viewCert: "Certificate",
   q: (i, n) => `Question ${i} of ${n}`, module: "Module", prev: "← Previous", next: "Next →", clear: "Clear answer", mark: "☆ Mark for review", marked: "★ Marked",
   answered: "answered", markedN: "marked", submit: "Submit test", palette: "Question palette",
   legend: [["ans", "Answered"], ["mark", "Marked for review"], ["seen", "Seen, not answered"], ["new", "Not visited"]],
   timeLeft: "Time left", timeWarn: m => `${m} minute${m === 1 ? "" : "s"} left.`, timeUp: "Time is up. Your test was submitted automatically.",
   confirmTitle: "Submit the test?", confirmText: (a, n, u, m) => `You have answered ${a} of ${n} questions. ${u} unanswered${m ? `, ${m} marked for review` : ""}. Unanswered questions count as wrong.`,
   back: "Back to the test", confirm: "Submit now",
   resultTitle: "Your result", passed: "Passed", failed: "Not passed yet", score: "Score", correct: "Correct", wrong: "Wrong", skipped: "Unanswered", time: "Time taken",
   passMsg: "Congratulations! You passed the MarketPathAcademy final test.", failMsg: n => `You need ${PASS}% to pass. ${n} more correct answer${n === 1 ? "" : "s"} would have done it. Revise the modules below and try again.`,
   byModule: "Score by module", revise: "Revise", review: "Review your answers", filters: [["all", "All"], ["wrong", "Wrong"], ["skipped", "Unanswered"], ["marked", "Marked"]],
   yours: "Your answer", right: "Correct answer", none: "Not answered", why: "Why",
   getCert: "Get your certificate", retake: "Take the test again", home: "Back to the test page",
   certTitle: "Your certificate", certIntro: "Enter your name as you want it on the certificate.", name: "Full name", make: "Create certificate",
   download: "Download (PNG)", print: "Print or save as PDF", copy: "Copy verification link", copied: "Verification link copied.",
   nameErr: "Enter your name (2 to 60 characters).", verifyTitle: "Certificate check",
   details: "Your details", nameLabel: "Full name (for your certificate)", nameHint: "Printed on your certificate exactly as you type it.",
   pledge: "I will take this test on my own, without help from others or reference material.", pledgeErr: "Please confirm the pledge to start the test.",
   candidate: "Candidate", certReady: "Your certificate is ready", certReadyText: n => `Created automatically for ${n}. Download it, print it or share the verification link.`,
   editName: "Wrong name? Change it", update: "Update certificate",
   verifyOk: "This certificate ID matches the details below.", verifyBad: "This verification link is not valid or has been changed.",
   verifyNote: "The check confirms that the name, score and date match the certificate ID. Compare the ID with the one printed on the certificate. MarketPathAcademy does not store certificates on a server, so this cannot prove who took the test.",
   disclaimer: "The MarketPathAcademy certificate shows that you passed this learning test. It is not a professional qualification or a SEBI or NISM certification.",
   leave: "Your test is saved. The timer keeps running."
  },
  hi: {
   eyebrow: "फ़ाइनल टेस्ट", title: "MarketPathAcademy फ़ाइनल टेस्ट",
   intro: "पूरे कोर्स पर एक टेस्ट: हर लर्निंग मॉड्यूल, बाज़ार की मूल बातों, चार्ट और फंडामेंटल से लेकर ऑप्शंस, जोखिम, मनोविज्ञान और टैक्स तक। पास होने और सर्टिफ़िकेट पाने के लिए 70% या अधिक अंक लाएँ।",
   size: "प्रश्नों की संख्या", minutes: n => `${n} प्रश्न · ${n} मिनट`, lang: "टेस्ट की भाषा",
   rules: ["प्रश्न सभी {m} मॉड्यूल से, हर मॉड्यूल के प्रश्न-बैंक के अनुपात में चुने जाते हैं, ताकि हर विषय की जाँच हो।", "हर प्रयास में नए प्रश्न चुने जाते हैं और विकल्पों का क्रम बदलता है।", "हर प्रश्न के लिए एक मिनट मिलता है। पेज छोड़ने पर भी टाइमर चलता रहता है; आपके उत्तर सेव रहते हैं और आप टेस्ट फिर से शुरू कर सकते हैं।", "सही उत्तर टेस्ट जमा करने के बाद ही दिखते हैं। आप प्रश्नों के बीच जा सकते हैं और किसी को भी रिव्यू के लिए मार्क कर सकते हैं।", "पास होने के लिए 70% चाहिए। पास होने पर आपके नाम, स्कोर और सर्टिफ़िकेट ID के साथ सर्टिफ़िकेट मिलता है।"],
   coverage: "शामिल मॉड्यूल", start: "टेस्ट शुरू करें", resume: "टेस्ट जारी रखें", discard: "इसे हटाकर फिर से शुरू करें",
   inProgress: (a, n, left) => `आपका एक टेस्ट चल रहा है: ${n} में से ${a} उत्तर दिए, ${left} बाकी।`,
   history: "आपके प्रयास", noHistory: "अभी कोई प्रयास नहीं।", pass: "पास", fail: "पास नहीं", viewCert: "सर्टिफ़िकेट",
   q: (i, n) => `प्रश्न ${i} / ${n}`, module: "मॉड्यूल", prev: "← पिछला", next: "अगला →", clear: "उत्तर हटाएँ", mark: "☆ रिव्यू के लिए मार्क करें", marked: "★ मार्क किया",
   answered: "उत्तर दिए", markedN: "मार्क किए", submit: "टेस्ट जमा करें", palette: "प्रश्न सूची",
   legend: [["ans", "उत्तर दिया"], ["mark", "रिव्यू के लिए मार्क"], ["seen", "देखा, उत्तर नहीं दिया"], ["new", "नहीं देखा"]],
   timeLeft: "बचा समय", timeWarn: m => `${m} मिनट बाकी।`, timeUp: "समय समाप्त। आपका टेस्ट अपने-आप जमा हो गया।",
   confirmTitle: "टेस्ट जमा करें?", confirmText: (a, n, u, m) => `आपने ${n} में से ${a} प्रश्नों के उत्तर दिए हैं। ${u} बिना उत्तर${m ? `, ${m} रिव्यू के लिए मार्क` : ""}। बिना उत्तर वाले प्रश्न गलत गिने जाते हैं।`,
   back: "टेस्ट पर लौटें", confirm: "अभी जमा करें",
   resultTitle: "आपका परिणाम", passed: "पास", failed: "अभी पास नहीं", score: "स्कोर", correct: "सही", wrong: "गलत", skipped: "बिना उत्तर", time: "लगा समय",
   passMsg: "बधाई हो! आपने MarketPathAcademy फ़ाइनल टेस्ट पास कर लिया।", failMsg: n => `पास होने के लिए ${PASS}% चाहिए। ${n} और सही उत्तर से आप पास हो जाते। नीचे के मॉड्यूल दोहराएँ और फिर कोशिश करें।`,
   byModule: "मॉड्यूल के अनुसार स्कोर", revise: "दोहराएँ", review: "अपने उत्तर देखें", filters: [["all", "सभी"], ["wrong", "गलत"], ["skipped", "बिना उत्तर"], ["marked", "मार्क किए"]],
   yours: "आपका उत्तर", right: "सही उत्तर", none: "उत्तर नहीं दिया", why: "क्यों",
   getCert: "अपना सर्टिफ़िकेट पाएँ", retake: "टेस्ट फिर से दें", home: "टेस्ट पेज पर लौटें",
   certTitle: "आपका सर्टिफ़िकेट", certIntro: "सर्टिफ़िकेट पर जैसा नाम चाहिए, वैसा लिखें।", name: "पूरा नाम", make: "सर्टिफ़िकेट बनाएँ",
   download: "डाउनलोड (PNG)", print: "प्रिंट करें या PDF सेव करें", copy: "जाँच लिंक कॉपी करें", copied: "जाँच लिंक कॉपी हो गया।",
   nameErr: "अपना नाम लिखें (2 से 60 अक्षर)।", verifyTitle: "सर्टिफ़िकेट जाँच",
   details: "आपकी जानकारी", nameLabel: "पूरा नाम (सर्टिफ़िकेट के लिए)", nameHint: "आपका नाम सर्टिफ़िकेट पर ठीक वैसा ही छपेगा जैसा आप लिखेंगे।",
   pledge: "मैं यह टेस्ट ख़ुद दूँगा/दूँगी, किसी और की मदद या संदर्भ सामग्री के बिना।", pledgeErr: "टेस्ट शुरू करने के लिए कृपया प्रतिज्ञा की पुष्टि करें।",
   candidate: "उम्मीदवार", certReady: "आपका सर्टिफ़िकेट तैयार है", certReadyText: n => `${n} के लिए अपने-आप बनाया गया। इसे डाउनलोड करें, प्रिंट करें या जाँच लिंक साझा करें।`,
   editName: "नाम गलत है? बदलें", update: "सर्टिफ़िकेट अपडेट करें",
   verifyOk: "यह सर्टिफ़िकेट ID नीचे दी गई जानकारी से मेल खाता है।", verifyBad: "यह जाँच लिंक मान्य नहीं है या बदला गया है।",
   verifyNote: "जाँच से पता चलता है कि नाम, स्कोर और तारीख़ सर्टिफ़िकेट ID से मेल खाते हैं। इस ID को सर्टिफ़िकेट पर छपे ID से मिलाएँ। MarketPathAcademy सर्टिफ़िकेट किसी सर्वर पर नहीं रखता, इसलिए यह साबित नहीं कर सकता कि टेस्ट किसने दिया।",
   disclaimer: "MarketPathAcademy सर्टिफ़िकेट दिखाता है कि आपने यह लर्निंग टेस्ट पास किया है। यह कोई प्रोफ़ेशनल योग्यता या SEBI/NISM सर्टिफ़िकेशन नहीं है।",
   leave: "आपका टेस्ट सेव है। टाइमर चलता रहता है।"
  }
 };
 let lang = UI[MP.getLang()] ? MP.getLang() : "en";
 const t = () => UI[lang];

 // ---------- Storage ----------
 const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v === null ? d : v; } catch (e) { return d; } };
 const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked: the test still works, without resume */ } };
 let attempt = load(KEY_ATTEMPT, null);
 if (attempt && (!attempt.qs || attempt.v !== 1)) attempt = null;

 // ---------- Building a test ----------
 function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
 // Every module gets questions in proportion to its share of the bank (at least 2 each), largest remainders first.
 function allocate(size) {
  const mods = BANK.modules.map(m => ({ slug: m.slug, n: BANK.en[m.slug].length }));
  const total = mods.reduce((s, m) => s + m.n, 0);
  mods.forEach(m => { m.exact = (size * m.n) / total; m.k = Math.max(2, Math.min(m.n, Math.floor(m.exact))); });
  let left = size - mods.reduce((s, m) => s + m.k, 0);
  const order = mods.slice().sort((a, b) => (b.exact - Math.floor(b.exact)) - (a.exact - Math.floor(a.exact)) || Math.random() - 0.5);
  for (let i = 0; left > 0 && i < order.length * 3; i++) { const m = order[i % order.length]; if (m.k < m.n) { m.k++; left--; } }
  for (let i = 0; left < 0 && i < order.length * 3; i++) { const m = order[order.length - 1 - (i % order.length)]; if (m.k > 2) { m.k--; left++; } }
  return mods;
 }
 function newAttempt(size, testLang, candidate) {
  const qs = [];
  allocate(size).forEach(m => {
   shuffle([...Array(m.n).keys()]).slice(0, m.k).forEach(i => {
    const q = BANK[testLang][m.slug][i], n = q[1].length;
    const fixed = q[1].some(o => FIXED.test(o));
    qs.push({ s: m.slug, i, p: fixed ? [...Array(n).keys()] : shuffle([...Array(n).keys()]) });
   });
  });
  shuffle(qs);
  const now = Date.now();
  return { v: 1, name: candidate, lang: testLang, size: qs.length, qs, ans: qs.map(() => null), marked: qs.map(() => false), seen: qs.map((_, i) => i === 0), cur: 0, start: now, end: now + qs.length * SECONDS_PER_Q * 1000 };
 }
 const qOf = (a, k) => { const r = a.qs[k], q = BANK[a.lang][r.s][r.i]; return { text: q[0], options: r.p.map(j => q[1][j]), correct: r.p.indexOf(q[2]), why: q[3], slug: r.s }; };
 const modTitle = slug => { const m = BANK.modules.find(x => x.slug === slug); return m ? m[lang] || m.en : slug; };
 const save = () => store(KEY_ATTEMPT, attempt);

 // ---------- Intro ----------
 function renderIntro(msg) {
  stopTimer();
  const u = t(), hist = load(KEY_HISTORY, []), total = BANK.modules.reduce((s, m) => s + BANK.en[m.slug].length, 0);
  const pending = attempt && !attempt.done && Date.now() < attempt.end;
  if (attempt && !attempt.done && !pending) { finish(true); return; }
  app.innerHTML = `<section class="xt-hero"><div class="eyebrow">${u.eyebrow}</div><h1 class="lesson-title">${u.title}</h1><p class="lesson-summary">${u.intro}</p></section>
   ${msg ? `<p class="xt-banner">${esc(msg)}</p>` : ""}
   ${pending ? `<section class="xt-card xt-resume"><p>${u.inProgress(attempt.ans.filter(x => x !== null).length, attempt.size, fmtTime(attempt.end - Date.now()))}</p><div class="xt-actions"><button type="button" class="btn btn-primary" data-act="resume">${u.resume}</button><button type="button" class="btn btn-secondary" data-act="discard">${u.discard}</button></div></section>` : ""}
   <div class="xt-intro-grid">
    <section class="xt-card">
     <form data-start novalidate>
      <fieldset class="xt-details"><legend>${u.details}</legend>
       <label class="xt-field"><span>${u.nameLabel}</span><input name="candidate" maxlength="60" autocomplete="name" required value="${esc(load("mp-test-name", ""))}" aria-describedby="xtNameHint"></label>
       <small id="xtNameHint" class="xt-hint">${u.nameHint}</small>
       <label class="xt-pledge"><input type="checkbox" name="pledge" required> <span>${u.pledge}</span></label>
      </fieldset>
      <fieldset class="xt-choice"><legend>${u.size}</legend>${SIZES.map((n, i) => `<label><input type="radio" name="size" value="${n}"${i === 1 ? " checked" : ""}><span><b>${n}</b>${u.minutes(n).split(" · ")[1]}</span></label>`).join("")}</fieldset>
      <fieldset class="xt-choice xt-choice-sm"><legend>${u.lang}</legend><label><input type="radio" name="tlang" value="en"${lang === "en" ? " checked" : ""}><span>English</span></label><label><input type="radio" name="tlang" value="hi"${lang === "hi" ? " checked" : ""}><span>हिन्दी</span></label></fieldset>
      <ul class="xt-rules">${u.rules.map(r => `<li>${esc(r.replace("{m}", BANK.modules.length))}</li>`).join("")}</ul>
      <p class="xt-err" data-starterr aria-live="polite"></p>
      <button type="submit" class="btn btn-primary xt-big" ${pending ? "disabled" : ""}>${u.start} →</button>
     </form>
    </section>
    <aside class="xt-card"><h2 class="xt-h">${u.coverage} <small>${BANK.modules.length} · ${total}</small></h2>
     <ul class="xt-modules">${BANK.modules.map(m => `<li><span>${esc(m[lang] || m.en)}</span><small>${BANK.en[m.slug].length}</small></li>`).join("")}</ul>
    </aside>
   </div>
   <section class="xt-card"><h2 class="xt-h">${u.history}</h2>${hist.length ? `<div class="xt-table-wrap"><table class="xt-table"><tbody>${hist.slice().reverse().map((h, i) => `<tr><td>${new Date(h.date).toLocaleString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</td><td class="num">${h.correct} / ${h.size}</td><td class="num"><b>${h.pct.toFixed(1)}%</b></td><td><span class="xt-badge ${h.passed ? "ok" : "no"}">${h.passed ? u.pass : u.fail}</span></td><td class="num">${h.passed ? `<button type="button" class="btn btn-secondary xt-sm" data-cert="${hist.length - 1 - i}">${u.viewCert}</button>` : ""}</td></tr>`).join("")}</tbody></table></div>` : `<p class="xt-muted">${u.noHistory}</p>`}</section>`;
  app.querySelector("[data-start]").addEventListener("submit", e => {
   e.preventDefault();
   const f = e.target, name = f.candidate.value.trim().replace(/\s+/g, " "), err = f.querySelector("[data-starterr]");
   if (name.length < 2 || name.length > 60) { err.textContent = u.nameErr; f.candidate.focus(); return; }
   if (!f.pledge.checked) { err.textContent = u.pledgeErr; f.pledge.focus(); return; }
   store("mp-test-name", name);
   attempt = newAttempt(Number(f.size.value), f.tlang.value, name);
   save();
   renderQuestion();
   window.scrollTo({ top: 0 });
  });
 }

 // ---------- Taking the test ----------
 let timer = null, warned = {};
 const fmtTime = ms => { const s = Math.max(0, Math.round(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return `${h ? `${h}:` : ""}${String(m).padStart(h ? 2 : 1, "0")}:${String(x).padStart(2, "0")}`; };
 function startTimer() {
  stopTimer();
  timer = setInterval(() => {
   const left = attempt.end - Date.now(), el = document.getElementById("ftTimer");
   if (el) { el.textContent = fmtTime(left); el.classList.toggle("low", left < 5 * 60000); }
   [5, 1].forEach(m => { if (left < m * 60000 && left > (m - 1) * 60000 && !warned[m]) { warned[m] = true; announce(t().timeWarn(m)); } });
   if (left <= 0) { stopTimer(); finish(true); }
  }, 1000);
 }
 function stopTimer() { clearInterval(timer); timer = null; }
 function announce(text) { const el = document.getElementById("ftLive"); if (el) el.textContent = text; }
 function renderQuestion() {
  const u = t(), a = attempt, k = a.cur, q = qOf(a, k);
  a.seen[k] = true;
  const answered = a.ans.filter(x => x !== null).length, marked = a.marked.filter(Boolean).length;
  app.innerHTML = `<div class="xt-bar" role="region" aria-label="${esc(u.title)}">
    <div class="xt-bar-l"><strong>${u.q(k + 1, a.size)}</strong><span>${a.name ? `${u.candidate}: ${esc(a.name)} · ` : ""}${answered} ${u.answered} · ${marked} ${u.markedN}</span></div>
    <div class="xt-timer" aria-label="${u.timeLeft}"><span>${u.timeLeft}</span><b id="ftTimer">${fmtTime(a.end - Date.now())}</b></div>
    <button type="button" class="btn btn-primary" data-act="submit">${u.submit}</button>
   </div>
   <div class="xt-progress" aria-hidden="true"><i style="width:${((answered / a.size) * 100).toFixed(1)}%"></i></div>
   <p id="ftLive" class="sr-only" aria-live="assertive"></p>
   <div class="xt-test">
    <section class="xt-card xt-q">
     <p class="xt-mod">${u.module}: ${esc(modTitle(q.slug))}</p>
     <fieldset><legend class="xt-qtext" ${a.lang === "hi" ? 'lang="hi"' : 'lang="en"'}>${esc(q.text)}</legend>
      <div class="xt-opts" ${a.lang === "hi" ? 'lang="hi"' : 'lang="en"'}>${q.options.map((o, i) => `<label class="xt-opt${a.ans[k] === i ? " sel" : ""}"><input type="radio" name="opt" value="${i}"${a.ans[k] === i ? " checked" : ""}><span class="xt-letter">${LETTERS[i]}</span><span>${esc(o)}</span></label>`).join("")}</div>
     </fieldset>
     <div class="xt-nav">
      <button type="button" class="btn btn-secondary" data-act="prev" ${k === 0 ? "disabled" : ""}>${u.prev}</button>
      <button type="button" class="btn btn-secondary" data-act="clear" ${a.ans[k] === null ? "disabled" : ""}>${u.clear}</button>
      <button type="button" class="btn btn-secondary xt-markbtn${a.marked[k] ? " on" : ""}" data-act="mark" aria-pressed="${a.marked[k]}">${a.marked[k] ? u.marked : u.mark}</button>
      <button type="button" class="btn btn-primary" data-act="next" ${k === a.size - 1 ? "disabled" : ""}>${u.next}</button>
     </div>
     <p class="xt-keys">1–${q.options.length}: ${lang === "hi" ? "विकल्प चुनें" : "choose"} · ← →: ${lang === "hi" ? "पिछला/अगला" : "previous/next"} · M: ${lang === "hi" ? "मार्क" : "mark"}</p>
    </section>
    <aside class="xt-card xt-palette"><h2 class="xt-h">${u.palette}</h2>
     <div class="xt-grid">${a.qs.map((_, i) => { const st = a.marked[i] ? "mark" : a.ans[i] !== null ? "ans" : a.seen[i] ? "seen" : "new"; return `<button type="button" class="xt-cell ${st}${i === k ? " cur" : ""}" data-go="${i}" aria-label="${u.q(i + 1, a.size)}, ${u.legend.find(l => l[0] === st)[1]}"${i === k ? ' aria-current="true"' : ""}>${i + 1}</button>`; }).join("")}</div>
     <ul class="xt-legend">${u.legend.map(([c, l]) => `<li><i class="xt-cell ${c}"></i>${l}</li>`).join("")}</ul>
    </aside>
   </div>`;
  save();
  startTimer();
 }
 function go(k) { attempt.cur = Math.max(0, Math.min(attempt.size - 1, k)); renderQuestion(); const q = app.querySelector(".xt-q"); if (q && q.getBoundingClientRect().top < 0) q.scrollIntoView({ block: "start" }); }
 function choose(i) {
  attempt.ans[attempt.cur] = i;
  save();
  renderQuestion();
  const r = app.querySelector(`.xt-opt input[value="${i}"]`);
  if (r) r.focus();
 }
 function confirmSubmit() {
  const u = t(), a = attempt, n = a.ans.filter(x => x !== null).length;
  const box = document.createElement("div");
  box.className = "xt-modal";
  box.innerHTML = `<div class="xt-dialog" role="dialog" aria-modal="true" aria-labelledby="ftConfTitle"><h2 id="ftConfTitle">${u.confirmTitle}</h2><p>${u.confirmText(n, a.size, a.size - n, a.marked.filter(Boolean).length)}</p><div class="xt-actions"><button type="button" class="btn btn-secondary" data-c="back">${u.back}</button><button type="button" class="btn btn-primary" data-c="ok">${u.confirm}</button></div></div>`;
  document.body.appendChild(box);
  const close = () => { box.remove(); app.querySelector('[data-act="submit"]').focus(); };
  box.addEventListener("click", e => { const b = e.target.closest("[data-c]"); if (e.target === box || (b && b.dataset.c === "back")) close(); else if (b) { box.remove(); finish(false); } });
  box.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  box.querySelector('[data-c="back"]').focus();
 }

 // ---------- Results ----------
 function score(a) {
  const per = {};
  let correct = 0, skipped = 0;
  a.qs.forEach((r, k) => {
   const q = qOf(a, k), ok = a.ans[k] === q.correct;
   per[r.s] = per[r.s] || [0, 0];
   per[r.s][1]++;
   if (ok) { per[r.s][0]++; correct++; }
   if (a.ans[k] === null) skipped++;
  });
  return { correct, skipped, wrong: a.size - correct - skipped, pct: (correct / a.size) * 100, per };
 }
 function finish(timeUp) {
  stopTimer();
  const a = attempt, s = score(a);
  a.done = true;
  a.finishedAt = Math.min(Date.now(), a.end);
  const hist = load(KEY_HISTORY, []);
  hist.push({ name: a.name || "", date: a.finishedAt, size: a.size, correct: s.correct, pct: s.pct, passed: s.pct >= PASS, lang: a.lang, secs: Math.round((a.finishedAt - a.start) / 1000), per: s.per });
  store(KEY_HISTORY, hist.slice(-50));
  store(KEY_ATTEMPT, null);
  renderResult(a, s, timeUp, hist.length - 1);
 }
 let reviewFilter = "all";
 function renderResult(a, s, timeUp, histIndex) {
  const u = t(), passed = s.pct >= PASS, need = Math.max(0, Math.ceil((PASS / 100) * a.size) - s.correct);
  const rows = Object.entries(s.per).map(([slug, [c, n]]) => ({ slug, c, n, p: (c / n) * 100 })).sort((x, y) => x.p - y.p);
  app.innerHTML = `${timeUp ? `<p class="xt-banner">${u.timeUp}</p>` : ""}
   <section class="xt-card xt-result ${passed ? "ok" : "no"}">
    <div class="xt-ring" style="--p:${s.pct.toFixed(1)}"><b>${s.pct.toFixed(1)}%</b><small>${u.score}</small></div>
    <div><span class="xt-badge ${passed ? "ok" : "no"}">${passed ? u.passed : u.failed}</span><h1 class="xt-result-h">${passed ? u.passMsg : u.resultTitle}</h1>${passed ? "" : `<p>${u.failMsg(need)}</p>`}
     <dl class="xt-stats"><div><dt>${u.correct}</dt><dd>${s.correct} / ${a.size}</dd></div><div><dt>${u.wrong}</dt><dd>${s.wrong}</dd></div><div><dt>${u.skipped}</dt><dd>${s.skipped}</dd></div><div><dt>${u.time}</dt><dd>${fmtTime(a.finishedAt - a.start)}</dd></div></dl>
     <div class="xt-actions">${passed ? `<a class="btn btn-primary" href="#xtCert">🎓 ${u.certReady} ↓</a>` : ""}<button type="button" class="btn btn-secondary" data-act="home">${u.retake}</button></div>
    </div>
   </section>
   ${passed ? certSection(a.name || load("mp-test-name", "")) : ""}
   <section class="xt-card"><h2 class="xt-h">${u.byModule}</h2><div class="xt-table-wrap"><table class="xt-table"><tbody>${rows.map(r => `<tr class="${r.p < PASS ? "weak" : ""}"><td>${esc(modTitle(r.slug))}</td><td class="num">${r.c} / ${r.n}</td><td class="xt-barcell"><span class="xt-mbar"><i style="width:${r.p.toFixed(0)}%"></i></span>${r.p.toFixed(0)}%</td><td class="num">${r.p < PASS ? `<a href="lesson-${encodeURIComponent(r.slug)}${lang === "hi" ? "-hi" : ""}.html">${u.revise} →</a>` : "✓"}</td></tr>`).join("")}</tbody></table></div></section>
   <section class="xt-card"><h2 class="xt-h">${u.review}</h2><div class="xt-filters" role="group">${u.filters.map(([id, l]) => `<button type="button" class="xt-chip${reviewFilter === id ? " on" : ""}" data-rf="${id}" aria-pressed="${reviewFilter === id}">${l}</button>`).join("")}</div><ol class="xt-review" data-review></ol></section>`;
  app._result = { a, s, histIndex };
  renderReview();
  window.scrollTo({ top: 0 });
  if (passed) {
   app._cert = { histIndex };
   const name = a.name || load("mp-test-name", "");
   if (name) make(name, false); else { app.querySelector("[data-certbox]").hidden = true; app.querySelector("[data-certform]").hidden = false; }
  }
 }
 function renderReview() {
  const { a } = app._result, u = t(), list = app.querySelector("[data-review]");
  list.innerHTML = a.qs.map((r, k) => {
   const q = qOf(a, k), mine = a.ans[k], ok = mine === q.correct;
   const show = reviewFilter === "all" || (reviewFilter === "wrong" && mine !== null && !ok) || (reviewFilter === "skipped" && mine === null) || (reviewFilter === "marked" && a.marked[k]);
   if (!show) return "";
   return `<li value="${k + 1}" class="${ok ? "ok" : "no"}" lang="${a.lang}"><p class="xt-rq">${esc(q.text)} <small>${esc(modTitle(q.slug))}</small></p>
    <p><span class="xt-tag ${ok ? "ok" : "no"}">${u.yours}</span> ${mine === null ? `<i>${u.none}</i>` : `${LETTERS[mine]}. ${esc(q.options[mine])}`}</p>
    ${ok ? "" : `<p><span class="xt-tag ok">${u.right}</span> ${LETTERS[q.correct]}. ${esc(q.options[q.correct])}</p>`}
    ${q.why ? `<p class="xt-why"><b>${u.why}:</b> ${esc(q.why)}</p>` : ""}</li>`;
  }).join("") || `<p class="xt-muted">—</p>`;
 }

 // ---------- Certificate ----------
 // The certificate ID is a checksum of the name, score and date, so a verification link can show whether those
 // details were changed. It is not a secret signature: this site has no server to record certificates.
 function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36).toUpperCase().padStart(7, "0"); }
 const certId = c => `MP-${new Date(c.d).toISOString().slice(0, 10).replace(/-/g, "")}-${hash(`${c.n}|${c.d}|${c.c}|${c.t}`)}`;
 const b64 = s => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
 const unb64 = s => decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))));
 // The link carries the details and the ID printed on the certificate; editing any detail makes them disagree.
 const verifyUrl = c => `${location.origin}${location.pathname}?verify=${b64(JSON.stringify(Object.assign({}, c, { id: certId(c) })))}`;
 function certSection(name) {
  const u = t();
  return `<section class="xt-card xt-certbox" id="xtCert"><h2 class="xt-h">🎓 ${u.certReady}</h2><p class="xt-muted" data-certnote>${name ? esc(u.certReadyText(name)) : ""}</p>
    <div data-certbox><canvas width="1600" height="1131" class="xt-canvas" role="img" aria-label="${esc(u.certTitle)}"></canvas>
    <div class="xt-actions"><button type="button" class="btn btn-primary" data-act="png">⤓ ${u.download}</button><button type="button" class="btn btn-secondary" data-act="print">🖨 ${u.print}</button><button type="button" class="btn btn-secondary" data-act="copy">🔗 ${u.copy}</button><button type="button" class="btn btn-secondary" data-act="editname">✎ ${u.editName}</button></div></div>
    <form class="xt-certform" data-certform novalidate hidden><label class="xt-field"><span>${u.name}</span><input name="name" maxlength="60" autocomplete="name" value="${esc(name)}" required></label><button type="submit" class="btn btn-primary">${u.update}</button></form>
    <p class="xt-err" data-err aria-live="polite"></p></section>`;
 }
 function renderCert(histIndex) {
  const u = t(), h = load(KEY_HISTORY, [])[histIndex];
  if (!h || !h.passed) { renderIntro(); return; }
  const saved = load("mp-test-name", "");
  app.innerHTML = `<section class="xt-hero"><div class="eyebrow">🎓 ${u.certTitle}</div><h1 class="lesson-title">${u.certTitle}</h1><p class="lesson-summary">${u.certIntro}</p></section>
   <section class="xt-card"><form class="xt-certform" data-certform novalidate><label class="xt-field"><span>${u.name}</span><input name="name" maxlength="60" autocomplete="name" value="${esc(h.name || saved)}" required></label><button type="submit" class="btn btn-primary">${u.make}</button><p class="xt-err" data-err aria-live="polite"></p></form></section>
   <section class="xt-card xt-certbox" data-certbox hidden><canvas width="1600" height="1131" class="xt-canvas" role="img" aria-label="${esc(u.certTitle)}"></canvas>
    <div class="xt-actions"><button type="button" class="btn btn-primary" data-act="png">⤓ ${u.download}</button><button type="button" class="btn btn-secondary" data-act="print">🖨 ${u.print}</button><button type="button" class="btn btn-secondary" data-act="copy">🔗 ${u.copy}</button><button type="button" class="btn btn-secondary" data-act="home">${u.home}</button></div></section>`;
  app._cert = { histIndex };
  if (h.name) make(h.name);
 }
 async function make(name, scroll) {
  const hist = load(KEY_HISTORY, []), h = hist[app._cert.histIndex];
  h.name = name;
  store(KEY_HISTORY, hist);
  store("mp-test-name", name);
  const c = { n: name, d: h.date, c: h.correct, t: h.size };
  app._cert.data = c;
  const canvas = app.querySelector("canvas");
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  drawCertificate(canvas, c, BANK.modules.length, await logoImage());
  app.querySelector("[data-certbox]").hidden = false;
  const note = app.querySelector("[data-certnote]");
  if (note) note.textContent = t().certReadyText(name);
  const form = app.querySelector("[data-certform]");
  if (form && app.querySelector("[data-certnote]")) form.hidden = true;
  if (scroll !== false) app.querySelector("[data-certbox]").scrollIntoView({ behavior: "smooth", block: "start" });
 }
 // The site logo for the certificate (drawn without it if it cannot load).
 let logoPromise = null;
 function logoImage() {
  logoPromise = logoPromise || new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = "../images/logo-mark.png"; });
  return logoPromise;
 }
 function drawCertificate(cv, c, modules, logo) {
  const x = cv.getContext("2d"), W = cv.width, H = cv.height, pct = ((c.c / c.t) * 100).toFixed(1);
  const serif = "Georgia, 'Times New Roman', serif", sans = "Manrope, 'DM Sans', Arial, sans-serif";
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, W, H); // white, like the logo's own background
  // Frame
  x.strokeStyle = "#0f2a3f"; x.lineWidth = 14; x.strokeRect(36, 36, W - 72, H - 72);
  x.strokeStyle = "#1f9d7a"; x.lineWidth = 3; x.strokeRect(62, 62, W - 124, H - 124);
  const g = x.createLinearGradient(0, 0, W, 0); g.addColorStop(0, "#1f9d7a"); g.addColorStop(1, "#2f7fc1");
  x.fillStyle = g; x.fillRect(62, 62, W - 124, 16); x.fillRect(62, H - 78, W - 124, 16);
  // Logo
  x.textAlign = "center"; x.textBaseline = "middle";
  if (logo) x.drawImage(logo, W / 2 - 52, 96, 104, 104);
  // Wordmark in the logo's colours: Market (navy) Path (green) Academy (slate).
  x.font = `800 32px ${sans}`;
  const parts = [["Market", "#0b2e5f"], ["Path", "#178a4a"], ["Academy", "#3d4f66"]], wordW = parts.reduce((a, p) => a + x.measureText(p[0]).width, 0);
  let px = W / 2 - wordW / 2;
  x.textAlign = "left";
  parts.forEach(([txt, col]) => { x.fillStyle = col; x.fillText(txt, px, 228); px += x.measureText(txt).width; });
  x.textAlign = "center";
  // Text
  x.fillStyle = "#1f9d7a"; x.font = `700 22px ${sans}`; x.fillText("C E R T I F I C A T E   O F   A C H I E V E M E N T", W / 2, 300);
  x.fillStyle = "#3d4f66"; x.font = `italic 30px ${serif}`; x.fillText("This is to certify that", W / 2, 382);
  let size = 78;
  x.font = `700 ${size}px ${serif}`;
  while (x.measureText(c.n).width > W - 360 && size > 40) { size -= 4; x.font = `700 ${size}px ${serif}`; }
  x.fillStyle = "#0f2a3f"; x.fillText(c.n, W / 2, 470);
  x.strokeStyle = "#c9b98a"; x.lineWidth = 2; x.beginPath(); x.moveTo(W / 2 - 420, 520); x.lineTo(W / 2 + 420, 520); x.stroke();
  x.fillStyle = "#3d4f66"; x.font = `28px ${serif}`;
  x.fillText("has successfully passed the MarketPathAcademy Stock Market Final Test,", W / 2, 578);
  x.fillText(`covering all ${modules} learning modules, from market foundations to derivatives and tax,`, W / 2, 622);
  x.fillText(`with a score of ${pct}% (${c.c} of ${c.t} questions correct; pass mark 70%).`, W / 2, 666);
  // Seal
  const sx = W - 300, sy = 860;
  x.fillStyle = g; x.beginPath(); x.arc(sx, sy, 92, 0, Math.PI * 2); x.fill();
  x.strokeStyle = "#fbf9f3"; x.lineWidth = 4; x.beginPath(); x.arc(sx, sy, 78, 0, Math.PI * 2); x.stroke();
  x.fillStyle = "#ffffff"; x.font = `800 22px ${sans}`; x.fillText("PASSED", sx, sy - 22); x.font = `800 40px ${sans}`; x.fillText(`${Math.round(c.c / c.t * 100)}%`, sx, sy + 22);
  // Date, ID, signature
  const date = new Date(c.d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  x.textAlign = "left"; x.fillStyle = "#0f2a3f"; x.font = `700 26px ${sans}`; x.fillText(date, 170, 840);
  x.strokeStyle = "#0f2a3f"; x.lineWidth = 1.5; x.beginPath(); x.moveTo(170, 864); x.lineTo(520, 864); x.stroke();
  x.fillStyle = "#5a6b80"; x.font = `20px ${sans}`; x.fillText("Date", 170, 892);
  x.fillStyle = "#0f2a3f"; x.font = `italic 34px ${serif}`; x.fillText("MarketPathAcademy", 640, 836);
  x.beginPath(); x.moveTo(640, 864); x.lineTo(980, 864); x.stroke();
  x.fillStyle = "#5a6b80"; x.font = `20px ${sans}`; x.fillText("MarketPathAcademy Learning", 640, 892);
  x.fillStyle = "#5a6b80"; x.font = `18px ${sans}`;
  x.fillText(`Certificate ID: ${certId(c)}`, 170, 990);
  x.fillText("A certificate of learning from MarketPathAcademy. Not a professional qualification or a SEBI / NISM certification.", 170, 1020);
 }
 function renderVerify(code) {
  const u = t();
  let c = null;
  try { c = JSON.parse(unb64(code)); if (!(c && typeof c.n === "string" && c.d > 0 && c.c >= 0 && c.t > 0 && c.c <= c.t && (c.c / c.t) * 100 >= PASS && c.id === certId(c))) c = null; } catch (e) { c = null; }
  app.innerHTML = `<section class="xt-hero"><div class="eyebrow">🎓</div><h1 class="lesson-title">${u.verifyTitle}</h1></section>
   <section class="xt-card xt-verify ${c ? "ok" : "no"}">${c ? `<p class="xt-badge ok">✓ ${u.verifyOk}</p><dl class="xt-stats"><div><dt>${u.name}</dt><dd>${esc(c.n)}</dd></div><div><dt>${u.score}</dt><dd>${((c.c / c.t) * 100).toFixed(1)}% (${c.c} / ${c.t})</dd></div><div><dt>Date</dt><dd>${new Date(c.d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</dd></div><div><dt>ID</dt><dd>${certId(c)}</dd></div></dl>` : `<p class="xt-badge no">✕ ${u.verifyBad}</p>`}<p class="xt-muted">${u.verifyNote}</p><a class="btn btn-secondary" href="test.html">${u.home}</a></section>`;
 }

 // ---------- Events ----------
 app.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  const act = b.dataset.act;
  if (b.dataset.go !== undefined) go(Number(b.dataset.go));
  else if (b.dataset.cert !== undefined) renderCert(Number(b.dataset.cert));
  else if (b.dataset.rf) { reviewFilter = b.dataset.rf; app.querySelectorAll("[data-rf]").forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", String(x === b)); }); renderReview(); }
  else if (act === "prev") go(attempt.cur - 1);
  else if (act === "next") go(attempt.cur + 1);
  else if (act === "clear") { attempt.ans[attempt.cur] = null; save(); renderQuestion(); }
  else if (act === "mark") { attempt.marked[attempt.cur] = !attempt.marked[attempt.cur]; save(); renderQuestion(); app.querySelector('[data-act="mark"]').focus(); }
  else if (act === "submit") confirmSubmit();
  else if (act === "resume") { warned = {}; renderQuestion(); }
  else if (act === "discard") { if (confirm(t().discard + "?")) { attempt = null; store(KEY_ATTEMPT, null); renderIntro(); } }
  else if (act === "editname") { const fm = app.querySelector("[data-certform]"); fm.hidden = false; fm.name.focus(); fm.name.select(); }
  else if (act === "home") { history.replaceState(null, "", location.pathname); renderIntro(); window.scrollTo({ top: 0 }); }
  else if (act === "png") {
   const a = document.createElement("a");
   a.href = app.querySelector("canvas").toDataURL("image/png");
   a.download = `MarketPathAcademy-certificate-${certId(app._cert.data)}.png`;
   document.body.appendChild(a); a.click(); a.remove();
  }
  else if (act === "print") {
   const w = window.open("", "_blank");
   if (!w) { alert("Allow pop-ups to print the certificate, or download the PNG."); return; }
   w.document.write(`<!doctype html><title>MarketPathAcademy certificate</title><style>@page{size:A4 landscape;margin:0}html,body{margin:0}img{width:100%;height:auto;display:block}</style><img src="${app.querySelector("canvas").toDataURL("image/png")}" onload="setTimeout(function(){print()},200)">`);
   w.document.close();
  }
  else if (act === "copy") {
   const link = verifyUrl(app._cert.data), done = () => { const el = app.querySelector("[data-err]"); el.textContent = t().copied; el.className = "xt-err ok"; };
   if (navigator.clipboard) navigator.clipboard.writeText(link).then(done, () => prompt(t().copy, link)); else prompt(t().copy, link);
  }
 });
 app.addEventListener("change", e => { if (e.target.name === "opt" && attempt && !attempt.done) choose(Number(e.target.value)); });
 app.addEventListener("submit", e => {
  if (!e.target.matches("[data-certform]")) return;
  e.preventDefault();
  const name = e.target.name.value.trim().replace(/\s+/g, " ");
  const err = app.querySelector("[data-err]");
  if (name.length < 2 || name.length > 60) { err.textContent = t().nameErr; err.className = "xt-err"; return; }
  err.textContent = "";
  make(name);
 });
 document.addEventListener("keydown", e => {
  if (!attempt || attempt.done || !app.querySelector(".xt-q") || document.querySelector(".xt-modal") || e.ctrlKey || e.metaKey || e.altKey) return;
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) && e.target.type !== "radio") return;
  const n = qOf(attempt, attempt.cur).options.length;
  if (/^[1-9]$/.test(e.key) && Number(e.key) <= n) { e.preventDefault(); choose(Number(e.key) - 1); }
  else if (e.key === "ArrowRight" && e.target.type !== "radio") { e.preventDefault(); go(attempt.cur + 1); }
  else if (e.key === "ArrowLeft" && e.target.type !== "radio") { e.preventDefault(); go(attempt.cur - 1); }
  else if (e.key.toLowerCase() === "m") { attempt.marked[attempt.cur] = !attempt.marked[attempt.cur]; save(); renderQuestion(); }
 });
 window.addEventListener("beforeunload", e => { if (attempt && !attempt.done && app.querySelector(".xt-q")) { save(); e.preventDefault(); e.returnValue = t().leave; } });

 // ---------- Start ----------
 function applyLang() {
  document.documentElement.lang = lang;
  document.title = lang === "hi" ? "फ़ाइनल टेस्ट — MarketPathAcademy" : (window.MPChrome && MPChrome.docTitle) || document.title;
  const d = document.querySelector('[data-ui="disclaimer"]');
  if (d) d.textContent = t().disclaimer;
 }
 function route() {
  const v = new URLSearchParams(location.search).get("verify");
  if (v) renderVerify(v);
  else if (attempt && !attempt.done && Date.now() < attempt.end && app.dataset.started) renderQuestion();
  else if (app._result && !attempt) renderResult(app._result.a, app._result.s, false, app._result.histIndex);
  else if (app._cert && !attempt) renderCert(app._cert.histIndex);
  else renderIntro();
 }
 document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  const sel = document.getElementById("languageSelect");
  sel.value = lang;
  // The page language changes the buttons and labels; a test in progress keeps the language it started in.
  sel.addEventListener("change", e => { lang = e.target.value; MP.setLang(lang); applyLang(); app.dataset.started = attempt && !attempt.done && app.querySelector(".xt-q") ? "1" : ""; route(); });
  MP.setupMenu();
  applyLang();
  if (!BANK) { app.innerHTML = `<p class="xt-banner">The question bank could not be loaded. Reload the page.</p>`; return; }
  route();
 });
})();
