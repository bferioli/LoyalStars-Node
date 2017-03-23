const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const LocationsController = (req, res) => {

        app.LocationModel.getByCompany(req.params.companyId)
            .then( (locations) => {
                res.json(locations);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return LocationsController;
};
