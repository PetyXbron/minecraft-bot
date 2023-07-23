const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "list", //RENAME THE FILE TOO!!!
        enableChat: true,
        enableSlash: true,
        description: "Sends the actual list of players online",
        aliases: ["l", "players", "plist"]
    },
    slash: new SlashCommandBuilder()
        .setName('list') //RENAME THE FILE TOO!!!
        .setDescription(`Sends the actual list of players online`)
};

module.exports.run = async (bot, diType, di) => {
    const util = require('axios'),
        Discord = require('discord.js'),
        c = require('chalk'),
        { translate } = require('../functions/translations');

    let { server, config } = bot,
        warn = c.keyword('yellow').bold,
        warns = config.settings.warns;

    if (!server.work) return;
    if (server.type !== 'java') return;

    let icon = server.icon ? server.icon : di.guild.iconURL();

    util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`)
        .then(async (response) => {
            if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);

            if (response.data.players.online > 0) {
                const serverEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                    .setTitle(await translate("commands.list.onlineWithPlayers.title", di.guild))
                    .setDescription(await translate("commands.list.onlineWithPlayers.description", di.guild))
                    .addFields([
                        { name: await translate("commands.list.onlineWithPlayers.fields.1.name", di.guild), value: await translate("commands.list.onlineWithPlayers.fields.1.value", di.guild)}
                    ])
                    .setColor(config.embeds.color);
                di.reply({ embeds: [serverEmbed], allowedMentions: { repliedUser: false } });
            } else {
                const serverEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                    .setTitle(await translate("commands.list.onlineWithoutPlayers.title", di.guild))
                    .setDescription(await translate("commands.list.onlineWithoutPlayers.description", di.guild))
                    .setColor(config.embeds.color);
                di.reply({ embeds: [serverEmbed], allowedMentions: { repliedUser: false } });
            }
        })
        .catch(async (error) => {
            const serverEmbed = new Discord.EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                .setTitle(await translate("commands.list.offline.title", di.guild))
                .setDescription(await translate("commands.list.offline.description", di.guild))
                .setColor(config.embeds.error);
            di.reply({ embeds: [serverEmbed], allowedMentions: { repliedUser: false } });

            if (warns) console.log(`${bot.emotes.warn} ` + warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error);
        });
};