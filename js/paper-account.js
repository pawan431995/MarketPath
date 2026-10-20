// Account views for the paper-trading terminal, like a broker app: Dashboard, Orders, Holdings, Positions, Funds,
// Portfolio and Trade history. paper-trading.js owns the data and the top navigation; it calls
// PaperAccount.create(api) and then show(view) / render(). This file only reads the data and renders.
// api: { account, cfg, price(sym), ref(sym), nameOf, money, signed, fmt, esc, posQty, posAvg, posCost,
//        taxEstimate, slab, plan, plans, capital(a), available(a), blocked(a), today(ms) -> bool,
//        onExit(key), onCancel(id), onModify(id), onSelect(sym), onTrade(side, sym), onGoto(view), onFunds(kind, amount) -> error,
//        onPlan(id), onSlab(pct), onReset(), indices() -> [{name, last, change, pct}], downloadCsv(name, rows) }
const PaperAccount = (function () {
 const VIEWS = ["dashboard", "orders", "holdings", "positions", "funds", "portfolio", "history"];
 const ORDER_FILTERS = [["all", "All"], ["open", "Open"], ["filled", "Executed"], ["cancelled", "Cancelled"]];
 const RANGES = [["today", "Today", 0], ["7d", "7 days", 7], ["30d", "30 days", 30], ["all", "All time", null]];
 const QUICK_FUNDS = [10000, 50000, 100000, 500000];

 function create(api) {
  const body = document.getElementById("ppa-body");
  let view = "dashboard", shown = null, orderFilter = "all", range = "all", pressing = false;

  const { esc, money, signed } = api;
  const cls = n => (n >= 0 ? "pp-up" : "pp-down");
  const pct = n => `${n >= 0 ? "+" : "−"}${Math.abs(n).toFixed(2)}%`;
  const productTag = p => `<span class="pp-tag">${p === "intraday" ? "MIS" : "CNC"}</span>`;
  const symCell = sym => `<button type="button" class="ppa-sym" data-select="${esc(sym)}"><strong>${esc(sym)}</strong><small>${esc(api.nameOf(sym))}</small></button>`;
  const card = (label, v, extra, tone) => `<div class="ppa-card"><small>${label}</small><strong class="${tone || ""}">${v}</strong>${extra ? `<span>${extra}</span>` : ""}</div>`;
  const india = () => api.cfg().charges === "india";

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

  // Allocation of total value: one line per stock (delivery and intraday combined), then cash.
  function allocation(all, cash, total) {
   const bySym = {};
   all.forEach(r => { bySym[r.sym] = (bySym[r.sym] || 0) + r.value; });
   const parts = Object.entries(bySym).concat([["Cash", cash]]).filter(p => p[1] > 0).sort((x, y) => y[1] - x[1]);
   const colors = ["var(--ppa-1)", "var(--ppa-2)", "var(--ppa-3)", "var(--ppa-4)", "var(--ppa-5)", "var(--ppa-6)"];
   const top = parts.slice(0, 6), rest = parts.slice(6).reduce((s, p) => s + p[1], 0);
   if (rest > 0) top.push(["Others", rest]);
   return top.map((p, i) => ({ label: p[0], v: p[1], pct: total ? (p[1] / total) * 100 : 0, color: p[0] === "Cash" ? "var(--ppa-cash)" : colors[i % colors.length] }));
  }
  const allocBar = alloc => `<div class="ppa-alloc-bar" role="img" aria-label="Allocation of total value: ${esc(alloc.map(p => `${p.label} ${p.pct.toFixed(1)}%`).join(", "))}">${alloc.map(p => `<span style="width:${p.pct.toFixed(2)}%;background:${p.color}" title="${esc(p.label)} ${p.pct.toFixed(1)}%"></span>`).join("")}</div>`;

  // ---------- Dashboard ----------
  function greeting() {
   const h = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", hourCycle: "h23" }).format(new Date()));
   return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  }
  function dashboard() {
   const a = api.account(), hold = rows("delivery"), pos = rows("intraday");
   const invested = sum(hold, "cost"), value = sum(hold, "value"), pl = value - invested;
   const posPl = sum(pos, "pl"), posDay = sum(pos, "day") + sum(hold, "day");
   const total = a.cash + value + sum(pos, "value");
   const recent = a.pending.map(o => Object.assign({}, o, { status: "open" })).concat(a.orders).slice(0, 5);
   const idx = api.indices().slice(0, 4);
   const status = o => ({ open: "Open", filled: "Executed", cancelled: "Cancelled" }[o.status] || o.status);
   return `<div class="ppa-hello"><h3>${greeting()}, trader</h3><p>Your practice account at a glance. Everything here uses virtual money.</p></div>
    <div class="ppa-dash">
     <section class="ppa-panel ppa-dash-box">
      <h4><span aria-hidden="true">◔</span> Equity</h4>
      <div class="ppa-big"><strong>${money(api.available(a))}</strong><small>Margin available</small></div>
      <dl class="ppa-kv"><div><dt>Margins used</dt><dd>${money(api.blocked(a))}</dd></div><div><dt>Opening balance</dt><dd>${money(api.capital(a))}</dd></div><div><dt>Account value</dt><dd>${money(total)}</dd></div></dl>
      <button type="button" class="ppa-link" data-goto="funds">View statement and add funds →</button>
     </section>
     <section class="ppa-panel ppa-dash-box">
      <h4><span aria-hidden="true">▤</span> Holdings <small>(${hold.length})</small></h4>
      ${hold.length ? `<div class="ppa-big"><strong class="${cls(pl)}">${signed(pl)}</strong><small>P&amp;L ${invested ? `<b class="${cls(pl)}">${pct((pl / invested) * 100)}</b>` : ""}</small></div>
      <dl class="ppa-kv"><div><dt>Current value</dt><dd>${money(value)}</dd></div><div><dt>Investment</dt><dd>${money(invested)}</dd></div><div><dt>Today's P&amp;L</dt><dd class="${cls(posDay)}">${signed(posDay)}</dd></div></dl>
      ${allocBar(allocation(hold, 0, value))}
      <button type="button" class="ppa-link" data-goto="holdings">View holdings →</button>`
      : `<p class="ppa-empty ppa-empty-sm">You don't have any stocks yet. Pick a stock in the watchlist and press <b class="ppa-b">B</b> to buy, with the Delivery (CNC) product.</p>`}
     </section>
     <section class="ppa-panel ppa-dash-box">
      <h4><span aria-hidden="true">⇅</span> Positions <small>(${pos.length})</small></h4>
      ${pos.length ? `<div class="ppa-big"><strong class="${cls(posPl)}">${signed(posPl)}</strong><small>Open intraday P&amp;L</small></div>
      <ul class="ppa-mini-list">${pos.slice(0, 4).map(r => `<li><button type="button" class="ppa-sym" data-select="${esc(r.sym)}"><strong>${esc(r.sym)}</strong></button><span>${r.qty} @ ${api.fmt(r.avg)}</span><b class="${cls(r.pl)}">${signed(r.pl)}</b></li>`).join("")}</ul>
      <button type="button" class="ppa-link" data-goto="positions">View positions →</button>`
      : `<p class="ppa-empty ppa-empty-sm">No open intraday positions. Choose Intraday (MIS) in the order window to trade within the day.</p>`}
     </section>
    </div>
    ${idx.length ? `<section class="ppa-panel"><h4>Market overview</h4><div class="ppa-idx">${idx.map(i => `<div><small>${esc(i.name)}</small><strong>${Number(i.last).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</strong><span class="${cls(i.change)}">${i.change >= 0 ? "+" : "−"}${Math.abs(i.change).toFixed(2)} (${pct(i.pct)})</span></div>`).join("")}</div></section>` : ""}
    <section class="ppa-panel"><h4>Recent orders <button type="button" class="ppa-link" data-goto="orders">All orders →</button></h4>
     ${recent.length ? `<ul class="ppa-mini-list">${recent.map(o => `<li><span class="ppa-side ${o.side}">${o.side === "buy" ? "BUY" : "SELL"}</span><button type="button" class="ppa-sym" data-select="${esc(o.sym)}"><strong>${esc(o.sym)}</strong></button><span>${o.qty} @ ${o.price ? api.fmt(o.price) : api.fmt(o.limit || 0)}</span><span class="ppa-status ${o.status}">${status(o)}</span></li>`).join("")}</ul>`
      : `<p class="ppa-empty ppa-empty-sm">No orders yet. Hover a stock in the watchlist (or tap it on a phone) and press <b class="ppa-b">B</b> or <b class="ppa-s">S</b>.</p>`}
    </section>`;
  }

  // ---------- Funds ----------
  // The form and settings are written once when the view opens (so typing is not interrupted by price ticks);
  // the balances and the ledger are live regions.
  function fundsStatic() {
   const c = api.cfg();
   return `<div data-live="cards"></div>
    <div class="ppa-split">
     <section class="ppa-panel">
      <h4>Add or withdraw virtual funds</h4>
      <form class="ppa-funds-form" data-funds novalidate>
       <label class="pt-field"><span>Amount (${esc(c.currency)})</span><input name="amount" type="number" min="1" step="1" inputmode="numeric" placeholder="e.g. 50000" required></label>
       <div class="ppa-filters" role="group" aria-label="Quick amounts">${QUICK_FUNDS.map(v => `<button type="button" class="ppa-chip" data-quick="${v}">+${Number(v).toLocaleString(c.locale)}</button>`).join("")}</div>
       <div class="ppa-funds-btns"><button type="submit" class="pt-buy" value="add">Add funds</button><button type="submit" class="pt-sell" value="withdraw">Withdraw</button></div>
       <p class="pp-msg" data-funds-msg aria-live="polite"></p>
      </form>
      <p class="ppa-hint">Added funds count as your own capital, so they do not show up as profit. You can withdraw only cash that is not blocked by open buy orders.</p>
     </section>
     <section class="ppa-panel"><h4>Funds statement</h4><div data-live="ledger"></div></section>
    </div>
    ${india() ? `<section class="ppa-panel"><h4>Charges and tax settings</h4>
     <div class="ppa-settings">
      <label class="pt-field"><span>Brokerage plan</span><select data-plan>${api.plans.map(([id, label]) => `<option value="${id}"${api.plan() === id ? " selected" : ""}>${esc(label)}</option>`).join("")}</select></label>
      <label class="pt-field"><span>Your income-tax slab (%), for intraday income</span><input data-slab type="number" min="0" max="50" step="1" value="${api.slab()}"></label>
     </div>
     <label class="pt-check"><input type="checkbox" data-slip ${api.slippageOn() ? "checked" : ""}> Add estimated slippage to market orders (recommended: real orders rarely fill at exactly the last price) ${api.infoButton("slippage")}</label>
     <p class="ppa-hint">Brokerage, STT, exchange charges, SEBI fee, stamp duty, DP charge and GST are added to every order ${api.infoButton("charges")}. Tax on gains is estimated in Portfolio ${api.infoButton("tax")}.</p>
    </section>
    <section class="ppa-panel"><h4><span>Charges calculator ${api.infoButton("charges")}</span></h4><p class="ppa-hint">Work out every statutory charge on a round trip (buy, then sell) before you trade, and the price you must sell at just to break even. It uses the brokerage plan above.</p><div data-fee-calc></div></section>` : ""}
    <section class="ppa-panel ppa-danger"><h4>Reset account</h4><p class="ppa-hint">Start again with ${money(c.start)}. Holdings, positions, orders, funds and P&amp;L for this feed are cleared.</p><button type="button" class="pp-mini" data-reset>Reset practice account</button></section>`;
  }
  function fundsCards() {
   const a = api.account(), all = rows("delivery").concat(rows("intraday"));
   const value = sum(all, "value"), added = (a.ledger || []).filter(l => l.kind === "add").reduce((s, l) => s + l.amount, 0);
   const withdrawn = (a.ledger || []).filter(l => l.kind === "withdraw").reduce((s, l) => s + l.amount, 0);
   return `<div class="ppa-cards">
    ${card("Available margin", money(api.available(a)), "Cash you can trade with")}
    ${card("Used margin", money(api.blocked(a)), "Blocked for open buy orders")}
    ${card("Available cash", money(a.cash), "Including blocked cash")}
    ${card("Opening balance", money(api.cfg().start), "Virtual starting capital")}
    ${card("Funds added / withdrawn", `${money(added)} / ${money(withdrawn)}`, `Net ${signed(added - withdrawn)}`)}
    ${card("Account value", money(a.cash + value), `Holdings and positions ${money(value)}`)}
   </div>`;
  }
  function fundsLedger() {
   const a = api.account(), list = (a.ledger || []).slice().reverse();
   if (!list.length) return `<p class="ppa-empty ppa-empty-sm">No fund transfers yet. Your account opened with ${money(api.cfg().start)}.</p>`;
   const when = t => new Date(t).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
   return `<div class="ppa-table-wrap"><table class="ppa-table"><thead><tr><th>Date</th><th>Type</th><th class="num">Amount</th><th class="num">Cash after</th></tr></thead>
    <tbody>${list.map(l => `<tr><td class="ppa-time">${when(l.time)}</td><td>${l.kind === "add" ? "Funds added" : "Withdrawal"}</td><td class="num ${l.kind === "add" ? "pp-up" : "pp-down"}">${l.kind === "add" ? "+" : "−"}${api.fmt(l.amount)}</td><td class="num">${api.fmt(l.balance)}</td></tr>`).join("")}</tbody></table></div>`;
  }

  // ---------- Portfolio ----------
  function portfolio() {
   const a = api.account(), c = api.cfg(), all = rows("delivery").concat(rows("intraday"));
   const invested = sum(all, "cost"), value = sum(all, "value"), unreal = value - invested, day = sum(all, "day");
   const realized = a.realized.stcg + a.realized.ltcg + a.realized.intraday;
   const capital = api.capital(a), tax = api.taxEstimate(a), total = a.cash + value, net = total - capital - tax.total;
   const alloc = allocation(all, a.cash, total);
   const row = (label, v, tone, sub) => `<tr class="${sub ? "pp-sub" : ""}"><th>${label}</th><td class="${tone || ""}">${v}</td></tr>`;
   const inr = india();
   return `
    <div class="ppa-cards">
     ${card("Total value", money(total), `Your capital ${money(capital)}`)}
     ${card(`Net P&amp;L after tax ${api.infoButton("pnl")}`, signed(net), pct((net / capital) * 100), cls(net))}
     ${card("Today's P&amp;L", signed(day), "On open positions", cls(day))}
     ${card("Invested", money(invested), `Current value ${money(value)}`)}
     ${card("Unrealised P&amp;L", signed(unreal), invested ? pct((unreal / invested) * 100) : "", cls(unreal))}
     ${card("Available cash", money(a.cash))}
    </div>
    <div class="ppa-split">
     <section class="ppa-panel">
      <h4>Allocation</h4>
      ${allocBar(alloc)}
      <ul class="ppa-alloc">${alloc.map(p => `<li><i style="background:${p.color}"></i><span>${esc(p.label)}</span><b>${money(p.v)}</b><small>${p.pct.toFixed(1)}%</small></li>`).join("")}</ul>
     </section>
     <section class="ppa-panel">
      <h4><span>P&amp;L, charges and tax ${api.infoButton("tax")}</span></h4>
      <table class="pp-pnl">
       ${row("Realised P&amp;L (after charges)", signed(realized), cls(realized))}
       ${inr ? row("Short-term capital gain", signed(a.realized.stcg), "", true) + row("Long-term capital gain", signed(a.realized.ltcg), "", true) + row("Intraday (speculative) income", signed(a.realized.intraday), "", true) : ""}
       ${row("Unrealised P&amp;L (open positions)", signed(unreal), cls(unreal))}
       ${row("Charges paid", money(a.charges))}
       ${inr ? row("Estimated tax on realised gains", money(tax.total)) + row(`STCG @ ${PaperCharges.tax.stcg * 100}%`, money(tax.stcgTax), "", true) + row(`LTCG @ ${PaperCharges.tax.ltcg * 100}% above ₹1.25 lakh`, money(tax.ltcgTax), "", true) + row(`Intraday @ ${api.slab()}% slab`, money(tax.intradayTax), "", true) + row("Health &amp; education cess 4%", money(tax.cess), "", true) : ""}
       ${row(inr ? "Net P&amp;L after charges and tax" : "Net P&amp;L", signed(net), cls(net) + " pp-strong")}
      </table>
      ${inr ? "" : `<p class="pp-empty">Charges and tax are modelled for the Indian market only.</p>`}
     </section>
    </div>`;
  }

  // ---------- Holdings and positions ----------
  function positionTable(list, product) {
   if (!list.length) {
    return product === "delivery"
     ? `<p class="ppa-empty">No holdings yet. Buy with the <strong>Delivery (CNC)</strong> product to hold shares overnight.</p>`
     : `<p class="ppa-empty">No open intraday positions. Buy or sell with the <strong>Intraday (MIS)</strong> product to trade within the day.</p>`;
   }
   const totalCost = sum(list, "cost"), totalValue = sum(list, "value"), totalPl = totalValue - totalCost, totalDay = sum(list, "day");
   return `<div class="ppa-table-wrap"><table class="ppa-table">
    <thead><tr><th>Instrument</th><th class="num">Qty.</th><th class="num">Avg. cost</th><th class="num">LTP</th><th class="num">Cur. val</th><th class="num">P&amp;L</th><th class="num">Day chg.</th><th><span class="sr-only">Actions</span></th></tr></thead>
    <tbody>${list.map(r => `<tr>
     <td>${symCell(r.sym)}</td><td class="num">${r.qty}</td><td class="num">${api.fmt(r.avg)}</td><td class="num">${api.fmt(r.ltp)}</td>
     <td class="num">${api.fmt(r.value)}</td>
     <td class="num ${cls(r.pl)}">${signed(r.pl)}<small>${r.cost ? pct((r.pl / r.cost) * 100) : ""}</small></td>
     <td class="num ${cls(r.dayPct)}">${pct(r.dayPct)}</td>
     <td class="num ppa-acts"><button type="button" class="pt-mini-b" data-trade="buy" data-sym="${esc(r.sym)}" title="Buy more ${esc(r.sym)}">Add</button><button type="button" class="pp-mini" data-exit="${esc(r.key)}">Exit</button></td></tr>`).join("")}</tbody>
    <tfoot><tr><th>Total</th><td></td><td></td><td></td><td class="num">${api.fmt(totalValue)}</td><td class="num ${cls(totalPl)}">${signed(totalPl)}</td><td class="num ${cls(totalDay)}" title="Today's P&amp;L">${signed(totalDay)}</td><td></td></tr></tfoot>
   </table></div>`;
  }
  function summaryStrip(list) {
   if (!list.length) return "";
   const cost = sum(list, "cost"), value = sum(list, "value"), pl = value - cost, day = sum(list, "day");
   return `<div class="ppa-strip"><div><small>Total investment</small><strong>${money(cost)}</strong></div><div><small>Current value</small><strong>${money(value)}</strong></div><div><small>Day's P&amp;L</small><strong class="${cls(day)}">${signed(day)}</strong></div><div><small>Total P&amp;L</small><strong class="${cls(pl)}">${signed(pl)}${cost ? ` <small>${pct((pl / cost) * 100)}</small>` : ""}</strong></div></div>`;
  }
  function holdings() {
   const list = rows("delivery");
   return `<h3 class="ppa-title">Holdings <small>(${list.length})</small></h3>${summaryStrip(list)}${positionTable(list, "delivery")}
    <p class="ppa-hint">Delivery (CNC) shares you own. Long-term (held more than 12 months) or short-term capital gains tax applies when you sell.</p>`;
  }
  function positions() {
   const a = api.account(), list = rows("intraday");
   const closedToday = a.orders.filter(o => o.product === "intraday" && o.side === "sell" && o.status === "filled" && api.today(o.time));
   const realizedToday = closedToday.reduce((s, o) => s + (o.gain || 0), 0);
   const note = api.cfg().squareOff ? ` Open intraday positions are squared off automatically at ${api.cfg().squareOff} IST, as brokers do.` : "";
   return `<h3 class="ppa-title">Positions <small>(${list.length})</small></h3>${positionTable(list, "intraday")}
    <p class="ppa-hint">Closed today: ${closedToday.length} trade${closedToday.length === 1 ? "" : "s"} · realised P&amp;L <strong class="${cls(realizedToday)}">${signed(realizedToday)}</strong></p>
    <p class="ppa-hint">Intraday (MIS) positions are opened and closed within the same day.${note}</p>`;
  }

  // ---------- Orders ----------
  function orderRows() {
   const a = api.account();
   return a.pending.map(o => Object.assign({}, o, { status: "open" })).concat(a.orders);
  }
  function orders() {
   const all = orderRows(), list = all.filter(o => orderFilter === "all" || o.status === orderFilter);
   const count = f => all.filter(o => f === "all" || o.status === f).length;
   const typeLabel = o => (o.tag ? o.tag : o.type === "limit" ? "Limit" : o.type === "amo" ? "AMO" : "Market") + (o.modified ? ` · modified${o.modified > 1 ? ` ×${o.modified}` : ""}` : "");
   const status = o => ({ open: "Open", filled: "Executed", cancelled: "Cancelled" }[o.status] || o.status);
   const when = t => new Date(t).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
   return `<h3 class="ppa-title">Orders</h3><div class="ppa-toolbar">
     <div class="ppa-filters" role="group" aria-label="Filter orders">${ORDER_FILTERS.map(([f, l]) => `<button type="button" class="ppa-chip${orderFilter === f ? " active" : ""}" data-filter="${f}" aria-pressed="${orderFilter === f}">${l} <small>${count(f)}</small></button>`).join("")}</div>
     <button type="button" class="pp-btn" data-csv ${all.length ? "" : "disabled"}>⤓ Download CSV</button>
    </div>
    ${list.length ? `<div class="ppa-table-wrap"><table class="ppa-table">
     <thead><tr><th>Time</th><th>Type</th><th>Instrument</th><th>Product</th><th>Order</th><th class="num">Qty.</th><th class="num">Price</th><th class="num">Charges</th><th class="num">P&amp;L</th><th>Status</th><th><span class="sr-only">Actions</span></th></tr></thead>
     <tbody>${list.map(o => `<tr>
      <td class="ppa-time">${when(o.time)}</td>
      <td><span class="ppa-side ${o.side}">${o.side === "buy" ? "BUY" : "SELL"}</span></td>
      <td>${symCell(o.sym)}</td><td>${productTag(o.product)}</td><td>${esc(typeLabel(o))}</td>
      <td class="num">${o.qty}</td>
      <td class="num">${o.price ? api.fmt(o.price) : o.limit ? `${api.fmt(o.limit)}<small>limit</small>` : "—"}</td>
      <td class="num">${o.chargesTotal ? api.fmt(o.chargesTotal) : "—"}</td>
      <td class="num ${typeof o.gain === "number" ? cls(o.gain) : ""}">${typeof o.gain === "number" ? signed(o.gain) : "—"}</td>
      <td><span class="ppa-status ${o.status}">${status(o)}</span></td>
      <td class="num">${o.status === "open" ? `<span class="ppa-acts"><button type="button" class="pt-mini-b" data-modify="${esc(o.id)}" title="Change quantity or price">Modify</button><button type="button" class="pp-cancel" data-cancel="${esc(o.id)}">Cancel</button></span>` : ""}</td></tr>`).join("")}</tbody>
    </table></div>` : `<p class="ppa-empty">No ${orderFilter === "all" ? "" : status({ status: orderFilter }).toLowerCase() + " "}orders yet. Open the order window with <b class="ppa-b">B</b> or <b class="ppa-s">S</b> on a watchlist stock.</p>`}`;
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
   const days = {};
   list.forEach(o => { const k = dayKey(o.time); (days[k] = days[k] || { trades: 0, pl: 0, charges: 0, list: [] }); days[k].trades++; days[k].charges += o.chargesTotal || 0; if (typeof o.gain === "number") days[k].pl += o.gain; days[k].list.push(o); });
   const dayKeys = Object.keys(days).sort().reverse();
   const time = t => new Date(t).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });
   const fillRow = o => `<tr>
     <td class="ppa-time">${time(o.time)}</td><td><span class="ppa-side ${o.side}">${o.side === "buy" ? "BUY" : "SELL"}</span></td>
     <td>${symCell(o.sym)}</td><td>${productTag(o.product)}</td><td class="num">${o.qty}</td><td class="num">${api.fmt(o.price)}</td>
     <td class="num">${api.fmt(o.qty * o.price)}</td><td class="num">${o.chargesTotal ? api.fmt(o.chargesTotal) : "—"}</td>
     <td class="num ${typeof o.gain === "number" ? cls(o.gain) : ""}">${typeof o.gain === "number" ? signed(o.gain) : "—"}</td></tr>`;
   return `<h3 class="ppa-title">Trade history</h3><div class="ppa-toolbar">
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
     <section class="ppa-panel"><h4>Day by day</h4><div class="ppa-table-wrap"><table class="ppa-table">
      <thead><tr><th>Date</th><th class="num">Trades</th><th class="num">Charges</th><th class="num">Realised P&amp;L</th></tr></thead>
      <tbody>${dayKeys.map(k => `<tr><td>${dayLabel(k)}</td><td class="num">${days[k].trades}</td><td class="num">${api.fmt(days[k].charges)}</td><td class="num ${cls(days[k].pl)}">${signed(days[k].pl)}</td></tr>`).join("")}</tbody>
     </table></div></section>
     <section class="ppa-panel"><h4>Tradebook</h4><div class="ppa-table-wrap"><table class="ppa-table">
      <thead><tr><th>Time</th><th>Type</th><th>Instrument</th><th>Product</th><th class="num">Qty.</th><th class="num">Price</th><th class="num">Value</th><th class="num">Charges</th><th class="num">P&amp;L</th></tr></thead>
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

  // Each view is a skeleton (written when the view opens) with live regions that re-render on every tick.
  const LIVE = {
   dashboard: { main: dashboard }, orders: { main: orders }, holdings: { main: holdings }, positions: { main: positions },
   portfolio: { main: portfolio }, history: { main: history }, funds: { cards: fundsCards, ledger: fundsLedger }
  };
  function render() {
   if (!LIVE[view]) return;
   if (shown !== view) {
    body.innerHTML = view === "funds" ? fundsStatic() : `<div data-live="main"></div>`;
    shown = view;
    if (view === "funds") PaperCosts.mountFeeCalc(body.querySelector("[data-fee-calc]"), { plan: api.plan });
   } else if (pressing) return; // do not replace a button while it is being pressed
   Object.entries(LIVE[view]).forEach(([region, fn]) => {
    const el = body.querySelector(`[data-live="${region}"]`);
    if (el) setHTML(el, fn());
   });
  }
  // Writes only when the markup changed: most re-renders (every price tick) touch just a few cells.
  function setHTML(el, html) { if (el._html !== html) { el.innerHTML = html; el._html = html; } }
  function fundsMsg(text, kind) {
   const el = body.querySelector("[data-funds-msg]");
   if (el) { el.textContent = text; el.className = `pp-msg${kind ? " " + kind : ""}`; }
  }

  body.addEventListener("pointerdown", e => { if (e.target.closest("button")) pressing = true; });
  ["pointerup", "pointercancel", "pointerleave"].forEach(ev => body.addEventListener(ev, () => { setTimeout(() => { pressing = false; }, 0); }));
  body.addEventListener("click", e => {
   const t = e.target.closest("button");
   pressing = false;
   if (!t || t.type === "submit") return;
   if (t.dataset.exit) api.onExit(t.dataset.exit);
   else if (t.dataset.cancel) api.onCancel(t.dataset.cancel);
   else if (t.dataset.modify) api.onModify(t.dataset.modify);
   else if (t.dataset.trade) api.onTrade(t.dataset.trade, t.dataset.sym);
   else if (t.dataset.select) api.onSelect(t.dataset.select);
   else if (t.dataset.goto) api.onGoto(t.dataset.goto);
   else if (t.dataset.filter) { orderFilter = t.dataset.filter; render(); }
   else if (t.dataset.range) { range = t.dataset.range; render(); }
   else if (t.dataset.quick) { const input = body.querySelector('[data-funds] [name="amount"]'); input.value = (Number(input.value) || 0) + Number(t.dataset.quick); input.focus(); }
   else if (t.hasAttribute("data-reset")) { if (api.onReset()) { shown = null; render(); } }
   else if (t.hasAttribute("data-csv")) csv();
   else if (t.hasAttribute("data-tradebook")) tradebookCsv();
  });
  body.addEventListener("submit", e => {
   const form = e.target.closest("[data-funds]");
   if (!form) return;
   e.preventDefault();
   const kind = e.submitter && e.submitter.value === "withdraw" ? "withdraw" : "add";
   const amount = Number(form.elements.amount.value);
   const err = api.onFunds(kind, amount);
   if (err) { fundsMsg(err, "error"); return; }
   fundsMsg(`${kind === "add" ? "Added" : "Withdrew"} ${money(amount)}.`, "ok");
   form.elements.amount.value = "";
  });
  body.addEventListener("change", e => {
   if (e.target.matches("[data-plan]")) { api.onPlan(e.target.value); const calc = body.querySelector("[data-fee-calc]"); if (calc && calc._update) calc._update(); }
   if (e.target.matches("[data-slip]")) api.onSlippage(e.target.checked);
  });
  body.addEventListener("input", e => {
   if (e.target.matches("[data-slab]")) api.onSlab(e.target.value);
  });
  return {
   render,
   show(id) { if (VIEWS.includes(id)) { view = id; render(); } },
   reset() { shown = null; }, // the feed changed: rebuild the view (the funds form shows that feed's currency)
   counts() { const a = api.account(); return { holdings: rows("delivery").length, positions: rows("intraday").length, orders: a.pending.length }; }
  };
 }
 return { create, VIEWS };
})();
