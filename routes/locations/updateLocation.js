module.exports = function (app) {
    var UpdateLocationRoute = function(req, res){

        app.LocationModel.updateById(req.params.locationId, req.body)
            .then(function(location){
                res.json(location);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('Location not found.');
            })
            .done();
    };

    return UpdateLocationRoute;
};
