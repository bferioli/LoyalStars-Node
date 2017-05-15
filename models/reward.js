module.exports = function(mongoose) {
    const RewardSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        name: String,
        value: String,
        checkinsRequired: Number
    }, { collection: 'Reward' });

    const RewardModel = mongoose.model('Reward', RewardSchema);

    RewardModel.getByCompany = function(companyId, user) {
        return new Promise( (resolve, reject) => {
            this.findOne({company: companyId})
                .populate('company')
                .exec()
                .then( (reward) => {
                    if (!reward) {
                        resolve([]);
                    } else if (user.superUser || reward.company.adminUser.equals(user._id)) {
                        this.find({company: companyId})
                            .populate('company')
                            .exec()
                            .then( (result) => resolve(result) );
                    } else {
                        reject('You are not an admin for this company.')
                    }
                });
        });
    };

    RewardModel.getById = function(id) {
        const query = this.findById(id);
        return query.exec();
    };

    RewardModel.updateById = function(id, model, user) {
        return new Promise( (resolve, reject) => {
            this.findById(id)
                .populate('company')
                .exec()
                .then( (reward) => {
                    if (!reward) {
                        reject('Reward not found.');
                    } else if (user.superUser || reward.company.adminUser.equals(user._id)) {
                        this.findOneAndUpdate({_id: id}, model, {new: true})
                            .exec()
                            .then( (updated) => resolve(updated) );
                    } else {
                        reject('You are not an admin for this company.')
                    }
                });
        });
    };

    RewardModel.deleteByCompany = function(companyId) {
        const query = this.find({'company': companyId})
            .remove();
        return query.exec();
    };

    RewardModel.deleteById = function(id, user) {
        return new Promise( (resolve, reject) => {
            this.findById(id)
                .populate('company')
                .exec()
                .then( (reward) => {
                    if (!reward) {
                        reject('Reward not found.');
                    } else if (user.superUser || reward.company.adminUser.equals(user._id)) {
                        this.findById(id)
                            .remove()
                            .exec()
                            .then( () => resolve({ deleted: true }) );
                    } else {
                        reject('You are not an admin for this company.')
                    }
                });
        });
    };

    RewardModel.savePromise = function(model) {
        return model.save();
    };

    return RewardModel;
};
