const Discord = require('discord.js'),
    fs = require('fs'),
    { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports.config = {
    name: "vote", //Name of command - RENAME THE FILE TOO!!!
    description: "Sends the link for voting on Minecraft server list", //Description of command - you can change it :)
    aliases: commands.vote.aliases //Command's aliases - set them in config.js
};

module.exports.run = async (bot, message, args) => {
    let { server, config } = bot,
        text = commands.vote.text,
        icon = server.icon ? server.icon : message.guild.iconURL(),
        serverName = config.server.name ? config.server.name : message.guild.name;

    if (text.title === "" || text.description === "") {
        const voteEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
            .setTitle("Server list vote link:")
            .setDescription(server.vote ? `[Here](${server.vote}) you can vote for ${serverName}!` : "VOTE LINK IS NOT DEFINED IN CONFIG!")
            .setColor(config.embeds.color);
        message.channel.send({ embeds: [voteEmbed] });
    } else {
        text.title = text.title.replaceAll('{serverIp}', server.ip);
        text.title = text.title.replaceAll('{serverPort}', server.port);
        text.title = text.title.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
        text.title = text.title.replaceAll('{voteLink}', config.server.vote);
        text.title = text.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

        text.description = text.description.replaceAll('{serverIp}', server.ip);
        text.description = text.description.replaceAll('{serverPort}', server.port);
        text.description = text.description.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
        text.description = text.description.replaceAll('{voteLink}', config.server.vote);
        text.description = text.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

        const voteEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
            .setTitle(text.title)
            .setDescription(text.description)
            .setColor(config.embeds.color);
        message.channel.send({ embeds: [voteEmbed] });
    }
};