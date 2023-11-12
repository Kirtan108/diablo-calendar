const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const moment = require('moment')
const dotenv = require('dotenv')
dotenv.config()

const { findProfile, createProfile, updateProfile } = require('../mongo/functions')

const downpage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"

const Registro = {
    customId: 'registro',
    execute: async function (interaction) {
        const modal = new ModalBuilder()
        .setCustomId(`perfilRegistro`)
        .setTitle('Registro de nuevo miembro');

        const user = await findProfile(interaction);
        const currentUser = user?.battleNet || 'usuario#0000';
    
        const tweetUrlLink = new TextInputBuilder()
        .setCustomId('battleNet')
        .setLabel("Cuenta de BattleNet")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(currentUser)
        .setRequired(true)
    
        const row = new ActionRowBuilder().addComponents(tweetUrlLink);
        modal.addComponents(row)

        return interaction.showModal(modal);
    }
}

const Confirmado = {
    customId: 'perfilRegistro',
    execute: async function(interaction){
        const member = interaction.guild.members.cache.get(interaction.user.id)
        const mrole = interaction.guild.roles.cache.get(process.env.MEMBER_ROLE)

        const cuenta = await interaction.fields.getTextInputValue('battleNet')
        await interaction.deferReply({ ephemeral: true })

        const user = await findProfile(interaction)
        const state = !user ? `⸺ PERFIL CREADO` : `⸺ PERFIL ACTUALIZADO`

        const profile = !user ? await createProfile(interaction, cuenta) : await updateProfile(interaction, cuenta)
 
        // if (!perfilCreado) return // interaction.followUp({ content: "The SECR3T COD3 provided doesn't exist. Please make sure you are writting the code exactly using CAPS when necessary." })
       //if (perfilCreado?.error && perfilCreado.type === 1) return interaction.followUp({ content: `Perfil creado correctamente!` })        
        
        member.roles.add(mrole).catch(err => console.log(err))
        const embedLog = new EmbedBuilder()
            .setAuthor({ name: `${member.user.username}#${member.user.discriminator}` })
            .setTitle(state)
            .setDescription(`• ${member} has been assigned the role:\n> <@&${mrole.id}>`)
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setColor(mrole.color)
            .setFooter({ text: `ID: ${member.user.id}` })
            .setImage('https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png')
            .setTimestamp()

        interaction.guild.channels.cache.get(process.env.LOG_CH).send({ embeds: [embedLog] })
        return interaction.followUp({ content: `Perfil creado correctamente!`, ephemeral: true })
    }
}

module.exports = { Registro, Confirmado }