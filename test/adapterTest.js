const expect = require('chai').expect;
const adapter = require('../smash-bot/adapter');

describe('Adapter Adapting Tests', function() {
  describe('Adapter', function() {
    it('Has the expected adapted output', function() {
      const adapterResults = adapter.adaptToWebScrape('Peach, update:3.0.0');
      expect(adapterResults.character).to.equal('Peach');
      expect(adapterResults.command).to.equal('update');
      expect(adapterResults.extra).to.equal('3.0.0');
    });
  });
});
