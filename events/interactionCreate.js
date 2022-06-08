module.exports = async (bot, interaction) => {
    if (!interaction.isCommand()) return;

    const command = bot.slashes.get(interaction.commandName);
    if (command) command.run(bot, interaction);
};