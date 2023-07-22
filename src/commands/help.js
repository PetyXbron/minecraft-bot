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
    const { EmbedBuilder } = require('discord.js'),
        fs = require('fs');

    let { server, config } = bot,
        icon = server.icon ? server.icon : di.guild.iconURL(),
        cmdArg = null;

    if (diType === "chat") {
        cmdArg = diType.content.split(' ').slice(1);
    }

    else if (diType === "slash") {
        cmdArg = di.options.getString('command');
    }

    const { getSlashID } = require("../functions/base"),
        commandz = fs.readdirSync(__dirname + '/../commands').filter(file => file.endsWith('.js'));
    let lines = [];

    if (!cmdArg) {

        if (commandz.length > 0) {
            for (const command of commandz) {
                const commandFile = require(__dirname + `/../commands/${command}`);
                if (commandFile.config.enableChat && commandFile.config.enableSlash) {
                    commandFile.config.description = commandFile.config.description ? commandFile.config.description : false;
                    lines.push(`> \`${bot.prefix}${commandFile.config.name ? commandFile.config.name : command.split(".js")[0]}\`` + (commandFile.config.description ? ` - ${commandFile.config.description}` : ""));
                }
            }
        }

        const helpEmbed = new EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
            .setTitle(config.server.name ? config.server.name : di.guild.name + " bot commands:")
            .setDescription(`> **Prefix:** \`${bot.prefix}\`\n\n> **Commands:**\n` + lines.join("\n"))
            .setColor(config.embeds.color);
        di.reply({ embeds: [helpEmbed], allowedMentions: { repliedUser: false } });
        return;
    }

    if (bot.commands.has(cmdArg.toLocaleLowerCase()) || bot.aliases.has(cmdArg.toLocaleLowerCase())) {
        commandName = bot.commands.has(cmdArg.toLocaleLowerCase()) ? cmdArg.toLocaleLowerCase() : bot.aliases.get(cmdArg.toLocaleLowerCase());

        let command = bot.commands.get(commandName);

        const helpEmbed = new EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
            .setTitle(`${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Command:`)
            .setDescription(`
                > **Description:** ${!!command.config.description ? command.config.description : "Without description"}
                > **Slash command:** ${await getSlashID(bot, commandName) ? `</${commandName}:${await getSlashID(bot, commandName)}>` : "Not found"}
                > **Aliases:** ${!!command.config.aliases ? "`" + bot.prefix + command.config.aliases.join(`\`, \`${bot.prefix}`) + "`" : "No aliases"}
            `)
            .setColor(config.embeds.color);
        return di.reply({ embeds: [helpEmbed], allowedMentions: { repliedUser: false } });
    } else {
        const errorEmbed = new EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
            .setTitle(`Error! Command "${cmdArg}" doesn't exist.`)
            .setDescription(`Command \`${cmdArg}\` was not found.\nYou are entering the wrong alias or the command is disabled.`)
            .setColor(config.embeds.error);
        return di.reply({ embeds: [errorEmbed], ephemeral: true, allowedMentions: { repliedUser: false } });
    }
};