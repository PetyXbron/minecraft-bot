const chalk = require('chalk'),
    { PermissionsBitField } = require('discord.js'),
    ma = chalk.magenta.bold;

module.exports = async (bot, messageReaction) => {
    const r = messageReaction;
    const { config } = bot;
    const debug = config.settings.debug;

    if (config.settings.votingCH && config.votingCH.reactions.deleteOther && r.message.channel.id === config.votingCH.channelID) {
        if (r.users.cache.first().id !== bot.user.id && !bot.guilds.cache.get(r.message.guildId).members.cache.get(r.users.cache.first().id).permissions.has(PermissionsBitField.Flags.Administrator)) {
            await r.remove();
            if (debug) console.log(`${bot.emotes.debug} ` + "Unwated reaction from " + ma(r.users.cache.first().tag) + " was removed from votingCH message.");
        }
    }

    if (config.settings.imagesCH && config.imagesCH.reactions.deleteOther && r.message.channel.id === config.imagesCH.channelID) {
        if (r.users.cache.first().id !== bot.user.id && !bot.guilds.cache.get(r.message.guildId).members.cache.get(r.users.cache.first().id).permissions.has(PermissionsBitField.Flags.Administrator)) {
            await r.remove();
            if (debug) console.log(`${bot.emotes.debug} ` + "Unwated reaction from " + ma(r.users.cache.first().tag) + " was removed from imagesCH message.");
        }
    }
};