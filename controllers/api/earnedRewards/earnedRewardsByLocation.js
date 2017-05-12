const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const EarnedRewardsByLocationController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.EarnedRewardModel.getByLocation(req.params.locationId, req.user)
            .then( (earnedRewards) => {
                res.json(earnedRewards);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return EarnedRewardsByLocationController;
};
