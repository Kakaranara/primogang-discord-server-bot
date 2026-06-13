export const Actions = {
  BAN: async (message) => {
    try {
      await message.guild.members.ban(message.author.id, {
        reason: "Trap channel triggered",
        deleteMessageSeconds: 60 * 60, // hapus pesan 1 jam terakhir
      });

      console.log(`Banned ${message.author.tag}`);
    } catch (error) {
      console.error(`Failed to ban ${message.author.tag}:`, error);
    }
  },
  deleteChat: async (message) => {
    try {
      await message.delete();
      console.log("Channel:", message.channel.name, "ID:", message.channel.id);
      console.log(`Deleted message from ${message.author.tag}`);
    } catch (error) {
      console.error(error);
    }
  },
};
