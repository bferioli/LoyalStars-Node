module.exports = function (app) {

    var RewardsByCompanyRoute = function(req, res){

        app.RewardModel.getByCompany(req.params.companyId)
            .then(function(rewards){
                res.json(rewards);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('No results.');
            })
            .done();
    };

    return RewardsByCompanyRoute;
};
