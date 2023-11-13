const { matchModel } = require("../../models.js")

async function createMatch(match_type, world_tier) {
    let match;

    try {
        // Check if a raid already exists for this date
        const lastMatch = await matchModel.findOne().sort({ matchNumber: -1 }); // matchModel.findOne({ matchName: match_name });
        const match_number = !lastMatch ? 1 : lastMatch.matchNumber + 1; // Increment the last matchNumber by 1

        if (match_type && world_tier) {
            match = await matchModel.create({
                matchType: match_type,
                worldTier: world_tier,
                matchNumber: match_number 
            });
            await match.save();
        }
        return match;
    } catch (error) {
        console.error(error);
    }
}

module.exports = createMatch