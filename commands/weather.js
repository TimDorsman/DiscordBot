module.exports = {
	name: "weather",
	usage: "!weather <city> <city2> <city3> <city4>",
	description: "Shows the weather",

	async run(message, args) {
		let term;
		if(args.length >= 2) {
			term = args[0].concat("%20" + args[1]);
			for(i=0; i < args.length; i++) {
				term = args[0].concat("%20", args[i]);
			}
		}
		else {
			console.log(args[0]);
			term = args[0];
		}
		
		console.log(term);
		let url = `http://api.openweathermap.org/data/2.5/forecast?q=${term}&APPID=e710119f33ab831a30eaf3f6e9f4fb2f&units=metric`;

		const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		let xhr = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4 && xhr.status == 200) {
				let data = JSON.parse(xhr.responseText);
				console.log(data);

				message.channel.send({embed: {

					color: 3447003,
					title: "Weather",
					description: " ",
					url: "https://github.com/TimDorsman/DiscordBot",
					thumbnail: {
						url: 'http://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/weather-icon.png'
					},
					fields: [{
							name: "City",
							value: `${data.city.name}, ${data.city.country}`,
						},
						{
							name: "Temperature",
							value: Math.floor(data.list[0].main.temp) + '°C',
						},
						{
							name: "Weather type",
							value: `${data.list[0].weather[0].description}`,
						},
						{
							name: "Humidity",
							value: `${data.list[0].main.humidity}%`,
						},
						],
					timestamp: new Date(),
					footer: {
						text: "© Rivenge",
						
					}
				}});
			}
			else {
				console.log('something went wrong..');
			}
		}
		xhr.open("GET", url, true);
		xhr.send();
	}
};

