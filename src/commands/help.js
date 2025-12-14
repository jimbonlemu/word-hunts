import { generateHelpContent } from "../utils/help-renderer.js";

export default {
  meta: {
    name: "help",
    aliases: ['h'],
    desc: "options_help",
    usage: "wh --help / -h"
  },

  args: {
    req: false
  },

  handler: (arg, cmdName, context) => {
    const { logger } = context;
    const helpContent = generateHelpContent(context);
    logger.content(helpContent);
  }
}