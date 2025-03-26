import { extract, getMeasure, indexOfSuffix, isStarO } from "../utils.mjs";

export const stage1a = (word) => {
  const replacements = [
    ["sses", "ss"],
    ["ies", "i"],
    ["ss", "ss"],
    ["s", ""],
  ];

  for (const [suffix, repl] of replacements) {
    const index = indexOfSuffix(word, suffix);
    if (index > -1) {
      return word.substring(0, index) + repl;
    }
  }

  return word;
};

export const stage1b2 = (word) => {
  const replacements = [
    ["at", "ate"],
    ["bl", "ble"],
    ["iz", "ize"],
  ];

  for (const [suffix, repl] of replacements) {
    const index = indexOfSuffix(word, suffix);
    if (index > -1) {
      return word.substring(0, index) + repl;
    }
  }
  const { measure, letters, types } = extract(word);

  const [first, second] = word.slice(-2);
  const lastType = types.at(-1);

  const exclusions = ["l", "s", "z"];
  if (first == second && lastType === "c" && !exclusions.includes(first)) {
    return word.substring(0, word.length - 2) + first;
  }

  if (measure === 1 && isStarO(letters, types)) {
    return word + "e";
  }

  return word;
};

export const stage1b = (word) => {
  {
    const index = indexOfSuffix(word, "eed");
    if (index > -1) {
      const stem = word.substring(0, index);
      if (getMeasure(stem) > 0) {
        return stem + "ee";
      }
      return word;
    }
  }
  for (const suffix of ["ed", "ing"]) {
    const index = indexOfSuffix(word, suffix);
    if (index > -1) {
      const stem = word.substring(0, index);
      if (extract(stem).types.includes("v")) {
        return stage1b2(stem);
      }
      return word;
    }
  }

  return word;
};

export const stage1c = (word) => {
  const index = indexOfSuffix(word, "y");
  if (index > -1) {
    const stem = word.substring(0, index);
    if (extract(stem).types.includes("v")) {
      return stem + "i";
    }
  }

  return word;
};

export const stage1 = [stage1a, stage1b, stage1c];
