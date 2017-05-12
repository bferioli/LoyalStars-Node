const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const RewardsController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.RewardModel.getByCompany(req.params.companyId, req.user)
            .then( (rewards) => {
                res.json(rewards);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return RewardsController;
};
