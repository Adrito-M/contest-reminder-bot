const {Client, Intents} = require('discord.js')
const WOKCommands = require('wokcommands')
const path = require('path')
const help = require('./help')
const cron = require('node-cron')
const checkContestStatus = require('./schedule_check')

require('dotenv').config()

const client = new Client({
	intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
})

client.on('ready', async () => {
    console.log(`Logged on as ${client.user.tag}`)
	new WOKCommands(client, {
		commandsDir: path.join(__dirname, 'commands'),
        mongoUri: process.env.MONGO_URI,
        testServers: process.env.DEVELOPEMENT_GUILD_ID
	}).setDefaultPrefix('r!')

    cron.schedule('*/3 * * * *', () => {
        checkContestStatus()
    });
})


client.on('guildCreate', async(guild) => {
    const channels = await guild.channels.fetch().then(channels => channels.filter(c => c.type === 'GUILD_TEXT'))
    const general = channels.find(c => c.name.toLowerCase() == 'general')
    if (general) {
        general.send(help.help())
    } else {
        channels.random().send(help.help())
    }
})

client.login(process.env.TOKEN)