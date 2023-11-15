const { matchModel, raidModel } = require("../../models.js")

async function updateMatch(match_name, user_id, addToMatch, matchCategory) {
    try {
        // Find the raid document for the given date
        let match = matchCategory === 'quickplay' ? await matchModel.findOne({ matchName: match_name }) : await raidModel.findOne({ matchName: match_name })

        // If the raid exists, add the user to the specified turn
        if (match) {
            const userIndex = match.players.indexOf(user_id);

            if (addToMatch) {
                // Add the user to the match if they're not already in it
                if (userIndex === -1) {
                    match.players.push(user_id);
                } else {
                    // User is already in the match, return error code 404
                    return 404;
                }
            } else {
                // Remove the user from the match if they're in it
                if (userIndex !== -1) {
                    match.players.splice(userIndex, 1);
                } else {
                    // User is not in the match, return error code 404
                    return 404;
                }
            }

            await match.save();
            return match;            
        } else {
            // Handle the case where no raid exists for the given date
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = updateMatch