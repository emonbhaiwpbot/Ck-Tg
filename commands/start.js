const bot = global.bot;
const config = global.config;

bot.onText(/\/start/, async (msg) => {

    const text = `
🔥 Welcome To ${config.brand}

আপনি আমাদের Trading Community তে Join করার জন্য Registration করতে যাচ্ছেন।

━━━━━━━━━━━━━━━

📋 নিচের FORM টি Copy করুন 👇

┏━━━━━━━━━━━━━━━┓

📌 TRADING COMMUNITY REGISTRATION FORM

🔹 ব্যক্তিগত তথ্যঃ
নাম:
ইউজারনেম:
বয়স:
দেশ:

🔹 ট্রেডিং তথ্যঃ
অভিজ্ঞতা: (Beginner / Intermediate / Advanced)
ট্রেডিং টাইপ: (Crypto / Forex / Both)
পছন্দের স্ট্র্যাটেজি:
মাসিক লক্ষ্য:

🔹 অ্যাকাউন্ট তথ্যঃ
আপনার ট্রেডিং অ্যাকাউন্ট আছে? (Yes/No)
থাকলে প্ল্যাটফর্মের নাম:
পোর্টফোলিও সাইজ:

🔹 রুলস এগ্রিমেন্টঃ
আপনি কি গ্রুপের সকল নিয়ম মানবেন? (Yes/No)

┗━━━━━━━━━━━━━━━┛

⚠️ নির্দেশনাঃ

1️⃣ উপরের FORM টি Copy করুন
2️⃣ সব তথ্য সঠিকভাবে পূরণ করুন
3️⃣ Filled FORM এখানে পাঠান
4️⃣ তারপর /done লিখুন

⏳ এরপর Admin Approval এর জন্য অপেক্ষা করুন

🏷️ ${config.brand}
`;

    bot.sendMessage(msg.chat.id, text);

});
