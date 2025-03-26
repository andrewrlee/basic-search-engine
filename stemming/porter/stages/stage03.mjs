import { getMeasure, indexOfSuffix } from "../utils.mjs";

export const stage3 = (word) => {
  const replacements = [
    ["icate", "ic"],
    ["ative", ""],
    ["alize", "al"],
    ["iciti", "ic"],
    ["ical", "ic"],
    ["ful", ""],
    ["ness", ""],
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
