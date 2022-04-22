const {MessageEmbed} = require('discord.js')

module.exports = {
    category: 'help',
    description: 'Show available commands',
    // testOnly: true,
    slash: 'both',
    callback : ({message, interaction}) => {
        const emb = new MessageEmbed
        emb.setColor('BLURPLE')
        emb.setTitle('Commands')
        emb.setDescription(`\`r!help\` or \`/help\`: shows help\n\`r!commands\` or \`/commands\`: shows available commands\n\`r!setup\` or \`/setup:\`: creates a dedicated channel for reminders`)

        if (interaction) {
            interaction.reply({embeds: [emb]})
            return
        }

        if (message) {
            message.reply({embeds: [emb]})
            return
        }
    },
}