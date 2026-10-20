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

// ---- Second diagrams for the financial-reading modules (js/lessons-finance-more-hi.js lists them) ----
// Grouped bars: groups [{ label, values: [..] }], series [{ name, color }]; values can be negative.
function groupedBars(groups, series, o) {
 const { x0, y0, w, h, min = 0, max } = o, slot = w / groups.length, n = series.length;
 const bw = Math.min(o.bw || 26, (slot * 0.75) / n), Y = v => y0 + h - ((v - min) / (max - min)) * h;
 let out = (o.ticks || []).map(t => line(x0, Y(t), x0 + w, Y(t), { color: C.line, dash: t === 0 ? "" : "3 4" }) + text(x0 - 8, Y(t) + 4, String(t), { anchor: "end", size: 10.5, fill: C.muted })).join("");
 groups.forEach((g, i) => {
  const cx = x0 + slot * i + slot / 2, left = cx - (bw * n + 4 * (n - 1)) / 2;
  g.values.forEach((v, k) => {
   const x = left + k * (bw + 4), top = Y(Math.max(v, 0)), bottom = Y(Math.min(v, 0));
   const color = v < 0 && series[k].negColor ? series[k].negColor : series[k].color;
   out += rect(x, top, bw, Math.max(2, bottom - top), color, { rx: 3, opacity: 0.92 });
   if (o.valueLabels) out += text(x + bw / 2, v < 0 ? bottom + 13 : top - 5, String(v), { anchor: "middle", size: 10.5, weight: 700 });
  });
  out += text(cx, y0 + h + 18, g.label, { anchor: "middle", size: 11.5, fill: C.muted });
 });
 return out;
}
const legend = (x, y, items) => items.map(([name, color], i) => rect(x, y + i * 22 - 10, 12, 12, color, { rx: 3 }) + text(x + 20, y + i * 22, name, { size: 12 })).join("");

D["working-capital-days.svg"] = svg(800, 340, "Working-capital days over three years (Example Ltd, illustrative)", (() => {
 const years = [["FY23", 50, 60, 76], ["FY24", 55, 65, 78], ["FY25", 75, 92, 78]];
 let out = groupedBars(years.map(([label, ...values]) => ({ label, values })), [{ color: C.amber }, { color: C.violet }, { color: C.blue }],
  { x0: 70, y0: 60, w: 470, h: 200, max: 100, ticks: [0, 25, 50, 75, 100], valueLabels: true, bw: 30 });
 out += legend(580, 80, [["Receivable days", C.amber], ["Inventory days", C.violet], ["Payable days", C.blue]]);
 out += rect(570, 160, 210, 100, C.panel, { stroke: C.line }) + text(586, 186, "Cash conversion cycle", { weight: 700, size: 12.5 });
 years.forEach(([y, r, i, p], k) => { out += text(586, 210 + k * 18, `${y}: ${r} + ${i} − ${p} = ${r + i - p} days`, { size: 11.5, fill: k === 2 ? C.red : C.muted, weight: k === 2 ? 700 : 0 }); });
 return out;
})(), "Customers paying later and stock piling up lock the company's cash into operations; the gap is usually filled with debt.");

D["profit-vs-cash.svg"] = svg(800, 340, "Profit versus operating cash flow over five years (₹ crore, illustrative)", (() => {
 const yrs = ["Y1", "Y2", "Y3", "Y4", "Y5"];
 const X = { profit: [100, 115, 130, 150, 170], ocf: [95, 118, 125, 155, 165] }, Yc = { profit: [100, 120, 140, 160, 180], ocf: [90, 70, 40, 10, -20] };
 const series = [{ color: C.blue }, { color: C.green, negColor: C.red }], opt = { y0: 76, w: 320, h: 190, min: -40, max: 200, ticks: [0, 100, 200], bw: 20 };
 let out = text(70, 62, "Company X: cash follows profit", { weight: 700, size: 12.5, fill: C.green }) + text(450, 62, "Company Y: profit up, cash down", { weight: 700, size: 12.5, fill: C.red });
 out += groupedBars(yrs.map((label, i) => ({ label, values: [X.profit[i], X.ocf[i]] })), series, Object.assign({ x0: 70 }, opt));
 out += groupedBars(yrs.map((label, i) => ({ label, values: [Yc.profit[i], Yc.ocf[i]] })), series, Object.assign({ x0: 450 }, opt));
 out += rect(70, 296, 12, 12, C.blue, { rx: 3 }) + text(90, 306, "Net profit", { size: 12 }) + rect(180, 296, 12, 12, C.green, { rx: 3 }) + text(200, 306, "Operating cash flow", { size: 12 });
 return out;
})(), "Five-year cash conversion: Company X about 99%, Company Y about 27%. Y's profits are not turning into cash.");

D["seasonal-quarters.svg"] = svg(800, 330, "Quarterly revenue: compare with the same quarter last year (₹ crore, illustrative)", (() => {
 const q = [["Q3 FY25", 1200], ["Q4 FY25", 900], ["Q1 FY26", 950], ["Q2 FY26", 1000], ["Q3 FY26", 1320]];
 const x0 = 80, y0 = 90, w = 640, h = 170, max = 1400, slot = w / q.length, bw = 64, Y = v => y0 + h - (v / max) * h;
 let out = line(x0, Y(0), x0 + w, Y(0), { color: C.line });
 q.forEach(([label, v], i) => {
  const cx = x0 + slot * i + slot / 2, festive = i === 0 || i === 4;
  out += rect(cx - bw / 2, Y(v), bw, Y(0) - Y(v), festive ? C.amber : C.blue, { rx: 4, opacity: festive ? 0.95 : 0.75 });
  out += text(cx, Y(v) - 8, v.toLocaleString("en-IN"), { anchor: "middle", size: 12, weight: 700 }) + text(cx, y0 + h + 18, label, { anchor: "middle", size: 11.5, fill: C.muted });
 });
 const cx = i => x0 + slot * i + slot / 2;
 out += arrow(cx(3) + 10, Y(1000) - 26, cx(4) - 36, Y(1320) + 8, { color: C.red }) + text(cx(3) + 46, Y(1150) - 24, "+32% QoQ", { anchor: "middle", size: 12.5, weight: 700, fill: C.red });
 out += line(cx(0), 56, cx(4), 56, { color: C.green, w: 2 }) + line(cx(0), 56, cx(0), Y(1200) - 24, { color: C.green, w: 2 }) + line(cx(4), 56, cx(4), Y(1320) - 24, { color: C.green, w: 2 });
 out += rect(cx(2) - 92, 44, 184, 24, C.bg, { rx: 6 }) + text(cx(2), 61, "+10% YoY: the fair comparison", { anchor: "middle", size: 12.5, weight: 700, fill: C.green });
 return out;
})(), "Amber bars are the festive quarter in both years. QoQ mixes the season with real growth; YoY removes it.");

D["annual-report-reading-plan.svg"] = svg(800, 270, "Reading an annual report in 60 minutes", (() => {
 const steps = [["0–10 min", "Auditor's report", ["Opinion type", "Key audit matters"], C.red], ["10–20 min", "Statements", ["Five-year trend", "Cash and debt"], C.green], ["20–35 min", "Notes", ["Related parties", "Contingent claims"], C.amber],
  ["35–45 min", "MD&A", ["Segments, risks", "Promises vs results"], C.blue], ["45–55 min", "Governance", ["Board, auditors", "Pay vs profit"], C.violet], ["55–60 min", "Chairman's letter", ["Tone and claims", "vs last year"], C.muted]];
 const w = 118, gap = 8, y = 80;
 let out = "";
 steps.forEach(([mins, title, lines, color], i) => {
  const x = 20 + i * (w + gap);
  out += text(x + w / 2, y - 12, mins, { anchor: "middle", size: 11, weight: 700, fill: color });
  out += card(x, y, w, 86, title, lines, color);
  if (i < steps.length - 1) out += arrow(x + w + 1, y + 43, x + w + gap - 1, y + 43);
 });
 out += rect(20, 190, 370, 40, "#2a1c20", { stroke: C.red }) + text(36, 215, "Most information per minute: start here", { size: 12, weight: 700, fill: C.red });
 out += rect(410, 190, 370, 40, C.panel, { stroke: C.line }) + text(426, 215, "Least information per minute: read last", { size: 12, fill: C.muted });
 return out;
})(), "The order matters more than the speed: problems usually show up in the audit report and the notes.");

D["shareholding-trend.svg"] = svg(800, 340, "Shareholding over four quarters (% of shares, illustrative)", (() => {
 const qs = [["Dec", 55, 18, 8, 4, 15, 0], ["Mar", 55, 20, 9, 4, 12, 5], ["Jun", 52, 22, 10, 4, 12, 12], ["Sep", 50, 23, 11, 4, 12, 20]];
 const cols = [C.blue, C.violet, C.green, C.amber, "#5b6b80"], names = ["Promoter group", "Foreign portfolio investors", "Mutual funds", "Other domestic institutions", "Individuals and others"];
 const x0 = 60, y0 = 70, h = 210, slot = 110, bw = 62, Y = v => y0 + h - (v / 100) * h;
 let out = "";
 qs.forEach(([label, ...vals], i) => {
  const pledge = vals.pop(), cx = x0 + slot * i + slot / 2;
  let acc = 0;
  vals.forEach((v, k) => { out += rect(cx - bw / 2, Y(acc + v) + 1, bw, (v / 100) * h - 2, cols[k], { rx: 2, opacity: 0.9 }); if (v >= 8) out += text(cx, Y(acc + v / 2) + 4, String(v), { anchor: "middle", size: 11, weight: 700, fill: C.bg }); acc += v; });
  out += text(cx, y0 + h + 18, label, { anchor: "middle", size: 11.5, fill: C.muted });
  out += text(cx, y0 - 10, `Pledged ${pledge}%`, { anchor: "middle", size: 11, weight: 700, fill: pledge ? C.red : C.muted });
 });
 out += legend(530, 90, names.map((n, k) => [n, cols[k]]));
 out += rect(520, 210, 260, 66, C.panel, { stroke: C.red }) + text(534, 234, "Promoters sell 5 points and pledge", { size: 12, weight: 700 }) + text(534, 254, "20% of the rest, while institutions buy.", { size: 11.5, fill: C.muted });
 return out;
})(), "Pledged shares are shown as a % of the promoter group's holding. Read the reasons in exchange announcements.");

D["corporate-actions-compare.svg"] = svg(800, 312, "What corporate actions do to 100 shares at ₹1,000 (holding ₹1,00,000)", (() => {
 const items = [["Dividend ₹20", "100 shares", "≈ ₹980 each", ["₹98,000 in shares", "+ ₹2,000 cash"], C.green], ["Bonus 1:1", "200 shares", "≈ ₹500 each", ["₹1,00,000", "value unchanged"], C.blue],
  ["Split 1 into 5", "500 shares", "≈ ₹200 each", ["₹1,00,000", "value unchanged"], C.violet], ["Rights 1 for 5 at ₹800", "120 shares", "≈ ₹967 each", ["₹1,16,000 in shares", "after paying ₹16,000"], C.amber]];
 const w = 180, gap = 13, y = 70;
 let out = "";
 items.forEach(([title, shares, price, value, color], i) => {
  const x = 20 + i * (w + gap);
  out += rect(x, y, w, 170, C.panel, { stroke: C.line }) + rect(x, y, w, 4, color, { rx: 2 });
  out += text(x + w / 2, y + 30, title, { anchor: "middle", weight: 700, size: 13 });
  out += text(x + w / 2, y + 70, shares, { anchor: "middle", size: 20, weight: 700, fill: color });
  out += text(x + w / 2, y + 98, price, { anchor: "middle", size: 13, fill: C.text });
  out += line(x + 16, y + 116, x + w - 16, y + 116, { color: C.line });
  value.forEach((part, k) => { out += text(x + w / 2, y + 138 + k * 17, part, { anchor: "middle", size: 11.5, fill: k ? C.muted : C.text, weight: k ? 0 : 700 }); });
 });
 out += text(400, 268, "Bonus issues and splits change the count and the price, not the value.", { anchor: "middle", size: 12.5, fill: C.text });
 return out;
})(), "Prices are the theoretical adjusted prices just after each action, before any market move. Dividends are taxable.");

fs.mkdirSync(OUT, { recursive: true });
Object.entries(D).forEach(([name, content]) => fs.writeFileSync(path.join(OUT, name), content));
console.log(`Wrote ${Object.keys(D).length} diagrams to ${OUT}:`, Object.keys(D).join(", "));
