const bot = global.bot;
const config = global.config;
const saveUser = require("../utils/saveUser");

const forms = {};
const waitingForForm = {};

bot.onText(/\/start/, async (msg) => {

    waitingForForm[msg.from.id] = true;

});

bot.on("message", async (msg) => {

    if (!msg.text) return;

    if (msg.text.startsWith("/")) return;

    const userId = msg.from.id;

    if (!waitingForForm[userId]) return;

    forms[userId] = msg.text;

});

bot.onText(/\/done/, async (msg) => {

    const user = msg.from;
    const userId = user.id;

    const form = forms[userId];

    if (!form) {

        return bot.sendMessage(
            msg.chat.id,
            `❌ আগে Form পাঠান তারপর /done দিন।

🏷️ ${config.brand}`
        );

    }

    waitingForForm[userId] = false;

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
        `✅ আপনার Form সফলভাবে জমা হয়েছে।

⏳ এখন Admin approval এর জন্য অপেক্ষা করুন।

🏷️ ${config.brand}`
    );

    delete forms[userId];

});
