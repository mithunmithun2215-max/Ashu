module.exports.config = {
  name: "pair",
  version: "4.5.2",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "Pair DP with random background",
  usePrefix: true,
  commandCategory: "PAIR-1",
  usages: "[reply | mention | random]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "canvas": ""
  }
};

module.exports.run = async function ({ api, event, Users }) {
  const { createCanvas, loadImage } = require("canvas");
  const fs = require("fs-extra");
  const axios = require("axios");

  const cache = __dirname + "/cache/";
  if (!fs.existsSync(cache)) fs.mkdirSync(cache, { recursive: true });

  const outPath = cache + "pair.png";
  const a1 = cache + "a1.png";
  const a2 = cache + "a2.png";
  const bgPath = cache + "bg.jpg";

  const id1 = event.senderID;
  const name1 = await Users.getNameUser(id1);
  let id2;

  if (event.messageReply?.senderID) {
    id2 = event.messageReply.senderID;
  } else if (Object.keys(event.mentions || {}).length === 1) {
    id2 = Object.keys(event.mentions)[0];
  } else {
    const info = await api.getThreadInfo(event.threadID);
    const mem = info.participantIDs.filter(
      i => i !== id1 && i !== api.getCurrentUserID()
    );
    id2 = mem[Math.floor(Math.random() * mem.length)];
  }

  const name2 = await Users.getNameUser(id2);

  // ===== COMPATIBILITY =====
  const percent = Math.floor(Math.random() * 41) + 60; // 60–100%

  const token = "6628568379|c1e620fa708a1d5696fb991c1bde5662";

  // ===== AVATARS =====
  const av1 = await axios.get(
    `https://graph.facebook.com/${id1}/picture?type=large&access_token=${token}`,
    { responseType: "arraybuffer" }
  );
  fs.writeFileSync(a1, av1.data);

  const av2 = await axios.get(
    `https://graph.facebook.com/${id2}/picture?type=large&access_token=${token}`,
    { responseType: "arraybuffer" }
  );
  fs.writeFileSync(a2, av2.data);

  // ===== RANDOM BACKGROUND FIX =====
  const bgList = [
    "https://i.ibb.co/rKCRrM38/7c477539a1a4.jpg",
    "https://i.ibb.co/1YsKm0Sz/37b570d3f5df.jpg"
  ];

  const bgUrl = bgList[Math.floor(Math.random() * bgList.length)];
  const bgImg = await axios.get(bgUrl, { responseType: "arraybuffer" });
  fs.writeFileSync(bgPath, bgImg.data);

  // ===== CANVAS =====
  const W = 1920;
  const H = 1080;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");

  const bg = await loadImage(bgPath);
  ctx.drawImage(bg, 0, 0, W, H);

  const img1 = await loadImage(a1);
  const img2 = await loadImage(a2);

  // ===== DP POSITION (NO CUT) =====
  const r = 230;
  const leftX = 480;
  const rightX = 1440;
  const fixedY = 540; // 🔥 PERFECT CENTER

  drawCircle(ctx, img1, leftX, fixedY, r);
  drawCircle(ctx, img2, rightX, fixedY, r);

  ring(ctx, leftX, fixedY, r + 12);
  ring(ctx, rightX, fixedY, r + 12);

  fs.writeFileSync(outPath, canvas.toBuffer("image/png"));

  fs.unlinkSync(a1);
  fs.unlinkSync(a2);
  fs.unlinkSync(bgPath);

  // ===== SEND =====
  return api.sendMessage(
    {
      body:
`👤 ${name1}
💞 ${name2}
🆔 𝐔𝐈𝐃: ${id1} & ${id2}
📊 𝐂𝐨𝐦𝐩𝐚𝐭𝐢𝐛𝐢𝐥𝐢𝐭𝐲: ${percent}%

💬 "Rab Ne Bana Di Jodi! ✨"`,
      mentions: [
        { id: id1, tag: name1 },
        { id: id2, tag: name2 }
      ],
      attachment: fs.createReadStream(outPath)
    },
    event.threadID,
    () => fs.unlinkSync(outPath),
    event.messageID
  );
};

// ===== FUNCTIONS =====
function drawCircle(ctx, img, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, x - r, y - r, r * 2, r * 2);
  ctx.restore();
}

function ring(ctx, x, y, r) {
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
}