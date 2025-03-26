import { test, suite } from "node:test";
import assert from "node:assert";
import { toLetterTypes, calcMeasure as m } from "./utils.mjs";

const check = (input, expectedLetterTypes, expectedM) => {
  const result = toLetterTypes(input.toLowerCase().split("")).join("");
  const mResult = m(result);
  assert.strictEqual(result, expectedLetterTypes);
  assert.strictEqual(mResult, expectedM);
};

suite("Utils", () => {
  test("Check letter type extraction and measure calculation for various examples", () => {
    check("FEED", "cvvc", 1);
    check("TREE", "ccvv", 0);
    check("BY", "cv", 0);
    check("TROUBLE", "ccvvccv", 1);
    check("OATS", "vvcc", 1);
    check("TREES", "ccvvc", 1);
    check("IVY", "vcv", 1);
    check("TROUBLES", "ccvvccvc", 2);
    check("PRIVATE", "ccvcvcv", 2);
    check("OATEN", "vvcvc", 2);
    check("ORRERY", "vccvcv", 2);
    check("PAY", "cvc", 1);
    check("MULTIDIMENSIONAL", "cvccvcvcvccvvcvc", 6);
    check("CHARACTERIZATION", "ccvcvccvcvcvcvvc", 6);
  });

  test("Check measurements", () => {
    assert.ok(m("cv") === 0);
    assert.ok(m("cvcv") === 1);
    assert.ok(m("cvcvcv") === 2);
    assert.ok(m("cvcvcvcv") === 3);
  });
});
