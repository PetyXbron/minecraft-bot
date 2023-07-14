const chalk = require('chalk'),
    gr = chalk.green.bold,
    bl = chalk.blue.bold,
    ma = chalk.magenta.bold,
    blu = chalk.blue.bold.underline,
    processInfo = chalk.cyan.bgBlack;

module.exports = async (bot) => {
    const { server, config, settings } = bot;
    const debug = config.settings.debug;

    if (bot.pres) {
        require("../functions/setupPresence").setupPresence(bot, config);
    }

    if (config.settings.countingCH) {
        require("../functions/setupCountingCH").autoUpdatingStatusCH(bot, config);
    }

    if (config.settings.votingCH) {
        const channel = bot.channels.cache.get(config.votingCH.channelID);
        if (debug) console.log(`${bot.emotes.debug} Channel ${ma(channel.name)} is now set as voting channel!`);
    }

    if (config.settings.statusCH && server.work) {
        require("../functions/setupStatusCH").setupStatusCH(bot, config);
    }

    console.log(`${bot.emotes.success} ` + gr(bot.user.username) + " is now working with prefix " + gr(bot.prefix));
    if (settings.inviteLink) console.log(`${bot.emotes.info} ` + "Invite " + bl(bot.user.username) + " to your Discord server with link:\n   " + blu(`https://discord.com/oauth2/authorize?client_id=${bot.user.id}&permissions=274877918272&scope=bot%20applications.commands`));

    if (bot.readyScan && server.work) {
        require("../functions/base").readyScan(bot, server);
    } else {
        console.log(processInfo('>> minecraft-bot working <<'));
    }
};