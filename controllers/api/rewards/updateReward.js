const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const UpdateRewardController = (req, res) => {

        app.RewardModel.updateById(req.params.rewardId, req.body)
            .then( (reward) => {
                res.json(reward);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return UpdateRewardController;
};
