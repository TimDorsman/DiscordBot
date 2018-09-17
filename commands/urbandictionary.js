module.exports = {
	name: "urban",
	usage: "!urban <term> <term2>",
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

		const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		let xhr = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4 && xhr.status == 200) {
				let data = JSON.parse(xhr.responseText);
				if(data.list.length > 0) {
					let i = Math.floor(Math.random() * data.list.length);
					let str = data.list[i].definition;
					let definition = str.replace(/\[/g,"").replace(/\]/g,"");;
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