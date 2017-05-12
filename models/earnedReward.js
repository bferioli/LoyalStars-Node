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

    EarnedRewardModel.getByCompany = function(companyId, user) {
        return new Promise( (resolve, reject) => {
            this.findOne({'company': companyId})
                .populate('company')
                .exec()
                .then( (earnedReward) => {
                    if (user.superUser || earnedReward.company.adminUser.equals(user._id)) {
                        this.find({'company': companyId})
                            .populate('reward')
                            .exec()
                            .then( (result) => resolve(result) );
                    } else {
                        reject('You are not an admin for this company.')
                    }
                });
        });
    };

    EarnedRewardModel.getByLocation = function(locationId, user) {
        return new Promise( (resolve, reject) => {
            this.findOne({'location': locationId})
                .populate('company')
                .exec()
                .then( (earnedReward) => {
                    if (user.superUser || earnedReward.company.adminUser.equals(user._id)) {
                        this.find({'location': locationId})
                            .populate('reward')
                            .exec()
                            .then( (result) => resolve(result) );
                    } else {
                        reject('You are not an admin for this company.')
                    }
                });
        });
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
