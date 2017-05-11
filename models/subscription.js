module.exports = function(mongoose) {
    const SubscriptionSchema = mongoose.Schema({
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
        const query = this.find({location: locationId});
        return query.exec();
    };
    SubscriptionModel.savePromise = function(model) {
        return model.save();
    };

    return SubscriptionModel;
};
