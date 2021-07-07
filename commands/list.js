const { commands} = require("../config");
const util = require('minecraft-server-util');
const Discord = require('discord.js');

module.exports.config = {
    name: "list", //Name of command - RENAME THE FILE TOO!!!
    description: "Server players list command", //Description of command - you can change it :)
    aliases: commands.list, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message) => {
    const { server, config } = bot

    if(!server.work) return

    let 
    ip1 = server.ip,
    port1 = server.port,
    icon = server.icon ? server.icon : message.guild.icon

    if(server.type === 'java') {
        util.status(ip1, { port: port1 })
            .then((response) => {
                const serverEmbed = new Discord.MessageEmbed()
                    .setAuthor(config.server.name ? config.server.name : message.guild.name, icon)
                    .setDescription(`:white_check_mark: **ONLINE**`)
                    .addFields(
                        { name: "Players", value: `**${response.onlinePlayers}**/**${response.maxPlayers}**` + (response.samplePlayers ? "\n\`\`\`" + response.samplePlayers.map(p => ` ${p.name} `).join('\n') + "\`\`\`":"") , inline: false },
                    )
                    .setColor(config.embeds.color)
                message.channel.send(serverEmbed);
            })
            .catch((error) => {
                const errorEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${ip1}:${port1}`, 'https://www.planetminecraft.com/files/image/minecraft/project/2020/224/12627341-image_l.jpg')
                    .setDescription(':x: **OFFLINE**')
                    .setColor(config.embeds.error)
                message.channel.send(errorEmbed);

                throw error;
            });
    } else {
        //Doesn't work for bedrock edition, sorry.
    }

};