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
            { warns } = bot

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
    }
};