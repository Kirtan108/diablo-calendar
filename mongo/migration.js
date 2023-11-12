const { default: mongoose } = require("mongoose");
const { profileModel } = require("./models"); // Adjust the path to your model
require("dotenv").config();
const fs = require("fs")

mongoose.connect(process.env.MONGODB);

async function exportDataToJson() {
    try {
        const profiles = await profileModel.find({});
        fs.writeFileSync('profilesBackup.json', JSON.stringify(profiles));
        console.log('Data exported to profilesBackup.json successfully.');
    } catch (error) {
        console.error('Export failed:', error);
    } finally {
        mongoose.disconnect();
    }
}

async function deleteOldData() {
    try {
        await profileModel.deleteMany({});
        console.log('All old data deleted successfully.');
    } catch (error) {
        console.error('Deletion failed:', error);
    } finally {
        mongoose.disconnect();
    }
}

async function importDataFromJson() {
    try {
        const data = fs.readFileSync('profilesBackup.json', 'utf8');
        const profiles = JSON.parse(data);

        for (const profile of profiles) {
            await profileModel.create({
                user_id: profile.userID,
                battle_net: profile.battleNet,
                duriel_admissions: profile.duriel_admissions,
                events_joined: profile.events_joined
            });
        }

        console.log('Data imported successfully.');
    } catch (error) {
        console.error('Import failed:', error);
    } finally {
        mongoose.disconnect();
    }
}

// exportDataToJson()
// deleteOldData();
// importDataFromJson();