import { describe, it, expect, vi } from 'vitest';
import tbCmd from '../../src/commands/tb.js';

describe('TB command functionality', () => {
  it('should have correct command metadata', () => {
    expect(tbCmd.meta).toHaveProperty('name');
    expect(tbCmd.meta).toHaveProperty('aliases');
    expect(tbCmd.meta).toHaveProperty('desc');
    expect(tbCmd.meta).toHaveProperty('usage');

    expect(tbCmd.meta.name).toBe('tb');
    expect(tbCmd.meta.aliases).toContain('tbon');
    expect(tbCmd.meta.aliases).toContain('tboff');
    expect(tbCmd.meta.desc).toBe('interactive_command_table_aliases');
    expect(tbCmd.meta.usage).toBe('tbon/tboff');
  });

  it('should require no argument', () => {
    expect(tbCmd.args.req).toBe(false);
  });

  it('should enable table mode when tbon alias is used', () => {
    const mockConfig = { TABLE_MODE: false };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'table_on' ? 'Table active.' : 'Table inactive.'
    };

    // Execute command with tbon alias
    tbCmd.handler(null, 'tbon', mockContext);

    expect(mockConfig.TABLE_MODE).toBe(true);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Table active.');
  });

  it('should disable table mode when tboff alias is used', () => {
    const mockConfig = { TABLE_MODE: true };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'table_off' ? 'Table inactive.' : 'Table active.'
    };

    // Execute command with tboff alias
    tbCmd.handler(null, 'tboff', mockContext);

    expect(mockConfig.TABLE_MODE).toBe(false);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Table inactive.');
  });

  it('should toggle table mode when tb command called without argument', () => {
    const mockConfig = { TABLE_MODE: false };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'table_on' ? 'Table active.' : 'Table inactive.'
    };

    // Execute command - should toggle to true since current value is false
    tbCmd.handler(null, 'tb', mockContext);

    expect(mockConfig.TABLE_MODE).toBe(true);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Table active.');
  });

  it('should enable table mode when tb command called with "on" argument', () => {
    const mockConfig = { TABLE_MODE: false };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'table_on' ? 'Table active.' : 'Table inactive.'
    };

    // Execute command with "on" argument
    tbCmd.handler('on', 'tb', mockContext);

    expect(mockConfig.TABLE_MODE).toBe(true);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Table active.');
  });

  it('should disable table mode when tb command called with "off" argument', () => {
    const mockConfig = { TABLE_MODE: true };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'table_off' ? 'Table inactive.' : 'Table active.'
    };

    // Execute command with "off" argument
    tbCmd.handler('off', 'tb', mockContext);

    expect(mockConfig.TABLE_MODE).toBe(false);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Table inactive.');
  });
});