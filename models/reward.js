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

    RewardModel.getAll = function() {
        var deferred = Q.defer();

        this.find()
            .populate('companyReward')
            .exec(function(error, rewards){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(rewards);
                }
            });

        return deferred.promise;
    };

    RewardModel.getByCompany = function(companyId) {
        var deferred = Q.defer();

        this.find({company: companyId})
            .populate('companyReward')
            .exec(function(error, rewards){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(rewards);
                }
            });

        return deferred.promise;
    };

    RewardModel.getByLocation = function(locationId) {
        var deferred = Q.defer();

        this.find({location: locationId})
            .populate('companyReward')
            .exec(function(error, rewards){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(rewards);
                }
            });

        return deferred.promise;
    };

    RewardModel.getByPhone = function(phone) {
        var deferred = Q.defer();

        this.findOne({phone: phone, redeemed: null})
            .populate('company')
            .populate('companyReward')
            .populate('location')
            .exec(function(error, reward){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(reward);
                }
            });

        return deferred.promise;
    };

    RewardModel.getById = function(id) {
        var deferred = Q.defer();

        this.findById(id)
            .populate('company')
            .populate('companyReward')
            .populate('location')
            .exec(function(error, reward){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(reward);
                }
            });

        return deferred.promise;
    };

    RewardModel.savePromise = function(model) {
        var deferred = Q.defer();

        model.save(function(error, reward){
            if (error) {
                deferred.reject(new Error(error));
            }
            else {
                deferred.resolve(reward);
            }
        });

        return deferred.promise;
    };

    return RewardModel;
};
