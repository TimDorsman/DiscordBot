const commando = require('discord.js-commando');

class HelpCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "list",
            group: "random",
            memberName: "list",
            description: "Shows a list of the commands",
        });
    };

    async run(message, args) {
        message.channel.send('Use !roll to roll a dice');
        console.log(message.content);
        console.log(message);
    }
}

module.exports = HelpCommand;