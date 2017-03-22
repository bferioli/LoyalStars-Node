const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CompanyRewardsRoute = (req, res) => {

        app.CompanyRewardModel.getByCompany(req.params.companyId)
            .then( (companyRewards) => {
                res.json(companyRewards);
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return CompanyRewardsRoute;
};
