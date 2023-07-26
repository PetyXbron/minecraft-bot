//CONFIG DATA EXPLANATION - https://mb.petyxbron.cz/installation/config
//ENABLE BOT "SERVER MEMBERS INTENT" & "MESSAGE CONTENT INTENT" ON DISCORD DEVELOPER PORTAL
//YOU CAN DISABLE COMMANDS USING MESSAGE CONTENT ON LINE 37 (IF YOU WON'T USE "MESSAGE CONTENT INTENT")

module.exports = {
    language: "en", //Available: cs_CZ, en, es_ES, id_ID, pt_BR, pt_PT (path: /translations)

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
        port: "", //PORT of your server - if not entered, the default port is selected (25565 / 19132)
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
        commands: {
            enableChat: true, //This requires having "message content" intent allowed on the Discord developer portal site.
            enableSlash: true //Enable Discord slash commands?
        },
        //Features:
        randomColor: false, //Enable random hex color generator for embeds? Overwrites embeds settings!
        statusCH: false, //L59 - Enable auto-changing status message?
        votingCH: false, //L65 - Enable voting channel?
        imagesCH: false, //L84 - Enable images channel?
        countingCH: false, //L102 - Enable counting channel?
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

    //Voting channel
    votingCH: {
        channelID: "",
        time: "30s", //Time for how long the cancel reaction should be deleted.
        commands: false, //Enable commands (commands of this bot) usage?
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
            deleteOther: true //Delete all other reactions than those mentioned above (admin's reactions are ignored)
        }
    },

    //Images channel
    imagesCH: {
        channelID: "",
        commands: false, //Enable commands (commands of this bot) usage?
        allowWithTextOnly: false, //Should be text messages without any attachments allowed? These messages won't get threads
        allowWithTextAndImage: true, //Should be text messages allowed? If false, only messages with only attachments will be allowed
        threads: {
            enable: false, //Create discussion threads for each imagesCH message
            nameSyntax: "Post {ID}", //Thread name ("{ID}" = ID of post/image)
            idSyntax: "001", //ID syntax - choose how many zeros should IDs show (DON'T REMOVE INTEGER "1")
            archiveTime: 1440 //Minutes after which the thread should archive in case of no recent activity
        },
        reactions: {
            list: ["❤️"], //Which reactions should be added to the message?
            deleteOther: true //Delete all other reactions than those mentioned above (admin's reactions are ignored)
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
    }
};

//CONFIG DATA EXPLANATION - https://mb.petyxbron.cz/installation/config