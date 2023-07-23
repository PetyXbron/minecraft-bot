const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "version", //RENAME THE FILE TOO!!!
        enableChat: true,
        enableSlash: true,
        description: "Sends the Minecraft version of server",
        aliases: ["v", "ver"]
    },
    slash: new SlashCommandBuilder()
        .setName('version') //RENAME THE FILE TOO!!!
        .setDescription(`Sends the Minecraft version of server`)
};

module.exports.run = async (bot, diType, di) => {
    const Discord = require('discord.js'),
        util = require('axios');

    let { server, config } = bot,
        icon = server.icon ? server.icon : di.guild.iconURL(),
        { translate } = require('../functions/translations');

    const versionEmbed = new Discord.EmbedBuilder()
        .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
        .setTitle(await translate("commands.version.title", di.guild))
        .setDescription(await translate("commands.version.description", di.guild))
        .setColor(config.embeds.color);
    di.reply({ embeds: [versionEmbed], allowedMentions: { repliedUser: false } });

};