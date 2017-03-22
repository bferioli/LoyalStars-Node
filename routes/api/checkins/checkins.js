module.exports = (app) => {
    const CheckinsRoute = (req, res) => {

        app.CheckinModel.getAll()
            .then( (companies) => {
                res.json(companies);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CheckinsRoute;
};
