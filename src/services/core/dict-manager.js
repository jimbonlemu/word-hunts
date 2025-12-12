/**
 * Check and build sorted dictionary if needed
 * This ensures the words_sorted.json file exists before running the main application
 */
import { isSortedDictionaryExists, buildSortedDictionary } from "../../build/build-dict.js";
import { logger } from "../../utils/logger.js";

export function ensureSortedDictionary() {
    if (!isSortedDictionaryExists()) {
        logger.status("Building words_sorted.json (this may take a moment)...");
        try {
            const sortedWords = buildSortedDictionary();
            logger.success(`Done. ${sortedWords.length} words sorted and saved.`);
        } catch (error) {
            logger.error(`Failed to build sorted dictionary: ${error.message}`);
            process.exit(1);
        }
    }
}