const config = require('../auth.json');
const fetch = require('node-fetch');

module.exports = {
	name: "catfacts",
	usage: "!catfacts <from> <to> <amount>",
    description: "Shows the weather",
    
    async run(message, args) {
        const url = `https://cat-fact.herokuapp.com/facts`;

        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let i = Math.floor(Math.random() * data.all.length);
            message.channel.send(data.all[i].text);
        })
    }
}