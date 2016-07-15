module.exports = function(mongoose) {
    var CompanyRewardSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        name: String,
        value: String,
        checkinsRequired: Number
    }, { collection: 'CompanyReward' });

    var CompanyRewardModel = mongoose.model('CompanyReward', CompanyRewardSchema);

    return CompanyRewardModel;
};
