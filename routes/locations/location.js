module.exports = function (app) {
    var LocationRoute = function(req, res){;

        app.LocationModel.getById(req.params.locationId)
            .then(function(location){
                res.json(location);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return LocationRoute;
};
