const { SlashCommandBuilder } = require('@discordjs/builders'),
    Discord = require('discord.js'),
    fs = require('fs'),
    { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote') //Name of command - RENAME THE FILE TOO!!!
        .setDescription('Sends the link for voting on Minecraft server list') //Description of command - you can change it :)
};

module.exports.run = async (bot, interaction) => {
    let { server, config } = bot,
        text = commands.vote.text,
        icon = server.icon ? server.icon : message.guild.iconURL(),
        serverName = config.server.name ? config.server.name : interaction.guild.name;

    if (text.title === "" || text.description === "") {
        const voteEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
            .setTitle("Server list vote link:")
            .setDescription(server.vote ? `[Here](${server.vote}) you can vote for ${serverName}!` : "VOTE LINK IS NOT DEFINED IN CONFIG!")
            .setColor(config.embeds.color);
        interaction.reply({ embeds: [voteEmbed] });
    } else {
        text.title = text.title.replaceAll('{serverIp}', server.ip);
        text.title = text.title.replaceAll('{serverPort}', server.port);
        text.title = text.title.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
        text.title = text.title.replaceAll('{voteLink}', config.server.vote);
        text.title = text.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

        text.description = text.description.replaceAll('{serverIp}', server.ip);
        text.description = text.description.replaceAll('{serverPort}', server.port);
        text.description = text.description.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
        text.description = text.description.replaceAll('{voteLink}', config.server.vote);
        text.description = text.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

        const voteEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
            .setTitle(text.title)
            .setDescription(text.description)
            .setColor(config.embeds.color);
        interaction.reply({ embeds: [voteEmbed] });
    }
};