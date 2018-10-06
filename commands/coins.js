const { Client } = require("pg");

module.exports = { 
    name: "coins", 
    usage: "!coins ", 
    description: "gives money",

    async run(message, args) {

        function getMoney() {
            return Math.floor(Math.random() * 100) + 1 
		}
		
        const con = new Client({
			connectionString: "postgres://xjxelqwfvewiij:7cd0c67a3a971bf90c640c76089a20543176f6fb6ae257f329986c49a2453ae6@ec2-54-247-101-205.eu-west-1.compute.amazonaws.com:5432/dcjvftgpqlve4c",
			ssl: true
		})

		con.connect(err => {
            if(err) throw err;
        })
        if(!args[0]) {
			con.query(`SELECT * FROM users WHERE id = '${message.author.id}'`, (err, rows) => {
				if(err) throw err;
				message.channel.send(`${message.author.username} has ${rows[0].money} coins in his wallet!`);
			});
        }
		if(args[0] == "signup") {
			con.query(`SELECT * FROM users WHERE id = '${message.author.id}'`, (error, getrow) => {
                if(getrow.rowCount < 1) {
                    con.query(`INSERT INTO users (id, username) VALUES('${message.author.id}','${message.author.username}')`, (err, rows) => {
						if(err) throw err;
						message.reply('Signed up succesfully! use `!coins start` to start');
                    });
				}
				else {
					message.reply(`You've already signed up.`);
				}
			})
		}

		if(args[0] == "treasure") {
			//New Treasure every 5 minutes
			let cooldown = Math.floor(Math.random()*(60-15+1)+15);
			setInterval( () => {
				con.query(`SELECT * FROM treasures ORDER BY RANDOM() LIMIT 1`, (error, rows) => {
					let name = rows[0].name;
					let	amount = rows[0].amount;
					let type = rows[0].type;

					if(error) throw error;

					con.query('SELECT * FROM users ORDER BY RANDOM() LIMIT 1', (error, user) => {
						con.query(`UPDATE users SET money = ${user[0].money + amount} WHERE id = ${user[0].id} `);
						message.channel.send(`<@${user[0].id}> found a ${type}!`);
						message.channel.send({embed: {
							color: 4370232,
							title: name,
							description: " ",
							url: "https://github.com/TimDorsman/DiscordBot",
							fields: [{
									name: "Type",
									value: `${type}`,
								},
								{
									name: "Amount",
									value: amount,
								}
								],
							timestamp: new Date(),
							footer: {
								text: "© Rivenge",
								
							}
						}})
						if(error) throw error;
					})
				})
				cooldown = Math.floor(Math.random() * 60) + 15;
			}, cooldown * 60000)
		}

        if(args[0] == "start") {
			//Check of de user al is gesigned up
            con.query(`SELECT * FROM users WHERE id = '${message.author.id}'`, (error, getrow) => {
                if(getrow.rowCount < 1) {
					message.reply('Please use `!coins signup` to begin.');
				}
                else {
					if(error) throw error;
					//Check of de timer al bezig is
					if(getrow.rows[0].started == 0) {
						con.query(`UPDATE users SET started = 1 WHERE id = '${message.author.id}'`, err => {
							console.log('UPDATED');
							if(err) throw err;
						})
						message.channel.send('You are now playing');
						let duration = Math.floor(Math.random()*(30-15+1)+15);
						console.log(duration);
						setInterval( () => {
							con.query(`SELECT * FROM users WHERE id = '${message.author.id}'`, (err, grows) => {
								if (err) throw err;
								let getmoney = getMoney();
								let money = grows.rows[0].money;
								let sql = `UPDATE users SET money = ${money + getmoney} WHERE id = '${message.author.id}'`;
			
								con.query(sql, (err) => {
										con.query(`SELECT * FROM users WHERE id = '${message.author.id}'`, (err, erows) => {
											if(err) throw err;
											message.channel.send(`${message.author.username} has gained ${getmoney} coins, a total of ${erows.rows[0].money} coins in his wallet!`);
										})
									if(err) throw err;
								});
							})
						}, duration * 60000)
					}
					//Check of de gebruiker al bezig is met spelen
					else {
						message.reply('You are already playing');
					}
                }
            })
        }
    }
}