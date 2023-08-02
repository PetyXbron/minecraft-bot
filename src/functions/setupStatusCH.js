const chalk = require('chalk'),
    util = require('axios'),
    Discord = require('discord.js'),
    fs = require('fs'),
    ms = require('ms'),
    ma = chalk.magenta.bold,
    warn = chalk.keyword('yellow').bold,
    { removeVersion } = require('../functions/base');

module.exports = {
    async setupStatusCH(bot, config) {
        const { info, warns } = bot;
        const channel = await bot.channels.cache.get(info.channelID);
        if (channel) {
            const dataJSON = bot.dataJSON;

            if (!dataJSON["StatusCHMsgID"]) {
                require("./setupStatusCH").sendStatusCH(bot, config, channel);
            }

            let errored;
            try {
                msg = await channel.messages.fetch(dataJSON["StatusCHMsgID"]);
                errored = false;
            } catch (err) {
                if (warns) console.log(`${bot.emotes.warn} ` + warn('Could not fetch the statusCH message! Error:\n') + err);
                if (warns) console.log(`${bot.emotes.warn} ` + warn('Possible fix: remove "StatusCHMsgID" log from data.json'));
                errored = true;
            }

            if (!errored) {
                require("./setupStatusCH").createStatusCH(bot, config, channel);
                require("./setupStatusCH").autoUpdatingStatusCH(bot, config, channel);
            }
        } else {
            err = "Discord channel doesn't exist. Did you enter a valid channel ID?";
            if (warns) console.log(`${bot.emotes.warn} ` + warn('Could not send the statusCH message! Error:\n') + err);
        }
    },

    async sendStatusCH(bot, config, channel) {
        const { warns, server } = bot;
        const guild = config.bot.guildID ? await bot.guilds.cache.get(config.bot.guildID) : null;
        const defPort = config.settings.showDefaultPort;
        const icon = server.icon ? server.icon : guild.iconURL();
        const dataJSON = bot.dataJSON;
        let msg;
        try {
            const serverEmbed = new Discord.EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                .setDescription(`🔄 **SETTING...**`)
                .addFields([
                    { name: "PLAYERS", value: `�/�`, inline: false },
                    { name: "INFO", value: `${config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1)} �\n\`${server.ip}\`${!defPort && server.port === 25565 || !defPort && server.port === 19132 ? "" : `:\`${server.port}\``}`, inline: true }
                ])
                .setColor(config.embeds.color);
            try {
                msg = await channel.send({ embeds: [serverEmbed] });
            } catch (err) {
                console.log("Could not send the statusCH message! Error:\n" + err);
            }
        } catch (err) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn('Could not send the statusCH message! Error:\n') + err);
        }

        data = dataJSON;
        data["StatusCHMsgID"] = msg.id;
        fs.writeFileSync(bot.dev ? __dirname + "/../../config/dev-data.json" : __dirname + "/../../config/data.json", JSON.stringify(data, null, 4), err => {
            if (warns) console.log(`${bot.emotes.warn} ` + warn('Could not edit the config/data.json content! Error:\n') + err);
        });
    },

    async createStatusCH(bot, config, channel) {
        msg = await channel.messages.fetch(bot.dataJSON["StatusCHMsgID"]);
        const debug = config.settings.debug;
        const { warns, server } = bot;
        const guild = config.bot.guildID ? await bot.guilds.cache.get(config.bot.guildID) : null;
        const defPort = config.settings.showDefaultPort;
        const icon = server.icon ? server.icon : guild.iconURL();
        if (server.type === 'java') {
            util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`)
                .then(async (response) => {
                    if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
                    const versionOriginal = response.data.version.name_clean;
                    let versionAdvanced = false;

                    if (config.settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

                    const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                    const trueList = response.data.players.list && response.data.players.list.length > 0 ? "\n\`\`\`" + response.data.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";

                    const serverEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                        .setDescription(":white_check_mark: **ONLINE**")
                        .addFields(
                            { name: "PLAYERS", value: `${response.data.players.online}/${response.data.players.max}` + trueList, inline: false },
                            { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`${!defPort && server.port === 25565 || !defPort && server.port === 19132 ? "" : `:\`${server.port}\``}`, inline: true }
                        )
                        .setColor(config.embeds.color)
                        .setFooter({ text: 'Updated' })
                        .setTimestamp();
                    try { await msg.edit({ embeds: [serverEmbed] }); }
                    catch (err) { if (warns) console.log(`${bot.emotes.warn} ` + warn('Could not edit the statusCH message! Error:\n') + err); }

                })
                .catch(async (error) => {
                    const errorEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                        .setDescription(':x: **OFFLINE**')
                        .setColor(config.embeds.error)
                        .setFooter({ text: 'Updated' })
                        .setTimestamp();
                    try { await msg.edit({ embeds: [errorEmbed] }); }
                    catch (err) { console.log("Could not edit the statusCH message! Error:\n" + err); }

                    if (warns) console.log(`${bot.emotes.warn} ` + warn(`Something went wrong with sending statusCH message! Error:\n`) + error);
                });
        } else {
            util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`)
                .then(async (response) => {
                    if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
                    const versionOriginal = response.data.version.name;
                    let versionAdvanced = false;

                    if (config.settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

                    const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                    const serverEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                        .setDescription(":white_check_mark: **ONLINE**")
                        .addFields(
                            { name: "PLAYERS", value: `${response.data.players.online}/${response.data.players.max}`, inline: false },
                            { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`${!defPort && server.port === 25565 || !defPort && server.port === 19132 ? "" : `:\`${server.port}\``}`, inline: true }
                        )
                        .setColor(config.embeds.color)
                        .setFooter({ text: 'Updated' })
                        .setTimestamp();
                    try { await msg.edit({ embeds: [serverEmbed] }); }
                    catch (err) { if (warns) console.log(`${bot.emotes.warn} ` + warn('Could not edit the statusCH message! Error:\n') + err); }
                })
                .catch(async (error) => {
                    const errorEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                        .setDescription(':x: **OFFLINE**')
                        .setColor(config.embeds.error)
                        .setFooter({ text: 'Updated' })
                        .setTimestamp();
                    try { await msg.edit({ embeds: [errorEmbed] }); }
                    catch (err) { console.log("Could not edit the statusCH message! Error:\n" + err); }

                    if (warns) console.log(`${bot.emotes.warn} ` + warn(`Something went wrong with sending statusCH message! Error:\n`) + error);
                });
        }

        if (debug) console.log(`${bot.emotes.debug} Successfully updated the statusCH message in ${ma(channel.name)}!`);
    },

    async autoUpdatingStatusCH(bot, config, channel) {
        msg = await channel.messages.fetch(bot.dataJSON["StatusCHMsgID"]);
        const { warns, server, info } = bot;
        const guild = config.bot.guildID ? await bot.guilds.cache.get(config.bot.guildID) : null;
        const defPort = config.settings.showDefaultPort;
        const icon = server.icon ? server.icon : guild.iconURL();
        if (server.type === 'java') {
            setInterval(() =>
                util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`)
                    .then(async (response) => {
                        if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
                        const versionOriginal = response.data.version.name_clean;
                        let versionAdvanced = false;

                        if (config.settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

                        const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                        const trueList = response.data.players.list && response.data.players.list.length > 0 ? "\n\`\`\`" + response.data.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";

                        const serverEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                            .setDescription(":white_check_mark: **ONLINE**")
                            .addFields(
                                { name: "PLAYERS", value: `${response.data.players.online}/${response.data.players.max}` + trueList, inline: false },
                                { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`${!defPort && server.port === 25565 || !defPort && server.port === 19132 ? "" : `:\`${server.port}\``}`, inline: true }
                            )
                            .setColor(config.embeds.color)
                            .setFooter({ text: 'Updated' })
                            .setTimestamp();
                        try { await msg.edit({ embeds: [serverEmbed] }); }
                        catch (err) { if (warns) console.log(`${bot.emotes.warn} ` + warn('Could not edit the statusCH message! Error:\n') + err); }
                    })
                    .catch(async (error) => {
                        const errorEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                            .setDescription(':x: **OFFLINE**')
                            .setColor(config.embeds.error)
                            .setFooter({ text: 'Updated' })
                            .setTimestamp();
                        try { await msg.edit({ embeds: [errorEmbed] }); }
                        catch (err) { if (warns) console.log(`${bot.emotes.warn} ` + warn('Could not edit the statusCH message! Error:\n') + err); }

                        if (warns) console.log(`${bot.emotes.warn} ` + warn(`Something went wrong with sending statusCH message! Error:\n`) + error);
                    }), ms(info.time));
        } else {
            setInterval(() =>
                util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`)
                    .then(async (response) => {
                        if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
                        const versionOriginal = response.data.version.name;
                        let versionAdvanced = false;

                        if (config.settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

                        const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                        const serverEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                            .setDescription(":white_check_mark: **ONLINE**")
                            .addFields(
                                { name: "PLAYERS", value: `${response.data.players.online}/${response.data.players.max}`, inline: false },
                                { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`${!defPort && server.port === 25565 || !defPort && server.port === 19132 ? "" : `:\`${server.port}\``}`, inline: true }
                            )
                            .setColor(config.embeds.color)
                            .setFooter({ text: 'Updated' })
                            .setTimestamp();
                        try { await msg.edit({ embeds: [serverEmbed] }); }
                        catch (err) { console.log("Could not edit the statusCH message! Error:\n" + err); }
                    })
                    .catch(async (error) => {
                        const errorEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                            .setDescription(':x: **OFFLINE**')
                            .setColor(config.embeds.error)
                            .setFooter({ text: 'Updated' })
                            .setTimestamp();
                        try { await msg.edit({ embeds: [errorEmbed] }); }
                        catch (err) { console.log("Could not edit the statusCH message! Error:\n" + err); }

                        if (warns) console.log(`${bot.emotes.warn} ` + warn(`Something went wrong with sending status message! Error:\n`) + error);
                    }), ms(info.time));
        }
    }
};