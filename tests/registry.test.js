import { describe, it, expect, vi } from 'vitest';
import { createCommandRegistry } from '../src/services/core/command-registry.js';
import { logger } from '../src/utils/logger.js';

// Mock the logger to prevent stderr output during tests
vi.mock('../src/utils/logger.js', async () => {
  const actual = await vi.importActual('../src/utils/logger.js');
  return {
    ...actual,
    logger: {
      ...actual.logger,
      error: vi.fn(), // Mock error to prevent stderr output
      info: vi.fn(),
      warn: vi.fn(),
      success: vi.fn(),
      debug: vi.fn(),
      status: vi.fn(),
      highlight: vi.fn(),
      colored: vi.fn()
    }
  };
});

describe('Command Registry', () => {
  it('should register and execute commands properly', () => {
    const registry = createCommandRegistry();

    // Create a mock command
    const mockCommand = {
      meta: { name: 'test', aliases: ['t'], desc: 'test command' },
      args: { req: false },
      handler: vi.fn()
    };

    // Register the command
    registry.register(mockCommand);

    // Should be able to execute by name
    const context = { test: true };
    const result = registry.execute('test', null, context);

    // Should return true and call handler
    expect(result).toBe(true);
    expect(mockCommand.handler).toHaveBeenCalledWith(null, 'test', context);
  });

  it('should execute command using aliases', () => {
    const registry = createCommandRegistry();

    const mockCommand = {
      meta: { name: 'original', aliases: ['alias1', 'a'], desc: 'test command' },
      args: { req: false },
      handler: vi.fn()
    };

    registry.register(mockCommand);

    // Execute using alias
    const context = { test: true };
    registry.execute('a', null, context);

    // Should call handler with alias as second argument
    expect(mockCommand.handler).toHaveBeenCalledWith(null, 'a', context);
  });

  it('should return false for unknown commands', () => {
    const registry = createCommandRegistry();
    const result = registry.execute('nonexistent', null, {});
    expect(result).toBe(false);
  });

  it('should return help info for all registered commands', () => {
    const registry = createCommandRegistry();

    const command1 = {
      meta: { name: 'cmd1', aliases: ['c1'], desc: 'first command', usage: 'cmd1 usage' },
      args: { req: false },
      handler: () => {}
    };

    const command2 = {
      meta: { name: 'cmd2', aliases: ['c2'], desc: 'second command', usage: 'cmd2 usage' },
      args: { req: false },
      handler: () => {}
    };

    registry.register(command1);
    registry.register(command2);

    const helpInfo = registry.getHelpInfo();
    expect(helpInfo).toHaveLength(2);

    const names = helpInfo.map(cmd => cmd.name);
    expect(names).toContain('cmd1');
    expect(names).toContain('cmd2');
  });
});