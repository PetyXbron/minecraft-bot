const util = require('axios'),
    Discord = require('discord.js'),
    c = require('chalk'),
    fs = require('fs'),
    { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports.config = {
    name: "test", //Name of command - RENAME THE FILE TOO!!!
    description: "Test command", //Description of command - you can change it :)
    aliases: commands.test.aliases //Command's aliases - set them in config.js
};

module.exports.run = async (bot, message, args) => {
    let { server, config } = bot,
        text = commands.test.text,
        warn = c.keyword('yellow').bold,
        warns = config.settings.warns,
        icon = server.icon ? server.icon : message.guild.iconURL(),
        serverName = config.server.name ? config.server.name : message.guild.name;
    //action
};