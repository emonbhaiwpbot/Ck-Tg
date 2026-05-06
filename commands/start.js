const bot = global.bot;
const config = global.config;

bot.onText(/\/start/, async (msg) => {

    const text = `
📌 *TRADING COMMUNITY REGISTRATION FORM*

🔹 *ব্যক্তিগত তথ্যঃ*
নাম:
ইউজারনেম:
বয়স:
দেশ:

🔹 *ট্রেডিং তথ্যঃ*
অভিজ্ঞতা: (Beginner / Intermediate / Advanced)
ট্রেডিং টাইপ: (Crypto / Forex / Both)
পছন্দের স্ট্র্যাটেজি:
মাসিক লক্ষ্য:

🔹 *অ্যাকাউন্ট তথ্যঃ*
আপনার ট্রেডিং অ্যাকাউন্ট আছে? (Yes/No)
থাকলে প্ল্যাটফর্মের নাম:
পোর্টফোলিও সাইজ:

🔹 *রুলস এগ্রিমেন্টঃ*
আপনি কি গ্রুপের সকল নিয়ম মানবেন? (Yes/No)

━━━━━━━━━━━━━━━
⚠️ *নির্দেশনাঃ*
1. এই ফর্ম কপি করুন
2. সব তথ্য পূরণ করুন
3. এখানে পাঠান
4. তারপর /done লিখুন

⏳ *ফর্ম সাবমিটের পর অ্যাডমিন এপ্রুভালের জন্য অপেক্ষা করুন*

🏷️ ${config.brand}
`;

    bot.sendMessage(msg.chat.id, text, {
        parse_mode: 'Markdown'
    });

});
