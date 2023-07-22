const { SlashCommandBuilder } = require('discord.js'),
    util = require('axios'),
    Discord = require('discord.js'),
    c = require('chalk'),
    fs = require('fs'),
    { commands } = require(fs.existsSync('../../config/dev-main') ? '../../config/dev-main' : '../../config/main');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list') //Name of command - RENAME THE FILE TOO!!!
        .setDescription('Sends the actual list of players online') //Description of command - you can change it :)
};

module.exports.run = async (bot, interaction) => {
    let { server, config } = bot,
        text = commands.list.text,
        warn = c.keyword('yellow').bold,
        warns = config.settings.warns;

    if (!server.work) return;
    if (server.type !== 'java') return;

    let icon = server.icon ? server.icon : interaction.guild.iconURL();

    util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`)
        .then((response) => {
            if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
            if (text.title === "" || text.description === "" || text.listFormat === "") {
                const trueList = response.data.players.list ? "\n\`\`\`" + response.data.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";

                const serverEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                    .setTitle("Online player list:")
                    .setDescription(`**${response.data.players.online}**/**${response.data.players.max}**` + trueList)
                    .setColor(config.embeds.color);
                interaction.reply({ embeds: [serverEmbed] });
            } else {
                text.title = text.title.replaceAll('{serverIp}', server.ip);
                text.title = text.title.replaceAll('{serverPort}', server.port);
                text.title = text.title.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
                text.title = text.title.replaceAll('{voteLink}', config.server.vote);
                text.title = text.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
                text.title = text.title.replaceAll('{playersOnline}', response.data.players.online);
                text.title = text.title.replaceAll('{playersMax}', response.data.players.max);

                text.description = text.description.replaceAll('{serverIp}', server.ip);
                text.description = text.description.replaceAll('{serverPort}', server.port);
                text.description = text.description.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
                text.description = text.description.replaceAll('{voteLink}', config.server.vote);
                text.description = text.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
                text.description = text.description.replaceAll('{playersOnline}', response.data.players.online);
                text.description = text.description.replaceAll('{playersMax}', response.data.players.max);

                if (response.data.players.list && response.data.players.online > 0 && response.data.players.list.length > 0) {
                    var trueList = text.listFormat.replaceAll('{playersList}', response.data.players.list.map(p => ` ${p.name_clean} `).join('\r\n'));
                }

                const serverEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                    .setTitle(text.title)
                    .setDescription(text.description + (trueList ? `\n${trueList}` : ""))
                    .setColor(config.embeds.color);
                interaction.reply({ embeds: [serverEmbed] });
            }
        })
        .catch((error) => {
            if (text.title === "" || text.description === "" || text.listFormat === "") {
                const errorEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                    .setTitle("Online player list:")
                    .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                    .setColor(config.embeds.error);
                interaction.reply({ embeds: [errorEmbed] });
            } else {
                text.title = text.title.replaceAll('{serverIp}', server.ip);
                text.title = text.title.replaceAll('{serverPort}', server.port);
                text.title = text.title.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
                text.title = text.title.replaceAll('{voteLink}', config.server.vote);
                text.title = text.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

                const errorEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                    .setTitle("Online player list:")
                    .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                    .setColor(config.embeds.error);
                interaction.reply({ embeds: [errorEmbed] });
            }

            if (warns) console.log(`${bot.emotes.warn} ` + warn(`Error when using command ${module.exports.data.name}! Error:\n`) + error);
        });
};