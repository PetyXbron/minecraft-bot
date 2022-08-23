const { InteractionType } = require('discord.js');

module.exports = async (bot, interaction) => {
    if (interaction.type !== InteractionType.ApplicationCommand) return;

    const command = bot.slashes.get(interaction.commandName);
    if (command) command.run(bot, interaction);
};