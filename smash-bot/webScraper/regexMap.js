const regexesMap = new Map;
regexesMap.set('in competitive play', {
  startSection: new RegExp(/^In competitive play/gm),
  endSection: new RegExp(/^Notable players/gm),
});

regexesMap.set('updates', {
  // general info about updates
  startSection: new RegExp(/^Update history/gm),
  endSection: new RegExp(/^\s\d.\d.\d\n/gm),
});

module.exports = {
  getRegexes: function(targetText) {
    return regexesMap.get(targetText);
  },
};
