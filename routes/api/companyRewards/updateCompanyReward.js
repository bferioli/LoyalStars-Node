const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const UpdateCompanyRewardRoute = (req, res) => {

        app.CompanyRewardModel.updateById(req.params.companyRewardId, req.body)
            .then( (companyReward) => {
                res.json(companyReward);
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return UpdateCompanyRewardRoute;
};
