import { test, suite } from "node:test";
import assert from "node:assert";
import { stage5a, stage5b } from "./stage05.mjs";

suite("Stage 5", () => {
  test("Check stage 5a", () => {
    check(stage5a, "probate", "probat");
    check(stage5a, "rate", "rate");
    check(stage5a, "cease", "ceas");
  });

  test("Check stage 5b", () => {
    check(stage5b, "controll", "control");
    check(stage5b, "roll", "roll");
  });

  const check = (stage, word, expected) => {
    const result = stage(word);
    assert.strictEqual(result, expected);
  };
});
