module.exports = {
	name: "nasa",
	usage: "!nasa <url>",
	description: "Displays an space image",

	async run(message, args) {
		const url = 'https://api.nasa.gov/planetary/apod?api_key=930bVCNrl5ZUfi2td5O7wodrAssF52RxKjupeIfc';

		const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		let xhr = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4 && xhr.status == 200) {
				let data = JSON.parse(xhr.responseText);
				message.channel.send(``, {files: [`${data.hdurl}`]})
			}
		}
		xhr.open("GET", url, true);
		xhr.send();
	}
}
