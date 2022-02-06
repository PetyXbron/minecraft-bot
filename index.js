const Discord = require('discord.js'),
    fs = require('fs'),
    c = require('chalk'),
    ms = require('ms'),
    { REST } = require('@discordjs/rest'),
    { Routes } = require('discord-api-types/v9'),
    Intents = Discord.Intents;

//Discord client - I like "bot" more, then "client"
const bot = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING
    ]
});

const config = require('./config'),
    activites = ['PLAYING', 'WATCHING', 'COMPETING', 'LISTENING'], //Supported activites, discord.js supports more (but I don't care)
    error = c.keyword('red').bold,
    kill = '\nKilling process...',
    warn = c.keyword('yellow').bold,
    warns = config.settings.warns,
    server = Array;

let info = config.statusCH;

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.slashes = new Discord.Collection();
bot.token = config.bot.token;
bot.prefix = config.bot.prefix;
bot.status = config.bot.status;
bot.warns = warns;
bot.readyScan = config.settings.readyScan;
bot.server = Boolean;
bot.activity = config.bot.activity.toUpperCase();
server.type = config.server.type.toLowerCase();
server.ip = config.server.ip.toLowerCase();
server.port = parseInt(config.server.port);
server.work = true;
server.vote = config.server.vote;

//Config check
let emojis = config.console.emojis;
if (!emojis.success) emojis.success = '💚';
if (!emojis.info) emojis.info = '💙';
if (!emojis.warn) emojis.warn = '💛';
if (!emojis.error) emojis.error = '🛑';
bot.emotes = emojis;

if (bot.token === '') { //Checks if you have entered bot token to config
    console.log(`${bot.emotes.error} ` + error('Bot token in config is empty!') + kill);
    return process.exit(1);
} else if (bot.prefix === '') { //Checks if you have entered bot prefix to config
    console.log(`${bot.emotes.error} ` + error('Bot prefix in config is empty!') + kill);
    return process.exit(1);
};

if (bot.status === '') { //Checks if you have entered custom status for bot to config
    if (warns) console.log(`${bot.emotes.warn} ` + warn('Bot status in config was empty! Bot status was disabled.'));
    bot.status = false;
}

if (!bot.activity) { //Checks if you have entered status activity type to config
    if (bot.status) {
        if (warns) console.log(`${bot.emotes.warn} ` + warn('Bot activity type in config was empty! Activity type is now "playing"'));
        bot.activity = 'PLAYING';
    };
};

if (!new Set(activites).has(bot.activity)) { //Checks if you have entered supported activity
    if (bot.status) {
        if (warns) console.log(`${bot.emotes.warn} ` + warn(`"${bot.activity}" activity is not supported. Bot status was disabled.`));
        bot.status = false;
    };
};

if (!server.ip) {
    if (warns) console.log(`${bot.emotes.error} ` + error("You did not specify server's ip!") + c.white('\nMinecraft server disabled.'));
    bot.server.work = false;
} else {
    bot.server.work = true;
}

if (server.type !== 'java' && server.type !== 'bedrock') {
    if (bot.server) {
        if (!server.type) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn(`You did not specify server's edition, setting it to java.`));
            server.type = 'java';
        } else {
            console.log(`${bot.emotes.error} ` + error('Unknown server edition') + kill);
            return process.exit(1);
        }
    }
}

if (!server.port) {
    if (bot.server) {
        if (warns) console.log(`${bot.emotes.warn} ` + warn(`You did not specify server port, setting it to default.`));
        if (server.type === 'bedrock') {
            server.port = 19132;
        } else {
            server.port = 25565;
        }
    }
}

if (config.server.name === '' || !config.server.name) {
    if (warns) console.log(`${bot.emotes.warn} ` + warn(`You did not specify server name, setting it to discord server name.`));
    bot.server.name = false;
}

config.embeds.error = config.embeds.colors.error ? config.embeds.colors.error : '#f53636';
config.embeds.color = config.embeds.colors.normal ? config.embeds.colors.normal : '#77fc03';

if (!config.autoStatus.time) {
    if (warns) console.log(`${bot.emotes.warn} ` + warn("You did not specify time update period of bot's status. Setting it to 10 minutes."));
    config.autoStatus.time = "10min";
}

if (config.settings.statusCH) {
    const dis = c.white('\nAuto changing status message disabled.');
    if (!info.guild.id) {
        console.log(`${bot.emotes.error} ` + error("You did not specify server ID in statusCH settings!") + dis);
        config.settings.statusCH = false;
    } else if (!info.channel.id) {
        console.log(`${bot.emotes.error} ` + error("You did not specify channel ID in statusCH settings!") + dis);
        config.settings.statusCH = false;
    }

    if (config.settings.statusCH) {
        if (!info.time) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn("You did not specify time update period of statusCH. Setting it to 30 seconds."));
            info.time = "30s";
        }
    }
}

if (config.settings.votingCH) {
    const dis = c.white('\nVoting channel disabled.');
    if (!config.votingCH.guild.id) {
        console.log(`${bot.emotes.error} ` + error("You did not specify server ID in votingCH settings!") + dis);
        config.settings.votingCH = false;
    } else if (!config.votingCH.channel.id) {
        console.log(`${bot.emotes.error} ` + error("You did not specify channel ID in votingCH settings!") + dis);
        config.settings.votingCH = false;
    }

    if (config.votingCH) {
        if (!config.votingCH.time) {
            console.log(`${bot.emotes.warn} ` + warn("You did not specify time in votingCH settings! Setting it to 30 seconds."));
            config.votingCH.time = "30s";
        }

        if (!config.votingCH.reactions.first) {
            config.votingCH.reactions.first = "👍";
        }
        if (!config.votingCH.reactions.second) {
            console.log(`${bot.emotes.warn} ` + warn("You did not specify second reaction emoji! Second reaction disabled."));
            config.votingCH.reactions.second = false;
        }
        if (!config.votingCH.reactions.cancel) {
            config.votingCH.reactions.cancel = "❌";
        }
    }
}

const iconLINK = config.server.icon;
if (!iconLINK) {
    server.icon = false;
} else if (!iconLINK.includes("png" || "jpg" || "webp" || "gif")) {
    if (warns) console.log(`${bot.emotes.warn} ` + warn("Unknown server icon file format. Setting it to undefined."));
    server.icon = "https://www.planetminecraft.com/files/image/minecraft/project/2020/224/12627341-image_l.jpg";
} else if (!iconLINK.includes("https://" || "http://")) {
    if (warns) console.log(`${bot.emotes.warn} ` + warn("Server icon link did contain https or http. Setting it to undefined."));
    server.icon = "https://www.planetminecraft.com/files/image/minecraft/project/2020/224/12627341-image_l.jpg";
} else {
    server.icon = iconLINK;
}

bot.settings = config.settings;
bot.settings.split = bot.settings.readyScan;
bot.server = server;
bot.config = config;
bot.info = info;
bot.text = config.messages;

//Event handler
const eventsFolder = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventsFolder) {
    const eventFile = require(`./events/${file}`);
    const event = file.split(".")[0];
    bot.on(event, eventFile.bind(null, bot));
};

//Command handler
const commandsFolder = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandsFolder) {
    const commandFile = require(`./commands/${file}`);
    const command = file.split(".")[0];
    bot.commands.set(command, commandFile);
    commandFile.config.aliases.forEach(alias => {
        bot.aliases.set(alias, command);
    });
};

//Slash command handler
let slashCommands = [];
const slashCommandsFolder = fs.readdirSync('./slashes').filter(file => file.endsWith('.js'));
for (const file of slashCommandsFolder) {
    const commandFile = require(`./slashes/${file}`);
    const slashCommand = file.split(".")[0];
    bot.slashes.set(slashCommand, commandFile);
    slashCommands.push(commandFile.data.toJSON());
};

bot.once('ready', async (bot) => {
    const rest = new REST({ version: '9' }).setToken(bot.token);

    try {
        await rest.put(
            Routes.applicationCommands(bot.user.id),
            { body: slashCommands },
        );
    } catch (err) {
        console.log(err);
    };
});

//Bot login
bot.login(bot.token);