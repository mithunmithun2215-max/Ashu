const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

// ================= CREATOR LOCK =================
const CREATOR_LOCK = (() => {
  const encoded = "QVJJRiBCQUJV";
  return Buffer.from(encoded, "base64").toString("utf8");
})();

module.exports.config = {
  name: "group",
  version: "1.0.1",
  hasPermssion: 1, // only admin
  credits: "ARIF BABU",
  description: "Group management (name, emoji, image, admin add)",
  commandCategory: "Group",
  usages: "group",
  cooldowns: 5
};

// 🔐 Credit Check
if (module.exports.config.credits !== CREATOR_LOCK) {
  console.log("❌ Creator Lock Activated! Credits cannot be changed.");
  module.exports.run = () => {};
  return;
}

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  // 🔹 Help menu
  if (!args || args.length === 0) {
    const helpMessage =
      `📋 Group Management Commands\n\n` +
      `1️⃣ group name <new name>\n` +
      `• Change group name\n` +
      `• Example: group name My Group\n\n` +
      `2️⃣ group emoji <emoji>\n` +
      `• Change group emoji\n` +
      `• Example: group emoji 🔥\n\n` +
      `3️⃣ group image\n` +
      `• Change group photo (reply to image)\n\n` +
      `4️⃣ group adminadd @mention\n` +
      `• Make user admin\n\n` +
      `⚠️ Bot & user must be group admin`;

    return api.sendMessage(helpMessage, threadID, messageID);
  }

  const sub = args[0].toLowerCase();

  try {
    switch (sub) {
      case "name":
        return handleGroupName(api, event, args.slice(1));

      case "emoji":
        return handleGroupEmoji(api, event, args.slice(1));

      case "image":
      case "photo":
      case "pic":
        return handleGroupImage(api, event);

      case "adminadd":
      case "addadmin":
        return handleAdminAdd(api, event);

      default:
        return api.sendMessage(
          `❌ Unknown option: ${sub}\nUse: group`,
          threadID,
          messageID
        );
    }
  } catch (e) {
    console.log(e);
    return api.sendMessage(
      "❌ Error while executing group command",
      threadID,
      messageID
    );
  }
};

/* ================= FUNCTIONS ================= */

async function handleGroupName(api, event, args) {
  const { threadID, messageID } = event;

  if (!args.length)
    return api.sendMessage(
      "❌ Group name likho\nExample: group name New Group",
      threadID,
      messageID
    );

  const name = args.join(" ");

  await api.setTitle(name, threadID);
  return api.sendMessage(
    `✅ Group name changed\n📝 ${name}`,
    threadID
  );
}

async function handleGroupEmoji(api, event, args) {
  const { threadID, messageID } = event;

  if (!args.length)
    return api.sendMessage(
      "❌ Emoji do\nExample: group emoji 😎",
      threadID,
      messageID
    );

  await api.changeThreadEmoji(args[0], threadID);
  return api.sendMessage(
    `✅ Group emoji changed ${args[0]}`,
    threadID
  );
}

async function handleGroupImage(api, event) {
  const { threadID, messageID, messageReply } = event;

  if (!messageReply || !messageReply.attachments.length)
    return api.sendMessage(
      "❌ Image pe reply karo",
      threadID,
      messageID
    );

  const img = messageReply.attachments.find(a => a.type === "photo");
  if (!img)
    return api.sendMessage("❌ Photo nahi mila", threadID, messageID);

  const tempPath = path.join(__dirname, "cache");
  if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath);

  const filePath = path.join(tempPath, `group_${Date.now()}.jpg`);
  const res = await axios.get(img.url, { responseType: "arraybuffer" });
  fs.writeFileSync(filePath, res.data);

  await api.changeGroupImage(fs.createReadStream(filePath), threadID);
  fs.unlinkSync(filePath);

  return api.sendMessage("✅ Group image updated 📸", threadID);
}

async function handleAdminAdd(api, event) {
  const { threadID, messageID, mentions } = event;

  if (!mentions || !Object.keys(mentions).length)
    return api.sendMessage(
      "❌ Kisi user ko mention karo",
      threadID,
      messageID
    );

  const uid = Object.keys(mentions)[0];
  await api.changeAdminStatus(threadID, uid, true);

  return api.sendMessage(
    `✅ Admin bana diya ${mentions[uid]}`,
    threadID
  );
}