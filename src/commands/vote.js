const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "vote", //RENAME THE FILE TOO!!!
        enableChat: true,
        enableSlash: true,
        description: "Sends the link for voting on Minecraft server list",
        aliases: ["votes", "votelink"]
    },
    slash: new SlashCommandBuilder()
        .setName('vote') //RENAME THE FILE TOO!!!
        .setDescription('Sends the link for voting on Minecraft server list')
};

module.exports.run = async (bot, diType, di) => {
    const Discord = require('discord.js'),
        { translate } = require('../functions/translations');

    let { server, config } = bot,
        icon = server.icon ? server.icon : di.guild.iconURL();

    const voteEmbed = new Discord.EmbedBuilder()
        .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
        .setTitle(await translate("commands.vote.title", di.guild))
        .setDescription(await translate("commands.vote.description", di.guild))
        .setColor(config.embeds.color);
    di.reply({ embeds: [voteEmbed], allowedMentions: { repliedUser: false } });
};