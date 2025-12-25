import { describe, it, expect, vi } from 'vitest';
import scolCmd from '../../src/commands/scol.js';

describe('SCOL command functionality', () => {
  it('should have correct command metadata', () => {
    expect(scolCmd.meta).toHaveProperty('name');
    expect(scolCmd.meta).toHaveProperty('aliases');
    expect(scolCmd.meta).toHaveProperty('desc');
    expect(scolCmd.meta).toHaveProperty('usage');

    expect(scolCmd.meta.name).toBe('scol');
    expect(scolCmd.meta.aliases).toEqual([]);
    expect(scolCmd.meta.desc).toBe('interactive_command_columns');
    expect(scolCmd.meta.usage).toBe('/scol <number>');
  });

  it('should require an argument', () => {
    expect(scolCmd.args.req).toBe(true);
  });

  it('should only accept valid positive numbers', () => {
    expect(scolCmd.args.validate('1')).toBe(true);
    expect(scolCmd.args.validate('10')).toBe(true);
    expect(scolCmd.args.validate('100')).toBe(true);
    expect(scolCmd.args.validate('0')).toBe(false);
    expect(scolCmd.args.validate('-1')).toBe(false);
    expect(scolCmd.args.validate('abc')).toBe(false);
    expect(scolCmd.args.validate('')).toBe(false);
  });

  it('should update columns when valid argument provided', () => {
    const mockConfig = { COLUMNS: 15 };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'columns_set_to' ? 'Columns set to' : key
    };

    // Execute command with valid number
    scolCmd.handler('10', 'scol', mockContext);

    expect(mockConfig.COLUMNS).toBe(10);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Columns set to 10');
  });

  it('should handle different valid numbers correctly', () => {
    const mockConfig = { COLUMNS: 15 };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'columns_set_to' ? 'Columns set to' : key
    };

    // Execute command with different valid number
    scolCmd.handler('25', 'scol', mockContext);

    expect(mockConfig.COLUMNS).toBe(25);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Columns set to 25');
  });
});