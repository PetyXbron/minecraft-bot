//CONFIG DATA EXPLANATION - https://petyxbron.gitbook.io/minecraft-bot/installation/config-info
module.exports = {
    //Your bot data
    bot: {
        token: '', //Your bot token - https://tinyurl.com/discordbot-token
        prefix: '', //Your custom prefix of the bot, like "!" or "."
        status: '', //Custom activity/status text
        activity: '' //You can choose: PLAYING, LISTENING, WATCHING, COMPETING
    },

    //Your minecraft server data
    server: {
        name: '', //Your server name
        type: '', //"java" or "bedrock"
        ip: '', //IP of your server - do not include port - e.g. "mc.hypixel.net"
        port: '', //PORT of your server - empty => default port (BE 19132, JA 25565)
        icon: '' //Link to icon - like "https://website.com/icon.png"
    },

    //Basic code settings
    settings: {
        warns: true, //Show warns? - true or false (boolean)
        readyScan: true, //On bot's start, send to console server's basic info? - true or false (boolean)
        split: false //Advanced - Extract only the version like "1.17" or "1.12" etc.
    },

    //Commands aliases
    commands: {
        status: [
            'info',
            'server'
        ],
        help: [
            'commands',
            'menu'
        ],
        test: [
            'try',
            'testing'
        ],
        ip: [
            
        ],
        list: [

        ],
        vote: [

        ]
    }
};
//CONFIG DATA EXPLANATION - https://petyxbron.gitbook.io/minecraft-bot/installation/config-info