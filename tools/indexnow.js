// Tells search engines that use IndexNow (Bing, and through it Yahoo and DuckDuckGo; also Yandex, Seznam and
// Naver) which pages changed, so they recrawl them within hours instead of days.
// Run by the deploy workflow after a push, with the changed files:
//   git diff --name-only <before> <after> | node tools/indexnow.js
// or by hand for specific pages:  node tools/indexnow.js pages/sip-calculator.html index.html
// Only addresses listed in sitemap.xml are sent. The key file (<KEY>.txt) sits at the site root, as IndexNow requires.
const fs = require("fs");
const path = require("path");

const KEY = "d1bda95094b9c7946e035dc4a2409910";
const ROOT = path.join(__dirname, "..");

const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
const known = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
const site = [...known].find(u => new URL(u).pathname === "/");
if (!site) { console.error("sitemap.xml has no homepage address"); process.exit(1); }
const host = new URL(site).host;

// Changed files -> public addresses. A lesson data file changes both language pages of that lesson.
function urlsFor(file) {
 file = file.trim().replace(/\\/g, "/");
 if (!file) return [];
 if (file === "index.html") return [site];
 const data = file.match(/^js\/lesson-data\/([a-z0-9-]+)\.js$/);
 if (data) return [`${site}pages/lesson-${data[1]}.html`, `${site}pages/lesson-${data[1]}-hi.html`];
 if (/^pages\/[^/]+\.html$/.test(file)) return [site + file];
 return [];
}

async function main() {
 const args = process.argv.slice(2);
 const files = args.length ? args : fs.readFileSync(0, "utf8").split(/\r?\n/);
 const urls = [...new Set(files.flatMap(urlsFor))].filter(u => known.has(u)).slice(0, 10000);
 if (!urls.length) { console.log("IndexNow: no public pages changed."); return; }
 const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${site}${KEY}.txt`, urlList: urls })
 });
 // 200 and 202 mean accepted. 403 usually means the key file is not live yet; 422 means an address is not on this host.
 console.log(`IndexNow: sent ${urls.length} address(es), response ${res.status} ${res.statusText}`);
 if (res.status >= 400) process.exitCode = 1;
}
main().catch(e => { console.error("IndexNow failed:", e.message); process.exitCode = 1; });
