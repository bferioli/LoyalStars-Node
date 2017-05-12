const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const UpdateLocationController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.LocationModel.updateById(req.params.locationId, req.body, req.user)
            .then( (location) => {
                res.json(location);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return UpdateLocationController;
};
