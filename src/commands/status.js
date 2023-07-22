const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "status", //RENAME THE FILE TOO!!!
        enableChat: true,
        enableSlash: true,
        description: "Sends the simple status info message about server right now",
        aliases: ["s", "info", "server", "overview", "ov"]
    },
    slash: new SlashCommandBuilder()
        .setName('status') //RENAME THE FILE TOO!!!
        .setDescription(`Sends the simple status info message about server right now`)
};

module.exports.run = async (bot, diType, di) => {
    const util = require('axios'),
        Discord = require('discord.js'),
        c = require('chalk');

    let { server, config } = bot,
        settings = config.settings,
        warn = c.keyword('yellow').bold,
        warns = config.settings.warns,
        { removeVersion } = require('../functions/base');

    if (!server.work) return;

    let icon = server.icon ? server.icon : di.guild.iconURL();

    if (server.type === 'java') {
        util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`)
            .then((response) => {
                if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
                let versionOriginal = response.data.version.name_clean,
                    versionAdvanced = false;

                let maintenceStatus = false,
                    lowCaseMotdClean = response.data.motd.clean.toLocaleLowerCase();
                if (lowCaseMotdClean.includes("maintenance")) maintenceStatus = true;

                if (settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

                const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                const serverEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                    .setTitle("Server status:")
                    .setDescription(`${maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**"}

                        **Description**
                        ${response.data.motd.clean}

                        **IP Address**
                        \`${server.ip}\`:\`${server.port}\`

                        **Version**
                        ${config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1)} ${version}

                        **Players**
                        **${response.data.players.online}**/**${response.data.players.max}**`)
                    .setColor(config.embeds.color);
                di.reply({ embeds: [serverEmbed], allowedMentions: { repliedUser: false } });
            })
            .catch((error) => {
                const errorEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                    .setTitle("Server status:")
                    .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                    .setColor(config.embeds.error);
                di.reply({ embeds: [errorEmbed], allowedMentions: { repliedUser: false } });

                if (warns) console.log(warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error);
            });
    } else {
        util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`)
            .then((response) => {
                if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
                const versionOriginal = response.data.version.name_clean;
                let versionAdvanced = false;

                let maintenceStatus = false,
                    lowCaseMotdClean = response.data.motd.clean.toLocaleLowerCase();
                if (lowCaseMotdClean.includes("maintenance")) maintenceStatus = true;

                if (settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

                const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                const serverEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                    .setTitle("Server status:")
                    .setDescription(`:white_check_mark: ${maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**"}

                        **Description**
                        ${response.data.motd.clean}

                        **IP Address**
                        \`${server.ip}\`:\`${server.port}\`

                        **Version**
                        ${config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1)} ${version}

                        **Players**
                        **${response.data.players.online}**/**${response.data.players.max}**`)
                    .setColor(config.embeds.color);
                di.reply({ embeds: [serverEmbed], allowedMentions: { repliedUser: false } });
            })
            .catch((error) => {
                const errorEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
                    .setTitle("Server status:")
                    .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                    .setColor(config.embeds.error);
                di.reply({ embeds: [errorEmbed], allowedMentions: { repliedUser: false } });

                if (warns) console.log(warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error);
            });
    }

};