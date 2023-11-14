const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: {
      name: "invites",
      aliases: ['invites'],
      description: "Verification",
    },
    run: async (client, message, args) => {
      // await message.delete()

      const userId = args[0]

      const invites = await message.guild.invites.fetch()
      const userInv = invites.filter(i => i.inviterId === userId)
      
      let i = 0
      userInv.forEach(inv => i += inv.uses)
      await message.reply({ content: `${i}` })
    },
};