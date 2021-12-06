const { commands } = require("../config");
const Discord = require('discord.js');

module.exports.config = {
    name: "ip", //Name of command - RENAME THE FILE TOO!!!
    description: "Ip command", //Description of command - you can change it :)
    aliases: commands.ip, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config, text } = bot
    let icon = server.icon ? server.icon : message.guild.icon

        if(text.ip.title === "" || text.ip.description === "") {
            const ipEmbed = new Discord.MessageEmbed()
                .setTitle((config.server.name ? config.server.name : message.guild.name) + ' IP:', icon)
                .setDescription(`\`${server.ip}\`:\`${server.port}\``)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [ipEmbed] });
        } else {
            text.ip.title = text.ip.title.replace('{serverIp}', server.ip)
            text.ip.title = text.ip.title.replace('{serverPort}', server.port)
            text.ip.title = text.ip.title.replace('{serverName}', config.server.name)
            text.ip.title = text.ip.title.replace('{voteLink}', config.server.vote)

            text.ip.description = text.ip.description.replace('{serverIp}', server.ip)
            text.ip.description = text.ip.description.replace('{serverPort}', server.port)
            text.ip.description = text.ip.description.replace('{serverName}', config.server.name)
            text.ip.description = text.ip.description.replace('{voteLink}', config.server.vote)

            const ipEmbed = new Discord.MessageEmbed()
                .setTitle(text.ip.title, icon)
                .setDescription(text.ip.description)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [ipEmbed] });
    }
};