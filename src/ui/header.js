import { translate } from '../i18n/index.js';

export function printHeader(config) {
  const { translations } = config;
  const headerItems = [
    { label: translate(translations, 'header_table_mode'), value: config.TABLE_MODE ? "ON" : "OFF" },
    { label: translate(translations, 'header_max_results'), value: config.MAX_RESULTS },
    { label: translate(translations, 'header_columns'), value: config.COLUMNS },
    { label: translate(translations, 'header_cell_width'), value: config.CELL_WIDTH }
  ];

  const lines = [
    `
=====================================================================
██     ██ ▄████▄ █████▄  ████▄    ██  ██ ██  ██ ███  ██ ██████ ▄█████
██ ▄█▄ ██ ██  ██ ██▄▄██▄ ██  ██   ██████ ██  ██ ██ ▀▄██   ██   ▀▀▀▄▄▄
 ▀██▀██▀  ▀████▀ ██   ██ ████▀    ██  ██ ▀████▀ ██   ██   ██   █████▀
=====================================================================
    `,

    ...headerItems.map(item => `${item.label.padEnd(15, ' ')}: ${item.value}`),

    `${translate(translations, 'header_commands')}`,
    `  tbon/tboff    (${translate(translations, 'header_table_on_off')})`,
    `  /sres <num>   (${translate(translations, 'header_set_result_limit')})`,
    `  /scol <num>   (${translate(translations, 'header_set_columns')})`,
    `  /scw  <num>   (${translate(translations, 'header_set_cell_width')})`,
    `  /lang <code>  (${translate(translations, 'header_set_language')})`,
    `  /refs, /ui    (${translate(translations, 'header_get_ui')})`,
    `  /q            (${translate(translations, 'header_quit')})`,
    ""
  ];
  console.log(lines.join("\n"));
}
