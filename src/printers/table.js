import Table from 'cli-table3';

export function printTable(list, columns, width, truncateFunc = (word, width) => word, options = {}) {
  const { noTruncate = false, invisibleBorder = false } = options;
  // Calculate the effective terminal width
  const termWidth = process.stdout.columns || 80;

  // Always use the max word length to prevent truncation, regardless of noTruncate setting
  // This ensures that even in table mode, we don't truncate if we're using full word function
  const maxWordLength = list.length > 0 ? Math.max(...list.map(word => word.length)) : width;
  const cellWidth = Math.max(1, maxWordLength, width); // Use max of word length, requested width, and 1

  // Calculate how many columns can fit in terminal width
  const calculatedColumns = Math.max(1, Math.floor(termWidth / Math.max(1, cellWidth)));
  const useCols = Math.min(columns, calculatedColumns, list.length > 0 ? list.length : 1);

  // Create table with specified column widths
  const table = new Table({
    chars: invisibleBorder ? {
      'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
      'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
      'left': ' ', 'left-mid': ' ', 'mid': '', 'mid-mid': '',
      'right': ' ', 'right-mid': '', 'middle': ' '
    } : {
      'top': '═',
      'top-mid': '╤',
      'top-left': '╔',
      'top-right': '╗',
      'bottom': '═',
      'bottom-mid': '╧',
      'bottom-left': '╚',
      'bottom-right': '╝',
      'left': '║',
      'left-mid': '╟',
      'mid': '─',
      'mid-mid': '┼',
      'right': '║',
      'right-mid': '╢',
      'middle': '│'
    },
    style: {
      head: [],
      border: []
    },
    // Set column widths based on the calculated cellWidth
    colWidths: Array(useCols).fill(cellWidth + 2) // +2 for padding
  });

  // Group the words into rows based on the number of columns
  const rows = [];
  for (let i = 0; i < list.length; i += useCols) {
    const row = [];
    const itemsInThisRow = Math.min(useCols, list.length - i);

    for (let j = 0; j < itemsInThisRow; j++) {
      const index = i + j;
      const word = list[index];
      // Apply the truncate function provided (which could be a no-truncate function)
      const displayedWord = truncateFunc(word.toUpperCase(), cellWidth);
      row.push(displayedWord);
    }

    rows.push(row);
  }

  // Add rows to the table
  table.push(...rows);

  // Print the table
  console.log(table.toString());
}