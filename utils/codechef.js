const axios = require('axios')

module.exports = {
    getCodechefData : async function () {

        const contests = await axios.get('https://www.codechef.com/api/list/contests/all').then(obj => obj.data.future_contests)
        let contestArr = []
        for (let contest of contests) {

            let tempObj = {
                website: 'codechef',
                contestName: contest.contest_name,
                contestLink: `https://www.codechef.com/${contest.contest_code}?itm_campaign=contest_listing`,
                contestStartTime: new Date(contest.contest_start_date_iso),
                contestDurationInMins: contest.contest_duration,
            }

            contestArr.push(tempObj)
        }
        return contestArr
    }
}