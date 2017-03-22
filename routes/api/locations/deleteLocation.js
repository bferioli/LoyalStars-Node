const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const DeleteLocationRoute = (req, res) => {

        app.LocationModel.deleteById(req.params.locationId)
            .then( () => {
                res.json({ deleted: true });
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return DeleteLocationRoute;
};
