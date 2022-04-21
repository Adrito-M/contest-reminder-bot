const axios = require('axios')
const cheerio = require('cheerio')

function hourstomins (arg) {
    const args = arg.split(':')
    return args[0] * 60 + args[1] * 1
}

module.exports = {
    getData : async function () {
        try {
            const {data} = await axios.get('https://atcoder.jp/contests')
            const $ = cheerio.load(data)
            let contestArr = []
            $('#contest-table-upcoming').find('tbody').children('tr').each((_i, el) => {

                let tempObj = {
                    website: 'atcoder',
                    contestName: $($(el).children('td').get(1)).children('a').text(),
                    contestType: $($(el).children('td').get(1)).children('span').attr('title'),
                    contestLink: `https://atcoder.jp${$($(el).children('td').get(1)).children('a').attr('href')}`,
                    contestStartTime: new Date($($(el).children('td').get(0)).text()),
                    contestDurationInMins: hourstomins($($(el).children('td').get(2)).text()),
                    ratedFor: $($(el).children('td').get(3)).text()
                }

                contestArr.push(tempObj)
            })
            return contestArr
        } catch (err) {
            // console.log(err)
            return []
        }
    }
}