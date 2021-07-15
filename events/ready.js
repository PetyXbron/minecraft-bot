const chalk = require('chalk'),
util = require('minecraft-server-util'),
Discord = require('discord.js'),
db = require('quick.db'),
ms = require('ms'),
gr = chalk.keyword('green').bold,
bl = chalk.keyword('blue'),
warn = chalk.keyword('yellow').bold

module.exports = async (bot) => {
    const {server, config, info, settings} = bot

    if(bot.status) {
        try {
            bot.user.setActivity(bot.status, {type: bot.activity}) //Sets bot activity
            console.log('✅ Successfully set status to ' + gr(`${bot.activity.toLowerCase()} ${bot.status}`))
        } catch(e) {
            console.log()
        }
    }

    if(config.settings.votingCH) {
        const guild = bot.guilds.cache.get(config.votingCH.guild.id);
        const channel = guild.channels.cache.get(config.votingCH.channel.id);
        console.log(`✅ Channel ${gr(channel.name)} is now set as voting channel!`)
    }

    if(config.settings.statusCH && server.work) {
        const guild = bot.guilds.cache.get(info.guild.id);
        const channel = guild.channels.cache.get(info.channel.id);
        const icon = server.icon ? server.icon : guild.icon

        if(!db.get('statusCHMsgID')) {
            let msg
            try {
                const serverEmbed = new Discord.MessageEmbed()
                    .setAuthor(config.server.name ? config.server.name : guild.name)
                    .setDescription(`🔄 **SETTING...**`)
                    .addFields(
                        { name: "PLAYERS", value: `§/§\n\`\`\`§\`\`\`` , inline: false },
                        { name: "INFO", value: `EDITION §\n\`${server.ip}\`:\`${server.port}\`` , inline: true }
                    )
                    .setColor(config.embeds.color)
                msg = await channel.send(serverEmbed)
            } catch(err) { console.log(err)}

            console.log(`✅ Successfully sent status message to ${gr(channel.name)}!`)
            db.set('statusCHMsgID', msg.id);
        }

        msg = await channel.messages.fetch(db.get('statusCHMsgID'))
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
    
                    const versionOriginal = response.version
                    if(settings.split) {
                        const versionArray = versionOriginal.split(" ")
                        var versionAdvanced = versionArray[versionArray.length - 1]
                    }
                    const version = versionAdvanced ? versionAdvanced : versionOriginal
    
                    const serverEmbed = new Discord.MessageEmbed()
                        .attachFiles(attachment)
                        .setAuthor(config.server.name ? config.server.name : message.guild.name, 'attachment://logo.png')
                        .setDescription(`:white_check_mark: **ONLINE**`)
                        .addFields(
                            { name: "PLAYERS", value: `${response.onlinePlayers}/${response.maxPlayers}` + (response.samplePlayers ? "\n\`\`\`" + response.samplePlayers.map(p => ` ${p.name} `).join('\n') + "\`\`\`":"") , inline: false },
                            { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`:\`${server.port}\`` , inline: true }
                        )
                        .setColor(config.embeds.color)
                        .setFooter('Updated')
                        .setTimestamp()
                    msg.edit(serverEmbed);
                })
                .catch((error) => {
                    const errorEmbed = new Discord.MessageEmbed()
                    .setAuthor(config.server.name ? config.server.name : message.guild.name, icon)
                    .setDescription(':x: **OFFLINE**')
                    .setColor(config.embeds.error)
                    .setFooter('Updated')
                    .setTimestamp()
                    msg.edit(errorEmbed);
    
                    throw error;
                })
        } else {
            util.statusBedrock(ip1, { port: port1 })
            .then((response) => {
              const versionOriginal = response.version;
              if(settings.split) {
                  const versionArray = versionOriginal.split(" ");
                  var versionAdvanced = versionArray[versionArray.length - 1];
              };
              const version = versionAdvanced ? versionAdvanced : versionOriginal;
    
                const serverEmbed = new Discord.MessageEmbed()
                .setAuthor(config.server.name ? config.server.name : message.guild.name, icon)
                .setDescription(`:white_check_mark: **ONLINE**`)
                .addFields(
                    { name: "PLAYERS", value: `${response.onlinePlayers}/${response.maxPlayers}` , inline: false },
                    { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`:\`${server.port}\`` , inline: true }
                )
                .setColor(config.embeds.color)
                .setFooter('Updated')
                .setTimestamp()
                msg.edit(serverEmbed);
            })
            .catch((error) => {
                const errorEmbed = new Discord.MessageEmbed()
                .setAuthor(config.server.name ? config.server.name : message.guild.name, icon)
                .setDescription(':x: **OFFLINE**')
                .setColor(config.embeds.error)
                .setFooter('Updated')
                .setTimestamp()
                msg.edit(errorEmbed);
    
                throw error;
            })
        }

        console.log(`✅ Successfully updated status message in ${gr(channel.name)}!`)

        if(server.type === 'java') {
            setInterval(() =>
            util.status(ip1, { port: port1 })
                .then((response) => {
                    const favic = response.favicon
                    let icon = favic.split(`,`);
                    let imageStream = new Buffer.from(icon[1], 'base64');
                    var attachment = new Discord.MessageAttachment(imageStream, 'logo.png');
    
                    const versionOriginal = response.version
                    if(settings.split) {
                        const versionArray = versionOriginal.split(" ")
                        var versionAdvanced = versionArray[versionArray.length - 1]
                    }
                    const version = versionAdvanced ? versionAdvanced : versionOriginal
    
                    const serverEmbed = new Discord.MessageEmbed()
                        .attachFiles(attachment)
                        .setAuthor(config.server.name ? config.server.name : message.guild.name, 'attachment://logo.png')
                        .setDescription(`:white_check_mark: **ONLINE**`)
                        .addFields(
                            { name: "PLAYERS", value: `${response.onlinePlayers}/${response.maxPlayers}` + (response.samplePlayers ? "\n\`\`\`" + response.samplePlayers.map(p => ` ${p.name} `).join('\n') + "\`\`\`":"") , inline: false },
                            { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`:\`${server.port}\`` , inline: true }
                        )
                        .setColor(config.embeds.color)
                        .setFooter('Updated')
                        .setTimestamp()
                    msg.edit(serverEmbed);
                })
                .catch((error) => {
                    const errorEmbed = new Discord.MessageEmbed()
                    .setAuthor(config.server.name ? config.server.name : message.guild.name, icon)
                    .setDescription(':x: **OFFLINE**')
                    .setColor(config.embeds.error)
                    .setFooter('Updated')
                    .setTimestamp()
                    msg.edit(errorEmbed);
    
                    throw error;
                }), ms(info.time));
        } else {
            setInterval(() =>
            util.statusBedrock(ip1, { port: port1 })
            .then((response) => {
              const versionOriginal = response.version;
              if(settings.split) {
                  const versionArray = versionOriginal.split(" ");
                  var versionAdvanced = versionArray[versionArray.length - 1];
              };
              const version = versionAdvanced ? versionAdvanced : versionOriginal;
    
                const serverEmbed = new Discord.MessageEmbed()
                .setAuthor(config.server.name ? config.server.name : message.guild.name, icon)
                .setDescription(`:white_check_mark: **ONLINE**`)
                .addFields(
                    { name: "PLAYERS", value: `${response.onlinePlayers}/${response.maxPlayers}` , inline: false },
                    { name: "INFO", value: `${server.type.toUpperCase()} ${version}\n\`${server.ip}\`:\`${server.port}\`` , inline: true }
                )
                .setColor(config.embeds.color)
                .setFooter('Updated')
                .setTimestamp()
                msg.edit(serverEmbed);
            })
            .catch((error) => {
                const errorEmbed = new Discord.MessageEmbed()
                .setAuthor(config.server.name ? config.server.name : message.guild.name, icon)
                .setDescription(':x: **OFFLINE**')
                .setColor(config.embeds.error)
                .setFooter('Updated')
                .setTimestamp()
                msg.edit(errorEmbed);
    
                throw error;
            }), ms(info.time));
        }
    
    }

    if(bot.readyScan && server.work) {
        if(server.type === 'java') {
            util.status(server.ip, { port: server.port })
                .then((response) => {
                    console.log(`✅ Successfully located ${gr(server.type)} server ${gr(server.ip)}!\n` + chalk.blue.bold('Server info:\n')
                    + bl('IP:	 ') +  `${server.ip}:${response.port ? response.port : server.port}\n`
                    + bl('VERSION: ') + `${response.version ? response.version : 'unknown'}\n`
                    + bl('PLAYERS: ') + gr(`${response.onlinePlayers ? response.onlinePlayers : '0'}`) + '/' + gr(`${response.maxPlayers ? response.maxPlayers : '0'}`)
                    )
                })
                .catch((error) => {
                    console.log(warn(`Could not find ${server.type} server ${server.ip} with port ${server.port}! Error:\n`) + error)
                });
        } else if(server.type === 'bedrock') {
            util.statusBedrock(server.ip, { port: server.port })
            .then((response) => {
                console.log(`✅ Successfully located ${gr(server.type)} server ${gr(server.ip)}!\n` + chalk.blue.bold('Server info:\n')
                + bl('IP:	 ') +  `${server.ip}:${response.port ? response.port : server.port}\n`
                + bl('VERSION: ') + `${response.version ? response.version : 'unknown'}\n`
                + bl('PLAYERS: ') + gr(`${response.onlinePlayers ? response.onlinePlayers : '0'}`) + '/' + gr(`${response.maxPlayers ? response.maxPlayers : '0'}`)
                )
            })
            .catch((error) => {
                console.log(warn(`Could not find ${server.type} server ${server.ip} with port ${server.port}! Error:\n`) + error)
            });
        }
    }

    console.log("✅ " + gr(bot.user.username) + " is now working")
}