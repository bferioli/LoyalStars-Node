module.exports = function (app) {
    var RewardsRoute = function(req, res){

        app.RewardModel.getAll()
            .then(function(rewards){
                res.json(rewards);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('No results.');
            })
            .done();
    };

    return RewardsRoute;
};
