const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const downPage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"
const config = require('../../config.js')
const brand_color = config.colors.brand

module.exports = {
    data: {
        name: "panel",
        aliases: ['panel'],
        description: "info",
    },
    run: async (client, message, args) => {
        await message.delete()
        const username = await message.author.username

        const embed = new EmbedBuilder()
            .setColor(brand_color)
            .setTitle('⸺ PANEL')
            .setDescription(`Texto ejemplo.`)
            .setImage(downPage)

        const front = new EmbedBuilder()
            .setImage("https://cdn.discordapp.com/attachments/1029344506065190913/1052413149762027602/Copia_de_logo_1.png")
            .setColor(0x2f3136)

        const button = new ButtonBuilder()
            .setCustomId(`raid_${username}`)
            .setLabel('CREAR RAID')
            .setStyle(ButtonStyle.Success)

        const buttonTwo = new ButtonBuilder()
            .setCustomId('tabla')
            .setLabel('TABLA')
            .setStyle(ButtonStyle.Primary)

        const buttonThree = new ButtonBuilder()
            .setCustomId('perfil')
            .setLabel('PERFIL')
            .setStyle(ButtonStyle.Secondary)
            
        const row = new ActionRowBuilder().addComponents(button, buttonTwo, buttonThree)

        await message.channel.send({ embeds: [embed], components: [row] })
    },
}