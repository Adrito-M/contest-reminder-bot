const axios = require('axios')

module.exports = {
    getData : async function () {

        const contests = await axios.get('https://leetcode.com/graphql?query={%20upcomingContests%20{%20title%20titleSlug%20startTime%20duration%20}%20}').then(obj => obj.data.data.upcomingContests)
        let contestArr = []
        for (let contest of contests) {

            let tempObj = {
                website: 'leetcode',
                contestName: contest.title,
                contestLink: `https://leetcode.com/contest/${contest.titleSlug}`,
                contestStartTime: new Date(contest.startTime * 1000),
                contestDurationInMins: Math.floor(contest.duration / 60),
            }

            contestArr.push(tempObj)
        }
        return contestArr
    }
}