import { stage1 } from "./stages/stage01.mjs";
import { stage2 } from "./stages/stage02.mjs";
import { stage3 } from "./stages/stage03.mjs";
import { stage4 } from "./stages/stage04.mjs";
import { stage5 } from "./stages/stage05.mjs";

const stages = [...stage1, stage2, stage3, stage4, ...stage5];

export const stem = (rawWord) => {
  const word = rawWord.toLowerCase();
  if (word.length < 3) return word;
  return stages.reduce((acc, stage) => stage(acc), word);
};
