const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {

    const EarnedRewardsByLocationRoute = (req, res) => {

        app.EarnedRewardModel.getByLocation(req.params.locationId)
            .then( (earnedRewards) => {
                res.json(earnedRewards);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return EarnedRewardsByLocationRoute;
};
