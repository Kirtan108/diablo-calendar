const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const downPage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"
const config = require('../../config.js')
const brand_color = config.colors.brand

const duriel_img = "https://cdn.discordapp.com/attachments/1172983109411688458/1174456620646928444/d32a50d26d8add2bb5eda3a242c51c08d508_1232xr706_Q100.png"

const match_channel = '1174451818827370648'

const { createMatch, lastMatch } = require('../../mongo/functions')
const { formatIsoDate } = require('../../utils/functions')

const durielMatchDescription = `To celebrate the opening of Diablo Calendar we are raffling 1 top tier skin! The number of entries is the number of people you have invited.
\n- Invite more people to the server to have more chances to win!
\nWhen the raffle is over the founder will contact the winner to make the transaction.`

module.exports = {
    data: {
        name: "raffle",
        aliases: ['raffle'],
        description: "info",
    },
    run: async (client, message, args) => {
        await message.delete()

        const time = 60 * 5 // 5 minutes ----- 60 * 60 * 12
        const date = Math.floor(Date.now()/1000 + time)
        const duration = 60 * 60 * 24 * 5
        const end = Math.floor(Date.now()/1000 + duration)

        const matchEmbed = new EmbedBuilder()
            .setColor(brand_color)
            .setTitle(`⸺ RAFFLE`)
            .setDescription(durielMatchDescription)
            .addFields(
                { name: '• Prize', value: '> x1 SKIN 2,800 Platinum', inline: true },
                { name: `• Total Entries`, value: `> 0`, inline: true },
                { name: '• Winners: 1', value: `\u200B`, inline: true },
                { name: "End time", value: `<t:${end}:f>`, inline: false },
            )
            // .setDescription(`Para apuntarte en los turnos reacciona al botón inferior.\n\n**IMPORTANTE:** Recuerda que debes tener materiales para 6 intentos.`)
            // .addFields(
            //     { name: `**• A | ${turnoA}**`, value: `0` },
            //     { name: `**• B | ${turnoB}**`, value: `0` },
            //     // { name: '\u200B', value: '\u200B' }
            // )
            .setImage(duriel_img)
            .setFooter({ text: `Raffle No. 1` })
            // .setTimestamp()

        const front = new EmbedBuilder()
            .setImage("https://cdn.discordapp.com/attachments/1029344506065190913/1052413149762027602/Copia_de_logo_1.png")
            .setColor(0x2f3136)

        const button = new ButtonBuilder()
        .setCustomId(`raffleEntries`)
        .setLabel('View Entries')
        .setStyle(ButtonStyle.Secondary)
        
    
        const row = new ActionRowBuilder().addComponents(button)

        await message.guild.channels.cache.get(match_channel).send({ content: `@everyone`, embeds: [matchEmbed], components: [row] })
        // await message.channel.send({ embeds: [embed], components: [row] })
    },
}