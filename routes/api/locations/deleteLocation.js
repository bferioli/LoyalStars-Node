module.exports = function (app) {
    var DeleteLocationRoute = function(req, res){

        app.LocationModel.deleteById(req.params.locationId)
            .then(function(){
                res.json({ deleted: true });
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return DeleteLocationRoute;
};
