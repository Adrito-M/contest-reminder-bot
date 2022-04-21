const cf = require('./utils/codeforces')
const cc = require('./utils/codechef')
const ac = require('./utils/atcoder')
const lc = require('./utils/leetcode')

const channelDB = require('./Schemas/channelSchema')
const contestDB = require('./Schemas/contestSchema')

const embedder = require('./utils/createEmbed')


async function main(client) {
    let platforms = [cf, cc, ac, lc]
    let contests = []
    let stuffToBroadcast = []

    for (let platform of platforms) {
        contests = contests.concat(await platform.getData())
    }

    for (let contest of contests) {
        if (!(await contestDB.exists({_id: contest.contestLink}))) {
            await contestDB.create({
                _id: contest.contestLink,
                website: contest.website,            
                contestName: contest.contestName,
                contestType: contest.contestType,
                contestStartTime: contest.contestStartTime,
                contestDurationInMins: contest.contestDurationInMins,            
                ratedFor: contest.ratedFor,
            }).then(entry => entry.save())
        }

        const contestEntry = await contestDB.findById(contest.contestLink)
        // console.log(contestEntry)
        // console.log(contestEntry.notiSentFor8hrs)
        // console.log(contest.contestStartTime.getTime())
        // console.log(contest.contestStartTime.getTime() - new Date().getTime)
        if (!contestEntry.notiSentFor8hrs && contest.contestStartTime.getTime() - new Date().getTime() <=28860000) {
            stuffToBroadcast.push(embedder(contest, 1))
            contestEntry.notiSentFor8hrs = true
        }

        if (!contestEntry.notiSentFor1hr && contest.contestStartTime.getTime() - new Date().getTime() <=3660000) {
            stuffToBroadcast.push(embedder(contest, 2))
            contestEntry.notiSentFor1hr = true
        }

        if (!contestEntry.notiSentFor30mins && contest.contestStartTime.getTime() - new Date().getTime() <=1860000) {
            stuffToBroadcast.push(embedder(contest, 3))
            contestEntry.notiSentFor30mins = true
        }

        if (!contestEntry.notiSentFor5mins && contest.contestStartTime.getTime() - new Date().getTime() <=360000) {
            stuffToBroadcast.push(embedder(contest, 4))
            contestEntry.notiSentFor5mins = true
        }

        if (contestEntry.notiSentFor8hrs &&
            contestEntry.notiSentFor1hr &&
            contestEntry.notiSentFor30mins &&
            contestEntry.notiSentFor5mins &&
            contest.contestStartTime.getTime() < new Date().getTime()) {
            await contestDB.findByIdAndDelete(contest.contestLink)
        } else {
            await contestEntry.save()
        }
    }
    // console.log(stuffToBroadcast)
    const guildEntries = await channelDB.find()
    let channelIds = []
    let preferences = []
    let invalidChannels = []
    for (let guildEntry of guildEntries) {
        channelIds.push(guildEntry.defaultChannel)
        preferences.push(guildEntry.preferences)
    }
    for (let i in channelIds) {
        try {
            let channel = await client.channels.fetch(channelIds[i])
            for (let emb of stuffToBroadcast) {
                if (emb.author.name.includes('leetcode') && preferences[i].includes('lc')) {
                    channel.send({embeds: [emb]})
                } else if (emb.author.name.includes('atcoder') && preferences[i].includes('ac')) {
                    channel.send({embeds: [emb]})
                } else if (emb.author.name.includes('codeforces') && preferences[i].includes('cf')) {
                    channel.send({embeds: [emb]})
                } else if (emb.author.name.includes('codechef') && preferences[i].includes('cc')) {
                    channel.send({embeds: [emb]})
                }
            }
        } catch (err){
            // console.log('error in channel finding')
            // console.log(err)
            invalidChannels.push(channelIds[i])
        }
    }

    for (let id of invalidChannels) {
        await channelDB.findOneAndDelete({defaultChannel: id})
    }
    // console.log(stuffToBroadcast)
    stuffToBroadcast = []
    // console.log('check over')
}

module.exports = main