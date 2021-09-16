'use strict';

const Telegraf = require('telegraf');


const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}


const bot = new Telegraf(token);

bot.on('text', (ctx) => ctx.reply('Да блядь'));






bot.launch()

