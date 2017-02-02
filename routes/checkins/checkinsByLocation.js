module.exports = function (app) {

    var CheckinsByLocationRoute = function(req, res){

        app.CheckinModel.allByLocation(req.params.locationId)
            .then(function(checkins){
                res.json(checkins);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('No results.');
            })
            .done();
    };

    return CheckinsByLocationRoute;
};
