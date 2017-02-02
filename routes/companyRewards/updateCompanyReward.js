module.exports = function (app) {
    var UpdateCompanyRewardRoute = function(req, res){

        app.CompanyRewardModel.updateById(req.params.companyRewardId, req.body)
            .then(function(companyReward){
                res.json(companyReward);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('Reward not found.');
            })
            .done();
    };

    return UpdateCompanyRewardRoute;
};
