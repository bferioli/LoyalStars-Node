module.exports = function (app) {
    var RewardRoute = function(req, res){
        var data = {},
            phone = app.PhoneHelpers.decodePhone(req.params.phone);

        app.RewardModel.getById(req.params.rewardId)
            .then(function(reward){
                if (!reward) {
                    res.status(404).send('Reward not found.');
                    return;
                }
                res.json(reward);
            })
            .catch(console.log)
            .done();
    };

    return RewardRoute;
};
