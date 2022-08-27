const chalk = require('chalk'),
    util = require('minecraft-server-util'),
    Discord = require('discord.js'),
    at = Discord.ActivityType,
    db = require('quick.db'),
    ms = require('ms'),
    gr = chalk.green.bold,
    bold = chalk.bold,
    bl = chalk.blue.bold,
    blu = chalk.blue.bold.underline,
    warn = chalk.keyword('yellow').bold;

module.exports = async (bot) => {
    const { server, config, info, settings } = bot;
    const debug = config.settings.debug;
    var warns = config.settings.warns;

    if (bot.pres) {
        let presence = config.bot.presence,
            status = config.bot.status.toLowerCase(),
            activity = config.bot.activity.charAt(0).toUpperCase() + config.bot.activity.slice(1).toLowerCase();
        if (bot.pres.includes("{onlinePlayers}") | bot.pres.includes("{maxPlayers}")) {
            async function autoUpdatingPresence() { //autoUpdatingPresence loop for refreshing bot presence and status
                let errored = false,
                    result = undefined;

                if (server.type === 'java') {
                    try {
                        result = await util.status(server.ip, server.port);
                    } catch (err) {
                        if (debug) console.log(err);
                        errored = true;
                    }
                } else {
                    try {
                        result = await util.statusBedrock(server.ip, server.port);
                    } catch (err) {
                        if (debug) console.log(err);
                        errored = true;
                    }
                };

                if (!errored) {
                    if (presence.includes("{onlinePlayers}")) {
                        presence = presence.replaceAll("{onlinePlayers}", result.players.online);
                    };

                    if (presence.includes("{maxPlayers}")) {
                        presence = presence.replaceAll("{maxPlayers}", result.players.max);
                    };

                    try {
                        await bot.user.setPresence({ activities: [{ name: presence, type: at[activity] }], status: status, afk: false }); //Sets bot activity
                        if (debug) console.log(`${bot.emotes.success} Successfully set presence to ` + gr(`${activity} ${presence}`));
                    } catch (e) {
                        if (debug) console.log(e);
                    }
                } else {
                    const presence = config.autoStatus.offline;
                    try {
                        await bot.user.setPresence({ activities: [{ name: presence, type: at[activity] }], status: status, afk: false }); //Sets bot activity
                        if (debug) console.log(`${bot.emotes.warn} ` + warn('Server was not found! Presence set to ') + gr(`${activity} ${presence}`));
                    } catch (e) {
                        if (debug) console.log(e);
                    }
                }
                presence = config.bot.presence;
                setTimeout(autoUpdatingPresence, ms(config.autoStatus.time));
            }
            autoUpdatingPresence();
        } else {
            try {
                bot.user.setPresence({ activities: [{ name: presence, type: activity }], status: status, afk: false }); //Sets bot activity
                if (debug) console.log(`${bot.emotes.success} Successfully set presence to ` + gr(`${bot.activity.toLowerCase()} ${bot.pres}`));
            } catch (e) {
                console.log();
            }
        }
    }

    if (config.settings.countingCH) {
        async function countingCH() { //countingCH loop for refreshing voice channel name
            let name = config.countingCH.name,
                errored = false,
                result = undefined;

            if (server.type === 'java') {
                try {
                    result = await util.status(server.ip, server.port);
                } catch (err) {
                    if (debug) console.log(err);
                    errored = true;
                }
            } else {
                try {
                    result = await util.statusBedrock(server.ip, server.port);
                } catch (err) {
                    if (debug) console.log(err);
                    errored = true;
                }
            };

            if (!errored) {
                name = name
                    .replaceAll("{onlinePlayers}", result.players.online)
                    .replaceAll("{maxPlayers}", result.players.max);

                try {
                    channel = await bot.channels.cache.get(config.countingCH.channelID)
                    await channel.setName(name); //Sets channel name
                    if (debug) console.log(`${bot.emotes.success} Successfully set channel name to ` + gr(name));
                } catch (e) {
                    if (debug) console.log(e);
                }
            } else {
                name = config.countingCH.offline;
                try {
                    channel = await bot.channels.cache.get(config.countingCH.channelID)
                    await channel.setName(name); //Sets channel name
                    if (debug) console.log(`${bot.emotes.warn} ` + warn('Server was not found! Channel name has been set to ') + gr(name));
                } catch (e) {
                    if (debug) console.log(e);
                }
            }
            setTimeout(countingCH, ms(config.countingCH.time));
        }
        countingCH();
    }

    if (config.settings.votingCH) {
        const channel = bot.channels.cache.get(config.votingCH.channelID);
        console.log(`${bot.emotes.success} Channel ${gr(channel.name)} is now set as voting channel!`);
    }

    if (config.settings.statusCH && server.work) {
        const channel = bot.channels.cache.get(info.channelID);
        const icon = server.icon ? server.icon : guild.iconURL();

        if (!db.get('statusCHMsgID')) {
            let msg;
            try {
                const serverEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                    .setDescription(`🔄 **SETTING...**`)
                    .addFields([
                        { name: "PLAYERS", value: `�/�`, inline: false },
                        { name: "INFO", value: `${config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1)} �\n\`${server.ip}\`:\`${server.port}\``, inline: true }
                    ])
                    .setColor(config.embeds.color);
                msg = await channel.send({ embeds: [serverEmbed] });
            } catch (err) { if (debug) console.log(err); }

            console.log(`${bot.emotes.success} Successfully sent status message to ${gr(channel.name)}!`);
            db.set('statusCHMsgID', msg.id);
        }

        msg = await channel.messages.fetch(db.get('statusCHMsgID'));
        let
            ip1 = server.ip,
            port1 = server.port;

        if (server.type === 'java') {
            util.status(ip1, port1)
                .then((result) => {
                    const versionOriginal = result.version.name;
                    let versionAdvanced = false;

                    let maintenceStatus = false,
                        lowCaseMotdClean = result.motd.clean.toLocaleLowerCase();
                    if (lowCaseMotdClean.includes("maintenance")) maintenceStatus = true;

                    if (settings.split) {
                        versionAdvanced = versionOriginal.toLocaleLowerCase()
                            .replace("bukkit ", "")
                            .replace("craftbukkit ", "")
                            .replace("spigot ", "")
                            .replace("forge ", "")
                            .replace("fabric ", "")
                            .replace("paper ", "")
                            .replace("purpur ", "")
                            .replace("tacospigot ", "")
                            .replace("glowstone ", "")
                            .replace("bungecord ", "")
                            .replace("waterfall ", "")
                            .replace("flexpipe ", "")
                            .replace("hexacord ", "")
                            .replace("velocity ", "")
                            .replace("airplane ", "")
                            .replace("sonarlint ", "")
                            .replace("geyser ", "")
                            .replace("cuberite ", "")
                            .replace("yatopia ", "")
                            .replace("mohist ", "")
                            .replace("leafish ", "")
                            .replace("cardboard ", "")
                            .replace("magma ", "")
                            .replace("empirecraft ", "");
                    }

                    const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                    const trueList = result.players.sample ? "\n\`\`\`" + result.players.sample.map(p => ` ${p.name} `).join('\r\n') + "\`\`\`" : "";

                    const serverEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setDescription(maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**")
                        .addFields(
                            { name: "PLAYERS", value: `${result.players.online}/${result.players.max}` + trueList, inline: false },
                            { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`:\`${server.port}\``, inline: true }
                        )
                        .setColor(config.embeds.color)
                        .setFooter({ text: 'Updated' })
                        .setTimestamp();
                    msg.edit({ embeds: [serverEmbed] });
                })
                .catch((error) => {
                    const errorEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setDescription(':x: **OFFLINE**')
                        .setColor(config.embeds.error)
                        .setFooter({ text: 'Updated' })
                        .setTimestamp();
                    msg.edit({ embeds: [errorEmbed] });

                    if (warns) console.log(`${bot.emotes.warn} ` + warn(`Error when posting status message! Error:\n`) + error);
                });
        } else {
            util.statusBedrock(ip1, port1)
                .then((result) => {
                    const versionOriginal = result.version.name;
                    let versionAdvanced = false;

                    let maintenceStatus = false,
                        lowCaseMotdClean = result.motd.clean.toLocaleLowerCase();
                    if (lowCaseMotdClean.includes("maintenance")) maintenceStatus = true;

                    if (settings.split) {
                        versionAdvanced = versionOriginal.toLocaleLowerCase()
                            .replace("bukkit ", "")
                            .replace("craftbukkit ", "")
                            .replace("spigot ", "")
                            .replace("forge ", "")
                            .replace("fabric ", "")
                            .replace("paper ", "")
                            .replace("purpur ", "")
                            .replace("tacospigot ", "")
                            .replace("glowstone ", "")
                            .replace("bungecord ", "")
                            .replace("waterfall ", "")
                            .replace("flexpipe ", "")
                            .replace("hexacord ", "")
                            .replace("velocity ", "")
                            .replace("airplane ", "")
                            .replace("sonarlint ", "")
                            .replace("geyser ", "")
                            .replace("cuberite ", "")
                            .replace("yatopia ", "")
                            .replace("mohist ", "")
                            .replace("leafish ", "")
                            .replace("cardboard ", "")
                            .replace("magma ", "")
                            .replace("empirecraft ", "");
                    }

                    const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                    const serverEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setDescription(maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**")
                        .addFields(
                            { name: "PLAYERS", value: `${result.players.online}/${result.players.max}`, inline: false },
                            { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`:\`${server.port}\``, inline: true }
                        )
                        .setColor(config.embeds.color)
                        .setFooter({ text: 'Updated' })
                        .setTimestamp();
                    msg.edit({ embeds: [serverEmbed] });
                })
                .catch((error) => {
                    const errorEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setDescription(':x: **OFFLINE**')
                        .setColor(config.embeds.error)
                        .setFooter({ text: 'Updated' })
                        .setTimestamp();
                    msg.edit({ embeds: [errorEmbed] });

                    if (warns) console.log(`${bot.emotes.warn} ` + warn(`Error when posting status message! Error:\n`) + error);
                });
        }

        if (debug) console.log(`${bot.emotes.success} Successfully updated status message in ${gr(channel.name)}!`);

        if (server.type === 'java') {
            setInterval(() =>
                util.status(ip1, port1)
                    .then((result) => {
                        const versionOriginal = result.version.name;
                        let versionAdvanced = false;

                        let maintenceStatus = false,
                            lowCaseMotdClean = result.motd.clean.toLocaleLowerCase();
                        if (lowCaseMotdClean.includes("maintenance")) maintenceStatus = true;

                        if (settings.split) {
                            versionAdvanced = versionOriginal.toLocaleLowerCase()
                                .replace("bukkit ", "")
                                .replace("craftbukkit ", "")
                                .replace("spigot ", "")
                                .replace("forge ", "")
                                .replace("fabric ", "")
                                .replace("paper ", "")
                                .replace("purpur ", "")
                                .replace("tacospigot ", "")
                                .replace("glowstone ", "")
                                .replace("bungecord ", "")
                                .replace("waterfall ", "")
                                .replace("flexpipe ", "")
                                .replace("hexacord ", "")
                                .replace("velocity ", "")
                                .replace("airplane ", "")
                                .replace("sonarlint ", "")
                                .replace("geyser ", "")
                                .replace("cuberite ", "")
                                .replace("yatopia ", "")
                                .replace("mohist ", "")
                                .replace("leafish ", "")
                                .replace("cardboard ", "")
                                .replace("magma ", "")
                                .replace("empirecraft ", "");
                        }

                        const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                        const trueList = result.players.sample ? "\n\`\`\`" + result.players.sample.map(p => ` ${p.name} `).join('\r\n') + "\`\`\`" : "";

                        const serverEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                            .setDescription(maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**")
                            .addFields(
                                { name: "PLAYERS", value: `${result.players.online}/${result.players.max}` + trueList, inline: false },
                                { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`:\`${server.port}\``, inline: true }
                            )
                            .setColor(config.embeds.color)
                            .setFooter({ text: 'Updated' })
                            .setTimestamp();
                        msg.edit({ embeds: [serverEmbed] });
                    })
                    .catch((error) => {
                        const errorEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                            .setDescription(':x: **OFFLINE**')
                            .setColor(config.embeds.error)
                            .setFooter({ text: 'Updated' })
                            .setTimestamp();
                        msg.edit({ embeds: [errorEmbed] });

                        if (warns) console.log(`${bot.emotes.warn} ` + warn(`Error when posting status message! Error:\n`) + error);
                    }), ms(info.time));
        } else {
            setInterval(() =>
                util.statusBedrock(ip1, port1)
                    .then((result) => {
                        const versionOriginal = result.version.name;
                        let versionAdvanced = false;

                        let maintenceStatus = false,
                            lowCaseMotdClean = result.motd.clean.toLocaleLowerCase();
                        if (lowCaseMotdClean.includes("maintenance")) maintenceStatus = true;

                        if (settings.split) {
                            versionAdvanced = versionOriginal.toLocaleLowerCase()
                                .replace("bukkit ", "")
                                .replace("craftbukkit ", "")
                                .replace("spigot ", "")
                                .replace("forge ", "")
                                .replace("fabric ", "")
                                .replace("paper ", "")
                                .replace("purpur ", "")
                                .replace("tacospigot ", "")
                                .replace("glowstone ", "")
                                .replace("bungecord ", "")
                                .replace("waterfall ", "")
                                .replace("flexpipe ", "")
                                .replace("hexacord ", "")
                                .replace("velocity ", "")
                                .replace("airplane ", "")
                                .replace("sonarlint ", "")
                                .replace("geyser ", "")
                                .replace("cuberite ", "")
                                .replace("yatopia ", "")
                                .replace("mohist ", "")
                                .replace("leafish ", "")
                                .replace("cardboard ", "")
                                .replace("magma ", "")
                                .replace("empirecraft ", "");
                        }

                        const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                        const serverEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                            .setDescription(maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**")
                            .addFields(
                                { name: "PLAYERS", value: `${result.players.online}/${result.players.max}`, inline: false },
                                { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`:\`${server.port}\``, inline: true }
                            )
                            .setColor(config.embeds.color)
                            .setFooter({ text: 'Updated' })
                            .setTimestamp();
                        msg.edit({ embeds: [serverEmbed] });
                    })
                    .catch((error) => {
                        const errorEmbed = new Discord.EmbedBuilder()
                            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                            .setDescription(':x: **OFFLINE**')
                            .setColor(config.embeds.error)
                            .setFooter({ text: 'Updated' })
                            .setTimestamp();
                        msg.edit({ embeds: [errorEmbed] });

                        if (warns) console.log(`${bot.emotes.warn} ` + warn(`Error when posting status message! Error:\n`) + error);
                    }), ms(info.time));
        }

    }

    if (bot.readyScan && server.work) {
        if (server.type === 'java') {
            util.status(server.ip, server.port)
                .then((result) => {
                    console.log(`${bot.emotes.success} Successfully located ${gr(server.type.toUpperCase())} server ${gr(server.ip)}!\n` + "   " + gr('Server info:\n')
                        + "   " + bold('IP:	    ') + bl(`${server.ip}:${result.port ? result.port : server.port}\n`)
                        + "   " + bold('VERSION: ') + bl(`${result.version.name ? result.version.name : 'unknown'}\n`)
                        + "   " + bold('PLAYERS: ') + bl(`${result.players.online ? result.players.online : '0'}` + '/' + `${result.players.max ? result.players.max : '0'}`)
                    );
                })
                .catch((error) => {
                    console.log(`${bot.emotes.warn} ` + warn(`Could not find ${server.type} server ${server.ip} with port ${server.port}! Error:\n`) + error);
                });
        } else if (server.type === 'bedrock') {
            util.statusBedrock(server.ip, server.port)
                .then((result) => {
                    console.log(`${bot.emotes.success} Successfully located ${gr(server.type.toUpperCase())} server ${gr(server.ip)}!\n` + "   " + gr('Server info:\n')
                        + "   " + bold('IP:	    ') + bl(`${server.ip}:${result.port ? result.port : server.port}\n`)
                        + "   " + bold('VERSION: ') + bl(`${result.version.name ? result.version.name : 'unknown'}\n`)
                        + "   " + bold('PLAYERS: ') + bl(`${result.players.online ? result.players.online : '0'}` + '/' + `${result.players.max ? result.players.max : '0'}`)
                    );
                })
                .catch((error) => {
                    console.log(`${bot.emotes.warn} ` + (`Could not find ${server.type} server ${server.ip} with port ${server.port}! Error:\n`) + error);
                });
        }
    }

    console.log(`${bot.emotes.success} ` + gr(bot.user.username) + " is now working with prefix " + gr(bot.prefix));
    if (settings.inviteLink) console.log(`${bot.emotes.info} ` + "Invite " + bl(bot.user.username) + " with " + blu(`https://discord.com/oauth2/authorize?client_id=${bot.user.id}&permissions=274877918272&scope=bot%20applications.commands`));
};