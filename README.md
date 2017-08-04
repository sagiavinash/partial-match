# Partial Match

- Get fullly & partially matched strings for a given query
- Primary use case being sorting autocomplete suggestions

- Uses number of words matched as scoring algorithm
- Need to implement index at which the word matched as secondary sorting algorithm

## Usage

```javascript
var sentences = [
  'world is round',
  'hello world',
  'hello africa',
  '7 continents',
];

var partialMatch = partialMatchFactory({
  caseInsensitive: true,
  splitByTokens: ['-', '_'],
});

console.log(partialMatch.getSuggestedMatches(sentences, 'hello world')); 
// output: ["hello world", "world is round", "hello africa"]
```
