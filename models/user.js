const bcrypt = require('bcrypt-nodejs');

module.exports = function(mongoose) {
    const UserSchema = mongoose.Schema({
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

    UserSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    UserSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    const UserModel = mongoose.model('User', UserSchema);

    UserModel.getByPhone = function(phone) {
        const query = this.findOne({phone: phone})
            .populate('companies')
            .populate('subscriptions');
        return query.exec();
    };

    return UserModel;
};
