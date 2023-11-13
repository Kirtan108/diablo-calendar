const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const downPage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"
const config = require('../../config.js')
const brand_color = config.colors.brand

const duriel_img = "https://cdn.discordapp.com/attachments/1147978391191031838/1172584356154458143/0.png"

const raid_channel = '1172495734948495390'

const { createMatch, lastMatch } = require('../../mongo/functions')
const utils = require('../../utils/exports')

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
        const match_timestamp = utils.formatIsoDate(Date.now())

        const match = await createMatch(match_type, world_tier)



        return console.log(match)

        // Create Date objects for turnoA and turnoB
        const dateA = new Date(fullYear, month - 1, day, 21, 0); // Month is 0-indexed in JavaScript Date
        const dateB = new Date(fullYear, month - 1, day, 23, 0);

        const embed = new EmbedBuilder()
            .setColor(brand_color)
            .setTitle(`⸺ DURIEL RAID | ${dateInput}`)
            .setDescription(`Para apuntarte en los turnos reacciona al botón inferior.\n\n**IMPORTANTE:** Recuerda que debes tener materiales para 6 intentos.`)
            .addFields(
                { name: `**• A | ${turnoA}**`, value: `0` },
                { name: `**• B | ${turnoB}**`, value: `0` },
                // { name: '\u200B', value: '\u200B' }
            )
            .setImage(duriel_img)
            .setFooter({ text: dateInput })

        const front = new EmbedBuilder()
            .setImage("https://cdn.discordapp.com/attachments/1029344506065190913/1052413149762027602/Copia_de_logo_1.png")
            .setColor(0x2f3136)

        const button = new ButtonBuilder()
            .setCustomId(`turno_A`)
            .setLabel('Turno A')
            .setStyle(ButtonStyle.Success)

        const buttonTwo = new ButtonBuilder()
            .setCustomId(`turno_B`)
            .setLabel('Turno B')
            .setStyle(ButtonStyle.Primary)

            
        const row = new ActionRowBuilder().addComponents(button, buttonTwo)

        await message.guild.channels.cache.get(raid_channel).send({ embeds: [embed], components: [row] })
        // await message.channel.send({ embeds: [embed], components: [row] })
    },
}