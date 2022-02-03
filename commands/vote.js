const { commands } = require("../config");
const Discord = require('discord.js');

module.exports.config = {
    name: "vote", //Name of command - RENAME THE FILE TOO!!!
    description: "Sends the link for voting on Minecraft server list", //Description of command - you can change it :)
    aliases: commands.vote, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config, text } = bot;
    let icon = server.icon ? server.icon : message.guild.icon;
    let serverName = config.server.name ? config.server.name : message.guild.name;

    if (text.vote.title === "" || text.vote.description === "") {
        const voteEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
            .setTitle("Server list vote link:")
            .setDescription(server.vote ? `[Here](${server.vote}) you can vote for ${serverName}!` : "VOTE LINK IS NOT DEFINED IN CONFIG!")
            .setColor(config.embeds.color);
        message.channel.send({ embeds: [voteEmbed] });
    } else {
        text.vote.title = text.vote.title.replace('{serverIp}', server.ip);
        text.vote.title = text.vote.title.replace('{serverPort}', server.port);
        text.vote.title = text.vote.title.replace('{serverName}', config.server.name ? config.server.name : message.guild.name);
        text.vote.title = text.vote.title.replace('{voteLink}', config.server.vote);
        text.vote.title = text.vote.title.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

        text.vote.description = text.vote.description.replace('{serverIp}', server.ip);
        text.vote.description = text.vote.description.replace('{serverPort}', server.port);
        text.vote.description = text.vote.description.replace('{serverName}', config.server.name ? config.server.name : message.guild.name);
        text.vote.description = text.vote.description.replace('{voteLink}', config.server.vote);
        text.vote.description = text.vote.description.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

        const voteEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
            .setTitle(text.vote.title)
            .setDescription(text.vote.description)
            .setColor(config.embeds.color);
        message.channel.send({ embeds: [voteEmbed] });
    }
};