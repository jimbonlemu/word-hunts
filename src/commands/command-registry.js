/**
 * Command registry for Word Hunts CLI
 */

export const commandRegistry = {
    "tbon": {
        action: "SET_TABLE_MODE",
        value: true,
        msgKey: "table_on"
    },
    "tboff": {
        action: "SET_TABLE_MODE",
        value: false,
        msgKey: "table_off"
    }
};

export const numericCommands = {
    "/sres": { action: "SET_MAX_RESULTS", labelKey: "limit_result" },
    "/scol": { action: "SET_COLUMNS", labelKey: "number_of_columns" },
    "/scw": { action: "SET_CELL_WIDTH", labelKey: "cell_width" }
};