const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const LocationsRoute = (req, res) => {

        app.LocationModel.getByCompany(req.params.companyId)
            .then( (locations) => {
                res.json(locations);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return LocationsRoute;
};
