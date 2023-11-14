const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const downPage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"
const config = require('../../config.js')

const rules_img = "https://cdn.discordapp.com/attachments/1172983109411688458/1173774764637163520/acceso.png"

const rules = `
Si no cumples estas normas, serás expulsado del servidor.\n
1. No bullying, contenido racista/degradante o discusiones o quejas excesivas.\n
2. Ser respetuoso y cordial con todos los miembros.\n
3. Prohibido el contenido NSFW.\n
4. Sigue las directrices de la comunidad de Discord.
> https://discordapp.com/guidelines
> https://discordapp.com/ToS`

const rules_eng = `
If you do not comply with these rules, you will be kicked from the server.

1. No bullying, racist/degrading content or excessive arguing or complaining.
2. Be respectful and polite to all members.
3. No NSFW content.
4. Follow Discord community guidelines.
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
      .setTitle('⸺ RULES')
      .setDescription(rules_eng)
      .setImage(rules_img)

      await message.channel.send({ embeds: [embed] })
    },
  };