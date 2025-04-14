import fs from "fs";
import { transformCsvStream } from "../../utils/csv/csvParser.mjs";
import { readStoryDb } from "./readStoryDb.mjs";

const db = await readStoryDb();

const file = "./data/short_stories/raw/stories.csv";
const dest = "data/short_stories/processed/stories.jsonl";

const readStream = fs.createReadStream(file, { encoding: "utf8" });
const stream = transformCsvStream(readStream);

var fd = fs.openSync(dest, "w");
let i = 0;

for await (const [bookNo, text] of stream) {
  const json = JSON.stringify({ bookNo, ...db[bookNo], text });
  fs.appendFileSync(fd, `${json}\n`);

  if (++i % 100 === 0) {
    console.log(`Processed ${i} books`);
  }
}
fs.closeSync(fd);

console.log("FIN!");
