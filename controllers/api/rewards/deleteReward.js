const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const DeleteRewardController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.RewardModel.deleteById(req.params.rewardId, req.user)
            .then( () => {
                res.json({ deleted: true });
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return DeleteRewardController;
};
