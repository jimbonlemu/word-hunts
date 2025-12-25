import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateHelpContent } from '../src/utils/help-renderer.js';
import { createCommandRegistry } from '../src/services/core/command-registry.js';

describe('Help functionality', () => {
  it('should generate help content with all required sections', () => {
    const mockTranslations = {
      usage_title: 'USAGE:',
      description_title: 'DESCRIPTION:',
      flags_title: 'FLAGS:',
      interactive_commands_title: 'INTERACTIVE COMMANDS',
      examples_title: 'EXAMPLES:',
      options_help: 'Show this help',
      options_version: 'Show version',
      options_language: 'Switch language (en/id)',
      example_flag_help: 'Show help',
      example_flag_version: 'Show version',
      example_flag_lang: 'Switch to English language',
      example_interactive_lang: 'Switch language in interactive mode',
      example_interactive_sres: 'Set max results to 50',
      example_interactive_quit: 'Exit interactive mode',
      examples_cat: 'Search words starting with "cat"',
      examples_interactive: 'Start interactive mode',
      description_direct_mode: 'Direct mode: Search for words instantly with "wh [query]"',
      description_interactive_mode: 'Interactive mode: Type queries continuously, use commands with "/" prefix',
      // Add any missing keys that might be used
      usage_direct_search: 'Search for words starting with [query]',
      usage_interactive: 'Start interactive mode',
    };

    const mockContext = {
      t: (key) => mockTranslations[key] || key,  // Return translation if exists, else key
      registry: createCommandRegistry()
    };

    // Register a few commands for testing
    const helpCmd = {
      meta: { name: 'help', aliases: ['h'], desc: 'options_help', usage: 'wh --help / -h' },
      args: { req: false },
      handler: () => {}
    };
    
    const versionCmd = {
      meta: { name: 'version', aliases: ['v'], desc: 'options_version', usage: 'wh --version / -v' },
      args: { req: false },
      handler: () => {}
    };

    mockContext.registry.register(helpCmd);
    mockContext.registry.register(versionCmd);

    const helpContent = generateHelpContent(mockContext);

    // Check that all required sections are present
    expect(helpContent).toContain('USAGE:');
    expect(helpContent).toContain('DESCRIPTION:');
    expect(helpContent).toContain('FLAGS:');
    expect(helpContent).toContain('INTERACTIVE COMMANDS');
    expect(helpContent).toContain('EXAMPLES:');

    // Check that version flag appears in the content
    expect(helpContent).toContain('--version, -v');
    // Help command should not be in the interactive commands list to prevent recursion
    expect(helpContent).not.toContain('/help, /h');
  });

  it('should handle missing registry gracefully', () => {
    const mockTranslations = {
      usage_title: 'USAGE:',
      description_title: 'DESCRIPTION:',
      flags_title: 'FLAGS:',
      interactive_commands_title: 'INTERACTIVE COMMANDS',
      examples_title: 'EXAMPLES:',
      options_help: 'Show this help',
      options_version: 'Show version',
      options_language: 'Switch language (en/id)',
      example_flag_help: 'Show help',
      example_flag_version: 'Show version',
      example_flag_lang: 'Switch to English language',
      example_interactive_lang: 'Switch language in interactive mode',
      example_interactive_sres: 'Set max results to 50',
      example_interactive_quit: 'Exit interactive mode',
      examples_cat: 'Search words starting with "cat"',
      examples_interactive: 'Start interactive mode',
      description_direct_mode: 'Direct mode: Search for words instantly with "wh [query]"',
      description_interactive_mode: 'Interactive mode: Type queries continuously, use commands with "/" prefix',
      // Add any missing keys that might be used
      usage_direct_search: 'Search for words starting with [query]',
      usage_interactive: 'Start interactive mode',
    };

    const mockContext = {
      t: (key) => mockTranslations[key] || key,
      registry: null
    };

    const helpContent = generateHelpContent(mockContext);

    // Should still contain basic sections even without registry
    expect(helpContent).toContain('USAGE:');
    expect(helpContent).toContain('DESCRIPTION:');
    expect(helpContent).toContain('FLAGS:');
    // Should not contain interactive commands section when registry is null
    expect(helpContent).not.toContain('INTERACTIVE COMMANDS');
  });
});