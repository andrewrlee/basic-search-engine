import { test, suite } from "node:test";
import assert from "node:assert";
import { stage4 } from "./stage04.mjs";

suite("Porter / Stage 4", () => {
  test("Check stage 4", () => {
    testStage4("revival", "reviv");
    testStage4("allowance", "allow");
    testStage4("inference", "infer");
    testStage4("airliner", "airlin");
    testStage4("gyroscopic", "gyroscop");
    testStage4("adjustable", "adjust");
    testStage4("defensible", "defens");
    testStage4("irritant", "irrit");
    testStage4("replacement", "replac");
    testStage4("adjustment", "adjust");
    testStage4("dependent", "depend");
    testStage4("adoption", "adopt");
    testStage4("homologou", "homolog");
    testStage4("communism", "commun");
    testStage4("activate", "activ");
    testStage4("angulariti", "angular");
    testStage4("homologous", "homolog");
    testStage4("effective", "effect");
    testStage4("bowdlerize", "bowdler");
    testStage4("tournament", "tournament");
  });

  const testStage4 = (word, expected) => {
    const result = stage4(word);
    assert.strictEqual(result, expected);
  };
});
