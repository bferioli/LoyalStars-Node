module.exports = function(mongoose) {
    const CheckinSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
        phone: String,
        latitude: Number,
        longitude: Number,
        accuracy: Number,
        reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }
    }, { collection: 'Checkin' });

    const CheckinModel = mongoose.model('Checkin', CheckinSchema);

    CheckinModel.getAll = function() {
        const query = this.find();
        return query.exec();
    };

    CheckinModel.getByCompany = function(companyId, user) {
        return new Promise( (resolve, reject) => {
            this.findOne({'company': companyId})
                .populate('company')
                .exec()
                .then( (checkin) => {
                    if (user.superUser || checkin.company.adminUser.equals(user._id)) {
                        this.find({'company': companyId})
                            .exec()
                            .then( (result) => resolve(result) );
                    } else {
                        reject('You are not an admin for this company.')
                    }
                });
        });
    };

    CheckinModel.getByLocation = function(locationId, user) {
        return new Promise( (resolve, reject) => {
            this.findOne({'location': locationId})
                .populate('company')
                .exec()
                .then( (checkin) => {
                    if (user.superUser || checkin.company.adminUser.equals(user._id)) {
                        this.find({'location': locationId})
                            .exec()
                            .then( (result) => resolve(result) );
                    } else {
                        reject('You are not an admin for this company.')
                    }
                });
        });
    };

    CheckinModel.getByReward = function(rewardId) {
        const query = this.find({'reward': rewardId});
        return query.exec();
    };

    CheckinModel.getByPhoneAtCompany = function(company, phone) {
        const query = this.find({'phone': phone, 'company': company._id});
        return query.exec();
    };

    CheckinModel.getByPhoneAtLocation = function(location, phone) {
        const query = this.find({'phone': phone, 'location': location._id});
        return query.exec();
    };

    CheckinModel.deleteByCompany = function(companyId) {
        return new Promise( (resolve, reject) => {
            this.findOne({'company': companyId})
                .populate('company')
                .exec()
                .then( (checkin) => {
                    if (user.superUser || checkin.company.adminUser.equals(user._id)) {
                        this.find({'company': companyId})
                            .remove()
                            .exec()
                            .then( () => resolve({ deleted: true }) );
                    } else {
                        reject('You are not an admin for this company.')
                    }
                });
        });
    };

    CheckinModel.savePromise = function(model) {
        return model.save();
    };

    return CheckinModel;
};
