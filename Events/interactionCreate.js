const Discord = require("discord.js")
const BlackListFile = require("../blacklist.json")
const BlackList = BlackListFile.userID
const config = require("../config")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');

module.exports = async (bot, interaction) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {
        if(BlackList.indexOf(interaction.user.id) !== -1){
            try {
                if (!interaction.isButton())
                interaction.reply({content: "Oups... Tu ne peux plus communiquer avec **Kitagawa** puisque tu es **blacklist**.\nNotre support reste à **ta disposition** au cas où tu souhaiterais **plus d'informations** : discord.gg/oraclefr", ephemeral: true })
                return;
            } catch(error){};
        }    
        let command = require(`../Commandes/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options)
    }

    if(interaction.customId === "ping") {

        let reloadPing = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("ping")
                .setLabel("Actualiser")
                .setStyle(ButtonStyle.Secondary)
        )

        const emoteBdd = "<:pingA:1063611687514677278>"
        const pingBdd = "0"

        const pingUser = Date.now() - interaction.createdTimestamp;
            let emojiUser;
            if(pingUser < 200) { emojiUser = "<:pingA:1063611687514677278>" } 
            else if (pingUser < 400 && pingUser > 200) { emojiUser = "<:pingB:1063611686268977203>" }
            else if(pingUser > 400) {emojiUser = "<:pingC:1063611684381544551>" };
            // Ping de l'API de discord
            const APIPing = bot.ws.ping;
            let APIemoji;
            if(APIPing < 200) { APIemoji = "<:pingA:1063611687514677278>" }
            else if(APIPing < 400 && APIPing > 200) { APIemoji = "<:pingB:1063611686268977203>" }
            else if(APIPing > 400) {APIemoji = "<:pingC:1063611684381544551>" }

        let PingEmbed = new EmbedBuilder()
            .setDescription(`
            ${emojiUser} \`Votre ping\` : **${pingUser}ms**
            ${APIemoji} \`Latence de l'API de Discord\` : **${APIPing}ms**
            ${emoteBdd} \`Latence de la base de données\` : **${pingBdd}ms**`)
            .setColor("#ffffff")

        await interaction.deferUpdate()
        await interaction.editReply({embeds: [PingEmbed], components: [reloadPing]})
    }

    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()

if (interaction.commandName === "pfc") {

            let choices = ["pierre", "feuille", "ciseaux"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
        }
 let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
        }
    
    
    /*if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commandes/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options)
    }*/
}