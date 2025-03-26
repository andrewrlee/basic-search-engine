import { getMeasure, indexOfSuffix } from "../utils.mjs";

export const stage4 = (word) => {
  {
    const replacements = [
      "al",
      "ance",
      "ence",
      "er",
      "ic",
      "able",
      "ible",
      "ant",
      "ement",
      "ment",
      "ent",
    ];

    for (const suffix of replacements) {
      const index = indexOfSuffix(word, suffix);
      if (index > -1) {
        const stem = word.substring(0, index);
        const measure = getMeasure(stem);
        return measure > 1 ? stem : word;
      }
    }
  }

  const index = indexOfSuffix(word, "ion");
  if (index > -1) {
    const stem = word.substring(0, index);
    if (getMeasure(stem) > 1 && ["s", "t"].includes(stem.at(-1))) {
      return stem;
    }
    return word;
  }

  {
    const replacements = ["ou", "ism", "ate", "iti", "ous", "ive", "ize"];

    for (const suffix of replacements) {
      const index = indexOfSuffix(word, suffix);
      if (index > -1) {
        const stem = word.substring(0, index);
        const measure = getMeasure(stem);
        return measure > 1 ? stem : word;
      }
    }
  }

  return word;
};
