const { profileModel, raidModel } = require("./models.js")

async function findProfile(interaction) {
    const member = interaction.guild.members.cache.get(interaction.user.id)
    let profile
    try {
        profile = await profileModel.findOne({ userID: interaction.user.id })
        if (!profile) return null
        return profile
    } catch (error) {
        console.log(error)
    }
}

async function createProfile(interaction, cuenta) {
    const member = interaction.guild.members.cache.get(interaction.user.id);
    let profile;

    try {
        profile = await profileModel.findOne({ user_id: interaction.user.id });

        if (!profile) {
            profile = await profileModel.create({
                user_id: interaction.user.id,
                battle_net: cuenta,
            });
            profile.save()
        }
        return profile
    } catch (error) {
        console.error(error);
    }
}

async function createAccessProfile(discordId, battleTag, battleNet) {
    if (!discordId) return
    let profile;

    try {
        profile = await profileModel.findOne({ user_id: discordId });
        
        if (!profile) {
            profile = await profileModel.create({
                user_id: discordId,
                battle_tag: battleTag,
                battle_net: battleNet,
            });
            profile.save()
        }
        return profile
    } catch (error) {
        console.error(error);
    }
}

async function updateProfile(interaction, cuenta) {
    const member = interaction.guild.members.cache.get(interaction.user.id);
    let profile;

    try {
        profile = await profileModel.findOne({ user_id: interaction.user.id });

        if (!profile) return
        profile.battle_net = cuenta; // Update the desired field(s) here
        profile.save()
        return profile
    } catch (error) {
        console.error(error);
    }
}

async function createRaid(date) {
    let raid;

    try {
        // Check if a raid already exists for this date
        raid = await raidModel.findOne({ raidDate: date });

        // If no raid exists for this date, create a new one
        if (!raid) {
            raid = await raidModel.create({
                raidDate: date
            });
            await raid.save();
        }
        return raid;
    } catch (error) {
        console.error(error);
    }
}

async function updateRaid(date, interaction, turn) {
    const userId = interaction.user.id
    try {
        // Find the raid document for the given date
        let raid = await raidModel.findOne({ raidDate: date });

        // If the raid exists, add the user to the specified turn
        if (raid) {
            if ((turn === 'turnA' || turn === 'turnB') && raid[turn].includes(userId)) {
                // User is already in the turn, return error code 404
                return 404;
            }

            // Add the user to the specified turn if they're not already in it
            if (turn === 'turnA' || turn === 'turnB') {
                raid[turn].push(userId);
                await raid.save();
                return raid;
            } else {
                // Handle the case where the turn is invalid
                return null;
            }
        } else {
            // Handle the case where no raid exists for the given date
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    findProfile,
    createProfile,
    createAccessProfile,
    updateProfile,
    createRaid,
    updateRaid
}