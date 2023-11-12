const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const moment = require('moment')
const dotenv = require('dotenv')
dotenv.config()

const config = require('../config.js')
const brand_color = config.colors.brand

const { findProfile, createProfile, updateProfile, updateRaid } = require('../mongo/functions')

const event_channel = '1172495734948495390'

const downpage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"

const Raid = {
    customId: 'raid',
    execute: async function(interaction){
        const member = interaction.guild.members.cache.get(interaction.user.id)
        const mrole = interaction.guild.roles.cache.get(process.env.MEMBER_ROLE)

        await interaction.deferReply({ ephemeral: true })

        const user = await findProfile(interaction)
        console.log(user)

        const embed = new EmbedBuilder()
            .setColor(brand_color)
            .setTitle('⸺ DURIEL RAID')
            .setDescription(``)
            .setImage(downpage)

        await interaction.guild.channels.cache.get(event_channel).send({ embeds: [embed] })
        return interaction.followUp({ content: `Evento creado correctamente!`, ephemeral: true })
    }
}

const Turno = {
    customId: 'turno',
    execute: async function(interaction){
        const member = interaction.guild.members.cache.get(interaction.user.id)
        const mrole = interaction.guild.roles.cache.get(process.env.MEMBER_ROLE)

        await interaction.deferReply({ ephemeral: true })

        const turno = interaction.customId.split('_')[1]

        // const user = await findProfile(interaction)
        // if (!user) return

        const date = interaction.message.embeds[0].footer.text
        const turn = `turn${turno}`

        const raidUpdate = await updateRaid(date, interaction, turn)
        if ( raidUpdate === 404 ) return interaction.followUp({ content: `Ya estás en este turno!`, ephemeral: true })

        const originalEmbed = interaction.message.embeds[0];
        let updatedFields = originalEmbed.fields.map(field => {
            if (field.name.includes(`**• ${turno.toUpperCase()} |`)) {
                // Increment the count for the selected turn
                let count = parseInt(field.value);
                count += 1; // Increment the count
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
            .setFooter({ text: originalEmbed.footer.text });

        // Edit the original message with the new embed
        await interaction.message.edit({ embeds: [newEmbed] });
        return interaction.followUp({ content: `Confirmed!`, ephemeral: true })
    }
}

module.exports = { Raid, Turno }