const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const DeleteRewardRoute = (req, res) => {

        app.RewardModel.deleteById(req.params.rewardId)
            .then( () => {
                res.json({ deleted: true });
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return DeleteRewardRoute;
};
