import { CLI_VERSION } from "./constants.js";

const PADDING = {
  FLAG: 25,
  COMMAND: 30,
  EXAMPLE: 20   
};

const formatFlagUsage = (cmd) => {
  const usageParts = cmd.usage.split(' / ');
  const mainUsage = usageParts[0].replace('wh ', '');
  const aliases = usageParts
    .slice(1)
    .filter(part => part.startsWith('-'))
    .join(', ');
  
  return aliases ? `${mainUsage}, ${aliases}` : mainUsage;
};

const formatCommandVariants = (cmd) => {
  const variants = [`/${cmd.name}`];
  if (cmd.aliases?.length > 0) {
    cmd.aliases.forEach(alias => variants.push(`/${alias}`));
  }
  return variants.join(', ');
};

const extractFirstOption = (usage) => {
  const match = usage?.match(/<([^>]+)>/);
  if (!match) return '';
  return match[1].split('|')[0];
};

const getExampleArg = (cmdName, usage, cmdMeta = {}) => {
  if (cmdMeta.help && cmdMeta.help.example) {
    return cmdMeta.help.example;
  }

  const argMap = {
    lang: 'en',
    sres: '50',
    scol: '10',
    scw: 'auto'
  };

  return argMap[cmdName] || extractFirstOption(usage);
};

const createPaddedLine = (content, padding, suffix = '') => {
  return `      ${content.padEnd(padding, ' ')}${suffix}`;
};

const buildFlagsSection = (commands, t) => {
  const flagCommands = commands.filter(cmd => 
    cmd.usage?.startsWith('wh --')
  );
  
  const lines = flagCommands.map(cmd => {
    const flagFormat = formatFlagUsage(cmd);
    return createPaddedLine(flagFormat, PADDING.FLAG, t(cmd.desc) || cmd.desc);
  });
  
  return `${t('flags_title')}\n${lines.join('\n')}`;
};

const buildInteractiveSection = (commands, t) => {
  const interactiveCommands = commands.filter(cmd => {
    // Exclude help command to prevent recursion
    if (cmd.name === 'help') return false;

    const interactiveCapableCommands = ['language']; // 'help' is excluded to prevent recursion
    return !cmd.usage || !cmd.usage.startsWith('wh --') || interactiveCapableCommands.includes(cmd.name);
  });

  const lines = interactiveCommands.map(cmd => {
    const variants = formatCommandVariants(cmd);
    return createPaddedLine(variants, PADDING.COMMAND, t(cmd.desc) || cmd.desc);
  });

  return `${t('interactive_commands_title')}\n${lines.join('\n')}`;
};

const buildFlagExamples = (commands, t) => {
  const flagCommands = commands.filter(cmd => cmd.usage?.startsWith('wh --'));
  
  return flagCommands.map(cmd => {
    const mainFlag = cmd.usage.replace('wh --', '--').split(' ')[0];
    const arg = extractFirstOption(cmd.usage);
    const example = `wh ${mainFlag}${arg ? ' ' + arg : ''}`;
    return createPaddedLine(example, PADDING.EXAMPLE, t(cmd.desc) || cmd.desc);
  }).join('\n      ');
};

const buildInteractiveExamples = (commands, t) => {
  const interactiveCommands = commands
    .filter(cmd => {
      const interactiveCapableCommands = ['help', 'language'];
      return !cmd.usage || !cmd.usage.startsWith('wh --') || interactiveCapableCommands.includes(cmd.name);
    })
    .slice(0, 3);

  return interactiveCommands.map(cmd => {
    const arg = getExampleArg(cmd.name, cmd.usage, cmd);
    const example = `/${cmd.name}${arg ? ' ' + arg : ''}`;
    return createPaddedLine(example, PADDING.EXAMPLE, t(cmd.desc) || cmd.desc);
  }).join('\n      ');
};

const buildExamplesSection = (commands, t) => {
  const flagExamples = buildFlagExamples(commands, t);
  const interactiveExamples = buildInteractiveExamples(commands, t);
  
  return `${t('examples_title') || 'EXAMPLES:'}
      # Direct mode
      wh cat               ${t('examples_cat')}
      wh                   ${t('examples_interactive')}

      # Flags
      ${flagExamples || ''}

      # Interactive mode
      ${interactiveExamples || ''}`;
};

export const generateHelpContent = (context) => {
  const { t = (key) => key, registry } = context;

  // Handle case where registry is null
  const commands = registry ? registry.getHelpInfo() : [];

  const flagsSection = buildFlagsSection(commands, t);

  // Only include interactive section if registry exists
  const interactiveSection = registry ? buildInteractiveSection(commands, t) : '';
  const examplesSection = buildExamplesSection(commands, t);

  return `
    ${CLI_VERSION}

    ${t('usage_title')}
      wh [query]           ${t('usage_direct_search')}
      wh                   ${t('usage_interactive')}

    ${t('description_title')}
      ${t('description_direct_mode')}
      ${t('description_interactive_mode')}

    ${flagsSection}

    ${interactiveSection}

    ${examplesSection}
    `;
};