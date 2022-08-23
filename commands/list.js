const util = require('minecraft-server-util'),
    Discord = require('discord.js'),
    c = require('chalk'),
    fs = require('fs'),
    { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports.config = {
    name: "list", //Name of command - RENAME THE FILE TOO!!!
    description: "Sends the actual list of players online", //Description of command - you can change it :)
    aliases: commands.list.aliases //Command's aliases - set them in config.js
};

module.exports.run = async (bot, message) => {
    let { server, config } = bot,
        text = commands.list.text,
        warn = c.keyword('yellow').bold,
        warns = config.settings.warns;

    if (!server.work) return;

    let
        ip1 = server.ip,
        port1 = server.port,
        icon = server.icon ? server.icon : message.guild.iconURL();

    if (server.type === 'java') {
        util.status(ip1, port1)
            .then((result) => {
                if (text.title === "" || text.description === "" || text.listFormat === "") {
                    const trueList = result.players.sample ? "\n\`\`\`" + result.players.sample.map(p => ` ${p.name} `).join('\r\n') + "\`\`\`" : "";

                    const serverEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle("Online player list:")
                        .setDescription(`**${result.players.online}**/**${result.players.max}**` + trueList)
                        .setColor(config.embeds.color);
                    message.channel.send({ embeds: [serverEmbed] });
                } else {
                    text.title = text.title.replaceAll('{serverIp}', server.ip);
                    text.title = text.title.replaceAll('{serverPort}', server.port);
                    text.title = text.title.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
                    text.title = text.title.replaceAll('{voteLink}', config.server.vote);
                    text.title = text.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
                    text.title = text.title.replaceAll('{playersOnline}', result.players.online);
                    text.title = text.title.replaceAll('{playersMax}', result.players.max);

                    text.description = text.description.replaceAll('{serverIp}', server.ip);
                    text.description = text.description.replaceAll('{serverPort}', server.port);
                    text.description = text.description.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
                    text.description = text.description.replaceAll('{voteLink}', config.server.vote);
                    text.description = text.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
                    text.description = text.description.replaceAll('{playersOnline}', result.players.online);
                    text.description = text.description.replaceAll('{playersMax}', result.players.max);

                    if (result.players.sample) {
                        var trueList = text.listFormat.replaceAll('{playersList}', result.players.sample.map(p => ` ${p.name} `).join('\r\n'));
                    }

                    const serverEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle(text.title)
                        .setDescription(text.description + (trueList ? `\n${trueList}` : ""))
                        .setColor(config.embeds.color);
                    message.channel.send({ embeds: [serverEmbed] });
                }
            })
            .catch((error) => {
                if (text.title === "" || text.description === "" || text.listFormat === "") {
                    const errorEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle("Online player list:")
                        .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                        .setColor(config.embeds.error);
                    message.channel.send({ embeds: [errorEmbed] });
                } else {
                    text.title = text.title.replaceAll('{serverIp}', server.ip);
                    text.title = text.title.replaceAll('{serverPort}', server.port);
                    text.title = text.title.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
                    text.title = text.title.replaceAll('{voteLink}', config.server.vote);
                    text.title = text.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

                    const errorEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle("Online player list:")
                        .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                        .setColor(config.embeds.error);
                    message.channel.send({ embeds: [errorEmbed] });
                }

                if (warns) console.log(`${bot.emotes.warn} ` + warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error);
            });
    } else {
        //Doesn't work for bedrock edition, sorry.
        message.reply('Sorry, but this function is not working for Bedrock servers.');
    }

};