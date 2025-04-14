import fs from "fs";
import { transformCsvStream } from "../../utils/csv/csvParser.mjs";

export const readStoryDb = async () => {
  const file = "./data/short_stories/raw/db_books.csv";
  const readStream = fs.createReadStream(file, { encoding: "utf8" });

  const rows = await transformCsvStream(readStream).toArray();

  return rows.reduce((acc, [bookNo, name, author, language]) => {
    acc[bookNo] = { name, author, language };
    return acc;
  });
};
