module.exports = function(mongoose) {
    const CompanyRewardSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        name: String,
        value: String,
        checkinsRequired: Number
    }, { collection: 'CompanyReward' });

    const CompanyRewardModel = mongoose.model('CompanyReward', CompanyRewardSchema);

    CompanyRewardModel.getByCompany = function(companyId) {
        const query = this.find({company: companyId});
        return query.exec();
    };

    CompanyRewardModel.getById = function(id) {
        const query = this.findById(id);
        return query.exec();
    };

    CompanyRewardModel.updateById = function(id, model) {
        return this.findOneAndUpdate({_id: id}, model, {new: true});
    };

    CompanyRewardModel.deleteByCompany = function(companyId) {
        const query = this.find({'company': companyId})
            .remove();
        return query.exec();
    };

    CompanyRewardModel.deleteById = function(id) {
        const query = this.find({ _id: id })
            .remove();
        return query.exec();
    };

    CompanyRewardModel.savePromise = function(model) {
        return model.save();
    };

    return CompanyRewardModel;
};
