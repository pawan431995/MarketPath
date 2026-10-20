// Generated content pages (glossary terms, articles; made by tools/build-seo.js). The content is already in the
// page; this only wires the menu, the year and the language choice for the site menus and footer.
document.addEventListener("DOMContentLoaded", () => {
 const sel = document.getElementById("languageSelect");
 if (sel) {
  sel.value = MP.getLang();
  sel.addEventListener("change", e => MP.setLang(e.target.value));
 }
 MP.setupMenu();
 const year = document.getElementById("year");
 if (year) year.textContent = new Date().getFullYear();
});
