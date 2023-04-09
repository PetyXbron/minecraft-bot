//CONFIG DATA EXPLANATION - https://mb.petyxbron.cz/config/config-info
//ENABLE BOT "SERVER MEMBERS INTENT" & "MESSAGE CONTENT INTENT" ON DISCORD DEVELOPER PORTAL
//YOU CAN DISABLE COMMANDS BY MESSAGE CONTENT ON LINE 97 (IF YOU WON'T USE "MESSAGE CONTENT INTENT")
module.exports = {
    //Your bot data
    bot: {
        //PASTE YOUR DISCORD BOT TOKEN IN DATA.JSON FILE (more secure) - https://tinyurl.com/discordbot-token
        prefix: "", //Your custom prefix of the bot, like "!" or "."
        presence: "", //Custom activity/status text
        status: "",  //You can choose: ONLINE, IDLE, DND (do not disturb), INVISIBLE
        activity: "", //You can choose: PLAYING, LISTENING, WATCHING, COMPETING
        guildID: "", //Your Discord server guild ID
    },

    //Your Minecraft server data
    server: {
        name: "", //Your server name
        type: "", //"java" or "bedrock"
        ip: "", //IP of your server - do not include port - e.g. "mc.hypixel.net"
        port: "", //PORT of your server - empty => default port (JA 25565, BE 19132)
        icon: "", //Link to icon - like "https://website.com/icon.png"
        version: "", //Minecraft version of sever
        vote: "" //Vote link - like "https://minecraftpocket-servers.com/server/80103/vote/"
    },

    //Basic code settings
    //All settings are boolean wanted - Use "true" for enabling, and "false" for disabling setting.
    settings: {
        //General:
        warns: true, //Show warns?
        debug: false, //Log most of the changes and updates (pretty spam)?
        inviteLink: true, //Show bot invite link on bot start?
        readyScan: true, //On bot's start, send to console server's essential information?
        //Features:
        randomColor: false, //Enable random hex color generator for embeds? Overwrites embeds settings!
        statusCH: false, //Enable auto-changing status message?
        votingCH: false, //Enable voting channel?
        countingCH: false, //Enable counting channel?
        //Advanced:
        removeServerType: false, //Remove "Spigot", "Purpur" etc. from version and leave only "1.18", "1.19" etc.?
        showDefaultPort: false //Show the server port behind IP if its default (25565, 19132) (primarily statusCH feature)?
    },

    //Period of auto changing status if you are using {onlinePlayers} or {maxPlayers} in bot's presence
    autoStatus: {
        time: "10min", //Period of auto changing status - like "3min", "20s" or "1min" etc.
        offline: "Offline" //Changes bot's presence to this text if the server is offline / not found
    },

    //Auto changing status message
    statusCH: {
        channelID: "",
        time: "30s" //Period of updating status message - like "3min", "20s" or "1min" etc.
    },

    //Voting channel - https://mb.petyxbron.cz/config/config-info#voting-ch
    votingCH: {
        channelID: "",
        time: "30s", //Time for how long the cancel reaction should be deleted.
        threads: {
            enable: false, //Create discussion threads for each votingCH message
            nameSyntax: "Voting {ID}", //Thread name ("{ID}" = ID of voting/suggestion)
            idSyntax: "001", //ID syntax - choose how many zeros should IDs show (DON'T REMOVE INTEGER "1")
            archiveTime: 1440 //Minutes after which the thread should archive in case of no recent activity
        },
        reactions: {
            first: "👍", //First added reaction (the positive one)
            second: "👎", //Second added reaction (the negative one)
            cancel: "❌", //Third added reaction (cancel/remove button)
            deleteOther: false //Delete all other reactions than those mentioned above (admin's reactions are ignored)
        }
    },

    //Counting channel - auto updating channel name
    countingCH: {
        channelID: "",
        time: "1min", //Period of updating channel name - like "3min", "20s" or "1min" etc.
        name: "{onlinePlayers} players online!", //Name of the channel
        offline: "Server is offline!" //Name of the channel if the server is offline / not found
    },

    //Embeds settings
    embeds: {
        colors: {
            normal: "",  //Main/successful color of embeds - choose HEX color here: https://htmlcolorcodes.com
            error: "", //Error/unsuccessful color of embeds - choose HEX color here: https://htmlcolorcodes.com
        }
    },

    //Program process console logging
    console: {
        emojis: {
            success: "💚",
            info: "💙",
            warn: "💛",
            debug: "💜",
            error: "🛑"
        }
    },

    //All commands settings
    commands: {
        enableNormals: true, //This requires having "message content" intent allowed on the Discord developer portal site
        enableSlashes: true, //If you want to disable only specific slashes, leave this true and go down
        //List of all commands:
        help: {
            enableNormal: true, //Enables normal command
            enableSlash: true, //Enables slash command
            aliases: [ //Only for normal commands
                "commands", "menu"
            ],
            text: { //Custom text settings (for translating or customization)
                title: "{serverName} bot commands:",
                description: "> **Prefix:** \`{prefix}\`\n> **Commands:**\n{commands}",
                errorTitle: "Error! Command \"{arg0}\" doesn't exist.",
                errorDescription: "Command `{arg0}` was not found.\nYou are entering the wrong alias or the command is disabled."
            }
        },
        ip: {
            enableNormal: true, //Enables normal command
            enableSlash: true, //Enables slash command
            aliases: [ //Only for normal commands
                "i", "ip-address", "address", "connect", "join"
            ],
            text: { //Custom text settings (for translating or customization)
                title: "IP address:",
                description: "\`{serverIp}\`:\`{serverPort}\`"
            }
        },
        list: {
            enableNormal: true, //Enables normal command
            enableSlash: true, //Enables slash command
            aliases: [ //Only for normal commands
                "l", "players", "plist"
            ],
            text: { //Custom text settings (for translating or customization)
                title: "Online player list:",
                description: "**{playersOnline}**/**{playersMax}**",
                listFormat: "```{playersList}```"
            }
        },
        status: {
            enableNormal: true, //Enables normal command
            enableSlash: true, //Enables slash command
            aliases: [ //Only for normal commands
                "s", "info", "server", "overview", "ov"
            ],
            text: { //Custom text settings (for translating or customization)
                title: "Server status:",
                description:
                    `{status}
                    
                    **Description**
                    {motd}
                    
                    **IP Address**
                    \`{serverIp}\`:\`{serverPort}\`
                    
                    **Version**
                    {serverType} {serverVersion}
                    
                    **Players**
                    **{playersOnline}**/**{playersMax}**`,
            }
        },
        test: {
            enableNormal: true, //Enables normal command
            //Test command doesn't have a slash type. Is it really necessary?
            aliases: [ //Only for normal commands
                "t", "try", "testing"
            ],
            text: { //Custom text settings (for translating or customization)
                content: "Test message reply."
            }
        },
        version: {
            enableNormal: true, //Enables normal command
            enableSlash: true, //Enables slash command
            aliases: [ //Only for normal commands
                "v", "ver"
            ],
            text: { //Custom text settings (for translating or customization)
                title: "Minecraft version:",
                description: "{serverType} {serverVersion}"
            }
        },
        vote: {
            enableNormal: true, //Enables normal command
            enableSlash: true, //Enables slash command
            aliases: [ //Only for normal commands
                "votelink"
            ],
            text: { //Custom text settings (for translating or customization)
                title: "Server list vote link:",
                description: "[Here]({voteLink}) you can vote for {serverName}."
            }
        },
    }
};

//CONFIG DATA EXPLANATION - https://mb.petyxbron.cz/config/config-info