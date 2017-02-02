module.exports = function (app) {
    var RewardRoute = function(req, res){
        var data = {},
            phone = req.params.phone ? app.PhoneHelpers.decodePhone(req.params.phone) : '';

        app.RewardModel.getById(req.params.rewardId)
            .then(function(reward){
                res.json(reward);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('Reward not found.');
            })
            .done();
    };

    return RewardRoute;
};
