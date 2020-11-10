const expect = require('chai').expect;
const fs = require('fs');
const characterWikiScraper = require('../smash-bot/webScraper/characterWikiScraper');

const peachCompInfo = fs.readFileSync('./test/peachICP.txt', {encoding: 'utf8', flag: 'r'});
// const wiiFitFinalSmash = fs.readFileSync('./test/wiiFitFinalSmash.txt', {encoding: 'utf8', flag: 'r'});
const captFalcMoveSet = fs.readFileSync('./test/CaptainFalconMoveSet.txt', {encoding: 'utf8', flag: 'r'});

describe('Character Wiki Scraping Tests', function() {
  describe('Pull Competitive Information', function() {
    it('Pulls Peach\'s competitive information', function() {
      characterWikiScraper.scrapeWeb('Peach', 'In competitive play')
          .then(function(competitiveInfo) {
            expect(competitiveInfo.trim()).to.equal(peachCompInfo);
          });
    });
  });

  describe('Pull Move Info', function() {
    it('Pulls Wii Fit Trainer\'s final smash information', function() {
      characterWikiScraper.scrapeWeb('Wii Fit Trainer', 'move:Final Smash')
          .then(function(moveinfo) {
            expect(moveinfo.trim()).to.equal(wiiFitFinalSmash);
          });
    });
  });

  describe('Pull Moveset', function() {
    it('Pulls Captain Falcon\'s full moveset information', function() {
      characterWikiScraper.scrapeWeb('Captain Falcon', 'moveset')
          .then(function(moveinfo) {
            expect(moveinfo.trim()).to.equal(captFalcMoveSet);
          });
    });
  });
});
