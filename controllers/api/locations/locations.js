const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const LocationsController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.LocationModel.getByCompany(req.params.companyId, req.user)
            .then( (locations) => {
                res.json(locations);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return LocationsController;
};
