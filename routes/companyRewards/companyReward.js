module.exports = function (app) {
    var CompanyRewardRoute = function(req, res){;

        app.CompanyRewardModel.getById(req.params.companyRewardRoute)
            .then(function(companyReward){
                res.json(companyReward);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('Reward not found.');
            })
            .done();
    };

    return CompanyRewardRoute;
};
