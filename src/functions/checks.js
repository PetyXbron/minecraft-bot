const c = require('chalk'),
    fs = require('fs'),
    error = c.keyword('red').bold,
    kill = '\nKilling process...',
    warn = c.keyword('yellow').bold;

module.exports = {
    nodeVersion() {
        let v = process.versions.node.split(".");
        v.forEach((e, i) => { v[i] = parseInt(e); });

        let f = false;
        if (v[0] < 16) f = true;
        else if (v[0] === 16 && v[1] < 11) f = true;

        if (f) {
            console.log(`🛑 ` + error('You are using unsupported Node.js version (' + process.version + ')! Please update to v16.11.0 or higher.') + kill);
            return process.exit(1);
        }
    },

    config(bot, server) {
        const
            { config, warns, info } = bot,
            activites = ['PLAYING', 'WATCHING', 'COMPETING', 'LISTENING'], //Supported activites, discord.js supports more (but I don't care)
            statuses = ['online', 'idle', 'dnd', 'invisible']; //Supported statuses

        let emojis = config.console.emojis;
        if (!emojis.success) emojis.success = '💚';
        if (!emojis.info) emojis.info = '💙';
        if (!emojis.warn) emojis.warn = '💛';
        if (!emojis.error) emojis.error = '🛑';
        bot.emotes = emojis;

        if (bot.token === '') { //Checks if you have entered bot token to config
            console.log(`${bot.emotes.error} ` + error('Bot token in config/token.json is empty!') + kill);
            bot.destroy();
            return process.exit(1);
        } else if (bot.prefix === '') { //Checks if you have entered bot prefix to config
            console.log(`${bot.emotes.error} ` + error('Bot prefix in config/main.js is empty!') + kill);
            bot.destroy();
            return process.exit(1);
        };

        if (bot.pres === '') { //Checks if you have entered custom presence text message for bot to config
            if (warns) console.log(`${bot.emotes.warn} ` + warn('Bot status in config/main.js was empty! Bot presence was disabled.'));
            bot.pres = false;
        }

        if (!bot.activity) { //Checks if you have entered status activity type to config
            if (bot.pres) {
                if (warns) console.log(`${bot.emotes.warn} ` + warn('Bot activity type in config/main.js was empty! Activity type is now "playing"'));
                bot.activity = 'PLAYING';
            };
        };

        if (!new Set(activites).has(bot.activity.toUpperCase())) { //Checks if you have entered supported activity
            if (bot.pres) {
                if (warns) console.log(`${bot.emotes.warn} ` + warn(`"${bot.activity}" activity is not supported. Bot presence was disabled.`));
                bot.pres = false;
            };
        };

        if (!bot.status) { //Checks if you have entered status activity type to config
            if (bot.pres) {
                if (warns) console.log(`${bot.emotes.warn} ` + warn('Bot status type in config/main.js was empty! Bot presence is now set to "online"'));
                bot.status = 'ONLINE';
            };
        };

        if (!new Set(statuses).has(bot.status.toLowerCase())) { //Checks if you have entered supported activity
            if (bot.pres) {
                if (bot.status.toLowerCase() === "do not disturb") {
                    bot.status = "dnd";
                } else {
                    if (warns) console.log(`${bot.emotes.warn} ` + warn(`"${bot.status}" status is not supported. Bot presence was disabled.`));
                    bot.pres = false;
                }
            };
        };


        if (!server.ip) {
            if (warns) console.log(`${bot.emotes.error} ` + error("You did not specify server's ip!") + c.white('\nMinecraft server disabled.'));
            bot.server.work = false;
        } else {
            bot.server.work = true;
        }

        if (server.type !== 'java' && server.type !== 'bedrock') {
            if (bot.server.work) {
                if (!server.type) {
                    if (warns) console.log(`${bot.emotes.warn} ` + warn(`You did not specify server's edition, setting it to java.`));
                    server.type = 'java';
                } else {
                    console.log(`${bot.emotes.error} ` + error('Unknown server edition') + kill);
                    bot.destroy();
                    return process.exit(1);
                }
            }
        }

        if (!server.port) {
            if (bot.server.work) {
                if (warns) console.log(`${bot.emotes.warn} ` + warn(`You did not specify server port, setting it to default one.`));
                if (server.type === 'java') {
                    server.port = 25565;
                } else {
                    server.port = 19132;
                }
            }
        }

        if (config.server.name === '' || !config.server.name) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn(`You did not specify server name, setting it to Discord server name.`));
            bot.server.name = false;
        }

        config.embeds.error = config.embeds.colors.error ? config.embeds.colors.error : '#f53636';
        config.embeds.color = config.embeds.colors.normal ? config.embeds.colors.normal : '#77fc03';

        if (!config.language) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn(`You did not enter translations language.`));
            config.language = "en";
        } else if (!fs.existsSync(__dirname + '/../../translations/' + config.language + ".json5")) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn(`Language "` + config.language + `" was not found in /translations. Setting language to english.`));
            config.language = "en";
        } else if (!fs.existsSync(__dirname + '/../../translations/' + "en" + ".json5")) {
            console.log(`${bot.emotes.error} ` + error('English translations file not found.') + kill);
            bot.destroy();
            return process.exit(1);
        };

        if (!config.autoStatus.time) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn("You did not specify time update period of bot's status. Setting it to 10 minutes."));
            config.autoStatus.time = "10min";
        }

        if (config.settings.statusCH) {
            const dis = c.white('\nAuto changing status message disabled.');
            if (!info.channelID) {
                console.log(`${bot.emotes.error} ` + error("You did not specify channel ID in statusCH settings!") + dis);
                config.settings.statusCH = false;
            }

            if (config.settings.statusCH) {
                if (!info.time) {
                    if (warns) console.log(`${bot.emotes.warn} ` + warn("You did not specify time update period of statusCH. Setting it to 30 seconds."));
                    info.time = "30s";
                }
            }
        }

        if (config.settings.votingCH) {
            const dis = c.white('\nVoting channel disabled.');
            if (!config.votingCH.channelID) {
                console.log(`${bot.emotes.error} ` + error("You did not specify channel ID in votingCH settings!") + dis);
                config.settings.votingCH = false;
            }

            if (config.votingCH) {
                if (!config.votingCH.time) {
                    console.log(`${bot.emotes.warn} ` + warn("You did not specify time in votingCH settings! Setting it to 30 seconds."));
                    config.votingCH.time = "30s";
                }

                if (!config.votingCH.reactions.first) {
                    config.votingCH.reactions.first = "👍";
                }
                if (!config.votingCH.reactions.second) {
                    console.log(`${bot.emotes.warn} ` + warn("You did not specify second reaction emoji! Second reaction disabled."));
                    config.votingCH.reactions.second = false;
                }
                if (!config.votingCH.reactions.cancel) {
                    config.votingCH.reactions.cancel = "❌";
                }
            }
        }

        if (config.settings.countingCH) {
            const dis = c.white('\nAuto changing channel name disabled.');
            if (!config.countingCH.channelID) {
                console.log(`${bot.emotes.error} ` + error("You did not specify channel ID in countingCH settings!") + dis);
                config.countingCH.channelID = false;
            } else if (!config.countingCH.time) {
                if (warns) console.log(`${bot.emotes.warn} ` + warn("You did not specify time update period of countingCH. Setting it to 30 seconds."));
                config.countingCH.time = "30s";
            } else if (!config.countingCH.name) {
                if (warns) console.log(`${bot.emotes.warn} ` + warn("You did not specify channel name of countingCH. Setting it to \"{onlinePlayers} players online!\"."));
                config.countingCH.name = "{onlinePlayers} players online!";
            } else if (!config.countingCH.offline) {
                if (warns) console.log(`${bot.emotes.warn} ` + warn("You did not specify offline text of countingCH. Setting it to \"Server is offline!\"."));
                config.countingCH.offline = "Server is offline!";
            }

            if (config.settings.statusCH) {
                if (!info.time) {
                    if (warns) console.log(`${bot.emotes.warn} ` + warn("You did not specify time update period of statusCH. Setting it to 30 seconds."));
                    info.time = "30s";
                }
            }
        }

        const iconLINK = config.server.icon;
        if (!iconLINK) {
            server.icon = false;
        } else if (!iconLINK.includes("png" || "jpg" || "webp" || "gif")) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn("Unknown server icon file format. Setting it to undefined."));
            server.icon = false;
        } else if (!iconLINK.includes("https://" || "http://")) {
            if (warns) console.log(`${bot.emotes.warn} ` + warn("Server icon link did contain https or http. Setting it to undefined."));
            server.icon = false;
        } else {
            server.icon = iconLINK;
        }

        if (!server.icon) {
            if (server.type === "java" && bot.server.work) {
                server.icon = `https://api.mcstatus.io/v2/icon/${server.ip}:${server.port}`;
            } else {
                server.icon = "https://media.minecraftforum.net/attachments/300/619/636977108000120237.png";
            }
        }
    }
};