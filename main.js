const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const Player = require("discord-player")
const config = require("./config")

bot.commands = new Discord.Collection();
bot.color = "#ffffff";
bot.player = new Player.Player(bot, {
    leaveOnEnd: true,
    leaveOnEmpty: true,
    initialVolume: 100,
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    },
});

bot.login(config.token);
loadCommands(bot);
loadEvents(bot);