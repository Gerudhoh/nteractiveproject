const expect = require('chai').expect;
const adapter = require('../smash-bot/adapter');

describe('Adapter Adapting Tests', function() {
  describe('Adapter', function() {
    it('Has the expected adapted output for web scraping', function() {
      const adapterResults = adapter.adaptToWebScrape('update:3.0.0, Peach');
      expect(adapterResults.character).to.equal('Peach');
      expect(adapterResults.command).to.equal('update');
      expect(adapterResults.extra).to.equal('3.0.0');
    });
    it('Has the expected adapted output for matchup', function() {
      const adapterResults = adapter.adaptToViability('matchup, Peach, Bowser');
      expect(adapterResults.command).to.equal('matchup');
      expect(adapterResults.character1).to.equal('Peach');
      expect(adapterResults.character2).to.equal('Bowser');
    });
  });
});
