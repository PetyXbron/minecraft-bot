const ms = require('ms')

module.exports = async (bot, message) => {
    if(message.author.bot) return;

    const { prefix, server, config } = bot;

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);
    
    if(config.settings.votingCH) {
        if(message.content.startsWith(prefix) || message.content.startsWith('!')) return;
        message.react("👍")
        message.react("👎")
        message.react("❌")
        const filter = (reaction, user) => reaction.emoji.name === "❌" && (user.id === message.author.id || message.guild.member(user.id).permissions.has("MANAGE_MESSAGES") && user.id !== bot.user.id);
        const cancel = await message.createReactionCollector(filter, { time: ms('30s'), max: 1 })

        cancel.on('collect', (reaction, user) => {
            message.reactions.removeAll()
        })

        cancel.on('end', () => {
            if(message.reactions.cache.get("❌")) {
                message.reactions.cache.get("❌").remove()
            }
        })
    }

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if(commandfile) commandfile.run(bot,message,args,server);
}   