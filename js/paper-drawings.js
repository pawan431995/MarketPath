// Drawing tools for the paper-trading chart: trend line, horizontal line, rectangle, Fibonacci retracement,
// long/short risk-reward box and an eraser. Drawings are stored as (time, price) points, so they stay anchored
// when the chart scrolls, zooms or changes timeframe. They are drawn on an SVG layer over the main price pane.
const PaperDrawings = (function () {
 const FIB = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
 const HINTS = {
  cursor: "",
  trend: "Click two points to draw a trend line. Esc cancels.",
  hline: "Click a price level to draw a horizontal line.",
  rect: "Click two opposite corners to mark a zone.",
  fib: "Click the swing start, then the swing end.",
  rr: "Click the entry, then the stop loss. The target is placed at 2× the risk (1:2).",
  erase: "Click a drawing to delete it."
 };
 const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

 // opts: { svg, getContext() -> { chart, series, bars, tfSec }, getList() -> array, onChange(), onToolChange(tool, hint), format(n) }
 function create(opts) {
  const svg = opts.svg;
  let tool = "cursor", pending = null, hover = null, frame = 0, W = 0, H = 0;

  // Time <-> bar position, by bar index rather than arithmetic, so gaps (nights, weekends) map correctly.
  // Before the first or after the last bar, positions extend at one bar per tfSec.
  function timeToLogical(bars, t, tfSec) {
   const n = bars.length;
   if (t <= bars[0].time) return (t - bars[0].time) / tfSec;
   if (t >= bars[n - 1].time) return n - 1 + (t - bars[n - 1].time) / tfSec;
   let lo = 0, hi = n - 1;
   while (hi - lo > 1) { const m = (lo + hi) >> 1; if (bars[m].time <= t) lo = m; else hi = m; }
   return lo + (t - bars[lo].time) / (bars[hi].time - bars[lo].time);
  }
  function logicalToTime(bars, l, tfSec) {
   const n = bars.length;
   if (l <= 0) return bars[0].time + l * tfSec;
   if (l >= n - 1) return bars[n - 1].time + (l - (n - 1)) * tfSec;
   const lo = Math.floor(l);
   return bars[lo].time + (l - lo) * (bars[lo + 1].time - bars[lo].time);
  }
  function toX(t) {
   const c = opts.getContext();
   if (!c.chart || !c.bars.length) return null;
   return c.chart.timeScale().logicalToCoordinate(timeToLogical(c.bars, t, c.tfSec));
  }
  function toY(p) {
   const c = opts.getContext();
   return c.series ? c.series.priceToCoordinate(p) : null;
  }
  function fromXY(x, y) {
   const c = opts.getContext();
   if (!c.chart || !c.series || !c.bars.length) return null;
   const l = c.chart.timeScale().coordinateToLogical(x);
   const p = c.series.coordinateToPrice(y);
   if (l === null || p === null) return null;
   return { t: logicalToTime(c.bars, l, c.tfSec), p };
  }
  const label = (x, y, text, anchor, cls) => `<text x="${x}" y="${y}" text-anchor="${anchor || "start"}" class="dw-label ${cls || ""}">${esc(text)}</text>`;
  const fmt = n => opts.format(n);
  const pct = (a, b) => `${(((b - a) / a) * 100).toFixed(2)}%`;

  function shape(d, i, preview) {
   const wrap = (inner, cls) => `<g class="dw ${cls}${preview ? " dw-preview" : ""}"${preview ? "" : ` data-i="${i}"`}>${inner}</g>`;
   const x1 = toX(d.a.t), y1 = toY(d.a.p);
   if (x1 === null || y1 === null) return "";
   if (d.type === "hline") {
    return wrap(`<line x1="0" x2="${W}" y1="${y1}" y2="${y1}" class="dw-stroke"/><line x1="0" x2="${W}" y1="${y1}" y2="${y1}" class="dw-hit"/>${label(W - 6, y1 - 5, fmt(d.a.p), "end")}`, "dw-hline");
   }
   const x2 = toX(d.b.t), y2 = toY(d.b.p);
   if (x2 === null || y2 === null) return "";
   const L = Math.min(x1, x2), R = Math.max(x1, x2), T = Math.min(y1, y2), B = Math.max(y1, y2);
   if (d.type === "trend") {
    return wrap(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="dw-stroke"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="dw-hit"/><circle cx="${x1}" cy="${y1}" r="3" class="dw-dot"/><circle cx="${x2}" cy="${y2}" r="3" class="dw-dot"/>`, "dw-trend");
   }
   if (d.type === "rect") {
    return wrap(`<rect x="${L}" y="${T}" width="${R - L}" height="${B - T}" class="dw-zone"/>${label(L + 4, T - 5, `${fmt(Math.max(d.a.p, d.b.p))} – ${fmt(Math.min(d.a.p, d.b.p))}`)}`, "dw-rect");
   }
   if (d.type === "fib") {
    // From swing start (a) to swing end (b): 0% at the end, 100% back at the start.
    let inner = "";
    FIB.forEach((lv, k) => {
     const price = d.b.p - (d.b.p - d.a.p) * lv, y = toY(price);
     if (y === null) return;
     if (k > 0) {
      const yPrev = toY(d.b.p - (d.b.p - d.a.p) * FIB[k - 1]);
      if (yPrev !== null) inner += `<rect x="${L}" y="${Math.min(y, yPrev)}" width="${Math.max(0, W - L)}" height="${Math.abs(y - yPrev)}" class="dw-fib-band dw-fib-${k % 2}"/>`;
     }
     inner += `<line x1="${L}" x2="${W}" y1="${y}" y2="${y}" class="dw-stroke dw-fib-line"/>${label(L + 4, y - 4, `${(lv * 100).toFixed(1)}%  ${fmt(price)}`)}`;
    });
    inner += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="dw-stroke dw-dash"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="dw-hit"/>`;
    return wrap(inner, "dw-fib");
   }
   if (d.type === "rr") {
    const entry = d.a.p, stop = d.b.p, risk = entry - stop, target = entry + 2 * risk;
    const yT = toY(target);
    if (yT === null || risk === 0) return "";
    const left = L, right = R - L < 40 ? L + 140 : R;
    const long = risk > 0;
    return wrap(
     `<rect x="${left}" y="${Math.min(y1, yT)}" width="${right - left}" height="${Math.abs(yT - y1)}" class="dw-profit"/>` +
     `<rect x="${left}" y="${Math.min(y1, y2)}" width="${right - left}" height="${Math.abs(y2 - y1)}" class="dw-loss"/>` +
     `<line x1="${left}" x2="${right}" y1="${y1}" y2="${y1}" class="dw-stroke"/>` +
     label(left + 4, yT + (long ? 13 : -5), `Target ${fmt(target)} (${pct(entry, target)}) · 1:2`, "start", "dw-label-up") +
     label(left + 4, y1 + (long ? -5 : 13), `${long ? "Long" : "Short"} entry ${fmt(entry)}`) +
     label(left + 4, y2 + (long ? -5 : 13), `Stop ${fmt(stop)} (${pct(entry, stop)})`, "start", "dw-label-down"),
     "dw-rr"
    );
   }
   return "";
  }

  function render() {
   const c = opts.getContext();
   if (!c.chart || !c.series) { svg.innerHTML = ""; return; }
   const size = c.chart.paneSize(0);
   W = size.width; H = size.height;
   svg.setAttribute("width", W);
   svg.setAttribute("height", H);
   svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
   let html = opts.getList().map((d, i) => shape(d, i, false)).join("");
   if (pending && hover) html += shape(Object.assign({}, pending, { b: hover }), -1, true);
   svg.innerHTML = html;
  }

  function schedule() {
   if (frame) return;
   frame = requestAnimationFrame(() => { frame = 0; render(); });
  }

  function setTool(t) {
   tool = t;
   pending = null;
   hover = null;
   svg.classList.toggle("dw-active", t !== "cursor");
   svg.dataset.tool = t;
   opts.onToolChange(t, HINTS[t] || "");
   render();
  }

  function local(e) {
   const r = svg.getBoundingClientRect();
   return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function finish() {
   opts.onChange();
   setTool("cursor");
  }

  svg.addEventListener("pointerdown", e => {
   if (tool === "cursor") return;
   e.preventDefault();
   if (tool === "erase") {
    const g = e.target.closest("[data-i]");
    if (g) { opts.getList().splice(Number(g.dataset.i), 1); opts.onChange(); render(); }
    return;
   }
   const { x, y } = local(e);
   const pt = fromXY(x, y);
   if (!pt) return;
   if (tool === "hline") { opts.getList().push({ type: "hline", a: pt }); finish(); return; }
   if (!pending) { pending = { type: tool, a: pt }; hover = pt; render(); return; }
   opts.getList().push({ type: pending.type, a: pending.a, b: pt });
   finish();
  });
  svg.addEventListener("pointermove", e => {
   if (!pending) return;
   const { x, y } = local(e);
   const pt = fromXY(x, y);
   if (pt) { hover = pt; schedule(); }
  });

  return {
   render, schedule, setTool,
   tool: () => tool,
   undo() { const list = opts.getList(); if (list.length) { list.pop(); opts.onChange(); render(); } },
   clear() { const list = opts.getList(); list.splice(0, list.length); opts.onChange(); render(); }
  };
 }

 return { create, HINTS };
})();
