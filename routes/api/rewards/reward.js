const ErrorHelpers = require('../../../helpers/error.js');
const PhoneHelpers = require('../../../helpers/phone.js');

module.exports = (app) => {
    const RewardRoute = (req, res) => {
        const data = {},
            phone = req.params.phone ? PhoneHelpers.decodePhone(req.params.phone) : '';

        app.RewardModel.getById(req.params.rewardId)
            .then( (reward) => {
                res.json(reward);
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return RewardRoute;
};
