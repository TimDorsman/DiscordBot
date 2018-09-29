const fetch = require("node-fetch");

module.exports = {
	name: "urban",
	usage: "!urban <term> <term2> <term3> <term4>",
	description: "Get the definition of a word",

	async run(message, args) {

		if(args.length >= 2) {
			for(i=0; i < args.length; i++) {
				term = args[0].concat("%20", args[i]);
			}
		}
		else {
			term = args[0];
		}
		const url = `http://api.urbandictionary.com/v0/define?term=${term}`;

		fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			if(data.list.length > 0) {
				let i = Math.floor(Math.random() * data.list.length);
				let str = data.list[i].definition;
				let definition = str.replace(/\[/g,"").replace(/\]/g,"");;
				message.channel.send("```"+ definition + "```");
			}
			else {
				message.channel.send("Sorry we couldn't find a definition for this word");
			}
		})
	}
}