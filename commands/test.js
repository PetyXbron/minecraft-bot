const { commands } = require("../config");

module.exports.config = {
    name: "test",
    aliases: commands.test
};

module.exports.run = async (bot, message, args) => {
    try { message.channel.send("Everything should work!"); } catch(e) { console.log(e); };
};