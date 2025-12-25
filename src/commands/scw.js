export default {
    meta: {
        name: "scw",
        aliases: [],
        desc: "interactive_command_cell_width",
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
            config.CELL_WIDTH_MODE = 'auto';
            delete config.CELL_WIDTH;

            saveConfig(config);

            const autoWidthMsg = t('cell_width_auto_mode') || 'Cell width set to auto mode';
            logger.info(autoWidthMsg);
        } else {
            const width = parseInt(arg);

            config.CELL_WIDTH_MODE = 'manual';
            config.CELL_WIDTH = width;

            saveConfig(config);

            const manualWidthMsg = t('cell_width_manual_set') || 'Cell width set to';
            logger.info(`${manualWidthMsg} ${width}`);
        }
    },
}