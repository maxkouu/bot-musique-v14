const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
 
module.exports = {
    name: "queue",
    description: "▸ Affiche la liste des musiques à venir",
    permission: "Aucune",
    dm: false,
    category: "🎶・Music",

    async run (bot, message, args) {
        try {
            if(!message.member.voice.channel) return message.reply({ephemeral: true, content: "Vous n'êtes pas dans un salon vocal."});

            let queue = bot.player.getQueue(message.guild);
            if (!queue) return message.reply("Il n'y a aucune musique en cours de lecture.");

            let tracks = queue.tracks;
            let currentTrack = queue.current;
            let upcomingTracks = tracks.slice(currentTrack + 1);

            if (upcomingTracks.length == 0) return message.reply("Il n'y a aucune musique à venir dans la queue.");

            let trackList = upcomingTracks.map((track, index) => `${index + 1}. \`${track.title}\` de ${track.author} dure \`${track.duration}\``).join("\n");
        const QueueEmbed = new EmbedBuilder()
                .setColor("#6B9AE6")
                .setTitle("Musiques à venir:")
                .setDescription(trackList);

                await message.reply({embeds: [QueueEmbed]});
        } catch (err) {
            console.log(err);
            await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." });
        }
    }
}