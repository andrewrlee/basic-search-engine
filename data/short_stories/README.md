# Data preparation of short stories

The data I decided to test the search engine with was a set of around [1000 short stories](https://www.kaggle.com/code/kerneler/starter-1002-short-stories-from-4d1c5610-0/input) I found on Kaggler.

This consisted data dump consisted of two csv files:

- An index CSV file containing metadata about the stories:
  - Book number
  - Title
  - Author
  - Language
- Another CSV file of around 238Mb, ~9 millions lines, containing two fields:
  - Book number
  - The Story text

## Implementation

After downloading the data files I wrote a [module](readStoryDb.mjs) to read the metadata and create mapping from book number (the natural key) to the metadata for that book.

I then wrote a [module](./prepare.mjs) to parse the large story file. 
This takes each story in turn and after looking up the associated metadata, it creates a js object containing the the book number, the metadata fields and the raw text of the short story. 

These json objects are then appended to a [jsonl](https://jsonlines.org/) file ready for indexing.  