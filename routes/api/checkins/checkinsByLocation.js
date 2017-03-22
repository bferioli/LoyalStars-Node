module.exports = (app) => {
    var CheckinsByLocationRoute = (req, res) => {
        app.CheckinModel.getByLocation(req.params.locationId)
            .then( (checkins) => {
                res.json(checkins);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CheckinsByLocationRoute;
};
