module.exports = function(mongoose) {
    var PromotionSchema = mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        checkinHeading: String,
        checkinBody: String,
        confirmHeading: String,
        confirmBody: String
    }, { collection: 'Promotion' });

    var PromotionModel = mongoose.model('Promotion', PromotionSchema);

    return PromotionModel;
};
