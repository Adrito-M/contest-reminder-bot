const { MessageEmbed } = require("discord.js")
const timeanddatelink = require('./timeanddatelink')

module.exports = (contest, mode) => {

    const modeMap = new Map()
    modeMap[1] = 'Starting in 8 hours'
    modeMap[2] = 'Starting in 1 hour'
    modeMap[3] = 'Starting in 30 mins'
    modeMap[4] = 'Starting in 5 mins'

    const emb = new MessageEmbed
    emb.setColor('AQUA')
    emb.setAuthor({name: `${contest.website}`, iconURL: `${process.env.SERVER_URL}/${contest.website}.png`})
    emb.setTitle(`${modeMap[mode]}`)
    emb.setDescription(`[${contest.contestName}](${contest.contestLink})`)
    emb.addField('Contest Start Time', `[${contest.contestStartTime.toUTCString()}](${timeanddatelink(contest.contestStartTime)})`)
    emb.addField('Duration', `${contest.contestDurationInMins} minutes`, true)
    if (contest.website == 'codeforces' || contest.website == 'atcoder')
        emb.addField('Type', `${contest.contestType}`, true)
    if (contest.website == 'atcoder')
        emb.addField('Rated for', `${contest.ratedFor}`, true)
    
    return emb
}