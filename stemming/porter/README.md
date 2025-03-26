# An implementation of the Porter Stemming Algorithm

### Stemming
Stemming is the process of reducing words to their root or base form. For example, "running," "runs," and "ran" would all be stemmed to "run." This is useful in search engines and information retrieval to treat variations of a word as the same.

#### Porter Stemming:

The Porter stemming algorithm is a rule-based process that applies a series of steps to remove common suffixes from words. It operates through five distinct phases, each containing a set of conditional rules. These rules specify how to remove or replace suffixes based on the word's structure and the presence of specific vowel or consonant patterns. The algorithm isn't perfect and sometimes produces non-words, but it's computationally efficient and generally effective for many applications.

Following Martin Porter's algorithm description on [the official website](https://tartarus.org/martin/PorterStemmer/index.html), I've created a raw javascript implementation. A test harness was built to compare the results with 23,500-case verification dataset provided by the site, showing perfect agreement for all cases.

#### Useful commands:

* Running the test suite: `npm test`
* Running the verification: `npm run --silent stem:porter:verify`
* Test stemming a specific word: `npm run --silent stem:porter:run -- algorithmically`

#### Future work

It's possible to use some heuristics to speed up rule evaluation by only applying rules that rely on the last or last but one letter:

> The test for the string S1 can be made fast by doing a program switch on the penultimate letter of the word being tested. This gives a fairly even breakdown of the possible values of the string S1. It will be seen in fact that the S1-strings in step 2 are presented here in the alphabetical order of their penultimate letter. Similar techniques may be applied in the other steps.
