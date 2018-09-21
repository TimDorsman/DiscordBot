const fetch = require("node-fetch");

module.exports = {
	name: "trigger",
	usage: "!trigger <term> <term2>",
    description: "Wikipedia results of searched term",
    
    async run(message, args) {

        let amount;
        let term = args[0];
        if(args[1] < 200)
            amount = args[1];
        else
            amount = 10;

        const url = `https://api.datamuse.com/words?rel_trg=${term}&max=${amount}`;

        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            let data = myJson;
            let words = `Words that have something to do with ${term}: \n`;
            data.map(item => { words+= item.word + "\n" });
            message.channel.send("```" + words + "```");
        })
    }
}