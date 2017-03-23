module.exports = function(mongoose) {
    const CompanySchema = mongoose.Schema({
        slug: String,
        name: String,
        url: String,
        logo: String,
        industry: String,
        adminUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }
    }, { collection: 'Company' });

    const CompanyModel = mongoose.model('Company', CompanySchema);

    CompanyModel.getAll = function() {
        const query = this.find();
        return query.exec();
    };

    CompanyModel.getById = function(id) {
        const query = this.findById(id);
        return query.exec();
    };

    CompanyModel.getBySlug = function(slug) {
        const query = this.findOne({ slug });
        return query.exec();
    };

    CompanyModel.updateById = function(id, model) {
        return this.findOneAndUpdate({_id: id}, model, {new: true});
    };

    CompanyModel.deleteById = function(id) {
        const query = this.find({ _id: id })
            .remove();
        return query.exec();
    };

    CompanyModel.savePromise = function(model) {
        return model.save();
    };

    return CompanyModel;
};
