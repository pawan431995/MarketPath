# MarketPath — Static Stock Market Learning Website

Responsive static website starter using HTML, CSS and vanilla JavaScript.

## Included
- Responsive layout for mobile, tablet and desktop; the same header menu and a footer with links to key lessons and tools on every page
- Index ribbon fixed under the header on every page (stays visible while scrolling): NIFTY 50, SENSEX, NIFTY BANK, sector indices and India VIX scrolling like a ticker, with Live / Delayed / Market closed status and the data time. It refreshes every 5 minutes during market hours, pauses on hover or with its button, and stays still for people who prefer reduced motion. See "Index ribbon data" below
- Site-wide search (header button, or press `/` or Ctrl+K): lessons and their sections, glossary terms, calculators, patterns and indicators, in English and Hindi
- Learning progress saved in the browser: mark a module complete (or score 60%+ in its quiz), best quiz scores, "Continue where you left off" and a beginner path on the homepage, completion ticks in the module lists
- Each lesson shows reading time, related calculators and a back-to-top button
- English/Hindi language dropdown; the choice is remembered between pages
- Searchable, level-filtered topic library (beginner, intermediate, advanced). Search matches every typed word, ranks title matches first and shows a result count
- Light and dark theme toggle on every page (dark by default; the choice is remembered on the device)
- Paper trading practice terminal, laid out like a broker's trading window:
  - Top bar with NIFTY 50 and SENSEX and the sections Dashboard, Chart, Orders, Holdings, Positions, Funds, Portfolio and Trade history
  - Watchlist column: search any of the ~2,600 NSE-listed stocks (list from NSE's `EQUITY_L.csv`) to add them; five watchlists; each row shows change, % change and LTP, and hovering (or tapping) it shows Buy, Sell, Chart and Delete buttons (keys B, S and C also work)
  - Order window opened by Buy or Sell: product (CNC or MIS), quantity, market or limit, required margin and a charges breakdown
  - Live-updating chart (TradingView Lightweight Charts, Apache-2.0): candles, Heikin Ashi, OHLC bars, line and area
  - Timeframes like a broker chart: 1, 2, 3, 4, 5, 10, 15 and 30 minutes, 1–4 hours, 1 day, 1 week and 1 month, plus date-range buttons (1D, 5D, 1M, 3M, 6M, 1Y, 2Y). Real prices give 5-minute intraday candles and two years of daily candles with volume (NIFTY 500)
  - 21 indicators, covering everything taught in the lessons: EMA 9/21/50, SMA 20/50/200, Bollinger Bands, Supertrend, Parabolic SAR, Ichimoku cloud, pivot points, VWAP; RSI, MACD, Stochastic, CCI, ADX with ±DI and ATR in their own panes; volume bars, OBV and MFI
  - Drawing tools: trend line, horizontal level, zone, Fibonacci retracement, long/short risk-reward box, eraser and undo; drawings are saved per stock
  - Virtual ₹10 lakh account: delivery and intraday products, market and limit orders, FIFO positions and one-click exit
  - Indian charges on every order (brokerage plan, STT, exchange charge, SEBI fee, stamp duty, DP charge, GST) and an estimated tax on realized gains (STCG, LTCG with the ₹1.25 lakh exemption, intraday at your slab, cess). Rates live in `js/paper-charges.js`; verify them before relying on them
  - Funds: add or withdraw virtual money (counted as capital, not profit) with a statement, brokerage plan and tax slab settings, and account reset
  - Dashboard: margin available, holdings P&L, open positions, market overview and recent orders
  - Account views: Portfolio (value, today's and overall P&L, allocation, charges and tax), Holdings (delivery), Positions (intraday), Orders (open, executed and cancelled, with CSV) and Trade history (win rate, average win and loss, day-by-day P&L, tradebook CSV)
  - On the real-price feed, intraday positions are squared off automatically at 3:20 pm IST and new intraday orders are blocked after that, as brokers do
  - Full-screen mode and a button to hide the watchlist; on phones the watchlist is its own tab and the order window opens from the bottom
  - Loads only when its section comes into view (js/paper-loader.js), so the homepage stays light
  - Real NSE prices by default, delayed about 5–10 minutes and refreshed every 5 minutes in market hours: NIFTY 500 stocks with a real 5-minute chart (5 trading days), every other listed stock at its last closing price. Between the 5-minute real updates, in market hours, the price moves every 2 seconds with simulated ticks around the latest real price (sized by each stock's own recent volatility, within 1%), and glides to each new real price; the chart's current candle builds from these ticks. After the close and at weekends, an after-hours practice mode keeps prices moving within the last session's real range (starting from the closing price), and orders fill at these practice prices, labelled as such; real prices resume at 9:15 am IST
  - A simulated feed (practice at any hour) and optional Finnhub quotes with your own free API key remain available as separate accounts
- 23 lesson modules (`lesson.html`) with content in English and Hindi: stock basics, market rules and investor protection (timings, settlement, circuit limits, IPOs, scams, complaints), investing, SIP and mutual funds, reading charts, candlestick patterns, fundamental analysis (including balance sheet, cash flow, quarterly results, annual reports, shareholding pattern, valuation basics and corporate actions), technical analysis, technical indicators, swing trading, risk management, intraday trading, futures & options, option Greeks, trading psychology, and tax basics
- SIP and position-size calculators on the homepage, linking to the calculators hub
- Calculators hub (`pages/calculators.html`) with 49 financial calculators in 7 categories: personal finance and budgeting, investing, retirement, loans and debt, real estate, tax, and business finance
  - Search, category filters and a popular list; each calculator has live results, a chart with hover details and a table view, schedules with CSV download, and the method used
  - Shareable links that carry the inputs (for example `calculators.html#emi?amount=5000000&rate=9`), inputs remembered on the device, and a currency choice (₹, $, €, £) for the non-India-specific calculators
  - Indian rules where relevant: income tax new vs old regime (Budget 2025 slabs), HRA, capital gains, GST, EPF, NPS, PPF, gratuity. Verify the rates when tax rules change
- Every lesson has at least one diagram; F&O opens with SEBI's findings on trader losses and lists the 2024–25 rule changes
- Glossary of 120+ terms, financial risk disclaimers, bilingual privacy and contact pages, and a 404 page
- Favicon, social-sharing preview image and tags, web manifest, `robots.txt` and `sitemap.xml`
- Google AdSense loader (`ads.js`), off until you add your IDs

## Project structure
```
marketpath-static-website/
├── index.html        Homepage: hero, topic library with progress, paper trading, calculators, glossary
├── 404.html          Page-not-found page (static hosts serve it for missing URLs)
├── robots.txt, sitemap.xml, site.webmanifest
├── data/
│   ├── indices.js, indices.json   Index levels for the ribbon (generated by tools/fetch-indices.js)
│   ├── quotes.js                  Delayed prices for every listed stock (generated by tools/fetch-quotes.js)
│   ├── intraday/<SYMBOL>.js       5 days of 5-minute prices for each NIFTY 500 stock
│   └── eod.json, universe.json    Daily closes for other stocks; the NIFTY 500 list
├── .github/workflows/update-indices.yml   Deploys to GitHub Pages and refreshes the index data every 5 min in market hours
├── pages/            All other HTML pages
│   ├── lesson.html       Lesson page (loads ?topic=<slug>)
│   ├── calculators.html  Calculators hub: directory with search and categories, and a detail view per calculator (#id)
│   ├── glossary.html     Searchable glossary of terms in English and Hindi, filtered by topic
│   ├── patterns.html     Redirects to the Candlestick and Chart Patterns module
│   ├── indicators.html   Redirects to the Technical Indicators module
│   ├── privacy.html      Privacy policy (English and Hindi): what is stored in the browser
│   └── contact.html      Contact page (English and Hindi)
├── docs/
│   └── market-analysis.md   Analysis of books and websites in the market, gaps, and the plan
├── css/
│   ├── styles.css    All styling (responsive, dark theme by default)
│   ├── features.css  Theme toggle, light theme overrides, search count and paper trading styles
│   └── calculators.css  Calculators hub layout, inputs, results and chart styles
├── js/
│   ├── app.js                 Homepage logic: translations, course search and filters, continue learning, calculators
│   ├── site-chrome.js         Shared header menu, footer links, search button and back-to-top (English and Hindi)
│   ├── site-search.js         Site search dialog; loads search-index.js on first use
│   ├── index-ribbon.js        Scrolling index ribbon under the header; reloads data/indices.js
│   ├── search-index.js        Generated by tools/build-search-index.js — do not edit by hand
│   ├── progress.js            Learning progress in local storage (visited, completed, quiz scores)
│   ├── static-pages.js        Contact and privacy page text (English and Hindi)
│   ├── lessons-market-rules.js  Market Rules & Investor Protection module: text, FAQ and quiz
│   ├── lessons-updates.js     2024–25 updates to existing modules (F&O rules and SEBI data, income-tax regime)
│   ├── glossary-rules.js      Glossary terms for the market rules module
│   ├── lesson.js              Renders a single lesson: sidebar, sections, terms, FAQ, MCQ quiz, calculators
│   ├── lessons.js             Core lesson text, lesson order and calculator specs (English and Hindi)
│   ├── lessons-modules.js     Candlestick patterns and technical indicators modules
│   ├── lessons-foundations.js Expanded text for Stock Market Foundations
│   ├── lessons-content-a.js … e.js  Expanded lesson text for the other modules (English and Hindi)
│   ├── lessons-strategies.js  Buy/sell strategy sections for swing, intraday and F&O modules
│   ├── lessons-strategy-detail.js  Strategy images, rationale, checklists and position-size notes
│   ├── lessons-extra-en.js / lessons-extra-hi.js  Examples, scenarios, use cases, takeaways, practice
│   ├── lessons-tax.js         Tax Basics module for Indian investors and traders (verify current rules)
│   ├── lessons-finance.js     Balance sheet, cash flow, quarterly results, annual report, shareholding pattern, valuation basics, corporate actions
│   ├── lesson-charts.js       Which chart images each lesson shows, with bilingual captions
│   ├── module-extras.js       Per-module key terms, tool cards and calculators
│   ├── patterns.js            Candlestick and chart pattern library text (English and Hindi)
│   ├── patterns-extra.js      Additional patterns (spinning top, tweezers, three inside up, wedges, pennant, ...)
│   ├── indicators.js          Indicator text: what, settings, when, how to trade, mistakes (English and Hindi)
│   ├── mcq-core.js            Applies the MCQ bank to each module's quiz
│   ├── mcq-1.js … mcq-7.js    20+ multiple-choice questions per module, English and Hindi
│   ├── glossary-data.js       Glossary terms and definitions (English and Hindi)
│   ├── glossary-finance.js    Glossary terms for the financial reading modules
│   ├── glossary-page.js       Renders glossary.html
│   ├── calculators.js         Calculators hub: directory, detail view, inputs, results, sharing (English and Hindi)
│   ├── calc-math.js           Finance maths: EMI and amortization, SIP, TVM, NPV, IRR, XIRR
│   ├── calc-charts.js         SVG charts for the calculators (line/area, columns, donut, progress) with tooltips and table view
│   ├── calc-defs-*.js         Calculator definitions by category: personal, investing, retirement, loans, property, tax, business
│   ├── theme.js               Light/dark theme toggle (loaded in <head> to avoid a flash)
│   ├── paper-loader.js        Loads the paper-trading scripts when the section is about to be seen
│   ├── paper-trading.js       Paper trading terminal: feeds, watchlists, search, chart, order window, orders and funds
│   ├── paper-account.js       Dashboard, Orders, Holdings, Positions, Funds, Portfolio and Trade history views
│   ├── lesson-catalog.js      Lesson titles and summaries for the homepage (generated by tools/build-search-index.js)
│   ├── paper-symbols.js       NSE-listed stocks for the search (generated by tools/build-nse-symbols.js)
│   ├── paper-charges.js       Brokerage, statutory charges and tax rates used by paper trading
│   ├── paper-indicators.js    Indicator maths (moving averages, oscillators, Supertrend, Ichimoku, pivots and more)
│   ├── paper-drawings.js      Chart drawing tools (trend line, level, zone, Fibonacci, risk-reward)
│   ├── ads.js                 AdSense settings and loader (off until IDs are set)
│   └── shared.js              Helpers used by the content pages (language, escaping, menu)
├── images/
│   ├── charts/       SVG chart images used in lessons (candlesticks, RSI, MACD, payoff diagrams, SIP growth, ...)
│   ├── patterns/     SVG pattern diagrams (hammer, doji, engulfing, morning star, head and shoulders, triangles, ...)
│   ├── indicators/   SVG indicator charts (moving averages, RSI, MACD, stochastic, Bollinger, ATR, ADX, volume, OBV, VWAP, ...)
│   └── strategies/   SVG diagrams for swing, intraday and F&O buy/sell strategies
├── tools/
│   ├── build-nse-symbols.js    Regenerates js/paper-symbols.js from NSE's EQUITY_L.csv
│   ├── build-search-index.js   Regenerates js/search-index.js and js/lesson-catalog.js (run after editing any content)
│   ├── fetch-indices.js        Fetches index levels (NSE, with Yahoo for SENSEX and as fallback) into data/
│   ├── fetch-quotes.js         Fetches delayed share prices for paper trading into data/
│   └── build-diagrams.js       Regenerates the data-driven lesson diagrams in images/charts/
└── README.md
```
HTML pages stay in the root so GitHub Pages and other static hosts serve them at the top-level URLs.

## Run locally
Open `index.html` in a browser. No build process or backend is required.

## Publish using GitHub Pages
1. Create a public GitHub repository, for example `marketpath-learning`.
2. Upload all files in this folder to the repository root.
3. Open **Settings → Pages**.
4. Under build and deployment, choose deploy from a branch, select `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site and open the URL shown in Settings → Pages.

Official documentation: https://docs.github.com/en/pages

## Index ribbon data
Browsers cannot read NSE or Yahoo Finance directly from a static site (they block cross-origin requests), so the data is fetched on a schedule and published with the site:
1. `tools/fetch-indices.js` downloads the index levels and writes `data/indices.js`; `tools/fetch-quotes.js` downloads share prices for paper trading (`data/quotes.js`, `data/intraday/`, and every 12 hours two years of daily candles in `data/daily/`). Run them by hand with `node tools/fetch-indices.js` and `node tools/fetch-quotes.js` (Node 18 or newer).
2. On GitHub Pages, set **Settings → Pages → Source** to **GitHub Actions**. The workflow `.github/workflows/update-indices.yml` then deploys the site on every push and every 5 minutes during market hours (9:15 am–3:30 pm IST, Monday to Friday), fetching fresh index levels and share prices each time and keeping the last good data between runs. Deploying from the workflow avoids a commit every 5 minutes.
3. The ribbon reloads the file every 5 minutes while the market is open and every 30 minutes otherwise.

Why every 5 minutes and not tick-by-tick: real-time streaming needs a paid, licensed exchange data feed and a server. Free sources are suitable for a delayed display, and GitHub's scheduler runs at most every 5 minutes (and can start late at busy times). The ribbon always shows the time of its data and says Delayed when the data is old. It is for education, not for trading decisions. If you later host on Netlify, Vercel or Cloudflare, a small serverless function can replace the workflow and serve fresher data.

## Google AdSense setup
Ads are **not active by default**. Google must approve the site first, and the dashed boxes stay as placeholders until then.
1. Publish the site and keep adding original, useful lessons. Google reviews content quality before approving.
2. Apply at https://adsense.google.com/ and add your site.
3. After approval, open `ads.js` and set `client` to your publisher ID (`ca-pub-` followed by 16 digits) and `slot` to an ad unit ID you create in AdSense (Ads → By ad unit → Display ads).
4. Once both values are real, the script loads and fills every ad area (homepage and lesson pages) automatically. No other code changes are needed.
5. Add an `ads.txt` file to the site root if AdSense asks for it.
6. Follow Google's current requirements for consent, privacy disclosures and program policies, and update `privacy.html` to match. Do not click your own ads.

## Before publishing
- Replace the example email in `contact.html`.
- Replace `https://www.example.com/` with your domain in `sitemap.xml` and `robots.txt`. For the best social previews, also make `og:image` an absolute URL.
- After editing lessons, glossary terms or calculators, run `node tools/build-search-index.js` so search and the homepage course cards stay current.
- Review and customize `privacy.html` and the disclaimers for your actual site.
- Expand the course cards into complete, original lessons with examples, diagrams, quizzes and citations.
- Paper trading uses real NSE prices delayed by about 5–10 minutes (from Yahoo Finance), refreshed only when the scheduled workflow runs. It is for practice, not for trading decisions, and is labelled as delayed.
- Rules and rates change (tax slabs, STT, F&O lot sizes and expiry days, IPO timelines). Review `lessons-updates.js`, `lessons-market-rules.js`, `lessons-tax.js`, `paper-charges.js` and `calc-defs-tax.js` after each Budget and major SEBI circular.
- The language selector translates the interface, glossary and all 23 lessons (English and Hindi). Diagram labels are in English with Hindi captions. Have a native Hindi speaker review the lesson text before launch, and add a language by copying a block in `lessons.js`, then adding its option to both `<select>` menus.
- This is educational content, not financial advice. F&O content should explain risks clearly.
