module.exports = {
    bot: {
        token: '', //Your bot token - https://tinyurl.com/discordbot-token
        prefix: '', //Your custom prefix of the bot, like "!" or "."
        status: '', //Custom activity/status text
        activity: '' //You can choose: PLAYING, LISTENING, WATCHING, COMPETING
    },

    server: {
        type: '', //"java" or "bedrock"
        ip: '', //IP of your server - do not include port - e.g. "mc.hypixel.net"
        port: '' //PORT of your server - empty = default port (BE 19132, JA 25565)
    }
};