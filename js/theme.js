// Light/dark theme switch, loaded in <head> so the saved theme applies before the first paint.
// Dark is the default. The choice is remembered on this device and the header button is added on every page.
(function () {
 const KEY = "mp-theme";
 function readTheme() {
  try { return localStorage.getItem(KEY) === "light" ? "light" : "dark"; } catch (e) { return "dark"; }
 }
 function saveTheme(theme) {
  try { localStorage.setItem(KEY, theme); } catch (e) { /* storage unavailable: theme lasts this page view */ }
 }
 function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === "light" ? "#f4f7fb" : "#0b1220";
  document.dispatchEvent(new CustomEvent("mp-theme-change", { detail: theme }));
 }
 applyTheme(readTheme());

 document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "themeToggle";
  btn.className = "theme-toggle";
  function sync() {
   const light = document.documentElement.dataset.theme === "light";
   btn.textContent = light ? "☾" : "☀";
   btn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
   btn.title = btn.getAttribute("aria-label");
  }
  btn.addEventListener("click", function () {
   const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
   saveTheme(next);
   applyTheme(next);
   sync();
  });
  header.insertBefore(btn, header.querySelector(".language-picker") || null);
  sync();
 });
})();
