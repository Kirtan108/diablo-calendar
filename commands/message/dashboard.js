const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const config = require('../../config.js')
const brand_color = config.colors.brand
const panelImg = config.media.dashboard

module.exports = {
    data: {
        name: "dashboard",
        aliases: ['dashboard'],
        description: "info",
    },
    run: async (client, message, args) => {
        await message.delete()
        const username = await message.author.username

        const embed = new EmbedBuilder()
            .setColor(brand_color)
            .setTitle('⸺ DASHBOARD')
            .setDescription(`This is the panel where you can access and edit your profile information.\n\nInteract with the buttons below to perform the related action.`)
            .setImage(panelImg)

        const front = new EmbedBuilder()
            .setImage("https://cdn.discordapp.com/attachments/1029344506065190913/1052413149762027602/Copia_de_logo_1.png")
            .setColor(0x2f3136)

        const button = new ButtonBuilder()
            .setCustomId(`profile`)
            .setLabel('Profile')
            .setStyle(ButtonStyle.Primary)

        const buttonTwo = new ButtonBuilder()
            .setCustomId('editModal')
            .setLabel('Edit Profile')
            .setStyle(ButtonStyle.Success)
            
        const row = new ActionRowBuilder().addComponents(button, buttonTwo)

        await message.channel.send({ embeds: [embed], components: [row] })
    },
}