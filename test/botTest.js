const expect = require('chai').expect;
const Strategy = require('../smash-bot/Strategy');

describe('Strategy Tests', function() {
  describe('Strategy Selection', function() {
    it('Has the expected amount of Strategies', function() {
      const strategies = Strategy.getStrategies();
      expect(strategies.size).to.equal(6);
    });
    it('Has the expected types of Strategies', function() {
      const iterator = Strategy.getStrategies().keys();

      expect(iterator.next().value).to.equal('matchup');
      expect(iterator.next().value).to.equal('in competitive play');
      expect(iterator.next().value).to.equal('updates');
      expect(iterator.next().value).to.equal('update');
      expect(iterator.next().value).to.equal('moveset');
      expect(iterator.next().value).to.equal('move');
      expect(iterator.next().value).to.equal(undefined);
    });
  });
});
