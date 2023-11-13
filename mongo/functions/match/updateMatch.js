const { matchModel } = require("../../models.js")

async function updateMatch(match_name, interaction) {
    const userId = interaction.user.id
    try {
        // Find the raid document for the given date
        let match = await matchModel.findOne({ matchName: match_name });

        // If the raid exists, add the user to the specified turn
        if (match) {
            if (match.players.includes(userId)) {
                // User is already in the turn, return error code 404
                return 404;
            }

            match.players.push(userId)
            await match.save()
            return match
        } else {
            // Handle the case where no raid exists for the given date
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = updateMatch