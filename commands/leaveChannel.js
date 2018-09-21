module.exports = {
    name: "leave",
    usage: "!leave",
    description: "Bot leaves Channel",

    async run(message, args) {
        const { voiceChannel } = message.member;
        voiceChannel.leave();
    }

    
}