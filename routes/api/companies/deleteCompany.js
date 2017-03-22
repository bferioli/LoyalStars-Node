const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const DeleteCompanyRoute = (req, res) => {

        app.CompanyModel.deleteById(req.params.companyId)
            .then( () => {
                return app.CheckinModel.deleteByCompany(req.params.companyId);
            })
            .then( () => {
                return app.CompanyRewardModel.deleteByCompany(req.params.companyId);
            })
            .then( () => {
                return app.LocationModel.deleteByCompany(req.params.companyId);
            })
            .then( () => {
                return app.RewardModel.deleteByCompany(req.params.companyId);
            })
            .then( () => {
                res.json({ deleted: true });
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return DeleteCompanyRoute;
};
