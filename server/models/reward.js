module.exports = function(mongoose) {
    var RewardSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        name: String,
        value: String,
        checkinsRequired: Number
    }, { collection: 'Reward' });

    var RewardModel = mongoose.model('Reward', RewardSchema);

    return RewardModel;
};
