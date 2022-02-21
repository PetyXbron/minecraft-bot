const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote') //Name of command - RENAME THE FILE TOO!!!
        .setDescription('Sends the link for voting on Minecraft server list') //Description of command - you can change it :)
};

module.exports.run = async (bot, interaction) => {
    const { server, config, text } = bot;
    let icon = server.icon ? server.icon : interaction.guild.iconURL();
    let serverName = config.server.name ? config.server.name : interaction.guild.name;

    if (text.vote.title === "" || text.vote.description === "") {
        const voteEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
            .setTitle("Server list vote link:")
            .setDescription(server.vote ? `[Here](${server.vote}) you can vote for ${serverName}!` : "VOTE LINK IS NOT DEFINED IN CONFIG!")
            .setColor(config.embeds.color);
        interaction.reply({ embeds: [voteEmbed] });
    } else {
        text.vote.title = text.vote.title.replaceAll('{serverIp}', server.ip);
        text.vote.title = text.vote.title.replaceAll('{serverPort}', server.port);
        text.vote.title = text.vote.title.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
        text.vote.title = text.vote.title.replaceAll('{voteLink}', config.server.vote);
        text.vote.title = text.vote.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

        text.vote.description = text.vote.description.replaceAll('{serverIp}', server.ip);
        text.vote.description = text.vote.description.replaceAll('{serverPort}', server.port);
        text.vote.description = text.vote.description.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
        text.vote.description = text.vote.description.replaceAll('{voteLink}', config.server.vote);
        text.vote.description = text.vote.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

        const voteEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
            .setTitle(text.vote.title)
            .setDescription(text.vote.description)
            .setColor(config.embeds.color);
        interaction.reply({ embeds: [voteEmbed] });
    }
};