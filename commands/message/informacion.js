const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const downPage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"
const config = require('../../config.js')
const brand_color = config.colors.brand
const img = config.media.guide

const infoDescription = `The first thing to do is to make sure you have your <#1174055586871132330> profile updated with the corresponding materials. Once completed, you will be able to access the quickplay and raid matches. 
\n**• QUICKPLAY**
They are oriented to organize quick games through quick group matches that happen every 5 minutes.
\n**• RAIDS**
They are oriented to organize raids to make several tries or a longer event. These are matches that occur every 90 minutes.
\n**Beware**
> Respect for others is important and this implies both good behavior and being present when the event happens. If you will not be able to be present, please leave the queue using the corresponding button before the event.`

module.exports = {
    data: {
        name: "info",
        aliases: ['info'],
        description: "info",
    },
    run: async (client, message, args) => {
        await message.delete()

        const embed = new EmbedBuilder()
            .setColor(brand_color)
            .setTitle('⸺ HOW TO USE')
            .setDescription(infoDescription)
            .setImage(img)
            //.setFooter({ text: '*No es necesario ser muy activo para formar parte de nuestra hermandad. Lo que buscamos es evitar que tengamos miembros que nunca vuelvan a jugar y que no tengamos información sobre su actividad.' });

        const front = new EmbedBuilder()
            .setImage("https://cdn.discordapp.com/attachments/1029344506065190913/1052413149762027602/Copia_de_logo_1.png")
            .setColor(0x2f3136)

        const button = new ButtonBuilder()
            .setCustomId('registro')
            .setLabel('REGISTRARME')
            .setStyle(ButtonStyle.Secondary)

        const row = new ActionRowBuilder().addComponents(button)

        await message.channel.send({ embeds: [embed], components: [] })
    },
};