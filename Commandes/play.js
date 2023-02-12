const { EmbedBuilder } = require("discord.js");
const Discord = require('discord.js');

module.exports = {

    name: "play",
    description: "▸ Écouter une musique.",
    permission: Discord.PermissionFlagsBits.SendMessages,
    dm: false,
    options: [
        {
            type: "string",
            name: "musique",
            description: "Indiquez le nom de la musique ou son URL.",
            required: true,
        }
    ],

    async run(bot, message, args, interaction) {
        try {

        let musique = args.getString("musique");
        if(!message.member.voice.channel) return message.reply({ ephemeral: true, content: "Pour utiliser cette commande tu dois rejoindre un salon vocal." })

        const queue = bot.player.createQueue(message.guild, {metadata: {message: message}})

        let track = await bot.player.search(musique, {requestedBy: message.user}).then(track => track.tracks[0]);
        if(!track) return message.reply({ ephemeral: true, content: "La musique n'a pas été trouvée." })

        const embed = new EmbedBuilder()
        .setColor('#ffffff')
        .setImage(track.thumbnail)
        .setURL(track.url)
        .setTitle(track.title)
        .setAuthor({name: "Lancement de la musique", url: "https://discord.gg/paname"})
        //.setDescription(`Écoute de : **${track.title}**\nLa musique viens d'être ajoutée à la file d'attente !`)
        .setDescription(`Musique crée par : **${track.author}**\nLa musique dure : **${track.duration}**`)
        .setFooter({text: `Demandé par ${message.user.tag}`, iconURL: message.user.displayAvatarURL({ dynamic: true, size: 4096 })})
        .setTimestamp()

        if(!queue.connection) await queue.connect(message.member.voice.channel);
        await queue.play(track);
          await message.reply({ embeds: [embed] })

    }  catch (err) {
        await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
      }
    }
};