# A CSV parser

The data I decided to test the search engine with was a set of around [1000 short stories](https://www.kaggle.com/code/kerneler/starter-1002-short-stories-from-4d1c5610-0/input) I found on Kaggler.

This consisted data dump consisted of two csv files:

- An index CSV file containing metadata about the stories:
  - Book number
  - Title
  - Author
  - Language
- Another CSV file of around 238Mb, ~9 millions lines, containing two fields:
  - Book number
  - The Story text

Given the idea I'm not relying on any 3rd party dependencies, I realised I'd have to create my own CSV parser to process the data.

This is that..

## Implementation

The implementation streams the data using `pipeline`, `Transform` and a `PassThrough` stream.
It has a single function, `transformCsvStream`, that takes a text stream and produces an object stream that emits each row.

This can then be consumed as desired.

The main CSV parsing logic is implemented in the `CsvTransformer`.
Notes:

- It set's `objectMode` to true inorder to transform to objects rather than text
- It uses `this.push` in order to push each row array as it's created rather than waiting to process the entire chunk before emitting.
- It needed to call the passed in `callback` to signal that the chunk is fully processed - this was a cause of a bug where only small numbers of rows were being emitted. (If it was possible for the code to throw an exception - the error would have to be passed to the callback to pass the error through to consumers of the stream correctly).

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

#### Future work
I have a set of tests I had for a previous implementation that I need to hook up and ensure work with this implementation! 