const { commands } = require("../config");
const util = require('minecraft-server-util');
const Discord = require('discord.js');
const c = require('chalk');

module.exports.config = {
    name: "list", //Name of command - RENAME THE FILE TOO!!!
    description: "Sends the actual list of players online", //Description of command - you can change it :)
    aliases: commands.list, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message) => {
    const { server, config, text } = bot,
        warn = c.keyword('yellow').bold,
        warns = config.settings.warns;

    if (!server.work) return;

    let
        ip1 = server.ip,
        port1 = server.port,
        icon = server.icon ? server.icon : message.guild.icon;

    if (server.type === 'java') {
        util.status(ip1, port1)
            .then((result) => {
                if (text.list.title === "" || text.list.description === "" || text.list.listFormat === "") {
                    const trueList = result.players.sample ? "\n\`\`\`" + result.players.sample.map(p => ` ${p.name} `).join('\r\n') + "\`\`\`" : "";

                    const serverEmbed = new Discord.MessageEmbed()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle("Online player list:")
                        .setDescription(`**${result.players.online}**/**${result.players.max}**` + trueList)
                        .setColor(config.embeds.color);
                    message.channel.send({ embeds: [serverEmbed] });
                } else {
                    text.list.title = text.list.title.replace('{serverIp}', server.ip);
                    text.list.title = text.list.title.replace('{serverPort}', server.port);
                    text.list.title = text.list.title.replace('{serverName}', config.server.name ? config.server.name : message.guild.name);
                    text.list.title = text.list.title.replace('{voteLink}', config.server.vote);
                    text.list.title = text.list.title.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
                    text.list.title = text.list.title.replace('{playersOnline}', result.players.online);
                    text.list.title = text.list.title.replace('{playersMax}', result.players.max);

                    text.list.description = text.list.description.replace('{serverIp}', server.ip);
                    text.list.description = text.list.description.replace('{serverPort}', server.port);
                    text.list.description = text.list.description.replace('{serverName}', config.server.name ? config.server.name : message.guild.name);
                    text.list.description = text.list.description.replace('{voteLink}', config.server.vote);
                    text.list.description = text.list.description.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
                    text.list.description = text.list.description.replace('{playersOnline}', result.players.online);
                    text.list.description = text.list.description.replace('{playersMax}', result.players.max);

                    if (result.players.sample) {
                        var trueList = text.list.listFormat.replace('{playersList}', result.players.sample.map(p => ` ${p.name} `).join('\r\n'));
                    }

                    const serverEmbed = new Discord.MessageEmbed()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle(text.list.title)
                        .setDescription(text.list.description + (trueList ? `\n${trueList}` : ""))
                        .setColor(config.embeds.color);
                    message.channel.send({ embeds: [serverEmbed] });
                }
            })
            .catch((error) => {
                if (text.list.title === "" || text.list.description === "" || text.list.listFormat === "") {
                    const errorEmbed = new Discord.MessageEmbed()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle("Online player list:")
                        .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                        .setColor(config.embeds.error);
                    message.channel.send({ embeds: [errorEmbed] });
                } else {
                    text.list.title = text.list.title.replace('{serverIp}', server.ip);
                    text.list.title = text.list.title.replace('{serverPort}', server.port);
                    text.list.title = text.list.title.replace('{serverName}', config.server.name ? config.server.name : message.guild.name);
                    text.list.title = text.list.title.replace('{voteLink}', config.server.vote);
                    text.list.title = text.list.title.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

                    const errorEmbed = new Discord.MessageEmbed()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle("Online player list:")
                        .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                        .setColor(config.embeds.error);
                    message.channel.send({ embeds: [errorEmbed] });
                }

                if (warns) console.log(warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error);
            });
    } else {
        //Doesn't work for bedrock edition, sorry.
        message.reply('Sorry, but this function is not working for Bedrock servers.');
    }

};