const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "ip", //RENAME THE FILE TOO!!!
        enableChat: true,
        enableSlash: true,
        description: "Sends the IP address of server",
        aliases: ["i", "ip-address", "address", "connect", "join"]
    },
    slash: new SlashCommandBuilder()
        .setName('ip') //RENAME THE FILE TOO!!!
        .setDescription(`Sends the IP address of server`)
};

module.exports.run = async (bot, diType, di) => {
    const Discord = require('discord.js'),
        { translate } = require('../functions/translations');

    let { server, config } = bot,
        icon = server.icon ? server.icon : di.guild.iconURL();

    const ipEmbed = new Discord.EmbedBuilder()
        .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
        .setTitle(await translate("commands.ip.title", di.guild))
        .setDescription(await translate("commands.ip.description", di.guild))
        .setColor(config.embeds.color);
    di.reply({ embeds: [ipEmbed], allowedMentions: { repliedUser: false } });
};