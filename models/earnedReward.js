module.exports = function(mongoose) {
    const EarnedRewardSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward' },
        location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
        earned: { type: Date, default: Date.now },
        redeemed: Date,
        phone: String
    }, { collection: 'EarnedReward' });

    const EarnedRewardModel = mongoose.model('EarnedReward', EarnedRewardSchema);

    EarnedRewardModel.getAll = function() {
        const query = this.find()
            .populate('reward');
        return query.exec();
    };

    EarnedRewardModel.getByCompany = function(companyId) {
        const query = this.find({company: companyId})
            .populate('reward');
        return query.exec();
    };

    EarnedRewardModel.getByLocation = function(locationId) {
        const query = this.find({location: locationId})
            .populate('reward');
        return query.exec();
    };

    EarnedRewardModel.getByReward = function(rewardId) {
        const query = this.find({reward: rewardId});
        return query.exec();
    };

    EarnedRewardModel.getByPhone = function(phone) {
        const query = this.findOne({phone: phone, redeemed: null})
            .populate('company')
            .populate('reward')
            .populate('location');
        return query.exec();
    };

    EarnedRewardModel.getById = function(id) {
        const query = this.findById(id)
            .populate('company')
            .populate('reward')
            .populate('location');
        return query.exec();
    };

    EarnedRewardModel.deleteByCompany = function(companyId) {
        const query = this.find({'company': companyId})
            .remove();
        return query.exec();
    };

    EarnedRewardModel.savePromise = function(model) {
        return model.save();
    };

    return EarnedRewardModel;
};
