const { EmbedBuilder } = require("discord.js");
const Discord = require('discord.js');

module.exports = {

    name: "leave",
    description: "▸ Faire déconnecter le bot de la vocal.",
    permission: Discord.PermissionFlagsBits.SendMessages,
    dm: false,

    async run(bot, message, args, interaction) {
        //try {

            if(!message.guild.members.cache.get(bot.user.id).voice.channel) return message.followUp("Je ne suis pas dans un salon vocal ");
            await message.guild.members.cache.get(bot.user.id).voice.disconnect()
            message.followUp("J'ai leave mon vocal")

    /*}  catch (err) {
        await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
      }*/
    }
};