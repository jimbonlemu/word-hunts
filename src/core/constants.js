/**
 * Constants for Word Hunts CLI
 */
import fs from 'fs';
import { PACKAGE_JSON_PATH } from "../utils/paths.js";

const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
const VERSION = packageJson.version;
const PACKAGE_NAME = packageJson.name;

export const DEFAULT_CONFIG = {
  TABLE_MODE: true,
  MAX_RESULTS: 100,
  COLUMNS: 15,
  CELL_WIDTH: 12
};

export const CLI_VERSION = `${PACKAGE_NAME} v${VERSION}`;

export const HELP_COMMANDS = ["--help","-h"];
export const CHECK_VERSION_COMMANDS = ["--version","-v"];

export const QUIT_COMMANDS = ["/q", "/quit", "/exit"];
export const LANGUAGE_COMMANDS = ["/lang", "/language"];
export const REFRESH_UI_COMMANDS = ["/refs","/ui"];