export function* tokenise(text, includeNonWords) {
  const segmenter = new Intl.Segmenter("en-GB", { granularity: "word" });
  const segments = segmenter.segment(text);
  for (const { isWordLike, index, segment } of segments) {
    if (includeNonWords || isWordLike) {
      yield { index, segment };
    }
  }
}
