const { commands } = require("../config");
const Discord = require('discord.js');

module.exports.config = {
    name: "ip", //Name of command - RENAME THE FILE TOO!!!
    description: "Ip command", //Description of command - you can change it :)
    aliases: commands.ip, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server } = bot

    const ipEmbed = new Discord.MessageEmbed()
        .setDescription(`**${server.name} IP:** ${server.ip}:${server.port}`)
        .setColor('#77fc03')
    message.channel.send(ipEmbed);
};