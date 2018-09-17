module.exports = {
    name: "date",
    usage: "!date",
    description: "Shows the date",

    async run(message, args) {
       const date = new Date().toLocaleDateString();
       const time = new Date().toLocaleTimeString();
        
        message.channel.send('**'+ date + ' ' + time +'**');
    },   
}