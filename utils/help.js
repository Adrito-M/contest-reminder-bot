const { MessageEmbed } = require("discord.js")

module.exports = {
    help: () => {
        const emb = new MessageEmbed
        emb.setColor('BLUE')
        emb.setTitle('Hello there!')
        emb.setDescription(`To make use of me, use \`/setup\` or \`r!setup\` to set up the bot\nTo see available commands, use \`/commands\` or \`r!commands\`\nThe bot prefix is \`r!\` and it supports slash commands as well\nHave a Great Day!`)
        return msg = {
            embeds: [emb]
        }
    }
}