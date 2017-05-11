const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const DeleteCompanyController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.CompanyModel.deleteById(req.params.companyId, req.user)
            .then( () => {
                return app.CheckinModel.deleteByCompany(req.params.companyId);
            })
            .then( () => {
                return app.EarnedRewardModel.deleteByCompany(req.params.companyId);
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
            .catch(ErrorHelpers.notFound(res));
    };

    return DeleteCompanyController;
};
