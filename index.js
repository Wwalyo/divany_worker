'use strict';
const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const antiban = require('./limit-compliance');


antiban(Telegram);

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Да нихрена я не умею'));






bot.startPolling();

