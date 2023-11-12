const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const moment = require('moment')
const dotenv = require('dotenv')
dotenv.config()

const { findProfile } = require('../mongo/functions')
const { lastMessage } = require('../utils/functions')

const downpage = "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png"

const rolActivo = "1148546860936601600"
const rolAusente = "1148546937574924328"

const canalActivo = "1148546501405053032"
const canalAusente = "1148546258387075154"

const Activo = {
    customId: 'activo',
    execute: async function(interaction){
        const member = interaction.guild.members.cache.get(interaction.user.id)

        const roleActivo = interaction.guild.roles.cache.get(rolActivo)
        const roleAusente = interaction.guild.roles.cache.get(rolAusente)

        await interaction.deferReply({ ephemeral: true })

        const check = await lastMessage(interaction, canalActivo, interaction.user.id)
        
        if (!check) return interaction.followUp({ content: `Ya has verificado tu actividad esta semana.`, ephemeral: true })

        const perfil = await findProfile(interaction)
        if (!perfil) return interaction.followUp({ content: `No tienes un perfil creado! Para crear el perfil ve al canal de información.`, ephemeral: true })

        const battleNet = perfil.battleNet
        const nick = !member.nickname ? member.user.username : member.nickname
        const discord = member.user.username
        // if (!perfilCreado) return // interaction.followUp({ content: "The SECR3T COD3 provided doesn't exist. Please make sure you are writting the code exactly using CAPS when necessary." })
        // if (perfilCreado?.error && perfilCreado.type === 1) return interaction.followUp({ content: `Perfil creado correctamente!` })        
        
        member.roles.add(roleActivo).catch(err => console.log(err))
        member.roles.remove(roleAusente).catch(err => console.log(err))
        const embedLog = new EmbedBuilder()
            .setTitle(`⸺ ${nick}`)
            .setDescription(`Usuario activo`)
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setColor(roleActivo.color)
            //.setFooter({ text: `ID: ${member.user.id}` })
            .setImage('https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png')
            //.setTimestamp()

        await interaction.guild.channels.cache.get(canalActivo).send({ 
            embeds: [embedLog],
            content: `${member} • BattleNet: ${battleNet}`
        }).then(async m => {
            const emoji = '🟢';
            await m.react(emoji);
        });
        return interaction.followUp({ content: `Actividad verificada!`, ephemeral: true })
    }
}

const Ausente = {
    customId: 'ausente',
    execute: async function(interaction){
        const member = interaction.guild.members.cache.get(interaction.user.id)
        const roleActivo = interaction.guild.roles.cache.get(rolActivo)
        const roleAusente = interaction.guild.roles.cache.get(rolAusente)

        await interaction.deferReply({ ephemeral: true })
        const hasAusente = await member["_roles"].findIndex(r => r === rolAusente)
        if (hasAusente !== -1) return interaction.followUp({ content: `Ya has indicado que tu estado actual es Ausente.`, ephemeral: true })

        const perfil = await findProfile(interaction)
        if (!perfil) return interaction.followUp({ content: `No tienes un perfil creado! Para crear el perfil ve al canal de información.`, ephemeral: true })

        const battleNet = perfil.battleNet
        const nick = member.nickname
        const discord = member.user.username
        // if (!perfilCreado) return // interaction.followUp({ content: "The SECR3T COD3 provided doesn't exist. Please make sure you are writting the code exactly using CAPS when necessary." })
        // if (perfilCreado?.error && perfilCreado.type === 1) return interaction.followUp({ content: `Perfil creado correctamente!` })        
        
        member.roles.add(roleAusente).catch(err => console.log(err))
        member.roles.remove(roleActivo).catch(err => console.log(err))
        const embedLog = new EmbedBuilder()
            .setTitle(`⸺ ${nick}`)
            .setDescription(`Usuario ausente`)
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setColor(roleAusente.color)
            //.setFooter({ text: `ID: ${member.user.id}` })
            .setImage('https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png')
            //.setTimestamp()

        await interaction.guild.channels.cache.get(canalAusente).send({ 
            embeds: [embedLog],
            content: `${member} • BattleNet: ${battleNet}`
        })
        return interaction.followUp({ content: `Actividad verificada!`, ephemeral: true })
    }
}

module.exports = { Activo, Ausente }