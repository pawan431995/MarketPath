// Small helpers shared by the content pages (glossary, resources, quiz, calculators).
const MP = {
 esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
 },
 getLang() {
  try { return localStorage.getItem("mp-lang") || "en"; } catch (e) { return "en"; }
 },
 setLang(lang) {
  try { localStorage.setItem("mp-lang", lang); } catch (e) { /* storage unavailable */ }
 },
 applyText(dict, lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-ui]").forEach(el => {
   const v = dict[lang][el.dataset.ui];
   if (typeof v === "string") el.textContent = v;
  });
 },
 setupMenu() {
  const menu = document.getElementById("menuToggle");
  if (!menu || menu.dataset.wired) return; // site-chrome.js already handles it on every page
  menu.dataset.wired = "1";
  menu.addEventListener("click", () => {
   const open = document.getElementById("mainNav").classList.toggle("open");
   menu.setAttribute("aria-expanded", String(open));
  });
 }
};
