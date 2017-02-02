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
                    .catch(function(err){
                        console.log(err);
                        res.status(404).send('Error creating reward.');
                    })
                    .done();
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('Company not found.');
            })
            .done();
    };

    return CreateCompanyRewardRoute;
};
