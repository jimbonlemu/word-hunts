export default {
    meta: {
        name: "scol",
        aliases: [],
        desc: "interactive_command_columns",
        usage: "/scol <number>"
    },
    args: {
        req: true,
        validate: (arg) => !isNaN(parseInt(arg)) && parseInt(arg) > 0
    },
    handler: (arg, cmdName, context) => {
        const { config, saveConfig, logger, t } = context;

        const newColumns = parseInt(arg);

        config.COLUMNS = newColumns;

        saveConfig(config);

        logger.info(`${t('columns_set_to')} ${newColumns}`);
    },
}