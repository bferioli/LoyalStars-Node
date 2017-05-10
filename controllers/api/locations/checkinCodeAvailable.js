const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CheckinCodeAvailableController = (req, res) => {

        app.LocationModel.getByCheckinCode(req.params.checkinCode)
            .then( (location) => {
                const available = location ? false : true;
                res.json({ available: available });
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CheckinCodeAvailableController;
};
