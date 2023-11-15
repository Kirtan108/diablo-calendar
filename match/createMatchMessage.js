const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
const config = require('../config.js')
const brand_color = config.colors.brand
const duriel_img = config.media.boss.duriel

const durielMatchDescription = `To search for a quick group and make a try at duriel react with the lower button. The pairing is every 5 minutes.
\n**Important**
Remember that you must have enough material for at least one try, since the groups are made of 4 and everyone contributes with a try.`

function createMatchMessage(channel, match_type, world_tier) {
    const isQuickplay = channel.parentId === '1173560986519740486'; // Quickplay category ID
    const time = isQuickplay ? (60 * 5) : (60 * 60 * 1.5); // 5 minutes for quickplay, 1.5 hours for raids
    const date = Math.floor(Date.now() / 1000 + time);
    const title = isQuickplay ? `⸺ ${channel.name.toUpperCase()} QUICKPLAY` : `⸺ ${channel.name.toUpperCase()} RAID`;
    const nextMatch = isQuickplay ? `<t:${date}:R>` : `<t:${date}:t>`

    const matchEmbed = new EmbedBuilder()
    .setColor(brand_color)
    .setTitle(title)
    .setDescription(durielMatchDescription)
    .addFields(
        { name: `• Players Queue`, value: `0`, inline: true },
        { name: '• Type', value: match_type, inline: true },
        { name: '• World Tier', value: world_tier, inline: true },
        { name: "• Next Match", value: `<t:${date}:R>`, inline: false},
        { name: '\u200B', value: '\u200B', inline: true },
    )
    // .setDescription(`Para apuntarte en los turnos reacciona al botón inferior.\n\n**IMPORTANTE:** Recuerda que debes tener materiales para 6 intentos.`)
    // .addFields(
    //     { name: `**• A | ${turnoA}**`, value: `0` },
    //     { name: `**• B | ${turnoB}**`, value: `0` },
    //     // { name: '\u200B', value: '\u200B' }
    // )
    .setImage(duriel_img)
    //.setFooter({ text: dateInput })
    .setTimestamp()

    const button = new ButtonBuilder()
    .setCustomId(`match_join`)
    .setLabel('Find Group')
    .setStyle(ButtonStyle.Success)

    const buttonTwo = new ButtonBuilder()
    .setCustomId(`match_leave`)
    .setLabel('Leave Queue')
    .setStyle(ButtonStyle.Danger)
    
    const row = new ActionRowBuilder().addComponents(button, buttonTwo)
    const message = { embeds: [matchEmbed], components: [row]}
    return message
}

module.exports = createMatchMessage