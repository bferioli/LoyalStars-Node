const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    var CheckinsByLocationRoute = (req, res) => {
        app.CheckinModel.getByLocation(req.params.locationId)
            .then( (checkins) => {
                res.json(checkins);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CheckinsByLocationRoute;
};
