require('json5/lib/register');
const fs = require('fs'),
    bot = require('../../index').bot,
    util = require('axios'),
    { removeVersion } = require('./base'),
    t = require(__dirname + '/../../translations/' + bot.config.language + ".json5");

module.exports = {
    async translate(s, g) {
        let f = t;
        for (var i = 0, s = s.split('.'), l = s.length; i < l; i++) {
            f = f[s[i]];
        };
        s = await require("./translations").replaceVariables(f, g);
        return s;
    },

    async replaceVariables(s, g) {
        const { config } = bot;
        let variables = {};
        try {
            if (s.includes("{bot.") && !s.includes("{bot.name}") || s.includes("{server.")) {
                variables["1"] = {
                    "{bot.prefix}": config.bot.prefix,
                    "{bot.status}": config.bot.status,
                    "{bot.ping}": bot.ws.ping + "ms",
                    "{bot.uptime}": require("./base").msToTime(bot.uptime),
                    "{bot.cmdCount}": fs.readdirSync(__dirname + '/../commands').filter(file => file.endsWith('.js')).length,
                    "{server.name}": config.server.name,
                    "{server.type}": config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1),
                    "{server.ip}": config.server.ip,
                    "{server.port}": config.server.port,
                    "{server.icon}": config.server.icon,
                    "{server.version}": config.server.version,
                    "{server.vote}": config.server.vote
                };

                for (const v in variables["1"]) {
                    const o = variables["1"][v];
                    s = s.replaceAll(v, o);
                }
            }
            if (s.includes("{status.")) {
                let status;
                if (config.server.type === "java") status = await util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`);
                else status = await util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`);
                status = status.data;
                if (status.online) {
                    variables["2"] = {
                        "{status.version}": config.settings.removeServerType ? removeVersion(status.version.name_clean).charAt(0).toUpperCase() + removeVersion(status.version.name_clean).slice(1) : status.version.name_clean,
                        "{status.playersOnline}": status.players.online,
                        "{status.playersMax}": status.players.max,
                        "{status.playerList}": status.players.list.map(p => t.commands.list.listFormat.replaceAll("{playerName}", p.name_clean)).join('\r' + t.commands.list.listSplit),
                        "{status.motd}": status.motd.clean
                    };
                } else {
                    variables["2"] = {
                        "{status.version}": config.server.version,
                        "{status.playersOnline}": "?",
                        "{status.playersMax}": "?",
                        "{status.playerList}": "",
                        "{status.motd}": "?"
                    };
                }

                for (const v in variables["2"]) {
                    const o = variables["2"][v];
                    s = s.replaceAll(v, o);
                }
            }
            if (s.includes("{bot.name}")) {
                variables["3"] = {
                    "{bot.name}": (await g.members.fetch(bot.user.id)).displayName
                };

                for (const v in variables["3"]) {
                    const o = variables["3"][v];
                    s = s.replaceAll(v, o);
                }
            }
            if (s.includes("{guild.")) {
                variables["4"] = {
                    "{guild.membersAll}": g.memberCount,
                    "{guild.botsCount}": await (await g.members.fetch({ time: 30000 })).filter(m => m.user.bot).size,
                    "{guild.channels}": (await g.channels.fetch()).size
                };

                for (const v in variables["4"]) {
                    const o = variables["4"][v];
                    s = s.replaceAll(v, o);
                }
            }
        } catch (err) {
            console.log(err);
        }

        return await s;
    }
};