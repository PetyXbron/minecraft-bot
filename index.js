const Discord = require('discord.js'),
fs = require('fs'),
c = require('chalk'),
ms = require('ms')

//Discord client - I like "bot" more, then "client"
const bot = new Discord.Client({disableEveryone: true});

const config = require('./config'),
activites = ['PLAYING', 'WATCHING', 'COMPETING', 'LISTENING'], //Supported activites, discord.js supports more (but I don't care)
error = c.keyword('red').bold,
kill = c.white('\nKilling process...'),
warn = c.keyword('yellow').bold,
server = Array,
commands = [
    test = [

    ]
]
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.token = config.bot.token;
bot.prefix = config.bot.prefix;
bot.status = config.bot.status;
bot.server = Boolean;
bot.activity = config.bot.activity.toUpperCase();
server.type = config.server.type.toLowerCase();
server.ip = config.server.ip.toLowerCase();
server.port = parseInt(config.server.port)

//Config check
if(bot.token === '') { //Checks if you have entered bot token to config
    console.log(error('Bot token in config is empty!') + kill);
    return process.exit(1);
} else if (bot.prefix === '') { //Checks if you have entered bot prefix to config
    console.log(error('Bot prefix in config is empty!') + kill);
    return process.exit(1);
};

if (bot.status === '') { //Checks if you have entered custom status for bot to config
    console.log(warn('Bot status in config was empty! Bot status was disabled.'));
    bot.status = false;
} 

if (!bot.activity) { //Checks if you have entered status activity type to config
    if(bot.status) {
        console.log(warn('Bot activity type in config was empty! Activity type is now "playing"'));
        bot.activity = 'PLAYING';
    };
};

if (!new Set(activites).has(bot.activity)) { //Checks if you have entered supported activity
    if(bot.status) {
        console.log(warn(`"${bot.activity}" activity is not supported. Bot status was disabled.`));
        bot.status = false;
    };
};

if(!server.ip) {
    console.log(error("You did not specify server's ip!") + c.white('\nMinecraft server disabled.'));
    bot.server = false;
} else {
    bot.server = true;
}
if (server.type !== 'java' || server.type !== 'bedrock') {
    if(bot.server) {
        if(!server.type) {
            console.log(warn(`You did not specify server's edition, setting it to java.`));
            server.type = 'java';
        } else {
            console.log(error('Unknown server edition') + kill);
            return process.exit(1);
        }
    }
}

if (!server.port) {
    if(bot.server) {
        console.log(warn(`You did not specify server port, setting it to default.`));
        if(server.type === 'bedrock') {
            server.port = 19132
        } else {
            server.port = 25565
        }
    }
}

bot.server = server

//Event handler
const eventsFolder = fs.readdirSync('./events'); //Finds files in event folder
for (const file of eventsFolder) {
    const eventFile = require(`./events/${file}`); //The file
    const event = file.split(".")[0]
    bot.on(event, eventFile.bind(null, bot)); //Runs the file
};

//Command handler
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        if(!pull.config.name) {
            console.log(warn(`Missing command name of file '${f}'!`) + '\nCommand disabled.')
        } else {
            bot.commands.set(pull.config.name, pull);  
            pull.config.aliases.forEach(alias => {
                bot.aliases.set(alias, pull.config.name)
            });
        }
    });
});

//Bot login
bot.login(bot.token);