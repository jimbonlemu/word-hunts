import fs from "fs";
import { CONFIG_PATH } from "../utils/paths.js";
import { loadTranslations } from "../i18n/index.js";

const configPath = CONFIG_PATH;

let defaultConfig = {
    TABLE_MODE: true,
    MAX_RESULTS: 100,
    COLUMNS: 15,
    CELL_WIDTH: 12,
    LANGUAGE: 'en'
};

export function loadConfig() {
    let config;

    if (fs.existsSync(configPath)) {
        try {
            const raw = fs.readFileSync(configPath, "utf8");
            const parsed = JSON.parse(raw);
            config = { ...defaultConfig, ...parsed };
        } catch (e) {
            console.error("Error reading config.json, using defaults.", e);
            config = defaultConfig;
        }
    } else {
        config = defaultConfig;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    }

    // Load translations for the configured language
    const { translations } = loadTranslations(config.LANGUAGE);
    config.translations = translations;

    return config;
}

export function saveConfig(newConfig) {
    // Create a copy without the translations object before saving
    const { translations, ...configToSave } = newConfig;
    fs.writeFileSync(configPath, JSON.stringify(configToSave, null, 2));
}
