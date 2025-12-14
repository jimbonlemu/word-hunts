import { describe, it, expect } from 'vitest';
import { searchByPrefix } from '../src/services/core/search.js';

describe('Search functionality', () => {
  it('should find words starting with prefix', () => {
    const results = searchByPrefix('cat');
    expect(results).toContain('cat');
    expect(results).toContain('cats');
    expect(results).toContain('catch');
  });

  it('should return empty array for non-existent prefix', () => {
    const results = searchByPrefix('zzzzz');
    expect(results).toEqual([]);
  });

  it('should return words in sorted order by length', () => {
    const results = searchByPrefix('a');
    // Check that results are sorted by length, not alphabetically
    expect(results).toEqual([...results].sort((a, b) => a.length - b.length));
  });

  it('should return multiple words for common prefix', () => {
    const results = searchByPrefix('aa');
    expect(results.length).toBeGreaterThan(1);
    expect(results).toContain('aa');
    expect(results).toContain('aaa');
  });
});