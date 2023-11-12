const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { set } = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Embed creation')
        .addStringOption(option =>
            option.setName('image')
                .setDescription('The url of the image')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The title of the image')
                .setRequired(true)),
    run: async ({ client, interaction }) => {
        const imageUrl = interaction.options.getString('image')
        const title = interaction.options.getString('title')
        const channel = interaction.guild.channels.cache.get(interaction.channelId)

        async function createEmbed() {
            const color = 0x6dc2ba// await getBackgroundColor(imageUrl)
            const embed = new EmbedBuilder()
                .setColor(color)
                .setImage(imageUrl)
                .setTitle(title)

            return embed
        }
        const embed = await createEmbed()
        await interaction.reply({ content: "success!", ephemeral: true })
        await channel.send({ embeds: [embed]})
        // .send({ content: `${mention.role}`, embeds: [raidEmbed, header, embedDiscord, footer], components: [row] })
    },
};