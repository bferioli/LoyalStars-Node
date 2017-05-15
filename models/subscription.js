module.exports = function(mongoose) {
    const SubscriptionSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        stripeCustomerID: String,
        name: String,
        featuresEnabled: String,
        activeUntil: Date,
        stripeToken: String,
        stripeTokenType: String,
        stripeEmail: String,
    }, { collection: 'Subscription' });

    const SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema);

    SubscriptionModel.getByLocation = function(locationId) {
        return new Promise( (resolve, reject) => {
            this.findOne({'location': locationId})
                .populate('company')
                .exec()
                .then( (subscription) => {
                    if (!subscription) {
                        resolve([]);
                    } else if (user.superUser || subscription.company.adminUser.equals(user._id)) {
                        this.find({'location': locationId})
                            .exec()
                            .then( (result) => resolve(result) );
                    } else {
                        reject('You are not an admin for this company.')
                    }
                });
        });
    };
    SubscriptionModel.savePromise = function(model) {
        return model.save();
    };

    return SubscriptionModel;
};
