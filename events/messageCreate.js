const ms = require('ms'),
    version = require('../package.json').version,
    db = require('quick.db');

module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (message.content.includes(`minecraft-bot version`)) {
        message.channel.sendTyping();
        setTimeout(function () {
            message.channel.send({ content: version });
        }, ms('1s'));
        return;
    }

    const { prefix, server, config } = bot;

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0].toLowerCase();
    const args = messageArray.slice(1);

    if (config.settings.votingCH && message.channel.id === config.votingCH.channelID) {
        if (message.content.startsWith(prefix)) return;

        message.react(config.votingCH.reactions.first);
        if (config.votingCH.reactions.second) message.react(config.votingCH.reactions.second);
        message.react(config.votingCH.reactions.cancel);

        const filter = (reaction, user) => reaction.emoji.name === config.votingCH.reactions.cancel && (user.id === message.author.id || message.guild.members.cache.get(user.id).permissions.has("MANAGE_MESSAGES") && user.id !== bot.user.id);
        const cancel = await message.createReactionCollector({ filter, time: ms(config.votingCH.time), max: 1 });

        cancel.on('collect', () => {
            if (message) message.reactions.removeAll();
        });

        cancel.on('end', async () => {
            if (message) {
                if (message.reactions.cache.get(config.votingCH.reactions.cancel)) {
                    message.reactions.cache.get(config.votingCH.reactions.cancel).remove();
                    if (config.votingCH.threads.enable) {
                        lastID = await db.fetch(`VotingCHLastID`) ? await db.fetch(`VotingCHLastID`) : 0;
                        newID = parseInt(lastID) + 1;
                        ID = (config.votingCH.threads.idSyntax.replace("1", "") + newID).slice(-config.votingCH.threads.idSyntax.length);

                        const thread = await message.startThread({
                            name: config.votingCH.threads.nameSyntax.replaceAll("{ID}", ID),
                            autoArchiveDuration: config.votingCH.threads.archiveTime
                        });
                        await thread.leave();

                        db.set(`VotingCHLastID`, newID);
                    }
                    return;
                }
            }
        });
    }

    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if (commandfile) {
        if (config.settings.randomColor) {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            if (randomColor === config.embeds.color) {
                config.embeds.color = Math.floor(Math.random() * 16777215).toString(16);
            } else {
                config.embeds.color = randomColor;
            }
        }

        commandfile.run(bot, message, args, server);
    }
};