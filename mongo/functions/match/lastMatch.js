const { matchModel } = require("../../models.js")

async function lastMatch() {
    try {
        // Find the last match based on the matchNumber
        const lastMatch = await matchModel.findOne().sort({ matchNumber: -1 });
        if (!lastMatch) {
            return 1; // If no matches exist, start with matchNumber 1
        }
        return lastMatch.matchNumber + 1; // Increment the last matchNumber by 1
    } catch (err) {
        console.error('Error fetching last match:', err);
        return null;
    }
};

module.exports = lastMatch