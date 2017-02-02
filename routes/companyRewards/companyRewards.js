module.exports = function (app) {
    var CompanyRewardsRoute = function(req, res){

        app.CompanyRewardModel.getByCompany(req.params.companyId)
            .then(function(companyRewards){
                res.json(companyRewards);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('No rewards found.');
            })
            .done();
    };

    return CompanyRewardsRoute;
};
