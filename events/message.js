const ms = require('ms')
const version = require('../package.json').version

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") {
        if(message.content.includes('minecraft-bot version')) {
            message.channel.startTyping();
            setTimeout(function(){
                message.channel.stopTyping();
                message.channel.send(version);
            }, ms('1,5s'));
            return;
        }
        return;
    }

    const { prefix, server, config } = bot;

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);
    
    if(config.settings.votingCH && message.channel.id === config.votingCH.channel.id) {
        if(message.content.startsWith(prefix)) return;

        message.react(config.votingCH.reactions.first)
        if(config.votingCH.reactions.second) message.react(config.votingCH.reactions.second)
        message.react(config.votingCH.reactions.cancel)

        const filter = (reaction, user) => reaction.emoji.name === config.votingCH.reactions.cancel && (user.id === message.author.id || message.guild.member(user.id).permissions.has("MANAGE_MESSAGES") && user.id !== bot.user.id);
        const cancel = await message.createReactionCollector(filter, { time: ms(config.votingCH.time), max: 1 })

        cancel.on('collect', () => {
            message.reactions.removeAll()
        })

        cancel.on('end', () => {
            if(message.reactions.cache.get(config.votingCH.reactions.cancel)) {
                message.reactions.cache.get(config.votingCH.reactions.cancel).remove()
            }
        })
    }

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if(commandfile) commandfile.run(bot,message,args,server);
}   