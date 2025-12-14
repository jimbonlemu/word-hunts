export default {
  meta: {
    name: "quit",
    aliases: ['q', 'exit'],
    desc: "interactive_command_quit",
    usage: "/quit"
  },

  args: {
    req: false
  },

  handler: (arg, cmdName, context) => {
    const { logger, t } = context;
    const quitMessage = t ? t('quit_command') || 'Babayo!' : 'Babayo!';
    logger && logger.info(quitMessage);
    process.exit(0);
  }
}