const regexesMap = new Map;
regexesMap.set('in competitive play', {
  startSection: new RegExp(/^In competitive play/gm),
  endSection: new RegExp(/^Notable players/gm),
});

module.exports = {
  getRegexes: function(targetText) {
    return regexesMap.get(targetText);
  },
};
