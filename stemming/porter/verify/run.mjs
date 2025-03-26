import fs from "fs";
import { stem } from "../stem.mjs";
/**
 * Verifies that the algorithm matches the expected outcome
 * for 23.5K words as provided by
 * https://tartarus.org/martin/PorterStemmer/index.html
 */
const inputLines = fs
  .readFileSync("stemming/porter/verify/resources/input.txt", "utf-8")
  .split("\n");
const resultLines = fs
  .readFileSync("stemming/porter/verify/resources/output.txt", "utf-8")
  .split("\n");

const merged = inputLines.map((input, i) => {
  const stemmed = stem(input);
  const output = resultLines[i];
  return {
    input,
    output,
    stemmed,
    matched: stemmed === output,
  };
});

const matched = merged.filter((a) => a.matched).length;

console.log(
  `${matched} / ${merged.length} matched (${(matched / merged.length) * 100}%)`
);

merged.filter((a) => !a.matched).forEach((word) => console.log(word));

// stage 1-3: 17959 / 23532 matched (76.32)
// stage 4:   20231 / 23532 matched (85.97)
// stage 5a:  23216 / 23532 matched (98.6571477137515)
// stage 5a:  23387 / 23532 matched (99.3838177800442)
//            23440 / 23532 matched (99.60904300526941)
//            23451 / 23532 matched (99.65578786333504)
//            23505 / 23532 matched (99.88526262111168)
//            23520 / 23532 matched (99.94900560938297)
//            23534 / 23534 matched (100)
