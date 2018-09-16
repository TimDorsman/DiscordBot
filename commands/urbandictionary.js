module.exports = {
	name: "urban",
	usage: "!urban <term>",
	description: "Get the definition of a word",

	async run(message, args) {
		const url = `http://api.urbandictionary.com/v0/define?term=${args[0]}`;

		const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		let xhr = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4 && xhr.status == 200) {
				let data = JSON.parse(xhr.responseText);
				if(data.list.length > 0) {
					let i = Math.floor(Math.random() * data.list.length);
					let str = data.list[i].definition;
					let definition = str.replace(/[[]]/g,'');
					message.channel.send("```"+ definition + "```");
				}
				else {
					message.channel.send("Sorry we couldn't find a definition for this word");
				}
			}
		}
		xhr.open("GET", url, true);
		xhr.send();
	}
}