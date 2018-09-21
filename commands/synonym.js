const fetch = require("node-fetch");

module.exports = {
	name: "syno",
	usage: "!syno <term> <term2>",
	description: "Synonyme of a word",

	async run(message, args) {
        let amount;
        let term = args[0];
        if(args[1] < 200)
            amount = args[1];
        else
            amount = 200;
		
        const url = `https://api.datamuse.com/words?rel_syn=${term}&max=${amount}`;

        fetch(url)
        .then(response => {
          return response.json();
        })
        .then( myJson => {
            let data = myJson;
            let words = `Synonyms for ${term}: \n`;
            console.log(data[0].word)
            data.map(item => { words+= item.word + "\n" });
            message.channel.send("```" + words + "```");
        })
        .catch(error => {
            message.channel.send("```No synonyms for " + term + "```");
        });
	}
}