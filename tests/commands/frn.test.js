import { describe, it, expect, vi } from 'vitest';
import frnCmd from '../../src/commands/frn.js';

describe('FRN command functionality', () => {
  it('should have correct command metadata', () => {
    expect(frnCmd.meta).toHaveProperty('name');
    expect(frnCmd.meta).toHaveProperty('aliases');
    expect(frnCmd.meta).toHaveProperty('desc');
    expect(frnCmd.meta).toHaveProperty('usage');

    expect(frnCmd.meta.name).toBe('frn');
    expect(frnCmd.meta.aliases).toContain('frnon');
    expect(frnCmd.meta.aliases).toContain('frnoff');
    expect(frnCmd.meta.desc).toBe('interactive_command_filter_roman_numerals');
    expect(frnCmd.meta.usage).toBe('/frn [on|off]');
  });

  it('should require no argument', () => {
    expect(frnCmd.args.req).toBe(false);
  });

  it('should toggle filter roman numerals when frn command called without argument', () => {
    const mockConfig = { FILTER_ROMAN_NUMERALS: false };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'filter_roman_numerals_on' ? 'Filter Roman numerals enabled' : 'Filter Roman numerals disabled'
    };

    // Execute command - should toggle to true since current value is false
    frnCmd.handler(null, 'frn', mockContext);

    expect(mockConfig.FILTER_ROMAN_NUMERALS).toBe(true);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Filter Roman numerals enabled');
  });

  it('should enable filter when frn command called with "on" argument', () => {
    const mockConfig = { FILTER_ROMAN_NUMERALS: false };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'filter_roman_numerals_on' ? 'Filter Roman numerals enabled' : 'Filter Roman numerals disabled'
    };

    // Execute command with "on" argument
    frnCmd.handler('on', 'frn', mockContext);

    expect(mockConfig.FILTER_ROMAN_NUMERALS).toBe(true);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Filter Roman numerals enabled');
  });

  it('should disable filter when frn command called with "off" argument', () => {
    const mockConfig = { FILTER_ROMAN_NUMERALS: true };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'filter_roman_numerals_off' ? 'Filter Roman numerals disabled' : 'Filter Roman numerals enabled'
    };

    // Execute command with "off" argument
    frnCmd.handler('off', 'frn', mockContext);

    expect(mockConfig.FILTER_ROMAN_NUMERALS).toBe(false);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Filter Roman numerals disabled');
  });

  it('should enable filter when frnon alias is used', () => {
    const mockConfig = { FILTER_ROMAN_NUMERALS: false };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'filter_roman_numerals_on' ? 'Filter Roman numerals enabled' : 'Filter Roman numerals disabled'
    };

    // Execute command with frnon alias
    frnCmd.handler(null, 'frnon', mockContext);

    expect(mockConfig.FILTER_ROMAN_NUMERALS).toBe(true);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Filter Roman numerals enabled');
  });

  it('should disable filter when frnoff alias is used', () => {
    const mockConfig = { FILTER_ROMAN_NUMERALS: true };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'filter_roman_numerals_off' ? 'Filter Roman numerals disabled' : 'Filter Roman numerals enabled'
    };

    // Execute command with frnoff alias
    frnCmd.handler(null, 'frnoff', mockContext);

    expect(mockConfig.FILTER_ROMAN_NUMERALS).toBe(false);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Filter Roman numerals disabled');
  });
});