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

    return UserModel;
};
