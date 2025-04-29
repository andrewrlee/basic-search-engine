import { test, suite } from "node:test";
import assert from "node:assert";
import { tokenise } from "./tokeniser.mjs";

suite("Indexer / Tokeniser", () => {
  test("Check empty", () => {
    check("", []);
  });

  test("Single word", () => {
    check("bob", [
      {
        index: 0,
        segment: "bob",
      },
    ]);
  });

  test("Multiple words", () => {
    check("bob smith", [
      {
        index: 0,
        segment: "bob",
      },
      {
        index: 4,
        segment: "smith",
      },
    ]);
  });

  test("More complex example", () => {
    check("The quick (“brown”) fox can't jump 32.3 feet, right?", [
      { index: 0, segment: "The" },
      { index: 4, segment: "quick" },
      { index: 12, segment: "brown" },
      { index: 20, segment: "fox" },
      { index: 24, segment: "can't" },
      { index: 30, segment: "jump" },
      { index: 35, segment: "32.3" },
      { index: 40, segment: "feet" },
      { index: 46, segment: "right" },
    ]);
  });

  test("Japanese", () => {
    check("吾輩は猫である。名前はたぬき。", [
      { index: 0, segment: "吾輩" },
      { index: 2, segment: "は" },
      { index: 3, segment: "猫" },
      { index: 4, segment: "で" },
      { index: 5, segment: "ある" },
      { index: 8, segment: "名前" },
      { index: 10, segment: "は" },
      { index: 11, segment: "たぬき" },
    ]);
  });

  test("hebrew", () => {
    check("איך בלש תפס גמד רוצח עז קטנה?", [
      { index: 0, segment: "איך" },
      { index: 4, segment: "בלש" },
      { index: 8, segment: "תפס" },
      { index: 12, segment: "גמד" },
      { index: 16, segment: "רוצח" },
      { index: 21, segment: "עז" },
      { index: 24, segment: "קטנה" },
    ]);
  });

  test("nêhiyawêwin", () => {
    check("ᑕᐻ ᒥᔪ ᑭᓯᑲᐤ ᐊᓄᐦᐨ᙮", [
      { index: 0, segment: "ᑕᐻ" },
      { index: 3, segment: "ᒥᔪ" },
      { index: 6, segment: "ᑭᓯᑲᐤ" },
      { index: 11, segment: "ᐊᓄᐦᐨ" },
    ]);
  });

  test("emojis", () => {
    check(
      "🫣🫵👨‍👨‍👦‍👦",
      [
        {
          index: 0,
          segment: "🫣",
        },
        {
          index: 2,
          segment: "🫵",
        },
        {
          index: 4,
          segment: "👨‍👨‍👦‍👦",
        },
      ],
      true
    );
  });

  const check = (word, expected, includeNonWords) => {
    const result = tokenise(word, includeNonWords);
    assert.deepEqual(Array.from(result), expected);
  };
});
