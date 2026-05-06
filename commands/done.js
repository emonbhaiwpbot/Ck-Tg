const bot = global.bot;
const config = global.config;
const saveUser = require("../utils/saveUser");

const pendingForms = {};

bot.on("message", async (msg) => {

    if (!msg.text) return;

    if (msg.text.startsWith("/")) return;

    pendingForms[msg.from.id] = msg.text;

});

bot.onText(/\/done/, async (msg) => {

    const user = msg.from;
    const form = pendingForms[user.id];

    if (!form) {
        return bot.sendMessage(
            msg.chat.id,
            `❌ আগে ফর্ম পূরণ করে পাঠান তারপর /done দিন\n\n🏷️ ${config.brand}`
        );
    }

    const userData = {
        id: user.id,
        name: user.first_name || "No Name",
        username: user.username || "No Username",
        form: form,
        status: "Pending"
    };

    await saveUser(userData);

    const adminMessage = `
📥 নতুন Registration Request এসেছে

👤 নামঃ ${user.first_name}

🔗 ইউজারনেমঃ @${user.username || "none"}

🆔 ইউজার আইডিঃ ${user.id}

━━━━━━━━━━━━━━━

📄 User Form:

${form}

━━━━━━━━━━━━━━━
🏷️ ${config.brand}
`;

    bot.sendMessage(config.adminId, adminMessage, {
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "✅ Approve",
                        callback_data: `approve_${user.id}`
                    },
                    {
                        text: "❌ Reject",
                        callback_data: `reject_${user.id}`
                    }
                ]
            ]
        }
    });

    bot.sendMessage(
        msg.chat.id,
        `✅ আপনার ফর্ম সফলভাবে জমা হয়েছে।

⏳ এখন Admin approval এর জন্য অপেক্ষা করুন।

🏷️ ${config.brand}`
    );

});
