const { profileModel } = require("../../models.js")

async function findProfile(userId) {
    let profile
    try {
        profile = await profileModel.findOne({ user_id: userId })
        if (!profile) return null
        return profile
    } catch (error) {
        console.log(error)
    }
}

module.exports = findProfile