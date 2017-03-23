const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const UpdateLocationRoute = (req, res) => {

        app.LocationModel.updateById(req.params.locationId, req.body)
            .then( (location) => {
                res.json(location);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return UpdateLocationRoute;
};
