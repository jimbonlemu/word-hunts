import fs from "fs";
import { WORDS_SORTED_PATH } from "../utils/paths.js";

const sortedPath = WORDS_SORTED_PATH;

const wordsSorted = JSON.parse(fs.readFileSync(sortedPath, "utf8"));

function lowerBoundPrefix(arr, prefix) {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        const slice = arr[mid].slice(0, prefix.length).toLowerCase();
        if (slice < prefix) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

export function searchByPrefix(prefix, config = {}) {
    const p = prefix.toLowerCase();
    if (!p) return [];

    const minWordLength = 2;

    const start = lowerBoundPrefix(wordsSorted, p);

    const out = [];
    for (let i = start; i < wordsSorted.length; i++) {
        const w = wordsSorted[i];
        if (w.slice(0, p.length).toLowerCase() !== p) break;

        if (w.length >= minWordLength) out.push(w);
    }

    out.sort((a, b) => a.length - b.length);
    return out;
}
