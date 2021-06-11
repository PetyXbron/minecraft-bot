const chalk = require('chalk'),
util = require('minecraft-server-util'),
gr = chalk.keyword('green').bold,
bl = chalk.keyword('blue'),
warn = chalk.keyword('yellow').bold

module.exports = async (bot) => {
    const {server} = bot
    if(bot.status) {
        try {
            bot.user.setActivity(bot.status, {type: bot.activity}) //Sets bot activity
            console.log('✅ Successfully set status to ' + gr(`${bot.activity.toLowerCase()} ${bot.status}`))
        } catch(e) {
            console.log()
        }
    }

    if(bot.server && server.type === 'java') {
        util.status(server.ip, { port: server.port })
            .then((response) => {
                console.log(`✅ Successfully located server ${gr(server.ip)}!\n` + chalk.blue.bold('Server info:\n')
                + bl('IP:	 ') +  `${server.ip}:${response.port ? response.port : server.port}\n`
                + bl('VERSION: ') + `${response.version ? response.version : 'unknown'}\n`
                + bl('PLAYERS: ') + gr(`${response.onlinePlayers ? response.players : '0'}`) + '/' + gr(`${response.maxPlayers ? response.maxPlayers : '0'}`)
                )
            })
            .catch((error) => {
                console.log(warn(`Could not find ${server.type} server ${server.ip} with port ${server.port}! Error:\n`) + error)
            });
    }

    console.log("✅ " + gr(bot.user.username) + " is now working")
}