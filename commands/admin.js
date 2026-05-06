const bot = global.bot;
const config = global.config;

bot.onText(/\/approve (.+)/, async (msg, match) => {

    if (msg.from.id.toString() !== config.adminId.toString()) {
        return;
    }

    const userId = match[1];

    bot.sendMessage(
        userId,
        `🎉 অভিনন্দন!

✅ আপনার Registration Approved হয়েছে।

এখন আপনি আমাদের Trading Community তে Join করতে পারবেন।

❤️ Welcome To ${config.brand}`
    );

    bot.sendMessage(
        msg.chat.id,
        `✅ User Approved Successfully`
    );

});

bot.onText(/\/reject (.+)/, async (msg, match) => {

    if (msg.from.id.toString() !== config.adminId.toString()) {
        return;
    }

    const userId = match[1];

    bot.sendMessage(
        userId,
        `❌ দুঃখিত!

আপনার Registration Reject করা হয়েছে।

সঠিক তথ্য দিয়ে আবার চেষ্টা করুন।

🏷️ ${config.brand}`
    );

    bot.sendMessage(
        msg.chat.id,
        `❌ User Rejected Successfully`
    );

});
