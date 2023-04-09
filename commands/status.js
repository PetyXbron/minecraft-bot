const util = require('axios'),
    Discord = require('discord.js'),
    c = require('chalk'),
    fs = require('fs'),
    { commands } = require(fs.existsSync(__dirname + '/../dev-config.js') ? '../dev-config' : '../config');

module.exports.config = {
    name: "status", //Name of command - RENAME THE FILE TOO!!!
    description: "Sends the simple status info message about server right now", //Description of command - you can change it :)
    aliases: commands.status.aliases //Command's aliases - set them in config.js
};

module.exports.run = async (bot, message) => {
    let { server, config } = bot,
        text = commands.status.text,
        settings = config.settings,
        warn = c.keyword('yellow').bold,
        warns = config.settings.warns,
        { removeVersion } = require('../functions');

    if (!server.work) return;

    let icon = server.icon ? server.icon : message.guild.iconURL();

    if (server.type === 'java') {
        util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`)
            .then((response) => {
                let versionOriginal = response.data.version.name_clean,
                    versionAdvanced = false;

                let maintenceStatus = false,
                    lowCaseMotdClean = response.data.motd.clean.toLocaleLowerCase();
                if (lowCaseMotdClean.includes("maintenance")) maintenceStatus = true;

                if (settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

                const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                if (text.title === "" || text.description === "") {
                    const serverEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
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
                    message.channel.send({ embeds: [serverEmbed] });
                } else {
                    text.title = text.title.replaceAll('{serverIp}', server.ip);
                    text.title = text.title.replaceAll('{serverPort}', server.port);
                    text.title = text.title.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
                    text.title = text.title.replaceAll('{voteLink}', config.server.vote);
                    text.title = text.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
                    text.title = text.title.replaceAll('{playersOnline}', response.data.players.online);
                    text.title = text.title.replaceAll('{playersMax}', response.data.players.max);
                    text.title = text.title.replaceAll('{motd}', response.data.motd.clean);
                    text.title = text.title.replaceAll('{serverVersion}', version);
                    text.title = text.title.replaceAll('{status}', maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**");

                    text.description = text.description.replaceAll('{serverIp}', server.ip);
                    text.description = text.description.replaceAll('{serverPort}', server.port);
                    text.description = text.description.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
                    text.description = text.description.replaceAll('{voteLink}', config.server.vote);
                    text.description = text.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
                    text.description = text.description.replaceAll('{playersOnline}', response.data.players.online);
                    text.description = text.description.replaceAll('{playersMax}', response.data.players.max);
                    text.description = text.description.replaceAll('{motd}', response.data.motd.clean);
                    text.description = text.description.replaceAll('{serverVersion}', version);
                    text.description = text.description.replaceAll('{status}', maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**");

                    const serverEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle(text.title)
                        .setDescription(text.description)
                        .setColor(config.embeds.color);
                    message.channel.send({ embeds: [serverEmbed] });
                }
            })
            .catch((error) => {
                const errorEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                    .setTitle("Server status:")
                    .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                    .setColor(config.embeds.error);
                message.channel.send({ embeds: [errorEmbed] });

                if (warns) console.log(warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error);
            });
    } else {
        util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`)
            .then((response) => {
                const versionOriginal = response.data.version.name_clean;
                let versionAdvanced = false;

                let maintenceStatus = false,
                    lowCaseMotdClean = response.data.motd.clean.toLocaleLowerCase();
                if (lowCaseMotdClean.includes("maintenance")) maintenceStatus = true;

                if (settings.removeServerType) versionAdvanced = removeVersion(versionOriginal);

                const version = versionAdvanced ? versionAdvanced.charAt(0).toUpperCase() + versionAdvanced.slice(1) : versionOriginal;

                if (text.title === "" || text.description === "") {
                    const serverEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
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
                    message.channel.send({ embeds: [serverEmbed] });
                } else {
                    text.title = text.title.replaceAll('{serverIp}', server.ip);
                    text.title = text.title.replaceAll('{serverPort}', server.port);
                    text.title = text.title.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
                    text.title = text.title.replaceAll('{voteLink}', config.server.vote);
                    text.title = text.title.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
                    text.title = text.title.replaceAll('{playersOnline}', response.data.players.online);
                    text.title = text.title.replaceAll('{playersMax}', response.data.players.max);
                    text.title = text.title.replaceAll('{motd}', response.data.motd.clean);
                    text.title = text.title.replaceAll('{serverVersion}', version);
                    text.title = text.title.replaceAll('{status}', maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**");

                    text.description = text.description.replaceAll('{serverIp}', server.ip);
                    text.description = text.description.replaceAll('{serverPort}', server.port);
                    text.description = text.description.replaceAll('{serverName}', config.server.name ? config.server.name : message.guild.name);
                    text.description = text.description.replaceAll('{voteLink}', config.server.vote);
                    text.description = text.description.replaceAll('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1));
                    text.description = text.description.replaceAll('{playersOnline}', response.data.players.online);
                    text.description = text.description.replaceAll('{playersMax}', response.data.players.max);
                    text.description = text.description.replaceAll('{motd}', response.data.motd.clean);
                    text.description = text.description.replaceAll('{serverVersion}', version);
                    text.description = text.description.replaceAll('{status}', maintenceStatus ? ":construction_worker: **MAINTENANCE**" : ":white_check_mark: **ONLINE**");

                    const serverEmbed = new Discord.EmbedBuilder()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle(text.title)
                        .setDescription(text.description)
                        .setColor(config.embeds.color);
                    message.channel.send({ embeds: [serverEmbed] });
                }
            })
            .catch((error) => {
                const errorEmbed = new Discord.EmbedBuilder()
                    .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                    .setTitle("Server status:")
                    .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                    .setColor(config.embeds.error);
                message.channel.send({ embeds: [errorEmbed] });

                if (warns) console.log(warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error);
            });
    }

};