import { describe, it, expect, vi } from 'vitest';
import versionCmd from '../../src/commands/version.js';
import { CLI_VERSION } from '../../src/utils/constants.js';

describe('VERSION command functionality', () => {
  it('should have correct command metadata', () => {
    expect(versionCmd.meta).toHaveProperty('name');
    expect(versionCmd.meta).toHaveProperty('aliases');
    expect(versionCmd.meta).toHaveProperty('desc');
    expect(versionCmd.meta).toHaveProperty('usage');

    expect(versionCmd.meta.name).toBe('version');
    expect(versionCmd.meta.aliases).toContain('v');
    expect(versionCmd.meta.desc).toBe('options_version');
    expect(versionCmd.meta.usage).toBe('wh --version / -v');
  });

  it('should require no argument', () => {
    expect(versionCmd.args.req).toBe(false);
  });

  it('should display the CLI version when executed', () => {
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      logger: mockLogger,
      t: (key) => key
    };

    // Execute command
    versionCmd.handler(null, 'version', mockContext);

    expect(mockLogger.info).toHaveBeenCalledWith(CLI_VERSION);
  });

  it('should work with alias "v"', () => {
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      logger: mockLogger,
      t: (key) => key
    };

    // Execute command with alias
    versionCmd.handler(null, 'v', mockContext);

    expect(mockLogger.info).toHaveBeenCalledWith(CLI_VERSION);
  });
});