const bot = global.bot;
const config = global.config;
const saveUser = require("../utils/saveUser");

const forms = {};

function checkForm(text) {

    const required = [
        "Full Name:",
        "Username",
        "Age:",
        "Country:",
        "Experience Level:",
        "Trading Type:",
        "Preferred Strategy:",
        "Monthly Goal:",
        "Do you have a trading account?",
        "Platform Name:",
        "Portfolio Size",
        "Do you agree to follow all group rules?"
    ];

    for (const item of required) {
        if (!text.includes(item)) {
            return false;
        }
    }

    if (text.length < 200) {
        return false;
    }

    return true;
}

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
            `❌ আগে ফর্ম পূরণ করে পাঠান তারপর /done দিন।

🏷️ ${config.brand}`
        );
    }

    const valid = checkForm(form);

    if (!valid) {

        return bot.sendMessage(
            msg.chat.id,
            `⚠️ ফর্মটি সঠিকভাবে পূরণ করা হয়নি।

দয়া করে সব তথ্য ঠিকভাবে দিন।
কোনো কিছু বাদ দিবেন না।

📌 Full Name
📌 Username
📌 Age
📌 Country
📌 Trading Details
📌 Portfolio
📌 Rules Agreement

সব পূরণ করে আবার /done দিন।

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

${form}

━━━━━━━━━━━━━━━

✅ Approve করতে:
/approve ${user.id}

❌ Reject করতে:
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
