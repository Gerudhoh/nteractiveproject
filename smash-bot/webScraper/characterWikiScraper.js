const got = require('got');
const cheerio = require('cheerio');
const regexMap = require('./regexMap');
const wiki = 'https://www.ssbwiki.com/';
const game = '_(SSBU)';
const moveTableMarker = 'Neutral attack';


const webScrapingFunctions = new Map();
webScrapingFunctions.set('in competitive play', {function: genericScrape});
webScrapingFunctions.set('move', {function: moveInfo});
webScrapingFunctions.set('moveset', {function: moveSet});


/**
  *  Scrapes the smash wiki
  * @param {String} character character whose information we want to know
  * @param {String} targetText The section of the wiki we want to know
*/
async function scrapeWeb(character, targetText) {
  // Build URL
  const url = wiki + character + game;
  const input = targetText.split(':');
  const webScraper = webScrapingFunctions.get(input[0].toLowerCase());
  const result = await webScraper.function(url, targetText);
  return result;
}
/**
  * A generic method that scrapes a giant section of text from the wiki.
  * @param {*} url The url of the webpage that we're scraping
  * @param {*} targetText the section of the wiki we're scraping
*/
async function genericScrape(url, targetText) {
  let result = '';
  await got(url).then((response) => { // Scrape the webpage indicated at the url
    const $ = cheerio.load(response.body); // Loads HTML from the url
    const wikiPageText = $('.mw-parser-output').text(); // Parses the text content of a particular div, based on its css class
    const regexes = regexMap.getRegexes(targetText.toLowerCase());
    const targetStartIndex = wikiPageText.search(regexes.startSection);
    const targetEndIndex = wikiPageText.search(regexes.endSection);
    result = wikiPageText.substring(targetStartIndex, targetEndIndex);
  }).catch((err) => {
    console.log(err);
    return 'Oops! there was an error :(';
  });
  return result;
}

/**
  * A method that scrapes the information for a specific move from the wiki.
  * @param {*} url The url of the webpage that we're scraping
  * @param {*} targetText the name of the move we're scraping
*/
async function moveInfo(url, targetText) {
  let move = '';
  const moveName = targetText.split(':')[1].trim();
  await got(url).then((response) => { // Scrape the webpage indicated at the url
    const $ = cheerio.load(response.body); // Loads HTML from the url
    $('.mw-parser-output > .wikitable > tbody > tr').each((index, element) => {
      const moveText = ($(element).text().toLowerCase()).trim();

      if (moveText.includes((moveName.toLowerCase()).trim()) && $($(element)['0'].parent).text().includes(moveTableMarker)) {
        move = $(element).text();
      }
    });
  }).catch((err) => {
    console.log(err);
    return 'Oops! there was an error :(';
  });
  return move;
}

/**
  * A method that scrapes the information for a specific move from the wiki.
  * @param {*} url The url of the webpage that we're scraping
  * @param {*} targetText the name of the move we're scraping
*/
async function moveSet(url, targetText) {
  let moveSet = '\tMove \t\t Name \t\t Damage\n\t----------------------------------------------------\n';
  const moveTable = [];

  await got(url).then((response) => { // Scrape the webpage indicated at the url
    const $ = cheerio.load(response.body);

    $('.mw-parser-output > .wikitable > tbody ').each((index, element) => { // Find the table of moves (table containing text "Neutral attack")
      if ($(element).text().includes(moveTableMarker)) {
        for (let i = 0; i < $($(element)['0'].children).length; i++) { // getting text for every row in moveset table
          if ($(element)['0'].children[i].type === 'tag' && $(element)['0'].children[i].name === 'tr') {
            const move =($($(element)['0'].children[i]).text()).split('\n'); // turn row text into array
            moveTable.push(move); // add row to moveTable array
          }
        }
      }
    });

    for ( let i = 1; i < moveTable.length; i++) {
      if (moveTable[i][3] === ' ') {
        moveTable[i][3] = `noName`; // if move has no 'official' name, replace empty char with 'noName'
      }
      if (moveTable[i].length > 4) {
        moveSet+= `\t ${moveTable[i][1]} \t\t${moveTable[i][3]} \t\t\t ${moveTable[i][4]} \n `;
      }
    }
  }).catch((err) => {
    console.log(err);
    return 'Oops! there was an error :(';
  });
  return moveSet;
}


module.exports.scrapeWeb = scrapeWeb;
