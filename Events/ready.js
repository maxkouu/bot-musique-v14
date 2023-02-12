const Discord = require("discord.js")
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const loadSlashCommands = require("../Loaders/loadSlashCommands")

module.exports = async bot => {

    await loadSlashCommands(bot)

    console.log(`${bot.user.tag} est bien en ligne !`)

    bot.user.setPresence({
        activities: [{ name: `.gg/popstream`, type: ActivityType.Watching }],
        status: 'idle',
      });
}