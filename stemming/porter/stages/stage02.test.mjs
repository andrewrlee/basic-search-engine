import { test, suite } from "node:test";

import assert from "node:assert";
import { stage2 } from "./stage02.mjs";

suite("Porter / Stage 2", () => {
  test("Check stage 2", () => {
    testStage2("relational", "relate");
    testStage2("conditional", "condition");
    testStage2("rational", "rational");
    testStage2("valenci", "valence");
    testStage2("hesitanci", "hesitance");
    testStage2("digitizer", "digitize");
    testStage2("conformabli", "conformable");
    testStage2("radicalli", "radical");
    testStage2("differentli", "different");
    testStage2("vileli", "vile");
    testStage2("analogousli", "analogous");
    testStage2("vietnamization", "vietnamize");
    testStage2("predication", "predicate");
    testStage2("operator", "operate");
    testStage2("feudalism", "feudal");
    testStage2("decisiveness", "decisive");
    testStage2("hopefulness", "hopeful");
    testStage2("callousness", "callous");
    testStage2("formaliti", "formal");
    testStage2("sensitiviti", "sensitive");
    testStage2("sensibiliti", "sensible");
  });

  const testStage2 = (word, expected) => {
    const result = stage2(word);
    assert.strictEqual(result, expected);
  };
});
