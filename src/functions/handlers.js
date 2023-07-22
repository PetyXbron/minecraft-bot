const fs = require('fs'),
    { REST, Routes } = require('discord.js');

module.exports = {
    events(bot) {
        const eventsFolder = fs.readdirSync(__dirname + '/../events').filter(file => file.endsWith('.js'));
        for (const file of eventsFolder) {
            const eventFile = require(__dirname + `/../events/${file}`);
            const event = file.split(".")[0];
            bot.on(event, eventFile.bind(null, bot));
        };
    },

    commands(bot) {
        const config = bot.config;
        let slashCommands = [];
        const commandsFolder = fs.readdirSync(__dirname + '/../commands').filter(file => file.endsWith('.js'));
        for (const file of commandsFolder) {
            const commandFile = require(__dirname + `/../commands/${file}`);
            const command = file.split(".")[0];
            function registerCommand(cmd, cmdFile) {
                if (cmdFile.config.enableChat) {
                    bot.commands.set(cmd, cmdFile);
                    cmdFile.config.aliases.forEach(alias => {
                        bot.aliases.set(alias, cmd);
                    });
                }

                if (cmdFile.config.enableSlash) {
                    bot.slashes.set(cmd, cmdFile);
                    slashCommands.push(cmdFile.slash.toJSON());
                }
            }

            if (command !== "list") {
                registerCommand(command, commandFile);
            } else if (bot.config.server.type === "java") {
                registerCommand(command, commandFile);
            }
        };;

        if (config.settings.commands.enableSlash) {
            bot.once('ready', async (bot) => {
                const rest = new REST().setToken(bot.token);

                try {
                    await rest.put(
                        Routes.applicationCommands(bot.user.id),
                        { body: slashCommands },
                    );
                } catch (err) {
                    console.log(err);
                };
            });
        }
    }
};