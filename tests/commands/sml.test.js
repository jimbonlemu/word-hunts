import { describe, it, expect, vi } from 'vitest';
import smlCmd from '../../src/commands/sml.js';

describe('SML command functionality', () => {
  it('should have correct command metadata', () => {
    expect(smlCmd.meta).toHaveProperty('name');
    expect(smlCmd.meta).toHaveProperty('aliases');
    expect(smlCmd.meta).toHaveProperty('desc');
    expect(smlCmd.meta).toHaveProperty('usage');

    expect(smlCmd.meta.name).toBe('sml');
    expect(smlCmd.meta.aliases).toContain('sreswl');
    expect(smlCmd.meta.aliases).toContain('swl');
    expect(smlCmd.meta.desc).toBe('interactive_command_set_min_length');
    expect(smlCmd.meta.usage).toBe('/sml <number>');
  });

  it('should require an argument', () => {
    expect(smlCmd.args.req).toBe(true);
  });

  it('should only accept valid positive numbers between 1 and 20', () => {
    expect(smlCmd.args.validate('1')).toBe(true);
    expect(smlCmd.args.validate('10')).toBe(true);
    expect(smlCmd.args.validate('20')).toBe(true);
    expect(smlCmd.args.validate('0')).toBe(false);
    expect(smlCmd.args.validate('-1')).toBe(false);
    expect(smlCmd.args.validate('21')).toBe(false);
    expect(smlCmd.args.validate('abc')).toBe(false);
    expect(smlCmd.args.validate('')).toBe(false);
  });

  it('should update minimum word length when valid argument provided', () => {
    const mockConfig = { MIN_WORD_LENGTH: 2 };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'min_word_length_set_to' ? 'Minimum word length set to' : key
    };

    // Execute command with valid number
    smlCmd.handler('5', 'sml', mockContext);

    expect(mockConfig.MIN_WORD_LENGTH).toBe(5);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Minimum word length set to 5');
  });

  it('should handle different valid numbers correctly', () => {
    const mockConfig = { MIN_WORD_LENGTH: 2 };
    const mockSaveConfig = vi.fn();
    const mockLogger = { info: vi.fn() };

    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key === 'min_word_length_set_to' ? 'Minimum word length set to' : key
    };

    // Execute command with different valid number
    smlCmd.handler('15', 'sml', mockContext);

    expect(mockConfig.MIN_WORD_LENGTH).toBe(15);
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(mockLogger.info).toHaveBeenCalledWith('Minimum word length set to 15');
  });
});