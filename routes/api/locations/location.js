const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const LocationRoute = (req, res) => {

        app.LocationModel.getById(req.params.locationId)
            .then( (location) => {
                res.json(location);
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return LocationRoute;
};
