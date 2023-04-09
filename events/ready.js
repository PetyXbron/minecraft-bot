const chalk = require('chalk'),
    util = require('axios'),
    Discord = require('discord.js'),
    at = Discord.ActivityType,
    fs = require('fs'),
    ms = require('ms'),
    gr = chalk.green.bold,
    bold = chalk.bold,
    bl = chalk.blue.bold,
    ma = chalk.magenta.bold,
    blu = chalk.blue.bold.underline,
    warn = chalk.keyword('yellow').bold,
    processInfo = chalk.cyan.bgBlack,
    { removeVersion } = require('../functions');

module.exports = async (bot) => {
    const { server, config, info, settings } = bot;
    const guild = config.bot.guildID ? await bot.guilds.cache.get(config.bot.guildID) : null;
    const debug = config.settings.debug;
    const defPort = config.settings.showDefaultPort;
    var warns = config.settings.warns;

    if (bot.pres) {
        let presence = config.bot.presence,
            status = config.bot.status.toLowerCase(),
            activity = config.bot.activity.charAt(0).toUpperCase() + config.bot.activity.slice(1).toLowerCase();
        if (bot.pres.includes("{onlinePlayers}") | bot.pres.includes("{maxPlayers}")) {
            async function autoUpdatingPresence() { //autoUpdatingPresence loop for refreshing bot presence and status
                let errored = false,
                    response = undefined;

                if (server.type === 'java') {
                    try {
                        response = await util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`);
                    } catch (err) {
                        if (debug) console.log(`${bot.emotes.debug} Could not receive server status data! Error:\n` + err);
                        errored = true;
                    }
                } else {
                    try {
                        response = await util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`);
                    } catch (err) {
                        if (debug) console.log(`${bot.emotes.debug} Could not receive server status data! Error:\n` + err);
                        errored = true;
                    }
                };

                if (!errored) {
                    if (presence.includes("{onlinePlayers}")) {
                        presence = presence.replaceAll("{onlinePlayers}", response.data.players.online);
                    };

                    if (presence.includes("{maxPlayers}")) {
                        presence = presence.replaceAll("{maxPlayers}", response.data.players.max);
                    };

                    try {
                        await bot.user.setPresence({ activities: [{ name: presence, type: at[activity] }], status: status, afk: false }); //Sets bot activity
                        if (debug) console.log(`${bot.emotes.debug} Successfully set the bot presence to ` + ma(`${activity} ${presence}`));
                    } catch (e) {
                        if (debug) console.log(`${bot.emotes.debug} Could not set the Discord bot presence! Error:\n` + e);
                    }
                } else {
                    const presence = config.autoStatus.offline;
                    try {
                        await bot.user.setPresence({ activities: [{ name: presence, type: at[activity] }], status: status, afk: false }); //Sets bot activity
                        if (debug) console.log(`${bot.emotes.warn} ` + warn('Server was not found! Presence set to ') + ma(`${activity} ${presence}`));
                    } catch (e) {
                        if (debug) console.log(`${bot.emotes.debug} Could not set the Discord bot presence! Error:\n` + e);
                    }
                }
                presence = config.bot.presence;
                setTimeout(autoUpdatingPresence, ms(config.autoStatus.time));
            }
            autoUpdatingPresence();
        } else {
            try {
                bot.user.setPresence({ activities: [{ name: presence, type: activity }], status: status, afk: false }); //Sets bot activity
                if (debug) console.log(`${bot.emotes.debug} Successfully set the bot presence to ` + ma(`${bot.activity.toLowerCase()} ${bot.pres}`));
            } catch (e) {
                if (debug) console.log(`${bot.emotes.debug} Could not set the Discord bot presence! Error:\n` + e);
            }
        }
    }

    if (config.settings.countingCH) {
        async function countingCH() { //countingCH loop for refreshing voice channel name
            let name = config.countingCH.name,
                errored = false,
                response = undefined;

            if (server.type === 'java') {
                try {
                    response = await util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`);
                } catch (err) {
                    if (debug) console.log(`${bot.emotes.debug} Could not receive server status data! Error:\n` + err);
                    errored = true;
                }
            } else {
                try {
                    response = await util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`);
                } catch (err) {
                    if (debug) console.log(`${bot.emotes.debug} Could not receive server status data! Error:\n` + err);
                    errored = true;
                }
            };

            if (!errored) {
                name = name
                    .replaceAll("{onlinePlayers}", response.data.players.online)
                    .replaceAll("{maxPlayers}", response.data.players.max);

                try {
                    channel = await bot.channels.cache.get(config.countingCH.channelID);
                    await channel.setName(name); //Sets channel name
                    if (debug) console.log(`${bot.emotes.debug} Successfully set the countingCH channel name to ` + ma(name));
                } catch (e) {
                    if (warns) console.log(bot.emotes.warn + warn('Could not set the countingCH channel name! Error:\n') + e);
                }
            } else {
                name = config.countingCH.offline;
                try {
                    channel = await bot.channels.cache.get(config.countingCH.channelID);
                    await channel.setName(name); //Sets channel name
                    if (debug) console.log(`${bot.emotes.debug} ` + warn('Could not get the server data information! Channel name has been set to ') + ma(name));
                } catch (e) {
                    if (warns) console.log(bot.emotes.warn + warn('Could not set the countingCH channel name! Error:\n') + e);
                }
            }
            setTimeout(countingCH, ms(config.countingCH.time));
        }
        countingCH();
    }

    if (config.settings.votingCH) {
        const channel = bot.channels.cache.get(config.votingCH.channelID);
        if (debug) console.log(`${bot.emotes.debug} Channel ${ma(channel.name)} is now set as voting channel!`);
    }

    if (config.settings.statusCH && server.work) {
        const channel = bot.channels.cache.get(info.channelID);
        const icon = server.icon ? server.icon : guild.iconURL();
        const dataJSON = bot.dataJSON;

        if (!dataJSON["StatusCHMsgID"]) {
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
                if (warns) console.log(bot.emotes.warn + warn('Could not send the statusCH message! Error:\n') + err);
            }

            data = dataJSON;
            data["StatusCHMsgID"] = msg.id;
            fs.writeFile(bot.dev ? "./dev-data.json" : "./data.json", JSON.stringify(data, null, 4), err => {
                if (warns) console.log(bot.emotes.warn + warn('Could not edit the data.json content! Error:\n') + err);
            });
        }

        msg = await channel.messages.fetch(dataJSON["StatusCHMsgID"]);

        if (server.type === 'java') {
            util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`)
                .then((response) => {
                    const versionOriginal = response.data.version.name_clean;
                    let versionAdvanced = false;

                    let maintenceStatus = false,
                        lowCaseMotdClean = response.data.motd.clean.toLocaleLowerCase();
                    if (lowCaseMotdClean.includes("maintenance")) maintenceStatus = true;

                    if (settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

                    const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                    const trueList = response.data.players.list ? "\n\`\`\`" + response.data.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";

                    const serverEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                        .setDescription(maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**")
                        .addFields(
                            { name: "PLAYERS", value: `${response.data.players.online}/${response.data.players.max}` + trueList, inline: false },
                            { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`${!defPort && server.port === 25565 || !defPort && server.port === 19132 ? "" : `:\`${server.port}\``}`, inline: true }
                        )
                        .setColor(config.embeds.color)
                        .setFooter({ text: 'Updated' })
                        .setTimestamp();
                    try { msg.edit({ embeds: [serverEmbed] }); }
                    catch (err) { if (warns) console.log(bot.emotes.warn + warn('Could not edit the statusCH message! Error:\n') + err); }

                })
                .catch((error) => {
                    const errorEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                        .setDescription(':x: **OFFLINE**')
                        .setColor(config.embeds.error)
                        .setFooter({ text: 'Updated' })
                        .setTimestamp();
                    try { msg.edit({ embeds: [errorEmbed] }); }
                    catch (err) { console.log("Could not edit the statusCH message! Error:\n" + err); }

                    if (warns) console.log(`${bot.emotes.warn} ` + warn(`Something went wrong with sending statusCH message! Error:\n`) + error);
                });
        } else {
            util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`)
                .then((response) => {
                    const versionOriginal = response.data.version.name_clean;
                    let versionAdvanced = false;

                    let maintenceStatus = false,
                        lowCaseMotdClean = response.data.motd.clean.toLocaleLowerCase();
                    if (lowCaseMotdClean.includes("maintenance")) maintenceStatus = true;

                    if (settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

                    const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                    const serverEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                        .setDescription(maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**")
                        .addFields(
                            { name: "PLAYERS", value: `${response.data.players.online}/${response.data.players.max}`, inline: false },
                            { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`${!defPort && server.port === 25565 || !defPort && server.port === 19132 ? "" : `:\`${server.port}\``}`, inline: true }
                        )
                        .setColor(config.embeds.color)
                        .setFooter({ text: 'Updated' })
                        .setTimestamp();
                    try { msg.edit({ embeds: [serverEmbed] }); }
                    catch (err) { if (warns) console.log(bot.emotes.warn + warn('Could not edit the statusCH message! Error:\n') + err); }
                })
                .catch((error) => {
                    const errorEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                        .setDescription(':x: **OFFLINE**')
                        .setColor(config.embeds.error)
                        .setFooter({ text: 'Updated' })
                        .setTimestamp();
                    try { msg.edit({ embeds: [errorEmbed] }); }
                    catch (err) { console.log("Could not edit the statusCH message! Error:\n" + err); }

                    if (warns) console.log(`${bot.emotes.warn} ` + warn(`Something went wrong with sending statusCH message! Error:\n`) + error);
                });
        }

        if (debug) console.log(`${bot.emotes.debug} Successfully updated status message in ${ma(channel.name)}!`);

        if (server.type === 'java') {
            setInterval(() =>
                util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`)
                    .then((response) => {
                        const versionOriginal = response.data.version.name_clean;
                        let versionAdvanced = false;

                        let maintenceStatus = false,
                            lowCaseMotdClean = response.data.motd.clean.toLocaleLowerCase();
                        if (lowCaseMotdClean.includes("maintenance")) maintenceStatus = true;

                        if (settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

                        const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                        const trueList = response.data.players.list ? "\n\`\`\`" + response.data.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";

                        const serverEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                            .setDescription(maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**")
                            .addFields(
                                { name: "PLAYERS", value: `${response.data.players.online}/${response.data.players.max}` + trueList, inline: false },
                                { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`${!defPort && server.port === 25565 || !defPort && server.port === 19132 ? "" : `:\`${server.port}\``}`, inline: true }
                            )
                            .setColor(config.embeds.color)
                            .setFooter({ text: 'Updated' })
                            .setTimestamp();
                        try { msg.edit({ embeds: [serverEmbed] }); }
                        catch (err) { if (warns) console.log(bot.emotes.warn + warn('Could not edit the statusCH message! Error:\n') + err); }
                    })
                    .catch((error) => {
                        const errorEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                            .setDescription(':x: **OFFLINE**')
                            .setColor(config.embeds.error)
                            .setFooter({ text: 'Updated' })
                            .setTimestamp();
                        try { msg.edit({ embeds: [errorEmbed] }); }
                        catch (err) { if (warns) console.log(bot.emotes.warn + warn('Could not edit the statusCH message! Error:\n') + err); }

                        if (warns) console.log(`${bot.emotes.warn} ` + warn(`Something went wrong with sending statusCH message! Error:\n`) + error);
                    }), ms(info.time));
        } else {
            setInterval(() =>
                util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`)
                    .then((response) => {
                        const versionOriginal = response.data.version.name_clean;
                        let versionAdvanced = false;

                        let maintenceStatus = false,
                            lowCaseMotdClean = response.data.motd.clean.toLocaleLowerCase();
                        if (lowCaseMotdClean.includes("maintenance")) maintenceStatus = true;

                        if (settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

                        const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                        const serverEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                            .setDescription(maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**")
                            .addFields(
                                { name: "PLAYERS", value: `${response.data.players.online}/${response.data.players.max}`, inline: false },
                                { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`${!defPort && server.port === 25565 || !defPort && server.port === 19132 ? "" : `:\`${server.port}\``}`, inline: true }
                            )
                            .setColor(config.embeds.color)
                            .setFooter({ text: 'Updated' })
                            .setTimestamp();
                        try { msg.edit({ embeds: [serverEmbed] }); }
                        catch (err) { console.log("Could not edit the statusCH message! Error:\n" + err); }
                    })
                    .catch((error) => {
                        const errorEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: config.server.name ? config.server.name : guild.name, iconURL: icon })
                            .setDescription(':x: **OFFLINE**')
                            .setColor(config.embeds.error)
                            .setFooter({ text: 'Updated' })
                            .setTimestamp();
                        try { msg.edit({ embeds: [errorEmbed] }); }
                        catch (err) { console.log("Could not edit the statusCH message! Error:\n" + err); }

                        if (warns) console.log(`${bot.emotes.warn} ` + warn(`Something went wrong with sending status message! Error:\n`) + error);
                    }), ms(info.time));
        }

    }

    console.log(`${bot.emotes.success} ` + gr(bot.user.username) + " is now working with prefix " + gr(bot.prefix));
    if (settings.inviteLink) console.log(`${bot.emotes.info} ` + "Invite " + bl(bot.user.username) + " to your Discord server with link:\n   " + blu(`https://discord.com/oauth2/authorize?client_id=${bot.user.id}&permissions=274877918272&scope=bot%20applications.commands`));

    if (bot.readyScan && server.work) {
        if (server.type === 'java') {
            util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`)
                .then((response) => {
                    console.log(`${bot.emotes.success} Successfully located ${gr(server.type.toUpperCase())} server ${gr(server.ip)}!\n` + "   " + gr('Server info:\n')
                        + "   " + bold('IP:	    ') + bl(`${server.ip}:${response.data.port ? response.data.port : server.port}\n`)
                        + "   " + bold('VERSION: ') + bl(`${response.data.version.name_clean ? response.data.version.name_clean : 'unknown'}\n`)
                        + "   " + bold('PLAYERS: ') + bl(`${response.data.players.online ? response.data.players.online : '0'}` + '/' + `${response.data.players.max ? response.data.players.max : '0'}`)
                    );
                    console.log(processInfo('>> minecraft-bot working <<'));
                })
                .catch((error) => {
                    if (warns) console.log(`${bot.emotes.warn} ` + warn(`Could not find ${server.type} server ${server.ip} with port ${server.port}! Error:\n`) + error);
                    console.log(processInfo('>> minecraft-bot working <<'));
                });
        } else if (server.type === 'bedrock') {
            util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`)
                .then((response) => {
                    console.log(`${bot.emotes.success} Successfully located ${gr(server.type.toUpperCase())} server ${gr(server.ip)}!\n` + "   " + gr('| Server info:\n')
                        + "   " + gr('| ') + bold('IP:	    ') + bl(`${server.ip}:${response.data.port ? response.data.port : server.port}\n`)
                        + "   " + gr('| ') + bold('VERSION: ') + bl(`${response.data.version.name_clean ? response.data.version.name_clean : 'unknown'}\n`)
                        + "   " + gr('| ') + bold('PLAYERS: ') + bl(`${response.data.players.online ? response.data.players.online : '0'}` + '/' + `${response.data.players.max ? response.data.players.max : '0'}`)
                    );
                    console.log(processInfo('>> minecraft-bot working <<'));
                })
                .catch((error) => {
                    if (warns) console.log(`${bot.emotes.warn} ` + (`Could not find ${server.type} server ${server.ip} with port ${server.port}! Error:\n`) + error);
                    console.log(processInfo('>> minecraft-bot working <<'));
                });
        }
    } else {
        console.log(processInfo('>> minecraft-bot working <<'));
    }
};