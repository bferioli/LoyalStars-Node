module.exports = function (app) {
    var RewardRoute = function(req, res){
        var data = {},
            phone = req.params.phone ? app.PhoneHelpers.decodePhone(req.params.phone) : '';

        app.RewardModel.getById(req.params.rewardId)
            .then(function(reward){
                res.json(reward);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return RewardRoute;
};
