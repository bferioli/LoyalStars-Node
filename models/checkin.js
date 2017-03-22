const Q = require('q');

module.exports = function(mongoose) {
    const CheckinSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
        phone: String,
        latitude: Number,
        longitude: Number,
        accuracy: Number,
        promotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' },
        reward: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyReward' }
    }, { collection: 'Checkin' });

    const CheckinModel = mongoose.model('Checkin', CheckinSchema);

    CheckinModel.deferredCallback = function(deferred) {
        return function(error, res) {
            if (error)
                deferred.reject(new Error(error));
            else
                deferred.resolve(res);
        };
    };

    CheckinModel.getAll = function() {
        const deferred = Q.defer();
        this.find()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CheckinModel.getByCompany = function(companyId) {
        const deferred = Q.defer();
        this.find({'company': companyId})
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CheckinModel.getByLocation = function(locationId) {
        const deferred = Q.defer();
        this.find({'location': locationId})
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CheckinModel.getByPhoneAtCompany = function(company, phone) {
        const deferred = Q.defer();
        this.find({'phone': phone, 'company': company._id})
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CheckinModel.getByPhoneAtLocation = function(location, phone) {
        const deferred = Q.defer();
        this.find({'phone': phone, 'location': location._id})
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CheckinModel.deleteByCompany = function(companyId) {
        const deferred = Q.defer();
        this.find({'company': companyId})
            .remove()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CheckinModel.savePromise = function(model) {
        const deferred = Q.defer();
        model.save(this.deferredCallback(deferred));
        return deferred.promise;
    };

    return CheckinModel;
};
