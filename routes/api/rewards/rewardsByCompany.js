module.exports = function (app) {

    var RewardsByCompanyRoute = function(req, res){

        app.RewardModel.getByCompany(req.params.companyId)
            .then(function(rewards){
                res.json(rewards);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return RewardsByCompanyRoute;
};
