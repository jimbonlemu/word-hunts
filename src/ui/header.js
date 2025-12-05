export function printHeader(config) {
  const lines = [
    `
===================================================================== 
██     ██ ▄████▄ █████▄  ████▄    ██  ██ ██  ██ ███  ██ ██████ ▄█████ 
██ ▄█▄ ██ ██  ██ ██▄▄██▄ ██  ██   ██████ ██  ██ ██ ▀▄██   ██   ▀▀▀▄▄▄ 
 ▀██▀██▀  ▀████▀ ██   ██ ████▀    ██  ██ ▀████▀ ██   ██   ██   █████▀
=====================================================================
    `,
    
    `TABLE MODE : ${config.TABLE_MODE ? "ON" : "OFF"}`,
    `MAX RESULTS: ${config.MAX_RESULTS}`,
    `COLUMNS    : ${config.COLUMNS}`,
    `CELL WIDTH : ${config.CELL_WIDTH}`,
    "Commands:",
    "  table on/off  (aliases tbon/tboff)",
    "  sres <num>    (set limit result)",
    "  scol <num>    (set columns)",
    "  scw  <num>    (set cell width)",
    "  getui         (show UI)",
    "  /q            (quit)",
    ""
  ];
  console.log(lines.join("\n"));
}
