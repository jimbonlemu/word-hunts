export function printPlain(list, columns, width, truncateFunc = (word, width) => word) {
  // Calculate the effective terminal width
  const termWidth = process.stdout.columns || 80;
  const effectiveWidth = Math.max(1, width);

  // Adjust columns based on terminal width
  const adjustedColumns = termWidth > 0 ? Math.max(1, Math.floor(termWidth / effectiveWidth)) : columns;

  let row = "";

  list.forEach((word, i) => {
    const w = truncateFunc(word.toUpperCase(), effectiveWidth);
    row += w.padEnd(effectiveWidth, " ");

    if ((i + 1) % adjustedColumns === 0) {
      console.log(row.trimEnd()); // trimEnd to remove trailing spaces
      row = "";
    }
  });

  if (row.trim() !== "") console.log(row.trimEnd());
}