const ytdl = require('ytdl-core');

module.exports = {
	name: "song",
	usage: "!song <url>",
	description: "Plays a youtube video",

	async run(message, args) {

		const { voiceChannel } = message.member;

		if(!voiceChannel) {
			message.channel.send(`You aren't in a voicechannel ${message.member.user.username}`);
			return;
		}

		voiceChannel.join().then((connection) => {
			let video = ytdl(args[0], { filter: 'audioonly' });
			video.on('error', console.error);
			let dispatcher = connection.playStream(video);

			dispatcher.on('end', () => {
				voiceChannel.leave();
			})
		});
	}
};
