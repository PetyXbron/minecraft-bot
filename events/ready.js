const chalk = require('chalk')

module.exports = async bot => {
    if(bot.status) {
        bot.user.setActivity(bot.status, {type: bot.activity}) //Sets bot activity
    }

    if(bot.type === 'java')

    console.log("✅ " + bot.user.username + chalk.green(" is now working"))
}