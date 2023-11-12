const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    user_id: { type: String, require: true, unique: true},
    battle_tag: { type: String, require: true },
    battle_net: { type: mongoose.Schema.Types.Mixed}
    // duriel_admissions: { type: Number, min: 0, default: 0 },
    // events_joined: { type: Number, min: 0, default: 0 },
}, {
    timestamps: true // Esto agrega los campos createdAt y updatedAt
})

const raidSchema = new mongoose.Schema({
    raidDate: { type: String, require: true },
    turnA: [ String ], // Array of user IDs for the first turn
    turnB: [ String ] // Array of user IDs for the second turn
});

const profileModel = mongoose.model('ProfileModels', profileSchema)
const raidModel = mongoose.model('RaidModels', raidSchema);

module.exports = { profileModel, raidModel }