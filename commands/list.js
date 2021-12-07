const { commands} = require("../config");
const util = require('minecraft-server-util');
const Discord = require('discord.js');
const c = require('chalk')

module.exports.config = {
    name: "list", //Name of command - RENAME THE FILE TOO!!!
    description: "Server players list command", //Description of command - you can change it :)
    aliases: commands.list, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message) => {
    const { server, config } = bot,
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
                const trueList = result.players.sample ? "\n\`\`\`" + result.players.sample.map(p => ` ${p.name} `).join('\r\n') + "\`\`\`":""

                const serverEmbed = new Discord.MessageEmbed()
                    .setAuthor(config.server.name ? config.server.name : message.guild.name, icon)
                    .setDescription(`:white_check_mark: **ONLINE**`)
                    .addFields(
                        { name: "Players", value: `**${result.players.online}**/**${result.players.max}**` + trueList, inline: false },
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
        //Doesn't work for bedrock edition, sorry.
        message.reply('Sorry, but this function is not working for Bedrock servers.')
    }

};