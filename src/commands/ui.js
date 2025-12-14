import { printHeader } from "../services/ui/header.js";

export default {
    meta: {
        name: "ui",
        aliases: ['refs'],
        desc: 'interactive_command_refresh',
        usage: '/ui, /refs'
    },

    args: {
        req: false
    },

    handler: (arg, cmdName, context) => {
        const { logger, t, config } = context;

        // Print the header UI
        if (config) {
            printHeader(config);
        } else {
            logger.info(t('ui_refreshed') || 'UI refreshed');
        }
    },

}