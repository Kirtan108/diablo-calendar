const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const moment = require('moment')
const dotenv = require('dotenv')
dotenv.config()

const config = require('../config.js')
const brand_color = config.colors.brand

// const { findProfile, createProfile, updateProfile, updateRaid } = require('../mongo/functions')
const { getMaterials, updateMatch } = require('../mongo/functions')
const { formatIsoDate, formatIsoDiscordTimestamp, calculateDurielAdmissions } = require('../utils/functions')
const { determineMatchCategory } = require('../match/determineMatchCategory')

const event_channel = '1172495734948495390'
const downpage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"

const Match = {
    customId: 'match',
    execute: async function(interaction){
        const member = interaction.guild.members.cache.get(interaction.user.id)
        const mrole = interaction.guild.roles.cache.get(process.env.MEMBER_ROLE)
        const channel = interaction.guild.channels.cache.get(interaction.channel.id)
        const user_id = interaction.user.id
        const materials = await getMaterials(user_id)

        const mucusSlickEggCount = materials ? materials.get('Mucus-Slick Egg') : 0;
        const shardOfAgonyCount = materials ? materials.get('Shard of Agony') : 0;
    
        const durielAdmissions = calculateDurielAdmissions(mucusSlickEggCount, shardOfAgonyCount);

        const action = interaction.customId.split("_")[1]

        const addToMatch = action === 'join'
        
        await interaction.deferReply({ ephemeral: true })
        const quickplayCategory = '1173560986519740486';
        const raidsCategory = '1172961227379576832';
        
        // const user = await findProfile(interaction)
        const matchType = await interaction.message.embeds[0].fields.find(f => f.name === '• Type')
        const worldTier = await interaction.message.embeds[0].fields.find(f => f.name === '• World Tier')
        const timestamp = await interaction.message.createdTimestamp //.embeds[0].timestamp // .footer.text
        const isoTimestamp = formatIsoDate(timestamp) // formatIsoDiscordTimestamp(timestamp)
        const matchCategory = channel.parentId === quickplayCategory ? 'quickplay' : 'raid'

        const matchId = `${matchType.value}_${worldTier.value}_${matchCategory}_${isoTimestamp}`
        if(channel.name.includes('duriel') && durielAdmissions < 1) return interaction.followUp({ content: `You don't have enough materials for Duriel. Please update your profile.`, ephemeral: true })
        if(channel.name.includes('duriel') && matchCategory === 'raid' && durielAdmissions < 5) return interaction.followUp({ content: `You don't have enough materials for Duriel. Please update your profile.`, ephemeral: true })
        
        const raidUpdate = await updateMatch(matchId, user_id, addToMatch, matchCategory)
        if (raidUpdate === 404 && addToMatch) return interaction.followUp({ content: `You are already in queue!`, ephemeral: true })
        if (raidUpdate === 404 && !addToMatch) return interaction.followUp({ content: `You are not in queue!`, ephemeral: true })
        
        const originalEmbed = interaction.message.embeds[0];
        let updatedFields = originalEmbed.fields.map(field => {
            if (field.name.includes(`• Players Queue`)) {
                // Increment the count
                let count = parseInt(field.value);
                let sum = addToMatch ? count += 1 : count -= 1; // Increment or decrement the count
                return { name: field.name, value: `${count.toString()}` };
            } else {
                return field;
            }
        });
        const originalTimestamp = new Date(timestamp);
        
        const newEmbed = new EmbedBuilder()
        .setColor(brand_color)
        .setTitle(originalEmbed.title)
        .setDescription(originalEmbed.description)
        .addFields(updatedFields)
        .setImage(originalEmbed.image ? originalEmbed.image.url : null)
        .setTimestamp(originalTimestamp)
        
        // Edit the original message with the new embed
        await interaction.message.edit({ embeds: [newEmbed] });
        return interaction.followUp({ content: `Confirmed!`, ephemeral: true })
    }
}

module.exports = { Match }