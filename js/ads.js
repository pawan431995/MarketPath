// Google AdSense loader and ad-slot placement.
// Ads stay OFF until you replace the two values below with your real AdSense
// publisher ID (ca-pub-################) and an ad unit slot ID (digits).
// Until then the slots show as dashed placeholder boxes. Do not click your own ads.
const ADSENSE = {
  client: "ca-pub-XXXXXXXXXXXXXXXX",
  slot: "XXXXXXXXXX"
};

function adsEnabled() {
  return /^ca-pub-\d{16}$/.test(ADSENSE.client) && /^\d{6,}$/.test(ADSENSE.slot);
}

function loadAdsScript() {
  if (window.__mpAdsScript) return;
  window.__mpAdsScript = true;
  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE.client}`;
  document.head.appendChild(script);
}

// Fills every ad box that has not been filled yet.
function initAds() {
  if (!adsEnabled()) return;
  loadAdsScript();
  document.querySelectorAll("[data-ad-unit]:not(.ad-live)").forEach(box => {
    box.classList.add("ad-live");
    box.innerHTML = `<ins class="adsbygoogle" style="display:block" data-ad-client="${ADSENSE.client}" data-ad-slot="${ADSENSE.slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { /* ad blocked or not yet approved */ }
  });
}

function adSlot() {
  const wrap = document.createElement("div");
  wrap.className = "ad-wrap ad-inline";
  wrap.setAttribute("aria-label", "Advertisement");
  wrap.innerHTML = `<div class="ad-label">ADVERTISEMENT</div><div class="ad-placeholder" data-ad-unit><span class="ad-symbol">▧</span><span>Ad space</span></div>`;
  return wrap;
}

// Places an ad slot before every fourth top-level content block (after the first), up to maxSlots.
// Call again after a page re-renders its content.
function placeAdSlots(maxSlots = 3) {
  document.querySelectorAll(".ad-inline").forEach(n => n.remove());
  const blocks = Array.from(document.querySelectorAll("main section, main .gl-list, main .quiz-card"))
    .filter(el => !el.parentElement.closest("section, .gl-list, .quiz-card"));
  let placed = 0;
  blocks.forEach((el, i) => {
    if (i > 0 && i % 4 === 0 && placed < maxSlots) {
      el.parentNode.insertBefore(adSlot(), el);
      placed++;
    }
  });
  // Short pages: make sure there is at least one slot, above the disclaimer.
  const main = document.querySelector("main");
  if (placed === 0 && main) {
    main.insertBefore(adSlot(), main.querySelector(".fine-print") || null);
  }
  initAds();
}
