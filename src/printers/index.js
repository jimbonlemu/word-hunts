import { printTable } from "./table.js";
import { printPlain } from "./plain.js";

export function printResults(list, config, truncateFunc, options = {}) {
  const { COLUMNS, CELL_WIDTH, CELL_WIDTH_MODE, TABLE_MODE, MAX_RESULTS } = config;
  const { query = null, showHeader = true, originalTotal = null, noTruncate = false } = options;

  // Calculate effective cell width based on mode
  let effectiveCellWidth = CELL_WIDTH || 12; // Default to 12 if not set

  if (CELL_WIDTH_MODE === 'auto' || !CELL_WIDTH_MODE) {
    // In auto mode, calculate optimal width based on the longest word in the list
    if (list.length > 0) {
      const maxLength = Math.max(...list.map(word => word.length));
      // Add some padding for readability (typically 2-4 chars)
      effectiveCellWidth = Math.max(6, maxLength + 2); // Minimum width of 6
    } else {
      effectiveCellWidth = 12; // Default when no results
    }
  } else if (CELL_WIDTH_MODE === 'manual' && CELL_WIDTH) {
    // In manual mode, use the specified width
    effectiveCellWidth = CELL_WIDTH;
  }

  const termWidth = process.stdout.columns || 80;
  const dynamicCols = Math.max(1, Math.floor(termWidth / Math.max(1, effectiveCellWidth)));
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

  if (TABLE_MODE) printTable(list, useCols, effectiveCellWidth, actualTruncateFunc, { noTruncate });
  else {
    // When TABLE_MODE is OFF, always show full words (override noTruncate)
    const finalTruncateFunc = (word, width) => word; // Always return full word
    printTable(list, useCols, effectiveCellWidth, finalTruncateFunc, { noTruncate: true, invisibleBorder: true });
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