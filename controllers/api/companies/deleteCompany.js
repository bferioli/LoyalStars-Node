const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const DeleteCompanyController = (req, res) => {

        app.CompanyModel.deleteById(req.params.companyId)
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