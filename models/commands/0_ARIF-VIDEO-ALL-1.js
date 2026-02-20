const fs = require("fs");
const axios = require("axios");
const path = require("path");

// ===== MODULE CONFIG =====
module.exports.config = {
name: "videoall",
version: "1.0.1",
hasPermssion: 0,
credits: "ARIF BABU",
description: "GirlVideo & TikTok random video sender",
commandCategory: "Random-VIDEO",
usages: "girlvideo / tiktok",
cooldowns: 3,
};

// ===== DEFAULT PREFIX FOR COMMANDS =====
const PREFIX = "!"; // Change this to your preferred prefix

// ===== HARD CREATOR LOCK =====
const CREATOR_LOCK = (() => {
const encoded = "QVJJRiBCQUJV"; // ARIF BABU
return Buffer.from(encoded, "base64").toString("utf8");
})();

if (module.exports.config.credits !== CREATOR_LOCK) {
console.log("❌ Creator Lock Activated!");
module.exports.run = () => {};
module.exports.handleEvent = () => {};
return;
}

// ===== HANDLE EVENT =====
module.exports.handleEvent = async function ({ api, event }) {
const { body, threadID, messageID } = event;
if (!body) return;

// Check if message starts with prefix, otherwise treat as direct command
let command = body.trim();
if (command.startsWith(PREFIX)) {
    command = command.slice(PREFIX.length).trim();
} else {
    command = command.toLowerCase(); // direct match (no prefix)
}

if (!command) return;

const categories = {  
    girlvideo: {  
        links: [  
            "https://i.imgur.com/ZCmkPTO.mp4",  
            "https://i.imgur.com/JA8jUCD.mp4",  
            "https://i.imgur.com/W3N3f9Y.mp4",  
            "https://i.imgur.com/sAIueiC.mp4"  
        ],  
        reaction: "✅"  
    },  
    tiktok: {  
        links: [  
            "https://i.imgur.com/ZCmkPTO.mp4",  
            "https://i.imgur.com/JA8jUCD.mp4",  
            "https://i.imgur.com/W3N3f9Y.mp4",  
            "https://i.imgur.com/sAIueiC.mp4"  
        ],  
        reaction: "🥳"  
    }  
};  

if (!categories[command]) return;  

const randomLink =  
    categories[command].links[  
        Math.floor(Math.random() * categories[command].links.length)  
    ];  

// ===== CACHE FOLDER =====  
const cacheDir = path.join(__dirname, "cache");  
if (!fs.existsSync(cacheDir)) {  
    fs.mkdirSync(cacheDir, { recursive: true });  
}  

const filePath = path.join(cacheDir, `${Date.now()}.mp4`);  

try {  
    const response = await axios.get(randomLink, {  
        responseType: "arraybuffer",  
        headers: {  
            "User-Agent": "Mozilla/5.0"  
        }  
    });  

    fs.writeFileSync(filePath, response.data);  

    await api.sendMessage(  
        {  
            body: "",  
            attachment: fs.createReadStream(filePath)  
        },  
        threadID,  
        () => {  
            fs.unlinkSync(filePath);  
        },  
        messageID  
    );  

    api.setMessageReaction(categories[command].reaction, messageID, () => {}, true);  

} catch (err) {  
    console.log(err.message);  
    api.sendMessage("❌ Video send failed. Link problem ho sakta hai.", threadID, messageID);  
}

};

module.exports.run = async () => {};