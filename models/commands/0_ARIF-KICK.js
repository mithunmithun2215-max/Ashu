// ================= CREATOR LOCK =================
const CREATOR_LOCK = (() => {
  const encoded = "QVJJRiBCQUJV";
  return Buffer.from(encoded, "base64").toString("utf8");
})();

module.exports.config = {
  name: "kick",
  version: "3.0.0",
  hasPermssion: 1,
  credits: "ARIF BABU", 
  description: "Group se member ya sab members ko remove kare",
  commandCategory: "Group",
  usages: "@user / all",
  cooldowns: 5
};

// 🔐 HARD CREDIT PROTECTION
if (!module.exports.config.credits || module.exports.config.credits !== CREATOR_LOCK) {
  console.log("❌ CREATOR LOCK ACTIVATED! Credits modified.");

  module.exports.run = async function ({ api, event }) {
    return api.sendMessage(
      "❌ This command is locked by creator.\nCredits cannot be modified.",
      event.threadID,
      event.messageID
    );
  };

  module.exports.handleEvent = () => {};
  return;
}

// ================= MAIN COMMAND =================
module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID, mentions } = event;

  try {
    const threadInfo = await api.getThreadInfo(threadID);

    // 🔒 Group check
    if (!threadInfo.isGroup) {
      return api.sendMessage("❌ Ye command sirf group me chalegi.", threadID, messageID);
    }

    // 🔒 Admin check
    const isAdmin = threadInfo.adminIDs.some(admin => admin.id == senderID);
    if (!isAdmin) {
      return api.sendMessage("❌ Sirf group admin is command ko use kar sakta hai.", threadID, messageID);
    }

    const botID = api.getCurrentUserID();

    // ================= KICK ALL =================
    if (args[0] && args[0].toLowerCase() === "all") {

      const membersToKick = threadInfo.participantIDs.filter(uid => {
        const isAdminMember = threadInfo.adminIDs.some(admin => admin.id == uid);
        return uid != botID && !isAdminMember;
      });

      if (membersToKick.length === 0) {
        return api.sendMessage("❌ Kick karne ke liye koi non-admin member nahi mila.", threadID);
      }

      api.sendMessage("⚠️ Sab non-admin members ko remove kiya ja raha hai...", threadID);

      for (const uid of membersToKick) {
        api.removeUserFromGroup(uid, threadID);
      }

      return api.sendMessage(
        `✅ Successfully ${membersToKick.length} members ko remove kar diya gaya.`,
        threadID
      );
    }

    // ================= SINGLE USER KICK =================
    if (Object.keys(mentions).length === 0) {
      return api.sendMessage(
        "❌ Jise kick karna hai use mention karo.\n\nExample:\n.kick @user\n.kick all",
        threadID,
        messageID
      );
    }

    const userIDToKick = Object.keys(mentions)[0];
    const userName = mentions[userIDToKick].replace("@", "");

    // 🤖 Bot protection
    if (userIDToKick == botID) {
      return api.sendMessage("❌ Main khud ko remove nahi kar sakta.", threadID, messageID);
    }

    // 🔒 Target admin protection
    const isTargetAdmin = threadInfo.adminIDs.some(admin => admin.id == userIDToKick);
    if (isTargetAdmin) {
      return api.sendMessage("❌ Admin ko remove nahi kiya ja sakta.", threadID, messageID);
    }

    api.sendMessage(`⏳ ${userName} ko remove kiya ja raha hai...`, threadID);

    api.removeUserFromGroup(userIDToKick, threadID, (err) => {
      if (err) {
        return api.sendMessage(
          "❌ User ko remove nahi kiya ja saka.\nCheck karo:\n- Bot admin hai ya nahi\n- User group me hai ya nahi",
          threadID
        );
      }

      return api.sendMessage(`✅ Successfully ${userName} ko remove kar diya gaya.`, threadID);
    });

  } catch (error) {
    console.log("Kick Command Error:", error);
    return api.sendMessage(
      "❌ Command execute karte waqt error aa gaya.",
      threadID,
      messageID
    );
  }
};