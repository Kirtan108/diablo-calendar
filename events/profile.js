const { ModalBuilder, TextInputStyle, TextInputBuilder, ActionRowBuilder } = require('discord.js')
const { profileEmbed } = require('../utils/embeds')
const { findProfile, getMaterials, updateProfile } = require('../mongo/functions')

const Profile = {
    customId: 'profile',
    execute: async function(interaction){
        const userId = interaction.user.id
        const member = interaction.guild.members.cache.get(userId)
        const embedProfile = await profileEmbed(userId, member)

        await interaction.deferReply({ ephemeral: true })
        return interaction.followUp({ embeds: [embedProfile], ephemeral: true })
    }
}

const EditModal = {
    customId: 'editModal',
    execute: async function(interaction){
        const modal = new ModalBuilder()
        .setCustomId(`editProfile`)
        .setTitle('Edit profile');

        const userId = interaction.user.id

        // const user = await findProfile(userId)
        const materials = await getMaterials(userId)
        
        const mucusSlickEggCount = materials ? materials.get('Mucus-Slick Egg').toString() : '0';
        const shardOfAgonyCount = materials ? materials.get('Shard of Agony').toString() : '0';

        const MucusEggs = new TextInputBuilder()
        .setCustomId('MSE')
        .setLabel("Mucus-Slick Egg")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(mucusSlickEggCount)
        .setRequired(true)

        const ShardsAgony = new TextInputBuilder()
        .setCustomId('SoA')
        .setLabel("Shard of Agony")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(shardOfAgonyCount)
        .setRequired(true)
        
    
        const oneActionRow = new ActionRowBuilder().addComponents(MucusEggs);
        const twoActionRow = new ActionRowBuilder().addComponents(ShardsAgony);
        modal.addComponents(oneActionRow, twoActionRow)

        return interaction.showModal(modal);
    }
}

const EditProfile = {
    customId: 'editProfile',
    execute: async function(interaction){
        const userId = interaction.user.id
        await interaction.deferReply({ ephemeral: true })

        const mucusSlickEggInput = await interaction.fields.getTextInputValue('MSE')
        const shardOfAgonyInput = await interaction.fields.getTextInputValue('SoA')

        // Convert to numbers
        const mucusSlickEgg = parseInt(mucusSlickEggInput, 10);
        const shardOfAgony = parseInt(shardOfAgonyInput, 10);
        
        // Check if the inputs are valid numbers
        if (!Number.isFinite(mucusSlickEgg) || !Number.isFinite(shardOfAgony)) return interaction.followUp({ content: "Only number values are allowed for the materials!", ephemeral: true})

        const updatedProfile = await updateProfile(userId, {
            materials: {
                'Mucus-Slick Egg': mucusSlickEgg,
                'Shard of Agony': shardOfAgony
            }
        });
        
        if (!updatedProfile) return interaction.followUp({ content: "An error has occurred please reach support.", ephemeral: true })
 
        return interaction.followUp({ content: `Profile updated correctly!`, ephemeral: true })
    }
}

module.exports = { Profile, EditModal, EditProfile }