import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, "../..");

// Helper functions untuk membangun path
const fromRoot = (...segments) => path.join(PROJECT_ROOT, ...segments);
const fromData = (...segments) => fromSrc("data", ...segments);
const fromSrc = (...segments) => fromRoot("src", ...segments);
const fromI18n = (...segments) => fromSrc("i18n", ...segments);

// Path constants
export const WORDS_DICTIONARY_PATH = fromData("words_dictionary.json");
export const WORDS_SORTED_PATH = fromData("words_sorted.json");
export const CONFIG_PATH = fromData("config.json");
export const PACKAGE_JSON_PATH = fromRoot("package.json");

export const I18N_EN_PATH = fromI18n("en.json");
export const I18N_ID_PATH = fromI18n("id.json");