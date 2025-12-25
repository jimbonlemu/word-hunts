export default {
    meta: {
        name: "sml",
        aliases: ['sreswl', 'swl'],
        desc: "interactive_command_set_min_length",
        usage: "/sml <number>"
    },

    args: {
        req: true,
        validate: (arg) => !isNaN(parseInt(arg)) && parseInt(arg) >= 1 && parseInt(arg) <= 20
    },

    handler: (arg, cmdName, context) => {
        const { config, saveConfig, logger, t } = context;

        // Parse the new min word length value
        const newMinLength = parseInt(arg);

        // Update config
        config.MIN_WORD_LENGTH = newMinLength;

        // Save the updated configuration
        saveConfig(config);

        // Output confirmation message
        logger.info(`${t('min_word_length_set_to')} ${newMinLength}`);
    }
};