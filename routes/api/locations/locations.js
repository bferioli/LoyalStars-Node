module.exports = (app) => {
    const LocationsRoute = (req, res) => {

        app.LocationModel.getByCompany(req.params.companyId)
            .then( (locations) => {
                res.json(locations);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return LocationsRoute;
};
