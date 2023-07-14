const { InteractionType } = require('discord.js');

module.exports = async (bot, interaction) => {
    if (interaction.type !== InteractionType.ApplicationCommand) return;

    const { config } = bot;

    const command = bot.slashes.get(interaction.commandName);
    if (command) {
        if (config.settings.randomColor) {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            if (randomColor === config.embeds.color) {
                config.embeds.color = Math.floor(Math.random() * 16777215).toString(16);
            } else {
                config.embeds.color = randomColor;
            }
        }
        command.run(bot, interaction);
    }
};