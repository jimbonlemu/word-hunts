/**
 * core/interactive.js
 * Interactive mode implementation
 */

import readline from "readline";
import { searchByPrefix } from "../../services/core/search.js";
import { printResults } from "../../printers/index.js";
import { printHeader } from "../ui/header.js";

/**
 * Start interactive REPL mode
 */
export function startInteractiveMode(registry, context = {}) {
  const { logger, t, config } = context;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: t ? t('interactive_prompt') : 'wh> ',
  });

  // Print header and welcome message
  if (config) {
    printHeader(config);
  } else {
    logger && logger.info(t ? t('interactive_mode_start') : 'Interactive mode started. Type /help for commands.');
  }
  rl.prompt();

  // Handle each input line
  rl.on('line', (input) => {
    const interactiveContext = { ...context, isInteractive: true };
    handleInput(input.trim(), registry, interactiveContext);
    rl.prompt();
  });

  // Handle exit
  rl.on('close', () => {
    logger && logger.info(t ? t('goodbye') : 'Goodbye!');
    process.exit(0);
  });

  // Handle Ctrl+C
  rl.on('SIGINT', () => {
    rl.close();
  });
}

/**
 * Process user input
 */
function handleInput(input, registry, context = {}) {
  if (!input) return;

  // Exit commands
  if (isExitCommand(input)) {
    const { logger, t } = context;
    const quitMessage = t ? t('quit_command') || 'Goodbye!' : 'Goodbye!';
    logger && logger.info(quitMessage);
    process.exit(0);
  }

  // Handle CLI-style help flags in interactive mode
  const normalizedInput = input.trim().toLowerCase();
  if (normalizedInput === '-h' || normalizedInput === '--help') {
    if (registry.has('help')) {
      registry.execute('help', null, context);
    } else {
      // Fallback to showing usage info directly
      context.logger && context.logger.content(context.t ? context.t('usage_info') || 'Type "help" for available commands.' : 'Type "help" for available commands.');
    }
    return;
  }

  // Command with slash prefix: /lang en
  if (input.startsWith('/')) {
    handleSlashCommand(input, registry, context);
    return;
  }

  // Direct command: only accessible via slash prefix
  // So treat this as a search instead
  handleSearch(input, context);
  return;
}

/**
 * Check if input is an exit command
 */
function isExitCommand(input) {
  const exitCommands = ['/q', '/quit', '/exit', 'q', 'quit', 'exit'];
  return exitCommands.includes(input.toLowerCase());
}

/**
 * Handle slash commands
 */
function handleSlashCommand(input, registry, context = {}) {
  const parts = input.slice(1).split(/\s+/);
  const cmdName = parts[0];
  const arg = parts.slice(1).join(' ');

  registry.execute(cmdName, arg || null, { ...context, isInteractive: true });
}

/**
 * Handle search queries
 */
function handleSearch(query, context = {}) {
  const { logger, t, config } = context;
  const results = searchByPrefix(query);

  if (results.length === 0) {
    const translation = t('no_results');
    const noResultsMsg = translation !== 'no_results' ? translation : `No words found starting with "${query}"`;
    logger && logger.warn(noResultsMsg);
    return;
  }

  // Limit results based on config
  const limitedResults = results.slice(0, config.MAX_RESULTS);

  const foundMsg = t ? t('found') || 'Found' : 'Found';
  const wordsMsg = t ? t('words') || 'words' : 'words';
  logger && logger.success(`${foundMsg} ${limitedResults.length} ${wordsMsg}:`);

  printResults(limitedResults, config, (word, width) => word, {
    query,
    showHeader: true,
    originalTotal: results.length
  });
}