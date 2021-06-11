module.exports = async (bot, message) => {
    if(message.author.bot) return;

    const
    { prefix } = bot,
    { server } = bot;

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);
        
        if(!message.content.startsWith(prefix)) return;
        let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
        if(commandfile) commandfile.run(bot,message,args,server)
}   