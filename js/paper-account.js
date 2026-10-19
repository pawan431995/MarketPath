// Account views for paper trading, like a broker app: Portfolio, Holdings, Positions, Orders and Trade history.
// paper-trading.js owns the data and calls PaperAccount.create(api); this file only reads it and renders.
// api: { account, cfg, price(sym), ref(sym), nameOf, money, signed, fmt, esc, posQty, posAvg, posCost,
//        taxEstimate, slab, today(ms) -> bool, onExit(key), onCancel(id), onSelect(sym), downloadCsv(name, rows) }
const PaperAccount = (function () {
 const TABS = [["portfolio", "Portfolio"], ["holdings", "Holdings"], ["positions", "Positions"], ["orders", "Orders"], ["history", "Trade history"]];
 const ORDER_FILTERS = [["all", "All"], ["open", "Open"], ["filled", "Executed"], ["cancelled", "Cancelled"]];
 const RANGES = [["today", "Today", 0], ["7d", "7 days", 7], ["30d", "30 days", 30], ["all", "All time", null]];

 function create(api) {
  const root = document.getElementById("ppAccount");
  const tabsEl = root.querySelector(".ppa-tabs"), body = root.querySelector(".ppa-body");
  let tab = "portfolio", orderFilter = "all", range = "all", pressing = false;
  try { tab = localStorage.getItem("mp-paper-tab") || "portfolio"; } catch (e) { /* storage unavailable */ }
  if (!TABS.some(t => t[0] === tab)) tab = "portfolio";

  const { esc, money, signed } = api;
  const cls = n => (n >= 0 ? "pp-up" : "pp-down");
  const pct = n => `${n >= 0 ? "+" : "−"}${Math.abs(n).toFixed(2)}%`;
  const productTag = p => `<span class="pp-tag">${p === "intraday" ? "INTRADAY" : "DELIVERY"}</span>`;
  const symCell = sym => `<button type="button" class="ppa-sym" data-select="${esc(sym)}"><strong>${esc(sym)}</strong><small>${esc(api.nameOf(sym))}</small></button>`;

  // One row per open position, with today's P&L: lots bought today count from their buy price, older lots
  // from the previous close.
  function rows(product) {
   const a = api.account();
   return Object.entries(a.positions).filter(([, p]) => p.product === product).map(([key, p]) => {
    const qty = api.posQty(p), avg = api.posAvg(p), ltp = api.price(p.sym) || avg, ref = api.ref(p.sym) || ltp;
    const cost = api.posCost(p), value = qty * ltp;
    const day = p.lots.reduce((s, l) => s + l.qty * (ltp - (api.today(l.time) ? l.price : ref)), 0);
    return { key, sym: p.sym, product, qty, avg, ltp, cost, value, pl: value - cost, day, dayPct: ref ? (ltp / ref - 1) * 100 : 0 };
   });
  }
  const sum = (list, k) => list.reduce((s, r) => s + r[k], 0);

  function portfolio() {
   const a = api.account(), c = api.cfg(), all = rows("delivery").concat(rows("intraday"));
   const invested = sum(all, "cost"), value = sum(all, "value"), unreal = value - invested, day = sum(all, "day");
   const realized = a.realized.stcg + a.realized.ltcg + a.realized.intraday;
   const tax = api.taxEstimate(a), total = a.cash + value, net = total - c.start - tax.total;
   const card = (label, v, extra, tone) => `<div class="ppa-card"><small>${label}</small><strong class="${tone || ""}">${v}</strong>${extra ? `<span>${extra}</span>` : ""}</div>`;
   // Allocation of total value: each holding, then cash.
   // One line per stock (delivery and intraday combined), then cash.
   const bySym = {};
   all.forEach(r => { bySym[r.sym] = (bySym[r.sym] || 0) + r.value; });
   const parts = Object.entries(bySym).concat([["Cash", a.cash]]).filter(p => p[1] > 0).sort((x, y) => y[1] - x[1]);
   const colors = ["var(--ppa-1)", "var(--ppa-2)", "var(--ppa-3)", "var(--ppa-4)", "var(--ppa-5)", "var(--ppa-6)"];
   const shown = parts.slice(0, 6), rest = parts.slice(6).reduce((s, p) => s + p[1], 0);
   if (rest > 0) shown.push(["Others", rest]);
   const alloc = shown.map((p, i) => ({ label: p[0], v: p[1], pct: (p[1] / total) * 100, color: p[0] === "Cash" ? "var(--ppa-cash)" : colors[i % colors.length] }));
   const row = (label, v, tone, sub) => `<tr class="${sub ? "pp-sub" : ""}"><th>${label}</th><td class="${tone || ""}">${v}</td></tr>`;
   const india = c.charges === "india";
   return `
    <div class="ppa-cards">
     ${card("Total value", money(total), `Started with ${money(c.start)}`)}
     ${card("Net P&amp;L after tax", signed(net), pct((net / c.start) * 100), cls(net))}
     ${card("Today's P&amp;L", signed(day), "On open positions", cls(day))}
     ${card("Invested", money(invested), `Current value ${money(value)}`)}
     ${card("Unrealised P&amp;L", signed(unreal), invested ? pct((unreal / invested) * 100) : "", cls(unreal))}
     ${card("Available cash", money(a.cash))}
    </div>
    <div class="ppa-split">
     <section class="ppa-panel">
      <h3>Allocation</h3>
      <div class="ppa-alloc-bar" role="img" aria-label="Allocation of total value">${alloc.map(p => `<span style="width:${p.pct.toFixed(2)}%;background:${p.color}" title="${esc(p.label)} ${p.pct.toFixed(1)}%"></span>`).join("")}</div>
      <ul class="ppa-alloc">${alloc.map(p => `<li><i style="background:${p.color}"></i><span>${esc(p.label)}</span><b>${money(p.v)}</b><small>${p.pct.toFixed(1)}%</small></li>`).join("")}</ul>
     </section>
     <section class="ppa-panel">
      <h3>P&amp;L, charges and tax</h3>
      <table class="pp-pnl">
       ${row("Realised P&amp;L (after charges)", signed(realized), cls(realized))}
       ${india ? row("Short-term capital gain", signed(a.realized.stcg), "", true) + row("Long-term capital gain", signed(a.realized.ltcg), "", true) + row("Intraday (speculative) income", signed(a.realized.intraday), "", true) : ""}
       ${row("Unrealised P&amp;L (open positions)", signed(unreal), cls(unreal))}
       ${row("Charges paid", money(a.charges))}
       ${india ? row("Estimated tax on realised gains", money(tax.total)) + row(`STCG @ ${PaperCharges.tax.stcg * 100}%`, money(tax.stcgTax), "", true) + row(`LTCG @ ${PaperCharges.tax.ltcg * 100}% above ₹1.25 lakh`, money(tax.ltcgTax), "", true) + row(`Intraday @ ${api.slab()}% slab`, money(tax.intradayTax), "", true) + row("Health &amp; education cess 4%", money(tax.cess), "", true) : ""}
       ${row(india ? "Net P&amp;L after charges and tax" : "Net P&amp;L", signed(net), cls(net) + " pp-strong")}
      </table>
      ${india ? "" : `<p class="pp-empty">Charges and tax are modelled for the Indian market only.</p>`}
     </section>
    </div>`;
  }

  function positionTable(list, product) {
   if (!list.length) {
    return product === "delivery"
     ? `<p class="ppa-empty">No holdings yet. Buy with the <strong>Delivery</strong> product to hold shares overnight.</p>`
     : `<p class="ppa-empty">No open intraday positions. Buy or sell with the <strong>Intraday</strong> product to trade within the day.</p>`;
   }
   const totalCost = sum(list, "cost"), totalValue = sum(list, "value"), totalPl = totalValue - totalCost, totalDay = sum(list, "day");
   return `<div class="ppa-table-wrap"><table class="ppa-table">
    <thead><tr><th>Instrument</th><th class="num">Qty</th><th class="num">Avg. cost</th><th class="num">LTP</th><th class="num">${product === "delivery" ? "Invested" : "Buy value"}</th><th class="num">Current value</th><th class="num">P&amp;L</th><th class="num">Day chg.</th><th><span class="sr-only">Actions</span></th></tr></thead>
    <tbody>${list.map(r => `<tr>
     <td>${symCell(r.sym)}</td><td class="num">${r.qty}</td><td class="num">${api.fmt(r.avg)}</td><td class="num">${api.fmt(r.ltp)}</td>
     <td class="num">${api.fmt(r.cost)}</td><td class="num">${api.fmt(r.value)}</td>
     <td class="num ${cls(r.pl)}">${signed(r.pl)}<small>${r.cost ? pct((r.pl / r.cost) * 100) : ""}</small></td>
     <td class="num ${cls(r.dayPct)}">${pct(r.dayPct)}</td>
     <td class="num"><button type="button" class="pp-mini" data-exit="${esc(r.key)}">Exit</button></td></tr>`).join("")}</tbody>
    <tfoot><tr><th>Total</th><td></td><td></td><td></td><td class="num">${api.fmt(totalCost)}</td><td class="num">${api.fmt(totalValue)}</td><td class="num ${cls(totalPl)}">${signed(totalPl)}</td><td class="num ${cls(totalDay)}" title="Today's P&amp;L">${signed(totalDay)}</td><td></td></tr></tfoot>
   </table></div>`;
  }

  function holdings() {
   const list = rows("delivery");
   return `<p class="ppa-hint">Delivery shares you own. Long-term (held more than 12 months) or short-term capital gains tax applies when you sell.</p>${positionTable(list, "delivery")}`;
  }

  function positions() {
   const a = api.account(), list = rows("intraday");
   const closedToday = a.orders.filter(o => o.product === "intraday" && o.side === "sell" && o.status === "filled" && api.today(o.time));
   const realizedToday = closedToday.reduce((s, o) => s + (o.gain || 0), 0);
   const note = api.cfg().squareOff ? ` Open intraday positions are squared off automatically at ${api.cfg().squareOff} IST, as brokers do.` : "";
   return `<p class="ppa-hint">Intraday positions are opened and closed within the same day.${note}</p>
    ${positionTable(list, "intraday")}
    <p class="ppa-hint">Closed today: ${closedToday.length} trade${closedToday.length === 1 ? "" : "s"} · realised P&amp;L <strong class="${cls(realizedToday)}">${signed(realizedToday)}</strong></p>`;
  }

  function orderRows() {
   const a = api.account();
   const open = a.pending.map(o => Object.assign({}, o, { status: "open" }));
   return open.concat(a.orders);
  }
  function orders() {
   const all = orderRows(), list = all.filter(o => orderFilter === "all" || o.status === orderFilter);
   const count = f => all.filter(o => f === "all" || o.status === f).length;
   const typeLabel = o => (o.tag ? o.tag : o.type === "limit" ? "Limit" : o.type === "amo" ? "AMO" : "Market");
   const status = o => ({ open: "Open", filled: "Executed", cancelled: "Cancelled" }[o.status] || o.status);
   const when = t => new Date(t).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
   return `<div class="ppa-toolbar">
     <div class="ppa-filters" role="group" aria-label="Filter orders">${ORDER_FILTERS.map(([f, l]) => `<button type="button" class="ppa-chip${orderFilter === f ? " active" : ""}" data-filter="${f}" aria-pressed="${orderFilter === f}">${l} <small>${count(f)}</small></button>`).join("")}</div>
     <button type="button" class="pp-btn" data-csv ${all.length ? "" : "disabled"}>⤓ Download CSV</button>
    </div>
    ${list.length ? `<div class="ppa-table-wrap"><table class="ppa-table">
     <thead><tr><th>Time</th><th>Type</th><th>Instrument</th><th>Product</th><th>Order</th><th class="num">Qty</th><th class="num">Price</th><th class="num">Charges</th><th class="num">P&amp;L</th><th>Status</th><th><span class="sr-only">Actions</span></th></tr></thead>
     <tbody>${list.map(o => `<tr>
      <td class="ppa-time">${when(o.time)}</td>
      <td><span class="ppa-side ${o.side}">${o.side === "buy" ? "BUY" : "SELL"}</span></td>
      <td>${symCell(o.sym)}</td><td>${productTag(o.product)}</td><td>${esc(typeLabel(o))}</td>
      <td class="num">${o.qty}</td>
      <td class="num">${o.price ? api.fmt(o.price) : o.limit ? `${api.fmt(o.limit)}<small>limit</small>` : "—"}</td>
      <td class="num">${o.chargesTotal ? api.fmt(o.chargesTotal) : "—"}</td>
      <td class="num ${typeof o.gain === "number" ? cls(o.gain) : ""}">${typeof o.gain === "number" ? signed(o.gain) : "—"}</td>
      <td><span class="ppa-status ${o.status}">${status(o)}</span></td>
      <td class="num">${o.status === "open" ? `<button type="button" class="pp-cancel" data-cancel="${esc(o.id)}">Cancel</button>` : ""}</td></tr>`).join("")}</tbody>
    </table></div>` : `<p class="ppa-empty">No ${orderFilter === "all" ? "" : status({ status: orderFilter }).toLowerCase() + " "}orders yet.</p>`}`;
  }

  // ---------- Trade history: executed trades (the tradebook) with performance statistics ----------
  const dayKey = t => new Date(t).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const dayLabel = k => new Date(`${k}T12:00:00+05:30`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  function trades() {
   const r = RANGES.find(x => x[0] === range), all = api.account().orders.filter(o => o.status === "filled");
   if (!r || r[2] === null) return all;
   if (r[2] === 0) return all.filter(o => api.today(o.time));
   const from = Date.now() - r[2] * 86400000;
   return all.filter(o => o.time >= from);
  }
  function history() {
   const list = trades();
   // A closed trade is a sell; its gain is already net of the buy and sell charges.
   const closed = list.filter(o => o.side === "sell" && typeof o.gain === "number");
   const wins = closed.filter(o => o.gain > 0), losses = closed.filter(o => o.gain <= 0);
   const net = closed.reduce((s, o) => s + o.gain, 0), chargesPaid = list.reduce((s, o) => s + (o.chargesTotal || 0), 0);
   const avg = arr => (arr.length ? arr.reduce((s, o) => s + o.gain, 0) / arr.length : 0);
   const best = closed.reduce((b, o) => (!b || o.gain > b.gain ? o : b), null), worst = closed.reduce((w, o) => (!w || o.gain < w.gain ? o : w), null);
   const card = (label, v, extra, tone) => `<div class="ppa-card"><small>${label}</small><strong class="${tone || ""}">${v}</strong>${extra ? `<span>${extra}</span>` : ""}</div>`;
   const days = {};
   list.forEach(o => { const k = dayKey(o.time); (days[k] = days[k] || { trades: 0, pl: 0, charges: 0, list: [] }); days[k].trades++; days[k].charges += o.chargesTotal || 0; if (typeof o.gain === "number") days[k].pl += o.gain; days[k].list.push(o); });
   const dayKeys = Object.keys(days).sort().reverse();
   const time = t => new Date(t).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });
   const fillRow = o => `<tr>
     <td class="ppa-time">${time(o.time)}</td><td><span class="ppa-side ${o.side}">${o.side === "buy" ? "BUY" : "SELL"}</span></td>
     <td>${symCell(o.sym)}</td><td>${productTag(o.product)}</td><td class="num">${o.qty}</td><td class="num">${api.fmt(o.price)}</td>
     <td class="num">${api.fmt(o.qty * o.price)}</td><td class="num">${o.chargesTotal ? api.fmt(o.chargesTotal) : "—"}</td>
     <td class="num ${typeof o.gain === "number" ? cls(o.gain) : ""}">${typeof o.gain === "number" ? signed(o.gain) : "—"}</td></tr>`;
   return `<div class="ppa-toolbar">
     <div class="ppa-filters" role="group" aria-label="Period">${RANGES.map(([id, label]) => `<button type="button" class="ppa-chip${range === id ? " active" : ""}" data-range="${id}" aria-pressed="${range === id}">${label}</button>`).join("")}</div>
     <button type="button" class="pp-btn" data-tradebook ${list.length ? "" : "disabled"}>⤓ Download tradebook</button>
    </div>
    ${list.length ? `<div class="ppa-cards">
      ${card("Trades executed", String(list.length), `${closed.length} closed (sells)`)}
      ${card("Win rate", closed.length ? `${((wins.length / closed.length) * 100).toFixed(0)}%` : "—", `${wins.length} won · ${losses.length} lost`)}
      ${card("Realised P&amp;L", signed(net), "After charges", cls(net))}
      ${card("Average win / loss", `${wins.length ? signed(avg(wins)) : "—"} / ${losses.length ? signed(avg(losses)) : "—"}`, wins.length && losses.length ? `Reward-to-risk ${(avg(wins) / Math.abs(avg(losses) || 1)).toFixed(2)}` : "")}
      ${card("Best / worst trade", best ? `${signed(best.gain)} / ${signed(worst.gain)}` : "—", best ? `${esc(best.sym)} / ${esc(worst.sym)}` : "")}
      ${card("Charges paid", money(chargesPaid), "Brokerage, STT, GST and fees")}
     </div>
     <section class="ppa-panel"><h3>Day by day</h3><div class="ppa-table-wrap"><table class="ppa-table">
      <thead><tr><th>Date</th><th class="num">Trades</th><th class="num">Charges</th><th class="num">Realised P&amp;L</th></tr></thead>
      <tbody>${dayKeys.map(k => `<tr><td>${dayLabel(k)}</td><td class="num">${days[k].trades}</td><td class="num">${api.fmt(days[k].charges)}</td><td class="num ${cls(days[k].pl)}">${signed(days[k].pl)}</td></tr>`).join("")}</tbody>
     </table></div></section>
     <section class="ppa-panel"><h3>Tradebook</h3><div class="ppa-table-wrap"><table class="ppa-table">
      <thead><tr><th>Time</th><th>Type</th><th>Instrument</th><th>Product</th><th class="num">Qty</th><th class="num">Price</th><th class="num">Value</th><th class="num">Charges</th><th class="num">P&amp;L</th></tr></thead>
      ${dayKeys.map(k => `<tbody><tr class="ppa-day"><th colspan="9">${dayLabel(k)}</th></tr>${days[k].list.map(fillRow).join("")}</tbody>`).join("")}
     </table></div></section>`
    : `<p class="ppa-empty">No executed trades ${range === "all" ? "yet" : "in this period"}. Place an order to start your trade history.</p>`}`;
  }
  function tradebookCsv() {
   const head = ["Date", "Time", "Side", "Symbol", "Product", "Quantity", "Price", "Value", "Charges", "Realised P&L"];
   const data = trades().map(o => [dayKey(o.time), new Date(o.time).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }), o.side, o.sym, o.product, o.qty, o.price, (o.qty * o.price).toFixed(2), (o.chargesTotal || 0).toFixed(2), typeof o.gain === "number" ? o.gain.toFixed(2) : ""]);
   api.downloadCsv("paper-trading-tradebook", [head].concat(data));
  }

  function csv() {
   const head = ["Time", "Side", "Symbol", "Product", "Order type", "Quantity", "Price", "Limit", "Charges", "P&L", "Status"];
   const data = orderRows().map(o => [new Date(o.time).toISOString(), o.side, o.sym, o.product, o.tag || o.type, o.qty, o.price || "", o.limit || "", o.chargesTotal || "", typeof o.gain === "number" ? o.gain.toFixed(2) : "", o.status]);
   api.downloadCsv("paper-trading-orders", [head].concat(data));
  }

  const views = { portfolio, holdings, positions, orders, history };
  function render() {
   if (pressing) return; // do not replace a button while it is being pressed
   const a = api.account();
   const counts = { holdings: rows("delivery").length, positions: rows("intraday").length, orders: a.pending.length };
   const tabsHtml = TABS.map(([id, label]) => `<button type="button" role="tab" id="ppa-tab-${id}" aria-controls="ppa-body" aria-selected="${tab === id}" tabindex="${tab === id ? 0 : -1}" data-tab="${id}">${label}${counts[id] ? ` <small>${counts[id]}</small>` : ""}</button>`).join("");
   setHTML(tabsEl, tabsHtml);
   body.setAttribute("aria-labelledby", `ppa-tab-${tab}`);
   setHTML(body, views[tab]());
  }
  // Writes only when the markup changed: most re-renders (every price tick) touch just a few cells.
  function setHTML(el, html) { if (el._html !== html) { el.innerHTML = html; el._html = html; } }

  tabsEl.addEventListener("click", e => {
   const b = e.target.closest("[data-tab]");
   if (!b) return;
   tab = b.dataset.tab;
   try { localStorage.setItem("mp-paper-tab", tab); } catch (err) { /* storage unavailable */ }
   render();
   tabsEl.querySelector(`[data-tab="${tab}"]`).focus();
  });
  tabsEl.addEventListener("keydown", e => {
   if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
   const i = TABS.findIndex(t => t[0] === tab), next = TABS[(i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length][0];
   tabsEl.querySelector(`[data-tab="${next}"]`).click();
  });
  root.addEventListener("pointerdown", e => { if (e.target.closest("button")) pressing = true; });
  ["pointerup", "pointercancel", "pointerleave"].forEach(ev => root.addEventListener(ev, () => { setTimeout(() => { pressing = false; }, 0); }));
  body.addEventListener("click", e => {
   const t = e.target.closest("button");
   pressing = false;
   if (!t) return;
   if (t.dataset.exit) api.onExit(t.dataset.exit);
   else if (t.dataset.cancel) api.onCancel(t.dataset.cancel);
   else if (t.dataset.select) api.onSelect(t.dataset.select);
   else if (t.dataset.filter) { orderFilter = t.dataset.filter; render(); }
   else if (t.dataset.range) { range = t.dataset.range; render(); }
   else if (t.hasAttribute("data-csv")) csv();
   else if (t.hasAttribute("data-tradebook")) tradebookCsv();
  });
  return { render, show(id) { tab = id; render(); } };
 }
 return { create };
})();
