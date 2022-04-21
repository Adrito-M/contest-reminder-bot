# Contest Reminder Bot

This is a Discord Bot that sends reminders for upcoming contests from [codeforces](codeforces.com), [codechef](codechef.com), [atcoder](atcoder.jp), [leetcode](leetcode.com) so that you need not keep track of that. You can choose yourself which sites to receive updates from. Data is obtained either from APIs or by scraping the web pages.

## TechStack Used:
- [ ] nodejs
- [ ] express (so the the bot can be pinged and kept alive)
- [ ] discord.js
- [ ] MongoDB / mongoose
- [ ] axios
- [ ] cheerio
- [ ] node-cron

*Github Link: https://github.com/Adrito-M/Debugit_2022*

## Instructions:

To clone the project:
```bash
$ git clone https://github.com/Adrito-M/Debugit_2022.git
$ cd Debugit_2022
```
To test the bot for yourself, create a `.env` file in accordance with `.env_sample` file. Provide your Discord Bot Token in `TOKEN` and a MongoDB URI in `MONGO_URI`.

For slash commands to register quickly in a test server, provide the server ID in `DEVELOPEMENT_GUILD_ID` and uncomment the following lines:

- In `commands/commands.js`, `commands/help.js`, `commands/setup.js`:

```javascript
testOnly: true,
```

- In `bot.js`:

```javascript
testServers: process.env.DEVELOPEMENT_GUILD_ID,
```

Run the bot with 
```bash
$ node bot.js
```

## Available Commands:

- #### `/help` or `r!help`
    Shows the help message. The help message is shown by default when the bot joins a new Server.

    ![Screenshot of /help](./lib/help.png, 'help')

- #### `/commands` or `r!commands`
    Shows available commands.

    ![Screenshot of /commands](./lib/commands.png, 'commands')

- #### `/setup` or `r!setup`
    Asks which websites to set reminders for. Creates a channel `contest-reminder` to send reminders in that channel. After creation, the channel can be renamed or moved around. If the channel is deleted, or the preferences need to be changed, run `/setup` again.

    ![Screenshot of /setup](./lib/setup.png, 'setup')

## Demo: