const bot = global.bot;
const config = global.config;
const saveUser = require("../utils/saveUser");

const forms = {};

function isCooldown(userId) {

    const now = Date.now();

    if (global.cooldown.has(userId)) {

        const last = global.cooldown.get(userId);

        if (now - last < 3000) {
            return true;
        }

    }

    global.cooldown.set(userId, now);

    return false;
}

bot.onText(/\/sent([\s\S]*)/, async (msg, match) => {

    const userId = msg.from.id;

    if (isCooldown(userId)) return;

    const formText = match[1]?.trim();

    if (!formText) {

        return bot.sendMessage(
            msg.chat.id,
            `❌ Form লিখে /sent দিন।

🏷️ ${config.brand}`
        );

    }

    forms[userId] = formText;

    bot.sendMessage(
        msg.chat.id,
        `✅ Form Save হয়েছে।

📩 এখন /done দিন Submit করার জন্য।

🏷️ ${config.brand}`
    );

});

bot.onText(/\/done/, async (msg) => {

    const userId = msg.from.id;

    if (isCooldown(userId)) return;

    const form = forms[userId];

    if (!form) {

        return bot.sendMessage(
            msg.chat.id,
            `❌ আগে /sent দিয়ে Form পাঠান তারপর /done দিন।

🏷️ ${config.brand}`
        );

    }

    const user = msg.from;

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
        `✅ আপনার Form Submit হয়েছে।

⏳ এখন Admin approval এর জন্য অপেক্ষা করুন।

🏷️ ${config.brand}`
    );

    delete forms[userId];

});
