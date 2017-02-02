module.exports = function (app) {
    var LocationRoute = function(req, res){;

        app.LocationModel.getById(req.params.locationId)
            .then(function(location){
                res.json(location);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('Location not found.');
            })
            .done();
    };

    return LocationRoute;
};
