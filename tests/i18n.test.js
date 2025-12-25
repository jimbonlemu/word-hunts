import { describe, it, expect, vi } from 'vitest';
import { loadTranslations } from '../src/services/i18n/index.js';

// Mock console.error to prevent stderr output during tests
const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('i18n (Internationalization) functionality', () => {
  it('should load English translations correctly', () => {
    const { translations } = loadTranslations('en');

    // Check that required keys exist
    expect(translations).toHaveProperty('usage_title');
    expect(translations).toHaveProperty('options_help');
    expect(translations).toHaveProperty('interactive_commands_title');
    expect(translations).toHaveProperty('quit_command');

    // Check specific English values
    expect(translations.usage_title).toBe('USAGE:');
    expect(translations.options_help).toBe('Show this help');
    expect(translations.quit_command).toBe('Babayo!'); // This is the updated value
  });

  it('should load Indonesian translations correctly', () => {
    const { translations } = loadTranslations('id');

    // Check that required keys exist
    expect(translations).toHaveProperty('usage_title');
    expect(translations).toHaveProperty('options_help');
    expect(translations).toHaveProperty('interactive_commands_title');
    expect(translations).toHaveProperty('quit_command');

    // Check specific Indonesian values
    expect(translations.usage_title).toBe('PENGGUNAAN:');
    expect(translations.options_help).toBe('Tampilkan bantuan ini');
    expect(translations.quit_command).toBe('Babayo!'); // Updated to use Babayo! for Indonesian as well
  });

  it('should fallback to English for unknown language', () => {
    const { translations } = loadTranslations('unknown');

    // Should fallback to English
    expect(translations.usage_title).toBe('USAGE:');
    expect(translations.options_help).toBe('Show this help');
  });

  it('should have matching keys between English and Indonesian translations', () => {
    const enTranslations = loadTranslations('en').translations;
    const idTranslations = loadTranslations('id').translations;

    const enKeys = Object.keys(enTranslations).sort();
    const idKeys = Object.keys(idTranslations).sort();

    // All English keys should exist in Indonesian
    for (const key of enKeys) {
      expect(idTranslations).toHaveProperty(key);
    }

    // All Indonesian keys should exist in English (bidirectional check)
    for (const key of idKeys) {
      expect(enTranslations).toHaveProperty(key);
    }
  });

  it('should handle translation function properly', () => {
    const { translations } = loadTranslations('en');

    // Create the same translation function pattern used in the app
    const t = (key) => translations[key] || key;

    // Test translation function
    expect(t('usage_title')).toBe('USAGE:');
    expect(t('options_help')).toBe('Show this help');
    expect(t('nonexistent_key')).toBe('nonexistent_key'); // Should return key if not found
  });
});