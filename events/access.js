const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
require("dotenv").config()

const rolVerificado = "1172957050410635314"
const baseUrl = process.env.BASE_URL // "http://localhost:8080"
const authUrl = `${baseUrl}/auth/battlenet`

const config = require('../config.js')
const brand_color = config.colors.brand

const img_access = "https://cdn.discordapp.com/attachments/1172983109411688458/1172997075911327835/acceso.jpg"

const embed = new EmbedBuilder()
.setColor(0x1788EC)
.setTitle('⸺ BATTLE.NET ACCOUNT')
.setDescription("Para verificar tu cuenta de Battle.Net utiliza el enlaze que hay a continuación.")
.setImage(img_access)

const Acceso = {
    customId: 'access',
    execute: async function (interaction) {
        const member = interaction.guild.members.cache.get(interaction.user.id)
        const roleVerificado = interaction.guild.roles.cache.get(rolVerificado)

        await interaction.deferReply({ ephemeral: true })

        const customUrl = `${authUrl}?discord_id=${interaction.user.id}`

        const button = new ButtonBuilder()
        .setURL(customUrl)
        .setLabel('VERIFICAR BATTLE.NET')
        .setStyle(ButtonStyle.Link)
        
        const row = new ActionRowBuilder().addComponents(button)

        //member.roles.add(roleVerificado).catch(err => console.log(err))
        return interaction.followUp({ embeds: [embed], components: [row], ephemeral: true })
        // return interaction.followUp({ content: `Has sido verificado correctamente!`, ephemeral: true })
    }
}

module.exports = { Acceso }