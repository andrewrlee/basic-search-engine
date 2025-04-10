import { Transform } from "stream";

export class CsvTransformer extends Transform {
  inQuotes = false;
  previousChar = null;
  cellValue = [];
  row = [];

  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    const chars = chunk.toString().split("");
    for (const char of chars) {
      if (char === '"') {
        this.inQuotes = !this.inQuotes;
        if (this.previousChar != '"') {
          this.previousChar = char;
          continue;
        }
      }
      if ((char === "," || char === "\n") && !this.inQuotes) {
        const cell = this.cellValue.join("").trim();
        this.row.push(cell);
        this.cellValue = [];
        if (char === "\n") {
          this.push(this.row);
          this.row = [];
        }
        continue;
      }
      this.cellValue.push(char);
      this.previousChar = char;
    }
    callback();
  }
}
