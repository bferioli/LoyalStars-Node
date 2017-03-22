const Q = require('q');

module.exports = function(mongoose) {
    const CompanySchema = mongoose.Schema({
        slug: String,
        name: String,
        url: String,
        logo: String,
        industry: String,
        adminUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }
    }, { collection: 'Company' });

    const CompanyModel = mongoose.model('Company', CompanySchema);

    CompanyModel.deferredCallback = function(deferred) {
        return function(error, res) {
            if (error)
                deferred.reject(new Error(error));
            else
                deferred.resolve(res);
        };
    };

    CompanyModel.getAll = function() {
        const deferred = Q.defer();
        this.find()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CompanyModel.getById = function(id) {
        const deferred = Q.defer();
        this.findById(id)
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CompanyModel.updateById = function(id, model) {
        const deferred = Q.defer();
        this.findOneAndUpdate({_id: id}, model, {new: true}, this.deferredCallback(deferred));
        return deferred.promise;
    };

    CompanyModel.deleteById = function(id) {
        const deferred = Q.defer();
        this.find({ _id: id })
            .remove()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CompanyModel.savePromise = function(model) {
        const deferred = Q.defer();
        model.save(this.deferredCallback(deferred));
        return deferred.promise;
    };

    return CompanyModel;
};
