const bot = global.bot;
const config = global.config;

bot.on("callback_query", async (query) => {

    const adminId = query.from.id;

    if (adminId.toString() !== config.adminId.toString()) {
        return bot.answerCallbackQuery(query.id, {
            text: "❌ Only Admin Can Use This"
        });
    }

    const data = query.data;

    if (data.startsWith("approve_")) {

        const userId = data.split("_")[1];

        bot.sendMessage(
            userId,
            `🎉 অভিনন্দন!

✅ আপনার Registration Approved হয়েছে।

এখন আপনি আমাদের Trading Community তে join করতে পারবেন।

❤️ Welcome To ${config.brand}`
        );

        bot.editMessageReplyMarkup(
            { inline_keyboard: [] },
            {
                chat_id: query.message.chat.id,
                message_id: query.message.message_id
            }
        );

        bot.answerCallbackQuery(query.id, {
            text: "✅ User Approved"
        });

    }

    if (data.startsWith("reject_")) {

        const userId = data.split("_")[1];

        bot.sendMessage(
            userId,
            `❌ দুঃখিত!

আপনার Registration আপাতত Approved হয়নি।

সঠিক তথ্য দিয়ে আবার চেষ্টা করুন।

🏷️ ${config.brand}`
        );

        bot.editMessageReplyMarkup(
            { inline_keyboard: [] },
            {
                chat_id: query.message.chat.id,
                message_id: query.message.message_id
            }
        );

        bot.answerCallbackQuery(query.id, {
            text: "❌ User Rejected"
        });

    }

});
