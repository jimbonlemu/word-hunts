export default {
    meta: {
        name: "tb",
        aliases: ['tbon', 'tboff'],
        desc: 'interactive_command_table_aliases',
        usage: 'tbon/tboff'
    },

    args: {
        req: false
    },

    handler: (arg, cmdName, context) => {
        const { config, saveConfig, logger, t } = context;

        let newTableMode;
        if (cmdName === 'tbon' || (cmdName === 'tb' && arg === 'on')) {
            newTableMode = true;
        } else if (cmdName === 'tboff' || (cmdName === 'tb' && arg === 'off')) {
            newTableMode = false;
        } else {
            newTableMode = !config.TABLE_MODE;
        }

        config.TABLE_MODE = newTableMode;

        saveConfig(config);

        if (newTableMode) {
            logger.info(t('table_on') || 'Table mode enabled');
        } else {
            logger.info(t('table_off') || 'Table mode disabled');
        }
    }
};