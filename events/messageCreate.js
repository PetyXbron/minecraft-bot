const ms = require('ms');
const version = require('../package.json').version;

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

    if (config.settings.votingCH && message.channel.id === config.votingCH.channel.id) {
        if (message.content.startsWith(prefix)) return;

        message.react(config.votingCH.reactions.first);
        if (config.votingCH.reactions.second) message.react(config.votingCH.reactions.second);
        message.react(config.votingCH.reactions.cancel);

        const filter = (reaction, user) => reaction.emoji.name === config.votingCH.reactions.cancel && (user.id === message.author.id || message.guild.members.cache.get(user.id).permissions.has("MANAGE_MESSAGES") && user.id !== bot.user.id);
        const cancel = await message.createReactionCollector({ filter, time: ms(config.votingCH.time), max: 1 });

        cancel.on('collect', () => {
            if (message) message.reactions.removeAll();
        });

        cancel.on('end', () => {
            if (message) {
                if (message.reactions.cache.get(config.votingCH.reactions.cancel)) {
                    message.reactions.cache.get(config.votingCH.reactions.cancel).remove();
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