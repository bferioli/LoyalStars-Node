const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const RewardsController = (req, res) => {

        app.RewardModel.getByCompany(req.params.companyId)
            .then( (rewards) => {
                res.json(rewards);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return RewardsController;
};
