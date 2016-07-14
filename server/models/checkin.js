module.exports = function(mongoose) {
    var CheckinSchema = mongoose.Schema({
        location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: Date,
        phone: String,
        latitude: Number,
        longitude: Number,
        accuracy: Number,
        promotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' },
        reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }
    }, { collection: 'Checkin' });
    
    var CheckinModel = mongoose.model('Checkin', CheckinSchema);

    return CheckinModel;
};
