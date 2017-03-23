const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const EarnedRewardsController = (req, res) => {

        app.EarnedRewardModel.getAll()
            .then( (earnedRewards) => {
                res.json(earnedRewards);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return EarnedRewardsController;
};
