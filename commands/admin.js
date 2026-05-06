const bot = global.bot;
const config = global.config;

bot.onText(/\/users/, async (msg) => {

    if (msg.from.id.toString() !== config.adminId.toString()) {
        return;
    }

    const fs = require('fs');

    const data = JSON.parse(
        fs.readFileSync('./database/users.json')
    );

    bot.sendMessage(msg.chat.id,
        `📊 মোট সাবমিশনঃ ${data.length}\n\n🏷️ ${config.brand}`
    );

});
