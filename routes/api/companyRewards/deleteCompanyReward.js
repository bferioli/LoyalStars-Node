const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const DeleteCompanyRewardRoute = (req, res) => {

        app.CompanyRewardModel.deleteById(req.params.companyRewardId)
            .then( () => {
                res.json({ deleted: true });
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return DeleteCompanyRewardRoute;
};
