// Builds js/paper-symbols.js (the paper-trading stock search list) from NSE's list of listed equities.
// Usage:
//   1. Download https://nsearchives.nseindia.com/content/equities/EQUITY_L.csv
//   2. node tools/build-nse-symbols.js path/to/EQUITY_L.csv
// Only the symbol and company name are kept. Rows that do not look like a valid symbol are skipped.
const fs = require("fs");
const path = require("path");

const src = process.argv[2];
if (!src) {
 console.error("Usage: node tools/build-nse-symbols.js path/to/EQUITY_L.csv");
 process.exit(1);
}

// Minimal CSV parser: handles quoted fields with commas and doubled quotes.
function parseCsv(text) {
 const rows = [];
 let row = [], field = "", quoted = false;
 for (let i = 0; i < text.length; i++) {
  const ch = text[i];
  if (quoted) {
   if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
   else if (ch === '"') quoted = false;
   else field += ch;
  } else if (ch === '"') quoted = true;
  else if (ch === ",") { row.push(field); field = ""; }
  else if (ch === "\n" || ch === "\r") {
   if (ch === "\r" && text[i + 1] === "\n") i++;
   row.push(field); rows.push(row); row = []; field = "";
  } else field += ch;
 }
 if (field || row.length) { row.push(field); rows.push(row); }
 return rows;
}

const rows = parseCsv(fs.readFileSync(src, "utf8"));
const header = rows.shift().map(h => h.trim().toUpperCase());
const iSym = header.indexOf("SYMBOL");
const iName = header.indexOf("NAME OF COMPANY");
if (iSym < 0 || iName < 0) {
 console.error("Unexpected header: " + header.join(","));
 process.exit(1);
}

const seen = new Map();
for (const r of rows) {
 const sym = (r[iSym] || "").trim().toUpperCase();
 const name = (r[iName] || "").replace(/\s+/g, " ").trim().slice(0, 120);
 if (!/^[A-Z0-9][A-Z0-9&_.\-]{0,19}$/.test(sym) || !name) continue;
 if (!seen.has(sym)) seen.set(sym, name);
}
const list = [...seen.entries()].sort((a, b) => a[0].localeCompare(b[0]));

const today = new Date().toISOString().slice(0, 10);
const out = `// NSE-listed equities (symbol, company name), from NSE's EQUITY_L.csv downloaded ${today}.
// ${list.length} symbols. Used by the paper-trading stock search. Regenerate with tools/build-nse-symbols.js.
const NSE_SYMBOLS = [
${list.map(e => JSON.stringify(e)).join(",\n")}
];
`;
const dest = path.join(__dirname, "..", "js", "paper-symbols.js");
fs.writeFileSync(dest, out);
console.log(`Wrote ${list.length} symbols to ${dest}`);
