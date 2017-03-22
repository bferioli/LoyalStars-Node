module.exports = (app) => {
    const UpdateLocationRoute = (req, res) => {

        app.LocationModel.updateById(req.params.locationId, req.body)
            .then( (location) => {
                res.json(location);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return UpdateLocationRoute;
};
