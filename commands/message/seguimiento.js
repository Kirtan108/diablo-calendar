const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const downPage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"
const config = require('../../config.js')
const brand_color = config.colors.brand

module.exports = {
    data: {
        name: "seguimiento",
        aliases: ['seguimiento'],
        description: "info",
    },
    run: async (client, message, args) => {
        await message.delete()

        const embed = new EmbedBuilder()
            .setColor(brand_color)
            .setTitle('⸺ SEGUIMIENTO')
            .setDescription(`Utiliza los botones inferiores para indicar tu actividad. Esto está basado en tu actividad semanal en Diablo 4:\n\n**・Activo**\n> Marca esta opción si te has conectado o planeas jugar en algún momento durante la semana, aunque solo sean 10 minutos.\n\n**・Ausente**\n> Selecciona esta opción si vas a dejar de jugar a Diablo 4 durante más de una semana.
            `)
            .setImage(downPage)

        const front = new EmbedBuilder()
            .setImage("https://cdn.discordapp.com/attachments/1029344506065190913/1052413149762027602/Copia_de_logo_1.png")
            .setColor(0x2f3136)

        const button = new ButtonBuilder()
            .setCustomId('activo')
            .setLabel('ACTIVO')
            .setStyle(ButtonStyle.Success)

        const buttonTwo = new ButtonBuilder()
            .setCustomId('ausente')
            .setLabel('AUSENTE')
            .setStyle(ButtonStyle.Secondary)
            
        const row = new ActionRowBuilder().addComponents(button, buttonTwo)

        await message.channel.send({ embeds: [embed], components: [row] })
    },
}