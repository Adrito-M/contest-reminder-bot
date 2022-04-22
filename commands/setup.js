const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js")
const emojiHandler = require('../utils/emojiHandler')
const channelSchema = require('../Schemas/channelSchema')

module.exports = {
    category: 'setup',
    description: 'Setup the reminder channel',
    // testOnly: true,
    slash: 'both',
    callback: async ({message, interaction: msgInt, channel, guild, client}) => {
        const emb = new MessageEmbed
        emb.setTitle('Bot Setup')
        emb.setDescription(`Select websites that you wish to receive updates from\nThis can be changed anytime using the \`setup\` command\nThis will create a new channel \`contest-reminders\` to send updates\nFeel free to move the channel around or change its name.`)
        emb.setColor('AQUA')
        const msgRow = new MessageActionRow()
                            .addComponents(
                            new MessageSelectMenu()
                                .setCustomId('websites')
                                .setMaxValues(4)
                                .setMinValues(1)
                                .setPlaceholder('No Website Selected')
                                .addOptions({
                                    label: 'Codeforces',
                                    value: 'cf',
                                    emoji: await emojiHandler.getEmoji(client, 'codeforces'),
                                },
                                {
                                    label: 'Codechef',
                                    value: 'cc',
                                    emoji: await emojiHandler.getEmoji(client, 'codechef'),
                                },
                                {
                                    label: 'Atcoder',
                                    value: 'ac',
                                    emoji: await emojiHandler.getEmoji(client, 'atcoder')
                                },
                                {
                                    label: 'Leetcode',
                                    value: 'lc',
                                    emoji: await emojiHandler.getEmoji(client, 'leetcode')
                                },)                   
        )
        
        let msgref
        
        if (msgInt) {
            msgref = await msgInt.reply({components: [msgRow], embeds: [emb], fetchReply: true})
        }
        else if (message) {
            msgref = await message.reply({components: [msgRow], embeds: [emb]})
        }
        
        const filter = (btnInt) => {
            return (msgInt?.user?.id || message?.author?.id) === btnInt.user.id
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 15 * 1000,
        })

        collector.on('end', (collection) => {
            collection.forEach(async (click) => {
                if (click.customId === 'websites') {
                    const values = click.values
                    let channelId
                    let newChannel = null
                    if (!(await channelSchema.exists({_id: guild.id}))) {
                        newChannel = await guild.channels.create('contest-reminders')
                        const newEntry = await channelSchema.create({_id:guild.id, defaultChannel: newChannel.id, preferences: values})
                        channelId = newChannel.id
                        await newEntry.save()
                    } else {
                        let channelQuery = await channelSchema.findById(guild.id)
                        const channelList = await guild.channels.fetch().then(ch => ch.map(c => c.id))
                        if (channelList.includes(channelQuery.defaultChannel)) {
                            channelId = channelQuery.id
                            channelQuery.preferences = values
                            await channelQuery.save()
                        } else {
                            newChannel = await guild.channels.create('contest-reminders')
                            channelQuery.defaultChannel = newChannel.id
                            channelQuery.preferences = values
                            channelId = newChannel.id
                            await channelQuery.save()
                        }
                    }
            
                    if (!newChannel) {
                        await msgref.edit({
                            embeds: [{
                                description: 'Preferences have been updated',
                                color: 'GREEN'
                            }],
                            components: []
                        })
                    } else {
                        await msgref.edit({
                            embeds: [{
                                description: `Preferences have been updated\nNew channel <#${newChannel.id}> created\nFeel free to move the channel around or change its name`,
                                color: 'GREEN'
                            }],
                            components: []
                        })
            
                        newChannel.send({
                            embeds:[{
                                description: `New Channel Created by <@!965978317209620510>`,
                                color: 'YELLOW'
                            }]
                        })
                    }
                }
            })
        })

    }
}