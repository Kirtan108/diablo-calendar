const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const downPage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"
const config = require('../../config.js')
const brand_color = config.colors.brand
const void_color = config.colors.void

const i1 = 'https://cdn.discordapp.com/attachments/1121835033775329340/1123913051737948241/Grafika_bez_nazwy_2.jpg'
const i2 = 'https://cdn.discordapp.com/attachments/1121835033775329340/1123913059140898846/Grafika_bez_nazwy.jpg'
const i3 = 'https://cdn.discordapp.com/attachments/1121835033775329340/1123913072894017607/Grafika_bez_nazwy_1.jpg'
const i4 = 'https://cdn.discordapp.com/attachments/1121835033775329340/1123913276733018172/Grafika_bez_nazwy_1.jpg'
const i5 = 'https://cdn.discordapp.com/attachments/1121835033775329340/1123913300942520442/Grafika_bez_nazwy.jpg'
const i6 = 'https://cdn.discordapp.com/attachments/1121835033775329340/1123913406387339356/Grafika_bez_nazwy.jpg'
const i7 = 'https://cdn.discordapp.com/attachments/1121835033775329340/1123956415007043594/Grafika_bez_nazwy_1.jpg'
const i8 = ''

module.exports = {
  data: {
    name: "oneone",
    aliases: ['oneone'],
    description: "oneone",
  },
  run: async (client, message, args) => {
    await message.delete()

    //   const embed = new EmbedBuilder()
    //   .setColor(brand_color)
    //   .setTitle('⸺ RULES')
    //   .setDescription(rules)
    //   .setImage(downPage)
    const titleEmbed = {
      color: brand_color,
      title: '⸺ UNIQUE PIECES   '
    }
    async function createEmbed(image){
      const embed = new EmbedBuilder()
      .setColor(brand_color)
      .setImage(image)
      
      return embed
    }
    const images = [i1, i2, i3, i4, i5, i6, i7]
    for(const image of images) {
      const embed = await createEmbed(image)
      await message.channel.send({ embeds: [embed] })
    }
  }
}

  /*

          const e1 = new EmbedBuilder().setColor(void_color)
        .setURL('https://discord.gg/WXcF4gbS').setImage(i1)
        const e2 = new EmbedBuilder().setURL('https://discord.gg/WXcF4gbS').setImage(i2)
        const e3 = new EmbedBuilder().setURL('https://discord.gg/WXcF4gbS').setImage(i3)
        const e4 = new EmbedBuilder().setURL('https://discord.gg/WXcF4gbS').setImage(i4)

        const e5 = new EmbedBuilder().setColor(void_color)
        .setURL('https://www.hello.com').setImage(i5)
        const e6 = new EmbedBuilder().setURL('https://www.hello.com').setImage(i6)
        const e7 = new EmbedBuilder().setURL('https://www.hello.com').setImage(i7)
        //const e8 = new EmbedBuilder().setURL('https://www.hello.com').setImage(i8)
        await message.channel.send({ embeds: [titleEmbed]})
        await message.channel.send({ embeds: [e1, e2, e3, e4] })
        await message.channel.send({ embeds: [e5, e6, e7] })
    },

*/