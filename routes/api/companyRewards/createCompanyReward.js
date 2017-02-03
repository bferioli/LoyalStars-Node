module.exports = function (app) {
    var CreateCompanyRewardRoute = function (req, res) {

        var model = new app.CompanyRewardModel(req.body);

        app.CompanyModel.getById(req.params.companyId)
            .then(function(company){
                model.set({company: company._id});
                app.CompanyRewardModel.savePromise(model)
                    .then(function(companyReward){
                        res.json(companyReward);
                    })
                    .catch(app.ErrorHelpers.notFound(res))
                    .done();
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CreateCompanyRewardRoute;
};
