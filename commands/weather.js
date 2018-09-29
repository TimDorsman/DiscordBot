const fetch = require("node-fetch");

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

		fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			let colorEmbed;
			let thumbImage;
			console.log(data);
			if(data.list.length > 0) {

				switch (data.list[0].weather[0].description) {
					case 'clear temperature ':
						colorEmbed = 3134439;
						thumbImage = 'https://cdn1.iconfinder.com/data/icons/weather-elements/512/Weather_SunAbstract.png'
						break;
					case 'few clouds':
						colorEmbed = 4370232;
						thumbImage = 'https://mbtskoudsalg.com/images/black-clouds-png-7.png';
						break;
					case 'light rain':
						colorEmbed = 15198501;
						thumbImage = 'https://images.blogthings.com/whatsyouridealweatherquiz/light-rain.png';
						break;
					case 'moderate rain':
						colorEmbed = 15643149;
						thumbImage = 'http://pluspng.com/img-png/png-rain-cloud-cloud-clouds-cloudy-forecast-night-rain-weather-icon-256.png';
						break;
					case 'scattered clouds':
						colorEmbed = 3231168;
						thumbImage = 'http://pngimg.com/uploads/cloud/cloud_PNG13.png';
					case 'clear sky':
						colorEmbed = 4251234;
						thumbImage = 'https://www.clearskymd.com/wp-content/uploads/2017/05/clear-sky-blue-background.png';
						break;
					case 'broken clouds':
						colorEmbed = 8439299;
						thumbImage = 'http://www.weatherfor.us/static/verbose/weather_mostly_cloudy.png';
						break;
					case 'overcast clouds':
						colorEmbed = 6235521;
						thumbImage = 'https://banner2.kisspng.com/20180403/wew/kisspng-weather-forecasting-cloud-cover-wind-snow-cloudy-5ac37740150025.823420371522759488086.jpg';
						break;
					default:
						colorEmbed = 16711681;
						thumbImage = 'http://pluspng.com/img-png/happy-sun-png-no-background-gallery-recent-updates-cartoon-sunhappy-586.png';
						break;
				};

				message.channel.send({embed: {

					color: colorEmbed,
					title: "Weather",
					description: " ",
					url: "https://github.com/TimDorsman/DiscordBot",
					thumbnail: {
						url: thumbImage,
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
		})
		.catch(error => {
			const quotes = [`There are no results for ${term}, must be some shithole.`,`You either must have a typo or you are just mentally retarded.. ${term} is not a city.`, `Stop making up stupid city names like ${term}. You are not the president.`, `${message.author.username}, Do you live in ${term}? Well that must suck cus we don't have a fucking clue either about your weather.`];
			let i = Math.floor(Math.random() * quotes.length);
			message.channel.send(quotes[i]);
		})
	}
};

