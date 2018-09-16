module.exports = {
    name: "list",
    usage: "!list",
    description: "Shows a list of the commands",

    async run(message, args) {
        message.channel.send('```Use !roll to roll a dice```');
        console.log(message.content);
        console.log(message);
    }
};