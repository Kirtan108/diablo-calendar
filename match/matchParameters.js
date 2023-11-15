async function prepareMatchParameters(channel) {
    // Determine match type and world tier based on channel properties
    let match_type = 'defaultType'; // Default value
    let world_tier = 'defaultTier'; // Default value

    // Logic to determine match_type and world_tier based on channel
    if (channel.name.includes('duriel')) {
        match_type = 'boss';
        world_tier = '4';
    }
    // Add more conditions as needed...

    return { match_type, world_tier };
}

module.exports = prepareMatchParameters