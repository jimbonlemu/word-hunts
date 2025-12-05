/**
 * Command registry for Word Hunts CLI
 */

export const commandRegistry = {
    "table on": {
        aliases: ["tbon"],
        action: "SET_TABLE_MODE",
        value: true,
        msg: "Table active."
    },
    "table off": {
        aliases: ["tboff"],
        action: "SET_TABLE_MODE", 
        value: false,
        msg: "Table inactive."
    }
};

export const numericCommands = {
    sres: { label: "Limit Result", action: "SET_MAX_RESULTS" },
    scol: { label: "Number of Columns", action: "SET_COLUMNS" },
    scw: { label: "Cell Width", action: "SET_CELL_WIDTH" }
};