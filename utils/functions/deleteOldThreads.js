require('dotenv').config()
const config = require('../../config')

async function deleteOldThreads(client) {
    const quickplayCategory = '1173560986519740486'
    const raidsCategory = '1172961227379576832'
    try {
        const channels = await client.guilds.cache.get(`${process.env.GUILD_ID}`).channels.fetch()
        // const category = await client.channels.fetch(categoryId);

        const channelsInCategory = channels.filter(c => c.parentId === quickplayCategory || c.parentId === raidsCategory);
        if (!channels || !channelsInCategory) {
            return console.log("Invalid or non-category channel ID");
        }

        for (const [channelId, channel] of channelsInCategory) {
            console.log(`Processing channel: ${channel.name}`);

            // Combine active and archived threads
            const activeThreads = await channel.threads.fetchActive();
            const archivedThreads = await channel.threads.fetchArchived();
            const allThreads = [...activeThreads.threads.values(), ...archivedThreads.threads.values()];

            for (const thread of allThreads) {
                // Calculate thread age in hours
                const threadAgeHours = (Date.now() - thread.createdTimestamp) / (1000 * 60 * 60);
                if (threadAgeHours > 2) {
                    console.log(`Deleting thread: ${thread.name}`);
                    await thread.delete().catch(console.error); // Delete threads older than 2 hours
                }
            }
        }
    } catch (error) {
        console.error('Error in deleteOldThreads:', error);
    }
}

module.exports = deleteOldThreads