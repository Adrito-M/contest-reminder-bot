const { MessageEmbed } = require("discord.js")
const emoji = require('./emojiHandler')
const timeanddatelink = require('./timeanddatelink')

module.exports = async (client, contest, mode) => {

    const modeMap = new Map()
    modeMap[1] = 'STARTING IN 8 HOURS'
    modeMap[2] = 'STARTING IN 1 HOUR'
    modeMap[3] = 'STARTING IN 30 MINS'
    modeMap[4] = 'STARTING IN 5 MINS'

    const emb = new MessageEmbed

    emb.setAuthor(`${await emoji.getEmoji(client, contest.website)} ${contest.website.toUpperCase()}`)
    emb.setTitle(`${modeMap[mode]}`)
    emb.setDescription(`[${contest.contestName}](${contest.contestLink})`)
    emb.addField('Contest Start Time', `[${contest.contestStartTime.toUTCString()}](${timeanddatelink(contest.contestStartTime)})`, true)
    emb.addField('Duration', `${contest.contestDurationInMins} minutes`, true)
    if (contest.website == 'codeforces' || contest.website == 'atcoder')
        emb.addField('Type', `${contest.contestType}`, true)
    if (contest.website == 'atcoder')
        emb.addField('Rated for', `${contest.ratedFor}`)
    
    return emb
}