var Q = require('q');

module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        name: String,
        phone: String,
        email: String,
        instagram: String,
        twitter: String,
        password: String,
        superUser: Boolean,
        companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
        subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }]
    }, { collection: 'User' });

    var UserModel = mongoose.model('User', UserSchema);

    UserModel.getByPhone = function(phone) {
        var deferred = Q.defer();

        this.findOne({phone: phone})
            .populate('companies')
            .populate('subscriptions')
            .exec(function(error, user){
                if (error) {
                    deferred.reject(new Error(error));
                }
                else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    };

    return UserModel;
};
