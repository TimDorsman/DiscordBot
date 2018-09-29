const fetch = require("node-fetch");

module.exports = {
		name: "gif",
		usage: "!gif <query>",
		description: "Show a cool GIF",

		async run (message, args) {
			let url;

			if(args[0])
			url = `http://api.giphy.com/v1/gifs/search?q=${args[0]}&api_key=yQ6rSIYoKPOJ5LKzi2seCFk2CN4dMlc0&limit=20`;
			else
			url = `http://api.giphy.com/v1/gifs/search?q=succes&api_key=yQ6rSIYoKPOJ5LKzi2seCFk2CN4dMlc0&limit=1`;

			fetch(url)
			.then(responsee => {
				return responsee.json();
			})
			.then(response => {
				console.log(response);
				if(response.data.length > 0) {
					let index = Math.floor(Math.random() * response.data.length);
					console.log(index);
					message.channel.send(``, {files: [`${response.data[index].images.original.url}`]})
				}
				else
					message.channel.send('There are no GIFS for this request');
			})
		}
};