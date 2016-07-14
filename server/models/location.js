module.exports = function(mongoose) {
    var LocationSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        name: String,
        address: String,
        city: String,
        state: String,
        zip: String,
        latitude: Number,
        longitude: Number,
        checkinCode: String,
        openDays: String,
        openHour: Number,
        openMinute: Number,
        openDurationHours: Number,
        openDurationMinutes: Number,
        timezone: String,
        scheduleEnabled: Boolean,
        checkinMessage: String,
        rewardMessage: String,
        promotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' },
        reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }
    }, { collection: 'Location' });

    var LocationModel = mongoose.model('Location', LocationSchema);

    return LocationModel;
};
