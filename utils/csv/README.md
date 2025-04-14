# A CSV parser

To test the search engine I needed lots of text. I found [some good test data](/data/short_stories/README.md) from Kaggle which was in CSV files.

Given the idea I'm not relying on any 3rd party dependencies, I realised I'd have to create my own CSV parser to process the data.

This is that..

## Implementation

The implementation streams the data using `pipeline`, `Transform` and a `PassThrough` stream.
It has a single function, `transformCsvStream`, that takes a text stream and produces an object stream that emits each row.

This can then be consumed as desired.

The main CSV parsing logic is implemented in the `CsvTransformer`.

Notes:

- Sets `objectMode` to true in order to transform textual stream chunks to objects rather than text.
- It uses `this.push` in order to push each row array as it's created rather than waiting to process the entire chunk before emitting.
- Needed to call the passed in `callback` to signal that the chunk is fully processed - this was the cause of a bug where only small numbers of rows were being emitted. (If it was possible for the code to throw an exception - the error would have to be passed to the callback to pass the error through to consumers of the stream correctly).

## Usage:

An example of using the function is as follows:

```ts
{
  const readStream = Readable.from(`"a",b,c, "d, g", ""eee"" \na1,b2,c3\n`);

  const stream = transformCsvStream(readStream);

  for await (const chunk of stream) {
    console.log(chunk);
  }
}
```

This creates a readable stream from a string and parses it. (obviously you could stream from a file also).

This produces the following output:

```bash
...
[ 'a', 'b', 'c', 'd, g', '"eee"' ]
[ 'a1', 'b2', 'c3' ]
```

An example of reading from a file can be seen below:

```ts
import fs from "fs";
import { Readable } from "stream";
import { transformCsvStream } from "./csvParser.mjs";

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
```

#### Future work

This is sufficient to parse the data dumps I've retrieved - there is likely many more edgecases and functionality in the CSV spec that isn't covered by this parser.
