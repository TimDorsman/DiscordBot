const fetch = require("node-fetch");

module.exports = {
	name: "wiki",
	usage: "!wiki <term> <term2> <term3> <term4>",
	description: "Wikipedia results of searched term",

	async run(message, args) {
		if(args.length >= 2) {
			for(i=0; i < args.length; i++) {
				term = args[0].concat("_", args[i]);
			}
		}
		else {
			term = args[0];
		}
		const url = `http://en.wikipedia.org/w/api.php?action=opensearch&search=${term}&prop=revisions&rvprop=content&format=json&limit=5`;

        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            let data = myJson;
            if(data[2][0].length > 0 && data[2][0].length > 0 && data[2][1].length > 0) {
                let explanation;
                if(data[2][0].includes("may refer to")) {
                    explanation  = data[2][1];
                } else {
                    explanation = data[2][0];
                }

                message.channel.send({embed: {
                    color: 6235521,
                    title: `${term.toUpperCase().replace('_',' ')}`,
                    url: `${data[3][0]}`,
                    thumbnail: {
                        url: '',
                    },
                    fields: [{
                            name: "Explanation",
                            value: `${explanation}`,
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: "© Rivenge",
                    }
                }});
            }
            else {
                message.channel.send(`No results were found for ${term}`);
            }
        })
        .catch(error => {
            message.channel.send(`No results were found for ${term}`);
        });
    }
}

