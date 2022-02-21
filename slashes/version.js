const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const util = require('minecraft-server-util');
const warn = require('chalk').keyword('yellow').bold;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('version') //Name of command - RENAME THE FILE TOO!!!
        .setDescription(`Sends the Minecraft version of server`) //Description of command - you can change it :)
};

module.exports.run = async (bot, interaction) => {
    const { server, config, text } = bot;
    const warns = config.settings.warns;
    const settings = config.settings
        ;
    if (!server.work) return;

    let icon = server.icon ? server.icon : interaction.guild.iconURL();

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

        if (text.version.title === "" || text.version.description === "") {
            const versionEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                .setTitle("Minecraft version:")
                .setDescription(`**${version}**`)
                .setColor(config.embeds.color);
            interaction.reply({ embeds: [versionEmbed] });
        } else {
            text.version.title = text.version.title.replaceAll('{serverIp}', server.ip);
            text.version.title = text.version.title.replaceAll('{serverPort}', server.port);
            text.version.title = text.version.title.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
            text.version.title = text.version.title.replaceAll('{voteLink}', config.server.vote);
            text.version.title = text.version.title.replaceAll('{serverVersion}', version);
            text.version.title = text.version.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

            text.version.description = text.version.description.replaceAll('{serverIp}', server.ip);
            text.version.description = text.version.description.replaceAll('{serverPort}', server.port);
            text.version.description = text.version.description.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
            text.version.description = text.version.description.replaceAll('{voteLink}', config.server.vote);
            text.version.description = text.version.description.replaceAll('{serverVersion}', version);
            text.version.description = text.version.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

            const versionEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                .setTitle(text.version.title)
                .setDescription(text.version.description)
                .setColor(config.embeds.color);
            interaction.reply({ embeds: [versionEmbed] });
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

        if (text.version.title === "" || text.version.description === "") {
            const versionEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                .setTitle("Minecraft version:")
                .setDescription(`**${version}**`)
                .setColor(config.embeds.color);
            interaction.reply({ embeds: [versionEmbed] });
        } else {
            text.version.title = text.version.title.replaceAll('{serverIp}', server.ip);
            text.version.title = text.version.title.replaceAll('{serverPort}', server.port);
            text.version.title = text.version.title.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
            text.version.title = text.version.title.replaceAll('{voteLink}', config.server.vote);
            text.version.title = text.version.title.replaceAll('{serverVersion}', version);
            text.version.title = text.version.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

            text.version.description = text.version.description.replaceAll('{serverIp}', server.ip);
            text.version.description = text.version.description.replaceAll('{serverPort}', server.port);
            text.version.description = text.version.description.replaceAll('{serverName}', config.server.name ? config.server.name : interaction.guild.name);
            text.version.description = text.version.description.replaceAll('{voteLink}', config.server.vote);
            text.version.description = text.version.description.replaceAll('{serverVersion}', version);
            text.version.description = text.version.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));

            const versionEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: config.server.name ? config.server.name : interaction.guild.name, iconURL: icon })
                .setTitle(text.version.title)
                .setDescription(text.version.description)
                .setColor(config.embeds.color);
            interaction.reply({ embeds: [versionEmbed] });
        }
    }
};