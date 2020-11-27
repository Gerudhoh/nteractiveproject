// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const {ActivityHandler, MessageFactory} = require('botbuilder');

// nteractive code:
const characterInfo = require('./webScraper/characterWikiScraper');
const checkViability = require('./csvScraper/viabilityChecker');

let Strategies = new Map();
Strategies.set("matchup", { strategy: new Strategy("matchup", checkViability.checkViability});
Strategies.set("in competitive play", { strategy: new Strategy("in competitive play", characterInfo.scrapeWeb)});
Strategies.set("updates", { strategy: new Strategy("updates", characterInfo.scrapeWeb)});
Strategies.set("moveset", { strategy: new Strategy("moveset", characterInfo.scrapeWeb)});

/**
 *  The bot object.
 */
class EchoBot extends ActivityHandler {
  /**
     *  Setup calls.
     */
  constructor() {
    super();
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => {
      let replyText = '';
      const input = context.activity.text.split(',');
      let fun = Strategies["matchup"];

      replyText = await fun(context.activity.text);
      console.log(replyText);
      // if (input.length == 2) {
      //   try {
      //     replyText = await characterInfo.scrapeWeb(context.activity.text);
      //   } catch (error) {
      //     replyText = `Oops! Something went wrong. Please try again :)`;
      //   }
      // } else if (input.length == 3) {
      //   replyText = await checkViability.checkViability(context.activity.text);
      // } else {
      //   replyText = `Oops! I don't quite understand ${context.activity.text}.\n`;
      //   replyText += 'Be sure to ask me questions in the format:\n';
      //   replyText += 'Command, Character Name i.e.: In competitive play, Peach or update:3.0.0, Kirby';
      // }
      await context.sendActivity(MessageFactory.text(replyText, replyText));
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      let welcomeText = 'Hello and welcome! I\'m the Super Smash Bros Bot.\n';
      welcomeText += 'Ask me a question like this: \n';
      welcomeText += 'Character Name, Command  i.e. Peach, In competitive play';
      for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
        }
      }
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}

module.exports.EchoBot = EchoBot;
