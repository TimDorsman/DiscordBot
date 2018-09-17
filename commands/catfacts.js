const config = require('../auth.json');

module.exports = {
	name: "catfacts",
	usage: "!catfacts <from> <to> <amount>",
    description: "Shows the weather",
    
    async run(message, args) {
        const url = `https://cat-fact.herokuapp.com/facts`;
        const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		let xhr = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);
                let i = Math.floor(Math.random() * data.all.length);
                message.channel.send(data.all[i].text);
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }
}