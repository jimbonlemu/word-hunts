import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { WORDS_DICTIONARY_PATH, WORDS_SORTED_PATH } from "../utils/paths.js";
import { logger } from "../utils/logger.js";

/**
 * Builds a sorted array of words from the dictionary file
 * @param {string} dictionaryPath - Path to the dictionary file
 * @param {string} outputPath - Path to write the sorted words
 * @returns {Array<string>} Array of sorted words
 */
export function buildSortedDictionary(dictionaryPath = WORDS_DICTIONARY_PATH, outputPath = WORDS_SORTED_PATH) {
    // Read the dictionary file
    const dict = JSON.parse(fs.readFileSync(dictionaryPath, "utf8"));
    const words = Object.keys(dict);

    // Sort the words
    const sorted = words.slice().sort((a, b) =>
        a.localeCompare(b, "en", { sensitivity: "base" })
    );

    // Write to output file if path is provided
    if (outputPath) {
        fs.writeFileSync(outputPath, JSON.stringify(sorted));
    }

    return sorted;
}

/**
 * Checks if the sorted dictionary file exists
 * @param {string} outputPath - Path to check
 * @returns {boolean} True if file exists
 */
export function isSortedDictionaryExists(outputPath = WORDS_SORTED_PATH) {
    return fs.existsSync(outputPath);
}

// Main execution when run as script

const currentFilePath = fileURLToPath(import.meta.url);
const isRunAsScript = process.argv[1] && (process.argv[1] === currentFilePath || path.resolve(process.argv[1]) === path.resolve(currentFilePath));

if (isRunAsScript) {
    // This means the file is run directly, not imported
    if (isSortedDictionaryExists()) {
        logger.success("words_sorted.json already exists — skipping build.");
        process.exit(0);
    }

    logger.status("Building words_sorted.json (this may take a moment)...");

    const sorted = buildSortedDictionary();

    logger.success(`Done. ${sorted.length} words sorted and saved.`);
}
