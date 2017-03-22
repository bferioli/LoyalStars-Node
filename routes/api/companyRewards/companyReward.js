const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CompanyRewardRoute = (req, res) => {

        app.CompanyRewardModel.getById(req.params.companyRewardId)
            .then( (companyReward) => {
                res.json(companyReward);
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return CompanyRewardRoute;
};
