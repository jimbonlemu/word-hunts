import { describe, it, expect, vi } from 'vitest';
import scwCmd from '../../src/commands/scw.js';

describe('SCW command functionality', () => {
  it('should have correct command metadata', () => {
    expect(scwCmd.meta).toHaveProperty('name');
    expect(scwCmd.meta).toHaveProperty('aliases');
    expect(scwCmd.meta).toHaveProperty('desc');
    expect(scwCmd.meta).toHaveProperty('usage');

    expect(scwCmd.meta.name).toBe('scw');
    expect(scwCmd.meta.aliases).toEqual([]);
    expect(scwCmd.meta.desc).toBe('interactive_command_cell_width');
    expect(scwCmd.meta.usage).toBe('/scw <auto|number>');
  });

  it('should require an argument', () => {
    expect(scwCmd.args.req).toBe(true);
  });

  it('should only accept valid arguments (auto or positive number)', () => {
    expect(scwCmd.args.validate('auto')).toBe(true);
    expect(scwCmd.args.validate('10')).toBe(true);
    expect(scwCmd.args.validate('1')).toBe(true);
    expect(scwCmd.args.validate('0')).toBe(false);
    expect(scwCmd.args.validate('-1')).toBe(false);
    expect(scwCmd.args.validate('abc')).toBe(false);
    expect(scwCmd.args.validate('')).toBe(false);
  });

  it('should set to auto mode when "auto" argument provided', () => {
    const mockConfig = { CELL_WIDTH_MODE: 'manual', CELL_WIDTH: 12 };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'cell_width_auto_mode' ? 'Cell width set to auto mode' : 'Cell width set to'
    };

    // Execute command with "auto" argument
    scwCmd.handler('auto', 'scw', mockContext);

    expect(mockConfig.CELL_WIDTH_MODE).toBe('auto');
    expect(mockConfig.CELL_WIDTH).toBeUndefined(); // CELL_WIDTH should be deleted in auto mode
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Cell width set to auto mode');
  });

  it('should set to manual mode with specific width when number argument provided', () => {
    const mockConfig = { CELL_WIDTH_MODE: 'auto' };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'cell_width_manual_set' ? 'Cell width set to' : 'Cell width set to'
    };

    // Execute command with number argument
    scwCmd.handler('15', 'scw', mockContext);

    expect(mockConfig.CELL_WIDTH_MODE).toBe('manual');
    expect(mockConfig.CELL_WIDTH).toBe(15);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Cell width set to 15');
  });
});