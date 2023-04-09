const ms = require('ms'),
    version = require('../package.json').version,
    fs = require('fs');

module.exports = async (bot, message) => {
    if (message.author.bot) return;

    const { prefix, server, config } = bot;

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
                }

                if (config.votingCH.threads.enable) {
                    const dataJSON = bot.dataJSON;
                    lastID = dataJSON["VotingCHLastID"] ? dataJSON["VotingCHLastID"] : 0;
                    newID = parseInt(lastID) + 1;
                    ID = (config.votingCH.threads.idSyntax.replace("1", "") + newID).slice(-config.votingCH.threads.idSyntax.length);

                    const thread = await message.startThread({
                        name: config.votingCH.threads.nameSyntax.replaceAll("{ID}", ID),
                        autoArchiveDuration: config.votingCH.threads.archiveTime
                    });
                    await thread.leave();

                    data = dataJSON;
                    data["VotingCHLastID"] = newID;

                    fs.writeFile(bot.dev ? './dev-data.json' : './data.json', JSON.stringify(data, null, 4), err => {
                        if (err) console.log("Could not edit the data.json content! Error:\n" + err);
                    });
                }
            }
        });
    }

    if (!config.commands.enableNormals) return;

    if (message.content.includes(`minecraft-bot version`)) {
        message.channel.sendTyping();
        setTimeout(function () {
            message.channel.send({ content: `> **minecraft-bot:** \`${version}\`` });
        }, ms('1s'));
        return;
    }

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0].toLowerCase();
    const args = messageArray.slice(1);

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