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
        c = require('chalk');

    let { server, config } = bot,
        warn = c.keyword('yellow').bold,
        warns = config.settings.warns;

    if (!server.work) return;
    if (server.type !== 'java') return;

    let icon = server.icon ? server.icon : di.guild.iconURL();

    util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`)
        .then((response) => {
            if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
            const trueList = response.data.players.list ? "\n\`\`\`" + response.data.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";

            const serverEmbed = new Discord.EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                .setTitle("Online player list:")
                .setDescription(`**${response.data.players.online}**/**${response.data.players.max}**` + trueList)
                .setColor(config.embeds.color);
            di.reply({ embeds: [serverEmbed], allowedMentions: { repliedUser: false } });
        })
        .catch((error) => {
            const errorEmbed = new Discord.EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                .setTitle("Online player list:")
                .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                .setColor(config.embeds.error);
            di.reply({ embeds: [errorEmbed], allowedMentions: { repliedUser: false } });

            if (warns) console.log(`${bot.emotes.warn} ` + warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error);
        });
};