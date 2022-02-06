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
        version: '', //Minecraft version of sever
        vote: '' //Vote link - like "https://minecraftpocket-servers.com/server/80103/vote/"
    },

    //Basic code settings
    //All settings are boolean wanted - Use "true" for enabling, "false" for disablign setting.
    settings: {
        warns: true, //Show warns?
        debug: false, //Log most of changes and updates (pretty spam)?
        inviteLink: true, //Show bot invite link on bot start?
        readyScan: true, //On bot's start, send to console server's basic info?
        split: false, //Advanced - Extract only the version like "1.17" or "1.12" etc.
        randomColor: false, //Enable random hex color generator for embeds? Overwrites embeds settings!
        statusCH: false, //Enable auto-changing status message
        votingCH: false //Enable voting channel
    },

    //Period of auto changing status if you are using {onlinePlayers} or {maxPlayers} in bot's status
    autoStatus: {
        time: '10min'
    },

    //Voting channel - https://docs.petyxbron.cz/config/config-info#voting-ch
    votingCH: {
        time: '30s', //Time for how long the cancel reaction should be deleted.
        reactions: {
            first: '👍', //First added reaction (the positive one)
            second: '👎', //Second added reacion (the negative one)
            cancel: '❌' //Third added reaction (cancel/remove button)
        },
        guild: {
            id: ''
        },
        channel: {
            id: ''
        }
    },

    //Auto changing status message
    statusCH: {
        time: '30s', //How long should the status always be updated? - like "3min", "20s" or "1min" etc.
        guild: {
            id: '',
        },
        channel: {
            id: '',
        }
    },

    //Embeds settings
    embeds: {
        colors: {
            normal: '',  //Main/succesful color of embeds - choose HEX color here: https://htmlcolorcodes.com
            error: '', //Error/unsuccesful color of embeds - choose HEX color here: https://htmlcolorcodes.com
        }
    },

    //Program process console logging
    console: {
        emojis: {
            success: "💚",
            info: "💙",
            warn: "💛",
            error: "🛑"
        }
    },

    //Custom text settings
    messages: {
        ip: {
            title: "IP address:",
            description: "\`{serverIp}\`:\`{serverPort}\`"
        },
        list: {
            title: "Online player list:",
            description: "**{playersOnline}**/**{playersMax}**",
            listFormat: "```{playersList}```"
        },
        status: {
            title: "Server status:",
            description:
            `:white_check_mark: **ONLINE**
            
            **Description**
            {motd}
            
            **IP Address**
            \`{serverIp}\`:\`{serverPort}\`
            
            **Version**
            {serverType} {serverVersion}
            
            **Players**
            **{playersOnline}**/**{playersMax}**`,
        },
        test: {
            content: "Test message reply."
        },
        version: {
            title: "Minecraft version:",
            description: "{serverType} {serverVersion}"
        },
        vote: {
            title: "Server list vote link:",
            description: "[Here]({voteLink}) you can vote for {serverName}."
        }
    },

    //Commands aliases
    commands: {
        status: [
            's',
            'info',
            'server',
            'overview',
            'ov'
        ],
        test: [
            't',
            'try',
            'testing'
        ],
        ip: [
            'i',
            'ip-address',
            'address',
            'connect',
            'join'
        ],
        list: [
            'l',
            'players',
            'plist'
        ],
        vote: [
            'votelink'
        ],
        version: [
            'v',
            'ver'
        ]
    }
};

//CONFIG DATA EXPLANATION - https://docs.petyxbron.cz/config/config-info