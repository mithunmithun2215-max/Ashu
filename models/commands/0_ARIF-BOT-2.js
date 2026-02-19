////////////////////////////////////////////////////////
// ⚠️ WARNING : CREDIT CHANGE = AUTO DISABLE
// 🤖 YE BOT ARIF BABU NE BANAYA HAI
////////////////////////////////////////////////////////

const fs = global.nodemodule["fs-extra"];

const CREDIT_LOCK = "ARIF BABU";

module.exports.config = {
name: "ARIF-BOT-AUTO",
version: "6.0.0",
hasPermssion: 0,
credits: "ARIF BABU",
description: "Full auto reply system (no prefix)",
commandCategory: "NO PREFIX",
usages: "AUTO",
cooldowns: 5
};

// 🔒 CREDIT PROTECTION
if (module.exports.config.credits !== CREDIT_LOCK) {
throw new Error("❌ CREDITS CHANGE KIYE GAYE! FILE LOCK HO GAYI ARIF BABU KE DWARA");
}

module.exports.handleEvent = async function ({ api, event }) {
if (!event.body) return;

const body = event.body.toLowerCase();
const threadID = event.threadID;

if (["ek kisi tu udhaar de de","kiss me","kiss de","chuma de ek"].includes(body))
return api.sendMessage("Hatt pagle mummy maregi 🙈😒😕😾", threadID);

if (["👍","👍🏻"].includes(event.body))
return api.sendMessage("👍👍👍👍", threadID);

if (["🤮","🤮🤮"].includes(event.body))
return api.sendMessage("Kaunsa mahina chal raha hai 🙂🤟", threadID);

if (["sim","simsimi"].includes(body))
return api.sendMessage("Meri jaan pehle [#] 👈 lagao phir likho sim 🙂🤟", threadID);

if (["hi","hello","hlw","helo"].includes(body))
return api.sendMessage("Hello meri jaan kya haal hai 🙂🤟", threadID);

if (body === "bc")
return api.sendMessage("Ye BC kya hota hai 🤔👈", threadID);

if (["manshi","manshi babu"].includes(body))
return api.sendMessage("Manshi sirf meri babu hai, line mat maar 🤨🤬", threadID);

if (["koi hai","koi h"].includes(body))
return api.sendMessage("Main hoon na jaaneman 🙂🤟", threadID);

if (["...","...."].includes(body))
return api.sendMessage("Mera boss Arif Babu busy hai, batao kya kaam hai 🙂✌️", threadID);

if (["boss","kiska bot hai"].includes(body))
return api.sendMessage("🤖 YE BOT ARIF BABU NE BANAYA HAI 👑", threadID);

if (["bot admin","bot ka admin kon hai"].includes(body))
return api.sendMessage("Mera boss ARIF BABU hai 🙂✌️", threadID);

if (["🙈","🙈🙈"].includes(event.body))
return api.sendMessage("Arey meri babu sharma gayi 😅😅👈", threadID);

if (["sadi karoge","mujhse shadi karoge?"].includes(body))
return api.sendMessage("Shaadi bhi kar lenge pehle ek chuma de do 🙈", threadID);

if (["bot gandu","gandu bot"].includes(body))
return api.sendMessage("Bot ko gaali mat do 🤬😡✌️", threadID);

if (["boss hu tera","boss hu faiz ansari","boss ki bezti kr raha takle"].includes(body))
return api.sendMessage("Sorry boss maaf kar do 🥺🙏", threadID);

if (["gand","gandu","lund","land"].includes(body))
return api.sendMessage("Zyada khujli ho rahi hai kya 😂", threadID);

if (["nice","thank you","thank you bot","thank you maliha"].includes(body))
return api.sendMessage("Main hoon hi itna accha 😌😌👈", threadID);

if (["😡","😤","😠","🤬","😾"].includes(event.body))
return api.sendMessage("Gussa kyun ho rahe ho meri jaan 🥺", threadID);

if (["😞","😔","😣","☹️","😟","😩","😖","😫","😦","😧","😥","😓","😰"].includes(event.body))
return api.sendMessage("Kya hua babu udaas kyun ho 🥺✌️", threadID);

if (["hm","hmm"].includes(body))
return api.sendMessage("Hmm hmm mat kiya karo 😒👈", threadID);

if (["😢","😢😢","🥺","🥹"].includes(event.body))
return api.sendMessage("Arey babu rote nahi 🥺", threadID);

if (["😷","🤕","🤧","🤒"].includes(event.body))
return api.sendMessage("Tabiyat kharab hai kya 😢 medicine la doon 💊", threadID);

if (["name kya h","naam kya hai","naam kiya hai"].includes(body))
return api.sendMessage("Oye tera naam kya hai 😏👈", threadID);

if (["😉","😉😉"].includes(event.body))
return api.sendMessage("Aankh kyun maar rahe ho 🥺🤟", threadID);

if (["😏","😏😏"].includes(event.body))
return api.sendMessage("Kya hua babu 🤔🤟", threadID);

if (["😱","😨"].includes(event.body))
return api.sendMessage("Bhoot dekh liya kya 👻👻", threadID);

if (["🙄","🙄🙄"].includes(event.body))
return api.sendMessage("Main upar nahi neeche hoon 🤨🤟", threadID);

if (["😒","😒😒"].includes(event.body))
return api.sendMessage("Oho mera babu 😛✌️", threadID);

if (["🤦🏻‍♂","🤦🏻‍♀"].includes(event.body))
return api.sendMessage("Apne muh pe kyun maar rahe ho 😅✌️", threadID);

if (["😎"].includes(event.body))
return api.sendMessage("Aapka chashma bekaar hai 😂👈", threadID);

if (["😂","😂😂","😂😂😂","😂😂😂😂","😂😂😂😂😂","😂😂😂😂😂😂"].includes(event.body))
return api.sendMessage("Zyada mat haso warna daant tod dunga 🙂🤟", threadID);

if (["😁","😁😁","😆","🤐","😕","😐"].includes(event.body))
return api.sendMessage("🤨🤨🤨🤨🤨", threadID);

if (["😍","😍😍","😻","🤩"].includes(event.body))
return api.sendMessage("Honthon par hasi, aankhon mein nami 🤭", threadID);

if (["kese ho","kaise ho","kese ho ji","how are you","how are you?"].includes(body))
return api.sendMessage("Main theek hoon, aap kaise ho meri jaan 😇☺", threadID);

if (["🤖"].includes(event.body))
return api.sendMessage("Oye chidh rahe ho mujhe 🙁👈", threadID);

if (["love you","i love you"].includes(body))
return api.sendMessage("I love you too meri jaan 😘", threadID);
};

module.exports.run = function () {};