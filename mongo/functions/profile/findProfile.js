const { profileModel } = require("../../models.js")

async function findProfile(interaction) {
    const member = interaction.guild.members.cache.get(interaction.user.id)
    let profile
    try {
        profile = await profileModel.findOne({ user_id: interaction.user.id })
        if (!profile) return null
        return profile
    } catch (error) {
        console.log(error)
    }
}

module.exports = findProfile