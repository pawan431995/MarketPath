# MarketPath — Static Stock Market Learning Website

Responsive static website starter using HTML, CSS and vanilla JavaScript.

## Included
- Responsive layout for mobile, tablet and desktop
- English/Hindi language dropdown; the choice is remembered between pages
- Searchable, level-filtered topic library (beginner, intermediate, advanced)
- 22 lesson modules (`lesson.html`) with content in English and Hindi: stock basics, investing, SIP and mutual funds, reading charts, candlestick patterns, fundamental analysis (including balance sheet, cash flow, quarterly results, annual reports, shareholding pattern, valuation basics and corporate actions), technical analysis, technical indicators, swing trading, risk management, intraday trading, futures & options, option Greeks, trading psychology, and tax basics
- Simulated chart with period selector and moving-average toggle
- SIP estimate calculator
- Position-sizing/risk example calculator
- Glossary, financial risk disclaimers, privacy and contact template pages
- Google AdSense loader (`ads.js`), off until you add your IDs

## Project structure
```
marketpath-static-website/
├── index.html        Homepage: hero, topic library, chart lab, calculators, glossary
├── pages/            All other HTML pages
│   ├── lesson.html       Lesson page (loads ?topic=<slug>)
│   ├── calculators.html  Goal SIP planner, lumpsum growth, CAGR, inflation-adjusted value, trade break-even
│   ├── glossary.html     Searchable glossary of terms in English and Hindi, filtered by topic
│   ├── patterns.html     Redirects to the Candlestick and Chart Patterns module
│   ├── indicators.html   Redirects to the Technical Indicators module
│   ├── privacy.html      Privacy policy template
│   └── contact.html      Contact page template
├── docs/
│   └── market-analysis.md   Analysis of books and websites in the market, gaps, and the plan
├── css/
│   └── styles.css    All styling (responsive, light text on dark theme)
├── js/
│   ├── app.js                 Homepage logic: translations, course filters, chart
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
│   ├── calculators.js         Calculator logic and labels (English and Hindi)
│   ├── ads.js                 AdSense settings and loader (off until IDs are set)
│   └── shared.js              Helpers used by the content pages (language, escaping, menu)
├── images/
│   ├── charts/       SVG chart images used in lessons (candlesticks, RSI, MACD, payoff diagrams, SIP growth, ...)
│   ├── patterns/     SVG pattern diagrams (hammer, doji, engulfing, morning star, head and shoulders, triangles, ...)
│   ├── indicators/   SVG indicator charts (moving averages, RSI, MACD, stochastic, Bollinger, ATR, ADX, volume, OBV, VWAP, ...)
│   └── strategies/   SVG diagrams for swing, intraday and F&O buy/sell strategies
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

## Google AdSense setup
Ads are **not active by default**. Google must approve the site first, and the dashed boxes stay as placeholders until then.
1. Publish the site and keep adding original, useful lessons. Google reviews content quality before approving.
2. Apply at https://adsense.google.com/ and add your site.
3. After approval, open `ads.js` and set `client` to your publisher ID (`ca-pub-` followed by 16 digits) and `slot` to an ad unit ID you create in AdSense (Ads → By ad unit → Display ads).
4. Once both values are real, the script loads and fills every ad area (homepage and lesson pages) automatically. No other code changes are needed.
5. Add an `ads.txt` file to the site root if AdSense asks for it.
6. Follow Google's current requirements for consent, privacy disclosures and program policies, and update `privacy.html` to match. Do not click your own ads.

## Before publishing
- Replace the example email in `app.js` and `contact.html`.
- Review and customize `privacy.html` and the disclaimers for your actual site.
- Expand the course cards into complete, original lessons with examples, diagrams, quizzes and citations.
- This site does not provide live quotes. The chart uses simulated values and is labelled accordingly.
- The language selector translates the interface, glossary and all 12 lessons (English and Hindi). Have a native Hindi speaker review the lesson text before launch, and add a language by copying a block in `lessons.js`, then adding its option to both `<select>` menus.
- This is educational content, not financial advice. F&O content should explain risks clearly.
