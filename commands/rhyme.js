const fetch = require("node-fetch");

module.exports = {
	name: "rhyme",
	usage: "!rhyme <term> <term2>",
	description: "Get the definition of a word",

	async run(message, args) {
        let amount;
        let term = args[0];
        if(args[1] < 200)
            amount = args[1];
        else
            amount = 200;
		
        const url = `https://api.datamuse.com/words?rel_rhy=${term}&max=${amount}`;

        fetch(url)
        .then(response => {
          return response.json();
        })
        .then( myJson => {
            let data = myJson;
            let words = `Words that rhyme with ${term}: \n`;
            data.map(item => { words+= item.word + "\n" });
            message.channel.send("```" + words + "```");
        })
        .catch(error => {
            message.channel.send("```No words that rhyme with " + term + "```");
        });
	}
}