//CONFIG DATA EXPLANATION - https://docs.petyxbron.cz/config/config-info
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
        icon: '', //Link to icon - like "https://website.com/icon.png"
        vote: '' //Vote link - like "https://minecraftpocket-servers.com/server/80103/vote/"
    },

    //Basic code settings
    settings: {
        warns: true, //Show warns? - true or false (boolean)
        readyScan: true, //On bot's start, send to console server's basic info? - true or false (boolean)
        split: false, //Advanced - Extract only the version like "1.17" or "1.12" etc.
        status: false //Enable auto-changing status message - true or false (boolean)
    },

    //Auto changing status message
    statusCH: {
        time: '30s', //How long should the status always be updated? - like "3min", "20s" or "1min" etc.
        guild: {
            name: '', //Discord server name
            id: '', //Discord server ID, where's your channel
        },
        channel: {
            id: '', //Discord channel ID
        }
    },
    
    //Embeds settings
    embeds: {
        colors: {
            normal: '',  //Main/succesful color of embeds - choose HEX color here: https://htmlcolorcodes.com
            error: '', //Error/unsuccesful color of embeds - choose HEX color here: https://htmlcolorcodes.com
        }
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
            'ip-address',
            'address',
            'connect'
        ],
        list: [
            'players'
        ],
        vote: [

        ],
        version: [
            'v'
        ],
        poll: [
            'voting'
        ],
        lockdown: [
            'lock'
        ],
        message: [
            'announce',
            'announcement'
        ]
    }
};
//CONFIG DATA EXPLANATION - https://docs.petyxbron.cz/config/config-info