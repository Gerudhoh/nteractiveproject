const expect = require('chai').expect;
const regexMap = require('../smash-bot/webScraper/regexMap');

describe('RegexMap Regexes Tests', function() {
  describe('In competitive play', function() {
    it('Has the expected regexes', function() {
      const regexes = regexMap.getRegexes('in competitive play');
      expect(regexes.startSection.test('In competitive play')).to.equal(true);
      expect(regexes.endSection.test('Notable players')).to.equal(true);
    });
  });
  describe('updates', function() {
    it('Has the expected regexes', function() {
      const regexes = regexMap.getRegexes('updates');
      expect(regexes.startSection.test('Update history')).to.equal(true);
      expect(regexes.endSection.test(' 0.0.0\n')).to.equal(true);
    });
  });
});
