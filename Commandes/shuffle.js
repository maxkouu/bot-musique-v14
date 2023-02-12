const Discord = require('discord.js');

module.exports = {

    name: "shuffle",
    description: "▸ Écouter aléatoirement les musiques en attente.",
    permission: "Aucune",
    dm: false,

    async run(bot, message, args, interaction, guild) {
      try {
      const queue = bot.player.getQueue(message.guild, {metadata: {message: message}})

      if (!queue || !queue.playing)
      return message.reply({ephemeral: true, content: "Je ne suis pas en train de jouer de la musique." });

      await queue.shuffle();

      await message.reply("🔀 **__SHUFFLE__ - Les musiques sont maintenant aléatoirement écoutées.**")

    }  catch (err) {
      await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
    }
    }
  };