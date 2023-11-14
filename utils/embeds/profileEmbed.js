const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const config = require('../../config.js')
const brand_color = config.colors.brand
const downPage = config.media.downPage

const { findProfile } = require('../../mongo/functions')
const { calculateDurielAdmissions } = require('../../utils/functions')

async function profileEmbed(userId, member) {
    const profile = await findProfile(userId)
    const battleTag = profile.battle_tag
    const materials = profile?.materials

    const mucusSlickEggCount = materials ? materials.get('Mucus-Slick Egg') : 0;
    const shardOfAgonyCount = materials ? materials.get('Shard of Agony') : 0;

    const allMats = `> <:MucusSlickEgg:1174019421551997049> x${mucusSlickEggCount}\n> <:ShardofAgony:1174019394230300802> x${shardOfAgonyCount}`

    const durielAdmissions = calculateDurielAdmissions(mucusSlickEggCount, shardOfAgonyCount);

    const profilePic = member.displayAvatarURL({ size: 1024, format: 'png', dynamic: true })

    const profileEmbed = new EmbedBuilder()
    .setColor(brand_color)
    .setTitle('⸺ PROFILE')
    //.setDescription(``)
    .addFields(
        { name: `• Battle.Net`, value: `> ${battleTag}`, inline: false },
        { name: `• Duriel Admissions`, value: `> ${durielAdmissions}`, inline: true },
        { name: `• Materials`, value: allMats, inline: true }
    )
    .setImage(downPage)
    .setThumbnail(profilePic)
    .setTimestamp()

    return profileEmbed
}

module.exports = profileEmbed