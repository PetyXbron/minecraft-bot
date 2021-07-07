const { commands, settings } = require("../config");
const Discord = require('discord.js');
const db = require('quick.db')
const util = require('minecraft-server-util')

module.exports.config = {
    name: "version", //Name of command - RENAME THE FILE TOO!!!
    description: "Version command", //Description of command - you can change it :)
    aliases: commands.version, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config } = bot;

    if(!server.work) return;

    let icon = server.icon ? server.icon : message.guild.icon;
    
    if(server.type === 'java') {
        const response = await util.status(server.ip, { port: server.port })
        const versionOriginal = response.version
        if(settings.split) {
            const versionArray = versionOriginal.split(" ")
            var versionAdvanced = versionArray[versionArray.length - 1]
        }
        var version = versionAdvanced ? versionAdvanced : versionOriginal
    } else {
        const response = await util.statusBedrock(server.ip, { port: server.port })
        const versionOriginal = response.version
        if(settings.split) {
            const versionArray = versionOriginal.split(" ")
            var versionAdvanced = versionArray[versionArray.length - 1]
        }
        var version = versionAdvanced ? versionAdvanced : versionOriginal
    }

    const versionEmbed = new Discord.MessageEmbed()
        .setTitle((config.server.name ? config.server.name : message.guild.name) + ' Version:', icon)
        .setDescription(`**${version}**`)
        .setColor(config.embeds.color);
    message.channel.send(versionEmbed);
};