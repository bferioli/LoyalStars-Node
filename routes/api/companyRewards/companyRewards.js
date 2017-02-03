module.exports = function (app) {
    var CompanyRewardsRoute = function(req, res){

        app.CompanyRewardModel.getByCompany(req.params.companyId)
            .then(function(companyRewards){
                res.json(companyRewards);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CompanyRewardsRoute;
};
