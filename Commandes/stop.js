const { EmbedBuilder } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    name: "stop",
    description: "▸ Mettre en pause la musique et vider la queue.",
    permission: "Aucune",
    dm: false,
    category: "🎶・Music",

    async run (bot, message, args) {
        try {
            if(!message.member.voice.channel) return message.reply({ ephemeral: true, content: "Pour utiliser cette commande tu dois rejoindre un salon vocal." })
            // Récupère la file d'attente de musique du salon vocal de l'utilisateur
            const queue = bot.player.getQueue(message.guild);
            if (!queue) return message.reply("Il n'y a pas de musique en cours de lecture.");

            queue.stop();

            const embed = new EmbedBuilder()
            .setColor('#6B92E6')
            .setAuthor({ name: message.user.tag, iconURL: message.user.displayAvatarURL({ dynamic: true, size: 4096 })})
            .setDescription(`⛔ La musique a été arrêtée.`)

            // Stoppe la musique et vide la file d'attente
            return message.reply({ embeds: [embed] })
        } catch (err) {
            await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." });
            }
        }
    };