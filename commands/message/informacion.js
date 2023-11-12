const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const downPage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"
const config = require('../../config.js')
const brand_color = config.colors.brand

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
            .setTitle('⸺ GUÍA DE USO')
            .setDescription(`En esta sección, el objetivo es mantener un registro sencillo pero efectivo para hacer un seguimiento de todos los miembros. Este registro tiene la intención de mantener a todos informados sobre la actividad de nuestros compañeros de la hermandad.*\n\n・ Regístrate utilizando el botón inferior para aportar tu cuenta de BattleNet\n\nUna vez registrado, tan solo necesitarás ir al canal de <#1148550651454955580> para indicar tu actividad.\n\n**⸺ ACTIVOS **\n> En el canal <#1148546501405053032> aparecerán los miembros que estén jugando semanalmente al Diablo 4.\n\n**IMPORTANTE:** Si has jugado en algún momento durante la semana con el jugador, reacciona en el emoji que aparecerá debajo del perfil.\n\n**⸺ AUSENTES **\n\n> En el canal <#1148546258387075154> aparecerán los miembros que no estén jugando semanalmente al Diablo 4.
            `)
            .setImage(downPage)
            .setFooter({ text: '*No es necesario ser muy activo para formar parte de nuestra hermandad. Lo que buscamos es evitar que tengamos miembros que nunca vuelvan a jugar y que no tengamos información sobre su actividad.' });

        const front = new EmbedBuilder()
            .setImage("https://cdn.discordapp.com/attachments/1029344506065190913/1052413149762027602/Copia_de_logo_1.png")
            .setColor(0x2f3136)

        const button = new ButtonBuilder()
            .setCustomId('registro')
            .setLabel('REGISTRARME')
            .setStyle(ButtonStyle.Secondary)

        const row = new ActionRowBuilder().addComponents(button)

        await message.channel.send({ embeds: [embed], components: [row] })
    },
};