import assert from "assert";
import { stem } from "./stem.mjs";

const word = process.argv[2];

assert.ok(
  Boolean(word),
  "No word provided, usage: npm run --silent stem:porter:run -- <SOME VALUE>"
);

console.log(stem(word));
