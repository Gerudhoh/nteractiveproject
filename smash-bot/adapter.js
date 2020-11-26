

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
  adaptToViability: function(input) {
    const command = input.split(',')[0].trim();
    const character1 = input.split(',')[1].trim();
    const character2 = input.split(',')[2].trim();

    const adapterResults= {
      command: command,
      character1: character1,
      character2: character2,
    };
    return adapterResults;
  },
};
