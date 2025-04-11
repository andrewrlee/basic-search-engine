import { Readable } from "stream";
import { test, suite } from "node:test";
import assert from "node:assert";
import { transformCsvStream } from "./csvParser.mjs";

const toColumns = async (text) => {
  const readStream = Readable.from(`${text}\n`);
  const stream = transformCsvStream(readStream);
  const chunks = await stream.toArray();
  return chunks[0];
};

suite("csv parsing", () => {
  test("empty", async () => {
    assert.deepEqual(await toColumns(""), ['']);
  });
  test("single value", async () => {
    assert.deepEqual(await toColumns("hello"), ["hello"]);
  });
  test("with padding", async () => {
    assert.deepEqual(await toColumns("  hello "), ["hello"]);
  });
  test("two values", async () => {
    assert.deepEqual(await toColumns("hello, world "), ["hello", "world"]);
  });
  test("empty value", async () => {
    assert.deepStrictEqual(await toColumns(",world"), ['', "world"]);
  });
  test("mixed empty values", async () => {
    assert.deepStrictEqual(await toColumns(",world,,wah,jim"), [
      '',
      "world",
      '',
      "wah",
      "jim",
    ]);
  });
  test("end with comma", async () => {
    assert.deepStrictEqual(await toColumns("jim,"), ["jim", '']);
  });

  test("Double quoted", async () => {
    assert.deepStrictEqual(await toColumns(`"jim"`), ["jim"]);
  });
  test("Mixed double quoted", async () => {
    assert.deepStrictEqual(await toColumns(`"jim",bob,"smith"`), [
      "jim",
      "bob",
      "smith",
    ]);
  });
  test("contain's quotes", async () => {
    assert.deepStrictEqual(await toColumns(`some ""BIG"" cheese`), [
      'some "BIG" cheese',
    ]);
  });
  test("contain's nested quotes", async () => {
    assert.deepStrictEqual(await toColumns(`"some "BIG" cheese"`), [
      'some BIG cheese',
    ]);
  });
  test("comma ignored within quotes", async () => {
    assert.deepStrictEqual(await toColumns(`"some, cheese"`), ["some, cheese"]);
  });
  test("comma ignored within quotes multiple words", async () => {
    assert.deepStrictEqual(await toColumns(`"some, cheese", bob,"jim"`), [
      "some, cheese",
      "bob",
      "jim",
    ]);
  });
});
