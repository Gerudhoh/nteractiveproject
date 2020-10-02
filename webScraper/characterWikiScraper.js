const got = require('got');
var cheerio = require('cheerio');

const wiki = 'https://www.ssbwiki.com/';
const game = '_(SSBU)';

const targetSectionHeader = new RegExp(/play\[edit\]/g);
const regexLen = 10;

const sectionDefinitionRegex = new RegExp(/.*\[edit\]/g);

async function scrapeWeb(character) {
	// Build URL
	let url = wiki + character + game;

	got(url).then(response => {								// Scrape the webpage indicated at the url
		const $ = cheerio.load(response.body);					// Loads HTML from the url
		let wikiPageText =  $('.mw-parser-output').text();  	// Parses the text content of a particular div
		let targetSectionBeginIndex = wikiPageText.search(targetSectionHeader) + regexLen; // Finds the start of the "In competitive play section"

		let targetSectionEndIndex = 0;
		let nextIndexIsEndOfTargetSection = false;
		  // Loop through all the sections of the wiki, as denoted in text by the string '[edit]' in the header
		  while (match = sectionDefinitionRegex.exec(wikiPageText)) {
			  if(nextIndexIsEndOfTargetSection) {
				  targetSectionEndIndex = match.index;
				  break;
			  }
	
			  if(sectionDefinitionRegex.lastIndex === targetSectionBeginIndex) {
				nextIndexIsEndOfTargetSection = true;
			  }
		  }
		  let competitiveInformation = wikiPageText.substring(targetSectionBeginIndex, targetSectionEndIndex);
		  console.log(competitiveInformation);
		  return competitiveInformation;
	}).catch(err => {
		console.log(err);
	});
}

scrapeWeb("Mario");