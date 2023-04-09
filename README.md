## [🔗 DOCUMENTATION HERE](https://petyxbron.gitbook.io/minecraft-bot/installation)
## [🔗 DOWNLOAD LATEST MAIN .ZIP](https://github.com/PetyXbron/minecraft-bot/archive/refs/heads/main.zip)
## [🔗 JOIN DISCORD SUPPORT SERVER](https://discord.com/invite/PYTqqhWad2)

# <img src="https://imgur.com/2L1l0lk.png" width="40" height="40"/>Custom Discord Minecraft bot<img src="https://imgur.com/2L1l0lk.png" width="40" height="40"/>
### *Get info about your Minecraft server with this Discord bot!*

[![Repo stars](https://img.shields.io/github/stars/PetyXbron/minecraft-bot?style=flat&logo=github&labelColor=232121&color=blue&label=Stars)](https://github.com/PetyXbron/minecraft-bot/stargazers) [![Repo forks](https://img.shields.io/github/forks/PetyXbron/minecraft-bot?style=flat&logo=github&labelColor=232121&color=blue&label=Forks)](https://github.com/PetyXbron/minecraft-bot/network) [![Latest Version](https://img.shields.io/github/package-json/v/PetyXbron/minecraft-bot?color=blue&label=Version&labelColor=232121&logo=github&sort=semver&style=flat)](https://github.com/PetyXbron/minecraft-bot/tree/main/) [![Repo license](https://img.shields.io/github/license/PetyXbron/minecraft-bot?style=flat&logo=github&labelColor=232121&color=blue&label=License)](https://github.com/PetyXbron/minecraft-bot/blob/main/LICENSE)

**This project uses MSC API ([mcstatus.io](https://mcstatus.io)) for getting status of Minecraft servers.**

## REQUIREMENTS
- **Need to install:**
    - [Node.js](https://nodejs.org/en/about) v16.9.0 or higher *([download here](https://nodejs.org/en/download))*
    - [NPM](https://docs.npmjs.com/about-npm) (automatically installs with Node.js)
- **Recommended to:**
    - Install IDE for editing files ([Visual Studio Code](https://code.visualstudio.com/) recommended)
- **How to use?**
    1. Edit the [`config.js`](config.js) and [`data.json`](data.json) files
    2. Use the command `npm install` before running to install all required dependencies (or use *"install-cmd"* in the [`package.json`](package.json) file)
    3. Use `npm start` or `node index.js` to run the project

## WHAT CAN THIS BOT DO?

- **Fully customizable [config](config.js)**
- Working **commands** with **custom prefix** + their **[slash commands]((https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ))**
    - `help` command for getting the help menu (list of all user-available commands)
    - `ip` command for getting the IP address of the server
    - `list` command for getting an actual list of online players now
    - `status` command for getting a simple and clear overview of the server
    - `version` command for getting the Minecraft version of the server
    - `vote` command for getting vote link for voting for server on Minecraft server list
- **Auto updating bot's status** with online and max players (setup in the config with variables)

  ![Auto updating bot status](https://imgur.com/4D8W8lT.png)
  ![Bot status config variables](https://i.imgur.com/7TXaWTC.png)
- More Discord bot activities: `playing`, `listening`, `watching`, and `competing`
- More Discord bot statuses: `online`, `idle`, `dnd`, and `invisible`
- **Suggestions/voting channel** with reactions and threads

  ![Voting channel](https://i.imgur.com/OfCxqhf.gif)
- Custom responses for each command, editable in [the config file](config.js)
- **Auto updating status message** with player list

  ![Auto status messsage](https://imgur.com/gSAUIh5.png)
- **Random** RGB **color of command embeds** (each message another)

  ![Random embed color](https://i.imgur.com/pA7h5rC.png)
- **Clear colorful console** logging

  ![minecraft-bot console](https://imgur.com/IqtzdM1.png)

## MORE INFO

### Go to our [documentation](https://petyxbron.gitbook.io/minecraft-bot/installation/install) and see.
Run on Repl.it:

[![Run on Repl.it](https://repl.it/badge/github/MrMazzone/dotreplit-example)](https://repl.it/github/PetyXbron/minecraft-bot)

*Repl probably won't be updated for the latest Node.js version. Please check if you can install Node.js v16.9.0 or higher to support Discord.js v14*

## TO DO

- [ ] Send custom embed message command
- [ ] Send a custom message/announcement command
- [ ] Better test command variables (more process info - like uptime)
- [ ] Poll/Voting command (simple or with more options)
- [x] <s>Auto changing statusCH message</s>
- [x] <s>Status command</s>
- [x] <s>IP address command</s>
- [x] <s>Minecraft version command</s>
- [x] <s>Player list command</s>
- [x] <s>Vote link command</s>
- [x] <s>Poll/Voting channel with reactions</s>
- [x] <s>Slash commands</s>
- [x] <s>Installation with repl.it</s>
- [x] <s>More text languages (or custom)</s>
- [x] <s>Bot status (activity) for players online number</s>
- [x] <s>Get invite link on bot start (available option in config)</s>
- [x] <s>Help command with all commands listing</s>
- [x] And many other unlisted things 😉