import { CLI_VERSION } from "../utils/constants.js";

export default {
    meta: {
        name: "version",
        aliases: ['v'],
        desc: "Show version",
        usage: "wh --version / -v"
    },

    args: {
        req: false
    },

    handler: (arg, cmdName, context) => {
        const { logger, t } = context;

        logger.info(CLI_VERSION);
    },
};