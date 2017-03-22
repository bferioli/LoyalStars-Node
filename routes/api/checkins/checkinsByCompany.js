const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    var CheckinsByCompanyRoute = (req, res) => {

        app.CheckinModel.getByCompany(req.params.companyId)
            .then( (checkins) => {
                res.json(checkins);
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return CheckinsByCompanyRoute;
};
