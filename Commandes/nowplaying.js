const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "nowplaying",
    description: "▸ Afficher la musique actuellement en cours",
    permission: "Aucune",
    dm: false,

    async run(bot, message) {

        let queue = bot.player.getQueue(message.guild);

        if (queue) {
            const queue = bot.player.createQueue(message.guild, {metadata: {message: message}})
            const progress = queue.createProgressBar();
            const perc = queue.getPlayerTimestamp();

            const embed = new EmbedBuilder()
            .setTitle("La musique en cours est :")
            .setDescription(`**${queue.current.title}** !\nElle est à \`${perc.progress}%/100%\``)
            .setColor("White")

            let track = queue.current;
            return message.reply({embeds: [embed]})
        } else {
            return message.reply("Aucune musique est en cours de lecture")
        }
    }
}