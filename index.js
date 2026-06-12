require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TRAP_CHANNEL_ID = process.env.TRAP_CHANNEL_ID;
const whitelist = [process.env.ME_ADMIN_ID];

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (whitelist.includes(message.author.id)) return;
  //   if(message.author.id === '536876453770297354') return;
  console.log(
    new Date().toISOString(),
    " New msg:  ",
    message.author.id,
    message.author.username,
    message.content,
  );

  if (message.channel.id === TRAP_CHANNEL_ID) {
    // try {
    //   await message.delete();
    //   console.log("Channel:", message.channel.name, "ID:", message.channel.id);
    //   console.log(`Deleted message from ${message.author.tag}`);
    // } catch (error) {
    //   console.error(error);
    // }
    try {
      await message.guild.members.ban(message.author.id, {
        reason: "Trap channel triggered",
        deleteMessageSeconds: 60 * 60, // hapus pesan 1 jam terakhir
      });

      console.log(`Banned ${message.author.tag}`);
    } catch (error) {
      console.error(`Failed to ban ${message.author.tag}:`, error);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
