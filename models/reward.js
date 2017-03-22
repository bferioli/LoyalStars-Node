module.exports = function(mongoose) {
    const RewardSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        companyReward: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyReward' },
        location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
        earned: { type: Date, default: Date.now },
        redeemed: Date,
        phone: String
    }, { collection: 'Reward' });

    const RewardModel = mongoose.model('Reward', RewardSchema);

    RewardModel.getAll = function() {
        const query = this.find()
            .populate('companyReward');
        return query.exec();
    };

    RewardModel.getByCompany = function(companyId) {
        const query = this.find({company: companyId})
            .populate('companyReward');
        return query.exec();
    };

    RewardModel.getByLocation = function(locationId) {
        const query = this.find({location: locationId})
            .populate('companyReward');
        return query.exec();
    };

    RewardModel.getByPhone = function(phone) {
        const query = this.findOne({phone: phone, redeemed: null})
            .populate('company')
            .populate('companyReward')
            .populate('location');
        return query.exec();
    };

    RewardModel.getById = function(id) {
        const query = this.findById(id)
            .populate('company')
            .populate('companyReward')
            .populate('location');
        return query.exec();
    };

    RewardModel.deleteByCompany = function(companyId) {
        const query = this.find({'company': companyId})
            .remove();
        return query.exec();
    };

    RewardModel.savePromise = function(model) {
        return model.save();
    };

    return RewardModel;
};
