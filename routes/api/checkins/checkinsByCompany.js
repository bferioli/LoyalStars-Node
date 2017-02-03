module.exports = function (app) {

    var CheckinsByCompanyRoute = function(req, res){

        app.CheckinModel.getByCompany(req.params.companyId)
            .then(function(checkins){
                res.json(checkins);
            })
            .catch(app.ErrorHelpers.notFound(res))
            .done();
    };

    return CheckinsByCompanyRoute;
};
