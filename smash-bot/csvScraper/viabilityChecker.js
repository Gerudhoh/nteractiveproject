const adapter = require('../adapter');
const csv = require('csv-parser');
const fs = require('fs');

/**
 * A method that returns all the data within the csv file
 * @param {*} fd The csv file contents
 * @return {*} Array of csv data results
 */
function processData(fd) {
  return new Promise((resolve, reject) => {
    const dataResults = [];

    fd.on('data', (data) => dataResults.push(data));
    fd.on('end', () => resolve(dataResults));
    fd.on('error', (error) => reject(error));
  });
}

/**
  * A method that scrapes character matchup information from the csv file
  * @param {*} input the input from the user retrieved from the bot
  * @return {*} Promise result of what the viability matchup results are
*/
async function checkViability(input) {
  const adapterResults = adapter.adaptToViability(input);
  let result = '';
  if (adapterResults.command !== 'matchup') {
    return ('Incorrect command for checking viability between two characters');
  }
  // Getting data from csv
  const dataResults = await processData(fs.createReadStream('smashUltimateComprehensiveMatchupChart.csv').pipe(csv({})));
  for (i = 0; i < dataResults.length; i ++) {
    if ((dataResults[i][''] === adapterResults.character1)) {
      result = dataResults[i][adapterResults.character2];
    }
  }

  switch (result) {
    case '4':
      return ('Matchup greatly in favour for ' + adapterResults.character1);
    case '3':
      return ('Matchup highly in favour for ' + adapterResults.character1);
    case '2':
      return ('Matchup in favour for ' + adapterResults.character1);
    case '1':
      return ('Matchup slightly in favour for ' + adapterResults.character1);
    case '-1':
      return ('Matchup slightly in favour for ' + adapterResults.character2);
    case '-2':
      return ('Matchup in favour for ' + adapterResults.character2);
    case '-3':
      return ('Matchup highly in favour for ' + adapterResults.character2);
    case '-4':
      return ('Matchup greatly in favour for ' + adapterResults.character2);
    case '':
      return ('Unknown character comparison between ' + adapterResults.character1 + ' and ' + adapterResults.character2);
    default:
      return ('Even Matchup between ' + adapterResults.character1 + ' and ' + adapterResults.character2);
  }
}

module.exports.checkViability = checkViability;
