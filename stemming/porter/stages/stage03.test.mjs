import { test, suite } from "node:test";
import assert from "node:assert";
import { stage3 } from "./stage03.mjs";

suite("Porter / Stage 3", () => {
  test("Check stage 3", () => {
    testStage3("triplicate", "triplic");
    testStage3("formative", "form");
    testStage3("formalize", "formal");
    testStage3("electriciti", "electric");
    testStage3("electrical", "electric");
    testStage3("hopeful", "hope");
    testStage3("goodness", "good");
  });

  const testStage3 = (word, expected) => {
    const result = stage3(word);
    assert.strictEqual(result, expected);
  };
});
