const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {

    const EarnedRewardsByCompanyController = (req, res) => {

        app.EarnedRewardModel.getByCompany(req.params.companyId)
            .then( (earnedRewards) => {
                res.json(earnedRewards);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return EarnedRewardsByCompanyController;
};