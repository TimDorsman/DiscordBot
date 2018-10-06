const fetch = require("node-fetch");

module.exports = {
	name: "nasa",
	usage: "!nasa <url>",
	description: "Displays an space image",

    async run(message, args) {
        const url = 'https://api.nasa.gov/planetary/apod?api_key=930bVCNrl5ZUfi2td5O7wodrAssF52RxKjupeIfc';
        fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
            message.channel.send(``, {files: [`${data.hdurl}`]})
        })
    }
}                
