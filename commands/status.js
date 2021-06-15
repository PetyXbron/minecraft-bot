const { commands, settings } = require("../config");
const util = require('minecraft-server-util');
const Discord = require('discord.js');

module.exports.config = {
    name: "status", //Name of command - RENAME THE FILE TOO!!!
    description: "Server status", //Description of command - you can change it :)
    aliases: commands.status, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message) => {
    const { server } = bot

    let 
    ip1 = server.ip,
    port1 = server.port

    if(server.type === 'java') {
        util.status(ip1, { port: port1 })
            .then((response) => {
                const favic = response.favicon
                let icon = favic.split(`,`);
                let imageStream = new Buffer.from(icon[1], 'base64');
                var attachment = new Discord.MessageAttachment(imageStream, 'logo.png');

                const 
                description1 = response.description.descriptionText,
                description11 = description1.toString().replace(/\u00A7[0-9A-FK-OR]/ig, '')

                const versionOriginal = response.version
                if(settings.split) {
                    const versionArray = versionOriginal.split(" ")
                    var versionAdvanced = versionArray[versionArray.length - 1]
                }
                const version = versionAdvanced ? versionAdvanced : versionOriginal

                const serverEmbed = new Discord.MessageEmbed()
                    .attachFiles(attachment)
                    .setAuthor(`${response.host}:${response.port}`, 'attachment://logo.png')
                    .setDescription(`:white_check_mark: **ONLINE**`)
                    .addFields(
                        { name: "Description", value: `${description11}` , inline: false },
                        { name: "Version", value: `JAVA ${version}` , inline: true },
                        { name: "Players", value: `**${response.onlinePlayers}**` , inline: true },
                    )
                    .setColor('#77fc03')
                message.channel.send(serverEmbed);
            })
            .catch((error) => {
                const errorEmbed = new Discord.MessageEmbed()
                .setAuthor(`${ip1}:${port1}`, 'https://www.planetminecraft.com/files/image/minecraft/project/2020/224/12627341-image_l.jpg')
                .setDescription(':x: **OFFLINE**')
                .setColor('#f53636')
                message.channel.send(errorEmbed);

                throw error;
            });
    } else {
        util.statusBedrock(ip1, { port: portík })
        .then((response) => {
          const 
          popis1 = response.motdLine1,
          popis2 = response.motdLine2,
          popis11 = popis1.toString().replace(/\u00A7[0-9A-FK-OR]/ig, ''),
          popis21 = popis2.toString().replace(/\u00A7[0-9A-FK-OR]/ig, '');

          const versionOriginal = response.version
          if(settings.split) {
              const versionArray = versionOriginal.split(" ")
              var versionAdvanced = versionArray[versionArray.length - 1]
          }
          const version = versionAdvanced ? versionAdvanced : versionOriginal

            const serverEmbed = new Discord.MessageEmbed()
            .setAuthor(`${response.host}:${response.port}`)
            .setDescription(`:white_check_mark: **ONLINE**`)
            .addFields(
                { name: "Description", value: `${popis11}\n${popis21}` , inline: false },
                { name: "Version", value: `${response.edition} \`${version}\`` , inline: true },
                { name: "Players", value: `\`${response.onlinePlayers}\` / \`${response.maxPlayers}\`` , inline: true },
            )
            .setColor('#77fc03')
            message.channel.send(serverEmbed);
        })
        .catch((error) => {
            const errorEmbed = new Discord.MessageEmbed()
            .setAuthor(`${ip1}:${portík}`)
            .setDescription(':x: **OFFLINE**')
            .setColor('#f53636')
            message.channel.send(errorEmbed);

            throw error;
        });
    }

};