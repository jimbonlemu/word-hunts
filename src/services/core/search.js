import fs from "fs";
import { WORDS_SORTED_PATH } from "../../utils/paths.js";

let wordsSorted = null;

function loadWordsSorted() {
    if (wordsSorted === null) {
        wordsSorted = JSON.parse(
            fs.readFileSync(WORDS_SORTED_PATH, "utf8")
        );
    }
    return wordsSorted;
}

function findStartIndex(arr, prefix) {
    let lo = 0;
    let hi = arr.length;
    const len = prefix.length;

    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        const current = arr[mid].slice(0, len).toLowerCase();

        if (current < prefix) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

export function searchByPrefix(prefix) {
    if (!prefix) return [];

    const words = loadWordsSorted();
    const p = prefix.toLowerCase();
    const minWordLength = 2;

    const startIndex = findStartIndex(words, p);
    const results = [];

    for (let i = startIndex; i < words.length; i++) {
        const word = words[i];

        if (!word.toLowerCase().startsWith(p)) break;

        if (word.length >= minWordLength) {
            results.push(word);
        }
    }

    return results.sort((a, b) => a.length - b.length);
}

// Export a function to reload the dictionary if needed
export function reloadDictionary() {
    wordsSorted = null; // Reset cache
    loadWordsSorted();  // Reload from file
}