module.exports = function (app) {

    var CheckinsByCompanyRoute = function(req, res){

        app.CheckinModel.allByCompany(req.params.companyId)
            .then(function(checkins){
                res.json(checkins);
            })
            .catch(function(err){
                console.log(err);
                res.status(404).send('No results.');
            })
            .done();
    };

    return CheckinsByCompanyRoute;
};
