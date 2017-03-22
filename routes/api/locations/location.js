module.exports = (app) => {
    const LocationRoute = (req, res) => {

        app.LocationModel.getById(req.params.locationId)
            .then( (location) => {
                res.json(location);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return LocationRoute;
};
