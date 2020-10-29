const expect = require('chai').expect;
const characterWikiScraper = require('../smash-bot/webScraper/characterWikiScraper');

const peachCompInfo = 'In competitive play\n' +
                'At the beginning of Ultimate\'s metagame, players immediately recognized the viability of Peach. ' +
                'They also noticed how she has incredibly improved from the last installment. Her combo game became ' +
                'possibly the best in the game, with her down tilt, aerials, Vegetable, forward tilt, and up tilt ' +
                'serving as devastating and powerful combo starters to lead into difficult and technical high damaging ' +
                'float cancel combos. Together with her echo fighter, Daisy, Peach has amassed results that are among ' +
                'the best, resulting in being a top-tier threat.\nPrior to patch 3.1.0., Peach was considered as a ' +
                'definite top-tier and even potentially the best character in the game. However, future patches have ' +
                'nerfed her. As a result, the nerfs did not hurt her in the long run. Peach still continues to find ' +
                'more success across the meta with strong tournament representation and results from Samsora, MuteAce, ' +
                'Meru, Kie, and LingLing. Peach is still considered as a top tier by a majority of players with some, ' +
                'such as MkLeo, Mew2King, and ZeRo, going as far to say she is the best character in the game.';

describe('Character Wiki Scraping Tests', function() {
  describe('Pull Competitive Information', function() {
    it('Pulls Peach\'s competitive information', function() {
      characterWikiScraper.scrapeWeb('Peach', 'In competitive play').then(function(competitiveInfo) {
        expect(competitiveInfo.trim()).to.equal(peachCompInfo);
      });
    });
  });
});
