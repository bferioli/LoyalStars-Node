const Q = require('q');

module.exports = function(mongoose) {
    const CompanyRewardSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        name: String,
        value: String,
        checkinsRequired: Number
    }, { collection: 'CompanyReward' });

    const CompanyRewardModel = mongoose.model('CompanyReward', CompanyRewardSchema);

    CompanyRewardModel.deferredCallback = function(deferred) {
        return function(error, res) {
            if (error)
                deferred.reject(new Error(error));
            else
                deferred.resolve(res);
        };
    };

    CompanyRewardModel.getByCompany = function(companyId) {
        const deferred = Q.defer();
        this.find({company: companyId})
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CompanyRewardModel.getById = function(id) {
        const deferred = Q.defer();
        this.findById(id)
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CompanyRewardModel.updateById = function(id, model) {
        const deferred = Q.defer();
        this.findOneAndUpdate({_id: id}, model, {new: true}, this.deferredCallback(deferred));
        return deferred.promise;
    };

    CompanyRewardModel.deleteByCompany = function(companyId) {
        const deferred = Q.defer();
        this.find({'company': companyId})
            .remove()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CompanyRewardModel.deleteById = function(id) {
        const deferred = Q.defer();
        this.find({ _id: id })
            .remove()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CompanyRewardModel.savePromise = function(model) {
        const deferred = Q.defer();
        model.save(this.deferredCallback(deferred));
        return deferred.promise;
    };

    return CompanyRewardModel;
};
