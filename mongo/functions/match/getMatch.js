const { matchModel, raidModel } = require("../../models.js")

async function getMatch(match_name) {
    try {
        // Find the raid document for the given date
        const isQuickplay = match_name.includes('quickplay');
        const Model = isQuickplay ? matchModel : raidModel;
        let match = await Model.findOne({ matchName: match_name });

        if (match) {
            return match
        } else {
            // Handle the case where no raid exists for the given date
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = getMatch