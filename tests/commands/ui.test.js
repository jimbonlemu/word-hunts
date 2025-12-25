import { describe, it, expect, vi } from 'vitest';
import uiCmd from '../../src/commands/ui.js';

describe('UI command functionality', () => {
  it('should have correct command metadata', () => {
    expect(uiCmd.meta).toHaveProperty('name');
    expect(uiCmd.meta).toHaveProperty('aliases');
    expect(uiCmd.meta).toHaveProperty('desc');
    expect(uiCmd.meta).toHaveProperty('usage');

    expect(uiCmd.meta.name).toBe('ui');
    expect(uiCmd.meta.aliases).toContain('refs');
    expect(uiCmd.meta.desc).toBe('interactive_command_refresh');
    expect(uiCmd.meta.usage).toBe('/ui, /refs');
  });

  it('should require no argument', () => {
    expect(uiCmd.args.req).toBe(false);
  });

  it('should have correct handler function', () => {
    expect(uiCmd.handler).toBeInstanceOf(Function);
  });
});