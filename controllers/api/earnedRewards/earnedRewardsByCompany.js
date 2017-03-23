const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {

    const EarnedRewardsByCompanyRoute = (req, res) => {

        app.EarnedRewardModel.getByCompany(req.params.companyId)
            .then( (earnedRewards) => {
                res.json(earnedRewards);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return EarnedRewardsByCompanyRoute;
};
