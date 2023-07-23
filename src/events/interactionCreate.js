module.exports = async (bot, interaction) => {
    const { EmbedBuilder, InteractionType } = require('discord.js'),
        fs = require('fs'),
        { getSlashID } = require("../functions/base"),
        { translate } = require('../functions/translations'),
        { server, config } = bot,
        icon = server.icon ? server.icon : di.guild.iconURL();

    if (interaction.type === InteractionType.MessageComponent) {
        if (interaction.customId === "cmdHelpChat") {
            let cmdHelpChatDesc, chatCmds = [];
            cmdHelpChatDesc = await translate("commands.help.chatCmds.description", interaction.guild);
            const commandsFolder = fs.readdirSync(__dirname + '/../commands').filter(file => file.endsWith('.js'));
            for (const command of commandsFolder) {
                const commandFile = require(__dirname + `/../commands/${command}`);
                if (commandFile.config.enableChat) {
                    let cmdChatListLine;
                    cmdChatListLine = await translate("commands.help.chatCmds.chatCmdList", interaction.guild);
                    cmdChatListLine = cmdChatListLine.replaceAll("{cmdName}", commandFile.config.name ? commandFile.config.name : command.split(".js")[0]);
                    cmdChatListLine = cmdChatListLine.replaceAll("{cmdDescription}", commandFile.config.description ? commandFile.config.description : "");
                    chatCmds.push(cmdChatListLine);
                }
            }
            cmdHelpChatDesc = cmdHelpChatDesc.replaceAll("{chatCmdList}", chatCmds.join("\n"));

            const cmdHelpChatEmbed = new EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                .setTitle(await translate("commands.help.chatCmds.title", interaction.guild))
                .setDescription(cmdHelpChatDesc)
                .setColor(config.embeds.color);
            interaction.reply({ embeds: [cmdHelpChatEmbed], ephemeral: true });
        }

        if (interaction.customId === "cmdHelpSlash") {
            let cmdHelpSlashDesc, slashCmds = [];
            cmdHelpSlashDesc = await translate("commands.help.slashCmds.description", interaction.guild);
            const commandsFolder = fs.readdirSync(__dirname + '/../commands').filter(file => file.endsWith('.js'));
            for (const command of commandsFolder) {
                const commandFile = require(__dirname + `/../commands/${command}`);
                if (commandFile.config.enableSlash) {
                    let cmdSlashListLine;
                    cmdSlashListLine = await translate("commands.help.slashCmds.slashCmdList", interaction.guild);
                    cmdSlashListLine = cmdSlashListLine.replaceAll("{cmdName}", commandFile.config.name ? commandFile.config.name : command.split(".js")[0]);
                    cmdSlashListLine = cmdSlashListLine.replaceAll("{cmdSlashMention}", `</${commandFile.slash.name}:${await getSlashID(bot, commandFile.slash.name)}>`);
                    cmdSlashListLine = cmdSlashListLine.replaceAll("{cmdDescription}", commandFile.config.description ? commandFile.config.description : "");
                    slashCmds.push(cmdSlashListLine);
                }
            }
            cmdHelpSlashDesc = cmdHelpSlashDesc.replaceAll("{slashCmdList}", slashCmds.join("\n"));

            const cmdHelpSlashEmbed = new EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                .setTitle(await translate("commands.help.slashCmds.title", interaction.guild))
                .setDescription(cmdHelpSlashDesc)
                .setColor(config.embeds.color);
            interaction.reply({ embeds: [cmdHelpSlashEmbed], ephemeral: true });
        }
    }

    if (interaction.type === InteractionType.ApplicationCommand) {
        const command = bot.slashes.get(interaction.commandName);
        if (command) {
            if (config.settings.randomColor) {
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                if (randomColor === config.embeds.color) {
                    config.embeds.color = Math.floor(Math.random() * 16777215).toString(16);
                } else {
                    config.embeds.color = randomColor;
                }

                if (config.embeds.color.length === 5) {
                    config.embeds.color = config.embeds.color + "0";
                }
            }

            command.run(bot, "slash", interaction, undefined);
        }
    }
};