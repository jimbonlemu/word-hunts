import fs from "fs";
import { WORDS_DICTIONARY_PATH, WORDS_SORTED_PATH } from "../utils/paths.js";

if (fs.existsSync(WORDS_SORTED_PATH)) {
    console.log("✔ words_sorted.json already exists — skipping build.");
    process.exit(0);
}

console.log("⏳ Building words_sorted.json...");

const dict = JSON.parse(fs.readFileSync(WORDS_DICTIONARY_PATH, "utf8"));
const words = Object.keys(dict);

const sorted = words.slice().sort((a, b) =>
    a.localeCompare(b, "en", { sensitivity: "base" })
);

fs.writeFileSync(WORDS_SORTED_PATH, JSON.stringify(sorted));

console.log(`✔ Done. ${sorted.length} words sorted.`);
