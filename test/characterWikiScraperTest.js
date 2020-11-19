const expect = require('chai').expect;
const fs = require('fs');
const characterWikiScraper = require('../smash-bot/webScraper/characterWikiScraper');

const peachCompInfo = fs.readFileSync('./test/peachICP.txt', {encoding: 'utf8', flag: 'r'});
const wiiFitFinalSmash = fs.readFileSync('./test/WiiFitFinalSmash.txt', {encoding: 'utf8', flag: 'r'});
const captFalcMoveSet = fs.readFileSync('./test/CaptainFalconMoveSet.txt', {encoding: 'utf8', flag: 'r'});
const kirbyUpdate300 = fs.readFileSync('./test/Kirby300.txt', {encoding: 'utf8', flag: 'r'});
const peachUpdates = fs.readFileSync('./test/PeachUpdatesGeneral.txt', {encoding: 'utf8', flag: 'r'});
const noVersion = 'Oops! That update version is nonexistent for this character!';
const wrongUpdForm = 'Oops! Please only look for update versions in form: \'#.#.#\'';

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
  describe('General Updates', function() {
    it('Peach\'s general past update information', function() {
      characterWikiScraper.scrapeWeb('Peach', 'updates')
          .then(function(moveinfo) {
            expect(moveinfo.trim()).to.equal(peachUpdates);
          });
    });
  });
  describe('Specific Update Version for Kirby', function() {
    it('Kirby\'s update information for version 3.0.0 - valid input', function() {
      characterWikiScraper.scrapeWeb('Kirby', 'update:3.0.0')
          .then(function(moveinfo) {
            expect(moveinfo.trim()).to.equal(kirbyUpdate300);
          });
    });
    it('Kirby\'s 3.5.0 update info - nonexistent update', function() {
      characterWikiScraper.scrapeWeb('Kirby', 'update:3.5.0')
          .then(function(moveinfo) {
            expect(moveinfo.trim()).to.equal(noVersion);
          });
    });
    it('Kirby\'s 3..0 update info - wrong update form', function() {
      characterWikiScraper.scrapeWeb('Kirby', 'update:3..0')
          .then(function(moveinfo) {
            expect(moveinfo.trim()).to.equal(wrongUpdForm);
          });
    });
  });
});
