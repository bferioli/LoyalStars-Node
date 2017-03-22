const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const DeleteCheckinsByCompanyRoute = (req, res) => {

        app.CheckinModel.deleteByCompany(req.params.companyId)
            .then( () => {
                res.json({ deleted: true });
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return DeleteCheckinsByCompanyRoute;
};