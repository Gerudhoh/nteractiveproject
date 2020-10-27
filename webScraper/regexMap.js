const regexesMap = new Map;
regexesMap.set('In competitive play', {
  startSection: new RegExp(/^In competitive play/gm),
  endSection: new RegExp(/^Notable players/gm),
});

module.exports = {
  getRegexes: function() {
    return regexesMap;
  },
};
