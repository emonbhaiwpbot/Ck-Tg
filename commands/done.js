const bot = global.bot;
const config = global.config;
const saveUser = require("../utils/saveUser");

const forms = {};

bot.on("message", async (msg) => {

    if (!msg.text) return;

    if (msg.text.startsWith("/")) return;

    forms[msg.from.id] = msg.text;

});

bot.onText(/\/done/, async (msg) => {

    const user = msg.from;

    const form = forms[user.id];

    if (!form) {

        return bot.sendMessage(
            msg.chat.id,
            `❌ আগে ফর্ম পাঠান তারপর /done দিন।

🏷️ ${config.brand}`
        );

    }

    const data = {
        id: user.id,
        name: user.first_name || "No Name",
        username: user.username || "No Username",
        form: form,
        status: "Pending",
        time: new Date().toLocaleString()
    };

    await saveUser(data);

    const adminText = `
📥 নতুন Registration এসেছে

👤 নামঃ ${user.first_name}

🔗 Usernameঃ @${user.username || "none"}

🆔 UIDঃ ${user.id}

━━━━━━━━━━━━━━━

📄 USER FORM:

${form}

━━━━━━━━━━━━━━━

✅ Approve:
/approve ${user.id}

❌ Reject:
/reject ${user.id}

🏷️ ${config.brand}
`;

    bot.sendMessage(config.adminId, adminText);

    bot.sendMessage(
        msg.chat.id,
        `✅ আপনার ফর্ম সফলভাবে জমা হয়েছে।

⏳ এখন Admin approval এর জন্য অপেক্ষা করুন।

🏷️ ${config.brand}`
    );

});
