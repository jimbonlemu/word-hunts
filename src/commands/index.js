// Commands index - exports all commands for easier import
export { default as helpCmd } from './help.js';
export { default as versionCmd } from './version.js';
export { default as langCmd } from './lang.js';
export { default as tbCmd } from './tb.js';
export { default as uiCmd } from './ui.js';
export { default as sresCmd } from './sres.js';
export { default as scolCmd } from './scol.js';
export { default as scwCmd } from './scw.js';

// Export all commands as an array
import helpCmd from './help.js';
import versionCmd from './version.js';
import langCmd from './lang.js';
import tbCmd from './tb.js';
import uiCmd from './ui.js';
import sresCmd from './sres.js';
import scolCmd from './scol.js';
import scwCmd from './scw.js';

export const allCommands = [
  helpCmd,
  versionCmd,
  langCmd,
  tbCmd,
  uiCmd,
  sresCmd,
  scolCmd,
  scwCmd
];