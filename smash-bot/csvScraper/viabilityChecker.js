const csv = require('csv-parser');
const fs = require('fs');

/**
 * A method that returns all the data within the csv file
 * @param {*} fd the csv file contents
 */
function processData(fd){
    return new Promise((resolve, reject) => {
        const dataResults = [];

        fd.on('data', (data) => dataResults.push(data));
        fd.on('end', () => resolve(dataResults));
        fd.on("error", error => reject(error));
    });
}

/**
  * A method that scrapes character matchup information from the csv file
  * @param {*} targetCharacters the characters we are finding
*/
async function checkViability(targetCharacters) {
    let result = '';
    let character = targetCharacters.split('-');
    let dataResults = await processData(fs.createReadStream('smashUltimateComprehensiveMatchupChart.csv').pipe(csv({})));
    for(i = 0; i < dataResults.length; i ++){
        if((dataResults[i][''] === character[0])){
            result = dataResults[i][character[1]];
        }
    }

    switch(result){
        case '4':
            return('Matchup greatly in favour for ' + character[0]);
        case '3':
            return('Matchup highly in favour for ' + character[0]);
        case '2':
            return('Matchup in favour for ' + character[0]);
        case '1':
            return('Matchup slightly in favour for ' + character[0]);
        case '-1':
            return('Matchup slightly in favour for ' + character[1]);
        case '-2':
            return('Matchup in favour for ' + character[1]);
        case '-3':
            return('Matchup highly in favour for ' + character[1]);
        case '-4':
            return('Matchup greatly in favour for ' + character[1]);
        default:
            return('Even Matchup between ' + character[0] + ' and ' + character[1]);
    }
}

module.exports.checkViability = checkViability;
