const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const DeleteCheckinsByCompanyController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.CheckinModel.deleteByCompany(req.params.companyId, req.user)
            .then( (response) => {
                res.json(response);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return DeleteCheckinsByCompanyController;
};