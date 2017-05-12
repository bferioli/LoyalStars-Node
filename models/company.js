module.exports = function(mongoose) {
    const CompanySchema = mongoose.Schema({
        slug: String,
        name: String,
        url: String,
        logo: String,
        industry: String,
        adminUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }, { collection: 'Company' });

    const CompanyModel = mongoose.model('Company', CompanySchema);

    CompanyModel.getAll = function(user) {
        const query = user.superUser ? this.find() : this.find({ adminUser: user._id });
        return query.exec();
    };

    CompanyModel.getById = function(id) {
        const query = this.findById(id);
        return query.exec();
    };

    CompanyModel.getBySlug = function(slug, user) {
        const query = this.findOne({ slug });
        return query.exec();
    };

    CompanyModel.updateById = function(id, model, user) {
        const params = user.superUser ? { _id: id } : { _id: id, adminUser: user._id };
        return this.findOneAndUpdate(params, model, {new: true});
    };

    CompanyModel.deleteById = function(id, user) {
        const params = user.superUser ? { _id: id } : { _id: id, adminUser: user._id };
        const query = this.find(params)
            .remove();
        return query.exec();
    };

    CompanyModel.savePromise = function(model, user) {
        if (!user.superUser && user._id !== model.adminUser)
            return Promise.reject();
        return model.save();
    };

    return CompanyModel;
};
