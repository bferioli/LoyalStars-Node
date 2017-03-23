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
        promotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' },
        reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }
    }, { collection: 'Checkin' });

    const CheckinModel = mongoose.model('Checkin', CheckinSchema);

    CheckinModel.getAll = function() {
        const query = this.find();
        return query.exec();
    };

    CheckinModel.getByCompany = function(companyId) {
        const query = this.find({'company': companyId});
        return query.exec();
    };

    CheckinModel.getByLocation = function(locationId) {
        const query = this.find({'location': locationId});
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
        const query = this.find({'company': companyId})
            .remove();
        return query.exec();
    };

    CheckinModel.savePromise = function(model) {
        return model.save();
    };

    return CheckinModel;
};
