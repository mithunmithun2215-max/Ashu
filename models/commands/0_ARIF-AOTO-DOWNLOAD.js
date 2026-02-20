const CREATOR_LOCK = (() => {
  const encoded = "QVJJRiBCQUJV";
  return Buffer.from(encoded, "base64").toString("utf8");
})();

module.exports = {
  config: {
    name: "linkAutoDownload",
    version: "1.4.0",
    hasPermssion: 0,
    credits: "ARIF BABU",
    description: "Automatically detects links in messages and downloads the file.",
    commandCategory: "Utilities",
    usages: "",
    cooldowns: 5,
  },

  /* ================= CREATOR LOCK ================= */
  onLoad: function () {
    const fs = require("fs");

    // 🔐 Credit Check (Base64 Protected)
    if (this.config.credits !== CREATOR_LOCK) {
      console.log("\n❌ Creator Lock Activated! Credits cannot be changed ❌\n");
      process.exit(1);
    }

    // 🔐 Extra Self File Protection
    const fileData = fs.readFileSync(__filename, "utf8");
    if (!fileData.includes("QVJJRiBCQUJV")) {
      console.log("\n❌ Lock Tampered! File Disabled ❌\n");
      process.exit(1);
    }
  },
  /* ================================================= */

  run: async function () {},

  handleEvent: async function ({ api, event }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const { alldown } = require("arif-babu-downloader");

    const body = (event.body || "").toLowerCase();

    if (!body.startsWith("https://")) return;

    try {
      api.setMessageReaction("⏳", event.messageID, () => {}, true);

      const data = await alldown(event.body);

      if (!data || !data.data || !data.data.high) {
        return api.sendMessage("❌ Valid download link not found.", event.threadID);
      }

      const videoURL = data.data.high;

      const buffer = (
        await axios.get(videoURL, { responseType: "arraybuffer" })
      ).data;

      const filePath = __dirname + "/cache/auto.mp4";
      fs.writeFileSync(filePath, buffer);

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      return api.sendMessage(
        {
          body: "",
          attachment: fs.createReadStream(filePath),
        },
        event.threadID,
        event.messageID
      );
    } catch (err) {
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      return api.sendMessage("", event.threadID);
    }
  },
};