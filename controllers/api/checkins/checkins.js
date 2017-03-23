const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CheckinsController = (req, res) => {

        app.CheckinModel.getAll()
            .then( (companies) => {
                res.json(companies);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CheckinsController;
};
