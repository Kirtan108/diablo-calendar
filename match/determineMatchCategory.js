function determineMatchCategory(channel) {
    const quickplayCategory = '1173560986519740486';
    const raidsCategory = '1172961227379576832';

    if (channel.parentId === quickplayCategory) {
        return 'quickplay';
    } else if (channel.parentId === raidsCategory) {
        return 'raid';
    } else {
        return null; // or a default value, if appropriate
    }
}

module.exports = determineMatchCategory