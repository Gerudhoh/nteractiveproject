const csv = require('csv-parser');
const fs = require('fs');

/**
  * A method that scrapes character matchup information from the csv file
  * @param {*} targetCharacters the characters we are finding
*/
async function checkViability(targetCharacters) {
    let result = '';
    let character = targetCharacters.split('-');
    const dataResults = [];
    fs.createReadStream('smashUltimateComprehensiveMatchupChart.csv')
        .pipe(csv({}))
        .on('data', (data) => dataResults.push(data))
        .on('end', () => {
            for(i = 0; i < dataResults.length; i ++){
                if((dataResults[i][''] === character[0])){
                    result = dataResults[i][character[1]];
                }
            }
        });
    return result;
}

module.exports.checkViability = checkViability;
