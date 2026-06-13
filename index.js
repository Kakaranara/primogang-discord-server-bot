require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const { Actions } = require("./utils/helper");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const everyoneTracker = new Map();

const TRAP_CHANNEL_ID = process.env.TRAP_CHANNEL_ID;
const whitelist = [process.env.ME_ADMIN_ID];

client.once("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (whitelist.includes(message.author.id)) return;

  console.log(
    "New msg:  ",
    message.author.id,
    message.author.username,
    message.content,
  );

  if (message.channel.id === TRAP_CHANNEL_ID) {
    Actions.BAN(message);
  }
  // Deteksi @everyone
  if (message.mentions.everyone) {
    const shouldBan = handleEveryonePing(message);

    if (shouldBan) {
      console.log(`${message.author.username} exceeded @everyone limit`);

      await Actions.BAN(message);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

function handleEveryonePing(message) {
  const userId = message.author.id;
  const today = new Date().toISOString().split("T")[0]; // 2026-06-13

  const current = everyoneTracker.get(userId);

  // User belum ada atau sudah ganti hari
  if (!current || current.date !== today) {
    everyoneTracker.set(userId, {
      date: today,
      count: 1,
    });

    console.log(`${message.author.username} pinged @everyone (1/3)`);
    return false;
  }

  current.count++;

  console.log(
    `${message.author.username} pinged @everyone (${current.count}/3)`,
  );

  if (current.count >= 3) {
    everyoneTracker.delete(userId);
    return true;
  }

  return false;
}
