import fs from 'fs';
import { PACKAGE_JSON_PATH } from "../utils/paths.js";

const { name, version } = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));

export const DEFAULT_CONFIG = {
    TABLE_MODE: true,
    MAX_RESULTS: 100,
    COLUMNS: 15,
    LANGUAGE: 'en'
};

export const CLI_VERSION = `${name} v${version}`;