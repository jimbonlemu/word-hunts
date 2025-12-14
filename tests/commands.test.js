import { describe, it, expect, vi } from 'vitest';
import langCmd from '../src/commands/lang.js';

describe('Language command functionality', () => {
  it('should update config language and translations when executed', () => {
    // Mock the context that would be passed to the handler
    const mockConfig = {
      LANGUAGE: 'en',
      translations: { existing: 'translations' }
    };
    
    const mockSaveConfig = vi.fn();
    const mockLogger = {
      info: vi.fn()
    };
    
    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      // Mock the t function for translations
      t: (key) => key === 'language_switched_to' ? 'Language switched to' : key
    };
    
    // Execute the command with 'id' as argument
    langCmd.handler('id', 'lang', mockContext);
    
    // Should update config
    expect(mockConfig.LANGUAGE).toBe('id');
    expect(typeof mockConfig.translations).toBe('object'); // Should be updated translations
    expect(Object.keys(mockConfig.translations).length).toBeGreaterThan(0);
    
    // Should save the config
    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    
    // Should log the switch message
    expect(mockLogger.info).toHaveBeenCalledWith('Language switched to id');
  });

  it('should handle invalid language argument gracefully', () => {
    const mockConfig = {
      LANGUAGE: 'en',
      translations: { existing: 'translations' }
    };
    
    const mockSaveConfig = vi.fn();
    const mockLogger = {
      info: vi.fn(),
      error: vi.fn()
    };
    
    const mockContext = {
      config: mockConfig,
      saveConfig: mockSaveConfig,
      logger: mockLogger,
      t: (key) => key
    };
    
    // Should validate first before handler is called
    // The validation is in the args.req section
    expect(langCmd.args.validate('invalid')).toBe(false);
    expect(langCmd.args.validate('en')).toBe(true);
    expect(langCmd.args.validate('id')).toBe(true);
  });

  it('should have correct command metadata', () => {
    expect(langCmd.meta).toHaveProperty('name');
    expect(langCmd.meta).toHaveProperty('aliases');
    expect(langCmd.meta).toHaveProperty('desc');
    expect(langCmd.meta).toHaveProperty('usage');
    
    expect(langCmd.meta.name).toBe('language');
    expect(langCmd.meta.aliases).toContain('lang');
    expect(langCmd.meta.desc).toBe('interactive_command_language');
    expect(langCmd.meta.usage).toBe('wh --lang <en|id>');
  });

  it('should require an argument', () => {
    expect(langCmd.args.req).toBe(true);
  });

  it('should only accept valid language codes', () => {
    expect(langCmd.args.validate('en')).toBe(true);
    expect(langCmd.args.validate('id')).toBe(true);
    expect(langCmd.args.validate('fr')).toBe(false);
    expect(langCmd.args.validate('invalid')).toBe(false);
    expect(langCmd.args.validate('')).toBe(false);
  });
});

// Also test quit command since we made changes to it
import quitCmd from '../src/commands/quit.js';

describe('Quit command functionality', () => {
  it('should exit the process when executed', () => {
    // We can't actually test process.exit in a safe way in tests
    // But we can at least check that the command has the right structure
    expect(quitCmd.meta).toHaveProperty('name');
    expect(quitCmd.meta).toHaveProperty('aliases');
    expect(quitCmd.meta).toHaveProperty('desc');
    
    expect(quitCmd.meta.name).toBe('quit');
    expect(quitCmd.meta.aliases).toContain('q');
    expect(quitCmd.meta.aliases).toContain('exit');
    expect(quitCmd.meta.desc).toBe('interactive_command_quit');
  });

  it('should have updated quit message', () => {
    // Create a mock context with t function
    const mockContext = {
      t: (key) => key === 'quit_command' ? 'Babayo!' : 'Goodbye!'
    };
    
    const mockLogger = { info: vi.fn() };
    
    // Mock process.exit to prevent actual exit
    const originalExit = process.exit;
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((code) => {
      // Don't actually exit
    });
    
    quitCmd.handler(null, 'quit', { ...mockContext, logger: mockLogger });
    
    expect(mockLogger.info).toHaveBeenCalledWith('Babayo!');
    expect(exitSpy).toHaveBeenCalledWith(0);
    
    // Restore original process.exit
    process.exit = originalExit;
  });
});