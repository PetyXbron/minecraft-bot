const Discord = require('discord.js'),
    util = require('minecraft-server-util'),
    warn = require('chalk').keyword('yellow').bold,
    fs = require('fs'),
    { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports.config = {
    name: "version", //Name of command - RENAME THE FILE TOO!!!
    description: "Sends the Minecraft version of server", //Description of command - you can change it :)
    aliases: commands.version.aliases //Command's aliases - set them in config.js
};

module.exports.run = async (bot, message, args) => {
    let { server, config } = bot,
        text = commands.version.text,
        icon = server.icon ? server.icon : message.guild.iconURL();
    const warns = config.settings.warns;
    const settings = config.settings
        ;
    if (!server.work) return;

    if (server.type === 'java') {
        try {
            const result = await util.status(server.ip, server.port);
            var versionOriginal = result.version.name;
        } catch (e) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn(`Couldn't get version from server! Getting it from config..`));
            var versionOriginal = config.server.version;
        };

        let versionAdvanced = false;

        if (settings.split) {
            versionAdvanced = versionOriginal.toLocaleLowerCase()
                .replace("bukkit ", "")
                .replace("craftbukkit ", "")
                .replace("spigot ", "")
                .replace("forge ", "")
                .replace("fabric ", "")
                .replace("paper ", "")
                .replace("purpur ", "")
                .replace("tacospigot ", "")
                .replace("glowstone ", "")
                .replace("bungecord ", "")
                .replace("waterfall ", "")
                .replace("flexpipe ", "")
                .replace("hexacord ", "")
                .replace("velocity ", "")
                .replace("airplane ", "")
                .replace("sonarlint ", "")
                .replace("geyser ", "")
                .replace("cuberite ", "")
                .replace("yatopia ", "")
                .replace("mohist ", "")
                .replace("leafish ", "")
                .replace("cardboard ", "")
                .replace("magma ", "")
                .replace("empirecraft ", "");
        }

        const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

        if (text.title === "" || text.description === "") {
            const versionEmbed = new Discord.EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                .setTitle("Minecraft version:")
                .setDescription(`**${version}**`)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [versionEmbed] });
        } else {
            text.title = text.title.replaceAll('{serverIp}', server.ip);
            text.title = text.title.replaceAll('{serverPort}', server.port);
            text.title = text.title.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
            text.title = text.title.replaceAll('{voteLink}', config.server.vote);
            text.title = text.title.replaceAll('{serverVersion}', version);
            text.title = text.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

            text.description = text.description.replaceAll('{serverIp}', server.ip);
            text.description = text.description.replaceAll('{serverPort}', server.port);
            text.description = text.description.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
            text.description = text.description.replaceAll('{voteLink}', config.server.vote);
            text.description = text.description.replaceAll('{serverVersion}', version);
            text.description = text.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

            const versionEmbed = new Discord.EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                .setTitle(text.title)
                .setDescription(text.description)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [versionEmbed] });
        }
    } else {
        try {
            const result = await util.statusBedrock(server.ip, server.port);
            var versionOriginal = result.version.name;
        } catch (e) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn(`Couldn't get version from server! Getting it from config..`));
            var versionOriginal = config.server.version;
        }

        let versionAdvanced = false;

        if (settings.split) {
            versionAdvanced = versionOriginal.toLocaleLowerCase()
                .replace("bukkit ", "")
                .replace("craftbukkit ", "")
                .replace("spigot ", "")
                .replace("forge ", "")
                .replace("fabric ", "")
                .replace("paper ", "")
                .replace("purpur ", "")
                .replace("tacospigot ", "")
                .replace("glowstone ", "")
                .replace("bungecord ", "")
                .replace("waterfall ", "")
                .replace("flexpipe ", "")
                .replace("hexacord ", "")
                .replace("velocity ", "")
                .replace("airplane ", "")
                .replace("sonarlint ", "")
                .replace("geyser ", "")
                .replace("cuberite ", "")
                .replace("yatopia ", "")
                .replace("mohist ", "")
                .replace("leafish ", "")
                .replace("cardboard ", "")
                .replace("magma ", "")
                .replace("empirecraft ", "");
        }

        const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

        if (text.title === "" || text.description === "") {
            const versionEmbed = new Discord.EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                .setTitle("Minecraft version:")
                .setDescription(`**${version}**`)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [versionEmbed] });
        } else {
            text.title = text.title.replaceAll('{serverIp}', server.ip);
            text.title = text.title.replaceAll('{serverPort}', server.port);
            text.title = text.title.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
            text.title = text.title.replaceAll('{voteLink}', config.server.vote);
            text.title = text.title.replaceAll('{serverVersion}', version);
            text.title = text.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

            text.description = text.description.replaceAll('{serverIp}', server.ip);
            text.description = text.description.replaceAll('{serverPort}', server.port);
            text.description = text.description.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
            text.description = text.description.replaceAll('{voteLink}', config.server.vote);
            text.description = text.description.replaceAll('{serverVersion}', version);
            text.description = text.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

            const versionEmbed = new Discord.EmbedBuilder()
                .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                .setTitle(text.title)
                .setDescription(text.description)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [versionEmbed] });
        }
    }
};