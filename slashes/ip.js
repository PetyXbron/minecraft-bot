const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ip') //Name of command - RENAME THE FILE TOO!!!
        .setDescription(`Sends the IP address of server`) //Description of command - you can change it :)
};

module.exports.run = async (bot, interaction) => {
    const { server, config, text } = bot;
    let icon = server.icon ? server.icon : interaction.guild.iconURL();

    if (text.ip.title === "" || text.ip.description === "") {
        const ipEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
            .setTitle("IP address:")
            .setDescription(`\`${server.ip}\`:\`${server.port}\``)
            .setColor(config.embeds.color);
        interaction.reply({ embeds: [ipEmbed] });
    } else {
        text.ip.title = text.ip.title.replaceAll('{serverIp}', server.ip);
        text.ip.title = text.ip.title.replaceAll('{serverPort}', server.port);
        text.ip.title = text.ip.title.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
        text.ip.title = text.ip.title.replaceAll('{voteLink}', config.server.vote);
        text.ip.title = text.ip.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

        text.ip.description = text.ip.description.replaceAll('{serverIp}', server.ip);
        text.ip.description = text.ip.description.replaceAll('{serverPort}', server.port);
        text.ip.description = text.ip.description.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
        text.ip.description = text.ip.description.replaceAll('{voteLink}', config.server.vote);
        text.ip.description = text.ip.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

        const ipEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
            .setTitle(text.ip.title)
            .setDescription(text.ip.description)
            .setColor(config.embeds.color);
        interaction.reply({ embeds: [ipEmbed] });
    }
};