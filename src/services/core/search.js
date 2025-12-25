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

// Function to check if a word is a roman numeral
export function isRomanNumeral(word) {
    // Check if only contains characters I, V, X, L, C, D, M and at least 1 character
    if (!/^[IVXLCDM]+$/.test(word.toUpperCase())) {
        return false;
    }

    // Further validation that this is a valid roman numeral
    // Roman numerals should only have certain combinations
    const romanRegex = /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/;
    return romanRegex.test(word.toUpperCase());
}

export function searchByPrefix(prefix, config = null) {
    if (!prefix) return [];

    const words = loadWordsSorted();
    const p = prefix.toLowerCase();
    // Use MIN_WORD_LENGTH value from config if available, otherwise use default 2
    const minWordLength = (config && config.MIN_WORD_LENGTH !== undefined) ? config.MIN_WORD_LENGTH : 2;

    const startIndex = findStartIndex(words, p);
    const results = [];

    for (let i = startIndex; i < words.length; i++) {
        const word = words[i];

        if (!word.toLowerCase().startsWith(p)) break;

        if (word.length >= minWordLength) {
            // Check if we need to filter roman numerals
            if (config && config.FILTER_ROMAN_NUMERALS && isRomanNumeral(word)) {
                continue; // Skip this word if it's a roman numeral and filter is active
            }

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