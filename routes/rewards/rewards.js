module.exports = function (app) {
    var RewardsRoute = function(req, res){

        app.RewardModel.getAll()
            .then(function(rewards){
                res.json(rewards);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return RewardsRoute;
};
