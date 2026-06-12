require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TRAP_CHANNEL_ID = "1509974326412054568";
const whitelist = ["536876453770297354"];

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (whitelist.includes(message.author.id)) return;
  //   if(message.author.id === '536876453770297354') return;
  console.log(
    "auth id : ",
    message.author.id,
    message.author.username,
  );

  if (message.channel.id === TRAP_CHANNEL_ID) {
    try {
      await message.delete();
      console.log("Channel:", message.channel.name, "ID:", message.channel.id);
      console.log(`Deleted message from ${message.author.tag}`);
    } catch (error) {
      console.error(error);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
