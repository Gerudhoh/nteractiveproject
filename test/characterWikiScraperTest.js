const expect = require('chai').expect;
const fs = require('fs');
const characterWikiScraper = require('../smash-bot/webScraper/characterWikiScraper');

const peachCompInfo = fs.readFileSync('./test/peachICP.txt', {encoding: 'utf8', flag: 'r'});

describe('Character Wiki Scraping Tests', function() {
  describe('Pull Competitive Information', function() {
    it('Pulls Peach\'s competitive information', function() {
      characterWikiScraper.scrapeWeb('Peach', 'In competitive play')
          .then(function(competitiveInfo) {
            expect(competitiveInfo.trim()).to.equal(peachCompInfo);
          });
    });
  });
});
