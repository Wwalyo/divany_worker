'use strict';
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const Telegram = require('telegraf/telegram');
const antiban = require('./limit-compliance');
const api = require('./api');
const utils = require('./utils')

antiban(Telegram);

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Да нихрена я не умею'));






bot.startPolling();

