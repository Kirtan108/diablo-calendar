const { profileModel } = require("../../models.js")

async function updateProfile(userId, updates) {
    try {
        const profile = await profileModel.findOneAndUpdate(
            { user_id: userId },
            { $set: updates },
            { new: true } // Return the updated document
        );

        if (!profile) {
            console.log("Profile not found");
            return null;
        }

        return profile;
    } catch (error) {
        console.error("Error updating profile:", error);
        return null;
    }
}

module.exports = updateProfile