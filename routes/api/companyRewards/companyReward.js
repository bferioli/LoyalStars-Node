module.exports = function (app) {
    var CompanyRewardRoute = function(req, res){;

        app.CompanyRewardModel.getById(req.params.companyRewardId)
            .then(function(companyReward){
                res.json(companyReward);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CompanyRewardRoute;
};
