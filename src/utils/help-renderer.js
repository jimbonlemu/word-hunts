import { CLI_VERSION } from "./constants.js";

/**
 * Generates the help content string dynamically.
 * Pure utility function that transforms state (registry, t) into a string.
 * @param {Object} context - The context object containing t, registry, etc.
 * @returns {string} The formatted help string.
 */
export const generateHelpContent = (context) => {
    const { t = (key) => key, registry } = context;

    let interactiveCommandsSection = '';

    if (registry) {
        // Generate interactive commands dynamically from registry
        const commands = registry.getHelpInfo();

        // Format interactive commands specifically for display
        const interactiveCommandLines = commands
            .filter(cmd => cmd.name !== 'help') // Exclude help itself to avoid recursion
            .map(cmd => {
                // For display in help, we want the aliases in the position of the example usage
                // Format command aliases with slashes
                const allNames = [`/${cmd.name}`];
                if (cmd.aliases && cmd.aliases.length > 0) {
                    cmd.aliases.forEach(alias => allNames.push(`/${alias}`));
                }

                // Join all command variations
                const commandVariants = allNames.join(', ');

                // Pad to align descriptions properly with fixed width
                const paddedCommand = commandVariants.padEnd(30, ' '); // Fixed width of 30 chars

                return `      ${paddedCommand}${t(cmd.desc) || cmd.desc}`;
            })
            .join('\n');

        interactiveCommandsSection = `${t('interactive_commands_title')}
${interactiveCommandLines}`;
    }

    return `
    ${CLI_VERSION}

    ${t('usage_title')}
      wh [query]           ${t('usage_direct_search')}
      wh                   ${t('usage_interactive')}

    ${t('description_title')}
      ${t('description_direct_mode')}
      ${t('description_interactive_mode')}

    FLAGS:
      --help, -h           ${t('options_help')}
      --version, -v        ${t('options_version')}
      --lang <en|id>       ${t('options_language')}

    ${interactiveCommandsSection}

    EXAMPLES:
      # Direct mode
      wh cat               ${t('examples_cat')}
      wh                   ${t('examples_interactive')}

      # Flags
      wh --help            ${t('example_flag_help')}
      wh --version         ${t('example_flag_version')}
      wh --lang en         ${t('example_flag_lang')}

      # Interactive mode
      /lang en             ${t('example_interactive_lang')}
      /sres 50             ${t('example_interactive_sres')}
      /q                   ${t('example_interactive_quit')}
    `;
};
