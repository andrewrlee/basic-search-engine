const vowels = new Set(["a", "e", "i", "o", "u"]);

const isVowel = (c, prev) =>
  vowels.has(c) || (prev && !vowels.has(prev) && c == "y");

export const toLetterTypes = (letters) => {
  let prev = undefined;
  const result = [];
  for (const c of letters) {
    result.push(isVowel(c, prev) ? "v" : "c");
    prev = c;
  }
  return result;
};

export const calcMeasure = (letterTypes) => {
  let result = 0;
  for (let i = 0; i < letterTypes.length - 1; i++) {
    if (letterTypes[i] === "v" && letterTypes[i + 1] == "c") {
      result++;
    }
  }
  return result;
};

export const extract = (word) => {
  const letters = word.toLowerCase().split("");
  const types = toLetterTypes(letters);
  const measure = calcMeasure(types);
  return { word, letters, types, measure };
};

export const getMeasure = (word) => extract(word).measure;

export const indexOfSuffix = (word, suffix) =>
  word.endsWith(suffix) ? word.length - suffix.length : -1;

// the stem ends cvc, where the second c is not W, X or Y (e.g. -WIL, -HOP)
export const isStarO = (letters, types) => {
  const last3Types = types.slice(-3).join("");
  const lastChar = letters.at(-1);
  return last3Types === "cvc" && !["w", "x", "y"].includes(lastChar);
};
