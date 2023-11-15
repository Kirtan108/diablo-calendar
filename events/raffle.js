const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const moment = require('moment')
const dotenv = require('dotenv')
dotenv.config()

const config = require('../config.js')
const brand_color = config.colors.brand


const Raffle = {
    customId: 'raffleEntries',
    execute: async function(interaction){
        const member = interaction.guild.members.cache.get(interaction.user.id)
        const mrole = interaction.guild.roles.cache.get(process.env.MEMBER_ROLE)
        const channel = interaction.guild.channels.cache.get(interaction.channel.id)
        const user_id = interaction.user.id

        await interaction.deferReply({ ephemeral: true })

        const invites = await interaction.guild.invites.fetch()
        const totalInv = invites.filter(i => i.inviterId)
        const userInv = invites.filter(i => i.inviterId === user_id)
        
        let j = 0
        let i = 0
        userInv.forEach(inv => i += inv.uses)
        totalInv.forEach(inv => j += inv.uses)


        
        
        const originalEmbed = interaction.message.embeds[0];
        let updatedFields = originalEmbed.fields.map(field => {
            if (field.name.includes(`• Total Entries`)) {
                // Increment the count
                // let count = parseInt(field.value);
                //let sum = addToMatch ? count += 1 : count -= 1; // Increment or decrement the count
                let count = `> ${j}`
                return { name: field.name, value: `${count.toString()}` };
            } else {
                return field;
            }
        });
        
        const newEmbed = new EmbedBuilder()
        .setColor(brand_color)
        .setTitle(originalEmbed.title)
        .setDescription(originalEmbed.description)
        .addFields(updatedFields)
        .setImage(originalEmbed.image ? originalEmbed.image.url : null)
        //.setTimestamp(originalTimestamp)
        
        // Edit the original message with the new embed
        await interaction.message.edit({ embeds: [newEmbed] });
        return interaction.followUp({ content: `Your entries: **${i}**.\n\n*The number of entries is equal to the total of people you have invited to the server.*`, ephemeral: true })
    }
}

module.exports = { Raffle }