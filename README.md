# Partial Match

- Get fullly & partially matched strings for a given query
- Primary use case being sorting autocomplete suggestions

- Uses number of words matched as scoring algorithm
- Need to implement index at which the word matched as secondary sorting algorithm

## Usage

```javascript
var partialMatchFactory = require('partial-match');

var partialMatch = partialMatchFactory({
  caseInsensitive: true,
  splitByTokens: ['-', '_'],
});

var sentences = [
  'hello-africa',
  'world is round',
  'hello world',
  'our_world_is_a_beautiful_world',
  '7 continents',
];

console.log(partialMatch.getSuggestedMatches(sentences, 'hello world')); 
/* output
[
  "hello world",
  "our_world_is_a_beautiful_world",
  "hello-africa",
  "world is round",
]
*/
```
