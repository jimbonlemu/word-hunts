import { commandRegistry, numericCommands } from './command-registry.js';

/**
 * Parse command and return action object instead of executing directly
 */
export function parseCommand(cmd) {
    const key = cmd.trim().toLowerCase();

    // --- lookup registry with alias support ---
    for (const main in commandRegistry) {
        const entry = commandRegistry[main];

        if (key === main || (entry.aliases && entry.aliases.includes(key))) {
            return {
                done: true,
                msg: entry.msg,
                action: entry.action,
                value: entry.value
            };
        }
    }

    // --- numeric commands ---
    const parts = key.split(/\s+/);
    const keyword = parts[0];
    const val = parseInt(parts[1]);

    if (numericCommands[keyword]) {
        if (isNaN(val) || val <= 0) {
            return { done: true, msg: `Value '${keyword}' must be a number > 0.` };
        }

        return {
            done: true,
            msg: `${numericCommands[keyword].label} is set to ${val}.`,
            action: numericCommands[keyword].action,
            value: val
        };
    }

    return { done: false };
}

/**
 * Execute the parsed command action on config
 */
export function executeCommandAction(actionObj, config, saveConfig) {
    if (!actionObj.done || !actionObj.action) {
        return actionObj; // Return as is if no action needed
    }

    switch (actionObj.action) {
        case "SET_TABLE_MODE":
            config.TABLE_MODE = actionObj.value;
            saveConfig(config);
            break;
        case "SET_MAX_RESULTS":
            config.MAX_RESULTS = actionObj.value;
            saveConfig(config);
            break;
        case "SET_COLUMNS":
            config.COLUMNS = actionObj.value;
            saveConfig(config);
            break;
        case "SET_CELL_WIDTH":
            config.CELL_WIDTH = actionObj.value;
            saveConfig(config);
            break;
        default:
            return { ...actionObj, msg: `Unknown action: ${actionObj.action}` };
    }

    return actionObj;
}

/**
 * Handle command by parsing and executing
 */
export function handleCommand(cmd, config, saveConfig) {
    const parsed = parseCommand(cmd);
    return executeCommandAction(parsed, config, saveConfig);
}

