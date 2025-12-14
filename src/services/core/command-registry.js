import { logger } from "../../utils/logger.js";

// Factory function to create a command registry
export function createCommandRegistry() {
  let commands = new Map();

  return {
    // Private state accessor for debugging/testing if needed
    _getCommands: () => commands,

    /**
     * Register a command with its aliases
     */
    register: (command) => {
      const { name, aliases = [] } = command.meta;

      // Register main command
      commands.set(name, command);

      // Register aliases
      aliases.forEach(alias => {
        commands.set(alias, command);
      });
    },

    /**
     * Check if command exists
     */
    has: (name) => commands.has(name),

    /**
     * Get command by name
     */
    get: (name) => commands.get(name),

    /**
     * Execute a command
     */
    execute: (name, arg = null, context = {}) => {
      const command = commands.get(name);

      if (!command) {
        logger.error(`Unknown command: ${name}`);
        return false;
      }

      // Validate required arguments
      if (command.args.req && !arg) {
        logger.error(`Command '${name}' requires an argument`);

        // Check if we're in interactive mode by looking at context
        const isInteractive = context.isInteractive;
        let usageMessage = command.meta.usage;

        // If in interactive mode, convert command usage to slash format
        if (isInteractive) {
          // Replace command name in usage with slash format (e.g. "wh --lang <en|id>" becomes "/lang <en|id>")
          usageMessage = command.meta.usage.replace(/wh --\w+/, `/${name}`);
        }

        logger.info(`Usage: ${usageMessage}`);
        return false;
      }

      // Validate argument format
      if (command.args.validate && arg && !command.args.validate(arg)) {
        logger.error(`Invalid argument for '${name}'`);
        logger.info(`Usage: ${command.meta.usage}`);
        return false;
      }

      // Execute handler
      try {
        command.handler(arg, name, context); // Pass command name as 2nd arg for aliases and context as 3rd
        return true;
      } catch (err) {
        logger.error(`Command execution failed: ${err.message}`);
        return false;
      }
    },

    /**
     * Get all registered command names
     */
    list: () => {
      const names = new Set();
      commands.forEach((cmd) => {
        names.add(cmd.meta.name);
      });
      return Array.from(names);
    },

    /**
     * Get all commands with their metadata for help display
     */
    getHelpInfo: () => {
      const uniqueCommands = new Map();

      commands.forEach((cmd, name) => {
        const mainName = cmd.meta.name;

        // Only process each unique command once
        if (!uniqueCommands.has(mainName)) {
          // Store the full command metadata with all aliases
          uniqueCommands.set(mainName, {
            name: mainName,
            ...cmd.meta
          });
        }
      });

      return Array.from(uniqueCommands.values());
    }
  };
}

/**
 * Alternative: Pure functions implementation for command registry operations
 */

// Create an empty registry state
export function createEmptyRegistry() {
  return { commands: new Map() };
}

// Register a command in immutable way
export function registerCommand(registry, command) {
  const { name, aliases = [] } = command.meta;
  const newCommands = new Map(registry.commands);

  // Register main command
  newCommands.set(name, command);

  // Register aliases
  aliases.forEach(alias => {
    newCommands.set(alias, command);
  });

  return { ...registry, commands: newCommands };
}

// Check if command exists
export function hasCommand(registry, name) {
  return registry.commands.has(name);
}

// Get command by name
export function getCommand(registry, name) {
  return registry.commands.get(name);
}

// Execute a command
export function executeCommand(registry, name, arg = null, context = {}) {
  const command = registry.commands.get(name);

  if (!command) {
    logger.error(`Unknown command: ${name}`);
    return false;
  }

  // Validate required arguments
  if (command.args.req && !arg) {
    logger.error(`Command '${name}' requires an argument`);
    logger.info(`Usage: ${command.meta.usage}`);
    return false;
  }

  // Validate argument format
  if (command.args.validate && arg && !command.args.validate(arg)) {
    logger.error(`Invalid argument for '${name}'`);
    logger.info(`Usage: ${command.meta.usage}`);
    return false;
  }

  // Execute handler
  try {
    command.handler(arg, name, context); // Pass command name as 2nd arg for aliases and context as 3rd
    return true;
  } catch (err) {
    logger.error(`Command execution failed: ${err.message}`);
    return false;
  }
}

// Get all registered command names
export function listCommands(registry) {
  const names = new Set();
  registry.commands.forEach((cmd) => {
    names.add(cmd.meta.name);
  });
  return Array.from(names);
}

/**
 * Dynamic command loading utilities
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name for this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to load all command files from the commands directory
export async function loadCommandsFromDirectory(commandsDir) {
  // For now, returning a static approach since we can't easily scan files in this environment
  // In a real implementation, we'd scan the directory and dynamically import each command file
  const commandFiles = fs.readdirSync(commandsDir).filter(file =>
    file.endsWith('.js') && !file.startsWith('_') && file !== 'index.js'
  );

  const commands = [];
  for (const file of commandFiles) {
    const filePath = path.join(commandsDir, file);
    // Using dynamic import to load the command
    const commandModule = await import(filePath);
    commands.push(commandModule.default);
  }

  return commands;
}

// Alternative static function for loading commands if dynamic import is not suitable
export function loadCommandsWithoutDynamicImport() {
  // This returns the same commands as before, but we could make this more modular
  // For now, we'll return an empty array, and commands will be registered separately
  return [];
}