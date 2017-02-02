module.exports = function (app) {
    var LocationsRoute = function(req, res){

        app.LocationModel.getByCompany(req.params.companyId)
            .then(function(locations){
                res.json(locations);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('No locations found.');
            })
            .done();
    };

    return LocationsRoute;
};
