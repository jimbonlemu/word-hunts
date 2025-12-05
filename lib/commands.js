// command registry + numeric command mapping
export const commandRegistry = {
    "table on": {
        aliases: ["tbon"],
        exec: (config, setters) => { config.TABLE_MODE = true; setters.saveConfig(); },
        msg: "Table active."
    },
    "table off": {
        aliases: ["tboff"],
        exec: (config, setters) => { config.TABLE_MODE = false; setters.saveConfig(); },
        msg: "Table inactive."
    }
};

// numeric commands mapping
export const numericCommands = {
    sres: { label: "Limit Result", setter: "setMaxResults" },
    scol: { label: "Number of Columns", setter: "setColumns" },
    scw: { label: "Cell Width", setter: "setCellWidth" }
};

export function handleCommand(cmd, config, setters) {
    const key = cmd.trim().toLowerCase();

    // --- lookup registry with alias support ---
    for (const main in commandRegistry) {
        const entry = commandRegistry[main];

        if (key === main || (entry.aliases && entry.aliases.includes(key))) {
            entry.exec(config, setters);
            return { done: true, msg: entry.msg };
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

        const setterName = numericCommands[keyword].setter;

        if (typeof setters[setterName] === "function") {
            setters[setterName](val);
            setters.saveConfig();
            return { done: true, msg: `${numericCommands[keyword].label} is set to ${val}.` };
        } else {
            return { done: true, msg: `Setter ${setterName} not found.` };
        }
    }

    return { done: false };
}

