module.exports = {
	name: "list",
	usage: "!list",
	description: "Shows a list of the commands",

	async run(message, args) {
		message.channel.send('``` Use !roll to roll a dice \n Use !nasa to get the picture of the day \n Use !date to get the date \n Use !song <link> to listen to a song \n Use !leave to make the bot leave the voicechannel \n Use !urban <term> to get the definition of a word \n Use !greet to be greeted \n Use !gif <term> to show a cool GIF```');
	}
};