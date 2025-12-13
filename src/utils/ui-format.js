/**
 * UI Formatting utilities
 */

import { translate } from '../services/i18n/index.js';

/**
 * Format command entry with proper alignment
 * @param {string} cmd - Command name
 * @param {string} usage - Command usage
 * @param {string} desc - Translation key for description
 * @param {object} translations - Translation object
 * @returns {string} - Formatted command entry
 */
export function formatCommandEntry(cmd, usage, desc, translations) {
  const fullCmd = usage ? `${cmd} ${usage}` : cmd;
  // Calculate padding to align descriptions
  const padding = ' '.repeat(Math.max(0, 14 - fullCmd.length));
  return `  ${fullCmd}${padding}(${translate(translations, desc)})`;
}