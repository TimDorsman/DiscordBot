module.exports = {
	name: "stfu",
	usage: "!stfu <term> <term2> <term3> <term4> <term5> <term6> <term7>",
    description: "Tell someone to shut up",
    
    async run(message, args) {
        let term;
        console.log(term);
		if(args.length >= 2) {
            term = args.toString().replace(/\,/g, ' and ');            
		}
		else {
            term = args[0];
        }
        message.channel.send(`Shut the fuck up ${term}`);
    }
}