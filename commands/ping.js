const { Client } = require('discord.js');
const bot = new Client();

module.exports = {
    name: "ping",
    usage: "!ping",
    description: "Checks the ping of the bot",

    async run(message, args) {

        console.log(bot.ping);
    },   
}