const bot = global.bot;
const config = global.config;
const saveUser = require('../utils/saveUser');

const userData = {};

bot.on('message', async (msg) => {

    if (!msg.text) return;

    if (msg.text.startsWith('/')) return;

    userData[msg.from.id] = msg.text;

});

bot.onText(/\/done/, async (msg) => {

    const user = msg.from;

    const data = userData[user.id];

    if (!data) {
        return bot.sendMessage(msg.chat.id,
            `❌ আগে ফর্ম পূরণ করে পাঠান তারপর /done দিন\n\n🏷️ ${config.brand}`
        );
    }

    const saveData = {
        id: user.id,
        name: user.first_name || "No Name",
        username: user.username || "No Username",
        number: msg.contact ? msg.contact.phone_number : "Hidden",
        form: data,
        time: new Date().toLocaleString()
    };

    await saveUser(saveData);

    const adminText = `
📥 *নতুন রেজিস্ট্রেশন এসেছে*

👤 নামঃ ${user.first_name}

🔗 ইউজারনেমঃ @${user.username || "None"}

🆔 ইউজার আইডিঃ ${user.id}

📄 ফর্মঃ

${data}

━━━━━━━━━━━━━━━
🏷️ ${config.brand}
`;

    bot.sendMessage(config.adminId, adminText, {
        parse_mode: 'Markdown'
    });

    bot.sendMessage(msg.chat.id,
        `✅ আপনার রিকোয়েস্ট সফলভাবে জমা হয়েছে।

⏳ একটু অপেক্ষা করুন...
অ্যাডমিন খুব দ্রুত আপনার রিকোয়েস্ট রিভিউ করবে।

❤️ ধন্যবাদ ${user.first_name}

🏷️ ${config.brand}`
    );

});
