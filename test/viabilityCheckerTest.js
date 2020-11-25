const expect = require('chai').expect;
const fs = require('fs');

const viabilityChecker = require('../smash-bot/csvScraper/viabilityChecker');

const peachVSMarioViability = 'Matchup slightly in favour of Peach';
const errorViability = 'Unknown character comparison between fake and character';

describe('Viability Checker tests', function() {
  describe('Pull Competitive Information', function() {
    it('Pulls correct competitve viability between Peach vs Mario', function() {
      viabilityChecker.checkViability('Peach-Mario')
        .then(function(viability) {
          expect(viability.trim()).to.equal(peachVSMarioViability);
        });
    });
    it('Gets an error for finding the matchup of unknown characters', function() {
      viabilityChecker.checkViability('fake-character')
        .then(function(viability) {
          expect(viability.trim()).to.equal(errorViability);
        });
      });
  });
});
