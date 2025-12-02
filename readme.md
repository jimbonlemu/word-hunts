# Word Hint CLI  
A fast and customizable command-line tool for searching English words by prefix.  
Built for games like **Last Letter**, word puzzles, linguistics tools, and general word lookup.

This CLI loads a local `words_dictionary.json` (400k+ words) and performs instant prefix searches using an optimized binary-search algorithm.

---

## ✨ Features

- 🚀 **Instant prefix search** (optimized binary-search, extremely fast)
- 📚 Uses local `words_dictionary.json` — works fully **offline**
- 🎛️ Customizable output
  - Table mode ON/OFF
  - Max result limit
  - Number of columns
  - Column width
- 🔧 Persistent settings via `config.json`
- 📐 Automatic terminal-width adaptation
- ✂️ Clean truncation for long words
- 🎮 Perfect for word-based games or productivity tools

---

## 📦 Installation

Clone the repository:

```sh
git clone https://github.com/jimbonlemu/word-hints-cli
```
Install dependencies:
```
npm install
```
Run:
```
npm start
```  
or with nodemon:
```
npm run dev
```  
---

## 🧠 How It Works

- The CLI loads a dictionary and performs:

- Pre-sorting of all words (case-insensitive)

- Binary lower-bound prefix lookup

- Sequential collection of all matching words

- Optional table-format rendering

- Field truncation and column fitting

---
## 🖥️ Usage
After running the CLI, type any prefix:

![Demo](./assets/ex-usage.png "Preview after running the CLI")

Example output:

![Demo](./assets/ex-usage-output.png "Preview result after searching")


---

## 🖥️ Commands

| Command          | Description              |
| ---------------- | ------------------------ |
| `table on`       | Enable table mode        |
| `table off`      | Disable table mode       |
| `tbon` / `tboff` | Aliases for table on/off |
| `sres <num>`     | Set result limit         |
| `scol <num>`     | Set number of columns    |
| `scw <num>`      | Set cell width           |
| `getui`          | Show UI header           |
| `/q`             | Quit the program         |

---

## 📜 License

MIT — free to use, modify, and distribute.

---
## 👤 Author

Made by Mochamad Iqbal Maulana

I made it because I needed it and for fun. Maybe you need it too.

A simple & fast CLI to dominate any word-based challenge.

