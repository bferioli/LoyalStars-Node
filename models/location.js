module.exports = function(mongoose) {

    const LocationSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        name: String,
        address: String,
        city: String,
        state: String,
        zip: String,
        latitude: Number,
        longitude: Number,
        checkinCode: String,
        hours: [{ day: Number, openTime: String, openDuration: Number }],
        timezone: String,
        scheduleEnabled: Boolean,
        checkinMessage: String,
        rewardMessage: String,
        reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward' },
        subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }
    }, { collection: 'Location' });

    const LocationModel = mongoose.model('Location', LocationSchema);

    LocationModel.getAll = function() {
        const query = this.find()
            .populate('company');
        return query.exec();
    };

    LocationModel.getByCompany = function(companyId, user) {
        return new Promise( (resolve, reject) => {
            this.findOne({company: companyId})
                .populate('company')
                .exec()
                .then( (location) => {
                    if (!location) {
                        resolve([]);
                    } else if (user.superUser || location.company.adminUser.equals(user._id)) {
                        this.find({company: companyId})
                            .populate('company')
                            .populate('reward')
                            .exec()
                            .then( (result) => resolve(result) );
                    } else {
                        reject('You are not an admin for this company.');
                    }
                });
        });
    };

    LocationModel.getByCheckinCode = function(checkinCode) {
        const query = this.findOne({checkinCode: checkinCode})
            .populate('company')
            .populate('reward');
        return query.exec();
    };

    LocationModel.getById = function(id) {
        const query = this.findById(id)
            .populate('company')
            .populate('reward');
        return query.exec();
    };

    LocationModel.updateById = function(id, model, user) {
        return new Promise( (resolve, reject) => {
            this.findById(id)
                .populate('company')
                .exec()
                .then( (location) => {
                    if (!location) {
                        reject('Location not found.');
                    } else if (user.superUser || location.company.adminUser.equals(user._id)) {
                        this.findOneAndUpdate({_id: id}, model, {new: true})
                            .exec()
                            .then( (updated) => resolve(updated) );
                    } else {
                        reject('You are not an admin for this company.');
                    }
                });
        });
    };

    LocationModel.deleteByCompany = function(companyId, user) {
        return new Promise( (resolve, reject) => {
            this.findOne({'company': companyId})
                .populate('company')
                .exec()
                .then( (location) => {
                    if (!location) {
                        reject('Location not found.');
                    } else if (user.superUser || location.company.adminUser.equals(user._id)) {
                        this.find({ _id: id })
                            .remove()
                            .exec()
                            .then( () => resolve({ deleted: true }) );
                    } else {
                        reject('You are not an admin for this company.');
                    }
                });
        });
    };

    LocationModel.deleteById = function(id, user) {
        return new Promise( (resolve, reject) => {
            this.findById(id)
                .populate('company')
                .exec()
                .then( (location) => {
                    if (!location) {
                        reject('Location not found.');
                    } else if (user.superUser || location.company.adminUser.equals(user._id)) {
                        this.findById(id)
                            .remove()
                            .exec()
                            .then( () => resolve({ deleted: true }) );
                    } else {
                        reject('You are not an admin for this company.');
                    }
                });
        });
    };

    LocationModel.savePromise = function(model) {
        return model.save();
    };

    return LocationModel;
};
