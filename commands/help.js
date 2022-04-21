module.exports = {
    category: 'Help',
    description: 'Getting Started',
    slash: 'both',
    testOnly: true,
    callback: ({message, interaction}) => {
        const msg = require('../utils/help').help()
        
        if (interaction) {
            interaction.reply(msg)
            return
        }

        if (message) {
            message.reply(msg)
            return
        }
    },
}