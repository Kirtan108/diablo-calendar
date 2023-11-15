const { matchModel, raidModel } = require("../../models.js")

async function createMatch(match_type, world_tier, match_category) {
    try {
        // Determine the correct model based on the match category
        const Model = match_category === 'quickplay' ? matchModel : raidModel;
        
        // Retrieve the last match to calculate the new match number
        const lastMatch = await Model.findOne().sort({ matchNumber: -1 });
        const match_number = lastMatch ? lastMatch.matchNumber + 1 : 1;

        // Create a new match if the type and tier are specified
        if (match_type && world_tier) {
            const match = new Model({
                matchType: match_type,
                worldTier: world_tier,
                matchNumber: match_number,
                matchCategory: match_category
            });

            // Save the new match and return it
            await match.save();
            return match;
        }
    } catch (error) {
        console.error(error);
    }

    // Return null if the match was not created
    return null;
}

module.exports = createMatch;