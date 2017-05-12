const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const UpdateRewardController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.RewardModel.updateById(req.params.rewardId, req.body, req.user)
            .then( (reward) => {
                res.json(reward);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return UpdateRewardController;
};
