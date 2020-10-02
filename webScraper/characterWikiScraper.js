const got = require('got');
var cheerio = require('cheerio');

const wiki = 'https://www.ssbwiki.com/';
const game = '_(SSBU)';

const targetSection = new RegExp(/play\[edit\]/g);
const regexLen = 10;

const sectionDefinitionRegex = new RegExp(/.*\[edit\]/g);

let text = "";

async function scrapeWeb(character) {
	// Build URL
	let url = wiki + character + game;

	got(url).then(response => {								// Scrape the webpage indicated at the url
		const $ = cheerio.load(response.body);				// Loads HTML from the url
		text =  $('.mw-parser-output').text();  			// Parses the text content of a particular div
		let targetSectionBeginIndex = text.search(targetSection) + regexLen; // Finds the start of the "In competitive play section"

		let targetSectionEndIndex = 0;
		let nextIndexIsEndOfTargetSection = false;
		  // Loop through all the sections of the wiki, as denoted in text by the string '[edit]' in the header
		  while (match = sectionDefinitionRegex.exec(text)) {
			  if(nextIndexIsEndOfTargetSection) {
				  targetSectionEndIndex = match.index;
				  break;
			  }
	
			  if(sectionDefinitionRegex.lastIndex === targetSectionBeginIndex) {
				nextIndexIsEndOfTargetSection = true;
			  }
		  }
		  console.log(text.substring(targetSectionBeginIndex, targetSectionEndIndex));
	}).catch(err => {
		console.log(err);
	});
}

scrapeWeb("Mario");