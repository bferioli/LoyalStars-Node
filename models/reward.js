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
