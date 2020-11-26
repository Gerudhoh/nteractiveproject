

module.exports = {
  adaptToWebScrape: function(input) {
    const character = input.split(',')[0].trim();
    const command = input.split(',')[1].trim().toLowerCase();

    const adapterResults= {
      command: command.split(':')[0],
      character: character,
      extra: command.split(':')[1],
    };
    return adapterResults;
  },
};
