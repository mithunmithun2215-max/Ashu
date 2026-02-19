const fs = require("fs");

module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  hasPermssion: 0,
  // ⚠️ DO NOT CHANGE - CREDIT LOCK
  credits: "ARIF BABU",
  description: "THIS BOT IS MADE BY ARIF BABU",
  commandCategory: "BOT-PREFIX",
  usages: "PREFIX",
  cooldowns: 5,
};

// 🔐 CREDIT LOCK
if (module.exports.config.credits !== "ARIF BABU") {
  throw new Error(
    "\n\n❌ CREDITS CHANGED!\n🔒 THIS COMMAND IS LOCKED BY ARIF BABU\nCOMMAND STOPPED\n"
  );
}

// ⭐ OWNER UID
const OWNER_UID = "61572909482910";

// ⭐ COMMON FUNCTION – Prefix Info
async function sendPrefixInfo(api, threadID, messageID) {
  const threadSetting =
    global.data.threadData.get(parseInt(threadID)) || {};

  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const botName = global.config.BOTNAME || "Unknown";
  const botID = api.getCurrentUserID();
  const totalCmd = global.client?.commands?.size || "N/A";
  const totalUsers = global.data?.allUserID?.length || "N/A";
  const totalThreads = global.data?.allThreadID?.length || "N/A";

  const messageText = 
`╭─────────────────────────────╮
│ 📌 𝗣𝗥𝗘𝗙𝗜𝗫 𝗜𝗡𝗙𝗢   │
╰─────────────────────────────╯

┏🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${botName}
┗🆔 𝗕𝗼𝘁 𝗜𝗗: ${botID}

┏📌 𝗣𝗿𝗲𝗳𝗶𝘅: ${prefix}
┗📊 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${totalCmd}

┏👥 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿𝘀: ${totalUsers}
┗💬 𝗧𝗼𝘁𝗮𝗹 𝗧𝗵𝗿𝗲𝗮𝗱𝘀: ${totalThreads}

┗━━━━━━━━━━━━━━━━┛`;

  api.shareContact(messageText, OWNER_UID, threadID, async (err, info) => {
    if (err) return;
    await new Promise(resolve => setTimeout(resolve, 15000));
    return api.unsendMessage(info.messageID);
  });
}

// ⭐ NO-PREFIX Trigger
module.exports.handleEvent = async ({ event, api }) => {
  const { threadID, body } = event;

  const triggers = [
    "mpre", "mprefix", "prefix", "dấu lệnh", "prefix của bot là gì",
    "daulenh", "duong", "what prefix", "freefix",
    "what is the prefix", "bot dead", "bots dead", "where prefix",
    "what is bot", "what prefix bot", "how to use bot", "how use bot",
    "where are the bots", "bot not working", "bot is offline",
    "prefx", "prfix", "prifx", "perfix", "bot not talking"
  ];

  if (!body) return;

  for (const w of triggers) {
    const formatted = w.charAt(0).toUpperCase() + w.slice(1);

    if (body === w || body === w.toUpperCase() || body === formatted) {
      return sendPrefixInfo(api, threadID);
    }
  }
};

// ⭐ NORMAL Command (.prefix, !prefix etc)
module.exports.run = async ({ event, api }) => {
  return sendPrefixInfo(api, event.threadID, event.messageID);
};