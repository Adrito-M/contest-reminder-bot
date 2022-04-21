require('dotenv').config()

const idMap = new Map()
idMap.set('codeforces','966437591756988507')
idMap.set('codechef','966437897970516049')
idMap.set('atcoder','966438951474839572')
idMap.set('leetcode','966439174116872233')

module.exports = {
    getEmoji: async (client, arg) => {
        const emojis = await client.guilds.fetch(process.env.DEVELOPEMENT_GUILD_ID).then(guild => guild.emojis)
        return await emojis.fetch(idMap.get(arg))
    }
}