const util = require('axios'),
    fs = require('fs'),
    { commands } = require(fs.existsSync('../../config/dev-main') ? '../../config/dev-main' : '../../config/main');

module.exports.config = {
    name: "test", //Name of command - RENAME THE FILE TOO!!!
    description: "Test command", //Description of command - you can change it :)
    aliases: commands.test.aliases //Command's aliases - set them in the config
};

module.exports.run = async (bot, message) => {
    let { server, config } = bot,
        text = commands.test.text,
        icon = server.icon ? server.icon : message.guild.iconURL();

    if (!text.content) {
        message.reply({ content: 'Test message reply.' });
    } else {
        message.reply({ content: text.content });
    }
};