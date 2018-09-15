module.exports = {
        name: "greet",
        usage: "!greet",
        description: "Greets back!",

       run: async (message) => {
        console.log('hi');
        message.channel.send(`Hello ${message.author.username}`);
    } 
};