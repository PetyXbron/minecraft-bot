const { commands } = require("../config");
const util = require('minecraft-server-util');

module.exports.config = {
    name: "test", //Name of command - RENAME THE FILE TOO!!!
    description: "Test command", //Description of command - you can change it :)
    aliases: commands.test, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message) => {
    const { server, config, text } = bot;

    if (!text.test.content) {
        message.reply({ content: 'Test message reply.' });
    } else {
        message.reply({ content: text.test.content });
    }
};