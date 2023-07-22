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

    normals(bot) {
        const { commands, server } = bot.config;
        const commandsFolder = fs.readdirSync(__dirname + '/../commands').filter(file => file.endsWith('.js'));
        for (const file of commandsFolder) {
            const commandFile = require(__dirname + `/../commands/${file}`);
            const command = file.split(".")[0];
            function registerCommand(cmd, cmdFile) {
                bot.commands.set(cmd, cmdFile);
                cmdFile.config.aliases.forEach(alias => {
                    bot.aliases.set(alias, cmd);
                });
            }

            if (!commands[command] || !!commands[command] && !!commands[command].enableNormal || !!commandFile.config.enable) {
                if (command !== "list") {
                    registerCommand(command, commandFile);
                } else if (server.type === "java") {
                    registerCommand(command, commandFile);
                }
            }
        };;
    },

    slashes(bot) {
        const { commands, server } = bot.config;
        if (commands.enableSlashes) {
            let slashCommands = [];
            const slashCommandsFolder = fs.readdirSync(__dirname + '/../slashes').filter(file => file.endsWith('.js'));
            for (const file of slashCommandsFolder) {
                const commandFile = require(__dirname + `/../slashes/${file}`);
                const slashCommand = file.split(".")[0];
                function registerSlashCommand(cmd, cmdFile) {
                    bot.slashes.set(cmd, cmdFile);
                    slashCommands.push(cmdFile.data.toJSON());
                }

                if (!commands[slashCommand] || !!commands[slashCommand] && !!commands[slashCommand].enableSlash) {
                    if (slashCommand !== "list") {
                        registerSlashCommand(slashCommand, commandFile);
                    } else if (server.type === "java") {
                        registerSlashCommand(slashCommand, commandFile);
                    }
                }
            };

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