import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { printResults } from '../src/printers/index.js';

// Mock console.log to capture output
vi.spyOn(console, 'log').mockImplementation(() => {});

describe('Printer functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should format results in table mode correctly', () => {
    const mockList = ['CAT', 'CATS', 'CATCH'];
    const mockConfig = {
      COLUMNS: 5,
      CELL_WIDTH: 10,
      CELL_WIDTH_MODE: 'manual',
      TABLE_MODE: true,
      MAX_RESULTS: 100
    };
    
    const mockTruncateFunc = (word, width) => word; // Don't truncate
    const mockOptions = { query: 'cat', showHeader: false };
    
    // Capture console.log output
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    printResults(mockList, mockConfig, mockTruncateFunc, mockOptions);
    
    // Check that console.log was called (meaning table was generated)
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should format results with header when showHeader is true', () => {
    const mockList = ['CAT', 'CATS'];
    const mockConfig = {
      COLUMNS: 5,
      CELL_WIDTH: 10,
      CELL_WIDTH_MODE: 'manual',
      TABLE_MODE: true,
      MAX_RESULTS: 100,
      translations: {
        results_for: 'Results for',
        showing_results: 'showing',
        from: 'from'
      }
    };
    
    const mockTruncateFunc = (word, width) => word;
    const mockOptions = { query: 'cat', showHeader: true, originalTotal: 10 };
    
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    printResults(mockList, mockConfig, mockTruncateFunc, mockOptions);
    
    // Should have called console.log multiple times (header + table + footer)
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should handle auto cell width calculation', () => {
    const mockList = ['A', 'LONGWORD', 'CAT']; // Different lengths
    const mockConfig = {
      COLUMNS: 5,
      CELL_WIDTH: null,
      CELL_WIDTH_MODE: 'auto', // This should trigger auto-width calculation
      TABLE_MODE: true,
      MAX_RESULTS: 100
    };
    
    const mockTruncateFunc = (word, width) => word;
    const mockOptions = { query: 'test', showHeader: false };
    
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    printResults(mockList, mockConfig, mockTruncateFunc, mockOptions);
    
    // Should handle auto-width calculation without errors
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should work in plain mode (non-table)', () => {
    const mockList = ['CAT', 'CATS', 'CATCH'];
    const mockConfig = {
      COLUMNS: 3,
      CELL_WIDTH: 8,
      CELL_WIDTH_MODE: 'manual',
      TABLE_MODE: false, // Plain mode
      MAX_RESULTS: 100
    };
    
    const mockTruncateFunc = (word, width) => word;
    const mockOptions = { query: 'cat', showHeader: false };
    
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    printResults(mockList, mockConfig, mockTruncateFunc, mockOptions);
    
    // Should work in plain mode too
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});