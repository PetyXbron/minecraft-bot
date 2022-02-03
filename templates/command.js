const { commands } = require("../config");
const util = require('minecraft-server-util');
const Discord = require('discord.js');
const c = require('chalk');

module.exports.config = {
    name: "test", //Name of command - RENAME THE FILE TOO!!!
    description: "Test command", //Description of command - you can change it :)
    aliases: commands.test, //Command's aliases - set them in config.js
    enable: false //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config, text } = bot,
        warn = c.keyword('yellow').bold,
        warns = config.settings.warns;
    //action
};