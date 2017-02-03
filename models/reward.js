var Q = require('q');

module.exports = function(mongoose) {
    var RewardSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        companyReward: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyReward' },
        location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
        earned: { type: Date, default: Date.now },
        redeemed: Date,
        phone: String
    }, { collection: 'Reward' });

    var RewardModel = mongoose.model('Reward', RewardSchema);

    RewardModel.deferredCallback = function(deferred) {
        return function(error, res) {
            if (error)
                deferred.reject(new Error(error));
            else
                deferred.resolve(res);
        };
    };

    RewardModel.getAll = function() {
        var deferred = Q.defer();
        this.find()
            .populate('companyReward')
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    RewardModel.getByCompany = function(companyId) {
        var deferred = Q.defer();
        this.find({company: companyId})
            .populate('companyReward')
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    RewardModel.getByLocation = function(locationId) {
        var deferred = Q.defer();
        this.find({location: locationId})
            .populate('companyReward')
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    RewardModel.getByPhone = function(phone) {
        var deferred = Q.defer();
        this.findOne({phone: phone, redeemed: null})
            .populate('company')
            .populate('companyReward')
            .populate('location')
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    RewardModel.getById = function(id) {
        var deferred = Q.defer();
        this.findById(id)
            .populate('company')
            .populate('companyReward')
            .populate('location')
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    RewardModel.deleteByCompany = function(companyId) {
        var deferred = Q.defer();
        this.find({'company': companyId})
            .remove()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    RewardModel.savePromise = function(model) {
        var deferred = Q.defer();
        model.save(this.deferredCallback(deferred));
        return deferred.promise;
    };

    return RewardModel;
};
