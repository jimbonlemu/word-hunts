import { loadTranslations } from "../services/i18n/index.js";

export default {
    meta: {
        name: "language",
        aliases: ['lang'],
        desc: "Switch language (en/id)",
        usage: "wh --lang <en|id>"
    },

    args: {
        req: true,
        validate: (arg) => ['en', 'id'].includes(arg)
    },

    handler: (arg, cmdName, context) => {
        const { config, saveConfig, logger } = context;

        // Update language in config
        config.LANGUAGE = arg;

        // Update translations in config
        const { translations } = loadTranslations(arg);
        config.translations = translations;

        // Save the updated configuration
        saveConfig(config);

        const message = context.t ? `${context.t('language_switched_to')} ${arg}` || `Language switched to ${arg}` : `Language switched to ${arg}`;
        logger.info(message);
    }
};
