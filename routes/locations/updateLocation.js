module.exports = function (app) {
    var UpdateLocationRoute = function(req, res){

        app.LocationModel.updateById(req.params.locationId, req.body)
            .then(function(location){
                res.json(location);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return UpdateLocationRoute;
};
