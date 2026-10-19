// Transparency for the paper-trading terminal: the slippage estimator, the statutory fee calculator and the
// "how is this calculated?" disclosure pop-ups. Needs paper-charges.js. Used by paper-trading.js,
// paper-account.js, paper-journal.js and paper-replay.js.
const PaperCosts = (function () {
 const R = () => PaperCharges.rates;
 const pct = (x, d = 4) => `${(x * 100).toFixed(d).replace(/\.?0+$/, "")}%`;

 // ---------- Slippage ----------
 // A market order pays roughly half the bid-ask spread plus a market-impact cost that grows with the square
 // root of the order's share of the stock's average daily traded value (ADV), a common rule of thumb.
 //   slippage (bps) = half-spread + 10 × √(order value ÷ 1% of ADV), impact capped at 200 bps
 // Liquidity tiers set the half-spread, and the ADV when the real figure is not known.
 const TIERS = {
  high: { label: "Very liquid (large-cap)", halfSpread: 2, adv: 5e9 },
  mid: { label: "Liquid (NIFTY 500)", halfSpread: 5, adv: 2e8 },
  low: { label: "Less liquid (outside NIFTY 500)", halfSpread: 15, adv: 1e7 }
 };
 // p: { price, qty, side, tier, adv (₹ per day, optional), tick }
 function slippage(p) {
  const tier = TIERS[p.tier] || TIERS.mid, tick = p.tick || 0.05;
  const value = p.qty * p.price, adv = p.adv > 0 ? p.adv : tier.adv;
  const impact = Math.min(200, 10 * Math.sqrt(value / (0.01 * adv)));
  const bps = tier.halfSpread + impact;
  // A fill is always at least one tick away from the quoted price: prices move in ticks.
  const perShare = value > 0 ? Math.max(tick, Math.ceil(((p.price * bps) / 1e4) / tick - 1e-9) * tick) : 0;
  return {
   bps: p.price ? (perShare / p.price) * 1e4 : 0, modelBps: bps, halfSpread: tier.halfSpread, impact,
   perShare, total: perShare * p.qty, fillPrice: p.side === "buy" ? p.price + perShare : p.price - perShare,
   adv, advKnown: p.adv > 0, tier: p.tier, tierLabel: tier.label
  };
 }

 // ---------- Disclosure pop-ups ----------
 const li = items => `<ul>${items.map(x => `<li>${x}</li>`).join("")}</ul>`;
 const TOPICS = {
  source: () => ({
   title: "Where the prices come from",
   html: `<p>The badge on the chart names the source of the prices you are trading on.</p>${li([
    "<b>NSE real prices (delayed)</b>: prices of NSE-listed shares from Yahoo Finance, fetched every 5 minutes in market hours by a scheduled job and published as files. They arrive about 5–10 minutes late. Between updates, and after hours, the price moves with <i>simulated</i> ticks around the last real price; the note under the chart says when this happens.",
    "<b>Daily candles</b> (1D, 1W, 1M) are real daily open, high, low, close and volume for NIFTY 500 stocks, refreshed every 12 hours.",
    "<b>Simulated NSE feed</b>: a random walk generated in your browser. Shapes look like a market, but the prices are not real.",
    "<b>Finnhub</b>: live quotes fetched with your own API key; mainly US stocks."
   ])}<p>None of this is an official exchange feed. Use it for practice only, never for real trading decisions.</p>`
  }),
  charges: () => {
   const r = R();
   return {
    title: "How charges are calculated",
    html: `<p>Every order pays the charges an Indian broker passes on. Turnover = quantity × price.</p>${li([
     `<b>Brokerage</b>: depends on the plan chosen in Funds (for example ₹0 on delivery, and ₹20 or 0.03% per intraday order, whichever is lower).`,
     `<b>STT</b> (Securities Transaction Tax): ${pct(r.sttDelivery)} of turnover on both delivery buys and sells; ${pct(r.sttIntradaySell)} on intraday sells only. Rounded to the rupee.`,
     `<b>Exchange transaction charge</b>: ${pct(r.exchange)} of turnover (NSE).`,
     `<b>SEBI fee</b>: ${pct(r.sebi)} of turnover (₹10 per crore).`,
     `<b>Stamp duty</b>: on buys only: ${pct(r.stampDelivery)} for delivery, ${pct(r.stampIntraday)} for intraday.`,
     `<b>DP charge</b>: ₹${r.dpPerSell} per delivery sell order (depository fee).`,
     `<b>GST</b>: ${pct(r.gst, 0)} on brokerage + exchange charge + SEBI fee + DP charge.`
    ])}<p>Rates change with budgets and exchange circulars and differ between brokers. They are kept in <code>js/paper-charges.js</code>; check them against your broker's charge sheet.</p>`
   };
  },
  slippage: () => ({
   title: "How slippage is estimated",
   html: `<p>A real market order rarely fills at exactly the last traded price: you cross the bid-ask spread, and a large order moves the price. The terminal estimates this and adds it to every <b>market</b> order (you can turn it off in Funds).</p>
    <p class="pt-formula">slippage (basis points) = half-spread + 10 × √(order value ÷ 1% of average daily traded value)</p>${li([
     "<b>Half-spread</b>: 2 bps for very liquid large caps, 5 bps for NIFTY 500 stocks, 15 bps for the rest.",
     "<b>Average daily traded value</b>: the last 20 days' average of close × volume when daily data is loaded; otherwise ₹500 crore, ₹20 crore or ₹1 crore by tier.",
     "The market-impact part is capped at 200 bps. The result is rounded <i>up</i> to the price tick (₹0.05), so every market order slips at least one tick.",
     "Buys fill higher and sells fill lower by this amount. Limit orders fill at your limit price with no slippage."
    ])}<p>1 basis point = 0.01%. This is a rule of thumb, not a prediction: real slippage depends on the order book at that moment and can be far larger in fast markets.</p>`
  }),
  fills: () => ({
   title: "How orders fill",
   html: li([
    "<b>Market orders</b> fill at once at the shown price, plus the estimated slippage. There are no partial fills.",
    "<b>Limit orders</b> wait and fill at your limit price when the price reaches it.",
    "<b>Intraday (MIS)</b> positions on the real-price feed are squared off at 3:20 pm IST, as brokers do.",
    "No leverage or margin is simulated, and short selling is allowed only in intraday bar replay.",
    "In bar replay, an order placed on a bar fills at the <b>next bar's open</b>, so you can never trade on a price you have already seen. If a stop-loss and a target both fall inside one bar, the stop-loss is assumed to have been hit first (the cautious assumption)."
   ])
  }),
  tax: () => ({
   title: "How tax is estimated",
   html: `${li([
    `Short-term capital gain (delivery shares held up to 12 months): ${PaperCharges.tax.stcg * 100}%.`,
    `Long-term capital gain (held more than 12 months): ${PaperCharges.tax.ltcg * 100}% on gains above ₹${PaperCharges.tax.ltcgExempt.toLocaleString("en-IN")} a year.`,
    "Intraday profit is speculative business income, taxed at your slab rate (set in Funds).",
    `Health and education cess of ${PaperCharges.tax.cess * 100}% is added.`,
    "Simplified set-off: short-term losses reduce long-term gains; intraday losses only offset intraday gains. Charges are treated as deductible."
   ])}<p>This is an estimate for learning, not tax advice. Real returns depend on your full income and on the rules in force.</p>`
  }),
  pnl: () => ({
   title: "How P&L is measured",
   html: li([
    "<b>Realised P&L</b>: on each sell, (sell price − buy price) × quantity, minus the charges on both the buy and the sell. Lots are matched first-in, first-out.",
    "<b>Unrealised P&L</b>: current value of open positions − what they cost, including buy charges.",
    "<b>Net P&L</b> = account value − your capital − estimated tax. Your capital = the starting balance + funds added − funds withdrawn, so adding money never counts as profit.",
    "<b>Today's P&L</b>: lots bought today count from their buy price; older lots from the previous close."
   ])
  }),
  winrate: () => ({
   title: "Win rate, expectancy and profit factor",
   html: `${li([
    "<b>Win rate</b> = winning trades ÷ all logged trades. A trade wins when its P&L after charges is above zero; a break-even trade counts as a loss, because charges make it one.",
    "<b>Last 20</b> is the same figure for your 20 most recent trades, so you can see whether you are improving.",
    "<b>Expectancy</b> = average P&L per trade = win rate × average win − loss rate × average loss. Above zero means the way you trade has made money so far.",
    "<b>Profit factor</b> = gross profit ÷ gross loss. Above 1 is profitable; above 1.5 is considered good.",
    "<b>R-multiple</b> = P&L ÷ the amount you planned to risk (entry to stop-loss × quantity). It shows up when a trade had a stop-loss."
   ])}<p>Small samples mislead: with fewer than about 30 trades these numbers swing a lot from trade to trade.</p>`
  }),
  drawdown: () => ({
   title: "How maximum drawdown is calculated",
   html: `<p>Equity after each trade = starting capital + the running total of trade P&L (in the order the trades closed).</p>
    <p class="pt-formula">drawdown = (peak equity so far − equity now) ÷ peak equity so far</p>${li([
     "<b>Maximum drawdown</b> is the largest such fall from a peak to a later trough: the worst losing run you would have had to sit through.",
     "<b>Current drawdown</b> is how far you are now below your best point.",
     "Starting capital is ₹10 lakh (the paper account's opening balance). Open positions are not included until they are closed."
    ])}`
  }),
  skills: () => ({
   title: "How skills are flagged",
   html: `<p>Each logged trade carries one main skill (the reason you took it) and optional extra tags and mistakes. The grid groups trades by skill.</p>${li([
    "<b>Underperforming</b>: at least 3 trades, and an expectancy below zero or a win rate below 40%.",
    "<b>Needs more trades</b>: fewer than 3 trades, too few to judge.",
    "<b>Working</b>: everything else.",
    "<b>Mistake cost</b>: the total P&L of trades tagged with that mistake. Trades can carry several mistakes, so the costs overlap."
   ])}<p>Use it to decide what to practise next in bar replay, not as proof that a setup works.</p>`
  }),
  replay: () => ({
   title: "How bar replay works",
   html: li([
    "Replay hides everything after the starting bar and reveals one bar at a time, so you practise reading a chart without knowing what comes next.",
    "<b>Data</b>: real NSE daily candles (2 years) or 5-minute prices (last 5 days, built from closes) for NIFTY 500 stocks, or any OHLC file you import as JSON.",
    "<b>Blind mode</b> hides the stock's name and the dates and rescales prices to start at 1,000, so you cannot recall what really happened. Everything is revealed when the session ends.",
    "Orders fill at the next bar's open, plus estimated slippage and charges (delivery charges on daily bars, intraday charges on 5-minute bars). Daily replay is long-only, as delivery shares cannot be sold short in India; intraday replay allows shorts.",
    "Replay uses its own virtual ₹10 lakh and does not touch your paper account."
   ])
  }),
  storage: () => ({
   title: "Where your journal is stored",
   html: li([
    "Journal entries are saved in this browser's IndexedDB database. Nothing is sent to a server.",
    "Clearing site data, private windows and switching browsers or devices lose it. Use <b>Export JSON</b> regularly to keep a copy, and <b>Import JSON</b> to restore it or move it to another device.",
    "Importing merges by entry ID: entries you already have are kept, and new ones are added."
   ])
  })
 };

 let lastFocus = null;
 function openInfo(key) {
  const t = TOPICS[key];
  const box = document.getElementById("ptInfo");
  if (!t || !box) return;
  const c = t();
  document.getElementById("ptInfoTitle").textContent = c.title;
  document.getElementById("ptInfoBody").innerHTML = c.html;
  lastFocus = document.activeElement;
  box.hidden = false;
  box.querySelector("[data-close-info]").focus();
 }
 function closeInfo() {
  const box = document.getElementById("ptInfo");
  if (!box || box.hidden) return false;
  box.hidden = true;
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  return true;
 }
 document.addEventListener("click", e => {
  const b = e.target.closest("[data-disclose]");
  if (b) { e.preventDefault(); openInfo(b.dataset.disclose); return; }
  const box = document.getElementById("ptInfo");
  if (box && !box.hidden && (e.target === box || e.target.closest("[data-close-info]"))) closeInfo();
 });
 document.addEventListener("keydown", e => { if (e.key === "Escape" && closeInfo()) e.stopImmediatePropagation(); }, true);
 const infoButton = (key, label) => `<button type="button" class="pt-info-btn" data-disclose="${key}" aria-label="${label || "How is this calculated?"}" title="${label || "How is this calculated?"}">ⓘ</button>`;

 // ---------- Statutory fee calculator ----------
 // A round trip (buy, then sell) with every charge itemised, updated as you type.
 function mountFeeCalc(el, api) {
  if (!el || el.dataset.mounted) return;
  el.dataset.mounted = "1";
  el.innerHTML = `<form class="pt-fee-form" onsubmit="return false">
    <label class="pt-field"><span>Product</span><select name="product"><option value="delivery">Delivery (CNC)</option><option value="intraday">Intraday (MIS)</option></select></label>
    <label class="pt-field"><span>Quantity</span><input name="qty" type="number" min="1" step="1" value="100"></label>
    <label class="pt-field"><span>Buy price (₹)</span><input name="buy" type="number" min="0.05" step="0.05" value="1000"></label>
    <label class="pt-field"><span>Sell price (₹)</span><input name="sell" type="number" min="0.05" step="0.05" value="1020"></label>
   </form><div class="pt-fee-out" aria-live="polite"></div>`;
  const form = el.querySelector("form"), out = el.querySelector(".pt-fee-out");
  const money = n => `₹ ${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  function update() {
   const product = form.product.value, qty = Math.floor(Number(form.qty.value)), buy = Number(form.buy.value), sell = Number(form.sell.value);
   if (!(qty > 0 && buy > 0 && sell > 0)) { out.innerHTML = `<p class="ppa-hint">Enter a quantity and both prices.</p>`; return; }
   const plan = api.plan(), b = PaperCharges.compute("buy", product, qty, buy, plan), s = PaperCharges.compute("sell", product, qty, sell, plan), r = R();
   const rows = [
    ["Brokerage", "brokerage", PaperCharges.plans[plan] ? PaperCharges.plans[plan].label : ""],
    ["STT", "stt", product === "delivery" ? `${pct(r.sttDelivery)} both sides` : `${pct(r.sttIntradaySell)} on sell`],
    ["Exchange transaction charge", "exchange", pct(r.exchange)],
    ["SEBI fee", "sebi", pct(r.sebi)],
    ["Stamp duty", "stamp", `${pct(product === "delivery" ? r.stampDelivery : r.stampIntraday)} on buy`],
    ["DP charge", "dp", product === "delivery" ? `₹${r.dpPerSell} per sell` : "delivery only"],
    ["GST", "gst", `${pct(r.gst, 0)} on brokerage, exchange, SEBI, DP`]
   ];
   const total = b.total + s.total, gross = (sell - buy) * qty, net = gross - total, turnover = (buy + sell) * qty;
   out.innerHTML = `<div class="ppa-table-wrap"><table class="ppa-table pt-fee-table"><thead><tr><th>Charge</th><th>Rate</th><th class="num">Buy</th><th class="num">Sell</th><th class="num">Total</th></tr></thead><tbody>
    ${rows.map(([label, k, rate]) => `<tr><td>${label}</td><td class="ppa-time">${rate}</td><td class="num">${b[k].toFixed(2)}</td><td class="num">${s[k].toFixed(2)}</td><td class="num">${(b[k] + s[k]).toFixed(2)}</td></tr>`).join("")}
    </tbody><tfoot><tr><th>Total charges</th><td></td><td class="num">${b.total.toFixed(2)}</td><td class="num">${s.total.toFixed(2)}</td><td class="num">${total.toFixed(2)}</td></tr></tfoot></table></div>
    <dl class="ppa-kv pt-fee-sum">
     <div><dt>Turnover</dt><dd>${money(turnover)}</dd></div>
     <div><dt>Charges as % of turnover</dt><dd>${((total / turnover) * 100).toFixed(3)}%</dd></div>
     <div><dt>Gross P&amp;L</dt><dd class="${gross >= 0 ? "pp-up" : "pp-down"}">${gross >= 0 ? "+" : "−"}${money(Math.abs(gross))}</dd></div>
     <div><dt>Net P&amp;L after charges</dt><dd class="${net >= 0 ? "pp-up" : "pp-down"}">${net >= 0 ? "+" : "−"}${money(Math.abs(net))}</dd></div>
     <div><dt>Break-even sell price</dt><dd>${money(buy + total / qty)} <small>(+${((total / qty / buy) * 100).toFixed(3)}%)</small></dd></div>
    </dl>`;
  }
  form.addEventListener("input", update);
  el._update = update;
  update();
 }

 return { TIERS, slippage, openInfo, closeInfo, infoButton, mountFeeCalc };
})();
