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

    CheckinModel.getByCompany = function(company, phone) {
        var deferred = Q.defer();

        this.find({'phone': phone, 'company': company._id})
            .populate('location')
            .populate('user')
            .populate('promotion')
            .populate('reward')
            .exec(function(error, checkins){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(checkins);
                }
            });

        return deferred.promise;
    };

    CheckinModel.getByLocation = function(location, phone) {
        var deferred = Q.defer();

        this.find({'phone': phone, 'location': location._id})
            .populate('location')
            .populate('user')
            .populate('promotion')
            .populate('reward')
            .exec(function(error, checkins){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(checkins);
                }
            });

        return deferred.promise;
    };

    CheckinModel.savePromise = function(model) {
        var deferred = Q.defer();

        model.save(function(error, checkin){
            if (error) {
                deferred.reject(new Error(error));
            }
            else {
                deferred.resolve(checkin);
            }
        });

        return deferred.promise;
    };

    return CheckinModel;
};
