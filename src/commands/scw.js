export default {
    meta: {
        name: "scw",
        aliases: [],
        desc: "Set cell width (auto or manual)",
        usage: "/scw <auto|number>"
    },
    args: {
        req: true,
        validate: (arg) => {
            if (arg === 'auto') return true;
            const num = parseInt(arg);
            return !isNaN(num) && num > 0;
        }
    },
    handler: (arg, cmdName, context) => {
        const { config, saveConfig, logger, t } = context;

        if (arg === 'auto') {
            // Set to auto mode
            config.CELL_WIDTH_MODE = 'auto';
            delete config.CELL_WIDTH; // Remove static width when in auto mode

            saveConfig(config);

            const autoWidthMsg = t('cell_width_auto_mode') || 'Cell width set to auto mode';
            logger.info(autoWidthMsg);
        } else {
            // Set to manual mode with specific width
            const width = parseInt(arg);

            config.CELL_WIDTH_MODE = 'manual';
            config.CELL_WIDTH = width;

            saveConfig(config);

            const manualWidthMsg = t('cell_width_manual_set') || 'Cell width set to';
            logger.info(`${manualWidthMsg} ${width}`);
        }
    },
}