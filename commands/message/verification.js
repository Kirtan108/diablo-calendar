const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const downPage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"
const config = require('../../config.js')
const brand_color = config.colors.brand

const img_portada = "https://media.discordapp.net/attachments/1172983109411688458/1172988731330940991/portada_2.jpg"

const descripcion_esp = `Bienvenido a Diablo Calendar, la herramienta de matchmaking para jugadores de Diablo 4! Aquí podrás encontrar grupos y organizar tus aventuras de forma eficiente.
\nPara garantizar una experiencia óptima y segura, es necesario verificarse.
>・Interactúa con el botón inferión y sigue las instrucciones para vincular tu cuenta de Battle.Net.
>・Tras la verificación, tendrás acceso a todas las áreas del servidor, incluyendo los canales de eventos y chat general.
\n\n*Al verificar tu cuenta, confirmas tu compromiso de cumplir con las <#1172958958886072331>*`

module.exports = {
    data: {
      name: "verify",
      aliases: ['verify'],
      description: "Verification",
    },
    run: async (client, message, args) => {
      await message.delete()

      const embed = new EmbedBuilder()
      .setColor(brand_color)
      .setTitle('⸺ VERIFICACIÓN')
      .setDescription(descripcion_esp)
      //.setImage(downPage)
      .setImage(img_portada)

      const front = new EmbedBuilder()
      .setImage("https://cdn.discordapp.com/attachments/1029344506065190913/1052413149762027602/Copia_de_logo_1.png")
      .setColor(0x2f3136)
      
      const button = new ButtonBuilder()
	    .setCustomId('access')
	    .setLabel('ACCEDER')
	    .setStyle(ButtonStyle.Secondary)

      const row = new ActionRowBuilder().addComponents(button)

      await message.channel.send({ embeds: [embed], components: [row] })
    },
  };