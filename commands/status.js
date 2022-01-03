const { commands } = require("../config");
const util = require('minecraft-server-util');
const Discord = require('discord.js');
const c = require('chalk');
const { Console } = require("console");

module.exports.config = {
    name: "status", //Name of command - RENAME THE FILE TOO!!!
    description: "Server status", //Description of command - you can change it :)
    aliases: commands.status, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message) => {
    const { server, config, text } = bot,
    settings = config.settings,
    warn = c.keyword('yellow').bold,
    warns = config.settings.warns

    if(!server.work) return

    let 
    ip1 = server.ip,
    port1 = server.port,
    icon = server.icon ? server.icon : message.guild.icon

    if(server.type === 'java') {
        util.status(ip1, port1)
            .then((result) => {
                const versionOriginal = result.version.name
                if(settings.split) {
                    if(versionOriginal.includes("Spigot")) {
                        var versionAdvanced = versionOriginal.replace("Spigot", "")
                    } else if (versionOriginal.includes("Paper")) {
                        var versionAdvanced = versionOriginal.replace("Paper", "")
                    } else if (versionOriginal.includes("Tuinity")) {
                        var versionAdvanced = versionOriginal.replace("Tuinity", "")
                    }
                }
                const version = versionAdvanced ? versionAdvanced : versionOriginal

                if (text.status.title === "" || text.status.description === "") {
                    const serverEmbed = new Discord.MessageEmbed()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle("Server status:")
                        .setDescription(`:white_check_mark: **ONLINE**
            
                        **Description**
                        ${result.motd.clean}
                        
                        **IP Address**
                        \`${server.ip}\`:\`${server.port}\`
                        
                        **Version**
                        ${config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1)} ${version}
                        
                        **Players**
                        **${result.players.online}**/**${result.players.max}**`)
                        .setColor(config.embeds.color)
                    message.channel.send({ embeds: [serverEmbed] });
                } else {
                    text.status.title = text.status.title.replace('{serverIp}', server.ip)
                    text.status.title = text.status.title.replace('{serverPort}', server.port)
                    text.status.title = text.status.title.replace('{serverName}', config.server.name ? config.server.name : message.guild.name)
                    text.status.title = text.status.title.replace('{voteLink}', config.server.vote)
                    text.status.title = text.status.title.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1))
                    text.status.title = text.status.title.replace('{playersOnline}', result.players.online)
                    text.status.title = text.status.title.replace('{playersMax}', result.players.max)
                    text.status.title = text.status.title.replace('{motd}', result.motd.clean)
                    text.status.title = text.status.title.replace('{serverVersion}', version)
            
                    text.status.description = text.status.description.replace('{serverIp}', server.ip)
                    text.status.description = text.status.description.replace('{serverPort}', server.port)
                    text.status.description = text.status.description.replace('{serverName}', config.server.name ? config.server.name : message.guild.name)
                    text.status.description = text.status.description.replace('{voteLink}', config.server.vote)
                    text.status.description = text.status.description.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1))
                    text.status.description = text.status.description.replace('{playersOnline}', result.players.online)
                    text.status.description = text.status.description.replace('{playersMax}', result.players.max)
                    text.status.description = text.status.description.replace('{motd}', result.motd.clean)
                    text.status.description = text.status.description.replace('{serverVersion}', version)

                    const serverEmbed = new Discord.MessageEmbed()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle(text.status.title)
                        .setDescription(text.status.description)
                        .setColor(config.embeds.color)
                    message.channel.send({ embeds: [serverEmbed] });
                }
            })
            .catch((error) => {
                const errorEmbed = new Discord.MessageEmbed()   
                    .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                    .setTitle("Server status:")
                    .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                    .setColor(config.embeds.error)
                message.channel.send({ embeds: [errorEmbed] });

                if (warns) console.log(warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error)
            });
    } else {
        util.statusBedrock(ip1, port1)
        .then((result) => {
            const versionOriginal = result.version.name
                if(settings.split) {
                    if(versionOriginal.includes("Spigot")) {
                        var versionAdvanced = versionOriginal.replace("Spigot", "")
                    } else if (versionOriginal.includes("Paper")) {
                        var versionAdvanced = versionOriginal.replace("Paper", "")
                    } else if (versionOriginal.includes("Tuinity")) {
                        var versionAdvanced = versionOriginal.replace("Tuinity", "")
                    }
                }
                const version = versionAdvanced ? versionAdvanced : versionOriginal

                if (text.status.title === "" || text.status.description === "") {
                    const serverEmbed = new Discord.MessageEmbed()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle("Server status:")
                        .setDescription(`:white_check_mark: **ONLINE**
            
                        **Description**
                        ${result.motd.clean}
                        
                        **IP Address**
                        \`${server.ip}\`:\`${server.port}\`
                        
                        **Version**
                        ${config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1)} ${version}
                        
                        **Players**
                        **${result.players.online}**/**${result.players.max}**`)
                        .setColor(config.embeds.color)
                    message.channel.send({ embeds: [serverEmbed] });
                } else {
                    text.status.title = text.status.title.replace('{serverIp}', server.ip)
                    text.status.title = text.status.title.replace('{serverPort}', server.port)
                    text.status.title = text.status.title.replace('{serverName}', config.server.name ? config.server.name : message.guild.name)
                    text.status.title = text.status.title.replace('{voteLink}', config.server.vote)
                    text.status.title = text.status.title.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1))
                    text.status.title = text.status.title.replace('{playersOnline}', result.players.online)
                    text.status.title = text.status.title.replace('{playersMax}', result.players.max)
                    text.status.title = text.status.title.replace('{motd}', result.motd.clean)
                    text.status.title = text.status.title.replace('{serverVersion}', version)
            
                    text.status.description = text.status.description.replace('{serverIp}', server.ip)
                    text.status.description = text.status.description.replace('{serverPort}', server.port)
                    text.status.description = text.status.description.replace('{serverName}', config.server.name ? config.server.name : message.guild.name)
                    text.status.description = text.status.description.replace('{voteLink}', config.server.vote)
                    text.status.description = text.status.description.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1))
                    text.status.description = text.status.description.replace('{playersOnline}', result.players.online)
                    text.status.description = text.status.description.replace('{playersMax}', result.players.max)
                    text.status.description = text.status.description.replace('{motd}', result.motd.clean)
                    text.status.description = text.status.description.replace('{serverVersion}', version)

                    const serverEmbed = new Discord.MessageEmbed()
                        .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                        .setTitle(text.status.title)
                        .setDescription(text.status.description)
                        .setColor(config.embeds.color)
                    message.channel.send({ embeds: [serverEmbed] });
                }
        })
        .catch((error) => {
            const errorEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: config.server.name ? config.server.name : message.guild.name, iconURL: icon })
                .setTitle("Server status:")
                .setDescription(`:x: **OFFLINE**\n\n:information_source: \`${server.ip}\`:\`${server.port}\``)
                .setColor(config.embeds.error)
            message.channel.send({ embeds: [errorEmbed] });

            if (warns) console.log(warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error)
        });
    }

};