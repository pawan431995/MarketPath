// Calculators page: goal SIP planner, lumpsum growth, CAGR, inflation-adjusted value, trade break-even.
const CALC_UI = {
 en: { navLearn: "Learn", navPatterns: "Patterns", navIndicators: "Indicators", navTools: "Calculators", navQuiz: "Quiz", navGlossary: "Glossary", navResources: "Resources",
   eyebrow: "CALCULATORS", title: "Investing calculators",
   intro: "Explore what different amounts, returns and time periods can do. Every result is an estimate: returns are not guaranteed, and taxes, fees and inflation are excluded unless stated.",
   goalTitle: "Goal SIP planner", goalDesc: "How much to invest each month to reach a target amount.", goalTarget: "Target amount (₹)", monthlyNeeded: "Monthly SIP needed",
   lumpTitle: "Lumpsum growth", lumpDesc: "What a one-time investment grows to.", amount: "Amount (₹)", futureValue: "Future value",
   cagrTitle: "Return (CAGR)", cagrDesc: "The steady yearly rate that turns a start value into an end value.", startValue: "Start value (₹)", endValue: "End value (₹)", cagrOut: "Annual return (CAGR)",
   realTitle: "Inflation-adjusted value", realDesc: "What an amount will be worth in today's money.", inflation: "Expected inflation (%)", realOut: "Value in today's money",
   beTitle: "Trade break-even", beDesc: "How far the price must move just to cover costs.", qty: "Quantity (shares)", buyPrice: "Buy price (₹)", costs: "Total buy and sell costs (₹)", beOut: "Break-even sell price",
   years: "Years", rate: "Assumed annual return (%)",
   disclaimer: "These calculators show illustrative outcomes only. Returns are not guaranteed. Taxes, charges and inflation are excluded unless stated. Costs in the trade calculator should come from your broker's statement.",
   footerText: "Learn the market, one concept at a time.", disclaimerLink: "Disclaimer", privacyLink: "Privacy policy", contactLink: "Contact",
   invalid: "Enter valid values", note: { sip: "Assumes monthly investing at the start of each month.", lump: "Compounded yearly at the assumed rate.", cagr: "Steady yearly rate; real returns vary year to year.", real: "Future amount divided by inflation over the period.", be: "Price needed just to cover total costs, before any profit.", perc: "Move needed, as a percentage of the buy price." } },
 hi: { navLearn: "सीखें", navPatterns: "पैटर्न", navIndicators: "इंडिकेटर", navTools: "कैलकुलेटर", navQuiz: "क्विज़", navGlossary: "शब्दावली", navResources: "संसाधन",
   eyebrow: "कैलकुलेटर", title: "निवेश कैलकुलेटर",
   intro: "अलग-अलग राशि, रिटर्न और समय-अवधि क्या कर सकते हैं, यह देखें। हर परिणाम एक अनुमान है: रिटर्न की गारंटी नहीं है, और टैक्स, शुल्क व महँगाई जब तक न लिखी हो, शामिल नहीं हैं।",
   goalTitle: "लक्ष्य SIP प्लानर", goalDesc: "लक्ष्य राशि तक पहुँचने के लिए हर महीने कितना निवेश करना होगा।", goalTarget: "लक्ष्य राशि (₹)", monthlyNeeded: "ज़रूरी मासिक SIP",
   lumpTitle: "लंपसम ग्रोथ", lumpDesc: "एक बार के निवेश की भविष्य की राशि।", amount: "राशि (₹)", futureValue: "भविष्य की राशि",
   cagrTitle: "रिटर्न (CAGR)", cagrDesc: "वह स्थिर सालाना दर जो शुरुआती मूल्य को अंतिम मूल्य तक ले जाती है।", startValue: "शुरुआती मूल्य (₹)", endValue: "अंतिम मूल्य (₹)", cagrOut: "सालाना रिटर्न (CAGR)",
   realTitle: "महँगाई-समायोजित मूल्य", realDesc: "आज के पैसों में किसी राशि की वैल्यू क्या होगी।", inflation: "अपेक्षित महँगाई (%)", realOut: "आज के पैसों में मूल्य",
   beTitle: "ट्रेड ब्रेक-ईवन", beDesc: "खर्च निकालने के लिए कीमत को कितना चलना होगा।", qty: "मात्रा (शेयर)", buyPrice: "ख़रीद कीमत (₹)", costs: "कुल ख़रीद और बिक्री खर्च (₹)", beOut: "ब्रेक-ईवन बिक्री कीमत",
   years: "वर्ष", rate: "मान ली गई सालाना दर (%)",
   disclaimer: "ये कैलकुलेटर केवल उदाहरण परिणाम दिखाते हैं। रिटर्न की गारंटी नहीं है। जब तक न लिखा हो, टैक्स, शुल्क और महँगाई शामिल नहीं हैं। ट्रेड कैलकुलेटर में खर्च आपके ब्रोकर के स्टेटमेंट से लें।",
   footerText: "एक-एक अवधारणा करके बाज़ार सीखें।", disclaimerLink: "अस्वीकरण", privacyLink: "गोपनीयता नीति", contactLink: "संपर्क",
   invalid: "सही मान दर्ज करें", note: { sip: "हर महीने की शुरुआत में निवेश मानकर।", lump: "मान ली गई दर पर सालाना चक्रवृद्धि।", cagr: "स्थिर सालाना दर; असली रिटर्न हर साल बदलता है।", real: "भविष्य की राशि को अवधि की महँगाई से भाग दिया गया।", be: "कुल खर्च निकालने के लिए ज़रूरी कीमत, किसी लाभ से पहले।", perc: "ख़रीद कीमत के प्रतिशत के रूप में ज़रूरी चाल।" } }
};

let cLang = "en";

const inr = n => "₹ " + Math.round(n).toLocaleString("en-IN");
const val = id => Number(document.getElementById(id).value);
const set = (id, text) => { document.getElementById(id).textContent = text; };
const note = (id, text) => { document.getElementById(id).textContent = text; };

function calcGoal() {
 const target = val("goalTarget"), n = val("goalYears") * 12, r = val("goalRate") / 100 / 12;
 if (!(target > 0 && n > 0 && r >= 0)) { set("goalOut", CALC_UI[cLang].invalid); note("goalNote", ""); return; }
 const factor = r === 0 ? n : ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
 const monthly = target / factor;
 set("goalOut", inr(monthly));
 note("goalNote", `${CALC_UI[cLang].note.sip} ${cLang === "en" ? "Total invested" : "कुल निवेश"}: ${inr(monthly * n)}`);
}

function calcLump() {
 const p = val("lumpAmount"), y = val("lumpYears"), rate = val("lumpRate") / 100;
 if (!(p > 0 && y > 0 && rate >= 0)) { set("lumpOut", CALC_UI[cLang].invalid); note("lumpNote", ""); return; }
 const fv = p * Math.pow(1 + rate, y);
 set("lumpOut", inr(fv));
 note("lumpNote", CALC_UI[cLang].note.lump);
}

function calcCagr() {
 const s = val("cagrStart"), e = val("cagrEnd"), y = val("cagrYears");
 if (!(s > 0 && e > 0 && y > 0)) { set("cagrOut", CALC_UI[cLang].invalid); note("cagrNote", ""); return; }
 const c = Math.pow(e / s, 1 / y) - 1;
 set("cagrOut", (c * 100).toFixed(2) + "%");
 note("cagrNote", `${CALC_UI[cLang].note.cagr} ${cLang === "en" ? "Total change" : "कुल बदलाव"}: ${((e / s - 1) * 100).toFixed(1)}%`);
}

function calcReal() {
 const a = val("realAmount"), y = val("realYears"), inf = val("realInfl") / 100;
 if (!(a > 0 && y > 0 && inf >= 0)) { set("realOut", CALC_UI[cLang].invalid); note("realNote", ""); return; }
 const real = a / Math.pow(1 + inf, y);
 set("realOut", inr(real));
 note("realNote", `${CALC_UI[cLang].note.real} ${cLang === "en" ? "Purchasing power lost" : "क्रय शक्ति में कमी"}: ${((1 - real / a) * 100).toFixed(1)}%`);
}

function calcBreakEven() {
 const q = val("beQty"), p = val("bePrice"), c = val("beCosts");
 if (!(q > 0 && p > 0 && c >= 0)) { set("beOut", CALC_UI[cLang].invalid); note("beNote", ""); return; }
 const be = p + c / q;
 set("beOut", `₹ ${be.toFixed(2)} (${(c / q).toFixed(2)} / share)`);
 note("beNote", `${CALC_UI[cLang].note.be} ${cLang === "en" ? "Move needed" : "ज़रूरी चाल"}: ${((c / (q * p)) * 100).toFixed(2)}%. ${CALC_UI[cLang].note.perc}`);
}

function calcAll() { calcGoal(); calcLump(); calcCagr(); calcReal(); calcBreakEven(); }

const INPUT_CALCS = {
 goalTarget: calcGoal, goalYears: calcGoal, goalRate: calcGoal,
 lumpAmount: calcLump, lumpYears: calcLump, lumpRate: calcLump,
 cagrStart: calcCagr, cagrEnd: calcCagr, cagrYears: calcCagr,
 realAmount: calcReal, realYears: calcReal, realInfl: calcReal,
 beQty: calcBreakEven, bePrice: calcBreakEven, beCosts: calcBreakEven
};

document.addEventListener("DOMContentLoaded", () => {
 cLang = CALC_UI[MP.getLang()] ? MP.getLang() : "en";
 document.getElementById("year").textContent = new Date().getFullYear();
 const sel = document.getElementById("languageSelect");
 sel.value = cLang;
 sel.addEventListener("change", e => { cLang = e.target.value; MP.setLang(cLang); MP.applyText(CALC_UI, cLang); document.title = CALC_UI[cLang].title + " — MarketPath"; calcAll(); });
 Object.entries(INPUT_CALCS).forEach(([id, fn]) => document.getElementById(id).addEventListener("input", fn));
 MP.setupMenu();
 placeAdSlots();
 MP.applyText(CALC_UI, cLang);
 document.title = CALC_UI[cLang].title + " — MarketPath";
 calcAll();
});
