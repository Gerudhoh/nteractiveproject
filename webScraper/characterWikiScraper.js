const got = require('got');
var cheerio = require('cheerio');

const wiki = 'https://www.ssbwiki.com/';
const game = '_(SSBU)';

let regexesMap = new Map;
regexesMap.set('In competitive play', {
	startSection: new RegExp(/^In competitive play/gm),
	endSection: new RegExp(/^Notable players/gm)
});


async function scrapeWeb(character, targetText) {
	// Build URL
	let url = wiki + character + game;

	got(url).then(response => {									// Scrape the webpage indicated at the url
		const $ = cheerio.load(response.body);					// Loads HTML from the url
		let wikiPageText =  $('.mw-parser-output').text();  	// Parses the text content of a particular div, based on its css class
		// console.log(wikiPageText);							// Shows all the text we scraped. Good for building our regexes.
		let regexes = regexesMap.get(targetText);
		let targetSectionStartIndex = wikiPageText.search(regexes.startSection);
		let targetSectionEndIndex = wikiPageText.search(regexes.endSection);
		let competitiveInformation = wikiPageText.substring(targetSectionStartIndex, targetSectionEndIndex);
		console.log(competitiveInformation);
		return competitiveInformation;
	}).catch(err => {
		console.log(err);
	});
}

scrapeWeb("Peach", 'In competitive play');