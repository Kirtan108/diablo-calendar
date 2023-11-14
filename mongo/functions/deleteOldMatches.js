const { matchModel, raidModel } = require("../models.js")

async function deleteOldMatches() {
    const sixHoursAgo = Date.now() - (6 * 60 * 60 * 1000); // 6 hours in milliseconds
    const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000); // 2 hours in milliseconds

    try {
        // Delete matches older than 6 hours
        const deletedMatches = await matchModel.deleteMany({ timestamp: { $lt: twoHoursAgo } });
        console.log(`Deleted ${deletedMatches.deletedCount} old matches`);

        // Assuming raidModel also has a timestamp field
        const deletedRaids = await raidModel.deleteMany({ timestamp: { $lt: sixHoursAgo } });
        console.log(`Deleted ${deletedRaids.deletedCount} old raids`);

    } catch (error) {
        console.error('Error in deleteOldMatches:', error);
    }
}


module.exports = deleteOldMatches