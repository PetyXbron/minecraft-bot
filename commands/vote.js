const { commands } = require("../config");
const Discord = require('discord.js');

module.exports.config = {
    name: "vote", //Name of command - RENAME THE FILE TOO!!!
    description: "Vote for server", //Description of command - you can change it :)
    aliases: commands.vote, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config } = bot
    let icon = server.icon ? server.icon : message.guild.icon

    if(server.work && server.vote) {
        const serverName = config.server.name ? config.server.name : message.guild.name

        const ipEmbed = new Discord.MessageEmbed()
            .setTitle('Vote for ' + serverName, icon)
            .setDescription(`[Here](${server.vote}) you can vote for ${serverName}!`)
            .setColor(config.embeds.color);
        message.channel.send(ipEmbed);
    }
};