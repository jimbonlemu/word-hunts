import { CLI_VERSION } from "../utils/constants.js";

export default {
  meta: {
    name: "help",
    aliases: ['h'],
    desc: "Show this help",
    usage: "wh --help / -h"
  },

  args: {
    req: false
  },

  handler: (arg, cmdName, context) => {
    const { logger, t = (key) => key } = context;

    logger.content(
      `
    ${CLI_VERSION}\n
    ${t('usage_title') || 'Usage:'}
      wh [query]           ${t('usage_direct_search') || 'Search for words starting with [query]'}
      wh                   ${t('usage_interactive') || 'Start interactive mode'}

    ${t('options_title') || 'Options:'}
      --help, -h           ${t('options_help') || 'Show this help'}
      --version, -v        ${t('options_version') || 'Show version'}

    ${t('interactive_commands_title') || 'INTERACTIVE COMMANDS'}
      <prefix>             ${t('interactive_command_prefix') || 'Search words starting with prefix'}
      /tbon, /tboff        ${t('interactive_command_table_aliases') || 'Toggle table mode (on/off)'}
      /lang, /language     ${t('interactive_command_language') || 'Switch language (en/id)'}
      /sres <num>          ${t('interactive_command_result_limit') || 'Set result limit'}
      /scol <num>          ${t('interactive_command_columns') || 'Set number of columns'}
      /refs, /ui           ${t('interactive_command_refresh') || 'Refresh/Show UI header'}
      /q, /quit, /exit     ${t('interactive_command_quit') || 'Exit the program'}

    ${t('examples_title') || 'Examples:'}
      wh cat               ${t('examples_cat') || 'Search words starting with "cat"'}
      wh                   ${t('examples_interactive') || 'Start interactive mode'}
    `
    );
  }
}