import { translate } from '../i18n/index.js';
import { formatCommandEntry } from '../../utils/ui-format.js';

export function printHeader(config) {
  const { translations } = config;

  // Configuration items to display in header
  const headerItems = [
    { key: 'header_table_mode', value: config.TABLE_MODE ? "ON" : "OFF" },
    { key: 'header_max_results', value: config.MAX_RESULTS },
    { key: 'header_columns', value: config.COLUMNS },
    { key: 'header_set_cell_width', value: (config.CELL_WIDTH_MODE === 'manual' && config.CELL_WIDTH !== undefined) ? config.CELL_WIDTH : 'auto' }
  ].map(item => ({
    label: translate(translations, item.key),
    value: item.value
  }));

  // Command definitions with their usage and description keys
  const commands = [
    { cmd: 'tbon/tboff', usage: '', desc: 'header_table_on_off' },
    { cmd: '/sres', usage: '<num>', desc: 'header_set_result_limit' },
    { cmd: '/scol', usage: '<num>', desc: 'header_set_columns' },
    { cmd: '/scw', usage: '<auto|num>', desc: 'interactive_command_cell_width' },
    { cmd: '/lang', usage: '<code>', desc: 'header_set_language' },
    { cmd: '/refs, /ui', usage: '', desc: 'header_get_ui' },
    { cmd: '/q', usage: '', desc: 'header_quit' }
  ];

  // Format command entries with proper alignment
  const commandLines = commands.map(({ cmd, usage, desc }) =>
    formatCommandEntry(cmd, usage, desc, translations)
  );

  // Build the header content
  const headerContent = [
    `
=====================================================================
██     ██ ▄████▄ █████▄  ████▄    ██  ██ ██  ██ ███  ██ ██████ ▄█████
██ ▄█▄ ██ ██  ██ ██▄▄██▄ ██  ██   ██████ ██  ██ ██ ▀▄██   ██   ▀▀▀▄▄▄
 ▀██▀██▀  ▀████▀ ██   ██ ████▀    ██  ██ ▀████▀ ██   ██   ██   █████▀
=====================================================================
    `,

    // Configuration items
    ...headerItems.map(item => `${item.label.padEnd(15, ' ')}: ${item.value}`),

    // Commands section
    `${translate(translations, 'header_commands')}`,
    ...commandLines,
    ""
  ];

  console.log(headerContent.join("\n"));
}