module.exports = {
        name: "gif",
        usage: "!gif <query>",
        description: "Show a cool GIF",

       async run (message, args) {
            let url;

            if(args[0])
            url = `http://api.giphy.com/v1/gifs/search?q=${args[0]}&api_key=yQ6rSIYoKPOJ5LKzi2seCFk2CN4dMlc0&limit=1`;
            else
            url = `http://api.giphy.com/v1/gifs/search?q=succes&api_key=yQ6rSIYoKPOJ5LKzi2seCFk2CN4dMlc0&limit=1`;
            const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        let response = JSON.parse(xhr.responseText);
                        if(response.data.length > 0)
                            message.channel.send(``, {files: [`${response.data[0].images.original.url}`]})
                        else
                            message.channel.send('There are no GIFS for this request');
                    }
            };
            xhr.open("GET", url, true);
            xhr.send();
    }
};