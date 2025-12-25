import { describe, it, expect, vi } from 'vitest';
import sresCmd from '../../src/commands/sres.js';

describe('SRES command functionality', () => {
  it('should have correct command metadata', () => {
    expect(sresCmd.meta).toHaveProperty('name');
    expect(sresCmd.meta).toHaveProperty('aliases');
    expect(sresCmd.meta).toHaveProperty('desc');
    expect(sresCmd.meta).toHaveProperty('usage');

    expect(sresCmd.meta.name).toBe('sres');
    expect(sresCmd.meta.aliases).toEqual([]);
    expect(sresCmd.meta.desc).toBe('interactive_command_result_limit');
    expect(sresCmd.meta.usage).toBe('/sres <number>');
  });

  it('should require an argument', () => {
    expect(sresCmd.args.req).toBe(true);
  });

  it('should only accept valid positive numbers', () => {
    expect(sresCmd.args.validate('1')).toBe(true);
    expect(sresCmd.args.validate('10')).toBe(true);
    expect(sresCmd.args.validate('100')).toBe(true);
    expect(sresCmd.args.validate('0')).toBe(false);
    expect(sresCmd.args.validate('-1')).toBe(false);
    expect(sresCmd.args.validate('abc')).toBe(false);
    expect(sresCmd.args.validate('')).toBe(false);
  });

  it('should update max results when valid argument provided', () => {
    const mockConfig = { MAX_RESULTS: 100 };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'limit_result_set_to' ? 'Max results limit set to' : key
    };

    // Execute command with valid number
    sresCmd.handler('50', 'sres', mockContext);

    expect(mockConfig.MAX_RESULTS).toBe(50);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Max results limit set to 50');
  });

  it('should handle different valid numbers correctly', () => {
    const mockConfig = { MAX_RESULTS: 100 };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'limit_result_set_to' ? 'Max results limit set to' : key
    };

    // Execute command with different valid number
    sresCmd.handler('200', 'sres', mockContext);

    expect(mockConfig.MAX_RESULTS).toBe(200);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Max results limit set to 200');
  });
});