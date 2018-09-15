module.exports = {
        name: "me",
        usage: "!me",
        description: "Shows an image of yourself",

       run: async (message, args) => {
           console.log('Sends image');
           message.channel.send(`This guy looks like ${message.author.username}`, {files: ["https://i.imgur.com/OQIPcOU.jpg"]})
    }
};