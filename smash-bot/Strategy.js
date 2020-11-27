const characterInfo = require('./webScraper/characterWikiScraper');
const checkViability = require('./csvScraper/viabilityChecker');

/**
 * The Strategy Class, to help us perform the Strategy Design Pattern
 */
class Strategy {
  /**
   * Constructor for the Strategy Class
   * @param {String} command the command word that correlates to a particular strategy
   * @param {Function} botFunction The algorithm relating to this particular instantiation of Strategy
   */
  constructor(command, botFunction) {
    this.command = command;
    this.runStrategy = botFunction;
  }
}

const Strategies = new Map();
Strategies.set('matchup', {strategy: new Strategy('matchup', checkViability.checkViability)});
Strategies.set('in competitive play', {strategy: new Strategy('in competitive play', characterInfo.scrapeWeb)});
Strategies.set('updates', {strategy: new Strategy('updates', characterInfo.scrapeWeb)});
Strategies.set('update', {strategy: new Strategy('update', characterInfo.scrapeWeb)});
Strategies.set('moveset', {strategy: new Strategy('moveset', characterInfo.scrapeWeb)});
Strategies.set('move', {strategy: new Strategy('move', characterInfo.scrapeWeb)});

/**
 * Returns the list of possible strategies.
 * @return {Map} A Map<String, Function> of strategies and the command that triggers them
 */
function getStrategies() {
  return Strategies;
}

module.exports = Strategy;
module.exports.getStrategies = getStrategies;
