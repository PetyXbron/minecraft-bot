const { commands } = require("../config");
const Discord = require('discord.js');

module.exports.config = {
    name: "ip", //Name of command - RENAME THE FILE TOO!!!
    description: "Ip command", //Description of command - you can change it :)
    aliases: commands.ip, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config } = bot
    let icon = server.icon ? server.icon : message.guild.icon

    if(server.work) {
        const ipEmbed = new Discord.MessageEmbed()
            .setTitle((config.server.name ? config.server.name : message.guild.name) + ' IP:', icon)
            .setDescription(`\`${server.ip}\`:\`${server.port}\``)
            .setColor(config.embeds.color);
        message.channel.send(ipEmbed);
    }
};