const { EmbedBuilder } = require('discord.js'),
    fs = require('fs'),
    { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports.config = {
    name: "help", //Name of command - RENAME THE FILE TOO!!!
    description: "Sends the command list menu", //Description of command - you can change it :)
    aliases: commands.help.aliases //Command's aliases - set them in config.js
};

module.exports.run = async (bot, message, args) => {
    let { server, config } = bot,
        text = commands.help.text,
        icon = server.icon ? server.icon : message.guild.iconURL();

    if (!args[0]) {
        let commandz = [],
            lines = [];

        commandz = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));

        if (commandz.length > 0) {
            for (const commandFile of commandz) {
                const command = !!commands[commandFile.split(".js")[0]].enableNormal ? bot.commands.get(commandFile.split(".js")[0]) : false;
                if (command) {
                    command.config.description = command.config.description ? command.config.description : false;
                    lines.push(`> \`${bot.prefix}${command.config.name ? command.config.name : commandFile.split(".js")[0]}\`` + (command.config.description ? ` - ${command.config.description}` : ""));
                }
            }
        }

        if (!text.title || !text.description) {
            const helpEmbed = new EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                .setTitle(config.server.name ? config.server.name : message.guild.name + " bot commands:")
                .setDescription(`> **Prefix:** \`${bot.prefix}\`\n\n> **Commands:**\n` + lines.join("\n"))
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [helpEmbed] });
        } else {
            text.title = text.title.replaceAll('{serverIp}', server.ip);
            text.title = text.title.replaceAll('{serverPort}', server.port);
            text.title = text.title.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
            text.title = text.title.replaceAll('{voteLink}', config.server.vote);
            text.title = text.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
            text.title = text.title.replaceAll('{prefix}', config.bot.prefix);
            text.title = text.title.replaceAll('{commands}', "\n" + lines.join("\n"));

            text.description = text.description.replaceAll('{serverIp}', server.ip);
            text.description = text.description.replaceAll('{serverPort}', server.port);
            text.description = text.description.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
            text.description = text.description.replaceAll('{voteLink}', config.server.vote);
            text.description = text.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
            text.description = text.description.replaceAll('{prefix}', config.bot.prefix);
            text.description = text.description.replaceAll('{commands}', "\n" + lines.join("\n"));

            const helpEmbed = new EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                .setTitle(text.title)
                .setDescription(text.description)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [helpEmbed] });
        }
        return;
    }

    if (bot.commands.has(args[0].toLocaleLowerCase()) || bot.aliases.has(args[0].toLocaleLowerCase())) {
        commandName = bot.commands.has(args[0].toLocaleLowerCase()) ? args[0].toLocaleLowerCase() : bot.aliases.get(args[0].toLocaleLowerCase());

        let command = bot.commands.get(commandName);

        const helpEmbed = new EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
            .setTitle(`${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Command:`)
            .setDescription(`
                > **Description:** ${!!command.config.description ? command.config.description : "Without description"}
                > **Aliases:** ${!!command.config.aliases ? "`" + bot.prefix + command.config.aliases.join(`\`, \`${bot.prefix}`) + "`" : "No aliases"}
            `)
            .setColor(config.embeds.color);
        return message.channel.send({ embeds: [helpEmbed] });
    } else {
        if (!text.errorTitle || !text.errorDescription) {
            const errorEmbed = new EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                .setTitle(`Error! Command "${args[0]}" doesn't exist.`)
                .setDescription(`Command \`${args[0]}\` was not found.\nYou are entering the wrong alias or the command is disabled.`)
                .setColor(config.embeds.error);
            return message.channel.send({ embeds: [errorEmbed], ephemeral: true });
        } else {
            text.errorTitle = text.errorTitle.replaceAll('{serverIp}', server.ip);
            text.errorTitle = text.errorTitle.replaceAll('{serverPort}', server.port);
            text.errorTitle = text.errorTitle.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
            text.errorTitle = text.errorTitle.replaceAll('{voteLink}', config.server.vote);
            text.errorTitle = text.errorTitle.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
            text.errorTitle = text.errorTitle.replaceAll('{prefix}', config.bot.prefix);
            text.errorTitle = text.errorTitle.replaceAll('{commands}', "\n" + lines.join("\n"));
            text.errorTitle = text.errorTitle.replaceAll('{arg0}', args[0]);

            text.errorDescription = text.errorDescription.replaceAll('{serverIp}', server.ip);
            text.errorDescription = text.errorDescription.replaceAll('{serverPort}', server.port);
            text.errorDescription = text.errorDescription.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
            text.errorDescription = text.errorDescription.replaceAll('{voteLink}', config.server.vote);
            text.errorDescription = text.errorDescription.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
            text.errorDescription = text.errorDescription.replaceAll('{prefix}', config.bot.prefix);
            text.errorDescription = text.errorDescription.replaceAll('{commands}', "\n" + lines.join("\n"));
            text.errorDescription = text.errorDescription.replaceAll('{arg0}', args[0]);

            const errorEmbed = new EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                .setTitle(text.errorTitle)
                .setDescription(text.errorDescription)
                .setColor(config.embeds.error);
            return message.channel.send({ embeds: [errorEmbed], ephemeral: true });
        }
    }
};