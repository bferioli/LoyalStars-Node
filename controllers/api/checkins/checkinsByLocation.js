const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    var CheckinsByLocationController = (req, res) => {
        app.CheckinModel.getByLocation(req.params.locationId)
            .then( (checkins) => {
                res.json(checkins);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CheckinsByLocationController;
};
