module.exports = function(mongoose) {
    var CompanyRewardSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        name: String,
        value: String,
        checkinsRequired: Number
    }, { collection: 'CompanyReward' });

    var CompanyRewardModel = mongoose.model('CompanyReward', CompanyRewardSchema);

    CompanyRewardModel.getByCompany = function(companyId) {
        var deferred = Q.defer();

        this.find({company: companyId})
            .exec(function(error, companyRewards){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(companyRewards);
                }
            });

        return deferred.promise;
    };

    CompanyRewardModel.getById = function(id) {
        var deferred = Q.defer();

        this.findById(id)
            .exec(function(error, companyReward){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(companyReward);
                }
            });

        return deferred.promise;
    };

    CompanyRewardModel.savePromise = function(model) {
        var deferred = Q.defer();

        model.save(function(error, companyReward){
            if (error) {
                deferred.reject(new Error(error));
            }
            else {
                deferred.resolve(companyReward);
            }
        });

        return deferred.promise;
    };

    CompanyRewardModel.updateById = function(id, model) {
        var deferred = Q.defer();

        this.findOneAndUpdate({_id: id}, model, {new: true}, function(error, companyReward){
            if (error) {
                deferred.reject(new Error(error));
            }
            else {
                deferred.resolve(companyReward);
            }
        });

        return deferred.promise;
    };

    return CompanyRewardModel;
};
