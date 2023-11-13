const { profileModel } = require("../../models.js")

async function updateProfile(interaction, cuenta) {
    const member = interaction.guild.members.cache.get(interaction.user.id);
    let profile;

    try {
        profile = await profileModel.findOne({ user_id: interaction.user.id });

        if (!profile) return
        profile.battle_net = cuenta; // Update the desired field(s) here
        profile.save()
        return profile
    } catch (error) {
        console.error(error);
    }
}

module.exports = updateProfile