function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function getStringPool(string, options) {
  var cleanedString = (options.caseInsensitive ? string.toLowerCase() : string).trim();
  var splitTokenRegex = new RegExp(options.splitByTokens.join('|'));
  
  return cleanedString.split(splitTokenRegex).filter(function(i) { return i; });
}

function getSuggestedMatches(sentences, query) {
  return (
    sentences
      .map(function(sentence) {
        return {
          sentence: sentence,
          matchStrength: partialMatch.getQueryMatchStrength(sentence, query), 
        };
      })
      .filter(function(item) { return item.matchStrength; })
      .sort(function(item1, item2) { return item2.matchStrength - item1.matchStrength; })
      .map(function(item) { return item.sentence; })
  );
}

module.exports = function partialMatchFactory(config) {
  var defaultOptions = {
    caseInsensitive: true,
    splitByTokens: [' '],
  };
  var options = {
    caseInsensitive: (config || {}).hasOwnProperty('caseInsensitive') ? config.caseInsensitive : defaultOptions.caseInsensitive,
    splitByTokens: (
      []
        .concat(defaultOptions.splitByTokens)
        .concat(config.splitByTokens.map(escapeRegExp) || [])
    ),
  };

  return {
    getQueryMatchStrength: function(sentence, query) {
      var sentenceStringPool = getStringPool(sentence, options);
      var queryStringPool = getStringPool(query, options);

      return sentenceStringPool.reduce(function(totalScore, str) {
        return queryStringPool.reduce(function(score, qStr) {
          return score + (str.indexOf(qStr) === 0 ? 1 : 0);
        }, totalScore);
      }, 0);
    },
    getSuggestedMatches: function(sentences, query) {
      var self = this;

      return (
        sentences
          .map(function(sentence) {
            return {
              sentence: sentence,
              matchStrength: self.getQueryMatchStrength(sentence, query),
            };
          })
          .filter(function(item) { return item.matchStrength; })
          .sort(function(item1, item2) { return item2.matchStrength - item1.matchStrength; })
          .map(function(item) { return item.sentence; })
      );
    },
  };
}
