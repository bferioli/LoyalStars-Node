const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const DeleteRewardController = (req, res) => {

        app.RewardModel.deleteById(req.params.rewardId)
            .then( () => {
                res.json({ deleted: true });
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return DeleteRewardController;
};
