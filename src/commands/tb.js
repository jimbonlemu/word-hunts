export default {
    meta: {
        name: "tb",
        aliases: ['tbon', 'tboff'],
        desc: 'Toggle table mode',
        usage: 'tbon/tboff'
    },

    args: {
        req: false
    },

    handler: (arg, cmdName, context) => {
        const { config, saveConfig, logger, t } = context;

        // Determine the new table mode based on the command name
        let newTableMode;
        if (cmdName === 'tbon' || (cmdName === 'tb' && arg === 'on')) {
            newTableMode = true;
        } else if (cmdName === 'tboff' || (cmdName === 'tb' && arg === 'off')) {
            newTableMode = false;
        } else {
            // If called as just 'tb' without argument, toggle current state
            newTableMode = !config.TABLE_MODE;
        }

        // Update config
        config.TABLE_MODE = newTableMode;

        // Save the updated configuration
        saveConfig(config);

        // Output message based on the new state
        if (newTableMode) {
            logger.info(t('table_on') || 'Table mode enabled');
        } else {
            logger.info(t('table_off') || 'Table mode disabled');
        }
    }
};