const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const UpdateLocationController = (req, res) => {

        app.LocationModel.updateById(req.params.locationId, req.body)
            .then( (location) => {
                res.json(location);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return UpdateLocationController;
};
