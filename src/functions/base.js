const fs = require('fs');

module.exports = {
    removeVersion(string) {
        const serverVersions = [
            "airplane", "akarin", "bukkit", "bungeecord", "cardboard",
            "cleanstone", "craftbukkit", "cuberite", "cuberite", "empirecraft", "fabric",
            "flexpipe", "forge", "geyser", "glowstone", "hexacord", "kettle", "lava",
            "lavabukkit", "leafish", "magma", "mohist", "nukkit", "paper", "purpur",
            "sonarlint", "spigot", "tacospigot", "travertine", "velocity", "velocity",
            "waterfall", "yatopia"
        ];
        serverVersions.forEach(function (el) {
            string = string.toLocaleLowerCase().replaceAll(`${el} `, "");
        });
        return string;
    },

    readyScan(bot, server) {
        const chalk = require('chalk'),
            util = require('axios'),
            gr = chalk.green.bold,
            bold = chalk.bold,
            bl = chalk.blue.bold,
            warn = chalk.keyword('yellow').bold,
            processInfo = chalk.cyan.bgBlack,
            { warns } = bot;

        if (server.type === 'java') {
            util.get(`https://api.mcstatus.io/v2/status/java/${server.ip}:${server.port}`)
                .then((response) => {
                    if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
                    console.log(`${bot.emotes.success} Successfully located ${gr(server.type.toUpperCase())} server ${gr(server.ip)}!\n` + "   " + gr('Server info:\n')
                        + "   " + gr('| ') + bold('IP:      ') + bl(`${server.ip}:${response.data.port ? response.data.port : server.port}\n`)
                        + "   " + gr('| ') + bold('VERSION: ') + bl(`${response.data.version.name_clean ? response.data.version.name_clean : 'unknown'}\n`)
                        + "   " + gr('| ') + bold('PLAYERS: ') + bl(`${response.data.players.online ? response.data.players.online : '0'}` + '/' + `${response.data.players.max ? response.data.players.max : '0'}`)
                    );
                    console.log(processInfo('>> minecraft-bot working <<'));
                })
                .catch((error) => {
                    if (warns) console.log(`${bot.emotes.warn} ` + warn(`Could not find ${server.type} server ${server.ip} with port ${server.port}! Error:\n`) + error);
                    console.log(processInfo('>> minecraft-bot working <<'));
                });
        } else if (server.type === 'bedrock') {
            util.get(`https://api.mcstatus.io/v2/status/bedrock/${server.ip}:${server.port}`)
                .then((response) => {
                    if (!response.data.online) throw new Error(`Server ${server.ip}:${server.port} was not found!`);
                    console.log(`${bot.emotes.success} Successfully located ${gr(server.type.toUpperCase())} server ${gr(server.ip)}!\n` + "   " + gr('| Server info:\n')
                        + "   " + gr('| ') + bold('IP:      ') + bl(`${server.ip}:${response.data.port ? response.data.port : server.port}\n`)
                        + "   " + gr('| ') + bold('VERSION: ') + bl(`${response.data.version.name_clean ? response.data.version.name_clean : 'unknown'}\n`)
                        + "   " + gr('| ') + bold('PLAYERS: ') + bl(`${response.data.players.online ? response.data.players.online : '0'}` + '/' + `${response.data.players.max ? response.data.players.max : '0'}`)
                    );
                    console.log(processInfo('>> minecraft-bot working <<'));
                })
                .catch((error) => {
                    if (warns) console.log(`${bot.emotes.warn} ` + (`Could not find ${server.type} server ${server.ip} with port ${server.port}! Error:\n`) + error);
                    console.log(processInfo('>> minecraft-bot working <<'));
                });
        }
    },

    createDataJson(dev) {
        if (!dev && !fs.existsSync(__dirname + '/../../config/data.json')) {
            try { fs.writeFileSync(__dirname + "/../../config/data.json", "{}"); }
            catch (err) { console.log("Could not create the config/data.json file! Error:\n" + err); }
        }

        if (dev && !fs.existsSync(__dirname + '/../../config/dev-data.json')) {
            try { fs.writeFileSync(__dirname + "/../../config/dev-data.json", "{}"); }
            catch (err) { console.log("Could not create the config/dev-data.json file! Error:\n" + err); }
        }
    },

    async getSlashID(bot, name) {
        const map = await bot.application.commands.fetch();
        const cmd = await [...map.values()].find(e => e.name === name);
        if (cmd) {
            return cmd.id;
        } else {
            return undefined;
        }
    },

    msToTime(ms) {
        let s = Math.floor((ms / 1000) % 60),
            min = Math.floor((ms / (1000 * 60)) % 60),
            h = Math.floor((ms / (1000 * 60 * 60)));

        if (h === 0) h = "";
        else h = h + "h";

        if (min === 0) min = "";
        else min = min + "min";

        if (!h && !min) {
            s = s + "s";
            return s;
        } else {
            return !!h ? (h + " " + min) : (min);
        }
    }
};