var Q = require('q');

module.exports = function(mongoose) {
    var CompanySchema = mongoose.Schema({
        slug: String,
        name: String,
        url: String,
        logo: String,
        industry: String,
        adminUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }
    }, { collection: 'Company' });

    var CompanyModel = mongoose.model('Company', CompanySchema);

    CompanyModel.getAll = function() {
        var deferred = Q.defer();

        this.find()
            .exec(function(error, companies){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(companies);
                }
            });

        return deferred.promise;
    };

    CompanyModel.getById = function(id) {
        var deferred = Q.defer();

        this.findById(id)
            .exec(function(error, company){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(company);
                }
            });

        return deferred.promise;
    };

    CompanyModel.savePromise = function(model) {
        var deferred = Q.defer();

        model.save(function(error, company){
            if (error) {
                deferred.reject(new Error(error));
            }
            else {
                deferred.resolve(company);
            }
        });

        return deferred.promise;
    };

    CompanyModel.updateById = function(id, model) {
        var deferred = Q.defer();

        this.findOneAndUpdate({_id: id}, model, {new: true}, function(error, company){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(company);
                }
            });

        return deferred.promise;
    };

    return CompanyModel;
};
