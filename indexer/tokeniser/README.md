# Tokeniser

The first step of an analyser is a tokeniser which splits text into individual words.

A naive approach might be to use regular expressions to split on [word boundaries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Word_boundary_assertion) using regexes including `\b` or `\w+`,  but this doesn't work for a large amount of edge cases. A straightforward example of these limitations are words such as `doesn't` - this would split on the `'` to become `["doesn", "t"]`.

It also doesn't work on languages like Chinese, Japanese or Thai, as there are no whitespace separators. For instance the sentence: `吾輩は猫である。名前はたぬき。 (I am a cat. My name is Tanuki.)` should be split to:
``` 
"吾輩"
"は"
"猫"
"で"
"ある"
"。"
"名前"
"は"
"たぬき"
"。"
```

The Unicode consortium provides [algorithms](https://unicode.org/reports/tr29/) for splitting text by grapheme clusters, words or sentences across multiple languages. Due to specific language details these are not 100% effective.

The [word boundary algorithm](https://unicode.org/reports/tr29/#Word_Boundaries) spec is pretty complex and contains 25 rules across 23 different classes of unicode characters.

As well as the inherent complexity to implement these rules in js you'd also need to inspect unicode metadata, have access to large metadata files containing all the different classes and potentially dictionary files too. 

Thankfully a javascript standard was introduced via this [proposal](https://github.com/tc39/proposal-intl-segmenter) to include word and grapheme splitting functionality as part of `Intl.Segmenter`. (Line breaking was included as part of a later proposal [here](https://github.com/tc39/proposal-intl-segmenter-v2)) 

This makes it much easier to implement a word tokenizer that will work for a lot of different languages. 

### Implementation

The [implementation](./tokeniser.mjs) is straightforward. It wraps the `Intl.Segmenter` in a generator function which lazily yields tokens that correspond to words.  

### Resources:
- [Official Unicode algorithms for text splitting](https://unicode.org/reports/tr29/)
- Example of a JS implementation of word boundary splitting: [unicode-default-word-boundary](https://github.com/eddieantonio/unicode-default-word-boundary)
* [Blog](https://www.stefanjudis.com/today-i-learned/how-to-split-javascript-strings-with-intl-segmenter/) explaining `Intl.Segmenter`
