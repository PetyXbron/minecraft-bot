const { commands, settings } = require("../config");
const util = require('minecraft-server-util');
const Discord = require('discord.js');
const c = require('chalk')

module.exports.config = {
    name: "status", //Name of command - RENAME THE FILE TOO!!!
    description: "Server status", //Description of command - you can change it :)
    aliases: commands.status, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message) => {
    const { server, config } = bot,
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
                const description11 = result.motd.clean
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

                const serverEmbed = new Discord.MessageEmbed()
                    .setAuthor(config.server.name ? config.server.name : message.guild.name, 'attachment://logo.png')
                    .setDescription(`:white_check_mark: **ONLINE**`)
                    .addFields(
                        { name: "Description", value: `${description11}` , inline: false },
                        { name: "IP Address", value: `\`${server.ip}\`:\`${server.port}\`` , inline: false },
                        { name: "Version", value: `JAVA **${version}**` , inline: true },
                        { name: "Players", value: `**${result.players.online}**/**${result.players.max}**` , inline: true },
                    )
                    .setColor(config.embeds.color)
                message.channel.send({ embeds: [serverEmbed] });
            })
            .catch((error) => {
                const errorEmbed = new Discord.MessageEmbed()
                .setAuthor(`${ip1}:${port1}`, 'https://www.planetminecraft.com/files/image/minecraft/project/2020/224/12627341-image_l.jpg')
                .setDescription(':x: **OFFLINE**')
                .setColor(config.embeds.error)
                message.channel.send({ embeds: [errorEmbed] });

                if (warns) console.log(warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error)
            });
    } else {
        util.statusBedrock(ip1, port1)
        .then((result) => {
            const description11 = result.motd.clean

            const version = result.version.name

            const serverEmbed = new Discord.MessageEmbed()
                .setAuthor(config.server.name ? config.server.name : message.guild.name, icon)
                .setDescription(`:white_check_mark: **ONLINE**`)
                .addFields(
                    { name: "Description", value: `${description11}` , inline: false },
                    { name: "IP Address", value: `\`${server.ip}\`:\`${server.port}\`` , inline: false },
                    { name: "Version", value: `BEDROCK **${version}**` , inline: true },
                    { name: "Players", value: `**${result.players.online}**/**${result.players.max}**` , inline: true },
                )
                .setColor('#77fc03')
            message.channel.send({ embeds: [serverEmbed] });
        })
        .catch((error) => {
            const errorEmbed = new Discord.MessageEmbed()
                .setAuthor(config.server.name ? config.server.name : message.guild.name, icon)
                .setDescription(':x: **OFFLINE**')
                .setColor('#f53636')
            message.channel.send({ embeds: [errorEmbed] });

            if (warns) console.log(warn(`Error when using command ${module.exports.config.name}! Error:\n`) + error)
        });
    }

};