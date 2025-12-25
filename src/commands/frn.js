export default {
    meta: {
        name: "frn",
        aliases: ['frnon', 'frnoff'],
        desc: "interactive_command_filter_roman_numerals",
        usage: "/frn [on|off]"
    },

    args: {
        req: false
    },

    handler: (arg, cmdName, context) => {
        const { config, saveConfig, logger, t } = context;

        let newFilterState;

        if (cmdName === 'frnon') {
            newFilterState = true;
        } else if (cmdName === 'frnoff') {
            newFilterState = false;
        } else {
            if (arg === 'on') {
                newFilterState = true;
            } else if (arg === 'off') {
                newFilterState = false;
            } else {
                newFilterState = !config.FILTER_ROMAN_NUMERALS;
            }
        }

        config.FILTER_ROMAN_NUMERALS = newFilterState;

        saveConfig(config);

        if (newFilterState) {
            logger.info(t('filter_roman_numerals_on') || 'Filter Roman numerals enabled');
        } else {
            logger.info(t('filter_roman_numerals_off') || 'Filter Roman numerals disabled');
        }
    }
};