module.exports = function(mongoose) {
    var SubscriptionSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        stripeCustomerID: String,
        name: String,
        featuresEnabled: String,
        activeUntil: Date
    }, { collection: 'Subscription' });

    var SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema);

    return SubscriptionModel;
};
