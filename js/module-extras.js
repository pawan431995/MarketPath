// Per-module support material, so each module is self-contained:
// MODULE_META: key glossary terms (exact term names from glossary-data.js), tool ids (patterns or indicators),
//              and try-it calculators (goal, lump, cagr, position, breakeven).
// MODULE_CONTENT: common learner questions (faq) and a practice quiz (quiz), in English (en) and Hindi (hi).
// Quiz item: q (question), o (4 options), a (index of correct option), e (explanation).
const MODULE_META = {
 "foundations": { terms: ["Share (stock)", "Equity", "Index", "NIFTY 50", "SENSEX", "NSE and BSE", "SEBI", "Demat account", "Trading account", "KYC", "Broker", "Order", "Market order", "Limit order", "Stop-loss order", "Bid and ask", "Spread", "Liquidity", "Volume", "Settlement (T+1)", "Circuit limit", "Market capitalisation (market cap)", "Dividend", "Brokerage", "STT (Securities Transaction Tax)", "Intraday"], tools: [], calc: ["breakeven"] },
 "investing": { terms: ["Compounding", "Diversification", "Asset allocation", "Emergency fund", "Inflation", "Volatility"], tools: [], calc: ["lump", "goal"] },
 "sip-mutual-funds": { terms: ["SIP", "Mutual fund", "NAV (net asset value)", "Expense ratio", "Index fund", "ELSS", "Rupee cost averaging"], tools: [], calc: ["goal"] },
 "reading-charts": { terms: ["Candlestick", "Volume", "Trend", "Support", "Resistance"], tools: ["doji", "marubozu", "bullish-engulfing", "volume", "moving-averages"], calc: [] },
 "candlestick-patterns": { terms: ["Candlestick", "Trend", "Support", "Resistance", "Breakout", "Divergence"], tools: "ALL_PATTERNS", calc: [] },
 "fundamental-analysis": { terms: ["EPS (earnings per share)", "P/E ratio", "Book value", "ROE (return on equity)", "Debt-to-equity", "Dividend yield", "Revenue (sales)", "Net profit", "Balance sheet", "Cash flow statement", "Annual report", "Market capitalisation (market cap)"], tools: [], calc: ["cagr"] },
 "technical-analysis": { terms: ["Trend", "Support", "Resistance", "Moving average", "RSI", "MACD", "Divergence", "Breakout", "Candlestick"], tools: ["moving-averages", "rsi", "macd", "bollinger-bands", "adx", "volume", "head-and-shoulders", "double-bottom"], calc: [] },
 "technical-indicators": { terms: ["Moving average", "RSI", "MACD", "Volatility", "Volume", "Divergence"], tools: "ALL_INDICATORS", calc: [] },
 "swing-trading": { terms: ["Swing trading", "Risk-reward ratio", "Position sizing", "Stop-loss order", "Breakout", "Drawdown"], tools: ["atr", "moving-averages", "bullish-engulfing", "bull-flag"], calc: ["position"] },
 "risk-management": { terms: ["Drawdown", "Position sizing", "Risk-reward ratio", "Leverage", "Diversification", "Volatility"], tools: ["atr", "adx"], calc: ["position"] },
 "intraday-trading": { terms: ["Intraday", "Margin", "Leverage", "Slippage", "Liquidity", "Spread", "Brokerage", "STT (Securities Transaction Tax)", "Bid and ask"], tools: ["vwap", "volume", "atr"], calc: ["breakeven"] },
 "futures-options": { terms: ["Futures", "Option", "Call and put", "Strike price", "Expiry", "Lot size", "Premium", "ITM, ATM, OTM", "Open interest", "Implied volatility (IV)", "Margin"], tools: [], calc: [] },
 "option-greeks": { terms: ["Greeks (delta, theta)", "Implied volatility (IV)", "Premium", "Expiry", "Strike price", "Option"], tools: [], calc: [] },
 "trading-psychology": { terms: ["Drawdown", "Risk-reward ratio", "Position sizing", "Diversification"], tools: [], calc: [] }
};

const MODULE_CONTENT = {
en: {
 "foundations": {
  faq: [
   { q: "Can I start with a small amount like ₹500?", a: "Yes, if you can buy at least one share. The share price is the minimum you need for a delivery purchase, plus costs. Start with an amount you can afford to lose." },
   { q: "Will I lose all my money if I invest in shares?", a: "You can lose money, including all of a single holding in a worst case. Spreading money across several companies and sectors, and never investing money you need soon, reduces that risk. No one can guarantee returns." },
   { q: "Why are my shares not in my demat account on the day I bought them?", a: "Equity trades settle on T+1, one trading day after the trade. The shares are credited on settlement day, not the trade day. Check your broker's settlement status if they are not there by then." }
  ],
  quiz: [
   { q: "What is the main role of a demat account?", o: ["To place buy and sell orders", "To hold your shares electronically", "To pay taxes on gains", "To guarantee returns"], a: 1, e: "A demat account holds your shares in electronic form. The trading account is used to place orders." },
   { q: "You buy shares on Monday. When are they normally credited to your demat account?", o: ["On Monday, same day", "On Tuesday (T+1)", "After one month", "Only when you sell"], a: 1, e: "Equity trades settle on T+1, the next trading day." },
   { q: "You want to buy only if the price falls to ₹495 or lower. Which order fits best?", o: ["Market order", "Limit order at ₹495", "Intraday order", "Stop-loss market order"], a: 1, e: "A limit order sets your maximum price. It may not fill if the price never reaches ₹495." }
  ]
 },
 "investing": {
  faq: [
   { q: "When is the right time to start investing?", a: "As soon as you have an emergency fund and a clear goal. Time in the market usually matters more than trying to pick the perfect entry point." },
   { q: "Should I invest a lump sum or in monthly amounts?", a: "Both can work. Monthly investing reduces the risk of investing everything just before a fall. A lump sum has more time to grow if markets rise steadily. Choose the method you can stick with." },
   { q: "How many stocks do I need to be diversified?", a: "There is no fixed number. Diversification comes from spreading across companies, sectors and asset types. Owning many stocks in the same sector is not very diversified." }
  ],
  quiz: [
   { q: "What does compounding mean?", o: ["Returns that stop growing after one year", "Returns that earn their own returns over time", "A fixed bank interest rate", "A type of tax"], a: 1, e: "Compounding means growth builds on past growth, so it accelerates over time." },
   { q: "Which best describes diversification?", o: ["Putting all money in one stock", "Spreading money across different investments", "Investing only in gold", "Trading daily"], a: 1, e: "Diversification reduces the damage from any single bad investment." },
   { q: "Why keep an emergency fund before investing for growth?", o: ["It guarantees higher returns", "So you do not have to sell investments at a bad time to cover a surprise expense", "It avoids all taxes", "It is required by SEBI for every investor"], a: 1, e: "An emergency fund stops you being forced to sell during a market fall." }
  ]
 },
 "sip-mutual-funds": {
  faq: [
   { q: "Can I stop or change my SIP at any time?", a: "Usually yes. You can pause, stop or change the amount through your fund platform or broker. Check any lock-in rules for specific schemes such as ELSS." },
   { q: "Does an SIP guarantee returns?", a: "No. An SIP is a method of investing. The value of the fund can go up or down, and returns are not guaranteed." },
   { q: "What is the difference between a direct and a regular plan?", a: "Both invest in the same portfolio. A direct plan has a lower expense ratio because it has no distributor commission, so more of the return stays with you." }
  ],
  quiz: [
   { q: "What does NAV represent?", o: ["The fund's total profit", "The value of one unit of the fund", "The fund's annual fee", "The minimum SIP amount"], a: 1, e: "NAV is the per-unit value, calculated once a day after the market closes." },
   { q: "A SIP of ₹4,000 buys units at a NAV of ₹80. How many units do you get?", o: ["40", "50", "320", "80"], a: 1, e: "4,000 ÷ 80 = 50 units." },
   { q: "Which cost reduces your return the most over time, all else equal?", o: ["A low expense ratio", "A high expense ratio", "The number of SIP installments", "The fund's name"], a: 1, e: "A higher expense ratio is a higher yearly fee, which lowers the net return." }
  ]
 },
 "reading-charts": {
  faq: [
   { q: "Which timeframe should a beginner use?", a: "Daily charts are a good start because each candle covers a full session and shows the trend clearly. Weekly charts help you see the bigger trend. Avoid very short timeframes until you understand the basics." },
   { q: "Why are some candles green and some red?", a: "Green (or white) means the close was above the open. Red (or black) means the close was below the open. The colour only shows direction within that period." },
   { q: "Are line charts useless?", a: "No. A line chart is the simplest view of the closing prices and is good for seeing the overall trend. Candlesticks add the open, high and low, which show more detail." }
  ],
  quiz: [
   { q: "A candle opens at 100 and closes at 106. What colour is it?", o: ["Red", "Green", "Grey", "There is no colour"], a: 1, e: "The close (106) is above the open (100), so the candle is green." },
   { q: "What does the body of a candle show?", o: ["The high and low", "The range between open and close", "The volume", "The next day's price"], a: 1, e: "The body spans the open and close. The wicks show the high and low." },
   { q: "Why does volume matter when you read a price move?", o: ["It shows whether the move has participation behind it", "It sets the stop-loss automatically", "It shows the company's profit", "It replaces the chart"], a: 0, e: "A move on high volume usually has more support than the same move on low volume." }
  ]
 },
 "candlestick-patterns": {
  faq: [
   { q: "Do candlestick patterns work every time?", a: "No. A pattern shows a likely outcome, not a certain one. Its reliability improves with the right context: a clear prior trend, a key level like support or resistance, and confirmation from the next candle and volume." },
   { q: "Which pattern is the most reliable?", a: "No single pattern is reliable on its own. Engulfing and morning or evening star patterns at key levels are commonly watched, but all need confirmation and a stop-loss." },
   { q: "Can I trade on a pattern alone?", a: "It is risky to do so. Use the pattern as one input. Check the trend, the level, the volume, and your risk per trade before acting." }
  ],
  quiz: [
   { q: "A hammer is most meaningful when it appears:", o: ["In the middle of a sideways range", "After a clear downtrend, at support", "After a strong uptrend, at resistance", "Only on expiry day"], a: 1, e: "A hammer is a bullish reversal signal when it follows a fall, and it needs confirmation." },
   { q: "What does a doji signal?", o: ["Certain reversal", "Indecision between buyers and sellers", "A stop-loss hit", "Strong bullish momentum"], a: 1, e: "A doji has open and close nearly equal, showing balance. It signals a possible pause." },
   { q: "Which is the best way to confirm a bullish reversal pattern?", o: ["Buy immediately on the pattern candle", "Wait for the next candle to close higher, ideally on rising volume", "Sell because the pattern is bullish", "Ignore volume"], a: 1, e: "Confirmation from the next candle and volume reduces false signals." }
  ]
 },
 "fundamental-analysis": {
  faq: [
   { q: "Is a high P/E ratio always bad?", a: "No. A high P/E can reflect strong expected growth. Compare the P/E with companies in the same industry and with the company's own history, and check whether the growth is real." },
   { q: "Where do I find a company's financial statements?", a: "In the company's annual report and quarterly results, which are filed with the exchanges. They are public on the NSE and BSE websites." },
   { q: "How often should I review a company I own?", a: "Review it when new results or annual reports come out, and when something changes in the business. Daily price moves are not a reason to re-analyse the business." }
  ],
  quiz: [
   { q: "If a stock trades at ₹450 and EPS is ₹30, what is the P/E?", o: ["13.5", "15", "30", "450"], a: 1, e: "P/E = price ÷ EPS = 450 ÷ 30 = 15." },
   { q: "What does ROE measure?", o: ["How much the company pays in tax", "How well the company uses shareholders' equity to earn profit", "The share price change", "The company's total debt"], a: 1, e: "ROE = net profit ÷ shareholders' equity." },
   { q: "Receivables are growing much faster than sales. What is the concern?", o: ["Customers may be slow to pay, or revenue may be overstated", "The company is definitely growing", "Nothing, this is normal", "The stock must rise"], a: 0, e: "A gap between sales and cash collection can be a warning sign. Investigate before investing." }
  ]
 },
 "technical-analysis": {
  faq: [
   { q: "Is technical analysis a science?", a: "It is a method for reading price and volume behaviour. It works best as a way to manage probabilities and timing, not as a guarantee of what happens next." },
   { q: "Which indicators should a beginner start with?", a: "Start with one trend tool (a moving average), one momentum tool (RSI), and volume. Learn how each behaves before adding more." },
   { q: "Do I need to use every indicator?", a: "No. Many indicators measure the same thing. Two or three that cover different aspects are more useful than ten that agree with each other." }
  ],
  quiz: [
   { q: "What is an uptrend?", o: ["Lower highs and lower lows", "Higher highs and higher lows", "Flat prices with no movement", "Falling volume"], a: 1, e: "An uptrend makes higher highs and higher lows." },
   { q: "RSI is above 70. What does this usually signal?", o: ["Oversold", "Overbought, which can precede a pullback", "A guaranteed sell", "No meaning"], a: 1, e: "Above 70 is overbought. Strong trends can stay there for a long time." },
   { q: "A short moving average crosses above a longer one. What is it called?", o: ["Death cross", "Golden cross", "Gap", "Doji"], a: 1, e: "A short average crossing above a long one is a bullish crossover, often called a golden cross on the 50 and 200." }
  ]
 },
 "technical-indicators": {
  faq: [
   { q: "How many indicators should I use?", a: "Two or three that measure different things. Adding more often repeats the same information and makes decisions harder." },
   { q: "Why do two indicators give different signals?", a: "They measure different things and use different lengths. A trend tool may still say up while a momentum tool shows overbought. Use the disagreement as information, not as a reason to ignore one of them." },
   { q: "Can indicators predict the price?", a: "No. They are calculated from past data. They help you understand the current state and manage risk, but they do not predict with certainty." }
  ],
  quiz: [
   { q: "Which indicator measures trend strength but not direction?", o: ["RSI", "ADX", "MACD", "Volume"], a: 1, e: "ADX shows how strong a trend is. The +DI and -DI lines show direction." },
   { q: "What is the main use of ATR?", o: ["Predicting direction", "Measuring volatility to set stop distance and position size", "Calculating dividends", "Tracking fund fees"], a: 1, e: "ATR measures typical daily movement, so it helps size stops and positions." },
   { q: "Which indicator confirms a breakout best?", o: ["Volume above its average", "Bollinger Bands alone", "A single candle", "Expiry date"], a: 0, e: "A breakout on above-average volume usually has more participation behind it." }
  ]
 },
 "swing-trading": {
  faq: [
   { q: "How long should I hold a swing trade?", a: "Typically a few days to a few weeks, based on the setup. Decide the maximum holding period before you enter, and exit if the trade does not move within that time." },
   { q: "What if the price gaps against my stop overnight?", a: "The exit can happen well below your stop, so the loss can be larger than planned. Reduce position size on trades you hold overnight, and accept that gap risk exists." },
   { q: "How much capital do I need to start?", a: "Enough that a 1% risk per trade gives a position you can handle. Very small capital makes it hard to manage costs and stop distances sensibly." }
  ],
  quiz: [
   { q: "Entry ₹400, stop ₹388, target ₹424. What is the reward-to-risk ratio?", o: ["1:1", "2:1", "3:1", "1:2"], a: 1, e: "Risk ₹12, reward ₹24, so the ratio is 2:1." },
   { q: "With ₹1,00,000 capital and 1% risk, entry ₹400 and stop ₹388, how many shares?", o: ["100", "83", "250", "8"], a: 1, e: "Risk ₹1,000 ÷ ₹12 per share = 83 shares (rounded down)." },
   { q: "What is the main reason to hold a swing trade overnight carefully?", o: ["Interest is paid on shares", "Gaps can open the price beyond your stop", "Brokers charge nothing overnight", "Volume always falls"], a: 1, e: "Overnight news can gap the price past your stop, increasing the loss." }
  ]
 },
 "risk-management": {
  faq: [
   { q: "What percentage of capital should I risk per trade?", a: "Many traders use 0.5% to 2%. The right number depends on your capital, experience and how many losses in a row you can handle emotionally and financially." },
   { q: "How do I set a stop-loss?", a: "Place it at a level where your trade idea is proven wrong, such as below support or a swing low, and size the position so that the loss at that stop equals your planned risk. ATR can help set the distance." },
   { q: "What is a good risk-reward ratio?", a: "A ratio of 1:2 or better is commonly used, because the strategy can still be profitable with a win rate below 50%. The ratio alone does not make a trade good; the win rate and costs matter too." }
  ],
  quiz: [
   { q: "Your capital fell 25%. What gain do you need to get back?", o: ["25%", "33.3%", "50%", "75%"], a: 1, e: "1 ÷ 0.75 − 1 = 33.3%." },
   { q: "Capital ₹2,00,000, risk 2%, stop distance ₹10. How many shares?", o: ["200", "400", "2,000", "20"], a: 1, e: "Risk ₹4,000 ÷ ₹10 = 400 shares." },
   { q: "Why can three different stocks still be a single risk?", o: ["They are always listed on the same exchange", "If they move together, one event hits all of them", "They have the same name", "Brokers charge them together"], a: 1, e: "High correlation means the positions behave like one large position." }
  ]
 },
 "intraday-trading": {
  faq: [
   { q: "Can I make a living from intraday trading?", a: "Very few people do so consistently. Studies, including SEBI's analysis of F&O traders, have found that most individual traders lose money. Treat intraday as a skill to test with small capital, not as income to rely on." },
   { q: "Do I need leverage to trade intraday?", a: "No. Leverage makes losses larger as well as gains. Without it you need more capital for the same position, but risk is easier to control. Avoid leverage until you have a tested plan." },
   { q: "What happens if I do not close an intraday position in time?", a: "Your broker may square it off automatically at the cut-off time, often at a worse price and with extra charges. Know your broker's square-off time and plan exits before it." }
  ],
  quiz: [
   { q: "What is the main cost that reduces a small intraday gain?", o: ["Interest on savings", "Brokerage and other charges", "The stock's name", "Dividends"], a: 1, e: "Brokerage, exchange charges, STT, GST and stamp duty reduce net profit." },
   { q: "You plan to enter at ₹500 and fill at ₹500.80 on 100 shares. What is the extra cost?", o: ["₹0.80", "₹8", "₹80", "₹800"], a: 2, e: "₹0.80 × 100 shares = ₹80. This is slippage." },
   { q: "Why avoid market orders in thinly traded stocks?", o: ["They cost more brokerage", "They can fill far from the displayed price because there are few buyers or sellers", "They are illegal", "They never fill"], a: 1, e: "Thin liquidity means large slippage." }
  ]
 },
 "futures-options": {
  faq: [
   { q: "What is a lot size?", a: "The fixed number of units in one contract. You trade in whole lots, so a small view may need a larger position than you expect. Check the current lot size before placing an order." },
   { q: "Can an option buyer lose more than the premium?", a: "No. The buyer's maximum loss is the premium paid. The seller of an uncovered option can face much larger losses, including losses that grow as the price moves further." },
   { q: "What happens at expiry?", a: "In-the-money options are settled based on the difference from the strike. Out-of-the-money options expire worthless. Check how your broker handles assignment and exercise before expiry." }
  ],
  quiz: [
   { q: "A call with strike ₹100 is bought for ₹5 premium. At expiry the stock is ₹120. What is the profit per unit before costs?", o: ["₹5", "₹15", "₹20", "₹25"], a: 1, e: "Intrinsic value ₹20 minus premium ₹5 = ₹15." },
   { q: "What is the maximum loss for an option buyer?", o: ["Unlimited", "The premium paid", "The strike price", "Twice the premium"], a: 1, e: "The buyer's loss is limited to the premium." },
   { q: "What is the main risk for a futures buyer?", o: ["Losses can exceed the margin if the price moves sharply against the position", "Futures have no risk", "Only the broker loses", "Expiry always gives a profit"], a: 0, e: "Futures are leveraged, so losses can be larger than the margin deposited." }
  ]
 },
 "option-greeks": {
  faq: [
   { q: "Which Greek matters most?", a: "It depends on the trade. Delta matters for direction, theta for time decay, and vega for volatility. Beginners should understand delta and theta first." },
   { q: "Why did my option lose value even though the stock rose?", a: "Time decay (theta) or a fall in implied volatility (vega) can outweigh a small rise in the stock. This often happens after results or events when volatility drops." },
   { q: "Is time decay good for option buyers?", a: "No. Theta works against buyers because the option loses time value each day. It works for sellers, who collect that decay but take on larger risk." }
  ],
  quiz: [
   { q: "A call has delta 0.4. The underlying rises ₹50. Approximately how much does the option gain per unit?", o: ["₹4", "₹20", "₹50", "₹0"], a: 1, e: "0.4 × 50 = ₹20." },
   { q: "What does theta measure?", o: ["Price sensitivity to the underlying", "Time decay", "Volatility sensitivity", "Dividend yield"], a: 1, e: "Theta is the daily loss of time value, which works against buyers." },
   { q: "A bull call spread buys a 100 call for 8 and sells a 110 call for 3. What is the maximum profit per unit?", o: ["₹3", "₹5", "₹8", "₹10"], a: 1, e: "Net debit 5. Maximum profit = 10 − 5 = ₹5." }
  ]
 },
 "trading-psychology": {
  faq: [
   { q: "How do I stop revenge trading after a loss?", a: "Write a rule before the session, such as stopping after two losses or after a set daily loss. Step away from the screen after a loss and review the trade later, not immediately." },
   { q: "How do I know if I am overtrading?", a: "If you take trades that are not in your plan, trade more after losses, or your costs are a large part of your profit, you are probably overtrading. Set a maximum number of trades per day." },
   { q: "Should I keep a trading journal?", a: "Yes. Record the reason, the setup, the size, the result and whether you followed the plan. Patterns in your mistakes become visible only when you write them down." }
  ],
  quiz: [
   { q: "You planned a 10% stop but held and lost 30%. Which bias is most likely at work?", o: ["Diversification", "Loss aversion", "Compounding", "Liquidity"], a: 1, e: "Loss aversion makes people hold losers too long." },
   { q: "You place 20 trades a day at ₹100 charges each, for 20 trading days. What is the total cost?", o: ["₹2,000", "₹20,000", "₹40,000", "₹4,000"], a: 2, e: "20 × 100 × 20 = ₹40,000." },
   { q: "A trade followed your plan but lost money. What is the best judgement?", o: ["The decision was wrong", "The process may have been good, since outcomes vary", "You should double the size", "Never trade again"], a: 1, e: "Judge decisions by the process. A good process can still lose on one trade." }
  ]
 }
},
hi: {
 "foundations": {
  faq: [
   { q: "क्या मैं ₹500 जैसी छोटी रकम से शुरू कर सकता हूँ?", a: "हाँ, अगर आप कम से कम एक शेयर ख़रीद सकते हों। डिलीवरी ख़रीद के लिए शेयर की कीमत ही न्यूनतम ज़रूरत है, साथ में खर्च। उतनी रकम से शुरू करें जितना खोने की क्षमता हो।" },
   { q: "क्या शेयर में निवेश से मेरा सारा पैसा डूब सकता है?", a: "हाँ, नुकसान हो सकता है, सबसे बुरी स्थिति में एक ही होल्डिंग का पूरा पैसा भी। कई कंपनियों और सेक्टरों में पैसा बाँटने से, और जो पैसा जल्द चाहिए उसे कभी शेयर में न लगाने से, यह जोखिम घटता है। कोई भी रिटर्न की गारंटी नहीं दे सकता।" },
   { q: "शेयर ख़रीदने के दिन वह मेरे डीमैट खाते में क्यों नहीं दिखते?", a: "इक्विटी ट्रेड T+1 पर सेटल होते हैं, यानी ट्रेड के एक ट्रेडिंग दिन बाद। शेयर सेटलमेंट के दिन क्रेडिट होते हैं, ट्रेड के दिन नहीं। अगर तब तक नहीं दिखते तो ब्रोकर से सेटलमेंट स्थिति पूछें।" }
  ],
  quiz: [
   { q: "डीमैट खाते का मुख्य काम क्या है?", o: ["ख़रीद-बिक्री के ऑर्डर देना", "शेयर इलेक्ट्रॉनिक रूप में रखना", "लाभ पर टैक्स चुकाना", "रिटर्न की गारंटी देना"], a: 1, e: "डीमैट खाता शेयर इलेक्ट्रॉनिक रूप में रखता है। ऑर्डर ट्रेडिंग खाते से दिए जाते हैं।" },
   { q: "आपने सोमवार को शेयर ख़रीदे। वे आमतौर पर कब डीमैट खाते में आते हैं?", o: ["सोमवार को, उसी दिन", "मंगलवार (T+1) को", "एक महीने बाद", "केवल बेचने पर"], a: 1, e: "इक्विटी ट्रेड अगले ट्रेडिंग दिन T+1 पर सेटल होते हैं।" },
   { q: "आप केवल ₹495 या उससे कम पर ख़रीदना चाहते हैं। कौन सा ऑर्डर सही है?", o: ["मार्केट ऑर्डर", "₹495 पर लिमिट ऑर्डर", "इंट्राडे ऑर्डर", "स्टॉप-लॉस मार्केट ऑर्डर"], a: 1, e: "लिमिट ऑर्डर आपकी अधिकतम कीमत तय करता है। कीमत ₹495 तक न पहुँचे तो ऑर्डर पूरा नहीं होगा।" }
  ]
 },
 "investing": {
  faq: [
   { q: "निवेश शुरू करने का सही समय कब है?", a: "जैसे ही आपके पास इमरजेंसी फ़ंड और साफ़ लक्ष्य हो। आमतौर पर बाज़ार में बने रहने का समय, सही एंट्री पॉइंट खोजने से ज़्यादा मायने रखता है।" },
   { q: "एकमुश्त रकम लगाएँ या मासिक किश्तों में?", a: "दोनों तरीके काम कर सकते हैं। मासिक निवेश से गिरावट से ठीक पहले सब कुछ लगाने का जोखिम घटता है। एकमुश्त रकम को बाज़ार स्थिर बढ़े तो ज़्यादा समय मिलता है। वह तरीका चुनें जिस पर आप टिके रह सकें।" },
   { q: "विविधीकरण के लिए कितने शेयर चाहिए?", a: "कोई तय संख्या नहीं है। विविधीकरण कंपनियों, सेक्टरों और एसेट प्रकारों में बाँटने से आता है। एक ही सेक्टर के कई शेयर रखना बहुत विविध नहीं होता।" }
  ],
  quiz: [
   { q: "कंपाउंडिंग का क्या मतलब है?", o: ["एक साल बाद बढ़ना बंद होने वाला रिटर्न", "समय के साथ रिटर्न का अपना भी रिटर्न कमाना", "बैंक की तय ब्याज दर", "एक प्रकार का टैक्स"], a: 1, e: "कंपाउंडिंग में वृद्धि पिछली वृद्धि पर बनती है, इसलिए समय के साथ तेज़ होती है।" },
   { q: "विविधीकरण का सबसे सही वर्णन कौन सा है?", o: ["सारा पैसा एक शेयर में", "पैसा अलग-अलग निवेशों में बाँटना", "केवल सोने में निवेश", "रोज़ ट्रेडिंग"], a: 1, e: "विविधीकरण किसी एक ख़राब निवेश का असर घटाता है।" },
   { q: "ग्रोथ के लिए निवेश से पहले इमरजेंसी फ़ंड क्यों रखें?", o: ["इससे ऊँचा रिटर्न गारंटीड होता है", "ताकि अचानक खर्च के लिए बुरे समय पर निवेश न बेचना पड़े", "इससे सभी टैक्स माफ़ होते हैं", "SEBI हर निवेशक के लिए यह ज़रूरी करता है"], a: 1, e: "इमरजेंसी फ़ंड बाज़ार गिरने पर मजबूरी में बिक्री से बचाता है।" }
  ]
 },
 "sip-mutual-funds": {
  faq: [
   { q: "क्या मैं SIP कभी भी रोक या बदल सकता हूँ?", a: "आमतौर पर हाँ। आप फंड प्लेटफ़ॉर्म या ब्रोकर के ज़रिए SIP रोक, बंद या राशि बदल सकते हैं। ELSS जैसी योजनाओं के लॉक-इन नियम अलग से जाँचें।" },
   { q: "क्या SIP रिटर्न की गारंटी देता है?", a: "नहीं। SIP निवेश का एक तरीका है। फंड की वैल्यू ऊपर-नीचे हो सकती है और रिटर्न गारंटीड नहीं है।" },
   { q: "डायरेक्ट और रेगुलर प्लान में क्या फ़र्क है?", a: "दोनों एक ही पोर्टफ़ोलियो में निवेश करते हैं। डायरेक्ट प्लान में वितरक का कमीशन नहीं होता, इसलिए एक्सपेंस रेशियो कम होता है और ज़्यादा रिटर्न आपके पास रहता है।" }
  ],
  quiz: [
   { q: "NAV क्या दर्शाता है?", o: ["फंड का कुल मुनाफ़ा", "फंड की एक यूनिट की वैल्यू", "फंड का सालाना शुल्क", "न्यूनतम SIP राशि"], a: 1, e: "NAV प्रति यूनिट वैल्यू है, जो बाज़ार बंद होने के बाद रोज़ एक बार तय होती है।" },
   { q: "₹4,000 की SIP ₹80 NAV पर कितनी यूनिट देगी?", o: ["40", "50", "320", "80"], a: 1, e: "4,000 ÷ 80 = 50 यूनिट।" },
   { q: "बाक़ी बातें समान हों तो समय के साथ कौन सा खर्च रिटर्न सबसे ज़्यादा घटाता है?", o: ["कम एक्सपेंस रेशियो", "ऊँचा एक्सपेंस रेशियो", "SIP की किश्तों की संख्या", "फंड का नाम"], a: 1, e: "ऊँचा एक्सपेंस रेशियो ज़्यादा सालाना शुल्क है, जो शुद्ध रिटर्न घटाता है।" }
  ]
 },
 "reading-charts": {
  faq: [
   { q: "शुरुआती को कौन सी समय-सीमा उपयोग करनी चाहिए?", a: "डेली चार्ट अच्छी शुरुआत है, क्योंकि हर कैंडल पूरा सत्र दिखाती है और ट्रेंड साफ़ दिखता है। वीकली चार्ट बड़ा ट्रेंड देखने में मदद करता है। बुनियादी बातें समझने तक बहुत छोटी समय-सीमा से बचें।" },
   { q: "कुछ कैंडल हरी और कुछ लाल क्यों होती हैं?", a: "हरी (या सफ़ेद) का मतलब है क्लोज़ ओपन से ऊपर। लाल (या काली) का मतलब है क्लोज़ ओपन से नीचे। रंग उस अवधि के भीतर केवल दिशा दिखाता है।" },
   { q: "क्या लाइन चार्ट बेकार हैं?", a: "नहीं। लाइन चार्ट क्लोज़िंग कीमतों का सबसे सरल दृश्य है और समग्र ट्रेंड देखने के लिए अच्छा है। कैंडलस्टिक ओपन, हाई और लो जोड़ते हैं, जो ज़्यादा विवरण दिखाते हैं।" }
  ],
  quiz: [
   { q: "एक कैंडल 100 पर खुली और 106 पर बंद हुई। उसका रंग क्या है?", o: ["लाल", "हरा", "धूसर", "कोई रंग नहीं"], a: 1, e: "क्लोज़ (106) ओपन (100) से ऊपर है, इसलिए कैंडल हरी है।" },
   { q: "कैंडल की बॉडी क्या दिखाती है?", o: ["हाई और लो", "ओपन और क्लोज़ के बीच का अंतर", "वॉल्यूम", "अगले दिन की कीमत"], a: 1, e: "बॉडी ओपन और क्लोज़ के बीच फैली होती है। विक हाई और लो दिखाती हैं।" },
   { q: "कीमत की चाल पढ़ते समय वॉल्यूम क्यों मायने रखता है?", o: ["यह दिखाता है कि चाल के पीछे भागीदारी है या नहीं", "यह अपने आप स्टॉप-लॉस तय करता है", "यह कंपनी का मुनाफ़ा दिखाता है", "यह चार्ट की जगह लेता है"], a: 0, e: "ज़्यादा वॉल्यूम वाली चाल के पीछे आमतौर पर कम वॉल्यूम वाली उसी चाल से ज़्यादा समर्थन होता है।" }
  ]
 },
 "candlestick-patterns": {
  faq: [
   { q: "क्या कैंडलस्टिक पैटर्न हर बार काम करते हैं?", a: "नहीं। पैटर्न एक संभावित नतीजा दिखाता है, निश्चित नहीं। सही संदर्भ से भरोसा बढ़ता है: साफ़ पिछला ट्रेंड, सपोर्ट या रेज़िस्टेंस जैसा मुख्य स्तर, और अगली कैंडल व वॉल्यूम की पुष्टि।" },
   { q: "सबसे भरोसेमंद पैटर्न कौन सा है?", a: "कोई एक पैटर्न अकेले भरोसेमंद नहीं है। मुख्य स्तरों पर एंगल्फ़िंग और मॉर्निंग या ईवनिंग स्टार आम तौर पर देखे जाते हैं, पर सभी को पुष्टि और स्टॉप-लॉस चाहिए।" },
   { q: "क्या मैं केवल पैटर्न पर ट्रेड कर सकता हूँ?", a: "ऐसा करना जोखिम भरा है। पैटर्न को एक इनपुट मानें। कार्रवाई से पहले ट्रेंड, स्तर, वॉल्यूम और प्रति ट्रेड जोखिम जाँचें।" }
  ],
  quiz: [
   { q: "हैमर सबसे ज़्यादा अर्थपूर्ण तब होता है जब वह:", o: ["साइडवे रेंज के बीच में बने", "साफ़ गिरावट के बाद, सपोर्ट पर बने", "मज़बूत तेज़ी के बाद, रेज़िस्टेंस पर बने", "केवल एक्सपायरी के दिन बने"], a: 1, e: "गिरावट के बाद बना हैमर बुलिश पलटाव का संकेत है, और उसे पुष्टि चाहिए।" },
   { q: "डोजी क्या संकेत देता है?", o: ["निश्चित पलटाव", "ख़रीदारों और विक्रेताओं के बीच अनिश्चितता", "स्टॉप-लॉस लगना", "मज़बूत बुलिश मोमेंटम"], a: 1, e: "डोजी में ओपन और क्लोज़ लगभग बराबर होते हैं, जो संतुलन दिखाता है और संभावित विराम का संकेत है।" },
   { q: "बुलिश पलटाव पैटर्न की पुष्टि का सबसे अच्छा तरीका क्या है?", o: ["पैटर्न कैंडल पर तुरंत ख़रीदना", "अगली कैंडल ऊपर बंद होने का इंतज़ार, आदर्श रूप से बढ़ते वॉल्यूम के साथ", "पैटर्न तेज़ी वाला है इसलिए बेचना", "वॉल्यूम को अनदेखा करना"], a: 1, e: "अगली कैंडल और वॉल्यूम की पुष्टि ग़लत संकेतों को घटाती है।" }
  ]
 },
 "fundamental-analysis": {
  faq: [
   { q: "क्या ऊँचा P/E हमेशा बुरा होता है?", a: "नहीं। ऊँचा P/E मज़बूत अपेक्षित ग्रोथ दर्शा सकता है। P/E की तुलना उसी उद्योग की कंपनियों और कंपनी के अपने इतिहास से करें, और जाँचें कि ग्रोथ असली है या नहीं।" },
   { q: "कंपनी के वित्तीय विवरण कहाँ मिलते हैं?", a: "कंपनी की सालाना रिपोर्ट और तिमाही नतीजों में, जो एक्सचेंज पर दाखिल होते हैं। ये NSE और BSE की वेबसाइट पर सार्वजनिक होते हैं।" },
   { q: "जिस कंपनी में मेरा निवेश है, उसकी समीक्षा कितनी बार करनी चाहिए?", a: "जब नए नतीजे या सालाना रिपोर्ट आएँ, और जब कारोबार में कुछ बदले तब समीक्षा करें। रोज़ की कीमत की चाल कारोबार दोबारा जाँचने का कारण नहीं है।" }
  ],
  quiz: [
   { q: "अगर शेयर ₹450 पर है और EPS ₹30 है, तो P/E क्या है?", o: ["13.5", "15", "30", "450"], a: 1, e: "P/E = कीमत ÷ EPS = 450 ÷ 30 = 15।" },
   { q: "ROE क्या मापता है?", o: ["कंपनी कितना टैक्स देती है", "कंपनी शेयरधारक इक्विटी से कितना मुनाफ़ा कमाती है", "शेयर कीमत में बदलाव", "कंपनी का कुल कर्ज़"], a: 1, e: "ROE = शुद्ध मुनाफ़ा ÷ शेयरधारक इक्विटी।" },
   { q: "रिसीवेबल्स बिक्री से कहीं तेज़ बढ़ रहे हैं। चिंता की बात क्या है?", o: ["ग्राहक देर से भुगतान कर सकते हैं, या राजस्व बढ़ा-चढ़ाकर दिखाया गया हो सकता है", "कंपनी निश्चित रूप से बढ़ रही है", "कुछ नहीं, यह सामान्य है", "शेयर ज़रूर ऊपर जाएगा"], a: 0, e: "बिक्री और नकद वसूली के बीच का अंतर चेतावनी हो सकता है। निवेश से पहले जाँच करें।" }
  ]
 },
 "technical-analysis": {
  faq: [
   { q: "क्या टेक्निकल एनालिसिस विज्ञान है?", a: "यह कीमत और वॉल्यूम के व्यवहार को पढ़ने का तरीका है। यह संभावनाएँ और समय तय करने में सबसे अच्छा काम करता है, आगे क्या होगा इसकी गारंटी के रूप में नहीं।" },
   { q: "शुरुआती को कौन से इंडिकेटर से शुरू करना चाहिए?", a: "एक ट्रेंड टूल (मूविंग एवरेज), एक मोमेंटम टूल (RSI) और वॉल्यूम से शुरू करें। और जोड़ने से पहले हर एक का व्यवहार समझें।" },
   { q: "क्या मुझे हर इंडिकेटर इस्तेमाल करना ज़रूरी है?", a: "नहीं। कई इंडिकेटर एक ही बात मापते हैं। अलग-अलग पहलू वाले दो-तीन, एक-दूसरे से सहमत दस इंडिकेटर से ज़्यादा उपयोगी हैं।" }
  ],
  quiz: [
   { q: "अपट्रेंड क्या है?", o: ["नीचे के हाई और नीचे के लो", "ऊँचे हाई और ऊँचे लो", "बिना हलचल के सपाट कीमत", "गिरता वॉल्यूम"], a: 1, e: "अपट्रेंड में ऊँचे हाई और ऊँचे लो बनते हैं।" },
   { q: "RSI 70 से ऊपर है। आमतौर पर इसका क्या संकेत है?", o: ["ओवरसोल्ड", "ओवरबॉट, जो पुलबैक से पहले हो सकता है", "निश्चित बिक्री", "कोई अर्थ नहीं"], a: 1, e: "70 से ऊपर ओवरबॉट है। मज़बूत ट्रेंड वहाँ लंबे समय तक रह सकते हैं।" },
   { q: "एक छोटा मूविंग एवरेज लंबे को ऊपर पार करता है। इसे क्या कहते हैं?", o: ["डेथ क्रॉस", "गोल्डन क्रॉस", "गैप", "डोजी"], a: 1, e: "छोटे एवरेज का लंबे को ऊपर पार करना बुलिश क्रॉसओवर है, जिसे 50 और 200 पर गोल्डन क्रॉस कहते हैं।" }
  ]
 },
 "technical-indicators": {
  faq: [
   { q: "मुझे कितने इंडिकेटर इस्तेमाल करने चाहिए?", a: "दो या तीन जो अलग चीज़ें मापें। और जोड़ने से अक्सर एक ही जानकारी दोहराई जाती है और फ़ैसला कठिन होता है।" },
   { q: "दो इंडिकेटर अलग संकेत क्यों देते हैं?", a: "वे अलग चीज़ें मापते हैं और अलग अवधियाँ इस्तेमाल करते हैं। ट्रेंड टूल अभी भी ऊपर कह सकता है जबकि मोमेंटम टूल ओवरबॉट दिखाए। इस असहमति को जानकारी मानें, किसी एक को नज़रअंदाज़ करने का कारण नहीं।" },
   { q: "क्या इंडिकेटर कीमत की भविष्यवाणी कर सकते हैं?", a: "नहीं। ये पिछले डेटा से बनते हैं। ये मौजूदा स्थिति समझने और जोखिम संभालने में मदद करते हैं, पर निश्चितता से भविष्यवाणी नहीं करते।" }
  ],
  quiz: [
   { q: "कौन सा इंडिकेटर ट्रेंड की ताकत मापता है, दिशा नहीं?", o: ["RSI", "ADX", "MACD", "वॉल्यूम"], a: 1, e: "ADX ट्रेंड की ताकत दिखाता है। +DI और -DI रेखाएँ दिशा दिखाती हैं।" },
   { q: "ATR का मुख्य उपयोग क्या है?", o: ["दिशा की भविष्यवाणी", "अस्थिरता मापकर स्टॉप की दूरी और पोज़िशन साइज़ तय करना", "डिविडेंड की गणना", "फंड फ़ीस ट्रैक करना"], a: 1, e: "ATR सामान्य दैनिक चाल मापता है, इसलिए स्टॉप और पोज़िशन तय करने में मदद करता है।" },
   { q: "ब्रेकआउट की पुष्टि के लिए कौन सा इंडिकेटर सबसे उपयोगी है?", o: ["औसत से ज़्यादा वॉल्यूम", "केवल बोलिंगर बैंड", "एक अकेली कैंडल", "एक्सपायरी तारीख"], a: 0, e: "औसत से ज़्यादा वॉल्यूम पर ब्रेकआउट के पीछे आमतौर पर ज़्यादा भागीदारी होती है।" }
  ]
 },
 "swing-trading": {
  faq: [
   { q: "स्विंग ट्रेड कितने समय तक रखना चाहिए?", a: "आमतौर पर सेटअप के अनुसार कुछ दिन से कुछ हफ़्ते। एंट्री से पहले अधिकतम होल्डिंग अवधि तय करें, और उस समय में ट्रेड न चले तो बाहर निकलें।" },
   { q: "अगर रात में कीमत मेरे स्टॉप से आगे गैप कर जाए तो?", a: "बाहर निकलना आपके स्टॉप से काफ़ी नीचे हो सकता है, इसलिए नुकसान योजना से बड़ा हो सकता है। रात भर रखे ट्रेड पर पोज़िशन छोटी रखें, और यह गैप जोखिम स्वीकार करें।" },
   { q: "शुरू करने के लिए कितनी पूँजी चाहिए?", a: "इतनी कि प्रति ट्रेड 1% जोखिम पर एक ऐसी पोज़िशन बने जिसे आप संभाल सकें। बहुत कम पूँजी में लागत और स्टॉप की दूरी ठीक से संभालना मुश्किल होता है।" }
  ],
  quiz: [
   { q: "एंट्री ₹400, स्टॉप ₹388, टारगेट ₹424। जोखिम-इनाम अनुपात क्या है?", o: ["1:1", "2:1", "3:1", "1:2"], a: 1, e: "जोखिम ₹12, इनाम ₹24, इसलिए अनुपात 2:1।" },
   { q: "₹1,00,000 पूँजी, 1% जोखिम, एंट्री ₹400 और स्टॉप ₹388। कितने शेयर?", o: ["100", "83", "250", "8"], a: 1, e: "जोखिम ₹1,000 ÷ प्रति शेयर ₹12 = 83 शेयर (नीचे पूर्णांक)।" },
   { q: "स्विंग ट्रेड को रात भर रखते समय सावधानी क्यों ज़रूरी है?", o: ["शेयर पर रात में ब्याज मिलता है", "गैप कीमत को आपके स्टॉप से आगे खोल सकता है", "रात में ब्रोकर कोई खर्च नहीं लेते", "वॉल्यूम हमेशा गिरता है"], a: 1, e: "रात की ख़बर कीमत को स्टॉप से आगे गैप करा सकती है, जिससे नुकसान बढ़ता है।" }
  ]
 },
 "risk-management": {
  faq: [
   { q: "प्रति ट्रेड कितना प्रतिशत पूँजी जोखिम में डालना चाहिए?", a: "कई ट्रेडर 0.5% से 2% उपयोग करते हैं। सही संख्या आपकी पूँजी, अनुभव और लगातार नुकसान को भावनात्मक व आर्थिक रूप से झेल पाने की क्षमता पर निर्भर करती है।" },
   { q: "स्टॉप-लॉस कैसे लगाएँ?", a: "उस स्तर पर जहाँ आपका ट्रेड विचार ग़लत साबित हो, जैसे सपोर्ट या पिछले स्विंग लो के नीचे, और पोज़िशन का आकार ऐसा रखें कि उस स्टॉप पर नुकसान आपके तय जोखिम के बराबर हो। ATR दूरी तय करने में मदद कर सकता है।" },
   { q: "अच्छा जोखिम-इनाम अनुपात क्या है?", a: "1:2 या उससे बेहतर आमतौर पर इस्तेमाल होता है, क्योंकि 50% से कम जीत दर पर भी रणनीति लाभदायक हो सकती है। अकेला अनुपात ट्रेड को अच्छा नहीं बनाता; जीत दर और खर्च भी मायने रखते हैं।" }
  ],
  quiz: [
   { q: "आपकी पूँजी 25% गिर गई। वापस पहुँचने के लिए कितना लाभ चाहिए?", o: ["25%", "33.3%", "50%", "75%"], a: 1, e: "1 ÷ 0.75 − 1 = 33.3%।" },
   { q: "पूँजी ₹2,00,000, जोखिम 2%, स्टॉप दूरी ₹10। कितने शेयर?", o: ["200", "400", "2,000", "20"], a: 1, e: "जोखिम ₹4,000 ÷ ₹10 = 400 शेयर।" },
   { q: "तीन अलग शेयर भी एक ही जोखिम क्यों हो सकते हैं?", o: ["वे हमेशा एक ही एक्सचेंज पर लिस्टेड होते हैं", "अगर वे साथ चलते हैं, तो एक ही घटना सबको प्रभावित करती है", "उनका नाम एक जैसा है", "ब्रोकर उन्हें एक साथ चार्ज करते हैं"], a: 1, e: "उच्च सहसंबंध का मतलब है कि पोज़िशन एक बड़ी पोज़िशन की तरह व्यवहार करती हैं।" }
  ]
 },
 "intraday-trading": {
  faq: [
   { q: "क्या इंट्राडे ट्रेडिंग से गुज़ारा हो सकता है?", a: "बहुत कम लोग लगातार ऐसा कर पाते हैं। SEBI के F&O ट्रेडरों के विश्लेषण सहित अध्ययनों में पाया गया है कि अधिकांश व्यक्तिगत ट्रेडर पैसा गँवाते हैं। इंट्राडे को छोटी पूँजी से परखने वाला कौशल मानें, आय का भरोसा नहीं।" },
   { q: "क्या इंट्राडे के लिए लीवरेज चाहिए?", a: "नहीं। लीवरेज लाभ के साथ नुकसान भी बढ़ाता है। इसके बिना एक ही पोज़िशन के लिए ज़्यादा पूँजी चाहिए, पर जोखिम संभालना आसान होता है। परखी हुई योजना आने तक लीवरेज से बचें।" },
   { q: "अगर मैं इंट्राडे पोज़िशन समय पर बंद न करूँ तो?", a: "ब्रोकर तय समय पर उसे अपने आप बंद (स्क्वेयर ऑफ़) कर सकता है, अक्सर खराब कीमत पर और अतिरिक्त चार्ज के साथ। अपने ब्रोकर का स्क्वेयर-ऑफ़ समय जानें और पहले से एग्ज़िट की योजना बनाएँ।" }
  ],
  quiz: [
   { q: "छोटे इंट्राडे लाभ को सबसे ज़्यादा कौन सा खर्च घटाता है?", o: ["बचत खाते पर ब्याज", "ब्रोकरेज और अन्य चार्ज", "शेयर का नाम", "डिविडेंड"], a: 1, e: "ब्रोकरेज, एक्सचेंज चार्ज, STT, GST और स्टाम्प ड्यूटी शुद्ध लाभ घटाते हैं।" },
   { q: "आपने ₹500 पर एंट्री की योजना बनाई और 100 शेयर ₹500.80 पर भरे। अतिरिक्त खर्च क्या है?", o: ["₹0.80", "₹8", "₹80", "₹800"], a: 2, e: "₹0.80 × 100 शेयर = ₹80। इसे स्लिपेज कहते हैं।" },
   { q: "कम ट्रेड होने वाले शेयरों में मार्केट ऑर्डर से क्यों बचें?", o: ["इनकी ब्रोकरेज ज़्यादा होती है", "ख़रीदार-विक्रेता कम होने से वे दिखाई गई कीमत से बहुत दूर भर सकते हैं", "ये गैरकानूनी हैं", "ये कभी नहीं भरते"], a: 1, e: "कम लिक्विडिटी का मतलब बड़ा स्लिपेज है।" }
  ]
 },
 "futures-options": {
  faq: [
   { q: "लॉट साइज़ क्या है?", a: "एक कॉन्ट्रैक्ट में इकाइयों की तय संख्या। ट्रेड पूरे लॉट में होता है, इसलिए छोटी सोच के लिए भी आपको उम्मीद से बड़ी पोज़िशन चाहिए हो सकती है। ऑर्डर देने से पहले मौजूदा लॉट साइज़ जाँचें।" },
   { q: "क्या ऑप्शन ख़रीदार प्रीमियम से ज़्यादा खो सकता है?", a: "नहीं। ख़रीदार का अधिकतम नुकसान चुकाया गया प्रीमियम है। बिना हेजिंग वाले ऑप्शन विक्रेता को कहीं बड़ा नुकसान हो सकता है, जो कीमत आगे बढ़ने पर और बढ़ता जाता है।" },
   { q: "एक्सपायरी पर क्या होता है?", a: "इन-द-मनी ऑप्शन स्ट्राइक से अंतर के आधार पर सेटल होते हैं। आउट-ऑफ़-द-मनी ऑप्शन बेकार हो जाते हैं। एक्सपायरी से पहले अपने ब्रोकर का असाइनमेंट और एक्सरसाइज़ नियम जाँचें।" }
  ],
  quiz: [
   { q: "₹100 स्ट्राइक की कॉल ₹5 प्रीमियम पर ख़रीदी। एक्सपायरी पर शेयर ₹120 है। शुल्क से पहले प्रति यूनिट लाभ?", o: ["₹5", "₹15", "₹20", "₹25"], a: 1, e: "आंतरिक मूल्य ₹20 − प्रीमियम ₹5 = ₹15।" },
   { q: "ऑप्शन ख़रीदार का अधिकतम नुकसान क्या है?", o: ["असीमित", "चुकाया गया प्रीमियम", "स्ट्राइक प्राइस", "प्रीमियम का दोगुना"], a: 1, e: "ख़रीदार का नुकसान प्रीमियम तक सीमित है।" },
   { q: "फ्यूचर्स ख़रीदार के लिए मुख्य जोखिम क्या है?", o: ["कीमत तेज़ी से विपरीत जाए तो नुकसान जमा किए मार्जिन से ज़्यादा हो सकता है", "फ्यूचर्स में कोई जोखिम नहीं", "नुकसान केवल ब्रोकर का होता है", "एक्सपायरी हमेशा लाभ देती है"], a: 0, e: "फ्यूचर्स में लीवरेज होता है, इसलिए नुकसान जमा मार्जिन से बड़ा हो सकता है।" }
  ]
 },
 "option-greeks": {
  faq: [
   { q: "कौन सा ग्रीक सबसे ज़रूरी है?", a: "यह ट्रेड पर निर्भर करता है। दिशा के लिए डेल्टा, समय-क्षय के लिए थीटा, और अस्थिरता के लिए वेगा। शुरुआती को पहले डेल्टा और थीटा समझने चाहिए।" },
   { q: "स्टॉक चढ़ा फिर भी मेरे ऑप्शन की कीमत क्यों गिरी?", a: "समय-क्षय (थीटा) या इम्प्लाइड वोलैटिलिटी का गिरना (वेगा) स्टॉक की छोटी बढ़त से ज़्यादा असर डाल सकता है। यह अक्सर नतीजों या घटनाओं के बाद होता है, जब अस्थिरता गिरती है।" },
   { q: "क्या ऑप्शन ख़रीदारों के लिए समय-क्षय अच्छा है?", a: "नहीं। थीटा ख़रीदारों के ख़िलाफ़ काम करता है, क्योंकि ऑप्शन हर दिन समय मूल्य खोता है। यह विक्रेताओं के पक्ष में काम करता है, जो यह क्षय कमाते हैं पर बड़ा जोखिम उठाते हैं।" }
  ],
  quiz: [
   { q: "एक कॉल का डेल्टा 0.4 है। अंतर्निहित एसेट ₹50 चढ़ता है। प्रति यूनिट लगभग कितना लाभ?", o: ["₹4", "₹20", "₹50", "₹0"], a: 1, e: "0.4 × 50 = ₹20।" },
   { q: "थीटा क्या मापता है?", o: ["अंतर्निहित एसेट के प्रति कीमत संवेदनशीलता", "समय-क्षय", "अस्थिरता संवेदनशीलता", "डिविडेंड यील्ड"], a: 1, e: "थीटा समय मूल्य का रोज़ का नुकसान है, जो ख़रीदारों के ख़िलाफ़ जाता है।" },
   { q: "बुल कॉल स्प्रेड में 100 कॉल ₹8 पर ख़रीदी और 110 कॉल ₹3 पर बेची। प्रति यूनिट अधिकतम लाभ?", o: ["₹3", "₹5", "₹8", "₹10"], a: 1, e: "नेट डेबिट 5। अधिकतम लाभ = 10 − 5 = ₹5।" }
  ]
 },
 "trading-psychology": {
  faq: [
   { q: "नुकसान के बाद बदले वाला ट्रेड कैसे रोकूँ?", a: "सत्र से पहले नियम लिखें, जैसे दो नुकसान के बाद रुकना या एक तय दैनिक नुकसान पर रुकना। नुकसान के बाद स्क्रीन से दूर हटें और ट्रेड की समीक्षा तुरंत नहीं, बाद में करें।" },
   { q: "मुझे कैसे पता चले कि मैं ओवरट्रेडिंग कर रहा हूँ?", a: "अगर आप योजना से बाहर के ट्रेड लेते हैं, नुकसान के बाद ज़्यादा ट्रेड करते हैं, या खर्च आपके लाभ का बड़ा हिस्सा खा जाते हैं, तो शायद आप ओवरट्रेडिंग कर रहे हैं। रोज़ के अधिकतम ट्रेड तय करें।" },
   { q: "क्या मुझे ट्रेडिंग जर्नल रखना चाहिए?", a: "हाँ। कारण, सेटअप, साइज़, नतीजा और योजना का पालन, सब लिखें। गलतियों के पैटर्न तभी दिखते हैं जब वे लिखी जाएँ।" }
  ],
  quiz: [
   { q: "आपने 10% का स्टॉप तय किया, पर होल्ड करके 30% गँवा दिया। कौन सा पूर्वाग्रह काम कर रहा है?", o: ["विविधीकरण", "हानि से बचाव (loss aversion)", "कंपाउंडिंग", "लिक्विडिटी"], a: 1, e: "हानि से बचाव लोगों को घाटे वाले ट्रेड ज़्यादा देर रखवाता है।" },
   { q: "आप हर दिन 20 ट्रेड करते हैं, हर एक पर ₹100 चार्ज, 20 ट्रेडिंग दिन। कुल खर्च?", o: ["₹2,000", "₹20,000", "₹40,000", "₹4,000"], a: 2, e: "20 × 100 × 20 = ₹40,000।" },
   { q: "एक ट्रेड योजना के अनुसार था पर पैसा डूबा। सबसे अच्छा आकलन क्या है?", o: ["फ़ैसला ग़लत था", "प्रक्रिया अच्छी हो सकती है, क्योंकि नतीजे अलग-अलग होते हैं", "आपको साइज़ दोगुना करना चाहिए", "फिर कभी ट्रेड न करें"], a: 1, e: "फ़ैसले को प्रक्रिया से परखें। अच्छी प्रक्रिया भी एक ट्रेड में नुकसान दे सकती है।" }
  ]
 }
}
};
