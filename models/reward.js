module.exports = function(mongoose) {
    const RewardSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        name: String,
        value: String,
        checkinsRequired: Number
    }, { collection: 'Reward' });

    const RewardModel = mongoose.model('Reward', RewardSchema);

    RewardModel.getByCompany = function(companyId) {
        const query = this.find({company: companyId});
        return query.exec();
    };

    RewardModel.getById = function(id) {
        const query = this.findById(id);
        return query.exec();
    };

    RewardModel.updateById = function(id, model) {
        return this.findOneAndUpdate({_id: id}, model, {new: true});
    };

    RewardModel.deleteByCompany = function(companyId) {
        const query = this.find({'company': companyId})
            .remove();
        return query.exec();
    };

    RewardModel.deleteById = function(id) {
        const query = this.find({ _id: id })
            .remove();
        return query.exec();
    };

    RewardModel.savePromise = function(model) {
        return model.save();
    };

    return RewardModel;
};
