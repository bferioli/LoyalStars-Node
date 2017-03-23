const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const RewardRoute = (req, res) => {

        app.RewardModel.getById(req.params.rewardId)
            .then( (reward) => {
                res.json(reward);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return RewardRoute;
};
