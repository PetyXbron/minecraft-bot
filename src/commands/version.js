const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "version", //RENAME THE FILE TOO!!!
        enableChat: true,
        enableSlash: true,
        description: "Sends the Minecraft version of server",
        aliases: ["v", "ver"]
    },
    slash: new SlashCommandBuilder()
        .setName('version') //RENAME THE FILE TOO!!!
        .setDescription(`Sends the Minecraft version of server`)
};

module.exports.run = async (bot, diType, di) => {
    const Discord = require('discord.js'),
        util = require('axios'),
        warn = require('chalk').keyword('yellow').bold;

    let { server, config } = bot,
        icon = server.icon ? server.icon : di.guild.iconURL(),
        warns = config.settings.warns,
        settings = config.settings,
        { removeVersion } = require('../functions/base');

    let versionOriginal;

    if (!server.work) return;

    if (server.type === 'java') {
        try {
            const response = await util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`);
            if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
            versionOriginal = response.data.version.name_clean;
        } catch (e) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn(`Couldn't get version from server! Getting it from config..`));
            versionOriginal = config.server.version;
        };

        let versionAdvanced = false;

        if (settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

        const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

        const versionEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
            .setTitle("Minecraft version:")
            .setDescription(`**${version}**`)
            .setColor(config.embeds.color);
        di.reply({ embeds: [versionEmbed], allowedMentions: { repliedUser: false } });
    } else {
        try {
            const response = await util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`);
            if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
            versionOriginal = response.data.version.name_clean;
        } catch (e) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn(`Couldn't get version from server! Getting it from config..`));
            versionOriginal = config.server.version;
        }

        let versionAdvanced = false;

        if (settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

        const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

        const versionEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
            .setTitle("Minecraft version:")
            .setDescription(`**${version}**`)
            .setColor(config.embeds.color);
        di.reply({ embeds: [versionEmbed], allowedMentions: { repliedUser: false } });
    }
};