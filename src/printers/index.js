import { printTable } from "./table.js";
import { printPlain } from "./plain.js";

export function printResults(list, config, truncateFunc, options = {}) {
  const { COLUMNS, CELL_WIDTH, TABLE_MODE, MAX_RESULTS } = config;
  const { query = null, showHeader = true, originalTotal = null, noTruncate = false } = options;

  const termWidth = process.stdout.columns || 80;
  const dynamicCols = Math.max(1, Math.floor(termWidth / Math.max(1, CELL_WIDTH)));
  const useCols = Math.min(COLUMNS, dynamicCols);

  // Show header info if needed
  if (showHeader && query) {
    const totalResults = originalTotal !== null ? originalTotal : list.length;
    const originalSearch = query;
    const resultsFor = config.translations?.results_for || "Results for";
    const showing = config.translations?.showing_results || "showing";
    const from = config.translations?.from || "from";
    console.log(`\n${resultsFor} "${originalSearch}" (${showing} ${list.length} results ${from} ${totalResults} total):\n`);
  }

  // Use non-truncating function if specified
  const actualTruncateFunc = noTruncate ? (word, width) => word : truncateFunc;

  if (TABLE_MODE) printTable(list, useCols, CELL_WIDTH, actualTruncateFunc, { noTruncate });
  else {
    // When TABLE_MODE is OFF, always show full words (override noTruncate)
    const finalTruncateFunc = (word, width) => word; // Always return full word
    printTable(list, useCols, CELL_WIDTH, finalTruncateFunc, { noTruncate: true, invisibleBorder: true });
  }

  // Show total results info
  if (showHeader) {
    const totalResultsText = config.translations?.total_results || "Total results:";
    console.log(`\n${totalResultsText} ${list.length}`);
    if (list.length === MAX_RESULTS) {
      const showingLimitedText = config.translations?.showing_limited_results || "(Showing limited results of";
      console.log(`${showingLimitedText} ${MAX_RESULTS} as configured)`);
    }
  }
}