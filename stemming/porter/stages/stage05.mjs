import { extract, getMeasure, indexOfSuffix, isStarO } from "../utils.mjs";

export const stage5a = (word) => {
  const index = indexOfSuffix(word, "e");
  if (index > -1) {
    const stem = word.substring(0, index);
    const { measure, letters, types } = extract(stem);

    if (measure > 1) {
      return stem;
    }
    if (measure === 1 && !isStarO(letters, types)) {
      return stem;
    }
  }
  return word;
};

export const stage5b = (word) => {
  if (getMeasure(word) > 1) {
    const [first, second] = word.slice(-2);
    if (first == second && first == "l") {
      return word.substring(0, word.length - 1);
    }
  }

  return word;
};

export const stage5 = [stage5a, stage5b];
