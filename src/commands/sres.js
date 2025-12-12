export default {
    meta: {
        name: "sres",
        aliases: [],
        desc: "Set max results limit",
        usage: "/sres <number>"
    },
    args: {
        req: true,
        validate: (arg) => !isNaN(parseInt(arg)) && parseInt(arg) > 0
    },
    handler: (arg, cmdName, context) => {
        const { config, saveConfig, logger, t } = context;
        
        // Parse the new max results value
        const newMaxResults = parseInt(arg);
        
        // Update config
        config.MAX_RESULTS = newMaxResults;
        
        // Save the updated configuration
        saveConfig(config);
        
        // Output confirmation message
        logger.info(`${t('limit_result_set_to')} ${newMaxResults}`);
    },
}