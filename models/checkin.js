var Q = require('q');

module.exports = function(mongoose) {
    var CheckinSchema = mongoose.Schema({
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

    var CheckinModel = mongoose.model('Checkin', CheckinSchema);

    CheckinModel.deferredCallback = function(deferred) {
        return function(error, res) {
            if (error)
                deferred.reject(new Error(error));
            else
                deferred.resolve(res);
        };
    };

    CheckinModel.getAll = function() {
        var deferred = Q.defer();
        this.find()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CheckinModel.allByCompany = function(companyId) {
        var deferred = Q.defer();
        this.find({'company': companyId})
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CheckinModel.allByLocation = function(locationId) {
        var deferred = Q.defer();
        this.find({'location': locationId})
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CheckinModel.getByCompany = function(company, phone) {
        var deferred = Q.defer();
        this.find({'phone': phone, 'company': company._id})
            .populate('location')
            .populate('user')
            .populate('promotion')
            .populate('reward')
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CheckinModel.getByLocation = function(location, phone) {
        var deferred = Q.defer();
        this.find({'phone': phone, 'location': location._id})
            .populate('location')
            .populate('user')
            .populate('promotion')
            .populate('reward')
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CheckinModel.deleteByCompany = function(companyId) {
        var deferred = Q.defer();
        this.find({'company': companyId})
            .remove()
            .exec(this.deferredCallback(deferred));
        return deferred.promise;
    };

    CheckinModel.savePromise = function(model) {
        var deferred = Q.defer();
        model.save(this.deferredCallback(deferred));
        return deferred.promise;
    };

    return CheckinModel;
};
