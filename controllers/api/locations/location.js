const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const LocationController = (req, res) => {

        app.LocationModel.getById(req.params.locationId)
            .then( (location) => {
                res.json(location);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return LocationController;
};
