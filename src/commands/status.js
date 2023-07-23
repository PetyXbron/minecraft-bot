const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "status", //RENAME THE FILE TOO!!!
        enableChat: true,
        enableSlash: true,
        description: "Sends the simple status info message about server right now",
        aliases: ["s", "info", "server", "overview", "ov"]
    },
    slash: new SlashCommandBuilder()
        .setName('status') //RENAME THE FILE TOO!!!
        .setDescription(`Sends the simple status info message about server right now`)
};

module.exports.run = async (bot, diType, di) => {
    const util = require('axios'),
        Discord = require('discord.js'),
        c = require('chalk'),
        { translate } = require('../functions/translations');

    let { server, config } = bot,
        settings = config.settings,
        warn = c.keyword('yellow').bold,
        warns = config.settings.warns;

    if (!server.work) return;

    let icon = server.icon ? server.icon : di.guild.iconURL();

    if (server.type === 'java') {
        util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`)
            .then(async (response) => {
                if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
                const serverEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                    .setTitle(await translate("commands.status.online.title", di.guild))
                    .setDescription(await translate("commands.status.online.description", di.guild))
                    .addFields([
                        { name: await translate("commands.status.online.fields.1.name", di.guild), value: await translate("commands.status.online.fields.1.value", di.guild) },
                        { name: await translate("commands.status.online.fields.2.name", di.guild), value: await translate("commands.status.online.fields.2.value", di.guild) },
                        { name: await translate("commands.status.online.fields.3.name", di.guild), value: await translate("commands.status.online.fields.3.value", di.guild) },
                        { name: await translate("commands.status.online.fields.4.name", di.guild), value: await translate("commands.status.online.fields.4.value", di.guild) }
                    ])
                    .setColor(config.embeds.color);
                di.reply({ embeds: [serverEmbed], allowedMentions: { repliedUser: false } });
            })
            .catch(async (error) => {
                const errorEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                    .setTitle(await translate("commands.status.offline.title", di.guild))
                    .setDescription(await translate("commands.status.offline.description", di.guild))
                    .setColor(config.embeds.error);
                di.reply({ embeds: [errorEmbed], allowedMentions: { repliedUser: false } });

                if (warns) console.log(warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error);
            });
    } else {
        util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`)
            .then(async (response) => {
                if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
                const serverEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                    .setTitle(await translate("commands.status.online.title", di.guild))
                    .setDescription(await translate("commands.status.online.description", di.guild))
                    .addFields([
                        { name: await translate("commands.status.online.fields.1.name", di.guild), value: await translate("commands.status.online.fields.1.value", di.guild) },
                        { name: await translate("commands.status.online.fields.2.name", di.guild), value: await translate("commands.status.online.fields.2.value", di.guild) },
                        { name: await translate("commands.status.online.fields.3.name", di.guild), value: await translate("commands.status.online.fields.3.value", di.guild) },
                        { name: await translate("commands.status.online.fields.4.name", di.guild), value: await translate("commands.status.online.fields.4.value", di.guild) }
                    ])
                    .setColor(config.embeds.color);
                di.reply({ embeds: [serverEmbed], allowedMentions: { repliedUser: false } });
            })
            .catch(async (error) => {
                const errorEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                    .setTitle(await translate("commands.status.offline.title", di.guild))
                    .setDescription(await translate("commands.status.offline.description", di.guild))
                    .setColor(config.embeds.error);
                di.reply({ embeds: [errorEmbed], allowedMentions: { repliedUser: false } });

                if (warns) console.log(warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error);
            });
    }

};