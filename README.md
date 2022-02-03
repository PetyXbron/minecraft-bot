## [DOCUMENTATION HERE 🔗](https://petyxbron.gitbook.io/minecraft-bot/installation)

# Custom Discord Minecraft bot
### *Get info about your minecraft server with this Discord bot!*

[![Repo stars](https://img.shields.io/github/stars/PetyXbron/minecraft-bot?style=flat&logo=github&labelColor=232121&color=blue&label=Stars)](https://github.com/PetyXbron/minecraft-bot/stargazers) [![Repo forks](https://img.shields.io/github/forks/PetyXbron/minecraft-bot?style=flat&logo=github&labelColor=232121&color=blue&label=Forks)](https://github.com/PetyXbron/minecraft-bot/network) [![Repo license](https://img.shields.io/github/license/PetyXbron/minecraft-bot?style=flat&logo=github&labelColor=232121&color=blue&label=License)](https://github.com/PetyXbron/minecraft-bot/blob/main/LICENSE)

This code uses **Minecraft server util package** for getting status of Minecraft servers
* minecraft-server-util package
  * [Github Repository](https://github.com/PassTheMayo/minecraft-server-util)
  * [npmjs Package](https://www.npmjs.com/package/minecraft-server-util)
  * [Author Github Profile](https://github.com/PassTheMayo)

## WHAT CAN THIS BOT DO?

- **Fully customizable [config](config.js)**
- Working **commands** with **custom prefix** + their **[slash commands]((https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ))**
    - `ip` command for getting IP address of server
    - `list` command for getting actual list of online players now
    - `status` command for getting simple and clear overview of server
    - `version` command for getting Minecraft version of server
    - `vote` command for getting vote link for voting for server on Minecraft server list
- **Auto updating bot's status** with online and max players (setup in config with variables)

  ![Auto updating bot status](https://i.imgur.com/xNDVb2D.png)
  ![Bot status config variables](https://i.imgur.com/7TXaWTC.png)
- More Discord bot activites: `playing`, `listening`, `watching` and `competing`
- **Poll/Voting channel** with reactions

  ![Voting channel](https://4254518267-files.gitbook.io/~/files/v0/b/gitbook-28427.appspot.com/o/assets%2F-MbqA4Jea2-IO37rpuOb%2F-MejM8GdpoTFx3MovYuy%2F-MejY9Dg6WsJ5LJ7qIVO%2Fvoting-channel.gif?alt=media&token=2a1d71d6-7544-4ba4-a6ff-f468872121c6)
- Custom responses for each command, editable in [config file](config.js)
- **Auto updating status message** with player list

  ![Auto status messsage](https://i.imgur.com/L6gFK4Q.png)
- **Random** RGB **color of command embeds** (each message another)

  ![Random embed color](https://i.imgur.com/pA7h5rC.png)
- **Clear colorful console** logging

  ![minecraft-bot console](https://i.imgur.com/N17AfDn.png)

## HOW TO USE & INSTALL

### Go to our [documentation](https://petyxbron.gitbook.io/minecraft-bot/installation/install) and see.
[![Run on Repl.it](https://repl.it/badge/github/MrMazzone/dotreplit-example)](https://repl.it/github/PetyXbron/minecraft-bot)
*Repl will not be updated for node v16. (not needed with version [1.1.5](https://github.com/PetyXbron/minecraft-bot/commit/a14fe3024b561a2b5516fb2390431f6650afe8b9) and lower)*

## TO DO

- [x] <s>Auto changing status message</s>
- [x] <s>Status command</s>
- [x] <s>IP address command</s>
- [x] <s>Minecraft version command</s>
- [x] <s>Player list command</s>
- [x] <s>Vote link command</s>
- [x] <s>Poll/Voting channel with reactions</s>
- [x] <s>Slash commands</s>
- [x] <s>Custom reply for ip, test and version command</s>
- [x] <s>Installation with repl.it</s>
- [x] <s>More text languages (or custom)</s>
- [x] <s>Bot status (activity) for players online number</s>
- [x] <s>Get invite link on bot start (available option in config)</s>
- [ ] Poll/Voting command (simple or with more options)
- [ ] Help command with all commands listing
- [ ] Server AdminTeam applications
- [ ] Send custom embed message command
- [ ] Send custom message/announcement command
- [ ] Better test command variables (more process info - like uptime)