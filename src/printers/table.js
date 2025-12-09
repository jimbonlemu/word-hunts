export function printTable(list, columns, width, truncate) {
  // Handle width negatif atau nol dengan set ke 1
  const safeWidth = Math.max(1, width);

  const cell = "-".repeat(safeWidth);
  const line = "+" + (cell + "+").repeat(columns);
  console.log(line);

  let row = "|";

  list.forEach((word, i) => {
    const w = truncate(word.toUpperCase(), safeWidth);
    row += w.padEnd(safeWidth, " ") + "|";

    if ((i + 1) % columns === 0) {
      console.log(row);
      console.log(line);
      row = "|";
    }
  });

  if (row !== "|") {
    console.log(row);
    console.log(line);
  }
}
