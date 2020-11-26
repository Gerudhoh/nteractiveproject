

module.exports = {
  adaptToWebScrape: function(input) {
    const adapterResults = new Map;
    const character = input.split(',')[0].trim();
    const command = input.split(',')[1].trim().toLowerCase();

    adapterResults.set('command', command.split(':')[0]);
    adapterResults.set('character', character);
    adapterResults.set('extra', command.split(':')[1]);
    return adapterResults;
  },
};
