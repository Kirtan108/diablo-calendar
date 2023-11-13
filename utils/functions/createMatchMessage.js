const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
const config = require('../../config.js')
const brand_color = config.colors.brand
const duriel_img = config.media.boss.duriel

const durielMatchDescription = `To search for a quick group and make a try at duriel react with the lower button. The pairing is every 5 minutes.
\n**Important**
Remember that you must have enough material for at least one try, since the groups are made of 4 and everyone contributes with a try.`

function createMatchMessage(match_type, world_tier) {
    const time = 60 * 5 // 5 minutes ----- 60 * 60 * 12
    const date = Math.floor(Date.now()/1000 + time)

    const matchEmbed = new EmbedBuilder()
    .setColor(brand_color)
    .setTitle(`⸺ DURIEL RAID`)
    .setDescription(durielMatchDescription)
    .addFields(
        { name: `• Players Queue`, value: `0`, inline: true },
        { name: '• Type', value: match_type, inline: true },
        { name: '• World Tier', value: world_tier, inline: true },
        // { name: '\u200B', value: '\u200B', inline: true },
        { name: "• Next Match", value: `<t:${date}:R>`, inline: false},
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
    .setCustomId(`match`)
    .setLabel('FIND GROUP')
    .setStyle(ButtonStyle.Success)
    
    const row = new ActionRowBuilder().addComponents(button)
    const message = { embeds: [matchEmbed], components: [row]}
    return message
}

module.exports = createMatchMessage