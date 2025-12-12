import fs from "fs";
import { CONFIG_PATH } from "./paths.js";
import { DEFAULT_CONFIG } from "./constants.js";
import { loadTranslations } from "../services/i18n/index.js";

/**
 * Load configuration from file, with fallback to default configuration
 * @returns {Object} Configuration object with translations
 */
export function loadConfig() {
    let config;

    if (fs.existsSync(CONFIG_PATH)) {
        try {
            const raw = fs.readFileSync(CONFIG_PATH, "utf8");
            const parsed = JSON.parse(raw);
            config = { ...DEFAULT_CONFIG, ...parsed };
        } catch (e) {
            console.error("Error reading config.json, using defaults.", e);
            config = DEFAULT_CONFIG;
        }
    } else {
        config = DEFAULT_CONFIG;
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    }

    // Load translations for the configured language or default to 'en'
    const language = config.LANGUAGE || 'en';
    const { translations } = loadTranslations(language);
    config.translations = translations;
    config.LANGUAGE = language; // Ensure LANGUAGE is set

    // Add CELL_WIDTH if not present for backward compatibility with existing references
    if (config.CELL_WIDTH === undefined) {
        config.CELL_WIDTH = 12; // Default value for backward compatibility
    }

    return config;
}

/**
 * Save configuration to file
 * @param {Object} newConfig - Configuration object to save
 */
export function saveConfig(newConfig) {
    // Create a copy without the translations object before saving
    const { translations, ...configToSave } = newConfig;
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(configToSave, null, 2));
}