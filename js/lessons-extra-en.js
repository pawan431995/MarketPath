// Extra learning material (English). Keyed by lesson slug.
// examples / scenarios: { title, text }   useCases / takeaways: strings   practice: { q, a }
// Numbers are illustrative only and exclude taxes, charges and slippage unless stated.
const LESSON_EXTRAS_EN = {
 "foundations": {
  examples: [
   { title: "Buying 10 shares", text: "A stock trades at ₹500. Buying 10 shares costs 10 × ₹500 = ₹5,000 (plus brokerage and taxes). If the price rises to ₹550, the holding is worth ₹5,500, a gain of ₹500, or 10% before costs." },
   { title: "Limit order that never fills", text: "The stock is at ₹500 and you place a limit buy at ₹495. If the price never drops to ₹495, your order stays open and you do not own the shares. A limit order protects the price but does not guarantee a trade." }
  ],
  scenarios: [
   { title: "Placing an order before the opening bell", text: "You place a market buy at 9:20 am, before the open. News overnight has moved the stock, so the price opens 4% higher than yesterday's close. Your order fills at the new price. A limit order would have capped what you pay." },
   { title: "Planning when cash becomes available", text: "You sell shares on Monday. Under T+1 the sale settles on Tuesday. If you need the money on Monday, the cash is not yet yours to withdraw. Check your broker's rules on when sale proceeds become available." }
  ],
  useCases: [
   "Checking company announcements on NSE or BSE before you buy, since listed companies must disclose material news.",
   "Using NIFTY 50 as a benchmark: if your portfolio gained 6% while the index gained 9%, you trailed the market.",
   "Understanding why your shares sit in a demat account and how a sale moves them out."
  ],
  takeaways: [
   "A share is a fraction of ownership; your return depends on price and dividends.",
   "A market order gets filled quickly at an uncertain price; a limit order controls the price but may not fill.",
   "Know your settlement cycle (T+1) before you plan to use sale money.",
   "Always check brokerage and taxes, because they reduce the real return."
  ],
  practice: [
   { q: "A company has 2 crore shares. How many shares is 0.5% of the company?", a: "0.5% × 2,00,00,000 = 1,00,000 shares." },
   { q: "Which order is more likely to be executed right away: market or limit?", a: "A market order, although the final price is uncertain. A limit order guarantees the price, not the execution." },
   { q: "You buy shares on Monday under T+1. On which day does the purchase settle?", a: "Tuesday, the next trading day." }
  ],
 },
 "investing": {
  examples: [
   { title: "How much to invest today", text: "Your goal is ₹10 lakh in 5 years, and you expect 10% a year. Today's amount needed is 10,00,000 ÷ 1.1⁵ = 10,00,000 ÷ 1.6105 ≈ ₹6,20,921. Compounding does most of the work." },
   { title: "One stock vs a mixed portfolio", text: "Portfolio A is 100% in one stock that falls 40%: total loss 40%. Portfolio B is 50% in an index fund (−20%), 30% in bonds (+2%), and 20% in gold (+5%). Result: 0.5×(−20) + 0.3×2 + 0.2×5 = −8.4%. Diversification limits the damage." }
  ],
  scenarios: [
   { title: "Market falls 30% after you start investing", text: "If your goal is 10 years away, continuing to invest buys more units at lower prices, which can help long-term returns. If you needed this money next year, the same fall would force a sale at a loss. Your time horizon decides how to react." },
   { title: "A friend promises 25% guaranteed returns", text: "Equity returns are never guaranteed. A promise of fixed high returns is a common warning sign of fraud. Check whether the entity is SEBI-registered before sending money." }
  ],
  useCases: [
   "Retirement planning: start early and let a long horizon absorb market swings.",
   "Child's education fund: move money gradually to safer assets as the target date approaches.",
   "Emergency fund: keep 3 to 6 months of expenses in cash or liquid funds, separate from investments."
  ],
  takeaways: [
   "Define the goal and time horizon before choosing investments.",
   "Compounding rewards time in the market more than the size of any single contribution.",
   "Spread money across assets and sectors to reduce the impact of one bad investment.",
   "Rebalance periodically and be wary of guaranteed-return promises."
  ],
  practice: [
   { q: "Using the Rule of 72, roughly how many years does money take to double at 8% a year?", a: "72 ÷ 8 = 9 years (the exact figure is about 9 years)." },
   { q: "A portfolio is 60% equity (−15%) and 40% debt (+4%). What is the total return?", a: "0.6 × (−15) + 0.4 × 4 = −9 + 1.6 = −7.4%." },
   { q: "Why should an emergency fund not be invested in shares?", a: "Shares can be down exactly when you need cash, forcing a sale at a loss. Emergency money must be liquid and stable." }
  ],
 },
 "sip-mutual-funds": {
  examples: [
   { title: "Rupee cost averaging in action", text: "You invest ₹5,000 each month. NAV goes 50, 40, 60. Units bought: 100, 125, 83.33. Total 308.33 units for ₹15,000, so your average cost is ₹15,000 ÷ 308.33 ≈ ₹48.65, lower than the simple average NAV of ₹50." },
   { title: "Projected SIP value", text: "₹5,000 a month for 10 years at an assumed 12% a year gives about ₹11.2 lakh from ₹6 lakh invested. The growth (about ₹5.2 lakh) is only an estimate, because market returns vary." }
  ],
  scenarios: [
   { title: "Market crashes 25% in month 6", text: "Continuing the SIP buys more units while prices are low, so the average cost falls. Stopping the SIP locks in the loss and misses the recovery. Pausing only makes sense if your income or goals have changed." },
   { title: "Choosing between an equity and a debt SIP", text: "A 15-year goal such as retirement suits equity funds, which carry more volatility. A 2-year goal such as a vehicle down payment suits debt funds, where the value is steadier." }
  ],
  useCases: [
   "Child's education planning with a monthly SIP that starts when the child is born.",
   "Building the habit of investing automatically, since the money leaves your account before you can spend it.",
   "Step-up SIP: increasing the monthly amount each year as your income grows."
  ],
  takeaways: [
   "A SIP is a method of investing; it does not guarantee profit.",
   "NAV is the price per unit, not a measure of how good a fund is. Compare returns and costs.",
   "Lower expense ratios leave more of the return with you.",
   "Match the fund type to your time horizon."
  ],
  practice: [
   { q: "NAV falls from ₹100 to ₹80. How many units does a ₹4,000 SIP buy at ₹80?", a: "4,000 ÷ 80 = 50 units." },
   { q: "On ₹10 lakh held for a year, what is the cost difference between a 2% and a 0.2% expense ratio?", a: "1.8% of ₹10 lakh = ₹18,000 a year, before compounding." },
   { q: "Is a fund with a lower NAV cheaper than one with a higher NAV?", a: "Not necessarily. NAV only shows the price per unit. What matters is the return on the fund's holdings and its costs." }
  ],
 },
 "reading-charts": {
  examples: [
   { title: "Reading one candle", text: "Open ₹100, high ₹108, low ₹97, close ₹105. The close is above the open, so the candle is green. The body runs from ₹100 to ₹105. The upper wick is ₹105 to ₹108 (₹3), and the lower wick is ₹97 to ₹100 (₹3)." },
   { title: "Daily percentage change", text: "Yesterday's close was ₹200 and today's close is ₹206. Change = (206 − 200) ÷ 200 = +3%. Charts show the move, but the percentage tells you its size." }
  ],
  scenarios: [
   { title: "Price rises on falling volume", text: "The stock climbs for three days while volume drops each day. Rising prices without volume support are weaker and more likely to reverse. Wait for confirmation before acting." },
   { title: "Daily chart down, weekly chart up", text: "The weekly trend is up, but the daily chart shows a short decline. This is often a pause or pullback inside a larger uptrend. Looking at more than one timeframe gives better context." }
  ],
  useCases: [
   "Checking the trend on a weekly chart before entering a trade on a daily chart.",
   "Comparing two stocks in the same sector to see which is holding up better.",
   "Spotting unusual volume around results or news, which can show where big players are active."
  ],
  takeaways: [
   "A candle shows open, high, low and close for its period.",
   "Colour shows direction; the body shows the range between open and close; wicks show extremes.",
   "Volume gives weight to price moves.",
   "Use more than one timeframe to avoid being misled by one chart."
  ],
  practice: [
   { q: "A candle has open 50, high 51, low 45, close 46. What colour is it and how long is the body?", a: "Red (close is below open). The body runs from 46 to 50, so it is 4 points long. The upper wick is 1 point and the lower wick is 1 point." },
   { q: "Which chart type shows the most price information for each period: line, OHLC or candlestick?", a: "OHLC and candlestick both show all four values. A line chart usually shows only the closing price." },
   { q: "A breakout happens on volume three times the average. Is it stronger or weaker than the same breakout on normal volume?", a: "Stronger, as a signal of participation. It is still not a guarantee that the move will continue." }
  ],
 },
 "fundamental-analysis": {
  examples: [
   { title: "P/E and earnings growth", text: "A stock trades at ₹300 with EPS of ₹15, so P/E = 20. If EPS rises 20% to ₹18 and the price stays at ₹300, P/E falls to 16.7. Higher earnings can make a stock look cheaper even at the same price." },
   { title: "Return on equity", text: "Net profit ₹500 crore on shareholders' equity of ₹2,500 crore gives ROE = 500 ÷ 2,500 = 20%. Debt of ₹1,000 crore against that equity gives debt-to-equity = 1,000 ÷ 2,500 = 0.4." }
  ],
  scenarios: [
   { title: "Profit rises but cash flow is negative", text: "The company reports higher profit, but operating cash flow is negative and receivables grow faster than sales. This can mean customers are not paying. Profit that never turns into cash is a warning sign." },
   { title: "Cheap stock in a shrinking industry", text: "A stock has a P/E of 6, far below its peers. Its industry is losing demand and earnings are falling each year. A low P/E here may be a value trap, not a bargain." }
  ],
  useCases: [
   "Screening for companies with consistent ROE above a chosen level over five years.",
   "Comparing two companies in the same industry using P/E, margins and debt levels.",
   "Reading the annual report before results to understand management's plans and risks."
  ],
  takeaways: [
   "Read the three statements together; one statement alone can mislead.",
   "P/E only makes sense relative to growth, risk and industry peers.",
   "Check whether profit converts to cash flow.",
   "Ratios start the research; business quality and management decide the conclusion."
  ],
  practice: [
   { q: "A stock trades at ₹450 with EPS of ₹30. What is its P/E?", a: "450 ÷ 30 = 15." },
   { q: "Why compare P/E ratios within the same industry?", a: "Different industries have different growth rates, margins and capital needs, so their normal P/E levels differ." },
   { q: "Receivables are rising faster than sales. Is this a positive or negative sign?", a: "Usually negative. It can mean customers are slow to pay, or revenue is being recognised aggressively. Investigate before investing." }
  ],
 },
 "technical-analysis": {
  examples: [
   { title: "Five-period simple moving average", text: "Closes: 100, 102, 104, 103, 105. Average = 514 ÷ 5 = 102.8. Next day closes at 107 and the oldest value (100) drops out. New average = (102 + 104 + 103 + 105 + 107) ÷ 5 = 521 ÷ 5 = 104.2." },
   { title: "RSI calculation", text: "Over 14 periods, average gain is 1.5 and average loss is 0.5. RS = 1.5 ÷ 0.5 = 3. RSI = 100 − 100 ÷ (1 + 3) = 75, which is above the common 70 overbought reference." }
  ],
  scenarios: [
   { title: "Breakout on low volume", text: "Price moves above resistance, but volume is below average. Many such breakouts fail and return into the range. Waiting for a retest or higher volume reduces false signals." },
   { title: "RSI overbought in a strong uptrend", text: "RSI reads 78 while the price keeps making higher highs. Strong trends can stay overbought for weeks. Selling only because RSI is above 70 often means missing the trend." },
   { title: "Golden cross after a long decline", text: "The 50-day average crosses above the 200-day average after months of falling prices. This is widely watched, but it lags. Confirm with price structure and volume." }
  ],
  useCases: [
   "Screening for stocks trading above their 200-day average.",
   "Placing a stop loss just below a recent support level.",
   "Timing an entry on a pullback to a moving average within an uptrend."
  ],
  takeaways: [
   "Indicators are derived from price and volume; they describe, they do not predict with certainty.",
   "Moving averages smooth noise and show trend direction.",
   "RSI above 70 or below 30 signals extremes, but strong trends can persist.",
   "Confirm signals with volume and price structure."
  ],
  practice: [
   { q: "What is the 3-period simple moving average of 10, 12 and 14?", a: "(10 + 12 + 14) ÷ 3 = 12." },
   { q: "An RSI reading of 25 is what kind of signal?", a: "An oversold reading. It suggests selling pressure may be exhausted, but it is not a guaranteed reversal." },
   { q: "The MACD line crosses above its signal line. What does this suggest?", a: "Momentum is shifting upward. It is a bullish momentum signal, not a guarantee of a rise." }
  ],
 },
 "swing-trading": {
  examples: [
   { title: "A complete swing trade", text: "Stock at ₹250 breaks resistance. Entry ₹250, stop ₹240, target ₹270. Risk = ₹10 per share, reward = ₹20, so the ratio is 2:1. With 100 shares: if the target hits, profit ≈ ₹2,000 (2% of ₹1 lakh capital). If the stop hits, loss ≈ ₹1,000 (1%)." },
   { title: "Expectancy over many trades", text: "Win rate 40%, average win 2R, average loss 1R (R = the planned risk). Expectancy = 0.4 × 2 − 0.6 × 1 = +0.2R per trade. A system can be profitable with a win rate below 50% if winners are larger than losers." }
  ],
  scenarios: [
   { title: "Gap down past your stop", text: "You hold overnight with a stop at ₹240. Bad news sends the stock to open at ₹230. Your stop fills near ₹230, so the loss is ₹20 per share (2%), not the planned ₹10 (1%). Position sizing should assume some gap risk." },
   { title: "Sideways market for two weeks", text: "The stock moves in a tight range for ten sessions and your target is not reached. Time has a cost. Decide in advance how long you will hold a trade that does not move." }
  ],
  useCases: [
   "Trading pullbacks to a rising moving average during an established trend.",
   "Trading around earnings season, with position size reduced to account for gap risk.",
   "Following sector rotation, buying the strongest sector's leaders over several weeks."
  ],
  takeaways: [
   "Write the setup, entry, stop and target before entering.",
   "Position size from the stop distance, not from a hunch.",
   "Expectancy, not the win rate alone, decides whether a method is worth using.",
   "Review each trade in a journal to find what really works."
  ],
  practice: [
   { q: "Entry ₹400, stop ₹388, target ₹424. What is the reward-to-risk ratio?", a: "Risk ₹12, reward ₹24, ratio 2:1." },
   { q: "With ₹1,00,000 capital and 1% risk, entry ₹400 and stop ₹388, how many shares?", a: "Risk ₹1,000 ÷ ₹12 per share = 83 shares (rounded down)." },
   { q: "Win rate 50%, average win 1.5R, average loss 1R. Is expectancy positive?", a: "0.5 × 1.5 − 0.5 × 1 = +0.25R per trade. Yes, before costs." }
  ],
 },
 "risk-management": {
  examples: [
   { title: "Recovery from a drawdown", text: "A 10% loss needs an 11.1% gain to recover (1 ÷ 0.9 − 1). A 20% loss needs 25%. A 50% loss needs 100%. The deeper the loss, the harder the climb back." },
   { title: "Position size from risk", text: "Capital ₹5,00,000, risk 1% = ₹5,000. Stop distance ₹20 per share, so size = 5,000 ÷ 20 = 250 shares. At ₹400 per share the position is ₹1,00,000, which is 20% of capital. Small risk can still mean a large position." }
  ],
  scenarios: [
   { title: "Losing streak", text: "You lose 5 trades in a row at 1% risk each. Capital falls about 4.9%. Following your rule of cutting size after losses keeps the damage contained and gives you time to review." },
   { title: "Hidden sector concentration", text: "You hold three IT stocks at 10% of capital each. That is 30% in one sector. A bad sector week hits all three together, so the real risk is larger than it looks." }
  ],
  useCases: [
   "Setting a maximum daily loss limit and stopping trading when it is reached.",
   "Sizing every swing trade from a fixed percentage of capital.",
   "Capping total exposure to any single sector or theme."
  ],
  takeaways: [
   "Protect capital first; avoiding large losses matters more than chasing large gains.",
   "Size positions from the stop distance and your risk limit.",
   "Track exposure across correlated positions.",
   "Have written rules for drawdowns before you need them."
  ],
  practice: [
   { q: "Your account fell 25%. What gain is needed to get back to the starting value?", a: "1 ÷ 0.75 − 1 = 33.3%." },
   { q: "Capital ₹2,00,000, risk 2%, stop distance ₹10. How many shares?", a: "₹4,000 ÷ ₹10 = 400 shares." },
   { q: "Why can three different stocks still be one risk?", a: "If they move together (high correlation), a single event hits all of them at the same time." }
  ],
 },
 "intraday-trading": {
  examples: [
   { title: "Leverage magnifies a small move", text: "Cash ₹20,000 with an illustrative 5× intraday margin gives ₹1,00,000 exposure. A 2% move against you is ₹2,000, which is 10% of your cash. The leverage that multiplies gains multiplies losses equally." },
   { title: "Costs decide the result", text: "Buy 100 shares at ₹500 and sell at ₹502. Gross profit is ₹200. If total costs are ₹60 (an illustrative figure), net profit is ₹140. The trade needs a move above the cost threshold just to break even." },
   { title: "Slippage", text: "You plan to enter at ₹500 but fill at ₹500.80. On 100 shares that is ₹80 worse than planned, which can wipe out a small winning trade." }
  ],
  scenarios: [
   { title: "Sudden news spike at 11:00", text: "A company announces a deal and the stock jumps 5% in minutes. Chasing it at the top often means buying the peak. A trader with a pre-set rule waits for a pullback or skips the trade." },
   { title: "Two losses before lunch", text: "After two losses you feel the urge to 'win it back' with a bigger position. The daily loss limit in your plan says to stop. Following the rule protects the rest of the day and the account." }
  ],
  useCases: [
   "Opening range breakout: trade a move beyond the high or low of the first 15 minutes, with a stop inside the range.",
   "Trading only the most liquid stocks where the spread is tight.",
   "Closing all positions before the session ends to avoid overnight risk."
  ],
  takeaways: [
   "Intraday leverage increases both profit and loss; treat margin with caution.",
   "Include costs and slippage in every plan.",
   "Use stop-loss orders and a daily loss limit.",
   "Most individual traders lose money over time, so start with paper trading."
  ],
  practice: [
   { q: "A 1% move against a ₹50,000 position with 4× leverage on ₹12,500 cash. What is the loss in rupees and as a percent of cash?", a: "Exposure ₹50,000; 1% = ₹500 loss, which is 4% of ₹12,500 cash." },
   { q: "Gross gain ₹150, costs ₹90. What is the net result?", a: "₹60 net profit." },
   { q: "Why avoid market orders in thinly traded stocks?", a: "They can fill far from the displayed price because there are few buyers or sellers, causing large slippage." }
  ],
 },
 "futures-options": {
  examples: [
   { title: "Futures P&L", text: "Buy one lot of an index future at 24,000. Assume a lot size of 50 for illustration: exposure = 50 × 24,000 = ₹12,00,000. If the index rises 200 points, profit = 200 × 50 = ₹10,000. If it falls 200 points, loss = ₹10,000, before costs and margin charges." },
   { title: "Buying a put", text: "Buy a 24,000 put for a premium of 150, lot size 50. Maximum loss = 150 × 50 = ₹7,500. At expiry, if the index is at 23,700, intrinsic value = 300, so the option is worth 300 × 50 = ₹15,000 and profit = ₹7,500." },
   { title: "Selling a call", text: "Sell a 24,000 call for a premium of 150, lot size 50. If the index closes at 24,500 at expiry, the loss per unit is 500 − 150 = 350, so the total is 350 × 50 = ₹17,500. The loss keeps growing as the index rises." }
  ],
  scenarios: [
   { title: "Expiry-day move", text: "On expiry day an option can swing sharply as its time value disappears. A buyer can lose the whole premium within hours. Sellers face the risk of a large move against them with little time to adjust." },
   { title: "Margin call on a futures position", text: "The index falls and your margin falls below the required level. You must add funds or the broker may close the position at a loss. Keep a buffer above the minimum margin." }
  ],
  useCases: [
   "Hedging: buying puts to protect a stock or index portfolio from a sharp fall.",
   "Covered call: owning shares and selling calls against them to earn premium, while capping upside.",
   "Speculation on a view of direction or volatility, with the risk limits set in advance."
  ],
  takeaways: [
   "Futures carry obligations on both sides; options give rights to buyers and obligations to sellers.",
   "Option buyers risk the premium; option sellers can face large losses.",
   "Lot size, margin and expiry must be understood before trading.",
   "Learn with paper trading and small positions first."
  ],
  practice: [
   { q: "Lot size 25, index future bought at 22,000 and closed at 22,100. Profit?", a: "100 × 25 = ₹2,500 (before costs)." },
   { q: "A call with strike 24,000 is bought at premium 150, and the index expires at 24,100. What is the profit per unit?", a: "Intrinsic value 100 − premium 150 = −50, a loss of 50 per unit." },
   { q: "Who has the maximum loss on a call option, the buyer or the seller?", a: "The buyer's maximum loss is the premium paid. The seller's loss can be large or unlimited if the stock rises sharply." }
  ],
 },
 "option-greeks": {
  examples: [
   { title: "Delta in action", text: "A call with delta 0.6 gains about 0.6 × 100 = ₹60 per unit if the underlying rises 100 points. Delta is an estimate that changes as the price moves." },
   { title: "Theta decay", text: "An option is priced at 100 with theta of −5 per day. After two days, all else equal, it is about 90. Time works against option buyers and in favour of option sellers." },
   { title: "Vega and implied volatility", text: "Vega is 8. If implied volatility rises 2 points, the option gains about 8 × 2 = ₹16 per unit, even if the underlying does not move. This is why options often get more expensive before results." },
   { title: "Bull call spread", text: "Buy a 24,000 call at ₹200 and sell a 24,500 call at ₹80. Net debit = ₹120. Maximum profit = 500 − 120 = ₹380. Maximum loss = ₹120. Break-even = 24,000 + 120 = 24,120. Both risk and reward are fixed in advance." }
  ],
  scenarios: [
   { title: "IV crush after results", text: "You buy calls before results when implied volatility is high. The result is in line, and IV falls sharply. The option loses value even though the stock rose a little. Vega losses can exceed directional gains." },
   { title: "Weekend time decay", text: "Options lose time value over the weekend even though the market is closed. Option sellers collect theta, but must manage the risk of a large move." }
  ],
  useCases: [
   "Choosing between a naked call and a bull call spread to reduce cost and risk.",
   "Using delta to estimate how a portfolio of options moves with the market.",
   "Selling iron condors in a range-bound market with defined maximum loss."
  ],
  takeaways: [
   "Delta = price sensitivity; gamma = how delta changes; theta = time decay; vega = volatility sensitivity.",
   "Check implied volatility before buying options.",
   "Defined-risk spreads cap both maximum loss and maximum gain.",
   "Greeks are estimates from a model; verify with your broker's calculator."
  ],
  practice: [
   { q: "A call has delta 0.4. The underlying rises 50 points. Approximately how much does the option gain?", a: "0.4 × 50 = ₹20 per unit." },
   { q: "A spread buys a 100 call for 8 and sells a 110 call for 3. Maximum loss and maximum profit per unit?", a: "Net debit 5. Maximum loss ₹5. Maximum profit 10 − 5 = ₹5." },
   { q: "Why can an option lose value even when the stock rises?", a: "Time decay (theta) or a fall in implied volatility (vega) can outweigh a small directional gain." }
  ],
 },
 "trading-psychology": {
  examples: [
   { title: "Loss aversion in practice", text: "You buy at ₹100 with a planned stop at ₹90. The stock falls to ₹90 but you hold, hoping it recovers. It falls to ₹60, a 40% loss instead of the planned 10%. The plan was right; the emotion broke it." },
   { title: "Cost of overtrading", text: "You place 20 trades a day, each costing ₹100 in charges. That is ₹2,000 a day, or about ₹40,000 over 20 trading days, before any trading losses." }
  ],
  scenarios: [
   { title: "Revenge trade", text: "After three losses you double your size to recover quickly. The fourth trade fails and the day ends with a much bigger loss. A written rule to stop after three losses prevents this." },
   { title: "Big win, bigger risk", text: "You make 8% in a month and start taking positions twice the usual size. One bad week erases the gains. Overconfidence after success is as dangerous as fear after failure." }
  ],
  useCases: [
   "Keeping a trade journal that records the reason for each trade and whether the rules were followed.",
   "Using a pre-trade checklist: setup, risk, stop, target, and why now.",
   "Running a weekly review to spot repeated mistakes such as early exits or late stops."
  ],
  takeaways: [
   "Judge decisions by process, not by one outcome.",
   "Write rules before the session and follow them during it.",
   "Recognise biases: loss aversion, overconfidence, recency and FOMO.",
   "Rest after large losses and avoid trading while emotional."
  ],
  practice: [
   { q: "You planned a 10% stop but held and lost 30%. Which bias is most likely at work?", a: "Loss aversion: refusing to accept a loss, which turns a small planned loss into a large one." },
   { q: "Twenty trades a day cost ₹100 each. What is the monthly cost over 20 trading days?", a: "20 × 100 × 20 = ₹40,000." },
   { q: "A trade follows your plan but loses money. Was the decision bad?", a: "Not necessarily. A good process can still lose on a single trade. Judge the decision by whether the plan was followed and was sound." }
  ],
 }
};
