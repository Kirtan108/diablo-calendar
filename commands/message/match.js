const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const downPage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"
const config = require('../../config.js')
const brand_color = config.colors.brand

const duriel_img = config.media.boss.duriel

const match_channel = '1172963206424182997'

const { createMatch, lastMatch } = require('../../mongo/functions')
const { formatIsoDate } = require('../../utils/functions')

const durielMatchDescription = `To search for a quick group and make a try at duriel react with the lower button. The pairing is every 5 minutes.
\n**Important**
Remember that you must have enough material for at least one try, since the groups are made of 4 and everyone contributes with a try.`

module.exports = {
    data: {
        name: "match",
        aliases: ['match'],
        description: "info",
    },
    run: async (client, message, args) => {
        // await message.delete()
        const match_type = args[0]
        const world_tier = args[1]
        const match_timestamp = formatIsoDate(Date.now())

        const match = await createMatch(match_type, world_tier)

        const time = 60 * 5 // 5 minutes ----- 60 * 60 * 12
        const date = Math.floor(Date.now()/1000 + time)

        const matchEmbed = new EmbedBuilder()
            .setColor(brand_color)
            .setTitle(`⸺ DURIEL RAID`)
            .setDescription(durielMatchDescription)
            .addFields(
                { name: `• Players Queue`, value: `0`, inline: false },
                { name: '• Type', value: match_type, inline: true },
                { name: '• World Tier', value: world_tier, inline: true },
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

        const front = new EmbedBuilder()
            .setImage("https://cdn.discordapp.com/attachments/1029344506065190913/1052413149762027602/Copia_de_logo_1.png")
            .setColor(0x2f3136)

        const button = new ButtonBuilder()
        .setCustomId(`match_join`)
        .setLabel('Find Group')
        .setStyle(ButtonStyle.Success)
        
        const buttonTwo = new ButtonBuilder()
        .setCustomId(`match_leave`)
        .setLabel('Leave Queue')
        .setStyle(ButtonStyle.Danger)
    
        const row = new ActionRowBuilder().addComponents(button, buttonTwo)

        await message.guild.channels.cache.get(match_channel).send({ embeds: [matchEmbed], components: [row] })
        // await message.channel.send({ embeds: [embed], components: [row] })
    },
}