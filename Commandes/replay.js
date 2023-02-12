const Discord = require('discord.js');

module.exports = {

    name: "replay",
    description: "▸ Remettre une musique au début.",
    permission: "Aucune",
    dm: false,

    async run(bot, message, args, interaction, guild) {
      try {
      const queue = bot.player.getQueue(message.guild, {metadata: {message: message}})

      if (!queue || !queue.playing)
      return message.reply({ephemeral: true, content: "Je ne suis pas en train de jouer de la musique." });

      await queue.seek();

      await message.reply(":repeat: **__REPLAY__ - Je reviens en arrière.** ``[00:00]``")

    }  catch (err) {
      await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
    }
    }
  };