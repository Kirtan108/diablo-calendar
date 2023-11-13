const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const moment = require('moment')
const dotenv = require('dotenv')
dotenv.config()

const config = require('../config.js')
const brand_color = config.colors.brand

// const { findProfile, createProfile, updateProfile, updateRaid } = require('../mongo/functions')
const { findProfile, updateMatch } = require('../mongo/functions')
const { formatIsoDate, formatIsoDiscordTimestamp } = require('../utils/functions')

const event_channel = '1172495734948495390'
const downpage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"

const Match = {
    customId: 'match',
    execute: async function(interaction){
        const member = interaction.guild.members.cache.get(interaction.user.id)
        const mrole = interaction.guild.roles.cache.get(process.env.MEMBER_ROLE)
        
        await interaction.deferReply({ ephemeral: true })
        
        // const user = await findProfile(interaction)
        const matchType = await interaction.message.embeds[0].fields.find(f => f.name === '• Type')
        const worldTier = await interaction.message.embeds[0].fields.find(f => f.name === '• World Tier')
        const timestamp = await interaction.message.createdTimestamp //.embeds[0].timestamp // .footer.text
        const isoTimestamp = formatIsoDate(timestamp) // formatIsoDiscordTimestamp(timestamp)

        const matchId = `${matchType.value}_${worldTier.value}_${isoTimestamp}`
        
        const raidUpdate = await updateMatch(matchId, interaction)
        console.log(matchId)
        if ( raidUpdate === 404 ) return interaction.followUp({ content: `You are already in queue!`, ephemeral: true })
        
        const originalEmbed = interaction.message.embeds[0];
        let updatedFields = originalEmbed.fields.map(field => {
            if (field.name.includes(`• Players Queue`)) {
                // Increment the count
                let count = parseInt(field.value);
                count += 1; // Increment the count
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


// const Raid = {
//     customId: 'match',
//     execute: async function(interaction){
//         const member = interaction.guild.members.cache.get(interaction.user.id)
//         const mrole = interaction.guild.roles.cache.get(process.env.MEMBER_ROLE)

//         await interaction.deferReply({ ephemeral: true })

//         const user = await findProfile(interaction)
//         console.log(user)

//         const embed = new EmbedBuilder()
//             .setColor(brand_color)
//             .setTitle('⸺ DURIEL RAID')
//             .setDescription(``)
//             .setImage(downpage)

//         await interaction.guild.channels.cache.get(event_channel).send({ embeds: [embed] })
//         return interaction.followUp({ content: `Evento creado correctamente!`, ephemeral: true })
//     }
// }