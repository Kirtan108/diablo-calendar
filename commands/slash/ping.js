const { SlashCommandBuilder, Events } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Test message'),
    run: async ({ client, interaction }) => {
      //console.log(interaction.options/*._hoistedOptions*/)
      
      await interaction.reply({
        content: `Pong ${interaction.user}`,
        ephemeral: true
      })
    },
};