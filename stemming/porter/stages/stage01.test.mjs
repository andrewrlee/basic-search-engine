import { test, suite } from "node:test";
import assert from "node:assert";
import { stage1a, stage1b, stage1c } from "./stage01.mjs";

suite("Stage 1", () => {
  test("Check stage 1a", () => {
    check(stage1a, "caresses", "caress");
    check(stage1a, "ponies", "poni");
    check(stage1a, "ties", "ti");
    check(stage1a, "caress", "caress");
    check(stage1a, "cats", "cat");
  });

  test("Check stage 1b", () => {
    check(stage1b, "feed", "feed");
    check(stage1b, "agreed", "agree");
    check(stage1b, "plastered", "plaster");
    check(stage1b, "bled", "bled");
    check(stage1b, "motoring", "motor");
    check(stage1b, "sing", "sing");

    check(stage1b, "conflated", "conflate");
    check(stage1b, "troubled", "trouble");
    check(stage1b, "sized", "size");
    check(stage1b, "hopping", "hop");
    check(stage1b, "tanned", "tan");
    check(stage1b, "falling", "fall");
    check(stage1b, "hissing", "hiss");
    check(stage1b, "fizzed", "fizz");
    check(stage1b, "failing", "fail");
    check(stage1b, "filing", "file");
    check(stage1b, "wooed", "woo");
    check(stage1b, "wooing", "woo");
  });

  test("Check stage 1c", () => {
    check(stage1c, "happy", "happi");
    check(stage1c, "sky", "sky");
  });

  const check = (stage, word, expected) => {
    const result = stage(word);
    assert.strictEqual(result, expected);
  };
});
