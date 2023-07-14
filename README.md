### [🔗 PROJECT DOCUMENTATION](https://mb.petyxbron.cz)
### [🔗 DOWNLOAD LATEST MASTER VERSION .ZIP](https://github.com/PetyXbron/minecraft-bot/archive/refs/heads/master.zip)
### [🔗 JOIN DISCORD SUPPORT SERVER](https://dsc.gg/azator)
### [🔗 TROUBLESHOOTING GUIDE](https://mb.petyxbron.cz/fix)

**Consider using the [`dev`](https://github.com/PetyXbron/minecraft-bot/tree/dev) version with the newest features and bug fixes!**
# <img src="https://imgur.com/2L1l0lk.png" width="40" height="40"/>Custom Discord Minecraft bot<img src="https://imgur.com/2L1l0lk.png" width="40" height="40"/>
### *Get info about your Minecraft server with this Discord bot!*

[![Repo stars](https://img.shields.io/github/stars/PetyXbron/minecraft-bot?style=flat&logo=github&labelColor=232121&color=24B712&label=Stars)](https://github.com/PetyXbron/minecraft-bot/stargazers) [![Repo forks](https://img.shields.io/github/forks/PetyXbron/minecraft-bot?style=flat&logo=github&labelColor=232121&color=24B712&label=Forks)](https://github.com/PetyXbron/minecraft-bot/network) [![Latest master version](https://img.shields.io/github/package-json/version/PetyXbron/minecraft-bot?color=24B712&label=Master&labelColor=232121&logo=github&sort=semver&style=flat)](https://github.com/PetyXbron/minecraft-bot/tree/main/) [![Latest dev version](https://img.shields.io/github/package-json/version/PetyXbron/minecraft-bot/dev?color=24B712&label=Dev&labelColor=232121&logo=github&sort=semver&style=flat)](https://github.com/PetyXbron/minecraft-bot/tree/dev/) [![Repo license](https://img.shields.io/github/license/PetyXbron/minecraft-bot?style=flat&logo=github&labelColor=232121&color=24B712&label=License)](https://github.com/PetyXbron/minecraft-bot/blob/main/LICENSE)

**This project uses MSC API ([mcstatus.io](https://mcstatus.io)) for getting status of Minecraft servers.**

## REQUIREMENTS
- **Need to install:**
    - [Node.js](https://nodejs.org/en/about) v16.9.0 or higher *([download here](https://nodejs.org/en/download))*
    - [NPM](https://docs.npmjs.com/about-npm) (automatically installs with Node.js)
- **Recommended to:**
    - Install IDE for editing files ([Visual Studio Code](https://code.visualstudio.com/) recommended)
- **How to use?**
    1. Edit the [`config/main.js`](config/main.js) and [`config/token.json`](config/token.json) files
    2. Use the command `npm install` before running to install all required dependencies (or use *"install-cmd"* in the [`package.json`](package.json) file)
    3. Use `npm start` or `node index.js` to run the project

## WHAT CAN THIS BOT DO?

- **Fully customizable [config](config/main.js)**
- Working **commands** with **custom prefix** + their **[slash commands]((https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ))**
    - `help` command for getting the help menu (list of all user-available commands)
    - `ip` command for getting the IP address of the server
    - `list` command for getting list of players online right now (available only for JAVA servers)
    - `status` command for getting a simple and clear overview of the server
    - `version` command for getting the Minecraft version of the server
    - `vote` command for getting vote link for voting for server on Minecraft server list
- **Auto updating bot's status** with online and max players (setup in the [config](config/main.js) with variables)

  ![Auto updating bot status](https://imgur.com/4D8W8lT.png)
  ![Bot status config variables](https://i.imgur.com/7TXaWTC.png)
- More Discord bot activities: `playing`, `listening`, `watching`, and `competing`
- More Discord bot statuses: `online`, `idle`, `dnd`, and `invisible`
- **Auto updating status message** with player list

  ![Auto status messsage](https://imgur.com/gSAUIh5.png)
- **Random** RGB **color of command embeds** (each message another)

  ![Random embed color](https://i.imgur.com/pA7h5rC.png)
- **Clear colorful console** logging

  ![minecraft-bot console](https://imgur.com/IqtzdM1.png)
- **Suggestions/voting channel** with reactions and threads

  ![Voting channel](https://i.imgur.com/OfCxqhf.gif)
- **Images/screenshots channel** with reactions and threads

  ![Images channel](https://i.imgur.com/AGmRGiH.gif)

## TO DO

- [ ] Language system
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