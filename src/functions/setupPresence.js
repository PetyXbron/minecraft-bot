const chalk = require('chalk'),
    util = require('axios'),
    Discord = require('discord.js'),
    at = Discord.ActivityType,
    ms = require('ms'),
    ma = chalk.magenta.bold,
    warn = chalk.keyword('yellow').bold;

module.exports = {
    async setupPresence(bot, config) {
        const debug = config.settings.debug;
        let presence = config.bot.presence,
            status = config.bot.status.toLowerCase(),
            activity = config.bot.activity.charAt(0).toUpperCase() + config.bot.activity.slice(1).toLowerCase();
        if (bot.pres.includes("{onlinePlayers}") | bot.pres.includes("{maxPlayers}")) {
            require("./setupPresence").autoUpdatingPresence(bot, config);
        } else {
            try {
                bot.user.setPresence({ activities: [{ name: presence, type: at[activity] }], status: status, afk: false }); //Sets bot activity
                if (debug) console.log(`${bot.emotes.debug} Successfully set the bot presence to ` + ma(`${bot.activity.toLowerCase()} ${bot.pres}`));
            } catch (e) {
                if (debug) console.log(`${bot.emotes.debug} Could not set the Discord bot presence! Error:\n` + e);
            }
        }
    },

    autoUpdatingPresence(bot, config) {
        loopPresence();
        setInterval(loopPresence, ms(config.autoStatus.time));
        async function loopPresence() {
            const debug = config.settings.debug;
            let presence = config.bot.presence,
                status = config.bot.status.toLowerCase(),
                activity = config.bot.activity.charAt(0).toUpperCase() + config.bot.activity.slice(1).toLowerCase();
            let errored = false,
                response = undefined;

            if (server.type === 'java') {
                try {
                    response = await util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`);
                    if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
                } catch (err) {
                    if (debug) console.log(`${bot.emotes.debug} Could not receive server status data! Error:\n` + err);
                    errored = true;
                }
            } else {
                try {
                    response = await util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`);
                    if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
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
        }
    }
};