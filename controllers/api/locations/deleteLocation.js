const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const DeleteLocationController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.LocationModel.deleteById(req.params.locationId, req.user)
            .then( (response) => {
                res.json(response);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return DeleteLocationController;
};
