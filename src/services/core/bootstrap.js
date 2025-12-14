/**
 * core/bootstrap.js
 * Main application bootstrap
 * 
 * Handles:
 * - Command registration
 * - Argument parsing
 * - Routing logic
 * - Mode selection (direct/interactive)
 */

import { parseArgs } from "node:util";
import { startInteractiveMode } from "./interactive.js";
import { searchByPrefix } from "../../services/core/search.js";
import { logger } from "../../utils/logger.js";
import { createCommandRegistry } from "./command-registry.js";
import { allCommands } from "../../commands/index.js";
import { loadConfig, saveConfig } from "../../utils/config.js";
import { loadTranslations } from "../i18n/index.js";
import { printResults } from "../../printers/index.js";
import { ensureSortedDictionary } from "./dict-manager.js";

// Ensure sorted dictionary exists
ensureSortedDictionary();

// Load configuration
const config = loadConfig();

// Initialize command registry
const registry = createCommandRegistry();

// Register all commands
allCommands.forEach(cmd => {
  registry.register(cmd);
});

// Context object to be passed to command handlers
const commandContext = {
  config,
  saveConfig,
  logger,
  loadTranslations,
  registry,  // Include registry for commands that need it
  t: (key) => config.translations[key] || key  // Translation function using loaded config
};

/**
 * Parse command line arguments
 */
function parseCliArgs() {
  try {
    const { values, positionals } = parseArgs({
      options: {
        help: { type: "boolean", short: "h" },
        version: { type: "boolean", short: "v" },
        lang: { type: "string" },
      },
      allowPositionals: true,
    });

    return { flags: values, args: positionals };
  } catch (err) {
    logger.error(`Invalid arguments: ${err.message}`);
    process.exit(1);
  }
}

/**
 * Handle flag-based commands
 */
function handleFlags(flags) {
  if (flags.help) {
    registry.execute('help', null, commandContext);
    return true;
  }

  if (flags.version) {
    registry.execute('version', null, commandContext);
    return true;
  }

  if (flags.lang) {
    registry.execute('lang', flags.lang, commandContext);
    return true;
  }

  return false;
}

/**
 * Handle direct search mode
 */
function handleDirectSearch(args) {
  if (args.length === 0) return false;

  const query = args.join(' ');
  const results = searchByPrefix(query);

  if (results.length === 0) {
    const translation = commandContext.t('no_results');
    const noResultsMsg = translation !== 'no_results' ? translation : `No words found starting with "${query}"`;
    logger.warn(noResultsMsg);
    process.exit(1);
  }

  // Limit results based on config
  const limitedResults = results.slice(0, config.MAX_RESULTS);

  printResults(limitedResults, config, (word, width) => word, {
    query,
    showHeader: true,
    originalTotal: results.length
  });
  return true;
}

/**
 * Main bootstrap function
 */
export function bootstrap() {
  const { flags, args } = parseCliArgs();

  // 1. Handle flags first
  if (handleFlags(flags)) {
    process.exit(0);
  }

  // 2. Try direct search
  if (handleDirectSearch(args)) {
    process.exit(0);
  }

  // 3. Fall back to interactive mode
  startInteractiveMode(registry, commandContext);
}