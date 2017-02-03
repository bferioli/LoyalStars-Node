module.exports = function (app) {
    var DeleteCompanyRoute = function(req, res){

        app.CompanyModel.deleteById(req.params.companyId)
            .then(function(){
                return app.CheckinModel.deleteByCompany(req.params.companyId);
            })
            .then(function(){
                return app.CompanyRewardModel.deleteByCompany(req.params.companyId);
            })
            .then(function(){
                return app.LocationModel.deleteByCompany(req.params.companyId);
            })
            .then(function(){
                return app.RewardModel.deleteByCompany(req.params.companyId);
            })
            .then(function(){
                res.json({ deleted: true });
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return DeleteCompanyRoute;
};
