const Q = require("q");

module.exports = function(mongoose) {

    const LocationSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        name: String,
        address: String,
        city: String,
        state: String,
        zip: String,
        latitude: Number,
        longitude: Number,
        checkinCode: String,
        hours: [{ day: Number, openTime: String, openDuration: Number }],
        timezone: String,
        scheduleEnabled: Boolean,
        checkinMessage: String,
        rewardMessage: String,
        promotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' },
        reward: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyReward' }
    }, { collection: 'Location' });

    const LocationModel = mongoose.model('Location', LocationSchema);

    LocationModel.deferredCallback = function(deferred) {
        return function(error, res) {
            if (error)
                deferred.reject(new Error(error));
            else
                deferred.resolve(res);
        };
    };

    LocationModel.getByCompany = function(companyId) {
        const deferred = Q.defer();
        this.find({company: companyId})
            .populate('reward')
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    LocationModel.getByCheckinCode = function(checkinCode) {
        const deferred = Q.defer();
        this.findOne({checkinCode: checkinCode})
            .populate('company')
            .populate('promotion')
            .populate('reward')
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    LocationModel.getById = function(id) {
        const deferred = Q.defer();
        this.findById(id)
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    LocationModel.updateById = function(id, model) {
        const deferred = Q.defer();
        this.findOneAndUpdate({_id: id}, model, {new: true}, this.deferredCallback(deferred));
        return deferred.promise;
    };

    LocationModel.deleteByCompany = function(companyId) {
        const deferred = Q.defer();
        this.find({'company': companyId})
            .remove()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    LocationModel.deleteById = function(id) {
        const deferred = Q.defer();
        this.find({ _id: id })
            .remove()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    LocationModel.savePromise = function(model) {
        const deferred = Q.defer();
        model.save(this.deferredCallback(deferred));
        return deferred.promise;
    };

    return LocationModel;
};
