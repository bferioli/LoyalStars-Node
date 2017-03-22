const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const RewardsRoute = (req, res) => {

        app.RewardModel.getAll()
            .then( (rewards) => {
                res.json(rewards);
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return RewardsRoute;
};
