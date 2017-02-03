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

    LocationModel.deferredCallback = function(deferred) {
        return function(error, res) {
            if (error)
                deferred.reject(new Error(error));
            else
                deferred.resolve(res);
        };
    };

    LocationModel.getByCompany = function(companyId) {
        var deferred = Q.defer();
        this.find({company: companyId})
            .populate('reward')
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    LocationModel.getByCheckinCode = function(checkinCode) {
        var deferred = Q.defer();
        this.findOne({checkinCode: checkinCode})
            .populate('company')
            .populate('promotion')
            .populate('reward')
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    LocationModel.getById = function(id) {
        var deferred = Q.defer();
        this.findById(id)
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    LocationModel.updateById = function(id, model) {
        var deferred = Q.defer();
        this.findOneAndUpdate({_id: id}, model, {new: true}, this.deferredCallback(deferred));
        return deferred.promise;
    };

    LocationModel.deleteByCompany = function(companyId) {
        var deferred = Q.defer();
        this.find({'company': companyId})
            .remove()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    LocationModel.deleteById = function(id) {
        var deferred = Q.defer();
        this.find({ _id: id })
            .remove()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    LocationModel.savePromise = function(model) {
        var deferred = Q.defer();
        model.save(this.deferredCallback(deferred));
        return deferred.promise;
    };

    return LocationModel;
};
