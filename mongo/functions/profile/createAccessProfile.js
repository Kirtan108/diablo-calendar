const { profileModel } = require("../../models.js")

async function createAccessProfile(discordId, battleTag, battleNet) {
    if (!discordId) return
    let profile;

    try {
        profile = await profileModel.findOne({ user_id: discordId });
        
        if (!profile) {
            profile = await profileModel.create({
                user_id: discordId,
                battle_tag: battleTag,
                battle_net: battleNet,
            });
            profile.save()
        }
        return profile
    } catch (error) {
        console.error(error);
    }
}

module.exports = createAccessProfile