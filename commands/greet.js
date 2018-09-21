module.exports = {
        name: "greet",
        usage: "!greet",
        description: "Greets back!",

       run: async (message) => {
        message.channel.send(`Hello ${message.author.username}`);
    } 
};