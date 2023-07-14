const Discord = require('discord.js'),
    fs = require('fs'),
    c = require('chalk'),
    processInfo = c.cyan.bgBlack;

console.log(processInfo('>> minecraft-bot started <<'));

//Defining config and more
let dev;
try { if (fs.existsSync('./config/dev-main.js')) { dev = true; } }
catch (err) { console.log(err); }
const config = require(dev ? './config/dev-main' : './config/main'),
    token = require(dev ? './config/dev-token' : './config/token')["token"],
    dataJSON = require(dev ? './config/dev-data' : './config/data'),
    warns = config.settings.warns,
    intents = config.commands.enableNormals ? 38401 : 5633;

//Defining Discord bot
bot = new Discord.Client({ intents: intents }); //OLD: 34321
//https://discord-intents-calculator.vercel.app/

//Defining values
let info = config.statusCH;

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.slashes = new Discord.Collection();
bot.dev = dev;
bot.token = token;
bot.prefix = config.bot.prefix;
bot.status = config.bot.status;
bot.pres = config.bot.presence;
bot.warns = warns;
bot.readyScan = config.settings.readyScan;
bot.server = Boolean;
bot.activity = config.bot.activity.toUpperCase();
bot.config = config;
bot.info = info;

server = Array;
server.type = config.server.type.toLowerCase();
server.ip = config.server.ip.toLowerCase();
server.port = parseInt(config.server.port);
server.work = true;
server.vote = config.server.vote;

//Config checks
require("./src/functions/checks").config(bot, server);

bot.settings = config.settings;
bot.settings.removeServerType = bot.settings.readyScan;
bot.server = server;
bot.config = config;
bot.dataJSON = dataJSON;

//Handlers (events and commands)
handlers = require("./src/functions/handlers");
handlers.events(bot);
handlers.normals(bot);
handlers.slashes(bot);

//Bot login
bot.login(bot.token);