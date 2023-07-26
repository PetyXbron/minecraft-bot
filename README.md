### [🔗 PROJECT DOCUMENTATION](https://mb.petyxbron.cz)
### [🔗 DOWNLOAD LATEST MASTER VERSION .ZIP](https://github.com/PetyXbron/minecraft-bot/archive/refs/heads/master.zip)
### [🔗 JOIN DISCORD SUPPORT SERVER](https://dsc.gg/azator)
### [🔗 TROUBLESHOOTING GUIDE](https://mb.petyxbron.cz/fix)

**Consider using the [`dev`](https://github.com/PetyXbron/minecraft-bot/tree/dev) version with the newest features and bug fixes!**
# <img src="https://imgur.com/2L1l0lk.png" width="40" height="40"/>Custom Discord Minecraft bot<img src="https://imgur.com/2L1l0lk.png" width="40" height="40"/>
### *Get info about your Minecraft server with this Discord bot!*

[![Repo stars](https://img.shields.io/github/stars/PetyXbron/minecraft-bot?style=flat&logo=github&labelColor=232121&color=24B712&label=Stars)](https://github.com/PetyXbron/minecraft-bot/stargazers) [![Repo forks](https://img.shields.io/github/forks/PetyXbron/minecraft-bot?style=flat&logo=github&labelColor=232121&color=24B712&label=Forks)](https://github.com/PetyXbron/minecraft-bot/network) [![Latest master version](https://img.shields.io/github/package-json/version/PetyXbron/minecraft-bot?color=24B712&label=Master&labelColor=232121&logo=github&sort=semver&style=flat)](https://github.com/PetyXbron/minecraft-bot/tree/main/) [![Latest dev version](https://img.shields.io/github/package-json/version/PetyXbron/minecraft-bot/dev?color=24B712&label=Dev&labelColor=232121&logo=github&sort=semver&style=flat)](https://github.com/PetyXbron/minecraft-bot/tree/dev/) [![Repo license](https://img.shields.io/github/license/PetyXbron/minecraft-bot?style=flat&logo=github&labelColor=232121&color=24B712&label=License)](https://github.com/PetyXbron/minecraft-bot/blob/main/LICENSE) [![Languages](https://img.shields.io/badge/5-24B712?style=flat&logo=crowdin&labelColor=232121&label=Languages)](https://github.com/PetyXbron/minecraft-bot/blob/main/LICENSE)

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

- **Fully customizable [config](config/main.js) and [translations](translations)**
- Already **5 translated languages** by the community available ![cs_CZ](https://img.shields.io/badge/%F0%9F%87%A8%F0%9F%87%BF-24B712
) ![es_ES](https://img.shields.io/badge/%F0%9F%87%AA%F0%9F%87%B8-24B712
) ![id_ID](https://img.shields.io/badge/%F0%9F%87%AE%F0%9F%87%A9-24B712
) ![pt_BR](https://img.shields.io/badge/%F0%9F%87%A7%F0%9F%87%B7-24B712
) ![pt_PT](https://img.shields.io/badge/%F0%9F%87%B5%F0%9F%87%B9-24B712
)
- Working **commands** with **custom prefix** + their **[slash commands]((https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ))**
    - `help` - useful information about the bot with all command list
    - `ip` - IP address of the server
    - `list` - list of players online on the server right now (only for JAVA)
    - `status` - a basic overview of the server right now
    - `version` - Minecraft version of the server
    - `vote` - URl link for voting for server on Minecraft server list

    Any of the commands can be disabled if wanted.
- **Auto updating bot's status** with online and max players (set up in the [config](config/main.js) with variables)

  ![Auto updating bot status](https://imgur.com/4D8W8lT.png)
  ![Bot status config variables](https://i.imgur.com/7TXaWTC.png)
- More Discord bot activities: `playing`, `listening`, `watching`, and `competing`
- More Discord bot statuses: `online`, `idle`, `dnd`, and `invisible`
- **Auto updating status message** with player list

  ![StatusCH](https://i.imgur.com/1QzmoZu.png)
- **Random** RGB **color of command embeds** (each message another)

  ![Random embed color](https://i.imgur.com/pA7h5rC.png)
- **Clear colorful console** logging

  ![minecraft-bot console](https://imgur.com/IqtzdM1.png)
- **Suggestions/voting channel** with reactions and threads

  ![VotingCH](https://i.imgur.com/OfCxqhf.gif)
- **Images/screenshots channel** with reactions and threads

  ![ImagesCH](https://i.imgur.com/AGmRGiH.gif)

## TRANSLATIONS

![Crowdin translations](https://badges.awesome-crowdin.com/translation-14273210-603419-update.png)

## TO DO

- [ ] Send a custom message/announcement command
- [ ] Poll/Voting command (simple or with more options)
- [x] <s>Language system</s>
- [x] <s>Better test command variables (more process info - like uptime)</s>
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