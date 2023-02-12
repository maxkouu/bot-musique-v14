const Discord = require('discord.js');

module.exports = {

    name: "skip",
    description: "▸ Écouter la musique suivante.",
    permission: "Aucune",
     dm: false,

    async run(bot, message, args, guild) {
      try {
      const queue = bot.player.getQueue(message.guild, {metadata: {message: message}})

      if (!queue || !queue.playing)
      return message.reply({ephemeral: true, content: "Je ne suis pas en train de jouer de la musique." });

      await queue.skip();

      await message.reply(`**__SKIP__ - Avance rapide.**`)

    }  catch (err) {
      await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
    }
    }
  };