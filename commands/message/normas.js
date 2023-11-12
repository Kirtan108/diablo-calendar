const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const downPage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"
const config = require('../../config.js')

const rules = `
Si no cumples estas normas, serás expulsado del servidor.\n
1. No bullying, contenido racista/degradante o discusiones o quejas excesivas.\n
2. Ser respetuoso y cordial con todos los miembros.\n
3. Prohibido el contenido NSFW.\n
4. Sigue las directrices de la comunidad de Discord.
> https://discordapp.com/guidelines
> https://discordapp.com/ToS`

const brand_color = config.colors.brand
module.exports = {
    data: {
      name: "normas",
      aliases: ['rules'],
      description: "Rules",
    },
    run: async (client, message, args) => {
      await message.delete()

      const embed = new EmbedBuilder()
      .setColor(brand_color)
      .setTitle('⸺ NORMAS')
      .setDescription(rules)
      .setImage(downPage)

      await message.channel.send({ embeds: [embed] })
    },
  };