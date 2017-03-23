const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const EarnedRewardRoute = (req, res) => {
        app.RewardModel.getById(req.params.earnedRewardId)
            .then( (earnedReward) => {
                res.json(earnedReward);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return EarnedRewardRoute;
};
