module.exports = function (app) {

    var RewardsByLocationRoute = function(req, res){

        app.RewardModel.getByLocation(req.params.locationId)
            .then(function(rewards){
                res.json(rewards);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return RewardsByLocationRoute;
};
