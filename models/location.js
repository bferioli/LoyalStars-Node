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
        reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }
    }, { collection: 'Location' });

    const LocationModel = mongoose.model('Location', LocationSchema);

    LocationModel.getAll = function() {
        const query = this.find();
        return query.exec();
    };

    LocationModel.getByCompany = function(companyId) {
        const query = this.find({company: companyId})
            .populate('reward');
        return query.exec();
    };

    LocationModel.getByCheckinCode = function(checkinCode) {
        const query = this.findOne({checkinCode: checkinCode})
            .populate('company')
            .populate('reward');
        return query.exec();
    };

    LocationModel.getById = function(id) {
        const query = this.findById(id)
            .populate('reward');
        return query.exec();
    };

    LocationModel.updateById = function(id, model) {
        return this.findOneAndUpdate({_id: id}, model, {new: true});
    };

    LocationModel.deleteByCompany = function(companyId) {
        const query = this.find({'company': companyId})
            .remove();
        return query.exec();
    };

    LocationModel.deleteById = function(id) {
        const query = this.find({ _id: id })
            .remove();
        return query.exec();
    };

    LocationModel.savePromise = function(model) {
        return model.save();
    };

    return LocationModel;
};
