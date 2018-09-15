
module.exports = {
    name: "roll",
    usage: "!roll <max>",
    description: "Rolls a dice",

    run: async (message, args) => {
        let roll;
        if(args[0])
        roll = Math.floor((Math.random() * args[0]) + 1);
        else
        roll = Math.floor((Math.random() * 10) + 1);

        message.reply(`You rolled a ${roll}`);
        console.log(message.content);
    }
}