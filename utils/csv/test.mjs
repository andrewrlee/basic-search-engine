import fs from "fs";
import { Readable } from "stream";

import { transformCsvStream } from "./csvParser.mjs";

{
  const file = "./data/short_stories/raw/db_books.csv";

  const readStream = fs.createReadStream(file, {
    encoding: "utf8",
    highWaterMark: 64000,
  });

  const stream = transformCsvStream(readStream);

  const results = [];
  for await (const chunk of stream) {
    results.push(chunk);
  }
  console.log(results.length);
}

{
  const readStream = Readable.from(`"a",b,c, "d, g", ""eee"" \na1,b2,c3\n`);

  const stream = transformCsvStream(readStream);

  for await (const chunk of stream) {
    console.log(chunk);
  }
}
