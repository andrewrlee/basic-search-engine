import { getMeasure, indexOfSuffix } from "../utils.mjs";

export const stage2 = (word) => {
  const replacements = [
    ["ational", "ate"],
    ["tional", "tion"],
    ["enci", "ence"],
    ["anci", "ance"],
    ["izer", "ize"],
    ["bli", "ble"],
    ["alli", "al"],
    ["entli", "ent"],
    ["eli", "e"],
    ["ousli", "ous"],
    ["ization", "ize"],
    ["ation", "ate"],
    ["ator", "ate"],
    ["alism", "al"],
    ["iveness", "ive"],
    ["fulness", "ful"],
    ["ousness", "ous"],
    ["aliti", "al"],
    ["iviti", "ive"],
    ["biliti", "ble"],
    ["logi", "log"],
  ];

  for (const [suffix, repl] of replacements) {
    const index = indexOfSuffix(word, suffix);
    if (index > -1) {
      const stem = word.substring(0, index);
      if (getMeasure(stem) > 0) {
        return stem + repl;
      }
    }
  }

  return word;
};
