// Text for the contact and privacy pages, in English and Hindi. Elements carry data-ui="key".
// Before publishing, replace the contact email and review the privacy text for your actual setup (ads, analytics, hosting).
const PAGE_UI = {
 en: {
  docContact: "Contact", docPrivacy: "Privacy policy",
  contactEyebrow: "GET IN TOUCH", contactTitle: "Contact MarketPathAcademy",
  contactIntro: "Questions, suggestions or found a mistake in a lesson? We read every message and use it to improve the site.",
  contactEmailTitle: "Email us", contactEmailText: "Write to us and include the page link if your message is about a specific lesson or calculator.", contactEmailBtn: "Email us ↗",
  contactNotTitle: "What we cannot help with", contactNot1: "Buy or sell recommendations, tips or portfolio advice: we are an educational site, not a SEBI-registered adviser.",
  contactNot2: "Problems with your broker account: contact your broker first, then SEBI SCORES if it is not resolved.", contactNot3: "Recovering money lost to a scam: report it at cybercrime.gov.in or call 1930 straight away.",
  contactLearn: "While you wait, the Market Rules & Investor Protection module explains how complaints work →",
  privEyebrow: "POLICIES", privTitle: "Privacy policy", privUpdated: "Last updated: October 2026",
  privIntro: "MarketPathAcademy is a static learning website. You do not need an account, and we do not ask for your name, phone number or financial details.",
  privStoreTitle: "What is stored on your device", privStoreText: "Some features remember your choices in your own browser (local storage). This data stays on your device; it is not sent to us. You can clear it any time from your browser settings.",
  privStore1: "Language and theme (light or dark).", privStore2: "Your learning progress: modules completed and quiz scores.",
  privStore3: "Paper-trading account, watchlist, orders and chart drawings (virtual money only).", privStore4: "Calculator inputs and the currency you choose.",
  privStore5: "A Finnhub API key, only if you enter one for live quotes. It is sent only to Finnhub to fetch quotes.",
  privThirdTitle: "Third-party services", privThirdText: "Pages load fonts from Google Fonts and the charting library from unpkg.com, which can see your IP address as part of normal web requests. If live quotes are switched on, requests go to Finnhub. If Google AdSense is enabled, Google and its partners may use cookies to serve and measure ads, subject to your consent settings.",
  privChildTitle: "Children", privChildText: "The content is educational and suitable for all ages, but trading and investing accounts in India require the holder to be an adult.",
  privChangeTitle: "Changes and contact", privChangeText: "We will update this page if what we store changes. For questions, use the contact page."
 },
 hi: {
  docContact: "संपर्क", docPrivacy: "गोपनीयता नीति",
  contactEyebrow: "संपर्क करें", contactTitle: "MarketPathAcademy से संपर्क करें",
  contactIntro: "कोई प्रश्न, सुझाव या किसी पाठ में गलती मिली? हम हर संदेश पढ़ते हैं और साइट बेहतर बनाने में उसका उपयोग करते हैं।",
  contactEmailTitle: "हमें ईमेल करें", contactEmailText: "अगर संदेश किसी ख़ास पाठ या कैलकुलेटर के बारे में है तो पेज का लिंक भी लिखें।", contactEmailBtn: "ईमेल करें ↗",
  contactNotTitle: "हम किसमें मदद नहीं कर सकते", contactNot1: "ख़रीद-बिक्री की सलाह, टिप्स या पोर्टफ़ोलियो सलाह: हम शैक्षिक साइट हैं, SEBI-रजिस्टर्ड सलाहकार नहीं।",
  contactNot2: "ब्रोकर खाते की समस्याएँ: पहले अपने ब्रोकर से संपर्क करें, हल न हो तो SEBI SCORES पर जाएँ।", contactNot3: "धोखाधड़ी में खोया पैसा वापस पाना: तुरंत cybercrime.gov.in पर शिकायत करें या 1930 पर कॉल करें।",
  contactLearn: "तब तक, 'बाज़ार के नियम और निवेशक सुरक्षा' मॉड्यूल बताता है कि शिकायत कैसे करें →",
  privEyebrow: "नीतियाँ", privTitle: "गोपनीयता नीति", privUpdated: "अंतिम अपडेट: अक्टूबर 2026",
  privIntro: "MarketPathAcademy एक स्टैटिक लर्निंग वेबसाइट है। आपको खाता बनाने की ज़रूरत नहीं है, और हम आपका नाम, फ़ोन नंबर या वित्तीय विवरण नहीं माँगते।",
  privStoreTitle: "आपके डिवाइस पर क्या सहेजा जाता है", privStoreText: "कुछ सुविधाएँ आपकी पसंद आपके ही ब्राउज़र (लोकल स्टोरेज) में याद रखती हैं। यह डेटा आपके डिवाइस पर रहता है; हमें नहीं भेजा जाता। आप इसे कभी भी ब्राउज़र सेटिंग से मिटा सकते हैं।",
  privStore1: "भाषा और थीम (लाइट या डार्क)।", privStore2: "आपकी सीखने की प्रगति: पूरे मॉड्यूल और क्विज़ स्कोर।",
  privStore3: "पेपर-ट्रेडिंग खाता, वॉचलिस्ट, ऑर्डर और चार्ट ड्रॉइंग (केवल वर्चुअल पैसा)।", privStore4: "कैलकुलेटर इनपुट और आपकी चुनी मुद्रा।",
  privStore5: "Finnhub API key, केवल तब जब आप लाइव कोट के लिए दर्ज करें। यह केवल कोट लाने के लिए Finnhub को भेजी जाती है।",
  privThirdTitle: "तीसरे पक्ष की सेवाएँ", privThirdText: "पेज Google Fonts से फ़ॉन्ट और unpkg.com से चार्ट लाइब्रेरी लोड करते हैं, जो सामान्य वेब अनुरोधों के तहत आपका IP पता देख सकते हैं। लाइव कोट चालू हों तो अनुरोध Finnhub को जाते हैं। Google AdSense चालू हो तो Google और उसके साझेदार आपकी सहमति सेटिंग के अनुसार विज्ञापन दिखाने और मापने के लिए कुकी इस्तेमाल कर सकते हैं।",
  privChildTitle: "बच्चे", privChildText: "सामग्री शैक्षिक है और हर उम्र के लिए उपयुक्त है, पर भारत में ट्रेडिंग और निवेश खाते के लिए खाताधारक का वयस्क होना ज़रूरी है।",
  privChangeTitle: "बदलाव और संपर्क", privChangeText: "जो सहेजा जाता है उसमें बदलाव होने पर हम यह पेज अपडेट करेंगे। प्रश्नों के लिए संपर्क पेज का उपयोग करें।"
 }
};
(function () {
 const sel = document.getElementById("languageSelect");
 const apply = lang => {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-ui]").forEach(el => { const v = PAGE_UI[lang][el.dataset.ui]; if (typeof v === "string") el.textContent = v; });
  const page = document.body.dataset.page; // "contact" or "privacy"
  if (page) document.title = `${PAGE_UI[lang][page === "contact" ? "docContact" : "docPrivacy"]} — MarketPathAcademy`;
 };
 let lang = "en";
 try { lang = localStorage.getItem("mp-lang") === "hi" ? "hi" : "en"; } catch (e) { /* storage unavailable */ }
 if (sel) {
  sel.value = lang;
  sel.addEventListener("change", () => { try { localStorage.setItem("mp-lang", sel.value); } catch (e) { /* storage unavailable */ } apply(sel.value); });
 }
 const menu = document.getElementById("menuToggle");
 if (menu) menu.addEventListener("click", () => {
  const open = document.getElementById("mainNav").classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
 });
 apply(lang);
})();
