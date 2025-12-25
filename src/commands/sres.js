export default {
    meta: {
        name: "sres",
        aliases: [],
        desc: "interactive_command_result_limit",
        usage: "/sres <number>"
    },
    args: {
        req: true,
        validate: (arg) => !isNaN(parseInt(arg)) && parseInt(arg) > 0
    },
    handler: (arg, cmdName, context) => {
        const { config, saveConfig, logger, t } = context;

        const newMaxResults = parseInt(arg);

        config.MAX_RESULTS = newMaxResults;

        saveConfig(config);

        logger.info(`${t('limit_result_set_to')} ${newMaxResults}`);
    },
}