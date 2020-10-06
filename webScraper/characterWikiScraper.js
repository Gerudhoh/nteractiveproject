const got = require('got');
var cheerio = require('cheerio');

const wiki = 'https://www.ssbwiki.com/';
const game = '_(SSBU)';

const targetSectionHeader = new RegExp(/^In competitive play/gm);
const sectionThatFollowsTarget = new RegExp(/^Notable players/gm);

async function scrapeWeb(character) {
	// Build URL
	let url = wiki + character + game;

	got(url).then(response => {								// Scrape the webpage indicated at the url
		const $ = cheerio.load(response.body);					// Loads HTML from the url
		let wikiPageText =  $('.mw-parser-output').text();  	// Parses the text content of a particular div
		let targetSectionBeginIndex = wikiPageText.search(targetSectionHeader); // Finds the start of the "In competitive play section"
		let targetSectionEndIndex = wikiPageText.search(sectionThatFollowsTarget);
		let competitiveInformation = wikiPageText.substring(targetSectionBeginIndex, targetSectionEndIndex);
		console.log(competitiveInformation);
		return competitiveInformation;
	}).catch(err => {
		console.log(err);
	});
}

scrapeWeb("Mario");