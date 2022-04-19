module.exports = {
    createLink: (dateObj) => `https://www.timeanddate.com/worldclock/fixedtime.html?iso=${dateObj.toISOString()}`
}