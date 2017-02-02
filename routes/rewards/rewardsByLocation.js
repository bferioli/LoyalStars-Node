module.exports = function (app) {

    var RewardsByLocationRoute = function(req, res){

        app.RewardModel.getByLocation(req.params.locationId)
            .then(function(rewards){
                res.json(rewards);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('No results.');
            })
            .done();
    };

    return RewardsByLocationRoute;
};
