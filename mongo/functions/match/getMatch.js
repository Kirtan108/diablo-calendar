const { matchModel } = require("../../models.js")

async function getMatch(match_name) {
    try {
        // Find the raid document for the given date
        let match = await matchModel.findOne({ matchName: match_name });

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