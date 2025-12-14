/**
 * UI Formatting utilities
 */

import { translate } from '../services/i18n/index.js';

/**
 * Format command entry with proper alignment based on longest command
 * @param {string} cmd - Command name
 * @param {string} usage - Command usage
 * @param {string} desc - Translation key for description
 * @param {object} translations - Translation object
 * @param {number} maxCmdLength - Maximum length of all commands to align
 * @returns {string} - Formatted command entry
 */
export function formatCommandEntry(cmd, usage, desc, translations, maxCmdLength = 14) {
  const fullCmd = usage ? `${cmd} ${usage}` : cmd;
  // Calculate padding to align descriptions, ensuring at least 1 space between command and description
  const padding = ' '.repeat(maxCmdLength - fullCmd.length + 1);
  return `  ${fullCmd}${padding}(${translate(translations, desc)})`;
}