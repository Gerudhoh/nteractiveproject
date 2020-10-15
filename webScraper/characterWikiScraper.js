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
	let competitiveInformation = "";
	// Build URL
	let url = wiki + character + game;

	await got(url).then(response => {									// Scrape the webpage indicated at the url
		const $ = cheerio.load(response.body);					// Loads HTML from the url
		let wikiPageText =  $('.mw-parser-output').text();  	// Parses the text content of a particular div, based on its css class
		// console.log(wikiPageText);							// Shows all the text we scraped. Good for building our regexes.
		let regexes = regexesMap.get(targetText);
		let targetSectionStartIndex = wikiPageText.search(regexes.startSection);
		let targetSectionEndIndex = wikiPageText.search(regexes.endSection);
		competitiveInformation = wikiPageText.substring(targetSectionStartIndex, targetSectionEndIndex);
	}).catch(err => {
		console.log(err);
	});
	return competitiveInformation;
}

scrapeWeb("Peach", 'In competitive play').then(function(result) {
	console.log(result);
 })