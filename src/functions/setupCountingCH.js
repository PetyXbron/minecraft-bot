const chalk = require('chalk'),
    util = require('axios'),
    ms = require('ms'),
    ma = chalk.magenta.bold,
    warn = chalk.keyword('yellow').bold;

module.exports = {
    autoUpdatingStatusCH(bot, config) {
        loopStatusCH();
        setInterval(loopStatusCH, ms(config.countingCH.time));
        async function loopStatusCH() {
            const debug = config.settings.debug;
            const { warns, server } = bot;
            let name = config.countingCH.name,
                errored = false,
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
                name = name
                    .replaceAll("{onlinePlayers}", response.data.players.online)
                    .replaceAll("{maxPlayers}", response.data.players.max);

                try {
                    channel = await bot.channels.cache.get(config.countingCH.channelID);
                    if (!channel) throw new Error(`Discord channel doesn't exist. Did you enter a valid channel ID?`);
                    await channel.setName(name);
                    if (debug) console.log(`${bot.emotes.debug} Successfully set the countingCH channel name to ` + ma(name));
                } catch (e) {
                    if (warns) console.log(`${bot.emotes.warn} ` + warn('Could not set the countingCH channel name! Error:\n') + e);
                }
            } else {
                name = config.countingCH.offline;
                try {
                    channel = await bot.channels.cache.get(config.countingCH.channelID);
                    await channel.setName(name);
                    if (debug) console.log(`${bot.emotes.debug} ` + warn('Could not get the server data information! Channel name has been set to ') + ma(name));
                } catch (e) {
                    if (warns) console.log(`${bot.emotes.warn} ` + warn('Could not set the countingCH channel name! Error:\n') + e);
                }
            }
        }
    }
};