const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    var CheckinsByCompanyController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.CheckinModel.getByCompany(req.params.companyId, req.user)
            .then( (checkins) => {
                res.json(checkins);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CheckinsByCompanyController;
};
