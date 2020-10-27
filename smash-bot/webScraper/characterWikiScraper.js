const got = require('got');
const cheerio = require('cheerio');
const regexMap = require('./regexMap');

const wiki = 'https://www.ssbwiki.com/';
const game = '_(SSBU)';

/**
 *  Scrapes the smash wiki
 * @param {String} character character whose information we want to know
 * @param {String} targetText The section of the wiki we want to know
 */
async function scrapeWeb(character, targetText) {
  let competitiveInfo = '';
  // Build URL
  const url = wiki + character + game;

  await got(url).then((response) => { // Scrape the webpage indicated at the url
    const $ = cheerio.load(response.body); // Loads HTML from the url
    const wikiPageText = $('.mw-parser-output').text(); // Parses the text content of a particular div, based on its css class
    // console.log(wikiPageText);                       // Shows all the text we scraped. Good for building our regexes.
    const regexes = regexMap.getRegexes().get(targetText);
    const targetStartIndex = wikiPageText.search(regexes.startSection);
    const targetEndIndex = wikiPageText.search(regexes.endSection);
    competitiveInfo = wikiPageText.substring(targetStartIndex, targetEndIndex);
  }).catch((err) => {
    console.log(err);
  });
  return competitiveInfo;
}

module.exports.scrapeWeb = scrapeWeb;

scrapeWeb('Peach', 'In competitive play').then(function(result) {
  console.log(result);
});
