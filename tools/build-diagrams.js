// Generates the explanatory SVG diagrams in images/charts/ that are drawn from data (flows, waterfalls, timelines).
// Same visual style as the existing charts: dark rounded card, Arial, the site's green/amber/red/violet/blue.
// Edit the numbers or labels here and run:  node tools/build-diagrams.js
// Numbers in these diagrams are illustrative unless a caption names a source.
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "..", "images", "charts");

const C = { bg: "#0e1726", panel: "#142238", line: "#2b3d54", text: "#e7edf5", muted: "#9caec4", green: "#48e0b0", amber: "#ffd27a", red: "#ff8e98", violet: "#a994ff", blue: "#45a9d9" };
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const f = n => +n.toFixed(1);
function svg(w, h, title, body, note) {
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Arial, Helvetica, sans-serif" role="img" aria-label="${esc(title)}">` +
  `<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.muted}"/></marker></defs>` +
  `<rect width="${w}" height="${h}" rx="14" fill="${C.bg}"/>` +
  text(20, 30, title, { size: 14, weight: 700 }) + body +
  (note ? text(20, h - 12, note, { size: 11, fill: C.muted }) : "") + `</svg>\n`;
}
function text(x, y, s, o = {}) {
 return `<text x="${f(x)}" y="${f(y)}" fill="${o.fill || C.text}" font-size="${o.size || 13}" text-anchor="${o.anchor || "start"}"${o.weight ? ` font-weight="${o.weight}"` : ""}>${esc(s)}</text>`;
}
const rect = (x, y, w, h, fill, o = {}) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${o.rx ?? 8}" fill="${fill}"${o.opacity ? ` opacity="${o.opacity}"` : ""}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1.5}"` : ""}${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;
const arrow = (x1, y1, x2, y2, o = {}) => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${o.color || C.muted}" stroke-width="${o.w || 2}" marker-end="url(#arr)"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;
const line = (x1, y1, x2, y2, o = {}) => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${o.color || C.line}" stroke-width="${o.w || 1}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;
// A card with a coloured top edge, a title and up to three lines of muted text.
function card(x, y, w, h, title, lines, color) {
 return rect(x, y, w, h, C.panel, { stroke: C.line }) + rect(x, y, w, 4, color, { rx: 2 }) +
  text(x + w / 2, y + 28, title, { anchor: "middle", weight: 700, size: 13 }) +
  lines.map((l, i) => text(x + w / 2, y + 48 + i * 16, l, { anchor: "middle", size: 11, fill: C.muted })).join("");
}
// Waterfall: steps [{ label, value, total? }]; totals are drawn from zero, others float from the running total.
function waterfall(steps, o) {
 const { x0, y0, w, h, max } = o, n = steps.length, slot = w / n, bw = Math.min(46, slot * 0.6);
 const Y = v => y0 + h - (v / max) * h;
 let run = 0, out = line(x0, Y(0), x0 + w, Y(0), { color: C.line });
 steps.forEach((s, i) => {
  const cx = x0 + slot * i + slot / 2;
  let top, bottom, color;
  if (s.total) { top = Y(s.value); bottom = Y(0); color = C.blue; run = s.value; }
  else { const a = run, b = run + s.value; top = Y(Math.max(a, b)); bottom = Y(Math.min(a, b)); color = s.value >= 0 ? C.green : C.red; run = b; }
  out += rect(cx - bw / 2, top, bw, Math.max(2, bottom - top), color, { rx: 3, opacity: 0.9 });
  out += text(cx, top - 6, `${s.value > 0 && !s.total ? "+" : ""}${s.value}`, { anchor: "middle", size: 11, weight: 700 });
  s.label.split("\n").forEach((l, k) => { out += text(cx, y0 + h + 16 + k * 13, l, { anchor: "middle", size: 10.5, fill: C.muted }); });
 });
 return out;
}

const D = {};

D["trade-lifecycle.svg"] = svg(800, 330, "What happens after you press Buy (equity, T+1 settlement)", (() => {
 const boxes = [["You", ["Place an order", "in the broker app"], C.green], ["Broker", ["Checks funds and", "sends the order"], C.violet], ["Exchange (NSE/BSE)", ["Matches buyer", "and seller"], C.blue], ["Clearing corporation", ["Guarantees both", "sides settle"], C.amber], ["Depository (CDSL/NSDL)", ["Moves shares to", "your demat"], C.green]];
 const w = 138, gap = 16, y = 70;
 let out = "";
 boxes.forEach(([t, l, c], i) => { const x = 20 + i * (w + gap); out += card(x, y, w, 96, t, l, c); if (i < boxes.length - 1) out += arrow(x + w + 2, y + 48, x + w + gap - 2, y + 48); });
 out += rect(20, 200, 360, 70, "#132f31", { stroke: "#2e796b" }) + text(36, 226, "Trade day (T): order matched", { weight: 700 }) + text(36, 248, "You see an executed order and a contract note.", { size: 11.5, fill: C.muted });
 out += rect(420, 200, 360, 70, "#1d2840", { stroke: C.violet }) + text(436, 226, "Next trading day (T+1): settlement", { weight: 700 }) + text(436, 248, "Shares reach your demat; sale money reaches your account.", { size: 11.5, fill: C.muted });
 out += arrow(384, 235, 416, 235, { color: C.green });
 return out;
})(), "Illustrative flow. Your broker and the depository send you SMS and email confirmations at each step.");

D["market-day-timeline.svg"] = svg(800, 310,"A trading day on NSE and BSE (Monday to Friday, except holidays)", (() => {
 const x0 = 40, x1 = 760, t0 = 8.75, t1 = 16.25, X = h => x0 + ((h - t0) / (t1 - t0)) * (x1 - x0), y = 120;
 let out = line(x0, y + 40, x1, y + 40, { color: C.line, w: 2 });
 [9, 10, 11, 12, 13, 14, 15, 16].forEach(h => { out += line(X(h), y + 34, X(h), y + 46, { color: C.muted }); out += text(X(h), y + 64, `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? "pm" : "am"}`, { anchor: "middle", size: 11, fill: C.muted }); });
 // Narrow blocks carry no text; a numbered legend below explains each one.
 const block = (a, b, color, row) => rect(X(a), y - row * 22, X(b) - X(a), row ? 16 : 34, color, { rx: 5, opacity: 0.9 });
 out += block(9, 9.25, C.amber, 0) + block(9.25, 15.5, C.green, 0) + block(15, 15.5, C.violet, 1) + block(15.667, 16, C.blue, 0);
 out += text(X(9.25) + 10, y + 22, "Normal market: continuous trading", { size: 12, weight: 700, fill: "#0b1220" });
 const legend = [[C.amber, "Pre-open 9:00–9:15", "orders collected, opening price found"], [C.green, "Normal market 9:15–3:30", "continuous buying and selling"],
  [C.violet, "Closing price 3:00–3:30", "NSE: weighted average of last 30 minutes"], [C.blue, "Post-close 3:40–4:00", "trade only at the closing price"]];
 legend.forEach(([c, t, s], i) => { const lx = 40 + (i % 2) * 370, ly = 214 + Math.floor(i / 2) * 36; out += rect(lx, ly - 11, 12, 12, c, { rx: 3 }) + text(lx + 20, ly, t, { size: 12.5, weight: 700 }) + text(lx + 20, ly + 15, s, { size: 11, fill: C.muted }); });
 return out;
})(), "Times are indicative; exchanges publish the official timings and the yearly holiday list.");

D["price-band.svg"] = svg(800, 320, "Price band: a stock hits its upper circuit (20% band, illustrative)", (() => {
 const x0 = 60, x1 = 760, yTop = 70, yBot = 260, pMin = 95, pMax = 125, Y = p => yBot - ((p - pMin) / (pMax - pMin)) * (yBot - yTop);
 let out = line(x0, Y(100), x1, Y(100), { color: C.line, dash: "4 4" }) + text(x0 - 6, Y(100) + 4, "100", { anchor: "end", size: 11, fill: C.muted });
 out += line(x0, Y(120), x1, Y(120), { color: C.red, w: 2, dash: "6 4" }) + text(x1, Y(120) - 8, "Upper circuit ₹120 (+20%)", { anchor: "end", size: 12, weight: 700, fill: C.red });
 const pts = [100, 101, 103, 102, 105, 108, 107, 111, 114, 113, 117, 119, 120, 120, 120, 120, 120, 120, 120, 120];
 const X = i => x0 + (i / (pts.length - 1)) * (x1 - x0 - 10);
 out += `<polyline points="${pts.map((p, i) => `${f(X(i))},${f(Y(p))}`).join(" ")}" fill="none" stroke="${C.green}" stroke-width="3" stroke-linejoin="round"/>`;
 out += rect(X(12), Y(120) + 14, X(19) - X(12), 62, "#2a1d24", { stroke: C.red });
 out += text(X(12) + 12, Y(120) + 36, "Frozen at the band", { weight: 700, size: 12 });
 out += text(X(12) + 12, Y(120) + 54, "Only buyers left; trades only", { size: 11, fill: C.muted }) + text(X(12) + 12, Y(120) + 68, "at ₹120 if sellers appear.", { size: 11, fill: C.muted });
 out += text(x0, 290, "Lower circuit is the mirror image: only sellers, and you may be unable to exit.", { size: 12, fill: C.muted });
 return out;
})(), "");

D["complaint-path.svg"] = svg(800, 310, "If something goes wrong: where to complain (keep every record)", (() => {
 const steps = [["1. Your broker or DP", ["Written complaint", "with trade details"], C.green], ["2. SEBI SCORES", ["scores.sebi.gov.in", "tracked to closure"], C.violet], ["3. SMART ODR", ["smartodr.in", "conciliation, arbitration"], C.blue]];
 const w = 210, y = 66;
 let out = "";
 steps.forEach(([t, l, c], i) => { const x = 30 + i * (w + 40); out += card(x, y, w, 92, t, l, c); if (i < 2) out += arrow(x + w + 4, y + 46, x + w + 36, y + 46); });
 out += text(400, 186, "Not resolved? Move to the next step.", { anchor: "middle", size: 12, fill: C.muted });
 out += rect(30, 206, 740, 64, "#2a1d24", { stroke: C.red });
 out += text(48, 232, "Scam by an unregistered person (fake app, Telegram tips, 'guaranteed returns')?", { weight: 700, size: 12.5 });
 out += text(48, 252, "Report at once on cybercrime.gov.in or call 1930, and tell your bank to stop the payment.", { size: 12, fill: C.muted });
 return out;
})(), "");

D["balance-sheet-structure.svg"] = svg(800, 360, "A balance sheet always balances: assets = liabilities + equity (₹ crore, illustrative)", (() => {
 const x1 = 70, x2 = 390, w = 220, top = 74, H = 240, total = 1000, Y = v => (v / total) * H;
 const stack = (x, items) => { let y = top, out = ""; items.forEach(([label, v, c]) => { const h = Y(v); out += rect(x, y, w, h - 2, c, { rx: 4, opacity: 0.9 }); out += text(x + w / 2, y + h / 2 + 4, `${label}  ${v}`, { anchor: "middle", size: 12, weight: 700, fill: "#0b1220" }); y += h; }); return out; };
 let out = stack(x1, [["Fixed assets", 420, C.blue], ["Investments", 120, C.violet], ["Inventory", 160, C.amber], ["Receivables", 180, C.amber], ["Cash", 120, C.green]]);
 out += stack(x2, [["Equity (capital + reserves)", 520, C.green], ["Long-term debt", 230, C.red], ["Current liabilities", 250, C.amber]]);
 out += text(x1 + w / 2, top - 10, "What the company owns", { anchor: "middle", weight: 700 }) + text(x2 + w / 2, top - 10, "How it is funded", { anchor: "middle", weight: 700 });
 out += text(x1 + w + 50, top + H / 2 + 10, "=", { anchor: "middle", size: 34, weight: 700, fill: C.muted });
 out += rect(636, 110, 146, 140, C.panel, { stroke: C.line });
 out += text(650, 136, "Debt-to-equity", { size: 12, fill: C.muted }) + text(650, 156, "230 / 520 = 0.44", { weight: 700 });
 out += text(650, 196, "Current ratio", { size: 12, fill: C.muted }) + text(650, 216, "460 / 250 = 1.84", { weight: 700 });
 return out;
})(), "Current assets here = inventory + receivables + cash = 460. Both columns total 1,000.");

D["cash-flow-waterfall.svg"] = svg(800, 330, "Where the cash went this year (₹ crore, illustrative)", waterfall([
 { label: "Opening\ncash", value: 100, total: true }, { label: "Operations", value: 180 }, { label: "Investing\n(capex)", value: -120 },
 { label: "Financing\n(debt, dividends)", value: -40 }, { label: "Closing\ncash", value: 120, total: true }
], { x0: 70, y0: 60, w: 660, h: 200, max: 300 }), "Healthy pattern: operations generate cash that funds investment, debt repayment and dividends.");

D["profit-waterfall.svg"] = svg(800, 340, "From revenue to net profit in a quarterly result (₹ crore, illustrative)", waterfall([
 { label: "Revenue", value: 1000, total: true }, { label: "Raw\nmaterials", value: -450 }, { label: "Employee\ncosts", value: -150 }, { label: "Other\nexpenses", value: -180 },
 { label: "EBITDA", value: 220, total: true }, { label: "Depreciation", value: -40 }, { label: "Interest", value: -20 }, { label: "Other\nincome", value: 10 },
 { label: "Profit\nbefore tax", value: 170, total: true }, { label: "Tax", value: -43 }, { label: "Net profit\n(PAT)", value: 127, total: true }
], { x0: 30, y0: 60, w: 740, h: 210, max: 1050 }), "EBITDA margin = 220 / 1,000 = 22%. Net margin = 127 / 1,000 = 12.7%.");

D["shareholding-donut.svg"] = svg(800, 320, "Who owns the company: a shareholding pattern (illustrative)", (() => {
 const items = [["Promoters", 52, C.green], ["Foreign institutions (FII/FPI)", 18, C.blue], ["Domestic institutions (DII, incl. mutual funds)", 15, C.violet], ["Retail and others", 15, C.amber]];
 const cx = 190, cy = 175, R = 105, r = 62;
 let a0 = -Math.PI / 2, out = "";
 const p = (rad, a) => `${f(cx + rad * Math.cos(a))},${f(cy + rad * Math.sin(a))}`;
 items.forEach(([, v, c]) => { const a1 = a0 + (v / 100) * Math.PI * 2, large = a1 - a0 > Math.PI ? 1 : 0; out += `<path d="M${p(R, a0)} A${R},${R} 0 ${large} 1 ${p(R, a1)} L${p(r, a1)} A${r},${r} 0 ${large} 0 ${p(r, a0)} Z" fill="${c}" stroke="${C.bg}" stroke-width="2"/>`; a0 = a1; });
 out += text(cx, cy - 2, "100%", { anchor: "middle", size: 18, weight: 700 }) + text(cx, cy + 16, "of shares", { anchor: "middle", size: 11, fill: C.muted });
 items.forEach(([l, v, c], i) => { const y = 92 + i * 40; out += rect(360, y - 12, 14, 14, c, { rx: 3 }) + text(384, y, l, { size: 13 }) + text(760, y, `${v}%`, { anchor: "end", size: 13, weight: 700 }); });
 out += rect(360, 248, 400, 40, "#2a1d24", { stroke: C.red }) + text(376, 273, "Watch: promoter shares pledged as loan collateral", { size: 12, weight: 700 });
 return out;
})(), "Track the change each quarter: rising promoter or institutional holding is often read as confidence.");

D["split-bonus.svg"] = svg(800, 320, "Bonus issue and stock split: more shares, same total value", (() => {
 const cols = [["Before", "100 shares × ₹1,000", "Face value ₹10", C.blue], ["After 1:1 bonus", "200 shares × ₹500", "Face value ₹10", C.green], ["After 1:5 split", "500 shares × ₹200", "Face value ₹2", C.violet]];
 const w = 220, y = 70;
 let out = "";
 cols.forEach(([t, l1, l2, c], i) => {
  const x = 30 + i * (w + 30);
  out += card(x, y, w, 150, t, [l1, l2], c);
  out += text(x + w / 2, y + 120, "₹1,00,000", { anchor: "middle", size: 20, weight: 700, fill: C.green });
  // Bonus and split are two separate examples, each starting from the same 100 shares.
  if (i === 0) out += arrow(x + w + 4, y + 75, x + w + 26, y + 75);
  if (i === 1) out += text(x + w + 15, y + 80, "or", { anchor: "middle", size: 13, weight: 700, fill: C.muted });
 });
 out += text(400, 248, "Each example starts from the same 100 shares.", { anchor: "middle", size: 12, fill: C.muted });
 out += text(400, 270, "The price adjusts on the ex-date, so your holding is worth the same.", { anchor: "middle", size: 13, fill: C.muted });
 out += text(400, 290, "Remember to adjust your average buy price for tax records.", { anchor: "middle", size: 13, fill: C.muted });
 return out;
})(), "");

D["valuation-margin.svg"] = svg(800, 300, "Margin of safety: buy well below your estimate of value (illustrative)", (() => {
 const x0 = 60, x1 = 740, vMin = 600, vMax = 1300, X = v => x0 + ((v - vMin) / (vMax - vMin)) * (x1 - x0), y = 150;
 let out = line(x0, y, x1, y, { color: C.line, w: 2 });
 [600, 700, 800, 900, 1000, 1100, 1200, 1300].forEach(v => { out += line(X(v), y - 5, X(v), y + 5, { color: C.muted }) + text(X(v), y + 24, `₹${v}`, { anchor: "middle", size: 11, fill: C.muted }); });
 out += rect(X(950), y - 40, X(1150) - X(950), 28, C.green, { rx: 6, opacity: 0.35 }) + text((X(950) + X(1150)) / 2, y - 21, "Estimated value ₹950–1,150", { anchor: "middle", size: 12, weight: 700 });
 out += `<circle cx="${f(X(800))}" cy="${y}" r="9" fill="${C.amber}" stroke="${C.bg}" stroke-width="2"/>` + text(X(800), y - 18, "Price ₹800", { anchor: "middle", size: 12, weight: 700, fill: C.amber });
 // Margin of safety measured against the low end of the estimate: (950 − 800) / 950 ≈ 16%.
 out += line(X(800), y + 40, X(800), y + 60, { color: C.green, w: 2 }) + line(X(950), y + 40, X(950), y + 60, { color: C.green, w: 2 });
 out += line(X(800), y + 50, X(950), y + 50, { color: C.green, w: 2 });
 out += text((X(800) + X(950)) / 2, y + 76, "Margin of safety ≈ 16% below the low estimate", { anchor: "middle", size: 12, fill: C.muted });
 return out;
})(), "Estimates come from P/E versus peers, P/B, EV/EBITDA or a DCF. Use a range, never one exact number.");

D["annual-report-map.svg"] = svg(800, 300,"Where to look in an annual report", (() => {
 const items = [["Letter to shareholders", "Management's story", C.blue, false], ["MD&A", "Business, industry, risks", C.blue, false], ["Financial statements", "P&L, balance sheet, cash flow", C.green, false], ["Notes to accounts", "Details behind every number", C.amber, true],
  ["Auditor's report", "Qualifications and emphasis", C.red, true], ["Related-party transactions", "Deals with promoter entities", C.red, true], ["Contingent liabilities", "Possible future claims", C.amber, true], ["Corporate governance", "Board, pay, attendance", C.violet, false]];
 const w = 175, h = 92;
 let out = "";
 items.forEach(([t, s, c, flag], i) => {
  const x = 22 + (i % 4) * (w + 13), y = 56 + Math.floor(i / 4) * (h + 18);
  out += rect(x, y, w, h, C.panel, { stroke: flag ? C.red : C.line, sw: flag ? 2 : 1.5 }) + rect(x, y, w, 4, c, { rx: 2 });
  out += text(x + 12, y + 30, t, { weight: 700, size: 12.5 }) + text(x + 12, y + 50, s, { size: 11, fill: C.muted });
  if (flag) out += text(x + 12, y + 76, "Check for red flags", { size: 11, weight: 700, fill: C.red });
 });
 return out;
})(), "Red borders: sections where problems usually hide. Read them before the glossy pages.");

D["tax-holding-period.svg"] = svg(800, 330, "How gains from shares are taxed in India (rules from 23 July 2024)", (() => {
 const x0 = 40, x1 = 760, xm = 400, y = 90;
 let out = rect(x0, y, xm - x0 - 6, 70, "#2a2416", { stroke: C.amber }) + rect(xm + 6, y, x1 - xm - 6, 70, "#132f31", { stroke: C.green });
 out += text(x0 + 16, y + 28, "Held 12 months or less: short-term (STCG)", { weight: 700, size: 13 }) + text(x0 + 16, y + 50, "Taxed at 20% (listed shares, equity funds)", { size: 12, fill: C.muted });
 out += text(xm + 22, y + 28, "Held more than 12 months: long-term (LTCG)", { weight: 700, size: 13 }) + text(xm + 22, y + 50, "12.5% on gains above ₹1.25 lakh a year", { size: 12, fill: C.muted });
 out += arrow(x0, y + 100, x1, y + 100, { color: C.muted }) + text(x0, y + 122, "Buy date", { size: 11, fill: C.muted }) + text(xm, y + 122, "12 months", { anchor: "middle", size: 11, fill: C.muted });
 out += rect(x0, 240, 350, 50, C.panel, { stroke: C.violet }) + text(x0 + 16, 262, "Intraday trading", { weight: 700, size: 12.5 }) + text(x0 + 16, 280, "Speculative business income, at your slab rate", { size: 11.5, fill: C.muted });
 out += rect(410, 240, 350, 50, C.panel, { stroke: C.blue }) + text(426, 262, "Futures & options", { weight: 700, size: 12.5 }) + text(426, 280, "Non-speculative business income, at your slab rate", { size: 11.5, fill: C.muted });
 return out;
})(), "Plus 4% cess. Rates change with budgets: check incometax.gov.in before filing.");

D["fno-loss-study.svg"] = svg(800, 330, "About 93 in 100 individual F&O traders lost money (FY 2022–24, SEBI study)", (() => {
 let out = "";
 const size = 16, gap = 6, x0 = 40, y0 = 60;
 for (let i = 0; i < 100; i++) {
  const col = i % 20, row = Math.floor(i / 20), lost = i < 93;
  out += `<circle cx="${f(x0 + col * (size + gap) + size / 2)}" cy="${f(y0 + row * (size + gap) + size / 2)}" r="${size / 2}" fill="${lost ? C.red : C.green}" opacity="${lost ? 0.85 : 1}"/>`;
 }
 out += rect(500, 60, 270, 104, C.panel, { stroke: C.line });
 out += `<circle cx="522" cy="86" r="8" fill="${C.red}"/>` + text(538, 91, "Lost money: about 93", { size: 13, weight: 700 });
 out += `<circle cx="522" cy="118" r="8" fill="${C.green}"/>` + text(538, 123, "Made money: about 7", { size: 13, weight: 700 });
 out += text(512, 150, "Average loss ≈ ₹2 lakh per trader", { size: 11.5, fill: C.muted });
 out += text(40, 200, "Only about 1% made more than ₹1 lakh over three years after costs.", { size: 13, fill: C.text });
 out += text(40, 224, "A follow-up SEBI study for FY 2024-25 found about 91% still lost money.", { size: 13, fill: C.muted });
 out += text(40, 260, "Practise with paper trading first, size positions small, and never trade F&O with money you cannot afford to lose.", { size: 12, fill: C.amber });
 return out;
})(), "Source: SEBI studies of individual traders in equity F&O (2024 and 2025).");

fs.mkdirSync(OUT, { recursive: true });
Object.entries(D).forEach(([name, content]) => fs.writeFileSync(path.join(OUT, name), content));
console.log(`Wrote ${Object.keys(D).length} diagrams to ${OUT}:`, Object.keys(D).join(", "));
