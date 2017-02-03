module.exports = function (app) {
    var LocationsRoute = function(req, res){

        app.LocationModel.getByCompany(req.params.companyId)
            .then(function(locations){
                res.json(locations);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return LocationsRoute;
};
