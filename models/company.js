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

    return CompanyModel;
};
