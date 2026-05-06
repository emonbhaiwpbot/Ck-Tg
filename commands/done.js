const bot = global.bot;
const config = global.config;
const saveUser = require("../utils/saveUser");

const forms = {};

bot.onText(/\/sent([\s\S]*)/, async (msg, match) => {

    const userId = msg.from.id;

    const formText = match[1]?.trim();

    if (!formText) {

        return bot.sendMessage(
            msg.chat.id,
            `❌ Form লিখে /sent দিন।

Example:

/sent
নাম: Your Name

🏷️ ${config.brand}`
        );

    }

    forms[userId] = formText;

    bot.sendMessage(
        msg.chat.id,
        `✅ Form Save হয়েছে।

এখন /done দিন Submit করার জন্য।

🏷️ ${config.brand}`
    );

});

bot.onText(/\/done/, async (msg) => {

    const user = msg.from;
    const userId = user.id;

    const form = forms[userId];

    if (!form) {

        return bot.sendMessage(
            msg.chat.id,
            `❌ আগে Form পাঠান তারপর /done দিন।

Example:

/sent
আপনার form

তারপর:
/done

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
        `✅ আপনার Form সফলভাবে Submit হয়েছে।

⏳ এখন Admin approval এর জন্য অপেক্ষা করুন।

🏷️ ${config.brand}`
    );

    delete forms[userId];

});
