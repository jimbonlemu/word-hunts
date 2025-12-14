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
        
        // Parse the new columns value
        const newColumns = parseInt(arg);
        
        // Update config
        config.COLUMNS = newColumns;
        
        // Save the updated configuration
        saveConfig(config);
        
        // Output confirmation message
        logger.info(`${t('columns_set_to')} ${newColumns}`);
    },
}