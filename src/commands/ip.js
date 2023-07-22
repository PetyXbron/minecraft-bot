const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "ip", //RENAME THE FILE TOO!!!
        enableChat: true,
        enableSlash: true,
        description: "Sends the IP address of server",
        aliases: ["i", "ip-address", "address", "connect", "join"]
    },
    slash: new SlashCommandBuilder()
        .setName('ip') //RENAME THE FILE TOO!!!
        .setDescription(`Sends the IP address of server`)
};

module.exports.run = async (bot, diType, di) => {
    const Discord = require('discord.js');

    let { server, config } = bot,
        icon = server.icon ? server.icon : di.guild.iconURL();

    const ipEmbed = new Discord.EmbedBuilder()
        .setAuthor({ name: config.server.name ? config.server.name : di.guild.name, iconURL: icon })
        .setTitle("IP address:")
        .setDescription(`\`${server.ip}\`:\`${server.port}\``)
        .setColor(config.embeds.color);
    di.reply({ embeds: [ipEmbed], allowedMentions: { repliedUser: false } });
};