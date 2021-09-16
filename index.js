'use strict';
const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const antiban = require('./limit-compliance');


antiban(Telegram);

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command(['echo', 'echo@divany_worker_bot'], async (ctx) => {
  const result = await ctx.reply("слышу");
});






bot.startPolling();

