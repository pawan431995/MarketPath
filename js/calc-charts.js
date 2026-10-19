// Small SVG chart kit for the calculators: line/area (optionally stacked), grouped columns, donut and a
// progress meter. Follows the site's data-viz rules: fixed categorical colour order (--viz-1..8, validated
// for colour-vision deficiency on both themes), 2px lines, ~10% area washes, hairline solid grid, a legend
// for 2+ series, hover tooltips, and a "View as table" fallback for every chart.
//
// spec (line):  { type: "line", title, x: [labels], xTitle, series: [{ name, values, area }], stacked, format }
// spec (bar):   { type: "bar", title, x: [labels], xTitle, series: [{ name, values }], format }
// spec (donut): { type: "donut", title, items: [{ label, value }], center: { label, value }, format }
// spec (progress): { type: "progress", title, value, target, label }
// format: "money" (default) | "pct" | "num"
const CalcCharts = (function () {
 const W = 640, H = 260, PAD = { l: 64, r: 18, t: 14, b: 30 };
 const PW = W - PAD.l - PAD.r, PH = H - PAD.t - PAD.b;
 const color = i => `var(--viz-${(i % 8) + 1})`;
 const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
 const fin = v => typeof v === "number" && Number.isFinite(v);

 function niceTicks(min, max, count = 4) {
  if (min === max) max = min + 1;
  const raw = (max - min) / count, mag = Math.pow(10, Math.floor(Math.log10(raw))), norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step, ticks = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(Math.abs(v) < step / 1e6 ? 0 : v);
  return ticks;
 }

 function formatters(spec, F) {
  if (spec.format === "pct") return { val: v => F.pct(v), axis: v => F.pct(v, 0) };
  if (spec.format === "num") return { val: v => F.num(v), axis: v => F.compactNum(v) };
  return { val: v => F.money(v), axis: v => F.compact(v) };
 }

 function legend(names, kind) {
  if (names.length < 2) return "";
  return `<div class="viz-legend">${names.map((n, i) => `<span><i class="viz-key viz-key-${kind}" style="background:${color(i)}"></i>${esc(n)}</span>`).join("")}</div>`;
 }

 function tableHtml(head, rows) {
  return `<details class="viz-table"><summary>View as table</summary><div class="viz-table-scroll"><table><thead><tr>${head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>`;
 }

 function gridAndAxes(ticks, Y, xLabels, X) {
  let g = "";
  ticks.forEach(t => {
   const y = Y(t).toFixed(1);
   g += `<line class="viz-grid${t === 0 ? " viz-zero" : ""}" x1="${PAD.l}" x2="${W - PAD.r}" y1="${y}" y2="${y}"/>`;
  });
  return g + xLabels.map(([i, label]) => `<text class="viz-axis" x="${X(i).toFixed(1)}" y="${H - 8}" text-anchor="middle">${esc(label)}</text>`).join("");
 }
 function yLabels(ticks, Y, axis) {
  return ticks.map(t => `<text class="viz-axis" x="${PAD.l - 8}" y="${(Y(t) + 4).toFixed(1)}" text-anchor="end">${esc(axis(t))}</text>`).join("");
 }
 function pickLabels(x, max = 7) {
  const n = x.length, step = Math.max(1, Math.ceil(n / max)), out = [];
  for (let i = 0; i < n; i += step) out.push([i, x[i]]);
  if (out[out.length - 1][0] !== n - 1 && n - 1 - out[out.length - 1][0] >= step / 2) out.push([n - 1, x[n - 1]]);
  return out;
 }

 // ---------- Line / area ----------
 function line(el, spec, F) {
  const fm = formatters(spec, F), n = spec.x.length, S = spec.series;
  const acc = new Array(n).fill(0);
  const plotted = S.map(s => s.values.map((v, i) => (spec.stacked ? (acc[i] += fin(v) ? v : 0) : v)));
  const all = plotted.flat().filter(fin);
  const ticks = niceTicks(Math.min(0, ...all), Math.max(0, ...all));
  const min = ticks[0], max = ticks[ticks.length - 1];
  const X = i => PAD.l + (n === 1 ? PW / 2 : (i * PW) / (n - 1));
  const Y = v => PAD.t + ((max - v) * PH) / (max - min || 1);
  let body = gridAndAxes(ticks, Y, pickLabels(spec.x), X);
  S.forEach((s, k) => {
   const pts = plotted[k].map((v, i) => (fin(v) ? [X(i), Y(v)] : null));
   const valid = pts.filter(Boolean);
   if (!valid.length) return;
   if (spec.stacked || s.area) {
    const lower = spec.stacked && k > 0 ? plotted[k - 1] : null;
    const back = pts.map((p, i) => (p ? [p[0], lower ? Y(lower[i]) : Y(Math.max(min, 0))] : null)).filter(Boolean).reverse();
    body += `<polygon class="viz-area" style="fill:${color(k)}" points="${valid.concat(back).map(p => p.map(c => c.toFixed(1)).join(",")).join(" ")}"/>`;
   }
   body += `<polyline class="viz-line${s.dashed ? " viz-dashed" : ""}" style="stroke:${color(k)}" points="${valid.map(p => p.map(c => c.toFixed(1)).join(",")).join(" ")}"/>`;
   const last = valid[valid.length - 1];
   body += `<circle class="viz-dot" cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="4" style="fill:${color(k)}"/>`;
  });
  body += yLabels(ticks, Y, fm.axis);
  body += `<line class="viz-cross" x1="0" x2="0" y1="${PAD.t}" y2="${H - PAD.b}" visibility="hidden"/><g class="viz-hover-dots"></g>`;
  body += `<rect class="viz-hit" x="${PAD.l}" y="${PAD.t}" width="${PW}" height="${PH}"/>`;

  const head = [spec.xTitle || "", ...S.map(s => s.name)].concat(spec.stacked && S.length > 1 ? ["Total"] : []);
  const rows = spec.x.map((x, i) => [x, ...S.map(s => (fin(s.values[i]) ? fm.val(s.values[i]) : "—"))].concat(spec.stacked && S.length > 1 ? [fm.val(acc[i])] : []));
  el.innerHTML = frame(spec, body) + legend(S.map(s => s.name), "line") + tableHtml(head, rows);

  const svg = el.querySelector("svg"), cross = svg.querySelector(".viz-cross"), dots = svg.querySelector(".viz-hover-dots"), tip = el.querySelector(".viz-tip");
  function show(evt) {
   const r = svg.getBoundingClientRect(), sx = ((evt.clientX - r.left) * W) / r.width;
   const i = Math.max(0, Math.min(n - 1, Math.round(n === 1 ? 0 : ((sx - PAD.l) * (n - 1)) / PW)));
   const x = X(i);
   cross.setAttribute("x1", x); cross.setAttribute("x2", x); cross.setAttribute("visibility", "visible");
   dots.innerHTML = S.map((s, k) => (fin(plotted[k][i]) ? `<circle class="viz-dot" cx="${x.toFixed(1)}" cy="${Y(plotted[k][i]).toFixed(1)}" r="4" style="fill:${color(k)}"/>` : "")).join("");
   const lines = S.map((s, k) => (fin(s.values[i]) ? `<div><i class="viz-key viz-key-line" style="background:${color(k)}"></i><span>${esc(s.name)}</span><b>${esc(fm.val(s.values[i]))}</b></div>` : "")).join("");
   const total = spec.stacked && S.length > 1 ? `<div class="viz-tip-total"><span>Total</span><b>${esc(fm.val(acc[i]))}</b></div>` : "";
   tip.innerHTML = `<strong>${esc((spec.xTitle ? spec.xTitle + " " : "") + spec.x[i])}</strong>${lines}${total}`;
   place(tip, el, (x / W) * r.width);
  }
  function hide() { cross.setAttribute("visibility", "hidden"); dots.innerHTML = ""; tip.hidden = true; }
  const hit = svg.querySelector(".viz-hit");
  hit.addEventListener("pointermove", show);
  hit.addEventListener("pointerdown", show);
  hit.addEventListener("pointerleave", hide);
 }

 // ---------- Grouped columns (negatives allowed) ----------
 function bar(el, spec, F) {
  const fm = formatters(spec, F), n = spec.x.length, S = spec.series;
  const all = S.flatMap(s => s.values).filter(fin);
  const ticks = niceTicks(Math.min(0, ...all), Math.max(0, ...all));
  const min = ticks[0], max = ticks[ticks.length - 1];
  const Y = v => PAD.t + ((max - v) * PH) / (max - min || 1);
  const slot = PW / n, gap = 2;
  const barW = Math.max(2, Math.min(24, (slot * 0.7 - gap * (S.length - 1)) / S.length));
  const groupW = barW * S.length + gap * (S.length - 1);
  const X = i => PAD.l + slot * i + slot / 2;
  let body = gridAndAxes(ticks, Y, pickLabels(spec.x, 10), X);
  S.forEach((s, k) => s.values.forEach((v, i) => {
   if (!fin(v) || v === 0) return;
   const x = X(i) - groupW / 2 + k * (barW + gap), y0 = Y(0), y1 = Y(v);
   body += `<path class="viz-bar" style="fill:${color(k)}" d="${roundedBar(x, y0, y1, barW)}"/>`;
  }));
  body += yLabels(ticks, Y, fm.axis);
  body += spec.x.map((_, i) => `<rect class="viz-hit viz-hit-bar" data-i="${i}" x="${(PAD.l + slot * i).toFixed(1)}" y="${PAD.t}" width="${slot.toFixed(1)}" height="${PH}"/>`).join("");

  const head = [spec.xTitle || "", ...S.map(s => s.name)];
  const rows = spec.x.map((x, i) => [x, ...S.map(s => (fin(s.values[i]) ? fm.val(s.values[i]) : "—"))]);
  el.innerHTML = frame(spec, body) + legend(S.map(s => s.name), "box") + tableHtml(head, rows);
  const svg = el.querySelector("svg"), tip = el.querySelector(".viz-tip");
  svg.querySelectorAll(".viz-hit-bar").forEach(h => {
   const showBar = () => {
    const i = Number(h.dataset.i), r = svg.getBoundingClientRect();
    svg.querySelectorAll(".viz-hit-bar").forEach(o => o.classList.toggle("on", o === h));
    tip.innerHTML = `<strong>${esc((spec.xTitle ? spec.xTitle + " " : "") + spec.x[i])}</strong>${S.map((s, k) => `<div><i class="viz-key viz-key-box" style="background:${color(k)}"></i><span>${esc(s.name)}</span><b>${esc(fin(s.values[i]) ? fm.val(s.values[i]) : "—")}</b></div>`).join("")}`;
    place(tip, el, (X(i) / W) * r.width);
   };
   h.addEventListener("pointerenter", showBar);
   h.addEventListener("pointerdown", showBar);
   h.addEventListener("pointerleave", () => { h.classList.remove("on"); tip.hidden = true; });
  });
 }

 // A column with a 4px rounded data end and a square base.
 function roundedBar(x, y0, y1, w) {
  const up = y1 < y0, h = Math.abs(y1 - y0), r = Math.min(4, h, w / 2);
  if (up) return `M${x},${y0} V${y1 + r} Q${x},${y1} ${x + r},${y1} H${x + w - r} Q${x + w},${y1} ${x + w},${y1 + r} V${y0} Z`;
  return `M${x},${y0} V${y1 - r} Q${x},${y1} ${x + r},${y1} H${x + w - r} Q${x + w},${y1} ${x + w},${y1 - r} V${y0} Z`;
 }

 // ---------- Donut ----------
 function donut(el, spec, F) {
  const fm = formatters(spec, F);
  const items = spec.items.filter(it => fin(it.value) && it.value > 0);
  const total = items.reduce((s, it) => s + it.value, 0);
  if (!total) { el.innerHTML = ""; return; }
  const R = 96, r = 60, C = 110;
  let a0 = -Math.PI / 2, paths = "";
  items.forEach((it, k) => {
   const a1 = a0 + (it.value / total) * Math.PI * 2;
   paths += `<path class="viz-seg" data-k="${k}" style="fill:${color(spec.items.indexOf(it))}" d="${arc(C, C, R, r, a0, Math.min(a1, a0 + Math.PI * 2 - 1e-4))}"/>`;
   a0 = a1;
  });
  const center = spec.center ? `<text class="viz-center-label" x="${C}" y="${C - 6}" text-anchor="middle">${esc(spec.center.label)}</text><text class="viz-center-value" x="${C}" y="${C + 16}" text-anchor="middle">${esc(spec.center.value)}</text>` : "";
  const legendRows = items.map(it => `<li><i class="viz-key viz-key-box" style="background:${color(spec.items.indexOf(it))}"></i><span>${esc(it.label)}</span><b>${esc(fm.val(it.value))}</b><small>${((it.value / total) * 100).toFixed(1)}%</small></li>`).join("");
  el.innerHTML = `<figure class="viz viz-donut-wrap"><figcaption class="viz-title">${esc(spec.title || "")}</figcaption><div class="viz-donut"><div class="viz-plot"><svg viewBox="0 0 220 220" role="img" aria-label="${esc(spec.title || "Breakdown")}">${paths}${center}</svg><div class="viz-tip" hidden></div></div><ul class="viz-donut-legend">${legendRows}</ul></div></figure>` +
   tableHtml(["Item", "Value", "Share"], items.map(it => [it.label, fm.val(it.value), `${((it.value / total) * 100).toFixed(1)}%`]));
  const svg = el.querySelector("svg"), tip = el.querySelector(".viz-tip");
  svg.querySelectorAll(".viz-seg").forEach(p => {
   const showSeg = () => {
    const it = items[Number(p.dataset.k)];
    tip.innerHTML = `<strong>${esc(it.label)}</strong><div><span>${esc(fm.val(it.value))}</span><b>${((it.value / total) * 100).toFixed(1)}%</b></div>`;
    place(tip, el.querySelector(".viz-plot"), svg.getBoundingClientRect().width / 2);
   };
   p.addEventListener("pointerenter", showSeg);
   p.addEventListener("pointerdown", showSeg);
   p.addEventListener("pointerleave", () => { tip.hidden = true; });
  });
 }
 function arc(cx, cy, R, r, a0, a1) {
  const p = (rad, a) => `${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${p(R, a0)} A${R},${R} 0 ${large} 1 ${p(R, a1)} L${p(r, a1)} A${r},${r} 0 ${large} 0 ${p(r, a0)} Z`;
 }

 // ---------- Progress meter ----------
 function progress(el, spec) {
  const pct = spec.target > 0 ? Math.max(0, Math.min(100, (spec.value / spec.target) * 100)) : 0;
  el.innerHTML = `<figure class="viz"><figcaption class="viz-title">${esc(spec.title || "")}</figcaption><div class="viz-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct.toFixed(0)}" aria-label="${esc(spec.title || "Progress")}"><span style="width:${pct}%"></span></div><p class="viz-progress-label">${esc(spec.label || `${pct.toFixed(0)}%`)}</p></figure>`;
 }

 function frame(spec, body) {
  return `<figure class="viz"><figcaption class="viz-title">${esc(spec.title || "")}</figcaption><div class="viz-plot"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(spec.title || "Chart")}">${body}</svg><div class="viz-tip" hidden></div></div></figure>`;
 }

 // Positions the tooltip beside the pointer, flipping to the left near the right edge.
 function place(tip, host, xPx) {
  tip.hidden = false;
  const hostW = host.getBoundingClientRect().width, tw = tip.offsetWidth;
  const left = xPx + 14 + tw > hostW ? Math.max(0, xPx - 14 - tw) : xPx + 14;
  tip.style.left = `${left}px`;
 }

 function mount(el, spec, F) {
  if (!spec) { el.innerHTML = ""; return; }
  if (spec.type === "line") line(el, spec, F);
  else if (spec.type === "bar") bar(el, spec, F);
  else if (spec.type === "donut") donut(el, spec, F);
  else if (spec.type === "progress") progress(el, spec);
 }

 return { mount };
})();
