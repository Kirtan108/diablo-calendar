const mongoose = require('mongoose')
const moment = require('moment');
const utils = require('../utils/functions');

const profileSchema = new mongoose.Schema({
    user_id: { type: String, require: true, unique: true},
    battle_tag: { type: String, require: true },
    battle_net: { type: mongoose.Schema.Types.Mixed},
    materials: { 
        type: Map,
        of: Number,
        default: {
            'Mucus-Slick Egg': 0,
            'Shard of Agony': 0
        }
    },
    // duriel_admissions: { type: Number, min: 0, default: 0 },
    // events_joined: { type: Number, min: 0, default: 0 },
}, {
    timestamps: true // Esto agrega los campos createdAt y updatedAt
})

// const raidSchema = new mongoose.Schema({
//     raidDate: { type: String, require: true },
//     turnA: [ String ], // Array of user IDs for the first turn
//     turnB: [ String ] // Array of user IDs for the second turn
// });

const matchSchema = new mongoose.Schema({
    matchName: { type: String, unique: true, require: true },
    matchNumber: { type: Number, min: 0 },
    matchType: { type: String, 
        enum: [
            'Duriel',
            'Zir',
            'Varshan',
            'NMD',
            'dungeon', 
            'pvp',
            'helltide',
            'blood_harvest',
            'legion'
        ], // Enum to ensure only specific values are used
        require: true 
    },
    worldTier: { type: Number,
        min: 1,
        max: 4, // Assuming there are only four worlds
        require: true
    },
    matchCategory: {
        type: String,
        enum: ['quickplay', 'raid'],
        required: true
    },
    matchDate: { type: Date, default: Date.now() },
    timestamp: { type: Number, require: true }, // Storing the date and time of match creation
    players: [ String ], // Array of user IDs participating in the match
});

matchSchema.pre('save', function(next) {
    if (!this.isNew) {
        next();
        return;
    }
    const matchIsoDate = utils.formatIsoDate(Date.now())
    this.matchName = `${this.matchType}_${this.worldTier}_${this.matchCategory}_${matchIsoDate}`;
    this.timestamp = Date.now()
    next();
});

const profileModel = mongoose.model('ProfileModels', profileSchema)
const raidModel = mongoose.model('RaidModels', matchSchema);
const matchModel = mongoose.model('MatchModels', matchSchema)

module.exports = { profileModel, raidModel, matchModel }