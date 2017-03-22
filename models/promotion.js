module.exports = function(mongoose) {
    const PromotionSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        checkinHeading: String,
        checkinBody: String,
        confirmHeading: String,
        confirmBody: String
    }, { collection: 'Promotion' });

    const PromotionModel = mongoose.model('Promotion', PromotionSchema);

    return PromotionModel;
};
