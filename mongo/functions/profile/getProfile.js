const { profileModel } = require("../../models.js")

async function getProfile(user_id) {
    let profile
    try {
        profile = await profileModel.findOne({ user_id: user_id })
        if (!profile) return null
        return profile
    } catch (error) {
        console.log(error)
    }
}

module.exports = getProfile