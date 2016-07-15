var Q = require("q");

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
        reward: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyReward' }
    }, { collection: 'Location' });

    var LocationModel = mongoose.model('Location', LocationSchema);

    LocationModel.getByCheckinCode = function(checkinCode) {
        var deferred = Q.defer();

        this.findOne({checkinCode: checkinCode})
            .populate('company')
            .populate('promotion')
            .populate('reward')
            .exec(function(error, location){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(location);
                }
            });

        return deferred.promise;
    };

    return LocationModel;
};
