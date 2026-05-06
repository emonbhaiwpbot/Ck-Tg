const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');

const bot = new TelegramBot(config.token, {
    polling: true
});

global.bot = bot;
global.config = config;

require('./commands/start');
require('./commands/done');
require('./commands/admin');

console.log(`${config.brand} Bot Running...`);
