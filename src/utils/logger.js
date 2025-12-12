// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',  // Bold
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  // Foreground colors
  fgBlack: '\x1b[30m',
  fgRed: '\x1b[31m',
  fgGreen: '\x1b[32m',
  fgYellow: '\x1b[33m',
  fgBlue: '\x1b[34m',
  fgMagenta: '\x1b[35m',
  fgCyan: '\x1b[36m',
  fgWhite: '\x1b[37m',

  // Background colors
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};

export const logger = {
  content: (args) => console.log(args),
  success: (args) => console.log(`${colors.bright}${colors.fgGreen}[SUCCESS]${colors.reset} ${args}${colors.reset}`),
  error: (args) => console.error(`${colors.bright}${colors.fgRed}[ERROR]${colors.reset} ${args}${colors.reset}`),
  info: (args) => console.info(`${colors.bright}${colors.fgCyan}[INFO]${colors.reset} ${args}${colors.reset}`),
  warn: (args) => console.warn(`${colors.bright}${colors.fgYellow}[WARN]${colors.reset} ${args}${colors.reset}`),

  // Additional styled methods
  highlight: (args) => console.log(`${colors.bright}${colors.fgWhite}${args}${colors.reset}`),
  debug: (args) => console.log(`${colors.dim}[DEBUG]${colors.reset} ${args}${colors.reset}`),
  status: (args) => console.log(`${colors.bright}${colors.fgBlue}[STATUS]${colors.reset} ${args}${colors.reset}`),

  // Method to log with translation support
  t: (key, translations, fallback = key) => {
    return translations && translations[key] ? translations[key] : fallback;
  },

  // Method to log with custom color
  colored: (args, color) => console.log(`${color}${args}${colors.reset}`)
};