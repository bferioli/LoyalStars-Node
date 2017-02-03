module.exports = function (app) {

    var CheckinsByLocationRoute = function(req, res){

        app.CheckinModel.allByLocation(req.params.locationId)
            .then(function(checkins){
                res.json(checkins);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CheckinsByLocationRoute;
};
