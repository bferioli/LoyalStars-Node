module.exports = function (app) {
    var UpdateCompanyRewardRoute = function(req, res){

        app.CompanyRewardModel.updateById(req.params.companyRewardId, req.body)
            .then(function(companyReward){
                res.json(companyReward);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return UpdateCompanyRewardRoute;
};
