module.exports = {
	name: "weather",
	usage: "!weather <city> <city2> <city3> <city4>",
	description: "Shows the weather",

	async run(message, args) {
		let term;
		if(args.length >= 2) {
			for(i=0; i < args.length; i++) {
				term = args[0].concat("%20", args[i]);
			}
		}
		else {
			term = args[0];
		}
		let url = `http://api.openweathermap.org/data/2.5/forecast?q=${term}&APPID=e710119f33ab831a30eaf3f6e9f4fb2f&units=metric`;

		const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4 && xhr.status == 200) {
				let data = JSON.parse(xhr.responseText);
				let colorEmbed;
				
				switch (data.list[0].weather[0].description) {
					case 'clear temperature ':
						colorEmbed = 3134439;
						break;
					case 'few clouds':
						colorEmbed = 4370232;
						break;
					case 'light rain':
						colorEmbed = 15198501;
						break;
					case 'moderate rain':
						colorEmbed = 15643149;
						break;
					default:
						colorEmbed = 16711681;
						break;
				}

				message.channel.send({embed: {

					color: colorEmbed,
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
		}
		xhr.open("GET", url, true);
		xhr.send();
	}
};

