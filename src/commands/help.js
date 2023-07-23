const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "help", //RENAME THE FILE TOO!!!
        enableChat: true,
        enableSlash: true,
        description: "Sends the command list menu",
        aliases: ["commands", "menu", "support"]
    },
    slash: new SlashCommandBuilder()
        .setName('help') //RENAME THE FILE TOO!!!
        .setDescription(`Sends the command list menu`)
        .addStringOption(option =>
            option.setName('command')
                .setDescription('Command name')
                .setRequired(false))
};

module.exports.run = async (bot, diType, di) => {
    const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js'),
        fs = require('fs'),
        { getSlashID } = require("../functions/base"),
        { translate } = require('../functions/translations');

    let { server, config } = bot,
        icon = server.icon ? server.icon : di.guild.iconURL(),
        cmdArg = null;

    if (diType === "chat") {
        cmdArg = diType.content.split(' ').slice(1);
    }

    else if (diType === "slash") {
        cmdArg = di.options.getString('command');
    }

    if (cmdArg) {
        if (bot.commands.has(cmdArg.toLocaleLowerCase()) || bot.aliases.has(cmdArg.toLocaleLowerCase())) {
            commandName = bot.commands.has(cmdArg.toLocaleLowerCase()) ? cmdArg.toLocaleLowerCase() : bot.aliases.get(cmdArg.toLocaleLowerCase());

            let command = bot.commands.get(commandName);
            let oneCmdDes, oneCmdAliases = [];
            oneCmdDes = await translate("commands.help.oneCmd.description", di.guild);
            oneCmdDes = oneCmdDes.replaceAll("{cmdName}", commandName);
            oneCmdDes = oneCmdDes.replaceAll("{cmdSlashMention}", `</${commandName}:${await getSlashID(bot, commandName)}>`);
            oneCmdDes = oneCmdDes.replaceAll("{cmdDescription}", command.config.description);
            command.config.aliases.forEach(async e => oneCmdAliases.push((await translate("commands.help.aliasFormat", di.guild)).replaceAll("{cmdName}", e)));
            oneCmdDes = oneCmdDes.replaceAll("{cmdAliases}", oneCmdAliases.join(await translate("commands.help.aliasSplit", di.guild)));

            const helpEmbed = new EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                .setTitle((await translate("commands.help.oneCmd.title", di.guild)).replaceAll("{cmdName}", commandName.charAt(0).toUpperCase() + commandName.slice(1)))
                .setDescription(oneCmdDes)
                .setColor(config.embeds.color);
            return di.reply({ embeds: [helpEmbed], allowedMentions: { repliedUser: false } });
        }
    }

    const helpRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('cmdHelpChat')
                .setLabel(await translate("commands.help.main.buttons.1.name", di.guild))
                .setStyle(ButtonStyle[await translate("commands.help.main.buttons.1.style", di.guild)])
                .setEmoji(await translate("commands.help.main.buttons.1.emoji", di.guild)),
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId('cmdHelpSlash')
                .setLabel(await translate("commands.help.main.buttons.2.name", di.guild))
                .setStyle(ButtonStyle[await translate("commands.help.main.buttons.1.style", di.guild)])
                .setEmoji(await translate("commands.help.main.buttons.2.emoji", di.guild)),
        );

    const helpEmbed = new EmbedBuilder()
        .setAuthor({ name: await translate("commands.help.main.title", di.guild), iconURL: bot.user.displayAvatarURL() })
        .addFields([
            { name: await translate("commands.help.main.fields.1.name", di.guild), value: await translate("commands.help.main.fields.1.value", di.guild) },
            { name: await translate("commands.help.main.fields.2.name", di.guild), value: await translate("commands.help.main.fields.2.value", di.guild) }
        ])
        .setColor(config.embeds.color);
    di.reply({ embeds: [helpEmbed], components: [helpRow], allowedMentions: { repliedUser: false } });
};