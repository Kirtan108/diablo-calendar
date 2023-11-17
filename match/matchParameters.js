const config = require('../config.js')
const brand_color = config.colors.brand
const duriel_img = config.media.boss.duriel
const varshan_img = config.media.boss.varshan
const zyr_img = config.media.boss.zyr
const determineMatchCategory = require('./determineMatchCategory')

function createDescription(name, matchType) {
    let pairingTime, totalAttempts, admissions;
    
    if (matchType === 'quickplay') {
        pairingTime = '5 minutes';
        totalAttempts = '4';
        admissions = '1x';
    }
    if (matchType === 'raid') {
        pairingTime = '90 minutes';
        totalAttempts = '20';
        admissions = '5x';
    }

    return `To search for a group and make attempts to ${name} react with the lower button. The pairing is every ${pairingTime} minutes.
    \n**• Requirements:**\n> ${admissions} ${name} Admission\n\n**• Total Attempts:**\n> ${totalAttempts}\n
    Remember that everyone contributes with a try each time. If you don't contribute, you will be banned!`
}

const durielQuickplayDescription = `To search for a quick group and make a try to Duriel react with the lower button. The pairing is every 5 minutes.
\n**• Requirements:**\n> 1x Duriel Admission\n\n**• Total Attempts:**\n> 4\n
Remember that everyone contributes with a try each time. If you don't contribute, you will be banned!`

const durielRaidDescription = `To search for a steady group and make several tries to Duriel react with the lower button. The pairing is every 90 minutes.
\n**• Requirements:**\n> 5x Duriel Admission\n\n**• Total Attempts:**\n> 20\n
Remember that everyone contributes with a try each time. If you don't contribute, you will be banned!`


async function matchParameters(channel) {
    const quickplayCategory = '1173560986519740486';
    const raidsCategory = '1172961227379576832';
    let matchType = channel.parentId === quickplayCategory ? 'quickplay' : 'raid'
    // Determine match type and world tier based on channel properties
    let match_type = 'defaultType'; // Default value
    let world_tier = 'defaultTier'; // Default value
    let match_description
    let match_image

    // Logic to determine match_type and world_tier based on channel
    if (channel.name.includes('duriel')) {
        match_type = 'Duriel';
        world_tier = '4';
        match_description = createDescription('Duriel', matchType)
        match_image = duriel_img
    }
    if (channel.name.includes('zir')) {
        match_type = 'Zir';
        world_tier = '4';
        match_description = createDescription('Lord Zir', matchType)
        match_image = zyr_img
    }
    if (channel.name.includes('varshan')) {
        match_type = 'Varshan';
        world_tier = '4';
        match_description = createDescription('Varshan', matchType)
        match_image = varshan_img
    }
    // if (channel.name.includes('nm')) {
    //     match_type = 'NMD';
    //     world_tier = '4';
    //     match_description = ``
    //     match_image = varshan_img
    // }
    // Add more conditions as needed...

    return { match_type, world_tier, match_description, match_image };
}

module.exports = matchParameters